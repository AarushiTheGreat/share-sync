import React, { useState, useEffect } from "react";
import {GetObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";

const S3Get = ({client, bucketName}) => {  
  const [listOfFiles, setListOfFiles] = useState([])
  const [showStatus, setShowStatus] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const {Contents} = await client.send(new ListObjectsCommand({ Bucket: bucketName }));
      if(Contents != undefined){
        var contentList = [];
        for (const Content of Contents) {
          contentList.push(Content.Key);
        }

        setListOfFiles(contentList);
      }
      
    };
    fetchData();
  }, [])

  const getFile = async (fileName) => {
    setShowStatus(true);
    setStatus("fetching...");
    const path = "../downloads";
    const obj = await client.send(
      new GetObjectCommand({ Bucket: bucketName, Key: fileName }),
    );

      // Convert the stream to a Blob
      const blob = new Blob([await obj.Body.transformToByteArray()], {
        type: "application/octet-stream",
      });

      // Trigger file download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName; // Name of the file
      link.click();

      setShowStatus(false )
  }

  return (
    <div>
      {listOfFiles.length 
      ? listOfFiles.map((value, idx)=><div key={idx} onClick={()=>getFile(value)}>{value}</div>)
      : <span>{"Loading files... "}</span>}
      {showStatus
      ? <span>{status}</span>
      :<></>}
    </div>
  );
};

export default S3Get;

