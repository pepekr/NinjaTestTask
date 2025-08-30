import { Superhero } from "../../../shared/interfaces/SuperHero.js";
import { ICrudRepository } from "../../../shared/interfaces/ICrudRepository.js";
import { IGetRepository } from "../../../shared/interfaces/IGetRepository.js";
import prismaClient from "prismaClient.js";
import { HeroImage } from "../../../shared/interfaces/HeroImage.js";
import { IGetByHeroId } from "../../../shared/interfaces/IGetByHeroId.js";
/**
 * Prisma implementation of db operations
 */
export default class PrismaImagesImpl
  implements ICrudRepository<HeroImage>, IGetRepository<HeroImage>, IGetByHeroId
{
  async create(item: HeroImage): Promise<HeroImage> {
    return prismaClient.image.create({ data: item });
  }
  async getById(itemId: string): Promise<HeroImage | null> {
    return prismaClient.image.findUnique({ where: { id: itemId } });
  }
  async getAll(offset?: number, take?: number): Promise<HeroImage[]> {
    return prismaClient.image.findMany({ skip: offset, take: take });
  }
  async delete(itemId: string): Promise<HeroImage> {
    return prismaClient.image.delete({ where: { id: itemId } });
  }
  async update(
    itemId: string,
    itemPart: Partial<HeroImage>
  ): Promise<HeroImage> {
    return prismaClient.image.update({ where: { id: itemId }, data: itemPart });
  }

  /**
   * 
   * @param heroId The id of a hero object whose images we want retreive
   * @param offset The amount of skipped images
   * @param take The amount of taken images
   */
  async getByHeroId(heroId: string, offset?: number, take?: number):Promise<HeroImage[]> {
    return prismaClient.image.findMany({
      where: { imageOwnerId: heroId },
      skip: offset,
      take: take,
    });
  }
}
