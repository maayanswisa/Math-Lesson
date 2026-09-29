import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g6-decimals-mul-div',
  topicId: 'g6-decimals-mul-div',
  grade: 6,
  emoji: '🔹',
  title: 'כפל וחילוק שברים עשרוניים',
  subtitle: 'סופרים ספרות אחרי הנקודה — ומזיזים אותה',
  sections: [
    {
      id: 'ten',
      emoji: '🔟',
      title: 'כפל וחילוק ב-10 וב-100',
      blocks: [
        {
          type: 'place',
          start: '3.47',
          places: [2, 1, 0, -1, -2],
          caption: 'לחצו על הכפתורים של כפל וחילוק ב-10. הספרות זזות מקום:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $0.56\times100$?`,
        answer: 56,
        hint: 'שני מקומות.',
        explain: m`$56$`,
      },
    },
    {
      id: 'mul',
      emoji: '✖️',
      title: 'כפל',
      blocks: [
        {
          type: 'steps',
          title: m`$1.2\times0.3$`,
          steps: [
            { math: m`12\times3=${c(VIOLET, '36')}`, note: 'כופלים בלי נקודות.' },
            { math: m`1+1=2`, note: 'סופרים ספרות אחרי הנקודה בשני הגורמים.' },
            { math: c(GREEN, '0.36'), note: 'שמים 2 ספרות אחרי הנקודה.' },
          ],
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'כפל שמקטין',
          md: m`$1.2\times0.3=0.36$ — קטן מ-$1.2$! כפל במספר קטן מ-1 מקטין.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $0.4\times0.5$?`,
        answer: 0.2,
        tolerance: 0.0001,
        hint: m`$4\times5=20$, ושתי ספרות אחרי הנקודה.`,
        explain: m`$0.20=0.2$`,
      },
    },
    {
      id: 'div',
      emoji: '🏆',
      title: 'שלב הבוס: חילוק',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מזיזים את שניהם',
          md: m`$2.4:0.4$ — כופלים את שניהם ב-$10$: $24:4=6$. התשובה לא משתנה!`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $3.6:0.12$?`,
        answer: 30,
        hint: m`כופלים ב-100: $360:12$`,
        explain: m`$360:12=30$`,
      },
    },
  ],
};
