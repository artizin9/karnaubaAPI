import { IPrismaNewsRepository } from "../../infra/database/IPrismaNewsRepositoy";
import { ServerError } from "../../infra/utils/serverError";

export class GetAllNewsUseCase {
    constructor(
        private newsRepository: IPrismaNewsRepository
    ){}

    async execute(id: string){
        if (!id) throw new ServerError("Id is required")
        const news = this.newsRepository.delete(id)

        return news
    }

    
}