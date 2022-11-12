import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Platform, View, FlatList, ListRenderItem } from "react-native";
import styled from "styled-components/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { Card, RadioButton } from "react-native-paper";
import PageHeader from "../../common/pageHeader";
import {
  SubmitPressableText,
  SubmitPressable,
  IconContainer,
  shadowStyles,
  PaddingView,
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
        <View
          style={{
            width: "100%",
            paddingBottom: 50,
            display: "flex",
            alignItems: "center",
          }}
        >
          <PageHeader pageName="Nova Solicitação" navigation={navigation} />
          <StyledNewRequestForm>
            {Platform.OS === "web" ? (
              <WebPicker
                currentValue={moment(timestamp).format("YYYY-MM-DD")}
                onChange={(value: string) => {
                  setTimestamp(new Date(value).getTime());
                }}
                style={{
                  fontSize: "16px",
                  height: "25px",
                  borderColor: Colors.light["dark-gray"],
                  border: "1px solid",
                  borderRadius: "50px",
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingRight: 40,
                  paddingLeft: 40,
                }}
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
                  style={{ width: "100%", flexGrow: 1 }}
                />
              </View>
            )}
            <StyledRadios>
              <StyledRadioContainer>
                <RadioButton.Android
                  value="MANHA"
                  status={selectedShift === "MANHA" ? "checked" : "unchecked"}
                  onPress={() => setSelectedShift("MANHA")}
                  color={Colors.light.red}
                />
                <StyledRadioLabel>Manhã</StyledRadioLabel>
              </StyledRadioContainer>
              <StyledRadioContainer style={{ marginRight: 40, marginLeft: 40 }}>
                <RadioButton.Android
                  value="TARDE"
                  status={selectedShift === "TARDE" ? "checked" : "unchecked"}
                  onPress={() => setSelectedShift("TARDE")}
                  color={Colors.light.red}
                />
                <StyledRadioLabel>Tarde</StyledRadioLabel>
              </StyledRadioContainer>
              <StyledRadioContainer>
                <RadioButton.Android
                  value="NOITE"
                  status={selectedShift === "NOITE" ? "checked" : "unchecked"}
                  onPress={() => setSelectedShift("NOITE")}
                  color={Colors.light.red}
                />
                <StyledRadioLabel>Noite</StyledRadioLabel>
              </StyledRadioContainer>
            </StyledRadios>
            <SubmitPressable
              style={{ marginTop: 20 }}
              onPress={handleNewRequest}
            >
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
            style={{ width: Platform.OS === "web" ? 400 : "100%" }}
          />
        </View>
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
    <Card style={shadowStyles}>
      <Card.Content>
        <ItemContainer
          style={Platform.OS !== "web" ? { flexDirection: "column" } : null}
        >
          <ItemText>{employee.nomeCompleto}</ItemText>
          <ItemText style={{ margin: 20 }}>{employee.turnoPrincipal}</ItemText>
          <ItemAccept style={buttonStyles}>
            <PressableText onPress={() => setShowDialog(employee)}>
              solicitar
            </PressableText>
          </ItemAccept>
        </ItemContainer>
      </Card.Content>
    </Card>
  );
}

export default NewRequest;

const StyledNewRequest = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: "center",
  },
}))`
  padding: ${defaultPadding}px;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.light.white};
`;

const StyledNewRequestForm = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledRadios = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
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
  width: ${Platform.OS === "web" ? "100vw" : `${dimensions.window.width}px`};
  height: ${Platform.OS === "web" ? "100vh" : `${dimensions.window.height}px`};
`;

const StyledDatesContainer = styled.Pressable`
  display: flex;
  margin-bottom: 30px;
  margin-top: 30px;
  font-size: 18px;
  border: 1px solid ${Colors.light["dark-gray"]};
  border-radius: 5px;
  padding: 10px;
  width: 100%;
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
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  border-radius: 3px;
  align-items: center;
`;

const buttonStyles =
  Platform.OS !== "web" ? { width: "100%", flexGrow: 1 } : null;

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
