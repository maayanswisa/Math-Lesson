import { m } from './tex.js';

export default {
  id: 'g6-data-prob',
  topicId: 'g6-data-prob',
  grade: 6,
  emoji: '🎲',
  title: 'חציון, שכיח והסתברות',
  subtitle: 'הערך האמצעי, הערך הנפוץ — ומה הסיכוי',
  sections: [
    {
      id: 'median',
      emoji: '🎯',
      title: 'חציון',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מסדרים — ולוקחים את האמצעי',
          md: m`$7, 2, 9, 4, 5$ ← מסדרים: $2, 4, \mathbf{5}, 7, 9$. החציון: $5$.

אם מספר הערכים זוגי — הממוצע של שני האמצעיים: $2, 4, 6, 10$ ← $\frac{4+6}{2}=5$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה החציון של $8, 3, 12, 5, 10$?`,
        answer: 8,
        hint: m`$3, 5, ?, 10, 12$`,
        explain: m`האמצעי אחרי סידור: $8$.`,
      },
    },
    {
      id: 'mode',
      emoji: '👑',
      title: 'שכיח',
      blocks: [
        {
          type: 'bars',
          items: [
            { label: '36', count: 3 },
            { label: '37', count: 6 },
            { label: '38', count: 4 },
            { label: '39', count: 2 },
          ],
          caption: 'מידות נעליים בכיתה:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הכי הרבה פעמים',
          md: m`**השכיח** — הערך שמופיע הכי הרבה. כאן: מידה $37$ — העמודה הגבוהה.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה השכיח של $4, 7, 4, 9, 7, 4, 2$?`,
        answer: 4,
        hint: 'ספרו כמה פעמים כל מספר מופיע.',
        explain: m`$4$ מופיע $3$ פעמים.`,
      },
    },
    {
      id: 'prob',
      emoji: '🏆',
      title: 'שלב הבוס: הסתברות',
      blocks: [
        {
          type: 'dice',
          caption: 'הטילו קובייה הרבה פעמים. כל פאה מופיעה בערך ב-⅙ מהזריקות:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הסתברות',
          md: m`**הסתברות** = מספר המקרים הרצויים, חלקי מספר כל המקרים.

סיכוי לזוגי בקובייה: $\frac36=\frac12$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'בשקית 3 כדורים אדומים ו-5 כחולים. מה הסיכוי להוציא אדום?',
        options: [m`$\frac38$`, m`$\frac35$`, m`$\frac58$`, m`$\frac13$`],
        answer: 0,
        hint: m`$8$ כדורים בסך הכול.`,
        explain: m`$\frac{3}{8}$`,
      },
    },
  ],
};
