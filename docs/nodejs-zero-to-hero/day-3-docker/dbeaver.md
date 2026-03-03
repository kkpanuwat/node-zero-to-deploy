---
id: day-3-docker-dbeaver
title: 'DBeaver Database management tools'
sidebar_label: 'DBeaver Database management tools'
---

## ดาวน์โหลด DBeaver

ให้ดาวน์โหลด **DBeaver Community** (ตัวฟรี) จากหน้า Download ของ DBeaver แล้วติดตั้งตาม OS ของตัวเอง

<p align="center">
  <img src={require('../../../static/img/day-3/dbeaver/1.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

<p align="center">
  <img src={require('../../../static/img/day-3/dbeaver/2.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

---

## เชื่อมต่อ PostgreSQL ที่รันจาก Compose (Workshop 2)

ก่อนเชื่อมต่อ ให้แน่ใจก่อนว่าเราได้รัน DB จากไฟล์ `compose.yaml` แล้ว:

```bash
docker compose up -d
docker compose ps
```

ถ้า `db` ขึ้นสถานะ `healthy` (หรืออย่างน้อย `Up`) แปลว่าเริ่มเชื่อมต่อได้

---

## ขั้นตอนการเชื่อมต่อด้วย DBeaver

1) เปิด DBeaver 
2) กด **New Database Connection**  
<p align="center">
<img src={require('../../../static/img/day-3/dbeaver/3.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p> 

3) เลือก **PostgreSQL**  
<p align="center">
<img src={require('../../../static/img/day-3/dbeaver/4.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p> 

4) ใส่ค่าการเชื่อมต่อให้ตรงกับ `docker-compose.yaml` (ดูตารางด้านล่าง)  
<p align="center">
<img src={require('../../../static/img/day-3/dbeaver/5.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p> 

5) กด **Test Connection** (ครั้งแรกอาจให้ดาวน์โหลด driver ให้กดยืนยัน)  
<p align="center">
<img src={require('../../../static/img/day-3/dbeaver/6.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p> 

6) กด **Finish**

<p align="center">
<img src={require('../../../static/img/day-3/dbeaver/7.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p> 

---

## Database config (อ้างอิงจาก `docker-compose.yaml`)

| Field ใน DBeaver | ค่า |
|---|---|
| Host | `localhost` |
| Port | `5432` |
| Database | `kku_library` |
| Username | `kku` |
| Password | `kku_password` |

> เหตุผลที่ใช้ `localhost:5432` ได้: ใน compose เรา map port ไว้ `5432:5432` ทำให้เครื่องเราเข้าถึง DB ใน container ได้

---