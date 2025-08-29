import { HeroImage } from "./HeroImage";

export interface IGetByHeroId
{
    getByHeroId(heroId:string):Promise<HeroImage[]>

}