import { m } from './tex.js';

const INV = `<div class='diagram-box'><svg viewBox='0 0 220 220' width='220' xmlns='http://www.w3.org/2000/svg' style='max-width:100%;direction:ltr'><line x1='10' y1='110' x2='210' y2='110' stroke='#1a2b3c'/><line x1='110' y1='10' x2='110' y2='210' stroke='#1a2b3c'/><line x1='20' y1='200' x2='200' y2='20' stroke='#8a94a6' stroke-dasharray='5 4'/><path d='M40,200 L200,40' stroke='#0d6e6e' stroke-width='3'/><path d='M150,20 L70,180' stroke='#7c4dcc' stroke-width='3'/><g font-size='12' font-weight='700'><text x='175' y='60' fill='#0d6e6e'>f</text><text x='60' y='170' fill='#7c4dcc'>f⁻¹</text><text x='185' y='40' fill='#8a94a6'>y=x</text></g></svg></div>`;

export default {
  id: 'g10u5-function-ops',
  topicId: 'g10-u5-function-ops',
  grade: 10,
  units: 5,
  emoji: '🔄',
  title: 'פעולות על פונקציות',
  subtitle: 'שיקופים, ערך מוחלט, הרכבה ופונקציה הפוכה',
  sections: [
    {
      id: 'reflect',
      emoji: '🪞',
      title: 'שיקופים וערך מוחלט',
      blocks: [
        {
          type: 'transformfn',
          families: ['abs', 'inv', 'sqrt'],
          caption: m`נסו $a$ שלילי — שיקוף בציר $x$:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שני שיקופים',
          md: m`$-f(x)$ — שיקוף בציר $x$. $f(-x)$ — שיקוף בציר $y$. ושימו לב: $\sqrt{x^2}=|x|$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`$f(x)=\sqrt{x}$. מה התחום של $g(x)=f(-x)$?`,
        options: [m`$x\le0$`, m`$x\ge0$`, m`כל $x$`, m`$x\ne0$`],
        answer: 0,
        hint: m`$-x\ge0$`,
        explain: m`$x\le0$ — שיקוף לציר $y$.`,
      },
    },
    {
      id: 'compose',
      emoji: '⚙️',
      title: 'הרכבה',
      blocks: [
        {
          type: 'machine',
          a: 2,
          b: 1,
          caption: 'פונקציה היא מכונה — והרכבה היא שתי מכונות ברצף:',
        },
        {
          type: 'card',
          tone: 'key',
          title: m`$f(g(x))$`,
          md: m`קודם $g$, ואת התוצאה מכניסים ל-$f$. $f(x)=x^2$, $g(x)=x+3$: $f(g(x))=(x+3)^2$, אבל $g(f(x))=x^2+3$ — **הסדר חשוב!**`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$f(x)=2x-1$, $g(x)=x^2$. כמה זה $f(g(3))$?`,
        answer: 17,
        hint: m`$g(3)=9$`,
        explain: m`$f(9)=17$`,
      },
    },
    {
      id: 'inverse',
      emoji: '🏆',
      title: 'שלב הבוס: פונקציה הפוכה',
      blocks: [
        {
          type: 'text',
          md: m`${INV}

הגרף של $f^{-1}$ — שיקוף של $f$ בישר $y=x$. מוצאים: מחליפים $x\leftrightarrow y$ ומבודדים את $y$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהי ההפוכה של $f(x)=3x-6$?`,
        options: [m`$\frac{x+6}{3}$`, m`$\frac{x-6}{3}$`, m`$3x+6$`, m`$\frac{1}{3x-6}$`],
        answer: 0,
        hint: m`$x=3y-6$`,
        explain: m`$y=\frac{x+6}{3}$`,
      },
    },
  ],
};
