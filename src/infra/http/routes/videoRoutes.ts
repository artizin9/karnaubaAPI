import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middleware/authMiddleware";
import { videoInstance } from "../instances/videoInstance";

export function createVideo(fastify: FastifyInstance){
    fastify.post("/video", {preHandler: authMiddleware}, (req, res) => videoInstance.create({req, res}));
}

export function findAllVideo(fastify: FastifyInstance){
    fastify.get("/video", (req, res) => videoInstance.getAll({req, res}));
}

export function findUniqueVideo(fastify: FastifyInstance){
    fastify.get("/video/:unique", (req, res) => videoInstance.getUnique({req, res}));
}

export function updateVideo(fastify: FastifyInstance){
    fastify.put("/video/:id", {preHandler: authMiddleware}, (req, res) => videoInstance.update({req, res}));
}

export function deleteVideo(fastify: FastifyInstance){
    fastify.delete("/video/:id", {preHandler: authMiddleware}, (req, res) => videoInstance.delete({req, res}));
}

