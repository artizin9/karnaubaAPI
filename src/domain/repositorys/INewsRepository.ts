import { News } from "../entities/news";

export interface INewsRepository {
    getAll(): Promise<News[]>;
    getById(): Promise<News>
    
}