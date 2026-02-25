---
id: day-3-lab-2-books-endpoint
title: 'Lab 2: GET /api/books'
sidebar_label: '2. GET /api/books'
---

**เป้าหมาย:** สร้าง endpoint `GET /api/books` ที่อ่านข้อมูลจาก in-memory module

> Timebox แนะนำ: 30–45 นาที

## 1) เตรียมข้อมูล `src/data/books.js`

ถ้ามีอยู่แล้วจาก Day 2 ให้ข้ามได้

```js
const books = [
  { id: 1, title: "JavaScript for Beginners", author: "Alice" },
  { id: 2, title: "Node.js Essentials", author: "Bob" },
];

module.exports = { books };
```

## 2) เพิ่ม route ใน `src/index.js`

```js
const { books } = require("./data/books");

app.get("/api/books", (req, res) => {
  res.json({ ok: true, data: { total: books.length, books } });
});
```

## 3) ทดสอบ

เปิด `http://localhost:4000/api/books` แล้วควรได้ JSON รายการหนังสือ
