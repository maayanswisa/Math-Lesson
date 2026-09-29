import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g10u4-algebra-technique',
  topicId: 'g10-u4-algebra-technique',
  grade: 10,
  units: 4,
  emoji: '🧰',
  title: 'טכניקה אלגברית',
  subtitle: 'פירוק לגורמים, משוואות ואי-שוויונות',
  sections: [
    {
      id: 'factor',
      emoji: '🧩',
      title: 'פירוק לגורמים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'כפל מקוצר',
          md: m`$(a\pm b)^2=a^2\pm2ab+b^2$

$a^2-b^2=(a-b)(a+b)$`,
        },
        {
          type: 'steps',
          title: m`$x^2-5x+6$`,
          steps: [
            { math: m`(-2)\cdot(-3)=6,\;(-2)+(-3)=-5`, note: 'מחפשים שני מספרים.' },
            { math: m`=(x-2)(x-3)`, note: 'הפירוק.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`פרקו: $x^2-49$`,
        options: [m`$(x-7)(x+7)$`, m`$(x-7)^2$`, m`$(x-49)(x+1)$`, m`$x(x-49)$`],
        answer: 0,
        hint: 'הפרש ריבועים.',
        explain: m`$x^2-7^2$`,
      },
    },
    {
      id: 'quadratic',
      emoji: '🔢',
      title: 'משוואה ריבועית',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'נוסחת השורשים',
          md: m`$$x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$
`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'משוואה עם שורש',
          md: m`$\sqrt{x+2}=x$ ← מעלים בריבוע: $x+2=x^2$ ← $x=2$ או $x=-1$. **בודקים!** $\sqrt{1}\ne-1$ — הפתרון $x=-1$ זר.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה הפתרון החיובי של $2x^2-3x-2=0$?`,
        answer: 2,
        hint: m`$\frac{3\pm\sqrt{9+16}}{4}$`,
        explain: m`$\frac{3+5}{4}=2$`,
      },
    },
    {
      id: 'inequality',
      emoji: '🏆',
      title: 'שלב הבוס: אי-שוויון ריבועי',
      blocks: [
        {
          type: 'parabola',
          mode: 'factored',
          a: 1,
          m: 1,
          t: 4,
          signs: true,
          caption: m`$(x-1)(x-4)$ — איפה הפרבולה מתחת לציר?`,
        },
        {
          type: 'steps',
          title: m`$x^2-5x+4<0$`,
          steps: [
            { math: m`x=1,\;x=4`, note: 'השורשים.' },
            { math: m`${c(VIOLET, 'a>0')}`, note: 'פרבולה "מחייכת" — שלילית בין השורשים.' },
            { math: c(GREEN, '1<x<4'), note: 'הפתרון.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`פתרו: $x^2-9>0$`,
        options: [m`$x<-3$ או $x>3$`, m`$-3<x<3$`, m`$x>3$`, m`$x>9$`],
        answer: 0,
        hint: 'מחוץ לשורשים.',
        explain: m`שורשים $\pm3$, פרבולה מחייכת — חיובית בחוץ.`,
      },
    },
  ],
};
