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

- **มาตรฐานและความถูกต้องของ SQL/constraint ค่อนข้างเข้ม** (ช่วยให้ข้อมูลเชื่อถือได้)
- **Transactions และกลไก concurrency ที่แข็งแรง** (แนวคิดสำคัญคือ MVCC: Multi-Version Concurrency Control)
- **Extensibility (ขยายความสามารถได้):** มี extension จำนวนมาก และรองรับชนิดข้อมูลหลากหลาย
- **Index หลากหลายรูปแบบ:** เช่น B-tree (พื้นฐาน), Hash, GiST, GIN (พบในงานค้น/ข้อความ/JSON)
- **Ecosystem เครื่องมือพร้อม:** เช่น `psql`, DBeaver, Docker images, libraries สำหรับภาษาโปรแกรมต่าง ๆ

---

## ทำไมคอร์สนี้ถึงเลือกใช้ PostgreSQL

เหตุผลเชิงวิศวกรรม ที่ทำให้ PostgreSQL เหมาะกับการเรียน:

1) **เน้นความถูกต้องของข้อมูล (data integrity) ได้ดี**  
เหมาะกับระบบที่ข้อมูลต้อง “เชื่อถือได้” เช่น ระบบยืม–คืน, การจอง, ธุรกรรม

2) **รองรับงาน query ที่ซับซ้อนและการ join หลายตารางได้ดี**  
ทำให้การออกแบบเป็น relational และการสืบค้นตามความสัมพันธ์ “ตรงไปตรงมา”

3) **ทำงานร่วมกับ Docker/เครื่องมือ dev ได้สะดวก**  
ทำให้สภาพแวดล้อมการเรียนเหมือนกัน (reproducible) และพร้อมใช้งานผ่านเครื่องมือมาตรฐาน

4) **เชื่อมกับ Node.js/Express ได้เป็นมาตรฐาน**  
มี driver และแนวปฏิบัติที่แพร่หลาย (เช่น connection pool, parameterized query)

5) **เป็นโอเพนซอร์สและเป็นทักษะถ่ายโอนได้ (transferable skill)**  
แนวคิดที่ได้ (schema, constraint, transaction, index, query) ใช้กับ DBMS ตัวอื่นได้ด้วย

:::tip แนวคิดสำคัญ
ในระบบจริง “Database” ไม่ใช่แค่ที่เก็บข้อมูล แต่เป็น “ตัวควบคุมความจริงของระบบ” (source of truth) โดยเฉพาะเรื่องกติกาและความถูกต้อง
:::

---

<p align="center">
<img src={require('../../../static/img/day-4/database/2.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>  

## โครงสร้างเชิงตรรกะของ PostgreSQL: Cluster → Database → Schema → Object

เพื่อใช้งาน PostgreSQL อย่างมั่นใจ ควรเข้าใจ “ชั้น (layers)” ของวัตถุ (objects) ที่อยู่ในระบบ:

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