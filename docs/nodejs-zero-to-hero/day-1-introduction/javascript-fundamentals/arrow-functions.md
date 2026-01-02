---
id: day-1-javascript-arrow-functions
title: 'ฟังก์ชันลูกศร (Arrow Functions)'
sidebar_label: Arrow Functions
description: เขียนฟังก์ชันให้สั้นขึ้นและบริหาร this ได้สะดวกใน JavaScript สมัยใหม่
---

# ฟังก์ชันลูกศร (Arrow Functions): สูตรอาหารฉบับย่อ

ใน JavaScript สมัยใหม่ มีวิธีเขียนฟังก์ชันที่สั้นและกระชับกว่าเดิม เรียกว่า "ฟังก์ชันลูกศร" (Arrow Function) ซึ่งได้รับความนิยมอย่างสูง เพราะช่วยให้โค้ดดูสะอาดตาและอ่านง่ายขึ้น

ลองเปรียบเทียบฟังก์ชัน `greet` แบบเดิมกับแบบ Arrow Function กันครับ

```javascript
// ฟังก์ชันแบบดั้งเดิม (Traditional Function)
function greet(name) {
  return "สวัสดี, คุณ " + name;
}

// แปลงร่างเป็น Arrow Function
const greetArrow = (name) => {
  return "สวัสดี, คุณ " + name;
};

// และถ้าในฟังก์ชันมีแค่คำสั่ง return อย่างเดียว เราสามารถย่อได้อีก!
const greetShort = (name) => "สวัสดี, คุณ " + name;

// ผลลัพธ์เหมือนกันทุกประการ
console.log(greet("สมปอง"));      // "สวัสดี, คุณ สมปอง"
console.log(greetArrow("สมปอง")); // "สวัสดี, คุณ สมปอง"
console.log(greetShort("สมปอง")); // "สวัสดี, คุณ สมปอง"
```

> **ข้อดี:** นอกจากจะสั้นลงแล้ว Arrow Function ยังมีประโยชน์ในเรื่องการจัดการ `this` ซึ่งเป็นคอนเซ็ปต์ที่ซับซ้อนขึ้นไปอีกขั้น แต่ในเบื้องต้น ให้เราจำไว้ว่ามันคือวิธีเขียนฟังก์ชันสุดเท่ที่โปรแกรมเมอร์รุ่นใหม่นิยมใช้กันครับ
