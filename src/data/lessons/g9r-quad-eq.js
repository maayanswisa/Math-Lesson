import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g9r-quad-eq',
  topicId: 'g9r-quad-eq',
  grade: 9,
  emoji: '🎯',
  title: 'משוואות ריבועיות',
  subtitle: 'פירוק, נוסחת השורשים, הדיסקרימיננטה ומערכת עם פרבולה',
  sections: [
    {
      id: 'factor',
      emoji: '🧩',
      title: 'פתרון בפירוק',
      blocks: [
        {
          type: 'text',
          md: m`$ax^2+bx+c=0$. אם אפשר לפרק — הכי מהר: מכפלה שווה אפס → **אחד הגורמים אפס**.`,
        },
        {
          type: 'steps',
          title: m`$x^2-5x+6=0$`,
          steps: [
            { math: m`(x-2)(x-3)=0`, note: 'מפרקים טרינום: מכפלה 6, סכום −5.' },
            { math: m`x-2=0\qquad x-3=0`, note: 'כל גורם בנפרד.' },
            { math: m`${c(GREEN, 'x=2')}\qquad${c(GREEN, 'x=3')}`, note: 'שני פתרונות.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהם הפתרונות של $x^2+x-12=0$?`,
        options: [m`$x=3,\ x=-4$`, m`$x=-3,\ x=4$`, m`$x=2,\ x=-6$`, m`$x=12,\ x=-1$`],
        answer: 0,
        hint: 'מכפלה −12, סכום 1: אילו מספרים?',
        explain: m`$(x-3)(x+4)=0$, ולכן $x=3$ או $x=-4$.`,
      },
    },
    {
      id: 'formula',
      emoji: '🔑',
      title: 'נוסחת השורשים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'עובדת תמיד',
          md: m`$$x_{1,2}=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$`,
        },
        {
          type: 'steps',
          title: m`$2x^2-3x-2=0$`,
          steps: [
            { math: m`a=2,\ b=-3,\ c=-2`, note: 'מזהים מקדמים — עם הסימנים!' },
            { math: m`\sqrt{9+16}=\sqrt{25}=5`, note: m`$b^2-4ac=9-4\cdot2\cdot(-2)=25$` },
            { math: m`x=\frac{3\pm5}{4}`, note: 'מציבים.' },
            { math: m`${c(GREEN, 'x=2')}\qquad${c(GREEN, 'x=-\\tfrac12')}`, note: m`$\frac84$ ו-$\frac{-2}{4}$.` },
          ],
        },
      ],
      challenge: {
        type: 'number',
        prompt: m`מה הפתרון **הגדול** של $x^2-2x-8=0$?`,
        answer: 4,
        hint: m`$\Delta=4+32=36$. $x=\frac{2\pm6}{2}$`,
        explain: m`$x=\frac{2+6}{2}=4$ או $x=\frac{2-6}{2}=-2$.`,
      },
    },
    {
      id: 'discriminant',
      emoji: '🔎',
      title: 'הדיסקרימיננטה: כמה פתרונות?',
      blocks: [
        {
          type: 'parabola',
          mode: 'standard',
          caption: m`שנו את $b$ ואת $c$: מתי הפרבולה חותכת את ציר $x$ פעמיים, פעם אחת, או אף פעם?`,
          a: 1,
          b: 0,
          c: -4,
        },
        {
          type: 'card',
          tone: 'key',
          title: m`$\Delta=b^2-4ac$`,
          md: m`$\Delta>0$ — **שני** פתרונות · $\Delta=0$ — פתרון **אחד** · $\Delta<0$ — **אין** פתרון`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה פתרונות יש ל-$x^2+2x+5=0$?`,
        options: ['שניים', 'אחד', 'אין', 'אינסוף'],
        answer: 2,
        hint: m`$\Delta=4-20$`,
        explain: m`$\Delta=4-20=-16<0$ — אין פתרון.`,
      },
    },
    {
      id: 'system',
      emoji: '🏆',
      title: 'שלב הבוס: ישר ופרבולה',
      blocks: [
        {
          type: 'steps',
          title: m`$y=x^2$ וגם $y=x+2$`,
          steps: [
            { math: m`x^2=${c(VIOLET, 'x+2')}`, note: m`מציבים את $y$ מהקווית בריבועית.` },
            { math: m`x^2-x-2=0\ \Rightarrow\ (x-2)(x+1)=0`, note: 'משוואה ריבועית.' },
            { math: m`${c(GREEN, '(2,4)')}\quad${c(GREEN, '(-1,1)')}`, note: m`$x=2\Rightarrow y=4$; $x=-1\Rightarrow y=1$.` },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'המשמעות הגרפית',
          md: m`$\Delta>0$ — הישר **חותך** את הפרבולה בשתי נקודות · $\Delta=0$ — **משיק** · $\Delta<0$ — לא נפגשים.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`בכמה נקודות נפגשים $y=x^2$ ו-$y=2x-1$?`,
        answer: 1,
        hint: m`$x^2-2x+1=0$. מה $\Delta$?`,
        explain: m`$\Delta=4-4=0$ — נקודה אחת: הישר משיק לפרבולה ב-$(1,1)$.`,
      },
    },
  ],
};
