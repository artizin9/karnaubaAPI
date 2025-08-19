import { News } from "../../domain/entities/news";
import { INewsRepository } from "../../domain/repositorys/INewsRepository";

export class IPrismaNewsRepository implements INewsRepository {
    async getAll(): Promise<News[]> {
        
    }

    async getById(id: string): Promise<News | null> {
        
    }

    async delete(id: string): Promise<void> {
        
    }

    async create(data: News): Promise<News | null> {
        
    }

    async update(data: Partial<News>): Promise<News | null> {
        
    }
}