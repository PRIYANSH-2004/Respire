import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Home from "./app/screens/Home";
import Reports from "./app/screens/Reports";
import PairDevice from "./app/screens/PairDevice";
import FileTransfer from "./app/screens/FileTransfer";
import DetailedReport from "./app/screens/DetailedReport";
import TempDownload from "./app/screens/TempDownload";

// Create the stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Reports" component={Reports} />
        <Stack.Screen name="Pair Device" component={PairDevice} />
        <Stack.Screen name="File Transfer" component={FileTransfer} />
        <Stack.Screen name="Detailed Report" component={DetailedReport} />
        <Stack.Screen name="Temp Download" component={TempDownload} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor:"red",
  },
});
