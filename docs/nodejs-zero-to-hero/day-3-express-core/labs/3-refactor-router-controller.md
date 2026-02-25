---
id: day-3-lab-3-router-controller
title: 'Lab 3: Refactor to Router + Controller'
sidebar_label: '3. Router + Controller'
---

**เป้าหมาย:** แยกโค้ดให้อ่านง่ายขึ้นด้วย `routes/` และ `controllers/`

> Timebox แนะนำ: 45–60 นาที

## 1) สร้าง controller

`src/controllers/books-controller.js`
```js
const { books } = require("../data/books");

function getBooks(req, res) {
  res.json({ ok: true, data: { total: books.length, books } });
}

module.exports = { getBooks };
```

## 2) สร้าง router

`src/routes/books-route.js`
```js
const express = require("express");
const { getBooks } = require("../controllers/books-controller");

const router = express.Router();
router.get("/", getBooks);

module.exports = router;
```

## 3) mount router ใน `src/index.js`

```js
const bookRoutes = require("./routes/books-route");
app.use("/api/books", bookRoutes);
```

ทดสอบใหม่ที่ `GET /api/books`
