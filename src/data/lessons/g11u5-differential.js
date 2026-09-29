import { m } from './tex.js';

export default {
  id: 'g11u5-differential',
  topicId: 'g11-u5-differential',
  grade: 11,
  units: 5,
  emoji: '🧭',
  title: 'תרגול מסכם — אנליזה',
  subtitle: 'נגזרת שנייה, שורשים, אינטגרלים ונפחים',
  sections: [
    {
      id: 'concavity',
      emoji: '〰️',
      title: 'קעירות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`$f''>0$ ← $\cup$

$f''<0$ ← $\cap$ · פיתול = הסימן של $f''$ מתחלף`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`לפונקציה $f(x)=x^4-6x^2$ — כמה נקודות פיתול יש?`,
        options: ['0', '1', '2', '3'],
        answer: 2,
        hint: m`$f''=12x^2-12$`,
        explain: m`$12x^2-12=0\Rightarrow x=\pm1$, והסימן מתחלף בשתיהן: 2 נקודות.`,
      },
    },
    {
      id: 'root',
      emoji: '√',
      title: 'שורשים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`תחום: $g(x)\ge0$

$\sqrt{x^2}=|x|$ · אחרי העלאה בריבוע — בודקים פתרונות זרים`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'x =',
        prompt: m`פתרו: $\sqrt{x+2}=x-4$`,
        answer: 7,
        hint: m`$x+2=x^2-8x+16$ ← $x^2-9x+14=0$`,
        explain: m`$x=7$ ✓ ($\sqrt9=3$). $x=2$ זר ($\sqrt4=2\neq-2$).`,
      },
    },
    {
      id: 'ftc',
      emoji: '✨',
      title: 'המשפט היסודי',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`$F_a(x)=\int_a^x f(u)\,du$ ← $F_a'(x)=f(x)$, ו-$F_a(a)=0$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$G(x)=\int_2^x(u^3-u)\,du$. כמה זה $G(2)+G'(2)$?`,
        answer: 6,
        hint: m`$G(2)=0$, ו-$G'(2)=2^3-2$.`,
        explain: m`$0+6=6$`,
      },
    },
    {
      id: 'volume',
      emoji: '🏺',
      title: 'נפח',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`$V=\pi\int_a^b[f(x)]^2\,dx$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מסובבים את $f(x)=\sqrt{x}$ ב-$[0,2]$ סביב ציר $x$. מה הנפח?`,
        options: [m`$\pi$`, m`$2\pi$`, m`$4\pi$`, m`$\sqrt2\pi$`],
        answer: 1,
        hint: m`$\pi\int_0^2x\,dx$`,
        explain: m`$\pi\cdot\frac{4}{2}=2\pi$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: פרמטר',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'בעיה הפוכה',
          md: 'לפעמים נתון השטח, ומחפשים את הפרמטר: כותבים את האינטגרל כביטוי בפרמטר — ומשווים.',
        },
      ],
      challenge: {
        type: 'number',
        label: 'k =',
        prompt: m`השטח בין $f(x)=x^2$ לציר $x$ בתחום $[0,k]$ הוא $9$. מה $k$?`,
        answer: 3,
        hint: m`$\frac{k^3}{3}=9$`,
        explain: m`$k^3=27\Rightarrow k=3$`,
      },
    },
  ],
};
