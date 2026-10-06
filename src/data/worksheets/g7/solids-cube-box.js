import { m, boxFig } from '../helpers.js';
import { tf } from './shared.js';

const SQ = 'סמ״ר';
const CU = 'סמ״ק';

const surface = (l, w, h) => 2 * (l * w + l * h + w * h);

const box = (l, w, h) => ({ q: '', figure: boxFig({ l, w, h }), a: m`שטח פנים: [[${surface(l, w, h)}]] ${SQ} · נפח: [[${l * w * h}]] ${CU}` });
const cube = (a) => ({ q: m`קובייה שאורך המקצוע שלה $${a}$ ס״מ.`, a: m`שטח פנים: [[${6 * a * a}]] ${SQ} · נפח: [[${a ** 3}]] ${CU}` });

/** סכום אורכי המקצועות. */
const edges = (l, w, h) => ({ q: m`תיבה $${l} \times ${w} \times ${h}$ ס״מ. סכום אורכי כל המקצועות:`, a: m`[[${4 * (l + w + h)}]] ס״מ` });

/** מקצוע חסר לפי נפח. */
const missingH = (V, l, w) => {
  if (V % (l * w)) throw new Error('height must be whole');
  return { q: m`נפח תיבה $${V}$ ${CU}, אורכה $${l}$ ורוחבה $${w}$ ס״מ. הגובה:`, a: m`[[${V / (l * w)}]] ס״מ` };
};

const cubeFromArea = (S) => ({ q: m`שטח הפנים של קובייה $${S}$ ${SQ}. אורך המקצוע:`, a: m`[[${Math.sqrt(S / 6)}]] ס״מ` });

export default {
  id: 'g7-solids-cube-box',
  grade: 7,
  emoji: '📦',
  title: 'קובייה ותיבה: שטח פנים ונפח',
  reminder: [
    {
      title: 'מושגים',
      md: m`לתיבה $6$ **פאות** (מלבנים, $3$ זוגות זהים), $12$ **מקצועות** ($4$ מכל אורך) ו-$8$ **קודקודים**. בקובייה כל הפאות ריבועים זהים.`,
    },
    {
      title: 'שטח פנים',
      md: m`סכום שטחי כל הפאות: $\;S = 2(ab + ac + bc)$. $\;$ בקובייה: $S = 6a^2$`,
    },
    {
      title: 'נפח',
      md: m`$V = a \cdot b \cdot c$ (אורך × רוחב × גובה) $\;$ בקובייה: $V = a^3$. יחידות: ${CU} (סנטימטר מעוקב).`,
    },
  ],
  pages: [
    {
      title: 'שטח פנים ונפח',
      exercises: [
        { title: 'חשבו לתיבה.', cols: 1, items: [box(5, 3, 2), box(10, 4, 6)] },
        { title: 'חשבו לקובייה.', cols: 1, items: [cube(3), cube(5), cube(10)] },
        { title: 'מקצועות.', cols: 1, items: [edges(5, 3, 2), { q: 'כמה מקצועות באורך שווה יש בכל "קבוצה" בתיבה?', a: '[[4]]' }] },
      ],
    },
    {
      title: 'בעיות הפוכות',
      exercises: [
        { title: 'מצאו את הנתון החסר.', cols: 1, items: [missingH(120, 6, 5), missingH(360, 9, 8), cubeFromArea(54), cubeFromArea(150)] },
        {
          title: 'בחרו.',
          cols: 1,
          items: [
            { q: m`לאיזו תיבה הנפח הגדול ביותר?`, options: [m`$4 \times 4 \times 4$`, m`$8 \times 2 \times 3$`, m`$10 \times 3 \times 2$`], answer: [64, 48, 60].indexOf(Math.max(64, 48, 60)) },
            { q: m`אקווריום $50 \times 30 \times 40$ ס״מ. כמה ליטרים נכנסים בו? ($1$ ליטר $= 1{,}000$ ${CU})`, options: ['6', '60', '600'], answer: ['6', '60', '600'].indexOf(String((50 * 30 * 40) / 1000)) },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('אם מכפילים את המקצוע של קובייה פי 2 — הנפח גדל פי 8.', 2 ** 3 === 8),
            tf('לשתי תיבות עם אותו נפח יש תמיד אותו שטח פנים.', surface(4, 4, 4) === surface(8, 2, 4)),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו.', cols: 1, items: [box(6, 4, 3), cube(4)] },
      { title: 'נתון חסר.', cols: 1, items: [missingH(140, 7, 5), cubeFromArea(96)] },
    ],
  },
};
