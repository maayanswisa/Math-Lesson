import { m } from './tex.js';

export default {
  id: 'g12u5-explog-integral',
  topicId: 'g12-u5-explog-integral',
  grade: 12,
  units: 5,
  emoji: '∫',
  title: 'אינטגרלים של מעריכיות ולוגריתמים',
  subtitle: 'פונקציה קדומה, אינטגרל מסוים ושטחים',
  sections: [
    {
      id: 'anti',
      emoji: '🔙',
      title: 'פונקציות קדומות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'הטבלה',
          md: m`$\int e^{ax+b}dx=\frac1ae^{ax+b}+C$

$\int\frac1xdx=\ln|x|+C$

$\int a^xdx=\frac{a^x}{\ln a}+C$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהי פונקציה קדומה של $e^{3x}$?`,
        options: [m`$\frac13e^{3x}$`, m`$3e^{3x}$`, m`$e^{3x}$`, m`$\frac{e^{3x+1}}{3x+1}$`],
        answer: 0,
        hint: 'גוזרים לבדיקה.',
        explain: m`$\left(\frac13e^{3x}\right)'=e^{3x}$ ✓`,
      },
    },
    {
      id: 'definite',
      emoji: '📊',
      title: 'אינטגרל מסוים',
      blocks: [
        {
          type: 'riemann',
          fn: 'exp',
          caption: m`השטח מתחת ל-$e^x$ — מלבנים שמתקרבים לאינטגרל:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'מציבים גבולות',
          md: m`$$\int_0^1e^xdx=e^1-e^0=e-1\approx1.72$$
`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.01,
        prompt: m`כמה זה $\int_1^e\frac1xdx$?`,
        answer: 1,
        hint: m`$\ln e-\ln1$`,
        explain: m`$1-0=1$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: שטח בין גרפים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'עליונה פחות תחתונה',
          md: m`$$S=\int_a^b\big(f(x)-g(x)\big)dx$$

קודם מוצאים נקודות חיתוך ומי מעל מי.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.01,
        prompt: m`מה השטח בין $y=e^x$ ל-$y=1$ בתחום $[0,1]$? (בערך)`,
        answer: 0.718,
        hint: m`$\int_0^1(e^x-1)dx=(e-1)-1$`,
        explain: m`$e-2\approx0.718$`,
      },
    },
  ],
};
