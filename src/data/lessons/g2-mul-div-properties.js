import { m } from './tex.js';

export default {
  id: 'g2-mul-div-properties',
  topicId: 'g2-mul-div-properties',
  grade: 2,
  emoji: '🔄',
  title: 'תכונות הכפל והחילוק',
  subtitle: 'אפס, אחד, ומה קורה כשמחליפים סדר',
  sections: [
    {
      id: 'one',
      emoji: '1️⃣',
      title: 'כפל ב-1 וב-0',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שני חוקים',
          md: m`**כפול 1** — לא משתנה: $7\times1=7$ (קבוצה אחת של 7).

**כפול 0** — תמיד אפס: $7\times0=0$ (שבע צלחות ריקות 🍽️).`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $256\times0$?`,
        answer: 0,
        hint: 'כמה יש ב-256 קבוצות ריקות?',
        explain: m`כל מספר כפול $0$ שווה $0$.`,
      },
    },
    {
      id: 'swap',
      emoji: '🔀',
      title: 'חוק החילוף',
      blocks: [
        {
          type: 'rect',
          l: 5,
          w: 3,
          caption: 'סובבו את הראש: 3 שורות של 5, או 5 טורים של 3 — אותן משבצות!',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הסדר לא משנה',
          md: m`$3\times5=5\times3=15$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איזה תרגיל שווה ל-$6\times4$?`,
        options: [m`$6+4$`, m`$4\times6$`, m`$6\times6$`, m`$4+4$`],
        answer: 1,
        hint: 'חוק החילוף.',
        explain: m`$6\times4=4\times6=24$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: חילוק ב-1 ובעצמו',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'בחילוק',
          md: m`$9:1=9$ — מחלקים לאדם אחד, הוא מקבל הכול.

$9:9=1$ — 9 ל-9 ילדים, כל אחד מקבל אחת.

$0:9=0$ — אין מה לחלק. (**אסור** לחלק באפס!)`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $48:48$?`,
        answer: 1,
        hint: 'מספר חלקי עצמו.',
        explain: m`$48:48=1$`,
      },
    },
  ],
};
