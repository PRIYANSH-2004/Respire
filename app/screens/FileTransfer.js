import { StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import { Linking } from "react-native";
import * as FileSystem from "expo-file-system";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-paper";
import { downloadLatestFiles } from "../Auth/DataRecieve";

const FileTransfer = () => {
  const [loading, setLoading] = useState(false);
  const [downloadedFiles, setDownloadedFiles] = useState([]);

  const handleFileDownload = async () => {
    setLoading(true);
    try {
      const files = await downloadLatestFiles();
      setDownloadedFiles(files);
      // console.log("Downloaded files:", files);
      Alert.alert("Success", "Downloaded all teh latest files from S3!");
    } catch (error) {
      console.error("File download failed:", error);
      Alert.alert("Error", "Failed to download files from S3");
    } finally {
      setLoading(false);
    }

  };

  return (
    <LinearGradient
      colors={["#fbc2eb", "#e0e0e0", "#a6c1ee"]}
      style={styles.gradient}
    >
        <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>
          FileTransfer
        </Text>
        <Button
          mode="contained"
          onPress={handleFileDownload}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Download Files
        </Button>

        <View style={styles.fileList}>
          {Array.isArray(downloadedFiles) && downloadedFiles.map(({ name , link}, index) => (
            <Button
            key={index}
            mode="outlined"
            style={styles.fileButton}
            onPress={async () => {
              try {
                // Open the link directly in the browser
                await Linking.openURL(link);
              } catch (error) {
                console.error("Error opening link:", error);
                Alert.alert("Error", "Unable to open the link.");
              }
            }}
            >
              {name}
            </Button>
          ))}
        </View>
      </View>
          </ScrollView>
    </LinearGradient>
  );
}

export default FileTransfer;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    color: "#ffff",
    fontSize: 25,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  fileButton: {
       marginVertical: 15,
       marginTop:10,
       borderColor: "black",
       borderWidth: 2,
       borderRadius: 50,
     },
     fileList:{
      backgroundColor:"white",
      color:"black",
      borderRadius:20,
      marginTop:60,
      padding:20,
     }
});
