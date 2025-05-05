import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import lungSound from "../../assets/data";
import { Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ListOfFolders } from "../Auth/FetchFolders";


const Reports = () => {
  const [allFolders , setAllFolders] = useState([]);
  const navigation = useNavigation();

  useEffect(()=>{
    const fetchFolders = async () => {
      try{
        const folders = await ListOfFolders();
        setAllFolders(folders)
        console.log('Fetched Folders: ', folders )
      }catch {
        console.error("Error fetching folders:", error);
      }
    }

    fetchFolders();
  }, [])
  console.log("repots has been opend");
  const handleDownload = (item) => {
    // console.log("Downloadin item:\n", item);
    navigation.navigate("Temp Download", { item });
  };
  return (
    <LinearGradient
    colors={["#fbc2eb", "#e0e0e0", "#a6c1ee"]}
      style={styles.gradient}
    >
      
      <ScrollView>
        {/* <Text>Reports</Text> */}
        {allFolders.map((item, index) => (
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
                  <Text>Date: {item[6]}{item[7]}/{item[4]}{item[5]}/{item[0]}{item[1]}{item[2]}{item[3]} </Text>

                  <Text>Time: {item[9]}{item[10]}:{item[11]}{item[12]}:{item[13]}{item[14]}</Text>
                </View>
                <TouchableOpacity
                  style={styles.dowloadIcon}
                  // onPress={() => {
                  //   handleDownload(item);
                  // }}
                  onPress={() => navigation.navigate("Detailed Report", { item })}
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
    </LinearGradient>
  );
};

export default Reports;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    // backgroundColor: "rgba(51, 163, 176, 0.8)",
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
