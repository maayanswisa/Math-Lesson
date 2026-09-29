import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g7-combine-distribute',
  topicId: 'g7-combine-distribute',
  grade: 7,
  emoji: '🧩',
  title: 'כינוס איברים דומים וחוק הפילוג',
  subtitle: 'מסדרים ביטויים: מחברים את הדומים ופותחים סוגריים',
  sections: [
    {
      id: 'like',
      emoji: '🍎',
      title: 'איברים דומים',
      blocks: [
        {
          type: 'text',
          md: m`$3$ תפוחים ועוד $5$ תפוחים = $8$ תפוחים. אבל $3$ תפוחים ועוד $5$ בננות — אי אפשר לכתוב "8 משהו".

באלגברה אותו דבר: $3x+5x=8x$, אבל את $3x+5$ לא מכנסים.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'מה נחשב דומה?',
          md: m`אותו משתנה **ובאותה חזקה**: $2x^2$ ו-$7x^2$ דומים. $3x$ ו-$3x^2$ — **לא** דומים.`,
        },
        {
          type: 'steps',
          title: m`$4x+7-x+2$`,
          steps: [
            { math: m`${c(VIOLET, '4x-x')}+${c(GREEN, '7+2')}`, note: 'מקבצים: איברי x יחד, מספרים יחד (כל איבר עם הסימן שלפניו).' },
            { math: m`${c(VIOLET, '3x')}+${c(GREEN, '9')}`, note: 'מכנסים.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה התוצאה של $6a+3-2a-8$?`,
        options: [m`$4a-5$`, m`$8a-5$`, m`$4a+11$`, m`$-a$`],
        answer: 0,
        hint: m`$6a-2a$ ו-$3-8$.`,
        explain: m`$6a-2a=4a$ ו-$3-8=-5$: $4a-5$.`,
      },
    },
    {
      id: 'distribute',
      emoji: '🎁',
      title: 'חוק הפילוג',
      blocks: [
        {
          type: 'text',
          md: m`$3(x+2)$ = שלוש חבילות, ובכל חבילה $x$ ועוד $2$. לחצו לסדר את התוכן לפי סוג:`,
        },
        { type: 'groups', k: 3, xs: 1, units: 2 },
        {
          type: 'card',
          tone: 'key',
          title: 'חוק הפילוג',
          md: m`$$a(b+c)=ab+ac$$
המספר שבחוץ **כופל כל איבר** בפנים: $3(x+4)=3x+12$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה התוצאה של $5(2x-3)$?`,
        options: [m`$10x-3$`, m`$10x-15$`, m`$7x-8$`, m`$10x+15$`],
        answer: 1,
        hint: m`$5\times2x$ וגם $5\times(-3)$.`,
        explain: m`$5\times2x=10x$ ו-$5\times(-3)=-15$.`,
      },
    },
    {
      id: 'minus',
      emoji: '⚠️',
      title: 'מינוס לפני סוגריים',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'כל הסימנים מתהפכים',
          md: m`מינוס לפני סוגריים = כפל ב-$-1$. לכן **כל** איבר בפנים מחליף סימן:

$-(2x-3)=${c(RED, '-2x+3')}$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה התוצאה של $10-(x+4)$?`,
        options: [m`$14-x$`, m`$6-x$`, m`$6+x$`, m`$10-x+4$`],
        answer: 1,
        hint: m`$-(x+4)=-x-4$`,
        explain: m`$10-x-4=6-x$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: פותחים ומכנסים',
      blocks: [
        {
          type: 'steps',
          title: m`$2(x+3)+4x$`,
          steps: [
            { math: m`${c(VIOLET, '2x+6')}+4x`, note: 'פותחים סוגריים.' },
            { math: m`${c(GREEN, '6x+6')}`, note: 'מכנסים איברים דומים.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`פשטו: $3(x-2)-(x-5)$`,
        options: [m`$2x-1$`, m`$2x-11$`, m`$4x-1$`, m`$2x+3$`],
        answer: 0,
        hint: m`$3x-6-x+5$`,
        explain: m`$3x-6-x+5=2x-1$`,
      },
    },
  ],
};
