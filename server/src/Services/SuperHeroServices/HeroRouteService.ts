import { GenericDbService } from "Services/Shared/GenericDbService.js";
import {
  Superhero,
  SuperheroCreational,
} from "../../../../shared/interfaces/SuperHero.js";
import { HeroImage } from "../../../../shared/interfaces/HeroImage.js";
import { HeroImageDbService } from "Services/HeroImagesServices/HeroImageDbService.js";
import { HeroImageCloudService } from "Services/HeroImagesServices/HeroImageCloudService.js";

export class HeroRouteService {
  private userDbService: GenericDbService<Superhero>;
  private imageCloudService: HeroImageCloudService;
  private imageDbService: HeroImageDbService;
  constructor(
    uds: GenericDbService<Superhero>,
    ics: HeroImageCloudService,
    ids: HeroImageDbService
  ) {
    this.userDbService = uds;
    this.imageCloudService = ics;
    this.imageDbService = ids;
  }
  async getHeroesInfo(offset?: number, take?: number): Promise<Superhero[]> {
    return this.userDbService.getAll(offset ?? 0, take ?? 5);
  }
  async getInfoById(id: string) {
    return this.userDbService.getById(id);
  }
  async deleteHeroInfo(heroId: string): Promise<boolean> {
    try {
      const isHeroDeleted = await this.userDbService.delete(heroId);
      if (!isHeroDeleted) return false;
      const images: HeroImage[] = await this.imageDbService.getByHeroId(heroId);
      const imagePromises = images.map(async (imageObj) => {
        await this.imageCloudService.deleteItem(imageObj.url);
        await this.imageDbService.delete(imageObj.id);
      });
      await Promise.all(imagePromises);
      return true;
    } catch (error) {
      console.error("delete isnt done");
      return false;
    }
  }
  async createHero(hero: SuperheroCreational) {
    if (
      !hero ||
      !hero.catch_phrase ||
      !hero.nickname ||
      !hero.origin_description ||
      !hero.real_name ||
      !hero.superpowers
    ) {
      throw new Error("Invalid data");
    }
    const createdHero = await this.userDbService.create(hero);
    return createdHero;
  }
  async updateHero(heroId: string, heroPart: Partial<Superhero>) {
    if (
      !heroId ||
      !heroPart ||
      !heroPart.catch_phrase ||
      !heroPart.nickname ||
      !heroPart.origin_description ||
      !heroPart.real_name ||
      !heroPart.superpowers
    ) {
      return new Error("Invalid Data");
    }
    return await this.userDbService.update(heroId, heroPart);
  }
}
