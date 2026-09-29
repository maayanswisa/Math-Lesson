import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g10u4-derivative-poly',
  topicId: 'g10-u4-derivative-poly',
  grade: 10,
  units: 4,
  emoji: '📉',
  title: 'הנגזרת: הגדרה וכללי גזירה',
  subtitle: 'שיפוע המשיק = קצב השינוי הרגעי',
  sections: [
    {
      id: 'idea',
      emoji: '🔎',
      title: 'ממיתר למשיק',
      blocks: [
        {
          type: 'secant',
          caption: m`מיתר בין שתי נקודות על $y=x^2$. הקטינו את $h$ — המיתר הופך למשיק:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הנגזרת',
          md: m`$f'(x_0)$ — **שיפוע המשיק** בנקודה, או **קצב השינוי הרגעי**. ל-$x^2$: $f'(x)=2x$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה שיפוע המשיק ל-$y=x^2$ בנקודה $x=3$?`,
        answer: 6,
        hint: m`$2x$`,
        explain: m`$2\cdot3=6$`,
      },
    },
    {
      id: 'rules',
      emoji: '📜',
      title: 'כללי גזירה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'ארגז הכלים',
          md: m`$(x^n)'=nx^{n-1}$

$(c)'=0$

$(f\pm g)'=f'\pm g'$

**מכפלה:** $(fg)'=f'g+fg'$

**מורכבת:** $\left[(ax+b)^n\right]'=n(ax+b)^{n-1}\cdot a$`,
        },
        {
          type: 'steps',
          title: m`$f(x)=(2x-1)^3$`,
          steps: [
            { math: m`3(2x-1)^2`, note: 'גוזרים את החזקה.' },
            { math: m`\cdot${c(VIOLET, '2')}`, note: 'כפול נגזרת הפנים.' },
            { math: c(GREEN, "f'(x)=6(2x-1)^2"), note: 'התוצאה.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$f(x)=x^3-4x^2+5$. כמה זה $f'(2)$?`,
        answer: -4,
        hint: m`$f'(x)=3x^2-8x$`,
        explain: m`$12-16=-4$`,
      },
    },
    {
      id: 'tangent',
      emoji: '🏆',
      title: 'שלב הבוס: משוואת משיק',
      blocks: [
        {
          type: 'tangent',
          fn: 'cubic',
          caption: 'הזיזו את הנקודה — המשיק ושיפועו משתנים:',
        },
        {
          type: 'steps',
          title: m`משיק ל-$f(x)=x^2+1$ ב-$x=1$`,
          steps: [
            { math: m`f(1)=2`, note: m`הנקודה $(1,2)$.` },
            { math: m`f'(1)=2`, note: 'השיפוע.' },
            { math: m`y-2=2(x-1)\Rightarrow y=2x`, note: 'המשיק.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהי משוואת המשיק ל-$f(x)=x^3$ בנקודה $x=1$?`,
        options: [m`$y=3x-2$`, m`$y=3x+1$`, m`$y=x$`, m`$y=3x$`],
        answer: 0,
        hint: m`$f(1)=1$, $f'(1)=3$`,
        explain: m`$y-1=3(x-1)$`,
      },
    },
  ],
};
