import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ActivityIndicator, Card } from "react-native-paper";
import styled from "styled-components/native";
import { FlatList, ListRenderItem, Platform, View } from "react-native";
import { useDispatch } from "react-redux";
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
import { fetchAllChangeRequest, replyToRequest } from "../../services/api";
import setGlobalNotification from "../../actions/globalNotificationActions";

function IncomingRequestList({
  navigation,
}: RootStackScreenProps<"RequestFromOthers">): JSX.Element {
  const [showDialog, setShowDialog] = useState<
    { id: number; action: "accept" | "refuse" } | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>([]);
  const [waitingResponse, setWaitingResponse] = useState(false);
  const dispatch = useDispatch();
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
      turno={item.turno}
      setShowDialog={setShowDialog}
    />
  );

  const handleConfirmAction = () => {
    let answer;
    if (!showDialog) return;
    if (showDialog.action === "accept") answer = "yes";
    if (showDialog.action === "refuse") answer = "no";
    if (!answer) return;

    setWaitingResponse(true);
    setShowDialog(undefined);
    replyToRequest({
      trocaId: showDialog.id,
      yesOrNo: answer,
    })
      .then(() => {
        setWaitingResponse(false);
        setGlobalNotification(dispatch, `Resposta enviada`, "success");
      })
      .catch((err) => {
        setWaitingResponse(false);
        setGlobalNotification(dispatch, err.message, "error");
      });
  };

  if (waitingResponse) {
    return (
      <View style={{ margin: 50 }}>
        <ActivityIndicator animating color={Colors.light.red} />
      </View>
    );
  }

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
  turno,
  setShowDialog,
}: {
  from: Employee;
  date: string;
  id: number;
  turno: Shift;
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
          <ItemText>{turno}</ItemText>
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
