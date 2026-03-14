---
id: day-6-next-basics-4-layouts
title: '4) Layouts (root/nested) และ children'
sidebar_label: '4) Layouts'
---

## Root Layout

ไฟล์ `src/app/layout.js` เป็น root layout ของทั้งแอป และต้องมี `{children}`

ตัวอย่างโครง:

```jsx
export const metadata = { title: 'KKU Library' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b">
          <div className="mx-auto max-w-4xl px-4 py-3">KKU Library</div>
        </header>
        <div className="mx-auto max-w-4xl px-4 py-6">{children}</div>
      </body>
    </html>
  );
}
```

---

## Nested Layout

สร้าง layout เฉพาะกลุ่ม route ได้ เช่น “ส่วนที่ต้องล็อกอิน” (แนวคิดเดียวกับหน้า `/me` และหน้าที่จะเพิ่มในอนาคต)

ใน Next.js ทำได้โดยสร้าง layout ที่ระดับโฟลเดอร์ แล้ววางหลายหน้าไว้ด้านใน

ตัวอย่างโครงสร้าง (ใช้ `/account/*` เป็นตัวอย่าง):

```text
src/app/
  account/
    layout.js
    me/
      page.js
    settings/
      page.js
```

> route group แบบ `(protected)` ก็ทำได้ แต่ในคาบพื้นฐานให้ยึดตามโฟลเดอร์ปกติก่อน

### Step 1: สร้าง `src/app/account/layout.js`

```jsx
import Link from 'next/link';

export default function AccountLayout({ children }) {
  return (
    <div className="space-y-4">
      <nav className="rounded-lg border p-4 text-sm">
        <div className="font-medium">Account</div>
        <div className="mt-2 flex gap-3">
          <Link className="underline" href="/account/me">Me</Link>
          <Link className="underline" href="/account/settings">Settings</Link>
        </div>
      </nav>
      <section className="rounded-lg border p-4">{children}</section>
    </div>
  );
}
```

ผลที่ควรได้:

- เปิด `/account/me` และ `/account/settings` จะเห็น navigation เหมือนกัน
- เฉพาะเนื้อหาใน `{children}` เปลี่ยนไปตามหน้า

### Step 2: สร้างหน้าด้านใน 2 หน้า

สร้าง `src/app/account/me/page.js`

```jsx
export default function AccountMePage() {
  return (
    <main className="space-y-2">
      <h1 className="text-xl font-semibold">Me</h1>
      <p className="text-sm text-gray-600">หน้านี้จะเชื่อมกับการเรียก `/me` ใน workshop</p>
    </main>
  );
}
```

สร้าง `src/app/account/settings/page.js`

```jsx
export default function AccountSettingsPage() {
  return (
    <main className="space-y-2">
      <h1 className="text-xl font-semibold">Settings</h1>
      <p className="text-sm text-gray-600">ตัวอย่างหน้าในกลุ่ม layout เดียวกัน</p>
    </main>
  );
}
```

---
