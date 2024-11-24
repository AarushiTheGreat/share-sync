import S3Upload from "./S3Upload"
import { useState } from "react"
import { S3Client } from "@aws-sdk/client-s3";
import { ACCESS_KEY, SECRET_KEY, BUCKET_NAME } from "./env/env.js";
import S3Get from "./S3Get";

const App = () => {
  var [toggle, setToggle] = useState(false);
  const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
    },
  });

  return (
    <div>
        <button onClick={()=>setToggle(false)}>listOfFile</button>
        <button onClick={()=>setToggle(true)}>uploadPage</button>
        {toggle 
        ? <S3Upload client={s3Client} bucketName={BUCKET_NAME}></S3Upload>
        : <S3Get client = {s3Client} bucketName={BUCKET_NAME}></S3Get>}
    </div>
  )
}

export default App;