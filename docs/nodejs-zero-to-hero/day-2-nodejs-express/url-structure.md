---
id: day-2-url-structure
title: 'URL Structure'
sidebar_label: 'URL Structure'
---

<p align="center">
  <img src={require('../../../static/img/day-2/url/url-structure.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

URL คือ “ที่อยู่” ของ resource บนเว็บ โดยมักประกอบด้วยหลายส่วน เช่น protocol, domain, path, query และ fragment

ตัวอย่างจากภาพ:

```txt
https://library.kcode.online/books/123?category=programming&sort=latest#section
```

---

## องค์ประกอบของ URL (ตามภาพ)

### 1) Protocol

- `https://` หรือ `http://`
- บอก “วิธีสื่อสาร” และความปลอดภัย (HTTPS = มีการเข้ารหัส)

### 2) Domain

ในตัวอย่าง `library.kcode.online`

- **Subdomain**: `library`
- **Domain**: `kcode`
- **TLD**: `.online`

> Domain ใช้บอก “ปลายทาง” ว่าจะไปที่ server ไหน

### 3) Path

ในตัวอย่าง `/books/123`

- **Route** (ส่วนที่มักคงที่): `/books/`
- **Parameter** (ส่วนที่เปลี่ยนได้): `123` (มักเป็น id)

### 4) Query String

ในตัวอย่าง `?category=programming&sort=latest`

- ใช้ส่ง “ตัวเลือก/เงื่อนไข” เพิ่มเติม เช่น filter, sort, pagination
- แยก key/value ด้วย `=`
- แยกหลายตัวด้วย `&`

ตัวอย่าง:
- `category=programming`
- `sort=latest`

### 5) Fragment (Optional)

ในตัวอย่าง `#section`

- ใช้ให้ browser “เลื่อนไปตำแหน่ง” ในหน้าเดียวกัน
- fragment (`#...`) จะถูกจัดการฝั่ง Client และ **ไม่ถูกส่งมาที่ Server**

---

## ตัวอย่าง Express API

ตัวอย่างนี้จะอ่าน:
- `:id` จาก path param
- `category` และ `sort` จาก query string

```js
const express = require("express");

const app = express();
const port = 3000;

app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const { category, sort } = req.query;

  res.json({
    ok: true,
    url: req.originalUrl,
    parts: {
      protocol: req.protocol,
      host: req.get("host"),
      path: req.path
    },
    params: { id },
    query: {
      category: category ?? null,
      sort: sort ?? null
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

---

## อธิบายโค้ด

### ตัวแปรหลัก

- `express`: ฟังก์ชันจากแพ็กเกจ `express` สำหรับ “สร้างแอป/เซิร์ฟเวอร์”
- `app`: instance ของ Express application (ใช้ประกาศ routes/middlewares และสั่ง `listen`)
- `port`: หมายเลขพอร์ตที่ server เปิดรับ request (ตัวอย่างคือ `3000`)

### Route และ handler

- `app.get("/books/:id", ...)`: endpoint แบบ `GET` ที่ path เป็น `/books/<id>` โดย `:id` คือ **path parameter**
- `req`: request object (ข้อมูลที่ client ส่งมา เช่น URL, headers, params, query)
- `res`: response object (ใช้ส่งคำตอบกลับ เช่น `res.json`, `res.status`, `res.send`)

### ดึงค่าจาก URL

- `const { id } = req.params`: ดึงค่า `id` จาก path parameter (เช่น `/books/123` → `id` คือ `"123"`)
- `const { category, sort } = req.query`: ดึง query string (เช่น `?category=programming&sort=latest`)

### สร้าง response

- `res.json(...)`: ส่ง response เป็น JSON และตั้ง `Content-Type: application/json` ให้อัตโนมัติ
- `req.originalUrl`: URL ที่ client ส่งมาทั้งหมด (path + query) เช่น `/books/123?category=...&sort=...`
- `req.protocol`: `http` หรือ `https`
- `req.get("host")`: ค่า header `Host` เช่น `localhost:3000`
- `req.path`: เฉพาะ path ไม่รวม query เช่น `/books/123`
