import s from '@/styles/assessment.module.css';

export default function ProgressBar({ current, total }) {
  const pct = total ? Math.round((current / total) * 100) : 0;

  return (
    <div className={s.progressbar} aria-label="progress">
      <div className={s.progressFill} style={{ width: `${pct}%` }} />
    </div>
  );
}
