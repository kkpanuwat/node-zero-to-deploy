---
id: day-6-next-basics-3-routing-navigation
title: '3) Routing & Navigation'
sidebar_label: '3) Routing'
---

## Folder-based Routing

<p align="center">
<img src={require('../../../static/img/day-6/next/9.png').default} alt="Day 5 JWT" style={{maxWidth: '800px', width: '100%'}} />
</p>

Next.js map URL จากโฟลเดอร์ภายใต้ `src/app/` โดยตรง

ตัวอย่าง:

```text
src/app/login/page.js     → /login
src/app/register/page.js  → /register
src/app/books/page.js     → /books
```

---

## Dynamic Routes: `[id]`

Dynamic segment ใช้รูปแบบ `[param]`

```text
src/app/books/[id]/page.js  → /books/:id
```

`params` มาจาก URL และเป็น string:

```jsx
export default async function BookPage({ params }) {
    const { id } = await params;
    const bookId = Number(id);
    if (!Number.isFinite(bookId)) {
        return <div className="text-sm">Invalid id</div>;
    }
    return <div className="text-sm">Book id: {bookId}</div>;
}
```

<p align="center">
<img src={require('../../../static/img/day-6/next/10.png').default} alt="Day 5 JWT" style={{maxWidth: '800px', width: '100%'}} />
</p>

---

## `<Link>` vs `<a>`

ภายในเว็บเดียวกัน ให้ใช้ `<Link>` จาก `next/link`

### `<a>`

- full page reload
- client state รีเซ็ตง่าย

### `<Link>`

- client-side navigation
- โดยทั่วไปเปลี่ยนหน้าได้เร็วขึ้น
- shared layout มักคงอยู่

แบบฝึกหัด: เพิ่มแถบลิงก์บนหน้า `/login`

แก้ `src/app/login/page.js` ให้มีทั้ง `<Link>` และ `<a>`:

```jsx
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="space-y-3">
      <h1 className="text-xl font-semibold">Login</h1>

      <div className="space-x-3 text-sm">
        <Link className="underline" href="/register">Register (Link)</Link>
        <a className="underline" href="/register">Register (a)</a>
      </div>
    </main>
  );
}
```

ทดลองคลิกสลับกันและสังเกต:

- `<a>` จะ reload ทั้งหน้า
- `<Link>` เปลี่ยน route แบบ client-side
