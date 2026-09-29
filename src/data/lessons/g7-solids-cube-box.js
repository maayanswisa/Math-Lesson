import { c, GREEN, m, SKY, VIOLET, RED } from './tex.js';

export default {
  id: 'g7-solids-cube-box',
  topicId: 'g7-solids-cube-box',
  grade: 7,
  emoji: '📦',
  title: 'קובייה ותיבה',
  subtitle: 'פאות, מקצועות וקודקודים — שטח פנים ונפח',
  sections: [
    {
      id: 'parts',
      emoji: '🔎',
      title: 'חלקי התיבה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שלושה מושגים',
          md: m`**פאה** — משטח (מלבן). בתיבה יש $6$.

**מקצוע** — קו שבו נפגשות שתי פאות. יש $12$.

**קודקוד** — נקודה שבה נפגשים מקצועות. יש $8$.

**קובייה** — תיבה שכל הפאות שלה ריבועים זהים.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה קודקודים יש לקובייה?',
        answer: 8,
        hint: '4 למעלה ו-4 למטה.',
        explain: 'לקובייה, כמו לכל תיבה, 8 קודקודים.',
      },
    },
    {
      id: 'volume',
      emoji: '🧊',
      title: 'נפח',
      blocks: [
        {
          type: 'box',
          caption: 'שנו את המידות וספרו כמה קוביות סנטימטר נכנסות:',
          l: 4,
          w: 3,
          h: 2,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'נפח תיבה',
          md: m`$$V=a\times b\times c$$

אורך × רוחב × גובה, ביחידות מעוקבות (סמ"ק). בקובייה: $V=a^3$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ק',
        prompt: 'תיבה באורך 5, ברוחב 4 ובגובה 3 ס"מ. מה הנפח?',
        answer: 60,
        hint: m`$5\times4\times3$`,
        explain: m`$5\times4\times3=60$ סמ"ק.`,
      },
    },
    {
      id: 'surface',
      emoji: '🎁',
      title: 'שטח פנים',
      blocks: [
        {
          type: 'text',
          md: 'שטח הפנים = כמה נייר עטיפה צריך כדי לעטוף את התיבה: סכום השטחים של כל 6 הפאות. הפאות באות **בזוגות** — מלמעלה ומלמטה, מלפנים ומאחור, מימין ומשמאל.',
        },
        {
          type: 'steps',
          title: m`תיבה $5\times4\times3$`,
          steps: [
            { math: m`2\times(5\times4)=${c(VIOLET, '40')}`, note: 'למעלה ולמטה.' },
            { math: m`2\times(5\times3)=${c(SKY, '30')}`, note: 'מלפנים ומאחור.' },
            { math: m`2\times(4\times3)=${c(RED, '24')}`, note: 'הצדדים.' },
            { math: m`40+30+24=${c(GREEN, '94')}`, note: 'סמ"ר.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: m`מה שטח הפנים של תיבה $6\times2\times1$ ס"מ?`,
        answer: 40,
        hint: m`$2\times(12+6+2)$`,
        explain: m`$2\times(6\times2+6\times1+2\times1)=2\times20=40$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: קובייה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'קובייה עם מקצוע a',
          md: m`נפח: $a^3$ · שטח פנים: $6a^2$ (שש פאות ריבועיות זהות)`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: 'מה שטח הפנים של קובייה שהמקצוע שלה 5 ס"מ?',
        answer: 150,
        hint: m`$6\times5^2$`,
        explain: m`$6\times25=150$ סמ"ר.`,
      },
    },
  ],
};
