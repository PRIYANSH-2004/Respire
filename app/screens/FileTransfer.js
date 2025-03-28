import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const FileTransfer = () => {
  console.log("File transfer has been opend");
  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.gradient}
    >
      <View>
        <Text style={{ color: "#ffff", fontSize: 25, alignSelf: "center" }}>
          FileTransfer
        </Text>
      </View>
    </LinearGradient>
  );
};

export default FileTransfer;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
