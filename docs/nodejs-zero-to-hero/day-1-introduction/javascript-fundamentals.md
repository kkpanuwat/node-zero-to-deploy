---
id: day-1-javascript-fundamentals
title: 'Day 1: JavaScript Fundamentals'
sidebar_label: 'JS Fundamentals'
description: เน้นย้ำตัวแปร ประเภทข้อมูล Operators Functions Arrow Functions Array Methods Loops และ Conditional Logic
---

# Part 3 — JavaScript Fundamentals

ก่อนที่เราจะดำดิ่งลงไปในส่วนของแล็บ เรามาสร้างรากฐาน JavaScript ให้แข็งแกร่งกันก่อนครับ ลองนึกภาพว่าสิ่งเหล่านี้คือไวยากรณ์และคำศัพท์ที่จำเป็นต้องรู้ ก่อนที่เราจะเริ่มเขียนเรื่องราวหรือบทกวีชิ้นแรกของเรา

## ตัวแปร (Variables): กล่องเก็บข้อมูลของโปรแกรม

ในการเขียนโปรแกรม เราต้องการพื้นที่สำหรับจัดเก็บและจัดการข้อมูล "ตัวแปร" ก็คือกล่องเก็บของสารพัดประโยชน์ของเรานั่นเอง ใน JavaScript ยุคใหม่ เรามีวิธีสร้างกล่องหลัก ๆ 2 แบบคือ `const` และ `let` (ส่วน `var` เป็นวิธีเก่าที่ไม่ค่อยนิยมแล้ว)

- **`const` (Constant - ค่าคงที่):** ใช้สำหรับเก็บข้อมูลที่เรารู้ว่าจะ **ไม่เปลี่ยนแปลงค่า** ตลอดการทำงานของโปรแกรม เหมือนกล่องที่เมื่อปิดผนึกแล้ว จะไม่เปลี่ยนของข้างในอีก

```javascript
// สร้างกล่องเก็บชื่อห้องสมุด ซึ่งจะไม่เปลี่ยน
const libraryName = "My Awesome Library";

// libraryName = "Another Library"; // หากลองทำแบบนี้ โปรแกรมจะ error ทันที!
```

- **`let` (Let it change - ปล่อยให้เปลี่ยนได้):** ใช้สำหรับข้อมูลที่ **อาจมีการเปลี่ยนแปลงค่า** ในภายหลังได้ เช่น จำนวนผู้เข้าชม, คะแนน, หรือสถานะต่างๆ

```javascript
// สร้างกล่องเก็บจำนวนผู้เข้าชม ซึ่งอาจเพิ่มขึ้น
let visitorCount = 10;

visitorCount = 11; // สามารถเปลี่ยนค่าได้ ไม่มีปัญหา
console.log("ตอนนี้มีผู้เข้าชม", visitorCount, "คน"); // แสดงผล 11
```

> **เกร็ดความรู้:** ในการเขียนโค้ดที่ดี เราควรเริ่มต้นด้วย `const` เสมอ และจะเปลี่ยนไปใช้ `let` ก็ต่อเมื่อเรามั่นใจจริง ๆ ว่าค่าในกล่องนั้นจำเป็นต้องถูกเปลี่ยนในอนาคต

## ประเภทข้อมูล (Data Types): ของในกล่องมีอะไรได้บ้าง?

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

- **Array (รายการ):** ใช้เก็บข้อมูลหลายๆ ชิ้นเรียงต่อกันเป็นรายการ อยู่ในเครื่องหมาย `[`...`]`.

```javascript
const bookCategories = ["Programming", "Science Fiction", "History"];
console.log(bookCategories[0]); // "Programming" (การนับลำดับใน Array เริ่มจาก 0)
```

- **Object (วัตถุ):** ใช้เก็บข้อมูลที่ซับซ้อนขึ้น โดยจัดกลุ่มข้อมูลที่เกี่ยวข้องกันเป็นคู่ `key: value` อยู่ในเครื่องหมาย `{`...`}`.

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

## เครื่องหมายและการดำเนินการ (Operators): สั่งให้โปรแกรมทำงาน

Operators คือสัญลักษณ์ที่ใช้ในการทำบางสิ่งบางอย่างกับตัวแปรของเรา เช่น การคำนวณ หรือการเปรียบเทียบ

- **เครื่องหมายทางคณิตศาสตร์ (Arithmetic):** `+` (บวก), `-` (ลบ), `*` (คูณ), `/` (หาร)

```javascript
let totalBooks = 10 + 5; // ได้ 15
let remainingBooks = 20 - 8; // ได้ 12
```

- **เครื่องหมายเปรียบเทียบ (Comparison):** `===` (เท่ากันเป๊ะๆ), `!==` (ไม่เท่ากันเป๊ะๆ), `>` (มากกว่า), `<` (น้อยกว่า) ผลลัพธ์จากการเปรียบเทียบจะเป็น `Boolean` (`true` หรือ `false`) เสมอ

```javascript
console.log(10 === 10);      // true
console.log("apple" === "orange"); // false
console.log(20 > 15);        // true
```

> **เคล็ดลับโปร:** พยายามใช้ `===` (สามเท่า) แทน `==` (สองเท่า) เสมอ เพราะ `===` จะตรวจสอบทั้ง "ค่า" และ "ประเภทข้อมูล" ซึ่งช่วยป้องกันข้อผิดพลาดที่คาดไม่ถึงได้

- **เครื่องหมายทางตรรกะ (Logical):** `&&` (และ), `||` (หรือ), `!` (ไม่) ใช้สำหรับรวมเงื่อนไข Boolean เข้าด้วยกัน

```javascript
const hasFines = false; // ไม่มีค่าปรับ
const isMember = true;  // เป็นสมาชิก

// จะยืมหนังสือได้ ก็ต่อเมื่อ เป็นสมาชิก "และ" ไม่มีค่าปรับ
const canBorrow = isMember && !hasFines; // true && !false  ->  true && true  ->  true
console.log("สามารถยืมได้:", canBorrow);
```

## ฟังก์ชัน (Functions): สูตรอาหารที่ใช้ซ้ำได้

ฟังก์ชันคือ "ชุดคำสั่ง" ที่เราตั้งชื่อให้มัน และสามารถเรียกใช้งานซ้ำที่ไหนก็ได้เมื่อต้องการ ช่วยให้เราไม่ต้องเขียนโค้ดเดิม ๆ ซ้ำไปซ้ำมา และทำให้โค้ดอ่านง่ายขึ้นมาก

```javascript
// สร้างฟังก์ชันสำหรับทักทาย
// "name" คือ "parameter" หรือข้อมูลที่เราจะส่งเข้าไปในฟังก์ชัน
function greet(name) {
  console.log("สวัสดี, คุณ " + name + "!");
}

// เรียกใช้งานฟังก์ชัน (Calling the function)
greet("สมชาย"); // พิมพ์ "สวัสดี, คุณ สมชาย!"
greet("สมศรี"); // พิมพ์ "สวัสดี, คุณ สมศรี!"
```

## ฟังก์ชันลูกศร (Arrow Functions): สูตรอาหารฉบับย่อ

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
console.log(greetShort("สมปอง"));  // "สวัสดี, คุณ สมปอง"
```

> **ข้อดี:** นอกจากจะสั้นลงแล้ว Arrow Function ยังมีประโยชน์ในเรื่องการจัดการ `this` ซึ่งเป็นคอนเซ็ปต์ที่ซับซ้อนขึ้นไปอีกขั้น แต่ในเบื้องต้น ให้เราจำไว้ว่ามันคือวิธีเขียนฟังก์ชันสุดเท่ที่โปรแกรมเมอร์รุ่นใหม่นิยมใช้กันครับ

## Array Methods: map, filter, reduce (ตัวช่วยจัดการข้อมูลใน Array)

JavaScript มีฟังก์ชันที่มีประโยชน์ในตัว (built-in functions) หลายตัวสำหรับจัดการข้อมูลใน Array โดยเฉพาะ 3 ตัวนี้ `map`, `filter`, และ `reduce` เป็นเครื่องมือที่ทรงพลังและใช้บ่อยมาก ช่วยให้เราเขียนโค้ดได้กระชับและอ่านง่ายขึ้น

### `map()`: แปลงร่างทุกไอเท็มใน Array

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
// ผลลัพธ์: ["Clean Code ยอดเยี่ยม!", "Designing Data-Intensive Applications ยอดเยี่ยม!", "Node.js in Action ยอดเยี่ยม!"]

console.log(books); // Array เดิมยังคงอยู่: ["Clean Code", "Designing Data-Intensive Applications", "Node.js in Action"]
```

### `filter()`: คัดกรองไอเท็มที่ต้องการ

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
// ผลลัพธ์: [{ id: 1, title: "Clean Code", available: true }, { id: 3, title: "The Pragmatic Programmer", available: true }]
```

### `reduce()`: ย่อรวม Array ให้เป็นค่าเดียว

`reduce()` เป็นฟังก์ชันที่ทรงพลังที่สุดในสามตัวนี้ ใช้สำหรับ "ย่อรวม" หรือ "สรุป" ค่าทั้งหมดใน Array ให้เหลือเพียงค่าเดียว ไม่ว่าจะเป็นผลรวม, ค่าเฉลี่ย, หรือ Object ใหม่

```javascript
const bookPrices = [150, 200, 120, 300];

// ต้องการหา "ผลรวม" ของราคาหนังสือทั้งหมด
const totalPrice = bookPrices.reduce((accumulator, currentPrice) => {
  return accumulator + currentPrice;
}, 0); // 0 คือค่าเริ่มต้นของ accumulator

console.log(totalPrice); // ผลลัพธ์: 770
```

- `accumulator`: คือค่าสะสมที่ได้จากการดำเนินการในรอบก่อนหน้า (ในรอบแรกคือค่าเริ่มต้นที่เรากำหนดให้, ในที่นี้คือ `0`)
- `currentPrice`: คือไอเท็มปัจจุบันใน Array ที่กำลังถูกประมวลผล

### `find()`: ค้นหาไอเท็มแรกที่ตรงตามเงื่อนไข

`find()` ใช้สำหรับ "ค้นหา" ไอเท็มตัวแรกใน Array ที่ตรงตามเงื่อนไขที่เรากำหนด และจะคืนค่าไอเท็มนั้นกลับมา หากไม่พบไอเท็มที่ตรงตามเงื่อนไข จะคืนค่าเป็น `undefined`

```javascript
const libraryBooks = [
  { id: 1, title: "Clean Code", available: true },
  { id: 2, title: "Node.js for Dummies", available: false },
  { id: 3, title: "The Pragmatic Programmer", available: true },
];

// ต้องการค้นหาหนังสือที่มี id เป็น 2
const bookId2 = libraryBooks.find((book) => {
  return book.id === 2;
});

console.log(bookId2);
// ผลลัพธ์: { id: 2, title: "Node.js for Dummies", available: false }

// ต้องการค้นหาหนังสือที่ชื่อ "NonExistent Book"
const nonExistentBook = libraryBooks.find((book) => {
  return book.title === "NonExistent Book";
});

console.log(nonExistentBook);
// ผลลัพธ์: undefined
```

`map`, `filter`, และ `reduce` เป็นแนวคิดที่สำคัญมากในการเขียน JavaScript สมัยใหม่ (Functional Programming) การทำความเข้าใจและฝึกใช้บ่อยๆ จะช่วยให้คุณเขียนโค้ดที่สะอาด มีประสิทธิภาพ และจัดการข้อมูลได้ดียิ่งขึ้นครับ

## การวนซ้ำ (Loops): สั่งให้ทำงานเดิมๆ ไม่รู้เบื่อ

Loop คือเครื่องมือที่ทรงพลังที่สุดอย่างหนึ่งในการเขียนโปรแกรม มันช่วยให้เราสั่งคอมพิวเตอร์ให้ทำงานบางอย่างซ้ำๆ ตามจำนวนรอบหรือเงื่อนไขที่เรากำหนด โดยไม่ต้องเขียนโค้ดเดิมซ้ำๆ เอง

`for` loop คือ Loop แบบคลาสสิกที่ใช้กันอย่างแพร่หลายที่สุด มีโครงสร้างที่ชัดเจน 3 ส่วน

```javascript
// โครงสร้าง: for ( [จุดเริ่มต้น]; [เงื่อนไขให้ทำต่อ]; [สิ่งที่ทำเมื่อจบรอบ] )

for (let i = 1; i <= 5; i++) {
  console.log("นี่คือรอบที่ " + i);
}
// ผลลัพธ์:
// นี่คือรอบที่ 1
// นี่คือรอบที่ 2
// นี่คือรอบที่ 3
// นี่คือรอบที่ 4
// นี่คือรอบที่ 5
```

เราสามารถใช้ `for` loop เพื่อวนอ่านค่าจาก Array ได้เช่นกัน:

```javascript
const bookCategories = ["Programming", "Science Fiction", "History"];

for (let i = 0; i < bookCategories.length; i++) {
  // i คือ index ที่เริ่มจาก 0
  // bookCategories[i] คือการเข้าถึงข้อมูลใน Array ณ ตำแหน่งนั้น
  console.log("หมวดหมู่: " + bookCategories[i]);
}
// ผลลัพธ์:
// หมวดหมู่: Programming
// หมวดหมู่: Science Fiction
// หมวดหมู่: History
```

นอกจาก `for` แล้ว ยังมี Loop แบบอื่นๆ เช่น `while` หรือ `forEach` (ที่เราได้เห็นในตัวอย่าง Lab) ซึ่งแต่ละแบบก็มีสไตล์การใช้งานที่เหมาะกับสถานการณ์ต่างกันไปครับ

## เงื่อนไข (Conditional Logic): การตัดสินใจของโปรแกรม

บ่อยครั้งที่โปรแกรมต้องตัดสินใจว่าจะทำอะไรต่อไปตามสถานการณ์ที่แตกต่างกัน เราใช้ `if...else` เพื่อสร้างเงื่อนไขเหล่านี้

```javascript
const hour = 14;

if (hour < 12) {
  console.log("สวัสดีตอนเช้า!");
} else if (hour < 18) {
  console.log("สวัสดีตอนบ่าย!");
} else {
  console.log("สวัสดีตอนเย็น!");
}
// ผลลัพธ์: "สวัสดีตอนบ่าย!" เพราะ 14 น้อยกว่า 18
```

เมื่อเรามีพื้นฐานเหล่านี้แล้ว การอ่านและเขียนโค้ดในแล็บถัดไปจะกลายเป็นเรื่องที่ง่ายและสนุกขึ้นเยอะเลยครับ!

> ลองหยุดพักสั้น ๆ แล้วลองอธิบายหัวข้อใดหัวข้อหนึ่งให้เพื่อนหรือกับตัวเองดู หากอธิบายได้คล่อง ถือว่าพร้อมไปต่อใน Part 4
