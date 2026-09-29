import { m } from './tex.js';

export default {
  id: 'g6-number-systems',
  topicId: 'g6-number-systems',
  grade: 6,
  emoji: '💡',
  title: 'בסיס 2 — השיטה הבינארית',
  subtitle: 'איך מחשב סופר רק עם 0 ו-1',
  sections: [
    {
      id: 'base10',
      emoji: '🔟',
      title: 'להיזכר: בסיס 10',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'כל מקום שווה פי 10',
          md: m`$352=3\times100+5\times10+2\times1$. עשר ספרות: $0$ עד $9$.`,
        },
        {
          type: 'card',
          tone: 'why',
          title: 'ובבסיס 2?',
          md: m`רק שתי ספרות: $0$ ו-$1$. כל מקום שווה **פי 2** מהמקום שמימינו: $1, 2, 4, 8, 16\ldots$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'אילו ספרות יש בבסיס 2?',
        options: [m`רק $0$ ו-$1$`, m`$0$ עד $9$`, m`רק $1$ ו-$2$`, m`$0$ עד $2$`],
        answer: 0,
        hint: 'כמו מנורה: דולקת או כבויה.',
        explain: m`$0$ (כבוי) ו-$1$ (דולק).`,
      },
    },
    {
      id: 'lamps',
      emoji: '💡',
      title: 'מנורות',
      blocks: [
        {
          type: 'binary',
          bits: 4,
          value: 11,
          caption: 'הדליקו וכבו מנורות. כל מנורה דולקת מוסיפה את הערך שלה:',
        },
        {
          type: 'steps',
          title: m`$1011_2$ בבסיס 10`,
          steps: [
            { math: m`1\times8+0\times4+1\times2+1\times1`, note: 'כל ספרה כפול ערך המקום.' },
            { math: m`=11`, note: 'מחברים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $110_2$ בבסיס 10?`,
        answer: 6,
        hint: m`$4+2+0$`,
        explain: m`$1\times4+1\times2+0\times1=6$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מבסיס 10 לבסיס 2',
      blocks: [
        {
          type: 'steps',
          title: m`$13$ בבסיס 2`,
          steps: [
            { math: m`13=8+5`, note: 'החזקה הגדולה ביותר שנכנסת: 8.' },
            { math: m`5=4+1`, note: 'ממשיכים עם השארית.' },
            { math: m`13=8+4+1=1101_2`, note: 'יש 8, יש 4, אין 2, יש 1.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איך כותבים $9$ בבסיס 2?`,
        options: [m`$1001_2$`, m`$1010_2$`, m`$111_2$`, m`$1100_2$`],
        answer: 0,
        hint: m`$9=8+1$`,
        explain: m`$8+1$ ← $1001_2$`,
      },
    },
  ],
};
