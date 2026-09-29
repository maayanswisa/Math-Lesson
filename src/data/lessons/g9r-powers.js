import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g9r-powers',
  topicId: 'g9r-powers',
  grade: 9,
  emoji: '⚡',
  title: 'חזקות, שורשים וכתיב מדעי',
  subtitle: 'חוקי החזקות, מעריך אפס ושלילי, כתיב מדעי ותכונות השורש',
  sections: [
    {
      id: 'laws',
      emoji: '📜',
      title: 'חוקי החזקות',
      blocks: [
        {
          type: 'text',
          md: m`$a^3$ פירושו $a\cdot a\cdot a$ — **הבסיס** $a$ כפול עצמו **3 פעמים** (המעריך).

מזה נובעים כל החוקים:`,
        },
        {
          type: 'steps',
          title: 'למה מחברים מעריכים?',
          steps: [
            { math: m`a^2\cdot a^3=(a\cdot a)\cdot(a\cdot a\cdot a)`, note: 'פותחים כל חזקה.' },
            { math: m`=a^{${c(VIOLET, '2+3')}}=a^5`, note: 'סופרים: 5 פעמים $a$. **כפל → מחברים מעריכים.**' },
          ],
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שלושת החוקים',
          md: m`$a^m\cdot a^n=a^{m+n}$ · $\dfrac{a^m}{a^n}=a^{m-n}$ · $(a^m)^n=a^{m\cdot n}$`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'רק כשהבסיס זהה!',
          md: m`$2^3\cdot3^2$ — בסיסים שונים, **אין** חוק. $a^2+a^3\neq a^5$ — חוקי החזקות הם לכפל, **לא** לחיבור.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה שווה $(x^3)^4$?`,
        options: [m`$x^7$`, m`$x^{12}$`, m`$x^{81}$`, m`$4x^3$`],
        answer: 1,
        hint: 'חזקה של חזקה — כופלים מעריכים.',
        explain: m`$(x^3)^4=x^{3\cdot4}=x^{12}$`,
      },
    },
    {
      id: 'zero-negative',
      emoji: '0️⃣',
      title: 'מעריך אפס ומעריך שלילי',
      blocks: [
        {
          type: 'steps',
          title: 'מה זה בכלל חזקה של אפס?',
          steps: [
            { math: m`\frac{a^3}{a^3}=1`, note: 'כל מספר (לא אפס) חלקי עצמו = 1.' },
            { math: m`\frac{a^3}{a^3}=a^{3-3}=a^0`, note: 'לפי חוק החילוק.' },
            { math: m`${c(GREEN, 'a^0=1')}`, note: 'אז חייב להיות $a^0=1$!' },
          ],
        },
        {
          type: 'steps',
          title: 'ומעריך שלילי?',
          steps: [
            { math: m`\frac{a^2}{a^5}=\frac{a\cdot a}{a\cdot a\cdot a\cdot a\cdot a}=\frac{1}{a^3}`, note: 'מצמצמים.' },
            { math: m`\frac{a^2}{a^5}=a^{2-5}=a^{-3}`, note: 'לפי החוק.' },
            { math: m`${c(GREEN, 'a^{-3}=\\frac{1}{a^3}')}`, note: '**מעריך שלילי = ההופכי.**' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה שווה $2^{-3}$?`,
        options: [m`$-8$`, m`$-6$`, m`$\frac{1}{8}$`, m`$\frac{1}{6}$`],
        answer: 2,
        hint: 'מעריך שלילי = הופכי, לא מספר שלילי!',
        explain: m`$2^{-3}=\frac{1}{2^3}=\frac18$`,
      },
    },
    {
      id: 'scientific',
      emoji: '🔬',
      title: 'כתיב מדעי',
      blocks: [
        {
          type: 'text',
          md: m`מספר ענק או זעיר כותבים כ: **מספר בין 1 ל-10** × **חזקה של 10**.

$5{,}300{,}000=5.3\times10^{6}$ · $0.00042=4.2\times10^{-4}$`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'איך סופרים?',
          md: m`המעריך = כמה מקומות זזה הנקודה. מספר **גדול** → מעריך **חיובי**; מספר **קטן** מ-1 → מעריך **שלילי**.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איך כותבים $0.0036$ בכתיב מדעי?`,
        options: [m`$3.6\times10^{3}$`, m`$3.6\times10^{-3}$`, m`$36\times10^{-4}$`, m`$0.36\times10^{-2}$`],
        answer: 1,
        hint: 'המספר בין 1 ל-10 הוא 3.6. כמה מקומות זזה הנקודה, ולאיזה כיוון?',
        explain: m`הנקודה זזה 3 מקומות ימינה: $3.6\times10^{-3}$. (36 ו-0.36 אינם בין 1 ל-10)`,
      },
    },
    {
      id: 'roots',
      emoji: '🏆',
      title: 'שלב הבוס: שורשים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תכונות השורש',
          md: m`$\sqrt{a\cdot b}=\sqrt a\cdot\sqrt b$ · $\sqrt{\dfrac ab}=\dfrac{\sqrt a}{\sqrt b}$ (עבור $a,b\ge0$)`,
        },
        {
          type: 'steps',
          title: m`מפשטים: $\sqrt{50}$`,
          steps: [
            { math: m`\sqrt{50}=\sqrt{${c(VIOLET, '25')}\cdot2}`, note: 'מחפשים ריבוע שלם שמתחלק בו.' },
            { math: m`=\sqrt{25}\cdot\sqrt2=${c(GREEN, '5\\sqrt2')}`, note: 'מפרקים לפי התכונה.' },
          ],
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'אין חוק לחיבור',
          md: m`$\sqrt{9+16}=\sqrt{25}=5$, אבל $\sqrt9+\sqrt{16}=3+4=7$. ${c(RED, '\\sqrt{a+b}\\neq\\sqrt a+\\sqrt b')}`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה שווה $\sqrt{72}$?`,
        options: [m`$6\sqrt2$`, m`$8\sqrt3$`, m`$2\sqrt{18}$`, m`$36\sqrt2$`],
        answer: 0,
        hint: m`$72=36\cdot2$`,
        explain: m`$\sqrt{36\cdot2}=6\sqrt2$. ($2\sqrt{18}$ נכון אבל לא מפושט עד הסוף)`,
      },
    },
  ],
};
