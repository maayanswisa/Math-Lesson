import { m } from './tex.js';

export default {
  id: 'g6-geometry',
  topicId: 'g6-geometry',
  grade: 6,
  emoji: '📦',
  title: 'נפח ושטח פנים של תיבה',
  subtitle: 'אורך × רוחב × גובה, ליטרים וקמ"ק',
  sections: [
    {
      id: 'volume',
      emoji: '🧊',
      title: 'נפח תיבה',
      blocks: [
        {
          type: 'box',
          l: 4,
          w: 3,
          h: 2,
          caption: 'שנו את המידות. כמה קוביות בתיבה?',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'נפח',
          md: m`$$V=a\times b\times c$$
`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ק',
        prompt: m`תיבה $5\times4\times3$ ס"מ. מה הנפח?`,
        answer: 60,
        hint: m`$5\times4\times3$`,
        explain: m`$60$ סמ"ק.`,
      },
    },
    {
      id: 'surface',
      emoji: '🎁',
      title: 'שטח פנים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שש פאות, שלושה זוגות',
          md: m`$$S=2(ab+ac+bc)$$

כמה נייר עטיפה צריך כדי לעטוף את התיבה.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: 'מה שטח הפנים של קובייה עם צלע 3 ס"מ?',
        answer: 54,
        hint: m`$6$ פאות של $3\times3$.`,
        explain: m`$6\times9=54$ סמ"ר.`,
      },
    },
    {
      id: 'liters',
      emoji: '🏆',
      title: 'שלב הבוס: ליטרים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'ליטר = קוב של 10 ס"מ',
          md: m`$1$ ליטר $=1{,}000$ סמ"ק $=1$ קמ"ק (דצימטר מעוקב).

$1$ מ"ק $=1{,}000$ ליטר.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ליטר',
        prompt: m`אקווריום $50\times30\times40$ ס"מ. כמה ליטר מים נכנסים בו?`,
        answer: 60,
        hint: m`$60{,}000$ סמ"ק.`,
        explain: m`$50\times30\times40=60{,}000$ סמ"ק $=60$ ליטר.`,
      },
    },
  ],
};
