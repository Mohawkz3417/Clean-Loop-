FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json* ./
RUN npm install --omit=dev --no-audit --no-fund
COPY server ./server
COPY client/dist ./client/dist
EXPOSE 8080
CMD ["node", "server/index.js"]
