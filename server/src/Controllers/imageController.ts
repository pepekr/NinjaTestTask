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
    const heroId = req.params.heroId;
    const files = req.files as Express.Multer.File[];

    const savedImages: HeroImage[] = [];

    for (const file of files) {
      const bucketUrl = await imgCloudService.saveItem(
        file.buffer,        // multer gives you buffer directly
        file.originalname   // multer gives original file name
      );

      const savedImage = await imgDbService.create({
        imageOwnerId: heroId,
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
