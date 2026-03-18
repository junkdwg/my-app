FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# กำหนดค่า default (สามารถ override ด้วย -e ตอน docker run)
ENV PORT=3000
ENV APP_VERSION=1.0.1
ENV APP_NAME=my-app

EXPOSE $PORT
CMD ["node", "src/index.js"]