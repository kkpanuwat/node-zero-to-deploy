---
id: day-2-lab-6-post-validation-and-crud
title: 'Lab 6: POST, Validation & CRUD'
sidebar_label: '6. POST & Validation'
---

**เป้าหมาย:** เพิ่ม `POST /books` แบบ robust (parse body, validate, error responses) และเริ่ม CRUD แบบพื้นฐาน

> Timebox แนะนำ: 70–90 นาที

## 6.1 สร้าง helper อ่าน JSON body (พร้อมจำกัดขนาด)

สร้าง `src/utils/read-json-body.js`

```js
async function readJsonBody(req, options = {}) {
  const maxBytes = options.maxBytes ?? 50_000; // ~50kb

  let total = 0;
  const chunks = [];

  for await (const chunk of req) {
    total += chunk.length;
    if (total > maxBytes) {
      const err = new Error('PAYLOAD_TOO_LARGE');
      err.code = 'PAYLOAD_TOO_LARGE';
      throw err;
    }
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    const err = new Error('INVALID_JSON');
    err.code = 'INVALID_JSON';
    throw err;
  }
}

module.exports = { readJsonBody };
```

## 6.2 สร้าง validation สำหรับหนังสือ

สร้าง `src/validators/books-validator.js`

```js
function validateCreateBook(body) {
  const title = typeof body?.title === 'string' ? body.title.trim() : '';
  const author = typeof body?.author === 'string' ? body.author.trim() : '';

  if (!title) return { ok: false, message: 'title is required' };
  if (!author) return { ok: false, message: 'author is required' };

  return { ok: true, value: { title, author } };
}

module.exports = { validateCreateBook };
```

## 6.3 Implement `POST /books`

แนวคิด:
- ต้องรับ `Content-Type: application/json` (ถ้าไม่ใช่ให้ตอบ `415`)
- ถ้า JSON ไม่ถูกต้อง ให้ตอบ `400`
- ถ้า payload ใหญ่เกิน ให้ตอบ `413`
- ถ้าผ่าน validate: อ่าน list เดิม → เพิ่มรายการใหม่ → เขียนกลับไฟล์ → ตอบ `201`

**ตัวอย่าง curl ทดสอบ**
```bash
curl -i -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Clean Code","author":"Robert C. Martin"}'
```

## 6.4 Route เพิ่มเติม (เลือกทำ)

1. `GET /books/:id`
   - ถ้าไม่เจอ: `404`
2. `DELETE /books/:id`
   - ถ้าลบสำเร็จ: `204 No Content`

> Hint: แยก `pathname` แล้วใช้ regex เช่น `^/books/(\\d+)$`

## ✅ Checkpoint

- `POST /books` สร้างหนังสือแล้ว `GET /books` เห็นรายการเพิ่ม
- restart server แล้วข้อมูลยังอยู่
- ส่ง JSON พัง → ได้ `400` แบบไม่ crash
- ส่ง `Content-Type` ผิด → ได้ `415`
