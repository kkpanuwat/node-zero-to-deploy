---
id: day-3-docker-ws-2
title: 'Workshop 2: Docker Compose + PostgreSQL'
sidebar_label: 'Workshop 2: Docker Compose + PostgreSQL'
---

Workshop นี้ให้ทดลองรัน PostgreSQL ด้วย Docker Compose เพื่อเตรียม “ฐานข้อมูลพร้อมใช้งาน” สำหรับโปรเจกต์ API ในวันถัดไป

---

## เป้าหมาย

- สร้างไฟล์ `docker-compose.yml` สำหรับ PostgreSQL
- เข้าใจ `services`, `environment`, `ports`, `volumes`, `healthcheck`
- รัน/หยุด/ล้างข้อมูลฐานข้อมูลด้วยคำสั่ง Compose

---

## 1) สร้างไฟล์ `docker-compose.yaml`

สร้างไฟล์ชื่อ `docker-compose.yaml` :

```yaml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: kku_library
      POSTGRES_USER: kku
      POSTGRES_PASSWORD: kku_password
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U kku -d kku_library"]
      interval: 5s
      timeout: 5s
      retries: 30

volumes:
  db_data:
```

---


### `services`

`services` คือรายการ “คอนเทนเนอร์” ที่ Compose จะรันให้เรา ในที่นี้มี 1 service ชื่อ `db`

### `image: postgres:16-alpine`

ใช้ image PostgreSQL เวอร์ชัน 16 บน Alpine (ขนาดเล็กกว่า base แบบเต็ม ๆ) และเป็น image มาตรฐานที่มี PostgreSQL พร้อมรันทันที

### `environment`

ตัวแปรเริ่มต้นของ PostgreSQL (ใช้เฉพาะ “ครั้งแรก” ตอนสร้าง data directory ใน volume):

- `POSTGRES_DB`: ชื่อ database ที่จะถูกสร้างให้เลย (`kku_library`)
- `POSTGRES_USER`: สร้าง user (`kku`)
- `POSTGRES_PASSWORD`: รหัสผ่านของ user

### `ports`

```yaml
ports:
  - "5432:5432"
```

คือการ map port จากเครื่องเรา → เข้าไปที่คอนเทนเนอร์

- ซ้าย (`5432`) = port บนเครื่องเรา (host)
- ขวา (`5432`) = port ในคอนเทนเนอร์ (container)

ผลคือเราจะต่อ DB จากเครื่องเราได้ด้วย `localhost:5432`

### `volumes`

```yaml
volumes:
  - db_data:/var/lib/postgresql/data
```

ทำให้ข้อมูลฐานข้อมูล “อยู่ถาวร” แม้เราจะ `docker compose down` (คอนเทนเนอร์หาย แต่ข้อมูลยังอยู่ใน named volume)

- `db_data` = ชื่อ volume
- `/var/lib/postgresql/data` = ที่เก็บ data ของ PostgreSQL ในคอนเทนเนอร์

ด้านล่างนี้คือการประกาศ named volume:

```yaml
volumes:
  db_data:
```

### `healthcheck`

healthcheck คือการให้ Docker “ตรวจสุขภาพ” ของ service ว่าพร้อมรับงานหรือยัง

ในตัวอย่างใช้ `pg_isready` เพื่อเช็คว่า PostgreSQL ตอบสนองได้:

- `interval: 5s` เช็คทุก 5 วินาที
- `timeout: 5s` รอผลนานสุด 5 วินาที
- `retries: 30` ลองได้ 30 ครั้งก่อนถือว่า fail

---

### รันฐานข้อมูล

```bash
docker compose up -d
```

### ดูสถานะ

```bash
docker compose ps
```

### ดู logs ของ DB

```bash
docker compose logs -f db
```

### หยุดและลบคอนเทนเนอร์ (แต่ “ไม่ลบข้อมูล” ใน volume)

```bash
docker compose down
```

### หยุดและลบคอนเทนเนอร์ “พร้อมล้างข้อมูล” (ลบ volume ด้วย)

```bash
docker compose down -v
```

---

## ทดสอบการเชื่อมต่อ DB

### วิธีที่ 1: เข้า `psql` ผ่าน container (แนะนำ)

```bash
docker compose exec db psql -U kku -d kku_library
```

ลองคำสั่งใน `psql`:

```sql
\dt
SELECT now();
```

ออกจาก `psql`:

```sql
\q
```
---

