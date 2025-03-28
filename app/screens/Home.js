import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import UserCard from "../userCard";
import LatestReport from "./LatestReport";
import { Button, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  heading: {
    marginTop: 15,
    paddingLeft: 15,
    fontSize: 24,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#fff",
  },
  card: {
    backgroundColor: "rgba(202, 237, 206, 0.8)",
    borderRadius: 15,
    padding: 25,
    margin: 15,
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
    color: "#000",
    textAlign: "center",
  },
});
