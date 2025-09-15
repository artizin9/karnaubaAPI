import { FastifyInstance } from "fastify";
import fastifyStatic from "@fastify/static"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function staticFilesPlugin(fastify: FastifyInstance) {
    const pathToUploads = join(__dirname, '..', '..', '..', '..', 'uploads');
    const videosPath = join(__dirname, '..', '..', '..', '..', 'videos');

    fastify.register(fastifyStatic, {
        root: pathToUploads,
        prefix: '/uploads/',
        decorateReply: false
    });
    fastify.register(fastifyStatic, {
        root: videosPath,
        prefix: '/videos/', 
        decorateReply: false
    });
}

