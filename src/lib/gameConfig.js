/** Gamification constants */

export const XP_CORRECT = 10;
export const XP_TOPIC_BONUS = 25;
export const XP_STREAK_BONUS = 5;
export const MAX_HEARTS = 3;
export const SPEED_RUN_SECONDS = 60;

export const LEVELS = [
  { level: 1, minXp: 0, title: 'מתלמד/ת מתמטיקה' },
  { level: 2, minXp: 50, title: 'ספרן/ית' },
  { level: 3, minXp: 150, title: 'אלוף חשבון' },
  { level: 4, minXp: 350, title: 'קוסם/ת מספרים' },
  { level: 5, minXp: 700, title: 'גאון המתמטיקה' },
];

export const BADGE_DEFS = {
  hot_streak: {
    id: 'hot_streak',
    title: 'חם אש',
    description: '5 תשובות נכונות ברציפות',
  },
  night_owl: {
    id: 'night_owl',
    title: 'ינשוף לילה',
    description: 'תרגול אחרי השעה 20:00',
  },
  geo_perfect: {
    id: 'geo_perfect',
    title: 'אלוף הנדסה',
    description: 'סיום נושא גאומטריה בציון 100%',
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
