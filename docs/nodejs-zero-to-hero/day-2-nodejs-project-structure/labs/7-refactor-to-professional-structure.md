---
id: day-2-lab-7-refactor-to-professional-structure
title: 'Lab 7: Refactor to Professional Structure'
sidebar_label: '7. Refactor Structure'
---

**เป้าหมาย:** ลด “ไฟล์เดียวทำทุกอย่าง” ให้กลายเป็นโครงสร้างที่ทีมอ่านง่าย แก้ง่าย และขยายต่อได้

> Timebox แนะนำ: 60–90 นาที

## 7.1 โครงสร้างโฟลเดอร์แนะนำ

ปรับโครงสร้างเป็นประมาณนี้:
```
src/
  server.js
  router.js
  handlers/
    health-handler.js
    books-handler.js
  repositories/
    books-repository.js
  utils/
    logger.js
    response.js
    read-json-body.js
  validators/
    books-validator.js
data/
  books.json
```

> ไม่ต้องเป๊ะ 100% แต่ให้ทุกคนในทีม “เดาได้” ว่า logic อยู่ตรงไหน

## 7.2 ทำ `router.js` แบบ mini framework

เป้าหมาย: `server.js` ควรเหลือแค่ “รับ request → ส่งต่อ router”

ตัวอย่างแนวทาง (ย่อ):
```js
function matchRoute(method, pathname) {
  if (method === 'GET' && pathname === '/health') return { name: 'health' };
  if (pathname === '/books') return { name: 'books.collection' };

  const m = pathname.match(/^\\/books\\/(\\d+)$/);
  if (m) return { name: 'books.item', params: { id: Number(m[1]) } };

  return null;
}

module.exports = { matchRoute };
```

แล้วใน `server.js` ใช้ `matchRoute` เพื่อตัดสินใจเรียก handler ที่ถูกต้อง

## 7.3 แยก handlers ให้เหลือ “ธุรกิจ” อย่างเดียว

แนวคิด:
- `handler` รับ `(req, res, ctx)` (ctx อาจมี `pathname`, `query`, `params`)
- `handler` เรียก repository/validator/response helpers
- `handler` ไม่ควรมี logic parse URL ซ้ำๆ

## 7.4 ทำมาตรฐาน response/error ของทีม

กำหนด format กลาง:
- Success: `{ ok: true, data: ... }`
- Error: `{ ok: false, error: { code, message, details? } }`

แล้วใช้ helper (เช่น `sendError`) เพื่อให้ทุก endpoint consistent

## ✅ Checkpoint

- `src/server.js` อ่านง่ายมาก (ประมาณ 30–60 บรรทัด) และแทบไม่มี business logic
- ย้ายโค้ดแล้ว API ยังทำงานเหมือนเดิม (ลอง `GET /health`, `GET /books`, `POST /books`)
