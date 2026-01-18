---
id: day-2-nodejs-project-structure
title: 'Day 2: วางรากฐานโปรเจกต์ Node.js'
sidebar_label: 'Day 2: Project Structure'
description: มาจัดโครงสร้างโปรเจกต์ Node.js ให้เป็นระบบ, สร้าง npm scripts, และเขียนเซิร์ฟเวอร์พื้นฐานที่ตอบ JSON กัน
---

# Day 2: วางรากฐานโปรเจกต์ Node.js

ยินดีต้อนรับสู่ Day 2! วันนี้เราจะเปลี่ยนโฟลเดอร์เปล่าๆ ให้กลายเป็น "โปรเจกต์" ที่มีโครงสร้างเป็นระบบระเบียบ เราจะมาสร้าง `package.json`, จัดการโฟลเดอร์ต่างๆ, เขียน `npm scripts` ให้ใช้ง่าย และสร้างเซิร์ฟเวอร์ตัวแรกด้วย `http.createServer()` เพื่อปูทางไปสู่การใช้ Express.js ในวันต่อไป

## เส้นทางการเรียนรู้สำหรับวันนี้

1.  **เริ่มที่ Core Concepts**: เพื่อทำความเข้าใจ "ภาพใหญ่" ว่าทำไมเราต้องจัดโครงสร้างโปรเจกต์ และ npm scripts จะช่วยให้ชีวิตเราง่ายขึ้นได้อย่างไร
2.  **ลุยต่อที่ Hands-on Labs**: ลงมือทำตามทีละขั้นตอนจนสามารถรันโปรเจกต์ได้จริง
3.  **ติดปัญหา?**: ไม่ต้องกังวล! เรามี **Debugging Checklist** เป็นตัวช่วย ให้คุณย้อนกลับมาตรวจสอบและแก้ไขปัญหาได้ด้วยตัวเอง

## เป้าหมายหลักของวันนี้ (Learning Outcomes)

เมื่อจบวันนี้ คุณจะสามารถ:

- **อธิบายความแตกต่าง**ระหว่าง JavaScript ใน Browser และบน Node.js ได้
- **สร้างและจัดการโปรเจกต์**ด้วย `package.json` พร้อมจัดโครงสร้างโฟลเดอร์ `src`, `data`, `utils` ได้อย่างมืออาชีพ
- **สร้างเซิร์ฟเวอร์พื้นฐาน**ที่สามารถรันได้ด้วยคำสั่ง `npm run dev` และตอบข้อมูล JSON กลับมาได้
- **สร้าง API Endpoint ง่ายๆ** เช่น `/health` และ `/books` (ทั้ง GET และ POST) พร้อมการตรวจสอบข้อมูลเบื้องต้น
- **ทำให้ข้อมูลคงอยู่ (Persist)** โดยการบันทึกข้อมูลลงไฟล์ JSON เพื่อให้ข้อมูลไม่หายไปเมื่อปิดโปรแกรม
- **ตั้งค่า Configuration** ของโปรเจกต์สำหรับทำงานเป็นทีมโดยใช้ `.env`
- **ใช้ Logger** ที่มีระดับ (`info`/`warn`/`error`) เพื่อช่วยในการดีบักโปรแกรม

## เนื้อหาในวันนี้

- **Part 1** — [Core Concepts](./core-concepts.md): Node.js Runtime, npm, โครงสร้างโปรเจกต์, Module System, และ Git
- **Part 2** — [HTTP Routing & Response](./http-routing.md): การจัดการ URL, Status Codes, การออกแบบ Response และการจัดการ Error
- **Part 3** — [Debugging Checklist](./debugging-checklist.md): วิธีอ่าน Error, การตรวจสอบ Port, และเทคนิคการดีบักเมื่อเจอปัญหา
- **Part 4** — [Hands-on Labs](./hands-on-labs.md): ลงมือสร้าง `library-system` ที่มี API `/health` และ `/books` (GET/POST)
- **Part 5** — [Mini Project](./mini-project.md): โปรเจกต์เล็กๆ ท้ายวันสำหรับทดสอบความเข้าใจ
