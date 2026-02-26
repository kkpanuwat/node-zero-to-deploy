---
id: nodejs-zero-to-hero
title: KKU Library (Express.js + Next.js + GraphQL + PostgreSQL)
sidebar_position: 2
---

# KKU Library (Express.js + Next.js + GraphQL + PostgreSQL)

> คอร์สนี้โฟกัส “สร้างระบบ KKU Library” แบบ Full‑stack โดยสอนเฉพาะสิ่งที่จำเป็น: **Git**, **Express.js**, **GraphQL**, **Next.js**, และ **Docker (สำหรับรัน DB)**

เป้าหมายคือทำระบบห้องสมุดที่มีทั้ง **Backend API** และ **Frontend** เชื่อมกับฐานข้อมูลจริง (รันผ่าน Docker) พร้อม workflow ทำงานแบบทีมด้วย Git/GitHub

## สิ่งที่เราจะสร้าง (Final Project)
- ระบบ **KKU Library** สำหรับจัดการข้อมูล “หนังสือ” (CRUD)
- Backend: **Express.js + GraphQL** (ออกแบบ schema, query, mutation)
- Frontend: **Next.js**
- Database: **PostgreSQL** รันด้วย **Docker Compose**
- Version control: ใช้ **Git/GitHub**

## Tech Stack
- **Git/GitHub**: version control + teamwork
- **Express.js**: ทำ API server
- **GraphQL**: ออกแบบ API แบบ schema-first (Query/Mutation)
- **Next.js**: ทำเว็บ (React framework)
- **PostgreSQL**: ฐานข้อมูลหลัก
- **Docker / Docker Compose**: รัน DB แบบ reproducible

## สิ่งที่ผู้เรียนควรทำได้หลังจบ
- ใช้ Git: branch และ push ขึ้น GitHub ได้
- รัน PostgreSQL ด้วย Docker Compose
- ออกแบบ Database พื้นฐานได้
- สร้าง Next.js UI ได้

## Roadmap (สรุปเนื้อหา)

1) **Git Basics + GitHub**
   - สมัคร/ล็อกอิน GitHub, ทำ repo แรก, commit/branch เบื้องต้น
2) **Docker Compose สำหรับ DB**
   - รัน PostgreSQL ด้วย Docker, ตั้งค่า env volume/port
3) **Express.js API**

4) **Next.js Frontend**
   - ทำหน้าจอจัดการหนังสือ
5) **เชื่อมระบบ + สรุปงาน**
   - เชื่อม end-to-end, ทำ README

> หมายเหตุ: ในคอร์สนี้ “Docker” ใช้หลัก ๆ เพื่อ **รันฐานข้อมูล** ให้ทุกคนได้ environment เดียวกัน
