import Link from 'next/link';
import s from '@/styles/assessment.module.css';

export default function ResultCard({
  totalScore,
  band,
  parts,
  calcScore,
  breakdown,
  onAgain,
  orgInfo,
}) {
  return (
    <section className={s.card}>
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
              <div style={{ color: 'var(--muted)', marginBottom: '0.2rem' }}>ชื่อหน่วยงาน:</div>
              <div style={{ fontWeight: 500, color: 'var(--white)' }}>{orgInfo.orgName || '-'}</div>
            </div>
            <div>
              <div style={{ color: 'var(--muted)', marginBottom: '0.2rem' }}>หน่วยงานควบคุมหรือกำกับดูแล:</div>
              <div style={{ fontWeight: 500, color: 'var(--white)' }}>{orgInfo.regulatorName || '-'}</div>
            </div>
            <div>
              <div style={{ color: 'var(--muted)', marginBottom: '0.2rem' }}>ประเภทหน่วยงาน:</div>
              <div style={{ fontWeight: 500, color: 'var(--white)' }}>
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
              <div style={{ color: 'var(--muted)', marginBottom: '0.2rem' }}>URL เว็บไซต์:</div>
              <div style={{ fontWeight: 500, color: 'var(--cyan)' }}>{orgInfo.webUrl || '-'}</div>
            </div>
            <div>
              <div style={{ color: 'var(--muted)', marginBottom: '0.2rem' }}>ประเภทของเว็บไซต์:</div>
              <div style={{ fontWeight: 500, color: 'var(--white)' }}>
                {orgInfo.webType === 'main' ? 'เว็บไซต์หลักของหน่วยงาน' : orgInfo.webType === 'intranet' ? 'เว็บไซต์ภายในหน่วยงาน (Intranet)' : `อื่นๆ: ${orgInfo.webTypeOther || '-'}`}
              </div>
            </div>
            <div>
              <div style={{ color: 'var(--muted)', marginBottom: '0.2rem' }}>วัตถุประสงค์ในการบริการเว็บไซต์:</div>
              <div style={{ fontWeight: 500, color: 'var(--white)' }}>
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
              <div style={{ color: 'var(--muted)', marginBottom: '0.2rem' }}>รูปแบบการจัดทำเว็บไซต์:</div>
              <div style={{ fontWeight: 500, color: 'var(--white)' }}>
                {orgInfo.webDeploy === 'onprem' ? 'เว็บไซต์บนระบบขององค์กร (On-Premises)' : orgInfo.webDeploy === 'cloud' ? 'เว็บไซต์บนระบบคลาวด์ (Cloud Service)' : orgInfo.webDeploy === 'hosting' ? 'เว็บไซต์ที่ใช้บริการเว็บโฮสติ้ง (Web Hosting)' : `อื่นๆ: ${orgInfo.webDeployOther || '-'}`}
              </div>
            </div>
            <div>
              <div style={{ color: 'var(--muted)', marginBottom: '0.2rem' }}>หน่วยงานภายในที่รับผิดชอบ:</div>
              <div style={{ fontWeight: 500, color: 'var(--white)' }}>{orgInfo.responsibleDept || '-'}</div>
            </div>
            <div>
              <div style={{ color: 'var(--muted)', marginBottom: '0.2rem' }}>เว็บไซต์ให้บริการด้าน:</div>
              <div style={{ fontWeight: 500, color: 'var(--white)' }}>{orgInfo.webServices || '-'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className={s.resultSection}>
        <div className={s.resultLabel}>ข้อเสนอแนะ</div>
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
        <div className={s.resultLabel}>คะแนนแต่ละ Part</div>
        <table className={s.table}>
          <thead>
            <tr>
              <th style={{ width: '38%' }}>Part</th>
              <th style={{ width: '18%' }}>คะแนน</th>
              <th>หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part, i) => {
              const score = calcScore(part.questions);
              const isWaived = score.maxPoints === 0;
              return (
                <tr key={part.id}>
                  <td>Part {i + 1}: {part.title}</td>
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
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className={s.resultFooter}>{breakdown}</div>

      {/* Actions */}
      <div className={s.resultActions}>
        <Link href="/" className={`${s.btnBack} ${s.resultBtnBack}`}>
          ← กลับหน้าหลัก
        </Link>
        <button
          className={`${s.btn} ${s.btnPrimary} ${s.resultBtnAgain}`}
          onClick={onAgain}
        >
          ทำแบบประเมินใหม่
        </button>
      </div>
    </section>
  );
}
