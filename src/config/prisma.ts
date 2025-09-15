import { PrismaClient } from "@prisma/client";
import { env } from "./env";

const url = env.DATABASE_URL
export const prisma = new PrismaClient({
    datasources: {
        db: {
            url: url
        }
    }
})