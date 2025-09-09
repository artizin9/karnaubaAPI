import { IVideoRepository } from "../../domain/repositorys/IVideoRepository";

export class UpdateVideoUseCase {
    constructor(private repo: IVideoRepository){}

    async execute(video: any, id: string){
        const createdVideo = await this.repo.update(video, id)
        return createdVideo
    }
}