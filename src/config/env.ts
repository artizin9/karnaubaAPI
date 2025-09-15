import dotenv from 'dotenv';

const path = process.env.NODE_ENV === 'production' ? '.prod.env' : '.dev.env';
dotenv.config({path: path});

export const env = {
    DATABASE_URL: process.env.DATABASE_URL as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    PORT: process.env.PORT,
    PORTFRONT: process.env.PORTFRONT,
    NODE_ENV: process.env.NODE_ENV || 'development',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GMAIL_USER: process.env.GMAIL_USER as string,
    PASSWORD_GMAIL: process.env.PASSWORD_GMAIL as string,
    REDIS_URL: process.env.REDIS_URL as string
}
