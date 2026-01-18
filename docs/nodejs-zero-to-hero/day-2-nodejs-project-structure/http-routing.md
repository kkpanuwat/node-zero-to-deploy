---
id: day-2-http-routing
title: 'Day 2: การจัดการ Routing และ Response'
sidebar_label: 'HTTP Routing'
description: เรียนรู้วิธีจัดการ URL, status codes, และออกแบบ JSON response ที่ดี เพื่อเป็นพื้นฐานก่อนย้ายไปใช้ Express
---

# Part 2 — การจัดการ Routing และ Response ด้วยตัวเอง

ก่อนที่เราจะไปจัดการกับ URL ในโค้ด เรามาทำความเข้าใจส่วนประกอบของ URL กันก่อนดีกว่า เพราะมันคือ "ที่อยู่" ที่ Client ใช้ในการร้องขอข้อมูลจากเซิร์ฟเวอร์ของเรา

## Anatomy of a URL: กายวิภาคของ URL

ลองดูตัวอย่าง URL สมมตินี้:
`http://localhost:3000/books/1?mode=edit#details`

เราสามารถแบ่งมันออกเป็นส่วนๆ ได้ดังนี้:

1.  **Protocol (`http://`)**:
    - คือ "ภาษา" หรือโปรโตคอลที่ใช้ในการสื่อสาร ในที่นี้คือ `HTTP` (Hypertext Transfer Protocol)

2.  **Host (`localhost`)**:
    - คือ "ชื่อ" ของเครื่องเซิร์ฟเวอร์ที่เรากำลังเรียกหา `localhost` เป็นชื่อพิเศษที่หมายถึง "เครื่องคอมพิวเตอร์ของฉันเอง"

3.  **Port (`:3000`)**:
    - คือ "ช่องทาง" หรือประตูบนเครื่องเซิร์ฟเวอร์นั้นๆ เหมือนกับเลขที่ห้องในคอนโดมิเนียม ทำให้เซิร์ฟเวอร์รู้ว่าคำขอนี้ต้องการส่งไปให้โปรแกรมไหน (ในที่นี้คือ Node.js ของเรา)

4.  **Pathname (`/books/1`)**:
    - คือ "เส้นทาง" ที่ระบุว่าเราต้องการเข้าถึง "ทรัพยากร" (Resource) อะไรบนเซิร์ฟเวอร์ ในตัวอย่างนี้คือเราต้องการข้อมูลของหนังสือที่มี `id` เป็น `1`

5.  **Search / Query String (`?mode=edit`)**:
    - คือ "ตัวเลือกเพิ่มเติม" ที่เราส่งไปพร้อมกับคำขอ โดยจะขึ้นต้นด้วย `?` และตามด้วยคู่ของ `key=value` (เช่น `mode` คือ `edit`) เราสามารถมีหลายๆ query ได้โดยคั่นด้วย `&` (เช่น `?search=node&limit=10`)

6.  **Hash (`#details`)**:
    - คือ "ส่วนย่อย" ภายในหน้าเว็บ มักใช้เพื่อเลื่อนหน้าจอไปยังส่วนที่ต้องการ (Anchor link) โดยปกติแล้ว Hash **จะไม่ถูกส่งมาที่ฝั่งเซิร์ฟเวอร์** แต่จะถูกจัดการโดยเบราว์เซอร์ฝั่ง Client

**สิ่งที่เราสนใจในฝั่ง Backend วันนี้คือ `Pathname` และ `Search/Query String`** เพราะมันเป็นสองส่วนหลักที่บอกเราว่า Client ต้องการข้อมูลอะไรและมีเงื่อนไขเพิ่มเติมอย่างไร

---

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

## 3. Response Shape: กำหนดมาตรฐานการตอบกลับของ API

เพื่อให้ฝั่ง Frontend หรือคนที่จะมาเรียกใช้ API ของเราทำงานได้ง่าย เราควรออกแบบ "รูปแบบ" (Shape) ของ JSON ที่ตอบกลับไปให้เป็นมาตรฐานเดียวกันในทุกๆ Endpoint

ลองจินตนาการว่า API ของเรามีหลาย Endpoint เช่น `/books`, `/authors`, `/borrow-requests` หากแต่ละอันคืนค่าหน้าตาแตกต่างกันโดยสิ้นเชิง (อันหนึ่งคืนเป็น Array ตรงๆ, อีกอันคืนเป็น Object, อีกอันมี key ชื่อ `result` อีกอันชื่อ `payload`) คนเขียน Frontend จะทำงานลำบากมาก

**รูปแบบมาตรฐานสำหรับ "Library System" ที่เราจะใช้:**

- **เมื่อสำเร็จ (Success):** เราจะส่ง `ok: true` พร้อมกับข้อมูลหลักใน `data`
  *ตัวอย่าง: การเรียก `GET /books`*
  ```json
  {
    "ok": true,
    "data": {
      "books": [
        { "id": 1, "title": "JavaScript for Beginners", "author": "Alice" },
        { "id": 2, "title": "Node.js Essentials", "author": "Bob" }
      ]
    }
  }
  ```

- **เมื่อล้มเหลว (Error):** เราจะส่ง `ok: false` พร้อมกับรายละเอียดของปัญหาใน `error`
  *ตัวอย่าง: การ `POST /books` โดยไม่ใส่ `title`*
  ```json
  {
    "ok": false,
    "error": {
      "code": "BOOK_VALIDATION_ERROR",
      "message": "Book title is required and cannot be empty."
    }
  }
  ```

การสร้างมาตรฐานแบบนี้ตั้งแต่แรก จะช่วยให้การพัฒนาทั้งฝั่ง Backend และ Frontend เป็นระบบ, จัดการ Error ได้ง่าย, และสื่อสารกันในทีมได้ชัดเจนขึ้น

## 4. สร้าง Helper Functions: เครื่องมือทุ่นแรงของเรา

แทนที่จะเขียนโค้ดซ้ำๆ ในทุกๆ `if/else` ของ Route, เรามาสร้าง "ฟังก์ชันผู้ช่วย" (Helpers) เพื่อให้โค้ดของเราสะอาด, อ่านง่าย, และจัดการได้สะดวกกันดีกว่า

### 4.1 ฟังก์ชันพื้นฐาน: `sendJson` และ `sendError`

เราจะสร้าง 2 ฟังก์ชันหลักที่จะเป็นหัวใจของการตอบกลับทั้งหมด

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

### 4.2 ฟังก์ชันสำหรับ Error ที่ใช้บ่อย

เราสามารถสร้างฟังก์ชันที่เรียกใช้ `sendError` สำหรับสถานการณ์ที่เจอบ่อยๆ ได้อีกด้วย

```js
function sendNotFound(res) {
  return sendError(res, 404, 'NOT_FOUND', 'The requested resource was not found.');
}

function sendMethodNotAllowed(res, allowedMethods) {
  res.setHeader('Allow', allowedMethods.join(', '));
  return sendError(res, 405, 'METHOD_NOT_ALLOWED', `This endpoint only accepts ${allowedMethods.join(', ')}.`);
}

function sendBadRequest(res, code, message) {
    return sendError(res, 400, code, message);
}
```

### 4.3 ตัวอย่างการใช้งาน: Before vs. After

เพื่อให้เห็นภาพชัดเจน, ลองดูโค้ดจัดการ Route `/books` ก่อนและหลังการใช้ Helpers

**แบบที่ 1: ก่อนใช้ Helpers (โค้ดค่อนข้างซ้ำซ้อน)**
```js
// ... ภายใน http.createServer
if (pathname === '/books') {
  if (req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ ok: true, data: { books } }));
  } else {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Allow', 'GET');
    res.end(JSON.stringify({ ok: false, error: { code: 'METHOD_NOT_ALLOWED', message: 'Method Not Allowed' } }));
  }
} else {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({ ok: false, error: { code: 'NOT_FOUND', message: 'Not Found' } }));
}
```

**แบบที่ 2: หลังใช้ Helpers (สะอาดและอ่านง่ายกว่ามาก)**
```js
// ... ภายใน http.createServer
// สมมติว่าเรา import sendJson, sendNotFound, sendMethodNotAllowed มาแล้ว

if (pathname === '/books') {
  if (req.method === 'GET') {
    return sendJson(res, 200, { ok: true, data: { books } });
  }
  return sendMethodNotAllowed(res, ['GET']);
}

return sendNotFound(res);
```

จะเห็นได้ว่าการใช้ Helpers ช่วยลดจำนวนโค้ดที่ซ้ำซ้อนลงได้อย่างมหาศาล และทำให้ Logic หลักของ Route ของเรา (การเช็ก `pathname` และ `method`) ดูเด่นชัดขึ้นมาทันที

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

