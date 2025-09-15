import { existsSync, mkdirSync } from "fs";
import { unlink } from "fs/promises";
import { join } from "path";
import { writeFile } from "fs/promises";
import { fileType } from "../utils/fileType";
import { ServerError } from "../utils/serverError";
import { IVideoStorage } from "../dto/videoStorageDTO";

export class VideoStorageService implements VideoStorageService {
    private videos: string = "videos";

    constructor() {
        if (!existsSync(this.videos)) mkdirSync(this.videos)
    };

    async save(data: IVideoStorage): Promise<string> {
        if (!fileType.isVideo(data.buffer)) throw new ServerError("File is not an video", 415);
        const typePath = this.videos

        const path = join(typePath, data.filename)

        await writeFile(path, data.buffer);
        return data.filename;
    }

    async delete(filename: string): Promise<void> {
        const path = join(this.videos, filename);
        if (existsSync(path)) await unlink(path)
    }
}