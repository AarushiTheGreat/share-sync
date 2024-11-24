import React, { useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const S3Upload = ({client, bucketName}) => {
  const [file, setFile] = useState(null);
  const [showStatus, setShowStatus] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("uploading...");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setShowStatus(true);

    try {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: file.name,
        Body: file,
      });

    const response = await client.send(command);
    setUploadStatus("File uploaded successfully")
    console.log("File uploaded successfully:", response);
    } catch (error) {
    setUploadStatus("Unexpected error\n"+error)    
    console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>
      <div>
        {showStatus ? <span>{uploadStatus}</span> : <></>}
      </div>
    </div>
  );
};

export default S3Upload;

