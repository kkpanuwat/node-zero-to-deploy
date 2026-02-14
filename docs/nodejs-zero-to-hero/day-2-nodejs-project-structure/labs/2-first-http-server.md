---
id: day-2-lab-2-first-http-server
title: 'Lab 2: First HTTP Server'
sidebar_label: '2. First HTTP Server'
---

**เป้าหมาย:** สร้าง HTTP Server ที่ทำงานได้จริง, ตอบกลับ Request ได้, และมี Endpoint แรกคือ `/health`

> Timebox แนะนำ: 45–60 นาที

### 2.1: สร้าง Logger ง่ายๆ
ใน `src/utils/logger.js`, เราจะสร้างฟังก์ชันสำหรับแสดง log พร้อมเวลา
```javascript
// src/utils/logger.js
function log(message) {
  const stamp = new Date().toISOString();
  console.log(`[${stamp}]`, message);
}

module.exports = { log };
```

### 2.2: สร้างเซิร์ฟเวอร์ "Hello World"
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

### 2.3: เพิ่ม Endpoint `/health` และ `/books`
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

**✅ Checkpoint:**
- คุณสามารถรันเซิร์ฟเวอร์และเห็น Log ใน Terminal
- `http://localhost:3000/health` ตอบกลับ `{ "ok": true, ... }`
- `http://localhost:3000/books` ตอบกลับรายการหนังสือ
- URL อื่นๆ ตอบกลับ `404 Not Found`

### Mini Challenges (ถ้ามีเวลา)

1. ทำให้ `/` ตอบ `{ ok: true, message: "Welcome" }`
2. เพิ่ม header `Content-Type: application/json; charset=utf-8` ทุก response
3. เพิ่ม `GET /time` ที่ตอบเวลาปัจจุบันใน ISO string
