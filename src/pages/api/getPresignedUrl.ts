import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3_BUCKET_NAME, AWS_ID } from '~/utils/constants';

export default async function getPresignedUrl(
  filename: string,
  fileType: string,
) {
  const secret = process.env.AWS_SECRET;
  if (!secret) return;

  const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: AWS_ID,
      secretAccessKey: secret,
    },
  });

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: filename,
    ContentType: fileType,
  });

  const ONE_HOUR = 60 * 60; // one hour in seconds
  const options = { expiresIn: ONE_HOUR };

  const preSignedUrl = await getSignedUrl(s3Client, command, options);
  return preSignedUrl;
}
