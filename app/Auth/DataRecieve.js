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

export const getLatestFolder = async () => {
  try {
    // 1. List all potential folders using common prefixes
    const { CommonPrefixes } = await s3.listObjectsV2({
      Bucket: bucketName,
      Delimiter: '/'
    }).promise();

    if (!CommonPrefixes?.length) return null;

    // 2. Extract folder names and find latest
    const folders = CommonPrefixes.map(p => p.Prefix).sort((a, b) => b.localeCompare(a)); // Sort descending
    
    // Option 1: If folders have timestamp-based names (e.g., "20250505_151423/")
    const latestFolder = folders[0].replace(/\//g, ''); // Use the first folder (latest after sorting)
    
    return latestFolder;

  } catch (error) {
    console.error('Error fetching latest folder:', error);
    return null;
  }
};

export const downloadLatestFiles = async () => {
  try {
    const latestFolder = await getLatestFolder();
    if (!latestFolder) {
      console.log('No latest folder found');
      return [];
    }

    // 1. List all objects in the latest folder
    const { Contents } = await s3.listObjectsV2({
      Bucket: bucketName,
      Prefix: `${latestFolder}/`
    }).promise();
    
        if (!Contents || Contents.length === 0) {
          console.log('No files found in latest folder');
          return [];
        }
    
        // 2. Sort files by LastModified (newest first)
        const sortedFiles = Contents
          .filter(file => !file.Key.endsWith('/')) 
          .sort((a, b) =>
            new Date(b.Name) - new Date(a.Name)
          );
    
        // 3. Generate signed URLs with device-specific expiration
        const expirySeconds = Platform.OS === 'android' ? 3600 : 7200;
        const downloadedFileLinks = await Promise.all(
          sortedFiles.map(async (file) => {
            const params = {
              Bucket: bucketName,
              Key: file.Key,
              Expires: expirySeconds
            };
    
            return {
              name: file.Key.split('/').pop(),  // Get filename only
              link: s3.getSignedUrl('getObject', params),
              lastModified: file.LastModified
            };
          })
        );
    
        console.log('Fetched', downloadedFileLinks.length, 'files');
        return downloadedFileLinks;
        } catch (error) {
          console.error('S3 fetch error:', error);
          throw new Error('Failed to retrieve files');
        }
  try {
    // 1. List all objects in 'latest/' folder
    const { Contents } = await s3.listObjectsV2({
      Bucket: bucketName,
      Prefix: '20250505_151423/'
    }).promise();

    if (!Contents || Contents.length === 0) {
      console.log('No files found in latest folder');
      return [];
    }

    // 2. Sort files by LastModified (newest first)
    const sortedFiles = Contents
      .filter(file => !file.Key.endsWith('/'))  // Exclude folder markers
      .sort((a, b) => 
        new Date(b.LastModified) - new Date(a.LastModified)
      );

    // 3. Generate signed URLs with device-specific expiration
    const expirySeconds = Platform.OS === 'android' ? 3600 : 7200;
    const downloadedFileLinks = await Promise.all(
      sortedFiles.map(async (file) => {
        const params = {
          Bucket: bucketName,
          Key: file.Key,
          Expires: expirySeconds
        };

        return {
          name: file.Key.split('/').pop(),  // Get filename only
          link: s3.getSignedUrl('getObject', params),
          lastModified: file.LastModified
        };
      })
    );

    // console.log('Fetched', downloadedFileLinks.length, 'files');
    return downloadedFileLinks;

  } catch (error) {
    console.error('S3 fetch error:', error);
    throw new Error('Failed to retrieve files');
  }
};
