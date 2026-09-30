import { m } from './tex.js';

export default {
  id: 'g12u3-solids',
  topicId: 'g12-u3-solids',
  grade: 12,
  units: 3,
  emoji: '🧊',
  title: 'נפחים ושטחי פנים',
  subtitle: 'מנסרה, גליל, פירמידה, חרוט וכדור',
  sections: [
    {
      id: 'prism',
      emoji: '📦',
      title: 'מנסרה וגליל',
      blocks: [
        {
          type: 'box',
          l: 4,
          w: 3,
          h: 2,
          caption: 'תיבה היא מנסרה: שטח הבסיס כפול הגובה:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'בסיס כפול גובה',
          md: m`מנסרה וגליל: $V=S_{base}\cdot h$

גליל: $V=\pi r^2h$

שטח פנים של גליל: $2\pi r^2+2\pi rh$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ק',
        tolerance: 0.5,
        prompt: m`פחית: רדיוס $3$ ס"מ, גובה $10$ ס"מ. מה הנפח? (בערך)`,
        answer: 282.74,
        hint: m`$\pi\cdot9\cdot10$`,
        explain: m`$90\pi\approx282.7$ סמ"ק.`,
      },
    },
    {
      id: 'pointed',
      emoji: '🔺',
      title: 'פירמידה וחרוט',
      blocks: [
        {
          type: 'space',
          mode: 'pyramid',
          caption: 'פירמידה — שליש מהתיבה שחוסמת אותה:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שליש',
          md: m`פירמידה וחרוט: $V=\frac13S_{base}\cdot h$

שטח פנים של חרוט: $\pi r^2+\pi r\ell$ ($\ell$ — קו יוצר)`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ק',
        prompt: m`פירמידה עם בסיס ריבועי בצלע $6$ ס"מ וגובה $10$ ס"מ. מה הנפח?`,
        answer: 120,
        hint: m`$\frac13\cdot36\cdot10$`,
        explain: m`$120$ סמ"ק.`,
      },
    },
    {
      id: 'sphere',
      emoji: '🏆',
      title: 'שלב הבוס: כדור',
      blocks: [
        {
          type: 'revolution',
          shape: 'sphere',
          elementary: true,
          caption: 'חצי עיגול שמסתובב — כדור. החליפו צורות:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'כדור',
          md: m`$V=\frac43\pi r^3$

$S=4\pi r^2$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        tolerance: 0.5,
        prompt: m`כמה עור צריך לכדורסל עם רדיוס $12$ ס"מ? (שטח פנים, בערך)`,
        answer: 1809.56,
        hint: m`$4\pi\cdot144$`,
        explain: m`$576\pi\approx1810$ סמ"ר.`,
      },
    },
  ],
};
