import { m } from './tex.js';

export default {
  id: 'g12u3-normal',
  topicId: 'g12-u3-normal',
  grade: 12,
  units: 3,
  emoji: '🔔',
  title: 'התפלגות נורמלית',
  subtitle: 'עקומת הפעמון, ציון תקן וכלל 68-95-99.7',
  sections: [
    {
      id: 'bell',
      emoji: '🔔',
      title: 'עקומת הפעמון',
      blocks: [
        {
          type: 'bell',
          mode: 'sd',
          mean: 170,
          sd: 8,
          sdRange: [4, 14],
          caption: m`גובה תלמידים: ממוצע $170$ ס"מ. שנו את $\sigma$:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שני פרמטרים',
          md: m`$\mu$ — הממוצע, מרכז הפעמון (שם גם החציון והשכיח). $\sigma$ — סטיית התקן: גדולה ← פעמון רחב ונמוך.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'בהתפלגות נורמלית, איזה חלק מהנתונים מעל הממוצע?',
        options: [m`$50\%$`, m`$68\%$`, m`$34\%$`, 'תלוי בסטיית התקן'],
        answer: 0,
        hint: 'העקומה סימטרית.',
        explain: m`סימטריה ← חצי מעל וחצי מתחת: $50\%$.`,
      },
    },
    {
      id: 'z',
      emoji: '📏',
      title: 'ציון תקן',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'כמה סטיות תקן מהממוצע',
          md: m`$$z=\frac{x-\mu}{\sigma}$$

ממוצע $70$, $\sigma=10$, ציון $85$: $z=\frac{15}{10}=1.5$ — סטייה וחצי מעל הממוצע.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.001,
        prompt: m`משקל תינוקות: $\mu=3.4$ ק"ג, $\sigma=0.5$. מה ציון התקן של תינוק במשקל $2.9$ ק"ג?`,
        answer: -1,
        hint: m`$\frac{2.9-3.4}{0.5}$`,
        explain: m`$z=-1$ — סטיית תקן אחת מתחת לממוצע.`,
      },
    },
    {
      id: 'rule',
      emoji: '🏆',
      title: 'שלב הבוס: כלל 68-95-99.7',
      blocks: [
        {
          type: 'bell',
          mode: 'rule',
          mean: 100,
          sd: 15,
          caption: m`מבחן IQ: $\mu=100$, $\sigma=15$. בחרו טווח:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שלוש רצועות',
          md: m`$\mu\pm\sigma$ — כ-$68\%$

$\mu\pm2\sigma$ — כ-$95\%$

$\mu\pm3\sigma$ — כ-$99.7\%$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '%',
        prompt: m`איזה אחוז מהאנשים עם IQ בין $100$ ל-$115$?`,
        answer: 34,
        hint: m`חצי מ-$68\%$.`,
        explain: m`$\frac{68}{2}=34\%$`,
      },
    },
  ],
};
