import React, { useState } from "react";
import { StyleSheet, View as SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import PageHeader from "../../common/pageHeader";
import {
  StyledLabel,
  StyledInput,
  StyledForm,
  SubmitPressable,
  SubmitPressableText,
} from "../../common/styled";
import Colors from "../../constants/Colors";
import { createUser } from "../../actions/userActions";
import { defaultPadding } from "../../constants/Layout";
import { RootStackScreenProps } from "../../types";

function SignupScreen({
  navigation,
}: RootStackScreenProps<"Signup">): JSX.Element {
  const isFlowLogin = false;

  const dispatch = useDispatch(); // hook to call action

  // Hook do estado para o objeto do novo usuario
  const [newUser, setNewUser] = useState<ISignupParams>({} as ISignupParams);
  const handleRegisterUser = () => {
    console.log(`Cadastrando usuario... ${JSON.stringify(newUser)}`);
    dispatch(createUser(newUser, navigation, isFlowLogin));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledSignUp behavior="padding">
        <PageHeader pageName="SignUp" navigation={navigation} />

        <SafeAreaView style={styles.input}>
          <StyledLabel>First Name</StyledLabel>

          <StyledInput
            textContentType="name"
            value={newUser?.firstName}
            onChangeText={(value) =>
              setNewUser({ ...newUser, firstName: value })
            }
          />
        </SafeAreaView>

        <SafeAreaView style={styles.input}>
          <StyledLabel>Last Name</StyledLabel>

          <StyledInput
            textContentType="name"
            value={newUser?.lastName}
            onChangeText={(value) =>
              setNewUser({ ...newUser, lastName: value })
            }
          />
        </SafeAreaView>

        <SafeAreaView style={styles.input}>
          <StyledLabel>Email</StyledLabel>

          <StyledInput
            textContentType="name"
            value={newUser?.email}
            onChangeText={(value) => setNewUser({ ...newUser, email: value })}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.input}>
          <StyledLabel>Password</StyledLabel>

          <StyledInput
            textContentType="password"
            secureTextEntry
            value={newUser?.password}
            onChangeText={(value) =>
              setNewUser({ ...newUser, password: value })
            }
          />
        </SafeAreaView>

        <StyledForm>
          <SubmitPressable
            style={{ marginTop: 50 }}
            onPress={handleRegisterUser}
          >
            <SubmitPressableText>Sign up</SubmitPressableText>
            <MaterialIcons size={30} name="input" color="white" />
          </SubmitPressable>
        </StyledForm>

        <StyledLoginLink
          style={{ color: Colors.light["dark-blue"], fontSize: 15 }}
          onPress={() => navigation.navigate("Login")}
        >
          Already have an account? Login here!
        </StyledLoginLink>
      </StyledSignUp>
    </SafeAreaView>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  input: {
    margin: 8,
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

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

const StyledSignUp = styled.KeyboardAvoidingView`
  padding: ${defaultPadding}px;
  display: flex;
  flex-direction: column;
  background-color: #f7d08a;
`;
