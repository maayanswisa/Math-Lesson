const m = String.raw;

export default {
  topicId: 'g9x-equations',
  emoji: '📋',
  title: 'דף עזר: משוואות ממעלה ראשונה',
  subtitle: 'המאזניים, מעבר אגף, סוגריים ושאלות מילוליות',
  sections: [
    {
      title: 'משוואה = מאזניים',
      emoji: '⚖️',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'הכלל',
          md: m`מה שעושים לאגף אחד — עושים **גם** לשני. מעבר אגף **הופך** את הפעולה:

$+$ ↔ $-$ · $\;\times$ ↔ $\div$`,
        },
        {
          type: 'steps',
          title: m`$5x+2=3x+10$`,
          steps: [
            { math: m`5x-3x=10-2`, note: 'נעלמים לצד אחד, מספרים לשני.' },
            { math: m`2x=8`, note: 'מכנסים.' },
            { math: m`x=4`, note: 'מחלקים ב-2.' },
            { math: m`5\cdot4+2=22=3\cdot4+10\ \checkmark`, note: 'בדיקה.' },
          ],
        },
      ],
    },
    {
      title: 'עם סוגריים',
      emoji: '🧮',
      blocks: [
        {
          type: 'steps',
          title: m`$3(x-2)=x+8$`,
          steps: [
            { math: m`3x-6=x+8`, note: 'פותחים סוגריים — כופלים כל איבר.' },
            { math: m`2x=14`, note: 'מעבירים אגפים.' },
            { math: m`x=7`, note: 'הפתרון.' },
          ],
        },
      ],
    },
    {
      title: 'שאלה מילולית',
      emoji: '📝',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שלושה צעדים',
          md: `1. מסמנים את הנעלם (x = מה ששואלים).
2. כותבים משוואה לפי הסיפור.
3. פותרים, ו**עונים במילים**.`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: '3 מחברות ועט ב-5 ₪ — שולמו 26 ₪',
          md: m`$3x+5=26$ ← $3x=21$ ← $x=7$. מחברת עולה $7$ ₪.`,
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
          md: m`- מעבירים אגף ושוכחים להפוך סימן.
- $-2(x-3)=-2x+6$ — המינוס נכנס לכל איבר.
- $-x=5$ ← $x=-5$ (לא $5$).`,
        },
      ],
    },
  ],
};
