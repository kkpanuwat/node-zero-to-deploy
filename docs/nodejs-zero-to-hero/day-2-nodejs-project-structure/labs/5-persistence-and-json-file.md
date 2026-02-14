---
id: day-2-lab-5-persistence-and-json-file
title: 'Lab 5: Persistence (JSON File)'
sidebar_label: '5. Persistence'
---

**เป้าหมาย:** ทำให้ข้อมูล “ไม่หายเมื่อ restart server” โดยอ่าน/เขียน JSON file ด้วย `fs`

> Timebox แนะนำ: 60–80 นาที

## 5.1 สร้างไฟล์ข้อมูลจริง

1. สร้างโฟลเดอร์และไฟล์:
   ```bash
   mkdir -p data
   printf "[]\n" > data/books.json
   ```
2. (แนะนำ) เพิ่ม `data/*.json` เข้า `.gitignore` ถ้าไม่อยาก commit ข้อมูล runtime  
   หรือเลือก commit `data/books.json` เป็น “seed file” ก็ได้ แต่ให้คุยกับทีมให้ชัด

## 5.2 สร้าง Books Repository

สร้างไฟล์ `src/repositories/books-repository.js`

```js
const fs = require('fs/promises');
const path = require('path');

const booksFilePath = path.join(process.cwd(), 'data', 'books.json');

async function readAllBooks() {
  try {
    const raw = await fs.readFile(booksFilePath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeAllBooks(nextBooks) {
  await fs.mkdir(path.dirname(booksFilePath), { recursive: true });
  await fs.writeFile(booksFilePath, JSON.stringify(nextBooks, null, 2) + '\n', 'utf8');
}

module.exports = { readAllBooks, writeAllBooks };
```

## 5.3 ต่อสายเข้ากับ `GET /books`

ใน `src/server.js` ให้เปลี่ยนจาก in-memory เป็นอ่านจาก repository:

- `GET /books` ต้อง `await readAllBooks()` แล้วตอบกลับ
- ถ้ายังไม่ได้ใช้ async handler: ให้ทำ `http.createServer(async (req, res) => { ... })`

ตัวอย่างแนวทาง (ย่อ):
```js
const { readAllBooks } = require('./repositories/books-repository');
// ...
if (req.method === 'GET' && pathname === '/books') {
  const books = await readAllBooks();
  return sendJson(res, 200, { ok: true, data: { books } });
}
```

## ✅ Checkpoint

- เพิ่มหนังสือ “ปลอม” โดยแก้ `data/books.json` แล้ว `GET /books` เห็นข้อมูลนั้น
- ปิด/เปิด server ใหม่ ข้อมูลยังอยู่เหมือนเดิม

## Mini Challenges (ถ้ามีเวลา)

1. ถ้าไฟล์ว่าง/JSON พัง ให้ตอบ `500` แบบอ่านง่าย (อย่าให้ server crash)
2. ทำ endpoint `GET /books?limit=3` (ตัด array ด้วย `.slice(0, limit)`)
