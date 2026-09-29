import { m } from './tex.js';

export default {
  id: 'g4-length-units',
  topicId: 'g4-length-units',
  grade: 4,
  emoji: '📏',
  title: 'יחידות אורך',
  subtitle: 'ק"מ, מטר, דצימטר, ס"מ ומ"מ — ומעברים ביניהן',
  sections: [
    {
      id: 'ladder',
      emoji: '🪜',
      title: 'סולם היחידות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מהגדול לקטן',
          md: m`$1$ ק"מ $=1{,}000$ מטר

$1$ מטר $=10$ דצ"מ $=100$ ס"מ

$1$ ס"מ $=10$ מ"מ`,
        },
        {
          type: 'ruler',
          len: 5,
          caption: 'בין שני מספרים בסרגל — ס"מ אחד. הקווים הקטנטנים — מילימטרים:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ"מ',
        prompt: 'כמה מילימטרים יש ב-6 ס"מ?',
        answer: 60,
        hint: 'בכל ס"מ יש 10 מ"מ.',
        explain: m`$6\times10=60$ מ"מ.`,
      },
    },
    {
      id: 'convert',
      emoji: '🔄',
      title: 'ממירים',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'לאיזה כיוון?',
          md: m`מיחידה **גדולה** לקטנה — **כופלים** (יותר יחידות קטנות): $3$ מ' $=300$ ס"מ.

מיחידה **קטנה** לגדולה — **מחלקים**: $4{,}000$ מ' $=4$ ק"מ.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מטר',
        prompt: 'כמה מטרים יש ב-2.5 ק"מ?',
        answer: 2500,
        hint: 'בכל ק"מ יש 1,000 מטר.',
        explain: m`$2.5\times1{,}000=2{,}500$ מטר.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: יחידות מעורבות',
      blocks: [
        {
          type: 'text',
          md: m`$3$ מ' ו-$45$ ס"מ $=300+45=345$ ס"מ. קודם הופכים הכול ל**אותה** יחידה!`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס"מ',
        prompt: 'דן גבוה 1 מטר ו-38 ס"מ. כמה ס"מ זה?',
        answer: 138,
        hint: m`$100+38$`,
        explain: m`$138$ ס"מ.`,
      },
    },
  ],
};
