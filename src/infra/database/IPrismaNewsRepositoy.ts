import { prisma } from "../../config/prisma";
import { News } from "../../domain/entities/news";
import { INewsRepository } from "../../domain/repositorys/INewsRepository";

export class IPrismaNewsRepository implements INewsRepository {
    async getAll(): Promise<News[]> {
        const news = await prisma.news.findMany()

        return news
    }

    async getById(id: string): Promise<News | null> {
        const news = await prisma.news.findUnique({
            where: { id },
        })

        return news
    }

    async delete(id: string): Promise<void> {
        const news = await prisma.news.delete({
            where: { id },
        })
    }

    async create(data: News): Promise<News | null> {

    }

    async update(data: Partial<News>): Promise<News | null> {

    }
}