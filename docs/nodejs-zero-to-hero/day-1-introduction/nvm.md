---
id: day-1-nvm
title: 'ติดตั้ง NVM (Node Version Manager)'
sidebar_label: 'Install NVM'
description: ติดตั้ง NVM เพื่อสลับเวอร์ชัน Node.js ได้ง่าย และทำงานให้ตรงกับทีม/โปรเจกต์
---

# ติดตั้ง NVM (Node Version Manager)

**NVM** ย่อมาจาก **Node Version Manager** เป็นเครื่องมือสำหรับ “จัดการหลายเวอร์ชันของ Node.js” บนเครื่องเดียว ทำให้เราสลับเวอร์ชัน Node ได้สะดวกโดยไม่ต้องลบ/ติดตั้งใหม่ทุกครั้ง

## NVM vs npm คืออะไร ต่างกันยังไง?

<p align="center">
  <img src={require('../../../static/img/day-1/day1-nvm-vs-npm.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

- **nvm** = ตัว “จัดการเวอร์ชันของ Node.js” (ติดตั้ง/สลับ Node หลายเวอร์ชันในเครื่องเดียว)
- **npm** = ตัว “จัดการแพ็กเกจ JavaScript” (ติดตั้ง dependencies ของโปรเจกต์ + รันสคริปต์ใน `package.json`)

### สรุปการใช้งาน

- **“จะใช้ Node 16 หรือ Node 20?”** → ใช้ **`nvm`**
- **“จะติดตั้งไลบรารี/แพ็กเกจอะไรในโปรเจกต์?”** → ใช้ **`npm`**

### ความสัมพันธ์ระหว่างกัน

- โดยปกติ **Node.js จะมาพร้อม `npm` (และ `npx`)** อยู่แล้ว
- ใช้ `nvm` สลับเวอร์ชัน Node → เวอร์ชันของ `npm` ที่มากับ Node เวอร์ชันนั้นก็จะเปลี่ยนตามด้วย
- “global packages” ที่ลงด้วย `npm -g` มักจะแยกกันตามแต่ละ Node เวอร์ชันที่ `nvm` จัดการ (สลับ Node แล้วแพ็กเกจ global ที่เคยลงไว้อาจไม่อยู่ในชุดเดิม)

ตัวอย่าง:

```bash
nvm use 20
node -v
npm -v

nvm use 18
node -v
npm -v
```

## ทำไมต้องใช้ NVM?

<p align="center">
  <img src={require('../../../static/img/day-1/day1-why-use-NVM.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

- **โปรเจกต์แต่ละอันใช้ Node คนละเวอร์ชันได้** (เช่น โปรเจกต์เก่าใช้ Node 16 แต่โปรเจกต์ใหม่ใช้ Node 20)
- **ลดปัญหา “รันของเพื่อนไม่ผ่าน แต่เครื่องฉันผ่าน”** เพราะทีมสามารถกำหนดเวอร์ชันเดียวกัน
- **ทดสอบได้หลายเวอร์ชัน** (เช่น เช็กว่าโค้ดรันได้ทั้ง Node LTS เก่า/ใหม่)
- **อัปเดตง่าย**: อยากย้ายไป LTS ล่าสุดก็ทำได้เร็ว

## ติดตั้ง NVM (macOS / Linux)

> หมายเหตุ: ขั้นตอนนี้คือ NVM ของ `nvm-sh` (ใช้ได้ดีบน macOS/Linux) ถ้าใช้ Windows ดูหัวข้อ “Windows” ด้านล่าง

### 1) ติดตั้งด้วยคำสั่ง

รันคำสั่งนี้ใน Terminal:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
```

### 2) โหลดค่า NVM ให้ Shell รู้จัก

ปกติสคริปต์จะเพิ่มบรรทัดไว้ในไฟล์ config ให้อัตโนมัติ เช่น `~/.zshrc` หรือ `~/.bashrc` แต่ถ้าเปิด Terminal แล้ว `nvm` ยังไม่เจอ ให้ลองเพิ่มเอง:

**สำหรับ zsh (`~/.zshrc`)**

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

**สำหรับ bash (`~/.bashrc`)**

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

จากนั้นปิดแล้วเปิด Terminal ใหม่ หรือรัน:

```bash
source ~/.zshrc
```

### 3) ตรวจสอบว่าติดตั้งสำเร็จ

```bash
nvm --version
```

ถ้าเห็นเลขเวอร์ชัน (เช่น `0.xx.x`) แปลว่าใช้ได้แล้ว

## วิธีใช้งานพื้นฐาน

### ติดตั้ง Node.js เวอร์ชัน LTS และใช้งาน

```bash
nvm install --lts
nvm use --lts
node -v
```

### ตั้งค่าให้ใช้ LTS เป็นค่าเริ่มต้น

```bash
nvm alias default lts/*
```

### ตั้งค่าเวอร์ชันแบบ “Global” (ค่าเริ่มต้นของเครื่อง)

ในบริบทของ NVM คำว่า “global” มักหมายถึง **เวอร์ชันเริ่มต้น (default) ที่จะถูกเลือกเมื่อเราเปิด Terminal ใหม่**

ตั้งค่าให้ใช้ Node 20 เป็นค่าเริ่มต้น:

```bash
nvm install 20
nvm alias default 20
```

ตรวจสอบว่า default ชี้ไปที่อะไร:

```bash
nvm alias default
```

เช็กเวอร์ชันที่กำลังใช้อยู่ตอนนี้:

```bash
nvm current
node -v
```

### สลับเวอร์ชันตามต้องการ

```bash
nvm install 20
nvm use 20
node -v
```

## Use case ที่พบบ่อย

### 1) โปรเจกต์เก่า/ใหม่ใช้ Node คนละเวอร์ชัน

- โปรเจกต์ A (เก่า): ต้องใช้ Node 16
- โปรเจกต์ B (ใหม่): ต้องใช้ Node 20

เราสามารถสลับได้ทันที:

```bash
nvm use 16
# ทำงานกับโปรเจกต์ A

nvm use 20
# ทำงานกับโปรเจกต์ B
```

### 2) บังคับเวอร์ชัน Node ให้ตรงกับทีมด้วย `.nvmrc`

ให้สร้างไฟล์ชื่อ `.nvmrc` ที่โฟลเดอร์โปรเจกต์ (เช่นใส่ `20` หรือ `20.11.1`)

จากนั้นทุกคนในทีมสามารถรัน:

```bash
nvm install
nvm use
```

ผลคือทุกคนจะใช้ Node เวอร์ชันเดียวกันตามไฟล์ `.nvmrc`

### 3) แก้ปัญหา dependency ไม่รองรับ Node รุ่นใหม่

บางครั้งแพ็กเกจเก่าอาจยังไม่รองรับ Node รุ่นใหม่ ทำให้ `npm install` หรือ `npm run dev` พัง

ทางออกที่สะอาดคือ “สลับกลับไป Node ที่รองรับ” ด้วย NVM แทนการพยายามแก้แบบสุ่ม:

```bash
nvm use 18
```

## Windows ต้องทำยังไง?

<p align="center">
  <img src={require('../../../static/img/day-1/nvm-not-fount.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

ถ้ารัน `nvm -v` แล้วขึ้นว่า `'nvm' is not recognized...` แปลว่าเครื่องยังไม่รู้จักคำสั่ง `nvm` (ยังไม่ได้ติดตั้ง หรือยังไม่ได้เปิด Terminal/Command Prompt ใหม่หลังติดตั้ง)

NVM แบบ `nvm-sh` ไม่รองรับ Windows ตรง ๆ โดยทั่วไปนิยมใช้ **nvm-windows** (เป็นคนละโปรเจกต์) หรือใช้ WSL (Windows Subsystem for Linux)

- ถ้าใช้ **nvm-windows**:
  - ดาวน์โหลดจาก https://github.com/coreybutler/nvm-windows/releases (แนะนำไปที่หน้า Releases แล้วโหลดไฟล์ `nvm-setup.exe`)

  <p align="center">
    <img src={require('../../../static/img/day-1/nvm-setup.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
  </p>

	  **ขั้นตอนติดตั้ง nvm-windows (ตามภาพ)**

  **Step 1: ยอมรับ License Agreement**

  - เปิดไฟล์ `nvm-setup.exe`
  - เลือก “I accept the agreement” แล้วกด `Next`

  <p align="center">
    <img src={require('../../../static/img/day-1/nvm-1.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
  </p>

  **Step 2: เลือกโฟลเดอร์ติดตั้ง NVM**

  - ปล่อยค่า default ได้เลย (มักเป็น `C:\\Users\\<ชื่อผู้ใช้>\\AppData\\Local\\nvm`)
  - กด `Next`

  <p align="center">
    <img src={require('../../../static/img/day-1/nvm-2.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
  </p>

  **Step 3: ตั้งค่า Active Version Location (ที่อยู่ Node เวอร์ชันที่กำลังใช้งาน)**

  - ตรงนี้คือโฟลเดอร์ที่ nvm-windows จะสร้าง “ทางลัด (symlink)” ให้ชี้ไปยัง Node เวอร์ชันที่เรา `nvm use` อยู่
  - ปล่อยค่า default ได้เลย (เช่น `C:\\nvm4w\\nodejs`)
  - กด `Next`

  <p align="center">
    <img src={require('../../../static/img/day-1/nvm-3.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
  </p>

  **Step 4: พร้อมติดตั้ง**

  - ตรวจสอบ path คร่าว ๆ แล้วกด `Install`

  <p align="center">
    <img src={require('../../../static/img/day-1/nvm-4.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
  </p>

  **Step 5: Email Signup (ข้ามได้)**

  - ช่องอีเมลเป็น optional ใส่หรือไม่ใส่ก็ได้
  - ถ้าไม่ต้องการ ให้ปล่อยว่างแล้วกด `Next`

  <p align="center">
    <img src={require('../../../static/img/day-1/nvm-5.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
  </p>

  **Step 6: Desktop Notifications (เลือกได้ตามต้องการ)**

  - ติ๊กเพื่อรับแจ้งเตือนเวอร์ชันใหม่ ๆ หรือเอาออกก็ได้
  - กด `Next`

  <p align="center">
    <img src={require('../../../static/img/day-1/nvm-6.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
  </p>

  **Step 7: ทดสอบว่า `nvm` ใช้งานได้**

  - ปิดแล้วเปิด `Command Prompt` / `PowerShell` ใหม่
  - รัน `nvm -v` ถ้าเห็นเลขเวอร์ชัน แปลว่าติดตั้งสำเร็จ

  <p align="center">
    <img src={require('../../../static/img/day-1/nvm-7.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
  </p>

  - จากนั้นค่อยเริ่มใช้งานด้วย `nvm install <version>` และ `nvm use <version>`
  - ดูคำสั่ง `nvm` เพิ่มเติม (Command Line): https://www.nvmnode.com/cli/

## Checkpoint

1) ติดตั้ง Node LTS ผ่าน `nvm install --lts`
2) เช็กเวอร์ชันด้วย `node -v`
