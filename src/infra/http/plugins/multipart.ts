import { FastifyRequest } from "fastify";
import { PhotoStorageService } from "../../services/photoStorageService";
import { PhotoStorageType } from "../../dto/photoStorageDTO";
import { VideoStorageService } from "../../services/videoStorageService";
import { Readable } from "stream";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import ffprobePath from "@ffprobe-installer/ffprobe";

ffmpeg.setFfmpegPath(ffmpegPath.path);
ffmpeg.setFfprobePath(ffprobePath.path);

export class Multipart {
  constructor(
    private photoStorage: PhotoStorageService,
    private videoStorage: VideoStorageService
  ) {}

  async handleDataMultipart(
    req: FastifyRequest,
    type: PhotoStorageType,
    updatedPhoto: boolean = false
  ) {
    const data = req.parts();
    let rawFields: any = {};
    let photoURLs: string[] = [];

    for await (const part of data) {
      if (part.type === "file" && part.filename) {
        const buffer = await part.toBuffer();
        const { filename, mimetype } = part;

          const url = await this.photoStorage.save({ buffer, filename, mimetype }, type);
          photoURLs.push(url);
      } else if (part.type === "field") {
        rawFields[part.fieldname] = part.value;
      }
    }

    if (photoURLs.length > 0) {
      rawFields.photoURLs = photoURLs;
      if (updatedPhoto) rawFields.photoURL = photoURLs[0];
    }

    return rawFields;
  }

  async handleVideoMultipart(req: FastifyRequest) {
    const data = await req.parts();
    let rawFields: any = {};
    let videoBuffer: Buffer | null = null;
    let mimetype: string | null = null;
    let fileName: string | null = null;
    let videoURL: string | null = null;

    for await (const part of data) {
      if (part.type === "file" && part.filename) {
        const buffer = await part.toBuffer();
        const { filename } = part;

        if (part.mimetype.startsWith("video/")) {
          videoURL = await this.videoStorage.save({ buffer, filename, mimetype: part.mimetype });
          rawFields.videoURL = videoURL;

          videoBuffer = buffer;
          mimetype = part.mimetype;
          fileName = filename;
        }

        if (part.fieldname === 'photoURL' && !rawFields.photoURL) {
          const url = await this.photoStorage.save({ buffer, filename, mimetype: part.mimetype }, "thumbnails");
          rawFields.photoURL = url;
        }
      } else if (part.type === "field") {
        rawFields[part.fieldname] = part.value;
      }
    }

    if (!videoBuffer || !mimetype) {
      return { rawFields, duration: 0, fileName };
    }

    const stream = Readable.from(videoBuffer);
    const duration = await new Promise<number>((resolve, reject) => {
      ffmpeg(stream)
        .inputFormat(mimetype.split("/")[1])
        .ffprobe((err, metadata) => {
          if (err) return reject(err);
          resolve(metadata.format.duration || 0);
        });
    });

    return { rawFields, duration, fileName };
  }
}
