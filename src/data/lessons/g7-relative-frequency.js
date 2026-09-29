import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g7-relative-frequency',
  topicId: 'g7-relative-frequency',
  grade: 7,
  emoji: '🥧',
  title: 'שכיחות יחסית',
  subtitle: 'איזה חלק מכל הנתונים — כשבר, כעשרוני וכאחוז',
  sections: [
    {
      id: 'why',
      emoji: '🤔',
      title: 'למה "יחסית"?',
      blocks: [
        {
          type: 'text',
          md: m`בכיתה א' 12 תלמידים אוהבים כדורגל, ובכיתה ב' — 15. איפה אוהבים כדורגל **יותר**?

תלוי כמה תלמידים יש בכל כיתה! אם בכיתה א' יש 20 ובכיתה ב' 30, אז בכיתה א' זה $\frac{12}{20}=60\%$, ובכיתה ב' רק $\frac{15}{30}=50\%$.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שכיחות יחסית',
          md: m`**השכיחות של הערך** חלקי **מספר כל הנתונים**.

כמו שעשינו למעלה: $\frac{12}{20}$ — 12 אוהבי כדורגל מתוך 20 תלמידים.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מתוך 25 תלמידים, 10 מגיעים ברגל. מה השכיחות היחסית?',
        options: [m`$\frac{10}{25}$`, m`$\frac{25}{10}$`, m`$\frac{10}{15}$`, m`$10$`],
        answer: 0,
        hint: 'השכיחות למעלה, הסך הכול למטה.',
        explain: m`$\frac{10}{25}=\frac{2}{5}$`,
      },
    },
    {
      id: 'forms',
      emoji: '🔄',
      title: 'שבר, עשרוני, אחוז',
      blocks: [
        {
          type: 'steps',
          title: '10 מתוך 25',
          steps: [
            { math: m`\frac{10}{25}=${c(VIOLET, '\\frac{2}{5}')}`, note: 'שבר (מצומצם).' },
            { math: m`${c(VIOLET, '0.4')}`, note: 'עשרוני: 2 חלקי 5.' },
            { math: m`${c(GREEN, '40\\%')}`, note: 'אחוז: כופלים ב-100.' },
          ],
        },
        {
          type: 'bars',
          items: [
            { label: '🚶 ברגל', count: 10 },
            { label: '🚌 אוטובוס', count: 8 },
            { label: '🚗 רכב', count: 5 },
            { label: '🚲 אופניים', count: 2 },
          ],
          relative: true,
          editable: true,
          caption: 'איך 25 תלמידים מגיעים לבית הספר. שנו מספרים — האחוזים מתעדכנים:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '%',
        prompt: 'מתוך 40 הטלות, 10 היו "שש". מה השכיחות היחסית באחוזים?',
        answer: 25,
        hint: m`$\frac{10}{40}=\frac14$`,
        explain: m`$\frac14=0.25=25\%$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: הסכום תמיד 1',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'כל החלקים ביחד',
          md: m`סכום כל השכיחויות היחסיות הוא $1$ (או $100\%$) — כי ביחד הן כל הנתונים. זה עוזר למצוא ערך חסר!`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '%',
        prompt: 'בסקר: 45% בחרו בפיצה, 30% בפסטה, והשאר בסושי. כמה אחוזים בחרו בסושי?',
        answer: 25,
        hint: m`$100\%-45\%-30\%$`,
        explain: m`$100-75=25\%$`,
      },
    },
  ],
};
