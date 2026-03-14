---
id: day-6-next-basics-6-route-handlers
title: '6) Route Handlers และ API Proxy'
sidebar_label: '6) Route Handlers'
---

Route handlers เป็น endpoint ที่อยู่ใน Next.js ภายใต้ `src/app/api/*/route.js`

- ทำ proxy ไป Express API เพื่อลดปัญหา CORS
- ซ่อน `API_BASE_URL` ไว้ใน `.env.local`

---

## แบบฝึกหัด 1: สร้าง health endpoint (ใช้กับบท Server Component)

สร้าง `src/app/api/health/route.js`

```js
export async function GET() {
  return Response.json({ status: 'ok' });
}
```

เปิด `http://localhost:<PORT>/api/health` ต้องได้ JSON

---

## แบบฝึกหัด 2: ทำ API Proxy ตาม flow ของคอร์ส (login/register/me)

แนวคิด: frontend เรียก `/api/...` (same-origin) แล้ว Next forward ไป Express API โดยใช้ `API_BASE_URL` จาก `.env.local`

### 2.1 `POST /api/auth/login` → forward ไป `POST /auth/login`

สร้าง `src/app/api/auth/login/route.js`

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

### 2.2 `POST /api/users` → forward ไป `POST /users`

สร้าง `src/app/api/users/route.js`

```js
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

export async function POST(request) {
  const body = await request.json();
  const resp = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await resp.json();
  return Response.json(data, { status: resp.status });
}
```

### 2.3 `GET /api/me` → forward ไป `GET /me` (ส่งต่อ Authorization)

สร้าง `src/app/api/me/route.js`

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

สิ่งที่ควรสังเกต:

- proxy ควรส่ง status code เดิมกลับไป (`{ status: resp.status }`) เพื่อให้หน้าเว็บตัดสินใจได้ถูก
- สำหรับ endpoint ที่ต้อง auth ให้ forward `Authorization` header ไปด้วย
