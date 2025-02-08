/// This code snippet demonstrates how to generate a pre-signed URL 
/// for an object in an Amazon S3 bucket using the AWS SDK for JavaScript v3.

// For the Private Buckets, we need to generate a pre-signed URL to access the object in the bucket.

import { DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv';

dotenv.config();

const newClient = new S3Client({
    region: process.env.AWS_DEFAULT_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
});

// Get object function
async function getObject(key) {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key
        });
        const url = await getSignedUrl(newClient, command, { expiresIn: 20 });
        return url;
    } catch (error) {
        console.error("Error getting object:", error);
        throw error;
    }
}

// Put object function
async function putObject(filename, contentType) {
    try {
        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `putImage/${filename}`,
            ContentType: contentType,     
        });
        const url = await getSignedUrl(newClient, command, { expiresIn: 600 });
        return url;
    } catch (error) {
        console.error("Error putting object:", error);
        throw error;
    }
}

// List objects function
async function listObjects() {
    try {
        const command = new ListObjectsV2Command({
            Bucket: process.env.S3_BUCKET_NAME,
            Prefix: "putImage"
        });
        const result = await newClient.send(command);
        console.log("List of objects in the bucket:", result);
    } catch (error) {
        console.error("Error listing objects:", error);
        throw error;
    }
}

// Delete object function
async function deleteObject(key) {
    try {
        const command = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key
        });
        const result = await newClient.send(command);
        console.log("Object deleted:", result);
    } catch (error) {
        console.error("Error deleting object:", error);
        throw error;
    }
}

// Initialize function
async function init() {
    try {
        const url = await getObject("putImage/video-1738988554573.mp4");
        console.log("URL for newImage.png is:", url);

        const putUrl = await putObject(`video-${Date.now()}.mp4`, "video/mp4");
        console.log("URL for uploading:", putUrl);

        await listObjects();

        await deleteObject("newImage.png");
    } catch (error) {
        console.error("Error in init:", error);
    }
}

init();