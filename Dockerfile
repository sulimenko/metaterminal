FROM node:24-alpine
WORKDIR /usr/server
COPY . .
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; then npm ci --only=production; else npm ci; fi
EXPOSE 8001
CMD ["node", "server.js"]
