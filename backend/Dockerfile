FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json package-lock.json* ./
RUN npm ci --omit=dev || npm install

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY package*.json package-lock.json* ./
RUN npm install --production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src

EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "dist/server.js"]
