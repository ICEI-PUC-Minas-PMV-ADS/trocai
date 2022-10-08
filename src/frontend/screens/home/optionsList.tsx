import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { LOGGED_USER_REDUCER_OPTIONS } from "../../reducers/loggedUser";
import { SELECTED_USER_REDUCER_OPTIONS } from "../../reducers/selectedUserReducer";
import Colors from "../../constants/Colors";
import { checkIfTokenIsExpired } from "../../services/loggedInServices";
import ConfirmationDialog from "../../common/confirmationDialog";

interface ItemProps {
  to: string;
  text: string;
  icon: string;
}
function OptionsList(): JSX.Element {
  const [showDialog, setShowDialog] = useState(false);
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [userIsManager, setUserIsManager] = useState(false);
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );
  const [user, setUser] = useState(loggedUser?.result);

  useEffect(() => {
    setUser(loggedUser?.result);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUser]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SELECTED_USER_REDUCER_OPTIONS.SET_SELECTED_USER,
      payload: null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      setUserIsLogged(true);
      if (user.isManager) setUserIsManager(true);
      checkIfTokenIsExpired().then((response) => response && handleLogOut());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function handleLogOut(): void {
    dispatch({ type: LOGGED_USER_REDUCER_OPTIONS.LOGOUT_USER });
    setUserIsLogged?.(false);
    setShowDialog(false);
  }

  let listData: ItemProps[] = [
    { text: "My Profile ", to: "Profile", icon: "person" },
  ];

  if (!userIsLogged) {
    listData = [{ text: "Login", to: "Login", icon: "login" }];
  } else if (userIsManager) {
    listData.push(
      { text: "Users", to: "UsersList", icon: "person-search" },
      { text: "Add new User", to: "AddUser", icon: "add" }
    );
  }
  return (
    <View style={{ marginBottom: 50 }}>
      {listData.map((item) => (
        <OptionListItem item={item} key={item.text} />
      ))}
      {user && (
        <OptionListButton onPress={() => setShowDialog(true)}>
          <ButtonIcon>
            <MaterialIcons size={40} name="logout" color="white" />
          </ButtonIcon>
          <ButtonText>Logout </ButtonText>
        </OptionListButton>
      )}
      {showDialog ? (
        <ConfirmationDialog
          onCancel={() => setShowDialog(false)}
          onDelete={() => handleLogOut()}
          text="logout"
        />
      ) : null}
    </View>
  );
}

export default OptionsList;
function OptionListItem({ item }: { item: ItemProps }) {
  const navigation = useNavigation();
  return (
    <OptionListButton onPress={() => navigation.navigate(item.to)}>
      <ButtonIcon>
        <MaterialIcons size={40} name={item.icon} color="white" />
      </ButtonIcon>
      <ButtonText>{item.text}</ButtonText>
    </OptionListButton>
  );
}
OptionsList.defaultProps = {
  isNav: false,
};

const OptionListButton = styled.Pressable`
  width: 300px;
  padding: 20px;
  background: ${Colors.light["light-blue"]};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  font-size: 22px;
  color: white;
  font-weight: bold;
`;

const ButtonIcon = styled.View`
  width: 80px;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;
