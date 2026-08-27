import React, { useState } from 'react';
import Link from 'next/link';
import s from '@/styles/assessment.module.css';

const PART_RECOMMENDATIONS = {
  p1: {
    high: 'หน่วยงานมีการสำรวจบริบทองค์กรเรียบร้อยแล้ว ควรประเมินและทบทวนบริบทและปัจจัยเสี่ยงอย่างน้อยปีละ 1 ครั้ง',
    medium: 'ควรรีบสรุปและจัดทำเอกสารการสำรวจบริบทองค์กรให้แล้วเสร็จ เพื่อนำไปใช้กำหนดกรอบการบริหารความเสี่ยง',
    low: 'ต้องเร่งสำรวจบริบทองค์กร (5.1.1) และปัจจัยเสี่ยงภายนอก/ภายใน เพื่อเป็นฐานในการจัดทำนโยบายความปลอดภัย',
  },
  p2: {
    high: 'นโยบายความมั่นคงปลอดภัยเว็บไซต์มีความครอบคลุมแล้ว ควรกำกับดูแลให้มีการปฏิบัติตามนโยบายอย่างเคร่งครัด',
    medium: 'ควรปรับปรุงเนื้อหานโยบายเว็บไซต์ให้ครอบคลุมการพัฒนาโค้ด การตั้งค่า CMS และการจัดการสิทธิ์ access control',
    low: 'ต้องเร่งจัดทำและประกาศใช้นโยบายความมั่นคงปลอดภัยสำหรับเว็บไซต์ (5.2) โดยได้รับอนุมัติจากผู้บริหาร',
  },
  p3: {
    high: 'กลยุทธ์การจัดการความเสี่ยงได้รับการวางแผนอย่างดี ควรประเมินและทบทวนความเสี่ยงใหม่เมื่อมีการปรับปรุงระบบ',
    medium: 'ควรจัดทำแผนบริหารความเสี่ยงที่เป็นลายลักษณ์อักษร และระบุมาตรการตอบสนองความเสี่ยงที่ชัดเจน',
    low: 'ต้องเร่งกำหนดกลยุทธ์การบริหารความเสี่ยงเว็บไซต์ (5.3) และกำหนดเกณฑ์การยอมรับความเสี่ยง (Risk Appetite)',
  },
  p4: {
    high: 'การกำหนดบทบาทหน้าที่ชัดเจนดีแล้ว ควรจัดอบรมตระหนักรู้ด้านความปลอดภัยแก่เจ้าหน้าที่อย่างสม่ำเสมอ',
    medium: 'ควรกำหนดผู้รับผิดชอบดูแลความปลอดภัยเว็บไซต์ (5.4.2) และช่องทางแจ้งเหตุฉุกเฉินให้ชัดเจนยิ่งขึ้น',
    low: 'ต้องเร่งมอบหมายบทบาทหน้าที่และความรับผิดชอบด้านความมั่นคงปลอดภัยเว็บไซต์ให้แก่บุคลากรหรือทีมงานที่ชัดเจน',
  },
  p5: {
    high: 'การวางแผนกำหนดความต้องการความมั่นคงปลอดภัยครบถ้วนแล้ว ให้รักษาระดับมาตรการควบคุมอย่างต่อเนื่อง',
    medium: 'ควรทบทวนรายการข้อกำหนดความปลอดภัยเว็บไซต์และปรับปรุงมาตรการทางเทคนิคให้ครบตามระดับผลกระทบ',
    low: 'ต้องเร่งประเมินระดับผลกระทบ (CIA Impact Level) และกำหนดข้อกำหนดความปลอดภัยขั้นต่ำที่เว็บไซต์ต้องมี',
  },
  p6: {
    high: 'การกำหนดแนวทางปฏิบัติทางเทคนิคครบถ้วนสมบูรณ์ ควรตรวจสอบความสอดคล้อง (Compliance Check) สม่ำเสมอ',
    medium: 'ควรเพิ่มมาตรการการเข้ารหัสข้อมูล (TLS/HTTPS), การตั้งค่า Security Headers และการยกระดับความปลอดภัย CMS',
    low: 'ต้องเร่งปรับปรุงแนวทางความปลอดภัยทางเทคนิค (Secure Coding, Hardening, Patch Management, SSL/TLS Certificate)',
  },
  p7: {
    high: 'กระบวนการระบุความเสี่ยงและตรวจช่องโหว่ครอบคลุมแล้ว ควรจัดทำ Penetration Testing ประจำปี',
    medium: 'ควรสแกนตรวจหาช่องโหว่ (Vulnerability Assessment) ของระบบเว็บไซต์และอัปเดตแพตช์ความปลอดภัยทันที',
    low: 'ต้องเร่งดำเนินการสแกนช่องโหว่เว็บไซต์ การตรวจสอบบัญชีสินทรัพย์ดิจิทัล และคัดกรองความเสี่ยงผู้ให้บริการภายนอก',
  },
  p8: {
    high: 'ระบบป้องกันความเสี่ยงเว็บไซต์มีประสิทธิภาพสูง ควรทดสอบความพร้อมของ Web Application Firewall (WAF) สม่ำเสมอ',
    medium: 'ควรติดตั้ง WAF, บังคับใช้ Multi-Factor Authentication (MFA) สำหรับผู้ดูแลระบบ และจำกัดสิทธิ์ Admin',
    low: 'ต้องเร่งติดตั้งระบบป้องกันการบุกรุก (WAF/IPS), บังคับใช้ HTTPS ทั้งระบบ และปิดกั้นพอร์ตที่ไม่จำเป็น',
  },
  p9: {
    high: 'ระบบตรวจจับและการเฝ้าระวังภัยคุกคามดีมาก ควรมอนิเตอร์ Log และวิเคราะห์ความผิดปกติแบบ real-time',
    medium: 'ควรเปิดใช้งานและจัดเก็บ Log จราจรคอมพิวเตอร์ตามกฎหมาย (ไม่น้อยกว่า 90 วัน) และหมั่นตรวจสอบความผิดปกติ',
    low: 'ต้องเร่งเปิดบันทึก Log ของ Web Server/Database และกำหนดผู้รับผิดชอบในการเฝ้าระวังแจ้งเตือนเหตุผิดปกติ',
  },
  p10: {
    high: 'แผนเผชิญเหตุและการรับมือฉุกเฉินพร้อมใช้งาน ควรซ้อมแผน Incident Response ร่วมกับทีมงานอย่างน้อยปีละ 1 ครั้ง',
    medium: 'ควรจัดทำขั้นตอนปฏิบัติตอบสนองเมื่อถูกโจมตี (Defacement/DDoS/Data Leak) และเตรียมทีมประสานงาน',
    low: 'ต้องเร่งจัดทำแผนเผชิญเหตุฉุกเฉิน (Incident Response Plan) และกำหนดช่องทางการรายงานเหตุไปยัง สกมช./CERT',
  },
  p11: {
    high: 'แผนสำรองและกู้คืนระบบมีประสิทธิภาพสูง ควรทดสอบกู้คืนข้อมูล (Restore Test) เป็นประจำ',
    medium: 'ควรจัดทำแผนสำรองข้อมูล (Backup Plan) ทั้งในและนอกสถานที่ (Off-site Backup) พร้อมทดสอบการกู้คืน',
    low: 'ต้องเร่งจัดทำสำรองข้อมูลระบบเว็บไซต์ (Full & Incremental Backup) และจัดทำแผนความต่อเนื่องในการดำเนินงาน (BCP)',
  },
};

export default function ResultCard({
  totalScore,
  band,
  parts,
  answers = {},
  calcScore,
  breakdown,
  onAgain,
  orgInfo,
}) {
  const [expandedPartId, setExpandedPartId] = useState(null);

  const togglePart = (partId) => {
    setExpandedPartId((prev) => (prev === partId ? null : partId));
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <section className={`${s.card} ${s.reportCard}`}>
      {/* Print-Only Official Report Header */}
      <div className={s.printReportHeader}>
        <div className={s.printLogoRow}>
          <img src="/ncsa_logo.png" alt="NCSA Logo" className={s.printLogo} />
          <div>
            <h1 className={s.printReportTitle}>รายงานผลการประเมินตนเองตามเกณฑ์มาตรฐาน WSS</h1>
            <p className={s.printReportSub}>สำนักงานคณะกรรมการการรักษาความมั่นคงปลอดภัยไซเบอร์แห่งชาติ (สกมช.)</p>
          </div>
        </div>
        <div className={s.printReportMeta}>
          <span>วันที่ประเมิน: {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Header */}
      <div className={s.resultHeader}>
        <div className={s.resultLabel}>ผลการประเมิน WSS Self-Assessment</div>
        <div className={s.scoreRing}>
          <div className={s.scoreNum}>{totalScore.pct}%</div>
          <div className={s.scoreSub}>คะแนนรวม</div>
        </div>
        <div
          className={`${s.levelBadge} ${
            band.badgeClass === 'ok'
              ? s.levelOk
              : band.badgeClass === 'warn'
              ? s.levelWarn
              : band.badgeClass === 'bad'
              ? s.levelBad
              : ''
          }`}
        >
          ระดับ: {band.label}
        </div>
      </div>

      {/* Website Info */}
      {orgInfo && (
        <div className={s.resultSection} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
          <div className={s.resultLabel} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>ข้อมูลหน่วยงานและเว็บไซต์ (ค1 ส่วนที่ 1)</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem', fontSize: '0.88rem' }}>
            <div>
              <div className={s.infoLabel}>ชื่อหน่วยงาน:</div>
              <div className={s.infoVal}>{orgInfo.orgName || '-'}</div>
            </div>
            <div>
              <div className={s.infoLabel}>หน่วยงานควบคุมหรือกำกับดูแล:</div>
              <div className={s.infoVal}>{orgInfo.regulatorName || '-'}</div>
            </div>
            <div>
              <div className={s.infoLabel}>ประเภทหน่วยงาน:</div>
              <div className={s.infoVal}>
                {orgInfo.orgTypes.map(t => {
                  if (t === 'gov') return 'หน่วยงานของรัฐ';
                  if (t === 'regulator') return 'หน่วยงานควบคุมหรือกำกับดูแล (Regulator)';
                  if (t === 'cii') return 'หน่วยงานโครงสร้างพื้นฐานสำคัญทางสารสนเทศ (CII)';
                  if (t === 'private') return 'หน่วยงานเอกชน';
                  return '';
                }).filter(Boolean).join(', ') || '-'}
              </div>
            </div>
            <div>
              <div className={s.infoLabel}>URL เว็บไซต์:</div>
              <div className={s.infoValHighlight}>{orgInfo.webUrl || '-'}</div>
            </div>
            <div>
              <div className={s.infoLabel}>ประเภทของเว็บไซต์:</div>
              <div className={s.infoVal}>
                {orgInfo.webType === 'main' ? 'เว็บไซต์หลักของหน่วยงาน' : orgInfo.webType === 'intranet' ? 'เว็บไซต์ภายในหน่วยงาน (Intranet)' : `อื่นๆ: ${orgInfo.webTypeOther || '-'}`}
              </div>
            </div>
            <div>
              <div className={s.infoLabel}>วัตถุประสงค์ในการบริการเว็บไซต์:</div>
              <div className={s.infoVal}>
                {orgInfo.webPurposes.map(p => {
                  if (p === 'citizens') return 'เว็บไซต์ที่ให้บริการข้อมูลของประชาชน';
                  if (p === 'cni') return 'เว็บไซต์ที่ให้บริการเกี่ยวกับโครงสร้างพื้นฐานสำคัญ';
                  if (p === 'transaction') return 'เว็บไซต์ของหน่วยงานที่มีการดำเนินการธุรกรรมทางอิเล็กทรอนิกส์';
                  if (p === 'other') return `อื่นๆ: ${orgInfo.webPurposeOther || '-'}`;
                  return '';
                }).filter(Boolean).join(', ') || '-'}
              </div>
            </div>
            <div>
              <div className={s.infoLabel}>รูปแบบการจัดทำเว็บไซต์:</div>
              <div className={s.infoVal}>
                {orgInfo.webDeploy === 'onprem' ? 'เว็บไซต์บนระบบขององค์กร (On-Premises)' : orgInfo.webDeploy === 'cloud' ? 'เว็บไซต์บนระบบคลาวด์ (Cloud Service)' : orgInfo.webDeploy === 'hosting' ? 'เว็บไซต์ที่ใช้บริการเว็บโฮสติ้ง (Web Hosting)' : `อื่นๆ: ${orgInfo.webDeployOther || '-'}`}
              </div>
            </div>
            <div>
              <div className={s.infoLabel}>หน่วยงานภายในที่รับผิดชอบ:</div>
              <div className={s.infoVal}>{orgInfo.responsibleDept || '-'}</div>
            </div>
            <div>
              <div className={s.infoLabel}>เว็บไซต์ให้บริการด้าน:</div>
              <div className={s.infoVal}>{orgInfo.webServices || '-'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className={s.resultSection}>
        <div className={s.resultLabel}>ข้อเสนอแนะภาพรวม</div>
        <ul className={s.recList}>
          {(band.items || []).map((item, i) => (
            <li key={i} className={s.recItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Part breakdown */}
      <div className={s.resultSection}>
        <div className={s.partBreakdownHeader}>
          <div className={s.resultLabel}>คะแนนแต่ละ Part</div>
          <div className={s.partClickHint}>💡 คลิกที่แถว Part ใดๆ เพื่อดูข้อเสนอแนะและผลประเมินย่อยประจำหมวด</div>
        </div>

        <table className={s.table}>
          <thead>
            <tr>
              <th style={{ width: '42%' }}>Part</th>
              <th style={{ width: '22%' }}>คะแนน</th>
              <th>หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part, i) => {
              const score = calcScore(part.questions);
              const isWaived = score.maxPoints === 0;
              const isExpanded = expandedPartId === part.id;
              const recObj = PART_RECOMMENDATIONS[part.id] || {};
              const recText =
                score.pct >= 75
                  ? recObj.high
                  : score.pct >= 50
                  ? recObj.medium
                  : recObj.low;

              return (
                <React.Fragment key={part.id}>
                  <tr
                    className={`${s.partRowClickable} ${isExpanded ? s.partRowExpanded : ''}`}
                    onClick={() => togglePart(part.id)}
                    title="คลิกเพื่อเปิด/ปิด รายละเอียดและคำแนะนำสำหรับ Part นี้"
                  >
                    <td>
                      <div className={s.partTitleFlex}>
                        <span className={`${s.partExpandBadge} ${isExpanded ? s.partExpandBadgeActive : ''}`}>
                          {isExpanded ? '▲ ซ่อน' : '▼ ดูคำแนะนำ'}
                        </span>
                        <span className={s.partTitleText}>Part {i + 1}: {part.title}</span>
                      </div>
                    </td>
                    {isWaived ? (
                      <>
                        <td className={s.noteOk} style={{ fontStyle: 'italic', fontWeight: 500 }}>
                          ได้รับการยกเว้น
                        </td>
                        <td className={s.noteOk}>
                          ✓ ไม่รวมในเกณฑ์ขั้นต่ำ
                        </td>
                      </>
                    ) : (
                      <>
                        <td
                          className={`${s.scoreCell} ${
                            score.pct >= 75
                              ? s.scoreCellHi
                              : score.pct >= 50
                              ? s.scoreCellMid
                              : s.scoreCellLo
                          }`}
                        >
                          {score.pct}% ({score.earned}/{score.maxPoints})
                        </td>
                        <td
                          className={
                            score.pct >= 75
                              ? s.noteOk
                              : score.pct >= 50
                              ? s.noteMid
                              : s.noteBad
                          }
                        >
                          {score.pct >= 75
                            ? '✓ อยู่ในเกณฑ์ดี'
                            : score.pct >= 50
                            ? '⚠ ควรปรับปรุงต่อเนื่อง'
                            : '✗ ต้องเร่งปรับปรุง'}
                        </td>
                      </>
                    )}
                  </tr>

                  {/* Expanded Part Detail Drawer */}
                  {isExpanded && (
                    <tr className={s.expandedDrawerRow}>
                      <td colSpan={3}>
                        <div className={s.partDetailDrawer}>
                          <div className={s.partDetailHeader}>
                            <h4 className={s.partDetailTitle}>
                              รายละเอียดและข้อเสนอแนะสำหรับ Part {i + 1}: {part.title}
                            </h4>
                            {part.description && <p className={s.partDetailDesc}>{part.description}</p>}
                          </div>

                          {/* Specific Recommendation Box */}
                          {!isWaived && recText && (
                            <div className={`${s.partRecBox} ${score.pct >= 75 ? s.partRecBoxHi : score.pct >= 50 ? s.partRecBoxMid : s.partRecBoxLo}`}>
                              <div className={s.partRecBoxTitle}>
                                💡 คำแนะนำการปรับปรุงสำหรับ Part {i + 1}
                              </div>
                              <div className={s.partRecBoxText}>{recText}</div>
                            </div>
                          )}

                          {/* Criteria Question Breakdown */}
                          <div className={s.partQListHeader}>
                            รายการข้อกำหนดและคำตอบที่ประเมิน ({part.questions.length} ข้อกำหนด):
                          </div>
                          <div className={s.partQList}>
                            {part.questions.map((q) => {
                              const selectedChoiceIdx = answers ? answers[q.id] : undefined;
                              const selectedChoice = Number.isInteger(selectedChoiceIdx) && q.choices ? q.choices[selectedChoiceIdx] : null;
                              const maxPossible = q.choices ? Math.max(...q.choices.map((c) => c.points ?? 0)) : 0;
                              const isPass = selectedChoice && selectedChoice.points === maxPossible;
                              const isPartial = selectedChoice && selectedChoice.points > 0 && selectedChoice.points < maxPossible;

                              return (
                                <div key={q.id} className={s.partQItem}>
                                  <div className={s.partQTopRow}>
                                    <span className={s.partQText}>{q.text}</span>
                                    <span className={`${s.partQBadge} ${isPass ? s.qBadgePass : isPartial ? s.qBadgePartial : s.qBadgeFail}`}>
                                      {isPass ? '✓ ผ่านเกณฑ์' : isPartial ? '⚠ ปรับปรุงบางส่วน' : '✗ ยังไม่ผ่านเกณฑ์'}
                                    </span>
                                  </div>
                                  {selectedChoice ? (
                                    <div className={s.partQChoiceVal}>
                                      การดำเนินการ: <strong>{selectedChoice.label}</strong> ({selectedChoice.points}/{maxPossible} คะแนน)
                                    </div>
                                  ) : (
                                    <div className={s.partQChoiceVal} style={{ fontStyle: 'italic', opacity: 0.8 }}>
                                      ยังไม่ได้ระบุคำตอบ
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* External Link Footer */}
                          <div className={s.partDetailFooter}>
                            <Link
                              href={`/criteria?level=${orgInfo?.impactLevel || 'low'}`}
                              className={s.btnPartCriteriaLink}
                              target="_blank"
                            >
                              ดูรายละเอียดเกณฑ์ข้อกำหนดมาตรฐานฉบับเต็มของ Part นี้ →
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className={s.resultFooter}>{breakdown}</div>

      {/* Print-Only Signature Block */}
      <div className={s.printSignatureBlock}>
        <div className={s.printSigCol}>
          <div className={s.printSigLine}>ลงชื่อ .................................................................</div>
          <div className={s.printSigName}>(.................................................................)</div>
          <div className={s.printSigTitle}>ผู้รับผิดชอบการประเมิน / เจ้าหน้าที่ผู้ตรวจสอบ</div>
        </div>
        <div className={s.printSigCol}>
          <div className={s.printSigLine}>ลงชื่อ .................................................................</div>
          <div className={s.printSigName}>(.................................................................)</div>
          <div className={s.printSigTitle}>ผู้บริหาร / หัวหน้าหน่วยงาน</div>
        </div>
      </div>

      {/* Actions */}
      <div className={s.resultActions}>
        <button
          type="button"
          className={`${s.btn} ${s.btnPrimary} ${s.btnPrintReport}`}
          onClick={handlePrint}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1 2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          <span>พิมพ์ / ดาวน์โหลดรายงาน (PDF)</span>
        </button>

        <Link href="/" className={`${s.btnBack} ${s.resultBtnBack}`}>
          ← กลับหน้าหลัก
        </Link>
        <button
          className={`${s.btn} ${s.btnSecondary} ${s.resultBtnAgain}`}
          onClick={onAgain}
        >
          ทำแบบประเมินใหม่
        </button>
      </div>
    </section>
  );
}
