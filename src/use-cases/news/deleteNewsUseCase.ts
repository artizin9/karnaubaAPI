import { INewsRepository } from "../../domain/repositorys/INewsRepository";
import { ServerError } from "../../infra/utils/serverError";

export class DeleteAllNewsUseCase {
    constructor(
        private newsRepository: INewsRepository
    ){}

    async execute(id: string){
        if (!id) throw new ServerError("Id is required")
        const news = this.newsRepository.delete(id)

    }

    
}