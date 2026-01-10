---
id: day-1-system-flow-diagrams
title: 'Day 1: System and Flow Diagrams'
sidebar_label: 'System & Flow Diagrams'
description: Diagram อธิบายวงจร Request → Process → Output ของ Hello Library Script
---

# Part 4 — System & Flow Diagram

## API Sequence Diagram

```mermaid
sequenceDiagram
  participant User
  participant Terminal
  participant NodeJS as Node.js Script

  User->>Terminal: พิมพ์ node hello-library.js
  Terminal->>NodeJS: ส่งคำสั่งให้ Node.js รันไฟล์
  NodeJS-->>Terminal: แสดงผล Hello Library + รายการหนังสือตัวอย่าง
  Terminal-->>User: User อ่านผลบนหน้าจอ
```

> ยังไม่มีการสื่อสารกับ Browser หรือ Database เน้นให้ผู้เรียนรู้จักวงจร Request → Process → Output ผ่าน Terminal ก่อน

## UI Flow Diagram

- วันนี้ยังไม่มี UI บนเว็บไซต์
- ผู้เรียนโต้ตอบกับโปรแกรมผ่าน Terminal เท่านั้น → ช่วยโฟกัสที่ logic และข้อความเอาต์พุต

> ขีดเส้นใต้ Flow ง่าย ๆ นี้ไว้ในสมุด หากเข้าใจภาพรวมนี้ Part 6 ที่เป็น Labs จะลื่นขึ้นมาก
