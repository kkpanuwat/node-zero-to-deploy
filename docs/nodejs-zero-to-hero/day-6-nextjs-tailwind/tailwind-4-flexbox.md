---
id: day-6-tailwind-4-flexbox
title: '4) Flexbox'
sidebar_label: '4) Flexbox'
---

Flex เหมาะกับการจัดองค์ประกอบ “เป็นแถว/คอลัมน์” และจัดชิด/กระจาย

คำสั่งพื้นฐาน:

- `flex`
- `flex-col` (เรียงแนวตั้ง)
- `items-center` จัดชิดตามแกนขวาง
- `justify-between` กระจายซ้าย-ขวา
- `gap-*` ระยะระหว่าง item

---

## ตัวอย่าง: header แถวเดียว (ชื่อ + ปุ่ม)

```jsx
<div className="flex items-center justify-between">
  <h1 className="text-xl font-semibold">Me</h1>
  <button className="rounded-md border px-3 py-2 text-sm">Logout</button>
</div>
```

---

## ตัวอย่าง: ฟอร์มที่ label และ input อยู่คนละบรรทัด

```jsx
<div className="flex flex-col gap-1">
  <label className="text-sm font-medium">Email</label>
  <input className="rounded-md border px-3 py-2 text-sm" />
</div>
```

---

## การจัดปุ่มหลายตัวให้ดูเป็นกลุ่ม

```jsx
<div className="flex gap-2">
  <button className="rounded-md bg-black px-3 py-2 text-sm text-white">Save</button>
  <button className="rounded-md border px-3 py-2 text-sm">Cancel</button>
</div>
```

