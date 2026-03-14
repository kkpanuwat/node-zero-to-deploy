---
id: day-6-ws-1-login
title: 'Workshop 1: สร้างหน้า Login'
sidebar_label: 'Workshop 1: Login'
---

## เป้าหมาย

- สร้างหน้า `/login` ด้วย Next.js (JavaScript) + Tailwind
- เรียก `POST /auth/login` ผ่าน Next API
- เมื่อ login สำเร็จ: เก็บ `accessToken` ไว้ใน `localStorage`
- เมื่อ login ไม่สำเร็จ: แสดง toast ข้อความชัดเจน

สิ่งที่ต้องมีอยู่ก่อน:

- Express API รันได้ (ตัวอย่าง `http://localhost:3000`)
- มี endpoint `POST /auth/login` ที่ตอบ `{ "accessToken": "..." }` เมื่อสำเร็จ

---

## 1) ทำ Next API proxy: `POST /api/auth/login`

Concept: ให้เว็บ (Next) ยิงไปที่ `/api/auth/login` (same-origin) แล้ว Next จะเป็นคน forward ไปที่ Express API อีกที

สร้างไฟล์ `src/app/api/auth/login/route.js`

```js
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

export async function POST(request) {
  const body = await request.json();

  const resp = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await resp.json();
  return Response.json(data, { status: resp.status });
}
```

ตรวจสอบเร็ว ๆ ด้วย curl (ยิงเข้าที่ Next):

```bash
curl -i -X POST http://localhost:<PORT>/api/auth/login \
  -H 'Content-Type: application/json' \
  --data '{"email":"alice@example.com","password":"P@ssw0rd1234"}'
```

คาดหวัง:

- สำเร็จ: `200` และมี `accessToken`
- ไม่สำเร็จ: `400` หรือ `401` แล้วแต่ backend

---

## 2) ทำ Toast component

เราจะทำ toast เก็บ state ใน client component และ render เป็นกล่องเล็ก ๆ มุมขวาบน

สร้างไฟล์ `src/app/components/Toast.js`

```jsx
'use client';

export default function Toast({ open, variant = 'info', message, onClose }) {
  if (!open) return null;

  const base =
    'fixed right-4 top-4 z-50 w-[320px] rounded-md border px-3 py-3 text-sm shadow-sm';

  const styles =
    variant === 'error'
      ? 'border-red-200 bg-red-50 text-red-800'
      : variant === 'success'
        ? 'border-green-200 bg-green-50 text-green-800'
        : 'border-gray-200 bg-white text-gray-900';

  return (
    <div className={`${base} ${styles}`} role="status" aria-live="polite">
      <div className="flex items-start justify-between gap-3">
        <div className="leading-5">{message}</div>
        <button
          className="rounded px-1 text-xs text-gray-600 hover:bg-black/5"
          onClick={onClose}
          type="button"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
```

ข้อสังเกต:

- ใช้ `'use client'` เพราะมี interaction (`onClick`)
- ใส่ `aria-live` เพื่อให้ screen reader อ่านข้อความแจ้งเตือนได้

---

## 3) สร้างหน้า `/login`

สร้างไฟล์ `src/app/login/page.js`

```jsx
'use client';

import { useState } from 'react';
import Toast from '../components/Toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastVariant, setToastVariant] = useState('info');
  const [toastMessage, setToastMessage] = useState('');

  function showToast(variant, message) {
    setToastVariant(variant);
    setToastMessage(message);
    setToastOpen(true);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setToastOpen(false);

    if (!email.trim() || !password) {
      showToast('error', 'กรุณากรอก email และ password ให้ครบ');
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await resp.json();

      if (!resp.ok) {
        const msg = json?.message || 'Login ไม่สำเร็จ';
        showToast('error', msg);
        return;
      }

      if (!json?.accessToken) {
        showToast('error', 'Server ตอบกลับไม่ถูกต้อง (ไม่มี accessToken)');
        return;
      }

      localStorage.setItem('accessToken', json.accessToken);
      showToast('success', 'Login สำเร็จ');

      // เลือกพาไปหน้าที่ต้องใช้ token
      window.location.href = '/me';
    } catch {
      showToast('error', 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md space-y-6">
      <Toast
        open={toastOpen}
        variant={toastVariant}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
      />

      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Login</h1>
        <p className="text-sm text-gray-600">เข้าสู่ระบบเพื่อใช้งานฟีเจอร์ที่ต้องยืนยันตัวตน</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 rounded-lg border p-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alice@example.com"
            autoComplete="email"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Password</label>
          <input
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            type="password"
            autoComplete="current-password"
          />
        </div>

        <button
          className="w-full rounded-md bg-black px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <p className="text-sm text-gray-600">
        ยังไม่มีบัญชี? <a className="underline" href="/register">สร้างผู้ใช้</a>
      </p>
    </main>
  );
}
```

- หน้า login ต้องเป็น client component เพราะใช้ `useState` และจับ event `onSubmit`
- toast ถูกทำให้เป็นคอมโพเนนต์ เพื่อใช้ซ้ำกับ workshop ต่อไป
- เมื่อสำเร็จ เก็บ token ใน `localStorage`

<p align="center">
<img src={require('../../../static/img/day-6/next/11.png').default} alt="Day 5 JWT" style={{maxWidth: '800px', width: '100%'}} />
</p>

---

## 4) ทำหน้า `/me`

เราจะทำ proxy สำหรับ `GET /me` และให้ client แนบ token ไปกับ request เพื่อทดสอบ

สร้างไฟล์ `src/app/api/me/route.js`

```js
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

export async function GET(request) {
  const auth = request.headers.get('authorization') || '';

  const resp = await fetch(`${API_BASE_URL}/me`, {
    headers: auth ? { Authorization: auth } : {},
    cache: 'no-store',
  });

  const data = await resp.json();
  return Response.json(data, { status: resp.status });
}
```

จากนั้นสร้างหน้า `src/app/me/page.js`

```jsx
'use client';

import { useEffect, useState } from 'react';
import Toast from '../components/Toast';

export default function MePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    async function run() {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setToastMessage('ยังไม่ได้ login');
        setToastOpen(true);
        setLoading(false);
        return;
      }

      const resp = await fetch('/api/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await resp.json();

      if (!resp.ok) {
        setToastMessage(json?.message || 'เรียก /me ไม่สำเร็จ');
        setToastOpen(true);
        setLoading(false);
        return;
      }

      setData(json);
      setLoading(false);
    }

    run();
  }, []);

  return (
    <main className="mx-auto max-w-md space-y-4">
      <Toast open={toastOpen} variant="error" message={toastMessage} onClose={() => setToastOpen(false)} />

      <h1 className="text-xl font-semibold">Me</h1>

      {loading ? <div className="text-sm text-gray-600">Loading...</div> : null}

      {data ? (
        <pre className="overflow-auto rounded-md border bg-gray-50 p-3 text-xs">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : null}
    </main>
  );
}
```

ประเด็นทางเทคนิค:

- token อยู่ใน `localStorage` จึงต้องอ่านจาก client component
- การเรียก `/api/me` เลือกแนบ `Authorization` header ไปด้วย เพื่อให้ Next forward ให้ Express

