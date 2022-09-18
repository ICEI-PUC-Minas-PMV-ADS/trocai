import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { SELECTED_USER_REDUCER_OPTIONS } from "../../reducers/selectedUserReducer";

import PageHeader from "../../common/pageHeader";
import { StyledFilterInput } from "../../common/styled";
import { fetchUsers } from "../../actions/userActions";
import { RootStackScreenProps } from "../../types";
import { defaultPadding } from "../../constants/Layout";

function UsersList({
  navigation,
}: RootStackScreenProps<"UsersList">): JSX.Element {
  const usersData = useSelector(
    (state: { users: IStorageResult[] }) => state.users
  );
  const { showUserWithReservation } = useSelector(
    (state: { searchFilters: ISearchFilters }) => state.searchFilters
  );
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );
  const [filter, setFilter] = useState("");
  const [filteredList, setFilteredList] = useState(usersData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SELECTED_USER_REDUCER_OPTIONS.SET_SELECTED_USER,
      payload: null,
    });

    dispatch(fetchUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filtered = usersData?.reduce(
      (acc: IStorageResult[], user: IStorageResult) => {
        const { email, firstName, lastName } = user;
        const valuesArray = [email, firstName, lastName];
        const matchingValues = valuesArray.filter((value) =>
          value?.toString().toLowerCase().includes(filter.toLowerCase())
        );
        if (matchingValues.length) acc.push(user);

        return acc;
      },
      []
    );

    setFilteredList(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, usersData]);

  const renderItem: ListRenderItem<IStorageResult> = ({ item }) => {
    const isManagersOwnProfile = item._id === loggedUser.result._id;
    const userDoesntHaveReservations = !item.reservations.length;
    if (
      isManagersOwnProfile ||
      (showUserWithReservation && userDoesntHaveReservations)
    )
      return null;
    return (
      <List.Item
        style={styles.listContainer}
        title={`${item.firstName} ${item.lastName}`}
        descriptionNumberOfLines={3}
        onPress={() => {
          navigation.navigate("SelectedUser", { user: item });
        }}
        description={item.email}
      />
    );
  };

  return (
    <StyledUsersList>
      <PageHeader
        pageName="Users"
        navigation={navigation}
        addOption="AddUser"
      />
      <StyledFilterInput
        textContentType="name"
        value={filter}
        onChangeText={(value: string) => setFilter(value)}
      />
      <FlatList
        data={filteredList}
        renderItem={renderItem}
        keyExtractor={(bike) => bike._id}
      />
    </StyledUsersList>
  );
}

export default UsersList;

const StyledUsersList = styled.View`
  padding: ${defaultPadding}px;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: white;
`;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 5,
    elevation: 5,
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
