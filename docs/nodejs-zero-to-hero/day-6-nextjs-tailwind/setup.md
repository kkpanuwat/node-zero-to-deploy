---
id: day-6-setup
title: 'Setup: Next.js (JS) + Tailwind'
sidebar_label: 'Setup'
---

<p align="center">
<img src={require('../../../static/img/day-6/index/1.png').default} alt="Day 5 JWT" style={{maxWidth: '800px', width: '100%'}} />
</p>

คาบนี้ตั้งใจให้รันคู่กับ Express API:

- Express API: `http://localhost:3000`
- Next.js: `http://localhost:<PORT>`

---

## 1) สร้างโปรเจกต์ Next.js (เลือก JavaScript)

สร้างโปรเจกต์:

```bash
npx create-next-app@latest kku-library-web
cd kku-library-web
```

ตอนรันคำสั่งจะมีคำถามให้ตอบ แนะนำให้ตอบประมาณนี้ (ให้เป็น JavaScript และเตรียมไว้ต่อกับ workshop):

| Prompt | เลือก |
|---|---|
| Would you like to use the recommended Next.js defaults? | No, customize settings |
| Would you like to use TypeScript? | No |
| Which linter would you like to use? | None *(ถ้าทีมอยากเข้ม เลือก ESLint ก็ได้)* |
| Would you like to use React Compiler? | No |
| Would you like to use Tailwind CSS? | Yes |
| Would you like your code inside a `src/` directory? | Yes |
| Would you like to use App Router? | Yes |
| Would you like to customize the import alias (`@/*` by default)? | Yes |
| What import alias would you like configured? | `@/*` |

อธิบายแต่ละตัว (เลือกไปทำไม):

- **Recommended defaults → No (customize)**: จะได้เลือกให้ตรงกับคลาส เช่น ไม่ใช้ TypeScript และเปิด Tailwind แน่นอน
- **TypeScript → No**: วันนี้โฟกัส JavaScript ให้ทุกคนตามทันก่อน
- **Linter → None**: ตัดความซับซ้อน/เสียงเตือนระหว่างเรียน (ถ้าทีมพร้อมค่อยเปิด ESLint ทีหลัง)
- **React Compiler → No**: ยังไม่จำเป็นสำหรับพื้นฐาน และบางทีทำให้ดีบักยากขึ้นในวันแรก
- **Tailwind CSS → Yes**: ใช้ทำ UI เร็ว ๆ ด้วย class utility ไม่ต้องเขียน CSS เยอะ
- **`src/` directory → Yes**: แยกโค้ดแอปไว้ใน `src/` ทำให้โปรเจกต์ดูเป็นระเบียบ
- **App Router → Yes**: ใช้โครง `src/app` ตามแนวทางใหม่ของ Next.js (route/layout ทำงานชัด)
- **Customize import alias → Yes**: ตั้ง alias ให้ import สั้นลง
- **Import alias `@/*`**: จะได้ import แบบ `@/components/...` แทน `../../components/...` เวลาโครงสร้างเริ่มลึก

รัน dev server ที่ port 3001 (กันชนกับ Express ที่ใช้ 3000):

```bash
npm run dev -- -p 3001
```

หรือถ้าคุณทำข้อ 3 (ให้อ่าน port จาก `.env.local`) แล้ว สามารถรันแค่:

```bash
npm run dev
```

---

## 2) ตั้งค่า `.env.local` สำหรับชี้ไปที่ Express API

สร้างไฟล์ `.env.local`:

```bash
PORT=3001
API_BASE_URL=http://localhost:3000
```

ตัวแปรนี้เราจะใช้ “ฝั่ง server” ของ Next (Route Handlers) เพื่อยิงไปที่ Express API โดยไม่ชนปัญหา CORS ที่เบราว์เซอร์

---

## 3) ให้ `npm run dev` อ่าน port จาก `.env.local`

ถ้าอยากให้ “สั่ง `npm run dev` แล้วใช้ port จากไฟล์ `.env.local` เลย” ให้ทำแบบนี้:

1) สร้างไฟล์ `scripts/dev.js`

```js
require('dotenv').config({ path: '.env.local' });

const { spawn } = require('child_process');

const port = process.env.PORT || '3001';

spawn(
  process.platform === 'win32' ? 'npm.cmd' : 'npm',
  ['run', 'dev:next', '--', '-p', port],
  { stdio: 'inherit' },
);
```

2) แก้ `package.json` ให้มี scripts:

```json
{
  "scripts": {
    "dev": "node scripts/dev.js",
    "dev:next": "next dev"
  }
}
```

หลังจากนี้เปลี่ยน port แค่แก้ที่ `.env.local` ได้เลย

---

## 4) เช็คว่า Tailwind พร้อมใช้งาน

ถ้าตอนสร้างโปรเจกต์เลือก Tailwind ไว้แล้ว ปกติจะพร้อมใช้งานทันที

ลองแก้ `src/app/page.js` ให้มี class ของ Tailwind สักบรรทัด เช่น:

```jsx
export default function Home() {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-bold">KKU Library</h1>
    </main>
  );
}
```
