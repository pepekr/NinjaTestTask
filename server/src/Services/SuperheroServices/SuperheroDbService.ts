import { ICrudRepository } from "../../../../shared/interfaces/ICrudRepository.js";
import { IGetRepository } from "../../../../shared/interfaces/IGetRepository.js";
import {
  Superhero,
  SuperheroCreational,
} from "../../../../shared/interfaces/SuperHero.js";
import { v4 as uuidv4 } from "uuid";
export class SuperHeroDbService {
  private dbManager: ICrudRepository<Superhero> & IGetRepository<Superhero>;
  constructor(
    dbManager: ICrudRepository<Superhero> & IGetRepository<Superhero>
  ) {
    this.dbManager = dbManager;
  }
  async createSuperhero(superhero: SuperheroCreational): Promise<Superhero> {
    return this.dbManager.create({ id: uuidv4(), ...superhero });
  }

  async updateSuperhero(
    id: string,
    superhero: Partial<Superhero>
  ): Promise<Superhero> {
    return this.dbManager.update(id, superhero);
  }

  async getAllSuperheroes(
    offset?: number,
    take?: number
  ): Promise<Superhero[]> {
    return this.dbManager.getAll(offset, take);
  }
  async getById(id: string): Promise<Superhero | null> {
    return this.dbManager.getById(id);
  }
  async delete(id: string): Promise<Superhero> {
    return this.dbManager.delete(id);
  }
}
