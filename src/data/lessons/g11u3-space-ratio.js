import { m } from './tex.js';

export default {
  id: 'g11u3-space-ratio',
  topicId: 'g11-u3-space-ratio',
  grade: 11,
  units: 3,
  emoji: '🗺️',
  title: 'יחס, פרופורציה וקנה מידה',
  subtitle: 'מפות, תמונות והמרת יחידות',
  sections: [
    {
      id: 'ratio',
      emoji: '🔵',
      title: 'יחס ופרופורציה',
      blocks: [
        {
          type: 'ratio',
          a: 3,
          b: 5,
          total: 64,
          caption: 'שנו את היחס ואת הכמות הכוללת:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'כפל בהצלבה',
          md: m`$$a:b=c:d\iff a\cdot d=b\cdot c$$

$3:5=x:20$ ← $5x=60$ ← $x=12$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מלבן ביחס צלעות $2:3$ והיקף $40$. מה הצלע הארוכה?`,
        answer: 12,
        hint: m`$2(2x+3x)=40$`,
        explain: m`$x=4$ ← $3\cdot4=12$`,
      },
    },
    {
      id: 'scale',
      emoji: '📐',
      title: 'קנה מידה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: m`קנה מידה $1:n$`,
          md: m`מידה אמיתית $=$ מידה בשרטוט $\times n$. **המירו יחידות!** $1:50{,}000$ — $1$ ס"מ במפה $=500$ מטר.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ק"מ',
        prompt: m`במפה בקנה מידה $1:50{,}000$ המרחק $6$ ס"מ. מה המרחק האמיתי?`,
        answer: 3,
        hint: m`$6\cdot50{,}000=300{,}000$ ס"מ.`,
        explain: m`$3$ ק"מ.`,
      },
    },
    {
      id: 'area',
      emoji: '🏆',
      title: 'שלב הבוס: יחס שטחים',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'שטח — בריבוע',
          md: m`יחס שטחים $=($יחס אורכים$)^2$. מגדילים תמונה פי $3$ ← השטח גדל פי $9$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ"ר',
        prompt: m`בשרטוט $1:100$ חדר בשטח $12$ סמ"ר. מה שטחו האמיתי?`,
        answer: 12,
        hint: m`פי $100^2=10{,}000$: $120{,}000$ סמ"ר.`,
        explain: m`$120{,}000$ סמ"ר $=12$ מ"ר.`,
      },
    },
  ],
};
