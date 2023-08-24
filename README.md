
## Documentation

https://console.aws.amazon.com



## Lessons Learned

* S3

* IAM

* getObejct

* putObject

* User access

* create folder



# Installation


### Install AWS with node

```bash
✅ Step -1 
initialized project 

  npm init --y



✅ Step -2 

  npm install @aws-sdk/client-s3

  npm install @aws-sdk/s3-request-presigner



✅ Step -3 
create s3client

    const s3Client = new S3Client({
    region: "****",
        credentials: {
        accessKeyId: "*****",
        secretAccessKey: "*****",
    },
    });


✅ GET Obejct function

    async function getObjectURL(key) {
        const command = new GetObjectCommand({
        Bucket: "Bucket_name",
        Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}


✅ PUT Object function

async function putObject(filename, contentType) {
        const command = new PutObjectCommand({
        Bucket: "private-trk",
        Key: `key_path`,
        ContentType: contentType,
        });
  const url = await getSignedUrl(s3Client, command);
  return url;
}





async function init() {
  // console.log("url for image", await getObjectURL("apple-touch-icon.png"));

  //--------------------GET upload Image

  //   console.log(
  //     "url for image",
  //     await getObjectURL("/uploads/user-uploads/image-1692896837257.jpg")
  //   );

  //--------------------GET upload video

//   console.log(
//     "url for image",
//     await getObjectURL("uploads/user-uploads/video-1692897516734.mp4")
//   );

  //--------------------upload image

//   console.log(
//     "url for uploading",
//     await putObject(`image-${Date.now()}.jpg`, "image / jpg")
//   );

  //--------------------upload video

    // console.log(
    //   "url for uploading",
    //   await putObject(`video-${Date.now()}.mp4`, "video/mp4")
    // );
}
init();
```
    
