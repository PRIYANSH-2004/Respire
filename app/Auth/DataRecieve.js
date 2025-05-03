import AWS from 'aws-sdk';
import * as FileSystem from 'expo-file-system';

AWS.config.update({
accessKeyId: 'yourKey',
secretAccessKey: 'yourSecretKey',
region: 'ap-south-1',
});


const s3 = new AWS.S3();
const bucketName = 'respire-1';

export const downloadLatestFiles = async () => {
try {
const objects = await s3.listObjectsV2({ Bucket: bucketName }).promise();


const sortedObjects = objects.Contents.sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified));

const latestFiles = sortedObjects.slice(0, 4);

const downloadedFileLinks = [];
for (const file of latestFiles) {
  console.log(`Generating link for: ${file.Key}`);
  const fileLink = s3.getSignedUrl('getObject', {
    Bucket: bucketName,
    Key: file.Key,
    Expires: 3600, // Link valid for 1 hour
  });
  console.log(`Generated link: ${fileLink}`);
  downloadedFileLinks.push({ name: file.Key, link: fileLink });

  // Save file locally on the phone using base64 encoding
  const fileData = await s3.getObject({ Bucket: bucketName, Key: file.Key }).promise();
  const base64Data = fileData.Body.toString('base64');
  const fileUri = `${FileSystem.documentDirectory}${file.Key}`;
  await FileSystem.writeAsStringAsync(fileUri, base64Data, {
    encoding: FileSystem.EncodingType.Base64,
  });
  console.log(`✅ Saved locally: ${file.Key} to ${fileUri}`);
}

// Debugging phone-specific issue
console.log('Testing local file accessibility on phone...');
for (const file of downloadedFileLinks) {
  const fileUri = `${FileSystem.documentDirectory}${file.name}`;
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  if (!fileInfo.exists) {
    console.error(`Local file not accessible: ${file.name}`);
  } else {
    console.log(`Local file accessible: ${file.name}`);
  }
}

return downloadedFileLinks;

} catch (error) {
console.error('Error generating file links:', error);
throw error;
}
};
