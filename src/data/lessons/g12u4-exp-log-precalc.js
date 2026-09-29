import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g12u4-exp-log-precalc',
  topicId: 'g12-u4-exp-log-precalc',
  grade: 12,
  units: 4,
  emoji: '📈',
  title: 'פונקציות מעריכיות ולוגריתמיות',
  subtitle: 'חוקי חזקות, לוגריתם כפעולה הפוכה, ומשוואות',
  sections: [
    {
      id: 'powers',
      emoji: '⚡',
      title: 'חוקי חזקות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'החוקים — גם למעריך שבר',
          md: m`$a^x\cdot a^y=a^{x+y}$

$\frac{a^x}{a^y}=a^{x-y}$

$(a^x)^y=a^{xy}$

$a^{-x}=\frac{1}{a^x}$

$a^{1/n}=\sqrt[n]{a}$`,
        },
        {
          type: 'steps',
          title: m`$8^{2/3}$`,
          steps: [
            { math: m`8^{2/3}=\left(8^{1/3}\right)^2`, note: 'מפרקים את המעריך.' },
            { math: m`=\left(\sqrt[3]8\right)^2=2^2=${c(GREEN, '4')}`, note: 'שורש שלישי, ואז בריבוע.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $16^{3/4}$?`,
        answer: 8,
        hint: m`$\sqrt[4]{16}=2$`,
        explain: m`$2^3=8$`,
      },
    },
    {
      id: 'exp',
      emoji: '📈',
      title: 'הפונקציה המעריכית',
      blocks: [
        {
          type: 'explog',
          a: 2,
          caption: m`$y=a^x$. שנו את הבסיס — מתי היא עולה ומתי יורדת?`,
        },
        {
          type: 'card',
          tone: 'key',
          title: m`$f(x)=a^x$`,
          md: m`מוגדרת לכל $x$ · תמיד **חיובית** · חותכת ב-$(0,1)$ · אסימפטוטה $y=0$

$a>1$ — **עולה** · $0<a<1$ — **יורדת**`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'x =',
        prompt: m`פתרו: $2^{x+1}=32$`,
        answer: 4,
        hint: m`$32=2^5$ — אותו בסיס, משווים מעריכים.`,
        explain: m`$x+1=5\Rightarrow x=4$`,
      },
    },
    {
      id: 'log',
      emoji: '🔍',
      title: 'לוגריתם',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'השאלה ההפוכה',
          md: m`$$\log_a x=y\iff a^y=x$$

"באיזו חזקה צריך להעלות את $a$ כדי לקבל $x$?" — $\log_2 8=3$ כי $2^3=8$.`,
        },
        {
          type: 'explog',
          a: 2,
          showLog: true,
          caption: m`הלוגריתם הוא **תמונת מראה** של המעריכית בישר $y=x$:`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'חוקי לוגריתמים',
          md: m`$\log(xy)=\log x+\log y$

$\log\frac xy=\log x-\log y$

$\log x^k=k\log x$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $\log_3 81$?`,
        answer: 4,
        hint: m`$3^?=81$`,
        explain: m`$3^4=81$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: אי-שוויון',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'בסיס קטן מ-1 הופך את הכיוון',
          md: m`$a>1$: $a^{f}>a^{g}\iff f>g$

$0<a<1$: $a^{f}>a^{g}\iff f${c(RED, '<')}g$ — כי הפונקציה **יורדת**!`,
        },
        {
          type: 'steps',
          title: m`$\left(\frac12\right)^{x}>\frac18$`,
          steps: [
            { math: m`\left(\frac12\right)^{x}>\left(\frac12\right)^{3}`, note: 'אותו בסיס.' },
            { math: m`x${c(VIOLET, '<')}${c(GREEN, '3')}`, note: 'הבסיס קטן מ-1 — הכיוון מתהפך.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה הפתרון של $0.2^{x}\le0.04$?`,
        options: [m`$x\le2$`, m`$x\ge2$`, m`$x\le-2$`, m`$x\ge-2$`],
        answer: 1,
        hint: m`$0.04=0.2^2$, והבסיס קטן מ-1.`,
        explain: m`$0.2^x\le0.2^2\Rightarrow x\ge2$ (הכיוון התהפך).`,
      },
    },
  ],
};
