---
id: day-4-express-2-ws-2
title: 'Workshop 2: Create User + Validate Payload Middleware'
sidebar_label: 'Workshop 2: Create User + Validate Payload Middleware'
---

Workshop นี้เป็นโจทย์สั้น ๆ เพื่อฝึก “การสร้าง API” พร้อม **middleware สำหรับ validate payload** ก่อนเข้า route handler และ **บันทึกข้อมูลลง PostgreSQL** แบบปลอดภัย (ไม่เก็บรหัสผ่านเป็น plain text)

---

## เป้าหมาย (Learning Outcomes)

- สร้าง endpoint `POST /users` เพื่อสร้างผู้ใช้ใหม่ได้
- เขียน middleware `validateCreateUser` เพื่อ validate `req.body` ให้ครบ/ถูกชนิดข้อมูล
- เก็บ `password` แบบปลอดภัยด้วยการ hash และบันทึกลงฐานข้อมูล (เก็บเป็น `password_hash`)
- ใช้ parameterized query เพื่อป้องกัน SQL injection
- validation → route → repository → response ให้ชัดเจน
- เข้าใจลำดับการทำงานของ Express middleware ผ่าน sequence diagram

---

## Prerequisites

- มี PostgreSQL พร้อมใช้งานอย่างใดอย่างหนึ่ง:
  - **ทางเลือก A (Local Docker):** รัน PostgreSQL จาก `docker compose` (จาก Day 3)
  - **ทางเลือก B (Lab Server):** ต่อผ่าน SSH tunnel ไปที่ server แลป
- รู้ค่า `DATABASE_URL` ของตัวเอง (รูปแบบ `postgresql://USER:PASSWORD@HOST:PORT/DBNAME`)

> แนะนำให้อ้างอิงโครงจาก Workshop 1 (การต่อ DB ด้วย `pg` + `.env`) แล้วมาทำโจทย์นี้ต่อ จะเร็วที่สุด

---

## โจทย์ (Task)

ให้สร้าง API ดังนี้:

1) `POST /users` รับ JSON payload:

```json
{
  "email": "alice@example.com",
  "name": "Alice",
  "password": "P@ssw0rd1234"
}
```

เงื่อนไข validation:

- `email` ต้องมีค่า, เป็น string, trim แล้วไม่ว่าง, และมีรูปแบบอีเมลพื้นฐาน (มี `@`)
- `name` ต้องมีค่า, เป็น string, trim แล้วไม่ว่าง, ความยาว 2–100 ตัวอักษร
- `password` ต้องมีค่า, เป็น string, ความยาว 8–72 ตัวอักษร

เงื่อนไขฐานข้อมูล:

- บันทึกผู้ใช้ลงตาราง `app.users`
- ห้ามเก็บรหัสผ่านแบบ plain text ให้เก็บเป็น `password_hash` เท่านั้น
- `email` ต้องไม่ซ้ำ (unique)

ถ้า validation ไม่ผ่าน ให้ตอบ:

- HTTP `400`
- body รูปแบบ:

```json
{
  "message": "Validation failed",
  "errors": [
    {"field": "email", "reason": "email is required"},
    {"field": "name", "reason": "name must be 2-100 chars"},
    {"field": "password", "reason": "password must be 8-72 chars"}
  ]
}
```

ถ้า `email` ซ้ำ ให้ตอบ:

- HTTP `409`
- body ตัวอย่าง:

```json
{
  "message": "Email already exists"
}
```

ถ้า validation ผ่านและสร้างสำเร็จ ให้ตอบ:

- HTTP `201`
- body ตัวอย่าง:

```json
{
  "id": 1,
  "email": "alice@example.com",
  "name": "Alice",
  "createdAt": "2026-03-07T00:00:00.000Z"
}
```

> สำคัญ: ห้ามตอบ `password` หรือ `password_hash` กลับไปหา client

---

## โครงสร้างไฟล์ (แนะนำ)

```text
express-mw-ws2/
  src/
    app.js
    server.js
    config/
      env.js
    db/
      pool.js
    middlewares/
      validateCreateUser.js
    repositories/
      user.repo.js
    routes/
      users.routes.js
  sql/
    001_init.sql
  .env
  .env.example
  .gitignore
  package.json
```

---

## Step 1: สร้างโปรเจกต์และติดตั้ง dependency

```bash
mkdir express-mw-ws2
cd express-mw-ws2
npm init -y
npm i express pg dotenv bcryptjs
```

---

## Step 2: ตั้งค่า `.env` และเตรียมฐานข้อมูล

สร้างไฟล์ `.gitignore`

```gitignore
node_modules
.env
```

สร้างไฟล์ `.env.example`

```bash
PORT=3000
DATABASE_URL=postgresql://USERNAME:PASSWORD@localhost:5432/kku_library
DB_SCHEMA=app
```

สร้างไฟล์ `.env` แล้วใส่ค่าจริงของคุณ

จากนั้นสร้างไฟล์ `sql/001_init.sql` เพื่อสร้าง schema และตาราง `users`:

```sql
CREATE SCHEMA IF NOT EXISTS app;

CREATE TABLE IF NOT EXISTS app.users (
  id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email          TEXT NOT NULL UNIQUE,
  name           TEXT NOT NULL,
  password_hash  TEXT NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

รันไฟล์ SQL (เลือกอย่างใดอย่างหนึ่ง):

- ผ่าน `psql`:

```bash
psql "$DATABASE_URL" -f sql/001_init.sql
```

- หรือรันใน DBeaver (เปิดไฟล์ `sql/001_init.sql` แล้ว Execute)

---

## Step 3: เขียน `env.js` และสร้าง connection pool

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

---

## Step 4: สร้าง `app.js` และเปิด `express.json()`

สร้างไฟล์ `src/app.js`

```js
const express = require('express');
const usersRouter = require('./routes/users.routes');

const app = express();

// ต้องมาก่อน validation/route ที่อ่าน req.body
app.use(express.json());

// mount router ที่ /users
app.use('/users', usersRouter);

module.exports = app;
```

---

## Step 5: เขียน validation middleware

สร้างไฟล์ `src/middlewares/validateCreateUser.js`

```js
function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateCreateUser(req, res, next) {
  const { email, name, password } = req.body ?? {};
  const errors = [];

  if (!isNonEmptyString(email)) {
    errors.push({ field: 'email', reason: 'email is required' });
  } else if (!email.includes('@')) {
    errors.push({ field: 'email', reason: 'email is invalid' });
  }

  if (!isNonEmptyString(name)) {
    errors.push({ field: 'name', reason: 'name is required' });
  } else {
    const trimmed = name.trim();
    if (trimmed.length < 2 || trimmed.length > 100) {
      errors.push({ field: 'name', reason: 'name must be 2-100 chars' });
    }
  }

  if (typeof password !== 'string') {
    errors.push({ field: 'password', reason: 'password is required' });
  } else if (password.length < 8 || password.length > 72) {
    errors.push({ field: 'password', reason: 'password must be 8-72 chars' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  next();
}

module.exports = validateCreateUser;
```

แนวคิดสำคัญ:

- validation เป็น “ด่านหน้า” ของ route: ถ้าไม่ผ่านให้จบที่นี่ (fail fast)
- response format ควรสม่ำเสมอและอ่านง่ายสำหรับฝั่ง frontend/ผู้ใช้ API

---

## Step 6: สร้าง Repo user

สร้างไฟล์ `src/repositories/user.repo.js`

```js
const env = require('../config/env');
const pool = require('../db/pool');

async function createUser({ email, name, passwordHash }) {
  const sql = `
    INSERT INTO ${env.dbSchema}.users (email, name, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, email, name, created_at
  `;

  const result = await pool.query(sql, [email, name, passwordHash]);
  return result.rows[0];
}

module.exports = {
  createUser,
};
```

---

## Step 7: สร้าง route `POST /users` (hash password + เรียก repo)

สร้างไฟล์ `src/routes/users.routes.js`

```js
const express = require('express');
const bcrypt = require('bcryptjs');
const validateCreateUser = require('../middlewares/validateCreateUser');
const userRepo = require('../repositories/user.repo');

const router = express.Router();

router.post('/', validateCreateUser, async (req, res, next) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const name = req.body.name.trim();
    const password = req.body.password;

    // ห้ามเก็บ password แบบ plain text -> hash ก่อน
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await userRepo.createUser({ email, name, passwordHash });

    res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.created_at,
    });
  } catch (err) {
    // unique_violation (email ซ้ำ)
    if (err && err.code === '23505') {
      return res.status(409).json({ message: 'Email already exists' });
    }
    next(err);
  }
});

module.exports = router;
```

:::warning ประเด็นความปลอดภัย
`password_hash` เป็นข้อมูลสำคัญ ห้าม log/ห้ามส่งกลับ client และควรตั้งสิทธิ์ใน DB ให้เหมาะสม
:::

---

## Step 8: สร้าง `server.js` แล้วรัน

สร้างไฟล์ `src/server.js`

```js
const env = require('./config/env');
const app = require('./app');

app.listen(env.port, () => {
  console.log(`API listening on http://localhost:${env.port}`);
});
```

รัน:

```bash
node src/server.js
```

---

## ทดสอบด้วย `curl`

### เคสผ่าน (ได้ `201`)

```bash
curl -sS -X POST http://localhost:3000/users \
  -H 'Content-Type: application/json' \
  --data '{"email":"alice@example.com","name":"Alice","password":"P@ssw0rd1234"}'
```

### เคสไม่ผ่าน (ได้ `400`)

```bash
curl -sS -X POST http://localhost:3000/users \
  -H 'Content-Type: application/json' \
  --data '{"email":"","name":"A","password":"123"}'
```

### เคส email ซ้ำ (ได้ `409`)

```bash
curl -sS -X POST http://localhost:3000/users \
  -H 'Content-Type: application/json' \
  --data '{"email":"alice@example.com","name":"Alice 2","password":"P@ssw0rd1234"}'
```

---

## Sequence Diagram: เส้นทางของ Request

```mermaid
sequenceDiagram
  autonumber
  participant Client as Client
  participant App as Express App
  participant JSON as express.json()
  participant V as validateCreateUser
  participant H as POST /users handler
  participant R as userRepo.createUser
  participant B as bcrypt.hash()
  participant DB as PostgreSQL

  Client->>App: POST /users (JSON body)
  App->>JSON: parse body -> req.body
  JSON-->>App: next()
  App->>V: validateCreateUser(req,res,next)
  alt invalid payload
    V-->>Client: 400 {message, errors}
  else valid payload
    V-->>App: next()
    App->>H: mounted at /users (router POST /)
    H->>B: hash(password)
    B-->>H: passwordHash
    H->>R: createUser({email,name,passwordHash})
    R->>DB: INSERT app.users(...) RETURNING ...
    alt email already exists
      DB-->>R: error code 23505
      R-->>H: throw error
      H-->>Client: 409 {message}
    else success
      DB-->>R: row(id,email,name,created_at)
      R-->>H: user row
      H-->>Client: 201 {id,email,name,createdAt}
    end
  end
```

### อธิบายทีละขั้น (ละเอียด)

1) **Client ส่ง request** `POST /users` พร้อม `Content-Type: application/json` และ body เป็น JSON  
2) **`express.json()` ทำงานก่อน** เพื่อแปลง body จาก string → object แล้วเก็บใน `req.body`  
   - ถ้าไม่ใส่ `express.json()` หรือใส่หลัง validation จะทำให้ `req.body` เป็น `undefined` และ validate ผิดพลาด
3) **`validateCreateUser` ตรวจข้อมูล**  
   - ถ้าไม่ผ่าน: ตอบ `400` พร้อม `errors[]` แล้วจบ request (ไม่ไปต่อที่ handler)
   - ถ้าผ่าน: เรียก `next()` เพื่อส่งต่อให้ handler
4) **Route handler เตรียมข้อมูลและ hash รหัสผ่าน**  
   - normalize: `email` → trim + lowercase, `name` → trim
   - hash `password` ด้วย bcrypt แล้วเก็บเป็น `password_hash` (ไม่เก็บ plain text)
5) **เรียก Repository ให้จัดการ DB** (INSERT ด้วย parameterized query)  
   - ถ้า `email` ซ้ำ DB จะตอบ error `23505` (unique violation) → API ตอบ `409`
   - ถ้าสำเร็จ DB จะคืนค่าจาก `RETURNING` → API ตอบ `201`

---
