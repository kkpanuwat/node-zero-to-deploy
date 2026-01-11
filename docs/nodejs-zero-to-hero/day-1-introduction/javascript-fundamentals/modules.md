---
id: day-1-javascript-modules
title: 'การแยกไฟล์ (Modules)'
sidebar_label: Modules
description: แยกโค้ดเป็นไฟล์ย่อยด้วย module.exports และ require เพื่ออ่านง่ายและ reuse ได้
---

# การแยกไฟล์ (Modules): จัดระเบียบโค้ดให้ดูแลง่าย

พอเราเขียนโค้ดมากขึ้น ไฟล์เดียวจะเริ่มยาวและหาอะไรไม่เจอ วิธีที่โปรแกรมเมอร์ใช้กันคือ “แยกไฟล์” โดยให้แต่ละไฟล์รับผิดชอบงานของตัวเอง แล้วค่อยนำมาใช้งานร่วมกัน

ใน Node.js มี 2 “ระบบโมดูล” หลัก ๆ:

- **CommonJS (CJS)**: ใช้ `require(...)` + `module.exports` (พบบ่อยในโปรเจกต์ Node.js เริ่มต้น)
- **ES Modules (ESM)**: ใช้ `import ... from ...` + `export`

> ในคอร์สนี้ เราเน้น CommonJS

## Export ได้กี่ประเภท?

ถ้าพูดแบบ “ที่เจอบ่อยในการทำงานจริง” จะสรุปได้ 2 ประเภท:

1) **Named export** (ส่งออกหลายชิ้น “มีชื่อ”)  
2) **Default export** (ส่งออกชิ้นหลัก “ชิ้นเดียว”)

ทั้ง 2 แบบทำได้ทั้งใน CommonJS และ ES Modules (แต่ไวยากรณ์ต่างกัน)

---

## CommonJS (CJS): `module.exports` + `require`

### แบบที่ 1: “Default-like” (ส่งออกชิ้นเดียว)

```javascript
// math.js
function add(a, b) {
  return a + b;
}

module.exports = add;
```

```javascript
// app.js
const add = require("./math");
console.log(add(1, 2));
```

### แบบที่ 2: Named exports (ส่งออกหลายชิ้นเป็น Object)

```javascript
// book-utils.js
function hasBook(books, title) {
  return books.includes(title);
}

function countBooks(books) {
  return books.length;
}

module.exports = { hasBook, countBooks };
```

```javascript
// hello-library.js
const { hasBook, countBooks } = require("./book-utils");
```

### แบบที่ 3: เพิ่มทีละอันด้วย `exports.*` (shorthand)

```javascript
// book-utils.js
exports.hasBook = (books, title) => books.includes(title);
exports.countBooks = (books) => books.length;
```

> หมายเหตุ: `exports` เป็น “ชื่อเล่น” ของ `module.exports` แต่ถ้าคุณไปเขียน `exports = ...` จะไม่เหมือน `module.exports = ...`

---

## ตัวอย่าง: แยกฟังก์ชันเช็คหนังสือว่า “มี/ไม่มี” (CJS)

### 1) สร้างไฟล์ `book-utils.js`

```javascript
// book-utils.js
function hasBook(books, title) {
  return books.includes(title);
}

module.exports = { hasBook };
```

### 2) ใช้ในไฟล์หลัก `hello-library.js`

```javascript
// hello-library.js
const { hasBook } = require("./book-utils");

const books = ["Clean Code", "Node.js in Action"];
console.log("มี Clean Code ไหม:", hasBook(books, "Clean Code"));
console.log("มี Unknown Book ไหม:", hasBook(books, "Unknown Book"));
```

---

## ES Modules (ESM): `export` + `import` (ภาพรวม)

### Named export (ส่งออกหลายตัว)

```javascript
// book-utils.js
export function hasBook(books, title) {
  return books.includes(title);
}
```

```javascript
// app.js
import { hasBook } from "./book-utils.js";
```

### Default export (ส่งออกตัวหลัก 1 ตัว)

```javascript
// book-utils.js
export default function hasBook(books, title) {
  return books.includes(title);
}
```

```javascript
// app.js
import hasBook from "./book-utils.js";
```

> จะใช้ ESM ใน Node.js มักต้องตั้งค่าเพิ่ม (เช่น `package.json` ใส่ `"type": "module"` หรือใช้ไฟล์ `.mjs`)

## สรุปเลือกใช้แบบไหนดี?

- ถ้าไฟล์นั้นมี “ของหลักชิ้นเดียว” → ใช้ **default-like** (CJS: `module.exports = ...` / ESM: `export default ...`)
- ถ้าไฟล์นั้นมี “หลายฟังก์ชัน/หลายตัวช่วย” → ใช้ **named exports** (CJS: `module.exports = { ... }` / ESM: `export function ...`)
