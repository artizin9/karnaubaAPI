import { z } from "zod";

export const newsSchema = z.object({ 
  title: z.string().min(3, "Título muito curto"),
  content: z.string().min(10, "Conteúdo muito curto"),
  author: z.string(),
  photoURLs: z.array(z.string()).default([]),
  date: z.date().default(() => new Date()),
});

export const newsSchemaUpdate = z.object({ 
  title: z.string().min(3, "Título muito curto"),
  content: z.string().min(10, "Conteúdo muito curto"),
  author: z.string(),
  photo: z.any(),
  date: z.date().default(() => new Date()),
});

export type NewsSchema = z.infer<typeof newsSchema>;
