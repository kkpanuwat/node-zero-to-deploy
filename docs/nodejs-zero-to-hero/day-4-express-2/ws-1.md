---
id: day-4-express-2-ws-1
title: 'Workshop 1: Connect Express to PostgreSQL'
sidebar_label: 'Workshop 1: Connect Express to PostgreSQL'
---

Workshop นี้เป็นการต่อยอดจากเนื้อหา **Database / PostgreSQL / Schema / SQL / Transactions** โดยจะทำ “Express API ที่เชื่อมต่อ PostgreSQL ได้จริง”
---

## เป้าหมาย (Learning Outcomes)

หลังจบ workshop นี้ควรจะ:

- สร้าง Express server ที่เชื่อมต่อ PostgreSQL ผ่าน connection pool ได้
- จัดวางไฟล์ `config` / `db` / `routes` / `repositories` อย่างเป็นระบบ
- ใช้ `.env` เพื่อแยกค่าคอนฟิกออกจากโค้ด และไม่ hardcode รหัสผ่าน
- ใช้แนวคิด **schema** (`app.books` แทน `books`) เพื่อจัดระเบียบ object ใน DB

---

## Prerequisites

- มี PostgreSQL พร้อมใช้งานอย่างใดอย่างหนึ่ง:
  - **ทางเลือก A (Local Docker):** รัน PostgreSQL จาก `docker compose` (จาก Day 3)
  - **ทางเลือก B (Lab Server):** ต่อผ่าน SSH tunnel ไปที่ server แลป

> Workshop นี้จะเขียนตัวอย่างเป็น JavaScript (CommonJS) เพื่อให้รันได้ง่ายและสอดคล้องกับตัวอย่าง Express ในบทก่อนหน้า

---

## Github

```text
https://github.com/kkpanuwat/day-4-ws-1
```

## 1) สร้างโปรเจกต์และติดตั้ง dependency

```bash
mkdir express-db-ws1
cd express-db-ws1
npm init -y
```

ติดตั้งแพ็กเกจที่ใช้:

```bash
npm i express pg dotenv
npm i -D nodemon
```

ปรับ `package.json` ให้มี script:

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  }
}
```

---

## 2) ออกแบบโครงสร้างโปรเจกต์

โครงสร้างที่แนะนำสำหรับ API:

```text
express-db-ws1/
  src/
    server.js
    app.js
    config/
      env.js
    db/
      pool.js
    routes/
      health.routes.js
      books.routes.js
    repositories/
      books.repo.js
  sql/
    001_init.sql
  .env
  .env.example
  .gitignore
  package.json
```

แนวคิดเชิงวิศวกรรม:

- `config/env.js` เป็น config จาก environment
- `db/pool.js` เป็น connection pool (หลีกเลี่ยงเปิด connection ใหม่ทุก request)
- `repositories/*` แยก logic การคุย DB ออกจาก route handler
- `routes/*` request → เรียก repo/service → ส่ง response

---

## 3) ตั้งค่า `.env` และ `.gitignore`

สร้างไฟล์ `.gitignore`:

```gitignore
node_modules
.env
```

สร้างไฟล์ `.env.example` (เอาไว้แชร์รูปแบบคอนฟิกโดยไม่แชร์รหัสผ่านจริง):

```bash
PORT=3000
DATABASE_URL=postgresql://USERNAME:PASSWORD@localhost:5432/kku_library
DB_SCHEMA=app
```

สร้างไฟล์ `.env` (ใช้ค่าจริงตามสภาพแวดล้อมของคุณ)

### ทางเลือก A: Local Docker (ตัวอย่าง)

```bash
PORT=3000
DATABASE_URL=postgresql://kku:kku_password@localhost:5432/kku_library
DB_SCHEMA=app
```

### ทางเลือก B: Lab Server ผ่าน SSH tunnel (ตัวอย่าง)

1) เปิด tunnel (ห้ามปิด terminal ระหว่างใช้งาน)

```bash
ssh -N -L 15432:127.0.0.1:5432 student02@147.50.228.55
```

2) ตั้ง `.env` ให้ชี้มาที่ `localhost:15432`

```bash
PORT=3000
DATABASE_URL=postgresql://DB_USER:DB_PASSWORD@localhost:15432/kku_library
DB_SCHEMA=app
```

> `DB_USER/DB_PASSWORD` ให้ใช้ชุดที่แจกในแลป (เป็นรหัสของ PostgreSQL) ไม่ใช่รหัส SSH

---

## 4) เขียน `env.js` เพื่อโหลดและ validate config

สร้างไฟล์ `src/config/env.js`

```js
const dotenv = require('dotenv');

dotenv.config();

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

module.exports = {
  port: Number(process.env.PORT || 3000),
  databaseUrl: requireEnv('DATABASE_URL'),
  dbSchema: process.env.DB_SCHEMA || 'public',
};
```
---

## 5) สร้าง connection pool

สร้างไฟล์ `src/db/pool.js`

```js
const { Pool } = require('pg');
const env = require('../config/env');

const pool = new Pool({
  connectionString: env.databaseUrl,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

module.exports = pool;
```

อธิบายโค้ด:

- `require('pg')` ดึงคลาส `Pool` จาก PostgreSQL driver ของ Node.js
- `env.databaseUrl` คือค่า `DATABASE_URL` จาก `.env` (เช่น `postgresql://user:pass@host:port/db`)
- `max: 10` จำกัดจำนวน connection ที่เปิดพร้อมกันสูงสุด (กัน DB รับโหลดเกิน)
- `idleTimeoutMillis: 30_000` ถ้า connection ว่างนานเกิน 30 วินาที จะถูกคืนทรัพยากร/ปิด
- `connectionTimeoutMillis: 5_000` ถ้าขอ connection แล้วรอเกิน 5 วินาที จะ timeout และ throw error
- `module.exports = pool` ส่งออก pool ให้ไฟล์อื่นใช้ เช่น `pool.query('SELECT 1')`

ทำไมใช้ Pool:

- การเปิด TCP connection + authentication มี cost
- ระบบจริงรับ request พร้อมกันจำนวนมาก จึงควร reuse connection และจำกัดจำนวน connection ต่อ DB

---

## 6) เตรียม schema และตารางตัวอย่าง

สร้างไฟล์ `sql/001_init.sql`

```sql
CREATE SCHEMA IF NOT EXISTS app;

CREATE TABLE IF NOT EXISTS app.books (
  book_id     serial PRIMARY KEY,
  title       text NOT NULL,
  author      text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

INSERT INTO app.books (title, author)
VALUES
  ('Node.js Zero to Hero', 'Course Team'),
  ('Database System Concepts', 'Silberschatz et al.')
ON CONFLICT DO NOTHING;
```

รัน SQL ได้ 2 ทาง:

- ผ่าน DBeaver: เปิด SQL Editor แล้วรันไฟล์นี้
- ผ่าน `psql` (ถ้ามีในเครื่อง): เชื่อมด้วย `DATABASE_URL` แล้วรันไฟล์

---

## 7) สร้าง Express app + routes

สร้างไฟล์ `src/app.js`

```js
const express = require('express');
const healthRoutes = require('./routes/health.routes');
const bookRoutes = require('./routes/books.routes');

const app = express();
app.use(express.json());

app.use('/health', healthRoutes);
app.use('/books', bookRoutes);

module.exports = app;
```

สร้างไฟล์ `src/server.js`

```js
const app = require('./app');
const env = require('./config/env');

app.listen(env.port, () => {
  console.log(`API listening on http://localhost:${env.port}`);
});
```

---

## 8) สร้าง health check ที่ตรวจ DB

สร้างไฟล์ `src/routes/health.routes.js`

```js
const express = require('express');
const pool = require('../db/pool');

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT 1 AS ok');
  res.json({ status: 'ok', db: result.rows[0].ok });
});

module.exports = router;
```

---

## 9) สร้าง repository และ route สำหรับ `/books`

สร้างไฟล์ `src/repositories/books.repo.js`

```js
const pool = require('../db/pool');
const env = require('../config/env');

function qualify(table) {
  return `${env.dbSchema}.${table}`;
}

async function listBooks(limit = 20) {
  const sql = `SELECT book_id, title, author, created_at
               FROM ${qualify('books')}
               ORDER BY book_id DESC
               LIMIT $1`;
  const result = await pool.query(sql, [limit]);
  return result.rows;
}

async function createBook({ title, author }) {
  const sql = `INSERT INTO ${qualify('books')} (title, author)
               VALUES ($1, $2)
               RETURNING book_id, title, author, created_at`;
  const result = await pool.query(sql, [title, author]);
  return result.rows[0];
}

module.exports = { listBooks, createBook };
```

จุดสำคัญทางความปลอดภัย:

- ใช้ `$1`, `$2` (parameterized query) เพื่อหลีกเลี่ยง SQL injection
- แยก query ออกจาก route handler เพื่อความชัดเจนและ reuse ได้

สร้างไฟล์ `src/routes/books.routes.js`

```js
const express = require('express');
const booksRepo = require('../repositories/books.repo');

const router = express.Router();

router.get('/', async (req, res) => {
  const limit = Number(req.query.limit || 20);
  const books = await booksRepo.listBooks(limit);
  res.json({ data: books });
});

router.post('/', async (req, res) => {
  const { title, author } = req.body || {};
  if (!title || !author) {
    return res.status(400).json({ message: 'title and author are required' });
  }
  const created = await booksRepo.createBook({ title, author });
  res.status(201).json({ data: created });
});

module.exports = router;
```

---

## แบบฝึกหัด

1) เพิ่ม endpoint `GET /books/:id` (ใช้ `$1` เสมอ)  
