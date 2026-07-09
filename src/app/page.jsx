'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import s from '@/styles/home.module.css';
import RevealOnScroll from '@/components/RevealOnScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
          <div className={s.heroBadge}>
            <span className={s.heroBadgeDot} />
            มาตรฐานความมั่นคงปลอดภัยสำหรับเว็บไซต์
          </div>
          <h1 className={s.heroTitle}>
            Website Security<br />
            <span className={s.heroTitleGradient}>Standard (WSS)</span>
          </h1>
          <p className={s.heroSub}>
            กรอบมาตรฐานด้านความมั่นคงปลอดภัยไซเบอร์สำหรับเว็บไซต์หน่วยงานของรัฐ
            หน่วยงานโครงสร้างพื้นฐานสำคัญทางสารสนเทศ และหน่วยงานเอกชน
          </p>
          <p className={s.heroSubTh}>
            ครอบคลุมการระบุความเสี่ยง การป้องกัน การตรวจจับภัยคุกคาม การรับมือเหตุการณ์ และการฟื้นฟูระบบ
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

      {/* ── STATS ── */}
      <div className={s.statsBar}>
        {[
          { num: '2', label: <>กลุ่มหน่วยงาน<br />ที่ครอบคลุม</> },
          { num: '4', label: <>ด้านผลกระทบ<br />ที่ต้องประเมิน</> },
          { num: '3', label: <>ระดับ<br />ผลกระทบ</> },
          { num: '11', label: <>หมวดข้อกำหนด<br />หลัก</> },
          { num: 'CIA', label: <>คุณลักษณะ<br />ความมั่นคงปลอดภัย</> },
        ].map((item, i) => (
          <RevealOnScroll key={i} className={s.stat}>
            <div className={s.statNum}>{item.num}</div>
            <div className={s.statLabel}>{item.label}</div>
          </RevealOnScroll>
        ))}
      </div>

      {/* ── ABOUT ── */}
      <section className={s.section} id="about">
        <div className={s.aboutGrid}>
          <RevealOnScroll>
            <div className={s.sectionTag}>WSS คืออะไร?</div>
            <h2 className={s.sectionTitle}>
              มาตรฐานความมั่นคงปลอดภัย<br />สำหรับเว็บไซต์
            </h2>
            <p className={s.sectionText}>
              WSS (Website Security Standard)
              คือมาตรฐานที่กำหนดแนวทางการรักษาความมั่นคงปลอดภัยไซเบอร์สำหรับเว็บไซต์ขององค์กร
              ทั้งภาครัฐและเอกชน
              ให้มีระดับความปลอดภัยที่เพียงพอและสอดคล้องกับกฎหมายที่เกี่ยวข้อง
            </p>
            <p className={s.sectionText} style={{ marginTop: '1rem' }}>
              มาตรฐานนี้ครอบคลุมตั้งแต่การกำหนดนโยบาย การจัดการความเสี่ยง การป้องกันระบบ
              ไปจนถึงการรับมือเหตุการณ์และการฟื้นฟูความเสียหายจากภัยคุกคามทางไซเบอร์
            </p>
            <div className={s.aboutTags}>
              <span className={s.tag}>หน่วยงานของรัฐ</span>
              <span className={s.tag}>หน่วยงาน CII</span>
              <span className={s.tag}>หน่วยงานเอกชน</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className={s.shieldWrap}>
            <div className={`${s.orbit} ${s.orbit1}`}>
              <div className={s.orbitDot} />
            </div>
            <div className={`${s.orbit} ${s.orbit2}`}>
              <div className={`${s.orbitDot} ${s.orbitDotGold}`} />
            </div>
            <svg className={s.shieldSvg} viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 10 L180 45 L180 130 C180 175 140 210 100 220 C60 210 20 175 20 130 L20 45 Z"
                fill="rgba(26,107,255,0.08)"
                stroke="url(#sg)"
                strokeWidth="1.5"
              />
              <path
                d="M100 30 L165 58 L165 130 C165 167 133 197 100 207 C67 197 35 167 35 130 L35 58 Z"
                fill="rgba(0,207,255,0.06)"
                stroke="rgba(0,207,255,0.3)"
                strokeWidth="1"
              />
              <text x="100" y="125" fontFamily="Chakra Petch, sans-serif" fontSize="28" fontWeight="700" fill="url(#tg)" textAnchor="middle">
                WSS
              </text>
              <text x="100" y="150" fontFamily="Sarabun, sans-serif" fontSize="10" fill="rgba(200,216,240,0.6)" textAnchor="middle">
                SECURE
              </text>
              <defs>
                <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1a6bff" />
                  <stop offset="100%" stopColor="#00cfff" />
                </linearGradient>
                <linearGradient id="tg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00cfff" />
                  <stop offset="100%" stopColor="#1a6bff" />
                </linearGradient>
              </defs>
            </svg>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── DOWNLOAD ── */}
      <section className={s.docSection} id="download">
        <RevealOnScroll className={s.downloadCard}>
          <div className={s.downloadInfo}>
            <div className={s.iconBox}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div>
              <h3 className={s.dlTitle}>ดาวน์โหลดเอกสารมาตรฐาน WSS</h3>
              <p className={s.dlDesc}>
                ประกาศสำนักงานคณะกรรมการการรักษาความมั่นคงปลอดภัยไซเบอร์แห่งชาติ (สกมช.)
                เรื่อง มาตรฐานการรักษาความมั่นคงปลอดภัยเว็บไซต์
              </p>
            </div>
          </div>
          <div>
            <a href="https://drive.ncsa.or.th/s/JLWCNF6ppaRjYmG?dir=/&editing=false&openfile=true" target="_blank" rel="noopener noreferrer" className={s.btnDownload}>
              <span>ดาวน์โหลดจาก สกมช.</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>
        </RevealOnScroll>
      </section>

      {/* ── FRAMEWORK ── */}
      <section className={s.fwSection} id="framework">
        <div className={s.fwInner}>
          <div className={`${s.sectionTag} ${s.fwCenter}`}>กรอบมาตรฐาน</div>
          <h2 className={`${s.sectionTitle} ${s.fwCenter}`}>ข้อกำหนดหลัก 6 ด้าน</h2>
          <p className={s.fwSubtitle}>
            ครอบคลุมทุกมิติของความมั่นคงปลอดภัยเว็บไซต์ ตั้งแต่การกำกับดูแลระดับองค์กรจนถึงการดำเนินการทางเทคนิค
          </p>
          <div className={s.fwGrid}>
            {[
              { num: 'หัวข้อ 5 · GOVERNANCE', icon: '🏛️', title: 'การกำกับดูแลด้านความมั่นคงปลอดภัย', desc: 'การสำรวจบริบทองค์กร นโยบายความมั่นคงปลอดภัย กลยุทธ์การจัดการความเสี่ยง บทบาทและความรับผิดชอบ รวมถึงการวางแผนความต้องการด้าน Security' },
              { num: 'หัวข้อ 6.1 · IDENTIFY', icon: '🔍', title: 'การระบุความเสี่ยงของเว็บไซต์', desc: 'การจัดการทรัพย์สิน (Asset Management) การประเมินความเสี่ยง การประเมินช่องโหว่ การทดสอบเจาะระบบ (Penetration Testing) และการจัดการผู้ให้บริการภายนอก' },
              { num: 'หัวข้อ 6.2 · PROTECT', icon: '🛡️', title: 'การป้องกันความเสี่ยงของเว็บไซต์', desc: 'การพัฒนา Web Application อย่างมั่นคงปลอดภัย การออกแบบสถาปัตยกรรม การควบคุมการเข้าถึง MFA การตั้งค่า CMS / Server / Firewall และ TLS Certificate' },
              { num: 'หัวข้อ 6.3 · DETECT', icon: '📡', title: 'การตรวจสอบและเฝ้าระวังภัยคุกคาม', desc: 'การสร้างกลไกตรวจจับและวิเคราะห์ภัยคุกคามทางไซเบอร์สำหรับเว็บไซต์ พร้อมการทบทวนกระบวนการตรวจสอบอย่างน้อยปีละ 1 ครั้ง' },
              { num: 'หัวข้อ 6.4 · RESPOND', icon: '⚡', title: 'การเผชิญเหตุและรับมือภัยคุกคาม', desc: 'แผนการรับมือภัยคุกคาม (Incident Response Plan) แผนสื่อสารภาวะวิกฤต (Crisis Communication Plan) และการฝึกซ้อมความมั่นคงปลอดภัยประจำปี' },
              { num: 'หัวข้อ 6.5 · RECOVER', icon: '🔄', title: 'การรักษาและฟื้นฟูความเสียหาย', desc: 'การจัดทำแผนความต่อเนื่องทางธุรกิจ (Business Continuity Plan: BCP) การฝึกซ้อม BCP อย่างน้อยปีละ 1 ครั้ง เพื่อรับมือกับเหตุการณ์ที่เกิดขึ้น' },
            ].map((card, i) => (
              <RevealOnScroll key={i} className={s.fwCard}>
                <div className={s.fwNum}>{card.num}</div>
                <div className={s.fwIcon}>{card.icon}</div>
                <h3 className={s.fwCardTitle}>{card.title}</h3>
                <p className={s.fwCardDesc}>{card.desc}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT LEVELS ── */}
      <section className={s.impactSection} id="impact">
        <div className={`${s.sectionTag} ${s.impactCenter}`}>ระดับผลกระทบ</div>
        <h2 className={`${s.impactTitle} ${s.impactCenter}`}>การกำหนดข้อกำหนดขั้นต่ำตามระดับผลกระทบ</h2>
        <div className={s.impactGrid}>
          <RevealOnScroll className={`${s.impactCard} ${s.impactLow}`}>
            <div className={`${s.impactLabel} ${s.impactLabelLow}`}>ผลกระทบระดับต่ำ</div>
            <div className={s.impactLevelTitle} style={{ color: 'var(--green)' }}>LOW</div>
            <p className={s.impactDesc}>เหตุการณ์ส่งผลกระทบต่อหน่วยงานเพียงเล็กน้อยหรืออย่างจำกัด ต่อการเงิน ชื่อเสียง หรือความสามารถในการดำเนินงาน</p>
            <ul className={s.impactReq}>
              <li>ปฏิบัติตามหัวข้อที่ 5 ทุกข้อ</li>
              <li>ปฏิบัติตามหัวข้อที่ 6 บางส่วน (ยกเว้น 6.1.1, 6.2.1, 6.2.3(4-7), บางส่วนของ 6.2.4, 6.3.1, 6.4.1, 6.5.1)</li>
            </ul>
          </RevealOnScroll>

          <RevealOnScroll className={`${s.impactCard} ${s.impactMid}`}>
            <div className={`${s.impactLabel} ${s.impactLabelMid}`}>ผลกระทบระดับกลาง</div>
            <div className={s.impactLevelTitle} style={{ color: 'var(--gold)' }}>MEDIUM</div>
            <p className={s.impactDesc}>เหตุการณ์ส่งผลกระทบอย่างร้ายแรงต่อหน่วยงาน บุคลากร หรือประชาชนในด้านชีวิต ร่างกาย ทรัพย์สิน</p>
            <ul className={s.impactReq}>
              <li>ปฏิบัติตามหัวข้อที่ 5 ทุกข้อ</li>
              <li>ปฏิบัติตามหัวข้อที่ 6 เกือบทั้งหมด (ยกเว้น 6.1.1 บางส่วน, 6.2.1, 6.2.3(5-7) และ 6.2.4 เฉพาะ Information Sharing)</li>
            </ul>
          </RevealOnScroll>

          <RevealOnScroll className={`${s.impactCard} ${s.impactHigh}`}>
            <div className={`${s.impactLabel} ${s.impactLabelHigh}`}>ผลกระทบระดับสูง</div>
            <div className={s.impactLevelTitle} style={{ color: '#ff6060' }}>HIGH</div>
            <p className={s.impactDesc}>เหตุการณ์ส่งผลกระทบอย่างร้ายแรงมากต่อความมั่นคงของรัฐ ความสงบเรียบร้อย หรือก่อให้เกิดความเสียหายในวงกว้าง</p>
            <ul className={s.impactReq}>
              <li>ปฏิบัติตามข้อกำหนดในมาตรฐานนี้ <strong>ทุกข้อ</strong></li>
            </ul>
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
      <section className={s.formsSection}>
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
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={s.ctaSection}>
        <div className={s.ctaGlow} />
        <h2 className={s.ctaTitle}>
          พร้อมเริ่มต้น<span className={s.ctaGradient}>ประเมินตนเอง</span>?
        </h2>
        <p className={s.ctaDesc}>
          ใช้แบบฟอร์มประเมินตนเองเพื่อตรวจสอบสถานะความมั่นคงปลอดภัยของเว็บไซต์หน่วยงานคุณตามมาตรฐาน WSS
        </p>
        <Link href="/assessment" className={s.btnPrimary}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 5l7 7-7 7" />
          </svg>
          เริ่มประเมินตนเองทันที
        </Link>
      </section>

      <Footer />
    </>
  );
}
