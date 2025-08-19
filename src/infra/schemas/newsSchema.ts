import { z } from "zod";

export const newsSchema = z.object({
  id: z.string().uuid(),         
  title: z.string().min(3, "Título muito curto"),
  content: z.string().min(10, "Conteúdo muito curto"),
  adminId: z.string().uuid(),
  date: z.date().default(() => new Date())
});

export type NewsSchema = z.infer<typeof newsSchema>;
