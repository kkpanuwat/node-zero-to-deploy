---
id: day-6-next-basics-7-images
title: '7) Images: next/image และ public/'
sidebar_label: '7) Images'
---

## หลักการอ้างรูปใน Next.js

รูปที่อ้างเป็น path แบบ `/...` ต้องอยู่ในโฟลเดอร์ `public/`

ตัวอย่าง:

```text
public/
  images/
    demo.jpg
```

แล้วอ้างด้วย `src="/images/demo.jpg"`

---

## `next/image` (ใช้กับหน้าหลักของโปรเจกต์)

`next/image` เป็นคอมโพเนนต์ที่ช่วยจัดการรูปภาพได้เป็นระบบ เช่นกำหนด sizing และลดปัญหา layout กระโดด

แบบฝึกหัด:

1) วางรูปไฟล์ `logo.jpg` หรือ `banner.jpg` ไว้ที่ `public/images/`
2) แสดงรูปบนหน้า `src/app/page.js` เพื่อใช้เป็นหน้า home ของโปรเจกต์

ตัวอย่าง `src/app/page.js`:

```jsx
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="space-y-6">
      <div className="relative h-40 w-full overflow-hidden rounded-lg border">
        <Image src="/images/banner.jpg" alt="KKU Library" fill className="object-cover" priority />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold">KKU Library</h1>
        <p className="text-sm text-gray-600">Next.js + Tailwind + Express API</p>
      </div>

      <div className="space-x-3 text-sm">
        <Link className="underline" href="/login">Login</Link>
        <Link className="underline" href="/register">Create user</Link>
        <Link className="underline" href="/me">Me</Link>
      </div>
    </main>
  );
}
```
