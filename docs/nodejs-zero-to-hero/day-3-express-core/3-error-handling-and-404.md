---
id: day-3-error-handling-and-404
title: 'Day 3: Error Handling + 404'
sidebar_label: 'Error Handling + 404'
description: 'ทำ 404 handler และ error middleware เพื่อให้ API ตอบผิดพลาดแบบเป็นระบบ'
---

# Part 2.2 — Error Handling + 404 (ทำให้ API ดูเป็นโปร)

## 1) ทำไมต้องมี 404 handler

ถ้าไม่มี route ตรงกับ request, Express จะตอบ 404 เองก็จริง
แต่ในงานจริงเรามักอยากให้ response เป็นมาตรฐานเดียวกับที่เหลือ (response contract)

ตัวอย่าง 404 handler (วางท้ายสุด หลัง mount routes ทั้งหมด):
```js
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: { code: "NOT_FOUND", message: "Route not found" },
  });
});
```

---

## 2) Error middleware คืออะไร

Express มีรูปแบบพิเศษสำหรับ error middleware:

```js
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
});
```

แนวคิดคือ:
- ถ้าโค้ดส่วนไหนมีปัญหา → `next(err)`
- error middleware จะรวบรวมการตอบ error ให้อยู่จุดเดียว

ตัวอย่าง:
```js
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    ok: false,
    error: { code: "INTERNAL_ERROR", message: "Something went wrong" },
  });
});
```

---

## 3) “ลำดับ” ของ middleware สำคัญมาก

จำง่าย ๆ:
1. `express.json()`
2. request logger
3. routes
4. 404 handler
5. error middleware

ถ้าสลับลำดับผิด อาจเจอ:
- `req.body` เป็น `undefined`
- route ไม่ถูกเรียก
- error หลุดไปจน process เด้ง
