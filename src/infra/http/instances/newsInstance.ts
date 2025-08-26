import { CreateNewsUseCase } from "../../../use-cases/news/createNewsUseCase";
import { DeleteNewsUseCase } from "../../../use-cases/news/deleteNewsUseCase";
import { GetAllNewsUseCase } from "../../../use-cases/news/getAllNewsUseCase";
import { GetByIdNewsUseCase } from "../../../use-cases/news/getByIdNewsUseCase";
import { UpdateNewsUseCase } from "../../../use-cases/news/updateNewsUseCase";
import { UpdatePhotoNewsUseCase } from "../../../use-cases/news/updatePhotoNewsUseCase";
import { IPrismaNewsRepository } from "../../database/IPrismaNewsRepositoy";
import { PhotoStorageService } from "../../services/photoStorageService";
import { NewsController } from "../controllers/newsController";
import { Multipart } from "../plugins/multipart";

const prismaRepository = new IPrismaNewsRepository();
const photoStorage = new PhotoStorageService();
const multipart = new Multipart(photoStorage);

const createNewsUseCase = new CreateNewsUseCase(prismaRepository)
const updateNewsUseCase = new UpdateNewsUseCase(prismaRepository)
const getAllNewsUseCase = new GetAllNewsUseCase(prismaRepository)
const getByIdNewsUseCase = new GetByIdNewsUseCase(prismaRepository)
const deleteNewsUseCase = new DeleteNewsUseCase(prismaRepository)
const updatePhotoNewsUseCase = new UpdatePhotoNewsUseCase(prismaRepository)

export const controllerNews = new NewsController(
    multipart,
    createNewsUseCase,
    updateNewsUseCase,
    getAllNewsUseCase,
    getByIdNewsUseCase,
    deleteNewsUseCase,
    updatePhotoNewsUseCase
)