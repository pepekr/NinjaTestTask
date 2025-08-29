// note: if it will be beoynd crud create another interface for additional methods
export interface ICrudRepository<T> {
  create(item: T): Promise<T>;
  read(itemId: string): Promise<T>;
  update(itemId: string, itemPart: Partial<T>): Promise<T>;
  delete(itemId: string): Promise<T>;
}
