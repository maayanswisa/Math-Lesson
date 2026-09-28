import { m } from './tex.js';

export default {
  id: 'g3-sequences',
  topicId: 'g3-sequences',
  grade: 3,
  emoji: '🪜',
  title: 'סדרות מספרים',
  subtitle: 'מגלים את החוק — ומשלימים את החסר',
  sections: [
    {
      id: 'rule',
      emoji: '🔍',
      title: 'מה החוק?',
      blocks: [
        {
          type: 'text',
          md: m`**סדרה** = מספרים שבאים לפי **חוק קבוע**.

$5,\ 15,\ 25,\ 35,\ \dots$ — החוק: **+10** בכל פעם.

$900,\ 800,\ 700,\ \dots$ — החוק: **−100** בכל פעם.`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'איך מגלים את החוק?',
          md: 'בודקים כמה **עולה או יורד** בין שני מספרים צמודים.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$12,\ 17,\ 22,\ 27,\ \_\_$. מה הבא?`,
        answer: 32,
        hint: 'כמה עולים בכל פעם?',
        explain: '+5 בכל פעם: 27 + 5 = 32.',
      },
    },
    {
      id: 'mixed',
      emoji: '🔀',
      title: 'סדרה שקופצת למעלה ולמטה',
      blocks: [
        {
          type: 'text',
          md: m`$1,\ 3,\ 2,\ 4,\ 3,\ 5,\ \_\_,\ \_\_$ — נראה מבולגן? מפצלים לשתי סדרות!`,
        },
        {
          type: 'steps',
          title: 'שתי סדרות בתוך אחת',
          steps: [
            { math: m`\textcolor{#1670b3}{1},\ 3,\ \textcolor{#1670b3}{2},\ 4,\ \textcolor{#1670b3}{3},\ 5`, note: 'במקומות 1, 3, 5: 1, 2, 3 — עולה ב-1. הבא: **4**.' },
            { math: m`1,\ \textcolor{#c45c48}{3},\ 2,\ \textcolor{#c45c48}{4},\ 3,\ \textcolor{#c45c48}{5}`, note: 'במקומות 2, 4, 6: 3, 4, 5 — עולה ב-1. הבא: **6**.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$10,\ 1,\ 20,\ 2,\ 30,\ 3,\ \_\_$. מה הבא?`,
        answer: 40,
        hint: 'הסדרה הכחולה: 10, 20, 30, …',
        explain: 'במקומות האי-זוגיים: 10, 20, 30 — והבא 40.',
      },
    },
    {
      id: 'mistake',
      emoji: '🏆',
      title: 'שלב הבוס: מצאו את הטעות',
      blocks: [
        {
          type: 'text',
          md: m`בסדרה $4,\ 8,\ 12,\ 15,\ 20$ מסתתרת טעות. בודקים כל קפיצה: $+4,\ +4,\ \mathbf{+3},\ +5$ — ה-15 צריך להיות **16**!`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`איזה מספר **שגוי** בסדרה: $30,\ 40,\ 50,\ 65,\ 70$?`,
        answer: 65,
        hint: 'הקפיצה היא 10. איפה היא נשברת?',
        explain: 'אחרי 50 צריך לבוא 60, לא 65.',
      },
    },
  ],
};
