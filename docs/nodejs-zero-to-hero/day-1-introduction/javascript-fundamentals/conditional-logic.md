---
id: day-1-javascript-conditional-logic
title: 'เงื่อนไข (Conditional Logic)'
sidebar_label: Conditional Logic
description: ใช้ if...else เพื่อให้โปรแกรมตัดสินใจตามสถานการณ์จริง
---

# เงื่อนไข (Conditional Logic): การตัดสินใจของโปรแกรม

ระบบซอฟต์แวร์ที่เชื่อถือได้ต้องตอบสนองตามข้อมูลจริง เช่น แจ้งสิทธิ์สมาชิกหรือเตือนเมื่อสินค้าคงคลังต่ำ โค้ดทำหน้าที่นี้ด้วยชุดคำสั่งเงื่อนไข เพื่อให้โปรแกรมเลือกกระบวนการที่เหมาะสมในแต่ละสถานการณ์

## `if` / `else if` / `else`: ตรรกะพื้นฐาน

```javascript
const stock = 8;

if (stock > 10) {
  console.log("พร้อมขายเต็มที่ จัดแคมเปญได้เลย!");
} else if (stock > 0) {
  console.log("คงเหลือไม่มาก แจ้งเตือนเติมสต็อก");
} else {
  console.log("สินค้าหมด กรุณาพักการโปรโมต");
}
```

- เงื่อนไขถูกประเมินจากบนลงล่าง พบเงื่อนไขที่เป็นจริงครั้งแรกแล้วหยุด
- `else` ทำงานเมื่อเงื่อนไขก่อนหน้าทั้งหมดไม่เป็นจริง

## ตัวดำเนินการเปรียบเทียบและตรรกะ

| เครื่องหมาย | ความหมาย              | ตัวอย่าง             |
|--------------|-----------------------|-----------------------|
| `===`        | เท่ากันแบบเข้ม        | `role === "admin"`    |
| `!==`        | ไม่เท่ากันแบบเข้ม     | `genre !== "novel"`   |
| `>` `<`      | มากกว่า/น้อยกว่า      | `price > 500`         |
| `>=` `<=`    | มากกว่าหรือเท่ากับ    | `quantity >= 1`       |

ส่วน `&&` (and) กับ `||` (or) ช่วยผสมเงื่อนไขเพื่อให้โปรแกรมตัดสินใจบนหลายปัจจัย

```javascript
const isMember = true;
const total = 850;

if (isMember && total >= 500) {
  console.log("สมาชิกซื้อครบ 500 รับส่วนลดเพิ่ม!");
}

if (!isMember || total < 500) {
  console.log("เชิญสมัครสมาชิกเพื่อรับสิทธิ์เพิ่มเติม");
}
```

## Truthy / Falsy

บางครั้งเราไม่ต้องเปรียบเทียบกับค่าใดโดยตรง แค่ตรวจว่า "มีค่าไหม"

```javascript
const couponCode = "";

if (!couponCode) {
  console.log("ยังไม่ได้กรอกคูปอง");
}
```

- ค่า `0`, `''`, `null`, `undefined`, `NaN`, `false` ถือเป็น falsy
- ค่าอื่น ๆ ถือเป็น truthy

## Ternary Operator: เขียนสั้น ๆ

```javascript
const points = 900;
const benefit = points >= 1000 ? "แลกหนังสือฟรี" : "สะสมเพิ่มอีกนิด";

console.log(benefit);
```

ใช้เมื่อต้องเลือกค่าหนึ่งจากสองตัวเลือกโดยอิงเงื่อนไขเดียว

## `switch`: ทางเลือกหลายเงื่อนไขแบบชัดเจน

```javascript
const dayOfWeek = "Saturday";

switch (dayOfWeek) {
  case "Saturday":
  case "Sunday":
    console.log("เปิดร้าน 10:00-20:00");
    break;
  case "Monday":
    console.log("ปิดร้านเพื่อจัดสต็อก");
    break;
  default:
    console.log("เปิดร้าน 09:00-19:00");
}
```

- ใช้ `break` เพื่อหยุดไม่ให้รันต่อไป case ถัดไป
- สามารถรวมหลาย case ที่ให้ผลลัพธ์เหมือนกันไว้ด้วยกันได้

## โจทย์ฝึก

1. เขียนฟังก์ชัน `getShippingMessage(total, isMember)` ที่ให้ข้อความต่างกัน (สมาชิกและยอด `>= 800` ได้ `"ส่งฟรี + คูปองส่วนลด"`, ยอด `>= 500` ได้ `"ส่งฟรี"`, นอกนั้น `"ค่าส่ง 50 บาท"`)

   ```javascript
   function getShippingMessage(total, isMember) {
     // TODO: เติมตรรกะ
   }
   ```

2. เขียน `checkInventoryWarning(quantity)` ที่คืน `"สีแดง"` เมื่อสต็อก `<= 3`, `"สีเหลือง"` เมื่อ `<= 10`, และ `"สีเขียว"` ถ้ามากกว่านั้น

   ```javascript
   function checkInventoryWarning(quantity) {
     // TODO: เติมตรรกะ
   }
   ```

3. ใช้ `switch` สร้างฟังก์ชัน `getSectionMessage(section)` ที่ให้ข้อความเมื่อลูกค้าอยู่ในโซนต่าง ๆ เช่น `"fiction"`, `"tech"`, `"children"` (ถ้าไม่รู้จักให้คืน `"สอบถามพนักงานได้เลย"`)

   ```javascript
   function getSectionMessage(section) {
     switch (section) {
       // TODO: เติม case และ default
     }
   }
   ```

4. (ท้าทาย) เขียนฟังก์ชัน `applyPromotion(order)` ที่รับ object `{ total, hasCoupon, memberTier }` แล้วใช้เงื่อนไขผสมกันเพื่อบอกว่าได้โปรโมชั่นอะไรบ้าง (เช่นมีคูปอง พร้อมสถานะ premium และยอดเกิน 1,500)

   ```javascript
   function applyPromotion(order) {
     const { total, hasCoupon, memberTier } = order;
     // TODO: สร้าง array หรือข้อความกลับไปตามเงื่อนไข
   }
   ```

เมื่อเข้าใจรูปแบบเงื่อนไขเหล่านี้แล้ว การออกแบบฟีเจอร์ที่ต้องตรวจเช็กหลายปัจจัยจะเป็นระบบมากขึ้น แนะนำให้ลองสรุปเหตุผลการตัดสินใจของโค้ดในรูปแบบ flowchart หรือ pseudo-code เพื่อให้ตรรกะมีความสอดคล้องก่อนนำไปใช้งานจริง
