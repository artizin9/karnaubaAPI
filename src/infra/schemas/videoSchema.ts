import { z } from "zod";

export const videoSchema = z.object({
    description: z.string(),
    title: z.string(),
    videoURL: z.any(),
})

export type videoSchemaDTO = z.infer<typeof videoSchema>