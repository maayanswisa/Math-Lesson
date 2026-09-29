import { c, GREEN, m, RED } from './tex.js';

export default {
  id: 'g7-signed-mul-div',
  topicId: 'g7-signed-mul-div',
  grade: 7,
  emoji: '✖️',
  title: 'כפל וחילוק מספרים מכוונים',
  subtitle: 'כלל הסימנים — ולמה מינוס כפול מינוס זה פלוס',
  sections: [
    {
      id: 'pos-neg',
      emoji: '➖',
      title: 'חיובי כפול שלילי',
      blocks: [
        {
          type: 'text',
          md: m`כפל הוא חיבור חוזר: $3\times(-2)=(-2)+(-2)+(-2)=-6$. שלוש פעמים חוב של 2 — חוב של 6.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'סימנים שונים ← שלילי',
          md: m`$(+)\times(-)=(-)$ וגם $(-)\times(+)=(-)$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $(-7)\times4$?`,
        answer: -28,
        hint: 'סימנים שונים.',
        explain: m`$7\times4=28$, וסימנים שונים ← $-28$.`,
      },
    },
    {
      id: 'neg-neg',
      emoji: '🤯',
      title: 'שלילי כפול שלילי',
      blocks: [
        {
          type: 'steps',
          title: m`תבנית שמסבירה הכול: כופלים ב-$-3$ ומקטינים את המספר השני`,
          steps: [
            { math: m`(-3)\times2=-6`, note: 'את זה כבר יודעים.' },
            { math: m`(-3)\times1=-3`, note: 'התוצאה עלתה ב-3.' },
            { math: m`(-3)\times0=0`, note: 'עוד 3.' },
            { math: m`(-3)\times(-1)=${c(GREEN, '3')}`, note: 'ממשיכים באותה תבנית — עוד 3!' },
            { math: m`(-3)\times(-2)=${c(GREEN, '6')}`, note: 'ושוב.' },
          ],
        },
        {
          type: 'card',
          tone: 'key',
          title: 'סימנים זהים ← חיובי',
          md: m`$(+)\times(+)=(+)$ וגם $(-)\times(-)=(+)$

אותו כלל בדיוק גם ב**חילוק**: $(-12):(-4)=3$, ואילו $(-12):4=-3$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה זה $(-36):(-9)$?`,
        options: [m`$-4$`, m`$4$`, m`$-27$`, m`$45$`],
        answer: 1,
        hint: 'סימנים זהים.',
        explain: m`$36:9=4$, וסימנים זהים ← $4$.`,
      },
    },
    {
      id: 'count',
      emoji: '🔢',
      title: 'שלב הבוס: סופרים מינוסים',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'טריק לכמה גורמים',
          md: m`סופרים את המינוסים: מספר **זוגי** ← התוצאה חיובית. מספר **אי-זוגי** ← התוצאה שלילית.`,
        },
        {
          type: 'steps',
          title: m`$(-2)\times(-5)\times(-1)\times3$`,
          steps: [
            { math: m`${c(RED, '(-)\\ (-)\\ (-)')}`, note: 'שלושה מינוסים — אי-זוגי, התוצאה שלילית.' },
            { math: m`2\times5\times1\times3=30`, note: 'מחשבים בלי סימנים.' },
            { math: c(RED, '-30'), note: 'ומוסיפים את הסימן.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $(-1)\times(-2)\times(-3)\times(-4)$?`,
        answer: 24,
        hint: 'כמה מינוסים יש?',
        explain: m`ארבעה מינוסים — זוגי, חיובי: $1\times2\times3\times4=24$.`,
      },
    },
  ],
};
