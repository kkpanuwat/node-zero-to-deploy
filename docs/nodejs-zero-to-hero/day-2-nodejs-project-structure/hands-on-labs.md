---
id: day-2-hands-on-labs
title: 'Day 2: Hands-on Labs (8-Hour Workshop)'
sidebar_label: 'Hands-on Labs'
description: Workshop 8 ชั่วโมงเต็ม! สร้าง Library System API ตั้งแต่ศูนย์, เรียนรู้การทำ routing, persistence, refactoring, และ logging อย่างมืออาชีพ
---

# Part 4 — Hands-on Labs: สร้าง Library System API (Workshop 8 ชั่วโมง)

ยินดีต้อนรับสู่ Workshop Day 2! วันนี้เราจะใช้เวลาทั้งวันลงมือสร้าง "Library System" API ตั้งแต่ไฟล์แรกจนถึงโปรเจกต์ที่มีโครงสร้างสมบูรณ์ เตรียมกาแฟให้พร้อม แล้วมาเริ่มกันเลย!

**เป้าหมายสูงสุดของวันนี้:** สร้าง API Server ที่มีความสามารถครบถ้วน, โครงสร้างดี, พร้อมสำหรับการต่อยอดด้วย Express.js ในวันถัดไป

---

## ชั่วโมงที่ 1: วางรากฐานโปรเจกต์ (Project Foundation)

**เป้าหมาย:** สร้างโครงสร้างโปรเจกต์ที่สะอาด, พร้อมสำหรับ Git, และทุกคนในทีมสามารถเข้ามาทำงานต่อได้

### Lab 1.1: khởi tạo Project และ Git
1.  **สร้างโฟลเดอร์โปรเจกต์:**
    ```bash
    mkdir library-system
    cd library-system
    ```
2.  **เริ่มต้น `npm` project:**
    ```bash
    npm init -y
    ```
    คำสั่งนี้จะสร้างไฟล์ `package.json` ซึ่งเปรียบเสมือน "บัตรประชาชน" ของโปรเจกต์เรา

3.  **เริ่มต้น `git` repository:**
    ```bash
    git init
    ```
4.  **สร้าง `.gitignore` (สำคัญมาก!):**
    เพื่อบอกให้ Git ไม่ต้องสนใจไฟล์หรือโฟลเดอร์ที่เราไม่ต้องการเก็บในประวัติ
    ```bash
    # สร้างไฟล์ .gitignore และเพิ่มรายการที่ไม่ต้องการ track
    printf "node_modules\n.env\n*.log\n" > .gitignore
    ```
    เราจะ ignore `node_modules`, ไฟล์ `.env` ที่เก็บความลับ, และไฟล์ log ต่างๆ

### Lab 1.2: สร้างโครงสร้างโฟลเดอร์
เราจะใช้โครงสร้างพื้นฐานที่นิยมใช้กันในโปรเจกต์ Node.js
```bash
mkdir -p src/data src/utils
touch src/server.js src/data/books-in-memory.js src/utils/logger.js
```
- `src/`: โฟลเดอร์หลักสำหรับเก็บซอร์สโค้ดทั้งหมด
- `src/server.js`: ไฟล์เริ่มต้น (Entrypoint) ของแอปพลิเคชัน
- `src/data/`: สำหรับเก็บข้อมูลต่างๆ (ตอนนี้เป็นแค่ข้อมูลจำลอง)
- `src/utils/`: สำหรับเก็บฟังก์ชันช่วยเหลือที่ใช้ซ้ำๆ

### Lab 1.3: เพิ่มข้อมูลจำลอง
ใส่ข้อมูลหนังสือเบื้องต้นลงใน `src/data/books-in-memory.js`:
```javascript
// src/data/books-in-memory.js
const books = [
  { id: 1, title: 'JavaScript for Beginners', author: 'Alice' },
  { id: 2, title: 'Node.js Essentials', author: 'Bob' },
];

module.exports = { books };
```

**✅ Checkpoint ชั่วโมงที่ 1:**
- คุณมีโปรเจกต์ที่ init ทั้ง `npm` และ `git` แล้ว
- `package.json` และ `.gitignore` ถูกสร้างขึ้นอย่างถูกต้อง
- โครงสร้างโฟลเดอร์และไฟล์เบื้องต้นพร้อมใช้งาน
- ลองรัน `git status` และ `git add .` ตามด้วย `git commit -m "feat: initial project structure"` เพื่อบันทึกงานแรกของคุณ

---

## ชั่วโมงที่ 2: สร้างเซิร์ฟเวอร์ให้มีชีวิต (First HTTP Server)

**เป้าหมาย:** สร้าง HTTP Server ที่ทำงานได้จริง, ตอบกลับ Request ได้, และมี Endpoint แรกคือ `/health`

### Lab 2.1: สร้าง Logger ง่ายๆ
ใน `src/utils/logger.js`, เราจะสร้างฟังก์ชันสำหรับแสดง log พร้อมเวลา
```javascript
// src/utils/logger.js
function log(message) {
  const stamp = new Date().toISOString();
  console.log(`[${stamp}]`, message);
}

module.exports = { log };
```

### Lab 2.2: สร้างเซิร์ฟเวอร์ "Hello World"
ตอนนี้เราจะมาเขียนโค้ดใน `src/server.js` เพื่อให้มันกลายเป็นเซิร์ฟเวอร์จริงๆ
```javascript
// src/server.js
const http = require('http');
const { log } = require('./utils/logger');
const { books } = require('./data/books-in-memory');

const server = http.createServer((req, res) => {
  log(`Request received: ${req.method} ${req.url}`);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'Hello, World!' }));
});

const port = 3000;
server.listen(port, () => {
  log(`Server is running at http://localhost:${port}`);
});
```
- **ทดลองรัน:** เปิด Terminal แล้วรัน `node src/server.js`.
- **ทดสอบ:** เปิดเบราว์เซอร์ไปที่ `http://localhost:3000` คุณควรจะเห็นข้อความ `{"message":"Hello, World!"}`.

### Lab 2.3: เพิ่ม Endpoint `/health` และ `/books`
เราจะเพิ่ม Logic ง่ายๆ เพื่อจัดการกับ URL ที่แตกต่างกัน
```javascript
// แก้ไขส่วน http.createServer ใน src/server.js
const server = http.createServer((req, res) => {
  log(`Request received: ${req.method} ${req.url}`);
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && req.url === '/health') {
    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true, message: 'Server is healthy' }));
  }

  if (req.method === 'GET' && req.url === '/books') {
    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true, data: { books } }));
  }

  res.statusCode = 404;
  return res.end(JSON.stringify({ ok: false, error: 'Not Found' }));
});
```
- **หยุดเซิร์ฟเวอร์เก่า** (กด `Ctrl+C` ใน Terminal) แล้วรันใหม่: `node src/server.js`.

**✅ Checkpoint ชั่วโมงที่ 2:**
- คุณสามารถรันเซิร์ฟเวอร์และเห็น Log ใน Terminal
- `http://localhost:3000/health` ตอบกลับ `{ "ok": true, ... }`
- `http://localhost:3000/books` ตอบกลับรายการหนังสือ
- URL อื่นๆ ตอบกลับ `404 Not Found`

---

## ชั่วโมงที่ 3: จัดการ Workflow อย่างมือโปร (Professional Workflow)

**เป้าหมาย:** ทำให้การพัฒนาโปรเจกต์ง่ายขึ้นด้วย `nodemon` และจัดการ Configuration อย่างถูกต้องด้วย `.env`

### Lab 3.1: ติดตั้งและใช้งาน `nodemon`
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

### Lab 3.2: จัดการ Environment Variables ด้วย `dotenv`
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
      printf "PORT=3000\n" > .env
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
**✅ Checkpoint ชั่วโมงที่ 3:**
- คุณสามารถรันโปรเจกต์ด้วย `npm run dev`
- ลองเปลี่ยนค่า `PORT` ในไฟล์ `.env` เป็น `4000` แล้วรัน `npm run dev` ใหม่ เซิร์ฟเวอร์ควรจะไปรันที่พอร์ต 4000

---
*(เนื้อหาสำหรับชั่วโมงที่ 4-8 จะถูกเพิ่มในลักษณะเดียวกัน โดยมีรายละเอียดของแต่ละ Lab ย่อยๆ ที่ลึกขึ้น)*
---

## ชั่วโมงที่ 4-8 (สรุปเนื้อหาและ Labs ที่จะเพิ่ม)

เพื่อให้ครบ 8 ชั่วโมงเต็ม ผมจะขยายเนื้อหาในชั่วโมงที่เหลือให้ครอบคลุมหัวข้อต่อไปนี้ พร้อม Lab อย่างละเอียด:

- **ชั่วโมงที่ 4: Intelligent Routing & Responses**
    - **Lab 4.1: Refactor to use `URL` object:** แก้ไข `server.js` ให้จัดการกับ query string (`/books?limit=1`) ได้อย่างถูกต้อง
    - **Lab 4.2: Proper `404`/`405` Handling:** สร้าง Logic เพื่อตอบ `405 Method Not Allowed` เมื่อ Client ใช้ HTTP Method ผิด
    - **Lab 4.3: Create Response Helpers:** สร้าง `src/utils/response.js` ที่มีฟังก์ชัน `sendJson(res, ...)` และ `sendError(res, ...)` เพื่อลดการเขียนโค้ดซ้ำซ้อน

- **ชั่วโมงที่ 5: Handling User Input (`POST`)**
    - **Lab 5.1: Build `readJsonBody` helper:** สร้างฟังก์ชัน `async` เพื่ออ่าน Stream ของ Request Body และแปลงเป็น JSON
    - **Lab 5.2: Create an Input Validator:** สร้างฟังก์ชัน `validateBookInput` เพื่อตรวจสอบว่าข้อมูลที่ส่งมา (`title`, `author`) ถูกต้องตามกฎ
    - **Lab 5.3: Implement `POST /books` (in-memory):** รวมทุกอย่างเข้าด้วยกันเพื่อสร้าง Endpoint สำหรับเพิ่มหนังสือ (ตอนนี้ยังเก็บใน Memory)

- **ชั่วโมงที่ 6: Making Data Persistent**
    - **Lab 6.1: Setup `data/books.json`:** สร้างไฟล์ JSON เพื่อใช้เป็นฐานข้อมูลอย่างง่าย
    - **Lab 6.2: Build the Repository Layer:** สร้าง `src/repositories/books-repo.js` ที่มีฟังก์ชัน `getAllBooks` และ `addBook` ซึ่งจะทำหน้าที่อ่านและเขียนไฟล์ JSON
    - **Lab 6.3: Integrate Repository:** ปรับปรุง `server.js` ให้เรียกใช้ฟังก์ชันจาก Repository แทนการใช้ข้อมูลจาก Memory

- **ชั่วโมงที่ 7: Large-Scale Refactoring (สู่โครงสร้างแบบมืออาชีพ)**
    - **Lab 7.1: Create Route Handlers:** แยก Logic ของแต่ละ Endpoint (`/health`, `/books`) ออกไปเป็นไฟล์ของตัวเองใน `src/handlers/`
    - **Lab 7.2: Create a Main Router:** สร้าง `src/routes/index.js` เพื่อทำหน้าที่เป็น "ผู้จัดการจราจร" คอยแจกจ่าย Request ไปยัง Handler ที่ถูกต้อง
    - **Lab 7.3: Cleanup `server.js`:** ทำให้ `server.js` เหลือหน้าที่แค่สร้างเซิร์ฟเวอร์และส่งต่อ Request ทั้งหมดไปให้ Router ซึ่งเป็นโครงสร้างที่สะอาดและพร้อมต่อยอดมาก

- **ชั่วโมงที่ 8: Advanced Logging & Final Review**
    - **Lab 8.1: Upgrade the Logger:** พัฒนา `logger.js` ให้สามารถรับ "level" (`INFO`, `WARN`, `ERROR`) และ `requestId` เพื่อให้การดีบักในโปรเจกต์ใหญ่ๆ ทำได้ง่ายขึ้น
    - **Lab 8.2: Integrate a Request ID:** เพิ่ม Logic ในการสร้าง `requestId` ที่ไม่ซ้ำกันสำหรับทุก Request ที่เข้ามาและส่งผ่านไปยังทุก Log ที่เกี่ยวข้อง
    - **Lab 8.3: Final Testing & Mini-Project Kick-off:** ทดสอบทุก Endpoint อีกครั้ง (`GET`, `POST`, error handling) และทบทวนโจทย์สำหรับ Mini Project ท้ายวัน
