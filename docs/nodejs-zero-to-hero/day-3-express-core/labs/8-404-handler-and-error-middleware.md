---
id: day-3-lab-8-404-and-error-middleware
title: 'Lab 8: 404 Handler + Error Middleware'
sidebar_label: '8. 404 + error middleware'
---

**เป้าหมาย:** ทำให้ API ตอบ 404 และ 500 แบบเป็นมาตรฐานเดียวกัน

> Timebox แนะนำ: 45–60 นาที

## 1) เพิ่ม 404 handler (วางท้ายสุด หลัง routes)

`src/index.js`
```js
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: { code: "NOT_FOUND", message: "Route not found" },
  });
});
```

## 2) เพิ่ม error middleware (วางท้ายสุด หลัง 404 handler)

```js
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    ok: false,
    error: { code: "INTERNAL_ERROR", message: "Something went wrong" },
  });
});
```

## 3) ทดสอบ

- เรียก route ที่ไม่มี เช่น `/api/nope` → ได้ 404 แบบ JSON
- ลองโยน error ใน controller (ชั่วคราว) แล้ว `next(err)` เพื่อดู 500
