import { m } from './tex.js';

const SCALE = `<div class='diagram-box'><svg viewBox='0 0 300 70' width='300' xmlns='http://www.w3.org/2000/svg' style='direction:ltr;max-width:100%'><defs><linearGradient id='pg' x1='0' x2='1'><stop offset='0' stop-color='#c45c48'/><stop offset='0.5' stop-color='#e2a020'/><stop offset='1' stop-color='#2d7a4f'/></linearGradient></defs><rect x='20' y='22' width='260' height='12' rx='6' fill='url(#pg)'/><g font-size='11' font-weight='700' text-anchor='middle' fill='#1a2b3c'><text x='20' y='52'>0</text><text x='150' y='52'>0.5</text><text x='280' y='52'>1</text></g><g font-size='10' text-anchor='middle' fill='#4a5d73'><text x='24' y='66'>בלתי אפשרי</text><text x='150' y='66'>סיכוי שווה</text><text x='274' y='66'>ודאי</text></g></svg></div>`;

export default {
  id: 'g7-probability-intro',
  topicId: 'g7-probability-intro',
  grade: 7,
  emoji: '🎲',
  title: 'הסתברות ושכיחות יחסית',
  subtitle: 'מעריכים סיכוי מתוך הרבה ניסויים',
  sections: [
    {
      id: 'scale',
      emoji: '🌡️',
      title: 'מ-0 עד 1',
      blocks: [
        {
          type: 'text',
          md: m`**הסתברות** אומרת כמה סביר שמשהו יקרה. היא תמיד בין $0$ ל-$1$ (או בין $0\%$ ל-$100\%$):

${SCALE}`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מה ההסתברות שמחר השמש תזרח?',
        options: [m`$0$`, m`$0.5$`, m`$1$`, m`$2$`],
        answer: 2,
        hint: 'זה ודאי.',
        explain: m`מאורע ודאי — הסתברות $1$.`,
      },
    },
    {
      id: 'coin',
      emoji: '🪙',
      title: 'ניסויים חוזרים',
      blocks: [
        {
          type: 'text',
          md: 'איך יודעים מה הסיכוי שמטבע ייפול על "עץ"? מטילים הרבה פעמים ומחשבים **שכיחות יחסית**. נסו:',
        },
        {
          type: 'coins',
          caption: 'הטילו פעם אחת, אחר כך 10, 100 ו-1000. מה קורה לקו?',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'ככל שיותר ניסויים',
          md: 'בהתחלה השכיחות היחסית "קופצת". אחרי הרבה ניסויים היא **מתייצבת** ליד ההסתברות האמיתית. לכן: יותר ניסויים — אומדן טוב יותר.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזה אומדן אמין יותר להסתברות של "עץ"?',
        options: ['10 הטלות, 7 עץ', '1000 הטלות, 508 עץ', 'שניהם אמינים באותה מידה', 'הטלה אחת'],
        answer: 1,
        hint: 'בכמה ניסויים הקו מתייצב?',
        explain: m`יותר ניסויים — אומדן מדויק יותר: $0.508$ קרוב מאוד ל-$0.5$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: אומדן מניסוי',
      blocks: [
        {
          type: 'dice',
          caption: 'עכשיו קובייה: הטילו הרבה פעמים. השכיחות של כל פאה מתקרבת ל-⅙.',
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'משתמשים באומדן',
          md: m`נעץ נפל "עם החוד למעלה" $300$ פעמים מתוך $500$. האומדן להסתברות: $\frac{300}{500}=0.6$. אם נטיל $1000$ פעמים, נצפה לבערך $600$ פעמים.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'שחקן כדורסל קלע 80 זריקות מתוך 100 באימונים. בערך כמה יקלע מתוך 50 זריקות במשחק?',
        answer: 40,
        hint: m`האומדן: $\frac{80}{100}=0.8$. כמה זה $0.8\times50$?`,
        explain: m`$0.8\times50=40$ זריקות.`,
      },
    },
  ],
};
