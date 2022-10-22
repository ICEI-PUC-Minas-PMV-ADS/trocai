/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { RootStackParamList } from "../types";

// const prefix = Linking.createURL("/");
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        path: "/",
        initialRouteName: "HomeScreen",
        screens: {
          HomeScreen: "/",
        },
      },
      Login: "/Login",
      Signup: "/Signup",
      NewRequest: "/NewRequest",
      RequestFromOthers: "/RequestFromOthers",
      MyRequests: "/MyRequests",
      Profile: "/Profile",
      NotFound: "*",
    },
  },
};

export default linking;
