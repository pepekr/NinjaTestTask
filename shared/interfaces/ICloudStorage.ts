export interface ICloudStorage {
    getItem(url: string): Promise<Buffer>;    
    saveItem(item: Buffer | string | object): Promise<string>;
    deleteItem(url: string): Promise<Buffer>;
}