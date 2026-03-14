---
id: day-6-tailwind-5-grid
title: '5) Grid'
sidebar_label: '5) Grid'
---

## ใช้ grid เมื่อไหร่

Grid เหมาะกับ:

- รายการการ์ดที่ต้องมีหลายคอลัมน์
- หน้าฟอร์มที่ต้องจัด 2 คอลัมน์บนจอใหญ่

คำสั่งพื้นฐาน:

- `grid`
- `grid-cols-1`, `grid-cols-2`, ...
- `gap-*`

---

## ตัวอย่าง: การ์ด 1 คอลัมน์บนมือถือ และ 2 คอลัมน์บนจอกว้าง

```jsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <div className="rounded-md border p-3">A</div>
  <div className="rounded-md border p-3">B</div>
  <div className="rounded-md border p-3">C</div>
  <div className="rounded-md border p-3">D</div>
</div>
```

---

## ตัวอย่าง: ฟอร์ม 2 คอลัมน์ (ชื่อ/อีเมล) บนจอกลางขึ้นไป

```jsx
<form className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <div className="space-y-1">
    <label className="text-sm font-medium">Name</label>
    <input className="w-full rounded-md border px-3 py-2 text-sm" />
  </div>
  <div className="space-y-1">
    <label className="text-sm font-medium">Email</label>
    <input className="w-full rounded-md border px-3 py-2 text-sm" />
  </div>
</form>
```

