import { c, GREEN, m, RED } from './tex.js';

export default {
  id: 'g9x-equations',
  topicId: 'g9x-equations',
  grade: 9,
  emoji: '⚖️',
  title: 'משוואות ממעלה ראשונה',
  subtitle: 'המאזניים, מעבר אגף, ושאלות מילוליות',
  sections: [
    {
      id: 'balance',
      emoji: '⚖️',
      title: 'משוואה = מאזניים',
      blocks: [
        {
          type: 'balance',
          caption: m`$x+3=7$ — מורידים משני הצדדים:`,
          solution: 4,
          left: { x: 1, units: 3 },
          right: { x: 0, units: 7 },
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הכלל',
          md: '**מה שעושים לצד אחד — עושים גם לשני.**',
        },
      ],
      challenge: {
        type: 'number',
        prompt: m`$x-6=10$. מהו $x$?`,
        answer: 16,
        hint: 'מוסיפים 6 לשני הצדדים.',
        explain: m`$x=10+6=16$`,
      },
    },
    {
      id: 'solve',
      emoji: '🔧',
      title: 'פותרים שלב אחרי שלב',
      blocks: [
        {
          type: 'steps',
          title: m`$5x+2=3x+10$`,
          steps: [
            { math: m`5x${c(RED, '-3x')}+2=10`, note: m`מעבירים את $3x$ שמאלה — עם סימן הפוך.` },
            { math: m`2x=10${c(RED, '-2')}`, note: 'מעבירים את 2 ימינה — עם סימן הפוך.' },
            { math: m`2x=8\ \Rightarrow\ ${c(GREEN, 'x=4')}`, note: 'מחלקים ב-2.' },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'בדיקה',
          md: m`מציבים: $5\cdot4+2=22$ וגם $3\cdot4+10=22$ ✔️`,
        },
      ],
      challenge: {
        type: 'number',
        prompt: m`$4x-1=2x+9$. מהו $x$?`,
        answer: 5,
        hint: m`$4x-2x=9+1$`,
        explain: m`$2x=10\Rightarrow x=5$`,
      },
    },
    {
      id: 'word',
      emoji: '🏆',
      title: 'שלב הבוס: שאלה מילולית',
      blocks: [
        {
          type: 'steps',
          title: 'דנה קנתה 3 מחברות ועט ב-5 ₪, ושילמה 26 ₪. כמה עולה מחברת?',
          steps: [
            { math: m`x`, note: m`מגדירים: $x$ = מחיר מחברת.` },
            { math: m`3x+5=26`, note: 'מתרגמים לסיפור.' },
            { math: m`3x=21\ \Rightarrow\ ${c(GREEN, 'x=7')}`, note: '7 ₪ למחברת.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '₪',
        prompt: 'יוסי קנה 4 כרטיסים לקולנוע ופופקורן ב-18 ₪. הוא שילם 98 ₪. כמה עולה כרטיס?',
        answer: 20,
        hint: m`$4x+18=98$`,
        explain: m`$4x=80\Rightarrow x=20$ ₪.`,
      },
    },
  ],
};
