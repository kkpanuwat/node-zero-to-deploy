---
id: day-5-postman-create-login-me
title: 'Postman: Create → Login → Me'
sidebar_label: 'Postman: Create/Login/Me'
---

คาบนี้เราจะลองยิง API ด้วย Postman ให้ครบเส้นทาง: **สร้างผู้ใช้** → **ล็อกอินเอา token** → **เรียก `/me` ด้วย Bearer token**

สิ่งที่ต้องมีอยู่ก่อน:

- รัน API ได้ที่ `http://localhost:3000`
- มี endpoint:
  - `POST /users` (สร้างผู้ใช้)
  - `POST /auth/login` (ล็อกอิน)
  - `GET /me` (ต้องแนบ token)

---

## 1) เตรียม Postman (Environment)

1) เปิด Postman → ไปที่ **Environments** → สร้าง environment ใหม่ชื่อ `local`
2) เพิ่มตัวแปร:

| Variable | Initial value |
|---|---|
| `port` | `3000` |
| `baseUrl` | `http://localhost:{{port}}` |
| `accessToken` | (เว้นไว้ก่อน) |

<p align="center">
<img src={require('../../../static/img/day-5/postman/1.png').default} alt="Day 5 JWT" style={{maxWidth: '800px', width: '100%'}} />
</p>


> เราจะให้ Postman เซ็ต `accessToken` ให้อัตโนมัติหลัง login

---

## 2) สร้าง Collection และ Requests

สร้าง collection ชื่อ `KKU Library API`

จากนั้นสร้าง request ตามนี้:

1) `Create User` → `POST {{baseUrl}}/users`  
2) `Login` → `POST {{baseUrl}}/auth/login`  
3) `Me` → `GET {{baseUrl}}/me`  

---

## 3) Request 1: Create User

**Method:** `POST`  
**URL:** `{{baseUrl}}/users`  
**Headers:**

- `Content-Type: application/json`

**Body (raw / JSON):**

```json
{
  "email": "alice@example.com",
  "name": "Alice",
  "password": "P@ssw0rd1234"
}
```

**สิ่งที่ควรได้**

- ถ้าสร้างสำเร็จ: `201`
- ถ้า email ซ้ำ: `409`
- ถ้า body ไม่ผ่าน validation: `400` พร้อม `errors[]`

> ถ้าคุณเคยสร้าง `alice@example.com` ไปแล้ว ให้เปลี่ยนเป็น `alice+1@example.com` หรือชื่ออื่น เพื่อให้เทสง่าย

---

## 4) Request 2: Login (รับ token)

**Method:** `POST`  
**URL:** `{{baseUrl}}/auth/login`  
**Headers:**

- `Content-Type: application/json`

**Body (raw / JSON):**

```json
{
  "email": "alice@example.com",
  "password": "P@ssw0rd1234"
}
```

**สิ่งที่ควรได้**

- ถ้าล็อกอินสำเร็จ: `200` และได้ JSON หน้าตาประมาณนี้

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### ตั้งค่าให้ Postman เก็บ token อัตโนมัติ

ไปที่แท็บ **script** ของ request `Login` แล้วใส่:

<p align="center">
<img src={require('../../../static/img/day-5/postman/2.png').default} alt="Day 5 JWT" style={{maxWidth: '800px', width: '100%'}} />
</p>

```js
const json = pm.response.json();
pm.environment.set('accessToken', json.accessToken);
```

ลองกด Send อีกครั้ง แล้วไปดู environment `local` จะเห็น `accessToken` ถูกเติมค่า

---

## 5) Request 3: Me (ส่ง Bearer token)

**Method:** `GET`  
**URL:** `{{baseUrl}}/me`

### วิธีที่ 1: ใช้ Authorization tab

1) ไปที่แท็บ **Authorization**
2) เลือก Type = `Bearer Token`
3) ใส่ค่า Token เป็น `{{accessToken}}`

### วิธีที่ 2: ใส่ header เอง

<p align="center">
<img src={require('../../../static/img/day-5/postman/3.png').default} alt="Day 5 JWT" style={{maxWidth: '800px', width: '100%'}} />
</p>

เพิ่ม header:

- `Authorization: Bearer {{accessToken}}`

**สิ่งที่ควรได้**

- สำเร็จ: `200` ได้ข้อมูลผู้ใช้จาก token

```json
{
  "user": {
    "id": "1",
    "email": "alice@example.com",
    "role": "user"
  }
}
```

---

## 6) ทดสอบ API

### 6.1 ไม่ส่ง token ต้องได้ 401

ลบ header `Authorization` ออก แล้วกด `Me` ใหม่ → ต้องได้ `401`

### 6.2 ส่ง token ผิดต้องได้ 401

แก้ `Authorization` เป็น:

- `Bearer nope`

แล้วกด `Me` → ต้องได้ `401`

---

## 7) เก็บงาน (แชร์กับเพื่อน/ส่งตรวจ)

1) คลิก collection → **Export** → เลือก `Collection v2.1` ได้ไฟล์ `.json`
2) คลิก environment `local` → **Export** ได้ไฟล์ `.json`

> ก่อนส่ง แนะนำให้ลบค่า `accessToken` ออก (หรือ set ให้เป็นค่าว่าง) แล้วค่อย export
