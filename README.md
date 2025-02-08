# AWS S3 Signed URL Generator

This project demonstrates how to generate pre-signed URLs for Amazon S3 objects using the AWS SDK for JavaScript (v3). Pre-signed URLs allow secure access to private S3 objects without exposing sensitive credentials.

## Features
- Generate a **pre-signed URL** to retrieve objects from a private S3 bucket.
- Generate a **pre-signed URL** for uploading objects to S3.
- List objects inside a specific bucket folder.
- Delete objects from the S3 bucket.

## Prerequisites

### 1. Install Dependencies
Ensure you have **Node.js** installed, then run:
```sh
npm install
```

### 2. AWS Credentials Setup
Set up your AWS credentials in an **.env** file:
```
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_DEFAULT_REGION=your-region
S3_BUCKET_NAME=your-bucket-name
```

## Installation & Usage

### 1. Clone the Repository
```sh
git clone https://github.com/prathamesh-pichkate/AWS-S3-NODEJS.git
```

### 2. Run the Script
```sh
node index.js
```

## Contributions
Feel free to fork this repo and submit a pull request with improvements! 🚀

## License
This project is licensed under the MIT License.

