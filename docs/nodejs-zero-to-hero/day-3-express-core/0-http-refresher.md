---
id: day-3-http-refresher
title: 'Day 3: HTTP Refresher for APIs'
sidebar_label: 'HTTP Refresher'
description: 'ทบทวน HTTP ที่จำเป็นสำหรับทำ Express API: method, path, params, query, headers, body และ status codes'
---

# HTTP Refresher (สำหรับคนกำลังจะทำ Express API)

Day 3 จะเริ่มเขียน API เยอะขึ้น ถ้า vocabulary ของ HTTP ยังไม่ชัด จะทำให้ “งงแต่แรก”
หน้านี้สรุปเฉพาะสิ่งที่ใช้จริงในคอร์สนี้

---

## 1) Method (Action)

- `GET` = อ่านข้อมูล
- `POST` = สร้างข้อมูล
- `PUT`/`PATCH` = แก้ไขข้อมูล
- `DELETE` = ลบข้อมูล

วันนี้เราจะเน้น `GET` เพื่อทำ routing/response/error ให้เป็นมาตรฐานก่อน

---

## 2) URL = Path + Params + Query

ตัวอย่าง:

- `/api/books`  
  - path: `/api/books` (resource = books)
- `/api/books/10`  
  - path pattern: `/api/books/:id`
  - params: `{ id: "10" }`
- `/api/books?search=node&limit=2`  
  - query: `{ search: "node", limit: "2" }`

**กติกาจำง่าย**
- params ใช้ “ระบุของชิ้นเดียว”
- query ใช้ “ปรับผลลัพธ์” (filter, limit, sort)

---

## 3) Headers (Metadata)

headers คือข้อมูลกำกับ request/response เช่น:
- `Content-Type` → บอกชนิดข้อมูลใน body (เช่น `application/json`)
- `Accept` → client อยากได้ response แบบไหน (เช่น JSON)

วันนี้จำแค่นี้:
- ถ้าจะส่ง JSON body ต้องมี `Content-Type: application/json`
- และฝั่ง server ต้องมี `app.use(express.json())`

---

## 4) Body (Payload)

body มักใช้กับ `POST/PUT/PATCH` เพื่อส่งข้อมูล:

```json
{ "title": "Node.js Essentials", "author": "Bob" }
```

ใน Express:
- ถ้ามี `express.json()` → อ่านได้จาก `req.body`

---

## 5) Status Codes (Outcome)

จำชุดนี้ให้แม่น:
- `200` OK — สำเร็จ
- `201` Created — สร้างสำเร็จ (Day 5 จะใช้)
- `400` Bad Request — input ไม่ถูกต้อง (เช่น id ไม่ใช่เลข)
- `404` Not Found — ไม่พบ resource (เช่น book id ไม่มี)
- `500` Internal Server Error — server พังเอง

**ตัวอย่าง mapping**
- `GET /api/books/abc` → 400 (invalid id)
- `GET /api/books/9999` → 404 (id เป็นเลขแต่ไม่พบ)

---

## 6) Response contract (ทำให้ทุก endpoint “หน้าตาเหมือนกัน”)

แนะนำ:
```js
// success
{ ok: true, data: ... }

// error
{ ok: false, error: { code, message } }
```

เหตุผล:
- client เขียน logic ง่าย
- debug ง่าย
- ทำ test ง่าย
