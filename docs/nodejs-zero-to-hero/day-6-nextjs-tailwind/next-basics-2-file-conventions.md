---
id: day-6-next-basics-2-file-conventions
title: '2) File Conventions ที่ควรรู้'
sidebar_label: '2) Conventions'
---

App Router ใช้ชื่อไฟล์มาตรฐานเพื่อกำหนดพฤติกรรมของ route ในแต่ละ segment

---

<p align="center">
<img src={require('../../../static/img/day-6/next/8.png').default} alt="Day 5 JWT" style={{maxWidth: '800px', width: '100%'}} />
</p>

## `page.js`

- ทำให้ segment เข้าผ่าน URL ได้ (routable)
- เป็นหน้าที่ render เนื้อหาหลักของ route นั้น

ตัวอย่าง:

```text
src/app/books/page.js  →  /books
```

---

## `layout.js` และ `{children}`

- เป็น shared UI สำหรับ route ทั้งหมดใต้ segment นั้น
- ต้อง render `{children}` เพื่อแสดงหน้า/ชั้นถัดไป

ตัวอย่าง:

```text
src/app/dashboard/layout.js  →  ใช้กับ /dashboard/*
```

---

## `loading.js`

แสดง UI ระหว่างรอการ render/ดึงข้อมูลของ segment

ตัวอย่าง:

```text
src/app/books/loading.js
```

---

## `error.js`

ทำหน้าที่เป็น error boundary ของ segment

ข้อควรรู้:

- รับ `({ error, reset })`
- โดยปกติต้องเป็น client component (เพราะมี event `onClick` เพื่อ `reset()`)

---

## `not-found.js`

แสดง UI เมื่อไม่พบหน้า/ไม่พบข้อมูล ในระดับ segment นั้น

มักใช้ร่วมกับการเรียก `notFound()` จาก code ฝั่ง server

---

## `route.js` (Route Handlers)

สร้าง API endpoint ภายใต้ `app/` เช่น:

```text
src/app/api/health/route.js  →  /api/health
```

รองรับการ export ตาม method: `GET`, `POST`, `PUT`, `DELETE`, ...

---

## แบบฝึกหัด: เพิ่ม loading/error ในหน้า `/me`

จุดประสงค์: ให้เห็นว่าการทำ UI state ที่ระดับ segment

### Step 1: เพิ่ม `loading.js` ให้ `/me`

สร้าง `src/app/me/loading.js`

```jsx
export default function Loading() {
  return <div className="text-sm text-gray-600">Loading me...</div>;
}
```

### Step 2: เพิ่ม `error.js` ให้ `/me`

สร้าง `src/app/me/error.js`

```jsx
'use client';

export default function Error({ error, reset }) {
  return (
    <div className="space-y-3">
      <div className="text-sm text-red-600">Error: {error?.message || 'Unknown'}</div>
      <button className="rounded-md border px-3 py-2 text-sm" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
```

หมายเหตุ:

- `error.js` มักต้องเป็น client component เพราะต้องมี event เพื่อเรียก `reset()`
- `loading.js` จะ “เห็น” เมื่อ segment นั้น **ติดการรอระหว่าง render** (เช่น server component `await fetch(...)` หรือมีการ suspend)

---

### Step 1: ใส่ delay ใน `GET /api/health` (ชั่วคราวเพื่อเดโม)

แก้ `src/app/api/health/route.js`:

```js
export async function GET() {
  await new Promise((r) => setTimeout(r, 800));
  return Response.json({ status: 'ok' });
}
```

> ทำเพื่อการสอนเท่านั้น หากเสร็จแล้วให้เอา delay ออก

### Step 2: ทำหน้า `/health` เป็น server component และ fetch ระหว่าง render

สร้าง `src/app/health/page.js`

```jsx
import { headers } from 'next/headers';

async function getHealth() {
    const host = (await headers()).get('host');
    const resp = await fetch(`http://${host}/api/health`, { cache: 'no-store' });
    return resp.json();
}

export default async function HealthPage() {
    const data = await getHealth();
    return (
        <main className="space-y-3">
            <h1 className="text-xl font-semibold">Health</h1>
            <pre className="rounded-md border bg-gray-50 p-3 text-xs">{JSON.stringify(data, null, 2)}</pre>
        </main>
    );
}
```

### Step 3: เพิ่ม `loading.js` ให้ `/health`

สร้าง `src/app/health/loading.js`

```jsx
export default function Loading() {
  return <div className="text-sm text-gray-600">Loading health...</div>;
}
```

### Step 4: ปิด prefetch เพื่อให้เห็น loading ตอนคลิก (แนะนำ)

ถ้าลิงก์ถูก prefetch มาก่อน บางครั้งจะไม่เห็น loading เพราะข้อมูลถูกโหลดไว้แล้ว

ให้ใช้:

```jsx
import Link from 'next/link';

<Link href="/health" prefetch={false} className="underline">Health</Link>
```

ทดลอง: คลิกสลับหน้า `/login` ↔ `/health` จะเห็น `loading.js` ทำงานชัดเจน
