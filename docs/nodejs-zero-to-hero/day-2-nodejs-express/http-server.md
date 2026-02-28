---
id: day-2-http-server
title: 'Node.js Native HTTP'
sidebar_label: 'Node.js Native HTTP'
---

ก่อนที่เราจะไปใช้ **Express.js** เราต้องเข้าใจการทำ Web Server ของ Node.js จริงๆ แล้วหน้าตาเป็นอย่างไร

**Node.js Native HTTP** เหมือนกับการประกอบคอมพิวเตอร์ด้วยตัวเองทุกชิ้นส่วน ส่วน **Express.js** เหมือนการซื้อคอมพิวเตอร์แบรนด์เนมที่ประกอบมาให้เสร็จสรรพพร้อมใช้งาน

### เริ่มสร้าง HTTP Server

```js
const http = require('http');
const PORT = 3001;

const server = http.createServer((req, res) => {

});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

- const http = require('http');
คือการดึง Built-in Module ที่ชื่อว่า http มาใช้งาน
    เป็นเครื่องมือมาตรฐานของ Node.js ที่ใช้สำหรับสร้าง Server และจัดการการรับ-ส่งข้อมูลผ่านโปรโตคอล HTTP โดยไม่ต้องติดตั้งอะไรเพิ่ม

- const PORT = 3001;
คือตัวแปรที่กำหนด หมายเลขพอร์ต (Port Number) บนเครื่องคอมพิวเตอร์ เพื่อบอกว่า Server นี้จะรอรับการเชื่อมต่อผ่าน port 3001

- const server = http.createServer(...)
คือการสร้าง Instance ของ Server ขึ้นมา เป็นตัวสั่งให้ Node.js เตรียมสแตนด์บายรอรับคำขอ (Request) จาก Browser

- server.listen(PORT, ...)
คือคำสั่งเริ่มทำงาน (Activation) สั่งให้ Server ที่เราสร้างไว้เริ่ม "ฟัง" (Listen) ที่พอร์ต 3001 
**ถ้าไม่มีคำสั่งนี้ Server ก็จะไม่ทำงาน**

###  เริ่มต้นสร้าง Endpoint แรกด้วย Hello world!

```js
const http = require('http');
const PORT = 3001;

const server = http.createServer((req, res) => {
    
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, World!');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }

});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

---

## HTTP Header: `Content-Type`

`Content-Type` คือ header ที่บอกว่า “ข้อมูลใน **body** เป็นชนิดอะไร” (Media Type / MIME Type) เพื่อให้ฝั่งรับ “ตีความ” ได้ถูกต้อง

### ตาราง `Content-Type`

| `Content-Type` | ใช้เมื่อ (Request / Response) | ตัวอย่าง body |
|---|---|---|
| `text/plain; charset=utf-8` | ส่งข้อความล้วน (Response) | `Hello` |
| `text/html; charset=utf-8` | ส่ง HTML (Response) | `<h1>Hello</h1>` |
| `application/json; charset=utf-8` | ส่ง/รับ JSON (Request/Response) | `{"ok":true}` |
| `application/x-www-form-urlencoded` | ส่ง form แบบดั้งเดิม (Request) | `name=beam&age=20` |
| `multipart/form-data; boundary=...` | ส่งไฟล์/ฟอร์มมีไฟล์ (Request) | (binary + fields) |
| `application/octet-stream` | ส่ง/รับ binary ทั่วไป (Request/Response) | (bytes) |
| `image/png` / `image/jpeg` | ส่งรูปภาพ (Response) | (bytes) |
| `application/pdf` | ส่ง PDF (Response) | (bytes) |
| `text/css; charset=utf-8` | ส่ง CSS (Response) | `body{...}` |
| `application/javascript; charset=utf-8` | ส่ง JavaScript (Response) | `console.log()` |

---

#### โจทย์ข้อที่ 1: `GET /about` (ตอบกลับเป็น HTML)
<p align="center">
  <img src={require('../../../static/img/day-2/http-server-native/q1.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

ให้ออกแบบ HTTP Endpoint สำหรับเส้นทาง (Route) ตามนี้

```txt
GET /about
```

โดยเมื่อมีผู้ใช้งานเปิด URL `/about` ผ่าน Browser ระบบ Backend จะต้องตอบกลับ (Response) เป็น **HTML Page** ตามรูปแบบที่แสดงในภาพตัวอย่าง

### ข้อกำหนด

- Method ต้องเป็น `GET`
- Route ต้องเป็น `/about`
- ต้องตอบ header `Content-Type: text/html; charset=utf-8`
- ถ้าเข้า route อื่น (เช่น `/nope`) ให้ตอบ `404`

### Hint (ไม่บังคับ)

- ใช้ `res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })`
- แล้วปิดด้วย `res.end("<html>...</html>")`
---

#### โจทย์ข้อที่ 2: `GET /book` (ข้อมูลมาจากไฟล์อีกไฟล์หนึ่ง)

อยากให้สร้าง endpoint:

```txt
GET /book
```

โดยให้ server ตอบกลับเป็น **JSON array** ของหนังสือ (เช่นรายการหนังสือ 3–5 เล่ม) แต่ “ข้อมูลหนังสือ” ต้องถูกแยกไปเก็บไว้ **อีกไฟล์หนึ่ง** แล้วค่อย import/require มาใช้ใน `server.js`

###  ข้อมูลเพิ่มเติม

- ต้องตอบ header `Content-Type: application/json; charset=utf-8`
- response body ต้องเป็น JSON ที่สร้างจากข้อมูลในไฟล์อื่น (ไม่ hardcode array ไว้ใน `server.js`)

### โครงสร้าง Lab

```txt
day2-native-http/
  server.js
  data/
    books.js
```

### ตัวอย่างไฟล์ข้อมูล: `data/books.js` (CommonJS)

```js
const books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin" },
  { id: 2, title: "Eloquent JavaScript", author: "Marijn Haverbeke" },
  { id: 3, title: "You Don't Know JS", author: "Kyle Simpson" }
];

module.exports = { books };
```

#### Bonus (โจทย์ข้อที่ 3): ส่งไฟล์ HTML ที่มีอยู่ให้ผู้ใช้

สร้าง endpoint ที่เมื่อมีคน request แล้ว server จะ **อ่านไฟล์ `.html`** และส่งกลับไป

ตัวอย่าง endpoint:

```txt
GET /page/me
```

### ข้อมูลเพิ่มเติม

- ต้องตอบ header `Content-Type: text/html; charset=utf-8`
- ต้องอ่านไฟล์จาก disk (เช่น `pages/me.html`) แล้วส่งกลับเป็น response
- ถ้าไฟล์อ่านไม่ได้ ให้ตอบ `500`