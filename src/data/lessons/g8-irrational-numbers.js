import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g8-irrational-numbers',
  topicId: 'g8-irrational-numbers',
  grade: 8,
  emoji: '√',
  title: 'שורש ריבועי ומספר אי-רציונלי',
  subtitle: 'אומדן שורשים, רציונלי מול אי-רציונלי, ושבר עשרוני מחזורי',
  sections: [
    {
      id: 'sqrt',
      emoji: '🟩',
      title: 'שורש ריבועי',
      blocks: [
        {
          type: 'text',
          md: m`$\sqrt{25}$ שואל: **איזה מספר, כפול עצמו, נותן 25?** התשובה $5$, כי $5\cdot5=25$.

המספרים $1,4,9,16,25,36,\dots$ נקראים **ריבועים שלמים** — להם יש שורש שלם.`,
        },
        {
          type: 'card',
          tone: 'why',
          title: 'למה "ריבועי"?',
          md: m`ריבוע ששטחו 25 — אורך הצלע שלו הוא $\sqrt{25}=5$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $\sqrt{81}$?`,
        answer: 9,
        hint: 'איזה מספר כפול עצמו נותן 81?',
        explain: m`$9\cdot9=81$, ולכן $\sqrt{81}=9$.`,
      },
    },
    {
      id: 'estimate',
      emoji: '🔭',
      title: 'אומדן שורש',
      blocks: [
        {
          type: 'text',
          md: m`ל-$\sqrt{20}$ אין תשובה שלמה. אבל אפשר לדעת **בין אילו מספרים** הוא נמצא:`,
        },
        {
          type: 'steps',
          title: m`בין אילו שלמים נמצא $\sqrt{20}$?`,
          steps: [
            { math: m`16<${c(RED, '20')}<25`, note: 'מחפשים ריבועים שלמים מסביב ל-20.' },
            { math: m`\sqrt{16}<\sqrt{20}<\sqrt{25}`, note: 'לוקחים שורש לכולם.' },
            { math: m`${c(GREEN, '4<\\sqrt{20}<5')}`, note: m`ו-20 קרוב יותר ל-16, אז $\sqrt{20}$ קצת פחות מ-4.5 (בערך 4.47).` },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`בין אילו שני מספרים שלמים נמצא $\sqrt{50}$?`,
        options: ['6 ו-7', '7 ו-8', '24 ו-26', '5 ו-6'],
        answer: 1,
        hint: m`אילו ריבועים שלמים מקיפים את 50?`,
        explain: m`$49<50<64$, ולכן $7<\sqrt{50}<8$.`,
      },
    },
    {
      id: 'rational',
      emoji: '🔢',
      title: 'רציונלי או אי-רציונלי?',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'רציונלי',
          md: m`אפשר לכתוב כשבר של שלמים $\frac{a}{b}$. בעשרוני: **סופי** ($\frac14=0.25$) או **מחזורי** ($\frac13=0.333\ldots$).`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'אי-רציונלי',
          md: m`**אי אפשר** לכתוב כשבר. בעשרוני: **אינסופי ולא מחזורי** — אין שום דפוס חוזר.

דוגמאות: $\sqrt2=1.41421356\ldots$, $\pi=3.14159265\ldots$, $\sqrt{20}$`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'כלל אצבע לשורשים',
          md: m`$\sqrt{n}$ רציונלי **רק** אם $n$ ריבוע שלם. $\sqrt{36}=6$ רציונלי, $\sqrt{35}$ לא.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזה מהמספרים הבאים **אי-רציונלי**?',
        options: [m`$\sqrt{49}$`, m`$0.\overline{3}$`, m`$\sqrt{12}$`, m`$\frac{22}{7}$`],
        answer: 2,
        hint: 'חפשו שורש של מספר שאינו ריבוע שלם.',
        explain: m`12 אינו ריבוע שלם, ולכן $\sqrt{12}$ אי-רציונלי. $\sqrt{49}=7$, ו-$0.\overline3=\frac13$.`,
      },
    },
    {
      id: 'repeating',
      emoji: '🔁',
      title: 'שלב הבוס: מחזורי → שבר',
      blocks: [
        {
          type: 'text',
          md: m`כל שבר עשרוני מחזורי (כמו $0.\overline{45}=0.454545\ldots$) אפשר להפוך בחזרה לשבר:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הטריק',
          md: m`**במונה** — המחזור. **במכנה** — ספרות $9$, כמספר הספרות במחזור.`,
        },
        {
          type: 'steps',
          title: m`$0.\overline{45}$ כשבר`,
          steps: [
            { math: m`\frac{${c(VIOLET, '45')}}{${c(RED, '99')}}`, note: 'מחזור של 2 ספרות → 99.' },
            { math: m`=\frac{5}{11}`, note: 'מצמצמים ב-9.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איזה שבר שווה ל-$0.\overline{7}$?`,
        options: [m`$\frac{7}{10}$`, m`$\frac{7}{9}$`, m`$\frac{7}{99}$`, m`$\frac{1}{7}$`],
        answer: 1,
        hint: 'מחזור של ספרה אחת → תשע אחד במכנה.',
        explain: m`$0.\overline7=\frac79$`,
      },
    },
  ],
};
