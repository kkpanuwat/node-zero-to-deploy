---
id: day-3-docker-core-components
title: 'Docker Core Components'
sidebar_label: 'Docker Core Components'
---

<p align="center">
  <img src={require('../../../static/img/day-3/intro/1.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

### 1. Docker Image

เปรียบเสมือน "พิมพ์เขียว" (Template) หรือแพ็กเกจซอฟต์แวร์ที่พร้อมใช้งาน ภายใน Image จะประกอบด้วยระบบปฏิบัติการขนาดเล็ก (มักเป็น Linux Distro ต่างๆ) ที่ถูกติดตั้ง Library, Runtime และตั้งค่าคอนฟิกูเรชัน (Configuration) ที่จำเป็นสำหรับแอปพลิเคชันนั้นๆ ไว้เรียบร้อยแล้ว โดย Image จะถูกสร้างขึ้นมาจากการสั่ง Build ไฟล์ที่ชื่อว่า Dockerfile

### 2. Docker Container

ถูกสร้างขึ้นมาจาก Docker Image เมื่อเราสั่งรัน Image ผลลัพธ์ที่ได้คือ Container ที่เปรียบเสมือนสภาพแวดล้อมจำลองที่แยกอิสระ (Isolated Environment) ทำให้เราได้ Service หรือแอปพลิเคชันที่พร้อมให้บริการได้ทันที โดยที่เราสามารถสั่งเปิด-ปิด หรือลบทิ้งได้โดยไม่กระทบกับตัวเครื่องหลัก

### 3. Docker Registry
คือ "ระบบจัดเก็บและกระจาย Image" ทำหน้าที่คล้ายกับ GitHub ที่ใช้เก็บ Source Code แต่ Registry จะใช้สำหรับเก็บ Docker Image แทน เพื่อให้ทีมนักพัฒนาหรือ Server สามารถดึง (Pull) ไปใช้งานต่อได้สะดวก

- Docker Hub: เป็นคลังส่วนกลางที่ใหญ่ที่สุดและเป็นมาตรฐานหลัก

- ทางเลือกอื่นๆ: นอกจากนี้ยังมีผู้ให้บริการรายอื่น เช่น GitLab Container Registry, Quay.io หรือบริการบน Cloud อย่าง Google Artifact Registry (GCR) และ Amazon ECR เป็นต้น