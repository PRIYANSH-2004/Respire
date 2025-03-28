import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
const PairDevice = () => {
  console.log("Pair device has been opend");
  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.gradient}
    >
      <View>
        <Text style={{ color: "#ffff", fontSize: 25, alignSelf: "center" }}>
          PairDevice page is here
        </Text>
      </View>
    </LinearGradient>
  );
};

export default PairDevice;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
