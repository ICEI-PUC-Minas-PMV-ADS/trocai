import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import PageHeader from "../../common/pageHeader";
import {
  SubmitPressable,
  SubmitPressableText,
  StyledInput,
  StyledLabel,
  IconContainer,
} from "../../common/styled";
import UserInfo from "../../common/userInfo";
import { createUser, updateUser } from "../../actions/userActions";
import { RootStackScreenProps } from "../../types";
import Colors from "../../constants/Colors";
import { defaultPadding } from "../../constants/Layout";

export const OCASIONS = {
  SIGNUP: "Signup",
  CREATE: "AddUser",
  EDIT: "EditProfile",
} as const;

function UserProfileForm({
  navigation,
  route,
}: RootStackScreenProps<"Signup" | "AddUser" | "EditProfile">): JSX.Element {
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );
  const selectedUser = route.params?.user;
  const [isLoggedIn] = useState(loggedUser);
  const [firstName, setFirstName] = useState(selectedUser?.firstName || ``);
  const [lastName, setLastName] = useState(selectedUser?.lastName || ``);
  const [email, setEmail] = useState(selectedUser?.email || ``);
  const [isManager, setIsManager] = useState(selectedUser?.isManager || false);
  const [password, setPassword] = useState(``);

  const dispatch = useDispatch();

  function handleSubmit(): void {
    const postParams = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      isManager,
    };
    if (selectedUser) {
      dispatch(
        updateUser({ ...postParams, userId: selectedUser._id }, navigation)
      );
    } else {
      dispatch(createUser(postParams, navigation, !isLoggedIn));
    }
  }

  useEffect(() => {
    if (selectedUser) {
      setFirstName(selectedUser.firstName);
      setLastName(selectedUser.lastName);
      setEmail(selectedUser.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  const pageName = {
    [OCASIONS.SIGNUP]: "Signup",
    [OCASIONS.CREATE]: "Add new user",
    [OCASIONS.EDIT]: "Edit user",
  };
  return (
    <StyledEditProfileScreen>
      <PageHeader pageName={pageName[route.name]} navigation={navigation} />

      <StyledScrollView>
        <View>
          <StyledLabel>First Name</StyledLabel>
          <StyledInput
            textContentType="name"
            value={firstName}
            onChangeText={(value) => setFirstName(value)}
          />

          <StyledLabel>Last Name</StyledLabel>
          <StyledInput
            textContentType="name"
            value={lastName}
            onChangeText={(value) => setLastName(value)}
          />

          <UserInfo
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLogin
          />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <StyledIsManagerLabel>Is Manager?</StyledIsManagerLabel>
            <Text>Yes</Text>
            <RadioButton
              color={Colors.light.yellow}
              value="yes"
              status={isManager ? "checked" : "unchecked"}
              onPress={() => setIsManager(!isManager)}
            />
            <Text>No</Text>
            <RadioButton
              color={Colors.light.black}
              value="no"
              status={!isManager ? "checked" : "unchecked"}
              onPress={() => setIsManager(!isManager)}
            />
          </View>
        </View>
        <SubmitPressable
          onPress={() => handleSubmit()}
          style={{ alignSelf: "center" }}
        >
          <SubmitPressableText>Save</SubmitPressableText>
          <IconContainer>
            <MaterialIcons size={20} name="save" color="white" />
          </IconContainer>
        </SubmitPressable>

        <StyledLoginLink
          style={{ color: Colors.light["dark-blue"], fontSize: 15 }}
          onPress={() => navigation.navigate("Login")}
        >
          Already have an account? Log in here!
        </StyledLoginLink>
      </StyledScrollView>
    </StyledEditProfileScreen>
  );
}

const StyledScrollView = styled.ScrollView``;
const StyledIsManagerLabel = styled(StyledLabel)`
  margin: 0;
  margin-right: 40px;
`;

const StyledEditProfileScreen = styled.SafeAreaView`
  padding: ${defaultPadding}px;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.light.white};
`;

const StyledLoginLink = styled.Text.attrs(() => ({
  contentContainerStyle: {
    alignItems: "center",
  },
}))`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  width: 100%;
  height: 100%;
`;
export default UserProfileForm;
