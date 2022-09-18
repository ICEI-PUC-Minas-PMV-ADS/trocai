import React, { useEffect, useState } from "react";
import { Modal, View } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import setGlobalNotification from "../actions/globalNotificationActions";

interface IProps {
  message: string;
  type: GlobalNotificationType;
}
function GlobalNotification({ message, type }: IProps): JSX.Element {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (message) setShow(true);
    const timer1 = setTimeout(() => handleFadeOut(), 2 * 1000);

    return () => {
      clearTimeout(timer1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, type]);

  function handleFadeOut() {
    setGlobalNotification(dispatch, ``, "success");
    setShow(false);
  }
  return (
    <Modal
      visible={show}
      animationType="fade"
      onRequestClose={() => setShow(false)}
      transparent
    >
      <View
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          paddingTop: 30,
        }}
      >
        <StyledGlobalNotification type={type} onPress={() => setShow(false)}>
          <StyledGlobalNotificationText>{message}</StyledGlobalNotificationText>
        </StyledGlobalNotification>
      </View>
    </Modal>
  );
}

export default GlobalNotification;

const StyledGlobalNotification = styled.Pressable<{ type: string }>`
  background: ${({ type }) => (type === "error" ? "#d85055" : "#78b440")};
  width: 80%;
  padding: 30px;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  min-height: 60px;
  margin: auto;
`;

const StyledGlobalNotificationText = styled.Text`
  text-transform: capitalize;
  font-size: 20px;
  font-weight: bold;
  color: white;
  flex-grow: 1;
  padding-right: 10px;
`;
