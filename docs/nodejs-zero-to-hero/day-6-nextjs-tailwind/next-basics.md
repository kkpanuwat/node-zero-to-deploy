---
id: day-6-next-basics
title: 'Next.js พื้นฐาน (App Router)'
sidebar_label: 'Next Basics'
---

## 1) แนวคิดที่ต้องรู้ก่อน

ใน App Router ของ Next.js:

- `src/app/page.js` คือหน้า `/`
- โฟลเดอร์คือ route เช่น `src/app/books/page.js` คือหน้า `/books`
- โฟลเดอร์ที่มี `layout.js` จะห่อหน้าทุกหน้าด้านใน

---

## 2) สร้าง Layout กลางของเว็บ

แก้ `src/app/layout.js` (แนวคิดคือมี header + container)

```jsx
export const metadata = {
  title: 'KKU Library',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b">
          <div className="mx-auto max-w-4xl px-4 py-3">
            <a href="/" className="font-semibold">KKU Library</a>
          </div>
        </header>
        <div className="mx-auto max-w-4xl px-4 py-6">{children}</div>
      </body>
    </html>
  );
}
```

---

## 3) สร้างหน้า `/books`

สร้างไฟล์ `src/app/books/page.js`

```jsx
export default function BooksPage() {
  return (
    <main>
      <h1 className="text-xl font-semibold">Books</h1>
      <p className="text-sm text-gray-600">หน้านี้เราจะมา list หนังสือจาก API</p>
    </main>
  );
}
```

---

## 4) Route แบบมีพารามิเตอร์ `/books/[id]`

สร้างไฟล์ `src/app/books/[id]/page.js`

```jsx
export default function BookDetailPage({ params }) {
  return (
    <main>
      <h1 className="text-xl font-semibold">Book #{params.id}</h1>
    </main>
  );
}
```

