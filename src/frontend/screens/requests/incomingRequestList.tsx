import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ActivityIndicator, Card } from "react-native-paper";
import styled from "styled-components/native";
import { FlatList, ListRenderItem, Platform } from "react-native";
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

function IncomingRequestList({
  navigation,
}: RootStackScreenProps<"RequestFromOthers">): JSX.Element {
  const [showDialog, setShowDialog] = useState<
    { id: number; action: "accept" | "refuse" } | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>([]);
  useEffect(() => {
    setLoading(true);
    fetchAllChangeRequest().then((res) => {
      setChangeRequests(res.data);
      setLoading(false);
    });
  }, []);

  console.log(changeRequests);

  const renderItem: ListRenderItem<ChangeRequest> = ({ item }) => (
    <Item
      from={item.fromFuncionario}
      date={item.dia}
      id={item.id}
      setShowDialog={setShowDialog}
    />
  );

  const handleConfirmAction = () => {
    if (!showDialog) return;
    if (showDialog.action === "accept")
      console.log(showDialog.id, showDialog.action);
    if (showDialog.action === "refuse")
      console.log(showDialog.id, showDialog.action);
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
            text={showDialog.action}
          />
        ) : null}
      </PaddingView>
    </StyledSelectedBike>
  );
}

function Item({
  from,
  date,
  id,
  setShowDialog,
}: {
  from: Employee;
  date: string;
  id: number;
  setShowDialog: Dispatch<
    SetStateAction<{ id: number; action: "accept" | "refuse" } | undefined>
  >;
}) {
  return (
    <Card style={shadowStyles}>
      <Card.Content>
        <ItemContainer>
          <ItemText>{from?.nomeCompleto}</ItemText>
          <ItemText>{date}</ItemText>
          <ItemAccept>
            <PressableText
              onPress={() => setShowDialog({ id, action: "accept" })}
            >
              Aceitar
            </PressableText>
          </ItemAccept>
          <ItemRefuse>
            <PressableText
              onPress={() => setShowDialog({ id, action: "refuse" })}
            >
              Recusar
            </PressableText>
          </ItemRefuse>
        </ItemContainer>
      </Card.Content>
    </Card>
  );
}

export default IncomingRequestList;

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
  margin-right: 10px;
`;

const ItemAccept = styled.Pressable`
  background-color: ${Colors.light["dark-blue"]};
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 100%;
  margin-top: 20px;
  align-self: stretch;
`;

const ItemRefuse = styled(ItemAccept)`
  background-color: ${Colors.light.red};
`;

const PressableText = styled(SubmitPressableText)`
  color: white;
  margin: 0;
`;
