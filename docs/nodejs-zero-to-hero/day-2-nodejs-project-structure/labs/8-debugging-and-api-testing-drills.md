---
id: day-2-lab-8-debugging-and-api-testing-drills
title: 'Lab 8 (Optional): Debugging & API Testing Drills'
sidebar_label: '8. Debugging Drills'
---

**เป้าหมาย:** ฝึก “แก้ปัญหาแบบเป็นระบบ” และสร้าง checklist การทดสอบ API ที่ใช้ได้จริงในงาน

> Timebox แนะนำ: 30–60 นาที (เลือกทำตามเวลา)

## 8.1 API Smoke Test Checklist (ทำทุกครั้งก่อนส่งงาน)

1. `GET /health` → `200`
2. `GET /books` → `200` และได้ JSON
3. `POST /books` (valid) → `201`
4. `POST /books` (invalid JSON) → `400` และ server ไม่ crash
5. `POST /books` (missing fields) → `400` แบบบอกชัดว่าขาดอะไร
6. Restart server → `GET /books` ยังเห็นข้อมูลเดิม

## 8.2 ชุดเคสจำลอง (ให้ผู้เรียนสุ่มจับ)

> เป้าคือ “อ่าน error → ตั้งสมมติฐาน → log เพื่อพิสูจน์ → แก้ → ยืนยันด้วย test”

### Case A: `EADDRINUSE`
- อาการ: รันแล้วขึ้น `address already in use`
- เป้าหมาย: แก้โดยไม่แก้โค้ดมั่ว (หา process/เปลี่ยน PORT ผ่าน `.env`)

### Case B: JSON parse crash
- อาการ: `POST` แล้ว server crash เพราะ `JSON.parse`
- เป้าหมาย: ทำให้ตอบ `400 INVALID_JSON` และ server ยังรับ request ต่อได้

### Case C: Routing ผิดเพราะ query string
- อาการ: `GET /books?limit=1` กลายเป็น 404
- เป้าหมาย: ใช้ `new URL(req.url, ...)` แล้วเช็ก `pathname` แทน `req.url`

### Case D: Persistence bug
- อาการ: `POST` สำเร็จ แต่ restart แล้วข้อมูลหาย
- เป้าหมาย: ตรวจ “เขียนไฟล์จริงไหม”, “พาธถูกไหม”, “เขียนทับหรือ append?”

## 8.3 ชุดคำสั่ง `curl` (พร้อม copy/paste)

```bash
curl -i http://localhost:3000/health
curl -i http://localhost:3000/books
curl -i -X POST http://localhost:3000/books -H "Content-Type: application/json" -d '{"title":"TDD","author":"Kent Beck"}'
curl -i -X POST http://localhost:3000/books -H "Content-Type: application/json" -d '{"title":'
curl -i -X POST http://localhost:3000/books -H "Content-Type: text/plain" -d 'hello'
```
