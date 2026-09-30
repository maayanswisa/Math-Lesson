import { m } from './tex.js';

const ELEV = `<div class='diagram-box'><svg viewBox='0 0 280 150' width='280' xmlns='http://www.w3.org/2000/svg' style='max-width:100%;direction:ltr'><line x1='20' y1='130' x2='260' y2='130' stroke='#1a2b3c' stroke-width='2'/><rect x='220' y='30' width='30' height='100' fill='rgba(13,110,110,0.2)' stroke='#0d6e6e' stroke-width='2'/><line x1='40' y1='130' x2='220' y2='30' stroke='#7c4dcc' stroke-width='2' stroke-dasharray='5 4'/><path d='M80,130 A40,40 0 0 0 75,111' fill='none' stroke='#c45c48' stroke-width='2'/><text x='86' y='122' font-size='12' font-weight='700' fill='#c45c48'>α</text><text x='130' y='146' font-size='12' font-weight='700' fill='#1a2b3c' text-anchor='middle'>d</text><text x='256' y='84' font-size='12' font-weight='700' fill='#0d6e6e'>h</text></svg></div>`;

export default {
  id: 'g11u3-space-trig',
  topicId: 'g11-u3-space-trig',
  grade: 11,
  units: 3,
  emoji: '📐',
  title: 'טריגונומטריה במשולש ישר-זווית',
  subtitle: 'סינוס, קוסינוס, טנגנס — וזווית גובה',
  sections: [
    {
      id: 'define',
      emoji: '🔺',
      title: 'שלושה יחסים',
      blocks: [
        {
          type: 'trigratio',
          angle: 40,
          caption: 'שנו את הזווית ואת היתר — היחסים תלויים רק בזווית:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'ההגדרות',
          md: m`$\sin\alpha$ = הניצב **מול** הזווית חלקי היתר

$\cos\alpha$ = הניצב **ליד** הזווית חלקי היתר

$\tan\alpha$ = הניצב **מול** חלקי הניצב **ליד**`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.05,
        prompt: m`יתר $20$, זווית $30°$. מה אורך הניצב שליד הזווית? ($\cos30°\approx0.866$)`,
        answer: 17.32,
        hint: m`$20\cos30°$`,
        explain: m`$\approx17.32$`,
      },
    },
    {
      id: 'angle',
      emoji: '🔢',
      title: 'מוצאים זווית',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'פונקציה הפוכה במחשבון',
          md: m`$\tan\alpha=1$ ← $\alpha=\tan^{-1}(1)=45°$. במחשבון: SHIFT ואז tan.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '°',
        prompt: m`ניצבים $5$ ו-$5$. מה הזווית החדה?`,
        answer: 45,
        hint: m`$\tan\alpha=\frac55=1$`,
        explain: m`$45°$`,
      },
    },
    {
      id: 'elevation',
      emoji: '🏆',
      title: 'שלב הבוס: זווית גובה',
      blocks: [
        {
          type: 'text',
          md: m`${ELEV}

**זווית גובה** — מהקרקע למעלה אל ראש הבניין. $\tan\alpha=\frac hd$ ← $h=d\cdot\tan\alpha$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ׳',
        tolerance: 0.1,
        prompt: m`עומדים $30$ מטר ממגדל ורואים את ראשו בזווית גובה $50°$. מה גובה המגדל? ($\tan50°\approx1.192$)`,
        answer: 35.75,
        hint: m`$30\cdot1.192$`,
        explain: m`$\approx35.8$ מטר.`,
      },
    },
  ],
};
