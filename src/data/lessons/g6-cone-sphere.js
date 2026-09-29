import { m } from './tex.js';

export default {
  id: 'g6-cone-sphere',
  topicId: 'g6-cone-sphere',
  grade: 6,
  emoji: '🍦',
  title: 'חרוט וכדור',
  subtitle: 'שליש גליל, וכדור עם ארבע שלישים',
  sections: [
    {
      id: 'cone',
      emoji: '🍦',
      title: 'חרוט',
      blocks: [
        {
          type: 'revolution',
          shape: 'cone',
          elementary: true,
          caption: 'משולש שמסתובב סביב צלע יוצר חרוט. החליפו צורות:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שליש מהגליל',
          md: m`כמו פירמידה ותיבה — חרוט הוא **שליש** מהגליל עם אותו בסיס ואותו גובה:

$$V=\frac{\pi r^2h}{3}$$
`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`נפח גליל הוא $90$. מה נפח חרוט עם אותו בסיס ואותו גובה?`,
        answer: 30,
        hint: 'שליש.',
        explain: m`$90:3=30$`,
      },
    },
    {
      id: 'sphere',
      emoji: '⚽',
      title: 'כדור',
      blocks: [
        {
          type: 'revolution',
          shape: 'sphere',
          elementary: true,
          caption: 'חצי עיגול שמסתובב — כדור:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'נפח הכדור',
          md: m`$$V=\frac43\pi r^3$$

$r^3=r\times r\times r$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כדור עם רדיוס $3$. מה הנפח? ($\pi=3.14$)`,
        answer: 113.04,
        tolerance: 0.01,
        hint: m`$\frac43\times3.14\times27$`,
        explain: m`$36\times3.14=113.04$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: גלידה',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'חרוט + חצי כדור',
          md: m`גביע גלידה: חרוט עם כדור גלידה מעליו. מחברים את הנפחים!`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`לגליל, לחרוט ולכדור אותו רדיוס $r$, וגובה הגליל והחרוט $2r$. מה היחס בין נפחיהם (חרוט : כדור : גליל)?`,
        options: [m`$1:2:3$`, m`$1:1:1$`, m`$1:3:9$`, m`$2:3:4$`],
        answer: 0,
        hint: m`$\frac{2\pi r^3}{3}$, $\frac{4\pi r^3}{3}$, $2\pi r^3$`,
        explain: m`$\frac23:\frac43:2=1:2:3$ — גילוי של ארכימדס!`,
      },
    },
  ],
};
