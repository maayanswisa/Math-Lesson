import { m } from './tex.js';

export default {
  id: 'g12u3-quadratic-model',
  topicId: 'g12-u3-quadratic-model',
  grade: 12,
  units: 3,
  emoji: '⛲',
  title: 'מודל ריבועי',
  subtitle: 'פרבולות בעולם האמיתי: זריקות, רווחים ושטחים',
  sections: [
    {
      id: 'vertex',
      emoji: '⛰️',
      title: 'הקודקוד',
      blocks: [
        {
          type: 'parabola',
          mode: 'standard',
          a: -1,
          b: 4,
          c: 0,
          caption: m`$y=ax^2+bx+c$. שנו את המקדמים — איפה הקודקוד?`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הנקודה הגבוהה (או הנמוכה)',
          md: m`$$x_v=-\frac{b}{2a}$$

$a<0$ ← מקסימום. $a>0$ ← מינימום.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ׳',
        prompt: m`גובה כדור: $h(t)=-5t^2+20t+1$ (מטרים, $t$ בשניות). מה הגובה המקסימלי?`,
        answer: 21,
        hint: m`$t_v=-\frac{20}{-10}=2$`,
        explain: m`$h(2)=-20+40+1=21$ מטר.`,
      },
    },
    {
      id: 'roots',
      emoji: '🎯',
      title: 'מתי נוחת?',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'נוסחת השורשים',
          md: m`$$x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$

שורש שלילי בהקשר של זמן — **לא רלוונטי**.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'שניות',
        prompt: m`$h(t)=-5t^2+10t+15$. אחרי כמה שניות הכדור נוחת?`,
        answer: 3,
        hint: m`$-5(t^2-2t-3)=0$`,
        explain: m`$(t-3)(t+1)=0$ ← $t=3$`,
      },
    },
    {
      id: 'profit',
      emoji: '🏆',
      title: 'שלב הבוס: רווח מקסימלי',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'מחיר וכמות',
          md: m`מחיר גבוה ← פחות קונים. רווח $=$ מחיר $\times$ כמות ← פונקציה ריבועית, והמקסימום בקודקוד.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '₪',
        prompt: m`הרווח היומי של דוכן: $R(x)=-2x^2+80x-200$ ($x$ — מחיר). באיזה מחיר הרווח מקסימלי?`,
        answer: 20,
        hint: m`$-\frac{80}{-4}$`,
        explain: m`$x=20$ ₪, רווח $600$ ₪.`,
      },
    },
  ],
};
