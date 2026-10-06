import { m } from '../helpers.js';
import { tf } from './shared.js';
import { zScore, fromZ, below, above, between, realAbove, compareZ } from './normal-dist.js';
import { regression, strength } from './correlation-regression.js';

export default {
  id: 'g11-u4-normal-regression',
  grade: 11,
  emoji: '📈',
  title: 'תרגול מסכם — סטטיסטיקה (כיתה י"א)',
  reminder: [
    {
      title: 'ציון תקן והתפלגות נורמלית',
      md: m`$z = \frac{x - \bar{x}}{\sigma}$ $\;\cdot\;$ $\Phi(z) = P(Z < z)$ $\;\cdot\;$ $P(Z > z) = 1 - \Phi(z)$ $\;\cdot\;$ $\Phi(-z) = 1 - \Phi(z)$`,
    },
    {
      title: 'מתאם ורגרסיה',
      md: m`$-1 \le r \le 1$ · מתאם $\ne$ סיבתיות · $b = r\frac{S_y}{S_x}$ · הקו עובר דרך $(\bar{x}, \bar{y})$`,
    },
  ],
  pages: [
    {
      title: 'התפלגות נורמלית',
      exercises: [
        { title: 'ציוני תקן.', cols: 2, items: [zScore(66, 60, 4), zScore(45, 55, 5), fromZ(0.8, 50, 10), fromZ(-1.2, 200, 25)] },
        { title: 'היעזרו בטבלה.', cols: 2, items: [below(0.5), above(2), between(-1.5, 1.5), below(-2)] },
        { title: 'בעיות.', cols: 1, items: [realAbove('משקל תינוקות', 4.1, 3.4, 0.35, ' ק״ג'), compareZ(['היסטוריה', 72, 60, 8], ['ספרות', 81, 75, 3])] },
      ],
    },
    {
      title: 'מתאם ורגרסיה',
      exercises: [
        { title: 'תארו את הקשר.', cols: 2, items: [0.88, -0.1, -0.75, 0.25].map(strength) },
        {
          title: 'קו הרגרסיה ותחזית.',
          cols: 1,
          items: [regression({ r: 0.7, sx: 2, sy: 8, mx: 15, my: 60, x: 18 }), regression({ r: -0.5, sx: 4, sy: 12, mx: 20, my: 100, x: 22 })],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('בהתפלגות נורמלית, כ-95% מהנתונים נמצאים במרחק של עד 2 סטיות תקן מהממוצע.', true),
            tf('אם r שלילי, גם שיפוע קו הרגרסיה שלילי.', true),
            tf('קו הרגרסיה מנבא היטב גם כש-r קרוב ל-0.', false),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'ציון תקן.', cols: 2, items: [zScore(115, 100, 10), fromZ(2.5, 40, 4)] },
      { title: 'היעזרו בטבלה.', cols: 2, items: [above(1), between(-0.5, 2)] },
      { title: 'קשר בין משתנים.', cols: 1, items: [strength(-0.92), regression({ r: 0.6, sx: 5, sy: 10, mx: 30, my: 70, x: 35 })] },
    ],
  },
};
