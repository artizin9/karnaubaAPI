import { CreateNewsUseCase } from "../../../use-cases/news/createNewsUseCase";
import { DeleteNewsUseCase } from "../../../use-cases/news/deleteNewsUseCase";
import { GetAllNewsUseCase } from "../../../use-cases/news/getAllNewsUseCase";
import { GetByIdNewsUseCase } from "../../../use-cases/news/getByIdNewsUseCase";
import { UpdateNewsUseCase } from "../../../use-cases/news/updateNewsUseCase";
import { FastifyContextDTO } from "../../dto/fastifyContextDTO";
import { Multipart } from "../plugins/multipart";

export class NewsController {
    constructor(
        private readonly multipart: Multipart,
        private readonly createNewsUseCase: CreateNewsUseCase,
        private readonly updateNewsUseCase: UpdateNewsUseCase,
        private readonly getAllNewsUseCase: GetAllNewsUseCase,
        private readonly getByIdNewsUseCase: GetByIdNewsUseCase,
        private readonly deleteNewsUseCase: DeleteNewsUseCase

    ) { }

    async create(fastify: FastifyContextDTO) {
        const data = await this.multipart.handleDataMultipart(fastify.req, "news");
        const news = await this.createNewsUseCase.execute(data, fastify.req);
        fastify.res.status(201).send({ Message: "Notícia criado com sucesso", response: news })
    }

    async update(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string }
        const data = await this.multipart.handleDataMultipart(fastify.req, "news");
        await this.updateNewsUseCase.execute(data, id);
        fastify.res.status(200).send("Notícia atualizada com sucesso")
    }

    async getAll(fastify: FastifyContextDTO) {
        const news = await this.getAllNewsUseCase.execute()
        fastify.res.status(201).send({ Message: "Notícias:", response: news })
    }

    async getById(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string }
        const news = await this.getByIdNewsUseCase.execute(id)
        fastify.res.status(200).send({ Message: "Notícias: ", response: news })
    }

    async delete(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string }
        const news = await this.deleteNewsUseCase.execute(id)
        fastify.res.status(200).send({ Message: "Notícia deletada com sucesso" })
    }
}


