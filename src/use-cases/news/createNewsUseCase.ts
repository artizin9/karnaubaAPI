import { FastifyRequest } from "fastify";
import { INewsRepository } from "../../domain/repositorys/INewsRepository";
import { newsSchema, NewsSchema } from "../../infra/schemas/newsSchema";
import { ServerError } from "../../infra/utils/serverError";
import { randomUUID } from "crypto";
import { News } from "../../domain/entities/news";

export class CreateNewsUseCase {
    constructor(
        private newsRepository: INewsRepository,
    ){}

    async execute(data: NewsSchema, req: FastifyRequest){
        const parsedData = newsSchema.safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad Request");

        const admin = req.user;
        if (!admin) throw new ServerError("Unauthorized", 401);
        
        const photo = (data.photoURLs && Array.isArray(data.photoURLs) ? data.photoURLs : []).map(url => ({
            id: randomUUID(),
            url
        }));

        const id = randomUUID()
        const news = new News(id, data.title, data.content, admin.id, data.author, photo, new Date())

        await this.newsRepository.create(news)
        return news
    }
}
