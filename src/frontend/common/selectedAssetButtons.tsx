import React, { useState } from "react";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import ConfirmationDialog from "./confirmationDialog";
import { defaultPadding } from "../constants/Layout";
import Colors from "../constants/Colors";

interface IProps {
  onDelete: () => void;
  onEdit: () => void;
}

function SelectedAssetButtons({
  onDelete,
  onEdit,
}: IProps): JSX.Element | null {
  const [showModal, setShowModal] = useState(false);

  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );
  function handleDelete(): void {
    onDelete();
    setShowModal(false);
  }

  const { isManager } = loggedUser.result;

  if (!isManager) return null;

  return (
    <StyledSelectedAssetButtons>
      <StyledButton aria-label="editar" onPress={onEdit}>
        <FontAwesome name="edit" size={30} color={Colors.light["dark-blue"]} />
      </StyledButton>
      <StyledButton onPress={() => setShowModal(true)} aria-label="deletar">
        <FontAwesome name="trash" size={30} color={Colors.light.red} />
      </StyledButton>
      {showModal ? (
        <ConfirmationDialog
          onCancel={() => setShowModal(false)}
          onDelete={() => handleDelete()}
        />
      ) : null}
    </StyledSelectedAssetButtons>
  );
}

export default SelectedAssetButtons;

const StyledSelectedAssetButtons = styled.View`
  width: auto;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: ${defaultPadding + 30}px;
  right: ${defaultPadding}px;
`;

const StyledButton = styled.Pressable`
  margin-left: 15px;
`;
