import { useGame } from '../../context/GameContext';

export default function GameHUD() {
  const { xp, muted, toggleMute, level, levelInfo, streak } = useGame();
  const progressPct = Math.round((levelInfo.progress || 0) * 100);

  return (
    <div className="flex flex-nowrap items-center gap-1.5 text-xs sm:gap-3 sm:text-sm" dir="rtl">
      <div className="min-w-0 shrink-0 sm:min-w-[140px]" title={level.title}>
        <div className="flex items-center justify-between gap-2">
          <span className="hidden whitespace-nowrap font-semibold text-[var(--color-ink)] sm:inline">{level.title}</span>
          <span className="whitespace-nowrap text-[var(--color-teal)]">
            <span className="sm:hidden">{xp}</span>
            <span className="hidden sm:inline">{xp} XP</span>
          </span>
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
          className="shrink-0 whitespace-nowrap rounded-md bg-[var(--color-coral)]/10 px-1.5 py-1 text-xs font-medium text-[var(--color-coral-dark)]"
          title="מספר התשובות הנכונות ברצף, בלי טעות באמצע"
        >
          <span className="sm:hidden">{streak} 🔥</span>
          <span className="hidden sm:inline">{streak} תשובות נכונות ברצף 🔥</span>
        </span>
      )}

      <button
        type="button"
        onClick={toggleMute}
        className="shrink-0 rounded-lg bg-white/70 px-2 py-1 text-sm text-[var(--color-slate)] ring-1 ring-black/10 hover:ring-[var(--color-teal)]/40 sm:px-2.5"
        aria-pressed={muted}
        aria-label={muted ? 'הפעלת צלילים' : 'השתקת צלילים'}
        title={muted ? 'הפעלת צלילים' : 'השתקת צלילים'}
      >
        {muted ? '🔇' : '🔊'}
      </button>
    </div>
  );
}
