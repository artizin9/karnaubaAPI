import { IVideoRepository } from "../../domain/repositorys/IVideoRepository";
import { VideoStorageService } from "../../infra/services/videoStorageService";
import { ServerError } from "../../infra/utils/serverError";

export class DeleteVideoUseCase {
    constructor(private repo: IVideoRepository, private storage: VideoStorageService){}

    async execute(id: string){
        const isVideoExist = await this.repo.getId(id)
        if (!isVideoExist) throw new ServerError("This video not exist")

        await this.repo.delete(id)
        await this.storage.delete(isVideoExist.filename)
    }
}