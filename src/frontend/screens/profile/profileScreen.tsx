import React from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackScreenProps } from "../../types";
import Colors from "../../constants/Colors";
import { defaultPadding } from "../../constants/Layout";
import PageHeader from "../../common/pageHeader";
import SelectedAssetButtons from "../../common/selectedAssetButtons";
import { deleteUser } from "../../actions/userActions";

function Perfil({
  navigation,
  route,
}: RootStackScreenProps<"Profile" | "SelectedUser">): JSX.Element {
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );

  const user = loggedUser?.result;
  const dispatch = useDispatch();
  console.log(loggedUser.username);
  const onDelete = (): void => {
    dispatch(deleteUser(user));
    navigation.navigate("UsersList");
  };

  return (
    <StyledSelectedUser>
      <PageHeader pageName="My Profile" navigation={navigation} />
      {route.name === "Profile" ? null : (
        <SelectedAssetButtons
          onDelete={onDelete}
          onEdit={() => navigation.navigate("EditProfile", { user })}
        />
      )}
      <StyledUserName>
        {user.firstName} {user.lastName}
      </StyledUserName>

      <StyledStrong>email</StyledStrong>
      <StyledUserProp>{loggedUser.username}</StyledUserProp>

      <StyledStrong>manager</StyledStrong>
      <StyledUserProp>{user.isManager ? "Yes" : "No"}</StyledUserProp>

    </StyledSelectedUser>
  );
}

export default Perfil;

const StyledSelectedUser = styled.SafeAreaView`
  padding: ${defaultPadding}px;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  background-color: white;
`;

const StyledUserName = styled.Text`
  font-size: 20px;
  padding-top: ${defaultPadding}px;
  margin-bottom: 25px;
  color: ${Colors.dark["dark-blue"]};
`;

const StyledStrong = styled.Text`
  color: ${Colors.dark["dark-blue"]};
  text-transform: uppercase;
  font-weight: bold;
`;

const StyledUserProp = styled.Text`
  color: ${Colors.dark.black};
  margin-bottom: 25px;
`;

const BookingsTitleContainer = styled.View`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 20px;
`;
