import { m, svgParts, boxFig } from '../helpers.js';
import { tf } from './shared.js';

const { svg, label, INK, ACCENT } = svgParts;

/** נקודה P מעל ישר, עם שלושה קטעים אל הישר — אחד מאונך. */
const DISTANCE_FIG = svg(
  240,
  130,
  `<line x1="10" y1="105" x2="230" y2="105" stroke="${INK}" stroke-width="2"/>` +
    `<line x1="120" y1="20" x2="45" y2="105" stroke="${ACCENT}" stroke-width="1.6" stroke-dasharray="5 3"/>` +
    `<line x1="120" y1="20" x2="120" y2="105" stroke="${ACCENT}" stroke-width="1.6" stroke-dasharray="5 3"/>` +
    `<line x1="120" y1="20" x2="200" y2="105" stroke="${ACCENT}" stroke-width="1.6" stroke-dasharray="5 3"/>` +
    `<path d="M 129 105 L 129 96 L 120 96" fill="none" stroke="${INK}" stroke-width="1.2"/>` +
    `<circle cx="120" cy="20" r="3.5" fill="${INK}"/>` +
    label(120, 13, 'P') +
    label(45, 124, 'A') +
    label(120, 124, 'B') +
    label(200, 124, 'C'),
);

/** מלבן ABCD לשאלות על צלעות. */
const RECT_FIG = svg(
  220,
  120,
  `<rect x="30" y="20" width="160" height="80" fill="#eaf4fd" stroke="${INK}" stroke-width="2"/>` +
    label(22, 116, 'A', 'end') +
    label(198, 116, 'B', 'start') +
    label(198, 16, 'C', 'start') +
    label(22, 16, 'D', 'end'),
);

const REL = ['מקבילות', 'מאונכות'];
const rel = (a, b, answer) => ({ q: m`הצלעות $${a}$ ו-$${b}$ במלבן $ABCD$:`, options: REL, answer });

export default {
  id: 'g7-perpendicular-parallel',
  grade: 7,
  emoji: '⊥',
  title: 'ניצבות, הקבלה, מלבן ותיבה',
  reminder: [
    {
      title: 'מאונכים ומקבילים',
      md: m`**מאונכים** ($a \perp b$) — נחתכים בזווית ישרה. **מקבילים** ($a \parallel b$) — לא נחתכים לעולם (במישור).

שני ישרים שמאונכים לאותו ישר — מקבילים זה לזה.`,
    },
    {
      title: 'מרחק נקודה מישר',
      md: m`אורך **האנך** מהנקודה אל הישר — הקטע **הקצר ביותר** מהנקודה לישר.`,
    },
    {
      title: 'מלבן ותיבה',
      md: m`במלבן: צלעות נגדיות **מקבילות ושוות**, וצלעות סמוכות **מאונכות**. בתיבה: פאות נגדיות מקבילות, ומקצועות שנפגשים בקודקוד — מאונכים זה לזה.`,
    },
  ],
  pages: [
    {
      title: 'מאונכים, מקבילים ומרחק',
      exercises: [
        {
          title: 'מרחק נקודה מישר.',
          cols: 1,
          figure: DISTANCE_FIG,
          items: [
            { q: m`איזה קטע מייצג את המרחק של $P$ מהישר?`, options: [m`$PA$`, m`$PB$`, m`$PC$`], answer: 1 },
            { q: 'איזה קטע הכי קצר?', options: [m`$PA$`, m`$PB$`, m`$PC$`], answer: 1 },
          ],
        },
        { title: 'במלבן.', cols: 1, figure: RECT_FIG, items: [rel('AB', 'DC', 0), rel('AB', 'BC', 1), rel('AD', 'BC', 0), rel('CD', 'DA', 1)] },
        {
          title: 'סמלים.',
          cols: 1,
          items: [
            { q: m`"הישר $a$ מאונך לישר $b$" נכתב:`, options: [m`$a \parallel b$`, m`$a \perp b$`, m`$a = b$`], answer: 1 },
            { q: m`אם $a \perp c$ וגם $b \perp c$ (במישור), אז:`, options: [m`$a \parallel b$`, m`$a \perp b$`, 'אי אפשר לדעת'], answer: 0 },
          ],
        },
      ],
    },
    {
      title: 'תיבה',
      exercises: [
        {
          title: 'בתיבה שבשרטוט.',
          cols: 1,
          figure: boxFig({ l: 'אורך', w: 'רוחב', h: 'גובה' }),
          items: [
            { q: 'כמה מקצועות מקבילים לכל מקצוע (חוץ ממנו)?', a: '[[3]]' },
            { q: 'כמה מקצועות מאונכים למקצוע אחד ונפגשים איתו בקודקוד?', a: '[[4]]' },
            { q: 'כמה זוגות של פאות מקבילות יש בתיבה?', a: '[[3]]' },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('במלבן, האלכסונים מאונכים זה לזה תמיד.', false),
            tf('המרחק בין שני ישרים מקבילים הוא אורך אנך ביניהם.', true),
            tf('במלבן יש ארבע זוויות ישרות.', true),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'במלבן.', cols: 1, figure: RECT_FIG, items: [rel('BC', 'CD', 1), rel('DA', 'CB', 0)] },
      { title: 'בחרו.', cols: 1, items: [{ q: 'הקטע הקצר ביותר מנקודה לישר הוא:', options: ['האנך', 'קטע אופקי', 'כל קטע — כולם שווים'], answer: 0 }] },
      { title: 'תיבה.', cols: 1, items: [{ q: 'כמה מקצועות יוצאים מכל קודקוד של תיבה?', a: '[[3]]' }] },
    ],
  },
};
