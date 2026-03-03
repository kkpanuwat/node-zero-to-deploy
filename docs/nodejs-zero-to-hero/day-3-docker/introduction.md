---
id: day-3-docker-introduction
title: 'Fundamental & Dockerizing your App'
sidebar_label: 'Fundamental & Dockerizing your App'
---

<p align="center">
  <img src={require('../../../static/img/day-3/intro/1.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

ในโลกของการพัฒนาซอฟต์แวร์สมัยใหม่ มีประโยคหนึ่งที่เหล่านักพัฒนา (Developer) กลัวและเบื่อหน่ายที่สุด นั่นคือคำว่า "แต่มันรันในเครื่องผมได้นะ!" (But it works on my machine!) ทำไมคำนี้ถึงเป็นปัญหา? ลองจินตนาการว่าคุณเขียนโปรแกรมเสร็จเรียบร้อยในเครื่องของคุณซึ่งใช้ Windows 11 แต่พอส่งงานไปให้เพื่อนที่ใช้ macOS หรือส่งขึ้น Server ที่เป็น Linux ปรากฏว่าโปรแกรมรันไม่ได้ เพราะเวอร์ชันของภาษา Java ไม่ตรงกันบ้าง Library บางตัวไม่ได้ติดตั้งไว้บ้าง หรือแม้แต่การตั้งค่า Timezone ที่ต่างกันเพียงเล็กน้อย

Docker ถูกสร้างขึ้นมาเพื่อกำจัดปัญหานี้ให้หมดไปอย่างถาวร

<p align="center">
  <img src={require('../../../static/img/day-3/intro/2.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>

การพัฒนาซอฟต์แวร์แบบดั้งเดิม การรันแอปพลิเคชันขึ้นมาหนึ่งตัว เรามักจะติดตั้งทุกอย่างลงไปบนระบบปฏิบัติการ (Host OS) โดยตรง ไม่ว่าจะเป็น Library, Runtime (เช่น Node.js, Python), หรือ Database ปัญหามักจะเกิดขึ้นเมื่อเราต้องรันหลายแอปพลิเคชันที่มีความต้องการ (Dependencies) แตกต่างกันในเครื่องเดียวกัน

Docker คือเครื่องมือที่เข้ามาจัดการเรื่อง "Software Isolation" หรือการแยกส่วนซอฟต์แวร์ออกจากกันอย่างเด็ดขาด โดยใช้เทคโนโลยีที่เรียกว่า Containerization

<p align="center">
  <img src={require('../../../static/img/day-3/intro/3.png').default} alt="Day 1 Hero" style={{maxWidth: '800px', width: '100%'}} />
</p>