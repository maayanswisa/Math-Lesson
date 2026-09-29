import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g12u4-vectors',
  topicId: 'g12-u4-vectors',
  grade: 12,
  units: 4,
  emoji: '🧭',
  title: 'תרגול מסכם — וקטורים ונפחים',
  subtitle: 'ישרים, מישורים, מכפלה סקלרית — ונפחים של מנסרות ופירמידות',
  sections: [
    {
      id: 'space',
      emoji: '🧊',
      title: 'מצבים במרחב',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: 'שני ישרים: נחתכים / מקבילים / **מצטלבים**. ישר ⟂ מישור ← ניצב לשני ישרים נחתכים בו.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`בקובייה $ABCDA'B'C'D'$, מה המצב בין $AD$ ל-$B'C'$?`,
        options: ['נחתכים', 'מקבילים', 'מצטלבים', 'ניצבים ונחתכים'],
        answer: 1,
        hint: m`$B'C'\parallel BC\parallel AD$`,
        explain: m`מקבילים — שניהם מקבילים ל-$BC$.`,
      },
    },
    {
      id: 'height',
      emoji: '📐',
      title: 'גובה בעזרת מכפלה סקלרית',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תנאי הגובה',
          md: m`וקטור $\vec h$ הוא גובה (ניצב לבסיס) אם הוא ניצב לשני וקטורים לא-קולינאריים בבסיס:

$\vec h\cdot\vec u_1=0$ וגם $\vec h\cdot\vec u_2=0$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`בסיס מוגדר על ידי $\vec u_1=(1,0,0)$ ו-$\vec u_2=(0,1,0)$. איזה וקטור ניצב לבסיס?`,
        options: [m`$(1,1,0)$`, m`$(0,0,5)$`, m`$(1,0,1)$`, m`$(0,1,1)$`],
        answer: 1,
        hint: 'בדקו מכפלה סקלרית עם שניהם.',
        explain: m`$(0,0,5)\cdot\vec u_1=0$ וגם $\cdot\vec u_2=0$ ✓`,
      },
    },
    {
      id: 'prism',
      emoji: '📦',
      title: 'נפח מנסרה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'נפחים',
          md: m`**מנסרה**: $V=S_{\text{b}}\cdot h$ · **פירמידה**: $V=\frac13S_{\text{b}}\cdot h$

(שטח הבסיס כפול הגובה — ובפירמידה שליש מזה.)`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מנסרה ישרה שבסיסה משולש ישר-זווית עם ניצבים $3$ ו-$4$, וגובהה $10$. מה הנפח?`,
        answer: 60,
        hint: m`$S_{\text{b}}=\frac{3\cdot4}{2}=6$`,
        explain: m`$6\cdot10=60$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: פירמידה',
      blocks: [
        {
          type: 'space',
          mode: 'pyramid',
          caption: 'פירמידה ישרה — הנפח הוא שליש מהתיבה שחוסמת אותה:',
        },
        {
          type: 'steps',
          title: m`פירמידה עם בסיס ריבועי בצלע $6$ ומקצוע צדדי $\sqrt{34}$`,
          steps: [
            { math: m`\frac{6\sqrt2}{2}=3\sqrt2`, note: 'חצי אלכסון הבסיס.' },
            { math: m`h=\sqrt{34-18}=${c(VIOLET, '4')}`, note: 'פיתגורס במשולש הגובה.' },
            { math: m`V=\frac13\cdot36\cdot4=${c(GREEN, '48')}`, note: 'נפח.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`פירמידה ישרה עם בסיס ריבועי בצלע $4$ וגובה $6$. מה הנפח?`,
        answer: 32,
        hint: m`$\frac13\cdot16\cdot6$`,
        explain: m`$\frac{96}{3}=32$`,
      },
    },
  ],
};
