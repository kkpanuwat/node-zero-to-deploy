---
id: day-2-express-js
title: 'Start Express.js'
sidebar_label: 'Express.js'
---

หลังจากที่เราได้ลองเขียน Web Server ด้วย Node.js Native HTTP กันไปแล้วจะพบข้อสังเกต
- เขียน if-else เช็ค URL เยอะเกินไป
- ต้องคอยสั่ง res.writeHead และ res.end เองทุกครั้ง

---

### เริ่มต้นสร้าง my-express-app

#### โครงสร้างโปรเจกต์ (Project Structure)
```text
my-express-app/
├── node_modules/         
├── data/                 
│   └── books.js
├── pages/               
│   └── me.html
├── server.js             
├── package.json          
└── package-lock.json    
```

### Project Initialization

การเริ่มโปรเจกต์ใหม่ เราต้องสร้างไฟล์ที่ชื่อว่า package.json เพื่อเก็บรายละเอียดของโปรเจกต์ (ชื่อ, เวอร์ชั่น, รายการ Library ที่ใช้)

```bash
npm init -y
```

- npm init: คือคำสั่งสร้างไฟล์ package.json
- -y เริ่มต้นด้สยค่า Default

<p align="center">
  <img src={require('../../../static/img/day-2/express/init.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

### ติดตั้ง Express.js

```bash
npm install express
```

<p align="center">
  <img src={require('../../../static/img/day-2/express/install-express.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

สังเกต: หลังจากกดคำสั่งนี้ เห็นโฟลเดอร์ node_modules และไฟล์ package-lock.json

### สร้างไฟล์ `server.js`

```js
const express = require('express');
const app = express();
const port = 3002;



app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
```

###  เริ่มต้นสร้าง Endpoint แรกด้วย Hello world!

```js
const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
```

<p align="center">
  <img src={require('../../../static/img/day-2/express/get1.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

- **Clean & Declarative Routing**: ลดการเขียน condition ในการหา endpoint `if (req.url === ...)` ไปได้เลย — Express ให้เราประกาศ Route แยกตาม HTTP Method (`.get`, `.post`, `.put`, `.delete`) ได้อย่างชัดเจน endpoint นี้ทำหน้าที่อะไร (High Readability) และจัดการง่ายขึ้นมากเมื่อโปรเจกต์สเกลใหญ่ขึ้น
- **Smart Response Handling (Auto `Content-Type`)**: Express จัดการ Response Header ให้เราอัตโนมัติ ไม่ต้องคอยตั้ง `Content-Type` เองทุกบรรทัด  
  - ถ้าใช้ `res.send('<h1>Hello</h1>')` → จะเป็น HTML  
  - ถ้าใช้ `res.json({ status: 'ok' })` → จะเป็น JSON (และ `JSON.stringify` ให้อัตโนมัติ)

---
### Nodemon

เวลาเราแก้โค้ดใน `server.js` ถ้าใช้ `node server.js` ตรงๆ เราต้อง **กดหยุด (`Ctrl+C`) แล้วรันใหม่เอง** ทุกครั้งถึงจะเห็นผลลัพธ์ล่าสุดของการแก้ไข

`nodemon` คือเครื่องมือช่วย “Watch file” แล้ว **รีสตาร์ทโปรแกรมให้เองอัตโนมัติ** เมื่อไฟล์มีการเปลี่ยนแปลง เหมาะสำหรับช่วงพัฒนา (development)

<p align="center">
  <img src={require('../../../static/img/day-2/day-2-nodemon.png').default} alt="Nodemon" style={{maxWidth: '800px', width: '100%'}} />
</p>

### ติดตั้ง Nodemon (แนะนำให้เป็น Dev Dependency)

```bash
npm install -D nodemon
```

- `-D` (หรือ `--save-dev`) หมายถึงติดตั้งไว้ใช้ตอน “พัฒนา”

### ตั้งค่า `package.json` scripts

<p align="center">
  <img src={require('../../../static/img/day-2/express/nodemon2.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

ตัวอย่าง (โปรเจกต์มีไฟล์ `server.js`):

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### วิธีรัน

```bash
npm run dev
```

จากนั้นลองแก้ไฟล์ `server.js` แล้วบันทึก จะเห็นว่า server รีสตาร์ทเอง
