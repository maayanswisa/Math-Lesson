import { m } from './tex.js';

export default {
  id: 'g12u5-exp-log',
  topicId: 'g12-u5-exp-log',
  grade: 12,
  units: 5,
  emoji: '🕵️',
  title: 'חקירת פונקציות מעריכיות ולוגריתמיות',
  subtitle: 'שרשרת, מכפלה, קיצון ואסימפטוטות',
  sections: [
    {
      id: 'chain',
      emoji: '⛓️',
      title: 'גזירה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שרשרת',
          md: m`$\left(e^{f(x)}\right)'=f'(x)e^{f(x)}$

$\left(\ln f(x)\right)'=\frac{f'(x)}{f(x)}$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$f(x)=\ln(x^2+3)$. כמה זה $f'(1)$?`,
        answer: 0.5,
        tolerance: 0.001,
        hint: m`$\frac{2x}{x^2+3}$`,
        explain: m`$\frac24=0.5$`,
      },
    },
    {
      id: 'xexp',
      emoji: '⛰️',
      title: 'חקירה',
      blocks: [
        {
          type: 'tangent',
          fn: 'xexp',
          caption: m`$f(x)=xe^{-x}$ — מקסימום אחד ואסימפטוטה $y=0$:`,
        },
        {
          type: 'steps',
          title: m`$f(x)=xe^{-x}$`,
          steps: [
            { math: m`f'(x)=e^{-x}-xe^{-x}=e^{-x}(1-x)`, note: 'כלל המכפלה.' },
            { math: m`f'(x)=0\Rightarrow x=1`, note: m`$e^{-x}$ אף פעם לא אפס.` },
            { math: m`\max\left(1,\tfrac1e\right)`, note: 'עולה לפני, יורדת אחרי.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה ה-$x$ של נקודת הקיצון של $f(x)=x^2e^{x}$ שאינה $0$?`,
        answer: -2,
        hint: m`$f'=e^x(2x+x^2)$`,
        explain: m`$x(x+2)=0$ ← $x=-2$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: לוגריתם',
      blocks: [
        {
          type: 'tangent',
          fn: 'ln',
          caption: m`$\ln x$ — מוגדרת רק ל-$x>0$, ואסימפטוטה $x=0$:`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'קודם תחום!',
          md: m`$\ln f(x)$ מוגדרת כש-$f(x)>0$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.001,
        prompt: m`מה ה-$x$ של המינימום של $f(x)=x-\ln x$?`,
        answer: 1,
        hint: m`$1-\frac1x=0$`,
        explain: m`$x=1$, $f(1)=1$`,
      },
    },
  ],
};
