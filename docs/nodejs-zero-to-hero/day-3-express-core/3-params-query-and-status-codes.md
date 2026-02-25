---
id: day-3-params-query-and-status-codes
title: 'Day 3: Params + Query + Status Codes'
sidebar_label: 'Params + Query + Status Codes'
description: 'ใช้ route params, query string, และ HTTP status codes เพื่อทำ API ที่ใช้งานง่ายและ debug ง่าย'
---

# Part 2.1 — Params + Query + Status Codes (ของที่เจอทุกวันในการทำ API)

## 1) Route Params: `:id`

เวลาเราต้องการ resource “ตัวเดียว” เรามักใช้ path param:
- `GET /api/books/1`
- `GET /api/books/:id`

ใน Express:
```js
app.get("/api/books/:id", (req, res) => {
  const id = Number(req.params.id);
  // ...
});
```

**สิ่งที่ต้องระวัง**
- `req.params.id` เป็น string เสมอ → ต้องแปลงเป็น number
- ถ้าแปลงแล้วได้ `NaN` → ควรตอบ `400 Bad Request`

---

## 2) Query String: `?search=` และ `?limit=`

query ใช้สำหรับ “ปรับผลลัพธ์” ไม่ใช่ระบุ resource:
- `/api/books?search=node`
- `/api/books?limit=5`

ใน Express:
```js
app.get("/api/books", (req, res) => {
  const search = req.query.search?.toString() ?? "";
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  // ...
});
```

**แนวคิด**
- `search` = filter
- `limit` = pagination แบบง่าย (ตัด array)

---

## 3) Status Codes ที่ควรใช้ให้เป็น “นิสัย”

- `200 OK` — GET สำเร็จ
- `400 Bad Request` — input ไม่ถูกต้อง (เช่น id ไม่ใช่ตัวเลข)
- `404 Not Found` — หา resource ไม่เจอ (เช่น book id ไม่มี)
- `500 Internal Server Error` — error ที่ไม่ควรเกิดจากฝั่ง client

ตัวอย่าง:
```js
return res.status(404).json({
  ok: false,
  error: { code: "BOOK_NOT_FOUND", message: "Book not found" },
});
```

---

## 4) Response Contract (ทำให้ทีมทำงานง่าย)

แนะนำรูปแบบพื้นฐาน:

```js
// success
{ ok: true, data: ... }

// error
{ ok: false, error: { code, message, details? } }
```

ข้อดี:
- frontend/QA คาดเดาได้
- เขียน test ได้เร็ว
- debug ง่ายขึ้นมาก
