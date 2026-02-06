FROM node:24-alpine
RUN apk add --no-cache tini
WORKDIR /usr/server
COPY . .
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ENV NODE_OPTIONS=--max-old-space-size=2560
RUN if [ "$NODE_ENV" = "production" ]; then npm ci --only=production; else npm ci; fi
EXPOSE 8000
ENTRYPOINT ["/sbin/tini","--"]
CMD ["npm", "start"]