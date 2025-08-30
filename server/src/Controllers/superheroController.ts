import { Request, Response } from "express";
import { imgRouteService, superheroRouteService } from "singletones.js";
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
    return images;
  } catch (error: any) {
    return res.status(400).send(error.message);
  }

  
}
