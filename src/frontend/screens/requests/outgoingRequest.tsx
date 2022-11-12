import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components/native";
import { FlatList, ListRenderItem, Platform } from "react-native";
import moment from "moment";
import { Card } from "react-native-paper";
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
  const [showDialog, setShowDialog] = useState<{ id: string } | undefined>();
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>([]);
  useEffect(() => {
    fetchAllChangeRequest().then((res) => setChangeRequests(res.data));
  }, []);

  console.log(changeRequests);
  const renderItem: ListRenderItem<ChangeRequest> = ({ item }) => (
    <Item
      to={item.toFuncionario}
      date={item.dia}
      id={item.id}
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
        {changeRequests.length ? (
          <FlatList
            data={changeRequests}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={{ width: Platform.OS === "web" ? 400 : "100%" }}
          />
        ) : (
          <NoContentFoundText>Sem solicitações</NoContentFoundText>
        )}
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
  setShowDialog,
}: {
  to: Employee;
  date: string;
  id: string;
  status: string;
  setShowDialog: Dispatch<SetStateAction<{ id: string } | undefined>>;
}) {
  return (
    <Card style={shadowStyles}>
      <Card.Content>
        <ItemContainer>
          <ItemText>{to.nomeCompleto}</ItemText>
          <ItemText>{moment(date).format("DD-MM-YY HH:mm")}</ItemText>
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

const StyledSelectedBike = styled.SafeAreaView`
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
