import { m } from './tex.js';

export default {
  id: 'g10u3-science-society',
  topicId: 'g10-u3-science-society',
  grade: 10,
  units: 3,
  emoji: '🧭',
  title: 'תרגול מסכם — מדע וחברה',
  subtitle: 'גרפים, שכיחויות, מדדי מרכז והסתברות',
  sections: [
    {
      id: 'graph',
      emoji: '📉',
      title: 'גרף ונוסחה',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'תזכורת',
          md: 'שינוי נושא נוסחה — אותה פעולה בשני האגפים.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ק"מ',
        prompt: m`$t=\frac{d}{v}$. רכבת נסעה $2.5$ שעות במהירות $120$ קמ"ש. מה המרחק?`,
        answer: 300,
        hint: m`$d=v\cdot t$`,
        explain: m`$300$ ק"מ.`,
      },
    },
    {
      id: 'freq',
      emoji: '📋',
      title: 'שכיחות יחסית',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'תזכורת',
          md: m`שכיחות יחסית = השכיחות חלקי סך הכול. כולן יחד — $100\%$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '%',
        prompt: m`$45$ מתוך $180$ נשאלים הצביעו למפלגה א. מה השכיחות היחסית?`,
        answer: 25,
        hint: m`$\frac{45}{180}$`,
        explain: m`$25\%$`,
      },
    },
    {
      id: 'stats',
      emoji: '⚖️',
      title: 'חציון',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'תזכורת',
          md: 'מסדרים — ולוקחים את האמצעי (או ממוצע שני האמצעיים).',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה החציון של $12, 7, 15, 9, 20, 11$?`,
        answer: 11.5,
        tolerance: 0.001,
        hint: m`$7, 9, 11, 12, 15, 20$`,
        explain: m`$\frac{11+12}{2}=11.5$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: הסתברות',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'תזכורת',
          md: m`$P(\bar A)=1-P(A)$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`ב-$30\%$ מהבתים יש חתול. בוחרים שני בתים באקראי (בלתי תלויים). מה ההסתברות שבשניהם אין חתול?`,
        options: [m`$0.49$`, m`$0.7$`, m`$0.09$`, m`$1.4$`],
        answer: 0,
        hint: m`$0.7\cdot0.7$`,
        explain: m`$0.49$`,
      },
    },
  ],
};
