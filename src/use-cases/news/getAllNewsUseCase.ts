import { IPrismaNewsRepository } from "../../infra/database/IPrismaNewsRepositoy";

export class GetAllNewsUseCase {
    constructor(
        private newsRepository: IPrismaNewsRepository
    ){}

    async execute(){
        const news = this.newsRepository.getAll()

        return news
    }

    
}