---
id: day-3-lab-6-get-book-by-id
title: 'Lab 6: GET /api/books/:id + 404'
sidebar_label: '6. GET /books/:id'
---

**เป้าหมาย:** เพิ่ม endpoint อ่านหนังสือ “รายตัว” และตอบ 404 เมื่อไม่พบ

> Timebox แนะนำ: 45–60 นาที

## 1) เพิ่ม controller `getBookById`

`src/controllers/books-controller.js`
```js
const { books } = require("../data/books");

function getBookById(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({
      ok: false,
      error: { code: "INVALID_ID", message: "id must be a number" },
    });
  }

  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({
      ok: false,
      error: { code: "BOOK_NOT_FOUND", message: "Book not found" },
    });
  }

  return res.json({ ok: true, data: { book } });
}

module.exports = { getBookById };
```

> ถ้าคุณมี `getBooks` อยู่แล้ว ให้ export รวมกัน เช่น `module.exports = { getBooks, getBookById }`

## 2) เพิ่ม route

`src/routes/books-route.js`
```js
router.get("/:id", getBookById);
```

## 3) ทดสอบ

- `GET /api/books/1` → 200
- `GET /api/books/9999` → 404
- `GET /api/books/abc` → 400
