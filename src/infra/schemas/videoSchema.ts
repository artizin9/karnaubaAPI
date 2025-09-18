import { z } from "zod";

export const videoSchema = z.object({
    description: z.string(),
    title: z.string(),
    videoURL: z.any(),
    photoURL: z.any().optional()
})

export type videoSchemaDTO = z.infer<typeof videoSchema>