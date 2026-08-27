'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ASSESSMENT from '@/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import s from '@/styles/criteria.module.css';

const LEVEL_INFO = {
  low: {
    code: 'LOW',
    title: 'ผลกระทบระดับต่ำ (Low Impact)',
    desc: 'เหตุการณ์ส่งผลกระทบอย่างจำกัดหรือเล็กน้อยต่อชื่อเสียง การเงิน หรือการปฏิบัติงานหลักของหน่วยงาน',
    reqText: 'ปฏิบัติตามข้อกำหนดทั่วไปในหัวข้อที่ 5 (5.1 – 5.6) และหัวข้อที่ 6 เฉพาะเกณฑ์พื้นฐานที่จำเป็น',
    badgeClass: s.badgeLow,
    summaryClass: s.summaryLow,
    activeTabClass: s.activeTabLow,
    textColor: 'var(--green)',
  },
  medium: {
    code: 'MEDIUM',
    title: 'ผลกระทบระดับกลาง (Medium Impact)',
    desc: 'เหตุการณ์ส่งผลกระทบอย่างร้ายแรงต่อการดำเนินงานของหน่วยงาน หรือสิทธิประโยชน์และทรัพย์สินของประชาชน',
    reqText: 'ปฏิบัติตามข้อกำหนดระดับ LOW ทั้งหมด ร่วมกับข้อกำหนดด้านการเฝ้าระวัง การรับมือเหตุการณ์ และ BCP (หมวด 6.3 - 6.5)',
    badgeClass: s.badgeMid,
    summaryClass: s.summaryMid,
    activeTabClass: s.activeTabMid,
    textColor: 'var(--gold)',
  },
  high: {
    code: 'HIGH',
    title: 'ผลกระทบระดับสูง (High Impact)',
    desc: 'เหตุการณ์ส่งผลกระทบอย่างร้ายแรงยิ่งยวดต่อความมั่นคงของประเทศ ความสงบเรียบร้อย หรือโครงสร้างพื้นฐาน CII',
    reqText: 'ปฏิบัติตามมาตรฐานการรักษาความปลอดภัยสำหรับเว็บไซต์ ทุกข้อกำหนดโดยไม่มีข้อยกเว้น (รวมถึง Asset Management และ DevSecOps)',
    badgeClass: s.badgeHigh,
    summaryClass: s.summaryHigh,
    activeTabClass: s.activeTabHigh,
    textColor: '#ff6060',
  },
};

function CriteriaContent() {
  const searchParams = useSearchParams();
  const initialLevelParam = searchParams.get('level');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);
  
  const [activeLevel, setActiveLevel] = useState(() => {
    if (['low', 'medium', 'high'].includes(initialLevelParam)) {
      return initialLevelParam;
    }
    return 'low';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPartId, setSelectedPartId] = useState('all');

  const { parts } = ASSESSMENT;

  // Calculate questions total by level
  const levelCounts = useMemo(() => {
    let lowCount = 0;
    let mediumCount = 0;
    let highCount = 0;

    parts.forEach((part) => {
      part.questions.forEach((q) => {
        if (q.minImpact === 'low') lowCount++;
        if (q.minImpact === 'low' || q.minImpact === 'medium') mediumCount++;
        highCount++;
      });
    });

    return {
      low: lowCount,
      medium: mediumCount,
      high: highCount,
    };
  }, [parts]);

  // Filter parts & questions based on activeLevel, searchQuery, and selectedPartId
  const filteredParts = useMemo(() => {
    return parts
      .filter((part) => (selectedPartId === 'all' ? true : part.id === selectedPartId))
      .map((part) => {
        const questions = part.questions.filter((q) => {
          // 1. Filter by Level
          if (activeLevel === 'low' && q.minImpact !== 'low') return false;
          if (activeLevel === 'medium' && q.minImpact === 'high') return false;

          // 2. Filter by Search Query
          if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            const textMatch = q.text.toLowerCase().includes(query);
            const subMatch = q.subQuestions?.some((sq) => sq.text.toLowerCase().includes(query));
            const idMatch = q.id.toLowerCase().includes(query);
            const partTitleMatch = part.title.toLowerCase().includes(query);
            return textMatch || subMatch || idMatch || partTitleMatch;
          }

          return true;
        });

        return { ...part, questions };
      })
      .filter((part) => part.questions.length > 0);
  }, [parts, activeLevel, searchQuery, selectedPartId]);

  const totalFilteredQuestions = useMemo(() => {
    return filteredParts.reduce((acc, p) => acc + p.questions.length, 0);
  }, [filteredParts]);

  const currentLevelInfo = LEVEL_INFO[activeLevel] || LEVEL_INFO.low;

  return (
    <div className={s.pageWrapper}>
      <div className={s.bgGlow} />
      <Navbar isHome={false} />

      <main className={s.container}>
        {/* Header */}
        <header className={s.header}>
          <h1 className={s.title}>เกณฑ์ข้อกำหนดตามระดับผลกระทบ</h1>
          <p className={s.subtitle}>
            รายการข้อกำหนดและเกณฑ์ขั้นต่ำตามมาตรฐานความมั่นคงปลอดภัยสำหรับเว็บไซต์ (Website Security Standard)
            เลือกดูตามระดับผลกระทบเพื่อเตรียมความพร้อมในการประเมินตนเอง
          </p>
        </header>

        {/* Level Tabs Selector */}
        <div className={s.levelTabs}>
          {(['low', 'medium', 'high']).map((levelKey) => {
            const info = LEVEL_INFO[levelKey];
            const isActive = activeLevel === levelKey;

            return (
              <button
                key={levelKey}
                className={`${s.levelTab} ${isActive ? info.activeTabClass : ''}`}
                onClick={() => setActiveLevel(levelKey)}
              >
                <div className={s.tabCode} style={{ color: info.textColor }}>
                  {info.code}
                </div>
                <div className={s.tabLabel}>
                  {levelKey === 'low' && 'ระดับต่ำ'}
                  {levelKey === 'medium' && 'ระดับกลาง'}
                  {levelKey === 'high' && 'ระดับสูง'}
                </div>
                <div className={s.tabCount}>{levelCounts[levelKey]} ข้อกำหนด</div>
              </button>
            );
          })}
        </div>

        {/* Active Level Summary Card */}
        <div className={`${s.summaryBanner} ${currentLevelInfo.summaryClass}`}>
          <div className={s.summaryContent}>
            <div className={s.summaryHeader}>
              <h2 className={s.summaryTitle}>{currentLevelInfo.title}</h2>
              <span className={`${s.summaryBadge} ${currentLevelInfo.badgeClass}`}>
                {currentLevelInfo.code}
              </span>
            </div>
            <p className={s.summaryDesc}>{currentLevelInfo.desc}</p>
            <p className={s.summaryDesc} style={{ marginTop: '0.4rem', color: 'var(--white)', fontWeight: 500 }}>
              💡 {currentLevelInfo.reqText}
            </p>
          </div>
          <Link
            href={`/assessment?level=${activeLevel}`}
            className={s.summaryCtaBtn}
          >
            <span>เริ่มประเมินระดับนี้</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className={s.controlsRow}>
          <div className={s.searchBox}>
            <svg
              className={s.searchIcon}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className={s.searchInput}
              placeholder="ค้นหาข้อกำหนด, หัวข้อ, หรือคำสำคัญ (เช่น Backup, Firewall, WAF)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className={s.partSelect}
            value={selectedPartId}
            onChange={(e) => setSelectedPartId(e.target.value)}
          >
            <option value="all">ทุกหมวดหมู่ ({parts.length} หมวด)</option>
            {parts.map((p, idx) => (
              <option key={p.id} value={p.id}>
                หมวดที่ {idx + 1}: {p.title}
              </option>
            ))}
          </select>
        </div>

        {/* Results Info */}
        <div style={{ marginBottom: '1.2rem', color: 'var(--muted)', fontSize: '0.88rem' }}>
          พบทั้งหมด <strong style={{ color: 'var(--cyan)' }}>{totalFilteredQuestions}</strong> ข้อกำหนด ({filteredParts.length} หมวดหมู่)
        </div>

        {/* Criteria Parts List */}
        {filteredParts.length > 0 ? (
          <div className={s.partsList}>
            {filteredParts.map((part) => (
              <div key={part.id} className={s.partCard}>
                <div className={s.partHeader}>
                  <div className={s.partHeaderTitleGroup}>
                    <span className={s.partBadge}>{part.id.toUpperCase()}</span>
                    <div>
                      <h3 className={s.partTitle}>{part.title}</h3>
                      <div className={s.partDesc}>{part.description}</div>
                    </div>
                  </div>
                  <span className={s.tagReq}>
                    {part.questions.length} ข้อกำหนด
                  </span>
                </div>

                <div className={s.questionsList}>
                  {part.questions.map((q) => {
                    const minLevelInfo = LEVEL_INFO[q.minImpact] || LEVEL_INFO.low;

                    return (
                      <div key={q.id} className={s.questionItem}>
                        <div className={s.questionTop}>
                          <div className={s.questionText}>{q.text}</div>
                          <div className={s.tagGroup}>
                            <span className={`${s.summaryBadge} ${minLevelInfo.badgeClass}`}>
                              {q.minImpact.toUpperCase()}
                            </span>
                            {q.requiredTransaction && (
                              <span className={s.tagReq} style={{ borderColor: 'rgba(0, 207, 255, 0.3)', color: 'var(--cyan)' }}>
                                e-Transaction
                              </span>
                            )}
                            {q.requiredOrgType?.includes('cii') && (
                              <span className={s.tagReq} style={{ borderColor: 'rgba(255, 96, 96, 0.3)', color: '#ff6060' }}>
                                CII Required
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Sub Questions */}
                        {q.subQuestions && q.subQuestions.length > 0 && (
                          <div className={s.subQuestions}>
                            {q.subQuestions.map((sq) => (
                              <div key={sq.id} className={s.subQuestionText}>
                                {sq.text}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={s.emptyState}>
            <div className={s.emptyTitle}>ไม่พบข้อกำหนดที่ตรงกับการค้นหา</div>
            <div className={s.emptyDesc}>
              ลองเปลี่ยนคำค้นหา หรือเลือกสลับไปดูระดับผลกระทบอื่น
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function CriteriaSkeleton() {
  return (
    <div className={s.pageWrapper}>
      <div className={s.bgGlow} />
      <Navbar isHome={false} />
      <main className={s.container}>
        <header className={s.header}>
          <h1 className={s.title}>เกณฑ์ข้อกำหนดตามระดับผลกระทบ</h1>
          <p className={s.subtitle}>กำลังโหลดข้อมูลข้อกำหนด...</p>
        </header>
        <div className={s.levelTabs}>
          <div className={s.skeletonBlock} style={{ height: '90px' }} />
          <div className={s.skeletonBlock} style={{ height: '90px' }} />
          <div className={s.skeletonBlock} style={{ height: '90px' }} />
        </div>
        <div className={s.skeletonBlock} style={{ height: '140px', marginBottom: '2rem' }} />
        <div className={s.skeletonBlock} style={{ height: '220px' }} />
      </main>
      <Footer />
    </div>
  );
}

export default function CriteriaPage() {
  return (
    <Suspense fallback={<CriteriaSkeleton />}>
      <CriteriaContent />
    </Suspense>
  );
}
