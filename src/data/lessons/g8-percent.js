import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g8-percent',
  topicId: 'g8-percent',
  grade: 8,
  emoji: '💯',
  title: 'אחוזים',
  subtitle: 'מה זה אחוז, איך מחשבים חלק, והנחות ותוספות בחישוב אחד',
  sections: [
    {
      id: 'what',
      emoji: '🍕',
      title: 'אחוז = חלק מתוך 100',
      blocks: [
        {
          type: 'text',
          md: m`"אחוז" פירושו **מתוך 100**: $25\%=\frac{25}{100}=0.25$.

כדי לחשב אחוז ממספר — **הופכים את האחוז לעשרוני וכופלים**.`,
        },
        {
          type: 'percent',
          mode: 'part',
          total: 200,
          percent: 25,
          caption: m`כמה זה $p\%$ מתוך $200$? הזיזו את הסליידר:`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'קיצורי דרך',
          md: m`$50\%$ = חצי · $25\%$ = רבע · $10\%$ = מחלקים ב-10 · $1\%$ = מחלקים ב-100`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $30\%$ מתוך $80$?`,
        answer: 24,
        hint: m`$0.3\cdot80$, או: $10\%$ זה 8, אז $30\%$ זה…`,
        explain: m`$0.3\cdot80=24$`,
      },
    },
    {
      id: 'discount',
      emoji: '🏷️',
      title: 'הנחה',
      blocks: [
        {
          type: 'text',
          md: m`הנחה של $20\%$ = **נשאר** $80\%$ מהמחיר. במקום לחשב את ההנחה ולהחסיר — כופלים ישר ב-$0.8$.`,
        },
        {
          type: 'percent',
          mode: 'discount',
          total: 150,
          unit: '₪',
          percent: 20,
          caption: m`חולצה שעולה $150$ ₪. שנו את ההנחה:`,
        },
        {
          type: 'steps',
          title: m`מחיר אחרי הנחה של $30\%$ על $200$ ₪`,
          steps: [
            { math: m`100\%-30\%=${c(VIOLET, '70\\%')}`, note: 'כמה נשאר?' },
            { math: m`200\cdot${c(VIOLET, '0.7')}`, note: 'כופלים במה שנשאר.' },
            { math: c(GREEN, '140'), note: '140 ₪.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '₪',
        prompt: m`מכנסיים עולים $120$ ₪, ויש הנחה של $25\%$. מה המחיר אחרי ההנחה?`,
        answer: 90,
        hint: m`נשאר $75\%$: $120\cdot0.75$.`,
        explain: m`$120\cdot0.75=90$ ₪.`,
      },
    },
    {
      id: 'increase',
      emoji: '📈',
      title: 'תוספת (העלאת מחיר)',
      blocks: [
        {
          type: 'text',
          md: m`תוספת של $10\%$ = המחיר הופך ל-$110\%$. כופלים ב-$1.1$.`,
        },
        {
          type: 'percent',
          mode: 'increase',
          total: 50,
          unit: '₪',
          percent: 10,
          caption: m`כרטיס שעולה $50$ ₪ מתייקר. שנו את התוספת:`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'מלכודת נפוצה',
          md: m`תוספת $20\%$ ואז הנחה $20\%$ **לא** מחזירות למחיר המקורי!

$100\cdot1.2=120$, ואז $120\cdot0.8=96$. ההנחה מחושבת מהמחיר **החדש**.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '₪',
        prompt: m`משכורת של $6000$ ₪ עלתה ב-$5\%$. מה המשכורת החדשה?`,
        answer: 6300,
        hint: m`$6000\cdot1.05$`,
        explain: m`$6000\cdot1.05=6300$ ₪.`,
      },
    },
    {
      id: 'find-percent',
      emoji: '🏆',
      title: 'שלב הבוס: כמה אחוז זה?',
      blocks: [
        {
          type: 'text',
          md: m`הפוך: יודעים את החלק ואת השלם, ורוצים את האחוז. **מחלקים חלק בשלם וכופלים ב-100**.`,
        },
        {
          type: 'steps',
          title: m`בכיתה 30 תלמידים, 12 מהם בנות. כמה אחוז בנות?`,
          steps: [
            { math: m`\frac{12}{30}=0.4`, note: 'חלק חלקי שלם.' },
            { math: m`0.4\cdot100=${c(GREEN, '40\\%')}`, note: 'הופכים לאחוזים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '%',
        prompt: m`מתוך 50 שאלות במבחן, רוני ענה נכון על 45. כמה אחוז זה?`,
        answer: 90,
        hint: m`$\frac{45}{50}$, ואז כפול 100.`,
        explain: m`$\frac{45}{50}=0.9=90\%$`,
      },
    },
  ],
};
