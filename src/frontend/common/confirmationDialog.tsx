import React from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import Colors from "../constants/Colors";
import dimensions from "../constants/Layout";

interface Props {
  onDelete: () => void;
  onCancel: () => void;
  text?: string;
}

function ConfirmationDialog({
  onDelete,
  onCancel,
  text = "",
}: Props): JSX.Element {
  return (
    <StyledConfirmationDialog
      visible
      animationType="fade"
      onRequestClose={onCancel}
      transparent
    >
      <StyledContainer>
        <StyledBackdrop />
        <StyledDialog>
          <StyledText>Are you sure you want to {text}?</StyledText>
          <Pressable onPress={onDelete} accessibilityLabel="Yes, confirm">
            <StyledConfirmText>Yes</StyledConfirmText>
          </Pressable>
          <Pressable onPress={onCancel} accessibilityLabel="Cancel">
            <StyledCancelText>Cancel</StyledCancelText>
          </Pressable>
        </StyledDialog>
      </StyledContainer>
    </StyledConfirmationDialog>
  );
}

ConfirmationDialog.defaultProps = {
  text: "remove",
};

export default ConfirmationDialog;
const StyledBackdrop = styled.View`
  width: ${dimensions.window.width}px;
  height: ${dimensions.window.height}px;
  background: black;
  opacity: 0.3;
  position: absolute;
  top: 0;
  left: 0;
`;
const StyledContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${dimensions.window.width}px;
  height: ${dimensions.window.height}px;
`;
const StyledDialog = styled.View`
  padding: 35px;
  background-color: white;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
`;
const StyledText = styled.Text`
  width: 100%;
  color: ${Colors.light.black};
  margin-bottom: 40px;
`;
const StyledConfirmText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 25px;
  padding: 20px;
  border-radius: 5px;
  background-color: ${Colors.light.red};
  margin-bottom: 20px;
  font-weight: 900;
  text-align: center;
`;
const StyledCancelText = styled(StyledConfirmText)`
  background: ${Colors.light["dark-blue"]};
`;

const StyledConfirmationDialog = styled.Modal`
  width: ${dimensions.window.width}px;
  height: ${dimensions.window.height}px;
`;
