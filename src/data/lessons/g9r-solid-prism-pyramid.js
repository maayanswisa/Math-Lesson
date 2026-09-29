import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g9r-solid-prism-pyramid',
  topicId: 'g9r-solid-prism-pyramid',
  grade: 9,
  emoji: '📦',
  title: 'תיבה, מנסרה ופירמידה',
  subtitle: 'נפח ושטח פנים, ופיתגורס בתוך הגופים',
  sections: [
    {
      id: 'box',
      emoji: '🧊',
      title: 'תיבה',
      blocks: [
        {
          type: 'box',
          caption: 'נפח = כמה קוביות יחידה בפנים:',
          l: 4,
          w: 3,
          h: 3,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'נוסחאות',
          md: m`**נפח** $=l\cdot w\cdot h$ · **שטח פנים** $=2(lw+lh+wh)$ · **אלכסון** $=\sqrt{l^2+w^2+h^2}$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מה שטח הפנים של תיבה 2 × 3 × 4?',
        answer: 52,
        hint: m`$2(6+8+12)$`,
        explain: m`$2(2\cdot3+2\cdot4+3\cdot4)=2\cdot26=52$`,
      },
    },
    {
      id: 'prism',
      emoji: '🔺',
      title: 'מנסרה ישרה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'לכל מנסרה ישרה',
          md: m`**נפח** = שטח הבסיס × גובה

**שטח פנים** = 2 × שטח הבסיס + היקף הבסיס × גובה`,
        },
        {
          type: 'steps',
          title: 'מנסרה משולשת: בסיס ישר-זווית עם ניצבים 3 ו-4, גובה 10',
          steps: [
            { math: m`\frac{3\cdot4}{2}=${c(VIOLET, '6')}`, note: 'שטח הבסיס.' },
            { math: m`6\cdot10=${c(GREEN, '60')}`, note: 'הנפח.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מנסרה שבסיסה משולש ששטחו 15, וגובהה 8. מה הנפח?',
        answer: 120,
        hint: 'שטח בסיס × גובה.',
        explain: '15 × 8 = 120.',
      },
    },
    {
      id: 'pyramid',
      emoji: '🏆',
      title: 'שלב הבוס: פירמידה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שליש!',
          md: m`$$V=\frac13\cdot S_{\text{base}}\cdot h$$
פירמידה היא **שליש** מהמנסרה עם אותו בסיס ואותו גובה.`,
        },
        {
          type: 'steps',
          title: 'פירמידה ריבועית: צלע בסיס 6, גובה 4',
          steps: [
            { math: m`S=6\cdot6=36`, note: 'שטח הבסיס.' },
            { math: m`V=\frac13\cdot36\cdot4=${c(GREEN, '48')}`, note: 'הנפח.' },
            { math: m`\sqrt{3^2+4^2}=${c(VIOLET, '5')}`, note: 'גובה הפאה (מאמצע צלע הבסיס לפסגה) — פיתגורס עם חצי צלע (3) והגובה (4).' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'פירמידה ששטח בסיסה 30 וגובהה 9. מה הנפח?',
        answer: 90,
        hint: m`$\frac13\cdot30\cdot9$`,
        explain: m`$\frac{270}{3}=90$`,
      },
    },
  ],
};
