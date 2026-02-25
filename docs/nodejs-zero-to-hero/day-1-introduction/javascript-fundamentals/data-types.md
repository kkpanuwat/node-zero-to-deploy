---
id: day-1-javascript-data-types
title: 'ประเภทข้อมูล (Data Types)'
sidebar_label: Data Types
description: ทำความเข้าใจว่ากล่องตัวแปรหนึ่งตัวสามารถเก็บข้อมูลชนิดใดได้บ้าง
---

# ประเภทข้อมูล (Data Types): ของในกล่องมีอะไรได้บ้าง?

ตัวแปรแต่ละตัวจะเก็บข้อมูลได้หลากหลายประเภท มาดูกันว่าประเภทข้อมูลพื้นฐานที่เราจะเจอบ่อย ๆ มีอะไรบ้าง

- **String (ข้อความ):** ข้อมูลที่เป็นตัวอักษรหรือข้อความ จะต้องอยู่ภายใต้เครื่องหมายคำพูดเสมอ (`"..."`, `'...'`, หรือ `` `...` ``)

```javascript
const message = "สวัสดีชาวโลก!";
const bookTitle = 'Clean Code';
```

- **Number (ตัวเลข):** ตัวเลขทุกชนิด ไม่ว่าจะเป็นจำนวนเต็มหรือทศนิยม
<p align="center">
  <img src={require('../../../../static/img/day-1/day1-number.png').default} alt="Day 1 variable" style={{maxWidth: '600px', width: '80%'}} />
</p>
```javascript
const bookCount = 25;
const price = 199.99;
```

- **Boolean (ค่าความจริง):** มีค่าได้แค่ 2 อย่างคือ `true` (จริง) หรือ `false` (เท็จ) มีประโยชน์อย่างมหาศาลในการสร้างเงื่อนไขเพื่อตัดสินใจ
<p align="center">
  <img src={require('../../../../static/img/day-1/day1-boolean.png').default} alt="Day 1 variable" style={{maxWidth: '600px', width: '80%'}} />
</p>
```javascript
const isLibraryOpen = true;
const isBookOverdue = false;
```

- **Array (รายการ):** ใช้เก็บข้อมูลหลาย ๆ ชิ้นเรียงต่อกันเป็นรายการ อยู่ในเครื่องหมาย `[`...`]`
<p align="center">
  <img src={require('../../../../static/img/day-1/day1-array.png').default} alt="Day 1 variable" style={{maxWidth: '600px', width: '80%'}} />
</p>
```javascript
const bookCategories = ["Programming", "Science Fiction", "History"];
console.log(bookCategories[0]); // "Programming" (การนับลำดับใน Array เริ่มจาก 0)
```

- **Object (วัตถุ):** ใช้เก็บข้อมูลที่ซับซ้อนขึ้น โดยจัดกลุ่มข้อมูลที่เกี่ยวข้องกันเป็นคู่ `key: value` อยู่ในเครื่องหมาย `{`...`}`
<p align="center">
  <img src={require('../../../../static/img/day-1/day1-object.png').default} alt="Day 1 variable" style={{maxWidth: '600px', width: '80%'}} />
</p>
```javascript
const bookDetails = {
  title: "Clean Code",
  author: "Robert C. Martin",
  pages: 464,
  isAvailable: true
};

console.log(bookDetails.title); // "Clean Code"
console.log(bookDetails.author); // "Robert C. Martin"
```

---

## โจทย์ชวนคิด: ถ้าต้องการเก็บ Object มากกว่า 1 ตัว ทำอย่างไรได้บ้าง?

สมมติว่าเราไม่ได้มีหนังสือแค่เล่มเดียว แต่มี “หลายเล่ม” (หลาย ๆ `Object`) เราสามารถจัดเก็บได้หลายรูปแบบ เช่น:

### 1) สร้างหลายตัวแปร (เหมาะกับกรณีน้อย ๆ)

```javascript
const book1 = { title: "Clean Code", author: "Robert C. Martin" };
const book2 = { title: "The Pragmatic Programmer", author: "Andy Hunt" };
const book3 = { title: "Eloquent JavaScript", author: "Marijn Haverbeke" };
```

ข้อสังเกต: ถ้ามีหลายสิบ/หลายร้อยรายการ วิธีนี้จะดูแลยาก

### คำถามชวนลองทำ

1) ลองสร้างตัวแปร `books` (Array of Objects) ให้มีหนังสืออย่างน้อย 3 เล่ม โดยแต่ละเล่มมี `title`, `pages`, `isAvailable`
2) ลองเขียนโค้ดหา “หนังสือเล่มสุดท้าย” แล้ว `console.log` ชื่อหนังสือออกมา
