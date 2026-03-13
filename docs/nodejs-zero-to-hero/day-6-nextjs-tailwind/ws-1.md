---
id: day-6-ws-1
title: 'Workshop: Books UI + Create Book (ผ่าน Next API proxy)'
sidebar_label: 'Workshop: Books UI'
---

Workshop นี้จะทำ 2 อย่าง:

1) หน้า `/books` แสดงรายการหนังสือจาก API  
2) ฟอร์มสร้างหนังสือใหม่ (POST) โดยเรียกผ่าน Next API proxy เพื่อไม่ติด CORS

ก่อนเริ่ม:

- Express API รันที่ `http://localhost:3000`
- Next.js รันที่ `http://localhost:<PORT>`
- สร้าง `.env.local` แล้วมี `PORT=...` และ `API_BASE_URL=http://localhost:3000`

---

## 1) ทำ Next API proxy: `GET/POST /api/books`

สร้างไฟล์ `src/app/api/books/route.js`

```js
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

export async function GET() {
  const resp = await fetch(`${API_BASE_URL}/books`, { cache: 'no-store' });
  const data = await resp.json();
  return Response.json(data, { status: resp.status });
}

export async function POST(request) {
  const body = await request.json();
  const resp = await fetch(`${API_BASE_URL}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await resp.json();
  return Response.json(data, { status: resp.status });
}
```

ตอนนี้ browser จะเรียก `/api/books` (same-origin) แล้ว Next เป็นคนยิงต่อไปที่ Express ให้

---

## 2) ทำหน้า `/books` ให้ list จาก `/api/books`

แก้ `src/app/books/page.js` ให้ดึงข้อมูลจาก proxy:

```jsx
import { headers } from 'next/headers';

async function getBooks() {
  const host = headers().get('host');
  const resp = await fetch(`http://${host}/api/books`, { cache: 'no-store' });
  return resp.json();
}

export default async function BooksPage() {
  const result = await getBooks();
  const books = result?.data ?? [];

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Books</h1>
        <a className="text-sm underline" href="/books/new">Add book</a>
      </div>

      <ul className="space-y-2">
        {books.map((b) => (
          <li key={b.id} className="rounded-md border p-3">
            <div className="font-medium">{b.title}</div>
            <div className="text-sm text-gray-600">{b.author ?? '-'}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

หมายเหตุ: แบบนี้ไม่ต้อง hardcode port เพราะอ่านจาก `host` ของ request จริง

---

## 3) ทำหน้า `/books/new` เป็นฟอร์มสร้างหนังสือ

สร้างไฟล์ `src/app/books/new/page.js`

```jsx
'use client';

import { useState } from 'react';

export default function NewBookPage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('title is required');
      return;
    }

    setSaving(true);
    try {
      const resp = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author }),
      });
      const json = await resp.json();

      if (!resp.ok) {
        setError(json?.error || json?.message || 'Create failed');
        return;
      }

      window.location.href = '/books';
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="space-y-4">
      <h1 className="text-xl font-semibold">Add book</h1>

      <form onSubmit={onSubmit} className="space-y-3 rounded-lg border p-4">
        <div className="space-y-1">
          <div className="text-sm font-medium">Title</div>
          <input
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Design Patterns"
          />
        </div>

        <div className="space-y-1">
          <div className="text-sm font-medium">Author</div>
          <input
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Gamma et al."
          />
        </div>

        {error ? <div className="text-sm text-red-600">{error}</div> : null}

        <button
          className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Create'}
        </button>
      </form>
    </main>
  );
}
```

---

## 4) เช็คผล

- เปิด `http://localhost:<PORT>/books` ต้องเห็นรายการ
- กด `Add book` แล้วสร้างหนังสือใหม่
- กลับมาหน้า list แล้วต้องเห็นเล่มใหม่
