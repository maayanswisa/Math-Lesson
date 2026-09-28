/**
 * עזרים משותפים לכתיבת תוכן מדריכים.
 *
 * m — String.raw, כדי ש-LaTeX (\frac, \cdot…) לא יצטרך לוכסנים כפולים.
 * c(color, tex) — הדגשת חלק מנוסחה בצבע מפלטת האתר.
 */
export const m = String.raw;

export const RED = '#c45c48';
export const GREEN = '#2d7a4f';
export const VIOLET = '#7c4dcc';
export const SKY = '#1670b3';

export const c = (color, tex) => m`\textcolor{${color}}{${tex}}`;
