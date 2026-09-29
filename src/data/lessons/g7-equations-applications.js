import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g7-equations-applications',
  topicId: 'g7-equations-applications',
  grade: 7,
  emoji: '📝',
  title: 'בעיות מילוליות עם משוואה',
  subtitle: 'מתרגמים סיפור למשוואה — ופותרים',
  sections: [
    {
      id: 'recipe',
      emoji: '📋',
      title: 'המתכון: ארבעה צעדים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'ארבעה צעדים',
          md: m`**1. מגדירים** — מה $x$? כותבים במילים.

**2. בונים** — מתרגמים את הסיפור למשוואה.

**3. פותרים.**

**4. בודקים** — האם התשובה הגיונית בסיפור?`,
        },
        {
          type: 'steps',
          title: 'גיל דנה גדול פי 3 מגיל אחיה, וסכום גיליהם 24. בן כמה האח?',
          steps: [
            { math: m`x=\text{?}`, note: 'מגדירים: x = גיל האח. אז גיל דנה = 3x.' },
            { math: m`${c(VIOLET, 'x')}+${c(VIOLET, '3x')}=24`, note: 'בונים: סכום הגילים 24.' },
            { math: m`4x=24\ \Rightarrow\ x=${c(GREEN, '6')}`, note: 'פותרים.' },
            { math: m`6+18=24`, note: 'בודקים: האח בן 6, דנה בת 18 ✔️' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'x =',
        prompt: 'לנועם יש פי 2 גולות מלרון, וביחד יש להם 45 גולות. כמה גולות יש לרון?',
        answer: 15,
        hint: m`$x+2x=45$`,
        explain: m`$3x=45$, ולכן $x=15$. לרון 15, לנועם 30.`,
      },
    },
    {
      id: 'money',
      emoji: '🛒',
      title: 'כסף וקניות',
      blocks: [
        {
          type: 'steps',
          title: 'קנו 3 חולצות ומכנסיים ב-80 ש"ח, ושילמו 230 ש"ח. כמה עולה חולצה?',
          steps: [
            { math: m`x`, note: 'x = מחיר חולצה.' },
            { math: m`3x+80=230`, note: 'שלוש חולצות ועוד המכנסיים.' },
            { math: m`3x=150\ \Rightarrow\ x=${c(GREEN, '50')}`, note: 'חולצה עולה 50 ש"ח.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ש"ח',
        prompt: 'מחיר כניסה לפארק הוא 40 ש"ח, וכל מתקן עולה עוד מחיר קבוע. יוסי עלה על 5 מתקנים ושילם 100 ש"ח. כמה עולה מתקן?',
        answer: 12,
        hint: m`$40+5x=100$`,
        explain: m`$5x=60$, ולכן $x=12$.`,
      },
    },
    {
      id: 'motion',
      emoji: '🚲',
      title: 'שלב הבוס: בעיית תנועה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'הקשר',
          md: m`**דרך = מהירות × זמן**

$$d=v\times t$$

למשל, 60 קמ"ש במשך 2 שעות — עוברים 120 ק"מ.`,
        },
        {
          type: 'steps',
          title: 'שני רוכבים יוצאים זה מול זה ממרחק 60 ק"מ, אחד ב-12 קמ"ש והשני ב-18 קמ"ש. מתי ייפגשו?',
          steps: [
            { math: m`t`, note: 't = מספר השעות עד הפגישה.' },
            { math: m`12t+18t=60`, note: 'ביחד עברו את כל 60 הק"מ.' },
            { math: m`30t=60\ \Rightarrow\ t=${c(GREEN, '2')}`, note: 'ייפגשו אחרי שעתיים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'קמ"ש',
        prompt: 'מכונית נסעה 3 שעות במהירות קבועה, ואז עוד 50 ק"מ. בסך הכול נסעה 290 ק"מ. מה הייתה המהירות?',
        answer: 80,
        hint: m`$3v+50=290$`,
        explain: m`$3v=240$, ולכן $v=80$ קמ"ש.`,
      },
    },
  ],
};
