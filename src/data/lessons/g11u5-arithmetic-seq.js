import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g11u5-arithmetic-seq',
  topicId: 'g11-u5-arithmetic-seq',
  grade: 11,
  units: 5,
  emoji: '🪜',
  title: 'סדרה חשבונית',
  subtitle: 'הפרש קבוע, איבר כללי, והסכום של גאוס',
  sections: [
    {
      id: 'define',
      emoji: '📜',
      title: 'שתי דרכים להגדיר סדרה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'לפי מקום ולפי נסיגה',
          md: m`**לפי מקום** — נוסחה שמחשבת את $a_n$ ישר מ-$n$: $a_n=3n+1$ ← $4,\ 7,\ 10,\ \dots$

**לפי נסיגה** — איבר ראשון, וכלל שמחשב כל איבר מקודמו: $a_1=4,\ a_{n+1}=a_n+3$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$a_1=2$ ו-$a_{n+1}=2a_n-1$. מה $a_4$?`,
        answer: 9,
        hint: m`$a_2=3$, $a_3=5$...`,
        explain: m`$a_2=3,\ a_3=5,\ a_4=9$`,
      },
    },
    {
      id: 'general',
      emoji: '📈',
      title: 'הפרש קבוע ואיבר כללי',
      blocks: [
        {
          type: 'sequence',
          mode: 'arith',
          a1: 2,
          d: 3,
          caption: m`שנו את $a_1$ ואת $d$. שימו לב: ראשי העמודות על **קו ישר**.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'איבר כללי',
          md: m`$$a_n=a_1+(n-1)d$$

להגיע ל-$a_n$ = להתחיל ב-$a_1$ ולעשות $n-1$ צעדים בגודל $d$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`בסדרה חשבונית $a_1=7$ ו-$d=-2$. מה $a_{20}$?`,
        answer: -31,
        hint: m`$7+19\cdot(-2)$`,
        explain: m`$7-38=-31$`,
      },
    },
    {
      id: 'sum',
      emoji: '🧒',
      title: 'הסכום של גאוס',
      blocks: [
        {
          type: 'steps',
          title: m`$1+2+\dots+100$`,
          steps: [
            { math: m`${c(VIOLET, '1+100')}=${c(VIOLET, '2+99')}=\dots=101`, note: 'מזווגים ראשון עם אחרון — כל זוג שווה.' },
            { math: m`\frac{100}{2}=50`, note: '100 מספרים — 50 זוגות.' },
            { math: m`50\cdot101=${c(GREEN, '5050')}`, note: 'גאוס בן ה-9 עשה את זה בראש!' },
          ],
        },
        {
          type: 'card',
          tone: 'key',
          title: 'סכום n איברים',
          md: m`$$S_n=\frac{n(a_1+a_n)}{2}=\frac{n\big[2a_1+(n-1)d\big]}{2}$$`,
        },
        {
          type: 'sequence',
          mode: 'arith',
          sums: true,
          a1: 1,
          d: 2,
          caption: m`עברו ל"סכומים" — הנקודות $(n,S_n)$ יוצרות **פרבולה**:`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה סכום 30 האיברים הראשונים בסדרה $5,\ 8,\ 11,\ \dots$?`,
        answer: 1455,
        hint: m`$a_{30}=5+29\cdot3=92$`,
        explain: m`$S_{30}=\frac{30(5+92)}{2}=15\cdot97=1455$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: ממוצע השכנים',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'למה "חשבונית"?',
          md: m`כל איבר הוא **הממוצע החשבוני** של שני שכניו: $a_n=\frac{a_{n-1}+a_{n+1}}{2}$.

להפריך שסדרה חשבונית? מספיקה **דוגמה נגדית**: שני הפרשים עוקבים שונים.`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'x =',
        prompt: m`המספרים $x-1,\ 2x+1,\ 4x-3$ הם שלושה איברים עוקבים בסדרה חשבונית. מה $x$?`,
        answer: 6,
        hint: m`האמצעי הוא ממוצע השכנים: $2(2x+1)=(x-1)+(4x-3)$`,
        explain: m`$4x+2=5x-4\Rightarrow x=6$. האיברים: $5,\ 13,\ 21$ — הפרש $8$ ✓`,
      },
    },
  ],
};
