---
id: day-5-jwt-60m
title: 'JWT สำหรับ Express'
sidebar_label: 'JWT'
---

คาบนี้เราจะทำให้ API เรียกได้เฉพาะคนที่ล็อกอินแล้ว: ล็อกอินเพื่อเอา token → ส่ง token แบบ Bearer → เปิด route ที่ต้องผ่าน middleware เท่านั้น

---

## สิ่งที่ต้องมี

- รัน API ได้ที่ `http://localhost:3000`
- มีตาราง `app.users` และเก็บรหัสผ่านเป็น `password_hash` (จาก workshop ก่อนหน้า)

---

<p align="center">
<img src={require('../../../static/img/day-5/jwt/1.png').default} alt="Day 5 JWT" style={{maxWidth: '800px', width: '100%'}} />
</p>

## JWT คืออะไร (เล่าแบบเข้าใจง่าย)

ก่อนยกตัวอย่าง ขออธิบายแบบตรง ๆ ก่อนว่า JWT (JSON Web Token) คืออะไร:

- JWT คือ “มาตรฐาน” สำหรับส่งข้อมูลเป็น JSON ระหว่างระบบแบบปลอดภัยในระดับ “ตรวจสอบความถูกต้องได้”  
  (ตัวระบบปลายทางตรวจได้ว่าข้อมูลนี้ถูกออกโดยคนที่ถือ secret/กุญแจ และระหว่างทางไม่ถูกแก้)
- ตัว token เป็น string รูปแบบ `header.payload.signature` (คั่นด้วย `.`)  
  - `header`: บอกว่าใช้วิธีเซ็นแบบไหน (เช่น HS256)  
  - `payload`: ข้อมูลที่เราอยากพกไปกับ token (เช่น `sub`, `email`, `role`, `exp`)  
  - `signature`: ลายเซ็นที่เกิดจากการเอา header+payload ไปเซ็นด้วย secret/กุญแจ
- เวลาระบบ verify JWT ทำ 2 อย่างหลัก ๆ:
  1) เช็กลายเซ็นว่า “ถูกต้อง” (ไม่ถูกแก้ และออกโดยเรา)  
  2) เช็คเงื่อนไขเวลา เช่น `exp` ว่ายังไม่หมดอายุ

ตรงนี้สำคัญ: JWT เป็นเรื่อง “การเซ็น” ไม่ใช่ “การซ่อน” ข้อมูล  
payload อ่านได้เสมอ ดังนั้นอย่าใส่ข้อมูลลับลงไป

ลองนึกภาพเวลาเราไปสวนสนุกหรือเข้างานคอนเสิร์ต:

1) เราจ่ายเงิน/ลงทะเบียนที่หน้าประตู (เหมือน login)  
2) เจ้าหน้าที่ให้สายรัดข้อมือหรือปั๊มตรา (เหมือน server ออก token ให้)  
3) เวลาเข้าเครื่องเล่น เราแค่โชว์ข้อมือ (เหมือนแนบ token มากับ request) เจ้าหน้าที่ให้ผ่าน ไม่ต้องยื่นบัตรใหม่ทุกครั้ง

JWT ก็ทำหน้าที่คล้าย “สายรัดข้อมือ” นี่แหละครับ

- server ตรวจได้ว่า token นี้ “ออกโดยเรา” เพราะมีลายเซ็น
- token มีอายุได้ (หมดอายุแล้วต้องล็อกอินใหม่)

สิ่งที่ต้องจำ:

- JWT **ไม่ใช่การเข้ารหัส** ใครได้ token ไปสามารถถอดดู payload ได้ ดังนั้นห้ามใส่ข้อมูลลับ (เช่น password, password_hash) ลงไป
- ใส่ข้อมูลเท่าที่จำเป็น เช่น `sub` (user id), `role`, `email`

<p align="center">
<img src={require('../../../static/img/day-5/jwt/2.png').default} alt="JWT Structure" style={{maxWidth: '800px', width: '100%'}} />
</p>

JWT จะเป็นสตริงยาว ๆ รูปแบบ `Header.Payload.Signature` (คั่นด้วยจุด)

---

## โครงสร้างไฟล์ที่ใช้

เราแยก `services/` เพื่อให้ route ทำหน้าที่รับ/ตอบ HTTP อย่างเดียว

```text
src/
  auth/
    jwt.js
  middlewares/
    authRequired.js
  repositories/
    user.repo.js
  services/
    auth.service.js
  routes/
    auth.routes.js
    me.routes.js
  app.js
  server.js
```

---

## 1) ติดตั้งและตั้งค่า

ติดตั้ง:

```bash
npm i jsonwebtoken
```

เพิ่มใน `.env`:

```bash
JWT_SECRET=change-me
JWT_EXPIRES_IN=15m
```

หมายเหตุ:

- JWT decode ได้ ดังนั้นอย่าใส่ข้อมูลลับลง payload
- ห้าม commit `JWT_SECRET` ขึ้น Git

---

## 2) ทำ `jwt.js` (ออก token / ตรวจ token)

สร้าง `src/auth/jwt.js`

```js
const jwt = require('jsonwebtoken');

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env: ${name}`);
  return value;
}

function signAccessToken(payload) {
  return jwt.sign(payload, requireEnv('JWT_SECRET'), {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, requireEnv('JWT_SECRET'));
}

module.exports = {
  signAccessToken,
  verifyAccessToken,
};
```

---

## 3) เพิ่ม `findByEmail` ใน `user.repo.js`

เพิ่มฟังก์ชันนี้ใน `src/repositories/user.repo.js`:

```js
async function findByEmail(email) {
  const sql = `
    SELECT id, email, password_hash
    FROM ${env.dbSchema}.users
    WHERE email = $1
    LIMIT 1
  `;
  const result = await pool.query(sql, [email]);
  return result.rows[0] || null;
}
```

และอย่าลืม export:

```js
module.exports = {
  createUser,
  findByEmail,
};
```

---

## 4) ทำ `auth.service.js` ให้จบเส้นล็อกอิน

สร้าง `src/services/auth.service.js`

```js
const bcrypt = require('bcryptjs');
const { signAccessToken } = require('../auth/jwt');
const userRepo = require('../repositories/user.repo');

async function login({ email, password }) {
  if (typeof email !== 'string' || typeof password !== 'string') {
    const err = new Error('email and password are required');
    err.status = 400;
    throw err;
  }

  const user = await userRepo.findByEmail(email.trim().toLowerCase());
  if (!user) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const accessToken = signAccessToken({
    sub: String(user.id),
    role: 'user',
    email: user.email,
  });

  return { accessToken };
}

module.exports = {
  login,
};
```

---

## 5) ทำ `POST /auth/login`

สร้าง `src/routes/auth.routes.js`

```js
const express = require('express');
const authService = require('../services/auth.service');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const result = await authService.login(req.body ?? {});
    res.json(result);
  } catch (err) {
    if (err && err.status) return res.status(err.status).json({ message: err.message });
    next(err);
  }
});

module.exports = router;
```

mount ใน `src/app.js`:

```js
const authRouter = require('./routes/auth.routes');

app.use('/auth', authRouter);
```

---

## 6) ทำ middleware `authRequired`

สร้าง `src/middlewares/authRequired.js`

```js
const { verifyAccessToken } = require('../auth/jwt');

function authRequired(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing Bearer token' });
  }

  const token = auth.slice('Bearer '.length);
  try {
    req.user = verifyAccessToken(token);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authRequired;
```

---

## 7) ทำ `GET /me` (ต้องแนบ token)

สร้าง `src/routes/me.routes.js`

```js
const express = require('express');
const authRequired = require('../middlewares/authRequired');

const router = express.Router();

router.get('/', authRequired, (req, res) => {
  res.json({
    user: {
      id: req.user.sub,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

module.exports = router;
```

mount ใน `src/app.js`:

```js
const meRouter = require('./routes/me.routes');

app.use(meRouter);
```

---

## 8) ลองยิงด้วย curl

ล็อกอินเอา token:

```bash
curl -sS -X POST http://localhost:3000/auth/login \
  -H 'Content-Type: application/json' \
  --data '{"email":"alice@example.com","password":"P@ssw0rd1234"}'
```

เรียก `/me`:

```bash
TOKEN="PUT_TOKEN_HERE"
curl -sS http://localhost:3000/me -H "Authorization: Bearer $TOKEN"
```

ลองเคส 401:

```bash
curl -i http://localhost:3000/me
curl -i http://localhost:3000/me -H "Authorization: Bearer nope"
```

---

## 9) Recheck

- payload ห้ามมีข้อมูลลับ
- token ต้องมีวันหมดอายุ
- `Authorization` ต้องเป็น `Bearer <token>`
- route ที่ต้องล็อกอินต้องใส่ `authRequired` ทุกครั้ง

---

## แบบฝึกหัด

- ตั้ง `JWT_EXPIRES_IN=1m` แล้วลองให้ token หมดอายุจริง
