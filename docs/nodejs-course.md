---
id: nodejs-course
title: Node.js Zero to Deploy
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Node.js: Zero to Deploy

> ระยะเวลาอบรม: **5 สัปดาห์**  
> วันเรียนต่อสัปดาห์: **2 วัน**  
> ระยะเวลาเรียนต่อวัน: **7 ชั่วโมง**  
> เหมาะสำหรับ: ผู้ที่ไม่เคยเขียนโค้ดมาก่อน หรือผู้ทำงานสายอื่นที่อยากเข้าใจพื้นฐาน Backend

---

## 🗓️ ภาพรวมคอร์ส

| สัปดาห์ | หัวข้อหลัก | ผลลัพธ์ / สิ่งที่ได้ |
|----------|--------------|----------------------|
| **Week 1** | พื้นฐาน JavaScript & Node.js | เข้าใจ syntax, runtime, และ environment |
| **Week 2** | เริ่มต้นกับ Express.js | สร้าง RESTful API แรก |
| **Week 3** | Database & Authentication | ใช้ MongoDB และทำระบบ login/signup |
| **Week 4** | Project Workshop & Middleware | สร้างระบบจริง มี middleware, file upload |
| **Week 5** | Deploy & Final Project | Deploy ขึ้น cloud, สรุป & present project |


## 📚 รายละเอียดรายสัปดาห์

<Tabs>
<TabItem value="week1" label="สัปดาห์ที่ 1">

## JavaScript Essentials & Node.js Fundamentals
---
### Day 1
#### JavaScript for Absolute Beginners
- แนะนำแนวคิดการเขียนโปรแกรม (Input / Process / Output)
- Variables, Data Types, Operators
- Control Flow (if, loop, switch)
- Functions, Scope, Arrow Functions
- Array & Object
- Workshop: Mini Calculator CLI (Command Line)

### Day 2
#### Getting Started with Node.js
- ทำความเข้าใจ Node.js คืออะไร (Runtime vs Browser)
- การใช้ npm, package.json, และโมดูล
- File System (fs), Path, และ Environment Variables
- Workshop: สร้าง CLI App อ่าน/เขียนไฟล์ JSON
</TabItem>

<TabItem value="week2" label="สัปดาห์ที่ 2">

## Build Your First Web Server
---
### Day 3
#### Web Server & Express Basics

- HTTP, Request, Response, Status Codes
- การสร้าง server ด้วย http module
- แนะนำ Express.js
- Routing, Query Params, Body, Static Files
- Workshop: “Simple Notes API”

### Day 4
#### REST API & CRUD

- RESTful API คืออะไร
- ใช้ Postman ทดสอบ API
- CRUD Operations (GET, POST, PUT, DELETE)
- การจัดโครงสร้างโค้ด (Routes, Controllers)
- Workshop: “Todo List API”

</TabItem>

<TabItem value="week3" label="สัปดาห์ที่ 3">

## Database & Authentication
---
### Day 5
#### MongoDB with Node.js

- แนะนำ NoSQL vs SQL
- MongoDB และ Mongoose
- Schema & Model
- CRUD กับ Database
- Workshop: “Product Catalog API”

### Day 6
#### Authentication & Security

- การเข้ารหัสรหัสผ่าน (bcrypt)
- JWT (JSON Web Token) Authentication
- Middleware for Auth
- Error Handling
- Workshop: “User Login API + Protected Routes”

</TabItem>

<TabItem value="week4" label="สัปดาห์ที่ 4">

## Project Workshop & Advanced Features
---
### Day 7
#### Middleware & Uploads

- Custom Middleware
- File Upload (multer)
- Validation (Joi / Validator)
- Logging และ Error Handling
- Workshop: “Image Upload API”

### Day 8
#### Mini Project Development

- เริ่มต้นวางโครงสร้างและออกแบบ API
- เลือกโจทย์ เช่น
  - Book Store API
  - Movie Review API
  - Expense Tracker

</TabItem>

<TabItem value="week5" label="สัปดาห์ที่ 5">

## Deploy & Presentation
---
### Day 9
#### Deploy & Tools

- Git & GitHub พื้นฐาน
- .env และ config management
- Deploy ด้วย Vercel
- CI/CD เบื้องต้น
- Workshop: “Deploy My API to Cloud”

### Day 10
#### Final Project & Demo Day

- เขียน README & Documentation
- Present โปรเจกต์หน้าชั้นเรียน
- Q&A + สรุปเส้นทางต่อยอด (Next.js, NestJS, Docker, etc.)

</TabItem>

</Tabs>

---

## 💡 Final Project
> พัฒนา REST API สำหรับระบบ Book Store API, Movie Review API, Expense Tracker
> ใช้ Express + MongoDB  
> Deploy Vercel

---

## Tools
- Node.js LTS
- VS Code
- Git
- Postman