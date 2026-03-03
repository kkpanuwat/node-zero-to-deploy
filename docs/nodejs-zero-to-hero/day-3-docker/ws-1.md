---
id: day-3-docker-ws-1
title: 'Workshop 1: Dockerizing Node.js'
sidebar_label: 'Workshop 1: Dockerizing Node.js'
---

## Craete Express.js server

### 1. สร้างโฟลเดอร์โปรเจกต์

```bash title="สร้าง folder และเข้าไปที่ folder"
mkdir docker-node-workshop-1
cd docker-node-workshop-1
```

### 2. Initial prject
```bash title="สร้าง file package.json"
npm init -y
```

<p align="center">
  <img src={require('../../../static/img/day-3/ws-1/1.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

### 3. ติดตั้ง Express
```bash
npm install express
```

<p align="center">
  <img src={require('../../../static/img/day-3/ws-1/2.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

### 4. สร้างไฟล์ index.js
```js
const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Docker Node.js!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

<p align="center">
  <img src={require('../../../static/img/day-3/ws-1/3.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

### 5. แก้ไข package.json เพิ่ม start script
```json
"scripts": {
  "start": "node index.js"
}
```

<p align="center">
  <img src={require('../../../static/img/day-3/ws-1/4.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

### 6. ทดสอบรัน script ด้วย node
```bash
npm start
```
<p align="center">
  <img src={require('../../../static/img/day-3/ws-1/5.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

### 7. ทดสอบเข้า Browser
```
http://localhost:3000
```

<p align="center">
  <img src={require('../../../static/img/day-3/ws-1/6.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>


---

## Create Dockerfile

### 1. สร้าง Dockerfile

``` title="ไม่มีนามสกุลไฟล์"
Dockerfile
```

<p align="center">
  <img src={require('../../../static/img/day-3/ws-1/7.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

### 2. สร้าง Dockerfile
```Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

<p align="center">
  <img src={require('../../../static/img/day-3/ws-1/8.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

---

## ทำไมต้องใช้ `node:20-alpine` ?

**Alpine Linux** เป็นดิสโทรที่ “เล็ก” มาก ทำให้ base image ของเรามีขนาดเล็กลงตามไปด้วย

- ถ้าใช้ `node:20` (Debian/Ubuntu-based) ขนาด image มัก **ใหญ่กว่า** มาก (หลายร้อย MB ไปจนถึงระดับ ~1GB ได้ ขึ้นอยู่กับ tag/ชั้น layer และสิ่งที่ติดตั้งเพิ่ม)
- ถ้าใช้ `node:20-alpine` ขนาด base มัก **เล็กกว่า** มาก (ระดับหลักสิบถึงร้อยกว่า MB)

ผลลัพธ์ที่ได้:
- **Pull/Push เร็วขึ้น** (ดาวน์โหลด/อัปโหลด image น้อยลง)
- **Build/Deploy เร็วขึ้น** และใช้พื้นที่ disk น้อยลง

> หมายเหตุ: Alpine ใช้ `musl libc` (ไม่ใช่ `glibc`) บางแพ็กเกจที่เป็น native module อาจต้องติดตั้ง build tools เพิ่ม หรือบางเคสอาจเข้ากันไม่ได้ 100% ถ้าเจอปัญหาให้ลองเปลี่ยนไปใช้ `node:20-slim` แทน

---

## ทำไมต้องแยก `COPY package*.json ./` ออกมาก่อน?

เหตุผลหลักคือ **Docker Layer Caching** (การแคชเป็นชั้น ๆ)

Dockerfile ทำงานเป็น “ชั้น (layer)” ตามลำดับบรรทัด:

1) `COPY package*.json ./`  
2) `RUN npm install`  
3) `COPY . .`  

แนวคิด:
- ถ้าเราแก้โค้ดในโปรเจกต์ (เช่น `index.js`) แต่ **dependencies ไม่เปลี่ยน** (`package.json` / `package-lock.json` เหมือนเดิม)
- Docker จะใช้ cache ของ layer `RUN npm install` ได้ → **ไม่ต้องรัน `npm install` ใหม่**
- ทำให้ build รอบถัดไป **เร็วขึ้นมาก** เพราะขั้น `npm install` เป็นขั้นที่ช้าที่สุดในหลายโปรเจกต์

ถ้าเราเขียนแบบนี้แทน:

```Dockerfile
COPY . .
RUN npm install
```

แค่ไฟล์โค้ดเปลี่ยน 1 บรรทัด Docker จะมองว่า layer `COPY . .` เปลี่ยน → layer `RUN npm install` ต้องรันใหม่ทุกครั้ง (เสียเวลา)

### 3. Build Docker Image
```bash
docker build -t my-node-app .
```

<p align="center">
  <img src={require('../../../static/img/day-3/ws-1/9.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

เช็คว่า image ถูกสร้างแล้ว

```bash
docker images
```

### 4. Run Container
```bash
docker run -p 3000:3000 my-node-app
```

### 5. ทดสอบ Export Image
```bash
docker save -o my-node-app.tar my-node-app
```

<p align="center">
  <img src={require('../../../static/img/day-3/ws-1/10.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

### 6. ลบ Image my-node-app เดิม
```bash title="ลบ container ที่ใช้ image และลบ image"
docker rm -f $(docker ps -aq --filter ancestor=my-node-app)
docker rmi my-node-app
```

### 7. Import image (จำลองการ import image จากเครื่องอื่น)
```bash
docker load -i my-node-app.tar
```

<p align="center">
  <img src={require('../../../static/img/day-3/ws-1/11.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>
