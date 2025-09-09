import { join } from "path"
import { ServerError } from "../../infra/utils/serverError"
import { createReadStream, statSync } from "fs"
import { FastifyRequest } from "fastify"

export class GetWatchUseCase {
    constructor() { }

    async execute(filename: string, req: FastifyRequest) {
        const videoPath = join(process.cwd(), 'videos', filename)

        // verifica se o arquivo existe
        const stat = statSync(videoPath)
        const fileSize = stat.size
        const range = req.headers.range

        if (!range) throw new ServerError("Not range")

        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
        const chunkSize = end - start + 1
        const stream = createReadStream(videoPath, { start, end })

        return {
            start,
            end,
            chunkSize,
            stream,
            fileSize
        }
    }
}