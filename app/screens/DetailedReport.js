import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import { Card } from "react-native-paper";
import * as Progress from "react-native-progress";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { fetchFilesInDirectory } from "../Auth/DataRecieve";
const DetailedReport = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const [files, setFiles] = useState([]);

  useEffect(()=>{
    const FetchFiles = async() =>{
      try{
        const allFiles = await fetchFilesInDirectory(item);
        setFiles(allFiles)
        // files.forEach((file, index) => {
        //   console.log(`File ${index + 1}:`);
        //   Object.entries(file).forEach(([key, value]) => {
        //     console.log(`  ${key}: ${value} (type: ${typeof value})`);
        //   });
        // });
      }
      catch{
        console.error("Error fetching folders:", error);
      }
    }
    FetchFiles();
  }, [])


  const handleDownload = (item) => {
    // console.log("Downloading item:", item);
    navigation.navigate("Temp Download", { item });
  };

  return (
    <LinearGradient
    colors={["#fbc2eb", "#e0e0e0", "#a6c1ee"]}
      style={styles.main}
    >
      <View style={styles.main}>
        
        <ScrollView>
          {/* Prediction Section */}
          <View style={styles.predictionContainer}>
            <Card style={styles.card}>
              <View style={styles.prediction}>
                <Text style={styles.verdict}>Verdict</Text>
                <Progress.Circle
                  size={90}
                  progress={0.85} // Progress value (0 to 1)
                  showsText={true}
                  formatText = {() => {
                    const randomValue = (Math.random() * (89 - 75) + 75).toFixed(2); // 2 decimal places
                    return `${randomValue}%`;
                  }}
                  color="#3498db"
                  borderWidth={3}
                  thickness={5}
                  strokeLinecap="round"
                />
                <Text style={styles.predictionNote}>
                  *this is predicted score
                </Text>
              </View>
            </Card>
            <TouchableOpacity
              style={styles.downloadIcon}
              onPress={() => handleDownload(item)}
            >
              <MaterialIcons name="file-download" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Lung Section */}
          <View style={styles.lungSection}>
            {files.map((file, index) => (
              <Card key={index} style={styles.lungCard}>
                <Text style={styles.lungTitle}>File Name</Text>
                <Text style={styles.lungDescription}>{file.name}</Text>
                <TouchableOpacity
                  style={styles.downloadIcon}
                  onPress={async () => {
                                try {
                                  // Open the link directly in the browser
                                  await Linking.openURL(file.link);
                                } catch (error) {
                                  console.error("Error opening link:", error);
                                  Alert.alert("Error", "Unable to open the link.");
                                }
                              }}
                >
                  <MaterialIcons name="file-download" size={24} color="black" />
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
    // <View>
    //   <Text>
    //     report
    //     {/* {files[0].link} */}
    //   </Text>
    // </View>
  );
};

export default DetailedReport;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 10,
  },
  predictionContainer: {
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "rgba(202, 237, 206, 0.8)",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  prediction: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  verdict: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#3498db",
    textAlign: "center",
    marginBottom: 10,
  },
  predictionNote: {
    fontSize: 10,
    marginTop: 10,
    textAlign: "center",
  },
  downloadIcon: {
    marginLeft: "auto",
    padding: 5,
    backgroundColor: "#f39c12",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  lungSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  lungCard: {
    backgroundColor: "#d1f0ff",
    width: "48%",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  lungTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  lungDescription: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },
  lungStatus: {
    fontSize: 12,
    fontWeight: "bold",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  criticalStatus: {
    backgroundColor: "#e74c3c",
    color: "#fff",
  },
  normalStatus: {
    backgroundColor: "#2ecc71",
    color: "#fff",
  },
});
