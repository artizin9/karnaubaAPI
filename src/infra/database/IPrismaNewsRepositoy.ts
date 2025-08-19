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
        await prisma.news.delete({
            where: { id },
        })
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