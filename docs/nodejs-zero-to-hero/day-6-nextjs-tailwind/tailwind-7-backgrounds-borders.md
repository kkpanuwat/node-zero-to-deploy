---
id: day-6-tailwind-7-backgrounds-borders
title: '7) Backgrounds, Borders, Radius, Shadow'
sidebar_label: '7) Backgrounds & Borders'
---

## Backgrounds

- `bg-white` พื้นหลังหลัก
- `bg-gray-50` พื้นหลังรอง (เช่นพื้นที่อ่านข้อมูลหรือ pre)
- `bg-red-50` / `bg-green-50` สำหรับสถานะ error/success

ตัวอย่างพื้นที่ debug:

```jsx
<pre className="rounded-md border bg-gray-50 p-3 text-xs">
  {/* json */}
</pre>
```

---

## Borders และ Radius

การคุม border ให้สม่ำเสมอ:

- `border border-gray-200` เป็นค่าเริ่มต้นที่ “ไม่แข็ง”
- `rounded-md` สำหรับ input/button
- `rounded-lg` สำหรับ card/section

ตัวอย่าง input:

```jsx
<input className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
```

---

## Shadow

ใช้เมื่ออยากให้ element ลอยจากพื้นหลัง:

- `shadow-sm` เล็ก
- `shadow` กลาง

ตัวอย่าง toast:

```jsx
<div className="rounded-md border bg-white px-3 py-3 text-sm shadow-sm">
  Message
</div>
```

