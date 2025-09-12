import { CreateVideoUseCase } from "../../../use-cases/videos/createVideoUseCase";
import { DeleteVideoUseCase } from "../../../use-cases/videos/deleteVideoUseCase";
import { GetAllVideoUseCase } from "../../../use-cases/videos/getAllVideoUseCase";
import { GetIdVideoUseCase } from "../../../use-cases/videos/getIdVideoUseCase";
import { UpdateVideoUseCase } from "../../../use-cases/videos/updateVideoUseCase";
import { FastifyContextDTO } from "../../dto/fastifyContextDTO";
import { Multipart } from "../plugins/multipart";
import { createReadStream, statSync } from "fs";
import { join } from "path";

export class VideoController {
    constructor(
        private videoCreate: CreateVideoUseCase,
        private videoUpdate: UpdateVideoUseCase,
        private videoDelete: DeleteVideoUseCase,
        private videoGetUnique: GetIdVideoUseCase,
        private videoGetAll: GetAllVideoUseCase,
        private multipart: Multipart
    ) { }

    async create(fastify: FastifyContextDTO) {
        const video = await this.multipart.handleVideoMultipart(fastify.req)
        const data = await this.videoCreate.execute(video.rawFields, video.duration, video.fileName)
        fastify.res.status(201).send({ Message: "Video criado com sucesso", data })
    }

    async update(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string }
        const video = await this.multipart.handleVideoMultipart(fastify.req)

        const updatedVideo = await this.videoUpdate.execute(video, id)
        fastify.res.send({ Message: "Video atualizado com sucesso", updatedVideo })
    }

    async delete(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string }
        await this.videoDelete.execute(id)

        fastify.res.send("Video deletado")
    }

    async getUnique(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string }
        const video = await this.videoGetUnique.execute(id)

        fastify.res.send({ Message: "Video encontrado", video })
    }

    async getAll(fastify: FastifyContextDTO) {
        const videos = await this.videoGetAll.execute()
        fastify.res.send({ Message: "Videos encontrados", videos })
    }
<<<<<<< HEAD

async getWatch(fastify: FastifyContextDTO) {
    const { filename } = fastify.req.params as { filename: string };
    const videoPath = join(process.cwd(), "videos", filename);

    try {
        const stat = statSync(videoPath);
        const fileSize = stat.size;

        const stream = createReadStream(videoPath);

        fastify.res
            .code(200)
            .headers({
                "Content-Length": fileSize,
                "Content-Type": "video/mp4",
                // "Content-Disposition" removido para permitir streaming
            })
            .send(stream);
    } catch (err) {
        fastify.res.code(404).send({ message: "Video not found" });
    }
}

}

=======
}
>>>>>>> 55f7a8eb5aeca981060822d9c84fbf991bd9f681
