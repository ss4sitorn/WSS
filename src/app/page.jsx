'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import s from '@/styles/home.module.css';
import RevealOnScroll from '@/components/RevealOnScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WssFrameworkInteractive from '@/components/WssFrameworkInteractive';

export default function HomePage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wss_assessment_v4');
      localStorage.removeItem('wss_assessment_setup_v4');
      localStorage.removeItem('wss_assessment_v3');
      localStorage.removeItem('wss_assessment_setup_v3');
      localStorage.removeItem('wss_assessment_v2');
      localStorage.removeItem('wss_assessment_setup_v2');
    }
  }, []);

  return (
    <>
      <Navbar isHome={true} />

      {/* ── HERO ── */}
      <section className={s.hero}>
        <div className={s.heroDots} />
        <div className={s.heroGlow} />
        <div className={s.heroContent}>
          <h1 className={s.heroTitle}>
            Website Security<br />
            <span className={s.heroTitleGradient}>Standard (WSS)</span>
          </h1>
          <p className={s.heroSub}>
            มาตรฐานการรักษาความมั่นคงปลอดภัยสำหรับเว็บไซต์ พ.ศ. 2568
          </p>
          <p className={s.heroSubTh}>
            ตามประกาศคณะกรรมการการรักษาความมั่นคงปลอดภัยไซเบอร์แห่งชาติ (กมช.)
            อาศัยอำนาจตามพระราชบัญญัติการรักษาความมั่นคงปลอดภัยไซเบอร์ พ.ศ. 2562
            เพื่อยกระดับมาตรการความมั่นคงปลอดภัยและเฝ้าระวังภัยคุกคามสำหรับเว็บไซต์ของหน่วยงานภาครัฐ, Regulator, CII และหน่วยงานเอกชน
          </p>
          <div className={s.heroBtns}>
            <Link href="/assessment" className={s.btnPrimary}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 5l7 7-7 7" />
              </svg>
              เริ่มประเมินตนเอง
            </Link>
            <a href="#about" className={s.btnOutline}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4m0-4h.01" />
              </svg>
              เรียนรู้เพิ่มเติม
            </a>
          </div>
        </div>
      </section>


      {/* ── ABOUT ── */}
      <section className={s.section} id="about">
        <div className={s.aboutGrid}>
          <RevealOnScroll>
            <div className={s.sectionTag}>ข้อมูลกฎหมายและมาตรฐาน</div>
            <h2 className={s.sectionTitle}>
              มาตรฐานการรักษาความปลอดภัยเว็บไซต์
            </h2>
            <p className={s.sectionText}>
              มาตรฐานการรักษาความปลอดภัยเว็บไซต์ พ.ศ. 2568 ประกาศโดยอาศัยอำนาจตามความในมาตรา 9 (5) และมาตรา 22 (13) และ (16) แห่งพระราชบัญญัติการรักษาความมั่นคงปลอดภัยไซเบอร์ พ.ศ. 2562 เพื่อเป็นมาตรฐานขั้นต่ำในการรักษาความปลอดภัยเว็บไซต์สำหรับหน่วยงานของรัฐ หน่วยงานกำกับดูแล หน่วยงาน CII และหน่วยงานเอกชน
            </p>
            <p className={s.sectionText} style={{ marginTop: '1rem' }}>
              ครอบคลุมตั้งแต่การกำหนดโครงสร้างการกำกับดูแล การตรวจวิเคราะห์ประเมินความเสี่ยง การปกป้องข้อมูลและการแลกเปลี่ยนข้อมูลความปลอดภัย ไปจนถึงกระบวนการตรวจจับ แจ้งเตือน เผชิญเหตุ และการจัดทำแผนกู้คืนระบบเพื่อความต่อเนื่องทางธุรกิจ
            </p>
            <div className={s.aboutTags}>
              <span className={s.tag}>หน่วยงานรัฐ</span>
              <span className={s.tag}>หน่วยงานกำกับดูแล</span>
              <span className={s.tag}>หน่วยงาน CII</span>
              <span className={s.tag}>หน่วยงานเอกชน</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className={s.shieldWrap}>
            <a
              href="/wss_standard.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={s.documentCard}
            >
              <img
                src="/doc_preview.png"
                alt="ประกาศมาตรฐาน WSS"
                className={s.documentImg}
              />
              <div className={s.documentGlow} />
              <div className={s.documentHoverOverlay}>
                <span>คลิกเพื่อเปิดดูเอกสารประกาศ →</span>
              </div>
            </a>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── FRAMEWORK ── */}
      <section className={s.fwSection} id="framework">
        <div className={s.fwInner}>
          <div className={`${s.sectionTag} ${s.fwCenter}`}>โครงสร้างมาตรฐาน</div>
          <h2 className={`${s.sectionTitle} ${s.fwCenter}`}>ข้อกำหนดหลักตามเกณฑ์มาตรฐาน WSS</h2>
          <p className={s.fwSubtitle}>
            ครอบคลุมโครงสร้างการบริหารจัดการและการดำเนินงานทางเทคนิคตามแนวทางมาตรฐานการรักษาความมั่นคงปลอดภัย
          </p>

          <WssFrameworkInteractive />
        </div>
      </section>

      {/* ── IMPACT LEVELS ── */}
      <section className={s.impactSection} id="impact">
        <div className={`${s.sectionTag} ${s.impactCenter}`}>ระดับผลกระทบ</div>
        <h2 className={`${s.impactTitle} ${s.impactCenter}`}>เกณฑ์ขั้นต่ำตามความรุนแรงของผลกระทบ </h2>
        <div className={s.impactGrid}>
          <RevealOnScroll>
            <Link href="/criteria?level=low" className={`${s.impactCard} ${s.impactLow}`}>
              <div className={`${s.impactLabel} ${s.impactLabelLow}`}>ผลกระทบระดับต่ำ</div>
              <div className={s.impactLevelTitle} style={{ color: 'var(--green)' }}>LOW</div>
              <p className={s.impactDesc}>เหตุการณ์ส่งผลกระทบอย่างจำกัดหรือเล็กน้อยต่อชื่อเสียง การเงิน หรือการปฏิบัติงานหลักของหน่วยงาน</p>
              <ul className={s.impactReq}>
                <li>ปฏิบัติตามหัวข้อที่ 5 ทุกข้อ</li>
                <li>ปฏิบัติตามหัวข้อที่ 6 เฉพาะเกณฑ์พื้นฐาน (ได้รับยกเว้นบางข้อ เช่น 6.1.1, 6.2.1, 6.3.1)</li>
              </ul>
              <div className={s.impactCardCta}>
                <span>ดูเกณฑ์ข้อกำหนดที่ต้องประเมิน</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </RevealOnScroll>

          <RevealOnScroll>
            <Link href="/criteria?level=medium" className={`${s.impactCard} ${s.impactMid}`}>
              <div className={`${s.impactLabel} ${s.impactLabelMid}`}>ผลกระทบระดับกลาง</div>
              <div className={s.impactLevelTitle} style={{ color: 'var(--gold)' }}>MEDIUM</div>
              <p className={s.impactDesc}>เหตุการณ์ส่งผลกระทบอย่างร้ายแรงต่อการดำเนินงานของหน่วยงาน หรือสิทธิประโยชน์และทรัพย์สินของประชาชน</p>
              <ul className={s.impactReq}>
                <li>ปฏิบัติตามหัวข้อที่ 5 ทุกข้อ</li>
                <li>ปฏิบัติตามหัวข้อที่ 6 เป็นส่วนใหญ่ (ได้รับการยกเว้นเฉพาะการทดสอบเจาะระบบภายนอกและการแบ่งปันข้อมูลขั้นสูง)</li>
              </ul>
              <div className={s.impactCardCta}>
                <span>ดูเกณฑ์ข้อกำหนดที่ต้องประเมิน</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </RevealOnScroll>

          <RevealOnScroll>
            <Link href="/criteria?level=high" className={`${s.impactCard} ${s.impactHigh}`}>
              <div className={`${s.impactLabel} ${s.impactLabelHigh}`}>ผลกระทบระดับสูง</div>
              <div className={s.impactLevelTitle} style={{ color: '#ff6060' }}>HIGH</div>
              <p className={s.impactDesc}>เหตุการณ์ส่งผลกระทบอย่างร้ายแรงยิ่งยวดต่อความมั่นคงของประเทศ ความสงบเรียบร้อย หรือโครงสร้างพื้นฐาน CII</p>
              <ul className={s.impactReq}>
                <li>ปฏิบัติตามมาตรฐานการรักษาความปลอดภัยสำหรับเว็บไซต์ <strong>ทุกข้อกำหนดโดยไม่มีข้อยกเว้น</strong></li>
              </ul>
              <div className={s.impactCardCta}>
                <span>ดูเกณฑ์ข้อกำหนดที่ต้องประเมิน</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className={s.processSection} id="process">
        <div className={s.processInner}>
          <div className={`${s.sectionTag} ${s.processCenter}`}>ขั้นตอนการประเมิน</div>
          <h2 className={`${s.sectionTitle} ${s.processCenter}`}>กระบวนการตรวจสอบความมั่นคงปลอดภัย</h2>
          <div className={s.steps}>
            <div className={s.stepsLine} />
            {[
              { num: '01', title: <>กรอกข้อมูล<br />เว็บไซต์</>, desc: 'กรอกข้อมูลพื้นฐานของหน่วยงานและเว็บไซต์ในส่วนที่ 1 ของแบบฟอร์ม ค1' },
              { num: '02', title: <>ประเมิน<br />คุณลักษณะ CIA</>, desc: 'ประเมินด้านความลับ ความถูกต้อง และสภาพพร้อมใช้งาน ใน 4 มิติผลกระทบ' },
              { num: '03', title: <>กำหนดระดับ<br />ผลกระทบ</>, desc: 'สรุประดับผลกระทบ (ต่ำ/กลาง/สูง) เพื่อกำหนดข้อกำหนดขั้นต่ำที่ต้องปฏิบัติ' },
              { num: '04', title: <>ตรวจสอบ<br />รายการ</>, desc: 'ตรวจสอบสถานะแต่ละข้อกำหนด: ดำเนินการแล้ว / อยู่ระหว่างดำเนินการ / ยังไม่ได้ดำเนินการ' },
              { num: '05', title: <>จัดทำแผน<br />ปรับปรุง</>, desc: 'กรอกแบบฟอร์ม ค2 สำหรับข้อกำหนดที่ "ยังต้องปรับปรุง" พร้อมระบุแผนแก้ไข' },
            ].map((step, i) => (
              <RevealOnScroll key={i} className={s.step}>
                <div className={s.stepNum}>{step.num}</div>
                <h4 className={s.stepTitle}>{step.title}</h4>
                <p className={s.stepDesc}>{step.desc}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMS ── */}
      <section className={s.formsSection} id="forms">
        <div className={`${s.sectionTag} ${s.formsCenter}`}>แบบฟอร์มภาคผนวก ค</div>
        <h2 className={`${s.formsTitle} ${s.formsCenter}`}>แบบฟอร์มสำหรับการประเมิน</h2>
        <div className={s.formsGrid}>
          <RevealOnScroll className={s.formCard}>
            <div className={s.formCardHeader}>
              <div className={`${s.formBadge} ${s.badgeC1}`}>ค1</div>
              <h3 className={s.formCardName}>แบบตรวจรายการสถานะความมั่นคงปลอดภัย</h3>
            </div>
            <p className={s.formCardDesc}>
              แบบฟอร์มสำหรับการประเมินตนเอง (Self-Assessment) ของหน่วยงาน
              ใช้ตรวจสอบสถานะการปฏิบัติตามข้อกำหนดในมาตรฐานฉบับนี้
            </p>
            <div className={s.formItems}>
              <div className={s.formItem}>ส่วนที่ 1 — ข้อมูลเว็บไซต์หน่วยงาน</div>
              <div className={s.formItem}>ส่วนที่ 2 — กำหนดคุณลักษณะ CIA (ตาราง ค1–ค6)</div>
              <div className={s.formItem}>ส่วนที่ 3 — แบบตรวจรายการข้อกำหนด (11 หมวด)</div>
              <div className={s.formItem}>ระบุหลักฐานการดำเนินการในแต่ละข้อ</div>
            </div>

            <div className={s.formActions}>
              <a
                href="/wss_standard.pdf#page=51"
                target="_blank"
                rel="noopener noreferrer"
                className={s.btnFormPrimary}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                <span>เปิดดูเอกสารแบบฟอร์ม ค1 (หน้า 51)</span>
              </a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className={s.formCard}>
            <div className={s.formCardHeader}>
              <div className={`${s.formBadge} ${s.badgeC2}`}>ค2</div>
              <h3 className={s.formCardName}>แบบรายงานรายการที่ยังต้องปรับปรุง</h3>
            </div>
            <p className={s.formCardDesc}>
              เมื่อหน่วยงานพบรายการที่มีผลการประเมินเป็น &quot;ยังต้องปรับปรุง&quot;
              ให้ระบุรายละเอียดเพื่อวางแผนแก้ไขให้เป็นไปตามมาตรฐาน
            </p>
            <div className={s.formItems}>
              <div className={s.formItem}>ระบุข้อกำหนดที่ยังต้องปรับปรุง</div>
              <div className={s.formItem}>วิเคราะห์สาเหตุและการปรับปรุงเบื้องต้น</div>
              <div className={s.formItem}>กำหนดรายการแก้ไข ผู้รับผิดชอบ และวันแล้วเสร็จ</div>
              <div className={s.formItem}>ติดตามผลการดำเนินการให้เป็นไปตามมาตรฐาน</div>
            </div>

            <div className={s.formActions}>
              <a
                href="/wss_standard.pdf#page=72"
                target="_blank"
                rel="noopener noreferrer"
                className={s.btnFormPrimary}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                <span>เปิดดูเอกสารแบบฟอร์ม ค2 (หน้า 72)</span>
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── VIDEOS & KNOWLEDGE SHARING ── */}
      <section className={s.videoSection} id="videos">
        <div className={s.videoInner}>
          <div className={s.videoCenter}>
            <div className={s.sectionTag}>คลังความรู้และการแนะนำ</div>
            <h2 className={s.videoTitle}>วิดีโอแนะนำมาตรฐาน</h2>
            <p className={s.videoSubtitle}>
              ศึกษาคำแนะนำและแนวทางปฏิบัติการประเมินสถานะความปลอดภัยของเว็บไซต์ตามเกณฑ์มาตรฐาน WSS
            </p>
          </div>

          <div className={s.videoGrid}>
            {[
              {
                id: '7ky1u4KEcyk',
                title: 'แนวทางเกณฑ์มาตรฐานรักษาความมั่นคงปลอดภัยเว็บไซต์ (WSS)',
                desc: 'บรรยายภาพรวมกรอบแนวทางและหลักเกณฑ์มาตรฐานความมั่นคงปลอดภัยสำหรับเว็บไซต์หน่วยงาน',
              },
              {
                id: 'GDKFojgPaSA',
                title: 'การเตรียมความพร้อมระบบความปลอดภัยเว็บไซต์หน่วยงานรัฐ',
                desc: 'แนวทางปฏิบัติและกรณีศึกษาการปรับปรุงสถาปัตยกรรมความมั่นคงปลอดภัยของระบบเว็บพอร์ทัล',
              },
              {
                id: '7CmgsWXbJz8',
                title: 'การสัมมนาและสรุปการประเมินความปลอดภัยเว็บไซต์ภาครัฐ',
                desc: 'งานเสวนาแลกเปลี่ยนและชี้แจงกรอบการสำรวจประเมินตนเองตามมาตรฐาน WSS ประจำปี',
              },
            ].map((video) => (
              <div key={video.id} className={s.videoCard}>
                <div className={s.videoFrameWrapper}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className={s.videoInfo}>
                  <h4 className={s.videoCardTitle}>{video.title}</h4>
                  <p className={s.videoCardDesc}>{video.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
