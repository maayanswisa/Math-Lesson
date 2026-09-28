import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g8-ratio-proportion-scale',
  topicId: 'g8-ratio-proportion-scale',
  grade: 8,
  emoji: '⚗️',
  title: 'יחס, פרופורציה וקנה מידה',
  subtitle: 'חלוקה ביחס, כפל בהצלבה, קנה מידה, ויחס ישר מול יחס הפוך',
  sections: [
    {
      id: 'ratio',
      emoji: '🍹',
      title: 'מה זה יחס?',
      blocks: [
        {
          type: 'text',
          md: m`מיץ שמכינים ביחס **$1:3$** (סירופ למים): על כל כוס סירופ — 3 כוסות מים.

אפשר **להכפיל או לחלק** את שני הצדדים באותו מספר — והיחס לא משתנה: $1:3=2:6=5:15$.`,
        },
        {
          type: 'steps',
          title: m`מחלקים 40 סוכריות בין דנה ורון ביחס $3:5$`,
          steps: [
            { math: m`3+5=${c(VIOLET, '8')}`, note: 'כמה "חלקים" יש בסך הכול?' },
            { math: m`40\div8=${c(RED, '5')}`, note: 'כמה סוכריות בכל חלק?' },
            { math: m`3\cdot5=15\quad,\quad 5\cdot5=25`, note: 'דנה מקבלת 3 חלקים, רון 5.' },
            { math: c(GREEN, '15+25=40\\ \\checkmark'), note: 'בדיקה: הסכום נכון.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מחלקים 60 ₪ בין שני אחים ביחס $1:2$. כמה ₪ יקבל האח שמקבל **יותר**?`,
        answer: 40,
        hint: m`$1+2=3$ חלקים. כמה שווה חלק אחד?`,
        explain: m`$60\div3=20$ לחלק. האח השני מקבל 2 חלקים: $40$ ₪.`,
      },
    },
    {
      id: 'proportion',
      emoji: '✖️',
      title: 'פרופורציה וכפל בהצלבה',
      blocks: [
        {
          type: 'text',
          md: m`**פרופורציה** = שני יחסים שווים. כשחסר מספר אחד, **כופלים בהצלבה**:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'כפל בהצלבה',
          md: m`$$\frac{a}{b}=\frac{c}{d}\ \Longleftrightarrow\ a\cdot d=b\cdot c$$`,
        },
        {
          type: 'steps',
          title: m`3 מחברות עולות 12 ₪. כמה עולות 5 מחברות?`,
          steps: [
            { math: m`\frac{3}{12}=\frac{5}{x}`, note: 'מחברות חלקי מחיר — אותו יחס.' },
            { math: m`3\cdot x=12\cdot5`, note: 'כפל בהצלבה.' },
            { math: m`3x=60\ \Rightarrow\ ${c(GREEN, 'x=20')}`, note: '20 ₪.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        prompt: m`$\dfrac{4}{6}=\dfrac{x}{15}$. מהו $x$?`,
        answer: 10,
        hint: m`$6\cdot x=4\cdot15$`,
        explain: m`$6x=60\Rightarrow x=10$`,
      },
    },
    {
      id: 'scale',
      emoji: '🗺️',
      title: 'קנה מידה',
      blocks: [
        {
          type: 'text',
          md: m`במפה בקנה מידה **$1:1000$**, כל ס"מ במפה = $1000$ ס"מ במציאות (= 10 מטר).`,
        },
        {
          type: 'steps',
          title: m`במפה $1:50{,}000$ המרחק בין שני כפרים הוא 4 ס"מ. מה המרחק האמיתי?`,
          steps: [
            { math: m`4\cdot50{,}000=200{,}000`, note: 'כופלים בקנה המידה — יוצא בס"מ.' },
            { math: m`200{,}000\div100=2{,}000`, note: 'מחלקים ב-100 — עכשיו במטרים.' },
            { math: m`2{,}000\div1{,}000=${c(GREEN, '2')}`, note: 'מחלקים ב-1000 — 2 קילומטרים.' },
          ],
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'שימו לב ליחידות',
          md: m`קנה מידה עובד כש**שני הצדדים באותה יחידה**. קודם מחשבים, ורק בסוף ממירים.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ\'',
        prompt: m`בשרטוט בקנה מידה $1:200$ אורך החדר הוא 3 ס"מ. מה האורך האמיתי **במטרים**?`,
        answer: 6,
        hint: m`$3\cdot200=600$ ס"מ. כמה מטרים זה?`,
        explain: m`$600$ ס"מ $=6$ מטרים.`,
      },
    },
    {
      id: 'direct-inverse',
      emoji: '🔁',
      title: 'יחס ישר מול יחס הפוך',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'יחס ישר',
          md: m`אחד גדל — השני גדל **באותו יחס**. **המנה** קבועה.

2 ק"ג תפוחים = 20 ₪, 4 ק"ג = 40 ₪. (מחיר ÷ משקל $=10$ תמיד)`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'יחס הפוך',
          md: m`אחד גדל **פי כמה** — השני **קטן** פי אותו מספר. **המכפלה** קבועה.

4 פועלים — 6 ימים, 8 פועלים — 3 ימים. ($4\cdot6=8\cdot3=24$ תמיד)`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ימים',
        prompt: m`3 צבעים צובעים בית ב-8 ימים. בכמה ימים יצבעו אותו 6 צבעים (באותו קצב)?`,
        answer: 4,
        hint: 'יחס הפוך: יותר צבעים → פחות ימים. המכפלה קבועה: $3\\cdot8$.',
        explain: m`$3\cdot8=24$, ולכן $6\cdot x=24\Rightarrow x=4$ ימים.`,
      },
    },
  ],
};
