import { FastifyRequest } from "fastify";
import { PhotoStorageService } from "../../services/photoStorageService";
import { PhotoStorageType } from "../../dto/photoStorageDTO";
import { VideoStorageService } from "../../services/videoStorageService";
import { Readable } from "stream";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import ffprobePath from "@ffprobe-installer/ffprobe"

ffmpeg.setFfmpegPath(ffmpegPath.path);
ffmpeg.setFfprobePath(ffprobePath.path);

export class Multipart {
    constructor(private photoStorage: PhotoStorageService, private videoStorage: VideoStorageService) { };

    async handleDataMultipart(req: FastifyRequest, type: PhotoStorageType, updatedPhoto: boolean = false) {
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

        rawFields.photoURLs = photoURLs;
        return updatedPhoto ? rawFields.photoURL = photoURLs[0] : rawFields;
    }

    async handleVideoMultipart(req: FastifyRequest) {
        const data = await req.parts()
        let rawFields: any = {};
        let fileName = null
        for await (const part of data) {
            if (part.type === 'file' && part.filename) {
                const buffer = await part.toBuffer()
                const { filename, mimetype } = part

                const url = await this.videoStorage.save({ buffer, filename, mimetype })
                rawFields[part.fieldname] = url
                rawFields.buffer = buffer;
        rawFields.mimetype = mimetype;
                fileName = filename
            } else if (part.type === 'field') rawFields[part.fieldname] = part.value
        }

        const stream = Readable.from(rawFields.buffer)
        const duration = await new Promise<number>((resolve, reject) => {
            ffmpeg(stream)
                .inputFormat(rawFields.mimetype?.split("/")[1])
                .ffprobe((err, metadata) => {
                    if (err) return reject(err);
                    resolve(metadata.format.duration || 0);
                });
        });

        return { rawFields, duration, fileName }
    }
}