import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroContainer)}>
        <div className={styles.heroGrid}>
          <div>
            <Heading as="h1" className={styles.heroTitle}>
              Kcode<span className={styles.heroDot}>.</span>
            </Heading>
            <p className={styles.heroSubtitle}>
              เอกสารสอน <b>Node.js Zero → Hero</b> แบบเป็นขั้นตอน พร้อม Labs และ Mini
              Projects
            </p>
            <div className={styles.heroButtons}>
              <Link className="button button--primary button--lg" to="/docs/nodejs-zero-to-hero/day-1-introduction/">
                เริ่มที่ Day 1
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/nodejs-zero-to-hero/">
                ดูสารบัญ
              </Link>
            </div>
            <div className={styles.heroMeta}>
              <span className={styles.pill}>Step-by-step</span>
              <span className={styles.pill}>Hands-on</span>
              <span className={styles.pill}>Thai-friendly</span>
            </div>
          </div>

          <div className={styles.heroCard}>
            <div className={styles.heroCardHeader}>
              <span className={styles.heroCardKicker}>Quick start</span>
              <span className={styles.heroCardBadge}>~60–90 นาที</span>
            </div>
            <ol className={styles.heroSteps}>
              <li>
                เปิดหน้า <b>Day 1 — Hello Library</b>
              </li>
              <li>ทำตามหัวข้อ + Labs ทีละข้อ</li>
              <li>จบด้วย checklist และสรุป</li>
            </ol>
            <div className={styles.heroCardFooter}>
              <Link className={clsx('button button--primary', styles.heroCardCta)} to="/docs/nodejs-zero-to-hero/day-1-introduction/">
                ไป Day 1 →
              </Link>
              <span className={styles.heroCardHint}>{siteConfig.title}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Kcode: เอกสารสอน Node.js Zero → Hero แบบเป็นขั้นตอน พร้อม Labs และ Mini Projects">
      <HomepageHeader />
      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2" className={styles.sectionTitle}>
                เรียนให้จบแบบมีโครง
              </Heading>
              <p className={styles.sectionSubtitle}>
                แยกเป็นวัน/บทชัดเจน พร้อมจุดฝึก (Labs) และงานสรุป (Mini Project)
              </p>
            </div>

            <div className={styles.curriculumGrid}>
              <Link className={styles.curriculumCard} to="/docs/nodejs-zero-to-hero/day-1-introduction/">
                <div className={styles.curriculumTop}>
                  <span className={styles.curriculumDay}>Day 1</span>
                  <span className={styles.curriculumTag}>Start here</span>
                </div>
                <div className={styles.curriculumTitle}>Hello Library</div>
                <div className={styles.curriculumDesc}>
                  ตั้งค่าเครื่องมือ, core concepts, JS fundamentals และ Git basics
                </div>
                <div className={styles.curriculumFooter}>เปิดบทเรียน →</div>
              </Link>

              <div className={clsx(styles.curriculumCard, styles.curriculumCardMuted)}>
                <div className={styles.curriculumTop}>
                  <span className={styles.curriculumDay}>Day 2</span>
                  <span className={styles.curriculumTag}>Project</span>
                </div>
                <div className={styles.curriculumTitle}>Project Structure</div>
                <div className={styles.curriculumDesc}>
                  โครงสร้างโปรเจกต์, routing, debugging และ mini project
                </div>
                <div className={styles.curriculumFooter}>พร้อมเปิดเมื่ออยากแสดงในเมนู</div>
              </div>

              <div className={clsx(styles.curriculumCard, styles.curriculumCardMuted)}>
                <div className={styles.curriculumTop}>
                  <span className={styles.curriculumDay}>Day 3</span>
                  <span className={styles.curriculumTag}>Express</span>
                </div>
                <div className={styles.curriculumTitle}>Express.js Core</div>
                <div className={styles.curriculumDesc}>
                  Routing, middleware, error handling, labs และ mini project
                </div>
                <div className={styles.curriculumFooter}>พร้อมเปิดเมื่ออยากแสดงในเมนู</div>
              </div>
            </div>
          </div>
        </section>

        <HomepageFeatures />
        
      </main>
    </Layout>
  );
}
