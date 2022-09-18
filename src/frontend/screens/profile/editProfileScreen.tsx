import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";

import { FAB, RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { StyledInput, StyledLabel } from "../../common/styled";
import PageHeader from "../../common/pageHeader";
import { deleteUser } from "../../actions/userActions";
import dimensions, { defaultPadding } from "../../constants/Layout";

// TODO:
/* precisa descriptografar a senha pra nao ficar
 ** gigante e o usuario achar estranho o tamanho de caracteres
 */
export default function EditProfileScreen() {
  const navigator = useNavigation();

  // Using Redux for to recovery user
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setUser(loggedUser?.result);
  }, [loggedUser]);

  const [user, setUser] = useState(loggedUser?.result);
  const [showPassword, setShowPassword] = useState(false);
  const [isManager, setIsManager] = useState(
    loggedUser?.result?.isManager || false
  );

  // TODO: falta chamar o redux para atualizar os dados do usuario logado.
  const handleUpdateUser = () => {
    const userUpdated = { ...user, isManager };
    console.debug(`Data updated user ${JSON.stringify(userUpdated)}`);
    return navigator.goBack();
  };

  const handleDeleteProfile = () => {
    console.log(`Deletando profile... ${JSON.stringify(loggedUser?.result)}`);
    dispatch(deleteUser(user));
    navigator.navigate("Login");
  };

  return (
    <StyledEditProfileScreen>
      <PageHeader pageName="Edit Profile" navigation={navigator} />

      <StyledScrollView>
        <View style={styles.input}>
          <StyledLabel>First Name</StyledLabel>
          <StyledInput
            textContentType="name"
            value={user?.firstName}
            onChangeText={(value) => setUser({ ...user, firstName: value })}
          />

          <StyledLabel>Last Name</StyledLabel>
          <StyledInput
            textContentType="name"
            value={user?.lastName}
            onChangeText={(value) => setUser({ ...user, lastName: value })}
          />

          <StyledLabel>Email</StyledLabel>
          <StyledInput
            textContentType="emailAddress"
            value={user?.email}
            onChangeText={(value) => setUser({ ...user, email: value })}
          />

          <StyledLabel>Password</StyledLabel>
          <StyledInput
            textContentType="password"
            secureTextEntry={!showPassword}
            value={user?.password}
            onChangeText={(value) => setUser({ ...user, password: value })}
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
              color={Colors.light.yellow}
              value="no"
              status={!isManager ? "checked" : "unchecked"}
              onPress={() => setIsManager(!isManager)}
            />
          </View>
        </View>
        <OptionListButton onPress={handleUpdateUser}>
          <ButtonText>Save</ButtonText>
          <MaterialIcons size={30} name="save" color="white" />
        </OptionListButton>
      </StyledScrollView>

      <FAB
        style={styles.fabDelete}
        icon="delete"
        onPress={handleDeleteProfile}
      />
    </StyledEditProfileScreen>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 8,
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  fabDelete: {
    position: "absolute",
    margin: 16,
    right: 10,
    bottom: 10,
    backgroundColor: "white",
  },
});

const OptionListButton = styled.Pressable`
  padding: 10px;
  background: ${Colors.light["dark-blue"]};
  border-radius: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const StyledScrollView = styled.ScrollView``;
const StyledIsManagerLabel = styled(StyledLabel)`
  margin: 0;
  margin-right: 40px;
`;

const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;

const StyledEditProfileScreen = styled.SafeAreaView`
  padding: ${defaultPadding}px;
  background-color: white;
  height: ${dimensions.window.height}px;
`;
