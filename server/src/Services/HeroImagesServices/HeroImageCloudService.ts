import { ICloudStorage } from "../../../../shared/interfaces/ICloudStorage.js";

export class HeroImageCloudService {
  private storageCloudImpl: ICloudStorage;

  constructor(scl: ICloudStorage) {
    this.storageCloudImpl = scl;
  }

  async saveItem(body: Buffer | Uint8Array, fileName: string): Promise<string> {
    return this.storageCloudImpl.saveItem(body, fileName);
  }

  async getItemUrl(key: string): Promise<string> {
    return this.storageCloudImpl.getItemUrl(key);
  }

  async deleteItem(key: string): Promise<boolean> {
    return this.storageCloudImpl.deleteItem(key);
  }
}
