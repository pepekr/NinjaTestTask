import { Request, Response } from "express";
import { imgCloudService, imgDbService } from "singletones.js";
export async function getAllHeroImages(req: Request, res: Response) {
  try {
    const images = await imgDbService.getByHeroId(req.params.id);
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
 
