'use client';

import { useState } from 'react';
import Link from 'next/link';
import s from '@/styles/home.module.css';

const FRAMEWORK_SECTIONS = {
  governance: {
    id: 'governance',
    num: 'หัวข้อ 5',
    code: '2.1 Website Security Governance',
    title: 'การกำกับดูแลความมั่นคงปลอดภัยสำหรับเว็บไซต์',
    icon: '🏛️',
    tag: 'การกำกับดูแลและนโยบาย',
    desc: 'การกำหนดบทบาทหน้าที่ โครงสร้างการดำเนินงาน การจัดทำนโยบายความมั่นคงปลอดภัย และกลยุทธ์การจัดการความเสี่ยงของระบบเว็บไซต์ให้สอดคล้องกับบริบทองค์กร',
    items: [
      '5.1 การสำรวจบริบทขององค์กร (Organization Context)',
      '5.2 นโยบายด้านความมั่นคงปลอดภัยสำหรับเว็บไซต์ (Security Policy)',
      '5.3 กลยุทธ์การจัดการความเสี่ยง (Risk Management Strategy)',
      '5.4 บทบาทและความรับผิดชอบ (Roles & Responsibilities)',
      '5.5 การวางแผนกำหนดความต้องการความมั่นคงปลอดภัย (Security Requirements)'
    ]
  },
  identify: {
    id: 'identify',
    num: 'หัวข้อ 6.1',
    code: '2.2.1 Website Security Identification',
    title: 'การระบุความเสี่ยงของระบบเว็บไซต์ (Identify)',
    icon: '🔍',
    tag: 'การตรวจสอบสินทรัพย์และช่องโหว่',
    desc: 'การตรวจวิเคราะห์ช่องโหว่ (Vulnerability Assessment) การทดสอบเจาะระบบ (Penetration Testing) การจัดทำบัญชีสินทรัพย์ดิจิทัล และการประเมินความเสี่ยงผู้ให้บริการภายนอก',
    items: [
      '6.1.1 การตรวจประเมินช่องโหว่ประจำปี (Vulnerability Assessment)',
      '6.1.2 การทดสอบเจาะระบบเว็บไซต์ (Penetration Testing)',
      '6.1.3 การประเมินความเสี่ยงของผู้ให้บริการภายนอก (Third-Party Risk)',
      '6.1.4 การจัดทำบัญชีรายการสินทรัพย์เว็บไซต์และฐานข้อมูล (Asset Inventory)'
    ]
  },
  protect: {
    id: 'protect',
    num: 'หัวข้อ 6.2',
    code: '2.2.2 Website Security Protection',
    title: 'การควบคุมป้องกันความรุนแรงของภัยคุกคาม (Protect)',
    icon: '🛡️',
    tag: 'การสร้างภูมิคุ้มกันทางเทคนิค',
    desc: 'การพัฒนาโค้ดอย่างปลอดภัย (Secure Coding) การใช้ TLS/HTTPS, การบังคับใช้ MFA สำหรับผู้ดูแลระบบ, การปรับแต่งยกระดับความปลอดภัย CMS (Hardening) และการจำกัดสิทธิ์ใช้งาน',
    items: [
      '6.2.1 การเข้ารหัสช่องทางสื่อสารด้วย SSL/TLS Certificate (HTTPS)',
      '6.2.2 การบังคับใช้ระบบยืนยันตัวตนแบบหลายปัจจัย (MFA) สำหรับ Admin',
      '6.2.3 การปรับแต่งความปลอดภัยของระบบ CMS และ Web Server (Hardening)',
      '6.2.4 การป้องกันช่องโหว่เว็บตามแนวทาง OWASP Top 10'
    ]
  },
  detect: {
    id: 'detect',
    num: 'หัวข้อ 6.3',
    code: '2.2.3 Website Security Detection',
    title: 'การตรวจสอบและเฝ้าระวังภัยคุกคาม (Detect)',
    icon: '📡',
    tag: 'การตรวจจับภัยคุกคามแบบ Real-time',
    desc: 'การจัดเก็บบันทึกข้อมูลจราจรคอมพิวเตอร์ (Log Management) ตามกฎหมายไม่น้อยกว่า 90 วัน การเฝ้าระวังการบุกรุกแบบ Real-time และการตรวจจับการเปลี่ยนแปลงไฟล์เว็บไซต์',
    items: [
      '6.3.1 การจัดเก็บบันทึก Log จราจรตามกฎหมายไม่น้อยกว่า 90 วัน',
      '6.3.2 การเฝ้าระวังพฤติกรรมผิดปกติและการเปลี่ยนแปลงไฟล์ (File Integrity)',
      '6.3.3 การเชื่อมโยงข้อมูลภัยคุกคามเข้ากับระบบ SIEM / SOC',
      '6.3.4 การตรวจสอบติดตามสถานะการเปิดใช้งานของระบบเว็บไซต์อย่างสม่ำเสมอ'
    ]
  },
  respond: {
    id: 'respond',
    num: 'หัวข้อ 6.4',
    code: '2.2.4 Website Incident Respond',
    title: 'การเผชิญเหตุและรับมือสถานการณ์ฉุกเฉิน (Respond)',
    icon: '⚡',
    tag: 'แผนรับมือและกักกันภัยคุกคาม',
    desc: 'การจัดทำแผนเผชิญเหตุฉุกเฉิน (Incident Response Plan) ขั้นตอนการระงับการโจมตี (Defacement/DDoS/Data Leak) การแจ้งเตือน สกมช. และการซักซ้อมแผนประจำปี',
    items: [
      '6.4.1 แผนปฏิบัติตอบสนองเมื่อเกิดเหตุภัยคุกคามไซเบอร์ (IRP)',
      '6.4.2 ขั้นตอนการกักกันและระงับความเสียหายของระบบเว็บไซต์',
      '6.4.3 การแจ้งเตือนและรายงานเหตุไปยัง สกมช. (NCSA) และ CERT',
      '6.4.4 การซักซ้อมกระบวนการตอบสนองภัยคุกคามไซเบอร์ประจำปี'
    ]
  },
  recover: {
    id: 'recover',
    num: 'หัวข้อ 6.5',
    code: '2.2.5 Website Recovery',
    title: 'การรักษาความพร้อมใช้งานและการฟื้นฟูระบบ (Recover)',
    icon: '🔄',
    tag: 'การกู้คืนและความต่อเนื่อง',
    desc: 'การทำสำรองข้อมูลระบบ (Backup Plan) ทั้งในและนอกสถานที่ การวางแผนความต่อเนื่องในการดำเนินงาน (BCP/DRP) และการทดสอบกู้คืนระบบเมื่อเกิดเหตุขัดข้อง',
    items: [
      '6.5.1 การทำสำรองข้อมูลเว็บไซต์และฐานข้อมูล (Full & Incremental Backup)',
      '6.5.2 การจัดเก็บข้อมูลสำรอง ณ สถานที่ปลอดภัยภายนอก (Off-site Backup)',
      '6.5.3 การทดสอบกระบวนการกู้คืนระบบ (Restore Test) เป็นประจำ',
      '6.5.4 การจัดทำแผนความต่อเนื่องในการดำเนินธุรกิจ (BCP / DRP)'
    ]
  },
  scope: {
    id: 'scope',
    num: 'สถาปัตยกรรมทางเทคนิค',
    code: 'Standard Scope',
    title: 'ขอบเขตสถาปัตยกรรมระบบเว็บไซต์ภายใต้มาตรฐาน',
    icon: '💻',
    tag: 'Web Server, Database, Security Services',
    desc: 'ครอบคลุมเครื่องแม่ข่าย อุปกรณ์ความมั่นคงปลอดภัยไซเบอร์ และซอฟต์แวร์ประยุกต์ ได้แก่ DNS/DNSSEC, Firewall/WAF, Web Server (OS, Apache/Nginx/IIS, CMS, Web App) และ Database Server',
    items: [
      'Web Browser Access & DNS / DNSSEC Domain Security',
      'Security Devices & Services (Firewall, WAF, IDS/IPS, Anti-Virus/EDR, SIEM)',
      'Web Server Scope (Operating System, Web Server Software, CMS, Web Application, SSL/TLS)',
      'Database Server Scope (Operating System, DBMS Software, Database Storage)'
    ]
  }
};

export default function WssFrameworkInteractive() {
  const [activeId, setActiveId] = useState('governance');

  const activeSection = FRAMEWORK_SECTIONS[activeId] || FRAMEWORK_SECTIONS.governance;

  return (
    <div className={s.fwInteractiveContainer}>
      {/* Subheader Title */}
      <div className={s.fwHeaderBar}>
        <div>
          <h3 className={s.fwInteractiveTitle}>แผนผังโครงสร้างสถาปัตยกรรมมาตรฐาน WSS</h3>
          <p className={s.fwInteractiveSub}>
            ดัดแปลงจากกรอบการทำงาน NIST CSF (2.0) และ ประกาศ กคช. (คลิกเลือกหัวข้อเพื่อสำรวจรายละเอียดข้อกำหนด)
          </p>
        </div>
      </div>

      {/* ── INTERACTIVE DIAGRAM VIEW ── */}
      <div className={s.diagramLayout}>
        {/* Main Visual Framework Outer Box */}
        <div className={s.diagramFrame}>
          {/* Outer Layer: Operation (Section 6) */}
          <div className={s.outerOperationHeader}>
            <span>2.2 Website Security Operation (หัวข้อ 6)</span>
          </div>

          <div className={s.diagramPillarsGrid}>
            {/* Top: 2.2.1 Identification */}
            <button
              type="button"
              className={`${s.diagramBlockNode} ${s.nodeTop} ${activeId === 'identify' ? s.nodeActive : ''}`}
              onClick={() => setActiveId('identify')}
            >
              <span className={s.nodeNum}>2.2.1 Identification (หัวข้อ 6.1)</span>
              <span className={s.nodeTitle}>🔍 การระบุความเสี่ยงของระบบเว็บไซต์</span>
            </button>

            {/* Middle Layer: Governance (Section 5) Outer Container */}
            <div className={s.governanceContainerNode}>
              <button
                type="button"
                className={`${s.govHeaderNode} ${activeId === 'governance' ? s.govHeaderNodeActive : ''}`}
                onClick={() => setActiveId('governance')}
              >
                <span className={s.nodeNum}>2.1 Website Security Governance (หัวข้อ 5)</span>
                <span className={s.govTitleText}>🏛️ การกำกับดูแลความมั่นคงปลอดภัยสำหรับเว็บไซต์</span>
              </button>

              {/* Core Architecture Scope Box inside Governance */}
              <div className={s.coreScopeBox}>
                <div className={s.scopeBoxHeader}>ขอบเขตของมาตรฐาน (Standard Technical Scope)</div>
                
                <div className={s.scopeArchitectGrid}>
                  {/* Browser & DNS */}
                  <div className={s.archBox}>
                    <div className={s.archBoxTitle}>Web Client</div>
                    <div className={s.archBoxItem}>DNS / DNSSEC</div>
                    <div className={s.archBoxItem}>Web Browser</div>
                  </div>

                  {/* Security Devices */}
                  <div className={s.archBox}>
                    <div className={s.archBoxTitle}>Security Devices & Services</div>
                    <div className={s.archChipsGrid}>
                      <span>Firewall</span>
                      <span>IDS / IPS</span>
                      <span>WAF</span>
                      <span>Anti-Virus/EDR</span>
                      <span>SIEM / SOAR</span>
                    </div>
                  </div>

                  {/* Web Server & Database Scope */}
                  <button
                    type="button"
                    className={`${s.archScopeTargetBox} ${activeId === 'scope' ? s.archScopeTargetActive : ''}`}
                    onClick={() => setActiveId('scope')}
                  >
                    <div className={s.archTargetLabel}>ขอบเขตหลักในมาตรฐาน WSS</div>
                    <div className={s.archTargetCols}>
                      <div className={s.archCol}>
                        <strong>Web Server</strong>
                        <span>SSL / TLS</span>
                        <span>CMS / Web App</span>
                        <span>Operating System</span>
                      </div>
                      <div className={s.archCol}>
                        <strong>Database Server</strong>
                        <span>Database</span>
                        <span>DBMS Software</span>
                        <span>Operating System</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Side & Bottom Pillars (Protect, Detect, Respond, Recover) */}
            <div className={s.sidePillarsRow}>
              <button
                type="button"
                className={`${s.diagramBlockNode} ${activeId === 'recover' ? s.nodeActive : ''}`}
                onClick={() => setActiveId('recover')}
              >
                <span className={s.nodeNum}>2.2.5 Recovery (หัวข้อ 6.5)</span>
                <span className={s.nodeTitle}>🔄 การฟื้นฟูระบบ</span>
              </button>

              <button
                type="button"
                className={`${s.diagramBlockNode} ${activeId === 'respond' ? s.nodeActive : ''}`}
                onClick={() => setActiveId('respond')}
              >
                <span className={s.nodeNum}>2.2.4 Incident Respond (หัวข้อ 6.4)</span>
                <span className={s.nodeTitle}>⚡ การเผชิญเหตุ</span>
              </button>

              <button
                type="button"
                className={`${s.diagramBlockNode} ${activeId === 'detect' ? s.nodeActive : ''}`}
                onClick={() => setActiveId('detect')}
              >
                <span className={s.nodeNum}>2.2.3 Detection (หัวข้อ 6.3)</span>
                <span className={s.nodeTitle}>📡 การตรวจจับ</span>
              </button>

              <button
                type="button"
                className={`${s.diagramBlockNode} ${activeId === 'protect' ? s.nodeActive : ''}`}
                onClick={() => setActiveId('protect')}
              >
                <span className={s.nodeNum}>2.2.2 Protection (หัวข้อ 6.2)</span>
                <span className={s.nodeTitle}>🛡️ การควบคุมป้องกัน</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── ACTIVE SECTION DETAIL DRAWER / PANEL ── */}
      <div className={s.fwDetailPanel}>
        <div className={s.fwDetailHeader}>
          <div className={s.fwDetailBadges}>
            <span className={s.fwNumPill}>{activeSection.num}</span>
            <span className={s.fwCodePill}>{activeSection.code}</span>
            <span className={s.fwTagPill}>{activeSection.tag}</span>
          </div>
          <h3 className={s.fwDetailTitle}>
            <span className={s.fwDetailIcon}>{activeSection.icon}</span>
            {activeSection.title}
          </h3>
          <p className={s.fwDetailDesc}>{activeSection.desc}</p>
        </div>

        <div className={s.fwDetailItemsBox}>
          <div className={s.fwDetailItemsHeader}>
            รายการข้อกำหนดและมาตรการสำคัญในหมวดนี้:
          </div>
          <div className={s.fwDetailItemsGrid}>
            {activeSection.items.map((itemText, idx) => (
              <div key={idx} className={s.fwDetailItemCard}>
                <span className={s.fwItemCheckIcon}>✓</span>
                <span className={s.fwItemText}>{itemText}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
