import { m, svgParts } from '../helpers.js';
import { tf, angleFig } from './shared.js';

const YES_NO = ['ישרה', 'לא ישרה'];
const isRight = (deg) => ({ q: '', figure: angleFig(deg), options: YES_NO, answer: deg === 90 ? 0 : 1 });

/** מצולעים לספירת זוויות ישרות. */
const { svg, INK, ACCENT } = svgParts;
const mark = (x, y, dx, dy) => `<path d="M ${x + dx * 10} ${y} L ${x + dx * 10} ${y + dy * 10} L ${x} ${y + dy * 10}" fill="none" stroke="${ACCENT}" stroke-width="1.4"/>`;
const SHAPES = {
  rect: { fig: svg(180, 100, `<rect x="10" y="10" width="160" height="80" fill="#eaf4fd" stroke="${INK}" stroke-width="2"/>`), right: 4 },
  rightTri: { fig: svg(170, 110, `<polygon points="10,100 160,100 10,10" fill="#eaf4fd" stroke="${INK}" stroke-width="2"/>${mark(10, 100, 1, -1)}`), right: 1 },
  trapezoid: { fig: svg(190, 100, `<polygon points="10,90 180,90 180,10 70,10" fill="#eaf4fd" stroke="${INK}" stroke-width="2"/>`), right: 2 },
  tri: { fig: svg(180, 110, `<polygon points="10,100 170,100 60,10" fill="#eaf4fd" stroke="${INK}" stroke-width="2"/>`), right: 0 },
};
const countRight = (k) => ({ q: '', figure: SHAPES[k].fig, a: m`זוויות ישרות: [[${SHAPES[k].right}]]` });

export default {
  id: 'g2-right-angle',
  grade: 2,
  emoji: '📐',
  title: 'זווית ישרה',
  reminder: [
    {
      title: 'זווית ישרה',
      md: 'זווית כמו **פינה של דף** ⌞. בודקים: מניחים פינה של דף על הזווית — אם היא מתאימה בדיוק, הזווית ישרה.',
    },
    {
      title: 'איפה פוגשים זוויות ישרות?',
      md: 'בפינות של מלבן וריבוע (4 בכל אחד), של דלת, חלון, ספר ומחברת.',
    },
  ],
  pages: [
    {
      title: 'מזהים זווית ישרה',
      exercises: [
        { title: 'האם הזווית ישרה?', cols: 3, items: [isRight(90), isRight(60), isRight(120), isRight(90), isRight(30), isRight(100)] },
        {
          title: 'בחרו.',
          cols: 1,
          items: [
            { q: 'באיזה חפץ יש פינה עם זווית ישרה?', options: ['כדור', 'דף מחברת', 'צלחת עגולה'], answer: 1 },
            { q: 'במה בודקים אם זווית ישרה?', options: ['בפינה של דף', 'בסרגל עגול', 'בכוס'], answer: 0 },
          ],
        },
      ],
    },
    {
      title: 'זוויות ישרות במצולעים',
      exercises: [
        { title: 'כמה זוויות ישרות יש במצולע?', cols: 2, items: [countRight('rect'), countRight('rightTri'), countRight('trapezoid'), countRight('tri')] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('בכל ריבוע יש 4 זוויות ישרות.', true), tf('בכל משולש יש זווית ישרה.', false), tf('בפינה של דלת יש זווית ישרה.', true)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'האם הזווית ישרה?', cols: 3, items: [isRight(45), isRight(90), isRight(135)] },
      { title: 'כמה זוויות ישרות?', cols: 2, items: [countRight('rect'), countRight('rightTri')] },
    ],
  },
};
