---
id: day-3-dbeaver-const
title: 'DBeaver Database management tools [Cont.]'
sidebar_label: 'DBeaver Database management tools [Cont.]'
---

Workshop นี้ให้ทดลองรัน PostgreSQL ด้วย Docker Compose เพื่อเตรียม “ฐานข้อมูลพร้อมใช้งาน” สำหรับโปรเจกต์ API ในวันถัดไป

---

## เชื่อมต่อ PostgreSQL บน Server Lab (ผ่าน SSH Tunnel)

ข้อมูลที่ใช้ในแลปนี้:

- Server (SSH): `147.50.228.55`
- Database: `kku_library`
- DB Username/Password: ใช้ชุดที่แจกในห้องแลป
- SSH Username: `student02` (รหัสผ่านตามที่แจกในห้องแลป)

> หมายเหตุ: **DB Username/Password** (ไว้ล็อกอินเข้า PostgreSQL) ไม่จำเป็นต้องเป็นอันเดียวกับ **SSH Username/Password** (ไว้ ssh เข้าเครื่อง)

---

<p align="center">
  <img src={require('../../../static/img/day-3/dbeaver/8.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

เลือกชนิดฐานข้อมูลเป็น **PostgreSQL** แล้วกด **Next**

---

<p align="center">
  <img src={require('../../../static/img/day-3/dbeaver/9.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

ในแท็บ **Main** ให้กรอกค่าการเชื่อมต่อดังนี้

- `Database`: `kku_library`
- `Username` / `Password`: ใช้ชุดที่แจกในห้องแลป

จากจุดนี้เลือกทำได้ 2 วิธี (เลือกทำ **อย่างใดอย่างหนึ่ง**) เพื่อกำหนด `Host` / `Port` ให้ถูกต้อง

---

## วิธี A: ให้ DBeaver ทำ SSH Tunnel ให้

### (1) ตั้งค่าในแท็บ Main

- `Host`: `127.0.0.1` (หรือ `localhost`)
- `Port`: `5432`

<p align="center">
  <img src={require('../../../static/img/day-3/dbeaver/10.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

### (2) ตั้งค่าในแท็บ SSH

- ติ๊ก `Use SSH Tunnel`
- `Host/IP`: `147.50.228.55`
- `Port`: `22`
- `User Name`: `student02`
- `Authentication Method`: `Password`
- `Password`: รหัสผ่าน SSH ที่แจกในห้องแลป

จากนั้นกลับไปแท็บ **Main** แล้วกด **Test Connection** → ถ้าผ่านให้กด **Finish**

---

## วิธี B: ทำ SSH Tunnel ด้วย Terminal เอง

<p align="center">
  <img src={require('../../../static/img/day-3/dbeaver/11.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

### (1) เปิด Tunnel ใน Terminal

เปิด Terminal แล้วรันคำสั่งนี้:

```bash
ssh -N -L 15432:127.0.0.1:5432 student02@147.50.228.55
```

- ใส่รหัสผ่าน SSH ของ `student02` (จากที่แจกในแลป)
- **ห้ามปิด Terminal นี้** ระหว่างใช้งาน (เพราะเป็นตัวทำ tunnel)
