import { Text, SafeAreaView, Platform } from "react-native";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import Lamp from "./lamp";
import OptionsList from "./optionsList";
import Colors from "../../constants/Colors";
import LogoWithText from "../img/logoWithText";
import dimensions from "../../constants/Layout";

function HomePage(): JSX.Element {
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );

  // eslint-disable-next-line global-require
  const homeImg = require("../../assets/images/home-img.jpeg");

  return (
    <SafeAreaView
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backgroundColor: "white",
        width: "100%",
        flex: 1,
      }}
    >
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

const HomeScreenContainer = styled.View`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding-bottom: 40px;
  background-color: white;
  position: relative;
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
  width: ${Platform.OS === "web" ? "100vw" : `${dimensions.window.width}px`};
  height: ${Platform.OS === "web"
    ? "50vw"
    : `${dimensions.window.width * 0.5}px`};
  max-height: ${Platform.OS === "web"
    ? "50vh"
    : `${dimensions.window.height * 0.5}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  overflow: hidden;
  position: relative;
`;

const HomeImg = styled.Image`
  position: absolute;
  width: ${Platform.OS === "web" ? "100vw" : `${dimensions.window.width}px`};
  height: ${Platform.OS === "web" ? "100vw" : `${dimensions.window.width}px`};
  max-width: 1000px;
  max-height: 900px;
  top: -50%;
`;
