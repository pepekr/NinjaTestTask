import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { ICloudStorage } from "../../../shared/interfaces/ICloudStorage.js";
import s3 from "AwsClient.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "dotenv";
import { detectFileType } from "getExtension.js";
import { v4 as uuid4 } from "uuid";

config();

export class AwsImplementation implements ICloudStorage {
  async saveItem(body: Buffer | Uint8Array, fileName: string): Promise<string> {
    const { mime } = await detectFileType(body, fileName);
    const uniqueKey = `images/${fileName}-${uuid4()}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: uniqueKey,
      Body: body,
      ContentType: mime,
    });

    await s3.send(command);

    // Return the key; client never gets this directly
    return uniqueKey;
  }

  async getItemUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });

    // URL valid for 1 hour (3600 seconds)
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return signedUrl;
  }

  async deleteItem(key: string): Promise<boolean> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      });
      await s3.send(command);
      return true;
    } catch (err) {
      console.error("Failed to delete S3 object:", err);
      return false;
    }
  }
}
