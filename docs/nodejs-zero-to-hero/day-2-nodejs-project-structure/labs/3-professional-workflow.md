---
id: day-2-lab-3-professional-workflow
title: 'Lab 3: Professional Workflow'
sidebar_label: '3. Professional Workflow'
---

**เป้าหมาย:** ทำให้การพัฒนาโปรเจกต์ง่ายขึ้นด้วย `nodemon` และจัดการ Configuration อย่างถูกต้องด้วย `.env`

> Timebox แนะนำ: 30–45 นาที

### 3.1: ติดตั้งและใช้งาน `nodemon`
`nodemon` คือเครื่องมือที่จะรีสตาร์ทเซิร์ฟเวอร์ให้เราอัตโนมัติทุกครั้งที่เราแก้ไขโค้ด
1.  **ติดตั้ง `nodemon` เป็น devDependency:**
    ```bash
    npm install --save-dev nodemon
    ```
    `--save-dev` หรือ `-D` บอกว่าเครื่องมือนี้ใช้เฉพาะตอนพัฒนาเท่านั้น
2.  **เพิ่ม `scripts` ใน `package.json`:**
    เปิด `package.json` และเพิ่มส่วน `scripts` เข้าไป:
    ```json
    "scripts": {
      "start": "node src/server.js",
      "dev": "nodemon src/server.js"
    },
    ```
- **ทดลองรัน:** `npm run dev`. ตอนนี้เซิร์ฟเวอร์ของคุณจะรีสตาร์ทเองทุกครั้งที่เซฟไฟล์!

### 3.2: จัดการ Environment Variables ด้วย `dotenv`
เราไม่ควร Hardcode ค่าตั้งค่าอย่าง `PORT` ไว้ในโค้ด
1.  **ติดตั้ง `dotenv`:**
    ```bash
    npm install dotenv
    ```
2.  **สร้างไฟล์ `.env` และ `.env.example`:**
    - `.env.example` จะเป็นตัวอย่างให้เพื่อนร่วมทีมรู้ว่าต้องตั้งค่าอะไรบ้าง
      ```bash
      printf "PORT=3000\n" > .env.example
      ```
    - `.env` คือไฟล์ที่เราใช้จริง และ **ห้าม Commit ขึ้น Git**
      ```bash
      cp .env.example .env
      ```
3.  **นำ `dotenv` ไปใช้งาน:**
    เพิ่ม 2 บรรทัดนี้ไว้ **บนสุด** ของ `src/server.js`:
    ```javascript
    // src/server.js
    require('dotenv').config();
    ```
4.  **แก้ไขโค้ดเพื่ออ่านค่าจาก `.env`:**
    เปลี่ยนส่วน `listen` ใน `src/server.js`
    ```javascript
    // src/server.js
    // ...
    const port = process.env.PORT || 3000; // อ่านค่า PORT จาก .env ถ้าไม่มีให้ใช้ 3000
    server.listen(port, () => {
      log(`Server is running at http://localhost:${port}`);
    });
    ```
**✅ Checkpoint:**
- คุณสามารถรันโปรเจกต์ด้วย `npm run dev`
- ลองเปลี่ยนค่า `PORT` ในไฟล์ `.env` เป็น `4000` แล้วรัน `npm run dev` ใหม่ เซิร์ฟเวอร์ควรจะไปรันที่พอร์ต 4000

### Mini Challenges (ถ้ามีเวลา)

1. เพิ่ม script `npm run start` (สำหรับ production-ish) และ `npm run dev` (สำหรับพัฒนา)
2. ตั้งค่า `.env.example` ให้ครบ: `PORT=3000` และ (ถ้าทำ persistence) `DATA_DIR=data`
