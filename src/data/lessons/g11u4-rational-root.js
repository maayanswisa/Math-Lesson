import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g11u4-rational-root',
  topicId: 'g11-u4-rational-root',
  grade: 11,
  units: 4,
  emoji: '📉',
  title: 'חדו״א של פונקציה רציונלית ופונקציית שורש',
  subtitle: 'כלל המנה, נגזרת של שורש, וקיצון — גם בקצה התחום',
  sections: [
    {
      id: 'quotient',
      emoji: '➗',
      title: 'כלל המנה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'נגזרת של מנה',
          md: m`$$\left(\frac{p}{q}\right)'=\frac{p'q-pq'}{q^2}$$
"נגזרת העליון כפול התחתון, **פחות** העליון כפול נגזרת התחתון — חלקי התחתון בריבוע".`,
        },
        {
          type: 'steps',
          title: m`$f(x)=\frac{x^2}{x-1}$`,
          steps: [
            { math: m`p=x^2,\ p'=2x\qquad q=x-1,\ q'=1`, note: 'מזהים חלקים.' },
            { math: m`f'=\frac{${c(VIOLET, '2x')}(x-1)-x^2\cdot${c(VIOLET, '1')}}{(x-1)^2}`, note: 'מציבים בנוסחה.' },
            { math: m`f'=${c(GREEN, '\\frac{x^2-2x}{(x-1)^2}')}`, note: 'מפשטים את המונה.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהי הנגזרת של $f(x)=\frac{3}{x+2}$?`,
        options: [m`$\frac{3}{(x+2)^2}$`, m`$-\frac{3}{(x+2)^2}$`, m`$\frac{-3x}{(x+2)^2}$`, m`$3$`],
        answer: 1,
        hint: m`$p=3$ ולכן $p'=0$. נשאר רק $-p\cdot q'$ במונה.`,
        explain: m`$f'=\frac{0\cdot(x+2)-3\cdot1}{(x+2)^2}=-\frac{3}{(x+2)^2}$`,
      },
    },
    {
      id: 'extremum',
      emoji: '⛰️',
      title: 'משיק אופקי = קיצון',
      blocks: [
        {
          type: 'tangent',
          fn: 'quotient',
          x: -1.5,
          caption: m`הזיזו את הנקודה. איפה המשיק אופקי? בדקו מול $f'=\frac{x^2-2x}{(x-1)^2}$:`,
        },
        {
          type: 'steps',
          title: m`קיצון של $f(x)=\frac{x^2}{x-1}$`,
          steps: [
            { math: m`x^2-2x=0\ \Rightarrow\ x=0,\ x=2`, note: 'משווים את המונה של f′ לאפס (המכנה חיובי).' },
            { math: m`(0,\ ${c(RED, '0')})`, note: 'מקסימום: לפני 0 הנגזרת חיובית, אחריו שלילית.' },
            { math: m`(2,\ ${c(GREEN, '4')})`, note: 'מינימום.' },
            { math: m`x=1`, note: 'ביניהן — אסימפטוטה מאונכת. לכן המקסימום (0) קטן מהמינימום (4)!' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'x =',
        prompt: m`לפונקציה $f(x)=x+\frac{4}{x}$ יש נקודת מינימום בתחום $x>0$. באיזה $x$?`,
        answer: 2,
        hint: m`$f'(x)=1-\frac{4}{x^2}$. מתי זה $0$?`,
        explain: m`$\frac{4}{x^2}=1\Rightarrow x^2=4\Rightarrow x=2$ (בתחום החיובי).`,
      },
    },
    {
      id: 'root',
      emoji: '√',
      title: 'נגזרת של שורש',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'כלל השרשרת לשורש',
          md: m`$$\left(\sqrt{q(x)}\right)'=\frac{q'(x)}{2\sqrt{q(x)}}$$
ובשורש-מכפלה משתמשים גם בכלל המכפלה: $(p\sqrt q)'=p'\sqrt q+p\cdot\frac{q'}{2\sqrt q}$`,
        },
        {
          type: 'tangent',
          fn: 'root',
          x: 1,
          caption: m`$f(x)=x\sqrt{4-x}$ מוגדרת רק עד $x=4$. חפשו את המקסימום — ושימו לב מה קורה ליד הקצה:`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהי הנגזרת של $f(x)=\sqrt{2x+5}$?`,
        options: [m`$\frac{1}{2\sqrt{2x+5}}$`, m`$\frac{1}{\sqrt{2x+5}}$`, m`$\frac{2}{\sqrt{2x+5}}$`, m`$2\sqrt{2x+5}$`],
        answer: 1,
        hint: m`$q'=2$, ומחלקים ב-$2\sqrt{q}$.`,
        explain: m`$\frac{2}{2\sqrt{2x+5}}=\frac{1}{\sqrt{2x+5}}$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: קיצון בקצה התחום',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'לא רק איפה ש-f′=0',
          md: m`בפונקציית שורש יש לתחום **קצה**. בקצה עשויה להיות נקודת קיצון — גם אם הנגזרת שם לא מתאפסת (או בכלל לא מוגדרת)!

$f(x)=x\sqrt{4-x}$: בקצה $x=4$ מקבלים $f(4)=0$. משמאל הפונקציה יורדת אל הקצה — ולכן $(4,0)$ היא **מינימום קצה**.`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'x =',
        prompt: m`מצאו את נקודת המקסימום הפנימית של $f(x)=x\sqrt{4-x}$. (רמז: $f'(x)=\frac{8-3x}{2\sqrt{4-x}}$)`,
        answer: 8 / 3,
        tolerance: 0.01,
        hint: 'השוו את המונה לאפס.',
        explain: m`$8-3x=0\Rightarrow x=\frac83\approx2.67$`,
      },
    },
  ],
};
