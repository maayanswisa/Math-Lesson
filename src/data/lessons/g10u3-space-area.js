import { m } from './tex.js';

const SHAPE = `<div class='diagram-box'><svg viewBox='0 0 260 150' width='260' xmlns='http://www.w3.org/2000/svg' style='max-width:100%;direction:ltr'><path d='M30,130 V40 H170 A45,45 0 0 1 170,130 Z' fill='rgba(13,110,110,0.12)' stroke='#0d6e6e' stroke-width='3'/><line x1='170' y1='40' x2='170' y2='130' stroke='#c45c48' stroke-width='2' stroke-dasharray='5 4'/><g font-size='12' font-weight='700' fill='#1a2b3c'><text x='100' y='32' text-anchor='middle'>14</text><text x='18' y='90' text-anchor='middle'>9</text></g></svg></div>`;

export default {
  id: 'g10u3-space-area',
  topicId: 'g10-u3-space-area',
  grade: 10,
  units: 3,
  emoji: '🟩',
  title: 'שטחים של צורות',
  subtitle: 'משולש, מרובעים, עיגול וצורות מורכבות',
  sections: [
    {
      id: 'basic',
      emoji: '📐',
      title: 'הנוסחאות',
      blocks: [
        {
          type: 'shape',
          shape: 'triangle',
          caption: 'שטח משולש: בסיס כפול גובה, חלקי 2. שנו את הבסיס ואת הגובה:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'ארגז הכלים',
          md: m`מלבן: $a\cdot b$

משולש: $\frac{a\cdot h}{2}$

טרפז: $\frac{(a+b)h}{2}$

עיגול: $\pi r^2$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ"ר',
        prompt: m`חלקה בצורת טרפז: בסיסים $12$ ו-$8$ מטר, גובה $5$ מטר. מה השטח?`,
        answer: 50,
        hint: m`$\frac{20\cdot5}{2}$`,
        explain: m`$50$ מ"ר.`,
      },
    },
    {
      id: 'composite',
      emoji: '🧩',
      title: 'צורה מורכבת',
      blocks: [
        {
          type: 'text',
          md: m`${SHAPE}

מלבן $14\times9$ ועוד חצי עיגול בקוטר $9$: $126+\frac{\pi\cdot4.5^2}{2}$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.5,
        prompt: 'מה שטח הצורה? (בערך)',
        answer: 157.81,
        hint: m`$126+\frac{20.25\pi}{2}$`,
        explain: m`$126+31.8\approx157.8$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: הפרש שטחים',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'גדול פחות קטן',
          md: m`שביל ברוחב $1$ מטר סביב בריכה $10\times4$: $12\times6-10\times4=72-40=32$ מ"ר.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ"ר',
        tolerance: 0.5,
        prompt: m`מדשאה עגולה ברדיוס $10$ מטר, ובמרכזה מזרקה עגולה ברדיוס $2$ מטר. מה שטח הדשא? (בערך)`,
        answer: 301.59,
        hint: m`$\pi(100-4)$`,
        explain: m`$96\pi\approx301.6$ מ"ר.`,
      },
    },
  ],
};
