import { m } from './tex.js';

export default {
  id: 'g12u5-complex-basics',
  topicId: 'g12-u5-complex-basics',
  grade: 12,
  units: 5,
  emoji: '🌀',
  title: 'מספרים מרוכבים — הגדרה ופעולות',
  subtitle: 'המספר i, מישור גאוס, צמוד וערך מוחלט',
  sections: [
    {
      id: 'i',
      emoji: '💡',
      title: 'המספר i',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שורש של מינוס אחד',
          md: m`$$i^2=-1$$

מספר מרוכב: $z=a+bi$ — $a$ החלק הממשי, $b$ החלק המדומה. $i^3=-i$, $i^4=1$ — ומתחילים מחדש.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה זה $i^{10}$?`,
        options: [m`$-1$`, m`$1$`, m`$i$`, m`$-i$`],
        answer: 0,
        hint: m`$10=4\cdot2+2$`,
        explain: m`$i^{10}=i^2=-1$`,
      },
    },
    {
      id: 'plane',
      emoji: '🗺️',
      title: 'מישור גאוס',
      blocks: [
        {
          type: 'complex',
          mode: 'basic',
          caption: m`כל מרוכב — נקודה. הצמוד $\bar z$ — שיקוף בציר הממשי:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'צמוד וערך מוחלט',
          md: m`$\overline{a+bi}=a-bi$

$|a+bi|=\sqrt{a^2+b^2}$

$z\cdot\bar z=|z|^2$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה $|6-8i|$?`,
        answer: 10,
        hint: m`$\sqrt{36+64}$`,
        explain: m`$10$`,
      },
    },
    {
      id: 'ops',
      emoji: '🏆',
      title: 'שלב הבוס: כפל וחילוק',
      blocks: [
        {
          type: 'steps',
          title: m`$\frac{5+i}{1+i}$`,
          steps: [
            { math: m`\frac{(5+i)(1-i)}{(1+i)(1-i)}`, note: 'כופלים בצמוד של המכנה.' },
            { math: m`=\frac{5-5i+i-i^2}{2}=\frac{6-4i}{2}`, note: 'פותחים סוגריים.' },
            { math: m`=3-2i`, note: 'התוצאה.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה זה $(2+3i)(1-i)$?`,
        options: [m`$5+i$`, m`$-1+i$`, m`$2-3i$`, m`$5-i$`],
        answer: 0,
        hint: m`$2-2i+3i-3i^2$`,
        explain: m`$2+3+i=5+i$`,
      },
    },
  ],
};
