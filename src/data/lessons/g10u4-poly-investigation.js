import { m } from './tex.js';

export default {
  id: 'g10u4-poly-investigation',
  topicId: 'g10-u4-poly-investigation',
  grade: 10,
  units: 4,
  emoji: '🕵️',
  title: 'חקירת פונקציה פולינומיאלית',
  subtitle: 'חיתוכים, קיצון, עלייה וירידה — וסקיצה',
  sections: [
    {
      id: 'extremum',
      emoji: '⛰️',
      title: 'נגזרת אפס — קיצון חשוד',
      blocks: [
        {
          type: 'tangent',
          fn: 'cubic',
          showDeriv: true,
          caption: m`$f(x)=x^3-3x$: הזיזו את הנקודה. איפה המשיק אופקי?`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הכלל',
          md: m`$f'>0$ ← עולה. $f'<0$ ← יורדת. $f'$ עובר מ-$+$ ל-$-$ ← **מקסימום**; מ-$-$ ל-$+$ ← **מינימום**.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`ל-$f(x)=x^3-3x$ יש מקסימום מקומי ב-:`,
        options: [m`$x=-1$`, m`$x=1$`, m`$x=0$`, m`$x=3$`],
        answer: 0,
        hint: m`$f'=3x^2-3=0$`,
        explain: m`$x=\pm1$; לפני $-1$: $f'>0$, אחרי: $f'<0$ ← מקסימום.`,
      },
    },
    {
      id: 'table',
      emoji: '📋',
      title: 'טבלת חקירה',
      blocks: [
        {
          type: 'steps',
          title: m`$f(x)=x^3-6x^2+9x$`,
          steps: [
            { math: m`f(x)=x(x-3)^2`, note: m`חיתוכים עם ציר $x$: $0$ ו-$3$.` },
            { math: m`f'(x)=3x^2-12x+9=3(x-1)(x-3)`, note: m`נקודות חשודות: $1$ ו-$3$.` },
            { math: m`\max(1,4),\;\min(3,0)`, note: 'לפי סימני הנגזרת.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`באיזה תחום $f(x)=x^3-6x^2+9x$ יורדת?`,
        options: [m`$1<x<3$`, m`$x<1$`, m`$x>3$`, m`$0<x<3$`],
        answer: 0,
        hint: m`$f'<0$ בין השורשים.`,
        explain: m`$3(x-1)(x-3)<0$ ← $1<x<3$`,
      },
    },
    {
      id: 'absolute',
      emoji: '🏆',
      title: 'שלב הבוס: קיצון מוחלט',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'בתחום סגור — גם הקצוות!',
          md: m`ב-$[a,b]$ משווים את ערכי הפונקציה בנקודות הקיצון **ובקצוות**. הגדול — מקסימום מוחלט.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה הערך הגדול ביותר של $f(x)=x^3-3x$ בתחום $[-2,3]$?`,
        answer: 18,
        hint: m`$f(-1)=2$, $f(3)=18$`,
        explain: m`בקצה $x=3$: $27-9=18$.`,
      },
    },
  ],
};
