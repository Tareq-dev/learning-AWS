const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAZ2CRJL4KGU67RNP3",
    secretAccessKey: "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",
  },
});

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: "private-trk",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}
async function putObject(filename, contentType) {
  const command = new PutObjectCommand({
    Bucket: "private-trk",
    Key: `uploads/user-uploads/${filename}`,
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
