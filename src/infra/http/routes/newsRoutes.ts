import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middleware/authMiddleware";
import { controllerNews } from "../instances/newsInstance";

export function createNewsRoutes(fastify: FastifyInstance){
    fastify.post("/news", {preHandler: authMiddleware}, (req, res) => controllerNews.create({req, res}))
}

export function updateNewsRoutes(fastify: FastifyInstance){
    fastify.put("/news/:id", {preHandler: authMiddleware}, (req, res) => controllerNews.update({req, res}))
}

export function getAllNewsRoutes(fastify: FastifyInstance){
    fastify.get("/news", (req, res) => controllerNews.getAll({req, res}))
}

export function getByIdNewsRoutes(fastify: FastifyInstance){
    fastify.get("/news/:id", (req, res) => controllerNews.getById({req, res}))
}

export function deleteNewsRoutes(fastify: FastifyInstance){
    fastify.delete("/news/:id", {preHandler: authMiddleware}, (req, res) => controllerNews.delete({req, res}))
}

export function updatePhotoNewsRoutes(fastify: FastifyInstance){
    fastify.put('/news/photo/:id', {preHandler: authMiddleware}, (req, res) => controllerNews.updtePhoto({req, res}))
}
