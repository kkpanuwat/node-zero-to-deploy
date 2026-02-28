---
id: day-2-introduction-express-js
title: 'Introduction Express.js'
sidebar_label: 'Introduction Express.js'
description: ทำความเข้าใจภาพรวมโปรแกรม Request/Response Terminal Express และการแบ่งหน้าที่ Client/Server
---

# Express.js คืออะไร

Express.js คือ Web Framework ที่มีรูปแบบ flexible ทำงานอยู่บน Node.js ถูกออกแบบมาเพื่อช่วยให้นักพัฒนาสามารถสร้าง Web Application และ RESTful APIs ได้อย่างรวดเร็ว เป็นระบบ และมีโครงสร้างที่ชัดเจน

แม้ว่า Node.js จะสามารถสร้าง HTTP Server ได้ด้วยตัวเอง แต่การเขียนทุกอย่างตั้งแต่ต้น (เช่น การจัดการ Routing, การจัดการ Request/Response, การทำ Error Handling) จะทำให้โค้ดยุ่งยากและดูแลรักษายากขึ้น
Express.js จึงเข้ามาช่วยจัดการสิ่งเหล่านี้ให้เป็นมาตรฐานและใช้งานง่ายขึ้น

### หน้าที่หลักของ Express.js
Express ช่วยจัดการงานหลังบ้าน (Backend) ในส่วนสำคัญดังนี้:

- Routing: การกำหนดเส้นทางของเว็บไซต์ เช่น เมื่อผู้ใช้เข้าหน้า /home หรือ /profile จะให้ระบบทำอะไร

- Middleware: เป็นฟังก์ชันที่ทำงาน "ระหว่างกลาง" ก่อนจะส่งคำตอบกลับไปหาผู้ใช้ เช่น การเช็คว่าผู้ใช้ล็อกอินหรือยัง (Authentication) หรือการอ่านข้อมูลจากฟอร์ม

- HTTP Helpers: จัดการคำสั่งต่างๆ เช่น GET, POST, PUT, DELETE ได้อย่างเป็นระเบียบ

- Template Engines: สามารถเชื่อมต่อกับตัวช่วยแสดงผลหน้าเว็บ (View) เช่น EJS, Pug หรือจะส่งข้อมูลเป็น JSON เพื่อใช้กับ React/Vue ก็ได้

### ทำไม Express ถึงเป็นที่นิยม?

- Minimalist: มีขนาดเล็กและเบามาก ไม่บังคับโครงสร้างตายตัว (Unopinionated) ทำให้เราปรับแต่งโค้ดได้ตามใจชอบ

- Performance: เนื่องจากรันอยู่บน Node.js ทำให้รองรับผู้ใช้งานจำนวนมากได้พร้อมกันอย่างรวดเร็ว (Non-blocking I/O)

- Community: มีคนจำนวนผู้ใช้งานเยอะ