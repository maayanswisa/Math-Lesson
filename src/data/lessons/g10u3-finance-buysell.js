import { m } from './tex.js';

export default {
  id: 'g10u3-finance-buysell',
  topicId: 'g10-u3-finance-buysell',
  grade: 10,
  units: 3,
  emoji: '🛍️',
  title: 'קנייה, מכירה, שכר, רווח והפסד',
  subtitle: 'משוואות ואחוזים בחיי היום-יום',
  sections: [
    {
      id: 'profit',
      emoji: '💹',
      title: 'רווח והפסד',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'רווח = מכירה פחות עלות',
          md: m`קנה ב-$80$, מכר ב-$100$: רווח $20$ ₪. אחוז הרווח — **מתוך העלות**: $\frac{20}{80}=25\%$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '%',
        prompt: m`סוחר קנה אופניים ב-$1{,}200$ ₪ ומכר ב-$900$ ₪. מה אחוז ההפסד?`,
        answer: 25,
        hint: m`$\frac{300}{1200}$`,
        explain: m`הפסד $300$ מתוך $1{,}200$ ← $25\%$.`,
      },
    },
    {
      id: 'discount',
      emoji: '🏷️',
      title: 'הנחה ושכר',
      blocks: [
        {
          type: 'percent',
          mode: 'discount',
          total: 400,
          percent: 15,
          unit: '₪',
          caption: 'מחיר 400 ₪. בחרו אחוז הנחה:',
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'שעות נוספות',
          md: m`שכר $40$ ₪ לשעה, ובשעות נוספות תוספת $25\%$: $40\times1.25=50$ ₪ לשעה.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '₪',
        prompt: m`עובדת ב-$45$ ₪ לשעה עבדה $8$ שעות רגילות ו-$2$ שעות נוספות (תוספת $50\%$). כמה הרוויחה?`,
        answer: 495,
        hint: m`$8\cdot45+2\cdot67.5$`,
        explain: m`$360+135=495$ ₪.`,
      },
    },
    {
      id: 'system',
      emoji: '🏆',
      title: 'שלב הבוס: מערכת משוואות',
      blocks: [
        {
          type: 'steps',
          title: m`$3$ חולצות ו-$2$ מכנסיים — $340$ ₪. חולצה ומכנסיים — $140$ ₪`,
          steps: [
            { math: m`3x+2y=340,\quad x+y=140`, note: 'משתנה לכל מחיר.' },
            { math: m`y=140-x`, note: 'מבודדים מהמשוואה הפשוטה.' },
            { math: m`3x+280-2x=340\Rightarrow x=60`, note: 'מציבים — חולצה 60 ₪, מכנסיים 80 ₪.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '₪',
        prompt: m`מחיר מוצר עלה ב-$20\%$ ועכשיו הוא $300$ ₪. מה היה המחיר המקורי?`,
        answer: 250,
        hint: m`$1.2x=300$`,
        explain: m`$x=\frac{300}{1.2}=250$ ₪.`,
      },
    },
  ],
};
