---
id: day-3-lab-4-middleware-logger
title: 'Lab 4: Middleware + Logger'
sidebar_label: '4. Middleware + Logger'
---

**เป้าหมาย:** ใส่ middleware ที่จำเป็น และเพิ่ม request logging

> Timebox แนะนำ: 30–45 นาที

## 1) ใส่ `express.json()`

ใน `src/index.js` (ก่อน routes):
```js
app.use(express.json());
```

## 2) ใส่ request logger

แบบง่าย:
```js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

## 3) เช็กผล

เรียก `GET /api/health` และ `GET /api/books` แล้วดู log ใน terminal
