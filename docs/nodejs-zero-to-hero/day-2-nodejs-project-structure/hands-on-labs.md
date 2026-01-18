---
id: day-2-hands-on-labs
title: 'Day 2: Hands-on Labs'
sidebar_label: 'Hands-on Labs'
description: ลงมือสร้างโปรเจกต์ library-system, ตั้งค่า npm scripts, และสร้าง HTTP Server ที่ตอบ JSON, รับข้อมูล, และบันทึกข้อมูลลงไฟล์
---

# Part 4 — Hands-on Labs: สร้าง Library System API

ได้เวลาลงมือทำจริง! ในส่วนนี้ เราจะสร้างโปรเจกต์ "Library System" ตั้งแต่ศูนย์ เราจะได้ตั้งค่าโปรเจกต์, สร้างเซิร์ฟเวอร์, จัดการ Request, และทำให้ข้อมูลของเราไม่หายไปเมื่อปิดโปรแกรม

**เป้าหมายสูงสุดของวันนี้:** รัน `npm run dev` แล้วได้ API Server ที่มี Endpoint ดังนี้:
- `GET /health`: สำหรับตรวจสอบสถานะเซิร์ฟเวอร์
- `GET /books`: สำหรับดึงรายการหนังสือทั้งหมด (พร้อมค้นหาและจำกัดจำนวน)
- `POST /books`: สำหรับเพิ่มหนังสือเล่มใหม่ และบันทึกข้อมูลลงไฟล์

---

### Lab 1: จัดเตรียมพื้นที่ทำงาน (Project Setup)

ขั้นแรก, เรามาสร้างโฟลเดอร์สำหรับโปรเจกต์และไฟล์ที่จำเป็นกันก่อน

1.  **สร้างโฟลเดอร์โปรเจกต์และ `package.json`**
    ```bash
    mkdir library-system
    cd library-system
    npm init -y
    ```
    คำสั่ง `npm init -y` จะสร้างไฟล์ `package.json` ให้เราอัตโนมัติ

2.  **สร้างโครงสร้างโฟลเดอร์และไฟล์**
    ```bash
    mkdir -p src/data src/utils
    touch src/server-basic.js src/data/books.js src/utils/logger.js
    ```
    เรากำลังสร้างโฟลเดอร์ `src` สำหรับเก็บโค้ดหลัก, `data` สำหรับข้อมูล, และ `utils` สำหรับฟังก์ชันเสริม

3.  **สร้าง `.gitignore` (สำคัญมาก!)**
    ```bash
    # สร้างไฟล์ .gitignore และเพิ่มรายการที่ไม่อยากให้ Git เก็บ
    printf "node_modules\n.env\n" > .gitignore
    ```
    เพื่อบอกให้ Git ไม่ต้องสนใจโฟลเดอร์ `node_modules` และไฟล์ `.env` ที่มีความลับ

4.  **เพิ่มข้อมูลหนังสือจำลอง**
    ใส่โค้ดนี้ลงในไฟล์ `src/data/books.js`:
    ```js
    const books = [
      { id: 1, title: 'JavaScript for Beginners', author: 'Alice' },
      { id: 2, title: 'Node.js Essentials', author: 'Bob' },
    ];

    module.exports = { books };
    ```

**✅ Checkpoint:** โครงสร้างไฟล์ของคุณควรจะหน้าตาแบบนี้ และเมื่อรัน `git status`, จะต้องไม่เห็นโฟลเดอร์ `node_modules`

---

### Lab 2: สร้างเซิร์ฟเวอร์ให้มีชีวิต (Basic HTTP Server)

ตอนนี้เราจะมาเขียนโค้ดใน `src/server-basic.js` เพื่อสร้างเซิร์ฟเวอร์ตัวแรกกัน

1.  **เขียนโค้ดเซิร์ฟเวอร์พื้นฐาน**
    ใส่โค้ดนี้ลงใน `src/server-basic.js`:
    ```js
    const http = require('http');
    const { books } = require('./data/books');

    // ฟังก์ชันสำหรับส่ง Response กลับไปเป็น JSON
    function sendJson(res, statusCode, data) {
      res.statusCode = statusCode;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(data));
    }

    const server = http.createServer((req, res) => {
      console.log(`Request: ${req.method} ${req.url}`);

      // Routing แบบง่ายๆ
      if (req.method === 'GET' && req.url === '/health') {
        return sendJson(res, 200, { ok: true, message: 'Server is healthy' });
      }

      if (req.method === 'GET' && req.url === '/books') {
        return sendJson(res, 200, { ok: true, data: { books } });
      }
      
      // ถ้าไม่เจอ Route ที่ต้องการ ให้ตอบ 404
      return sendJson(res, 404, { ok: false, error: { code: 'NOT_FOUND', message: 'The requested resource was not found' } });
    });

    const port = 3000;
    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
    ```

2.  **ตั้งค่า `npm scripts`**
    เพื่อให้รันโปรเจกต์ได้ง่าย, เราจะติดตั้ง `nodemon` ที่ช่วยรีสตาร์ทเซิร์ฟเวอร์ให้อัตโนมัติเมื่อมีการแก้โค้ด
    ```bash
    npm install --save-dev nodemon
    ```
    จากนั้น, เพิ่ม `scripts` ในไฟล์ `package.json`:
    ```json
    "scripts": {
      "start": "node src/server-basic.js",
      "dev": "nodemon src/server-basic.js"
    }
    ```

**✅ Checkpoint:**
- ลองรัน `npm run dev`
- เปิดเบราว์เซอร์ไปที่ `http://localhost:3000/health` ควรเห็น JSON ตอบกลับมา
- ลองเปิด `http://localhost:3000/books`
- ลองแก้โค้ดใน `server-basic.js` แล้วดูว่าเซิร์ฟเวอร์รีสตาร์ทเองหรือไม่

---

### Lab 3: ยกระดับ Routing ให้ฉลาดขึ้น

เราจะปรับปรุงการจัดการ Routing ให้รองรับ URL ที่ซับซ้อนขึ้น และจัดการ Method ที่ไม่รองรับ

1.  **ปรับปรุงการจัดการ URL**
    แก้ไขส่วน `createServer` ใน `src/server-basic.js` ให้ใช้ `new URL()` เพื่อแยก `pathname` ออกจาก query string
    
    ```js
    // ... โค้ดส่วนบน ...
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const pathname = url.pathname;
      console.log(`Request: ${req.method} ${pathname}`);

      if (pathname === '/health') {
        if (req.method !== 'GET') {
          res.setHeader('Allow', 'GET');
          return sendJson(res, 405, { ok: false, error: { code: 'METHOD_NOT_ALLOWED', message: 'Method Not Allowed' } });
        }
        return sendJson(res, 200, { ok: true, message: 'Server is healthy' });
      }

      if (pathname === '/books') {
        if (req.method === 'GET') {
           // เดี๋ยวเราจะมาเพิ่ม feature ตรงนี้
          return sendJson(res, 200, { ok: true, data: { books } });
        }
        res.setHeader('Allow', 'GET, POST');
        return sendJson(res, 405, { ok: false, error: { code: 'METHOD_NOT_ALLOWED', message: 'Method Not Allowed' } });
      }

      return sendJson(res, 404, { ok: false, error: { code: 'NOT_FOUND', message: 'The requested resource was not found' } });
    });
    // ... โค้ดส่วนล่าง ...
    ```

**✅ Checkpoint:**
- ลองเข้า `http://localhost:3000/books?search=abc`, เซิร์ฟเวอร์ควรยังทำงานได้ถูกต้อง
- ลองใช้ `curl -X POST http://localhost:3000/health`, ควรได้รับ Response 405 Method Not Allowed

---

### Lab 4: เพิ่มความสามารถให้ `GET /books`

ตอนนี้เราจะทำให้ Endpoint `/books` สามารถค้นหา (search) และจำกัดจำนวน (limit) ได้

1.  **เพิ่ม Logic การกรองข้อมูล**
    ใน `src/server-basic.js` ภายใน `if (pathname === '/books')` และ `if (req.method === 'GET')` ให้เพิ่มโค้ดนี้เข้าไป:

    ```js
    if (req.method === 'GET') {
        const search = url.searchParams.get('search');
        const limit = url.searchParams.get('limit');
        
        let result = [...books]; // Copy array to avoid mutation

        if (search) {
            const needle = search.trim().toLowerCase();
            result = result.filter(book => 
                book.title.toLowerCase().includes(needle) || 
                book.author.toLowerCase().includes(needle)
            );
        }

        if (limit) {
            result = result.slice(0, parseInt(limit, 10));
        }

        return sendJson(res, 200, { ok: true, data: { books: result } });
    }
    ```

**✅ Checkpoint:**
- `http://localhost:3000/books?limit=1` ควรคืนหนังสือแค่ 1 เล่ม
- `http://localhost:3000/books?search=node` ควรคืนเฉพาะหนังสือที่มีคำว่า "Node"

---

### Lab 5: สร้าง `POST /books` และบันทึกข้อมูลลงไฟล์

ถึงเวลาทำให้ API ของเราสามารถ "รับ" ข้อมูลและ "บันทึก" มันได้จริงๆแล้ว!

1.  **สร้าง `data/books.json`**
    สร้างไฟล์เปล่าๆ ชื่อ `books.json` ในโฟลเดอร์ `data` และใส่ `[]` ลงไป

2.  **สร้าง Repository Layer**
    เราจะสร้าง "Repository" ซึ่งเป็น Layer ที่รับผิดชอบการจัดการข้อมูลโดยเฉพาะ เพื่อแยก Logic การอ่าน/เขียนไฟล์ออกจาก Server
    สร้างไฟล์ `src/repositories/books-repo.js` และใส่โค้ดนี้:
    ```js
    const fs = require('fs/promises');
    const path = require('path');

    const dataFilePath = path.join(process.cwd(), 'data', 'books.json');

    async function readAll() {
      try {
        const raw = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(raw);
      } catch (e) {
        if (e.code === 'ENOENT') return []; // If file not found, return empty array
        throw e;
      }
    }

    async function writeAll(books) {
      await fs.writeFile(dataFilePath, JSON.stringify(books, null, 2), 'utf8');
    }

    async function getAllBooks(filters) {
      let books = await readAll();
      // Apply filters if provided
      if (filters?.search) {
        const needle = filters.search.trim().toLowerCase();
        books = books.filter(book => book.title.toLowerCase().includes(needle) || book.author.toLowerCase().includes(needle));
      }
      if (filters?.limit) {
        books = books.slice(0, parseInt(filters.limit, 10));
      }
      return books;
    }

    async function addBook({ title, author }) {
      const books = await readAll();
      const nextId = books.reduce((max, b) => Math.max(max, b.id || 0), 0) + 1;
      const newBook = { id: nextId, title, author };
      books.push(newBook);
      await writeAll(books);
      return newBook;
    }

    module.exports = { getAllBooks, addBook };
    ```

3.  **สร้างฟังก์ชันอ่าน Body และ Validation**
    ใน `server-basic.js` เพิ่มฟังก์ชันสำหรับอ่าน JSON body และตรวจสอบความถูกต้องของข้อมูล
    ```js
    // ... (ควรวางไว้ใกล้ๆ sendJson)
    async function readJsonBody(req) {
        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const raw = Buffer.concat(chunks).toString('utf8');
        if (!raw) return null;
        try {
            return JSON.parse(raw);
        } catch { return null; }
    }

    function validateBookInput(body) {
        const title = typeof body?.title === 'string' ? body.title.trim() : '';
        const author = typeof body?.author === 'string' ? body.author.trim() : '';

        if (!title) return { ok: false, message: 'title is required' };
        if (!author) return { ok: false, message: 'author is required' };

        return { ok: true, data: { title, author } };
    }
    ```

4.  **ปรับปรุง Server ให้ใช้ Repository และรองรับ `POST`**
    แก้ไข `server-basic.js` ครั้งใหญ่!
    ```js
    // แก้ไข require ด้านบน
    const http = require('http');
    const bookRepo = require('./repositories/books-repo'); // เปลี่ยนจาก data/books

    // ... sendJson, readJsonBody, validateBookInput ...

    const server = http.createServer(async (req, res) => { // <-- เพิ่ม async
      const url = new URL(req.url, `http://${req.headers.host}`);
      const pathname = url.pathname;
      console.log(`Request: ${req.method} ${pathname}`);

      // ... /health endpoint เหมือนเดิม ...

      if (pathname === '/books') {
        // GET /books
        if (req.method === 'GET') {
          const filters = Object.fromEntries(url.searchParams.entries());
          const books = await bookRepo.getAllBooks(filters);
          return sendJson(res, 200, { ok: true, data: { books } });
        }
        // POST /books
        if (req.method === 'POST') {
          const body = await readJsonBody(req);
          if (!body) {
            return sendJson(res, 400, { ok: false, error: { code: 'INVALID_JSON', message: 'Invalid JSON body' } });
          }
          const validated = validateBookInput(body);
          if (!validated.ok) {
            return sendJson(res, 400, { ok: false, error: { code: 'VALIDATION_ERROR', message: validated.message } });
          }
          const newBook = await bookRepo.addBook(validated.data);
          return sendJson(res, 201, { ok: true, data: { book: newBook } });
        }

        res.setHeader('Allow', 'GET, POST');
        return sendJson(res, 405, { ok: false, error: { code: 'METHOD_NOT_ALLOWED', message: 'Method Not Allowed' } });
      }

      return sendJson(res, 404, { ok: false, error: { code: 'NOT_FOUND', message: 'The requested resource was not found' } });
    });

    // ... server.listen เหมือนเดิม ...
    ```

**✅ Checkpoint:**
- รัน `npm run dev`
- ใช้ `curl` หรือเครื่องมืออื่นเพื่อ `POST` ข้อมูลหนังสือใหม่:
  ```bash
  curl -X POST http://localhost:3000/books \
    -H "Content-Type: application/json" \
    -d '{"title": "The Pragmatic Programmer", "author": "Andy Hunt"}'
  ```
- เข้า `http://localhost:3000/books` ในเบราว์เซอร์ ควรจะเห็นหนังสือเล่มใหม่
- ลองปิดเซิร์ฟเวอร์ (`Ctrl+C`) แล้วเปิดใหม่ ข้อมูลหนังสือเล่มใหม่ **ต้องยังอยู่!**

---

### Lab 6: ก้าวสุดท้าย Refactor โค้ด (Optional, but Recommended)

ตอนนี้ `server-basic.js` ของเราเริ่มใหญ่และทำหลายหน้าที่เกินไปแล้ว เราจะมาจัดระเบียบมันให้เหมือนโปรเจกต์มืออาชีพ

**แนวทาง:**
1.  สร้างโฟลเดอร์ `src/handlers`, `src/routes`.
2.  ย้าย Logic ของแต่ละ Endpoint (`/health`, `/books`) ไปไว้ในไฟล์ของตัวเองใน `src/handlers`.
3.  สร้าง `src/routes/index.js` ให้ทำหน้าที่เป็น "ผู้จัดการจราจร" คอยดูว่า URL ที่เข้ามาควรจะส่งต่อไปให้ Handler ตัวไหน.
4.  ให้ `src/server.js` (เปลี่ยนชื่อจาก `server-basic.js`) ทำหน้าที่แค่สร้างเซิร์ฟเวอร์และส่งต่อ Request ทั้งหมดไปให้ Router.

นี่คือการเตรียมความพร้อมที่สำคัญที่สุดก่อนที่เราจะก้าวเข้าสู่โลกของ Express.js ในวันถัดไป!

## Checklist: สรุปความสามารถที่คุณได้รับใน Day 2

- [ ] คุณสามารถอธิบายได้ว่า `package.json` และ `npm scripts` มีไว้ทำอะไร
- [ ] คุณสามารถสร้างโปรเจกต์ Node.js และจัดโครงสร้างไฟล์เบื้องต้นได้
- [ ] คุณสามารถสร้างเซิร์ฟเวอร์พื้นฐานที่รันและตอบข้อมูล JSON กลับมาได้
- [ ] คุณสามารถสร้าง API ที่รับข้อมูล (`POST`) พร้อมตรวจสอบความถูกต้อง และบันทึกข้อมูลลงไฟล์ได้
- [ ] คุณเข้าใจแล้วว่าข้อมูลไม่หายไปไหนเมื่อปิดเซิร์ฟเวอร์ เพราะเราได้ทำ Persistence แล้ว!

> **Challenge:** ลองเพิ่ม Endpoint ใหม่ `GET /books/:id` ที่รับ `id` ของหนังสือจาก URL และคืนข้อมูลเฉพาะหนังสือเล่มนั้นกลับไป
