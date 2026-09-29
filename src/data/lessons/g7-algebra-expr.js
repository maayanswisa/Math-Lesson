import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g7-algebra-expr',
  topicId: 'g7-algebra-expr',
  grade: 7,
  emoji: '🔤',
  title: 'משתנים וביטויים אלגבריים',
  subtitle: 'אות שמחזיקה מקום למספר — ואיך מציבים',
  sections: [
    {
      id: 'variable',
      emoji: '📦',
      title: 'מה זה משתנה?',
      blocks: [
        {
          type: 'text',
          md: m`כרטיס לסרט עולה $25$ ש"ח. כמה עולים $n$ כרטיסים? לא יודעים כמה חברים יבואו, אז כותבים **ביטוי**: $25n$ (כלומר $25\times n$).

האות $n$ היא **משתנה** — "קופסה" שאפשר לשים בה כל מספר.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'ביטוי אלגברי',
          md: m`צירוף של מספרים, משתנים ופעולות: $3x+5$, $2n-7$, $\frac{a}{4}$.

כשכותבים מספר צמוד לאות — זה כפל: $3x=3\times x$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מחברת עולה $x$ ש"ח. איזה ביטוי מתאר את המחיר של $4$ מחברות ועוד עט ב-$6$ ש"ח?`,
        options: [m`$4+x+6$`, m`$4x+6$`, m`$4(x+6)$`, m`$10x$`],
        answer: 1,
        hint: m`4 מחברות: $4\times x$. ועוד העט.`,
        explain: m`$4x+6$ — ארבע מחברות, ועוד 6 ש"ח לעט.`,
      },
    },
    {
      id: 'substitute',
      emoji: '🔌',
      title: 'הצבה',
      blocks: [
        {
          type: 'text',
          md: m`**הצבה** = מחליפים את המשתנה במספר ומחשבים. נסו את המכונה: היא מציבה כל $x$ בביטוי $2x+1$.`,
        },
        {
          type: 'machine',
          caption: m`בחרו $x$ והפעילו:`,
          a: 2,
          b: 1,
        },
        {
          type: 'steps',
          title: m`מציבים $x=4$ בביטוי $3x+5$`,
          steps: [
            { math: m`3\times${c(VIOLET, '4')}+5`, note: 'במקום x כותבים 4.' },
            { math: m`12+5=${c(GREEN, '17')}`, note: 'לפי סדר הפעולות.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה ערך הביטוי $5a-8$ כאשר $a=3$?`,
        answer: 7,
        hint: m`$5\times3-8$`,
        explain: m`$15-8=7$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מציבים שלילי',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'מציבים עם סוגריים',
          md: m`כשמציבים מספר שלילי — שמים אותו בסוגריים, כדי לא להתבלבל בסימנים:

$x=-2$ בביטוי $x^2-3x$: $(-2)^2-3\times(-2)=4+6=10$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה ערך הביטוי $4-2y$ כאשר $y=-5$?`,
        answer: 14,
        hint: m`$4-2\times(-5)$`,
        explain: m`$2\times(-5)=-10$, ולכן $4-(-10)=14$.`,
      },
    },
  ],
};
