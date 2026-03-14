---
id: day-6-tailwind-6-typography
title: '6) Typography'
sidebar_label: '6) Typography'
---

## หลักการจัดตัวอักษรที่อ่านง่าย

การจัด typography ที่ดีช่วยให้ผู้ใช้แยก “ข้อมูลหลัก/ข้อมูลรอง” ได้ทันที

### ระดับหัวข้อ

- `text-2xl font-bold` สำหรับชื่อโปรเจกต์/หน้าแรก
- `text-xl font-semibold` สำหรับหัวข้อหน้า
- `text-base font-medium` สำหรับหัวข้อย่อย

### ข้อความรอง

- `text-sm text-gray-600` สำหรับคำอธิบายและ hint

ตัวอย่าง:

```jsx
<div className="space-y-1">
  <h1 className="text-xl font-semibold">Login</h1>
  <p className="text-sm text-gray-600">เข้าสู่ระบบเพื่อใช้งานฟีเจอร์ที่ต้องยืนยันตัวตน</p>
</div>
```

---

## การจัดระยะบรรทัดและการตัดคำ

สำหรับข้อความยาว:

- `leading-6` เพิ่มระยะบรรทัด
- `break-words` ป้องกันข้อความยาวเกิน

```jsx
<p className="text-sm leading-6 text-gray-700">
  ข้อความยาว ๆ ที่ต้องอ่านให้สบายตา
</p>
```

