---
id: day-2-http-routing
title: 'Day 2: HTTP Routing & Response Design'
sidebar_label: 'HTTP Routing'
description: เข้าใจการ parse URL, status codes, 404/405, และออกแบบ JSON response ให้ debug ง่ายก่อนย้ายไป Express
---

# Part 2 — HTTP Routing & Response Design

วันนี้เราใช้ `http` module แบบ “manual” เพื่อให้เข้าใจพื้นฐานจริง ๆ ก่อนเข้า Express

## 1) Parse URL ให้ถูก (อย่าเทียบ `req.url` ตรง ๆ อย่างเดียว)

สิ่งที่มือใหม่พลาดบ่อย: เทียบ `req.url === '/books'` แล้วพอมี query string จะพัง

- `/books` ✅
- `/books?limit=10` ❌ (ถ้าเทียบสตริงตรง ๆ)

วิธีที่แนะนำ:

```js
const url = new URL(req.url, `http://${req.headers.host}`);
const pathname = url.pathname; // '/books'
const limit = url.searchParams.get('limit'); // '10' หรือ null
```

> ใช้ `new URL()` ได้เพราะ Node มี WHATWG URL รองรับในตัว

## 2) HTTP Status Codes ที่ควรรู้ (แค่พอใช้งาน)

- `200 OK`: สำเร็จ
- `201 Created`: สร้างข้อมูลสำเร็จ (เช่น `POST /books`)
- `400 Bad Request`: ส่งข้อมูลมาไม่ถูกต้อง (validation ไม่ผ่าน)
- `404 Not Found`: ไม่พบ route
- `405 Method Not Allowed`: route นี้มี แต่ method ไม่รองรับ
- `500 Internal Server Error`: server พัง/exception

## 3) Response Shape (รูปแบบ JSON) ที่ debug ง่าย

ถ้าแต่ละ endpoint ส่ง JSON คนละรูปแบบ จะ debug และทำ frontend ยาก

แนะนำรูปแบบพื้นฐาน:

- สำเร็จ:

```json
{ "ok": true, "data": { "..." : "..." } }
```

- ไม่สำเร็จ:

```json
{ "ok": false, "error": { "code": "VALIDATION_ERROR", "message": "title is required" } }
```

> อย่าลืม `Content-Type: application/json` ทุกครั้งที่ส่ง JSON

## 4) Helper ที่ควรมีตั้งแต่ Day 2

### 4.1 `sendJson(res, statusCode, payload)`

```js
function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}
```

### 4.2 `sendError(res, statusCode, code, message)`

```js
function sendError(res, statusCode, code, message) {
  return sendJson(res, statusCode, { ok: false, error: { code, message } });
}
```

### 4.3 `sendNotFound` และ `sendMethodNotAllowed`

```js
function sendNotFound(res) {
  return sendError(res, 404, 'NOT_FOUND', 'Not Found');
}

function sendMethodNotAllowed(res) {
  res.setHeader('Allow', 'GET,POST');
  return sendError(res, 405, 'METHOD_NOT_ALLOWED', 'Method Not Allowed');
}
```

## 5) อ่าน Body ของ `POST` (JSON)

Node `http` ไม่ parse body ให้เรา ต้องทำเอง:

```js
async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);

  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return null;

  return JSON.parse(raw);
}
```

สิ่งที่ควรทำเพิ่ม:

- จำกัดขนาด body (กันโดนส่ง payload ใหญ่เกิน)
- try/catch ตอน `JSON.parse` แล้วตอบ `400`

## 6) Map สิ่งที่ทำวันนี้ → Express จะช่วยอะไร

- วันนี้: เช็ก `req.method`/`req.url` เอง → พรุ่งนี้: `app.get('/books', ...)`
- วันนี้: parse body เอง → พรุ่งนี้: `express.json()`
- วันนี้: 404/500 ต้องทำเอง → พรุ่งนี้: middleware/error handler

> Call-to-action: ลองเขียน “response format มาตรฐาน 1 แบบ” แล้วบังคับให้ทุก endpoint ใช้แบบนั้นทั้งหมด

