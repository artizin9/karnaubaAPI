import { prisma } from "../../config/prisma";
import { Video } from "../../domain/entities/video";
import { IVideoRepository } from "../../domain/repositorys/IVideoRepository";

export class IPrismaVideoRepository implements IVideoRepository {

    async getAll(): Promise<Video[]> {
        const videos = await prisma.video.findMany();
        return videos;
    }

    async create(data: Video): Promise<Video | null> {
        const video = await prisma.video.create({
            data: { ...data}
        })

        return video;
    }

    async update(data: Video): Promise<Video | null> {
        const video = await prisma.video.update({
            where: {id: data.id},
            data: { ...data }
        })

        return video
}

    async delete(options: { id?: string; filename?: string }): Promise<void> {
        if (options.id) {
            await prisma.video.delete({
                where: {id: options.id}
            })
        }

}}