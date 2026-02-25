---
id: day-3-lab-5-git-checkpoint
title: 'Lab 5: Git Checkpoint + API Testing'
sidebar_label: '5. Git + Testing'
---

**เป้าหมาย:** ทดสอบ API ให้มั่นใจ และทำ checkpoint ด้วย Git

> Timebox แนะนำ: 20–30 นาที

## 1) ทดสอบด้วย Browser/Postman/curl

ตัวอย่าง `curl`:
```bash
curl http://localhost:4000/api/health
curl http://localhost:4000/api/books
curl http://localhost:4000/api/books/1
```

## 2) Git checkpoint

```bash
git status
git add .
git commit -m "feat: express core + books api"
```
