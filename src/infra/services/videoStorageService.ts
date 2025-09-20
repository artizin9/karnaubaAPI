import { existsSync, mkdirSync } from "fs";
import { unlink } from "fs/promises";
import { join } from "path";
import { writeFile } from "fs/promises";
import { fileType } from "../utils/fileType";
import { ServerError } from "../utils/serverError";
import { IVideoStorage } from "../dto/videoStorageDTO";
import { randomUUID } from "crypto";
import { fileTypeFromBuffer } from "file-type";

export class VideoStorageService implements VideoStorageService {
    private videos: string = "videos";

    constructor() {
        if (!existsSync(this.videos)) mkdirSync(this.videos)
    };

async save(data: IVideoStorage): Promise<string> {
    const fileType = await fileTypeFromBuffer(data.buffer);
    if (!fileType || !fileType.mime.startsWith("video/")) throw new ServerError("File is not a video", 415);
    
    const typePath = this.videos;
    const extension = fileType.ext; 
    
    const uniqueName = `${randomUUID()}.${extension}`;
    const path = join(typePath, uniqueName);

    await writeFile(path, data.buffer);
    return uniqueName;
}

    async delete(filename: string): Promise<void> {
        const path = join(this.videos, filename);
        if (existsSync(path)) await unlink(path)
    }
}