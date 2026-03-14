---
id: day-6-tailwind-1-utility-first
title: '1) Utility-first และ “สเกล” ของ Tailwind'
sidebar_label: '1) Utility-first'
---

## Utility-first คืออะไร

Tailwind ใช้แนวคิด **utility-first**: สไตล์ถูกแทนด้วย class ขนาดเล็กที่มีความหมายชัดเจน และประกอบรวมกันเป็น UI

ตัวอย่าง (อ่านจากซ้ายไปขวา):

```jsx
<div className="rounded-lg border bg-white p-4">
  <div className="text-sm text-gray-600">Label</div>
  <div className="text-base font-medium text-gray-900">Value</div>
</div>
```

ความหมาย:

- `rounded-lg` มุมโค้งระดับใหญ่
- `border` เส้นขอบ 1px
- `bg-white` พื้นหลังสีขาว
- `p-4` padding รอบด้าน (อิงสเกลของ Tailwind)

ประเด็นสำคัญ:

- utility-first ไม่ได้ทำให้ “โค้ดยาว” เสมอไป ถ้าจุดไหนซ้ำบ่อยให้ย้ายเป็นคอมโพเนนต์ (ดูบทที่ 9)
- การใช้ class มาตรฐานช่วยให้ทั้งทีม “ใช้ภาษาเดียวกัน” ในการจัด UI

---

## สเกล (Scale) ที่ควรจำ

Tailwind มี “สเกลร่วม” สำหรับหลายกลุ่ม เช่น spacing และ sizing

ตัวอย่างที่เจอบ่อย:

- `p-2`, `p-3`, `p-4`, `p-6` (padding)
- `gap-2`, `gap-3`, `gap-4` (ช่องว่างใน flex/grid)
- `rounded-md`, `rounded-lg` (ความโค้ง)

---

## สี (Colors) และระดับความเข้ม

Tailwind ใช้แนวคิด “สี + ระดับ” เช่น `gray-50`, `gray-100`, ... `gray-900`

หลักใช้งานที่อ่านง่าย:

- พื้นหลังอ่อน: `bg-gray-50`
- ขอบอ่อน: `border-gray-200`
- ข้อความรอง: `text-gray-600`
- ข้อความหลัก: `text-gray-900`
- error: `text-red-600`, `bg-red-50`, `border-red-200`
- success: `text-green-700`, `bg-green-50`, `border-green-200`

---

## แบบฝึกหัด: ทำ “การ์ดมาตรฐาน” 1 อัน

สร้างคอมโพเนนต์ `Card` (ใช้ซ้ำในหลายหน้า)

```jsx
export function Card({ title, children }) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
```

### ตัวอย่างการเรียกใช้ `Card`

สมมติวางไฟล์ไว้ที่ `src/app/components/Card.js` แล้ว import ไปใช้ในหน้าได้แบบนี้

ตัวอย่าง `src/app/me/page.js` (เฉพาะส่วน UI):

```jsx
import { Card } from '../components/Card';

export default function MePage() {
  return (
    <main className="mx-auto max-w-md space-y-4">
      <h1 className="text-xl font-semibold">Me</h1>

      <Card title="Profile">
        <div className="space-y-1 text-sm">
          <div className="text-gray-600">email</div>
          <div className="font-medium text-gray-900">alice@example.com</div>
        </div>
      </Card>

      <Card title="Status">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">role</span>
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">user</span>
        </div>
      </Card>
    </main>
  );
}
```

ข้อสังเกต:

- `Card` ช่วยลดการเขียนซ้ำเรื่อง `border/padding/background` และทำให้ UI สม่ำเสมอ
- เนื้อหาข้างในยังยืดหยุ่น เพราะส่งผ่าน `children`
