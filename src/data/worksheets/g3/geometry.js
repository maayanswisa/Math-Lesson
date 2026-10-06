import { svgParts } from '../helpers.js';
import { tf, angleFig, clockFig } from './shared.js';

const TYPES = ['חדה', 'ישרה', 'קהה', 'שטוחה'];
const typeOf = (deg) => (deg < 90 ? 0 : deg === 90 ? 1 : deg < 180 ? 2 : 3);

/** איזו זווית בשרטוט? */
const angleType = (deg) => ({ q: '', figure: angleFig(deg), options: TYPES, answer: typeOf(deg) });

/** שני ישרים: parallel / perpendicular / crossing (נחתכים לא בזווית ישרה). */
function linesFig(kind) {
  const { svg, INK, ACCENT } = svgParts;
  const line = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>`;
  if (kind === 'parallel') return svg(140, 90, line(10, 30, 130, 10) + line(10, 80, 130, 60));
  if (kind === 'perpendicular') {
    return svg(140, 100, line(10, 80, 130, 80) + line(60, 10, 60, 80) +
      `<path d="M 72 80 L 72 68 L 60 68" fill="none" stroke="${ACCENT}" stroke-width="1.8"/>`);
  }
  return svg(140, 100, line(10, 85, 130, 60) + line(30, 10, 95, 95));
}

const LINE_KINDS = ['מקבילים', 'מאונכים', 'נחתכים (לא מאונכים)'];
const linesItem = (kind) => ({ q: '', figure: linesFig(kind), options: LINE_KINDS, answer: ['parallel', 'perpendicular', 'crossing'].indexOf(kind) });

/** איזו זווית יוצרים מחוגי השעון? */
function clockAngle(h) {
  const diff = (h % 12) * 30;
  return { q: '', figure: clockFig(h, 0, 120), options: TYPES, answer: typeOf(Math.min(diff, 360 - diff)) };
}

export default {
  id: 'g3-geometry',
  grade: 3,
  emoji: '📐',
  title: 'זוויות, מאונכים ומקבילים',
  reminder: [
    {
      title: 'סוגי זוויות',
      md: `**ישרה** — בדיוק כמו פינה של דף ⌞ · **חדה** — קטנה מישרה · **קהה** — גדולה מישרה וקטנה משטוחה · **שטוחה** — שתי הקרניים על קו ישר אחד.

בודקים עם פינה של דף: נכנסת בדיוק — ישרה; הזווית "בתוך" הפינה — חדה; הזווית "יוצאת" מהפינה — קהה.`,
    },
    {
      title: 'מה קובע את גודל הזווית?',
      md: 'רק **הפתיחה** בין הקרניים — לא אורך הקרניים!',
    },
    {
      title: 'מאונכים ומקבילים',
      md: '**מאונכים** — נפגשים ויוצרים זווית ישרה. **מקבילים** — לא נפגשים אף פעם, גם אם נמשיך אותם (כמו פסי רכבת).',
    },
  ],
  pages: [
    {
      title: 'סוגי זוויות',
      exercises: [
        { title: 'איזו זווית?', cols: 3, items: [angleType(40), angleType(90), angleType(130), angleType(180), angleType(70), angleType(155)] },
        { title: 'איזו זווית יוצרים המחוגים?', cols: 3, items: [clockAngle(3), clockAngle(1), clockAngle(6), clockAngle(5), clockAngle(9), clockAngle(2)] },
      ],
    },
    {
      title: 'מאונכים ומקבילים',
      exercises: [
        { title: 'מה הם הישרים?', cols: 3, items: [linesItem('parallel'), linesItem('perpendicular'), linesItem('crossing')] },
        {
          title: 'בחרו את התשובה.',
          cols: 1,
          items: [
            { q: 'מה יש במלבן?', options: ['רק צלעות מקבילות', 'רק צלעות מאונכות', 'גם צלעות מקבילות וגם צלעות מאונכות'], answer: 2 },
            { q: 'כמה זוויות ישרות יש בריבוע?', options: ['2', '4', '0'], answer: 1 },
            { q: 'איזו זווית הכי גדולה?', options: ['ישרה', 'שטוחה', 'חדה', 'קהה'], answer: 1 },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('אם מאריכים את הקרניים של זווית — הזווית גדלה.', false),
            tf('זווית קהה גדולה מזווית ישרה.', true),
            tf('שני ישרים מקבילים נפגשים אם ממשיכים אותם מספיק.', false),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'איזו זווית?', cols: 3, items: [angleType(110), angleType(25), angleType(90)] },
      { title: 'מה הם הישרים?', cols: 2, items: [linesItem('perpendicular'), linesItem('parallel')] },
      { title: 'איזו זווית יוצרים המחוגים?', cols: 2, items: [clockAngle(4), clockAngle(11)] },
    ],
  },
};
