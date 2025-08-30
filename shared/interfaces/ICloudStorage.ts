export interface ICloudStorage {
    getItemUrl(key: string): Promise<string>;    

    // save buffer and return URL
    saveItem(item: Buffer | Uint8Array, fileName: string): Promise<string>;

    // delete by key
    deleteItem(key: string): Promise<boolean>;
}