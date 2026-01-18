---
id: day-2-http-routing
title: 'Day 2: การจัดการ Routing และ Response'
sidebar_label: 'HTTP Routing'
description: เรียนรู้วิธีจัดการ URL, status codes, และออกแบบ JSON response ที่ดี เพื่อเป็นพื้นฐานก่อนย้ายไปใช้ Express
---

# Part 2 — การจัดการ Routing และ Response ด้วยตัวเอง

ในส่วนนี้ เราจะลองสวมบทบาทเป็น Express.js โดยจะจัดการทุกอย่างด้วย `http` module ของ Node.js เพื่อให้เข้าใจพื้นฐานอย่างลึกซึ้งว่าเบื้องหลังของเฟรมเวิร์คที่เรากำลังจะเรียนนั้นทำงานอย่างไร

## 1. การอ่าน URL: ทำไมเทียบ `req.url` ตรงๆ ถึงไม่ดี?

บ่อยครั้งที่มือใหม่จะเขียนโค้ดแบบนี้:
`if (req.url === '/books') { ... }`

ซึ่งจะทำงานได้ดี... จนกระทั่งมีคนเรียก URL แบบนี้: `/books?limit=10`
โค้ดของเราจะพังทันที! เพราะสตริงไม่ตรงกัน

**วิธีที่ถูกต้อง: ใช้ `URL` object**
Node.js มีเครื่องมือในตัวสำหรับจัดการ URL โดยเฉพาะ ทำให้เราสามารถแยกส่วนต่างๆ ของ URL ได้อย่างง่ายดาย

```js
// สร้าง URL object โดยอิงจาก host ปัจจุบัน
const url = new URL(req.url, `http://${req.headers.host}`);

// เราจะได้ pathname ที่ไม่มี query string มาเกี่ยวข้อง
const pathname = url.pathname; // ได้ '/books' เสมอ
const limit = url.searchParams.get('limit'); // ได้ '10' หรือ null ถ้าไม่มี
```

วิธีนี้ทำให้โค้ดของเราแข็งแรงและรองรับ Query Parameters ได้อย่างถูกต้อง

## 2. HTTP Status Codes: ภาษาสากลของเว็บ

Status codes คือตัวเลขที่เซิร์ฟเวอร์ใช้ตอบกลับ Client เพื่อบอกผลลัพธ์ของการร้องขอ นี่คือโค้ดสำคัญๆ ที่เราจะได้ใช้บ่อยๆ:

- **200 OK**: สำเร็จ! ทุกอย่างเป็นไปตามที่คาดหวัง
- **201 Created**: สำเร็จ! และได้สร้างข้อมูลใหม่ขึ้นมาในระบบ (เหมาะสำหรับ `POST`)
- **400 Bad Request**: พังเพราะ Client! ข้อมูลที่ส่งมาไม่ถูกต้องหรือไม่ครบถ้วน
- **404 Not Found**: หาไม่เจอ! Client ขอในสิ่งที่ไม่มีอยู่จริง
- **405 Method Not Allowed**: มี URL นี้อยู่จริง แต่ Client ใช้ Method ผิด (เช่น ใช้ `GET` กับ URL ที่รับแค่ `POST`)
- **500 Internal Server Error**: พังเพราะเราเอง! เกิดข้อผิดพลาดบางอย่างขึ้นที่ฝั่งเซิร์ฟเวอร์

## 3. Response Shape: ออกแบบ "นามบัตร" ให้กับ API

เพื่อให้ฝั่ง Frontend หรือคนเรียกใช้ API ของเราทำงานง่าย เราควรออกแบบ "รูปแบบ" (Shape) ของ JSON ที่ตอบกลับไปให้เหมือนกันในทุกๆ Endpoint

**รูปแบบที่แนะนำ:**

- **เมื่อสำเร็จ:**
```json
{
  "ok": true,
  "data": { "id": 1, "title": "Node.js Essentials" }
}
```

- **เมื่อล้มเหลว:**
```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "title is required"
  }
}
```
การทำแบบนี้ช่วยให้การจัดการ Error ฝั่ง Client เป็นระบบและง่ายขึ้นมาก

## 4. สร้าง Helper Functions: เครื่องมือทุ่นแรงของเรา

แทนที่จะเขียนโค้ดซ้ำๆ เรามาสร้างฟังก์ชันผู้ช่วย (Helpers) เพื่อให้โค้ดของเราสะอาดและอ่านง่ายกันดีกว่า

**`sendJson`**: ผู้ช่วยสำหรับส่ง Response ที่เป็น JSON
```js
function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}
```

**`sendError`**: ผู้ช่วยสำหรับส่ง Response ที่เป็น Error ในรูปแบบมาตรฐานของเรา
```js
function sendError(res, statusCode, code, message) {
  const errorPayload = { ok: false, error: { code, message } };
  return sendJson(res, statusCode, errorPayload);
}
```

**ตัวอย่างการใช้งาน:**
```js
sendJson(res, 200, { ok: true, data: books });
sendError(res, 400, 'INVALID_INPUT', 'Book title cannot be empty.');
```

## 5. การอ่านข้อมูลจาก `POST` Request

โดยปกติแล้ว ข้อมูลที่ส่งมากับ Request แบบ `POST` (ที่เราเรียกว่า `body`) จะถูกส่งมาเป็นชิ้นส่วนเล็กๆ (Chunks) เราต้องรวบรวมชิ้นส่วนเหล่านี้เข้าด้วยกันก่อน ถึงจะนำไปใช้งานได้

```js
// ฟังก์ชันสำหรับอ่านและแปลง JSON body จาก request
async function readJsonBody(req) {
  const chunks = [];
  // วนลูปเพื่อรวบรวมข้อมูลแต่ละชิ้น
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  // นำชิ้นส่วนทั้งหมดมาต่อกัน แล้วแปลงเป็น String
  const rawBody = Buffer.concat(chunks).toString('utf8');
  if (!rawBody) return null; // ถ้าไม่มี body ก็ return null

  // ลองแปลง String เป็น JSON object
  try {
    return JSON.parse(rawBody);
  } catch (e) {
    // ถ้าแปลงไม่ได้ แสดงว่าข้อมูลที่ส่งมาไม่ใช่ JSON ที่ถูกต้อง
    return null; 
  }
}
```
**ข้อควรระวัง:** ในชีวิตจริง เราต้องจำกัดขนาดของ `body` เพื่อป้องกันการโจมตี และควรใช้ `try/catch` กับ `JSON.parse` เสมอ

## 6. บทสรุป: สิ่งที่ Express.js จะมาช่วยเรา

สิ่งที่เราทำกันแบบ Manual ทั้งหมดในวันนี้ คือสิ่งที่ Express.js ทำให้เราแบบอัตโนมัติ:

- **วันนี้:** เราต้องเขียน `if/else` เพื่อเช็ก `req.method` และ `req.url` เอง
- **พรุ่งนี้:** เราจะใช้ `app.get('/books', ...)` หรือ `app.post('/books', ...)`

- **วันนี้:** เราต้องเขียนฟังก์ชัน `readJsonBody` เอง
- **พรุ่งนี้:** เราจะใช้ Middleware `express.json()` แค่บรรทัดเดียว

- **วันนี้:** เราต้องจัดการ Error 404 หรือ 500 ด้วยตัวเอง
- **พรุ่งนี้:** Express มีระบบ Error Handler ที่ทรงพลังกว่า

การเข้าใจพื้นฐานในวันนี้ จะทำให้เราเห็นคุณค่าและใช้ Express.js ได้อย่างเต็มประสิทธิภาพในวันพรุ่งนี้

> **ทบทวนความเข้าใจ:** ลองออกแบบ "Response Shape" สำหรับโปรเจกต์ของคุณ และลองเขียนฟังก์ชัน Helper `sendSuccess(res, data)` ที่ใช้ Shape นั้น

