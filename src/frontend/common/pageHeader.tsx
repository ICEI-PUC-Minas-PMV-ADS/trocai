import { AntDesign, Entypo } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import Colors from "../constants/Colors";
import { RootStackParamList } from "../types";

interface IProps {
  pageName: string;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    | "Login"
    | "Signup"
    | "AddUser"
    | "EditProfile"
    | "UsersList"
    | "Profile"
    | "SelectedUser"
  >;
  addOption?: "AddUser";
}

function PageHeader({ pageName, navigation, addOption }: IProps): JSX.Element {
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );

  return (
    <StyledPageHeader>
      <StyledBackArrow onPress={() => navigation.goBack()}>
        <AntDesign
          size={40}
          style={{ marginBottom: -3, paddingLeft: 5 }}
          name="arrowleft"
          color={Colors.light.red}
        />
      </StyledBackArrow>
      <StyledPageTitle style={{ color: "black" }}>{pageName}</StyledPageTitle>
      {loggedUser?.result.isManager && addOption ? (
        <StyledAddButton onPress={() => navigation.navigate(addOption)}>
          <Entypo name="plus" size={50} color={Colors.light.yellow} />
        </StyledAddButton>
      ) : null}
    </StyledPageHeader>
  );
}

export default PageHeader;
const StyledBackArrow = styled.Pressable`
  color: ${Colors.light.red};
`;

const StyledPageHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 30px;
  width: 100%;
`;

const StyledPageTitle = styled.Text`
  font-size: 25px;
  margin-left: 15px;
`;

const StyledAddButton = styled.Pressable`
  margin-left: auto;
`;
