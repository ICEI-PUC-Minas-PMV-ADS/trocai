import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components/native";
import { FlatList, ListRenderItem } from "react-native";
import moment from "moment";
import { RootStackScreenProps } from "../../types";
import { defaultPadding } from "../../constants/Layout";
import PageHeader from "../../common/pageHeader";
import ConfirmationDialog from "../../common/confirmationDialog";
import { NoContentFoundText, SubmitPressableText } from "../../common/styled";
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
}: {
  to: Employee;
  date: string;
  id: string;
  status: string;
  setShowDialog: Dispatch<SetStateAction<{ id: string } | undefined>>;
}) {
  return (
    <ItemContainer>
      <ItemText>{to.nomeCompleto}</ItemText>
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
  gap: ${Platform.OS === "web" ? "20px" : undefined};
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
