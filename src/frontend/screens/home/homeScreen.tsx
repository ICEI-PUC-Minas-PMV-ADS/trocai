import { Text, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import Lamp from "./lamp";
import OptionsList from "./optionsList";
import dimensions from "../../constants/Layout";
import Colors from "../../constants/Colors";

function HomePage(): JSX.Element {
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );

  // eslint-disable-next-line global-require
  const homeImg = require("../../assets/images/home-img.jpeg");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreenContainer>
        <ImageContainer>
          <HomeImg source={homeImg} />
        </ImageContainer>
        {loggedUser ? null : (
          <LampContainer>
            <Lamp />
            <Text>
              Plataforma de empréstimo de bicicletas como alternativa de
              transporte nos grandes centros urbanos.
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
    paddingBottom: "40px",
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

const ImageContainer = styled.View`
  width: 100%;
  height: ${dimensions.window.height * 0.65};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  overflow: hidden;
  position: relative;
`;

const HomeImg = styled.Image`
  position: absolute;
  width: 1366px;
  height: 1366px;
  top: -50%;
`;
