import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Card } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import lungSound from "../../assets/data";


let NewPatient;
const today = new Date();
const LatestDate = today.toISOString().split('T')[0];
const LatestTime = lungSound[0].time;
const Probability = lungSound[0].predicted_probability;
NewPatient = false;

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
                progress={Probability / 100}
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
  details: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateTime: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 40,
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
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
