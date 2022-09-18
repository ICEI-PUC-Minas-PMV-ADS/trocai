import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation/Navigation";
import { persistor, reduxStore } from "./reduxStore";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <Provider store={reduxStore}>
        <PersistGate persistor={persistor}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
