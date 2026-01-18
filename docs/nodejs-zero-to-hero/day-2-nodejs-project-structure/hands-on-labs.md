---
id: day-2-hands-on-labs
title: 'Day 2: Hands-on Labs'
sidebar_label: 'Hands-on Labs'
description: Workshop สร้างโปรเจกต์ library-system, ตั้งค่า npm scripts, และรัน Basic HTTP Server ที่ตอบ JSON รายชื่อหนังสือ
---

# Part 2 — Hands-on Labs

> เป้าหมาย: รัน `npm run dev` แล้วมี endpoint อย่างน้อย 2 อัน: `/health` และ `/books` ที่ตอบ JSON ได้ และต่อยอดเป็น `POST /books` + persistence ลงไฟล์ได้

## Timeline แนะนำ (ให้เต็มวัน)

- ชั่วโมง 1: setup + scripts + run server ได้
- ชั่วโมง 2: ทำ routing ให้รองรับ query string + 404/405
- ชั่วโมง 3: response helpers + standard JSON response
- ชั่วโมง 4: ทำ `GET /books` ให้รองรับ `?limit`/`?search`
- ชั่วโมง 5: ทำ `POST /books` + parse body + validation
- ชั่วโมง 6: persistence ลงไฟล์ `data/books.json` + repo layer
- ชั่วโมง 7: refactor ให้โครงสร้างเหมือนโปรเจกต์จริง (handlers/routes/config/utils)
- ชั่วโมง 8: mini-project + review + recap ไป Express

## Lab 1: สร้างโครงสร้างโปรเจกต์ `library-system`

1. สร้างโฟลเดอร์และ init โปรเจกต์

```bash
mkdir library-system
cd library-system
npm init -y
```

2. สร้างโครงสร้างโฟลเดอร์

```bash
mkdir -p src/data src/utils
touch src/server-basic.js src/data/books.js src/utils/logger.js
```

3. (แนะนำ) สร้าง `.gitignore`

```bash
printf "node_modules\n.env\n.DS_Store\n" > .gitignore
```

4. เพิ่มข้อมูลจำลอง `src/data/books.js`

```js
const books = [
  { id: 1, title: 'JavaScript for Beginners', author: 'Alice' },
  { id: 2, title: 'Node.js Essentials', author: 'Bob' },
];

module.exports = { books };
```

Checkpoint:

- `tree`/โครงสร้างไฟล์ถูกต้อง
- `git status` เห็นไฟล์ใหม่ และ `node_modules` ไม่ควรถูก track

## Lab 2: ทำ `logger` utility

สร้าง `src/utils/logger.js`

```js
function log(message) {
  const stamp = new Date().toISOString();
  console.log(`[${stamp}]`, message);
}

module.exports = { log };
```

Checkpoint:

- เรียก `log('hello')` แล้วเห็น timestamp

## Lab 3: เขียน Basic HTTP Server

สร้าง `src/server-basic.js` (มี routing แบบง่าย)

```js
const http = require('http');
const { books } = require('./data/books');
const { log } = require('./utils/logger');

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  log(`Request: ${req.method} ${req.url}`);

  if (req.method === 'GET' && req.url === '/health') {
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === 'GET' && req.url === '/books') {
    return sendJson(res, 200, { ok: true, data: { books } });
  }

  return sendJson(res, 404, { message: 'Not Found' });
});

const port = Number(process.env.PORT ?? 3000);
server.listen(port, () => {
  log(`Server running at http://localhost:${port}`);
});
```

Checkpoint:

- เปิด `http://localhost:3000/health` ได้
- เปิด `http://localhost:3000/books` ได้

แนะนำ commit point:

- `chore: init library-system skeleton`

## Lab 4: ตั้งค่า `npm scripts` (start/dev)

1. ติดตั้ง `nodemon` (dev dependency)

```bash
npm i -D nodemon
```

2. แก้ `package.json` ให้มี scripts แบบนี้

```json
{
  "scripts": {
    "start": "node src/server-basic.js",
    "dev": "nodemon src/server-basic.js"
  }
}
```

Checkpoint:

- รัน `npm run dev` แล้วแก้ไฟล์ 1 ครั้ง server restart เอง

## Lab 5: ตั้งค่า `.env` (optional แต่แนะนำ)

1. ติดตั้ง `dotenv`

```bash
npm i dotenv
```

2. สร้างไฟล์ `.env.example`

```bash
printf "PORT=3000\n" > .env.example
```

3. สร้างไฟล์ `.env` (ห้าม commit)

```bash
printf "PORT=3000\n" > .env
```

4. เพิ่มบรรทัดนี้ไว้บนสุดของ `src/server-basic.js`

```js
require('dotenv').config();
```

Checkpoint:

- เปลี่ยน `PORT` ใน `.env` แล้ว server เปลี่ยนพอร์ตตาม

## Lab 6: ทำ routing ให้รองรับ query string + 404/405

แก้ routing ให้ parse URL ด้วย `new URL()` และแยก `pathname` ออกจาก query

แนวทาง:

- `/books?search=node` ต้องยัง match route `/books`
- ถ้า `POST /health` ให้ตอบ `405` พร้อม header `Allow: GET`

> แนะนำให้อ่าน Part: HTTP Routing ก่อนทำ lab นี้

ตัวอย่างโค้ด (แนวทาง):

```js
const url = new URL(req.url, `http://${req.headers.host}`);
const pathname = url.pathname;

if (pathname === '/health') {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendJson(res, 405, { ok: false, error: { code: 'METHOD_NOT_ALLOWED', message: 'Method Not Allowed' } });
  }
  return sendJson(res, 200, { ok: true });
}

if (pathname === '/books') {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET,POST');
    return sendJson(res, 405, { ok: false, error: { code: 'METHOD_NOT_ALLOWED', message: 'Method Not Allowed' } });
  }
  return sendJson(res, 200, { ok: true, data: { books } });
}

return sendJson(res, 404, { ok: false, error: { code: 'NOT_FOUND', message: 'Not Found' } });
```

แนะนำ commit point:

- `feat: url parsing + 404/405`

## Lab 7: ทำ `GET /books` ให้รองรับ `?limit` และ `?search`

เพิ่มความสามารถ:

- `GET /books?limit=1` → คืนหนังสือแค่ 1 รายการ
- `GET /books?search=node` → filter จาก `title`/`author` (case-insensitive)

แนะนำขั้นตอน:

1. parse query string
2. ทำ function `filterBooks(books, search)`
3. ทำ function `limitBooks(books, limit)`
4. return `200` พร้อม `{ ok: true, data: { books: [...] } }`

ตัวอย่างโค้ด (แนวทาง):

```js
function filterBooks(allBooks, search) {
  if (!search) return allBooks;
  const needle = search.trim().toLowerCase();
  return allBooks.filter((b) => {
    return (
      String(b.title ?? '').toLowerCase().includes(needle) ||
      String(b.author ?? '').toLowerCase().includes(needle)
    );
  });
}

function limitBooks(allBooks, limitRaw) {
  const limit = Number(limitRaw);
  if (!Number.isFinite(limit) || limit <= 0) return allBooks;
  return allBooks.slice(0, limit);
}

// ใน handler:
const search = url.searchParams.get('search');
const limit = url.searchParams.get('limit');
let result = filterBooks(books, search);
result = limitBooks(result, limit);
return sendJson(res, 200, { ok: true, data: { books: result } });
```

แนะนำ commit point:

- `feat: books search/limit`

## Lab 8: ทำ `POST /books` + parse JSON body + validation

เพิ่ม endpoint:

- `POST /books` รับ JSON `{ "title": "...", "author": "..." }`

Validation แนะนำ:

- `title` และ `author` ต้องเป็น string และ `.trim()` แล้วไม่ว่าง
- ถ้าไม่ผ่าน: ตอบ `400` และ return `{ ok: false, error: { code, message } }`

ตัวอย่างทดสอบ:

```bash
curl -s -X POST http://localhost:3000/books \
  -H 'Content-Type: application/json' \
  -d '{"title":"Clean Code","author":"Robert C. Martin"}'
```

ตัวอย่างโค้ด (แนวทาง):

```js
async function readJsonBody(req, maxBytes = 50_000) {
  const chunks = [];
  let size = 0;

  for await (const chunk of req) {
    size += chunk.length;
    if (size > maxBytes) {
      const error = new Error('Payload too large');
      error.code = 'PAYLOAD_TOO_LARGE';
      throw error;
    }
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    const error = new Error('Invalid JSON');
    error.code = 'INVALID_JSON';
    throw error;
  }
}

function validateBookInput(body) {
  const title = typeof body?.title === 'string' ? body.title.trim() : '';
  const author = typeof body?.author === 'string' ? body.author.trim() : '';

  if (!title) return { ok: false, code: 'VALIDATION_ERROR', message: 'title is required' };
  if (!author) return { ok: false, code: 'VALIDATION_ERROR', message: 'author is required' };

  return { ok: true, data: { title, author } };
}
```

และใน route `/books`:

```js
if (req.method === 'POST') {
  if (req.headers['content-type']?.includes('application/json') !== true) {
    return sendJson(res, 400, { ok: false, error: { code: 'INVALID_CONTENT_TYPE', message: 'Content-Type must be application/json' } });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch (e) {
    if (e.code === 'PAYLOAD_TOO_LARGE') return sendJson(res, 413, { ok: false, error: { code: 'PAYLOAD_TOO_LARGE', message: 'Payload too large' } });
    if (e.code === 'INVALID_JSON') return sendJson(res, 400, { ok: false, error: { code: 'INVALID_JSON', message: 'Invalid JSON' } });
    return sendJson(res, 500, { ok: false, error: { code: 'INTERNAL_ERROR', message: 'Internal Server Error' } });
  }

  const validated = validateBookInput(body);
  if (!validated.ok) return sendJson(res, 400, { ok: false, error: { code: validated.code, message: validated.message } });

  const newBook = { id: books.length + 1, ...validated.data };
  books.push(newBook);
  return sendJson(res, 201, { ok: true, data: { book: newBook } });
}
```

แนะนำ commit point:

- `feat: POST /books with validation`

## Lab 9: Persistence ลงไฟล์ `data/books.json` (ใช้ `fs`)

เปลี่ยนจาก in-memory อย่างเดียว → ให้เขียน/อ่านไฟล์:

- สร้าง `data/books.json` (เริ่มต้นเป็น `[]`)
- ทำ `repositories/books-repo.js`:
  - `getAllBooks()`
  - `addBook({title, author})`
  - รับผิดชอบอ่าน/เขียนไฟล์

ข้อควรทำ:

- ถ้าไฟล์ยังไม่มี ให้สร้าง/เริ่มจาก `[]`
- เขียนไฟล์แบบ atomic เท่าที่ทำได้ (เช่น write temp แล้ว rename) หรืออย่างน้อยเขียนทับทั้งไฟล์

โครงสร้างไฟล์ที่แนะนำเพิ่ม:

```bash
mkdir -p data src/repositories
printf "[]\n" > data/books.json
touch src/repositories/books-repo.js
```

ตัวอย่าง `src/repositories/books-repo.js` (แนวทาง):

```js
const fs = require('fs/promises');
const path = require('path');

const dataFilePath = path.join(process.cwd(), 'data', 'books.json');

async function readAll() {
  try {
    const raw = await fs.readFile(dataFilePath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    if (e.code === 'ENOENT') return [];
    throw e;
  }
}

async function writeAll(books) {
  const tmpPath = `${dataFilePath}.tmp`;
  await fs.writeFile(tmpPath, JSON.stringify(books, null, 2), 'utf8');
  await fs.rename(tmpPath, dataFilePath);
}

async function getAllBooks() {
  return readAll();
}

async function addBook({ title, author }) {
  const books = await readAll();
  const nextId = books.reduce((max, b) => Math.max(max, Number(b.id) || 0), 0) + 1;
  const newBook = { id: nextId, title, author };
  books.push(newBook);
  await writeAll(books);
  return newBook;
}

module.exports = { getAllBooks, addBook };
```

แนะนำ commit point:

- `feat: persist books to json file`

## Lab 10: Refactor โครงสร้างโปรเจกต์ (ให้เหมือนโปรเจกต์จริง)

แยกออกจากไฟล์ `server-basic.js`:

- `src/server.js`: สร้าง server + listen
- `src/routes/index.js`: dispatch route
- `src/handlers/health.js`, `src/handlers/books.js`: แต่ละ endpoint
- `src/utils/response.js`: `sendJson`/`sendError`
- `src/config/env.js`: อ่าน env + default
- `src/utils/logger.js`: logger levels + request id

Checkpoint:

- โค้ดอ่านง่ายขึ้น และแต่ละไฟล์ “มีหน้าที่เดียว”
- เปลี่ยน business logic ใน books handler โดยไม่ต้องแตะ server entrypoint มาก

แนวทางการ refactor (step-by-step):

1. สร้างไฟล์/โฟลเดอร์ตามนี้:

```bash
mkdir -p src/config src/routes src/handlers src/utils
touch src/server.js src/config/env.js src/routes/index.js src/handlers/health.js src/handlers/books.js src/utils/response.js
```

2. ย้าย `sendJson`/`sendError` ไป `src/utils/response.js`
3. ย้ายโค้ดอ่าน `PORT` ไป `src/config/env.js`
4. ให้ `src/routes/index.js` ทำหน้าที่ dispatch ไป handler
5. ให้ `src/server.js` เป็น entrypoint แล้วเปลี่ยน scripts ให้รันไฟล์นี้แทน

แนะนำ commit point:

- `refactor: split server into routes/handlers/utils`

## Lab 11: Logging แบบมีระดับ + request id (เพื่อ debug)

อย่างน้อยให้ทำได้:

- ทุก request มี `requestId` (สุ่มง่าย ๆ เช่น timestamp+random)
- log ตอนเริ่ม request และก่อนส่ง response (method/path/status)
- `warn` สำหรับ 4xx, `error` สำหรับ 5xx

ตัวอย่าง `src/utils/logger.js` (แนวทาง):

```js
function makeRequestId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function format(level, requestId, message) {
  const stamp = new Date().toISOString();
  return `[${stamp}] [${level}] [${requestId}] ${message}`;
}

function createLogger() {
  return {
    makeRequestId,
    info(requestId, message) {
      console.log(format('INFO', requestId, message));
    },
    warn(requestId, message) {
      console.warn(format('WARN', requestId, message));
    },
    error(requestId, message) {
      console.error(format('ERROR', requestId, message));
    },
  };
}

module.exports = { createLogger };
```

แนะนำ commit point:

- `feat: logger levels + request id`

## Lab 12: รันและทดสอบ (ชุดคำสั่ง)

- รันโหมดปกติ: `npm run start`
- รันโหมด dev: `npm run dev`
- เปิด `http://localhost:3000/health` แล้วควรเห็น `{ "ok": true }`
- เปิด `http://localhost:3000/books` แล้วควรเห็น `{ ok: true, data: { books: [...] } }`
- ลอง `POST /books` แล้ว `GET /books` อีกครั้ง ต้องเห็นรายการเพิ่มขึ้น

## Checklist (จบ Day 2 แล้วควรทำได้)

- อธิบายได้ว่า `package.json` มีหน้าที่อะไร
- รู้จัก `npm run start` และ `npm run dev`
- แยกได้ว่า `src/data` กับ `src/utils` มีไว้ทำอะไร
- รัน server แล้วตอบ JSON ได้จริงที่ `localhost:3000`
- ทำ `POST /books` ได้ พร้อม validation
- ปิด/เปิด server ใหม่ แล้วข้อมูลยังอยู่ (persist file)
- โครงสร้างโค้ดแยก responsibilities ชัดเจนพอให้ต่อ Express ได้

> Call-to-action: ลองเพิ่ม endpoint ใหม่ `/time` ที่ตอบ `{ now: new Date().toISOString() }` และ commit เป็น 1 commit แยกต่างหาก
