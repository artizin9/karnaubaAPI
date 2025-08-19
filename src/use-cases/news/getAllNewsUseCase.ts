import { INewsRepository } from "../../domain/repositorys/INewsRepository"

export class GetAllNewsUseCase {
    constructor(
        private newsRepository: INewsRepository
    ){}

    async execute(){
        const news = this.newsRepository.getAll()

        return news
    }

    
}