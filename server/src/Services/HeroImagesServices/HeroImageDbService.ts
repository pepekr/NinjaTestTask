import { GenericDbService } from "Services/Shared/GenericDbService.js";
import { HeroImage } from "../../../../shared/interfaces/HeroImage.js";
import { ICrudRepository } from "../../../../shared/interfaces/ICrudRepository.js";
import { IGetRepository } from "../../../../shared/interfaces/IGetRepository.js";
import { IGetByHeroId } from "../../../../shared/interfaces/IGetByHeroId.js";

export class HeroImageDbService extends GenericDbService<
  HeroImage,
  IGetByHeroId
> {
  constructor(
    dbManager: ICrudRepository<HeroImage> &
      IGetRepository<HeroImage> &
      IGetByHeroId
  ) {
    super(dbManager);
  }
  async getByHeroId(heroId: string, offset?:number, take?:number) {
    return this.dbManager.getByHeroId(heroId);
  }
}
