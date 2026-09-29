import { m } from './tex.js';

export default {
  id: 'g9x-linear',
  topicId: 'g9x-linear',
  grade: 9,
  emoji: '📈',
  title: 'פונקציה קווית',
  subtitle: 'שיפוע, נקודת התחלה, ושימושים מהחיים',
  sections: [
    {
      id: 'form',
      emoji: '📏',
      title: 'y = mx + b',
      blocks: [
        {
          type: 'text',
          md: m`הגרף של פונקציה קווית הוא **קו ישר**.

- $m$ — **השיפוע**: כמה $y$ עולה (או יורד) כש-$x$ גדל ב-1.
- $b$ — איפה הישר חותך את ציר $y$.`,
        },
        {
          type: 'line',
          caption: m`שחקו עם $m$ ועם $b$:`,
          lines: [{ m: 1, b: 1, editable: true, showB: true }],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`בפונקציה $y=-2x+4$, הישר:`,
        options: ['עולה', 'יורד', 'אופקי', 'אנכי'],
        answer: 1,
        hint: m`מה הסימן של $m$?`,
        explain: m`$m=-2<0$ — הישר יורד.`,
      },
    },
    {
      id: 'real-life',
      emoji: '🚕',
      title: 'מהחיים: מונית',
      blocks: [
        {
          type: 'text',
          md: m`מונית: **12 ₪** על הכניסה, ועוד **3 ₪** לכל ק"מ.

$y=3x+12$ — ה-**3** הוא **הקצב** (השיפוע), וה-**12** — **נקודת ההתחלה**.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '₪',
        prompt: m`לפי $y=3x+12$, כמה תעלה נסיעה של 10 ק"מ?`,
        answer: 42,
        hint: m`מציבים $x=10$.`,
        explain: m`$3\cdot10+12=42$ ₪.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מוצאים את הנוסחה',
      blocks: [
        {
          type: 'text',
          md: 'חוג: **50 ₪** דמי הרשמה, ו-**20 ₪** לכל שיעור. הנוסחה: y = 20x + 50.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מנוי לחדר כושר: 100 ₪ חד-פעמי, ועוד 40 ₪ לכל חודש. איזו פונקציה מתארת את המחיר לפי מספר החודשים x?',
        options: [m`$y=100x+40$`, m`$y=40x+100$`, m`$y=140x$`, m`$y=40x-100$`],
        answer: 1,
        hint: 'מה משתנה כל חודש (השיפוע), ומה קבוע (נקודת ההתחלה)?',
        explain: m`40 לחודש — השיפוע; 100 — נקודת ההתחלה: $y=40x+100$.`,
      },
    },
  ],
};
