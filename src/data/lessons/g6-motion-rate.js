import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g6-motion-rate',
  topicId: 'g6-motion-rate',
  grade: 6,
  emoji: '🚗',
  title: 'תנועה — מהירות, זמן ודרך',
  subtitle: 'דרך = מהירות × זמן',
  sections: [
    {
      id: 'race',
      emoji: '🏁',
      title: 'מירוץ',
      blocks: [
        {
          type: 'race',
          v1: 60,
          v2: 90,
          caption: 'שתי מכוניות. שנו מהירויות והפעילו את השעון:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'המשולש',
          md: m`**דרך** = **מהירות** כפול **זמן**. $60$ קמ"ש במשך $2$ שעות ← $60\times2=120$ ק"מ.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ק"מ',
        prompt: m`מכונית נוסעת $80$ קמ"ש במשך $3$ שעות. כמה ק"מ עברה?`,
        answer: 240,
        hint: m`$80\times3$`,
        explain: m`$240$ ק"מ.`,
      },
    },
    {
      id: 'speed',
      emoji: '⏱️',
      title: 'מוצאים מהירות וזמן',
      blocks: [
        {
          type: 'steps',
          title: m`רכבת עברה $300$ ק"מ ב-$2$ שעות`,
          steps: [{ math: m`${c(VIOLET, '300')}:${c(VIOLET, '2')}=${c(GREEN, '150')}`, note: 'מהירות = דרך חלקי זמן — 150 קמ"ש.' }],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'וזמן?',
          md: m`זמן = דרך חלקי מהירות: $120$ ק"מ ב-$60$ קמ"ש ← $2$ שעות.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'שעות',
        prompt: m`כמה זמן ייקח לרכוב $45$ ק"מ במהירות $15$ קמ"ש?`,
        answer: 3,
        hint: m`$45:15$`,
        explain: m`$3$ שעות.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: חצי שעה',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'דקות ← שעות',
          md: m`$30$ דקות $=\frac12$ שעה, $15$ דקות $=\frac14$ שעה. $60$ קמ"ש במשך $30$ דקות: $60\times\frac12=30$ ק"מ.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ק"מ',
        prompt: m`אופנוע נוסע $100$ קמ"ש במשך $45$ דקות. כמה ק"מ עבר?`,
        answer: 75,
        hint: m`$45$ דקות $=\frac34$ שעה.`,
        explain: m`$100\times\frac34=75$ ק"מ.`,
      },
    },
  ],
};
