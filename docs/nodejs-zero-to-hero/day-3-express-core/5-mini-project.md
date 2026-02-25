---
id: day-3-mini-project
title: 'Day 3: Mini Project'
sidebar_label: 'Mini Project'
description: 'รวมงานวันนี้ให้เป็น Express API ที่พร้อมต่อยอด CRUD'
---

# Part 5 — Mini Project: “Library API v1” แบบพร้อมต่อยอด

## เป้าหมาย

ทำให้โปรเจกต์มี endpoint ต่อไปนี้และโครงสร้างชัดเจน:
- `GET /api/health`
- `GET /api/books`
 - `GET /api/books/:id`

และมีมาตรฐานขั้นต่ำ:
- มี request logging
- response รูปแบบ consistent
- แยก `routes/` และ `controllers/`
- มี status code ถูกต้องสำหรับ 400/404
- มี 404 handler (route ไม่พบ)

## Acceptance Checklist

- เปิด `http://localhost:4000/api/health` แล้วได้ `{ ok: true, ... }` (200)
- เปิด `http://localhost:4000/api/books` แล้วได้ `{ ok: true, data: { total, books } }` (200)
- เปิด `http://localhost:4000/api/books/1` แล้วได้ `{ ok: true, data: { book } }` (200)
- เปิด `http://localhost:4000/api/books/9999` แล้วได้ `{ ok: false, error: ... }` (404)
- เปิด `http://localhost:4000/api/books/not-a-number` แล้วได้ `{ ok: false, error: ... }` (400)
- โค้ดไม่ยาวกองอยู่ในไฟล์เดียว
