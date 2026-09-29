import { m } from './tex.js';

export default {
  id: 'g6-pyramid-volume',
  topicId: 'g6-pyramid-volume',
  grade: 6,
  emoji: '🔺',
  title: 'נפח פירמידה',
  subtitle: 'שליש מהתיבה שעוטפת אותה',
  sections: [
    {
      id: 'meet',
      emoji: '🏜️',
      title: 'מה זו פירמידה',
      blocks: [
        {
          type: 'space',
          mode: 'pyramid',
          caption: 'פירמידה עם בסיס ריבועי. שנו את הגובה ואת הצלע, וסובבו:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'בסיס וקודקוד',
          md: m`בסיס — מצולע. כל הפאות האחרות משולשים שנפגשים בקודקוד אחד למעלה. **הגובה** — מהקודקוד ישר למטה אל הבסיס.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה פאות יש לפירמידה עם בסיס ריבועי?',
        answer: 5,
        hint: 'בסיס אחד ועוד משולש לכל צלע.',
        explain: m`$1+4=5$`,
      },
    },
    {
      id: 'third',
      emoji: '⅓',
      title: 'שליש מהתיבה',
      blocks: [
        {
          type: 'card',
          tone: 'why',
          title: 'שלוש פירמידות = תיבה',
          md: m`ממלאים פירמידה בחול ושופכים לתיבה עם אותו בסיס ואותו גובה — צריך בדיוק **שלוש** פירמידות כדי למלא אותה.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הנוסחה',
          md: m`$$V=\frac{S_{base}\times h}{3}$$
`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ק',
        prompt: m`פירמידה עם בסיס ריבועי בצלע $6$ ס"מ וגובה $5$ ס"מ. מה הנפח?`,
        answer: 60,
        hint: m`$\frac{36\times5}{3}$`,
        explain: m`$\frac{180}{3}=60$ סמ"ק.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: בסיס משולש',
      blocks: [
        {
          type: 'steps',
          title: m`בסיס משולש עם צלע $4$ וגובה $3$; גובה הפירמידה $10$`,
          steps: [
            { math: m`\frac{4\times3}{2}=6`, note: 'שטח הבסיס (משולש).' },
            { math: m`\frac{6\times10}{3}=20`, note: 'נפח הפירמידה.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`נפח פירמידה הוא $40$ ושטח הבסיס $12$. מה הגובה?`,
        answer: 10,
        hint: m`$\frac{12\times h}{3}=40$`,
        explain: m`$4h=40$ ← $h=10$`,
      },
    },
  ],
};
