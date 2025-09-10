import { CreateVideoUseCase } from "../../../use-cases/videos/createVideoUseCase";
import { DeleteVideoUseCase } from "../../../use-cases/videos/deleteVideoUseCase";
import { GetAllVideoUseCase } from "../../../use-cases/videos/getAllVideoUseCase";
import { GetIdVideoUseCase } from "../../../use-cases/videos/getIdVideoUseCase";
import { UpdateVideoUseCase } from "../../../use-cases/videos/updateVideoUseCase";
import { IPrismaVideoRepository } from "../../database/IPrismaVideoRepository";
import { PhotoStorageService } from "../../services/photoStorageService";
import { VideoStorageService } from "../../services/videoStorageService";
import { VideoController } from "../controllers/videoController";
import { Multipart } from "../plugins/multipart";

const videoRepository = new IPrismaVideoRepository();

const videoStorage = new VideoStorageService();
const photoStorage = new PhotoStorageService();

const multipart = new Multipart(photoStorage, videoStorage);

const createVideoUseCase = new CreateVideoUseCase(videoRepository);
const updateVideoUseCase = new UpdateVideoUseCase(videoRepository);
const videoGetAllUseCase = new GetAllVideoUseCase(videoRepository);
const deleteVideoUseCase = new DeleteVideoUseCase(
  videoRepository,
  videoStorage
);
const videoGetUniqueUseCase = new GetIdVideoUseCase(videoRepository);

export const videoInstance = new VideoController(
  createVideoUseCase,
  updateVideoUseCase,
  deleteVideoUseCase,
  videoGetUniqueUseCase,
  videoGetAllUseCase,
  multipart
);
