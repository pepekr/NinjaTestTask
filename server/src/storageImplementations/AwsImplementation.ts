import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { ICloudStorage } from "../../../shared/interfaces/ICloudStorage.js";
import s3 from "AwsClient.js";
import { config } from "dotenv";
import { detectFileType } from "getExtension.js";
import { v4 as uuid4 } from "uuid";
import { Readable } from "stream";
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
    return uniqueKey;
  }

  async getItem(key: string): Promise<Buffer> {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });

    const response = await s3.send(command);
    const stream = response.Body as Readable;
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks);
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
