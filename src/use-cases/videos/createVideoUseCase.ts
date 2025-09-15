import { randomUUID } from "crypto";
import { IVideoRepository } from "../../domain/repositorys/IVideoRepository";
import { videoSchema, videoSchemaDTO } from "../../infra/schemas/videoSchema";
import { ServerError } from "../../infra/utils/serverError";
import { Video } from "../../domain/entities/video";

export class CreateVideoUseCase {
    constructor(private repo: IVideoRepository){}

    async execute(data: videoSchemaDTO, duration: number, filename: string){
        const parsedData = videoSchema.safeParse(data);
        console.log(parsedData.error)
        if (!parsedData.success) throw new ServerError("Bad Request")

        const id = randomUUID()
        const video = new Video(id, parsedData.data.title, parsedData.data.description, parsedData.data.videoURL, filename, duration)

        const createdVideo = await this.repo.create(video)
        return createdVideo
    }
}