---
id: day-2-lab-1-project-foundation
title: 'Lab 1: Project Foundation'
sidebar_label: '1. Project Foundation'
---

**เป้าหมาย:** สร้างโครงสร้างโปรเจกต์ที่สะอาด, พร้อมสำหรับ Git, และทุกคนในทีมสามารถเข้ามาทำงานต่อได้

> Timebox แนะนำ: 30–45 นาที

### 1.1: เริ่มต้น Project และ Git
1.  **สร้างโฟลเดอร์โปรเจกต์:**
    ```bash
    mkdir library-system
    cd library-system
    ```
2.  **เริ่มต้น `npm` project:**
    ```bash
    npm init -y
    ```
    คำสั่งนี้จะสร้างไฟล์ `package.json` ซึ่งเปรียบเสมือน "บัตรประชาชน" ของโปรเจกต์เรา

3.  **เริ่มต้น `git` repository:**
    ```bash
    git init
    ```
4.  **สร้าง `.gitignore` (สำคัญมาก!):**
    เพื่อบอกให้ Git ไม่ต้องสนใจไฟล์หรือโฟลเดอร์ที่เราไม่ต้องการเก็บในประวัติ
    ```bash
    # สร้างไฟล์ .gitignore และเพิ่มรายการที่ไม่ต้องการ track
    printf "node_modules\n.env\n*.log\n" > .gitignore
    ```
    เราจะ ignore `node_modules`, ไฟล์ `.env` ที่เก็บความลับ, และไฟล์ log ต่างๆ

### 1.2: สร้างโครงสร้างโฟลเดอร์
เราจะใช้โครงสร้างพื้นฐานที่นิยมใช้กันในโปรเจกต์ Node.js
```bash
mkdir -p src/data src/utils
touch src/server.js src/data/books-in-memory.js src/utils/logger.js
```
- `src/`: โฟลเดอร์หลักสำหรับเก็บซอร์สโค้ดทั้งหมด
- `src/server.js`: ไฟล์เริ่มต้น (Entrypoint) ของแอปพลิเคชัน
- `src/data/`: สำหรับเก็บข้อมูลต่างๆ (ตอนนี้เป็นแค่ข้อมูลจำลอง)
- `src/utils/`: สำหรับเก็บฟังก์ชันช่วยเหลือที่ใช้ซ้ำๆ

### 1.3: เพิ่มข้อมูลจำลอง
ใส่ข้อมูลหนังสือเบื้องต้นลงใน `src/data/books-in-memory.js`:
```javascript
// src/data/books-in-memory.js
const books = [
  { id: 1, title: 'JavaScript for Beginners', author: 'Alice' },
  { id: 2, title: 'Node.js Essentials', author: 'Bob' },
];

module.exports = { books };
```

**✅ Checkpoint:**
- คุณมีโปรเจกต์ที่ init ทั้ง `npm` และ `git` แล้ว
- `package.json` และ `.gitignore` ถูกสร้างขึ้นอย่างถูกต้อง
- โครงสร้างโฟลเดอร์และไฟล์เบื้องต้นพร้อมใช้งาน
- ลองรัน `git status` และ `git add .` ตามด้วย `git commit -m "feat: initial project structure"` เพื่อบันทึกงานแรกของคุณ

### Mini Challenges (ถ้ามีเวลา)

1. สร้าง `README.md` สั้นๆ ที่มี:
   - วิธีรัน `npm run dev`
   - รายชื่อ endpoint ที่จะทำวันนี้ (`/health`, `/books`)
2. เพิ่มโฟลเดอร์ `src/repositories` และ `src/handlers` (เตรียมไว้สำหรับตอน refactor)
