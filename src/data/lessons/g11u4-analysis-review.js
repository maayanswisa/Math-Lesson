import { m } from './tex.js';

export default {
  id: 'g11u4-analysis-review',
  topicId: 'g11-u4-analysis-review',
  grade: 11,
  units: 4,
  emoji: '🧭',
  title: 'תרגול מסכם — פונקציות וחדו״א',
  subtitle: 'קדם-אנליזה, נגזרות, קיצון ואינטגרלים — הכול ביחד',
  sections: [
    {
      id: 'precalc',
      emoji: '🔭',
      title: 'קדם-אנליזה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: m`תזכורת: $f=\frac1g$`,
          md: m`אסימפטוטה מאונכת באפסי $g$ · אין חיתוך עם ציר $x$ · אותו סימן כמו $g$ · מונוטוניות הפוכה · $f\to0$ כש-$g\to\infty$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`ל-$g(x)=x^2+4$ יש מינימום בנקודה $(0,4)$. מה יש ל-$f(x)=\frac{1}{x^2+4}$ ב-$x=0$?`,
        options: [m`מינימום $\frac14$`, m`מקסימום $\frac14$`, 'אסימפטוטה', m`מקסימום $4$`],
        answer: 1,
        hint: 'מונוטוניות הפוכה.',
        explain: m`המכנה הכי קטן ב-$0$ — ולכן השבר הכי גדול: מקסימום $\frac14$.`,
      },
    },
    {
      id: 'derivative',
      emoji: '📉',
      title: 'נגזרות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת: שני כללים',
          md: m`$\left(\frac pq\right)'=\frac{p'q-pq'}{q^2}$

$\left(\sqrt{q}\right)'=\frac{q'}{2\sqrt q}$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$f(x)=\frac{x}{x+1}$. כמה זה $f'(1)$?`,
        answer: 0.25,
        tolerance: 0.001,
        hint: m`$f'=\frac{1\cdot(x+1)-x\cdot1}{(x+1)^2}=\frac{1}{(x+1)^2}$`,
        explain: m`$f'(1)=\frac{1}{4}=0.25$`,
      },
    },
    {
      id: 'tangent-line',
      emoji: '📏',
      title: 'משוואת משיק',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'תזכורת',
          md: m`המשיק ב-$x_0$: שיפוע $f'(x_0)$, ועובר דרך $(x_0,f(x_0))$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהי משוואת המשיק ל-$f(x)=\sqrt{x}$ בנקודה $x=4$?`,
        options: [m`$y=\frac14x+1$`, m`$y=\frac12x$`, m`$y=4x-14$`, m`$y=\frac14x+2$`],
        answer: 0,
        hint: m`$f(4)=2$, $f'(x)=\frac{1}{2\sqrt x}$ ולכן $f'(4)=\frac14$.`,
        explain: m`$y-2=\frac14(x-4)\Rightarrow y=\frac14x+1$`,
      },
    },
    {
      id: 'optimum',
      emoji: '📦',
      title: 'קיצון',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'תזכורת',
          md: 'משתנה ← פונקציה של משתנה אחד (בעזרת האילוץ) ← תחום ← גזירה ← סוג הקיצון והקצוות.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'תיבה עם בסיס ריבועי וסכום של צלע הבסיס והגובה 9. מה הנפח המקסימלי?',
        answer: 108,
        hint: m`$V=x^2(9-x)$, $V'=18x-3x^2$`,
        explain: m`$V'=0\Rightarrow x=6$, גובה $3$, נפח $36\cdot3=108$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: שטח',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'תזכורת',
          md: m`שטח בין הגרף לציר: מפצלים בנקודות החיתוך, ערך מוחלט לכל חלק שמתחת לציר.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה השטח הכלוא בין $f(x)=4-x^2$ לציר $x$?`,
        answer: 32 / 3,
        tolerance: 0.02,
        hint: m`נחתך בציר ב-$\pm2$. $\int_{-2}^{2}(4-x^2)\,dx$`,
        explain: m`$\left[4x-\frac{x^3}{3}\right]_{-2}^{2}=\frac{16}{3}+\frac{16}{3}=\frac{32}{3}\approx10.67$`,
      },
    },
  ],
};
