import s from '@/styles/assessment.module.css';
import ProgressBar from './ProgressBar';

export default function QuizCard({
  parts,
  partIdx,
  qIdx,
  answers,
  totalQuestions,
  answeredCount,
  impactLevel = 'low',
  requireAllAnswers,
  helperText,
  helperIsError,
  onAnswer,
  onPrev,
  onNext,
  onReset,
}) {
  const part = parts[partIdx];
  const question = part.questions[qIdx];
  const isFirstQ = partIdx === 0 && qIdx === 0;
  const isLastQ = qIdx === part.questions.length - 1;
  const isLastPart = partIdx === parts.length - 1;

  const pct = totalQuestions ? Math.round((answeredCount / totalQuestions) * 100) : 0;
  const activeLevel = impactLevel ? impactLevel.toLowerCase() : 'low';

  return (
    <section className={s.card}>
      {/* Tracking Progress Header */}
      <div className={s.trackingContainer}>
        <div className={s.trackingHeaderRow}>
          <div className={`${s.levelBadgePill} ${s[`levelBadge_${activeLevel}`]}`}>
            <span className={s.levelDot} />
            ระดับ {activeLevel.toUpperCase()} · {totalQuestions} ข้อกำหนด ({parts.length} หมวดหมู่)
          </div>
          <div className={s.trackingStatusText}>
            ประเมินแล้ว <strong>{answeredCount}</strong> / {totalQuestions} ข้อกำหนด ({pct}%)
          </div>
        </div>

        <ProgressBar current={answeredCount} total={totalQuestions} />

        <div className={s.partTrackerRow}>
          <div className={s.partTrackerTitle}>
            <span className={s.partNumberPill}>หมวด {partIdx + 1}/{parts.length}</span>
            <span className={s.partNameText}>{part.title}</span>
          </div>
          <div className={s.questionNumberPill}>
            ข้อที่ {qIdx + 1} จาก {part.questions.length} ในหมวดนี้
          </div>
        </div>
      </div>

      {/* Question */}
      <h2 className={s.qtitle}>{question.text}</h2>

      {/* Choices or Sub-questions */}
      {question.subQuestions && question.subQuestions.length > 0 ? (
        <div className={s.subQList}>
          {question.subQuestions.map((subQ) => {
            const activeVal = answers[subQ.id];
            return (
              <div key={subQ.id} className={s.subQRow}>
                <div className={s.subQText}>{subQ.text}</div>
                <div className={s.subQChoices}>
                  {question.choices.map((choice, i) => {
                    const shortLabel = choice.label.split(' — ')[0].split(' - ')[0];
                    const isChecked = activeVal === i;
                    const labelClass = isChecked
                      ? `${s.subQChoiceLabel} ${s[`subQChoiceChecked_${i}`]}`
                      : s.subQChoiceLabel;

                    return (
                      <label key={i} className={labelClass}>
                        <input
                          type="radio"
                          name={subQ.id}
                          value={i}
                          checked={isChecked}
                          onChange={() => onAnswer(subQ.id, i, question.id)}
                        />
                        {shortLabel}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={s.choices}>
          {question.choices.map((choice, i) => {
            const isSelected = answers[question.id] === i;
            return (
              <label
                key={`${question.id}_${i}`}
                className={`${s.choice} ${isSelected ? s.choiceSelected : ''}`}
                htmlFor={`${question.id}_${i}`}
              >
                <input
                  type="radio"
                  className={s.radio}
                  name={question.id}
                  id={`${question.id}_${i}`}
                  value={i}
                  checked={isSelected}
                  onChange={() => onAnswer(question.id, i)}
                />
                <span>{choice.label}</span>
              </label>
            );
          })}
        </div>
      )}

      {/* Navigation */}
      <div className={s.navBtns}>
        <button
          className={s.btn}
          onClick={onPrev}
          disabled={isFirstQ}
        >
          ← ย้อนกลับ
        </button>
        <div className={s.navRight}>
          <button className={`${s.btn} ${s.btnDanger}`} onClick={onReset}>
            รีเซ็ต
          </button>
          <button
            className={`${s.btn} ${s.btnPrimary}`}
            onClick={onNext}
            disabled={!Number.isInteger(answers[question.id])}
          >
            {isLastQ && isLastPart ? 'ส่งผลการประเมิน ✓' : 'ถัดไป →'}
          </button>
        </div>
      </div>

      {/* Helper text */}
      <div className={`${s.helper} ${helperIsError ? s.helperError : ''}`}>
        {helperText}
      </div>
    </section>
  );
}
