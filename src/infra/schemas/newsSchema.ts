import { z } from "zod";

export const newsSchema = z.object({ 
  title: z.string().min(3, "Título muito curto"),
  content: z.string().min(10, "Conteúdo muito curto"),
  adminId: z.string().uuid(),
  author: z.string(),
  photoURLs: z.string(),
  date: z.date().default(() => new Date())
});

export type NewsSchema = z.infer<typeof newsSchema>;
