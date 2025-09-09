import { Video } from "../entities/video";

export interface IVideoRepository {
    create(data: Video): Promise<Video | null>;
    update(data: Partial<Video>): Promise<Video | null>;
    delete(options: { id?: string; filename?: string }): Promise<void>;
    getAll(): Promise<Video[]>;
}
