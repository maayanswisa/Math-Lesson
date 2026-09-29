import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g12u4-arithmetic-seq',
  topicId: 'g12-u4-arithmetic-seq',
  grade: 12,
  units: 4,
  emoji: '🪜',
  title: 'סדרה חשבונית',
  subtitle: 'הפרש קבוע, איבר כללי, סכום — ואיך מוכיחים שסדרה חשבונית',
  sections: [
    {
      id: 'define',
      emoji: '📈',
      title: 'הפרש קבוע',
      blocks: [
        {
          type: 'sequence',
          mode: 'arith',
          a1: 3,
          d: 2,
          caption: m`שנו את $a_1$ ואת $d$ — האיברים עולים (או יורדים) תמיד באותה כמות:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שתי הגדרות',
          md: m`**נסיגה**: $a_{n+1}=a_n+d$

**איבר כללי**: $a_n=a_1+(n-1)d$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`בסדרה חשבונית $a_1=4$ ו-$a_{10}=31$. מה $d$?`,
        answer: 3,
        hint: m`$31=4+9d$`,
        explain: m`$9d=27\Rightarrow d=3$`,
      },
    },
    {
      id: 'sum',
      emoji: '➕',
      title: 'סכום',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: m`$S_n$`,
          md: m`$$S_n=\frac n2(a_1+a_n)=\frac n2\big(2a_1+(n-1)d\big)$$`,
        },
        {
          type: 'sequence',
          mode: 'arith',
          sums: true,
          a1: 2,
          d: 3,
          caption: m`עברו ל"סכומים" — ראו איך $S_n$ גדל:`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה סכום 20 האיברים הראשונים בסדרה $1,\ 5,\ 9,\ \dots$?`,
        answer: 780,
        hint: m`$S_{20}=\frac{20}{2}(2+19\cdot4)$`,
        explain: m`$10\cdot78=780$`,
      },
    },
    {
      id: 'from-sums',
      emoji: '🔁',
      title: 'מהסכום לאיבר',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'טריק שימושי',
          md: m`$$a_n=S_n-S_{n-1}$$

האיבר ה-$n$ = הסכום עד $n$ פחות הסכום עד $n-1$.`,
        },
        {
          type: 'steps',
          title: m`$S_n=n^2+2n$. מה $a_5$?`,
          steps: [
            { math: m`S_5=25+10=${c(VIOLET, '35')}`, note: 'הסכום עד 5.' },
            { math: m`S_4=16+8=${c(VIOLET, '24')}`, note: 'הסכום עד 4.' },
            { math: m`a_5=35-24=${c(GREEN, '11')}`, note: 'ההפרש.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$S_n=3n^2-n$. מה $a_4$?`,
        answer: 20,
        hint: m`$S_4-S_3=44-24$`,
        explain: m`$a_4=20$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: הוכחה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'איך מוכיחים שסדרה חשבונית',
          md: m`מראים ש-$a_{n+1}-a_n$ הוא **קבוע** (לא תלוי ב-$n$).

$a_n=5n-2$: $\ a_{n+1}-a_n=5(n+1)-2-(5n-2)=5$ ✓`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזו סדרה היא חשבונית?',
        options: [m`$a_n=n^2$`, m`$a_n=7-3n$`, m`$a_n=2^n$`, m`$a_n=\frac1n$`],
        answer: 1,
        hint: m`בדקו את $a_{n+1}-a_n$.`,
        explain: m`$7-3(n+1)-(7-3n)=-3$ — קבוע. בשאר ההפרש תלוי ב-$n$.`,
      },
    },
  ],
};
