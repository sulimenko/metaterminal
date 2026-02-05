FROM node:18-alpine
WORKDIR /usr/server
RUN apk add --no-cache tini
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV NODE_ENV=production
ENV NODE_OPTIONS=--max-old-space-size=2560
EXPOSE 8000
ENTRYPOINT ["/sbin/tini","--"]
CMD ["npm", "start"]
