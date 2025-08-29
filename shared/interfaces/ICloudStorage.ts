export interface ICloudStorage<T>
{
    getItem(url:string):Promise<T>
    saveItem(item:T):Promise<string>
    deleteItem(url:string):Promise<T>
}