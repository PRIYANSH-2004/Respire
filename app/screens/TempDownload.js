import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TempDownload = ({ route }) => {
  const { item } = route.params;
  return (
    <View>
      <Text>{item.date}</Text>
      <Text>{item.time}</Text>
      <Text>{item.LL1}</Text>
      <Text>{item.LL2}</Text>
      <Text>{item.LL3}</Text>
      <Text>{item.RR1}</Text>
      <Text>{item.RR2}</Text>
      <Text>{item.RR3}</Text>
    </View>
  );
};

export default TempDownload;

const styles = StyleSheet.create({});
