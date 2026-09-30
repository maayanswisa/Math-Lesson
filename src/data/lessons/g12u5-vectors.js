import { m } from './tex.js';

export default {
  id: 'g12u5-vectors',
  topicId: 'g12-u5-vectors',
  grade: 12,
  units: 5,
  emoji: '🔺',
  title: 'יישומים בגאומטריית המרחב',
  subtitle: 'זוויות, גבהים ונפחים בגופים',
  sections: [
    {
      id: 'pyramid',
      emoji: '🏛️',
      title: 'פירמידה',
      blocks: [
        {
          type: 'space',
          mode: 'pyramid',
          caption: 'פירמידה ישרה — שנו גובה וצלע, וסובבו:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'נפחים',
          md: m`מנסרה/גליל: $V=S_{base}\cdot h$

פירמידה/חרוט: $V=\frac13S_{base}\cdot h$

כדור: $V=\frac43\pi r^3$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`פירמידה ריבועית ישרה: צלע בסיס $6$, מקצוע צדדי $\sqrt{34}$. מה הגובה?`,
        answer: 4,
        hint: m`חצי אלכסון הבסיס: $3\sqrt2$; $34-18=16$`,
        explain: m`$h=\sqrt{16}=4$`,
      },
    },
    {
      id: 'angle',
      emoji: '📐',
      title: 'זווית בין מקצוע לבסיס',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'משולש ישר-זווית במרחב',
          md: m`הזווית בין ישר למישור — בין הישר להיטל שלו על המישור. הגובה, ההיטל והמקצוע יוצרים משולש ישר-זווית.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '°',
        tolerance: 0.5,
        prompt: m`באותה פירמידה (גובה $4$, חצי אלכסון $3\sqrt2\approx4.24$) — מה הזווית בין המקצוע הצדדי לבסיס? (בערך)`,
        answer: 43.3,
        hint: m`$\tan\alpha=\frac{4}{4.24}$`,
        explain: m`$\alpha\approx43.3°$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: נפח בוקטורים',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'להוכיח שהגובה ניצב',
          md: m`בגוף לא ישר מוכיחים ניצבות עם $\vec u\cdot\vec v=0$ — ואז אפשר להשתמש בגובה בנוסחת הנפח.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה נפח הפירמידה (צלע בסיס $6$, גובה $4$)?`,
        answer: 48,
        hint: m`$\frac13\cdot36\cdot4$`,
        explain: m`$48$`,
      },
    },
  ],
};
