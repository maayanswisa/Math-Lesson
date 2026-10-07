import { c, GREEN, m, RED } from './tex.js';

export default {
  id: 'g11u4-root-equations',
  topicId: 'g11-u4-root-equations',
  grade: 11,
  units: 4,
  emoji: '√',
  title: 'פונקציות שורש: תחום, משוואות ומשיק',
  subtitle: 'מה מותר מתחת לשורש, איך פותרים משוואה עם שורש — ולמה חייבים לבדוק',
  sections: [
    {
      id: 'domain',
      emoji: '🚧',
      title: 'תחום הגדרה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מתחת לשורש — לא שלילי',
          md: m`$\sqrt{q(x)}$ מוגדר רק כש-$q(x)\ge0$. אם השורש **במכנה** — צריך $q(x)>0$ (אסור לחלק ב-$0$).`,
        },
        {
          type: 'steps',
          title: 'דוגמאות',
          steps: [
            { math: m`\sqrt{6-2x}:\ 6-2x\ge0\ \Rightarrow\ ${c(GREEN, 'x\\le3')}`, note: 'פותרים אי-שוויון קווי.' },
            { math: m`\frac{1}{\sqrt{x-1}}:\ x-1>0\ \Rightarrow\ ${c(GREEN, 'x>1')}`, note: 'במכנה — אי-שוויון חזק.' },
            { math: m`\sqrt{x^2-9}:\ ${c(GREEN, 'x\\le-3\\ \\lor\\ x\\ge3')}`, note: 'פרבולה "מחייכת" — חיובית מחוץ לשורשים.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהו תחום ההגדרה של $f(x)=\sqrt{8-2x}$?`,
        options: [m`$x\le4$`, m`$x\ge4$`, m`$x<4$`, m`$x\le8$`],
        answer: 0,
        hint: m`$8-2x\ge0$`,
        explain: m`$8-2x\ge0\Rightarrow 2x\le8\Rightarrow x\le4$`,
      },
    },
    {
      id: 'equations',
      emoji: '⚖️',
      title: 'משוואה עם שורש',
      blocks: [
        {
          type: 'steps',
          title: m`$\sqrt{x+6}=x$`,
          steps: [
            { math: m`x+6=x^2`, note: 'מעלים בריבוע את שני האגפים.' },
            { math: m`x^2-x-6=0\ \Rightarrow\ x=3,\ x=-2`, note: 'פותרים משוואה ריבועית.' },
            { math: m`x=3:\ \sqrt9=3\ ${c(GREEN, '\\checkmark')}\qquad x=-2:\ \sqrt4=2\ne-2\ ${c(RED, '\\times')}`, note: 'בודקים במשוואה המקורית!' },
            { math: c(GREEN, 'x=3'), note: 'רק פתרון אחד.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'x =',
        prompt: m`פתרו: $\sqrt{2x+1}=3$`,
        answer: 4,
        hint: m`$2x+1=9$`,
        explain: m`$2x+1=9\Rightarrow x=4$. בדיקה: $\sqrt9=3$ ✓`,
      },
    },
    {
      id: 'extraneous',
      emoji: '🕵️',
      title: 'פתרון זר',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'למה בודקים?',
          md: m`העלאה בריבוע "שוכחת" את הסימן: גם $\sqrt A=-2$ וגם $\sqrt A=2$ הופכים ל-$A=4$. אבל שורש **אף פעם לא שלילי** — ולכן פתרון שבו האגף השני שלילי נפסל.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה הפתרון של $\sqrt{x+2}=x$?`,
        options: [m`$x=2$ בלבד`, m`$x=-1$ בלבד`, m`$x=2$ ו-$x=-1$`, 'אין פתרון'],
        answer: 0,
        hint: m`בריבוע: $x^2-x-2=0$. בדקו כל פתרון.`,
        explain: m`$x=2$: $\sqrt4=2$ ✓. $\;x=-1$: $\sqrt1=1\ne-1$ ✗. נשאר $x=2$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: משיק לפונקציית שורש',
      blocks: [
        {
          type: 'tangent',
          fn: 'root',
          x: 0,
          caption: m`הזיזו את הנקודה על $f(x)=x\sqrt{4-x}$ וראו את שיפוע המשיק.`,
        },
        {
          type: 'steps',
          title: m`משיק ל-$f(x)=\sqrt{2x+1}$ ב-$x=4$`,
          steps: [
            { math: m`f(4)=\sqrt9=3`, note: 'נקודת ההשקה: (4, 3).' },
            { math: m`f'(x)=\frac{2}{2\sqrt{2x+1}}=\frac{1}{\sqrt{2x+1}}\ \Rightarrow\ f'(4)=\frac13`, note: 'השיפוע.' },
            { math: m`y-3=\frac13(x-4)\ \Rightarrow\ ${c(GREEN, 'y=\\frac13x+\\frac53')}`, note: 'משוואת המשיק.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'שיפוע =',
        prompt: m`מהו שיפוע המשיק לגרף $f(x)=\sqrt{x+5}$ בנקודה שבה $x=4$? (אפשר שבר עשרוני)`,
        answer: 1 / 6,
        tolerance: 0.01,
        hint: m`$f'(x)=\frac{1}{2\sqrt{x+5}}$`,
        explain: m`$f'(4)=\frac{1}{2\cdot3}=\frac16\approx0.167$`,
      },
    },
  ],
};
