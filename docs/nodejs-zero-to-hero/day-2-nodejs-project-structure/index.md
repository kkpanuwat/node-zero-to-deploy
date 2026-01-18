---
id: day-2-nodejs-project-structure
title: 'Day 2: Full-Day Workshop - Building a Node.js API'
sidebar_label: 'Day 2: Project Structure'
description: 'เวิร์คช็อป 8 ชั่วโมงเต็ม: สร้าง API Server แรกของคุณด้วย Node.js ตั้งแต่พื้นฐาน, การจัดการโปรเจกต์, Routing, Persistence, จนถึงการ Refactor โค้ดอย่างมืออาชีพ'
---

# Day 2: Full-Day Workshop - Building a Node.js API

ยินดีต้อนรับสู่ Day 2! วันนี้ไม่ใช่แค่การเรียนรู้ แต่เป็น Workshop เต็มวัน ที่เราจะเปลี่ยนโฟลเดอร์ว่างๆ ให้กลายเป็น API Server ที่ทำงานได้จริงและมีโครงสร้างที่แข็งแรง เราจะลงลึกในทุกขั้นตอน ตั้งแต่การตั้งค่าโปรเจกต์, การสร้างเซิร์ฟเวอร์, การจัดการข้อมูล, ไปจนถึงการจัดระเบียบโค้ดเพื่อเตรียมพร้อมสำหรับโลกการทำงานจริง

## เส้นทางการเรียนรู้ใน Workshop นี้

เอกสารหลักสำหรับวันนี้คือ **[Hands-on Labs](./hands-on-labs.md)** ซึ่งจะนำทางคุณไปทีละชั่วโมง หากคุณต้องการทบทวนแนวคิดทฤษฎี สามารถย้อนกลับมาอ่าน **[Core Concepts](./core-concepts.md)** หรือเมื่อเจอปัญหาก็สามารถใช้ **[Debugging Checklist](./debugging-checklist.md)** เป็นตัวช่วยได้

##เป้าหมายหลักของวันนี้ (Learning Outcomes)

เมื่อจบ Workshop 8 ชั่วโมงนี้ คุณจะสามารถ:

- **สร้างและกำหนดค่าโปรเจกต์ Node.js** ด้วย `npm` และ `git` ได้อย่างถูกต้อง
- **สร้าง HTTP Server** ด้วย `http` module และเข้าใจการทำงานของ `request` และ `response`
- **พัฒนาระบบการทำงานอย่างมืออาชีพ** โดยใช้ `nodemon` และจัดการ Environment Variables ผ่าน `.env`
- **จัดการ Routing และ Response** ได้อย่างมีประสิทธิภาพ รวมถึงการจัดการ Query String และ HTTP Status Code
- **รับและประมวลผลข้อมูลจาก Client (`POST` request)** พร้อมกับการตรวจสอบความถูกต้องของข้อมูล (Validation)
- **ทำให้ข้อมูลคงอยู่ (Persistence)** โดยการอ่านและเขียนข้อมูลลงไฟล์ JSON ด้วย `fs` module
- **Refactor โค้ด** จากไฟล์เดียวให้มีโครงสร้างที่เป็นระบบ (Handlers, Routes, Repositories, Utils)
- **สร้างและใช้งาน Logger** ที่มีประสิทธิภาพเพื่อช่วยในการดีบัก

## Workshop Agenda (8 ชั่วโมง)

- **ชั่วโมงที่ 1: Project Foundation**
  - สร้างโปรเจกต์, `package.json`, และ `git`. วางโครงสร้างโฟลเดอร์ `src`, `data`, `utils`.
- **ชั่วโมงที่ 2: Your First HTTP Server**
  - สร้างเซิร์ฟเวอร์แรกที่ตอบ "Hello World", พร้อมกับ Endpoint `/health` และ `/books`.
- **ชั่วโมงที่ 3: Professional Workflow**
  - เพิ่ม `nodemon` เพื่อการพัฒนาที่รวดเร็ว และตั้งค่า `PORT` ผ่าน `.env` file.
- **ชั่วโมงที่ 4: Intelligent Routing & Responses**
  - พัฒนาการจัดการ URL ให้รองรับ Query String, สร้าง Response Helpers, และจัดการ `404`/`405` errors.
- **ชั่วโมงที่ 5: Handling User Input (`POST`)**
  - เรียนรู้วิธีอ่าน Request Body, ตรวจสอบข้อมูล (Validate), และสร้าง Endpoint `POST /books`.
- **ชั่วโมงที่ 6: Making Data Persistent**
  - เปลี่ยนจากการเก็บข้อมูลใน Memory มาเป็นการอ่าน/เขียนลงไฟล์ `books.json` ผ่าน Repository Pattern.
- **ชั่วโมงที่ 7: Large-Scale Refactoring**
  - จัดระเบียบโค้ดครั้งใหญ่! แยก `server.js` ออกเป็น `handlers`, `routes`, และ `utils`.
- **ชั่วโมงที่ 8: Advanced Logging & Final Review**
  - อัปเกรด Logger ให้มี `level` และ `requestId`, ทำการทดสอบระบบทั้งหมด และเตรียมตัวสำหรับ Mini Project.

## เอกสารประกอบ

- **Part 1** — [Core Concepts](./core-concepts.md): สรุปแนวคิดทฤษฎี Node.js, npm, และโครงสร้างโปรเจกต์
- **Part 2** — [HTTP Routing & Response](./http-routing.md): เจาะลึกเรื่องการจัดการ URL, Status Codes, และ Response Design
- **Part 3** — [Debugging Checklist](./debugging-checklist.md): คู่มือ "ปฐมพยาบาล" เมื่อโค้ดของคุณเกิดปัญหา
- **Part 4** — **[Hands-on Labs (8-Hour Workshop)](./hands-on-labs.md)**: **เอกสารหลักสำหรับลงมือทำวันนี้**
- **Part 5** — [Mini Project](./mini-project.md): โปรเจกต์ท้าทายความเข้าใจส่งท้ายวัน