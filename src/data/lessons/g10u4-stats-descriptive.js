import { m } from './tex.js';

export default {
  id: 'g10u4-stats-descriptive',
  topicId: 'g10-u4-stats-descriptive',
  grade: 10,
  units: 4,
  emoji: '📊',
  title: 'סטטיסטיקה תיאורית',
  subtitle: 'משתנים, מדדי מרכז ופיזור',
  sections: [
    {
      id: 'variables',
      emoji: '🏷️',
      title: 'סוגי משתנים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'איכותני מול כמותי',
          md: m`**איכותני** — צבע, מקצוע אהוב (רק שכיח). **כמותי בדיד** — מספר אחים. **כמותי רציף** — גובה, זמן.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזה משתנה הוא כמותי רציף?',
        options: ['משקל תינוק', 'מספר חדרים בדירה', 'עיר מגורים', 'צבע עיניים'],
        answer: 0,
        hint: 'יכול לקבל כל ערך בטווח.',
        explain: m`משקל יכול להיות $3.4172$ ק"ג — רציף.`,
      },
    },
    {
      id: 'spread',
      emoji: '↔️',
      title: 'פיזור: סטיית תקן',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'כמה רחוק מהממוצע',
          md: m`$$\sigma=\sqrt{\frac{\sum(x-\bar x)^2}{n}}$$

ל-$2, 4, 6$: $\bar x=4$, $\sigma=\sqrt{\frac{4+0+4}{3}}=\sqrt{\frac83}\approx1.63$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה סטיית התקן של $3, 7, 3, 7$?`,
        answer: 2,
        hint: m`$\bar x=5$, כל סטייה $\pm2$.`,
        explain: m`$\sqrt{\frac{4\cdot4}{4}}=2$`,
      },
    },
    {
      id: 'transform',
      emoji: '🏆',
      title: 'שלב הבוס: משנים את כל הנתונים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שני כללים',
          md: m`**מוסיפים** $c$ לכל ערך: ממוצע $+c$, פיזור **לא משתנה**.

**כופלים** ב-$c$: ממוצע $\times c$, סטיית תקן $\times|c|$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`ממוצע ציונים $70$, סטיית תקן $8$. המורה הוסיפה $5$ נקודות לכולם. מה עכשיו?`,
        options: [m`ממוצע $75$, $\sigma=8$`, m`ממוצע $75$, $\sigma=13$`, m`ממוצע $70$, $\sigma=8$`, m`ממוצע $75$, $\sigma=3$`],
        answer: 0,
        hint: 'הוספה לא משנה פיזור.',
        explain: m`כולם זזו ב-$5$ — המרחקים ביניהם לא השתנו.`,
      },
    },
  ],
};
