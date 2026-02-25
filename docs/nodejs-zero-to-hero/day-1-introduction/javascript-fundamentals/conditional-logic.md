---
id: day-1-javascript-conditional-logic
title: 'เงื่อนไข (Conditional Logic)'
sidebar_label: Conditional Logic
description: ใช้ if...else เพื่อให้โปรแกรมตัดสินใจตามสถานการณ์จริง
---

# เงื่อนไข (Conditional Logic): การตัดสินใจของโปรแกรม
เงื่อนไข (Condition) ที่ใช้ตรวจสอบว่าข้อมูลเป็นจริงหรือไม่จริง (ได้ผลลัพธ์เป็น true หรือ false) แล้วโปรแกรมจะใช้ผลนั้นเพื่อตัดสินใจว่าจะทำอะไรต่อ เช่น ถ้า เป็นสมาชิก ก็ ให้ส่วนลด, ถ้า สินค้าเหลือน้อย ก็ แจ้งเตือน

## `if` / `else if` / `else`: ตรรกะพื้นฐาน

<p align="center">
  <img src={require('../../../../static/img/day-1/day1-if.png').default} alt="Day 1 variable" style={{maxWidth: '600px', width: '80%'}} />
</p>

```javascript
const stock = 8;

if (stock > 10) {
  console.log("สินค้าใน stock มากกว่า 10 เล่ม");
} else if (stock > 0) {
  console.log("มีสิ้นค้าใน stock แต่ไม่เกิน 10 เล่ม");
} else {
  console.log("สินค้าหมด");
}
```

- เงื่อนไขถูกประเมินจากบนลงล่าง พบเงื่อนไขที่เป็นจริงครั้งแรกแล้วหยุด
- `else` ทำงานเมื่อเงื่อนไขก่อนหน้าทั้งหมดไม่เป็นจริง

```
แล้วถ้าเขียนเป็น if ทั้งหมดล่ะ? โปรแกรมจะทำงานยังไง?
```

## ตัวดำเนินการเปรียบเทียบและตรรกะ

| เครื่องหมาย | ความหมาย              | ตัวอย่าง             |
|--------------|-----------------------|-----------------------|
| `===`        | ค่า “เท่ากัน” และชนิดข้อมูล “เหมือนกัน”        | `role === "admin"`    |
| `!==`        | ค่า “ไม่เท่ากัน” หรือชนิดข้อมูล “ไม่เหมือนกัน”     | `genre !== "novel"`   |
| `>` `<`      | มากกว่า/น้อยกว่า      | `price > 500`         |
| `>=` `<=`    | ค่ามากกว่าหรือเท่ากับ / ค่าน้อยกว่าหรือเท่ากับ    | `quantity >= 1`       |

```js
console.log(1 == "1");   // true  (ถูกแปลงชนิดให้เท่ากันก่อน)
console.log(1 === "1");  // false (คนละชนิด: number vs string)
```

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

**Truthy/Falsy คืออะไร?** ใน JavaScript เมื่อค่าใด ๆ ถูกนำไปอยู่ในเงื่อนไขของ `if (...)` ระบบจะ “แปลงเป็น boolean” ให้เองชั่วคราว ถ้าแปลงแล้วเป็น `true` เราเรียกว่า **truthy** ถ้าแปลงแล้วเป็น `false` เราเรียกว่า **falsy**

ลองดูตัวอย่างการแปลงด้วย `Boolean(...)`:

```javascript
console.log(Boolean("")); // false  (string ว่าง = falsy)
console.log(Boolean("0")); // true  (มีตัวอักษรอยู่ = truthy)
console.log(Boolean(0)); // false  (เลข 0 = falsy)
console.log(Boolean([])); // true  (array เปล่า = truthy)
console.log(Boolean({})); // true  (object เปล่า = truthy)
```

**ข้อควรระวังที่พบบ่อย**

- ถ้าค่า `0` เป็นข้อมูลที่ “ถูกต้อง” (เช่นของหมด) อย่าเขียน `if (stock) { ... }` เพราะ `0` จะถูกมองว่า falsy ควรเขียนให้ชัดเจน เช่น `if (stock > 0)` หรือ `if (stock === 0)`
- `[]` และ `{}` แม้จะ “ว่าง” แต่เป็น truthy ดังนั้นถ้าจะเช็กว่ารายการว่างไหม ให้เช็กแบบ `arr.length === 0` แทน

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
