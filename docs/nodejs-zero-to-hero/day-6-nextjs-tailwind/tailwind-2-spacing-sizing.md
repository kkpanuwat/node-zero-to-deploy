---
id: day-6-tailwind-2-spacing-sizing
title: '2) Spacing & Sizing (ระยะและขนาด)'
sidebar_label: '2) Spacing & Sizing'
---

## Spacing: padding, margin, gap, space

### Padding (`p-*`, `px-*`, `py-*`)

- `p-4` padding รอบด้าน
- `px-4` padding ซ้าย/ขวา
- `py-2` padding บน/ล่าง

ตัวอย่าง input ที่อ่านง่าย:

```jsx
<input className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
```

### Margin (`m-*`, `mt-*`, `mb-*`)

ใช้เมื่อจำเป็นต้อง “ดัน” องค์ประกอบจากภายนอก เช่น title กับ content

ตัวอย่าง:

```jsx
<h1 className="text-xl font-semibold">Login</h1>
<p className="mt-1 text-sm text-gray-600">เข้าสู่ระบบ</p>
```

### Gap (`gap-*`) สำหรับ flex/grid

ใช้กับ `flex` หรือ `grid` เพื่อกำหนดช่องว่างระหว่าง item

```jsx
<div className="flex items-center gap-3">
  <span className="text-sm">A</span>
  <span className="text-sm">B</span>
</div>
```

### Space (`space-y-*`, `space-x-*`)

เหมาะกับ “รายการแนวตั้ง” เช่นฟอร์ม เพราะไม่ต้องใส่ margin ทีละบล็อก

```jsx
<form className="space-y-4">
  <div>field 1</div>
  <div>field 2</div>
  <div>field 3</div>
</form>
```

---

## Sizing: width/height

### ความกว้าง/สูง

- `w-full` กว้างเต็ม container
- `max-w-md`, `max-w-lg`, `max-w-4xl` คุมความกว้างให้อ่านง่าย
- `min-h-screen` ให้หน้าเต็มความสูงหน้าจอ

ตัวอย่าง layout สำหรับหน้า auth:

```jsx
<main className="mx-auto max-w-md px-4 py-10">
  {/* form */}
</main>
```

### ขนาดขั้นต่ำ/ขั้นสูง

- `min-w-*`, `max-w-*`, `min-h-*`, `max-h-*`
- ใช้กับกล่องที่ต้อง scroll เช่น JSON debug

```jsx
<pre className="max-h-64 overflow-auto rounded-md border bg-gray-50 p-3 text-xs">
  {/* content */}
</pre>
```
