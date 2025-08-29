/**
 * Generic crud interface for db operations 
 */
export interface ICrudRepository<T> {
  create(item: T): Promise<T>;
  // read(itemId: string): Promise<T>;
  update(itemId: string, itemPart: Partial<T>): Promise<T>;
  delete(itemId: string): Promise<T>;
}
