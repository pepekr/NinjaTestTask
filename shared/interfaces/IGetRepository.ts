export interface IGetRepository<T>
{
    getAll():Promise<T[]>
    getById(itemId:T):Promise<T>
}