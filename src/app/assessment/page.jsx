'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import ASSESSMENT from '@/data';
import QuizCard from '@/components/assessment/QuizCard';
import ResultCard from '@/components/assessment/ResultCard';
import Navbar from '@/components/Navbar';
import s from '@/styles/assessment.module.css';

const STORAGE_KEY = 'wss_assessment_v4';
const SETUP_STORAGE_KEY = 'wss_assessment_setup_v4';

function loadAnswers() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAnswers(answers) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch {
    /* noop */
  }
}

function loadSetupState() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SETUP_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSetupState(state) {
  try {
    localStorage.setItem(SETUP_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* noop */
  }
}

const ciaAreas = [
  { id: 'a1', title: 'ด้านที่ 1: ผลกระทบด้านการเงินหรือต่อชื่อเสียงของหน่วยงาน', desc: 'Financial, Asset, or Reputation Value Impact' },
  { id: 'a2', title: 'ด้านที่ 2: ผลกระทบต่อประชาชน บุคลากร หรืออันตรายต่อชีวิต/สาธารณสุข', desc: 'Life, Health, or Assets of Citizens/Staff Impact' },
  { id: 'a3', title: 'ด้านที่ 3: ผลกระทบต่อความสามารถในการดำเนินงานตามหน้าที่ของหน่วยงาน', desc: 'Agency Functionality and Operational Impact' },
  { id: 'a4', title: 'ด้านที่ 4: ผลกระทบต่อความมั่นคงของรัฐและความสงบเรียบร้อยภายในประเทศ', desc: 'National Security and Domestic Order Impact' },
];

export default function AssessmentPage() {
  const { parts, recommendations, requireAllAnswers } = ASSESSMENT;

  // Restore state from LocalStorage if it exists
  const [step, setStep] = useState('info'); // info | setup | quiz
  
  // Form ค1 ส่วนที่ 1 States
  const [orgName, setOrgName] = useState('');
  const [regulatorName, setRegulatorName] = useState('');
  const [orgTypes, setOrgTypes] = useState([]); // gov, regulator, cii, private
  const [webServices, setWebServices] = useState('');
  const [responsibleDept, setResponsibleDept] = useState('');
  const [webUrl, setWebUrl] = useState('');
  const [webType, setWebType] = useState('main'); // main, intranet, other
  const [webTypeOther, setWebTypeOther] = useState('');
  const [webPurposes, setWebPurposes] = useState([]); // citizens, cni, transaction, other
  const [webPurposeOther, setWebPurposeOther] = useState('');
  const [webDeploy, setWebDeploy] = useState('onprem'); // onprem, cloud, hosting, other
  const [webDeployOther, setWebDeployOther] = useState('');

  const [impactLevel, setImpactLevel] = useState('low'); // low | medium | high
  const [setupTab, setSetupTab] = useState('cia'); // cia | direct
  const [directLevel, setDirectLevel] = useState('low');

  const [ciaAnswers, setCiaAnswers] = useState({
    a1_c: 'low', a1_i: 'low', a1_a: 'low',
    a2_c: 'low', a2_i: 'low', a2_a: 'low',
    a3_c: 'low', a3_i: 'low', a3_a: 'low',
    a4_c: 'low', a4_i: 'low', a4_a: 'low',
  });

  const [partIdx, setPartIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [helperIsError, setHelperIsError] = useState(false);

  // Load state on mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const levelParam = urlParams.get('level');
      if (levelParam && ['low', 'medium', 'high'].includes(levelParam)) {
        setImpactLevel(levelParam);
        setDirectLevel(levelParam);
        setSetupTab('direct');
        setStep('quiz');
      }

      const restoredSetup = loadSetupState();
      if (restoredSetup) {
        setStep('quiz');
        setOrgName(restoredSetup.orgName || '');
        setRegulatorName(restoredSetup.regulatorName || '');
        setOrgTypes(restoredSetup.orgTypes || []);
        setWebServices(restoredSetup.webServices || '');
        setResponsibleDept(restoredSetup.responsibleDept || '');
        setWebUrl(restoredSetup.webUrl || '');
        setWebType(restoredSetup.webType || 'main');
        setWebTypeOther(restoredSetup.webTypeOther || '');
        setWebPurposes(restoredSetup.webPurposes || []);
        setWebPurposeOther(restoredSetup.webPurposeOther || '');
        setWebDeploy(restoredSetup.webDeploy || 'onprem');
        setWebDeployOther(restoredSetup.webDeployOther || '');
        if (!levelParam) {
          setImpactLevel(restoredSetup.impactLevel || 'low');
        }
        setCiaAnswers(restoredSetup.ciaAnswers || {});
      }
      setAnswers(loadAnswers());
    }
  }, []);

  // CII status calculation based on Form ค1 inputs
  const isCii = useMemo(() => {
    return orgTypes.includes('cii') || webPurposes.includes('cni');
  }, [orgTypes, webPurposes]);

  // Transaction status calculation
  const isTransaction = useMemo(() => {
    return webPurposes.includes('transaction');
  }, [webPurposes]);

  // Dynamic calculation of impact level based on CIA inputs using mode-based rollup
  const calculatedCiaLevel = useMemo(() => {
    const getMode = (arr) => {
      const counts = { low: 0, medium: 0, high: 0 };
      arr.forEach((val) => {
        if (counts[val] !== undefined) counts[val]++;
      });
      const maxCount = Math.max(counts.low, counts.medium, counts.high);
      const candidates = [];
      if (counts.high === maxCount) candidates.push('high');
      if (counts.medium === maxCount) candidates.push('medium');
      if (counts.low === maxCount) candidates.push('low');
      return candidates[0];
    };

    const a1 = getMode([ciaAnswers.a1_c, ciaAnswers.a1_i, ciaAnswers.a1_a]);
    const a2 = getMode([ciaAnswers.a2_c, ciaAnswers.a2_i, ciaAnswers.a2_a]);
    const a3 = getMode([ciaAnswers.a3_c, ciaAnswers.a3_i, ciaAnswers.a3_a]);
    const a4 = getMode([ciaAnswers.a4_c, ciaAnswers.a4_i, ciaAnswers.a4_a]);

    return getMode([a1, a2, a3, a4]);
  }, [ciaAnswers]);

  // Dynamically filter active parts and questions based on impactLevel AND organization info
  const activeParts = useMemo(() => {
    return parts.map((part) => {
      const activeQuestions = part.questions.filter((q) => {
        // 1. Filter by CIA impact level
        if (impactLevel === 'low' && q.minImpact !== 'low') return false;
        if (impactLevel === 'medium' && q.minImpact === 'high') return false;

        // 2. Filter by CII requirement
        if (q.requiredOrgType && q.requiredOrgType.includes('cii') && !isCii) return false;

        // 3. Filter by Electronic Transactions
        if (q.requiredTransaction && !isTransaction) return false;

        return true;
      });
      return { ...part, questions: activeQuestions };
    }).filter((part) => part.questions.length > 0);
  }, [parts, impactLevel, isCii, isTransaction]);

  // Flatten active questions for counting
  const flatQuestions = useMemo(
    () => activeParts.flatMap((p) => p.questions.map((q) => ({ ...q, _partId: p.id }))),
    [activeParts]
  );

  const answeredCount = useMemo(
    () => flatQuestions.filter((q) => Number.isInteger(answers[q.id])).length,
    [flatQuestions, answers]
  );

  // Score calculation
  const calcScore = useCallback(
    (questions) => {
      const maxPoints = questions.reduce((acc, q) => {
        const max = Math.max(...(q.choices || []).map((c) => c.points ?? 0));
        return acc + (Number.isFinite(max) ? max : 0);
      }, 0);
      const earned = questions.reduce((acc, q) => {
        const idx = answers[q.id];
        if (!Number.isInteger(idx)) return acc;
        return acc + (q.choices[idx]?.points ?? 0);
      }, 0);
      const pct = maxPoints === 0 ? 0 : Math.round((earned / maxPoints) * 100);
      return { earned, maxPoints, pct };
    },
    [answers]
  );

  const bandFor = useCallback(
    (pct) =>
      (recommendations || []).find((b) => pct >= b.min && pct <= b.max) || {
        label: 'ไม่ระบุ',
        badgeClass: '',
        items: [],
      },
    [recommendations]
  );

  // Setup Handlers
  const handleCiaChange = useCallback((fieldName, level) => {
    setCiaAnswers((prev) => ({ ...prev, [fieldName]: level }));
  }, []);

  const handleStartAssessment = useCallback(() => {
    const finalLevel = setupTab === 'cia' ? calculatedCiaLevel : directLevel;
    setImpactLevel(finalLevel);
    saveSetupState({
      orgName,
      regulatorName,
      orgTypes,
      webServices,
      responsibleDept,
      webUrl,
      webType,
      webTypeOther,
      webPurposes,
      webPurposeOther,
      webDeploy,
      webDeployOther,
      impactLevel: finalLevel,
      ciaAnswers,
    });
    setStep('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [
    setupTab,
    calculatedCiaLevel,
    directLevel,
    ciaAnswers,
    orgName,
    regulatorName,
    orgTypes,
    webServices,
    responsibleDept,
    webUrl,
    webType,
    webTypeOther,
    webPurposes,
    webPurposeOther,
    webDeploy,
    webDeployOther,
  ]);

  // Quiz Handlers
  const handleAnswer = useCallback(
    (qId, choiceIdx, parentQId) => {
      setAnswers((prev) => {
        const next = { ...prev, [qId]: choiceIdx };
        if (parentQId) {
          const parentQ = parts.flatMap((p) => p.questions).find((q) => q.id === parentQId);
          if (parentQ && parentQ.subQuestions) {
            const subVals = parentQ.subQuestions.map((sq) => next[sq.id]);
            const allAnswered = subVals.every((val) => Number.isInteger(val));
            if (allAnswered) {
              next[parentQId] = Math.max(...subVals);
            } else {
              delete next[parentQId];
            }
          }
        }
        saveAnswers(next);
        return next;
      });
      setHelperText('');
      setHelperIsError(false);
    },
    [parts]
  );

  const handlePrev = useCallback(() => {
    if (qIdx > 0) {
      setQIdx(qIdx - 1);
    } else if (partIdx > 0) {
      setPartIdx(partIdx - 1);
      setQIdx(activeParts[partIdx - 1].questions.length - 1);
    }
    setHelperText('');
    setHelperIsError(false);
  }, [partIdx, qIdx, activeParts]);

  const handleNext = useCallback(() => {
    const question = activeParts[partIdx].questions[qIdx];
    const hasAnswer = Number.isInteger(answers[question.id]);

    if (requireAllAnswers && !hasAnswer) {
      setHelperText('กรุณาเลือกคำตอบก่อนดำเนินการต่อ');
      setHelperIsError(true);
      return;
    }

    const isLastQ = qIdx === activeParts[partIdx].questions.length - 1;
    const isLastPart = partIdx === activeParts.length - 1;

    if (isLastQ && isLastPart) {
      if (requireAllAnswers) {
        const missing = flatQuestions.filter((q) => !Number.isInteger(answers[q.id]));
        if (missing.length) {
          setHelperText(`กรุณาตอบให้ครบทุกข้อ (ยังขาดอีก ${missing.length} ข้อ)`);
          setHelperIsError(true);
          return;
        }
      }
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!isLastQ) {
      setQIdx(qIdx + 1);
    } else {
      setPartIdx(partIdx + 1);
      setQIdx(0);
    }
    setHelperText('');
    setHelperIsError(false);
  }, [partIdx, qIdx, answers, activeParts, flatQuestions, requireAllAnswers]);

  const handleReset = useCallback(() => {
    if (!confirm('ต้องการรีเซ็ตคำตอบและการเลือกทั้งหมดหรือไม่?')) return;
    setAnswers({});
    setPartIdx(0);
    setQIdx(0);
    setStep('info');
    saveAnswers({});
    saveSetupState(null);
    setHelperText('');
    setHelperIsError(false);
  }, []);

  const handleAgain = useCallback(() => {
    setAnswers({});
    setPartIdx(0);
    setQIdx(0);
    setShowResults(false);
    setStep('info');
    saveAnswers({});
    saveSetupState(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleOrgType = useCallback((type) => {
    setOrgTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }, []);

  const toggleWebPurpose = useCallback((purpose) => {
    setWebPurposes((prev) =>
      prev.includes(purpose) ? prev.filter((p) => p !== purpose) : [...prev, purpose]
    );
  }, []);

  // Summary package for ResultCard
  const orgInfo = useMemo(() => ({
    orgName,
    regulatorName,
    orgTypes,
    webServices,
    responsibleDept,
    webUrl,
    webType,
    webTypeOther,
    webPurposes,
    webPurposeOther,
    webDeploy,
    webDeployOther,
    impactLevel,
  }), [
    orgName,
    regulatorName,
    orgTypes,
    webServices,
    responsibleDept,
    webUrl,
    webType,
    webTypeOther,
    webPurposes,
    webPurposeOther,
    webDeploy,
    webDeployOther,
    impactLevel,
  ]);

  const displayOrgType = orgTypes.map((t) => {
    if (t === 'gov') return 'หน่วยงานรัฐ';
    if (t === 'regulator') return 'หน่วยงานกำกับดูแล';
    if (t === 'cii') return 'หน่วยงาน CII';
    if (t === 'private') return 'หน่วยงานเอกชน';
    return '';
  }).filter(Boolean).join(', ');

  const totalScore = useMemo(() => calcScore(flatQuestions), [calcScore, flatQuestions]);

  const band = useMemo(() => {
    const pct = totalScore.pct;
    if (pct >= 80) return { badgeClass: 'ok', label: 'ระดับสอดคล้องสูง (Pass)' };
    if (pct >= 50) return { badgeClass: 'warn', label: 'ระดับปานกลาง (Warning)' };
    return { badgeClass: 'bad', label: 'ต้องปรับปรุง (Needs Improvement)' };
  }, [totalScore.pct]);

  const breakdownText = `${orgName ? `${orgName} (${displayOrgType || 'ไม่ระบุประเภท'}) · ` : ''}คะแนนรวม ${totalScore.earned} / ${totalScore.maxPoints} คะแนน  ·  ระดับผลกระทบ: ${impactLevel.toUpperCase()}  ·  ประเมิน ณ ${new Date().toLocaleString('th-TH')}`;

  return (
    <>
      <Navbar isHome={false} />

      <div className={s.wrap}>
        {step === 'info' ? (
          <section className={s.card}>
            <div className={s.setupHeader}>
              <h1 className={s.setupTitle}>แบบฟอร์ม ค1 : ส่วนที่ 1 ข้อมูลเกี่ยวกับเว็บไซต์</h1>
              <p className={s.setupDesc}>
                กรุณาระบุข้อมูลพื้นฐานและคุณลักษณะเฉพาะของเว็บไซต์ของคุณ เพื่อใช้ตรวจสอบและคัดกรองข้อรายการตรวจสอบความมั่นคงปลอดภัยตามเกณฑ์มาตรฐาน
              </p>
            </div>

            <div className={s.infoForm}>
              {/* Text Fields Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                <div className={s.formGroup}>
                  <label className={s.formLabel} htmlFor="orgName">ชื่อหน่วยงาน</label>
                  <input
                    type="text"
                    id="orgName"
                    className={s.textInput}
                    placeholder="ระบุชื่อหน่วยงานของท่าน"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                </div>

                <div className={s.formGroup}>
                  <label className={s.formLabel} htmlFor="regulatorName">ชื่อหน่วยงานควบคุมหรือกำกับดูแล ของท่าน</label>
                  <input
                    type="text"
                    id="regulatorName"
                    className={s.textInput}
                    placeholder="ระบุชื่อหน่วยงานควบคุม/กำกับดูแล (ถ้ามี)"
                    value={regulatorName}
                    onChange={(e) => setRegulatorName(e.target.value)}
                  />
                </div>

                <div className={s.formGroup}>
                  <label className={s.formLabel} htmlFor="webUrl">การเข้าถึงเว็บไซต์ หรือ URL</label>
                  <input
                    type="text"
                    id="webUrl"
                    className={s.textInput}
                    placeholder="เช่น https://www.youragency.go.th"
                    value={webUrl}
                    onChange={(e) => setWebUrl(e.target.value)}
                  />
                </div>

                <div className={s.formGroup}>
                  <label className={s.formLabel} htmlFor="webServices">เว็บไซต์ให้บริการด้าน</label>
                  <input
                    type="text"
                    id="webServices"
                    className={s.textInput}
                    placeholder="ระบุหมวดหมู่การให้บริการหลัก"
                    value={webServices}
                    onChange={(e) => setWebServices(e.target.value)}
                  />
                </div>

                <div className={s.formGroup} style={{ gridColumn: '1 / -1' }}>
                  <label className={s.formLabel} htmlFor="responsibleDept">หน่วยงานภายในที่รับผิดชอบ (ระบุให้เป็นไปตามข้อ 5.4.2)</label>
                  <input
                    type="text"
                    id="responsibleDept"
                    className={s.textInput}
                    placeholder="ระบุฝ่าย / กอง / กลุ่มงาน ที่มีหน้าที่รับผิดชอบดูแลโดยตรง"
                    value={responsibleDept}
                    onChange={(e) => setResponsibleDept(e.target.value)}
                  />
                </div>
              </div>

              {/* Types of Org (Checkboxes) */}
              <div className={s.formGroup}>
                <label className={s.formLabel}>ประเภทหน่วยงาน</label>
                <div className={s.checkboxGrid}>
                  {[
                    { id: 'gov', label: 'หน่วยงานของรัฐ' },
                    { id: 'regulator', label: 'หน่วยงานควบคุมหรือกำกับดูแล (Regulator)' },
                    { id: 'cii', label: 'หน่วยงานโครงสร้างพื้นฐานสำคัญทางสารสนเทศ (CII)' },
                    { id: 'private', label: 'หน่วยงานเอกชน' },
                  ].map((item) => {
                    const isChecked = orgTypes.includes(item.id);
                    return (
                      <label
                        key={item.id}
                        className={`${s.checkboxCard} ${isChecked ? s.checkboxCardActive : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleOrgType(item.id)}
                        />
                        <span>{item.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Web Type (Radios with Other text) */}
              <div className={s.formGroup}>
                <label className={s.formLabel}>ประเภทของเว็บไซต์</label>
                <div className={s.radioCardGrid}>
                  {[
                    { val: 'main', title: 'เว็บไซต์หลักของหน่วยงาน', desc: 'Main Official Website' },
                    { val: 'intranet', title: 'เว็บไซต์ภายในหน่วยงาน (Intranet)', desc: 'Internal Employee Portal' },
                    { val: 'other', title: 'อื่นๆ โปรดระบุ', desc: 'Other custom application type' },
                  ].map((item) => (
                    <label
                      key={item.val}
                      className={`${s.radioCard} ${webType === item.val ? s.radioCardActive : ''}`}
                    >
                      <input
                        type="radio"
                        name="webType"
                        value={item.val}
                        checked={webType === item.val}
                        onChange={() => setWebType(item.val)}
                      />
                      <span className={s.radioCardTitle}>{item.title}</span>
                      <span className={s.radioCardDesc}>{item.desc}</span>
                    </label>
                  ))}
                </div>
                {webType === 'other' && (
                  <input
                    type="text"
                    className={s.textInput}
                    style={{ marginTop: '0.5rem' }}
                    placeholder="โปรดระบุประเภทเว็บไซต์เพิ่มเติม..."
                    value={webTypeOther}
                    onChange={(e) => setWebTypeOther(e.target.value)}
                  />
                )}
              </div>

              {/* Web Purposes (Checkboxes with Other text) */}
              <div className={s.formGroup}>
                <label className={s.formLabel}>วัตถุประสงค์ในการบริการเว็บไซต์ (เลือกได้มากกว่า 1 ตัวเลือก)</label>
                <div className={s.checkboxGrid}>
                  {[
                    { id: 'citizens', label: 'เว็บไซต์ที่ให้บริการข้อมูลของประชาชน' },
                    { id: 'cni', label: 'เว็บไซต์ที่ให้บริการเกี่ยวกับโครงสร้างพื้นฐานสำคัญของประเทศ' },
                    { id: 'transaction', label: 'เว็บไซต์ของหน่วยงานที่มีการดำเนินการธุรกรรมทางอิเล็กทรอนิกส์' },
                    { id: 'other', label: 'อื่นๆ โปรดระบุ' },
                  ].map((item) => {
                    const isChecked = webPurposes.includes(item.id);
                    return (
                      <label
                        key={item.id}
                        className={`${s.checkboxCard} ${isChecked ? s.checkboxCardActive : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleWebPurpose(item.id)}
                        />
                        <span>{item.label}</span>
                      </label>
                    );
                  })}
                </div>
                {webPurposes.includes('other') && (
                  <input
                    type="text"
                    className={s.textInput}
                    style={{ marginTop: '0.5rem' }}
                    placeholder="โปรดระบุวัตถุประสงค์เพิ่มเติม..."
                    value={webPurposeOther}
                    onChange={(e) => setWebPurposeOther(e.target.value)}
                  />
                )}
              </div>

              {/* Web Deploy Type (Radios with Other text) */}
              <div className={s.formGroup}>
                <label className={s.formLabel}>รูปแบบการจัดทำเว็บไซต์</label>
                <div className={s.radioCardGrid}>
                  {[
                    { val: 'onprem', title: 'เว็บไซต์บนระบบขององค์กร (On-Premises)', desc: 'Hosted on internal infrastructure' },
                    { val: 'cloud', title: 'เว็บไซต์บนระบบคลาวด์ (Cloud Service)', desc: 'IaaS/PaaS Cloud provider hosting' },
                    { val: 'hosting', title: 'เว็บไซต์ที่ใช้บริการเว็บโฮสติ้ง (Web Hosting)', desc: 'Shared web hosting provider' },
                    { val: 'other', title: 'อื่นๆ โปรดระบุ', desc: 'Other hosting format' },
                  ].map((item) => (
                    <label
                      key={item.val}
                      className={`${s.radioCard} ${webDeploy === item.val ? s.radioCardActive : ''}`}
                    >
                      <input
                        type="radio"
                        name="webDeploy"
                        value={item.val}
                        checked={webDeploy === item.val}
                        onChange={() => setWebDeploy(item.val)}
                      />
                      <span className={s.radioCardTitle}>{item.title}</span>
                      <span className={s.radioCardDesc}>{item.desc}</span>
                    </label>
                  ))}
                </div>
                {webDeploy === 'other' && (
                  <input
                    type="text"
                    className={s.textInput}
                    style={{ marginTop: '0.5rem' }}
                    placeholder="โปรดระบุรูปแบบการจัดทำเพิ่มเติม..."
                    value={webDeployOther}
                    onChange={(e) => setWebDeployOther(e.target.value)}
                  />
                )}
              </div>
            </div>

            <div className={s.setupFooter} style={{ justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button
                className={s.btnPrimary}
                style={{ padding: '12px 24px', borderRadius: '10px' }}
                onClick={() => {
                  setStep('setup');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                ดำเนินการต่อ (ประเมินผลกระทบ) →
              </button>
            </div>
          </section>
        ) : step === 'setup' ? (
          <section className={s.card}>
            <div className={s.setupHeader}>
              <h1 className={s.setupTitle}>การประเมินระดับผลกระทบ WSS</h1>
              <p className={s.setupDesc}>
                กรุณาประเมินระดับผลกระทบของข้อมูลหรือเว็บไซต์ของหน่วยงานตามเกณฑ์ CIA เพื่อระบุข้อกำหนดขั้นต่ำที่เว็บไซต์ของคุณต้องปฏิบัติตาม
              </p>
            </div>

            <div className={s.setupTabs}>
              <button
                className={`${s.setupTabBtn} ${setupTab === 'cia' ? s.setupTabBtnActive : ''}`}
                onClick={() => setSetupTab('cia')}
              >
                ประเมินตามคุณลักษณะ CIA (แนะนำ)
              </button>
              <button
                className={`${s.setupTabBtn} ${setupTab === 'direct' ? s.setupTabBtnActive : ''}`}
                onClick={() => setSetupTab('direct')}
              >
                ระบุระดับผลกระทบโดยตรง
              </button>
            </div>

            {setupTab === 'cia' ? (
              <>
                <div className={s.ciaGrid}>
                  {ciaAreas.map((area) => (
                    <div key={area.id} className={s.ciaCard}>
                      <h3 className={s.ciaCardTitle}>{area.title}</h3>
                      <p className={s.ciaCardDesc}>{area.desc}</p>
                      <div className={s.ciaRow}>
                        {['c', 'i', 'a'].map((type) => {
                          const label = type === 'c' ? 'ความลับ (Confidentiality)' : type === 'i' ? 'ความถูกต้อง (Integrity)' : 'ความพร้อมใช้ (Availability)';
                          const fieldName = `${area.id}_${type}`;
                          const currentVal = ciaAnswers[fieldName];

                          return (
                            <div key={type} className={s.ciaField}>
                              <span className={s.ciaFieldLabel}>{label}</span>
                              <div className={s.ciaRadios}>
                                {['low', 'medium', 'high'].map((level) => {
                                  const thLevel = level === 'low' ? 'ต่ำ' : level === 'medium' ? 'กลาง' : 'สูง';
                                  const isChecked = currentVal === level;
                                  const labelClass = isChecked
                                    ? `${s.ciaRadioLabel} ${s[`ciaRadioChecked_${level}`]}`
                                    : s.ciaRadioLabel;

                                  return (
                                    <label key={level} className={labelClass}>
                                      <input
                                        type="radio"
                                        name={fieldName}
                                        value={level}
                                        checked={isChecked}
                                        onChange={() => handleCiaChange(fieldName, level)}
                                      />
                                      {thLevel}
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className={s.setupFooter}>
                  <button
                    className={s.btn}
                    style={{ width: 'auto', padding: '12px 24px', borderRadius: '10px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)' }}
                    onClick={() => {
                      setStep('info');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    ← ย้อนกลับ
                  </button>
                  <div className={s.setupResultText}>
                    ระดับผลกระทบที่วิเคราะห์ได้:
                    <span className={`${s.setupResultLevel} ${s[`setupResultLevel_${calculatedCiaLevel}`]}`}>
                      {calculatedCiaLevel === 'low' ? 'ระดับต่ำ (LOW)' : calculatedCiaLevel === 'medium' ? 'ระดับกลาง (MEDIUM)' : 'ระดับสูง (HIGH)'}
                    </span>
                  </div>
                  <button className={s.btnPrimary} style={{ padding: '12px 24px', borderRadius: '10px' }} onClick={handleStartAssessment}>
                    เริ่มทำแบบประเมิน →
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={s.directSelect}>
                  {[
                    { level: 'low', name: 'ระดับต่ำ (LOW)', desc: 'เหตุการณ์ส่งผลกระทบต่อหน่วยงานเพียงเล็กน้อยหรืออย่างจำกัด ต่อการเงิน ชื่อเสียง' },
                    { level: 'medium', name: 'ระดับกลาง (MEDIUM)', desc: 'เหตุการณ์ส่งผลกระทบอย่างร้ายแรงต่อหน่วยงาน บุคลากร หรือประชาชน' },
                    { level: 'high', name: 'ระดับสูง (HIGH)', desc: 'เหตุการณ์ส่งผลกระทบอย่างร้ายแรงมากต่อความมั่นคงของรัฐ หรือสาธารณประโยชน์' },
                  ].map((item) => {
                    const isActive = directLevel === item.level;
                    const btnClass = isActive
                      ? `${s.directBtn} ${s[`directBtnActive_${item.level}`]}`
                      : s.directBtn;

                    return (
                      <button key={item.level} className={btnClass} onClick={() => setDirectLevel(item.level)}>
                        <div>
                          <div className={s.directBtnName}>{item.name}</div>
                          <div className={s.directBtnDesc}>{item.desc}</div>
                        </div>
                        <div style={{ fontSize: '1.25rem' }}>{isActive ? '✓' : ''}</div>
                      </button>
                    );
                  })}
                </div>

                <div className={s.setupFooter}>
                  <button
                    className={s.btn}
                    style={{ width: 'auto', padding: '12px 24px', borderRadius: '10px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)' }}
                    onClick={() => {
                      setStep('info');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    ← ย้อนกลับ
                  </button>
                  <button className={s.btnPrimary} style={{ padding: '12px 24px', borderRadius: '10px', minWidth: '200px' }} onClick={handleStartAssessment}>
                    เริ่มทำแบบประเมินระดับ {directLevel === 'low' ? 'ต่ำ' : directLevel === 'medium' ? 'กลาง' : 'สูง'} →
                  </button>
                </div>
              </>
            )}
          </section>
        ) : !showResults ? (
          <QuizCard
            parts={activeParts}
            partIdx={partIdx}
            qIdx={qIdx}
            answers={answers}
            totalQuestions={flatQuestions.length}
            answeredCount={answeredCount}
            impactLevel={impactLevel}
            requireAllAnswers={requireAllAnswers}
            helperText={helperText}
            helperIsError={helperIsError}
            onAnswer={handleAnswer}
            onPrev={handlePrev}
            onNext={handleNext}
            onReset={handleReset}
          />
        ) : (
          <ResultCard
            totalScore={totalScore}
            band={band}
            parts={parts}
            answers={answers}
            calcScore={calcScore}
            breakdown={breakdownText}
            onAgain={handleAgain}
            orgInfo={orgInfo}
          />
        )}
      </div>
    </>
  );
}
