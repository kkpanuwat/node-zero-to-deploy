---
id: day-2-hands-on-labs
title: 'Day 2: Hands-on Labs'
sidebar_label: 'Hands-on Labs'
description: Workshop สร้างโปรเจกต์ library-system, ตั้งค่า npm scripts, และรัน Basic HTTP Server ที่ตอบ JSON รายชื่อหนังสือ
---

# Part 2 — Hands-on Labs

> เป้าหมาย: รัน `npm run dev` แล้วมี endpoint อย่างน้อย 2 อัน: `/health` และ `/books` ที่ตอบ JSON ได้

## Lab 1: สร้างโครงสร้างโปรเจกต์ `library-system`

1. สร้างโฟลเดอร์และ init โปรเจกต์

```bash
mkdir library-system
cd library-system
npm init -y
```

2. สร้างโครงสร้างโฟลเดอร์

```bash
mkdir -p src/data src/utils
touch src/server-basic.js src/data/books.js src/utils/logger.js
```

3. (แนะนำ) สร้าง `.gitignore`

```bash
printf "node_modules\n.env\n.DS_Store\n" > .gitignore
```

3. เพิ่มข้อมูลจำลอง `src/data/books.js`

```js
const books = [
  { id: 1, title: 'JavaScript for Beginners', author: 'Alice' },
  { id: 2, title: 'Node.js Essentials', author: 'Bob' },
];

module.exports = { books };
```

## Lab 2: ทำ `logger` utility

สร้าง `src/utils/logger.js`

```js
function log(message) {
  const stamp = new Date().toISOString();
  console.log(`[${stamp}]`, message);
}

module.exports = { log };
```

## Lab 3: เขียน Basic HTTP Server

สร้าง `src/server-basic.js` (มี routing แบบง่าย)

```js
const http = require('http');
const { books } = require('./data/books');
const { log } = require('./utils/logger');

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  log(`Request: ${req.method} ${req.url}`);

  if (req.method === 'GET' && req.url === '/health') {
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === 'GET' && req.url === '/books') {
    return sendJson(res, 200, { message: 'Library System', books });
  }

  return sendJson(res, 404, { message: 'Not Found' });
});

const port = Number(process.env.PORT ?? 3000);
server.listen(port, () => {
  log(`Server running at http://localhost:${port}`);
});
```

## Lab 4: ตั้งค่า `npm scripts` (start/dev)

1. ติดตั้ง `nodemon` (dev dependency)

```bash
npm i -D nodemon
```

2. แก้ `package.json` ให้มี scripts แบบนี้

```json
{
  "scripts": {
    "start": "node src/server-basic.js",
    "dev": "nodemon src/server-basic.js"
  }
}
```

## Lab 5: ตั้งค่า `.env` (optional แต่แนะนำ)

1. ติดตั้ง `dotenv`

```bash
npm i dotenv
```

2. สร้างไฟล์ `.env.example`

```bash
printf "PORT=3000\n" > .env.example
```

3. สร้างไฟล์ `.env` (ห้าม commit)

```bash
printf "PORT=3000\n" > .env
```

4. เพิ่มบรรทัดนี้ไว้บนสุดของ `src/server-basic.js`

```js
require('dotenv').config();
```

## Lab 6: รันและทดสอบ

- รันโหมดปกติ: `npm run start`
- รันโหมด dev: `npm run dev`
- เปิด `http://localhost:3000/health` แล้วควรเห็น `{ "ok": true }`
- เปิด `http://localhost:3000/books` แล้วควรเห็น JSON ที่มี `message` และ `books`

## Checklist (จบ Day 2 แล้วควรทำได้)

- อธิบายได้ว่า `package.json` มีหน้าที่อะไร
- รู้จัก `npm run start` และ `npm run dev`
- แยกได้ว่า `src/data` กับ `src/utils` มีไว้ทำอะไร
- รัน server แล้วตอบ JSON ได้จริงที่ `localhost:3000`

> Call-to-action: ลองเพิ่ม endpoint ใหม่ `/time` ที่ตอบ `{ now: new Date().toISOString() }` และ commit เป็น 1 commit แยกต่างหาก
