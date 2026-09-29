import { m } from './tex.js';

export default {
  id: 'g10u5-rational-root',
  topicId: 'g10-u5-rational-root',
  grade: 10,
  units: 5,
  emoji: '🧮',
  title: 'פונקציות רציונליות ושורש מורכבת',
  subtitle: 'כלל המנה, אסימפטוטות וחור בגרף',
  sections: [
    {
      id: 'quotient',
      emoji: '➗',
      title: 'כלל המנה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שתי נוסחאות',
          md: m`$\left(\frac1x\right)'=-\frac{1}{x^2}$

$$\left(\frac fg\right)'=\frac{f'g-fg'}{g^2}$$
`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$f(x)=\frac{x}{x+1}$. כמה זה $f'(0)$?`,
        answer: 1,
        hint: m`$\frac{(x+1)-x}{(x+1)^2}$`,
        explain: m`$\frac{1}{1}=1$`,
      },
    },
    {
      id: 'asymptote',
      emoji: '🚧',
      title: 'אסימפטוטה או חור?',
      blocks: [
        {
          type: 'tangent',
          fn: 'quotient',
          caption: m`$f(x)=\frac{x^2}{x-1}$ — אסימפטוטה ב-$x=1$:`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'לפני שמכריזים על אסימפטוטה — מצמצמים',
          md: m`$\frac{x^2-1}{x-1}=\frac{(x-1)(x+1)}{x-1}=x+1$ עבור $x\ne1$. אין אסימפטוטה — רק **חור** (אי-רציפות סליקה) בנקודה $(1,2)$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`ל-$f(x)=\frac{x-2}{x^2-4}$ ב-$x=2$ יש:`,
        options: ['חור (אי-רציפות סליקה)', 'אסימפטוטה מאונכת', 'קיצון', 'חיתוך עם הציר'],
        answer: 0,
        hint: m`$x^2-4=(x-2)(x+2)$`,
        explain: m`מצטמצם ל-$\frac{1}{x+2}$ — חור ב-$x=2$, אסימפטוטה ב-$x=-2$.`,
      },
    },
    {
      id: 'root',
      emoji: '🏆',
      title: 'שלב הבוס: שורש של פונקציה',
      blocks: [
        {
          type: 'tangent',
          fn: 'sqrtAsym',
          caption: m`$f(x)=\frac{x}{\sqrt{x^2+1}}$ — שתי אסימפטוטות אופקיות:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`$\left(\sqrt{g}\right)'=\frac{g'}{2\sqrt g}$, והתחום: $g\ge0$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.001,
        prompt: m`$f(x)=\sqrt{x^2+9}$. כמה זה $f'(4)$?`,
        answer: 0.8,
        hint: m`$\frac{2x}{2\sqrt{x^2+9}}$`,
        explain: m`$\frac{4}{5}=0.8$`,
      },
    },
  ],
};
