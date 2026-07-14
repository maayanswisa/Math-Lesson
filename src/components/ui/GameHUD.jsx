import { useGame } from '../../context/GameContext';

export default function GameHUD() {
  const { xp, muted, toggleMute, level, levelInfo, badges, badgeDefs, streak } = useGame();
  const progressPct = Math.round((levelInfo.progress || 0) * 100);

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm" dir="rtl">
      <div className="min-w-[140px]">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-[var(--color-ink)]">{level.title}</span>
          <span className="text-[var(--color-teal)]">{xp} XP</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[var(--color-mist)]">
          <div
            className="h-full rounded-full bg-[var(--color-teal)] transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {streak > 0 && (
        <span className="rounded-md bg-[var(--color-coral)]/10 px-2 py-1 text-xs font-medium text-[var(--color-coral)]">
          רצף ×{streak}
        </span>
      )}

      {badges.length > 0 && (
        <div className="flex gap-1">
          {badges.slice(0, 3).map((id) => (
            <span
              key={id}
              title={badgeDefs[id]?.description}
              className="rounded-md bg-white/80 px-2 py-1 text-xs ring-1 ring-black/10"
            >
              {badgeDefs[id]?.title ?? id}
            </span>
          ))}
        </div>
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
