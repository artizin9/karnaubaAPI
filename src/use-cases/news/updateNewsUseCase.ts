import { INewsRepository } from "../../domain/repositorys/INewsRepository";
import { newsSchema, NewsSchema, newsSchemaUpdate } from "../../infra/schemas/newsSchema";
import { ServerError } from "../../infra/utils/serverError";
import { updateDefineFields } from "../../infra/utils/updateDefinedFields";

export class UpdateNewsUseCase {
    constructor(
        private newsRepository: INewsRepository,
    ) { }

    async execute(data: NewsSchema, id: string) {
        const parsedData = newsSchemaUpdate.partial().safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad Request");

        const isNewsExist = await this.newsRepository.getById(id);
        if (!isNewsExist) throw new ServerError("This news not exist", 404);

        if (parsedData.data.photo && parsedData.data.photo[0]) {
           isNewsExist.photo[0].url = parsedData.data.photo[0].url
        }

        updateDefineFields(isNewsExist, parsedData.data);
        await this.newsRepository.update(isNewsExist, id);
    }
}
