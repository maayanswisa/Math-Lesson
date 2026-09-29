import { m } from './tex.js';

export default {
  id: 'g10u3-space-tiling',
  topicId: 'g10-u3-space-tiling',
  grade: 10,
  units: 3,
  emoji: '🔷',
  title: 'ריצופים',
  subtitle: 'אילו מצולעים מכסים את הרצפה — ובכמה זה עולה',
  sections: [
    {
      id: 'angles',
      emoji: '📐',
      title: 'זווית במצולע משוכלל',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שתי נוסחאות',
          md: m`סכום הזוויות: $(n-2)\cdot180°$

זווית אחת במצולע משוכלל: $\frac{(n-2)\cdot180°}{n}$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '°',
        prompt: 'מה גודל זווית במשושה משוכלל?',
        answer: 120,
        hint: m`$\frac{4\cdot180}{6}$`,
        explain: m`$\frac{720}{6}=120°$`,
      },
    },
    {
      id: 'tile',
      emoji: '🧱',
      title: 'מי מרצף?',
      blocks: [
        {
          type: 'tessellation',
          caption: 'מצולעים סביב נקודה אחת — האם הם סוגרים 360° בדיוק?',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'התנאי',
          md: m`מצולע משוכלל מרצף לבד $\Leftrightarrow$ $360°$ מתחלק בזווית שלו. רק **שלושה**: משולש ($60°$), ריבוע ($90°$), משושה ($120°$).`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מחומש משוכלל (זווית $108°$) — מרצף?`,
        options: [m`לא — $360:108$ לא שלם`, 'כן', 'רק עם ריבועים', 'תלוי בגודל'],
        answer: 0,
        hint: m`$3\cdot108=324$`,
        explain: m`$360:108\approx3.33$ — נשאר רווח.`,
      },
    },
    {
      id: 'cost',
      emoji: '🏆',
      title: 'שלב הבוס: עלות ריצוף',
      blocks: [
        {
          type: 'steps',
          title: m`חדר $4\times5$ מטר, אריחים $50\times50$ ס"מ, $30$ ₪ לאריח`,
          steps: [
            { math: m`4\cdot5=20`, note: 'שטח החדר במ"ר.' },
            { math: m`0.5\cdot0.5=0.25`, note: 'שטח אריח במ"ר.' },
            { math: m`\frac{20}{0.25}=80`, note: 'מספר האריחים.' },
            { math: m`80\cdot30=2400`, note: 'העלות בש"ח.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה אריחים $20\times20$ ס"מ צריך למרפסת $3\times2$ מטר?`,
        answer: 150,
        hint: m`$\frac{6}{0.04}$`,
        explain: m`$150$ אריחים.`,
      },
    },
  ],
};
