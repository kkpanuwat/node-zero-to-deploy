---
id: day-2-core-concepts
title: 'Day 2: Core Concepts'
sidebar_label: 'Core Concepts'
description: ทำความเข้าใจ Node.js, npm, การวางโครงสร้างโปรเจกต์, และการสร้าง HTTP Server พื้นฐาน
---

import React, {useEffect, useState} from 'react';

export function BrowserEventDemo() {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    const button = document.getElementById('day2-browser-event-demo-btn');
    if (!button) return;

    const onClick = () => setClicks((c) => {
        console.log("clicked!")
        return c+1
    });
    button.addEventListener('click', onClick);
    return () => button.removeEventListener('click', onClick);
  }, []);

  return (
    <div className="card" style={{maxWidth: 520}}>
      <div className="card__body">
        <div style={{display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap'}}>
          <button
            id="day2-browser-event-demo-btn"
            className="button button--primary"
            type="button"
          >
            Click me (Browser)
          </button>
          <span className="badge badge--secondary">clicks: {clicks}</span>
        </div>
        <div style={{marginTop: 8, opacity: 0.8, fontSize: 14}}>
          เปิด DevTools Console แล้วคลิกปุ่มเพื่อดูการทำงานของ event ได้เลย
        </div>
      </div>
    </div>
  );
}

# Part 1 — Core Concepts: ปูพื้นฐานสู่การเป็นนักพัฒนา Node.js

## ทำไมเราต้องใส่ใจกับ "โครงสร้างโปรเจกต์"?

<p align="center">
  <img src={require('../../../static/img/day-2/day2-design-structure.png').default} alt="Day 1 Hero" style={{maxWidth: '600px', width: '80%'}} />
</p>

ในชีวิตจริง โปรเจกต์ไม่ได้มีแค่ไฟล์เดียวแล้วจบ แต่ประกอบด้วยส่วนต่างๆ มากมาย:
- โค้ดสำหรับ **"รันเซิร์ฟเวอร์"** (จุดเริ่มต้นของโปรแกรม)
- โค้ดสำหรับ **"จัดการข้อมูล"** (เช่น การเชื่อมต่อฐานข้อมูล)
- โค้ดสำหรับ **"ฟังก์ชันเสริม"** ที่ใช้ซ้ำๆ (Utilities)
- ไฟล์ **"ตั้งค่า"** ต่างๆ ของโปรเจกต์ (Configuration)

Day 2 จึงเน้นที่การ **"จัดระเบียบ"** โปรเจกต์ และ **"สร้างมาตรฐาน"** ให้ทีมทำงานร่วมกันได้ง่ายผ่าน `npm scripts` ก่อนที่เราจะไปสร้าง API ที่ซับซ้อน

---

## Node.js: เมื่อ JavaScript ออกมาวิ่งนอก Browser

**Node.js** คือเครื่องมือที่ทำให้เราสามารถรันโค้ด JavaScript ที่ไหนก็ได้ ไม่ว่าจะเป็นบนเซิร์ฟเวอร์, ใน Terminal, หรือบนคอมพิวเตอร์ของเรา

**สิ่งที่แตกต่างจาก JavaScript ใน Browser:**
- **Browser JS**: มีเครื่องมือสำหรับจัดการหน้าเว็บ เช่น `document`, `window`, และ DOM เพื่อสร้าง UI ที่ผู้ใช้มองเห็น
- **Node.js**: ไม่มีหน้าเว็บให้ยุ่งเกี่ยว แต่มีเครื่องมือสำหรับทำงานฝั่งเซิร์ฟเวอร์ เช่น `fs` (อ่าน/เขียนไฟล์), `http` (สร้างเซิร์ฟเวอร์), `process` (เข้าถึงค่า Environment)

### Example: ปุ่มใน Web browser + ทดลองใช้ Javascript ใน console.

ตัวอย่างข้างล่างเป็นปุ่มบนหน้าเว็บ (Browser) ที่มี `id` และเราดัก event ด้วย `addEventListener` เพื่อให้นักศึกษาเห็นว่า **Browser JS คุยกับ DOM ได้** (ใน Node.js จะไม่มี `document/window` โดยตรง)

<BrowserEventDemo />

<div style={{marginTop:30}}></div>

```html
<button id="day2-browser-event-demo-btn" type="button">Click me</button>
<script>
  const button = document.getElementById("day2-browser-event-demo-btn");
  button.addEventListener("click", () => {
    console.log("clicked!");
  });
</script>
```

**หัวใจสำคัญ: Event Loop**
<p align="center">
  <img src={require('../../../static/img/day-2/non-blocking.png').default} alt="Day 1 Hero" style={{maxWidth: '600px', width: '80%'}} />
</p>
ลองนึกภาพว่า Node.js เป็นพนักงานหน้าร้านที่รับเรื่องไวมาก จุดสำคัญไม่ใช่ว่ามีหลายคน แต่คือ “ไม่ไปยืนรอ” งานที่ต้องใช้เวลา:
- มี request เข้ามา → Node รับเรื่องและเริ่มทำทันที
- ถ้าเจองานที่ต้องรอ (อ่านไฟล์/คิวรี DB/เรียก API) → Node จะส่งงานส่วนนั้นให้ระบบไปทำ แล้วตัวเองกลับมารับงานถัดไปต่อ
- พองานที่รอเสร็จ → ผลลัพธ์ถูกส่งกลับมาให้ Node เพื่อทำขั้นตอนต่อและตอบกลับผู้ใช้

พฤติกรรมแบบนี้เรียกว่า **non-blocking** และเป็นเหตุผลว่าทำไม Node ถึงถนัดงานที่มี I/O เยอะ ๆ

---

## npm และ `package.json`: กล่องเครื่องมือและบัตรประชาชนของโปรเจกต์
<p align="center">
  <img src={require('../../../static/img/day-2/day-2-package-json.png').default} alt="Day 1 Hero" style={{maxWidth: '600px', width: '80%'}} />
</p>
- **`package.json`**: ไฟล์ “เมตาดาต้า” ของโปรเจกต์ บอกข้อมูลสำคัญที่ทำให้โปรเจกต์รันและทำงานร่วมกันได้ เช่น `name`, `version`, `scripts`, และรายการแพ็กเกจที่ต้องใช้ (`dependencies`)
- **`npm install <package-name>`**: ติดตั้งแพ็กเกจจาก npm registry และบันทึกลง `package.json` (พร้อมสร้าง/อัปเดต `package-lock.json` เพื่อให้เวอร์ชันที่ติดตั้ง “คงที่” และ reproducible)
- **`npm run <script-name>`**: รันคำสั่งที่กำหนดไว้ใน `scripts` ของ `package.json` เพื่อให้ทีมใช้คำสั่งชุดเดียวกัน (เช่น `npm run dev`, `npm test`) แทนการพิมพ์คำสั่งยาว ๆ เอง

### ตัวอย่างแบบจับต้องได้: โปรเจกต์เล็ก ๆ 1 อัน

1) สร้างโปรเจกต์และสร้าง `package.json`

```bash
mkdir my-first-api
cd my-first-api
npm init -y
```

2) ติดตั้งแพ็กเกจที่ “ต้องใช้ตอนรันจริง” และเครื่องมือสำหรับพัฒนา

```bash
npm install express
npm install -D nodemon
```

3) สร้างไฟล์ `src/server.js`

```js
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Hello API" });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
```

4) ตั้ง `scripts` ใน `package.json`

```json
{
  "name": "my-first-api",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "express": "^4.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
```

5) รันโปรเจกต์

- โหมดปกติ (เหมาะกับ production หรือเวลาอยากให้พฤติกรรม “นิ่ง ๆ”):
  ```bash
  npm start
  ```
- โหมดพัฒนา (แก้โค้ดแล้วรีสตาร์ทเอง):
  ```bash
  npm run dev
  ```

**อธิบายเพิ่มเติม**
- `dependencies.express`: โค้ดเรา `require("express")` ตอนรันจริง จึงต้องเป็น dependency
- `devDependencies.nodemon`: ใช้ช่วย “ตอนพัฒนา” เท่านั้น (auto-reload) ไม่ใช่ส่วนหนึ่งของโปรแกรมที่ต้องมีตอนใช้งานจริง
- `scripts.start/dev`: ทำให้ทีมรันคำสั่งเดียวกันได้ทุกคน (ไม่ต้องจำ path/คำสั่งยาว ๆ)
- `package-lock.json`: เก็บรายละเอียดเวอร์ชันที่ติดตั้งจริง เพื่อให้ `npm install` บนเครื่องอื่นได้ผลใกล้เคียง/เหมือนกันมากที่สุด

**dependencies vs devDependencies: ของที่ใช้จริง vs ของที่ใช้ตอนสร้าง**
- **`dependencies`**: แพ็กเกจที่ “ต้องมีตอนรันจริง” (production) เช่น `express` เพราะตัวโปรแกรมเรียกใช้ตอนทำงาน
- **`devDependencies`**: เครื่องมือที่ใช้ “เฉพาะตอนพัฒนา/ตรวจคุณภาพ” เช่น `nodemon` (รีสตาร์ทอัตโนมัติ), `eslint` (ช่วยตรวจ/บังคับมาตรฐานโค้ด) — โดยหลักคือโปรดักชันไม่จำเป็นต้องติดตั้งก็ยังรันได้

> สรุปสั้น ๆ: ถ้าเอาโปรเจกต์ขึ้นเซิร์ฟเวอร์แล้ว “ยังต้องใช้” ให้ใส่ `dependencies` แต่ถ้าไว้ช่วยตอนพัฒนา/ทดสอบ ให้ใส่ `devDependencies`

---

## ทำให้ชีวิตง่ายขึ้นด้วย `nodemon`

<p align="center">
  <img src={require('../../../static/img/day-2/day-2-nodemon.png').default} alt="Day 1 Hero" style={{maxWidth: '600px', width: '80%'}} />
</p>

เวลาที่เราพัฒนาเซิร์ฟเวอร์, ทุกครั้งที่แก้ไขโค้ด เราจะต้องปิดเซิร์ฟเวอร์ (ด้วย `Ctrl + C`) แล้วสั่งรันใหม่ (`node my-first-server.js`) ซึ่งเป็นขั้นตอนที่น่ารำคาญและเสียเวลา

`nodemon` คือเครื่องมือที่จะช่วยแก้ปัญหานี้ โดยมันจะคอย "จับตาดู" ไฟล์ในโปรเจกต์ของเรา และเมื่อไหร่ก็ตามที่มีการแก้ไขและบันทึกไฟล์, `nodemon` จะรีสตาร์ทเซิร์ฟเวอร์ให้เราโดยอัตโนมัติ

**วิธีการใช้งาน:**

1.  **ติดตั้งเป็น `devDependency`**: เพราะ `nodemon` เป็นเครื่องมือสำหรับตอนพัฒนาเท่านั้น เราจึงติดตั้งด้วยคำสั่ง:
    ```bash
    npm install nodemon --save-dev
    ```

2.  **เพิ่ม Script ใน `package.json`**: เพื่อให้เรียกใช้งานได้สะดวก, เราจะเพิ่ม "script" ชื่อ `dev` เข้าไปใน `package.json`
    ```json
      "scripts": {
        "start": "node src/server-basic.js",
        "dev": "nodemon src/server-basic.js"
      },
    ```

3.  **รันเซิร์ฟเวอร์ในโหมดพัฒนา**: ต่อไปนี้, แทนที่จะใช้ `node`, เราจะใช้คำสั่งนี้แทน:
    ```bash
    npm run dev
    ```

เพียงเท่านี้ `nodemon` ก็จะทำงาน และทุกครั้งที่คุณแก้ไขโค้ด เซิร์ฟเวอร์ก็จะรีสตาร์ทให้เอง ทำให้การพัฒนา API ของเราเร็วและลื่นไหลขึ้นมาก

---

## Project Structure: จัดโค้ดให้เป็นระเบียบ

เป้าหมายคือการ "แยกไฟล์ตามหน้าที่" เพื่อให้ง่ายต่อการแก้ไขและต่อยอดในอนาคต

**โครงสร้างพื้นฐานสำหรับวันนี้:**
```
library-system/
  package.json
  src/
    server-basic.js     # Server
    data/
      books.js          # Mock data
    utils/
      logger.js         # ฟังก์ชันเสริมที่ใช้ซ้ำๆ
```

**Pro-tip: โครงสร้างสำหรับโปรเจกต์ที่ใหญ่ขึ้น**
เมื่อโปรเจกต์เริ่มซับซ้อน เราอาจแบ่งโฟลเดอร์ละเอียดขึ้นอีก เช่น:
- `config/`: เก็บไฟล์ตั้งค่าต่างๆ
- `routes/`: จัดการเส้นทาง (URL) ของ API
- `handlers/` หรือ `controllers/`: โค้ดที่จัดการ Logic ของแต่ละ Request
- `repositories/`: ส่วนที่รับผิดชอบการคุยกับฐานข้อมูลโดยเฉพาะ

---

## Module System: `require` vs `import`

Node.js มีระบบการเรียกใช้ไฟล์ 2 แบบหลัก:
- **CommonJS (CJS)**: ใช้ `require()` และ `module.exports` (รูปแบบดั้งเดิมที่เจอบ่อย)
- **ES Modules (ESM)**: ใช้ `import` และ `export` (รูปแบบทันสมัย)

ในคอร์สนี้เราจะใช้ **CommonJS** เป็นหลักเพื่อความง่าย แต่สิ่งสำคัญคือ **"เลือกใช้แค่แบบเดียวในโปรเจกต์"** เพื่อป้องกันความสับสน

---

## Content-Type Header: บอก Client ว่าเรากำลังจะส่งอะไรไป

<p align="center">
  <img src={require('../../../static/img/day-2/day-2-content-type.png').default} alt="Day 1 Hero" style={{maxWidth: '600px', width: '80%'}} />
</p>

เมื่อเซิร์ฟเวอร์จะส่งข้อมูลกลับไปให้ Client (เช่น Browser), มันจำเป็นต้องบอกว่า "ข้อมูลที่กำลังจะส่งไปนี้ เป็นไฟล์ประเภทอะไร?" เพื่อให้ Client นำไปแสดงผลได้อย่างถูกต้อง สิ่งนี้เรียกว่า `Content-Type` ซึ่งเป็นส่วนหนึ่งของ HTTP Header

**`Content-Type` ที่พบบ่อย:**

*   **`text/html`**: สำหรับส่งหน้าเว็บ HTML ทั้งหน้า
    *   *ตัวอย่าง:* `<h1>สวัสดี</h1><p>นี่คือหน้าเว็บ</p>`
*   **`application/json`**: สำหรับส่งข้อมูลในรูปแบบ JSON ซึ่งเป็นที่นิยมมากในการสร้าง API
    *   *ตัวอย่าง:* `{"name": "หนังสือ", "price": 100}`
*   **`text/plain`**: สำหรับส่งข้อความธรรมดา ไม่มีรูปแบบ
    *   *ตัวอย่าง:* `Hello, world!`
*   **`image/jpeg`, `image/png`**: สำหรับส่งไฟล์รูปภาพ
*   **`application/xml`**: สำหรับส่งข้อมูลในรูปแบบ XML
*   **`application/pdf`**: สำหรับส่งไฟล์เอกสาร PDF

**ทำไมถึงสำคัญ?**
ถ้าเราส่งข้อมูล JSON แต่บอก `Content-Type` เป็น `text/html`, Browser อาจจะพยายามแสดงผลเป็นหน้าเว็บแล้วเพี้ยนไปเลย ในทางกลับกัน ถ้าเราตั้งค่า `Content-Type` ถูกต้อง, Browser หรือโปรแกรมที่เรียก API ก็จะรู้ทันทีว่าต้องจัดการกับข้อมูลนี้อย่างไร เช่น ถ้าเป็น `application/json` ก็จะนำไปประมวลผลเป็น Object ต่อได้เลย

ในการสร้างเซิร์ฟเวอร์ด้วย `http` module, เราจะใช้ `response.setHeader('Content-Type', 'application/json');` เพื่อกำหนดค่านี้ก่อนที่จะส่งข้อมูลกลับไป

---

## ส่วนประกอบของ HTTP Request: Client ต้องการอะไร?

<p align="center">
  <img src={require('../../../static/img/day-2/day-2-request.png').default} alt="Day 1 Hero" style={{maxWidth: '600px', width: '80%'}} />
</p>

ทุกครั้งที่ Client (เช่น Browser) ส่งคำขอมายังเซิร์ฟเวอร์, ข้อมูลที่ส่งมาจะถูกห่อหุ้มอยู่ในรูปแบบของ HTTP Request ซึ่งมีส่วนประกอบหลักๆ ดังนี้:

1.  **Request Line**: บรรทัดแรกสุดที่บอกเจตนาหลักของคำขอ
    *   **Method**: การกระทำที่ต้องการ เช่น `GET` (ขอข้อมูล), `POST` (ส่งข้อมูลใหม่), `PUT` (อัปเดต), `DELETE` (ลบ)
    *   **URL**: ที่อยู่ของสิ่งที่ต้องการ เช่น `/books`, `/users/1`
    *   **HTTP Version**: เวอร์ชันของโปรโตคอล เช่น `HTTP/1.1`

2.  **Headers**: ข้อมูลเสริมเกี่ยวกับคำขอ คล้ายๆ กับ "หัวกระดาษ" ของจดหมาย
    *   **Host**: ชื่อโดเมนของเซิร์ฟเวอร์ที่ร้องขอไป เช่น `api.example.com`
    *   **User-Agent**: ข้อมูลของโปรแกรมที่ส่งคำขอมา เช่น `Chrome/108.0.0.0`
    *   **Accept**: ประเภทของข้อมูลที่ Client ยอมรับได้ เช่น `application/json`

3.  **Body**: "เนื้อหา" ของจดหมาย ซึ่งจะมีเฉพาะใน Method ที่ต้องส่งข้อมูลไปให้เซิร์ฟเวอร์ เช่น `POST` หรือ `PUT`
    *   ถ้าเป็นการสร้างหนังสือใหม่, Body อาจจะมีข้อมูล JSON หน้าตาแบบนี้: `{"title": "New Book", "author": "John Doe"}`

ใน `http` module ของ Node.js, เราสามารถเข้าถึงข้อมูลเหล่านี้ได้จาก `request` object (ที่เรามักตั้งชื่อตัวแปรว่า `req`) เช่น `req.method`, `req.url`, `req.headers`

---

## ส่วนประกอบของ HTTP Response: เซิร์ฟเวอร์ตอบกลับอะไร?

<p align="center">
  <img src={require('../../../static/img/day-2/day-2-response.png').default} alt="Day 1 Hero" style={{maxWidth: '600px', width: '80%'}} />
</p>

หลังจากเซิร์ฟเวอร์ประมวลผลคำขอเสร็จแล้ว, ก็จะส่งข้อมูลกลับไปในรูปแบบของ HTTP Response ซึ่งมีโครงสร้างคล้ายกัน:

1.  **Status Line**: บรรทัดแรกที่บอกผลลัพธ์ของคำขอ
    *   **HTTP Version**: เช่น `HTTP/1.1`
    *   **Status Code**: ตัวเลข 3 หลักที่บอกสถานะ เช่น `200` (สำเร็จ), `404` (ไม่พบ), `500` (เซิร์ฟเวอร์ผิดพลาด)
    *   **Status Message**: ข้อความสั้นๆ อธิบาย Status Code เช่น `OK`, `Not Found`

2.  **Headers**: ข้อมูลเสริมเกี่ยวกับการตอบกลับ
    *   **Content-Type**: (ที่เราเพิ่งเรียนไป) บอกประเภทของเนื้อหาที่ส่งกลับไป เช่น `application/json`
    *   **Content-Length**: ขนาดของเนื้อหาที่ส่งกลับไป (หน่วยเป็น byte)
    *   **Date**: วันที่และเวลาที่เซิร์ฟเวอร์ส่งการตอบกลับนี้

3.  **Body**: "เนื้อหา" ที่เซิร์ฟเวอร์ส่งกลับไปให้ Client เช่น ข้อมูล JSON, หน้าเว็บ HTML, หรือไฟล์รูปภาพ

ในการสร้างเซิร์ฟเวอร์, เราคือคนที่จะต้องสร้างส่วนประกอบเหล่านี้ขึ้นมา โดยใช้ `response` object (ที่เรามักตั้งชื่อว่า `res`) เช่น `res.statusCode = 200;`, `res.setHeader('Content-Type', 'application/json');`, และ `res.end(responseBody);`

---

## HTTP Module: สร้างเซิร์ฟเวอร์ตัวแรก

ก่อนจะไปใช้เฟรมเวิร์คอย่าง Express เรามาลองสร้างเซิร์ฟเวอร์ด้วยเครื่องมือพื้นฐานของ Node.js อย่าง `http` กันก่อน
- เราจะใช้ `http.createServer((req, res) => { ... })`
- **`req` (Request)**: คือ "จดหมาย" ที่ Client ส่งมา บอกเราว่าต้องการอะไร (เช่น `req.method`, `req.url`)
- **`res` (Response)**: คือ "คำตอบ" ที่เราจะส่งกลับไปให้ Client (เช่น `res.statusCode`, `res.end()`)

### ตัวอย่าง: เซิร์ฟเวอร์ที่ง่ายที่สุดในโลก

ลองมาสร้างเซิร์ฟเวอร์ตัวแรกกันจริงๆ เพื่อให้เห็นภาพชัดเจน

**ขั้นตอนการทำตาม:**

1.  สร้างไฟล์ใหม่ในโปรเจกต์ของคุณชื่อ `my-first-server.js`
2.  คัดลอกโค้ดด้านล่างนี้ไปวางในไฟล์:

    ```javascript
    // 1. เรียกใช้ http module ที่มีมากับ Node.js
    const http = require('http');

    // 2. สร้างเซิร์ฟเวอร์ โดยใส่ฟังก์ชันที่จะทำงานทุกครั้งเมื่อมี Request เข้ามา
    const server = http.createServer((request, response) => {
      console.log('มีคนส่ง Request เข้ามา!'); // แสดง log ใน terminal

      // 3. ตั้งค่าหัวกระดาษ (Header) เพื่อบอกว่าจะตอบกลับเป็นอะไร
      response.setHeader('Content-Type', 'application/json');
      response.statusCode = 200; // 200 OK

      // 4. เขียนเนื้อหาที่จะตอบกลับไป (ต้องเป็น String)
      const responseBody = {
        message: 'Hello from my first Node.js Server!'
      };
      response.end(JSON.stringify(responseBody)); // แปลง Object เป็น JSON String แล้วส่งกลับ
    });

    // 5. สั่งให้เซิร์ฟเวอร์เริ่มรอรับ Request ที่ Port 3000
    const port = 3000;
    server.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
    });
    ```

3.  เปิด Terminal แล้วรันไฟล์นี้ด้วยคำสั่ง:
    ```bash
    node my-first-server.js
    ```
    คุณจะเห็นข้อความ `Server is listening on http://localhost:3000`

4.  เปิดเว็บเบราว์เซอร์ (เช่น Chrome, Firefox) แล้วเข้าไปที่ `http://localhost:3000`

**ผลลัพธ์:** คุณควรจะเห็นข้อความ JSON `{"message":"Hello from my first Node.js Server!"}` ปรากฏบนหน้าจอ และใน Terminal ที่รันโค้ดอยู่ ก็จะเห็นข้อความ `มีคนส่ง Request เข้ามา!`

นี่คือพื้นฐานที่สุดของการสร้างเว็บเซิร์ฟเวอร์ด้วย Node.js ครับ!

**สิ่งสำคัญที่ต้องรู้:**
- **404 Not Found**: Client ขอ URL ที่ไม่มีอยู่จริง
- **405 Method Not Allowed**: Client ขอ URL ที่มีอยู่ แต่ใช้ Method ผิด (เช่น ขอ `POST` ไปที่ URL ที่รับแค่ `GET`)

---

## Environment Variables (.env)

เราไม่ควร Hardcode ค่าที่อาจเปลี่ยนแปลงได้ (เช่น Port, รหัสผ่าน Database) ลงในโค้ดโดยตรง
- **วิธีปฏิบัติที่ดี**: ใช้ `process.env.PORT` เพื่ออ่านค่าจาก Environment
- **สำหรับการพัฒนา**: เรานิยมสร้างไฟล์ `.env` เพื่อเก็บค่าเหล่านี้ และใช้ไลบรารี `dotenv` เพื่อโหลดค่าเข้ามาในโปรเจกต์

---

## Persistence: ทำให้ข้อมูลไม่หายไป

ตอนนี้ข้อมูลหนังสือของเราอยู่ใน Memory ซึ่งหมายความว่าถ้าปิดเซิร์ฟเวอร์ ข้อมูลก็จะหายไปทั้งหมด
- **วิธีแก้แบบง่าย**: เราจะใช้ `fs` (File System) module เพื่อ **อ่าน/เขียน** ข้อมูลลงในไฟล์ JSON
- ทุกครั้งที่มีการเพิ่มข้อมูลใหม่ เราจะอัปเดตไฟล์ JSON นี้ ทำให้ข้อมูล "คงอยู่" (Persist) แม้จะรีสตาร์ทเซิร์ฟเวอร์

---

## Git Hygiene: ข้อปฏิบัติที่ดีในการใช้ Git

- **ห้าม Commit `node_modules/`**: โฟลเดอร์นี้มีขนาดใหญ่และสามารถสร้างขึ้นใหม่ได้เสมอด้วยคำสั่ง `npm install`
- **ห้าม Commit `.env`**: ไฟล์นี้อาจเก็บข้อมูลสำคัญ เช่น API Keys หรือรหัสผ่าน ควรสร้าง `.env.example` ไว้เป็นตัวอย่างให้ทีมแทน
- **Commit ให้มีความหมาย**: ตั้งชื่อ Commit ให้สื่อความหมาย เช่น `feat: add basic server setup` หรือ `fix: correct book data validation`

