---
id: day-3-core-concepts
title: 'Day 3: Core Concepts'
sidebar_label: 'Core Concepts'
description: 'ทำความเข้าใจ Express.js, routing, middleware, และแนวคิดการแยกโค้ดเป็นชั้นๆ'
---

# Part 1 — Core Concepts: ทำไม Express ถึงทำให้ชีวิตง่ายขึ้น

## Express คืออะไร (ในภาษาคนเริ่มต้น)

ใน Day 2 เราเขียน server ด้วย `http.createServer(...)` ซึ่ง “ทำได้” แต่พอโปรเจกต์โต:
- routing จะเริ่มยาว (if/else เยอะ)
- parse JSON body เองจะซับซ้อน
- การจัดโค้ดเป็นไฟล์/โมดูลจะเริ่มยุ่ง

**Express.js** เป็น framework ที่ให้:
- `app.get/post/put/delete` สำหรับ routing ที่อ่านง่าย
- middleware สำหรับขั้นตอนที่ต้องทำก่อนถึง handler (เช่น parse JSON, logging)
- `express.Router()` เพื่อแยก route เป็นโมดูล

---

## Express.js คืออะไร?

Express.js คือ **Framework** สำหรับพัฒนา **Web Application** และ **REST API** บน Node.js

พูดง่าย ๆ คือเป็น “เครื่องมือช่วย” ที่ทำให้การสร้างเว็บเซิร์ฟเวอร์ด้วย Node.js:
- ง่ายขึ้น
- เป็นระบบระเบียบมากขึ้น
- เขียนโค้ดน้อยลง

---

## ทำไมต้องมี Express.js ในเมื่อมี Node.js อยู่แล้ว?

Node.js สามารถสร้าง Web Server ได้เองก็จริง แต่ถ้าใช้แค่ `http` module จะต้องเขียนโค้ดจัดการหลายอย่างเอง เช่น:

- การจัดการ URL (Routing)
- การอ่านค่า request / response
- การจัดการ Middleware
- การจัดการ Error
- การรับข้อมูลจาก form หรือ JSON

Express.js เข้ามาช่วยจัดการเรื่องเหล่านี้ให้เป็นโครงสร้างที่ชัดเจน และมีของที่ใช้บ่อย “พร้อมใช้งาน” ทันที

---

## Express “ช่วยอะไรเรา” แบบจับต้องได้

### 1) Routing ที่เป็นตาราง (ไม่ต้อง if/else ยาว)

แทนที่จะเขียน routing แบบเดิม ๆ ด้วย if/else หรือ switch
Express ทำให้เรา “ประกาศ” ว่าเส้นทางไหนทำอะไร:

```js
app.get("/api/health", handler);
app.get("/api/books", handler);
```

สิ่งที่ควรสังเกต:
- อ่านแล้วรู้ทันทีว่า API มีอะไรบ้าง
- แยกไฟล์ได้ง่าย (พอ routes เยอะ ๆ)

### 2) JSON parsing ด้วย `express.json()`

ในอนาคต (Day 5) เราจะทำ `POST/PUT` ซึ่งต้องอ่าน JSON body
Express ให้ middleware มาตรฐานเพื่อทำให้ `req.body` ใช้ได้ทันที

---

## Express กับ Node.js (อย่าเข้าใจผิด)

- Express ไม่ได้ “แทน” Node.js
- Express รันบน Node.js อีกที

ภาพจำง่าย ๆ:
- **Node.js** = runtime / เครื่องยนต์
- **Express** = โครงรถ / ชุดเครื่องมือที่จัดระเบียบให้ขับง่าย

---

## Request / Response (แบบใช้จริง)

handler ของ Express จะรับ:
- `req` (request): ข้อมูลที่ client ส่งมา เช่น URL, params, query, body
- `res` (response): ใช้ตอบกลับไป เช่น `res.json(...)`, `res.status(201).json(...)`

ตัวอย่าง:
```js
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "ready" });
});
```

### `res.json(...)` ต่างจาก `res.send(...)` ยังไง

- `res.json(obj)` → ตั้งค่า header ให้เหมาะกับ JSON และ stringify ให้อัตโนมัติ
- `res.send(textOrBufferOrObj)` → ส่งได้หลายแบบ (string/html/buffer/object) แต่สำหรับ API แนะนำใช้ `res.json` ให้ชัด

### รู้จัก “ที่มาของข้อมูล” ใน `req`

- `req.params` → มาจาก path param เช่น `/api/books/:id`
- `req.query` → มาจาก query string เช่น `?search=node&limit=5`
- `req.body` → มาจาก JSON body (ต้องมี `express.json()`)
- `req.headers` → เช่น `Content-Type`, `Authorization`

### ตัวอย่างจับคู่ “รูปแบบ request” กับ field ที่ต้องอ่าน

- `GET /api/books/3` → อ่าน `req.params.id`
- `GET /api/books?search=node` → อ่าน `req.query.search`
- `POST /api/books` body `{ "title": "...", "author": "..." }` → อ่าน `req.body` (ต้องมี `express.json()`)

---

## Middleware คืออะไร

Middleware คือฟังก์ชันที่อยู่ “ระหว่าง” request เข้ามา และ handler ตอบกลับ เช่น:
- `express.json()` แปลง JSON body ให้เป็น `req.body`
- custom logger เช่น log `METHOD URL`

รูปแบบ:
```js
app.use((req, res, next) => {
  // ทำอะไรบางอย่างก่อน
  next(); // ส่งต่อไป middleware/route ถัดไป
});
```

### ทำไมต้องมี `next()`

เพราะ middleware ถูกออกแบบให้ “ต่อเป็นห่วงโซ่”
- ถ้าเรียก `next()` → ไปตัวถัดไป
- ถ้าไม่เรียก `next()` และไม่ส่ง response → request จะค้าง
- ถ้าส่ง response แล้ว (เช่น `res.json(...)`) → โดยทั่วไปไม่ต้อง `next()`

### Mental Model: request ไหลผ่านอะไรบ้าง

```mermaid
flowchart TD
  A[Request เข้า Express] --> B[express.json()]
  B --> C[Logger middleware]
  C --> D[Router match]
  D --> E[Controller/Handler]
  E --> F[Response ออก]
```

---

## โครงสร้างโปรเจกต์ (แนะนำสำหรับคอร์สนี้)

```
library-system/
  src/
    index.js
    data/
      books.js
    routes/
      books-route.js
    controllers/
      books-controller.js
    utils/
      logger.js
```

แนวคิดคือ:
- `routes/` ดูแล URL + method
- `controllers/` ดูแลการทำงานในแต่ละ endpoint (อ่านข้อมูล/ตอบ response)
- `data/` เก็บข้อมูลแบบ in-memory (ก่อนค่อยไป DB ในวันถัดๆ ไป)

---

## CommonJS vs ES Modules (ปูพื้นให้ import/export ไม่งง)

ในคอร์สนี้ตัวอย่างจะใช้ CommonJS:
- import: `const x = require("...")`
- export: `module.exports = { ... }`

เหตุผล:
- beginner-friendly และยังเจอเยอะในโปรเจกต์ Node.js จริง
- สอดคล้องกับโครงสร้าง Day 2 ที่ใช้ `module.exports`

---

## Checkpoint (คำถามสั้น ๆ ก่อนเริ่ม Lab)

1. ทำไม `express.json()` ต้องมาก่อน routes?
2. ต่างกันยังไงระหว่าง `req.params` กับ `req.query`?
3. ถ้า `GET /api/books/9999` ไม่พบข้อมูล ควรตอบ status code อะไร?
