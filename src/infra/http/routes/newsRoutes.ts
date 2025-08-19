import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middleware/authMiddleware";
import { controllerNews } from "../instances/newsInstance";

export function createNewsRoutes(fastify: FastifyInstance){
    fastify.post("/news", {preHandler: authMiddleware}, (req, res) => controllerNews.create({req, res}))
}

export function updateNewsRoutes(fastify: FastifyInstance){
    fastify.put("/news/:id", {preHandler: authMiddleware}, (req, res) => controllerNews.update({req, res}))
}
