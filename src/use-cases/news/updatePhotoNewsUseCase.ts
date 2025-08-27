import { INewsRepository } from "../../domain/repositorys/INewsRepository";
import { photoSchema } from "../../infra/schemas/photoSchema";
import { ServerError } from "../../infra/utils/serverError";

export class UpdatePhotoNewsUseCase {
    constructor(
        private newsRepository: INewsRepository
    ) { }

    async execute(id: string, photoURLs: string) {
        const parsedData = photoSchema.safeParse({ photoURLs });
        console.log("data: ", parsedData.data)
        if (!parsedData.success) throw new ServerError("Bad request");

        const isPhotoExist = await this.newsRepository.findPhoto(id);
        console.log("isphoto: ", isPhotoExist)
        if (!isPhotoExist) throw new ServerError("Photo not found", 404);

        const updatedPhoto = await this.newsRepository.updatePhoto(id, photoURLs);
        return updatedPhoto;
    }
}