---
id: nodejs-zero-to-hero-module-1
title: Module 1 — JavaScript Basics for Beginners
sidebar_label: Module 1 — JS Basics
slug: /nodejs-zero-to-hero/module-1
---

# Module 1: JavaScript Basics for Beginners

## ทำความรู้จักกัน
- ปูพื้น JavaScript สำหรับผู้ที่เพิ่งเริ่มต้นสาย Backend/Full-stack ตั้งแต่ศูนย์ใน 1 วันเต็ม
- ชวนผู้เรียนเช็กความคาดหวัง, แนะนำทีมโค้ช, และตั้งระบบคู่หู (buddy system) เพื่อช่วยกันฝึกคิดแบบโปรแกรมเมอร์
- ยกตัวอย่างเรื่องเล่าที่จับต้องได้ เช่น "ร้านกาแฟ KKU Café" ให้ทุกบทเรียนมีบริบทเดียวกันจนถึงวันทำ API จริง

## อธิบายโครงคอร์ส
1. **Mindset & Workflow** — อธิบาย Input → Process → Output, VS Code Basics, วิธีรันสคริปต์ผ่าน Node และ npm
2. **Core JS Syntax** — เติมพื้นฐาน `const/let`, Primitive vs Reference, Truthy/Falsy, Template Literal, Destructuring, Spread
3. **Functions & Modules** — เปรียบเทียบ function declaration, function expression, arrow function, default/rest parameters และการแยกไฟล์ helper
4. **Control Flow & Data Handling** — ใช้ `if/else`, ternary, `for/of`, `while`, `Array.map/filter/reduce` กับ dataset เมนู
5. **Scope & Debugging** — เจาะ TDZ, scope chain, Hoisting พร้อมสาธิตการใช้ Console + VS Code Debugger หยุด breakpoint
6. **Mini Lab** — ผู้เรียนต่อยอด dataset ร้านกาแฟของตัวเอง: เพิ่มเมนู, คำนวณราคา, สร้าง utility function ที่จะนำไปใช้ใน Module ถัดไป

> หลังจบ Module 1 ผู้เรียนจะมีโค้ดเบส JavaScript ที่สะอาด ใช้ซ้ำได้ และมั่นใจพอสำหรับเริ่ม Node.js Core ใน Module 2

## แนะนำโปรเจค Final: **KKU Movie**
- ทั้งหลักสูตรพาไปสู่การสร้างระบบ **KKU Movie**: REST API + Frontend + Docker Deploy สำหรับจัดการคลังหนัง
- โมดูลนี้เชื่อมโยงกับ Final Project ด้วยการจัดเตรียม mindset และโค้ดมาตรฐานเดียวกัน เช่น การแยก helper, การตั้งชื่อ, และการใช้ Git snapshot
- อธิบายโครงสร้างโปรเจค: `backend` (Express + Prisma/mysql2), `frontend` (EJS + Fetch API), `infrastructure` (Docker Compose + MySQL + Adminer)
- แนะนำ Milestones สำคัญที่ผู้เรียนจะเจอหลัง Module 1: สร้าง `/movies` CRUD, ทำ Validation, เชื่อมฐานข้อมูล, สร้างหน้า Admin, Deploy ใน Docker
- เน้นว่าผลงานจบคอร์สต้องมี README, `.env.example`, script `npm run dev`/`npm run prod`, พร้อมสาธิตผ่านการ Present วันสุดท้าย
