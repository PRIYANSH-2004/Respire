import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Card } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const LatestDate = "23/03/2025";
const LatestTime = "15:46";
const Probbility = 79;
const NewPatient = false;

const LatestReport = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["rgba(51, 176, 107, 0.8)", "rgba(34, 87, 58, 0.8)"]}
      style={styles.main}
    >
      {!NewPatient ? (
        <Card style={styles.card}>
          <View style={styles.box}>
            <View style={styles.details}>
              <Text style={styles.title}>Last Data</Text>
              <View style={styles.dateTime}>
                <Text style={styles.time} numberOfLines={1}>
                  Date: {LatestDate}
                </Text>
                <Text style={styles.time}>Time: {LatestTime}</Text>
              </View>
            </View>
            <View style={styles.prediction}>
              <Text style={styles.verdict}>Verdict</Text>
              <Progress.Circle
                size={90}
                progress={Probbility / 100} // Progress value (0 to 1)
                showsText={true}
                formatText={() => `${Probbility}%`}
                color="#3498db"
                borderWidth={3}
                thickness={5}
                strokeLinecap="round"
              />
              <Text style={styles.predictionNote}>
                *this is predicted score
              </Text>
            </View>
          </View>
          <View style={styles.reportButton}>
            <Button
              title="Go to Reports"
              onPress={() => navigation.navigate("Reports")}
            />
          </View>
        </Card>
      ) : (
        <Card style={styles.card}>
          <View style={styles.noDataBox}>
            <Text style={styles.noDataText}>No Previous Data</Text>
          </View>
        </Card>
      )}
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
  },
  card: {
    backgroundColor: "rgba(202, 237, 206, 0.8)",
    borderRadius: 15,
    padding: 20,
    margin: 15,
    position: "relative",
    overflow: "hidden",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  details: {
    flex: 1,
    justifyContent: "space-between", // Distribute content vertically
    flexDirection: "column", // Ensure vertical alignment
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateTime: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 40, // Add spacing between "Latest Data" and Date/Time
  },
  time: {
    fontSize: 14,
    marginTop: 5,
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
  noDataBox: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  noDataText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  reportButton: {
    marginTop: 25,
  },
});

export default LatestReport;
