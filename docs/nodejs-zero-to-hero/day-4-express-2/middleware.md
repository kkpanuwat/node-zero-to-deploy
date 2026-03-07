---
id: day-4-middleware
title: 'Middleware'
sidebar_label: 'Middleware'
---

<p align="center">
<img src={require('../../../static/img/day-4/middleware/1.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p> 

## Middleware คือ อะไร?

ในสถาปัตยกรรมของเว็บเซิร์ฟเวอร์แบบ HTTP ทุกคำขอ (Request) ที่ผู้ใช้ส่งเข้ามา จะถูกประมวลผลก่อนส่งผลลัพธ์กลับ (Response) ให้ผู้ใช้

ใน Express.js กลไกสำคัญที่ทำหน้าที่ประมวลผลคำขอเหล่านี้คือ Middleware

> Middleware คือฟังก์ชันที่ถูกเรียกใช้งานระหว่างขั้นตอนการรับ Request และการส่ง Response และสามารถแก้ไข Request, แก้ไข Response, จบการทำงาน หรือส่งต่อการทำงานไปยังขั้นตอนถัดไปได้

### โครงสร้างพื้นฐานของ Middleware
Middleware ใน Express มีรูปแบบมาตรฐานดังนี้:

```js
function exampleMiddleware(req, res, next) {
  next();
}
```

### พารามิเตอร์ของ Middleware

| พารามิเตอร์ | ความหมาย |
|---|---|
| `req` | วัตถุ Request ที่เก็บข้อมูลจากผู้ใช้ |
| `res` | วัตถุ Response สำหรับส่งผลลัพธ์กลับ |
| `next` | ฟังก์ชันสำหรับส่งต่อการทำงานไปยัง Middleware หรือ Route ถัดไป |

---

### วงจรการทำงาน (Request Lifecycle)

<p align="center">
<img src={require('../../../static/img/day-4/middleware/2.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p> 

เมื่อมี Request เข้ามาที่ Express เช่น `GET /books` ระบบจะทำงานผ่าน middleware ตามลำดับที่ประกาศไว้จากบนลงล่าง แล้วค่อยไปถึง route handler ที่ match

```js title="ตัวอย่างการทำงาน"
app.use(loggerMiddleware);
app.use(authMiddleware);

app.get('/books', (req, res) => {
  res.json({ message: "Books list" });
});
```

#### ลำดับการทำงาน (จากบนลงล่าง)

1) `loggerMiddleware` ทำงานก่อน  
   - มักใช้สำหรับ log เช่น method/path/time  
   - ถ้า `next()` → ไปต่อ

2) `authMiddleware` ทำงานถัดมา  
   - มักใช้ตรวจสิทธิ์/ตรวจ token  
   - ถ้า “ผ่าน” แล้วเรียก `next()` → ไปต่อ  
   - ถ้า “ไม่ผ่าน” แล้วตอบกลับเลย (เช่น `res.status(401).json(...)`) → ไม่ไปทำงานที่ route

3) Route `app.get('/books', ...)` ทำงาน  
   - ตอบกลับด้วย `res.json(...)` แล้ว request จบ

#### จุดสำคัญที่ต้องจำ

- **ลำดับมีผล**: middleware ที่ประกาศก่อน จะทำงานก่อน
- **ถ้าไม่เรียก `next()` และไม่ส่ง response**: request จะค้าง (pending)
- **ถ้าส่ง response แล้ว** (เช่น `res.json(...)`) โดยปกติไม่ควรเรียก `next()` ต่อ เพราะจะทำให้โค้ดไหลไปทำงานซ้ำ/เสี่ยง error เช่น “headers already sent”

