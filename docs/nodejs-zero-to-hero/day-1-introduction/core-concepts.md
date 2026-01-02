---
id: day-1-core-concepts
title: 'Day 1: Core Concepts for Beginners'
sidebar_label: 'Core Concepts'
description: ทำความเข้าใจภาพรวมโปรแกรม Request/Response Terminal Express และการแบ่งหน้าที่ Client/Server
---

# Part 2 — Concepts สำหรับมือใหม่

## หลักการทำงานของโปรแกรม

- โปรแกรมคือ “ชุดคำสั่ง” ที่เราบอกคอมพิวเตอร์ให้ทำทีละขั้นเหมือนเราเขียนขั้นตอนการทำอาหาร  
- โครงสร้างคิดแบบง่าย: **Input → Process → Output**  
  - *Input*: สิ่งที่ผู้ใช้หรือไฟล์ส่งเข้ามา เช่น รายชื่อหนังสือ  
  - *Process*: logic ที่เราประมวลผล เช่น นับจำนวนหนังสือ, จัดเรียงชื่อ  
  - *Output*: ผลลัพธ์ที่แสดงให้ผู้ใช้ เช่น ข้อความ “วันนี้มี 3 เล่ม”  
- Node.js ทำหน้าที่อ่านคำสั่งภาษา JavaScript แล้วประมวลผลฝั่ง Backend

## Web Overview (User → Server → Response)

<p align="center">
  <img src={require('../../../static/img/day-1/day1-figure-web-flow.png').default} alt="Day 1 Hero" style={{maxWidth: '600px', width: '80%'}} />
</p>

- **User / Client**: ตัวอย่างคือ Browser, โทรศัพท์, หรือ Terminal ที่เราจะใช้ใน Day 1 หน้าที่คือส่งคำสั่งไปหา Server เช่น “ขอดูรายการหนังสือใหม่”  
- **Request**: ข้อมูลที่ Client ส่งไปบนช่องทาง HTTP เช่น `GET /books` หรือ `POST /borrow` ซึ่งอาจบรรจุข้อมูล (body) เพิ่มด้วย  
- **Server**: เครื่องที่รัน Node.js + Express มี logic ตรวจสอบสิทธิ์ คุยกับ Database และสร้างคำตอบ  
- **Response**: ผลลัพธ์ที่ Server ส่งกลับ เช่น JSON รายชื่อหนังสือหรือข้อความแจ้งสถานะ  
- **Database**: ฐานข้อมูล กล่องเก็บข้อมูลจริง (เราจะเริ่มเชื่อมในช่วง Day 6) แต่ Day 1 ยังใช้ Array จำลองแทน  
- **Flow ง่าย ๆ ในโปรเจกต์เรา**  
  1. ผู้ใช้ (User) เปิด Terminal แล้วพิมพ์ `node hello-library.js`  
  2. Terminal ส่งคำสั่งไปให้ Node.js ทำงาน  
  3. Node.js ใช้ข้อมูลจาก Array รายชื่อหนังสือ → ประมวลผล → สร้างข้อความ  
  4. Node.js ส่งข้อความกลับมาที่ Terminal  
  5. ผู้ใช้อ่านผลลัพธ์บนหน้าจอ  
- เมื่อเข้าใจ flow นี้แล้ว พอถึง Day 3–4 เราจะแค่เปลี่ยน Client เป็น Browser และแยก Server เป็น Express API ที่ตอบกับ Frontend ได้เหมือนกัน

## Terminal คืออะไร?

- Terminal คือหน้าต่างพิมพ์คำสั่ง ให้ความรู้สึกเหมือน LINE Chat ระหว่างเรากับคอมพิวเตอร์
- พิมพ์คำสั่ง 1 บรรทัด → กด Enter → ได้ผลลัพธ์ทันที
- คำสั่งพื้นฐาน: `pwd`, `ls`, `mkdir`, `cd`, `node file.js`
- หากเกิด error ให้ค่อย ๆ อ่านข้อความทีละบรรทัด แล้วแก้ตามคำแนะนำ

## โครงสร้างไฟล์แรกของ Library System

```
library-system/
├─ README.md          # บันทึกสิ่งที่เรียน + checkpoint
├─ package.json       # ข้อมูลโปรเจกต์ที่ npm สร้างให้
└─ hello-library.js   # สคริปต์หลักของ Day 1
```

- จุดสำคัญคือทุกบทเรียนถัดไปจะต่อยอดจากโฟลเดอร์นี้
- สอนให้นักเรียนจัดระเบียบไฟล์ตั้งแต่วันแรกเพื่อสร้างนิสัยที่ดี

## The JavaScript Revolution

- **จุดเริ่มต้น**: ยุคแรก JavaScript มีหน้าที่ทำให้เว็บ “ขยับได้” เช่น เปิด/ปิดเมนู, ตรวจฟอร์มบน Browser เท่านั้น
- **ยุคปัจจุบัน**: Node.js ทำให้ภาษาเดียวกันนี้ย้ายมาวิ่งบน Backend ได้ พอรวมกับ React Native, Electron เราจึงใช้ JavaScript สร้าง Mobile App หรือ Desktop App ได้ด้วย
- **เพื่อให้เห็นภาพชัดเจนยิ่งขึ้น**  
  สมมติว่าเราต้องการสร้างระบบห้องสมุดดิจิทัล เราสามารถใช้ JavaScript ในการพัฒนาส่วนประกอบทั้งหมดของระบบได้เลย:
  1.  **Web Application (Frontend):** พัฒนาด้วย React เพื่อให้ผู้ใช้มีประสบการณ์การใช้งานที่ดี
  2.  **Backend API:** พัฒนาด้วย Node.js และ Express เพื่อเป็นแกนกลางของระบบ
  3.  **Mobile Application:** พัฒนาด้วย React Native เพื่อให้ใช้งานบนมือถือได้
  จะเห็นว่าเราสามารถใช้ภาษาเดียวในการพัฒนาระบบที่ครอบคลุมได้ทั้งหมดครับ
- **Ecosystem ใหญ่**: npm มีแพ็กเกจกว่า 2 ล้าน ถัดจาก Day 1 นักเรียนจะได้ลอง `nodemon` (รีรันอัตโนมัติ), `express` (สร้าง API), `mysql2`/`prisma` (คุยกับฐานข้อมูล), `dotenv` (จัดการ environment)
- **เชื่อมกลับโปรเจกต์เรา**: วันนี้แค่ Array + `console.log` แต่ Day 3 จะมี API `/books`, Day 6 เชื่อม Database, Day 8 เชื่อม Frontend ทั้งหมดด้วยภาษาเดียว → นี่แหละคือ “JavaScript Revolution”

## Introducing Express

- **Express คืออะไร?** Framework บน Node.js ที่ทำให้การสร้าง Web Server เหมือนต่อบล็อกเลโก้ มี Route, Middleware, Error Handling ให้พร้อม
- **Example**:

```javascript
import express from "express";
const app = express();

// return list of books
app.get("/books", (req, res) => {
  res.json([
    { id: 1, title: "Clean Code" },
    { id: 2, title: "Node.js in Action" },
  ]);
});

app.listen(3000, () => {
  console.log("Library API ready on http://localhost:3000");
});
```

- เส้นทาง `/books` จะส่ง JSON กลับให้ Browser หรือ Postman ทันที
- **แนวคิดหลัก**  
  - *Routing*: บอกว่า URL ไหนตอบอะไร เช่น `GET /books`, `POST /members`  
  - *Middleware*: ตัวคั่นกลาง เช่น ตรวจ Token, แปลง JSON, log request  
  - *Response*: `res.json()`, `res.send()`, `res.status()` เพื่อสื่อสารผลลัพธ์/ข้อผิดพลาด

<p align="center">
  <img src={require('../../../static/img/day-1/day1-Minimal.png').default} alt="Day 1 Hero" style={{maxWidth: '600px', width: '80%'}} />
</p>

- **เรียบง่ายและทรงพลัง (Minimal)**  
  หัวใจของ Express คือความเรียบง่าย โค้ดเริ่มต้นมีเพียงไม่กี่บรรทัดและไม่มีฟีเจอร์ที่ซับซ้อนติดตั้งมาล่วงหน้า ทำให้ผู้เริ่มต้นสามารถเข้าใจภาพรวมและควบคุมการทำงานได้ง่าย

- **ยืดหยุ่นสูง (Flexible)**  
  Express ถูกออกแบบมาเพื่อจัดการ Request และ Response เป็นหลัก ดังนั้นจึงนำไปใช้สร้าง API ได้หลากหลายรูปแบบ ไม่ว่าจะเป็น Web Frontend, Mobile App หรือให้ระบบอื่นเชื่อมต่อเข้ามา

<p align="center">
  <img src={require('../../../static/img/day-1/day1-SeverSidePower.png').default} alt="Day 1 Hero" style={{maxWidth: '600px', width: '80%'}} />
</p>

- **เฟรมเวิร์กสำหรับฝั่ง Server (Backend Framework)**  
  ในยุคที่ Web Application นิยมใช้ Frontend Framework อย่าง React เราจำเป็นต้องมี API ที่ทำหน้าที่เป็น 'หลังบ้าน' เพื่อจัดการข้อมูลและ Logic ต่าง ๆ ซึ่ง Express คือเครื่องมือยอดนิยมในการสร้าง API ส่วนนี้

- **ประสิทธิภาพและความเป็นอิสระ (Fast & Unopinionated)**  
  Express ได้รับการยอมรับและใช้งานในองค์กรชั้นนำจำนวนมาก อีกทั้งการที่มันเป็นแบบ Unopinionated ยังให้อิสระกับนักพัฒนาในการเลือกใช้ Middleware ที่เหมาะกับโปรเจกต์ได้เอง โดยไม่มีโครงสร้างที่บังคับตายตัว

## Server-Side และ Client-Side Applications

- **ทำไมต้องแยกสองฝั่ง?**  
  - **เพื่อแบ่งขอบเขตความรับผิดชอบ (Separation of Concerns):** ช่วยให้ทีม Frontend มุ่งเน้น UX/UI ในขณะที่ Backend ดูแลความปลอดภัย ข้อมูล และ Business Logic  
  - **เพิ่มความสะดวกในการพัฒนาและดูแลรักษา:** ทีมสามารถทำงานขนานกัน และการแก้ไขฝั่งหนึ่งไม่ส่งผลฝั่งอื่นรุนแรง  
  - **รองรับการขยายระบบในอนาคต:** มี API เป็นระเบียบแล้ว จะเพิ่มแพลตฟอร์มใหม่อย่าง Mobile App ก็เรียก API เดิมได้เลย

- **Server-Side (Backend / หลังบ้าน)**  
  - **หน้าที่หลัก**: รับ Request, ตรวจสอบข้อมูล, ติดต่อ Database, ประมวลผล, ส่ง Response  
  - **ตัวอย่างงานใน Library System**  
    - `POST /members` → ตรวจว่ามีข้อมูลซ้ำไหม แล้วบันทึกสมาชิกใหม่  
    - `POST /borrow` → ตรวจว่าหนังสือว่างและสมาชิกไม่มีค่าปรับ ก่อนบันทึก Transaction  
    - `GET /dashboard` → รวมสถิติ เช่น จำนวนหนังสือคงเหลือ, จำนวนสมาชิกที่ยืมอยู่  
  - **เทคโนโลยีที่ใช้**: Node.js + Express, ORM เช่น Prisma, และฐานข้อมูล MySQL/PostgreSQL ผ่าน Docker  
  - **ความรับผิดชอบเพิ่มเติม**: Logging request, ป้องกัน SQL Injection, สร้าง error message ให้เข้าใจง่าย

- **Client-Side (Frontend / หน้าบ้าน)**  
  - **หน้าที่หลัก**: แสดงข้อมูลสวยงาม, รับ input จากผู้ใช้, ส่ง Request กลับไปยัง Server  
  - **ตัวอย่างงานใน Library System**  
    - หน้าเว็บ “Book List” ใช้ Fetch API ขอข้อมูลจาก `/books` แล้วทำเป็นตาราง/การ์ด  
    - หน้าฟอร์ม “Borrow Book” ส่ง `POST /borrow` พร้อมข้อมูลสมาชิกและหนังสือ  
    - Notification หรือ Toast แจ้งผู้ใช้เมื่อยืมสำเร็จหรือเกิด error  
  - **เทคโนโลยีที่ใช้ในคอร์สนี้**: เริ่มจาก HTML/EJS, CSS นิด ๆ, และ JavaScript ฝั่ง Browser เพื่อเรียก API

<p align="center">
  <img src={require('../../../static/img/day-1/server-clience-flow.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

```
Flow เปรียบเทียบ (ยืมหนังสือ 1 ครั้ง)
1. User เปิดหน้า My Books (Client) → เห็นปุ่ม "ยืมเล่มนี้"
2. เมื่อคลิกปุ่ม Browser ส่ง HTTP POST ไปยัง /borrow พร้อมข้อมูล { memberId, bookId } (Request)
3. Server (Express) รับข้อมูล → ตรวจสอบเงื่อนไข → บันทึกลง Database (Process)
4. Server ตอบกลับ { status: "success", dueDate: "2025-01-10" } (Response)
5. Client รับ Response → แสดง Toast "ยืมสำเร็จ! คืนภายใน 10 ม.ค." และอัปเดต UI (Output)
```

> หากเงื่อนไขไม่ผ่าน (เช่น หนังสือถูกยืมแล้ว) Server ก็จะส่งข้อความ error กลับมา ให้ Client แจ้งผู้ใช้ต่อ

- **ตัวอย่างอื่น ๆ ที่เห็นได้ทุกวัน**  
  - สั่งอาหารผ่านแอป → Client คือแอปบนโทรศัพท์, Server คือระบบร้านอาหารที่ตรวจคำสั่งและยิงไปยังครัว  
  - โอนเงินผ่าน Mobile Banking → Client คือแอปธนาคาร, Server ทำหน้าที่เช็กยอดเงินและบันทึกประวัติ  
  - Live score ฟุตบอล → Client คือเว็บ/แอปที่เราเปิดดู, Server ดึงข้อมูลจากระบบสถิติสดแล้วส่งให้ทุกคนพร้อมกัน

> ทำความเข้าใจบทนี้ให้ครบ แล้ว Part 3 จะสนุกยิ่งขึ้นเพราะไวยากรณ์ JavaScript จะเชื่อมโยงกลับมาที่ภาพใหญ่ทั้งหมด
