---
id: day-2-mini-project
title: 'Day 2: Mini Project Challenge'
sidebar_label: 'Mini Project'
description: "Challenge ท้ายวัน: สร้าง Library System API Server ด้วย Node.js พื้นฐาน ที่มี GET/POST, validation, persistence, และโครงสร้างโปรเจกต์ที่สมบูรณ์"
---

# Part 5 — Mini Project: The "Library System" API Challenge

ถึงเวลาทดสอบความรู้ทั้งหมดที่คุณได้เรียนมาในวันนี้!

**ภารกิจของคุณ:** สร้าง API Server สำหรับระบบจัดการหนังสือขนาดเล็ก (`Library System`) โดย **ไม่ใช้ Express.js** เป้าหมายคือการสร้างเซิร์ฟเวอร์ที่สมบูรณ์ด้วย Node.js พื้นฐาน, สามารถรันได้, และมีฟังก์ชันครบถ้วนตามที่กำหนด

> Timebox แนะนำ: 50–90 นาที (เริ่มทำในห้อง + ทำต่อเป็นการบ้านได้)

## Core Features (ฟีเจอร์หลักที่ต้องมี)

- **Project Setup:**
  - โปรเจกต์ต้องสามารถรันได้ด้วย `npm install` ตามด้วย `npm run dev`
  - มี `scripts` สำหรับ `start` และ `dev` ใน `package.json`
  - สามารถตั้งค่า `PORT` ผ่านไฟล์ `.env` (และต้องมี `.env.example` ในโปรเจกต์)
  - มี `.gitignore` ที่ถูกต้อง (ไม่ commit `node_modules` หรือ `.env`)

- **API Endpoints:**
  - `GET /health`: ตอบกลับ `{ ok: true }` เพื่อบอกว่าเซิร์ฟเวอร์ทำงานปกติ
  - `GET /books`: ตอบกลับรายการหนังสือทั้งหมดในรูปแบบ JSON
  - `POST /books`: รับข้อมูลหนังสือใหม่ในรูปแบบ JSON (`{ "title": "...", "author": "..." }`), เพิ่มลงในระบบ, และตอบกลับข้อมูลหนังสือที่สร้างสำเร็จ (พร้อม `id` ใหม่)

- **Data Persistence:**
  - ข้อมูลหนังสือทั้งหมดต้องถูก **บันทึกลงในไฟล์** (เช่น `data/books.json`)
  - เมื่อปิดและเปิดเซิร์ฟเวอร์ใหม่ ข้อมูลที่เคยเพิ่มไว้ **ต้องไม่หายไป**

## Error Handling & Validation (การจัดการข้อผิดพลาด)

- **Input Validation:**
  - `title` และ `author` ที่ส่งเข้ามาใน `POST /books` ต้องเป็น String และห้ามเว้นว่าง
  - หากข้อมูลไม่ถูกต้อง, ต้องตอบกลับด้วย `Status 400 Bad Request` พร้อมข้อความอธิบายที่ชัดเจน

- **Robustness:**
  - เซิร์ฟเวอร์ต้องไม่ Crash เมื่อได้รับ Input แปลกๆ หรือ JSON ที่ผิดรูปแบบ

- **Logging:**
  - ทุกๆ Request ที่เข้ามาต้องมีการบันทึก Log (เช่น Method, Path, Status Code)
  - ควรมี `requestId` ในแต่ละ Log เพื่อให้ง่ายต่อการติดตาม

## Going the Extra Mile (ทำได้ให้ 10/10!)

อยากท้าทายตัวเองเพิ่ม? ลองทำฟีเจอร์เหล่านี้:
- `GET /books?limit=...`: เพิ่มความสามารถในการจำกัดจำนวนผลลัพธ์
- `GET /books?search=...`: เพิ่มความสามารถในการค้นหาหนังสือจากชื่อหรือผู้แต่ง
- `GET /books/:id`: สร้าง Endpoint สำหรับดึงข้อมูลหนังสือแค่เล่มเดียว (ท้าทาย: คุณต้อง parse `id` จาก URL path ด้วยตัวเอง!)
- `DELETE /books/:id`: สร้าง Endpoint สำหรับลบหนังสือ
- **Payload Size Limit:** ป้องกันการส่งข้อมูลขนาดใหญ่เกินไปใน `POST /books` (ตอบกลับด้วย `Status 413 Payload Too Large`)

## Code Quality Checklist (เกณฑ์การตรวจ)

- **Project Structure:** โค้ดมีการแบ่งสัดส่วนอย่างชัดเจนหรือไม่? (เช่น `routes`, `handlers`, `repositories`, `utils`)
- **Consistency:** รูปแบบของ JSON Response (`ok`, `data`, `error`) เหมือนกันทุก Endpoint หรือไม่?
- **Readability:** โค้ดอ่านง่าย, มีการตั้งชื่อตัวแปรและฟังก์ชันที่สื่อความหมายหรือไม่?
- **Git History:** มีการ Commit งานอย่างสม่ำเสมอและมีข้อความ Commit ที่ดีหรือไม่? (เช่น `feat: add POST /books endpoint`)

## สิ่งที่ต้องส่งท้ายวัน

- **GitHub Repository** ที่พร้อมสำหรับให้คนอื่น Clone ไปรันต่อได้
- ใน Repository ต้องมีไฟล์ **`README.md`** ที่อธิบาย:
  - วิธีการติดตั้งและรันโปรเจกต์ (`npm install`, `npm run dev`)
  - รายชื่อ API Endpoints ทั้งหมดที่มี
  - ตัวอย่างการเรียกใช้งานด้วย `curl` อย่างน้อย 2-3 คำสั่ง (สำหรับ `GET` และ `POST`)

---

## Suggested Milestones (ช่วยจัดลำดับงาน)

1. **M1: Server up** — `GET /health` ทำงาน + มี logger
2. **M2: Read** — `GET /books` อ่านจากไฟล์ `data/books.json`
3. **M3: Create** — `POST /books` (validation + error handling) และเขียนกลับไฟล์
4. **M4: Polish** — response format consistent + 404/405 ถูกต้อง
5. **M5 (Optional)** — `GET /books/:id`, `DELETE /books/:id`, search/limit, payload limit

## Acceptance Tests (copy/paste)

```bash
curl -i http://localhost:3000/health
curl -i http://localhost:3000/books
curl -i -X POST http://localhost:3000/books -H "Content-Type: application/json" -d '{"title":"Clean Code","author":"Robert C. Martin"}'
curl -i -X POST http://localhost:3000/books -H "Content-Type: application/json" -d '{"title":'
```

## Demo Checklist (ตอนนำเสนอ/ตรวจงาน)

- โชว์ว่า `npm install` + `npm run dev` รันได้จริง
- เรียก `GET /books` ก่อนสร้าง → สร้างด้วย `POST` → เรียก `GET /books` อีกครั้งเห็นรายการเพิ่ม
- restart server → ข้อมูลยังอยู่
