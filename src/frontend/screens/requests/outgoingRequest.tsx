import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components/native";
import { FlatList, ListRenderItem, Platform } from "react-native";
import moment from "moment";
import { ActivityIndicator, Card } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootStackScreenProps } from "../../types";
import PageHeader from "../../common/pageHeader";
import ConfirmationDialog from "../../common/confirmationDialog";
import {
  NoContentFoundText,
  PaddingView,
  shadowStyles,
  SubmitPressableText,
} from "../../common/styled";
import Colors from "../../constants/Colors";
import { fetchAllChangeRequest } from "../../services/api";

function OutgoingRequestList({
  navigation,
}: RootStackScreenProps<"RequestFromOthers">): JSX.Element {
  const [showDialog, setShowDialog] = useState<{ id: number } | undefined>();
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );
  useFocusEffect(
    React.useCallback(() => {
      setChangeRequests([]);
      setLoading(true);
      fetchAllChangeRequest().then((res) => {
        setChangeRequests(res.data);
        setLoading(false);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedUser.token])
  );

  console.log(changeRequests);
  const renderItem: ListRenderItem<ChangeRequest> = ({ item }) => (
    <Item
      to={item.toFuncionario}
      date={item.dia}
      id={item.id}
      turno={item.turno}
      status={item.status}
      setShowDialog={setShowDialog}
    />
  );

  const handleConfirmAction = () => {
    if (!showDialog) return;
    if (showDialog) console.log(showDialog.id);
  };

  return (
    <StyledSelectedBike>
      <PaddingView>
        <PageHeader pageName="List da solicitações" navigation={navigation} />
        {loading ? (
          <ActivityIndicator animating color={Colors.light.red} />
        ) : null}
        {changeRequests.length ? (
          <FlatList
            data={changeRequests}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            style={{ width: Platform.OS === "web" ? 400 : "100%" }}
          />
        ) : null}
        {!changeRequests.length && !loading ? (
          <NoContentFoundText>Sem solicitações</NoContentFoundText>
        ) : null}
        {showDialog ? (
          <ConfirmationDialog
            onCancel={() => setShowDialog(undefined)}
            onDelete={() => handleConfirmAction()}
            text="cancel"
          />
        ) : null}
      </PaddingView>
    </StyledSelectedBike>
  );
}

function Item({
  to,
  date,
  id,
  status,
  turno,
  setShowDialog,
}: {
  to: Employee;
  date: string;
  id: number;
  turno: Shift;
  status: string;
  setShowDialog: Dispatch<SetStateAction<{ id: number } | undefined>>;
}) {
  return (
    <Card style={shadowStyles}>
      <Card.Content>
        <ItemContainer>
          <ItemText>{to.nomeCompleto}</ItemText>
          <ItemText>{moment(date).format("DD-MM-YY HH:mm")}</ItemText>
          <ItemText>{turno}</ItemText>
          <ItemStatus style={{ marginTop: 10 }}>{status}</ItemStatus>
          <ItemRefuse>
            <PressableText onPress={() => setShowDialog({ id })}>
              Cancelar
            </PressableText>
          </ItemRefuse>
        </ItemContainer>
      </Card.Content>
    </Card>
  );
}

export default OutgoingRequestList;

const StyledSelectedBike = styled.View`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  background-color: white;
  width: 100%;
`;

const ItemContainer = styled.View`
  margin: auto;
  display: flex;
  border-radius: 3px;
  align-items: center;
  width: 100%;
`;

const ItemText = styled.Text`
  text-transform: capitalize;
`;

const ItemStatus = styled.Text`
  color: ${Colors.light["dark-gray"]};
`;

const ItemRefuse = styled.Pressable`
  background-color: ${Colors.light.red};
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 100%;
  margin-top: 20px;
  align-self: stretch;
`;

const PressableText = styled(SubmitPressableText)`
  color: white;
  margin: 0;
`;
