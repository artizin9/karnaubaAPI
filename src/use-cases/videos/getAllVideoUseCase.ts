import { IVideoRepository } from "../../domain/repositorys/IVideoRepository";

export class GetAllVideoUseCase {
    constructor(private repo: IVideoRepository){}

    async execute(){
        const isVideoExist = await this.repo.getAll();
        return isVideoExist
    }
}