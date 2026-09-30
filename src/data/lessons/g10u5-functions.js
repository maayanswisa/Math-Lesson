import { m } from './tex.js';

export default {
  id: 'g10u5-functions',
  topicId: 'g10-u5-functions',
  grade: 10,
  units: 5,
  emoji: '🧭',
  title: 'תרגול מסכם — קדם-אנליזה',
  subtitle: 'חזקות, פולינומים, פעולות והרכבה',
  sections: [
    {
      id: 'parity',
      emoji: '🪞',
      title: 'זוגיות',
      blocks: [{ type: 'card', tone: 'tip', title: 'תזכורת', md: m`$x^n$: $n$ זוגי ← זוגית; אי-זוגי ← אי-זוגית.` }],
      challenge: {
        type: 'choice',
        prompt: m`$f(x)=x^4-3x^2+1$ היא:`,
        options: ['זוגית', 'אי-זוגית', 'לא זוגית ולא אי-זוגית', 'לא מוגדרת'],
        answer: 0,
        hint: 'רק חזקות זוגיות.',
        explain: m`$f(-x)=f(x)$`,
      },
    },
    {
      id: 'roots',
      emoji: '✖️',
      title: 'ריבוי שורשים',
      blocks: [{ type: 'card', tone: 'tip', title: 'תזכורת', md: 'ריבוי אי-זוגי — חוצה; זוגי — נוגע.' }],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`בכמה נקודות הגרף של $f(x)=(x-1)^2(x+3)^3x$ **חוצה** את ציר $x$?`,
        answer: 2,
        hint: m`ריבויים: $2$, $3$, $1$.`,
        explain: m`חוצה ב-$-3$ וב-$0$; נוגע ב-$1$.`,
      },
    },
    {
      id: 'compose',
      emoji: '⚙️',
      title: 'הרכבה',
      blocks: [{ type: 'card', tone: 'tip', title: 'תזכורת', md: m`$f(g(x))$ — קודם $g$.` }],
      challenge: {
        type: 'choice',
        prompt: m`$f(x)=\sqrt x$, $g(x)=x-4$. מה התחום של $f(g(x))$?`,
        options: [m`$x\ge4$`, m`$x\ge0$`, m`$x\ge-4$`, m`$x\le4$`],
        answer: 0,
        hint: m`$x-4\ge0$`,
        explain: m`$x\ge4$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: פונקציה הפוכה',
      blocks: [{ type: 'card', tone: 'tip', title: 'תזכורת', md: m`מחליפים $x\leftrightarrow y$ ומבודדים.` }],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$f(x)=\frac{x+1}{2}$. כמה זה $f^{-1}(5)$?`,
        answer: 9,
        hint: m`$\frac{x+1}{2}=5$`,
        explain: m`$x=9$`,
      },
    },
  ],
};
