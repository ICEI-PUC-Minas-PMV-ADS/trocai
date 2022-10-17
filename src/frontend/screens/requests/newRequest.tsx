import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Platform, View } from "react-native";
import styled from "styled-components/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import PageHeader from "../../common/pageHeader";
import {
  SubmitPressableText,
  StyledForm,
  SubmitPressable,
  IconContainer,
  StyledLabel,
  StyledInput,
} from "../../common/styled";
import Colors from "../../constants/Colors";
import dimensions, { defaultPadding } from "../../constants/Layout";
import { RootStackScreenProps } from "../../types";
import WebPicker from "./webPicker";

function NewRequest({
  navigation,
}: RootStackScreenProps<"NewRequest">): JSX.Element {
  const [requestRecipient, setRequestRecipient] = useState(``);
  const [openStart, setOpenStart] = useState(false);
  const [timestamp, setTimestamp] = useState(new Date().getTime());

  function handleNewRequest(): void {
    console.log("submit obj");
  }
  // precisa ter um request de usuários

  return (
    <StyledNewRequestScreen
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50}
    >
      <StyledNewRequest>
        <PageHeader pageName="Nova Solicitação" navigation={navigation} />
        <StyledForm>
          <StyledLabel>Nome do funcionário</StyledLabel>
          <StyledInput
            textContentType="name"
            value={requestRecipient}
            onChangeText={(value) => setRequestRecipient(value)}
          />
          {Platform.OS === "web" ? (
            <WebPicker
              currentValue={moment(timestamp).format("YYYY-MM-DDTHH:mm")}
              onChange={(value: string) => {
                setTimestamp(new Date(value).getTime());
              }}
              style={{ color: "red" }}
            />
          ) : (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <StyledDatesContainer onPress={() => setOpenStart(true)}>
                <StyledDatesTitle>Start:</StyledDatesTitle>
                <StyledDates>
                  {moment(timestamp).format("DD-MM-YY HH:mm")}
                </StyledDates>
              </StyledDatesContainer>
              <DateTimePickerModal
                date={new Date(timestamp)}
                isVisible={openStart}
                mode="datetime"
                onConfirm={(date) => {
                  setOpenStart(false);
                  setTimestamp(date.getTime());
                }}
                onCancel={() => setOpenStart(false)}
              />
            </View>
          )}
          <SubmitPressable style={{ marginTop: 50 }} onPress={handleNewRequest}>
            <SubmitPressableText>Solicitar Troca</SubmitPressableText>
            <IconContainer>
              <MaterialCommunityIcons
                name="calendar-sync-outline"
                size={20}
                color={Colors.light.white}
              />
            </IconContainer>
          </SubmitPressable>
        </StyledForm>
      </StyledNewRequest>
    </StyledNewRequestScreen>
  );
}

export default NewRequest;

const StyledNewRequest = styled.ScrollView`
  padding: ${defaultPadding}px;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.light.white};
`;

const StyledNewRequestScreen = styled.KeyboardAvoidingView`
  flex: 1;
  width: ${dimensions.window.width}px;
  height: ${dimensions.window.height}px;
`;

const StyledDatesContainer = styled.Pressable`
  display: flex;
  /* flex-direction: row; */
  margin-bottom: 30px;
  font-size: 18px;
  border: 1px solid ${Colors.light["dark-gray"]};
  border-radius: 5px;
  padding: 10px;
  width: 48%;
`;
const StyledDatesTitle = styled.Text`
  color: ${Colors.light.black};
  margin-right: 5px;
  font-weight: 600;
`;
const StyledDates = styled.Text`
  color: ${Colors.light["dark-gray"]};
  font-size: 16px;
  border: none;
`;
