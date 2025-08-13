import { FastifyInstance } from "fastify";
import fastifyStatic from "@fastify/static"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function staticFilesPlugin(fastify: FastifyInstance) {
    const pathToUploads = join(__dirname, '..', '..', '..', '..', 'uploads');
    fastify.register(fastifyStatic, {
        root: pathToUploads,
        prefix: '/uploads/',
    });
}
