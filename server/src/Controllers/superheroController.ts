import { Request, Response } from "express";
import { imgRouteService, superheroRouteService} from "singletones.js";
export async function getHeroes(req: Request, res: Response) {
  try {
    const offset = Number(req.params.offset);
    const take = Number(req.params.take);
    const heroes = await superheroRouteService.getHeroesInfo(offset, take);
    const promiseImages = heroes.map(async (hero) => {
      const imgs = await imgRouteService.getAllHeroImages(hero.id, 0, 1);
      return imgs[0];
    });

    const images = await Promise.all(promiseImages);
    return res.status(200).json({heroes,images});  

  } catch (error: any) {
    return res.status(400).json(error.message);
  }

  
}

export async function deleteHero(req:Request, res:Response)
{
  try {
    const deletedHero = await superheroRouteService.deleteHeroInfo(req.params.id)
    if(!deletedHero) return res.status(400).send("Error during delete");
    const images = await imgRouteService.getAllHeroImages(req.params.id);
    const deletedImages = images.map(async (image)=>
      {
        return await imgRouteService.deleteImage(image.id, image.key);
        // maybe later create array of mistakes for better logging  
      });
      await Promise.all(deletedImages);
      return res.status(200).json({message:"Hero deleted", id:req.params.id})
  } catch (error:any) {
    return res.status(400).json(error.meesage)
  }
}

export async function createHero(req:Request, res:Response)
{
  try {
    const hero = await superheroRouteService.createHero(req.body);
    return res.status(200).json(hero);
  } catch (error:any) {
    return res.status(400).json(error.meesage)
  }
}

export async function updateHero(req:Request, res: Response) {
  
  try {
    const updatedHero = await superheroRouteService.updateHero(req.params.id,req.body);
    return res.status(400).json({hero:updatedHero, message:""})
  } catch (error:any) {
    return res.status(400).json(error.message);
  }
} 
