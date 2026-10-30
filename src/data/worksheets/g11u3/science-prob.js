import { exact, m, tf } from './shared.js';

/** טבלה דו-ממדית: בנים/בנות × ספורט/בלי ספורט (מ-100 תלמידים) */
const T = { boySport: 24, girlSport: 30, boyNo: 16, girlNo: 30 };
const TABLE = `<table style="border-collapse:collapse;text-align:center;font-size:15px;margin:0 auto"><tr><th style="border:1px solid #b9c3d0;padding:5px 10px"></th><th style="border:1px solid #b9c3d0;padding:5px 10px;background:#e8eef4">בנים</th><th style="border:1px solid #b9c3d0;padding:5px 10px;background:#e8eef4">בנות</th></tr><tr><th style="border:1px solid #b9c3d0;padding:5px 10px;background:#e8eef4">ספורט</th><td style="border:1px solid #b9c3d0;padding:5px 10px">${T.boySport}</td><td style="border:1px solid #b9c3d0;padding:5px 10px">${T.girlSport}</td></tr><tr><th style="border:1px solid #b9c3d0;padding:5px 10px;background:#e8eef4">בלי ספורט</th><td style="border:1px solid #b9c3d0;padding:5px 10px">${T.boyNo}</td><td style="border:1px solid #b9c3d0;padding:5px 10px">${T.girlNo}</td></tr></table>`;

export default {
  id: 'g11-u3-science-prob',
  grade: 11,
  emoji: '🎲',
  title: 'הסתברות: מאורעות תלויים ובלתי תלויים',
  reminder: [
    {
      title: 'משלים וכפל',
      md: m`$P(\bar{A})=1-P(A)$

בלתי תלויים: $P(A\ \text{וגם}\ B)=P(A)\cdot P(B)$`,
    },
    {
      title: 'לפחות אחד',
      md: m`$1-P(\text{אף אחד})$`,
    },
    {
      title: 'עץ וטבלה',
      wide: true,
      md: 'בעץ — כופלים לאורך מסלול, ומחברים מסלולים מתאימים. בלי החזרה — בהוצאה השנייה יש פחות כדורים. בטבלה, "אם ידוע ש…" — מחלקים רק בסך השורה או העמודה של מה שידוע. בדף הזה: שבר עשרוני, עד שלוש ספרות אחרי הנקודה.',
    },
  ],
  pages: [
    {
      title: 'משלים, בלתי תלויים ולפחות אחד',
      exercises: [
        {
          title: 'מה ההסתברות?',
          cols: 1,
          items: [
            { q: m`מטילים קובייה. מה ההסתברות **לא** לקבל $6$?`, a: m`$P =$ ${exact(5 / 6)}` },
            { q: m`מטילים שתי קוביות. מה ההסתברות לקבל $6$ בשתיהן?`, a: m`$P =$ ${exact(1 / 36)}` },
            { q: m`מטילים מטבע וקובייה. מה ההסתברות ל"עץ" וגם למספר זוגי?`, a: m`$P =$ ${exact(0.25)}` },
            { q: m`בבדיקה רפואית $90\%$ מהתוצאות נכונות. מה ההסתברות ששתי בדיקות בלתי תלויות יהיו נכונות?`, a: m`$P =$ ${exact(0.81)}` },
          ],
        },
        {
          title: 'לפחות אחד — דרך המשלים.',
          cols: 1,
          items: [
            { q: m`מטילים מטבע $3$ פעמים. מה ההסתברות ל"עץ" לפחות פעם אחת?`, a: m`$P =$ ${exact(7 / 8)}` },
            { q: m`מטילים קובייה $3$ פעמים. מה ההסתברות ל-$6$ לפחות פעם אחת?`, a: m`$P =$ ${exact(1 - (5 / 6) ** 3)}` },
            { q: m`ההסתברות לגשם בכל אחד מ-$3$ ימים היא $0.2$, בלי תלות. מה ההסתברות לגשם לפחות ביום אחד?`, a: m`$P =$ ${exact(1 - 0.8 ** 3)}` },
          ],
        },
      ],
    },
    {
      title: 'עץ וטבלה',
      exercises: [
        {
          title: m`בשקית $3$ כדורים אדומים ו-$2$ כחולים. מוציאים שני כדורים.`,
          cols: 1,
          items: [
            { q: 'בלי החזרה — מה ההסתברות לשני אדומים?', a: m`$P =$ ${exact((3 / 5) * (2 / 4))}` },
            { q: 'בלי החזרה — מה ההסתברות לשני כחולים?', a: m`$P =$ ${exact((2 / 5) * (1 / 4))}` },
            { q: 'בלי החזרה — מה ההסתברות לצבעים שונים?', a: m`$P =$ ${exact(2 * (3 / 5) * (2 / 4))}` },
            { q: 'עם החזרה — מה ההסתברות לשני אדומים?', a: m`$P =$ ${exact((3 / 5) ** 2)}` },
          ],
        },
        {
          title: 'טבלה: 100 תלמידים.',
          figure: `<div class="diagram-box">${TABLE}</div>`,
          cols: 1,
          items: [
            { q: 'בוחרים תלמיד באקראי. מה ההסתברות שהוא עוסק בספורט?', a: m`$P =$ ${exact(0.54)}` },
            { q: 'בוחרים בן באקראי. מה ההסתברות שהוא עוסק בספורט?', a: m`$P =$ ${exact(24 / 40)}` },
            { q: 'בוחרים באקראי תלמיד שעוסק בספורט. מה ההסתברות שזו בת?', a: m`$P =$ ${exact(30 / 54)}` },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [tf('בהוצאה בלי החזרה, המאורעות תלויים.', true), tf('ההסתברות ל"לפחות אחד" שווה תמיד לסכום ההסתברויות.', false)],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מה ההסתברות?', cols: 1, items: [{ q: m`מטילים מטבע $4$ פעמים. מה ההסתברות ל"עץ" לפחות פעם אחת?`, a: m`$P =$ ${exact(15 / 16)}` }] },
      {
        title: m`בשקית $4$ אדומים ו-$6$ כחולים. מוציאים שניים בלי החזרה.`,
        cols: 1,
        items: [
          { q: 'מה ההסתברות לשני כחולים?', a: m`$P =$ ${exact((6 / 10) * (5 / 9))}` },
          { q: 'מה ההסתברות לצבעים שונים?', a: m`$P =$ ${exact(2 * (4 / 10) * (6 / 9))}` },
        ],
      },
    ],
  },
};
