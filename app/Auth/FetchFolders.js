import AWS from 'aws-sdk';
import { Platform } from 'react-native';

// Use environment variables for security
AWS.config.update({
  accessKeyId: 'your-key',
  secretAccessKey: 'your-secret',
  region: 'ap-south-1',
  });

const s3 = new AWS.S3({ signatureVersion: 'v4' });
const bucketName = 'respire-1';

export const getFolders = async () => {
  try {
    // 1. List all potential folders using common prefixes
    const { CommonPrefixes } = await s3.listObjectsV2({
      Bucket: bucketName,
      Delimiter: '/'
    }).promise();

    if (!CommonPrefixes?.length) return null;

    // 2. Extract folder names and find latest
    const folders = CommonPrefixes.map(p => p.Prefix).sort((a, b) => b.localeCompare(a));
    return folders;

  } catch (error) {
    console.error('Error fetching latest folder:', error);
    return null;
  }
};

export const ListOfFolders = async () => {
  try {
    const allFolders = await getFolders();
    if (!allFolders) {
      console.log('No latest folder found');
      return [];
      }
      // console.log(allFolders)
      return allFolders;
      
    } catch (error) {
      console.error('S3 fetch error:', error);
      throw new Error('Failed to retrieve files');
    }
};
