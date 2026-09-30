import { m } from './tex.js';

export default {
  id: 'g11u3-space',
  topicId: 'g11-u3-space',
  grade: 11,
  units: 3,
  emoji: '🧭',
  title: 'תרגול מסכם — התמצאות במישור ובמרחב',
  subtitle: 'יחס, דמיון וטריגונומטריה',
  sections: [
    {
      id: 'ratio',
      emoji: '🔵',
      title: 'פרופורציה',
      blocks: [{ type: 'card', tone: 'tip', title: 'תזכורת', md: m`$a:b=c:d\iff ad=bc$` }],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`תערובת בטון: חול ומלט ביחס $5:2$. כמה ק"ג חול צריך ל-$14$ ק"ג מלט?`,
        answer: 35,
        hint: m`$\frac52=\frac{x}{14}$`,
        explain: m`$35$ ק"ג.`,
      },
    },
    {
      id: 'scale',
      emoji: '🗺️',
      title: 'קנה מידה',
      blocks: [{ type: 'card', tone: 'tip', title: 'תזכורת', md: m`שטח ← יחס בריבוע.` }],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`דגם בקנה מידה $1:20$. פי כמה השטח האמיתי גדול משטח הדגם?`,
        answer: 400,
        hint: m`$20^2$`,
        explain: m`$400$`,
      },
    },
    {
      id: 'similar',
      emoji: '🔍',
      title: 'דמיון',
      blocks: [{ type: 'card', tone: 'tip', title: 'תזכורת', md: m`יחס היקפים $=k$.` }],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`היקפי שני משולשים דומים $15$ ו-$25$. צלע בקטן $6$. מה הצלע המתאימה בגדול?`,
        answer: 10,
        hint: m`$k=\frac{25}{15}=\frac53$`,
        explain: m`$6\cdot\frac53=10$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: זווית עומק',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'זווית עומק',
          md: m`מלמעלה מסתכלים **למטה** — הזווית נמדדת מהקו האופקי. היא שווה לזווית הגובה מלמטה (זוויות מתחלפות).`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ׳',
        tolerance: 0.2,
        prompt: m`ממגדלור בגובה $40$ מטר רואים סירה בזווית עומק $20°$. מה המרחק מבסיס המגדלור לסירה? ($\tan20°\approx0.364$)`,
        answer: 109.89,
        hint: m`$d=\frac{40}{\tan20°}$`,
        explain: m`$\approx110$ מטר.`,
      },
    },
  ],
};
