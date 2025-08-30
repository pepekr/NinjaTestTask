import { Request, Response } from "express";
import { imgCloudService, imgDbService } from "singletones.js";
import {
  HeroImage,
  HeroImageCreational,
} from "../../../shared/interfaces/HeroImage.js";
export async function getAllHeroImages(req: Request, res: Response) {
  try {
    const images = await imgDbService.getByHeroId(req.params.heroId);
    const bucketImagesPromises = images.map(async (image) => ({
      ...image,
      url: await imgCloudService.getItemUrl(image.url),
    }));

    const bucketImages = await Promise.all(bucketImagesPromises);

    return res.status(200).json({ heroImages: bucketImages });
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
}

export async function addImages(req: Request, res: Response) {
  try {
    const images: HeroImageCreational[] = req.body;
    const savedImages: HeroImage[] = [];

    for (const image of images) {
      const bucketUrl = await imgCloudService.saveItem(
        image.buffer,
        image.fileName
      );

      const savedImage = await imgDbService.create({
        ...image,
        url: bucketUrl,
      });

      const publicUrl = await imgCloudService.getItemUrl(bucketUrl);

      savedImages.push({
        ...savedImage,
        url: publicUrl,
      });
    }

    return res.status(201).json({ heroImages: savedImages });
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
}

export async function deleteImages(req: Request, res: Response) {
    try {
        const images: HeroImage[] = req.body; // expects array of HeroImage objects
        const deletedIds: string[] = [];
        for (const image of images) {
            await imgCloudService.deleteItem(image.url);
            await imgDbService.delete(image.id);
            deletedIds.push(image.id);
        }
        return res.status(200).json({ deleted: deletedIds });
    } catch (error: any) {
        return res.status(400).json(error.message);
    }
}
