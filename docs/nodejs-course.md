---
id: nodejs-course
title: Node.js Zero to Deploy
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Node.js: Zero to Deploy

> ระยะเวลาอบรม: **5 สัปดาห์** (รวม 10 วันเรียน)  
> เหมาะสำหรับ: ผู้เริ่มต้น/สาย non-degree ที่อยากทำ Backend และระบบร้านอาหารจริง

โครงสร้างแบ่งเป็น Module/Chapter ไล่จาก JS พื้นฐาน → สร้าง Web Server → เชื่อม DB → Auth → ทำระบบร้านอาหารครบวงจร

---

## 🗓️ Roadmap รายสัปดาห์

| สัปดาห์ | Day | Module | เนื้อหา | Lab / Workshop (ต่อยอดระบบร้านอาหาร) |
|---------|-----|--------|---------|-----------------------------------------|
| **Week 1** | Day 1 | 1.1 JS Basics | Variables, Data types, Functions (normal/arrow), Object/Array, Loop/Condition, Scope/Hoisting | Mini Lab: จัดการเมนูอาหารใน Array (add/update/remove/search) |
|  | Day 2 | 2.1 Node.js 101 / 2.2 Tools / 2.3 โปรเจกต์แรก | Node คืออะไร, Event Loop, Non-blocking I/O, console.log debug, ติดตั้ง NVM, npm/npx, package.json, npm init, nodemon, Hello Server | Lab: สร้าง Web Server ง่าย ๆ สำหรับร้านอาหาร (`/`, `/about`, `/status`) |
| **Week 2** | Day 3 | 3 Express Core | express(), routing, middleware, req/res, โครงสร้างโปรเจกต์ (routes/controllers/public/views) | Lab: หน้าเว็บร้านอาหารด้วย Express + EJS (Home, Menu จาก mock array, Contact) |
|  | Day 4 | 4 Form & Template | รับข้อมูลจาก form (POST, req.body), validation ง่าย ๆ, Layout & Partial (header/footer) | Lab: ระบบเพิ่มเมนูอาหาร (ยังไม่ใช้ DB) ฟอร์ม `/menus/new` → POST ลง array แล้ว render |
| **Week 3** | Day 5 | 5 Database Basics & Connect | SQL พื้นฐาน, PK/FK, CRUD, Prisma + SQLite, สร้าง model (Menu, Category, Order, OrderItem) | Lab: ย้ายเมนูจาก array → Prisma DB, migrate, ปรับหน้าเว็บให้ดึงจาก DB |
|  | Day 6 | 6 Basic Authentication | Register, Login, hash (bcrypt), session-based auth, login-check middleware | Lab: ระบบหลังร้าน (Admin Dashboard) มี Login + session, หน้า admin/manage-menus |
| **Week 4** | Day 7 | 7 Order System | หน้า Order เลือกเมนู/จำนวน, คำนวณราคารวม, บันทึก order/order_items | Lab: ระบบสั่งอาหารหน้าเว็บร้าน → บันทึก DB + แสดงใบเสร็จ |
|  | Day 8 | 8 Upload & Search | Multer upload รูปอาหาร, เก็บที่ `/public/uploads`, Search + Pagination (limit/offset) | Lab: เพิ่มเมนูพร้อมรูปภาพ + ค้นหา/กรองเมนู |
| **Week 5** | Day 9 | 9 Mini Project Sprint | วางแผน/แบ่งงาน/เริ่มทำโปรเจกต์ของตัวเอง (คาเฟ่/ร้านอาหาร/ออร์เดอร์เดลิเวอรี) | ทำโปรเจกต์จริง มีเมนู+ออร์เดอร์+อัปโหลด/ค้นหา |
|  | Day 10 | 10 Presentation Day | Present, Demo, README, Flow การสั่งอาหาร, จุดที่ภูมิใจ | เดโมโปรเจกต์ครบวงจร (Frontend template + Backend API + DB) |

---

## 🧭 Module / Chapter Breakdown

- **Module 1.1 — JS Basics (Chapter 1-6 ใน Labs)**
  - Variables (let/const), Data Types, Functions (normal/arrow), Object/Array, Loop/Condition, Scope/Hoisting
  - Lab ต่อเนื่อง: เมนูอาหารใน array → เตรียม data ที่จะใช้ในงาน Node จริง

- **Module 1.2 — Modern JS**
  - Destructure, Spread/Rest, Template literals, Async/await เบื้องต้น
  - ใช้กับเมนูอาหารเดิมเพื่อปรับโค้ดให้สั้นและอ่านง่าย

- **Module 2.x — Node.js & Environment**
  - Node คืออะไร, Event Loop (ภาพรวม), Non-blocking I/O
  - ติดตั้ง NVM, npm/npx, package.json, เริ่มโปรเจกต์แรกด้วย nodemon + Hello Server

- **Module 3-4 — Express.js Core + Form/Template**
  - express(), routing, middleware, req/res, โครงสร้างโปรเจกต์ (routes/controllers/public/views/assets)
  - EJS view engine, layout/partial, รับ form (POST), validation ง่าย ๆ
  - Lab: หน้า Home/Menu/Contact, ฟอร์มเพิ่มเมนู (ยังไม่ใช้ DB)

- **Module 5 — Database (Prisma + SQLite)**
  - SQL เบื้องต้น, PK/FK, CRUD
  - Prisma init, schema, migrate, ดึงข้อมูลเมนูจาก DB แทน array

- **Module 6 — Basic Auth (Session-based)**
  - Register/Login, hash ด้วย bcrypt, session middleware, protected routes (admin)

- **Module 7 — Order System**
  - หน้า Order เลือกเมนู/จำนวน, คำนวณราคารวม, บันทึก order/order_items

- **Module 8 — Upload & Search**
  - Multer upload รูปอาหาร, list เมนูพร้อมภาพ, search + pagination

- **Module 9-10 — Mini Project & Presentation**
  - ทำโปรเจกต์ของตัวเอง (ต่อยอดจากร้านอาหาร) แล้ว present

---

## ✅ Workshop Flow (เชื่อมโยงกัน)
1) Day 1: จัดการเมนูด้วย Array (เพิ่ม/แก้/ลบ/ค้นหา) → รู้จัก JS พื้นฐาน  
2) Day 2: Web Server Node พื้นฐาน (`/`, `/about`, `/status`) → deploy logic เข้า server  
3) Day 3-4: Express + EJS + Form → สร้างหน้าเว็บร้านอาหารที่เพิ่มเมนูได้ (ยังเป็น array)  
4) Day 5: ย้ายข้อมูลเมนูไป SQLite ผ่าน Prisma → หน้าเว็บดึงจริงจาก DB  
5) Day 6: ใส่ Login + session → admin/manage-menus ต้องล็อกอิน  
6) Day 7: ระบบสั่งอาหาร บันทึก order/order_items + ใบเสร็จ  
7) Day 8: อัปโหลดรูป, search, pagination → ร้านอาหารสมบูรณ์ขึ้น  
8) Day 9-10: Mini Project + Present → ต่อเติมหรือสร้างโจทย์ใหม่ตามถนัด

---

## Tools ใช้ระหว่างคอร์ส
- Node.js LTS, NVM
- VS Code
- npm/npx, nodemon
- Express.js, EJS
- Prisma + SQLite
- Multer (upload), bcrypt (hash), express-session
- Git/GitHub (สำหรับ version control)
