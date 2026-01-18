---
id: day-2-nodejs-project-structure
title: 'Day 2: Node.js + Project Structure'
sidebar_label: 'Day 2: Project Structure'
description: เรียนรู้การจัดโครงสร้างโปรเจกต์ Node.js, npm scripts, และเขียน Basic HTTP Server ที่ตอบ JSON
---

# Day 2: Node.js + Project Structure

Day 2 เราจะเริ่ม “ทำโปรเจกต์ให้เป็นโปรเจกต์” ด้วยการจัดโครงสร้างโฟลเดอร์ให้เป็นระบบ, ตั้งค่า `package.json` และ `npm scripts`, และเขียน Basic HTTP Server ด้วย `http.createServer()` เพื่อให้พร้อมต่อยอดไป Express ในวันถัดไป

## วิธีอ่าน

- อ่าน **Concepts** เพื่อเข้าใจภาพรวมว่าทำไมต้องจัดโครงสร้าง และ npm scripts ช่วยอะไร
- จากนั้นทำ **Hands-on Labs** แบบทำตามทีละขั้นจนรันได้จริง
- ถ้าติด error ระหว่างทาง ให้ย้อนกลับมาเช็ก “Checklist” ในแต่ละ Part

## เป้าหมายของวันนี้ (Learning Outcomes)

- อธิบายความต่างระหว่าง “JavaScript ใน Browser” กับ “JavaScript บน Node.js” ได้
- อ่าน `package.json` แล้วเข้าใจว่า dependencies และ scripts คืออะไร
- จัดโครงสร้างโปรเจกต์แบบแยก `data/`, `utils/`, `config/` ได้
- รันโปรเจกต์ด้วย `npm run dev` และเปิด `http://localhost:<port>` เพื่อดู JSON ได้
- ทำ endpoint เบื้องต้น `/health` และ `/books` ได้ (ยังไม่ต้องเป็น REST เต็มรูปแบบ)

## Part Breakdown

- **Part 1** — [Day 2: Core Concepts](./core-concepts.md): Node.js Runtime, npm, โครงสร้างโปรเจกต์, และพื้นฐาน HTTP module
- **Part 2** — [Day 2: Hands-on Labs](./hands-on-labs.md): สร้าง `library-system`, เพิ่ม `npm run dev`, และรัน server ที่ตอบ JSON
