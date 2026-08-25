import { useGame } from '../../context/GameContext';

export default function GameHUD() {
  const { xp, muted, toggleMute, level, levelInfo, streak } = useGame();
  const progressPct = Math.round((levelInfo.progress || 0) * 100);

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm" dir="rtl">
      <div className="min-w-[140px]">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-[var(--color-ink)]">{level.title}</span>
          <span className="text-[var(--color-teal)]">{xp} XP</span>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-[var(--color-mist)]">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${progressPct}%`,
              backgroundImage: 'linear-gradient(90deg, var(--color-teal) 0%, var(--color-sky) 60%, var(--color-violet) 100%)',
            }}
          />
        </div>
      </div>

      {streak > 0 && (
        <span
          className="rounded-md bg-[var(--color-coral)]/10 px-2 py-1 text-xs font-medium text-[var(--color-coral)]"
          title="מספר התשובות הנכונות ברצף, בלי טעות באמצע"
        >
          {streak} תשובות נכונות ברצף 🔥
        </span>
      )}

      <button
        type="button"
        onClick={toggleMute}
        className="rounded-lg bg-white/70 px-2.5 py-1 text-xs text-[var(--color-slate)] ring-1 ring-black/10 hover:ring-[var(--color-teal)]/40"
        aria-pressed={muted}
        title={muted ? 'הפעלת צלילים' : 'השתקת צלילים'}
      >
        {muted ? 'מושתק' : 'צלילים'}
      </button>
    </div>
  );
}
