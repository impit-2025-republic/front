
FROM oven/bun:slim AS builder

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./bun.lockb

RUN bun i --silent

COPY . .

RUN bun run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]