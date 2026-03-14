---
id: day-6-next-basics-1-app-router
title: '1) App Router และโครงสร้าง app/'
sidebar_label: '1) App Router'
---

## แนวคิดหลัก

App Router มองแอปเป็น “ต้นไม้ของ route” ที่ประกอบด้วย **segments** ต่อกันเป็นเส้นทาง URL และประกอบ UI เป็นชั้น ๆ ผ่าน `layout.js`

Keywords:

<p align="center">
<img src={require('../../../static/img/day-6/next/2.png').default} alt="Day 5 JWT" style={{maxWidth: '800px', width: '100%'}} />
</p>

- **Segment**: ส่วนหนึ่งของ URL ที่คั่นด้วย `/`  
  - เช่น `/books/1` มี 2 segments คือ `books` และ `1`  
  - ใน App Router segment มักสัมพันธ์กับ “ชื่อโฟลเดอร์” ใต้ `src/app/`  
    - `src/app/books/...` = segment `books`  
    - `src/app/books/[id]/...` = segment แบบ dynamic (รับค่า `1`, `2`, ...)

<p align="center">
<img src={require('../../../static/img/day-6/next/3.png').default} alt="Day 5 JWT" style={{maxWidth: '800px', width: '100%'}} />
</p>
- **Route**: เส้นทาง URL ที่ “เข้าถึงได้จริง” แล้ว Next.js รู้ว่าจะตอบอะไรกลับ (UI หรือ API)  
  - route ของหน้าเว็บมักสิ้นสุดที่ `page.js` เช่น `src/app/books/page.js` → `/books`  
  - route ของ API มักสิ้นสุดที่ `route.js` เช่น `src/app/api/me/route.js` → `/api/me`  
  - มองแบบง่าย: *segment คือทางเดิน* ส่วน *route คือปลายทางที่ใช้งานได้*


<p align="center">
<img src={require('../../../static/img/day-6/next/4.png').default} alt="Day 5 JWT" style={{maxWidth: '800px', width: '100%'}} />
</p>
- **Layout**: UI ที่ครอบ (wrap) หน้าหรือ route ย่อย ๆ ใต้ segment เดียวกัน เพื่อใช้ซ้ำ  
  - อยู่ใน `layout.js` และต้อง render `{children}` เพื่อให้ชั้นถัดไปแสดงผล  
  - ตัวอย่าง: `src/app/layout.js` ครอบทั้งเว็บ, `src/app/account/layout.js` ครอบเฉพาะ `/account/*`

<p align="center">
<img src={require('../../../static/img/day-6/next/5.png').default} alt="Day 5 JWT" style={{maxWidth: '800px', width: '100%'}} />
</p>
- **Page**: UI ของหน้าเว็บที่เข้าผ่าน URL ได้ อยู่ใน `page.js`  
  - เป็นจุดที่ผู้ใช้เห็น “เนื้อหาเฉพาะหน้า” ของ route นั้น  
  - โดยทั่วไปเป็น leaf ของเส้นทางนั้น (หน้า `/login` อยู่ที่ `src/app/login/page.js`)

หลักสำคัญ:

- โฟลเดอร์ภายใต้ `src/app/` สะท้อน URL
- `layout.js` ซ้อนกันได้หลายชั้น และห่อ UI ชั้นล่างผ่าน `{children}`
- `page.js` ทำให้ segment “เข้าผ่าน URL ได้”

---

## ประเภทของ Segments ที่ใช้บ่อย

### Static Segment

Static segment คือโฟลเดอร์ที่ตั้งชื่อไว้ตายตัว เช่น `dashboard` เมื่อเข้า URL `/dashboard` Next.js จะมองหา `page.js` ภายในโฟลเดอร์นั้นเพื่อแสดงผล

ตัวอย่าง:

```text
src/app/dashboard/page.js  →  /dashboard
```

### Dynamic Segment

Dynamic segment ใช้ `[]` คร่อมชื่อโฟลเดอร์ เช่น `[id]` เพื่อบอกว่า segment นี้ “เปลี่ยนค่าได้” ตาม URL โดยค่าจะถูกส่งเข้ามาใน `params`

ตัวอย่าง:

```text
src/app/books/[id]/page.js  →  /books/:id
```

```jsx
export default function BookPage({ params }) {
  return <div className="text-sm">id: {params.id}</div>;
}
```

ข้อสังเกต:

- `params.id` เป็น string เสมอ
- ก่อนใช้ทำงานจริงควร validate/แปลงประเภท (เช่น `Number(...)`)

### Nested Segments

Nested segments คือการสร้างโฟลเดอร์ซ้อนกัน เช่น `settings/profile` จะทำให้เกิด URL ที่มีหลาย segments ต่อกัน

ตัวอย่าง:

```text
src/app/settings/profile/page.js  →  /settings/profile
```

แต่ละชั้นสามารถมี `layout.js` ของตัวเองเพื่อทำ UI เฉพาะส่วนได้ เช่น:

```text
src/app/settings/layout.js
src/app/settings/profile/page.js
```

ผลคือทุกหน้าภายใต้ `/settings/*` จะถูกห่อด้วย `src/app/settings/layout.js` และยังถูกห่อด้วย `src/app/layout.js` (root) อีกชั้นหนึ่ง

---

## แบบฝึกหัด: สร้างหน้า Login/Register/Me

<p align="center">
<img src={require('../../../static/img/day-6/next/6.png').default} alt="Day 5 JWT" style={{maxWidth: '800px', width: '100%'}} />
</p>

- `/login` สำหรับ login
- `/register` สำหรับสร้างผู้ใช้
- `/me` สำหรับแสดงข้อมูลผู้ใช้จาก token

> ใน Day 6 workshop เราจะใส่ logic จริงของหน้า `/login` และ `/register` อีกที ที่บทย่อยนี้ให้เริ่มจาก “route ทำงานก่อน”

### Step 1: สร้างหน้า `/login`

สร้างไฟล์ `src/app/login/page.js`

```jsx
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="space-y-3">
      <h1 className="text-xl font-semibold">Login</h1>
      <div className="space-x-3 text-sm">
        <Link className="underline" href="/register">Create user</Link>
        <Link className="underline" href="/me">Me</Link>
      </div>
    </main>
  );
}
```

เปิด `http://localhost:<PORT>/login`

### Step 2: สร้างหน้า `/register`

สร้างไฟล์ `src/app/register/page.js`

```jsx
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className="space-y-3">
      <h1 className="text-xl font-semibold">Create user</h1>
      <div className="space-x-3 text-sm">
        <Link className="underline" href="/login">Login</Link>
      </div>
    </main>
  );
}
```

### Step 3: สร้างหน้า `/me`

สร้างไฟล์ `src/app/me/page.js`

```jsx
import Link from 'next/link';

export default function MePage() {
  return (
    <main className="space-y-3">
      <h1 className="text-xl font-semibold">Me</h1>
      <div className="space-x-3 text-sm">
        <Link className="underline" href="/login">Login</Link>
      </div>
    </main>
  );
}
```

<p align="center">
<img src={require('../../../static/img/day-6/next/7.png').default} alt="Day 5 JWT" style={{maxWidth: '800px', width: '100%'}} />
</p>
