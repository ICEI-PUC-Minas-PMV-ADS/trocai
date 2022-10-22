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
    | "NewRequest"
    | "RequestFromOthers"
  >;
  addOption?: "AddUser";
}

function PageHeader({ pageName, navigation, addOption }: IProps): JSX.Element {
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );

  return (
    <StyledPageHeader>
      <StyledBackArrow onPress={() => navigation.navigate("Root")}>
        <AntDesign size={25} name="arrowleft" color={Colors.light.white} />
      </StyledBackArrow>
      <StyledPageTitle style={{ color: Colors.light.black }}>
        {pageName}
      </StyledPageTitle>
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
  background-color: ${Colors.light.red};
  color: ${Colors.light.white};
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 10px; */
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
  line-height: 25px;
  margin-left: 15px;
  font-weight: bold;
`;

const StyledAddButton = styled.Pressable`
  margin-left: auto;
`;
