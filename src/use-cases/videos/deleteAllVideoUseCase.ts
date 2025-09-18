import { IVideoRepository } from "../../domain/repositorys/IVideoRepository";
import { VideoStorageService } from "../../infra/services/videoStorageService";
import { ServerError } from "../../infra/utils/serverError";

export class DeleteAllVideoUseCase {
    constructor(private repo: IVideoRepository, private storage: VideoStorageService){}

    async execute(){
        const isVideoExist = await this.repo.getAll()
        if (!isVideoExist) throw new ServerError("This video not exist")

        isVideoExist.forEach(async (video) => {
            await this.repo.delete(video.id)
            await this.storage.delete(video.filename)
        })
    }
}