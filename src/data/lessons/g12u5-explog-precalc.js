import { m } from './tex.js';

export default {
  id: 'g12u5-explog-precalc',
  topicId: 'g12-u5-explog-precalc',
  grade: 12,
  units: 5,
  emoji: '🔢',
  title: 'חזקות ולוגריתמים',
  subtitle: 'חוקים, מעבר בסיס ומשוואות',
  sections: [
    {
      id: 'powers',
      emoji: '⚡',
      title: 'חוקי חזקות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'החוקים',
          md: m`$a^x\cdot a^y=a^{x+y}$

$\frac{a^x}{a^y}=a^{x-y}$

$(a^x)^y=a^{xy}$

$a^{p/q}=\sqrt[q]{a^p}$

$a^{-x}=\frac{1}{a^x}$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $8^{2/3}$?`,
        answer: 4,
        hint: m`$\sqrt[3]{8}=2$`,
        explain: m`$2^2=4$`,
      },
    },
    {
      id: 'logs',
      emoji: '🔍',
      title: 'לוגריתם — החזקה שחסרה',
      blocks: [
        {
          type: 'explog',
          a: 2,
          showLog: true,
          caption: m`הלוגריתם הוא הפונקציה ההפוכה לחזקה — שיקוף בישר $y=x$:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'ההגדרה והחוקים',
          md: m`$\log_ab=c\iff a^c=b$

$\log_a(xy)=\log_ax+\log_ay$

$\log_ax^n=n\log_ax$

מעבר בסיס: $\log_ab=\frac{\log b}{\log a}$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $\log_28+\log_39$?`,
        answer: 5,
        hint: m`$2^3=8$, $3^2=9$`,
        explain: m`$3+2=5$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: משוואה מעריכית',
      blocks: [
        {
          type: 'steps',
          title: m`$4^x-3\cdot2^x-4=0$`,
          steps: [
            { math: m`t=2^x,\;t^2-3t-4=0`, note: m`הצבה — כי $4^x=(2^x)^2=t^2$.` },
            { math: m`t=4,\;t=-1`, note: 'פותרים.' },
            { math: m`2^x=4\Rightarrow x=2`, note: m`חזקה תמיד חיובית — פוסלים את $t=-1$.` },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`פתרו: $\log_2(x+1)+\log_2(x-1)=3$`,
        answer: 3,
        hint: m`$(x+1)(x-1)=8$`,
        explain: m`$x^2=9$ ← $x=3$ (ה-$-3$ לא בתחום).`,
      },
    },
  ],
};
