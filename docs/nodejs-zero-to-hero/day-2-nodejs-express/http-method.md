---
id: day-2-http-method
title: 'HTTP Method & HTTP Status'
sidebar_label: 'HTTP Method & HTTP Status'
---

HTTP Method ทำหน้าที่บอกว่า client ต้องการให้ server **ทำอะไรกับ resource** นั้น ๆ เช่น ดูข้อมูล, สร้างข้อมูลใหม่, แก้ไข, ลบ

---

## ตาราง HTTP Method ที่ใช้บ่อย

| Method | ใช้ทำอะไร | Body | ตัวอย่าง |
|---|---|---|---|
| `GET` | ขอ “อ่าน/ดึง” ข้อมูล | - | `GET /books` |
| `POST` | “สร้าง” ข้อมูลใหม่ หรือสั่งทำงาน | ส่งได้ | `POST /books` |
| `PUT` | “แทนที่” resource ทั้งก้อน (replace) | ส่งได้ | `PUT /books/123` |
| `PATCH` | “แก้บางส่วน” (partial update) | ส่งได้ | `PATCH /books/123` |
| `DELETE` | “ลบ” resource | โดยทั่วไปไม่ใช้ | `DELETE /books/123` |

---

## ตัวอย่างการออกแบบ REST

resource คือ “หนังสือ (books)”

- `GET /books` → ดึงรายการหนังสือ
- `GET /books/:id` → ดึงหนังสือ 1 เล่ม
- `POST /books` → สร้างหนังสือใหม่
- `PUT /books/:id` → แทนที่ข้อมูลทั้งก้อนของหนังสือ
- `PATCH /books/:id` → แก้เฉพาะบางฟิลด์ของหนังสือ
- `DELETE /books/:id` → ลบหนังสือ

---

## ทำไมต้องแยก `PUT` กับ `PATCH`

- `PUT` = “ส่งทั้งก้อน” แล้วแทนที่ของเดิม (เหมือน save ทั้งฟอร์ม)
- `PATCH` = “ส่งเฉพาะที่เปลี่ยน” (เหมือนแก้แค่ช่องเดียว)

---

## HTTP Status Code (สรุปที่ใช้บ่อย)

HTTP Status Code คือ “ผลลัพธ์” ของ request ว่าสำเร็จไหม/ผิดพลาดอะไร โดยแบ่งเป็นกลุ่มหลัก ๆ:

- `2xx` สำเร็จ
- `3xx` Redirect (ให้ไปที่อื่น)
- `4xx` Client error (ส่งมาไม่ถูก/ไม่มีสิทธิ์/หาไม่เจอ)
- `5xx` Server error (ฝั่ง server พัง/ทำงานไม่สำเร็จ)

### ตาราง Status

| Status | ความหมาย | ใช้เมื่อ |
|---|---|---|
| `200 OK` | สำเร็จ | `GET` สำเร็จ หรือ request สำเร็จและมีข้อมูลตอบกลับ |
| `201 Created` | สร้างสำเร็จ | `POST` สร้าง resource ใหม่สำเร็จ |
| `204 No Content` | สำเร็จแต่ไม่มี body | `DELETE` สำเร็จ |
| `400 Bad Request` | request ไม่ถูกต้อง | body/params ผิดรูปแบบ, parse ไม่ได้ |
| `401 Unauthorized` | ยังไม่ยืนยันตัวตน | ต้อง login/ต้องมี token แต่ไม่ได้ส่งมา |
| `403 Forbidden` | ไม่มีสิทธิ์ | ยืนยันตัวตนแล้ว แต่ permission ไม่พอ |
| `404 Not Found` | หาไม่เจอ | route ไม่ตรง หรือ id ไม่มีในระบบ |
| `409 Conflict` | ข้อมูลซ้ำ | สร้างข้อมูลซ้ำ เช่น email ซ้ำ |
| `415 Unsupported Media Type` | Content-Type ไม่รองรับ | server รับ JSON แต่ client ส่งอย่างอื่น |
| `422 Unprocessable Entity` | ไม่ผ่าน validation | ข้อมูลไม่ผ่านการ validate |
| `500 Internal Server Error` | server พัง | error ที่ไม่ได้ handle/exception |
