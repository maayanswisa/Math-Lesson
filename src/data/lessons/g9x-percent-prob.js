import { m } from './tex.js';

export default {
  id: 'g9x-percent-prob',
  topicId: 'g9x-percent-prob',
  grade: 9,
  emoji: '💯',
  title: 'אחוזים והסתברות',
  subtitle: 'אחוז מכמות, הנחה, והסתברות בסיסית',
  sections: [
    {
      id: 'percent',
      emoji: '💯',
      title: 'אחוז מכמות',
      blocks: [
        {
          type: 'percent',
          mode: 'part',
          total: 80,
          percent: 25,
          caption: m`$p\%$ מתוך 80 — הופכים לעשרוני וכופלים:`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $20\%$ מ-150?`,
        answer: 30,
        hint: m`$0.2\cdot150$`,
        explain: m`$0.2\cdot150=30$`,
      },
    },
    {
      id: 'discount',
      emoji: '🏷️',
      title: 'הנחה',
      blocks: [
        {
          type: 'percent',
          mode: 'discount',
          total: 200,
          unit: '₪',
          percent: 30,
          caption: 'הנחה של p% — נשאר (100 − p)% מהמחיר:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '₪',
        prompt: 'נעליים ב-300 ₪, בהנחה של 20%. מה המחיר אחרי ההנחה?',
        answer: 240,
        hint: m`נשאר $80\%$: $0.8\cdot300$`,
        explain: m`$0.8\cdot300=240$ ₪.`,
      },
    },
    {
      id: 'probability',
      emoji: '🏆',
      title: 'שלב הבוס: הסתברות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'הסתברות',
          md: 'מספר התוצאות הרצויות ÷ מספר כל התוצאות. תמיד בין **0** (בלתי אפשרי) ל-**1** (ודאי).',
        },
        {
          type: 'dice',
          caption: 'ההסתברות לקבל 6 היא ⅙ — הטילו הרבה פעמים ובדקו:',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'בכד 5 כדורים ירוקים ו-15 צהובים. מה ההסתברות להוציא ירוק?',
        options: [m`$\frac{1}{3}$`, m`$\frac{1}{4}$`, m`$\frac{5}{15}$`, m`$\frac{3}{4}$`],
        answer: 1,
        hint: 'כמה כדורים בסך הכול?',
        explain: m`$\frac{5}{20}=\frac14$`,
      },
    },
  ],
};
