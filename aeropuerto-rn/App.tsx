import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AirlinesScreen from "./src/screens/AirlinesScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
// import FlightEvents from "./src/screens/FlightEventsScreen";

import { registerRootComponent } from "expo";
import type { RootStackParamList } from "./src/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Menú" }} />
        <Stack.Screen name="Airlines" component={AirlinesScreen} options={{ title: "Airlines" }} />
        {/*  <Stack.Screen name="VehicleServices" component={VehicleServicesScreen} options={{ title: "Vehicle Services" }} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);