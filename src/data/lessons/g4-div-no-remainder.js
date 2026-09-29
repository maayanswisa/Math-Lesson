import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g4-div-no-remainder',
  topicId: 'g4-div-no-remainder',
  grade: 4,
  emoji: '➗',
  title: 'חילוק ללא שארית',
  subtitle: 'חילוק בעשרות ובמאות, פירוק, ותכונות 0 ו-1',
  sections: [
    {
      id: 'round',
      emoji: '🔟',
      title: 'חילוק מספרים עגולים',
      blocks: [
        {
          type: 'text',
          md: m`אם $12:3=4$, אז גם $120:3=40$ ו-$1{,}200:3=400$ — מחלקים **מאות** כמו שמחלקים יחידות.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $3{,}500:7$?`,
        answer: 500,
        hint: m`$35:7=5$`,
        explain: m`$35$ מאות חלקי $7$ = $5$ מאות: $500$.`,
      },
    },
    {
      id: 'split',
      emoji: '✂️',
      title: 'מפרקים ומחלקים',
      blocks: [
        {
          type: 'steps',
          title: m`$1{,}536:3$`,
          steps: [
            { math: m`(${c(VIOLET, '1{,}500')}+30+6):3`, note: 'מפרקים לחלקים שקל לחלק ב-3.' },
            { math: m`500+10+2`, note: 'מחלקים כל חלק.' },
            { math: c(GREEN, '512'), note: 'מחברים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $848:4$?`,
        answer: 212,
        hint: m`$(800+40+8):4$`,
        explain: m`$200+10+2=212$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: 0 ו-1',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תכונות',
          md: m`$a:1=a$

$a:a=1$

$0:a=0$

$a:0$ — **אסור!** אין תשובה לחילוק באפס.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה התשובה של $0:25$?`,
        options: [m`$0$`, m`$25$`, m`$1$`, 'אסור'],
        answer: 0,
        hint: 'כמה מקבל כל אחד כשאין כלום לחלק?',
        explain: m`$0:25=0$. (האסור הוא $25:0$.)`,
      },
    },
  ],
};
