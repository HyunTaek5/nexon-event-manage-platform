FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build auth

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/auth ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .

ENV NODE_ENV=production

EXPOSE 8001

CMD ["node", "dist/main.js"]
