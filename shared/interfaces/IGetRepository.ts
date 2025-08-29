/**
 * Generic interface for database "get" methods
 */
export interface IGetRepository<T> {
  /**
   * Method for retrieving all items.
   * @param offset Specifies the offset for retrieving items. Defaults to 0 if not provided.
   */
  getAll(offset?: number): Promise<T[]>;
  /**
   * Gets one item based on unique id
   * @param itemId Id of retrieving item
   */
  getById(itemId: T): Promise<T>;
}
