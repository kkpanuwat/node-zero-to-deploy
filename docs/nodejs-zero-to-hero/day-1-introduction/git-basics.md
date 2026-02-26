---
id: day-1-git-basics
title: 'Git & Version Control 101'
sidebar_label: Git Basics
description: เข้าใจ Git คืออะไร, ทำไมต้องมี Version Control, คำสั่งสำคัญ รวมถึงแนวทางการตั้ง prefix ให้ commit และการทำงานกับ branch
---

# Part 3 — Git Basics (Version Control 101)

Git คือระบบ **Version Control** (VCS) ที่ช่วยให้เราบันทึก, ย้อนกลับ, และทำงานร่วมกับผู้อื่นได้อย่างเป็นระเบียบ เสมือนมี Time Machine สำหรับซอร์สโค้ด เมื่อทำงานโปรเจกต์จริง Git จะเป็นหัวใจที่คอยเชื่อมต่อทั้งทีมเข้าด้วยกัน

## สมัคร GitHub (เพื่อเก็บโค้ดออนไลน์/ทำงานเป็นทีม)

Git คือเครื่องมือบนเครื่องเรา แต่เวลาทำงานเป็นทีมเรามักใช้ **GitHub** เป็นที่เก็บ repo แบบออนไลน์ (remote)

### Step-by-step สมัคร GitHub

1) เข้าไปที่ https://github.com/signup  
<p align="center">
  <img src={require('../../../static/img/day-1/git-1.png').default} alt="หน้าแรก GitHub (มีปุ่ม Sign up มุมขวาบน)" style={{maxWidth: '800px', width: '100%'}} />
</p>
<p align="center">
  <em>ภาพที่ 1: หน้าแรก GitHub — กด <strong>Sign up</strong> (มุมขวาบน) เพื่อเริ่มสมัคร หรือพิมพ์อีเมลในช่องกลางหน้าแล้วกด <strong>Sign up for GitHub</strong> ก็ได้</em>
</p>
2) กรอก `Email` / `Password` / `Username` แล้วทำขั้นตอนยืนยันตามที่เว็บแจ้ง หรือสามารถสมัครผ่าน Google account ได้ 
<p align="center">
  <img src={require('../../../static/img/day-1/git-2.png').default} alt="หน้า Sign up for GitHub (ฟอร์ม Email/Password/Username และปุ่ม Create account)" style={{maxWidth: '800px', width: '100%'}} />
</p>
<p align="center">
  <em>ภาพที่ 2: หน้า Sign up — เลือกสมัครด้วย Google/Apple หรือกรอกอีเมล/รหัสผ่าน/ชื่อผู้ใช้ จากนั้นกด <strong>Create account</strong> (ถ้ามีบัญชีอยู่แล้วกด <strong>Sign in</strong> มุมขวาบนได้เลย)</em>
</p>
3) ไปที่อีเมล แล้วกดลิงก์เพื่อ **Verify email** (ถ้าไม่ verify บางฟีเจอร์จะใช้ไม่ได้)  
4) (แนะนำ) เปิด **Two-factor authentication (2FA)** ใน Settings เพื่อความปลอดภัย  

### วิธี Login GitHub (บนเว็บ)

1) เข้าไปที่ https://github.com/login (หรือกด **Sign in** มุมขวาบนจากหน้าแรก)  
2) กรอก **Username/Email** และ **Password** แล้วกด **Sign in**  
3) ถ้าเปิด **2FA** ไว้ ระบบจะให้กรอกรหัสยืนยัน (Authenticator / SMS / Passkey แล้วแต่ที่ตั้งค่า)  

> ทิป: ถ้าเครื่องเป็นเครื่องสาธารณะ อย่าติ๊ก “Remember me” และอย่าลืม Sign out ทุกครั้ง

### สร้าง Repository แรกบน GitHub

หลังสมัครเสร็จ คุณจะสามารถ:

- สร้าง repository ใหม่บน GitHub
<p align="center">
  <img src={require('../../../static/img/day-1/git-3.png').default} alt="หน้า GitHub Dashboard (ปุ่ม New เพื่อสร้าง repository)" style={{maxWidth: '800px', width: '100%'}} />
</p>
<p align="center">
  <em>ภาพที่ 3: GitHub Dashboard — กดปุ่ม <strong>New</strong> เพื่อสร้าง repository ใหม่</em>
</p>
<p align="center">
  <img src={require('../../../static/img/day-1/git-4.png').default} alt="หน้า Create a new repository (ตั้งชื่อ repo, เลือก Public/Private และกด Create repository)" style={{maxWidth: '800px', width: '100%'}} />
</p>
<p align="center">
  <em>ภาพที่ 4: ฟอร์มสร้าง repo — ตั้งชื่อ <strong>Repository name</strong>, เลือก <strong>Public/Private</strong>, (ถ้าต้องการ) เปิด <strong>Add README</strong> แล้วกด <strong>Create repository</strong></em>
</p>
<p align="center">
  <img src={require('../../../static/img/day-1/git-5.png').default} alt="หน้า repo หลังสร้างเสร็จ (Quick setup, URL และคำสั่ง git remote/push)" style={{maxWidth: '800px', width: '100%'}} />
</p>
<p align="center">
  <em>ภาพที่ 5: หน้า repo หลังสร้างเสร็จ — คัดลอก URL (HTTPS/SSH) และทำตามคำสั่งด้านล่างเพื่อเชื่อม repo บนเครื่องกับ GitHub แล้ว <strong>push</strong> ขึ้นไป</em>
</p>
> หมายเหตุ: ถ้าใช้ **HTTPS** ตอน `git push` ระบบจะให้ยืนยันตัวตนด้วย **Personal Access Token (PAT)** (ไม่ใช้ password แล้ว) หรืออีกทางคือใช้ **SSH** แล้วตั้งค่า SSH key ครั้งเดียว
- ทำงานผ่าน Pull Request/Code Review
- เชื่อม repo บนเครื่องเข้ากับ GitHub ด้วย `git remote add origin ...` แล้ว `git push`

### Login/เชื่อม GitHub กับ VS Code (แนะนำ)

เวลาใช้ VS Code ทำงานกับ GitHub (เช่น GitHub Actions, Copilot, หรือเปิด repo ผ่านบัญชี) เราสามารถ Sign in ได้จากในโปรแกรม

1) เปิด VS Code → คลิกไอคอนโปรไฟล์มุมซ้ายล่าง → เลือก **Sign in with GitHub**
<p align="center">
  <img src={require('../../../static/img/day-1/git-6.png').default} alt="VS Code (เมนูโปรไฟล์มุมซ้ายล่าง และตัวเลือก Sign in with GitHub)" style={{maxWidth: '900px', width: '100%'}} />
</p>
<p align="center">
  <em>ภาพที่ 6: VS Code — เริ่ม Sign in โดยกด <strong>Sign in with GitHub</strong> จากเมนูโปรไฟล์มุมซ้ายล่าง</em>
</p>

2) เบราว์เซอร์จะเด้งหน้า GitHub ให้ “Authorize Visual Studio Code” → เลือกบัญชีแล้วกด **Continue**
<p align="center">
  <img src={require('../../../static/img/day-1/git-7.png').default} alt="GitHub Authorize Visual Studio Code (ปุ่ม Continue หรือเลือกบัญชีอื่น)" style={{maxWidth: '900px', width: '100%'}} />
</p>
<p align="center">
  <em>ภาพที่ 7: GitHub Authorization — อนุญาตให้ VS Code เข้าถึงบัญชี GitHub (ถ้ามี 2FA ระบบจะให้ยืนยันเพิ่ม)</em>
</p>

3) กลับมา VS Code → สถานะด้านล่างควรขึ้นว่า Sign in แล้ว (จากนั้นค่อย clone/pull/push ได้ตามปกติ)

## ทำไมต้องใช้ Version Control

- **ย้อนเวลาได้:** ทุก commit เก็บ snapshot ของโค้ด หากเกิดปัญหาสามารถย้อนกลับไปยังสถานะก่อนหน้าได้ทันที
- **ทำงานเป็นทีมไม่ชนกัน:** แต่ละคนสามารถมี branch ของตัวเอง แก้โค้ดในพื้นที่ปลอดภัยแล้วค่อยรวม (merge) เมื่อพร้อม
- **มีประวัติที่อธิบายได้:** commit message ที่ดีช่วยบอกเล่าเหตุผลว่าทำไมต้องแก้ ให้ทั้งตัวเองและเพื่อนร่วมทีมเข้าใจบริบทในอนาคต
- **ออโตเมชันอื่น ๆ ผูกกับ Git ได้:** เช่น ระบบ CI/CD, code review หรือ deployment ล้วนเริ่มจาก commit / branch ที่ชัดเจน

## Git Workflow เบื้องต้น

> Flow พื้นฐานที่เราจะใช้ในแล็บประกอบด้วย: ตรวจสถานะ → เพิ่มไฟล์ลง staging → commit พร้อมข้อความสื่อความหมาย

### 1. เริ่มต้นและตรวจสถานะ

```bash
git init                # สร้าง repository (ทำครั้งแรกของโปรเจกต์)
git status              # เช็กว่าไฟล์ไหนถูกแก้ไข/เพิ่ม และอยู่สถานะอะไร
```

ถ้า clone โปรเจกต์มาจากที่อื่นอยู่แล้ว ไม่ต้อง `git init` อีก ใช้ `git status` เพื่อดูภาพรวมก่อนเสมอ

### 2. จัดการไฟล์ที่จะแชร์ให้ทีม

```bash
git add path/to/file    # เพิ่มไฟล์ที่ต้องการ
git add .               # เพิ่มทุกไฟล์ที่ Git เห็น (ควรใช้แบบรู้ว่ามีอะไรบ้าง)
```

`git add` คือการบอก Git ว่า "ไฟล์ชุดนี้พร้อมเข้าคอมมิต" หรือที่เรียกว่า **staging area**

### 3. สร้าง commit ที่มีความหมาย

```bash
git commit -m "feat: add hello-library script"
```

เคล็ดลับ: ใช้ prefix สั้น ๆ ที่สื่อประเภทของการเปลี่ยนแปลง เพื่อให้ทีมอ่านไทม์ไลน์ได้ไว

| Prefix | ใช้เมื่อ...                    | ตัวอย่าง                          |
|--------|---------------------------------|-----------------------------------|
| `feat` | เพิ่มฟีเจอร์หรือเนื้อหาใหม่     | `feat: add checkout summary card` |
| `fix`  | แก้บั๊กหรือแก้เนื้อหาที่ผิด     | `fix: correct loan status typo`   |
| `docs` | ปรับปรุงเอกสาร                 | `docs: add Git basics part`       |
| `refactor` | ปรับโครงสร้างโค้ดโดยไม่เพิ่มฟีเจอร์ | `refactor: split utils module` |

> ใช้ prefix ให้ตรงกับสิ่งที่ทำจริง ๆ และเขียนต่อท้ายเป็นคำอธิบายสั้น ๆ ว่ามีอะไรเปลี่ยน

### 4. ดูประวัติและตรวจสอบก่อนส่ง

```bash
git log --oneline --graph  # ดูประวัติแบบสรุป
git show <commit_hash>     # ดูรายละเอียด commit ใด commit หนึ่ง
```

`git log` คือเพื่อนรักในการตามหาความเปลี่ยนแปลง หรือยืนยันว่า commit ไปแล้วจริงหรือไม่

## การทำงานกับ Branch

Branch ช่วยให้เราทดลอง, แก้บั๊ก หรือสร้างฟีเจอร์ใหม่โดยไม่รบกวน main branch

### สร้างและย้าย branch

```bash
git branch                   # แสดงรายชื่อ branch
git checkout -b feature/git-basics   # สร้าง branch ใหม่และสลับไป branch นั้น
# หรือ
git switch -c fix/login-validation
```

หลังทำงานเสร็จสามารถ merge กลับเข้า `main` ผ่าน pull request หรือ `git merge` ได้

### ตั้งชื่อ branch ให้สื่อความหมาย

- ใช้ prefix ที่สื่อประเภทงาน เช่น `feature/`, `fix/`, `chore/`
- ตามด้วยประโยคสั้น ๆ เช่น `feature/hello-library-lab`, `fix/loan-due-date`
- หลีกเลี่ยงการใช้ชื่อกว้าง ๆ เช่น `update` หรือ `temp` เพราะไม่ช่วยให้ทีมเข้าใจ

> ตัวอย่าง workflow: `git checkout -b feature/setup-ci` → ทำงานและ commit หลายครั้ง → เปิด Pull Request → เมื่อรีวิวผ่านก็ค่อย merge กลับ `main`
