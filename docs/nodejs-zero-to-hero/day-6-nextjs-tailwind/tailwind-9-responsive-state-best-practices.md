---
id: day-6-tailwind-9-responsive-state-best-practices
title: '9) Responsive + State + แนวทางจัดโค้ดให้เป็นระเบียบ'
sidebar_label: '9) Responsive & Best Practices'
---

## Responsive (mobile-first)

Tailwind ใช้แนวคิด mobile-first: เขียนค่าพื้นฐานสำหรับจอเล็กก่อน แล้วค่อยเพิ่ม breakpoint เมื่อจอใหญ่ขึ้น

breakpoints ที่ใช้บ่อย:

- `sm:` เริ่มขยาย
- `md:` จอกลาง
- `lg:` จอใหญ่

ตัวอย่าง:

```jsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {/* cards */}
</div>
```

---

## State: hover/focus/disabled

UI ที่ดีควรรองรับการใช้งานด้วยเมาส์และคีย์บอร์ด

ตัวอย่างปุ่ม:

```jsx
export function Button({ children, ...props }) {
  return (
    <button
      className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black/30 disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  );
}
```

ตัวอย่าง input:

```jsx
export function TextInput(props) {
  return (
    <input
      className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
      {...props}
    />
  );
}
```