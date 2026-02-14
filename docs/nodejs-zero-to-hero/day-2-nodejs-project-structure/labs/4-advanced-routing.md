---
id: day-2-lab-4-advanced-routing-and-response
title: 'Lab 4: Advanced Routing & Response'
sidebar_label: '4. Routing & Response'
---

**เป้าหมาย:** พัฒนาการจัดการ URL ให้รองรับ Query String, สร้างฟังก์ชัน Helper สำหรับ Response, และจัดการ `404`/`405` errors ได้อย่างถูกต้อง

> Timebox แนะนำ: 45–60 นาที

### 4.1: Refactor to use `URL` object
แก้ไข `server.js` ให้จัดการกับ query string (`/books?limit=1`) ได้อย่างถูกต้อง
```javascript
// ใน http.createServer, เพิ่ม 2 บรรทัดนี้ไว้บนสุด
const url = new URL(req.url, `http://${req.headers.host}`);
const pathname = url.pathname;

// แก้ไข if-condition ให้ใช้ pathname แทน req.url
// if (req.method === 'GET' && req.url === '/books') { ... }
// เป็น
// if (req.method === 'GET' && pathname === '/books') { ... }
```

### 4.2: สร้าง Response Helpers
เพื่อลดการเขียนโค้ดซ้ำซ้อน, เราจะสร้าง `src/utils/response.js`
```javascript
// src/utils/response.js
function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function sendError(res, statusCode, code, message) {
  const errorPayload = { ok: false, error: { code, message } };
  return sendJson(res, statusCode, errorPayload);
}

function sendNotFound(res) {
  return sendError(res, 404, 'NOT_FOUND', 'The requested resource was not found.');
}

module.exports = { sendJson, sendError, sendNotFound };
```

จากนั้นนำไปใช้ใน `server.js`:
```javascript
// src/server.js
//...
const { sendJson, sendNotFound } = require('./utils/response');
//...
// แก้ไขส่วนการตอบกลับทั้งหมดให้ใช้ helpers
// เช่น res.end(...) เปลี่ยนเป็น sendJson(...) หรือ sendNotFound(...)
```

### 4.3: Proper `404`/`405` Handling
สร้าง Logic เพื่อตอบ `405 Method Not Allowed` เมื่อ Client ใช้ HTTP Method ผิด
```javascript
// ตัวอย่างใน server.js สำหรับ /books
if (pathname === '/books') {
    if (req.method === 'GET') {
      //... logic เดิม
    }
    // ถ้าไม่ใช่ GET ให้ตอบ 405
    res.setHeader('Allow', 'GET');
    return sendError(res, 405, 'METHOD_NOT_ALLOWED', 'This endpoint only accepts GET');
}

return sendNotFound(res); // สำหรับ URL อื่นๆ ที่ไม่รู้จัก
```

**✅ Checkpoint:**
- เซิร์ฟเวอร์ยังทำงานได้เหมือนเดิม แต่โค้ดสะอาดขึ้น
- ลองเรียก `http://localhost:3000/books?foo=bar` เซิร์ฟเวอร์ต้องยังทำงานได้
- ลองใช้ `curl -X POST http://localhost:3000/health`, ควรได้รับ 405

### Mini Challenges (ถ้ามีเวลา)

1. ทำ helper `sendMethodNotAllowed(res, allowedMethods)` ที่ set `Allow` ให้ถูกต้อง
2. เพิ่ม `sendBadRequest(res, message)` เพื่อใช้กับ validation ใน `POST /books`
