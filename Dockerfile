# ใช้ Node.js เวอร์ชั่น 18 ขนาดเล็ก
FROM node:18-alpine

# กำหนด working directory ใน container
WORKDIR /app

# copy package.json ก่อน เพื่อ cache dependencies
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install --production

# copy โค้ดทั้งหมด
COPY . .

# เปิด port 3000
EXPOSE 3000

# คำสั่งรัน app
CMD ["node", "src/index.js"]

#สร้างไฟล์ `.dockerignore` เพื่อไม่ copy ไฟล์ที่ไม่จำเป็น:
#node_modules
#.git
#.github
#*.log