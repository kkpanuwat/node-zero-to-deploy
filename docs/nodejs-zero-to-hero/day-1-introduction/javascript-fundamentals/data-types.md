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

```javascript
const bookCount = 25;
const price = 199.99;
```

- **Boolean (ค่าความจริง):** มีค่าได้แค่ 2 อย่างคือ `true` (จริง) หรือ `false` (เท็จ) มีประโยชน์อย่างมหาศาลในการสร้างเงื่อนไขเพื่อตัดสินใจ

```javascript
const isLibraryOpen = true;
const isBookOverdue = false;
```

- **Array (รายการ):** ใช้เก็บข้อมูลหลาย ๆ ชิ้นเรียงต่อกันเป็นรายการ อยู่ในเครื่องหมาย `[`...`]`

```javascript
const bookCategories = ["Programming", "Science Fiction", "History"];
console.log(bookCategories[0]); // "Programming" (การนับลำดับใน Array เริ่มจาก 0)
```

- **Object (วัตถุ):** ใช้เก็บข้อมูลที่ซับซ้อนขึ้น โดยจัดกลุ่มข้อมูลที่เกี่ยวข้องกันเป็นคู่ `key: value` อยู่ในเครื่องหมาย `{`...`}`

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
