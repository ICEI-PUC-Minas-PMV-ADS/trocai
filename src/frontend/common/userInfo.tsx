import React, { Dispatch, SetStateAction, useState } from "react";
import { GestureResponderEvent } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { StyledInput, StyledLabel } from "./styled";

interface IProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  newPassword?: boolean;
  isLogin?: boolean;
}

function UserInfo({
  email,
  setEmail,
  password,
  setPassword,
  newPassword,
  isLogin,
}: IProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (event: GestureResponderEvent) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <>
      <StyledLabel>Email</StyledLabel>
      <StyledInput
        // required
        // autoComplete="email"
        textContentType="emailAddress"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <StyledLabel>
        {newPassword ? "New" : ""} Password{" "}
        {isLogin ? "" : "(8 characters minimum)"}
      </StyledLabel>
      <PasswordContainer>
        <StyledInput
          //   required={!newPassword}
          secureTextEntry={!showPassword}
          //   autoComplete="password"
          textContentType="password"
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        <ShowPasswordPressable onPress={(event) => handleShowPassword(event)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye"}
            size={eyeSize}
          />
        </ShowPasswordPressable>
      </PasswordContainer>
    </>
  );
}

UserInfo.defaultProps = {
  newPassword: false,
  isLogin: false,
};
export default UserInfo;

const PasswordContainer = styled.View`
  position: relative;
  width: 100%;
`;

const eyeSize = 30;
const ShowPasswordPressable = styled.Pressable`
  position: absolute;
  top: 60%;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 20px;
  color: ${Colors.light["dark-gray"]};
  transform: translateY(-${eyeSize / 2}px);
`;
