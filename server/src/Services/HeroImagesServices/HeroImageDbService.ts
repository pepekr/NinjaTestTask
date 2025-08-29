import { ICrudRepository } from "../../../../shared/interfaces/ICrudRepository.js";
import { IGetRepository } from "../../../../shared/interfaces/IGetRepository.js";
import {
  HeroImage,
  HeroImageCreational,
} from "../../../../shared/interfaces/HeroImage.js";
import { v4 as uuidv4 } from "uuid";
export class HeroImageDbService {
  private dbManager: ICrudRepository<HeroImage> & IGetRepository<HeroImage>;
  constructor(
    dbManager: ICrudRepository<HeroImage> & IGetRepository<HeroImage>
  ) {
    this.dbManager = dbManager;
  }
  async createHeroImage(superhero: HeroImageCreational): Promise<HeroImage> {
    return this.dbManager.create({ id: uuidv4(), ...superhero });
  }

  async updateHeroImage(
    id: string,
    superhero: Partial<HeroImage>
  ): Promise<HeroImage> {
    return this.dbManager.update(id, superhero);
  }

  async getAllHeroImages(offset?: number, take?: number): Promise<HeroImage[]> {
    return this.dbManager.getAll(offset, take);
  }
  async getById(id: string): Promise<HeroImage | null> {
    return this.dbManager.getById(id);
  }
  async delete(id: string): Promise<HeroImage> {
    return this.dbManager.delete(id);
  }
}
