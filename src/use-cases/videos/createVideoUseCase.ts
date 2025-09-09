import { IVideoRepository } from "../../domain/repositorys/IVideoRepository";

export class CreateVideoUseCase {
    constructor(private repo: IVideoRepository){}

    async execute(video: any){
        const createdVideo = await this.repo.create(video)
        return createdVideo
    }
}