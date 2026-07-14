# -*- coding: utf-8 -*-
"""Rewrite gamification UI files with proper UTF-8 Hebrew via \\u escapes."""
from pathlib import Path
import codecs

ROOT = Path(__file__).resolve().parents[1]


def U(s: str) -> str:
    # Decode unicode_escape sequences like \\u05d0 while keeping other backslashes for JS
    # Process \\uXXXX only
    out = []
    i = 0
    while i < len(s):
        if s[i : i + 2] == "\\u" and i + 6 <= len(s):
            hexpart = s[i + 2 : i + 6]
            if all(c in "0123456789abcdefABCDEF" for c in hexpart):
                out.append(chr(int(hexpart, 16)))
                i += 6
                continue
        out.append(s[i])
        i += 1
    return "".join(out)


def w(rel: str, content: str):
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(U(content), encoding="utf-8")
    # verify no question marks as sole hebrew placeholders
    print("wrote", rel, "chars", len(content))


# --- gameConfig ---
w(
    "src/lib/gameConfig.js",
    r"""/** Gamification constants */

export const XP_CORRECT = 10;
export const XP_TOPIC_BONUS = 25;
export const XP_STREAK_BONUS = 5;
export const MAX_HEARTS = 3;
export const SPEED_RUN_SECONDS = 60;

export const LEVELS = [
  { level: 1, minXp: 0, title: '\u05de\u05ea\u05dc\u05de\u05d3/\u05ea \u05de\u05ea\u05de\u05d8\u05d9\u05e7\u05d4' },
  { level: 2, minXp: 50, title: '\u05e1\u05e4\u05e8\u05df/\u05d9\u05ea' },
  { level: 3, minXp: 150, title: '\u05d0\u05dc\u05d5\u05e3 \u05d7\u05e9\u05d1\u05d5\u05df' },
  { level: 4, minXp: 350, title: '\u05e7\u05d5\u05e1\u05dd/\u05ea \u05de\u05e1\u05e4\u05e8\u05d9\u05dd' },
  { level: 5, minXp: 700, title: '\u05d2\u05d0\u05d5\u05df \u05d4\u05de\u05ea\u05de\u05d8\u05d9\u05e7\u05d4' },
];

export const BADGE_DEFS = {
  hot_streak: {
    id: 'hot_streak',
    title: '\u05d7\u05dd \u05d0\u05e9',
    description: '5 \u05ea\u05e9\u05d5\u05d1\u05d5\u05ea \u05e0\u05db\u05d5\u05e0\u05d5\u05ea \u05d1\u05e8\u05e6\u05d9\u05e4\u05d5\u05ea',
  },
  night_owl: {
    id: 'night_owl',
    title: '\u05d9\u05e0\u05e9\u05d5\u05e3 \u05dc\u05d9\u05dc\u05d4',
    description: '\u05ea\u05e8\u05d2\u05d5\u05dc \u05d0\u05d7\u05e8\u05d9 \u05d4\u05e9\u05e2\u05d4 20:00',
  },
  geo_perfect: {
    id: 'geo_perfect',
    title: '\u05d0\u05dc\u05d5\u05e3 \u05d4\u05e0\u05d3\u05e1\u05d4',
    description: '\u05e1\u05d9\u05d5\u05dd \u05e0\u05d5\u05e9\u05d0 \u05d2\u05d0\u05d5\u05de\u05d8\u05e8\u05d9\u05d4 \u05d1\u05e6\u05d9\u05d5\u05df 100%',
  },
};

export function levelFromXp(xp) {
  let current = LEVELS[0];
  for (const L of LEVELS) {
    if (xp >= L.minXp) current = L;
  }
  return current;
}

export function nextLevelInfo(xp) {
  const cur = levelFromXp(xp);
  const next = LEVELS.find((L) => L.level === cur.level + 1);
  if (!next) return { cur, next: null, progress: 1 };
  const span = next.minXp - cur.minXp;
  const progress = span <= 0 ? 1 : Math.min(1, (xp - cur.minXp) / span);
  return { cur, next, progress };
}
""",
)

w(
    "src/components/ui/GameHUD.jsx",
    r"""import { useGame } from '../../context/GameContext';

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
          \u05e8\u05e6\u05e3 \u00d7{streak}
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
        title={muted ? '\u05d4\u05e4\u05e2\u05dc\u05ea \u05e6\u05dc\u05d9\u05dc\u05d9\u05dd' : '\u05d4\u05e9\u05ea\u05e7\u05ea \u05e6\u05dc\u05d9\u05dc\u05d9\u05dd'}
      >
        {muted ? '\u05de\u05d5\u05e9\u05ea\u05e7' : '\u05e6\u05dc\u05d9\u05dc\u05d9\u05dd'}
      </button>
    </div>
  );
}
""",
)

print("partial ok")
