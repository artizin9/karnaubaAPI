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

        const id = randomUUID()
        const news = new News(id, data.title, data.content, admin.id, data.photoURLs, data.author, new Date())

        await this.newsRepository.create(news)
        return news
    }
}
