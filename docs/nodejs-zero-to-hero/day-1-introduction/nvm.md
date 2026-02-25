---
id: day-1-nvm
title: 'ติดตั้ง NVM (Node Version Manager)'
sidebar_label: 'Install NVM'
description: ติดตั้ง NVM เพื่อสลับเวอร์ชัน Node.js ได้ง่าย และทำงานให้ตรงกับทีม/โปรเจกต์
---

# ติดตั้ง NVM (Node Version Manager)

**NVM** ย่อมาจาก **Node Version Manager** เป็นเครื่องมือสำหรับ “จัดการหลายเวอร์ชันของ Node.js” บนเครื่องเดียว ทำให้เราสลับเวอร์ชัน Node ได้สะดวกโดยไม่ต้องลบ/ติดตั้งใหม่ทุกครั้ง

## ทำไมต้องใช้ NVM?

- **โปรเจกต์แต่ละอันใช้ Node คนละเวอร์ชันได้** (เช่น โปรเจกต์เก่าใช้ Node 16 แต่โปรเจกต์ใหม่ใช้ Node 20)
- **ลดปัญหา “รันของเพื่อนไม่ผ่าน แต่เครื่องฉันผ่าน”** เพราะทีมสามารถกำหนดเวอร์ชันเดียวกัน
- **ทดสอบได้หลายเวอร์ชัน** (เช่น เช็กว่าโค้ดรันได้ทั้ง Node LTS เก่า/ใหม่)
- **อัปเดตง่าย**: อยากย้ายไป LTS ล่าสุดก็ทำได้เร็ว

## ติดตั้ง NVM (macOS / Linux)

> หมายเหตุ: ขั้นตอนนี้คือ NVM ของ `nvm-sh` (ใช้ได้ดีบน macOS/Linux) ถ้าใช้ Windows ดูหัวข้อ “Windows” ด้านล่าง

### 1) ติดตั้งด้วยคำสั่งเดียว

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

## Use case ที่พบบ่อย (ทำไม NVM ถึงช่วยชีวิต)

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

NVM แบบ `nvm-sh` ไม่รองรับ Windows ตรง ๆ โดยทั่วไปนิยมใช้ **nvm-windows** (เป็นคนละโปรเจกต์) หรือใช้ WSL (Windows Subsystem for Linux)

- ถ้าใช้ **nvm-windows**: ติดตั้งผ่านตัว installer แล้วใช้คำสั่ง `nvm install <version>` และ `nvm use <version>`
- ถ้าใช้ **WSL**: สามารถติดตั้ง NVM แบบ macOS/Linux ได้ตามขั้นตอนด้านบน

## เช็กตัวเอง (สั้น ๆ)

1) ติดตั้ง Node LTS ผ่าน `nvm install --lts`
2) เช็กเวอร์ชันด้วย `node -v`
3) ลองสร้างไฟล์ `.nvmrc` ในโปรเจกต์ แล้วรัน `nvm use` ดูว่าเปลี่ยนเวอร์ชันตามไฟล์ได้ไหม
