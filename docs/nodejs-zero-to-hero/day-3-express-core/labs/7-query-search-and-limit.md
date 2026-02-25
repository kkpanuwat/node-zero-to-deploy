---
id: day-3-lab-7-query-search-and-limit
title: 'Lab 7: Query ?search= + ?limit='
sidebar_label: '7. Query search/limit'
---

**เป้าหมาย:** ทำให้ `GET /api/books` รองรับ query สำหรับ filter และ limit แบบง่าย

> Timebox แนะนำ: 45–60 นาที

## 1) ปรับ controller `getBooks`

`src/controllers/books-controller.js`
```js
function getBooks(req, res) {
  const search = req.query.search?.toString().trim().toLowerCase() ?? "";
  const limitRaw = req.query.limit?.toString();
  const limit = limitRaw ? Number(limitRaw) : undefined;

  if (limit !== undefined && (Number.isNaN(limit) || limit <= 0)) {
    return res.status(400).json({
      ok: false,
      error: { code: "INVALID_LIMIT", message: "limit must be a positive number" },
    });
  }

  let result = books;
  if (search) {
    result = result.filter((b) => {
      const title = b.title?.toString().toLowerCase() ?? "";
      const author = b.author?.toString().toLowerCase() ?? "";
      return title.includes(search) || author.includes(search);
    });
  }

  if (limit !== undefined) {
    result = result.slice(0, limit);
  }

  return res.json({ ok: true, data: { total: result.length, books: result } });
}
```

## 2) ทดสอบ

- `/api/books?search=node`
- `/api/books?limit=1`
- `/api/books?search=js&limit=2`
