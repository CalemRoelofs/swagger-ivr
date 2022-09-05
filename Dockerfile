# Compile TS to JS
FROM node:16-alpine as builder

WORKDIR /app

COPY package*.json /app
COPY tsconfig.json /app
RUN npm ci

COPY ./src/ /app/src/
RUN npm run build

# Build
FROM node:16-alpine

WORKDIR /app

COPY package*.json /app
COPY ./openapi.yaml /app
COPY --from=builder /app/dist/ /app/

RUN npm ci --omit=dev

USER node

CMD ["node", "index.js"]