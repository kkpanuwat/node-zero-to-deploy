---
id: day-3-routing-and-middleware
title: 'Day 3: Routing + Middleware'
sidebar_label: 'Routing + Middleware'
description: 'แยก Router/Controller, ใส่ middleware, และทำ response ให้ consistent'
---

# Part 2 — Routing + Middleware: ทำ API ให้ “โตต่อได้”

## 1) ทำ response ให้ consistent

เวลาทำงานจริง ทีมจะชอบ response รูปแบบเดียวกัน เช่น:

```js
{ ok: true, data: ... }
{ ok: false, error: { code, message } }
```

ข้อดีคือ frontend/test/debug ง่ายขึ้น

### ถาม-ตอบที่เจอบ่อย

**ถาม:** “ทำไมต้องมี `ok` ด้วย ในเมื่อมี status code แล้ว?”  
**ตอบ:** status code บอกผลลัพธ์ระดับ HTTP แต่ `ok/error.code` ช่วยให้ client ทำงานง่ายแบบ consistent (โดยเฉพาะเวลามีหลาย endpoint และหลาย error cases)

---

## 1.1) ทำ “รูปแบบข้อมูล” ให้คงที่ (payload shape)

แนะนำให้ตอบข้อมูล list แบบมี metadata:

```js
{
  ok: true,
  data: {
    total: 2,
    books: [...]
  }
}
```

เหตุผล:
- วันหลังเพิ่ม pagination ได้ง่าย
- frontend แสดงผลได้ชัด (รู้ `total`)

---

## 2) แยก route ออกจาก index

`src/index.js` ควรทำหน้าที่หลัก ๆ:
- สร้าง app
- ใส่ middleware
- mount routes
- start server

route รายละเอียดควรอยู่ใน `routes/` และ handler อยู่ใน `controllers/`

### ทำไมการแยกชั้นถึงช่วยจริง

- อ่านเร็ว: เปิด `routes/` ก็รู้ว่า API มีอะไร
- แก้ไขง่าย: logic อยู่ `controllers/` ไม่กองในไฟล์เดียว
- ต่อทีมง่าย: คนละคนทำคนละ route ได้

---

## 2.1) รูปแบบการ mount route ที่ควรจำ

ถ้าเขียน:

```js
app.use("/api/books", bookRoutes);
```

ใน router ควรเขียนแบบนี้:

```js
router.get("/", handler); // = GET /api/books
router.get("/:id", handler); // = GET /api/books/:id
```

### `app.get` vs `app.use` (สอนให้เข้าใจตั้งแต่แรก)

- `app.get("/path", ...)` → รับเฉพาะ GET
- `app.use("/prefix", router)` → “mount” router เป็นกลุ่ม และรับได้หลาย method ตามที่ router ประกาศ

เชิง mental model:
- `app.use("/api/books", bookRoutes)` = “ทุกอย่างที่ขึ้นต้นด้วย `/api/books` ให้ไปต่อใน bookRoutes”

---

## 3) Middleware ที่ควรมีตั้งแต่วันแรก

- `express.json()` สำหรับรับ `POST/PUT` ในอนาคต (วันนี้ใส่ไว้ก่อน)
- request logger เพื่อ trace เวลาดีบัก

ตัวอย่าง logger (แนวเดียวกับ Day 2):
```js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

---

## 3.1) “order matters” (เรียงผิด ชีวิตยาก)

- `express.json()` ต้องมาก่อน route ที่ต้องอ่าน body
- logger มักจะอยู่ก่อน routes เพื่อเห็นทุก request

---

## 4) Health check endpoint

endpoint นี้ช่วยให้เรารู้ว่า server “รันอยู่จริง”:
- `GET /api/health` → 200 + JSON

พอเริ่มมี Docker/Deploy ในวันหลัง ๆ endpoint นี้จะมีประโยชน์มาก

---

## 5) เตรียมพื้นที่สำหรับ error handling ตั้งแต่ต้น

ถึงวันนี้เรายังทำ CRUD ไม่ครบ แต่ควรวาง “รูปแบบการตอบ error” ให้พร้อม:
- invalid input → 400
- resource not found → 404
- unexpected error → 500 (ผ่าน error middleware)

### แนวคิดสำคัญ: “แยก error ของ user” vs “error ของ server”

- user ส่ง input แปลก → 400 (บอกชัดว่าอะไรผิด)
- หา resource ไม่เจอ → 404 (ไม่ใช่ 500)
- server ทำพังเอง (bug/exception) → 500
