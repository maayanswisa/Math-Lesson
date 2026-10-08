const m = String.raw;

export default {
  topicId: 'g9x-linear',
  emoji: '📋',
  title: 'דף עזר: פונקציה קווית',
  subtitle: 'y = mx + b: שיפוע, נקודת חיתוך עם ציר y, ומציאת הנוסחה',
  sections: [
    {
      title: 'y = mx + b',
      emoji: '📈',
      blocks: [
        {
          type: 'table',
          head: ['האות', 'המשמעות', m`$y=2x+3$`],
          rows: [
            [m`$m$`, 'השיפוע — בכמה עולה y כש-x עולה ב-1', m`$2$`],
            [m`$b$`, 'נקודת החיתוך עם ציר y', m`$(0,3)$`],
          ],
        },
        {
          type: 'table',
          head: ['השיפוע', 'הישר'],
          rows: [
            [m`$m>0$`, 'עולה ↗'],
            [m`$m<0$`, 'יורד ↘'],
            [m`$m=0$`, 'מקביל לציר x (קבוע)'],
          ],
        },
      ],
    },
    {
      title: 'מציאת הנוסחה',
      emoji: '🧮',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שיפוע משתי נקודות',
          md: m`$$m=\frac{y_2-y_1}{x_2-x_1}$$`,
        },
        {
          type: 'steps',
          title: m`הישר עובר דרך $(1,5)$ ו-$(3,9)$`,
          steps: [
            { math: m`m=\frac{9-5}{3-1}=2`, note: 'השיפוע.' },
            { math: m`5=2\cdot1+b\ \Rightarrow\ b=3`, note: 'מציבים נקודה.' },
            { math: m`y=2x+3`, note: 'הנוסחה.' },
          ],
        },
      ],
    },
    {
      title: 'מהחיים',
      emoji: '🚕',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'מונית: 12 ₪ פתיחה + 4 ₪ לכל ק"מ',
          md: m`$y=4x+12$ — השיפוע הוא המחיר **לק"מ**, ו-$b$ הוא מחיר **הפתיחה**. נסיעה של $5$ ק"מ: $4\cdot5+12=32$ ₪.`,
        },
      ],
    },
    {
      title: 'מלכודות',
      emoji: '⚠️',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'טעויות נפוצות',
          md: m`- בשיפוע — אותו סדר למעלה ולמטה ($y_2-y_1$ עם $x_2-x_1$).
- $y=3-2x$: השיפוע $-2$, לא $3$.
- חיתוך עם ציר x: מציבים $y=0$ (לא $x=0$).`,
        },
      ],
    },
  ],
};
