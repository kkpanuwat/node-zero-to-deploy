---
id: day-2-mini-project
title: 'Day 2: Mini Project'
sidebar_label: 'Mini Project'
description: "งานท้ายวัน: สร้าง Library System Server แบบไม่ใช้ Express ที่มี GET/POST, validation, persistence, และโครงสร้างโปรเจกต์ที่อ่านง่าย"
---

# Part 5 — Mini Project (ท้ายวัน)

## เป้าหมาย

ทำ “Library System Server” แบบไม่ใช้ Express ให้รันได้ด้วย `npm run dev` และผ่าน checklist ด้านล่าง

## Requirements (ขั้นต่ำ)

- Server:
  - `GET /health` → `{ ok: true }`
  - `GET /books` → คืนรายการหนังสือ
  - `POST /books` → เพิ่มหนังสือ (รับ JSON) และคืนหนังสือที่สร้างสำเร็จ
- Validation:
  - `title` ต้องเป็น string และห้ามว่าง
  - `author` ต้องเป็น string และห้ามว่าง
  - ถ้าไม่ผ่านให้ตอบ `400` พร้อม error code
- Persistence:
  - เก็บข้อมูลลงไฟล์ JSON (เช่น `data/books.json`)
  - ปิดโปรแกรมแล้วเปิดใหม่ ข้อมูลต้องยังอยู่
- Config:
  - อ่าน `PORT` จาก `.env` (มี `.env.example`)
- Logging:
  - log ทุก request พร้อม request id
  - มีระดับ `info/warn/error`

## Stretch Goals (ทำเพิ่มเพื่อเติมเวลา/ความท้าทาย)

- `GET /books?limit=...` และ `GET /books?search=...`
- `GET /books/:id` (ลองทำเองแบบ manual parsing path)
- กัน `POST` body ใหญ่เกิน (ตอบ `413 Payload Too Large`)
- เพิ่ม `DELETE /books/:id` (ทำแบบง่าย)
- เพิ่ม `npm run lint` (ถ้าอยากเริ่มวินัยทีม)

## Rubric (ใช้รีวิวโค้ด)

- โครงสร้างโฟลเดอร์ชัดเจน (entrypoint / handlers / data / utils)
- response format สม่ำเสมอทั้งโปรเจกต์
- error handling ชัดเจน ไม่ crash ด้วย input แปลก ๆ
- มี commit แยกเป็นช่วง (setup → routes → persistence → polish)

## สิ่งที่ควรส่งท้ายวัน

- repo ที่รันได้จากศูนย์ด้วย:
  - `npm install`
  - `npm run dev`
- README สั้น ๆ:
  - วิธีรัน
  - endpoints
  - ตัวอย่าง `curl` อย่างน้อย 2 คำสั่ง
