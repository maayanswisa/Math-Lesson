const m = String.raw;

export default {
  topicId: 'g9r-quad-eq',
  emoji: '📋',
  title: 'דף עזר: משוואות ריבועיות',
  subtitle: 'נוסחת השורשים, הדיסקרימיננטה, דרכים מהירות, ומערכת של ישר ופרבולה',
  sections: [
    {
      title: 'נוסחת השורשים',
      emoji: '🧮',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'ax² + bx + c = 0',
          md: m`$$x_{1,2}=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$

$\Delta=b^2-4ac$: $\;\Delta>0$ — שני פתרונות · $\Delta=0$ — פתרון אחד · $\Delta<0$ — אין פתרון.`,
        },
        {
          type: 'steps',
          title: m`$x^2-5x+6=0$`,
          steps: [
            { math: m`\Delta=25-24=1`, note: 'a=1, b=−5, c=6.' },
            { math: m`x=\frac{5\pm1}{2}\ \Rightarrow\ x=3,\ x=2`, note: 'שני פתרונות.' },
          ],
        },
      ],
    },
    {
      title: 'דרכים מהירות',
      emoji: '⚡',
      blocks: [
        {
          type: 'table',
          head: ['הצורה', 'הדרך', 'דוגמה'],
          rows: [
            [m`$ax^2+bx=0$`, 'גורם משותף', m`$x(x-5)=0$ ← $0,5$`],
            [m`$ax^2+c=0$`, m`מבודדים $x^2$`, m`$x^2=9$ ← $\pm3$`],
            ['טרינום שמתפרק', 'פירוק', m`$(x-2)(x-3)=0$ ← $2,3$`],
            ['כל השאר', 'נוסחת השורשים', '—'],
          ],
        },
      ],
    },
    {
      title: 'ישר ופרבולה',
      emoji: '📈',
      blocks: [
        {
          type: 'steps',
          title: m`$y=x^2$ ו-$y=x+2$`,
          steps: [
            { math: m`x^2=x+2\ \Rightarrow\ x^2-x-2=0`, note: 'משווים את ה-y-ים.' },
            { math: m`x=2,\ x=-1`, note: 'פותרים.' },
            { math: m`(2,4),\ (-1,1)`, note: 'מציבים ומקבלים את נקודות החיתוך.' },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'מספר נקודות החיתוך',
          md: m`$\Delta>0$ — הישר חותך את הפרבולה בשתי נקודות · $\Delta=0$ — משיק · $\Delta<0$ — לא נפגשים.`,
        },
      ],
    },
    {
      title: 'מלכודות',
      emoji: '⚠️',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'טעויות נפוצות',
          md: m`- לא מעבירים הכל לאגף אחד (צריך $0$ באגף השני).
- $-b$ כש-$b$ שלילי: $b=-5$ ← $-b=5$.
- $x^2=9$ — **שני** פתרונות, $\pm3$.
- מחלקים ב-$x$ ב-$x^2=5x$ ומאבדים את $x=0$.`,
        },
      ],
    },
  ],
};
