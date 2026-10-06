import { m } from '../helpers.js';
import { tf, clockFig } from './shared.js';

const pad = (mm) => String(mm).padStart(2, '0');
const hourBlank = (h) => `[[${h % 12 || 12}|${h % 12 === 0 ? 0 : (h % 12) + 12}]]`;

/** קריאת שעון מחוגים (מתקבלת גם שעה בשעון 24 שעות). */
const readClock = (h, mm) => ({ q: '', figure: clockFig(h, mm, 130), a: m`${hourBlank(h)} $:$ [[${mm}]]` });

/** מ-24 שעות ל-12 שעות. */
const to12 = (h, mm) => ({ q: m`$${h}{:}${pad(mm)}$ — בשעון מחוגים:`, a: m`[[${h % 12 || 12}]] $:$ [[${mm}]]` });

/** זמן שעבר בדקות. */
const minutesFor = (h1, m1, h2, m2) => {
  const d = h2 * 60 + m2 - (h1 * 60 + m1);
  if (d <= 0) throw new Error('end must be after start');
  return { q: m`מ-$${h1}{:}${pad(m1)}$ עד $${h2}{:}${pad(m2)}$ עברו`, a: m`[[${d}]] דקות` };
};

/** שעה אחרי x דקות. */
const after = (h, mm, add) => {
  const t = h * 60 + mm + add;
  const H = Math.floor(t / 60) % 24;
  return { q: m`$${add}$ דקות אחרי $${h}{:}${pad(mm)}$ השעה`, a: m`[[${H > 12 ? `${H}|${H - 12}` : H}]] $:$ [[${t % 60}]]` };
};

/** ביטויים: רבע אחרי, חצי, רבע ל-. */
const PHRASES = [
  ['רבע אחרי שלוש', 3, 15],
  ['שלוש וחצי', 3, 30],
  ['רבע לארבע', 3, 45],
  ['עשרה לשמונה', 7, 50],
  ['חמש דקות אחרי תשע', 9, 5],
];
const phrase = ([text, h, mm]) => ({ q: `${text}:`, a: m`${hourBlank(h)} $:$ [[${mm}]]` });

export default {
  id: 'g3-clock-minutes',
  grade: 3,
  emoji: '🕒',
  title: 'השעון — דקות',
  reminder: [
    {
      title: 'המחוגים',
      md: m`המחוג **הקצר** — השעות. המחוג **הארוך** (באדום) — הדקות.

בין כל שני מספרים בשעון עוברות **$5$ דקות**: המחוג הארוך על $8$ ← $8 \times 5 = 40$ דקות.`,
    },
    {
      title: 'ביטויים',
      md: m`רבע שעה $= 15$ דקות · חצי שעה $= 30$ דקות · שעה $= 60$ דקות

"רבע לארבע" $= 3{:}45$ · "ארבע ועשרים" $= 4{:}20$`,
    },
    {
      title: 'שעון 24 שעות',
      md: m`אחרי $12$ בצהריים ממשיכים לספור $13, 14, 15\ldots$ (מוסיפים $12$ לשעה):

* $1$ בצהריים היא $13{:}00$
* $3{:}40$ אחר הצהריים היא $15{:}40$
* $8$ בערב היא $20{:}00$`,
    },
  ],
  pages: [
    {
      title: 'קוראים את השעון',
      exercises: [
        { title: 'מה השעה?', cols: 3, items: [readClock(3, 40), readClock(7, 15), readClock(10, 5), readClock(1, 50), readClock(6, 30), readClock(11, 25)] },
        { title: 'כתבו בספרות.', cols: 2, items: PHRASES.map(phrase) },
      ],
    },
    {
      title: 'שעון 24 שעות וזמן שעבר',
      exercises: [
        { title: 'מה השעה בשעון מחוגים?', cols: 2, items: [to12(15, 40), to12(13, 5), to12(20, 30), to12(18, 15)] },
        { title: 'כמה דקות עברו?', cols: 1, items: [minutesFor(8, 15, 9, 0), minutesFor(10, 20, 10, 55), minutesFor(16, 45, 17, 30)] },
        { title: 'מה תהיה השעה?', cols: 1, items: [after(7, 40, 30), after(14, 50, 25), after(9, 15, 45)] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('כשהמחוג הארוך על 6 — עברה חצי שעה.', true), tf(m`$17{:}00$ זה $7$ בערב.`, false)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מה השעה?', cols: 3, items: [readClock(4, 20), readClock(9, 45), readClock(12, 10)] },
      { title: 'כתבו בספרות.', cols: 1, items: [phrase(['רבע לשש', 5, 45])] },
      { title: 'חשבו.', cols: 1, items: [to12(19, 25), minutesFor(11, 35, 12, 10), after(8, 50, 20)] },
    ],
  },
};
