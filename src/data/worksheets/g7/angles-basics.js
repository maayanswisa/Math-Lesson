import { m, svgParts, round } from '../helpers.js';
import { tf } from './shared.js';
import { angleFig } from '../g3/shared.js';

const TYPES = ['חדה', 'ישרה', 'קהה', 'שטוחה', 'גדולה משטוחה'];
const typeOf = (d) => (d < 90 ? 0 : d === 90 ? 1 : d < 180 ? 2 : d === 180 ? 3 : 4);
const typeByDeg = (d) => ({ q: m`זווית של $${d}°$ היא:`, options: TYPES, answer: typeOf(d) });

/** אומדן: איזו מידה הכי קרובה לזווית בשרטוט? */
function estimate(deg, options) {
  const best = options.reduce((b, o) => (Math.abs(o - deg) < Math.abs(b - deg) ? o : b));
  if (options.filter((o) => Math.abs(o - deg) === Math.abs(best - deg)).length !== 1) throw new Error('ambiguous estimate');
  return { q: '', figure: angleFig(deg), options: options.map((o) => `${o}°`), answer: options.indexOf(best) };
}

/** זווית ABC עם שמות קודקודים: מה הקודקוד? */
const { svg, label, INK, ACCENT } = svgParts;
function namedAngle(deg, [p, v, q]) {
  const a = (deg * Math.PI) / 180;
  const vx = 40;
  const vy = 100;
  const ex = round(vx + 120 * Math.cos(a), 2);
  const ey = round(vy - 120 * Math.sin(a), 2);
  return svg(
    200,
    125,
    `<line x1="${vx}" y1="${vy}" x2="${vx + 130}" y2="${vy}" stroke="${INK}" stroke-width="2.2"/>` +
      `<line x1="${vx}" y1="${vy}" x2="${ex}" y2="${ey}" stroke="${INK}" stroke-width="2.2"/>` +
      `<path d="M ${vx + 22} ${vy} A 22 22 0 0 0 ${round(vx + 22 * Math.cos(a), 2)} ${round(vy - 22 * Math.sin(a), 2)}" fill="none" stroke="${ACCENT}" stroke-width="1.8"/>` +
      label(vx - 6, vy + 16, v, 'end') +
      label(vx + 130, vy + 18, q) +
      label(ex + 8, ey + 4, p, 'start'),
  );
}

/** חיבור/חיסור של מעלות. */
const compute = (tex, ans) => ({ q: m`$${tex} =$ [[${ans}]] $°$` });

export default {
  id: 'g7-angles-basics',
  grade: 7,
  emoji: '📐',
  title: 'סימון, מדידה ואומדן של זוויות',
  reminder: [
    {
      title: 'סימון',
      md: m`זווית $\angle ABC$: **הקודקוד** הוא האות האמצעית ($B$), והקרניים הן $BA$ ו-$BC$. אפשר גם $\angle B$ כשאין בלבול.`,
    },
    {
      title: 'מדידה במעלות',
      md: m`חדה: $0° < \alpha < 90°$ · ישרה: $90°$ · קהה: $90° < \alpha < 180°$ · שטוחה: $180°$ · גדולה משטוחה: בין $180°$ ל-$360°$. סיבוב שלם: $360°$.`,
    },
    {
      title: 'אומדן',
      md: m`משווים לזווית ישרה ($90°$) ולחצי ממנה ($45°$). זווית קצת יותר פתוחה מישרה — בערך $100°$-$120°$.`,
    },
  ],
  pages: [
    {
      title: 'סימון וסוגים',
      exercises: [
        {
          title: 'מה הקודקוד של הזווית?',
          cols: 2,
          items: [
            { q: '', figure: namedAngle(50, ['A', 'B', 'C']), options: ['A', 'B', 'C'], answer: 1 },
            { q: '', figure: namedAngle(120, ['P', 'Q', 'R']), options: [m`$\angle PRQ$`, m`$\angle QPR$`, m`$\angle PQR$`], answer: 2 },
          ],
        },
        { title: 'איזה סוג זווית?', cols: 2, items: [typeByDeg(35), typeByDeg(90), typeByDeg(145), typeByDeg(180), typeByDeg(260), typeByDeg(89)] },
      ],
    },
    {
      title: 'אומדן וחישוב',
      exercises: [
        { title: 'בערך כמה מעלות?', cols: 3, items: [estimate(30, [30, 60, 90]), estimate(135, [45, 90, 135]), estimate(80, [20, 80, 150]), estimate(160, [60, 110, 160])] },
        { title: 'חשבו.', cols: 2, items: [compute('35° + 47°', 82), compute('180° - 65°', 115), compute('90° - 28°', 62), compute('360° - 210°', 150)] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('זווית של 90.5° היא קהה.', true),
            tf('שתי זוויות חדות יחד תמיד יוצרות זווית קהה.', false),
            tf(m`ב-$\angle KLM$ הקודקוד הוא $L$.`, true),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'איזה סוג?', cols: 2, items: [typeByDeg(120), typeByDeg(15)] },
      { title: 'בערך כמה מעלות?', cols: 2, items: [estimate(45, [45, 90, 120]), estimate(110, [30, 70, 110])] },
      { title: 'חשבו.', cols: 2, items: [compute('180° - 98°', 82), compute('2 \\cdot 37°', 74)] },
    ],
  },
};
