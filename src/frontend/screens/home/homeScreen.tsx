import { Text, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import Lamp from "./lamp";
import OptionsList from "./optionsList";
import Colors from "../../constants/Colors";
import LogoWithText from "../img/logoWithText";

function HomePage(): JSX.Element {
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );

  // eslint-disable-next-line global-require
  const homeImg = require("../../assets/images/home-img.jpeg");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.white }}>
      <HomeScreenContainer>
        <Header>
          <LogoWithText textColor={Colors.light.white} height={40} />
        </Header>
        <ImageContainer>
          <HomeImg source={homeImg} />
        </ImageContainer>
        {loggedUser ? null : (
          <LampContainer>
            <Lamp />
            <Text>
              Plataforma de troca de turnos para facilitar a vida dos gestores
              de equipes.
            </Text>
          </LampContainer>
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
    display: "flex",
    flexDirection: "column",
    marginBottom: "40px",
    width: "100%",
    height: "100%",
    backgroundColor: Colors.light.white,
  },
}))``;

const LampContainer = styled.View`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const Header = styled.View`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${Colors.light["light-blue"]};
`;

const ImageContainer = styled.View`
  width: 100vw;
  height: 50vw;
  max-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  overflow: hidden;
  position: relative;
`;

const HomeImg = styled.Image`
  position: absolute;
  width: 100vw;
  height: 100vw;
  max-width: 1000px;
  max-height: 900px;
  top: -50%;
`;
