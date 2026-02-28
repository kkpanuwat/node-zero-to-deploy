---
id: day-2-lab
title: 'Day 2 Lab: Books CRUD API ด้วย Express (Persist ด้วย JSON)'
sidebar_label: 'Day 2 Lab: Books CRUD API ด้วย Express (Persist ด้วย JSON)'
---

Lab นี้คือการทำ **Books CRUD API** ด้วย Express **อ่าน/เขียนไฟล์ JSON** (ยังไม่ใช้ Database)

---

## Project Setup

### โครงสร้างไฟล์

```text
my-express-app/
  data/
    books.json
  src/
    repositories/
      booksRepo.js
    services/
      booksService.js
    routes/
      books.js
    server.js
  package.json
```

### สร้างโปรเจกต์ + ติดตั้ง dependencies

```bash
mkdir my-express-app
cd my-express-app
npm init -y
npm install express
npm install -D nodemon
```

เพิ่ม scripts ใน `package.json`:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

สร้างไฟล์ข้อมูลเริ่มต้น `data/books.json`:

```json
[]
```

---

## Data Model

```json
{
  "id": "B001",
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "createdAt": "2026-03-01T10:00:00.000Z",
  "updatedAt": "2026-03-01T10:00:00.000Z"
}
```

> ในแลปนี้ `id` ทำแบบง่าย: ให้สร้างจากเวลา + เลขสุ่ม (พอใช้สำหรับ demo)

---

## API Spec (สิ่งที่ต้องทำ)

| Method | Path | ทำอะไร | Status ที่คาดหวัง |
|---|---|---|---|
| `GET` | `/books` | ดึงรายการหนังสือทั้งหมด | `200` |
| `GET` | `/books/:id` | ดึงหนังสือตาม id | `200`, `404` |
| `POST` | `/books` | สร้างหนังสือใหม่ | `201`, `400` |

รูปแบบ response (แนะนำให้ใช้สม่ำเสมอ):

- สำเร็จ: `{ "ok": true, "data": ... }`
- ไม่สำเร็จ: `{ "ok": false, "error": "CODE", "message": "..." }`

---

## Step 1: Repo (อ่าน/เขียน JSON File)

สร้าง `src/repositories/booksRepo.js`

```js
const fs = require("fs/promises");
const path = require("path");

const BOOKS_FILE = path.join(process.cwd(), "data", "books.json");

async function readBooks() {
  const text = await fs.readFile(BOOKS_FILE, "utf8");
  const data = JSON.parse(text || "[]");
  if (!Array.isArray(data)) throw new Error("books.json must be an array");
  return data;
}

async function writeBooks(books) {
  const text = JSON.stringify(books, null, 2);

  const tmp = `${BOOKS_FILE}.tmp`;
  await fs.writeFile(tmp, text, "utf8");
  await fs.rename(tmp, BOOKS_FILE);
}

module.exports = { readBooks, writeBooks };
```

---

## Step 2: Service (Business Logic)

สร้าง `src/services/booksService.js`

```js
const { readBooks, writeBooks } = require("../repositories/booksRepo");

class AppError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

function newId() {
  return `B${Date.now().toString(36)}${Math.floor(Math.random() * 1000)}`;
}

async function listBooks() {
  const books = await readBooks();
  return books;
}

async function getBookById(id) {
  const books = await readBooks();
  const book = books.find((b) => b.id === id);
  if (!book) throw new AppError(404, "NOT_FOUND", "book not found");
  return book;
}

async function createBook(payload) {
  const { title, author } = payload || {};
  if (!title || !author) {
    throw new AppError(400, "BAD_REQUEST", "title and author are required");
  }

  const now = new Date().toISOString();
  const book = { id: newId(), title, author, createdAt: now, updatedAt: now };

  const books = await readBooks();
  books.push(book);
  await writeBooks(books);

  return book;
}

module.exports = {
  AppError,
  listBooks,
  getBookById,
  createBook
};
```

---

## Step 3: Routes (HTTP Layer)

สร้าง `src/routes/books.js`

```js
const express = require("express");
const booksService = require("../services/booksService");

const router = express.Router();

router.get("/", async (req, res) => {
  const books = await booksService.listBooks();
  res.json({ ok: true, data: books });
});

router.get("/:id", async (req, res) => {
  const book = await booksService.getBookById(req.params.id);
  res.json({ ok: true, data: book });
});

router.post("/", async (req, res) => {
  const book = await booksService.createBook(req.body);
  res.status(201).json({ ok: true, data: book });
});

module.exports = router;
```

---

## Step 4: Server

สร้าง `src/server.js`

```js
const express = require("express");
const booksRouter = require("./routes/books");
const { AppError } = require("./services/booksService");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/books", booksRouter);

app.use((req, res) => {
  res.status(404).json({ ok: false, error: "NOT_FOUND" });
});

app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof AppError) {
    return res.status(err.status).json({
      ok: false,
      error: err.code,
      message: err.message
    });
  }
  res.status(500).json({ ok: false, error: "INTERNAL_SERVER_ERROR" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

รัน:

```bash
npm run dev
```
---

## การบ้าน: Implement `PATCH` + `DELETE`

เพิ่ม 2 endpoint ด้านล่างตามละเอียดด้านล่าง อ่าน/เขียนข้อมูลจากไฟล์ `data/books.json` 

### ข้อที่ 1) `PATCH /books/:id`

- แก้เฉพาะบาง field ของหนังสือ
- รองรับการแก้ `title` และ/หรือ `author`

**เงื่อนไข**

- ถ้าไม่ส่งทั้ง `title` และ `author` มาเลย → response `400 BAD_REQUEST`
- ถ้า `id` ไม่เจอในไฟล์ → response `404 NOT_FOUND`
- ถ้าสำเร็จ → ตอบ `200 OK` และส่งหนังสือที่อัปเดตแล้วกลับไป

**Hint**

- ทำใน `src/services/booksService.js` เป็นฟังก์ชัน `patchBook(id, payload)`
- หา index จาก array แล้วแก้เฉพาะ field ที่ถูกส่งมา
- อัปเดต `updatedAt` ทุกครั้งที่แก้ข้อมูล


### ข้อที่ 2) `DELETE /books/:id`

- ลบหนังสือออกจากไฟล์ `books.json`

**เงื่อนไข**

- ถ้า `id` ไม่เจอ → response `404 NOT_FOUND`
- ถ้าลบสำเร็จ → response `204 No Content`

**Hint**

- ทำใน `src/services/booksService.js` เป็นฟังก์ชัน `deleteBook(id)`
- ใช้ `filter` สร้าง array ใหม่ แล้วเขียนกลับด้วย repo
