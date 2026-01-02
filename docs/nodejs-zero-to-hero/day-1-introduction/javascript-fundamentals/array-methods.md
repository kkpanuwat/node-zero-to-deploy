---
id: day-1-javascript-array-methods
title: 'Array Methods: map, filter, reduce, find'
sidebar_label: Array Methods
description: เครื่องมือพื้นฐานสำหรับแปลง คัดกรอง รวม และค้นหาข้อมูลใน Array
---

# Array Methods: map, filter, reduce, find

JavaScript มีฟังก์ชันที่มีประโยชน์ในตัว (built-in functions) หลายตัวสำหรับจัดการข้อมูลใน Array โดยเฉพาะ 3 ตัวนี้ `map`, `filter`, และ `reduce` เป็นเครื่องมือที่ทรงพลังและใช้บ่อยมาก ช่วยให้เราเขียนโค้ดได้กระชับและอ่านง่ายขึ้น รวมถึง `find` สำหรับค้นหาข้อมูลเฉพาะ

## `map()`: แปลงร่างทุกไอเท็มใน Array

`map()` ใช้สำหรับ "แปลง" หรือ "เปลี่ยนรูปแบบ" ข้อมูลทุกชิ้นใน Array เดิม ให้กลายเป็น Array ใหม่ โดยที่ Array เดิมไม่ถูกเปลี่ยนแปลง

```javascript
const books = [
  "Clean Code",
  "Designing Data-Intensive Applications",
  "Node.js in Action",
];

// สมมติเราอยากได้ Array ใหม่ที่เป็นชื่อหนังสือพร้อมคำว่า "ยอดเยี่ยม!" ต่อท้าย
const awesomeBooks = books.map((book) => {
  return book + " ยอดเยี่ยม!";
});

console.log(awesomeBooks);
// ["Clean Code ยอดเยี่ยม!", "Designing Data-Intensive Applications ยอดเยี่ยม!", "Node.js in Action ยอดเยี่ยม!"]
console.log(books); // Array เดิมยังคงอยู่
```

## `filter()`: คัดกรองไอเท็มที่ต้องการ

`filter()` ใช้สำหรับ "คัดกรอง" หรือ "เลือก" เฉพาะไอเท็มใน Array ที่ตรงตามเงื่อนไขที่เรากำหนด แล้วสร้างเป็น Array ใหม่ขึ้นมา

```javascript
const libraryBooks = [
  { id: 1, title: "Clean Code", available: true },
  { id: 2, title: "Node.js for Dummies", available: false },
  { id: 3, title: "The Pragmatic Programmer", available: true },
];

// ต้องการเฉพาะหนังสือที่ "พร้อมให้ยืม" (available: true)
const availableBooks = libraryBooks.filter((book) => {
  return book.available === true;
});

console.log(availableBooks);
// [{ id: 1, title: "Clean Code", available: true }, { id: 3, title: "The Pragmatic Programmer", available: true }]
```

## `reduce()`: ย่อรวม Array ให้เป็นค่าเดียว

`reduce()` ใช้สำหรับ "ย่อรวม" หรือ "สรุป" ค่าทั้งหมดใน Array ให้เหลือเพียงค่าเดียว ไม่ว่าจะเป็นผลรวม, ค่าเฉลี่ย, หรือ Object ใหม่

```javascript
const bookPrices = [150, 200, 120, 300];

// ต้องการหา "ผลรวม" ของราคาหนังสือทั้งหมด
const totalPrice = bookPrices.reduce((accumulator, currentPrice) => {
  return accumulator + currentPrice;
}, 0); // 0 คือค่าเริ่มต้นของ accumulator

console.log(totalPrice); // 770
```

- `accumulator`: คือค่าสะสมที่ได้จากการดำเนินการในรอบก่อนหน้า (ในรอบแรกคือค่าเริ่มต้นที่เรากำหนดให้)
- `currentPrice`: คือไอเท็มปัจจุบันใน Array ที่กำลังถูกประมวลผล

## `find()`: ค้นหาไอเท็มแรกที่ตรงตามเงื่อนไข

`find()` ใช้สำหรับ "ค้นหา" ไอเท็มตัวแรกใน Array ที่ตรงตามเงื่อนไขที่เรากำหนด และจะคืนค่าไอเท็มนั้นกลับมา หากไม่พบไอเท็มที่ตรงตามเงื่อนไข จะคืนค่าเป็น `undefined`

```javascript
const libraryBooks = [
  { id: 1, title: "Clean Code", available: true },
  { id: 2, title: "Node.js for Dummies", available: false },
  { id: 3, title: "The Pragmatic Programmer", available: true },
];

// ต้องการค้นหาหนังสือที่มี id เป็น 2
const bookId2 = libraryBooks.find((book) => book.id === 2);
console.log(bookId2);
// { id: 2, title: "Node.js for Dummies", available: false }

// ต้องการค้นหาหนังสือที่ชื่อ "NonExistent Book"
const nonExistentBook = libraryBooks.find((book) => book.title === "NonExistent Book");
console.log(nonExistentBook);
// undefined
```

`map`, `filter`, `reduce`, และ `find` เป็นแนวคิดที่สำคัญมากในการเขียน JavaScript สมัยใหม่ (Functional Programming) การทำความเข้าใจและฝึกใช้บ่อย ๆ จะช่วยให้คุณเขียนโค้ดที่สะอาด มีประสิทธิภาพ และจัดการข้อมูลได้ดียิ่งขึ้นครับ
