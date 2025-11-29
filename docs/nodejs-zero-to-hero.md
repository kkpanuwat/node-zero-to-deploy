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
