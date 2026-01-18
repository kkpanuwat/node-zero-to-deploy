---
id: day-2-debugging-checklist
title: 'Day 2: Debugging Checklist'
sidebar_label: 'Debugging Checklist'
description: วิธีอ่าน error stack trace, เช็ก port, เช็ก request/response และแก้ปัญหาพื้นฐานเวลารัน Node server ไม่ได้
---

# Part 3 — Debugging Checklist

## 0) คำถามแรกที่ต้องตอบให้ได้

- “โปรแกรมรันอยู่ไหม?” (process ยังไม่ตาย)
- “server listen ที่พอร์ตอะไร?” (ดู log)
- “เราเรียก URL ถูกไหม?” (path/method)

## 1) อ่าน stack trace แบบมีระบบ

เวลาเจอ error ให้หา 3 อย่าง:

- ข้อความ error (เช่น `EADDRINUSE`, `Cannot find module`, `Unexpected token`)
- ไฟล์ + บรรทัดแรกที่ชี้กลับมาที่โค้ดเรา
- เงื่อนไขที่ทำให้มันเกิด (เรียก endpoint ไหน ส่ง payload อะไร)

## 2) ปัญหายอดฮิต + วิธีแก้

### 2.1 `EADDRINUSE: address already in use`

ความหมาย: port ถูกใช้อยู่

วิธีแก้:

- เปลี่ยน `PORT` ใน `.env`
- หรือปิดโปรเซสที่จับพอร์ตนั้นอยู่ (เช่นปิด terminal ที่รัน `npm run dev`)

### 2.2 `Cannot find module ...`

ความหมาย: path import ผิด หรือยังไม่ install dependency

วิธีเช็ก:

- path ใน `require('./...')` ถูกไหม (จุด `./` สำคัญ)
- `package.json` มี dependency ไหม แล้ว `npm install` แล้วหรือยัง

### 2.3 เปิด `http://localhost:3000/books` แล้วได้ 404

เช็ก 3 อย่าง:

- server เริ่มรันแล้วหรือยัง (ดู log “Server running ...”)
- route match ถูกไหม (เช็ก `pathname` ไม่ใช่ `req.url` ทั้งเส้น)
- method ถูกไหม (`GET` vs `POST`)

### 2.4 ส่ง `POST` แล้ว parse JSON ไม่ได้

เช็ก:

- request header `Content-Type: application/json`
- payload เป็น JSON จริงไหม (เช่นมี trailing comma หรือ quote ไม่ครบ)

ตัวอย่างทดสอบด้วย `curl`:

```bash
curl -s -X POST http://localhost:3000/books \
  -H 'Content-Type: application/json' \
  -d '{"title":"Clean Code","author":"Robert C. Martin"}'
```

## 3) Debug แบบ “ทำให้เห็น”

- log จุดที่สำคัญ: method/path, request id, body (แต่อย่า log ความลับ)
- ลดสcope: ลองเรียก `/health` ก่อน ถ้าได้ 200 แสดงว่า server ยังโอเค
- ถ้า `/health` ได้ แต่ `/books` ไม่ได้ → ปัญหาอยู่ที่ routing/handler

## 4) Checklist ก่อนถามโค้ช

- แคป error message + stack trace
- บอก URL/method/payload ที่เรียก
- บอกสิ่งที่คาดหวัง vs สิ่งที่เกิดขึ้นจริง

> Call-to-action: ลอง “ตั้งสมมติฐาน 1 ข้อ” แล้วพิสูจน์ด้วย log 1 จุด ก่อนจะไล่แก้โค้ดไปเรื่อย ๆ

