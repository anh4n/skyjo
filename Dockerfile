FROM node:18.16.0-alpine as builder
ARG GIT_COMMIT
ENV GIT_COMMIT=$GIT_COMMIT

WORKDIR /app
COPY . /app

RUN npm ci && npm run build

FROM nginx:1.27.3-alpine-slim

LABEL org.opencontainers.image.source=https://github.com/anh4n/skyjo
LABEL org.opencontainers.image.description="Skyjo"

COPY --from=builder /app/dist /usr/share/nginx/html
