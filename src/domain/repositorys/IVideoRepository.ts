import { Video } from "../entities/video";

export interface IVideoRepository {
    create(data: Video): Promise<Video | null>;
    update(data: Partial<Video>, id: string): Promise<Video | null>;
    delete(id: string): Promise<void>;
    getId(id: string): Promise<Video>;
    getAll(): Promise<Video[]>;
}
