import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components/native";
import { FlatList, ListRenderItem } from "react-native";
import { RootStackScreenProps } from "../../types";
import { defaultPadding } from "../../constants/Layout";
import PageHeader from "../../common/pageHeader";
import ConfirmationDialog from "../../common/confirmationDialog";
import { NoContentFoundText, SubmitPressableText } from "../../common/styled";
import Colors from "../../constants/Colors";
import { fetchAllChangeRequest } from "../../services/api";

function IncomingRequestList({
  navigation,
}: RootStackScreenProps<"RequestFromOthers">): JSX.Element {
  const [showDialog, setShowDialog] = useState<
    { id: string; action: "accept" | "refuse" } | undefined
  >();
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>([]);
  useEffect(() => {
    fetchAllChangeRequest().then((res) => setChangeRequests(res.data));
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
      <PageHeader pageName="List da solicitações" navigation={navigation} />
      {changeRequests.length ? (
        <FlatList
          data={changeRequests}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <NoContentFoundText>Sem solicitações</NoContentFoundText>
      )}

      {showDialog ? (
        <ConfirmationDialog
          onCancel={() => setShowDialog(undefined)}
          onDelete={() => handleConfirmAction()}
          text={showDialog.action}
        />
      ) : null}
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
  id: string;
  setShowDialog: Dispatch<
    SetStateAction<{ id: string; action: "accept" | "refuse" } | undefined>
  >;
}) {
  return (
    <ItemContainer>
      <ItemText>{from?.nomeCompleto}</ItemText>
      <ItemText>{date}</ItemText>
      <ItemAccept>
        <PressableText onPress={() => setShowDialog({ id, action: "accept" })}>
          Aceitar
        </PressableText>
      </ItemAccept>
      <ItemRefuse>
        <PressableText onPress={() => setShowDialog({ id, action: "refuse" })}>
          Recusar
        </PressableText>
      </ItemRefuse>
    </ItemContainer>
  );
}

export default IncomingRequestList;

const StyledSelectedBike = styled.SafeAreaView`
  padding: ${defaultPadding}px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  position: relative;
  flex: 1;
  background-color: white;
`;

const ItemContainer = styled.View`
  padding: 20px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 80%;
  display: flex;
  flex-direction: row;
  border-radius: 3px;
  gap: 20px;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 3.84;
  elevation: 5;
`;

const ItemText = styled.Text`
  text-transform: capitalize;
`;

const ItemAccept = styled.Pressable`
  background-color: ${Colors.light["dark-blue"]};
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const ItemRefuse = styled(ItemAccept)`
  background-color: ${Colors.light.red};
`;

const PressableText = styled(SubmitPressableText)`
  color: white;
  margin: 0;
`;
