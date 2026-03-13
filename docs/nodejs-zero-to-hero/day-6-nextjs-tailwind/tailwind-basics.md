---
id: day-6-tailwind-basics
title: 'Tailwind พื้นฐาน (ใช้งานให้พอดี)'
sidebar_label: 'Tailwind Basics'
---

จุดที่อยากให้ชินในวันแรก:

- ทำ layout ด้วย `flex`, `grid`, `gap`
- ใส่ระยะด้วย `p-*`, `m-*`, `space-y-*`
- ทำกรอบด้วย `border`, `rounded-*`
- ทำตัวอักษรด้วย `text-*`, `font-*`
- กำหนด container ด้วย `max-w-*` และ `mx-auto`

---

## ตัวอย่าง “การ์ด” ที่ใช้ได้บ่อย

```jsx
export function Card({ title, children }) {
  return (
    <section className="rounded-lg border bg-white p-4">
      <h2 className="text-base font-semibold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
```

---

## ตัวอย่างปุ่มและ input แบบง่าย

```jsx
export function Button({ children, ...props }) {
  return (
    <button
      className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  );
}
```

```jsx
export function TextInput(props) {
  return (
    <input
      className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
      {...props}
    />
  );
}
```

