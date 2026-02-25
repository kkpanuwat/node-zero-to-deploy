---
id: day-3-debugging-checklist
title: 'Day 3: Debugging Checklist'
sidebar_label: 'Debugging Checklist'
description: 'รวมปัญหาที่เจอบ่อยตอนเริ่ม Express และวิธีแก้แบบเร็ว'
---

# Part 4 — Debugging Checklist (Express)

## Server ไม่รัน / รันแล้วเด้ง

- เช็กว่ามี error ใน terminal ไหม (อ่านบรรทัดบนสุดก่อน)
- เช็กว่าไฟล์ที่รันถูกไหม: `node src/index.js`
- เช็กว่า port ถูกใช้อยู่ไหม (ลองเปลี่ยนเป็น 4001 ชั่วคราว)

## เปิด URL แล้ว 404

- เช็ก path ให้ตรง: `/api/books` vs `/api/books/`
- ถ้าใช้ `app.use("/api/books", router)` แล้วใน router ต้องเป็น `router.get("/", ...)`

## `req.body` เป็น `undefined`

- ต้องมี `app.use(express.json())` ก่อน routes
- ต้องส่ง header `Content-Type: application/json`

## Route params / query ไม่ได้ตามที่คิด

- `req.params` มาจาก `:id` ใน path เท่านั้น
- `req.query` มาจาก `?a=1&b=2` เท่านั้น
- `req.params.id` เป็น string เสมอ → แปลงและเช็ก `Number.isNaN(...)`

## แก้ไฟล์แล้ว server ไม่รีสตาร์ท

- ถ้าใช้ `node` ปกติ ต้องกด `Ctrl + C` แล้วรันใหม่
- แนะนำติดตั้ง `nodemon` แล้วใช้ `npm run dev`

## ทำไมเรียก `/api/books/:id` แล้วได้ 404 ทั้งที่มี route

- ถ้า mount ด้วย `app.use("/api/books", router)` ใน router ต้องเป็น `router.get("/:id", ...)` ไม่ใช่ `router.get("/api/books/:id", ...)`
