# Day 2: เริ่มต้น Node.js + Express.js (ทำ API แรก) — 80 นาที

> เป้าหมาย: สร้างโปรเจกต์ Node แบบถูกโครง, เข้าใจ `package.json`/scripts, ติดตั้ง Express, ทำ API ที่มีทั้ง `GET`/`POST` และทดสอบด้วย `curl`

---

## สิ่งที่ต้องมี

```bash
node -v
npm -v
```

ถ้าเห็นเวอร์ชัน แปลว่าเครื่องพร้อม

---

## 0) Warm-up: รัน Node ให้คล่อง (10 นาที)

### 3 วิธีรัน JavaScript

1) รันไฟล์: `node hello.js`  
2) โค้ดสั้นๆ: `node -e "console.log('hi')"`  
3) REPL: `node` (ออกด้วย `.exit` หรือ `Ctrl+C` สองครั้ง)

### ทำความคุ้นกับ error

สร้างไฟล์ `hello.js`:

```js
console.log("Start");
console.lgo("typo");
```

รัน `node hello.js` แล้วสังเกต:
- ชนิด error (เช่น `TypeError`, `ReferenceError`)
- ตำแหน่ง `ไฟล์:บรรทัด:คอลัมน์` ที่บอกจุดพัง

---

## 1) สร้างโปรเจกต์ Node (20 นาที)

```bash
mkdir day2-node-express
cd day2-node-express
npm init -y
```

### รู้จักไฟล์สำคัญ

- `package.json` — ชื่อโปรเจกต์, scripts, dependencies
- `package-lock.json` — ล็อกเวอร์ชันให้ติดตั้งเหมือนกันทุกเครื่อง
- `node_modules/` — โค้ดของแพ็กเกจที่ติดตั้ง (ปกติไม่ commit)

### ตั้ง scripts ให้รันง่าย

แก้ `package.json` ให้มีอย่างน้อย:

```json
{
  "scripts": {
    "dev": "node --watch server.js",
    "start": "node server.js"
  }
}
```

หมายเหตุ: `node --watch` มีใน Node รุ่นใหม่ๆ และช่วย auto-reload ตอนแก้ไฟล์

---

## 2) ติดตั้ง Express (10 นาที)

```bash
npm install express
```

ตรวจว่า install สำเร็จ:

```bash
npm ls --depth=0
```

---

## 3) ทำ Express API แรก (30 นาที)

สร้างไฟล์ `server.js` (CommonJS):

```js
const express = require("express");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/greet", (req, res) => {
  const name = (req.query.name || "guest").toString();
  res.json({ message: `Hello, ${name}` });
});

app.post("/echo", (req, res) => {
  res.status(201).json({ received: req.body });
});

app.use((req, res) => {
  res.status(404).json({ ok: false, error: "NOT_FOUND" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

รัน:

```bash
npm run dev
```

### ทดสอบด้วย `curl`

```bash
curl -i http://localhost:3000/health
curl -i "http://localhost:3000/greet?name=Beam"
curl -i -H "Content-Type: application/json" -d '{"msg":"hi"}' http://localhost:3000/echo
```

---

## 4) แบบฝึกหัด (10 นาที)

1) เพิ่ม `GET /time` ให้ตอบ `{ now: "<iso>" }`  
2) เพิ่ม `GET /api/users` ให้ตอบ array ผู้ใช้จำลอง 3 คน  
3) ให้ `POST /echo` เช็คว่า body เป็น object จริง ถ้าไม่ใช่ให้ตอบ `400`

---

## 5) การบ้าน (เลือกทำ 1–2 ข้อ)

1) แยกโครงสร้างเป็น `src/server.js` แล้วแก้ scripts ให้รันได้เหมือนเดิม  
2) ทำ `POST /api/users` (รับ `{ name }`) แล้วตอบกลับ user ที่สร้าง (ใส่ `id` แบบสุ่มง่ายๆ)  
3) เพิ่ม log middleware: `console.log(req.method, req.path)`

---

## Troubleshooting ที่พบบ่อย

- `EADDRINUSE`: พอร์ตชน → เปลี่ยนพอร์ตด้วย `PORT=4000 npm run dev`
- `Cannot find module 'express'`: ยังไม่ได้ `npm install` หรือรันในโฟลเดอร์ผิด
- แก้ไฟล์แล้วไม่รีโหลด: เช็คว่าใช้ `npm run dev` (ไม่ใช่ `npm start`)
