---
id: nodejs-zero-to-hero
title: Node.js Zero→Hero
sidebar_position: 2
---

# Node.js Zero→Hero

> หลักสูตร 10 วันนี้พาคุณสร้าง REST API + Frontend + Docker Deploy อย่างเป็นขั้นตอน ใช้เครื่องมือที่คนทำงานจริงใช้ และมีโค้ชคอยประกบตลอดเส้นทาง

ถ้าคุณเพิ่งเริ่มต้นและอยากรู้ว่าจากศูนย์จะไปถึงการสร้าง REST API + Frontend + Docker Deploy ต้องผ่านอะไรบ้าง ที่นี่คือ roadmap แบบจับต้องได้

## ตารางสรุปแต่ละวัน (Overview)

| Day | Theme | Output |
| --- | --- | --- |
| Day 1 | Intro to JS Fundamentals | ใช้ JS ตาม instructor แบบไม่งง |
| Day 2 | Node.js Core + NVM + Environment | รู้การทำงานของ Node, run script |
| Day 3 | Express.js Core | Hello Express + Routing + Middleware |
| Day 4 | Express Advance + Templates (EJS) | Render หน้าเว็บง่ายๆ ได้ |
| Day 5 | Git + GitHub Workflow | ส่งงานขึ้น GitHub ได้จริง |
| Day 6 | Docker + Database Setup | มี DB ที่รันใน Docker ของตัวเอง |
| Day 7 | SQL Basics + Connect DB via Node | อ่าน/เขียนข้อมูลจริง |
| Day 8 | KKU Movie API | CRUD API เสร็จสมบูรณ์ |
| Day 9 | KKU Movie Frontend (EJS) | เว็บ UI เชื่อมกับ API |
| Day 10 | Deploy + Final Presentation | Deploy local Docker + สรุปงาน |

## Tools ที่ใช้ตลอดคอร์ส
- **VS Code** + Extensions พื้นฐาน (ESLint, Prettier)
- **Node.js LTS** (ผ่าน NVM เพื่อสลับเวอร์ชันง่าย)
- **npm / npx / nodemon** สำหรับรันสคริปต์
- **Express.js**, **EJS**, และ **Fetch API** บนฝั่ง frontend
- **Postman** หรือ **Thunder Client** สำหรับทดสอบ API
- **MySQL** ผ่าน Docker + Adminer สำหรับดูตาราง
- **Prisma** หรือ **mysql2** (เลือกใช้ตามบทเรียน) เพื่อเชื่อม DB
- **Docker & Docker Compose** ใช้สร้าง environment และ deploy
- **Git/GitHub** สำหรับ snapshot งานและทำ teamwork

## Goal ของหลักสูตร
- เป้าหมายสุดท้ายคือระบบ **KKU Movie**: API + Frontend สำหรับจัดการหนังในคลัง
- ผู้เรียนต้องสร้าง API `/movies` (CRUD ครบ)
- Frontend ใช้ EJS + Bootstrap ให้ admin เพิ่ม/แก้/ลบหนังได้จากหน้าเว็บ
- ฝั่ง client เรียก Fetch API เพื่ออัปเดตข้อมูลแบบไม่ต้องรีเฟรชทั้งหน้า
- ข้อมูลเก็บใน MySQL (ผ่าน connection pool) และรันบน Docker Compose พร้อม Adminer
- ผู้เรียนต้องเขียน README + .env.example + สคริปต์ `npm run dev` / `npm run prod`
- วันสุดท้าย deploy stack ทั้งหมดบนเครื่องตัวเองด้วย Docker แล้วสาธิตการใช้งาน

## Module 1 — JavaScript Basics for Beginners

### ทำความรู้จักกัน
- ปูพื้น JavaScript สำหรับผู้ที่เพิ่งเริ่มต้นสาย Backend/Full-stack ตั้งแต่ศูนย์ใน 1 วันเต็ม
- ชวนผู้เรียนเช็กความคาดหวัง, แนะนำทีมโค้ช, และตั้งระบบคู่หู (buddy system) เพื่อช่วยกันฝึกคิดแบบโปรแกรมเมอร์
- ยกตัวอย่างเรื่องเล่าที่จับต้องได้ เช่น "ร้านกาแฟ KKU Café" ให้ทุกบทเรียนมีบริบทเดียวกันจนถึงวันทำ API จริง

### อธิบายโครงคอร์ส
1. **Mindset & Workflow** — อธิบาย Input → Process → Output, VS Code Basics, วิธีรันสคริปต์ผ่าน Node และ npm  
2. **Core JS Syntax** — เติมพื้นฐาน `const/let`, Primitive vs Reference, Truthy/Falsy, Template Literal, Destructuring, Spread  
3. **Functions & Modules** — เปรียบเทียบ function declaration, function expression, arrow function, default/rest parameters และการแยกไฟล์ helper  
4. **Control Flow & Data Handling** — ใช้ `if/else`, ternary, `for/of`, `while`, `Array.map/filter/reduce` กับ dataset เมนู  
5. **Scope & Debugging** — เจาะ TDZ, scope chain, Hoisting พร้อมสาธิตการใช้ Console + VS Code Debugger หยุด breakpoint  
6. **Mini Lab** — ผู้เรียนต่อยอด dataset ร้านกาแฟของตัวเอง: เพิ่มเมนู, คำนวณราคา, สร้าง utility function ที่จะนำไปใช้ใน Module ถัดไป  

> หลังจบ Module 1 ผู้เรียนจะมีโค้ดเบส JavaScript ที่สะอาด ใช้ซ้ำได้ และมั่นใจพอสำหรับเริ่ม Node.js Core ใน Module 2

### แนะนำโปรเจค Final: **KKU Movie**
- ทั้งหลักสูตรพาไปสู่การสร้างระบบ **KKU Movie**: REST API + Frontend + Docker Deploy สำหรับจัดการคลังหนัง
- โมดูลนี้เชื่อมโยงกับ Final Project ด้วยการจัดเตรียม mindset และโค้ดมาตรฐานเดียวกัน เช่น การแยก helper, การตั้งชื่อ, และการใช้ Git snapshot
- อธิบายโครงสร้างโปรเจค: `backend` (Express + Prisma/mysql2), `frontend` (EJS + Fetch API), `infrastructure` (Docker Compose + MySQL + Adminer)
- แนะนำ Milestones สำคัญที่ผู้เรียนจะเจอหลัง Module 1: สร้าง `/movies` CRUD, ทำ Validation, เชื่อมฐานข้อมูล, สร้างหน้า Admin, Deploy ใน Docker
- เน้นว่าผลงานจบคอร์สต้องมี README, `.env.example`, script `npm run dev`/`npm run prod`, พร้อมสาธิตผ่านการ Present วันสุดท้าย
