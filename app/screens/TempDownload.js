import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const TempDownload = ({ route }) => {
  const { item } = route.params;
  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.gradient}
    >
      <View>
        <Text style={styles.textTemp}>{item.date}</Text>
        <Text style={styles.textTemp}>{item.time}</Text>
        <Text style={styles.textTemp}>{item.LL1}</Text>
        <Text style={styles.textTemp}>{item.LL2}</Text>
        <Text style={styles.textTemp}>{item.LL3}</Text>
        <Text style={styles.textTemp}>{item.RR1}</Text>
        <Text style={styles.textTemp}>{item.RR2}</Text>
        <Text style={styles.textTemp}>{item.RR3}</Text>
      </View>
    </LinearGradient>
  );
};

export default TempDownload;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  textTemp: { color: "#ffff", fontSize: 25, alignSelf: "center" },
});
