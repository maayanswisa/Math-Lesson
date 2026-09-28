import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g8-algebra-technique',
  topicId: 'g8-algebra-technique',
  grade: 8,
  emoji: '🧰',
  title: 'טכניקה אלגברית',
  subtitle: 'כפל סוגריים בסוגריים, פתרון בעזרת פירוק, וצמצום שברים אלגבריים',
  sections: [
    {
      id: 'foil',
      emoji: '✖️',
      title: 'סוגריים כפול סוגריים',
      blocks: [
        {
          type: 'text',
          md: m`ב-$(x+3)(x+5)$ **כל** איבר בסוגריים הראשונים כופל **כל** איבר בשניים. הכי קל לראות את זה כ**מלבן**:`,
        },
        {
          type: 'area',
          caption: m`מלבן שצלעותיו $(x+3)$ ו-$(x+5)$. השטח שלו = סכום ארבעת החלקים:`,
          rows: ['x', '3'],
          cols: ['x', '5'],
          cells: [
            ['x^2', '5x'],
            ['3x', '15'],
          ],
          result: m`(x+3)(x+5)=x^2+5x+3x+15=x^2+8x+15`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'חוק הפילוג המורחב',
          md: m`$$(a+b)(c+d)=ac+ad+bc+bd$$
4 מכפלות — ואז מכנסים איברים דומים.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה שווה $(x+2)(x+4)$?`,
        options: [m`$x^2+8$`, m`$x^2+6x+8$`, m`$x^2+6x+6$`, m`$2x+6$`],
        answer: 1,
        hint: m`ארבע מכפלות: $x\cdot x$, $x\cdot4$, $2\cdot x$, $2\cdot4$.`,
        explain: m`$x^2+4x+2x+8=x^2+6x+8$`,
      },
    },
    {
      id: 'zero-product',
      emoji: '0️⃣',
      title: 'מכפלה ששווה אפס',
      blocks: [
        {
          type: 'card',
          tone: 'why',
          title: 'הרעיון',
          md: m`אם $A\cdot B=0$ — לפחות אחד מהם **חייב** להיות $0$. (אין שני מספרים שאינם אפס שמכפלתם אפס.)`,
        },
        {
          type: 'steps',
          title: m`פותרים: $x^2-5x=0$`,
          steps: [
            { math: m`${c(VIOLET, 'x')}(x-5)=0`, note: m`מוציאים $x$ כגורם משותף.` },
            { math: m`${c(VIOLET, 'x')}=0\qquad x-5=0`, note: 'אחד הגורמים (לפחות) שווה אפס — בודקים כל אחד.' },
            { math: m`${c(GREEN, 'x=0')}\qquad ${c(GREEN, 'x=5')}`, note: '**שני** פתרונות! (או 0 או 5)' },
          ],
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'מלכודת',
          md: m`אסור לחלק ב-$x$ את $x^2=5x$ — כך "מאבדים" את הפתרון $x=0$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהם הפתרונות של $x^2+3x=0$?`,
        options: [m`$x=3$ בלבד`, m`$x=0$ או $x=-3$`, m`$x=0$ או $x=3$`, m`$x=-3$ בלבד`],
        answer: 1,
        hint: m`$x(x+3)=0$. מתי $x+3=0$?`,
        explain: m`$x=0$ או $x+3=0\Rightarrow x=-3$.`,
      },
    },
    {
      id: 'reduce',
      emoji: '✂️',
      title: 'צמצום שבר אלגברי',
      blocks: [
        {
          type: 'text',
          md: m`צמצום אלגברי עובד כמו $\frac{6}{9}=\frac{3\cdot2}{3\cdot3}=\frac{2}{3}$: **מפרקים לגורמים, ומצמצמים גורם משותף**.`,
        },
        {
          type: 'steps',
          title: m`מצמצמים: $\dfrac{3x+6}{x+2}$`,
          steps: [
            { math: m`\frac{3(x+2)}{x+2}`, note: 'מפרקים את המונה.' },
            { math: m`\frac{3\,${c(RED, '\\cancel{(x+2)}')}}{${c(RED, '\\cancel{(x+2)}')}}`, note: m`מצמצמים את $(x+2)$.` },
            { math: m`${c(GREEN, '3')}\qquad (x\neq-2)`, note: m`בתנאי שהמכנה לא אפס: $x\neq-2$.` },
          ],
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'מצמצמים רק כפל!',
          md: m`$\frac{x+5}{x}$ — **אי אפשר** לצמצם את ה-$x$. מצמצמים רק **גורם** שכופל את **כל** המונה ואת **כל** המכנה.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה שווה $\dfrac{5x-10}{x-2}$ (עבור $x\neq2$)?`,
        options: [m`$5$`, m`$5x$`, m`$-5$`, m`$\frac{5x}{x}$`],
        answer: 0,
        hint: m`הוציאו 5 מהמונה: $5(x-2)$.`,
        explain: m`$\frac{5(x-2)}{x-2}=5$`,
      },
    },
  ],
};
