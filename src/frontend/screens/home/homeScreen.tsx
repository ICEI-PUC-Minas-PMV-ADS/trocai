import { Text, SafeAreaView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import Lamp from "./lamp";
import Logo from "./logo";
import OptionsList from "./optionsList";

function HomePage(): JSX.Element {
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreenContainer>
        <Banner>
          <Logo />
        </Banner>
        {loggedUser ? null : (
          <>
            <LampContainer>
              <Lamp />
              <Text>
              Plataforma de empréstimo de bicicletas como alternativa de transporte nos grandes centros urbanos.
              </Text>
            </LampContainer>
          </>
        )}
        <OptionsList />
      </HomeScreenContainer>
    </SafeAreaView>
  );
}

export default HomePage;

const HomeScreenContainer = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: "center",
  },
}))`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  width: 100%;
  height: 100%;
  background-color: white;
`;

const Banner = styled.View`
  width: 100%;
  height: 400px;
  min-height: 50%;
  background-color: #f7d08a;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LampContainer = styled.View`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 40px;
  margin-bottom: 40px;
`;
const TimeContainer = styled(LampContainer)``;
