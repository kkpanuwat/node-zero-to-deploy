---
id: day-3-lab-1-express-foundation
title: 'Lab 1: Express Foundation'
sidebar_label: '1. Express Foundation'
---

**เป้าหมาย:** ติดตั้ง Express และสร้าง server แรกของ Day 3 ให้รันได้

> Timebox แนะนำ: 30–45 นาที

## 1) ติดตั้ง dependencies

ในโฟลเดอร์โปรเจกต์ `library-system`:
```bash
npm install express
```

ถ้ายังไม่มี `nodemon` (แนะนำสำหรับ dev):
```bash
npm install --save-dev nodemon
```

## 2) ตั้งค่า scripts

เพิ่มใน `package.json`:
```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

## 3) สร้างไฟล์ `src/index.js`

```js
const express = require("express");

const app = express();
const PORT = 4000;

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Library API ready" });
});

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
```

## 4) รันและเช็กผล

```bash
npm run dev
```

เปิด:
- `http://localhost:4000/api/health`
