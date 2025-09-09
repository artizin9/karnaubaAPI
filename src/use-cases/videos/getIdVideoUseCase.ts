import { IVideoRepository } from "../../domain/repositorys/IVideoRepository";
import { ServerError } from "../../infra/utils/serverError";

export class GetIdVideoUseCase {
    constructor(private repo: IVideoRepository){}

    async execute(id: string){
        const isVideoExist = await this.repo.getId(id);
        if (!isVideoExist) throw new ServerError("This video not exist");

        return isVideoExist
    }
}