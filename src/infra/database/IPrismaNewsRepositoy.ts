import { Photo } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { News } from "../../domain/entities/news";
import { INewsRepository } from "../../domain/repositorys/INewsRepository";

export class IPrismaNewsRepository implements INewsRepository {
  async getAll(): Promise<News[]> {
    return await prisma.news.findMany({
      include: {
        photo: true
      },
      orderBy: {
        date: "desc"
      }
    });
  }

  async getById(id: string): Promise<News | null> {
    return await prisma.news.findUnique({
      where: { id },
      include: {
        photo: true
      }
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.news.delete({
      where: { id },
    });
  }

  async create(data: News): Promise<News | null> {
    return await prisma.news.create({
      data: {
        id: data.id,
        title: data.title,
        content: data.content,
        adminId: data.adminId,
        author: data.author,
        date: data.date,
        photo: data.photo?.length
          ? {
              create: data.photo.map(p => ({
                id: p.id,
                url: p.url
              }))
            }
          : undefined
      },
      include: {
        photo: true
      }
    });
  }

  async update(data: Partial<News>, id: string): Promise<News | null> {
    // Atualização inteligente das fotos
    const photoData = data.photo?.length
      ? {
          deleteMany: {}, // Remove as antigas (substituição completa)
          create: data.photo.map(p => ({ id: p.id, url: p.url }))
        }
      : undefined;

    return await prisma.news.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        date: data.date,
        photo: photoData
      },
      include: {
        photo: true
      }
    });
  }

      async updatePhoto(photoId: string, photoURLs: string): Promise<Photo> {
          const photo = await prisma.photo.update({
              where: { id: photoId },
              data: {
                  url: photoURLs
              }
          })
  
          return photo
      }
  
      async findPhoto(photoId: string): Promise<Photo | null> {
          const photo = await prisma.photo.findUnique({
              where: { id: photoId }
          })
  
          return photo;
      }
}
