import { m } from './tex.js';

export default {
  id: 'g10u4-poly-root',
  topicId: 'g10-u4-poly-root',
  grade: 10,
  units: 4,
  emoji: '🧭',
  title: 'תרגול מסכם — אלגברה וחדו״א',
  subtitle: 'משוואות, טרנספורמציות, נגזרות וקיצון',
  sections: [
    {
      id: 'algebra',
      emoji: '🧰',
      title: 'משוואה',
      blocks: [{ type: 'card', tone: 'tip', title: 'תזכורת', md: m`משוואה עם שורש — בודקים פתרונות זרים!` }],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`פתרו: $\sqrt{x+6}=x$`,
        answer: 3,
        hint: m`$x^2-x-6=0$`,
        explain: m`$x=3$ או $x=-2$; רק $3$ מתאים.`,
      },
    },
    {
      id: 'precalc',
      emoji: '🔭',
      title: 'טרנספורמציה',
      blocks: [{ type: 'card', tone: 'tip', title: 'תזכורת', md: m`$f(x-h)+k$: ימינה $h$, למעלה $k$.` }],
      challenge: {
        type: 'choice',
        prompt: m`הקודקוד של $y=-2(x-1)^2+5$ הוא:`,
        options: [m`$(1,5)$`, m`$(-1,5)$`, m`$(1,-5)$`, m`$(5,1)$`],
        answer: 0,
        hint: m`$h=1$, $k=5$`,
        explain: m`$(1,5)$ — מקסימום, כי $a<0$.`,
      },
    },
    {
      id: 'derivative',
      emoji: '📉',
      title: 'נגזרת',
      blocks: [{ type: 'card', tone: 'tip', title: 'תזכורת', md: m`$(fg)'=f'g+fg'$` }],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$f(x)=x^2(x-3)$. כמה זה $f'(1)$?`,
        answer: -3,
        hint: m`$2x(x-3)+x^2$`,
        explain: m`$2\cdot(-2)+1=-3$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: קיצון',
      blocks: [{ type: 'card', tone: 'tip', title: 'תזכורת', md: m`$f'=0$ ובדיקת סימן.` }],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה ערך המינימום המקומי של $f(x)=x^3-12x$?`,
        answer: -16,
        hint: m`$f'=3x^2-12$ ← $x=2$`,
        explain: m`$f(2)=8-24=-16$`,
      },
    },
  ],
};
