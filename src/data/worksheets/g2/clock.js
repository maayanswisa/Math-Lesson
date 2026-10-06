import { m } from '../helpers.js';
import { tf, clockFig } from './shared.js';

const pad = (mm) => String(mm).padStart(2, '0');
/** שעה בשעון 12 (מתקבלת גם בשעון 24). */
const hourBlank = (h) => `[[${h % 12 || 12}|${h % 12 === 0 ? 0 : (h % 12) + 12}]]`;

/** קריאת שעון מחוגים: שעה שלמה או חצי שעה. */
const readClock = (h, mm) => ({ q: '', figure: clockFig(h, mm, 120), a: m`${hourBlank(h)} $:$ [[${mm}]]` });

/** שעון דיגיטלי → מילים. */
const WORDS = { 0: 'בדיוק', 30: 'וחצי' };
const NUMS = ['שתים-עשרה', 'אחת', 'שתיים', 'שלוש', 'ארבע', 'חמש', 'שש', 'שבע', 'שמונה', 'תשע', 'עשר', 'אחת-עשרה'];
function digital(h, mm, k) {
  const right = `${NUMS[h % 12]} ${WORDS[mm]}`;
  const wrong1 = `${NUMS[(h + 1) % 12]} ${WORDS[mm]}`;
  const wrong2 = `${NUMS[h % 12]} ${WORDS[30 - mm]}`;
  const options = [right, wrong1, wrong2];
  const shift = k % 3;
  const rotated = [...options.slice(shift), ...options.slice(0, shift)];
  return { q: m`$${h}{:}${pad(mm)}$ — מה השעה?`, options: rotated, answer: rotated.indexOf(right) };
}

/** משך זמן (בשעות שלמות או חצאי שעות), גם כשעוברים את 12:00. */
function duration(h1, m1, h2, m2) {
  let d = (h2 * 60 + m2 - (h1 * 60 + m1)) / 60;
  if (d <= 0) d += 12;
  const whole = Math.floor(d);
  const half = d - whole === 0.5;
  return {
    q: m`מ-$${h1}{:}${pad(m1)}$ עד $${h2}{:}${pad(m2)}$:`,
    a: half ? m`[[${whole}]] שעות וחצי` : m`[[${whole}]] שעות`,
  };
}

/** שעה אחרי x שעות. */
function after(h, mm, hours) {
  const H = ((h + hours - 1) % 12) + 1;
  return { q: m`$${hours}$ שעות אחרי $${h}{:}${pad(mm)}$ השעה`, a: m`[[${H}]] $:$ [[${mm}]]` };
}

export default {
  id: 'g2-clock',
  grade: 2,
  emoji: '🕐',
  title: 'שעות שלמות וחצאי שעות',
  reminder: [
    {
      title: 'שעון מחוגים',
      md: m`המחוג **הקצר** — השעות; המחוג **הארוך** (באדום) — הדקות.

הארוך על $12$ ← שעה **שלמה** ($3{:}00$). הארוך על $6$ ← **חצי** שעה ($3{:}30$), והקצר באמצע בין $3$ ל-$4$.`,
    },
    {
      title: 'שעון דיגיטלי',
      md: m`$7{:}00$ — שבע בדיוק · $7{:}30$ — שבע וחצי. בשעה יש $60$ דקות; חצי שעה — $30$ דקות.`,
    },
    {
      title: 'מעבר את 12',
      md: m`מ-$11{:}00$ עד $2{:}00$: $\;11 \to 12 \to 1 \to 2$ — $3$ שעות.`,
    },
  ],
  pages: [
    {
      title: 'קוראים את השעון',
      exercises: [
        { title: 'מה השעה?', cols: 3, items: [readClock(3, 0), readClock(7, 30), readClock(12, 0), readClock(9, 30), readClock(5, 0), readClock(1, 30)] },
        { title: 'שעון דיגיטלי.', cols: 1, items: [digital(4, 0, 0), digital(8, 30, 1), digital(11, 30, 2)] },
      ],
    },
    {
      title: 'משך זמן',
      exercises: [
        { title: 'כמה זמן עבר?', cols: 1, items: [duration(8, 0, 10, 0), duration(11, 0, 2, 0), duration(9, 30, 12, 0), duration(10, 30, 1, 30), duration(4, 0, 6, 30)] },
        { title: 'מה תהיה השעה?', cols: 1, items: [after(9, 0, 2), after(11, 30, 3), after(10, 0, 4)] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('בחצי שעה יש 30 דקות.', true), tf('כשהמחוג הארוך על 12, השעה היא חצי.', false)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מה השעה?', cols: 3, items: [readClock(6, 30), readClock(10, 0), readClock(2, 30)] },
      { title: 'כמה זמן עבר?', cols: 1, items: [duration(10, 0, 1, 0), duration(7, 30, 10, 0)] },
      { title: 'מה תהיה השעה?', cols: 1, items: [after(12, 30, 2)] },
    ],
  },
};
