---
id: day-6-next-basics-5-server-client
title: "5) Server vs Client Components"
sidebar_label: '5) Server/Client'
---

## Server Component (Default)

ใน App Router `page.js` และ `layout.js` เป็น Server Component โดยค่าเริ่มต้น

คุณสมบัติสำคัญ:

- เขียน `async` และ `await fetch(...)` ได้ตรง ๆ
- เหมาะกับหน้าอ่านข้อมูล (list/detail)

แบบฝึกหัด: ทำ server fetch แบบง่าย (Health)

เพื่อให้เห็นหลักการ “server component fetch ได้โดยตรง” ให้เริ่มจาก endpoint ที่ไม่ต้องมี token ก่อน

1) สร้าง route handler `GET /api/health` (ดูบทย่อย Route Handlers)
2) สร้างหน้า `src/app/health/page.js` แล้ว fetch จาก `/api/health`

ตัวอย่าง `src/app/health/page.js` (server component):

```jsx
async function getHealth() {
  const resp = await fetch('http://localhost:<PORT>/api/health', { cache: 'no-store' });
  return resp.json();
}

export default async function HealthPage() {
  const result = await getHealth();
  return (
    <main className="space-y-3">
      <h1 className="text-xl font-semibold">Health</h1>
      <pre className="rounded-md border bg-gray-50 p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
    </main>
  );
}
```

---

## Client Component (`'use client'`)

Client Component ใช้เมื่อจำเป็นต้องมี interactivity/hook/browser API

ตัวอย่างสั้น (ใช้ state):

```jsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [n, setN] = useState(0);
  return (
    <div className="space-y-2">
      <div className="text-sm">count: {n}</div>
      <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setN((x) => x + 1)}>
        +1
      </button>
    </div>
  );
}
```

หลักปฏิบัติ:

- เริ่มจาก Server Component
- ใช้ `'use client'` เฉพาะส่วนที่ต้องโต้ตอบจริง เพื่อคุมขนาด JS และคุมความซับซ้อน

---

## ทำไมหน้า `/me` ต้องเป็น Client Component

เราเก็บ `accessToken` ไว้ที่ `localStorage` ดังนั้นการอ่าน token ต้องทำบน browser

นั่นหมายความว่า:

- หน้า `/me` ที่ต้องอ่าน token → ต้องเป็น client component (`'use client'`)
- แล้วค่อย fetch ไปที่ Next API proxy (`/api/me`) พร้อมแนบ `Authorization` header

ตัวอย่าง:

```jsx
'use client';

import { useEffect, useState } from 'react';

export default function MePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setData);
  }, []);

  return <pre>{data ? JSON.stringify(data, null, 2) : 'Not logged in'}</pre>;
}
```
