import { m } from './tex.js';

export default {
  id: 'g10u4-root-function',
  topicId: 'g10-u4-root-function',
  grade: 10,
  units: 4,
  emoji: '√',
  title: 'חדו״א של פונקציית השורש',
  subtitle: 'תחום, נגזרת וחקירה',
  sections: [
    {
      id: 'domain',
      emoji: '🚧',
      title: 'תחום הגדרה',
      blocks: [
        {
          type: 'transformfn',
          families: ['sqrt'],
          caption: m`$y=a\sqrt{x-h}+k$ — הגרף מתחיל בנקודה $(h,k)$:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'מה בתוך השורש',
          md: m`$\sqrt{g(x)}$ מוגדרת כאשר $g(x)\ge0$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה תחום ההגדרה של $\sqrt{x^2-4}$?`,
        options: [m`$x\le-2$ או $x\ge2$`, m`$x\ge2$`, m`$-2\le x\le2$`, m`$x\ge4$`],
        answer: 0,
        hint: m`$x^2\ge4$`,
        explain: m`$|x|\ge2$`,
      },
    },
    {
      id: 'derivative',
      emoji: '📉',
      title: 'הנגזרת',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שורש של פונקציה',
          md: m`$$\left(\sqrt{g(x)}\right)'=\frac{g'(x)}{2\sqrt{g(x)}}$$

$(\sqrt x)'=\frac{1}{2\sqrt x}$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.001,
        prompt: m`$f(x)=\sqrt{2x+5}$. כמה זה $f'(2)$?`,
        answer: 1 / 3,
        hint: m`$\frac{2}{2\sqrt9}$`,
        explain: m`$\frac{2}{6}=\frac13$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: קיצון עם שורש',
      blocks: [
        {
          type: 'tangent',
          fn: 'root',
          caption: m`$f(x)=x\sqrt{4-x}$ — מוגדרת עד $4$. איפה המקסימום?`,
        },
        {
          type: 'steps',
          title: m`$f'(x)=\sqrt{4-x}-\frac{x}{2\sqrt{4-x}}$`,
          steps: [
            { math: m`\frac{2(4-x)-x}{2\sqrt{4-x}}=\frac{8-3x}{2\sqrt{4-x}}`, note: 'מכנה משותף.' },
            { math: m`8-3x=0\Rightarrow x=\frac83`, note: 'מקסימום.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה נקודת הקיצון ($x$) של $f(x)=\sqrt{x}-x$?`,
        answer: 0.25,
        tolerance: 0.001,
        hint: m`$\frac{1}{2\sqrt x}=1$`,
        explain: m`$\sqrt x=\frac12$ ← $x=\frac14$`,
      },
    },
  ],
};
