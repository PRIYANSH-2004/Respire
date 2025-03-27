import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import lungSound from "../../assets/data";
import { Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Reports = () => {
  console.log("repots has been opend");
  const navigation = useNavigation();
  const handleDownload = (item) => {
    // console.log("Downloadin item:\n", item);
    navigation.navigate("Temp Download", { item });
  };
  return (
    <View>
      <ScrollView>
        {/* <Text>Reports</Text> */}
        {lungSound.map((item, index) => (
          <View key={index}>
            <Card
              style={styles.card}
              onPress={() => navigation.navigate("Detailed Report", { item })}
            >
              <View style={styles.cardRow}>
                <View style={styles.indexBox}>
                  <Text style={styles.indexText}>{index + 1}</Text>
                </View>
                <View>
                  <Text>Date: {item.date}</Text>

                  <Text>Time: {item.time}</Text>
                </View>
                <TouchableOpacity
                  style={styles.dowloadIcon}
                  onPress={() => {
                    handleDownload(item);
                  }}
                >
                  <MaterialIcons
                    name="file-download"
                    size={24}
                    // color="#3498db"
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </Card>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Reports;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "rgba(51, 163, 176, 0.8)",
    padding: 25,
    margin: 10,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  indexBox: {
    backgroundColor: "#3498db",
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  indexText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  dowloadIcon: {
    marginLeft: 100, // this is hardcoded make sure to change this
    padding: 5,
  },
});
