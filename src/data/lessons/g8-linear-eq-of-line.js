import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g8-linear-eq-of-line',
  topicId: 'g8-linear-eq-of-line',
  grade: 8,
  emoji: '📐',
  title: 'מציאת משוואת הקו הישר',
  subtitle: 'משיפוע ונקודה, משתי נקודות, ישרים מקבילים לצירים ונקודת חיתוך',
  sections: [
    {
      id: 'slope-point',
      emoji: '📍',
      title: 'שיפוע + נקודה = ישר',
      blocks: [
        {
          type: 'text',
          md: m`כדי לכתוב $y=mx+b$ צריך לדעת **שני מספרים**: $m$ ו-$b$.

אם יודעים את $m$ ונקודה אחת שעל הישר — מציבים את הנקודה ומגלים את $b$.`,
        },
        {
          type: 'steps',
          title: m`ישר עם שיפוע $2$ שעובר דרך $(3,11)$`,
          steps: [
            { math: m`y=${c(VIOLET, '2')}x+b`, note: m`מכניסים את השיפוע שידוע לנו.` },
            { math: m`${c(RED, '11')}=2\cdot${c(RED, '3')}+b`, note: m`מציבים את הנקודה: $x=3$, $y=11$.` },
            { math: m`11=6+b\ \Rightarrow\ b=5`, note: 'פותרים משוואה פשוטה.' },
            { math: c(GREEN, 'y=2x+5'), note: 'זו משוואת הישר!' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'b =',
        prompt: m`ישר עם שיפוע $3$ עובר דרך הנקודה $(2,10)$. מהו $b$?`,
        answer: 4,
        hint: m`הציבו: $10=3\cdot2+b$.`,
        explain: m`$10=6+b$, ולכן $b=4$ והישר הוא $y=3x+4$.`,
      },
    },
    {
      id: 'two-points',
      emoji: '✌️',
      title: 'שתי נקודות — קודם השיפוע',
      blocks: [
        {
          type: 'text',
          md: m`השיפוע הוא "כמה עולים חלקי כמה זזים ימינה":`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שיפוע משתי נקודות',
          md: m`$$m=\frac{y_2-y_1}{x_2-x_1}$$
שינוי ב-$y$ חלקי שינוי ב-$x$.`,
        },
        {
          type: 'line',
          caption: m`הישר דרך $(1,3)$ ו-$(3,7)$: זזים 2 ימינה ועולים 4 — שיפוע $\frac{4}{2}=2$.`,
          lines: [{ m: 2, b: 1 }],
          points: [
            { x: 1, y: 3, label: '(1,3)' },
            { x: 3, y: 7, label: '(3,7)' },
          ],
          range: 8,
        },
        {
          type: 'steps',
          title: m`המשוואה של הישר דרך $(1,3)$ ו-$(3,7)$`,
          steps: [
            { math: m`m=\frac{7-3}{3-1}=\frac{4}{2}=2`, note: 'צעד 1: שיפוע.' },
            { math: m`3=2\cdot1+b\ \Rightarrow\ b=1`, note: 'צעד 2: מציבים נקודה אחת.' },
            { math: c(GREEN, 'y=2x+1'), note: m`בדיקה עם הנקודה השנייה: $2\cdot3+1=7$ ✔️` },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'm =',
        prompt: m`מה השיפוע של הישר העובר דרך $(0,1)$ ו-$(2,9)$?`,
        answer: 4,
        hint: m`$m=\frac{9-1}{2-0}$`,
        explain: m`$m=\frac{8}{2}=4$`,
      },
    },
    {
      id: 'axis-parallel',
      emoji: '➕',
      title: 'ישרים אופקיים ואנכיים',
      blocks: [
        {
          type: 'line',
          caption: m`$y=3$ (אופקי) ו-$x=-2$ (אנכי):`,
          lines: [{ m: 0, b: 3 }, { vertical: -2 }],
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שני מקרים מיוחדים',
          md: m`$y=k$ — ישר **אופקי**, שיפוע $0$. לכל $x$ אותו $y$.

$x=k$ — ישר **אנכי**. זו **לא** פונקציה: ל-$x$ אחד יש אינסוף ערכי $y$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איזו משוואה מתארת ישר **אופקי** שעובר דרך $(5,-2)$?`,
        options: [m`$x=5$`, m`$y=-2$`, m`$y=5x-2$`, m`$x=-2$`],
        answer: 1,
        hint: m`בישר אופקי ה-$y$ קבוע. מה ה-$y$ של הנקודה?`,
        explain: m`ישר אופקי הוא $y=k$, וכאן $y=-2$ לכל הנקודות.`,
      },
    },
    {
      id: 'intersection',
      emoji: '❌',
      title: 'שני ישרים נפגשים',
      blocks: [
        {
          type: 'text',
          md: m`נקודת החיתוך של שני ישרים נמצאת על **שניהם** — ולכן היא **הפתרון של מערכת המשוואות** שלהם.`,
        },
        {
          type: 'line',
          caption: 'הזיזו את הישר השני וראו איך נקודת החיתוך (צהובה) זזה:',
          lines: [
            { m: 1, b: 1 },
            { m: -1, b: 3, editable: true },
          ],
          showIntersection: true,
        },
        {
          type: 'steps',
          title: m`איפה נפגשים $y=x+1$ ו-$y=-x+3$?`,
          steps: [
            { math: m`x+1=-x+3`, note: m`בנקודת החיתוך ה-$y$ שווה — משווים.` },
            { math: m`2x=2\ \Rightarrow\ x=1`, note: 'פותרים.' },
            { math: m`y=1+1=2`, note: m`מציבים באחד הישרים.` },
            { math: c(GREEN, '(1,\\,2)'), note: 'נקודת החיתוך.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        prompt: m`מה ה-$x$ של נקודת החיתוך של $y=2x$ ו-$y=x+3$?`,
        answer: 3,
        hint: m`השוו: $2x=x+3$.`,
        explain: m`$2x=x+3\ \Rightarrow\ x=3$, ואז $y=6$. הנקודה $(3,6)$.`,
      },
    },
  ],
};
