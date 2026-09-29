import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g6-circle',
  topicId: 'g6-circle',
  grade: 6,
  emoji: '⭕',
  title: 'מעגל',
  subtitle: 'רדיוס, קוטר, היקף ושטח — והמספר π',
  sections: [
    {
      id: 'parts',
      emoji: '📏',
      title: 'רדיוס וקוטר',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'הקוטר = פעמיים הרדיוס',
          md: m`**רדיוס** $r$ — מהמרכז אל המעגל. **קוטר** $d$ — מצד לצד דרך המרכז.

$$d=2r$$
`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס"מ',
        prompt: 'הקוטר של גלגל הוא 50 ס"מ. מה הרדיוס?',
        answer: 25,
        hint: 'חצי מהקוטר.',
        explain: m`$50:2=25$ ס"מ.`,
      },
    },
    {
      id: 'pi',
      emoji: '🥧',
      title: 'היקף והמספר π',
      blocks: [
        {
          type: 'circle',
          r: 4,
          caption: 'שנו את הרדיוס: ההיקף חלקי הקוטר תמיד יוצא בערך 3.14:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'היקף המעגל',
          md: m`$$P=${c(VIOLET, '\\pi')}\times d=2\pi r$$

$\pi\approx3.14$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס"מ',
        prompt: m`מה ההיקף של מעגל עם קוטר $10$ ס"מ? (השתמשו ב-$\pi=3.14$)`,
        answer: 31.4,
        tolerance: 0.01,
        hint: m`$3.14\times10$`,
        explain: m`$31.4$ ס"מ.`,
      },
    },
    {
      id: 'area',
      emoji: '🏆',
      title: 'שלב הבוס: שטח העיגול',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שטח',
          md: m`$$S=\pi r^2=\pi\times r\times r$$
`,
        },
        {
          type: 'steps',
          title: m`עיגול עם רדיוס $5$`,
          steps: [
            { math: m`5\times5=25`, note: 'רדיוס בריבוע.' },
            { math: m`3.14\times25=${c(GREEN, '78.5')}`, note: 'כפול π.' },
          ],
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'לא לבלבל',
          md: m`שטח — עם $r^2$. היקף — עם $2r$. אם נתון קוטר, קודם מחלקים ב-$2$!`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: m`מה שטח עיגול שקוטרו $20$ ס"מ? ($\pi=3.14$)`,
        answer: 314,
        tolerance: 0.01,
        hint: m`הרדיוס הוא $10$.`,
        explain: m`$3.14\times10\times10=314$ סמ"ר.`,
      },
    },
  ],
};
