import {
  HeroImageCreational,
  HeroImageWithBuffer,
} from "../../../../shared/interfaces/HeroImage.js";
import { HeroImageCloudService } from "./HeroImageCloudService.js";
import { HeroImageDbService } from "./HeroImageDbService.js";
export class HeroImageRouteService {
  private heroImageCloudService: HeroImageCloudService;
  private heroImageDbService: HeroImageDbService;
  constructor(hics: HeroImageCloudService, hids: HeroImageDbService) {
    this.heroImageCloudService = hics;
    this.heroImageDbService = hids;
  }
  async getAllHeroImages(heroId: string, offset?:number, take?:number ): Promise<HeroImageWithBuffer[]> {
    if (!heroId) throw new Error("invalid data");
    const images = await this.heroImageDbService.getByHeroId(heroId,offset,take);
    const imgPromises = images.map(async (image) => {
      return {
        key: image.url,
        imageOwnerId: image.imageOwnerId,
        id: image.id,
        image: await this.heroImageCloudService.getItem(image.url),
      };
    });
    const cloudImg = await Promise.all(imgPromises);
    return cloudImg;
  }

  async createImage(heroId: string, img: HeroImageCreational) {
    if (!heroId || !img || !img.imageOwnerId || !img.image) {
      throw new Error("invalid data");
    }
    const key = await this.heroImageCloudService.saveItem(
      img.image,
      img.fileName
    );
    const imageDb = {
      imageOwnerId: heroId,
      url: key,
    };
    const dbImage = await this.heroImageDbService.create(imageDb);
    return { ...dbImage, image: img.image };
  }
  async deleteImage(id: string, key: string) {
    if (!id || !key) {
      throw new Error("invalid data");
    }
    try {
      await this.heroImageCloudService.deleteItem(key);
      await this.heroImageDbService.delete(id);
      return true;
    } catch (err) {
      console.error("Error deleting image:", err);
      throw err;
    }
  }
}
