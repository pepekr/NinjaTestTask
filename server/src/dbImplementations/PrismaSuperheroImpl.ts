import { Superhero } from "../../../shared/interfaces/SuperHero.js";
import { ICrudRepository } from "../../../shared/interfaces/ICrudRepository.js";
import { IGetRepository } from "../../../shared/interfaces/IGetRepository.js";
import prismaClient from "prismaClient.js";
/**
 * Prisma implementation of db operations
 */
export default class PrismaSuperheroImpl
  implements ICrudRepository<Superhero>, IGetRepository<Superhero>
{
  async create(item: Superhero): Promise<Superhero> {
    return prismaClient.superHero.create({ data: item });
  }
  async getById(itemId: string): Promise<Superhero | null> {
    return prismaClient.superHero.findUnique({ where: { id: itemId } });
  }
  async getAll(offset?: number, take?: number): Promise<Superhero[]> {
    return prismaClient.superHero.findMany({
      skip: offset,
      take: take,
      orderBy: { createdAt: "desc" },
    });
  }
  async delete(itemId: string): Promise<Superhero> {
    return prismaClient.superHero.delete({ where: { id: itemId } });
  }
  async update(
    itemId: string,
    itemPart: Partial<Superhero>
  ): Promise<Superhero> {
    return prismaClient.superHero.update({
      where: { id: itemId },
      data: itemPart,
    });
  }
}
