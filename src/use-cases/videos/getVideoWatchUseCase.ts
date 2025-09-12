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

    let start = 0
    let end = fileSize - 1
    let chunkSize = fileSize
    let stream

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        start = parseInt(parts[0], 10)
        end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
        chunkSize = end - start + 1
    }

    stream = createReadStream(videoPath, { start, end })

    return {
        start,
        end,
        chunkSize,
        stream,
        fileSize
    }
}

}