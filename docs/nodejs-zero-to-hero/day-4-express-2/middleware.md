---
id: day-4-middleware
title: 'Middleware'
sidebar_label: 'Middleware'
---

<p align="center">
<img src={require('../../../static/img/day-4/middleware/1.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p> 

## Middleware คือ อะไร?

ในสถาปัตยกรรมของเว็บเซิร์ฟเวอร์แบบ HTTP ทุกคำขอ (Request) ที่ผู้ใช้ส่งเข้ามา จะถูกประมวลผลก่อนส่งผลลัพธ์กลับ (Response) ให้ผู้ใช้

ใน Express.js กลไกสำคัญที่ทำหน้าที่ประมวลผลคำขอเหล่านี้คือ Middleware

> Middleware คือฟังก์ชันที่ถูกเรียกใช้งานระหว่างขั้นตอนการรับ Request และการส่ง Response และสามารถแก้ไข Request, แก้ไข Response, จบการทำงาน หรือส่งต่อการทำงานไปยังขั้นตอนถัดไปได้

### โครงสร้างพื้นฐานของ Middleware
Middleware ใน Express มีรูปแบบมาตรฐานดังนี้:

```js
function exampleMiddleware(req, res, next) {
  next();
}
```

### พารามิเตอร์ของ Middleware

| พารามิเตอร์ | ความหมาย |
|---|---|
| `req` | วัตถุ Request ที่เก็บข้อมูลจากผู้ใช้ |
| `res` | วัตถุ Response สำหรับส่งผลลัพธ์กลับ |
| `next` | ฟังก์ชันสำหรับส่งต่อการทำงานไปยัง Middleware หรือ Route ถัดไป |

---

### วงจรการทำงาน (Request Lifecycle)

<p align="center">
<img src={require('../../../static/img/day-4/middleware/2.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p> 

เมื่อมี Request เข้ามาที่ Express เช่น `GET /books` ระบบจะทำงานผ่าน middleware ตามลำดับที่ประกาศไว้จากบนลงล่าง แล้วค่อยไปถึง route handler ที่ match

```js title="ตัวอย่างการทำงาน"
app.use(loggerMiddleware);
app.use(authMiddleware);

app.get('/books', (req, res) => {
  res.json({ message: "Books list" });
});
```

#### ลำดับการทำงาน (จากบนลงล่าง)

1) `loggerMiddleware` ทำงานก่อน  
   - มักใช้สำหรับ log เช่น method/path/time  
   - ถ้า `next()` → ไปต่อ

2) `authMiddleware` ทำงานถัดมา  
   - มักใช้ตรวจสิทธิ์/ตรวจ token  
   - ถ้า “ผ่าน” แล้วเรียก `next()` → ไปต่อ  
   - ถ้า “ไม่ผ่าน” แล้วตอบกลับเลย (เช่น `res.status(401).json(...)`) → ไม่ไปทำงานที่ route

3) Route `app.get('/books', ...)` ทำงาน  
   - ตอบกลับด้วย `res.json(...)` แล้ว request จบ

#### จุดสำคัญที่ต้องจำ

- **ลำดับมีผล**: middleware ที่ประกาศก่อน จะทำงานก่อน
- **ถ้าไม่เรียก `next()` และไม่ส่ง response**: request จะค้าง (pending)
- **ถ้าส่ง response แล้ว** (เช่น `res.json(...)`) โดยปกติไม่ควรเรียก `next()` ต่อ เพราะจะทำให้โค้ดไหลไปทำงานซ้ำ/เสี่ยง error เช่น “headers already sent”

---

## 1) ประเภทของ Middleware ใน Express

### 1.1 App-level middleware

ผูกกับ `app` ทั้งแอป และวิ่งตามลำดับที่ประกาศ:

```js title="app-level middleware"
app.use(loggerMiddleware);
app.use(express.json());
```

ตัวอย่าง `loggerMiddleware` 

```js title="loggerMiddleware"
function loggerMiddleware(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`);
  });

  next();
}
```

### 1.2 Router-level middleware

ผูกกับ `router` หรือผูกเฉพาะกลุ่ม path:

```js title="router-level middleware"
const router = require('express').Router();

router.use(authMiddleware); 
router.get('/me', (req, res) => res.json({ user: req.user }));

app.use('/api', router);
```

### 1.3 Built-in middleware

ที่ใช้บ่อย:

- `express.json()` สำหรับ parse JSON body
- `express.urlencoded({ extended: true })` สำหรับ form data
- `express.static('public')` สำหรับเสิร์ฟไฟล์ static

```js title="built-in middleware"
app.use(express.json());
app.use(express.static('public'));
```

### 1.4 Third-party middleware

เป็น middleware จากแพ็กเกจภายนอก เช่น CORS, security header, rate limit, logging framework (ขึ้นกับมาตรฐานทีม)

:::note
ในบทนี้เราจะโฟกัสแนวคิดและแพตเทิร์นก่อน ส่วนแพ็กเกจที่เลือกใช้จริงอาจแตกต่างตามโปรเจกต์
:::

### 1.5 Error-handling middleware

Middleware สำหรับ error จะมี signature พิเศษ: `(err, req, res, next)` และต้องประกาศ “ท้าย ๆ” หลัง route ทั้งหมด

```js title="error-handling middleware"
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
}

app.use(errorHandler);
```

---

## 2) Middleware Factory: ทำให้ config ได้และใช้ซ้ำได้

หลายครั้ง middleware ต้องรับ config เช่น prefix, level, หรือ role ที่อนุญาต วิธีที่นิยมคือ “ฟังก์ชันที่คืน middleware”

```js title="middleware factory"
// authMiddleware คือ middleware function ที่ “ยืนยันตัวตน” และแนบข้อมูลผู้ใช้ไว้ที่ req.user
// (ในงานจริงควร verify JWT/session แล้วค่อย set req.user)
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing token' });
  }

  // const token = authHeader.slice('Bearer '.length);
  // const payload = verifyJwt(token);
  // req.user = { id: payload.sub, role: payload.role, email: payload.email };

  req.user = { id: 'U001', role: 'admin', email: 'demo@example.com' }; // ตัวอย่าง
  next();
}

function requireRole(role) {
  return function (req, res, next) {
    if (!req.user) return res.status(401).json({ message: 'Unauthenticated' });
    if (req.user.role !== role) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}

app.get('/admin', authMiddleware, requireRole('admin'), (req, res) => {
  res.json({ message: 'Admin area' });
});
```

- หลีกเลี่ยง middleware ที่ “ทำทุกอย่าง” เพราะจะทดสอบยากและแก้แล้วกระทบวงกว้าง

---

## 3) Logging Middleware: มองเห็นสิ่งที่ระบบกำลังทำ

การ log ที่ดีช่วย debug ได้เร็ว โดยเฉพาะเมื่อมีหลาย request พร้อมกัน

### 3.1 Request ID (เพื่อผูก log หลายบรรทัดเข้าด้วยกัน)

```js title="request-id middleware"
const crypto = require('crypto');

function requestId(req, res, next) {
  const id = crypto.randomUUID();
  req.requestId = id;
  res.setHeader('X-Request-Id', id);
  next();
}

app.use(requestId);
```

### 3.2 Logger แบบง่าย (method, path, status, latency)

```js title="logger middleware"
function logger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(
      `[${req.requestId ?? '-'}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`
    );
  });

  next();
}

app.use(logger);
```

:::tip
ในงานจริง log มักต้องมีอย่างน้อย: เวลา, request-id, method, path, status, latency และ (ถ้าจำเป็น) user-id
:::

---

## 4) Validation Middleware

ตัวอย่างตรวจ body แบบง่าย:

```js title="validate create book"
function validateCreateBook(req, res, next) {
  const { title, author } = req.body ?? {};

  if (typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ message: 'title is required' });
  }

  if (author != null && typeof author !== 'string') {
    return res.status(400).json({ message: 'author must be string' });
  }

  next();
}

app.post('/books', validateCreateBook, (req, res) => {
  res.status(201).json({ message: 'created' });
});
```

:::note
ในโปรเจกต์จริง มักใช้ schema validation library (เช่น Zod/Joi/Yup) เพื่อให้ validate และสร้าง error message เป็นระบบ
:::

---

## 5) Auth Middleware

แนวทางมาตรฐานคือ auth middleware ตรวจ token/credential แล้ว “แนบข้อมูลผู้ใช้” ไว้ใน `req` เพื่อให้ route ใช้ต่อ

```js title="auth middleware (concept)"
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing token' });
  }

  const token = authHeader.slice('Bearer '.length);

  // (แนวคิด) verify token -> ได้ payload เป็น user info
  // const payload = verifyJwt(token)
  // req.user = { id: payload.sub, role: payload.role, email: payload.email }

  req.user = { id: 'U001', role: 'student', email: 'demo@example.com' }; // ตัวอย่าง
  next();
}
```

---

## 6) Error Handling ที่ถูกต้อง: 404 + Error Middleware

### 6.1 404 handler (เมื่อไม่ match route ใด ๆ)

ให้ประกาศ “หลัง route ทั้งหมด” และก่อน error handler

```js title="404 handler"
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});
```

---

## 7) โครงสร้างไฟล์ที่มักใช้ในโปรเจกต์จริง

แนวทางหนึ่งที่ทำให้โค้ดดูแลง่าย:

```text
src/
  middlewares/
    requestId.js
    logger.js
    auth.js
    requireRole.js
    validate.js
    notFound.js
    errorHandler.js
  routes/
    books.js
    users.js
  app.js
```

หลักการ:

- middleware เป็นชิ้นเล็ก ๆ วางใน `middlewares/`
- route ไม่ควรมี logic ซ้ำ ๆ เช่น auth/validation ให้ดึงจาก middleware มาใช้

---
