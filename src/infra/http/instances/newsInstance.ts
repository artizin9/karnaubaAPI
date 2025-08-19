import { CreateNewsUseCase } from "../../../use-cases/news/createNewsUseCase";
import { UpdateNewsUseCase } from "../../../use-cases/news/updateNewsUseCase";
import { IPrismaNewsRepository } from "../../database/IPrismaNewsRepositoy";
import { PhotoStorageService } from "../../services/photoStorageService";
import { NewsController } from "../controllers/newsController";
import { Multipart } from "../plugins/multipart";

const prismaRepository = new IPrismaNewsRepository();
const photoStorage = new PhotoStorageService();
const multipart = new Multipart(photoStorage);

const createNewsUseCase = new CreateNewsUseCase(prismaRepository);
const updateNewsUseCase = new UpdateNewsUseCase(prismaRepository);

export const controllerNews = new NewsController(
    multipart,
    createNewsUseCase,
    updateNewsUseCase
)