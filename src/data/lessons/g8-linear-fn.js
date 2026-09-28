import { c, GREEN, m, RED } from './tex.js';

export default {
  id: 'g8-linear-fn',
  topicId: 'g8-linear-fn',
  grade: 8,
  emoji: '📈',
  title: 'פונקציה קווית ואי-שוויונות',
  subtitle: 'מה זה $y=mx+b$, מה אומרים $m$ ו-$b$, ואיך פותרים אי-שוויון',
  sections: [
    {
      id: 'machine',
      emoji: '⚙️',
      title: 'מה זו פונקציה קווית?',
      blocks: [
        {
          type: 'text',
          md: m`פונקציה היא כמו **מכונה**: מכניסים מספר $x$, ויוצא מספר $y$.

ב-$y=2x+1$ המכונה **כופלת ב-2 ומוסיפה 1**.`,
        },
        {
          type: 'steps',
          title: m`מכניסים מספרים ל-$y=2x+1$`,
          steps: [
            { math: m`x=0\ \Rightarrow\ y=2\cdot0+1=1`, note: m`נקודה $(0,1)$` },
            { math: m`x=1\ \Rightarrow\ y=2\cdot1+1=3`, note: m`נקודה $(1,3)$` },
            { math: m`x=2\ \Rightarrow\ y=2\cdot2+1=5`, note: m`נקודה $(2,5)$` },
            { math: m`1\ \xrightarrow{+${c(RED, '2')}}\ 3\ \xrightarrow{+${c(RED, '2')}}\ 5`, note: m`בכל צעד של $x$, ה-$y$ עולה **באותה כמות** — לכן הגרף **ישר**.` },
          ],
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הצורה הכללית',
          md: m`$$y=mx+b$$
כל פונקציה שנראית כך היא **פונקציה קווית**, והגרף שלה קו ישר.`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'y =',
        prompt: m`בפונקציה $y=3x-2$, מה ערך $y$ כש-$x=4$?`,
        answer: 10,
        hint: m`מציבים 4 במקום $x$: $3\cdot4-2$.`,
        explain: m`$y=3\cdot4-2=12-2=10$`,
      },
    },
    {
      id: 'slope',
      emoji: '⛰️',
      title: 'השיפוע m — כמה תלול?',
      blocks: [
        {
          type: 'text',
          md: m`$m$ נקרא **שיפוע**: כמה $y$ משתנה כש-$x$ גדל ב-1.`,
        },
        {
          type: 'line',
          caption: m`הזיזו את הסליידר של $m$ וראו מה קורה לישר:`,
          lines: [{ m: 1, b: 0, editable: true }],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'איך מזהים במבט אחד',
          md: m`$m>0$ — הישר **עולה** ↗ · $m<0$ — הישר **יורד** ↘ · $m=0$ — הישר **אופקי** →`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזה מהישרים הבאים **יורד**?',
        options: [m`$y=2x+5$`, m`$y=-3x+1$`, m`$y=4$`, m`$y=x-7$`],
        answer: 1,
        hint: m`חפשו את ה-$m$ השלילי — המספר שצמוד ל-$x$.`,
        explain: m`ב-$y=-3x+1$ השיפוע $m=-3$ שלילי, ולכן הישר יורד.`,
      },
    },
    {
      id: 'intercept',
      emoji: '🎯',
      title: 'b — איפה חותכים את ציר y',
      blocks: [
        {
          type: 'text',
          md: m`על ציר $y$ תמיד $x=0$. מציבים: $y=m\cdot0+b=b$.

כלומר **$b$ הוא הגובה שבו הישר חותך את ציר $y$** (הנקודה העגולה).`,
        },
        {
          type: 'line',
          caption: m`שנו את $b$ — הישר זז למעלה ולמטה, והשיפוע נשאר:`,
          lines: [{ m: 0.5, b: 2, editable: true, showB: true }],
        },
      ],
      challenge: {
        type: 'number',
        label: 'y =',
        prompt: m`באיזה גובה חותך הישר $y=-2x+7$ את ציר $y$?`,
        answer: 7,
        hint: m`זה $b$ — המספר הבודד. אפשר גם להציב $x=0$.`,
        explain: m`$y=-2\cdot0+7=7$, כלומר הנקודה $(0,7)$.`,
      },
    },
    {
      id: 'inequality',
      emoji: '↔️',
      title: 'אי-שוויון: כמו משוואה, עם טוויסט',
      blocks: [
        {
          type: 'text',
          md: m`אי-שוויון (כמו $2x+1<7$) פותרים **בדיוק כמו משוואה** — והתשובה היא **תחום** של מספרים, לא מספר אחד.`,
        },
        {
          type: 'steps',
          title: m`פותרים: $2x+1<7$`,
          steps: [
            { math: m`2x+1${c(RED, '-1')}<7${c(RED, '-1')}`, note: 'מורידים 1 משני הצדדים.' },
            { math: m`2x<6`, note: 'מחלקים ב-2 (מספר חיובי — הכיוון נשאר).' },
            { math: c(GREEN, 'x<3'), note: m`כל מספר קטן מ-3 הוא פתרון: $2$, $0$, $-10$…` },
          ],
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'הטוויסט: מספר שלילי הופך כיוון!',
          md: m`כשכופלים או מחלקים ב**מספר שלילי** — **הופכים את סימן האי-שוויון**.

$-2x<8\ \Rightarrow\ x\ ${c(RED, '>')}\ -4$`,
        },
        {
          type: 'card',
          tone: 'why',
          title: 'למה הכיוון מתהפך?',
          md: m`$2<3$ — נכון. כופלים ב-$(-1)$: $-2$ ו-$-3$. אבל $-2$ **גדול** מ-$-3$! כפל בשלילי "משקף" את ציר המספרים, ולכן הסדר מתהפך.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה הפתרון של $-3x\le12$?`,
        options: [m`$x\le-4$`, m`$x\ge-4$`, m`$x\le4$`, m`$x\ge4$`],
        answer: 1,
        hint: m`מחלקים ב-$-3$ — מספר שלילי. מה קורה לסימן?`,
        explain: m`מחלקים ב-$-3$ והופכים כיוון: $x\ge\frac{12}{-3}=-4$.`,
      },
    },
  ],
};
