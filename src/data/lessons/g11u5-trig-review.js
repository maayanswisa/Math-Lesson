import { m } from './tex.js';

export default {
  id: 'g11u5-trig-review',
  topicId: 'g11-u5-trig-review',
  grade: 11,
  units: 5,
  emoji: '🧭',
  title: 'תרגול מסכם — טריגונומטריה',
  subtitle: 'זהויות, גרפים, נגזרות ואינטגרלים',
  sections: [
    {
      id: 'identity',
      emoji: '🔣',
      title: 'זהויות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`$\cos2A=1-2\sin^2A$ · $\sin2A=2\sin A\cos A$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$\sin A=0.5$. כמה זה $\cos2A$?`,
        answer: 0.5,
        tolerance: 0.001,
        hint: m`$1-2\cdot0.25$`,
        explain: m`$1-0.5=0.5$ (ובדיקה: $A=30°$, $\cos60°=0.5$ ✓)`,
      },
    },
    {
      id: 'graph',
      emoji: '🌊',
      title: 'גרף',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`$A\sin(Bx+C)+D$: משרעת $|A|$, מחזור $\frac{2\pi}{|B|}$, טווח $[D-|A|,D+|A|]$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`לאיזו פונקציה טווח $[1,5]$ ומחזור $\pi$?`,
        options: [m`$2\sin(2x)+3$`, m`$4\sin(x)+1$`, m`$2\sin(x)+3$`, m`$3\sin(2x)+2$`],
        answer: 0,
        hint: 'אמצע הטווח הוא D, חצי רוחבו הוא |A|.',
        explain: m`$D=3$, $|A|=2$, ו-$\frac{2\pi}{2}=\pi$.`,
      },
    },
    {
      id: 'derivative',
      emoji: '📉',
      title: 'נגזרת',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`$(\sin x)'=\cos x$ · $(\cos x)'=-\sin x$ · $(\tan x)'=\frac{1}{\cos^2x}$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$f(x)=\cos(2x)$. כמה זה $f'\left(\frac{\pi}{4}\right)$?`,
        answer: -2,
        hint: m`$f'(x)=-2\sin(2x)$`,
        explain: m`$-2\sin\frac{\pi}{2}=-2$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: שטח',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`$\int\sin x\,dx=-\cos x+C$ · מחזוריות — חוסכת חישובים`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה השטח הכלוא בין $y=\sin x$ לציר $x$ בתחום $[0,3\pi]$?`,
        answer: 6,
        hint: 'שלוש קשתות, וכל אחת בשטח 2.',
        explain: m`$3\cdot2=6$ (האינטגרל עצמו היה $2$ — קשת אחת מתבטלת!)`,
      },
    },
  ],
};
