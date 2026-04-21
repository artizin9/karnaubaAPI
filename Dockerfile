FROM node:20-slim AS build

# Instalando dependências necessárias para o Prisma e PNPM
RUN apt-get update -y && apt-get install -y openssl
RUN corepack enable && corepack prepare pnpm@10.6.3 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .


RUN npx prisma generate
RUN pnpm build

# Estágio de Execução 
FROM node:20-slim AS runner

RUN apt-get update -y && apt-get install -y openssl
RUN corepack enable && corepack prepare pnpm@10.6.3 --activate

WORKDIR /app

# Copiamos apenas o que é necessário para rodar
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/fix-imports.mjs ./fix-imports.mjs

EXPOSE 4444

CMD ["pnpm", "start"]