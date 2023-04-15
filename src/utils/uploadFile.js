// import AWS from 'aws-sdk'
import S3 from 'react-aws-s3'


export function directUploadFile(file, dirName) {
  // const s3 = new AWS.S3()

  const s3_config = {
    bucketName: process.env.REACT_APP_AWS_S3_BUCKET,
    dirName: dirName,
    region: process.env.REACT_APP_AWS_S3_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  }

  const ReactS3Client = new S3(s3_config);
  return new Promise(resolve => {
    ReactS3Client
      .uploadFile(file, Math.trunc(Math.random() * 100000) + file.name)
      .then((data) => {
        resolve(data)

      })
      .catch(err => console.error(err))
  })
}
