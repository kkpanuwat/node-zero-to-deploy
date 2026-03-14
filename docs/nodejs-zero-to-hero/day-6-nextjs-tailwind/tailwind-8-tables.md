---
id: day-6-tailwind-8-tables
title: '8) Tables (รายการข้อมูลแบบตาราง)'
sidebar_label: '8) Tables'
---

## ใช้ตารางเมื่อไหร่

ตารางเหมาะกับข้อมูลที่มี “คอลัมน์ชัด” เช่น รายการผู้ใช้ รายการยืมคืน รายการหนังสือแบบสรุป

หลักการทำตารางให้อ่านง่าย:

- มี header (`thead`) ชัดเจน
- ระยะ padding ใน cell สม่ำเสมอ
- แยกแถวด้วย `border-b`
- รองรับการ scroll แนวนอนบนมือถือ

---

## ตัวอย่างตารางพื้นฐาน

```jsx
export default function BorrowTable({ rows }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-50 text-left">
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 font-medium text-gray-900">Book</th>
            <th className="px-4 py-3 font-medium text-gray-900">Due</th>
            <th className="px-4 py-3 font-medium text-gray-900">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-gray-200 last:border-b-0">
              <td className="px-4 py-3">{r.title}</td>
              <td className="px-4 py-3 text-gray-600">{r.dueDate}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### ตัวอย่างข้อมูล (mock)

เวลาเริ่มทำหน้า UI สามารถใช้ข้อมูลจำลองเพื่อเห็นหน้าตาก่อน แล้วค่อยเปลี่ยนเป็นข้อมูลจาก API ภายหลัง

```js
const rows = [
  { id: 1, title: 'Design Patterns', dueDate: '2026-03-30', status: 'borrowed' },
  { id: 2, title: 'The C Programming Language', dueDate: '2026-03-25', status: 'overdue' },
  { id: 3, title: 'Clean Code', dueDate: '2026-04-02', status: 'returned' },
];
```

ตัวอย่างการเรียกใช้:

```jsx
import BorrowTable from './BorrowTable';

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl space-y-4 px-4 py-6">
      <h1 className="text-xl font-semibold">My borrows</h1>
      <BorrowTable rows={rows} />
    </main>
  );
}
```

จุดสังเกต:

- wrapper `overflow-x-auto` ช่วยให้มือถือ scroll แนวนอนได้
- `border-collapse` ทำให้ขอบดูเรียบ
- `last:border-b-0` ป้องกันเส้นขอบแถวสุดท้าย
