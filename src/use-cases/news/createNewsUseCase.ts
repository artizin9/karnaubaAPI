import { FastifyRequest } from "fastify";
import { INewsRepository } from "../../domain/repositorys/INewsRepository";
import { newsSchema, NewsSchema } from "../../infra/schemas/newsSchema";
import { ServerError } from "../../infra/utils/serverError";

export class CreateNewsUseCase {
    constructor(
        private newsRepository: INewsRepository
    ){}

    async execute(data: NewsSchema, req: FastifyRequest){
        const parsedData = newsSchema.safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad Request");

        const admin = req.user;
        if (!admin) throw new ServerError("Throw n")
    }
}
