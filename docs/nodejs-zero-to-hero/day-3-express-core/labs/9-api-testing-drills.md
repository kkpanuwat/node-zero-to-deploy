---
id: day-3-lab-9-api-testing-drills
title: 'Lab 9: API Testing Drills (curl/Postman)'
sidebar_label: '9. Testing drills'
---

**เป้าหมาย:** ฝึกทดสอบ API ให้ “มั่นใจ” ก่อนเริ่ม CRUD วันถัดไป

> Timebox แนะนำ: 30–45 นาที

## Drill A: curl พื้นฐาน

```bash
curl http://localhost:4000/api/health
curl http://localhost:4000/api/books
curl http://localhost:4000/api/books/1
curl http://localhost:4000/api/books/9999
curl "http://localhost:4000/api/books?search=node&limit=1"
```

## Drill B: ตรวจ status code

ใช้ `-i` เพื่อดู status line:
```bash
curl -i http://localhost:4000/api/books/abc
```

เช็กว่า:
- invalid id → 400
- not found → 404

## Drill C: Checklist ก่อนจบวัน

- response มี `ok` เสมอ
- error มี `code` และ `message`
- endpoint ทำงานครบ: health, books list, book by id, query search/limit
