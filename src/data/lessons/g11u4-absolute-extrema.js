import { c, GREEN, m, RED } from './tex.js';

export default {
  id: 'g11u4-absolute-extrema',
  topicId: 'g11-u4-absolute-extrema',
  grade: 11,
  units: 4,
  emoji: '🏔️',
  title: 'מינימום ומקסימום מוחלטים',
  subtitle: 'הערך הגדול והקטן ביותר בתחום — כולל הקצוות',
  sections: [
    {
      id: 'idea',
      emoji: '💡',
      title: 'מקומי מול מוחלט',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'בתחום סגור [a, b]',
          md: m`1. מוצאים את הנקודות **בתוך** התחום שבהן $f'(x)=0$
2. מחשבים את $f$ בנקודות האלה **ובשני הקצוות**
3. הגדול ביותר — **מקסימום מוחלט**; הקטן ביותר — **מינימום מוחלט**`,
        },
        {
          type: 'steps',
          title: m`$f(x)=x^3-3x$ בתחום $[0,3]$`,
          steps: [
            { math: m`f'(x)=3x^2-3=0\Rightarrow x=1`, note: 'x=−1 מחוץ לתחום — לא מעניין אותנו.' },
            { math: m`f(0)=0,\quad f(1)=-2,\quad f(3)=18`, note: 'מחשבים בנקודה הפנימית ובקצוות.' },
            { math: m`\max=${c(GREEN, '18')}\ (x=3)\qquad\min=${c(RED, '-2')}\ (x=1)`, note: 'המקסימום המוחלט בקצה התחום!' },
          ],
        },
        {
          type: 'tangent',
          fn: 'cubic',
          x: 1,
          caption: 'הגרף של x³ − 3x: שימו לב שבקצה ימינה הפונקציה מגיעה גבוה יותר מנקודת המקסימום המקומי.',
        },
      ],
      challenge: {
        type: 'number',
        label: 'max =',
        prompt: m`מהו המקסימום המוחלט של $f(x)=x^2-4x$ בתחום $[0,5]$?`,
        answer: 5,
        hint: m`$f'(x)=2x-4=0\Rightarrow x=2$. חשבו את $f(0)$, $f(2)$, $f(5)$.`,
        explain: m`$f(0)=0$, $f(2)=-4$, $f(5)=5$. המקסימום המוחלט $5$ (בקצה).`,
      },
    },
    {
      id: 'rational',
      emoji: '➗',
      title: 'פונקציה רציונלית',
      blocks: [
        {
          type: 'steps',
          title: m`$f(x)=x+\frac4x$ בתחום $[1,5]$`,
          steps: [
            { math: m`f'(x)=1-\frac{4}{x^2}=0\Rightarrow x=2`, note: 'בתוך התחום.' },
            { math: m`f(1)=5,\quad f(2)=4,\quad f(5)=5.8`, note: 'משווים.' },
            { math: m`\max=${c(GREEN, '5.8')},\quad\min=${c(RED, '4')}`, note: 'מקסימום בקצה x=5, מינימום ב-x=2.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'min =',
        prompt: m`מהו המינימום המוחלט של $f(x)=x+\frac9x$ בתחום $[1,6]$?`,
        answer: 6,
        hint: m`$f'(x)=0$ ב-$x=3$. השוו ל-$f(1)$ ול-$f(6)$.`,
        explain: m`$f(1)=10$, $f(3)=6$, $f(6)=7.5$. המינימום המוחלט $6$.`,
      },
    },
    {
      id: 'root',
      emoji: '√',
      title: 'פונקציית שורש',
      blocks: [
        {
          type: 'steps',
          title: m`$f(x)=\sqrt x-\frac x2$ בתחום $[0,4]$`,
          steps: [
            { math: m`f'(x)=\frac{1}{2\sqrt x}-\frac12=0\Rightarrow x=1`, note: 'נקודה פנימית.' },
            { math: m`f(0)=0,\quad f(1)=0.5,\quad f(4)=0`, note: 'משווים.' },
            { math: m`\max=${c(GREEN, '0.5')},\quad\min=${c(RED, '0')}`, note: 'המינימום המוחלט בשני הקצוות.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'max =',
        prompt: m`מהו המקסימום המוחלט של $f(x)=2\sqrt x-x$ בתחום $[0,9]$?`,
        answer: 1,
        hint: m`$f'(x)=\frac{1}{\sqrt x}-1=0\Rightarrow x=1$.`,
        explain: m`$f(0)=0$, $f(1)=1$, $f(9)=6-9=-3$. המקסימום המוחלט $1$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: כשאין קיצון מוחלט',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'תחום פתוח או אינסופי',
          md: m`$f(x)=x+\frac4x$ בתחום $x>0$: יש **מינימום מוחלט** $4$ (ב-$x=2$), אבל **אין מקסימום מוחלט** — ליד $0$ ובאינסוף הפונקציה גדלה בלי גבול.

$f(x)=\frac1x$ בתחום $x>0$: מתקרבת ל-$0$ אבל אף פעם לא מגיעה — אין מינימום מוחלט.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`לפונקציה $f(x)=\frac{1}{x^2+1}$ (בכל המספרים). מה נכון?`,
        options: [m`יש מקסימום מוחלט $1$, ואין מינימום מוחלט`, m`יש מינימום מוחלט $0$`, m`אין קיצון מוחלט בכלל`, m`יש מקסימום מוחלט $1$ ומינימום מוחלט $0$`],
        answer: 0,
        hint: m`מתי המכנה הכי קטן? האם השבר מגיע ל-$0$?`,
        explain: m`המכנה מינימלי ב-$x=0$, ולכן $f(0)=1$ הוא מקסימום מוחלט. השבר תמיד חיובי ומתקרב ל-$0$ בלי להגיע — אין מינימום מוחלט.`,
      },
    },
  ],
};
