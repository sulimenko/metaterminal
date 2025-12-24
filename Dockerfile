FROM node:24-alpine
WORKDIR /usr/server
COPY . .
RUN npm ci --only=production
EXPOSE 8001
CMD ["node", "server.js"]
