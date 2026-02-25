---
id: day-1-javascript-functions
title: 'ฟังก์ชัน (Functions)'
sidebar_label: Functions
description: ชุดคำสั่งที่เรียกใช้ซ้ำได้เพื่อให้โค้ดกระชับและอ่านง่าย
---

# ฟังก์ชัน (Functions): ชุดคำสั่งที่ใช้ซ้ำได้
<p align="center">
  <img src={require('../../../../static/img/day-1/day1-function-cover.png').default} alt="Day 1 variable" style={{maxWidth: '600px', width: '80%'}} />
</p>
ฟังก์ชันคือ "ชุดคำสั่ง" ที่เราตั้งชื่อให้มัน และสามารถเรียกใช้งานซ้ำที่ไหนก็ได้เมื่อต้องการ ช่วยให้เราไม่ต้องเขียนโค้ดเดิม ๆ ซ้ำไปซ้ำมา และทำให้โค้ดอ่านง่ายขึ้นมาก คิดเสียว่าเราเปิดร้านหนังสือ ถ้าเรามีฟังก์ชันที่จัดการงานซ้ำ ๆ ได้ก็เท่ากับมีพนักงานที่เชี่ยวชาญงานแต่ละอย่างตลอดเวลา

```javascript
// ฟังก์ชันทักทายลูกค้าที่แวะมาที่ร้านหนังสือ
function welcomeCustomer(name) {
  console.log("ยินดีต้อนรับสู่ร้านหนังสือ BookVerse, คุณ " + name + "!");
}

// เรียกใช้งานฟังก์ชัน (Calling the function)
welcomeCustomer("ลูกพีช");
welcomeCustomer("ธีร์");
```

> เมื่อเราจัดฟังก์ชันให้มีหน้าที่เฉพาะ เราจะนำไปใช้ซ้ำและทดสอบได้ง่ายขึ้นมาก

## พารามิเตอร์ vs อาร์กิวเมนต์ + ค่าที่คืน (Parameters, Arguments & Return)

- **Parameter** คือชื่อตัวแปรที่ประกาศไว้ในฟังก์ชัน เพื่อบอกว่าจะรับข้อมูลชนิดใดบ้าง เช่น `function welcomeCustomer(name)` มีพารามิเตอร์ชื่อ `name`
- **Argument** คือค่าจริงที่ส่งเข้ามาตอนเรียกใช้ฟังก์ชัน เช่น `welcomeCustomer("ธีร์")` ส่งข้อความ `"ธีร์"` เป็น argument

เข้าใจสองคำนี้ให้ดีจะช่วยเวลาอ่านเอกสารหรือดีบักโค้ดร่วมกับทีม

ฟังก์ชันสามารถรับข้อมูลเข้า (parameters) และส่งค่าตอบกลับ (return value) ได้ การ `return` จะส่งผลลัพธ์ให้คนเรียกใช้งานนำไปใช้ต่อ และหยุดการทำงานของฟังก์ชันทันที

```javascript
function calculateOrderTotal(pricePerBook, quantity) {
  const subtotal = pricePerBook * quantity;
  return subtotal; // ส่งผลลัพธ์กลับไปแทนที่ตำแหน่งที่เรียกใช้
}

const firstOrder = calculateOrderTotal(350, 2);
console.log(`ยอดสั่งซื้อหนังสือ: ${firstOrder} บาท`);
```

หากไม่มี `return` ฟังก์ชันจะคืนค่า `undefined` โดยอัตโนมัติ

### ค่าเริ่มต้นให้พารามิเตอร์ (Default Parameters)

กำหนดค่ามาตรฐานให้ parameter เพื่อป้องกัน undefined หรือใช้ในกรณีที่ผู้ใช้ไม่ได้ส่งค่าเข้ามา

```javascript
function createMembershipCard(name = "Guest", tier = "regular") {
  return `${name} (สมาชิกระดับ ${tier})`;
}

console.log(createMembershipCard()); // Guest (สมาชิกระดับ regular)
console.log(createMembershipCard("อิงฟ้า", "premium")); // อิงฟ้า (สมาชิกระดับ premium)
```

## Rest Parameter (`...parameter`)

เมื่อไม่รู้จำนวน arguments ที่แน่นอน สามารถใช้สัญลักษณ์ `...` หน้า parameter ตัวสุดท้ายเพื่อรวมค่าที่เหลือทั้งหมดเป็น Array

```javascript
function countBooks(...shelves) {
  return shelves.reduce((total, current) => total + current, 0);
}

console.log(countBooks(10, 15, 20)); // 45 เล่ม
console.log(countBooks(5, 5, 5, 5, 5)); // 25 เล่ม
```

Rest parameter ต้องอยู่ตัวท้ายสุดเสมอ และใช้อ่านง่ายกว่าการอ้างอิง `arguments` object แบบเก่า

## Function Expression และ Callback

นอกจากการประกาศแบบ `function declaration` เราสามารถเก็บฟังก์ชันไว้ในตัวแปรหรือส่งเป็นอาร์กิวเมนต์ให้ฟังก์ชันอื่น

```javascript
// Function expression: เพิ่มของแถมให้ทุกคำสั่งซื้อ
const addFreeBookmark = function (itemCount) {
  return itemCount + 1;
};

// ส่งเป็น callback เพื่ออัปเดตสต็อก
function applyInventoryUpdate(quantity, updater) {
  const newQuantity = updater(quantity);
  console.log(`จำนวนหนังสือหลังปรับคือ ${newQuantity} เล่ม`);
}

applyInventoryUpdate(20, addFreeBookmark); // แจกที่คั่นเพิ่มอีก 1 ชิ้น
```

การเข้าใจ callback สำคัญมากสำหรับการทำงานกับ asynchronous code, event handler, และ array methods

## Promise เบื้องต้น

เมื่อเราทำงานที่ใช้เวลา (เช่น เรียก API หรืออ่านไฟล์) เรามักใช้ `Promise` เพื่อจัดการผลลัพธ์ที่ยังไม่พร้อมทันที `Promise` มีสถานะอยู่ 3 แบบคือ `pending`, `fulfilled`, `rejected`

```javascript
function fetchBookFromWarehouse(bookId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!bookId) {
        reject(new Error("ไม่พบรหัสหนังสือ"));
        return;
      }
      resolve({id: bookId, title: "Clean Architecture", stock: 12});
    }, 1000);
  });
}

fetchBookFromWarehouse("bk-101")
  .then((book) => console.log(book.title))
  .catch((error) => console.error(error.message));
```

`then` จะทำงานเมื่อ promise สำเร็จ ส่วน `catch` จะจับ error ที่เกิดขึ้น

### ตัวอย่าง Promise แบบบ้าน ๆ

สมมติเรารับคำสั่งซื้อออนไลน์ ต้องแพ็กหนังสือเสร็จก่อนถึงจะส่งแจ้งเตรียมจัดส่งได้ เราใช้ Promise จำลองขั้นตอนนี้ได้

```javascript
function packBookOrder() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("แพ็กหนังสือเสร็จแล้ว!"), 500);
  });
}

packBookOrder().then((message) => {
  console.log(message);
  console.log("ส่งแจ้งเตรียมจัดส่งให้ลูกค้าได้เลย");
});
```

## Async/Await: เขียน Promise ให้อ่านง่ายขึ้น

`async/await` ทำให้เราเขียนโค้ด asynchronous ได้เหมือน synchronous มากขึ้น ฟังก์ชันที่ประกาศด้วย `async` จะคืนค่าเป็น promise เสมอ และสามารถใช้ `await` เพื่อรอผลลัพธ์จาก promise อื่น ๆ ได้

```javascript
async function showBookDetail() {
  try {
    const book = await fetchBookFromWarehouse("bk-202");
    console.log(`หนังสือ: ${book.title} (คงเหลือ ${book.stock} เล่ม)`);
  } catch (error) {
    console.error("เช็กสต็อกไม่ได้:", error.message);
  }
}

showBookDetail();
```

> จำไว้ว่าต้องใช้ `await` ภายในฟังก์ชันที่มีคำว่า `async` เท่านั้น หากอยู่นอกฟังก์ชันให้ใช้ `.then()` แทนหรือสร้างฟังก์ชัน async ใหม่มาครอบ

### Async/Await แบบง่าย

เราสามารถใช้ `await` กับตัวอย่างการแพ็กหนังสือเมื่อกี้เพื่อให้โค้ดอ่านง่ายขึ้นกว่า `.then()`

```javascript
async function prepareShipping() {
  const packingMessage = await packBookOrder();
  console.log(packingMessage);
  console.log("อัปเดตสถานะ: พร้อมส่งให้ลูกค้า!");
}

prepareShipping();
```

## โครงสร้างฟังก์ชันที่ดี

- ทำหน้าที่เดียว (single responsibility) เช่น `calculateRestockQuantity` หรือ `formatReceipt`
- ใช้ชื่อฟังก์ชันบอกความตั้งใจ เช่น `notifyMemberAboutNewArrival`
- หลีกเลี่ยงการใช้หรือแก้ไขข้อมูลภายนอกโดยไม่จำเป็น เพื่อให้อ่านง่ายและทดสอบง่าย โดยเฉพาะเมื่อจัดการข้อมูลสต็อกที่สำคัญ

## โจทย์ฝึก Functions

1. สร้างฟังก์ชัน `formatCustomerName(firstName, lastName)` ให้คืนชื่อเต็มของสมาชิกด้วยการเว้นวรรคนึงกลาง พร้อมรองรับกรณีไม่มี lastName
2. สร้างฟังก์ชัน `getBookPriceAfterDiscount(price, discountPercent = 10)` ที่คืนราคาหนังสือหลังหักส่วนลดสมาชิก
3. สร้างฟังก์ชัน `processOrderSteps(steps, handler)` ที่รับ Array ของขั้นตอนเตรียมคำสั่งซื้อและ callback `handler` แล้วเรียก `handler(stepName)` ทีละตัว ถ้า handler คืนค่า false ให้หยุดวนทันที
4. (ท้าทาย) เขียนฟังก์ชัน `fetchBook(id)` ให้คืน Promise (จำลองด้วย `setTimeout`) และสร้าง `async function showBook()` ที่เรียกใช้ด้วย `await` พร้อมดัก error
