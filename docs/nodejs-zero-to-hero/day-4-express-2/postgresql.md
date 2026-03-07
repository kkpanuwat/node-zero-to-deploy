---
id: day-4-postgresql
title: 'PostgreSQL'
sidebar_label: 'PostgreSQL'
---

<p align="center">
<img src={require('../../../static/img/day-4/database/1.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>  

## PostgreSQL คืออะไร

**PostgreSQL** คือ **ระบบจัดการฐานข้อมูลเชิงสัมพันธ์แบบโอเพนซอร์ส** (open-source relational DBMS) ที่มักถูกจัดอยู่ในกลุ่ม “object-relational” เนื่องจากรองรับชนิดข้อมูลและความสามารถขั้นสูงหลายอย่าง

คุณสมบัติเด่นที่พบได้บ่อยในการใช้งานจริง:

- **มาตรฐานและความถูกต้องของ SQL/constraint** (ช่วยให้ข้อมูลเชื่อถือได้)
- **Transactions และกลไก concurrency ที่แข็งแรง** (แนวคิดสำคัญคือ MVCC: Multi-Version Concurrency Control)
- **Extensibility (ขยายความสามารถได้):** มี extension จำนวนมาก และรองรับชนิดข้อมูลหลากหลาย
- **Index หลากหลายรูปแบบ:** เช่น B-tree (พื้นฐาน), Hash, GiST, GIN (พบในงานค้น/ข้อความ/JSON)
- **Ecosystem เครื่องมือพร้อม:** เช่น `psql`, DBeaver, Docker images, libraries สำหรับภาษาโปรแกรมต่าง ๆ

---

---

<p align="center">
<img src={require('../../../static/img/day-4/database/2.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>  

## โครงสร้างเชิงตรรกะของ PostgreSQL: Cluster → Database → Schema → Object

### 1) Cluster (หรือ PostgreSQL instance)

**Cluster** คือชุดของฐานข้อมูล (หลาย database) ที่อยู่ภายใต้ “เซิร์ฟเวอร์เดียวกัน” และใช้ชุดไฟล์ข้อมูลเดียวกัน (data directory)  
ภายใน cluster จะมีสิ่งสำคัญ เช่น:

- การตั้งค่าเซิร์ฟเวอร์ (configuration)
- บัญชีผู้ใช้/บทบาท (roles) และสิทธิ์ (privileges) ในระดับ cluster
- ฐานข้อมูลหลายตัว (databases) ที่แยกจากกัน

> ในชีวิตจริง เรามักพูดว่า “PostgreSQL server” หรือ “instance” เพื่อหมายถึง cluster ที่รันอยู่ 1 ชุด

### 2) Database (ภายใน cluster)

- ตารางและข้อมูลใน database หนึ่ง “ไม่เห็นกัน” กับอีก database โดยตรง (ข้าม database query แบบ native ไม่ใช่แนวหลัก)
- การเชื่อมต่อ (connection) หนึ่งครั้ง จะเลือกเข้า database ใด database หนึ่งเสมอ

### 3) Schema (namespace ภายใน database)

ใน PostgreSQL คำว่า **schema** ไม่ใช่ “ฐานข้อมูลอีกชื่อหนึ่ง”  
แต่ schema คือ **namespace** ภายใน database เพื่อจัดกลุ่มวัตถุ เช่น ตาราง, view, function ให้เป็นระเบียบ และป้องกันชื่อชนกัน

ตัวอย่าง: ใน database เดียวกัน เราอาจมี schema หลายชุด:

- `public` (ค่าเริ่มต้น)
- `app` (ตารางของแอป)
- `audit` (ตารางบันทึกเหตุการณ์)
- `report` (view/สรุปรายงาน)

### 4) Objects (ตาราง, view, function, …)

ภายใน schema จะมี objects ต่าง ๆ เช่น:

- **Table** (ตาราง)
- **View / Materialized View**
- **Index**
- **Sequence**
- **Function / Procedure**
- **Type / Domain**

การอ้างชื่อวัตถุแบบชัดเจนมักใช้รูปแบบ `schema.object` เช่น `app.books`

---

### 1) การสร้างฐานข้อมูล (CREATE DATABASE)

โดยทั่วไปการสร้างฐานข้อมูลทำระดับ “cluster” และต้องมีสิทธิ์เหมาะสม

```sql
CREATE DATABASE myapp
  WITH
  ENCODING = 'UTF8';
```

Note:

- **Encoding** โดยทั่วไปควรเป็น `UTF8` เพื่อรองรับหลายภาษา
  
---

### 2) สคีมา (Schema) และการจัดระเบียบวัตถุ

ในหลายโปรเจกต์ เราอาจสร้างสคีมาแยกจาก `public` เพื่อแยกของแอปออกจากของระบบ/ส่วนอื่น

```sql
CREATE SCHEMA IF NOT EXISTS app;
```

จากนั้นอ้างอิงตารางแบบชัดเจนเป็น `app.table_name` เช่น `app.users`

#### Schema คืออะไร (ทำไมไม่ใช้ `public` อย่างเดียว)

**Schema** ใน PostgreSQL คือ “namespace” ภายใน **database เดียวกัน** ใช้สำหรับจัดกลุ่มวัตถุ เช่น table, view, function, type, sequence ให้เป็นระเบียบ และช่วย “กันชื่อชนกัน” ได้

สิ่งที่ต้องแยกให้ออก:

- **Database**: ฐานข้อมูล
- **Schema**: ชั้นจัดระเบียบ “ข้างใน” database นั้น (มีหลาย schema ได้)

ตัวอย่างชื่อที่อยู่ร่วมกันได้ใน database เดียวกัน:

- `app.users` (ตารางผู้ใช้ของแอป)
- `audit.users` (ตารางผู้ใช้ที่บันทึก event/ประวัติ)

เหตุผลที่นิยมสร้าง schema อย่าง `app` แยกจาก `public`:

- **ความชัดเจนของเจตนา (intent)**: ของแอปอยู่ `app.*` อ่านแล้วรู้ว่าเป็น data ของระบบหลัก
- **ลดความเสี่ยงชื่อชน**: โดยเฉพาะเมื่อเริ่มมี extension, view, หรือโมดูลอื่นเพิ่มเข้ามา
- **คุมสิทธิ์เป็นกลุ่มได้**: ให้ทีม/role บางชุดใช้เฉพาะ schema บางส่วน (principle of least privilege)

#### `search_path`: ทำไมบางทีเขียน `users` แล้วเจอตารางผิด

ถ้าคุณเขียน `SELECT * FROM users;` โดยไม่ระบุ schema PostgreSQL จะไปหา object ตามลำดับใน **`search_path`**

ดูค่า `search_path`:

```sql
SHOW search_path;
```

ตั้งค่าเฉพาะ session ปัจจุบัน (ชั่วคราว):

```sql
SET search_path TO app, public;
```

ตั้งค่าเริ่มต้นให้ role (เช่น `kku`) เพื่อให้ทุก session ใช้เหมือนกัน:

```sql
ALTER ROLE kku SET search_path = app, public;
```

#### ตัวอย่างการจัด schema

1) **แยกของแอปกับของตรวจสอบย้อนหลัง (audit/logging)**

```sql
CREATE SCHEMA IF NOT EXISTS app;
CREATE SCHEMA IF NOT EXISTS audit;

-- ของแอป
CREATE TABLE IF NOT EXISTS app.users (...);

-- ของ audit
CREATE TABLE IF NOT EXISTS audit.user_events (...);
```

2) **แยกตามโมดูลของระบบขนาดใหญ่ (bounded context)**

```sql
CREATE SCHEMA IF NOT EXISTS iam;      -- identity & access management
CREATE SCHEMA IF NOT EXISTS billing;  -- การเงิน/ใบแจ้งหนี้

-- ชื่อซ้ำกันได้เพราะคนละ schema
-- iam.users, billing.users
```

3) **คุมสิทธิ์ระดับ schema**

หลักการคือ “เห็น schema ได้” กับ “ทำอะไรกับตารางได้” เป็นคนละเรื่อง:

- `USAGE ON SCHEMA` ทำให้ role อ้างอิงชื่อใน schema ได้
- สิทธิ์บนตาราง (`SELECT/INSERT/UPDATE/DELETE`) ต้อง grant แยกต่างหาก

ตัวอย่างแนวทาง (ปรับตามนโยบายทีม):

```sql
-- ปิดสิทธิ์สร้าง object ใน schema app สำหรับทุกคน (PUBLIC)
REVOKE CREATE ON SCHEMA app FROM PUBLIC;

-- ให้ role kku มองเห็น schema นี้ได้
GRANT USAGE ON SCHEMA app TO kku;
```

> หมายเหตุ: การให้ `SELECT/INSERT/UPDATE/DELETE` บน “ทุกตารางใน schema” มักทำผ่าน migration/สคริปต์ในโปรเจกต์ เพราะต้องคุมทั้งตารางเดิมและตารางใหม่ในอนาคต

---

### 3) การสร้างตาราง (CREATE TABLE)

ตัวอย่างออกแบบง่าย ๆ สำหรับระบบ “ยืม–คืนหนังสือ” (ตัวอย่างเพื่อการเรียน):

```sql
CREATE TABLE IF NOT EXISTS app.users (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email        TEXT NOT NULL UNIQUE,
  name         TEXT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'active',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

- `PRIMARY KEY` ทำให้แต่ละแถวมีตัวตนที่อ้างอิงได้แน่นอน
- `NOT NULL` ลดข้อมูล “ครึ่ง ๆ กลาง ๆ” ที่ทำให้โค้ดต้องเดา
- `UNIQUE` สำหรับข้อมูลที่ไม่ควรซ้ำ เช่น `email`
- `DEFAULT` ลดภาระฝั่งแอปและช่วยให้ข้อมูลมีมาตรฐาน
- ใช้ `TIMESTAMPTZ` เพื่อเก็บเวลาพร้อมโซนเวลา (เหมาะกับระบบที่อาจขยายหลายพื้นที่)

ตารางหนังสือ:

```sql
CREATE TABLE IF NOT EXISTS app.books (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  isbn         TEXT UNIQUE,
  title        TEXT NOT NULL,
  author       TEXT,
  available    BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

ตารางการยืม (สัมพันธ์กับผู้ใช้และหนังสือ):

```sql
CREATE TABLE IF NOT EXISTS app.borrows (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id      BIGINT NOT NULL REFERENCES app.users(id),
  book_id      BIGINT NOT NULL REFERENCES app.books(id),
  borrowed_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  due_date     DATE NOT NULL,
  returned_at  TIMESTAMPTZ
);
```

> `REFERENCES ...` คือ foreign key: ช่วยคุมความสัมพันธ์ไม่ให้เกิดข้อมูลกำพร้า (orphan records)

---

### 4) การเพิ่มข้อมูล (INSERT) และการอ่านค่าที่เพิ่งสร้าง (RETURNING)

เพิ่มผู้ใช้ 1 ราย:

```sql
INSERT INTO app.users (email, name)
VALUES ('alice@example.com', 'Alice')
RETURNING id, email, created_at;
```

เพิ่มหนังสือหลายรายการ:

```sql
INSERT INTO app.books (isbn, title, author)
VALUES
  ('9780131103627', 'The C Programming Language', 'Kernighan & Ritchie'),
  ('9780201633610', 'Design Patterns', 'Gamma et al.')
RETURNING id, title;
```

เหตุผลที่ `RETURNING` สำคัญ:

- ฝั่ง API มักต้องตอบกลับ `id` ที่สร้างใหม่ทันที โดยไม่ต้อง `SELECT` ซ้ำ

---

### 5) SELECT พื้นฐาน: เลือกคอลัมน์, จัดเรียง, จำกัดจำนวน

อ่านข้อมูลทั้งหมด (ควรเลือกเฉพาะคอลัมน์ที่ใช้จริง):

```sql
SELECT id, email, name, status
FROM app.users
ORDER BY id DESC
LIMIT 20;
```

แนวปฏิบัติที่ดี:

- หลีกเลี่ยง `SELECT *` ในโปรดักชัน (ทำให้โค้ดพึ่งพาโครงสร้างที่เปลี่ยนได้)
- ใช้ `ORDER BY` ให้ชัดเจน โดยเฉพาะเมื่อใช้ `LIMIT`

---

### 6) WHERE: เงื่อนไข

ค้นด้วยค่าที่เท่ากัน:

```sql
SELECT id, email, name
FROM app.users
WHERE email = 'alice@example.com';
```

ค้นแบบหลายค่า (IN):

```sql
SELECT id, title
FROM app.books
WHERE id IN (1, 2, 3);
```

ค้นแบบช่วง (BETWEEN) และวันที่:

```sql
SELECT id, user_id, book_id, due_date
FROM app.borrows
WHERE due_date BETWEEN DATE '2026-03-01' AND DATE '2026-03-31';
```

การจัดการ `NULL` (ต้องใช้ `IS NULL` / `IS NOT NULL`):

```sql
SELECT id, user_id, book_id
FROM app.borrows
WHERE returned_at IS NULL;
```

ค้นแบบ pattern (LIKE/ILIKE):

```sql
SELECT id, title
FROM app.books
WHERE title ILIKE '%design%';
```

ข้อควรระวัง:

- `LIKE '%...%'` มักทำให้ใช้ index ไม่ได้ (ช้ากับข้อมูลใหญ่) เว้นแต่มีเทคนิคเฉพาะ เช่น trigram index
- `NULL` ไม่เท่ากับค่าใด ๆ แม้แต่ `NULL` เอง จึงต้องใช้ `IS NULL`

---

### 7) UPDATE: แก้ข้อมูลแบบเจาะจง และควร “มี WHERE เสมอ”

ตัวอย่างเปลี่ยนสถานะผู้ใช้:

```sql
UPDATE app.users
SET status = 'inactive'
WHERE id = 1
RETURNING id, email, status;
```

แนวปฏิบัติสำคัญ:

- `UPDATE` ที่ไม่มี `WHERE` จะอัปเดต “ทุกแถว” (เสี่ยงมาก)
- แนะนำทดสอบเงื่อนไขด้วย `SELECT` ก่อน แล้วค่อยใช้ `UPDATE`

---

### 8) DELETE: ลบข้อมูล และความสัมพันธ์กับ Foreign Key

ลบหนังสือด้วย id:

```sql
DELETE FROM app.books
WHERE id = 2
RETURNING id, title;
```

ประเด็นที่ต้องคิดก่อนลบ:

- ถ้ามีตารางอื่นอ้างอิงอยู่ (foreign key) การ `DELETE` อาจถูกปฏิเสธ (เพื่อป้องกันข้อมูลเสีย)
- บางระบบนิยม “soft delete” (เช่นมีคอลัมน์ `deleted_at`) เพื่อให้กู้คืน/ตรวจสอบย้อนหลังได้

ตัวอย่าง soft delete แบบพื้นฐาน:

```sql
ALTER TABLE app.books ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

UPDATE app.books
SET deleted_at = now()
WHERE id = 2;
```

แล้วเวลา query ให้กรอง:

```sql
SELECT id, title
FROM app.books
WHERE deleted_at IS NULL;
```

---

### 9) ALTER TABLE: เปลี่ยนสคีมาอย่างเป็นระบบ (Schema Evolution)

การเปลี่ยนตารางในระบบจริงควรทำผ่าน migration แต่ในเชิง SQL ควรรู้คำสั่งหลัก ๆ:

เพิ่มคอลัมน์ใหม่:

```sql
ALTER TABLE app.users
ADD COLUMN IF NOT EXISTS phone TEXT;
```

ตั้ง `NOT NULL` (ควรมั่นใจว่าข้อมูลไม่มี `NULL` แล้ว):

```sql
ALTER TABLE app.users
ALTER COLUMN phone SET NOT NULL;
```

เปลี่ยนชื่อคอลัมน์:

```sql
ALTER TABLE app.users
RENAME COLUMN name TO full_name;
```

เพิ่ม constraint ภายหลัง:

```sql
ALTER TABLE app.users
ADD CONSTRAINT users_status_check
CHECK (status IN ('active', 'inactive', 'blocked'));
```

แนวคิดสำคัญ:

- การเปลี่ยนสคีมาเป็น “การเปลี่ยนสัญญา” ระหว่างฐานข้อมูลและแอป ต้องคุมเวอร์ชันและทดสอบเสมอ

---

### 10) JOIN: หัวใจของ Relational Database

ดึงข้อมูลการยืม พร้อมชื่อผู้ยืมและชื่อหนังสือ:

```sql
SELECT
  b.id,
  u.email,
  bk.title,
  b.borrowed_at,
  b.due_date,
  b.returned_at
FROM app.borrows b
JOIN app.users u ON u.id = b.user_id
JOIN app.books bk ON bk.id = b.book_id
ORDER BY b.id DESC
LIMIT 20;
```

แนวคิดที่ควรรู้:

- `JOIN` คือการ “ประกอบข้อมูล” ตามความสัมพันธ์ ไม่ใช่การก็อปปี้ข้อมูลมาซ้ำ ๆ
- การออกแบบ foreign key ที่ดีทำให้ join ง่ายและถูกต้อง

---

### 11) Aggregate: COUNT / GROUP BY (สรุปข้อมูลแบบรายงาน)

นับจำนวนการยืมต่อผู้ใช้:

```sql
SELECT
  u.id,
  u.email,
  COUNT(*) AS borrow_count
FROM app.borrows b
JOIN app.users u ON u.id = b.user_id
GROUP BY u.id, u.email
ORDER BY borrow_count DESC;
```

---

### 12) Index: ทำให้ WHERE/JOIN เร็วขึ้น (เมื่อข้อมูลเริ่มใหญ่)

โดยหลัก PostgreSQL จะสร้าง index ให้ primary key และ unique อัตโนมัติ แต่คอลัมน์ที่ใช้ค้นบ่อยอาจต้องสร้างเพิ่ม

ตัวอย่าง: ถ้าค้น `app.borrows` ด้วย `user_id` บ่อย:

```sql
CREATE INDEX IF NOT EXISTS idx_borrows_user_id ON app.borrows(user_id);
```

ถ้าต้องกรอง “ยังไม่คืน” บ่อย ๆ อาจทำ partial index:

```sql
CREATE INDEX IF NOT EXISTS idx_borrows_not_returned
ON app.borrows(book_id)
WHERE returned_at IS NULL;
```

หลักคิด:

- index ช่วย `SELECT` แต่ทำให้ `INSERT/UPDATE/DELETE` ช้าลงเล็กน้อย (เพราะต้องอัปเดต index)
- ควรสร้าง index จาก “พฤติกรรมการ query” ไม่ใช่เดาสุ่ม

---

### 13) Transaction: ความถูกต้องของข้อมูลในงานจริง

ธุรกรรม (transaction) ทำให้หลายคำสั่ง SQL “สำเร็จพร้อมกัน” หรือ “ยกเลิกพร้อมกัน” (atomicity)

ตัวอย่างสถานการณ์: ยืมหนังสือ = สร้างรายการยืม + ทำให้หนังสือไม่ว่าง

```sql
BEGIN;

INSERT INTO app.borrows (user_id, book_id, due_date)
VALUES (1, 1, DATE '2026-03-31');

UPDATE app.books
SET available = false
WHERE id = 1 AND available = true;

COMMIT;
```

แนวปฏิบัติ:

- ถ้าเกิดข้อผิดพลาด ให้ `ROLLBACK;`
- ในระบบจริงควรออกแบบให้ป้องกัน “ยืมซ้ำ” ด้วยเงื่อนไขหรือ constraint เพิ่มเติม (เช่นห้ามมี borrow ที่ยังไม่คืนของ book เดียวกัน)

---

### 14) ข้อควรระวังสำคัญสำหรับงาน API: SQL Injection และ Parameterized Query

ในฝั่ง Node.js/Express ห้ามนำ string จากผู้ใช้ไปต่อ SQL ตรง ๆ (เช่น `"... WHERE email = '" + email + "'"`) เพราะเสี่ยงต่อ SQL injection  
แนวทางที่ถูกต้องคือใช้ **parameterized query** (ใช้ตัวแปรแทนค่าที่ผู้ใช้กรอก)

ตัวอย่างรูปแบบ SQL (เชิงแนวคิด):

```sql
SELECT id, email, name
FROM app.users
WHERE email = $1;
```

> เครื่องหมาย `$1` คือ “ตำแหน่งพารามิเตอร์” (placeholder) ที่ไลบรารีฝั่งแอปจะส่งค่ามาแทน โดยฐานข้อมูลจะจัดการ escaping/typing ให้เหมาะสม

---

### แบบฝึกหัด (แนะนำ ~10–15 นาที)

1) สร้างตาราง `app.categories (id, name)` และเพิ่ม `UNIQUE(name)`  
2) เพิ่มคอลัมน์ `category_id` ให้ `app.books` พร้อม foreign key ไป `app.categories(id)`  
3) เขียน query แสดงหนังสือทั้งหมดพร้อมชื่อหมวดหมู่ (ใช้ `JOIN`)  
4) เขียน query แสดง “หนังสือที่ถูกยืมอยู่” (borrow ที่ `returned_at IS NULL`) พร้อมชื่อผู้ยืม  
