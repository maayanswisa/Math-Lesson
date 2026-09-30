import { m } from './tex.js';

const TRACK = `<div class='diagram-box'><svg viewBox='0 0 300 150' width='300' xmlns='http://www.w3.org/2000/svg' style='max-width:100%;direction:ltr'><path d='M90,25 H210 A50,50 0 0 1 210,125 H90 A50,50 0 0 1 90,25 Z' fill='rgba(13,110,110,0.12)' stroke='#0d6e6e' stroke-width='3'/><line x1='210' y1='75' x2='210' y2='125' stroke='#c45c48' stroke-width='2' stroke-dasharray='4 3'/><g font-size='12' font-weight='700'><text x='150' y='18' text-anchor='middle' fill='#1a2b3c'>80</text><text x='216' y='105' fill='#c45c48'>25</text></g></svg></div>`;

export default {
  id: 'g10u3-space-perimeter',
  topicId: 'g10-u3-space-perimeter',
  grade: 10,
  units: 3,
  emoji: '🏟️',
  title: 'היקפים של צורות',
  subtitle: 'מצולעים, מעגלים וצורות מורכבות',
  sections: [
    {
      id: 'basic',
      emoji: '📐',
      title: 'היקף מצולעים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'סכום הצלעות',
          md: m`מלבן: $2(a+b)$. ריבוע ומעוין: $4a$. משולש: $a+b+c$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ׳',
        prompt: m`גדר סביב מגרש מלבני $25\times40$ מטר. כמה מטר גדר צריך?`,
        answer: 130,
        hint: m`$2(25+40)$`,
        explain: m`$130$ מטר.`,
      },
    },
    {
      id: 'circle',
      emoji: '⭕',
      title: 'היקף מעגל',
      blocks: [
        {
          type: 'circle',
          r: 4,
          caption: 'ההיקף חלקי הקוטר — תמיד π:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'נוסחה',
          md: m`$$P=2\pi r=\pi d$$

חצי מעגל: $\pi r$ (רק הקשת).`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס"מ',
        tolerance: 0.1,
        prompt: m`מה אורך הקשת של חצי מעגל עם רדיוס $7$ ס"מ? (בערך)`,
        answer: 21.99,
        hint: m`$\pi\cdot7$`,
        explain: m`$7\pi\approx22$ ס"מ.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מסלול אצטדיון',
      blocks: [
        {
          type: 'text',
          md: m`${TRACK}

שני קטעים ישרים של $80$ ועוד שני חצאי מעגל (רדיוס $25$) — יחד מעגל שלם:

$$P=2\cdot80+2\pi\cdot25$$
`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ׳',
        tolerance: 0.5,
        prompt: 'מה היקף המסלול? (בערך)',
        answer: 317.08,
        hint: m`$160+50\pi$`,
        explain: m`$160+157.1\approx317$ מטר.`,
      },
    },
  ],
};
