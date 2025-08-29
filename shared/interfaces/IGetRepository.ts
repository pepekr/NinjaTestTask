
export interface IGetRepository<T>
{
    getAll(offset?:number):Promise<T[]>
    getById(itemId:T):Promise<T>
}