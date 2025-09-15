import { IVideoStorage } from "../dto/videoStorageDTO";

export interface VideoStorageInterface {
    save(data: IVideoStorage ): Promise<string>;
    delete(filename: string): Promise<void>;
}