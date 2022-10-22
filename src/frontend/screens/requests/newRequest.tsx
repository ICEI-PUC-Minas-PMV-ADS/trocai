import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Platform, View, FlatList, ListRenderItem } from "react-native";
import styled from "styled-components/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { RadioButton } from "react-native-paper";
import PageHeader from "../../common/pageHeader";
import {
  SubmitPressableText,
  SubmitPressable,
  IconContainer,
} from "../../common/styled";
import Colors from "../../constants/Colors";
import dimensions, { defaultPadding } from "../../constants/Layout";
import { RootStackScreenProps } from "../../types";
import WebPicker from "./webPicker";
import { fetchEmployees } from "../../services/api";
import ConfirmationDialog from "../../common/confirmationDialog";

function NewRequest({
  navigation,
}: RootStackScreenProps<"NewRequest">): JSX.Element {
  const [openStart, setOpenStart] = useState(false);
  const [timestamp, setTimestamp] = useState(new Date().getTime());
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [selectedShift, setSelectedShift] = useState<Shift>("MANHA");
  useEffect(() => {
    // const { data } = await fetchEmployees();

    fetchEmployees().then((res) =>
      setEmployees(
        res.data.filter((employee) => employee.turnoPrincipal === selectedShift)
      )
    );
  }, [selectedShift]);

  console.log(employees);
  function handleNewRequest(): void {
    console.log("submit pedido de troca para", selectedEmployee);
    setSelectedEmployee(undefined);
  }

  // precisa ter um request de usuários

  const renderItem: ListRenderItem<Employee> = ({ item }) => (
    <Item employee={item} setShowDialog={setSelectedEmployee} />
  );
  return (
    <StyledNewRequestScreen
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50}
    >
      <StyledNewRequest>
        <PageHeader pageName="Nova Solicitação" navigation={navigation} />
        <StyledNewRequestForm>
          <StyledRadios>
            <StyledRadioContainer>
              <RadioButton
                value="MANHA"
                status={selectedShift === "MANHA" ? "checked" : "unchecked"}
                onPress={() => setSelectedShift("MANHA")}
              />
              <StyledRadioLabel>Manhã</StyledRadioLabel>
            </StyledRadioContainer>
            <StyledRadioContainer>
              <RadioButton
                value="TARDE"
                status={selectedShift === "TARDE" ? "checked" : "unchecked"}
                onPress={() => setSelectedShift("TARDE")}
              />
              <StyledRadioLabel>Tarde</StyledRadioLabel>
            </StyledRadioContainer>
            <StyledRadioContainer>
              <RadioButton
                value="NOITE"
                status={selectedShift === "NOITE" ? "checked" : "unchecked"}
                onPress={() => setSelectedShift("NOITE")}
              />
              <StyledRadioLabel>Noite</StyledRadioLabel>
            </StyledRadioContainer>
          </StyledRadios>
          {Platform.OS === "web" ? (
            <WebPicker
              currentValue={moment(timestamp).format("YYYY-MM-DD")}
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
            <SubmitPressableText>Procurar</SubmitPressableText>
            <IconContainer>
              <MaterialCommunityIcons
                name="calendar-sync-outline"
                size={20}
                color={Colors.light.white}
              />
            </IconContainer>
          </SubmitPressable>
        </StyledNewRequestForm>

        <FlatList
          data={employees}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </StyledNewRequest>
      {selectedEmployee ? (
        <ConfirmationDialog
          onCancel={() => setSelectedEmployee(undefined)}
          onDelete={() => handleNewRequest()}
          text={`request change with ${selectedEmployee.nomeCompleto}`}
          type="submit"
        />
      ) : null}
    </StyledNewRequestScreen>
  );
}

function Item({
  employee,
  setShowDialog,
}: {
  employee: Employee;
  setShowDialog: Dispatch<SetStateAction<Employee | undefined>>;
}) {
  return (
    <ItemContainer>
      <ItemText>{employee.nomeCompleto}</ItemText>
      <ItemText>{employee.turnoPrincipal}</ItemText>
      <ItemAccept>
        <PressableText onPress={() => setShowDialog(employee)}>
          solicitar
        </PressableText>
      </ItemAccept>
    </ItemContainer>
  );
}

export default NewRequest;

const StyledNewRequest = styled.ScrollView`
  padding: ${defaultPadding}px;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.light.white};
`;
const StyledNewRequestForm = styled.View`
  display: flex;
  flex-direction: row;
`;
const StyledRadios = styled.View`
  display: flex;
  flex-direction: row;
`;
const StyledRadioContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const StyledRadioLabel = styled.Text`
  color: ${Colors.light.black};
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

const PressableText = styled(SubmitPressableText)`
  color: white;
  margin: 0;
`;
