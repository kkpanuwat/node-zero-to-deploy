---
id: day-1-javascript-array-methods
title: 'Array Methods ที่ใช้บ่อย'
sidebar_label: Array Methods
description: คลังเครื่องมือพื้นฐานสำหรับแปลง คัดกรอง รวม ค้นหา และตรวจสอบข้อมูลใน Array พร้อมโจทย์ฝึกหัด
---

# Array Methods ที่ใช้บ่อย

JavaScript มีฟังก์ชันที่มีประโยชน์ในตัว (built-in functions) หลายตัวสำหรับจัดการข้อมูลใน Array ด้านล่างนี้คือชุดที่มือใหม่ใช้บ่อยที่สุด พร้อมตัวอย่างและโจทย์ฝึกหัดแบบธีม “ร้านหนังสือ” เพื่อให้เห็นภาพว่าการแปลง คัดกรอง หรือสรุปข้อมูลในระบบหน้าร้านทำได้อย่างไร

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

```javascript
// โจทย์ฝึก map(): แปลงชื่อหนังสือให้พร้อมแสดงที่หน้าร้าน
const featuredBooks = ["Atomic Habits", "UX Writing", "Deep Work"];

// TODO: ใช้ map() เพื่อให้ได้ผลลัพธ์ ["แนะนำ: Atomic Habits", ...]
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

```javascript
// โจทย์ฝึก filter(): เลือกเฉพาะหนังสือที่มีราคามากกว่า 500 บาท
const bookList = [
  { title: "Refactoring", price: 1200 },
  { title: "Ikigai", price: 320 },
  { title: "Monolith to Microservices", price: 650 },
];

// TODO: ใช้ filter() เพื่อให้เหลือเฉพาะหนังสือราคา > 500
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

```javascript
// โจทย์ฝึก reduce(): รวมจำนวนหน้าทั้งหมดของคำสั่งซื้อ
const orderItems = [
  { title: "Domain-Driven Design", pages: 560 },
  { title: "Sprint", pages: 288 },
];

// TODO: ใช้ reduce() เพื่อหาจำนวนหน้ารวม (pages)
```

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

```javascript
// โจทย์ฝึก find(): หาออเดอร์แรกที่ยังไม่ถูกจัดส่ง
const orders = [
  {orderId: "A1", shipped: true},
  {orderId: "B2", shipped: false},
  {orderId: "C3", shipped: false},
];

// TODO: ใช้ find() เพื่อดึง order แรกที่ shipped === false
```

## `forEach()`: วนทำงานกับทุกไอเท็มแบบไม่สร้าง Array ใหม่

`forEach()` เรียก callback หนึ่งครั้งต่อไอเท็ม ใช้เมื่อต้องการทำเอฟเฟกต์ข้างเคียง เช่น log ค่า หรือสะสมผลลัพธ์ลงตัวแปรภายนอก

```javascript
const queue = ["ใบหม่อน", "คริส", "เพชร"];

queue.forEach((name, index) => {
  console.log(`#${index + 1}: กำลังเตรียมหนังสือสำหรับคุณ ${name}`);
});
```

```javascript
// โจทย์ฝึก forEach(): แสดงชื่อหนังสือที่จัดส่งวันนี้
const shippingList = [
  {title: "Start with Why", customer: "โฟกัส"},
  {title: "Thinking in Systems", customer: "กล้า"},
];

// TODO: ใช้ forEach() เพื่อ console.log "จัดส่ง [title] ให้ [customer]"
```

## `some()` และ `every()`: ตรวจสอบเงื่อนไขรวม

- `some()` จะคืนค่า `true` หาก **มีอย่างน้อยหนึ่ง** ไอเท็มใน Array ผ่านเงื่อนไข
- `every()` จะคืนค่า `true` ก็ต่อเมื่อ **ทุกไอเท็ม** ผ่านเงื่อนไข

```javascript
const reviewStars = [5, 4, 4, 3];

const hasPerfectScore = reviewStars.some((score) => score === 5); // true
const allAboveThree = reviewStars.every((score) => score >= 3);   // true
```

```javascript
// โจทย์ฝึก some(): ตรวจว่ามีคำสั่งซื้อที่ราคามากกว่า 2,000 บาทหรือไม่
const orderTotals = [450, 1200, 890, 2500];

// TODO: ใช้ some() ให้ได้ true เมื่อมีออเดอร์ >= 2000

// โจทย์ฝึก every(): ตรวจว่าหนังสือในล็อตนี้พร้อมขายทุกเล่มหรือไม่
const lot = [
  {title: "Book A", qualityChecked: true},
  {title: "Book B", qualityChecked: true},
  {title: "Book C", qualityChecked: false},
];

// TODO: ใช้ every() เพื่อเช็กว่า qualityChecked === true สำหรับทุก object
```

## `findIndex()`: เจอ index ของไอเท็มที่ต้องการ

ถ้าต้องการตำแหน่ง (index) ของไอเท็มแทนค่า object สามารถใช้ `findIndex()` ซึ่งจะคืนค่า -1 หากไม่หาเจอ

```javascript
const shelf = ["Clean Code", "You Don't Know JS", "Refactoring"];

const idx = shelf.findIndex((title) => title === "Refactoring");
console.log(idx); // 2
```

```javascript
// โจทย์ฝึก findIndex(): หาตำแหน่งหนังสือที่สต็อกเป็น 0
const shelfStatus = [
  {title: "React Handbook", stock: 4},
  {title: "Vue 3 Guide", stock: 0},
  {title: "Svelte In Action", stock: 7},
];

// TODO: ใช้ findIndex() เพื่อหาว่าหนังสือสต็อก 0 อยู่ index ไหน
```

## `includes()`: ตรวจว่ามีค่าที่ต้องการหรือไม่

`includes()` เป็นวิธีที่ง่ายในการเช็กว่ามีค่าหนึ่งอยู่ใน Array หรือเปล่า ทำงานได้ดีเมื่อค่าที่เก็บไว้เป็น primitive (เช่น string หรือ number)

```javascript
const categories = ["tech", "design", "business"];

console.log(categories.includes("tech")); // true
console.log(categories.includes("kids")); // false
```

```javascript
// โจทย์ฝึก includes(): ตรวจว่าหมวดหมู่ร้านมี "self-help" ไหม
const storeCategories = ["novel", "tech", "cooking"];

// TODO: เขียนเงื่อนไขเพื่อ console.log("มี Self-Help ให้บริการ") เมื่อ includes เป็น true
```

## `sort()`: จัดเรียงข้อมูล ทั้ง Asc และ Desc

`sort()` ใช้สำหรับเรียงลำดับค่าใน Array ตามที่เราต้องการ โดยค่าเริ่มต้นจะเปรียบเทียบแบบ string ดังนั้นหากต้องการเรียงตัวเลขให้ถูกต้องต้องส่งฟังก์ชันเปรียบเทียบ (comparator) เข้าไปด้วย

### เรียงจากน้อยไปมาก (Ascending)

```javascript
const pages = [350, 120, 480, 90];

const asc = [...pages].sort((a, b) => a - b);
console.log(asc); // [90, 120, 350, 480]
```

### เรียงจากมากไปน้อย (Descending)

```javascript
const desc = [...pages].sort((a, b) => b - a);
console.log(desc); // [480, 350, 120, 90]
```

> ใช้ `[...]` กระจายค่า (spread) ก่อนเรียงเพื่อไม่ให้ Array เดิมถูกแก้ไข เพราะ `sort()` จะเปลี่ยน Array ต้นฉบับ

```javascript
// โจทย์ฝึก sort(): เรียงชื่อหนังสือตาม ก-ฮ เพื่อใช้จัดชั้น
const shelfNames = ["ออยกับมหัศจรรย์ตัวโน้ต", "เก่งกว่าก่อนอ่าน", "โฟกัสทำงาน", "บัวกลางสมุทร"];

// TODO: ใช้ sort() เพื่อให้ชื่อเรียงตามตัวอักษร

// โจทย์ฝึก sort(): จัดอันดับหนังสือตามคะแนนรีวิวจากมากไปน้อย
const reviewScores = [
  {title: "Book A", score: 4.2},
  {title: "Book B", score: 4.9},
  {title: "Book C", score: 3.5},
];

// TODO: ใช้ sort() เพื่อจัด array นี้จาก score สูงไปต่ำ
```

`map`, `filter`, `reduce`, และ `find` เป็นแนวคิดที่สำคัญมากในการเขียน JavaScript สมัยใหม่ (Functional Programming) การทำความเข้าใจและฝึกใช้บ่อย ๆ จะช่วยให้คุณเขียนโค้ดที่สะอาด มีประสิทธิภาพ และจัดการข้อมูลร้านหนังสือหรือระบบอื่น ๆ ได้ดียิ่งขึ้นครับ
