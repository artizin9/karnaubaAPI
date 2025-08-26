import { Photo } from "@prisma/client";
import { News } from "../entities/news";

export interface INewsRepository {
    getAll(): Promise<News[]>;
    getById(id: string): Promise<News | null>;
    create(data: News): Promise<News | null>;
    update(data: Partial<News>, id: string): Promise<News | null>;
    updatePhoto(photoId: string, photoURLs: string): Promise<Photo | null>;
    findPhoto(photoId: string): Promise<Photo | null>;
    delete(id: string): Promise<void>;
}