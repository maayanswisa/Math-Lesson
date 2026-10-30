import { c, GREEN, m, SKY, VIOLET } from './tex.js';

export default {
  id: 'g11u3-science-prob',
  topicId: 'g11-u3-science-prob',
  grade: 11,
  units: 3,
  emoji: '🎲',
  title: 'הסתברות: מאורעות תלויים ובלתי תלויים',
  subtitle: 'כלל הכפל, "לפחות אחד", דיאגרמת עץ וטבלה דו-ממדית',
  sections: [
    {
      id: 'basics',
      emoji: '🎯',
      title: 'הסתברות ומשלים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שני כללים בסיסיים',
          md: m`$$P(A)=\frac{\text{מספר האפשרויות המתאימות}}{\text{מספר כל האפשרויות}}$$

**המשלים** — "לא $A$": $P(\bar{A})=1-P(A)$`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'P =',
        tolerance: 0.005,
        prompt: m`מטילים קובייה. מה ההסתברות **לא** לקבל $6$?`,
        answer: 0.833,
        hint: m`$1-\frac16$`,
        explain: m`$\frac56\approx0.833$`,
      },
    },
    {
      id: 'independent',
      emoji: '🪙',
      title: 'מאורעות בלתי תלויים',
      blocks: [
        {
          type: 'coins',
          caption: 'הטילו מטבעות: התוצאה של מטבע אחד לא משפיעה על השני.',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'כלל הכפל',
          md: m`מאורעות **בלתי תלויים** — התוצאה של אחד לא משנה את ההסתברות של השני:

$$P(A\ \text{וגם}\ B)=P(A)\cdot P(B)$$`,
        },
        {
          type: 'steps',
          title: 'מטילים שתי קוביות. מה ההסתברות לקבל 6 בשתיהן?',
          steps: [
            { math: m`\frac16\cdot\frac16=${c(GREEN, '\\frac{1}{36}')}`, note: 'כל קובייה בלתי תלויה בשנייה.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'P =',
        tolerance: 0.002,
        prompt: m`מטילים מטבע וקובייה. מה ההסתברות לקבל "עץ" וגם $6$?`,
        answer: 0.0833,
        hint: m`$\frac12\cdot\frac16$`,
        explain: m`$\frac{1}{12}\approx0.083$`,
      },
    },
    {
      id: 'atleast',
      emoji: '🎯',
      title: '"לפחות אחד" — דרך המשלים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'קל יותר לחשב את המשלים',
          md: m`ההפך של "לפחות אחד" הוא "**אף אחד**":

$$P(\text{לפחות אחד})=1-P(\text{אף אחד})$$`,
        },
        {
          type: 'steps',
          title: m`מטילים קובייה $3$ פעמים. מה ההסתברות לקבל $6$ לפחות פעם אחת?`,
          steps: [
            { math: m`\left(\tfrac56\right)^3=\frac{125}{216}`, note: 'אף פעם לא 6.' },
            { math: m`1-\frac{125}{216}=\frac{91}{216}\approx${c(GREEN, '0.42')}`, note: 'לפחות פעם אחת.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'P =',
        tolerance: 0.001,
        prompt: m`מטילים מטבע $3$ פעמים. מה ההסתברות לקבל "עץ" לפחות פעם אחת?`,
        answer: 0.875,
        hint: m`אף פעם "עץ": $\left(\frac12\right)^3$`,
        explain: m`$1-\frac18=\frac78=0.875$`,
      },
    },
    {
      id: 'tree',
      emoji: '🌳',
      title: 'דיאגרמת עץ: עם החזרה ובלי',
      blocks: [
        {
          type: 'tree',
          red: 3,
          blue: 2,
          replace: false,
          caption: 'מוציאים שני כדורים מהשקית. החליפו בין "עם החזרה" ל"בלי החזרה":',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'בלי החזרה — מאורעות תלויים',
          md: m`בהוצאה השנייה כבר יש פחות כדורים, ולכן ההסתברות **משתנה**.

הסתברות של מסלול בעץ — **כופלים** לאורך הענפים. כמה מסלולים מתאימים — **מחברים**.`,
        },
        {
          type: 'steps',
          title: m`$3$ אדומים ו-$2$ כחולים. מוציאים שניים בלי החזרה. מה ההסתברות לשני אדומים?`,
          steps: [
            { math: m`\frac35`, note: 'הראשון אדום.' },
            { math: m`\frac24`, note: 'השני אדום — נשארו 2 אדומים מתוך 4.' },
            { math: m`\frac35\cdot\frac24=${c(GREEN, '\\frac{3}{10}')}`, note: '' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'P =',
        tolerance: 0.001,
        prompt: m`באותה שקית — $3$ אדומים ו-$2$ כחולים — מוציאים שני כדורים בלי החזרה. מה ההסתברות לשני כחולים?`,
        answer: 0.1,
        hint: m`$\frac25\cdot\frac14$`,
        explain: m`$\frac{2}{20}=0.1$`,
      },
    },
    {
      id: 'table',
      emoji: '📋',
      title: 'טבלה דו-ממדית',
      blocks: [
        {
          type: 'text',
          md: m`ב-$100$ תלמידים שאלו אם הם עוסקים בספורט:

<div class='diagram-box'><table style="border-collapse:collapse;text-align:center;font-size:15px"><tr><th style="border:1px solid #b9c3d0;padding:6px 12px"></th><th style="border:1px solid #b9c3d0;padding:6px 12px;background:#e8eef4">בנים</th><th style="border:1px solid #b9c3d0;padding:6px 12px;background:#e8eef4">בנות</th><th style="border:1px solid #b9c3d0;padding:6px 12px;background:#e8eef4">סך הכול</th></tr><tr><th style="border:1px solid #b9c3d0;padding:6px 12px;background:#e8eef4">ספורט</th><td style="border:1px solid #b9c3d0;padding:6px 12px">24</td><td style="border:1px solid #b9c3d0;padding:6px 12px">30</td><td style="border:1px solid #b9c3d0;padding:6px 12px">54</td></tr><tr><th style="border:1px solid #b9c3d0;padding:6px 12px;background:#e8eef4">בלי ספורט</th><td style="border:1px solid #b9c3d0;padding:6px 12px">16</td><td style="border:1px solid #b9c3d0;padding:6px 12px">30</td><td style="border:1px solid #b9c3d0;padding:6px 12px">46</td></tr><tr><th style="border:1px solid #b9c3d0;padding:6px 12px;background:#e8eef4">סך הכול</th><td style="border:1px solid #b9c3d0;padding:6px 12px">40</td><td style="border:1px solid #b9c3d0;padding:6px 12px">60</td><td style="border:1px solid #b9c3d0;padding:6px 12px">100</td></tr></table></div>`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הסתברות מותנית',
          md: m`"מה ההסתברות שתלמיד עוסק בספורט, **אם ידוע** שהוא בן?" — מסתכלים **רק על העמודה של הבנים**:

$$P(\text{ספורט}\mid\text{בן})=\frac{24}{40}=0.6$$`,
        },
        {
          type: 'steps',
          title: 'עוד שלוש שאלות על הטבלה',
          steps: [
            { math: m`P(\text{ספורט})=\frac{54}{100}=${c(SKY, '0.54')}`, note: 'מכל התלמידים.' },
            { math: m`P(\text{בת וגם ספורט})=\frac{30}{100}=0.3`, note: 'המשבצת המשותפת.' },
            { math: m`P(\text{ספורט}\mid\text{בת})=\frac{30}{60}=${c(VIOLET, '0.5')}`, note: 'רק מתוך הבנות.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'P =',
        tolerance: 0.005,
        prompt: m`לפי הטבלה: בוחרים באקראי תלמיד שעוסק בספורט. מה ההסתברות שזה בן?`,
        answer: 0.444,
        hint: 'רק מתוך 54 התלמידים שעוסקים בספורט.',
        explain: m`$\frac{24}{54}\approx0.444$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: צבעים שונים',
      blocks: [
        {
          type: 'steps',
          title: m`בשקית $4$ אדומים ו-$6$ כחולים. מוציאים שניים בלי החזרה. מה ההסתברות שהצבעים שונים?`,
          steps: [
            { math: m`\frac{4}{10}\cdot\frac69=\frac{24}{90}`, note: 'אדום ואז כחול.' },
            { math: m`\frac{6}{10}\cdot\frac49=\frac{24}{90}`, note: 'כחול ואז אדום.' },
            { math: m`\frac{24}{90}+\frac{24}{90}=\frac{48}{90}\approx${c(GREEN, '0.53')}`, note: 'שני מסלולים — מחברים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'P =',
        tolerance: 0.005,
        prompt: m`באותה שקית — $4$ אדומים ו-$6$ כחולים — מוציאים שניים בלי החזרה. מה ההסתברות ששניהם באותו צבע?`,
        answer: 0.467,
        hint: 'המשלים של "צבעים שונים".',
        explain: m`$1-\frac{48}{90}=\frac{42}{90}\approx0.467$`,
      },
    },
  ],
};
