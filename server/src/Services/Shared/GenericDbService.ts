import { ICrudRepository } from "../../../../shared/interfaces/ICrudRepository.js";
import { IGetRepository } from "../../../../shared/interfaces/IGetRepository.js";
export class GenericDbService< T> {
  private dbManager: ICrudRepository<T> & IGetRepository<T>;
  constructor(dbManager: ICrudRepository<T> & IGetRepository<T>) {
    this.dbManager = dbManager;
  }
  async create(obj: Omit<T, "id">): Promise<T> {
    return this.dbManager.create(obj as T);
  }

  async update(id: string, obj: Partial<T>): Promise<T> {
    return this.dbManager.update(id, obj);
  }

  async getAll(offset?: number, take?: number): Promise<T[]> {
    return this.dbManager.getAll(offset, take);
  }
  async getById(id: string): Promise<T | null> {
    return this.dbManager.getById(id);
  }
  async delete(id: string): Promise<T> {
    return this.dbManager.delete(id);
  }
}
