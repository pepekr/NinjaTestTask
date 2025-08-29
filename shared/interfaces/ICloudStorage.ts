export interface ICloudStorage {
    getItem(key: string): Promise<Buffer>;    
    saveItem(item: Buffer | Uint8Array, fileName:string ): Promise<string>;
    deleteItem(key: string): Promise<boolean>;
}