import { INewsRepository } from "../../domain/repositorys/INewsRepository";
import { newsSchema, NewsSchema } from "../../infra/schemas/newsSchema";
import { ServerError } from "../../infra/utils/serverError";
import { updateDefineFields } from "../../infra/utils/updateDefinedFields";

export class UpdateNewsUseCase {
    constructor(
        private newsRepository: INewsRepository,
    ){}

    async execute(data: NewsSchema, id: string){
        const parsedData = newsSchema.safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad Request");

        const isNewsExist = await this.newsRepository.getById(id);
        if (!isNewsExist) throw new ServerError("This news not exist", 404);

        updateDefineFields(isNewsExist, parsedData.data);
        await this.newsRepository.update(isNewsExist, id);
    }
}
