import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g12u4-geometric-seq',
  topicId: 'g12-u4-geometric-seq',
  grade: 12,
  units: 4,
  emoji: '🌀',
  title: 'סדרה הנדסית',
  subtitle: 'מנה קבועה, סכום, וסכום אינסופי',
  sections: [
    {
      id: 'ratio',
      emoji: '✖️',
      title: 'מנה קבועה',
      blocks: [
        {
          type: 'sequence',
          mode: 'geom',
          a1: 1,
          q: 2,
          caption: m`שנו את $q$: מה קורה כש-$q>1$? כש-$0<q<1$? כש-$q<0$?`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שתי הגדרות',
          md: m`**נסיגה**: $a_{n+1}=q\cdot a_n$

**איבר כללי**: $a_n=a_1\cdot q^{n-1}$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`בסדרה הנדסית $a_1=3$ ו-$q=-2$. מה $a_6$?`,
        answer: -96,
        hint: m`$3\cdot(-2)^5$`,
        explain: m`$3\cdot(-32)=-96$`,
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
          title: m`$S_n$ (כש-$q\neq1$)`,
          md: m`$$S_n=a_1\cdot\frac{q^n-1}{q-1}$$`,
        },
        {
          type: 'steps',
          title: 'בכל יום קוראים פי 2 עמודים מאתמול, ומתחילים ב-5. כמה עמודים אחרי שבוע?',
          steps: [
            { math: m`a_1=5,\ q=2,\ n=7`, note: 'מזהים.' },
            { math: m`S_7=5\cdot\frac{2^7-1}{2-1}=5\cdot127=${c(GREEN, '635')}`, note: 'ספר שלם!' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה סכום 5 האיברים הראשונים בסדרה $4,\ 12,\ 36,\ \dots$?`,
        answer: 484,
        hint: m`$4\cdot\frac{3^5-1}{3-1}$`,
        explain: m`$4\cdot\frac{242}{2}=484$`,
      },
    },
    {
      id: 'infinite',
      emoji: '♾️',
      title: 'סכום אינסופי',
      blocks: [
        {
          type: 'sequence',
          mode: 'geom',
          sums: true,
          a1: 6,
          q: 0.5,
          caption: m`עברו ל"סכומים" — הם מתקרבים לקו האדום ולא עוברים אותו:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: m`רק כש-$-1<q<1$`,
          md: m`$$S=\frac{a_1}{1-q}$$

$6+3+1.5+\dots=\frac{6}{1-0.5}=${c(VIOLET, '12')}$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה סכום הסדרה האינסופית $10-5+2.5-\dots$?`,
        answer: 20 / 3,
        tolerance: 0.01,
        hint: m`$q=-\frac12$`,
        explain: m`$\frac{10}{1-(-0.5)}=\frac{10}{1.5}\approx6.67$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מוצאים q',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'מחלקים איבר באיבר',
          md: m`$\frac{a_5}{a_2}=\frac{a_1q^4}{a_1q}=q^3$ — ה-$a_1$ מתבטל!`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'q =',
        prompt: m`בסדרה הנדסית $a_2=10$ ו-$a_5=80$. מה $q$?`,
        answer: 2,
        hint: m`$q^3=\frac{80}{10}$`,
        explain: m`$q^3=8\Rightarrow q=2$`,
      },
    },
  ],
};
