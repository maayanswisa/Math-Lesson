import { m } from './tex.js';

export default {
  id: 'g12u3-linear-programming',
  topicId: 'g12-u3-linear-programming',
  grade: 12,
  units: 3,
  emoji: '🏭',
  title: 'תכנון לינארי',
  subtitle: 'אילוצים, תחום פתרונות — והקודקוד המנצח',
  sections: [
    {
      id: 'constraints',
      emoji: '🚧',
      title: 'אילוצים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מפעל קטן',
          md: m`מייצרים $x$ שולחנות ו-$y$ כיסאות.

$x+y\le10$ (שעות עבודה)

$x+2y\le16$ (חומר גלם)

$x\ge0,\ y\ge0$

כל הנקודות שמקיימות את **כולם** — **תחום הפתרונות**.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזו נקודה בתוך תחום הפתרונות?',
        options: [m`$(5,4)$`, m`$(8,4)$`, m`$(2,8)$`, m`$(11,0)$`],
        answer: 0,
        hint: 'בודקים את שני האילוצים.',
        explain: m`$5+4=9\le10$, $5+8=13\le16$ ✓`,
      },
    },
    {
      id: 'objective',
      emoji: '🎯',
      title: 'פונקציית המטרה',
      blocks: [
        {
          type: 'lp',
          a: 3,
          b: 4,
          caption: m`רווח: $z=3x+4y$ (באלפי ₪). הגדילו את $z$ — הקו זז במקביל:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הכלל',
          md: m`הערך המקסימלי (או המינימלי) מתקבל תמיד **בקודקוד** של תחום הפתרונות.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה הרווח המקסימלי $z=3x+4y$ בתחום?`,
        answer: 36,
        hint: m`בודקים קודקודים: $(10,0)$, $(4,6)$, $(0,8)$.`,
        explain: m`$30$, $36$, $32$ ← מקסימום $36$ ב-$(4,6)$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מטרה אחרת',
      blocks: [
        {
          type: 'lp',
          a: 5,
          b: 2,
          caption: m`אותו תחום, רווח חדש $z=5x+2y$:`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'טבלת קודקודים',
          md: 'מוצאים את כל הקודקודים (חיתוכי הישרים), מציבים בפונקציית המטרה, ובוחרים את הגדול.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`באיזה קודקוד $z=5x+2y$ מקסימלית?`,
        options: [m`$(10,0)$`, m`$(4,6)$`, m`$(0,8)$`, m`$(0,0)$`],
        answer: 0,
        hint: m`$50$, $32$, $16$, $0$`,
        explain: m`$z(10,0)=50$ — הכי גדול.`,
      },
    },
  ],
};
