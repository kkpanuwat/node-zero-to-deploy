export type SidebarToggleConfig = {
  /**
   * ซ่อน "บท" (category) ตาม doc id ของหน้า index ของบทนั้น ๆ
   * ตัวอย่าง doc id: 'nodejs-zero-to-hero/day-2-nodejs-project-structure/day-2-nodejs-project-structure'
   */
  disabledCategoryDocIds?: string[];

  /**
   * ซ่อน "บท" (category) ตามชื่อ label (ใช้กรณี category ไม่มี link เป็น doc)
   */
  disabledCategoryLabels?: string[];

  /**
   * ถ้าใส่ allowlist (มีอย่างน้อย 1 ค่า) ระบบจะแสดงเฉพาะบทที่อยู่ในรายการนี้เท่านั้น
   * ใช้ได้ทั้ง doc id (แนะนำ) หรือ label
   */
  enabledCategoryDocIds?: string[];
  enabledCategoryLabels?: string[];

  /**
   * ซ่อนหน้า doc รายตัว (optional)
   */
  disabledDocIds?: string[];
};

/**
 * ปรับค่าที่ไฟล์นี้เพื่อเลือกว่าจะ "เปิด/ปิด" บทไหนในเมนู Sidebar
 */
export const sidebarToggleConfig: SidebarToggleConfig = {
  // แสดง "เฉพาะ Day 1" ในเมนู
  enabledCategoryDocIds: ['nodejs-zero-to-hero/day-1-introduction/day-1-introduction'],
};
