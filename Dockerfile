# Dockerfile for Node JS app
FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 1234
CMD ["npm", "start"]
