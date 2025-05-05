import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Card, Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Reports from "./screens/Reports";

const UserCard = ({ userName }) => {
  return (
    <LinearGradient
      colors={["rgba(51, 176, 107, 0.8)", "rgba(34, 87, 58, 0.8)"]}
      style={styles.main}
    >
      <Card
        style={styles.card}
        onPress={() => {
          console.log("Card Pressed");
        }}
        // onPress={<Reports/>}
      >
        <View
          style={styles.header}
          // onPress={()=>{console.log("Card Pressed")}}
        >
          <Avatar.Image
            size={50}
            source={require("../assets/user.png")}
            style={styles.avatar}
          />
          {/* <Ionicons name="settings-outline" size={24} color="black" /> */}
          <Image
            source={require("../assets/RespireLogo2.png")}
            style={styles.logo}
          />
        </View>

        <Text style={styles.patientText}>Patient</Text>
        <Text style={styles.name}>{userName}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Age{"\n"}
            <Text style={styles.boldText}>20 yrs</Text>
          </Text>
          <Text style={styles.infoText}>
            Gender{"\n"}
            <Text style={styles.boldText}>Male</Text>
          </Text>
          <Text style={styles.infoText}>
            Mobile No.{"\n"}
            <Text style={styles.boldText}>7891000444</Text>
          </Text>
        </View>
      </Card>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  main: {
    borderRadius: 15,
    marginTop: 50,
    margin: 20,
    position: "relative",
    overflow: "hidden",
    width: "90%",
  },
  card: {
    backgroundColor: "rgba(202, 237, 206, 0.8)",
    borderRadius: 15,
    padding: 20,
    margin: 15,
    width: "90%",
    height: "auto",
    alignSelf: "center",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  patientText: {
    color: "black",
    fontSize: 14,
    fontWeight: "400",
  },
  name: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  infoText: {
    color: "black",
    fontSize: 12,
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  avatar: {
    position: "relative",
    bottom: 10,
    right: 10,
  },
});

export default UserCard;
