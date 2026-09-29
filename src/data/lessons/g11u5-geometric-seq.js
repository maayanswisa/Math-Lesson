import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g11u5-geometric-seq',
  topicId: 'g11-u5-geometric-seq',
  grade: 11,
  units: 5,
  emoji: '🌀',
  title: 'סדרה הנדסית',
  subtitle: 'מנה קבועה, סכום — וסכום אינסופי שיוצא מספר סופי',
  sections: [
    {
      id: 'ratio',
      emoji: '✖️',
      title: 'מנה קבועה',
      blocks: [
        {
          type: 'text',
          md: m`בסדרה **הנדסית** כל איבר מתקבל מקודמו ב**כפל** באותו מספר — המנה $q$: $3,\ 6,\ 12,\ 24,\ \dots$ ($q=2$).`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'איבר כללי',
          md: m`$$a_n=a_1\cdot q^{\,n-1}$$`,
        },
        {
          type: 'sequence',
          mode: 'geom',
          a1: 1,
          q: 2,
          caption: m`שנו את $q$: מה קורה כש-$q>1$? כש-$0<q<1$? וכש-$q$ שלילי?`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`בסדרה הנדסית $a_1=5$ ו-$q=3$. מה $a_5$?`,
        answer: 405,
        hint: m`$5\cdot3^4$`,
        explain: m`$5\cdot81=405$`,
      },
    },
    {
      id: 'sum',
      emoji: '➕',
      title: 'סכום n איברים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: m`סכום ($q\neq1$)`,
          md: m`$$S_n=\frac{a_1(q^n-1)}{q-1}$$`,
        },
        {
          type: 'steps',
          title: m`$1+2+4+\dots+512$`,
          steps: [
            { math: m`a_1=1,\ q=2,\ 512=2^9\ \Rightarrow\ n=10`, note: 'מזהים את הנתונים.' },
            { math: m`S_{10}=\frac{1\cdot(2^{10}-1)}{2-1}=${c(GREEN, '1023')}`, note: 'מציבים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה סכום 6 האיברים הראשונים בסדרה $2,\ 6,\ 18,\ \dots$?`,
        answer: 728,
        hint: m`$\frac{2(3^6-1)}{3-1}$`,
        explain: m`$\frac{2\cdot728}{2}=728$`,
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
          a1: 8,
          q: 0.5,
          caption: m`עברו ל"סכומים". כש-$|q|<1$ הסכומים מתקרבים לקו האדום — ולא עוברים אותו:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: m`רק כש-$|q|<1$`,
          md: m`$$S=\frac{a_1}{1-q}$$

חיבור של **אינסוף** מספרים — ותוצאה **סופית**. $8+4+2+1+\dots=\frac{8}{1-0.5}=16$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה סכום הסדרה האינסופית $9+3+1+\frac13+\dots$?`,
        answer: 13.5,
        tolerance: 0.01,
        hint: m`$q=\frac13$`,
        explain: m`$\frac{9}{1-\frac13}=\frac{9}{\frac23}=13.5$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: שבר מחזורי',
      blocks: [
        {
          type: 'steps',
          title: m`למה $0.\overline{3}=\frac13$?`,
          steps: [
            { math: m`0.333\ldots=0.3+0.03+0.003+\dots`, note: 'סדרה הנדסית אינסופית!' },
            { math: m`a_1=0.3,\ q=${c(VIOLET, '0.1')}`, note: 'כל איבר עשירית מקודמו.' },
            { math: m`S=\frac{0.3}{1-0.1}=\frac{0.3}{0.9}=${c(GREEN, '\\frac13')}`, note: 'כל שבר מחזורי הוא מספר רציונלי.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איזה שבר שווה ל-$0.\overline{45}=0.454545\ldots$?`,
        options: [m`$\frac{45}{100}$`, m`$\frac{5}{11}$`, m`$\frac{9}{20}$`, m`$\frac{4}{9}$`],
        answer: 1,
        hint: m`$a_1=0.45$, $q=0.01$`,
        explain: m`$\frac{0.45}{0.99}=\frac{45}{99}=\frac{5}{11}$`,
      },
    },
  ],
};
