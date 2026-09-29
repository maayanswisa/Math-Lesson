import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g11u5-root-functions-adv',
  topicId: 'g11-u5-root-functions-adv',
  grade: 11,
  units: 5,
  emoji: '√',
  title: 'העמקה בפונקציות עם שורשים',
  subtitle: 'תחום שהוא קטע, שתי אסימפטוטות שונות, ופתרונות זרים',
  sections: [
    {
      id: 'domain',
      emoji: '🚧',
      title: 'תחום הגדרה',
      blocks: [
        {
          type: 'text',
          md: m`ב-$\sqrt{g(x)}$ דורשים $g(x)\ge0$. זה יכול לחתוך **קטע שלם** — לא רק להוציא נקודות.`,
        },
        {
          type: 'steps',
          title: m`$f(x)=\sqrt{9-x^2}+x$`,
          steps: [
            { math: m`9-x^2\ge0`, note: 'מה שבתוך השורש — לא שלילי.' },
            { math: m`x^2\le9`, note: 'מעבירים אגף.' },
            { math: m`${c(GREEN, '-3\\le x\\le3')}`, note: 'התחום הוא קטע סגור — ולקטע יש קצוות!' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהו תחום ההגדרה של $f(x)=\sqrt{x^2-4x}$?`,
        options: [m`$0\le x\le4$`, m`$x\le0$ או $x\ge4$`, m`$x\ge4$`, 'כל x'],
        answer: 1,
        hint: m`$x(x-4)\ge0$ — פרבולה שפותחת למעלה.`,
        explain: m`$x(x-4)\ge0$ מחוץ לשורשים: $x\le0$ או $x\ge4$.`,
      },
    },
    {
      id: 'asymptotes',
      emoji: '↔️',
      title: 'אסימפטוטות שונות בשני הכיוונים',
      blocks: [
        {
          type: 'tangent',
          fn: 'sqrtAsym',
          x: 1,
          caption: m`שימו לב: ב-$+\infty$ הגרף מתקרב ל-$y=1$, וב-$-\infty$ ל-$y=-1$. בפונקציה רציונלית זה לא קורה!`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: m`המלכודת: $\sqrt{x^2}=|x|$`,
          md: m`$\sqrt{x^2+1}\approx\sqrt{x^2}=|x|$ — **לא** $x$. לכן $\frac{x}{\sqrt{x^2+1}}\approx\frac{x}{|x|}$, שזה $1$ לחיוביים ו-$-1$ לשליליים.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה זה $\sqrt{(-5)^2}$?`,
        options: [m`$-5$`, m`$5$`, m`$\pm5$`, m`$25$`],
        answer: 1,
        hint: m`$\sqrt{x^2}=|x|$`,
        explain: m`$\sqrt{25}=5=|-5|$`,
      },
    },
    {
      id: 'edge',
      emoji: '🧱',
      title: 'קיצון בקצה התחום',
      blocks: [
        {
          type: 'tangent',
          fn: 'root',
          x: 3.5,
          caption: m`$f(x)=x\sqrt{4-x}$: המשיק נעשה תלול מאוד ליד $x=4$, אבל $(4,0)$ היא נקודת קיצון (מינימום קצה):`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'לא לשכוח את הקצוות',
          md: m`בקצה התחום השורש מתאפס — והנגזרת בדרך כלל **לא** מתאפסת (לפעמים היא בכלל לא מוגדרת). בודקים את ערך הפונקציה בקצה בנפרד.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`בתחום $-3\le x\le3$, מה הערך הגדול ביותר של $f(x)=\sqrt{9-x^2}$?`,
        answer: 3,
        hint: m`מתי $9-x^2$ הכי גדול?`,
        explain: m`ב-$x=0$: $\sqrt9=3$. בקצוות $f=0$ — אלה המינימומים.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: פתרון זר',
      blocks: [
        {
          type: 'steps',
          title: m`פתרו: $\sqrt{x+6}=x$`,
          steps: [
            { math: m`x+6=x^2`, note: 'מעלים בריבוע.' },
            { math: m`x^2-x-6=0\ \Rightarrow\ x=3,\ x=-2`, note: 'משוואה ריבועית.' },
            { math: m`\sqrt9=3\ ${c(GREEN, '\\checkmark')}\qquad\sqrt4\neq-2\ ${c(RED, '\\times')}`, note: 'בודקים במשוואה המקורית!' },
            { math: m`x=${c(VIOLET, '3')}`, note: m`$-2$ הוא **פתרון זר** — נוצר מההעלאה בריבוע.` },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'x =',
        prompt: m`פתרו: $\sqrt{2x+3}=x$`,
        answer: 3,
        hint: m`$x^2-2x-3=0$ — ובדקו את שני הפתרונות.`,
        explain: m`$x=3$ ✓ ($\sqrt9=3$). $x=-1$ זר: $\sqrt1=1\neq-1$.`,
      },
    },
  ],
};
