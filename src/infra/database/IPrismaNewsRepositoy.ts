import { prisma } from "../../config/prisma";
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
        const news = await prisma.news.create({
            data: {...data}
        })

        return news
    }

    async update(data: Partial<News>, id: string): Promise<News | null> {
        const updatedNews = await prisma.news.update({
            where: {id},
            data: {...data}
        })

        return updatedNews
    }
}