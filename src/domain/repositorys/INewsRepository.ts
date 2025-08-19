import { News } from "../entities/news";

export interface INewsRepository {
    getAll(): Promise<News[]>;
    getById(id: string): Promise<News | null>;
    create(data: News): Promise<News | null>;
    update(data: Partial<News>): Promise<News | null>;
    delete(id: string): Promise<void>;
}