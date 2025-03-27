import {
  SurfaceAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import UserCard from "../userCard";
import LatestReport from "./LatestReport";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  return (
    // <LinearGradient

    //         colors={['rgba(51, 176, 107, 0.8)', 'rgba(34, 87, 58, 0.8)']}
    //         style={styles.container}
    //       >
    <View styles={styles.container}>
      <ScrollView>
        <UserCard />
        <LatestReport />
        <Text style={styles.heading}>Device Control</Text>
        <View style={styles.deviceControl}>
          <Card
            style={styles.card}
            onPress={() => navigation.navigate("Pair Device")}
          >
            <Text style={styles.controls}> Pair </Text>
          </Card>

          <Card
            style={styles.card}
            onPress={() => navigation.navigate("File Transfer")}
          >
            <Text style={styles.controls}>FileTransfer</Text>
          </Card>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => console.log("Log Out Pressed")}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
    // </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    marginTop: 15,
    paddingLeft: 15,
    fontSize: 24,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  card: {
    backgroundColor: "rgba(202, 237, 206, 0.8)",
    borderRadius: 15,
    padding: 25,
    margin: 15,
    position: "relative",
    overflow: "hidden",
  },
  deviceControl: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  controls: {
    fontWeight: "600",
    fontSize: 20,
    padding: 0,
  },
  logoutButton: {
    backgroundColor: "#3498db",
    padding: 20,
    borderRadius: 35,
    alignSelf: "center",
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000", // Text color
    textAlign: "center",
  },
});
