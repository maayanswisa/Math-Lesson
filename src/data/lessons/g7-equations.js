import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g7-equations',
  topicId: 'g7-equations',
  grade: 7,
  emoji: '⚖️',
  title: 'משוואות ממעלה ראשונה',
  subtitle: 'מה זה פתרון, איך בודקים — ואיך מוצאים אותו',
  sections: [
    {
      id: 'check',
      emoji: '🔍',
      title: 'מהו פתרון?',
      blocks: [
        {
          type: 'text',
          md: m`**משוואה** היא שוויון עם נעלם: $2x+3=11$. **פתרון** הוא מספר שכשמציבים אותו, השוויון נכון.`,
        },
        {
          type: 'steps',
          title: m`האם $x=4$ פתרון של $2x+3=11$?`,
          steps: [
            { math: m`2\times${c(VIOLET, '4')}+3`, note: 'מציבים בצד שמאל.' },
            { math: m`8+3=11`, note: 'מחשבים.' },
            { math: m`${c(GREEN, '11=11')}`, note: 'שוויון נכון — כן, זה פתרון.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איזה מספר הוא פתרון של $3x-5=10$?`,
        options: [m`$x=3$`, m`$x=5$`, m`$x=15$`, m`$x=\frac53$`],
        answer: 1,
        hint: 'הציבו כל אחד ובדקו.',
        explain: m`$3\times5-5=15-5=10$ ✔️`,
      },
    },
    {
      id: 'balance',
      emoji: '⚖️',
      title: 'המאזניים',
      blocks: [
        {
          type: 'text',
          md: m`משוואה היא כמו **מאזניים מאוזנים**. מותר לעשות כל פעולה — בתנאי שעושים אותה **בשני הצדדים**. נסו:`,
        },
        {
          type: 'balance',
          caption: m`המשוואה $2x+3=11$. הורידו משקולות מהצדדים עד שיישאר x לבד:`,
          solution: 4,
          left: { x: 2, units: 3 },
          right: { x: 0, units: 11 },
        },
        {
          type: 'steps',
          title: m`$2x+3=11$`,
          steps: [
            { math: m`2x+3${c(RED, '-3')}=11${c(RED, '-3')}`, note: 'מחסרים 3 משני הצדדים.' },
            { math: m`2x=8`, note: 'נשארו רק איברי x משמאל.' },
            { math: m`\frac{2x}{${c(RED, '2')}}=\frac{8}{${c(RED, '2')}}`, note: 'מחלקים ב-2 את שני הצדדים.' },
            { math: m`x=${c(GREEN, '4')}`, note: 'הפתרון. בדיקה: 2·4+3=11 ✔️' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        prompt: m`פתרו: $5x+2=37$`,
        answer: 7,
        hint: 'קודם מחסרים 2, אחר כך מחלקים ב-5.',
        explain: m`$5x=35$, ולכן $x=7$.`,
      },
    },
    {
      id: 'negative',
      emoji: '➖',
      title: 'פתרון שלילי',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'גם שלילי זה בסדר',
          md: m`$4x+10=2$, ולכן $4x=-8$, ולכן $x=-2$.

בודקים: $4\times(-2)+10=-8+10=2$ ✔️`,
        },
      ],
      challenge: {
        type: 'number',
        prompt: m`פתרו: $3x+20=5$`,
        answer: -5,
        hint: m`$3x=5-20$`,
        explain: m`$3x=-15$, ולכן $x=-5$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: נעלם בשני הצדדים',
      blocks: [
        {
          type: 'balance',
          caption: m`$3x+2=x+10$ — יש x בשני הצדדים. קודם הורידו x מכל צד:`,
          solution: 4,
          left: { x: 3, units: 2 },
          right: { x: 1, units: 10 },
        },
        {
          type: 'steps',
          title: m`$3x+2=x+10$`,
          steps: [
            { math: m`3x${c(RED, '-x')}+2=10`, note: 'מחסרים x משני הצדדים — הנעלמים עוברים לצד אחד.' },
            { math: m`2x=8`, note: 'מחסרים 2.' },
            { math: m`x=${c(GREEN, '4')}`, note: 'מחלקים ב-2.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        prompt: m`פתרו: $7x-4=3x+16$`,
        answer: 5,
        hint: m`$7x-3x=16+4$`,
        explain: m`$4x=20$, ולכן $x=5$.`,
      },
    },
  ],
};
