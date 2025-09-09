import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middleware/authMiddleware";
import { videoInstance } from "../instances/videoInstance";

export function createVideo(fastify: FastifyInstance){
    fastify.post("/video", {preHandler: authMiddleware}, (req, res) => videoInstance.create({req, res}));
}

export function getAllVideo(fastify: FastifyInstance){
    fastify.get("/video", (req, res) => videoInstance.getAll({req, res}));
}

export function getIdVideo(fastify: FastifyInstance){
    fastify.get("/video/:id", (req, res) => videoInstance.getUnique({req, res}));
}

export function updateVideo(fastify: FastifyInstance){
    fastify.put("/video/:id", {preHandler: authMiddleware}, (req, res) => videoInstance.update({req, res}));
}

export function deleteVideo(fastify: FastifyInstance){
    fastify.delete("/video/:id", {preHandler: authMiddleware}, (req, res) => videoInstance.delete({req, res}));
}

export function watchVideo(fastify: FastifyInstance){
    fastify.get('video/:filename', (req, res) => videoInstance.getWatch({req, res}))
}

