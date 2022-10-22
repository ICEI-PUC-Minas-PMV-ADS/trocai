import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components/native";
import { FlatList, ListRenderItem } from "react-native";
import moment from "moment";
import { RootStackScreenProps } from "../../types";
import { defaultPadding } from "../../constants/Layout";
import PageHeader from "../../common/pageHeader";
import ConfirmationDialog from "../../common/confirmationDialog";
import { SubmitPressableText } from "../../common/styled";
import Colors from "../../constants/Colors";

function OutgoingRequestList({
  navigation,
}: RootStackScreenProps<"RequestFromOthers">): JSX.Element {
  const [showDialog, setShowDialog] = useState<{ id: string } | undefined>();
  const requestsArray: OutgoingRequestObj[] = [
    {
      to: "leandro borges",
      date: new Date().getTime(),
      id: "1",
      status: "confirmado",
    },
    {
      to: "Mariah carey",
      date: new Date().getTime(),
      id: "2",
      status: "recusado",
    },
    {
      to: "Marcos lime",
      date: new Date().getTime(),
      id: "3",
      status: "pendente",
    },
  ];
  const renderItem: ListRenderItem<OutgoingRequestObj> = ({ item }) => (
    <Item
      to={item.to}
      date={item.date}
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
      <PageHeader pageName="List da solicitações" navigation={navigation} />

      <FlatList
        data={requestsArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {showDialog ? (
        <ConfirmationDialog
          onCancel={() => setShowDialog(undefined)}
          onDelete={() => handleConfirmAction()}
          text="cancel"
        />
      ) : null}
    </StyledSelectedBike>
  );
}

function Item({
  to,
  date,
  id,
  status,
  setShowDialog,
}: OutgoingRequestObj & {
  setShowDialog: Dispatch<SetStateAction<{ id: string } | undefined>>;
}) {
  return (
    <ItemContainer>
      <ItemText>{to}</ItemText>
      <ItemText>{moment(date).format("DD-MM-YY HH:mm")}</ItemText>
      <ItemStatus>{status}</ItemStatus>
      <ItemRefuse>
        <PressableText onPress={() => setShowDialog({ id })}>
          Cancelar
        </PressableText>
      </ItemRefuse>
    </ItemContainer>
  );
}

export default OutgoingRequestList;

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
`;

const PressableText = styled(SubmitPressableText)`
  color: white;
  margin: 0;
`;
