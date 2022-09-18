import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Platform } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { loginUser } from "../../actions/userActions";
import PageHeader from "../../common/pageHeader";
import {
  SubmitPressableText,
  StyledForm,
  SubmitPressable,
} from "../../common/styled";
import UserInfo from "../../common/userInfo";
import Colors from "../../constants/Colors";
import dimensions, { defaultPadding } from "../../constants/Layout";
import { RootStackScreenProps } from "../../types";

function Login({ navigation }: RootStackScreenProps<"Login">): JSX.Element {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [userNotFound, setUserNotFound] = useState(false);
  const dispatch = useDispatch();
  function handleLogin(): void {
    dispatch(
      loginUser(
        { email: email.toLowerCase(), password },
        navigation,
        setUserNotFound
      )
    );
  }

  return (
    <StyledLoginScreen
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50}
    >
      <StyledLogin>
        <PageHeader pageName="Login" navigation={navigation} />
        <StyledForm>
          <UserInfo
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLogin
          />
          <SubmitPressable style={{ marginTop: 50 }} onPress={handleLogin}>
            <SubmitPressableText>Login</SubmitPressableText>
            <MaterialIcons size={30} name="login" color="white" />
          </SubmitPressable>
        </StyledForm>

        {userNotFound ? (
          <StyledUserNotFound>USER NOT FOUND</StyledUserNotFound>
        ) : null}
        <StyledSignupLink
          style={{ color: Colors.light["dark-blue"], fontSize: 15 }}
          onPress={() => navigation.navigate("Signup")}
        >
          Need to create an account? Sign up here!
        </StyledSignupLink>
      </StyledLogin>
    </StyledLoginScreen>
  );
}

export default Login;
const StyledSignupLink = styled.Text.attrs(() => ({
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

const StyledUserNotFound = styled.Text`
  color: ${Colors.light.red};
  margin-top: 40px;
  align-self: center;
`;

const StyledLogin = styled.ScrollView`
  padding: ${defaultPadding}px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const StyledLoginScreen = styled.KeyboardAvoidingView`
  flex: 1;
  width: ${dimensions.window.width}px;
  height: ${dimensions.window.height}px;
`;
