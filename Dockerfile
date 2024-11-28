FROM node:18.16.0-alpine as builder
ARG GIT_COMMIT
ENV GIT_COMMIT=$GIT_COMMIT

LABEL org.opencontainers.image.source=https://github.com/anh4n/skyjo
LABEL org.opencontainers.image.description="Skyjo"

WORKDIR /app
COPY . /app

RUN npm ci && npm run build

FROM nginx:1.25.5

COPY --from=builder /app/dist /usr/share/nginx/html
