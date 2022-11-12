import React from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { RootStackScreenProps } from "../../types";
import Colors from "../../constants/Colors";
import { defaultPadding } from "../../constants/Layout";
import PageHeader from "../../common/pageHeader";
import SelectedAssetButtons from "../../common/selectedAssetButtons";
import { deleteUser } from "../../actions/userActions";
import { PaddingView } from "../../common/styled";

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
      <PaddingView>
        <PageHeader pageName="Meu Perfil" navigation={navigation} />
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
      </PaddingView>
    </StyledSelectedUser>
  );
}

export default Perfil;

const StyledSelectedUser = styled.SafeAreaView`
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
