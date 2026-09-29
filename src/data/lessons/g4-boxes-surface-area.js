import { c, GREEN, m, RED, SKY, VIOLET } from './tex.js';

export default {
  id: 'g4-boxes-surface-area',
  topicId: 'g4-boxes-surface-area',
  grade: 4,
  emoji: '📦',
  title: 'תיבות — שטח פנים',
  subtitle: 'כמה נייר צריך כדי לעטוף מתנה?',
  sections: [
    {
      id: 'parts',
      emoji: '🔍',
      title: 'חלקי התיבה',
      blocks: [
        {
          type: 'box',
          l: 5,
          w: 3,
          h: 2,
          caption: 'תיבה: שנו את המידות. ספרו פאות, מקצועות וקודקודים:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'לכל תיבה',
          md: '**6** פאות (מלבנים) · **12** מקצועות · **8** קודקודים. הפאות באות ב-**3 זוגות** זהים.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה מקצועות יש לתיבה?',
        answer: 12,
        hint: '4 למעלה, 4 למטה, 4 עומדים.',
        explain: 'לתיבה 12 מקצועות.',
      },
    },
    {
      id: 'surface',
      emoji: '🎁',
      title: 'שטח פנים',
      blocks: [
        {
          type: 'steps',
          title: m`תיבה $5\times3\times2$`,
          steps: [
            { math: m`2\times(5\times3)=${c(VIOLET, '30')}`, note: 'למעלה ולמטה.' },
            { math: m`2\times(5\times2)=${c(SKY, '20')}`, note: 'מלפנים ומאחור.' },
            { math: m`2\times(3\times2)=${c(RED, '12')}`, note: 'הצדדים.' },
            { math: m`30+20+12=${c(GREEN, '62')}`, note: 'סמ"ר של נייר עטיפה.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: m`מה שטח הפנים של תיבה $4\times2\times1$?`,
        answer: 28,
        hint: m`$2\times8+2\times4+2\times2$`,
        explain: m`$16+8+4=28$ סמ"ר.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: קובייה',
      blocks: [
        {
          type: 'text',
          md: 'בקובייה כל 6 הפאות ריבועים זהים — מספיק לחשב פאה אחת ולכפול ב-6.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: 'מה שטח הפנים של קובייה שהמקצוע שלה 3 ס"מ?',
        answer: 54,
        hint: m`פאה: $3\times3=9$`,
        explain: m`$6\times9=54$ סמ"ר.`,
      },
    },
  ],
};
