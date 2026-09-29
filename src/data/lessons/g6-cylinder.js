import { m } from './tex.js';

export default {
  id: 'g6-cylinder',
  topicId: 'g6-cylinder',
  grade: 6,
  emoji: '🥫',
  title: 'גליל',
  subtitle: 'נפח ושטח פנים של פחית',
  sections: [
    {
      id: 'meet',
      emoji: '🥫',
      title: 'גליל = עיגולים בערימה',
      blocks: [
        {
          type: 'revolution',
          shape: 'cylinder',
          elementary: true,
          caption: 'מלבן שמסתובב סביב צלע יוצר גליל:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'נפח',
          md: m`שטח הבסיס (עיגול) כפול הגובה:

$$V=\pi r^2h$$
`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ק',
        prompt: m`גליל עם רדיוס $2$ ס"מ וגובה $10$ ס"מ. מה הנפח? ($\pi=3.14$)`,
        answer: 125.6,
        tolerance: 0.01,
        hint: m`$3.14\times4\times10$`,
        explain: m`$125.6$ סמ"ק.`,
      },
    },
    {
      id: 'net',
      emoji: '🏷️',
      title: 'הפריסה',
      blocks: [
        {
          type: 'card',
          tone: 'why',
          title: 'פותחים את התווית',
          md: m`תווית הפחית היא **מלבן**: אורכו — היקף העיגול $2\pi r$, ורוחבו — הגובה $h$. ועוד שני עיגולים — למעלה ולמטה.

$$S=2\pi r^2+2\pi rh$$
`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזו צורה מתקבלת כשפורסים את המעטפת של גליל?',
        options: ['מלבן', 'עיגול', 'משולש', 'טרפז'],
        answer: 0,
        hint: 'תווית של פחית.',
        explain: m`מלבן בגודל $2\pi r\times h$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: כמה נייר?',
      blocks: [
        {
          type: 'steps',
          title: m`גליל עם $r=5$ ו-$h=10$ ($\pi=3.14$)`,
          steps: [
            { math: m`2\times3.14\times25=157`, note: 'שני העיגולים.' },
            { math: m`2\times3.14\times5\times10=314`, note: 'המעטפת.' },
            { math: m`157+314=471`, note: 'שטח הפנים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: m`מה שטח המעטפת (בלי הבסיסים) של גליל עם $r=3$ ו-$h=10$? ($\pi=3.14$)`,
        answer: 188.4,
        tolerance: 0.01,
        hint: m`$2\times3.14\times3\times10$`,
        explain: m`$188.4$ סמ"ר.`,
      },
    },
  ],
};
