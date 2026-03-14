---
id: day-6-tailwind-3-layout
title: '3) Layout: Display/Position/Container'
sidebar_label: '3) Layout'
---

## Display

กลุ่มที่ใช้บ่อย:

- `block`, `inline-block`
- `flex` (ดูบท flexbox)
- `grid` (ดูบท grid)
- `hidden` ซ่อน element

แนวคิดสำคัญ: `display` เป็นตัวกำหนด “พฤติกรรมการวางตัวในหน้า” ของ element ใน normal flow

### `block`

- กินความกว้างเต็มบรรทัดโดยค่าเริ่มต้น
- ขึ้นบรรทัดใหม่เสมอ
- เหมาะกับส่วนที่เป็น “บล็อก” เช่น section, card, form group

ตัวอย่าง:

```jsx
<div className="block rounded-md border p-3">Block</div>
```

### `inline-block`

- วางต่อกันในบรรทัดเดียวได้เหมือน inline
- แต่ยังตั้ง `width/height/padding` ได้เหมือน block
- เหมาะกับ “ป้าย/แท็ก” ที่ต้องมี padding และอยู่ในบรรทัดเดียวกับข้อความ

ตัวอย่าง:

```jsx
<span className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
  user
</span>
```

### `flex` และ `grid`

- `flex`: เหมาะกับการจัดเรียงเป็นแถว/คอลัมน์ และจัดชิด/กระจาย (เช่น header ที่มี title + button)
- `grid`: เหมาะกับ layout แบบหลายคอลัมน์ที่ควบคุมได้ละเอียด (เช่น list card 2–3 คอลัมน์)

รายละเอียดอยู่ในบท flexbox และ grid

### `hidden`

- ซ่อน element โดยไม่ให้กินพื้นที่ใน layout
- เหมาะกับการซ่อน/แสดง UI ตามเงื่อนไข หรือใช้ร่วมกับ responsive เช่น `hidden md:block`

ตัวอย่างซ่อน/แสดงตามเงื่อนไข:

```jsx
{error ? <div className="text-sm text-red-600">{error}</div> : null}
```

---

## Container

รูปแบบที่ใช้บ่อย:

- `max-w-4xl mx-auto px-4` สำหรับหน้า list/detail
- `max-w-md mx-auto px-4` สำหรับ login/register

---

## Position

ตำแหน่ง `relative/absolute/fixed` ใช้บ่อยกับ:

- toast ที่ต้องลอย
- hero image ที่ใช้ `next/image` แบบ `fill`

แนวคิดสำคัญ:

- `absolute` จะอ้างอิงตำแหน่งกับ “ancestor ที่ใกล้ที่สุดที่เป็น non-static” ซึ่งโดยทั่วไปเราตั้งให้เป็น `relative`
- `fixed` จะอ้างอิงกับ viewport (หน้าจอ) ไม่เลื่อนตาม content

### `relative`

ไม่ได้ย้าย element แบบชัดเจนเสมอไป แต่ทำหน้าที่สำคัญคือ “เป็นจุดอ้างอิง” ให้ `absolute` ข้างใน

ตัวอย่าง (ใช้กับ `next/image` แบบ `fill`):

```jsx
<div className="relative h-40 w-full overflow-hidden rounded-lg border">
  {/* Image fill จะอ้างอิงกรอบนี้ */}
</div>
```

### `absolute`

ใช้วาง element ทับในกรอบเดียวกัน เช่น badge มุมขวาบน หรือไอคอนในช่อง input

ตัวอย่าง badge มุมขวาบน:

```jsx
<div className="relative rounded-md border p-3">
  <div className="absolute right-2 top-2 rounded-full bg-green-50 px-2 py-1 text-xs text-green-700">
    active
  </div>
  <div className="text-sm">Card content</div>
</div>
```

### `fixed`

ใช้กับ UI ที่ต้อง “ลอยบนหน้าจอ” และอยู่ตำแหน่งเดิมเสมอ เช่น toast

ข้อสังเกต:

- ถ้า UI ถูก element อื่นทับ ให้ปรับ `z-*` เช่น `z-50`
- `fixed` ไม่เลื่อนตามเนื้อหา จึงเหมาะกับ notification มากกว่า modal ที่ต้องคุม scroll เพิ่มเติม
