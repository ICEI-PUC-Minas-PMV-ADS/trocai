import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login/loginScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import ProfileScreen from "../screens/profile/profileScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTagNavigator";
import HomePage from "../screens/home/homeScreen";
import UserProfileForm from "../screens/profile/UserProfileForm";
import NewRequest from "../screens/requests/newRequest";

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={UserProfileForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewRequest"
        component={NewRequest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;
