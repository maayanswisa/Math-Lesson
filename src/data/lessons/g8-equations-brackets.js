/**
 * מדריך אינטראקטיבי — משוואות, מערכת משוואות וערך מוחלט (כיתה ח׳).
 *
 * כל מקטע (section) הוא יחידת מיקרו-למידה: כמה בלוקים קצרים, ובסופו
 * אתגר של שאלה אחת בדיוק. המקטע הבא נפתח רק אחרי שפותרים את האתגר.
 *
 * סוגי בלוקים: ראו BLOCK_TYPES ב-LessonBlock.jsx.
 * סוגי אתגרים: choice (answer = אינדקס) | number (answer = מספר).
 *
 * במתמטיקה של steps אין $ — הרכיב עוטף אותה בעצמו.
 *
 * ה-id נשאר g8-equations-brackets כדי לשמור את ההתקדמות של מי שכבר התחיל.
 */
import { c, GREEN, m, RED, VIOLET } from './tex.js';

// ציר מספרים: ה-0 באמצע, ושתי נקודות במרחק 3 ממנו
const ABS_SVG = `<div class='diagram-box'><svg viewBox='0 0 300 70' width='300' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><line x1='10' y1='35' x2='290' y2='35' stroke='#1a2b3c' stroke-width='1.5'/>${[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((n) => `<line x1='${150 + n * 32}' y1='30' x2='${150 + n * 32}' y2='40' stroke='#1a2b3c'/><text x='${150 + n * 32}' y='56' text-anchor='middle' font-size='12' fill='#1a2b3c'>${String(n).replace('-', '−')}</text>`).join('')}<line x1='54' y1='22' x2='150' y2='22' stroke='#7c4dcc' stroke-width='3'/><line x1='150' y1='22' x2='246' y2='22' stroke='#7c4dcc' stroke-width='3'/><text x='102' y='16' text-anchor='middle' font-size='12' font-weight='700' fill='#7c4dcc'>3</text><text x='198' y='16' text-anchor='middle' font-size='12' font-weight='700' fill='#7c4dcc'>3</text><circle cx='54' cy='35' r='6' fill='#c45c48'/><circle cx='246' cy='35' r='6' fill='#c45c48'/></svg></div>`;

export default {
  id: 'g8-equations-brackets',
  topicId: 'g8-equations-system',
  grade: 8,
  emoji: '🧮',
  title: 'משוואות, מערכות וערך מוחלט',
  subtitle: 'מאפס: סוגריים, מכנים, שתי משוואות עם שני נעלמים, וערך מוחלט',
  sections: [
    {
      id: 'what',
      emoji: '⚖️',
      title: 'מה זו בכלל משוואה?',
      blocks: [
        {
          type: 'text',
          md: m`משוואה היא כמו **מאזניים מאוזנים**: מה שבצד אחד שווה בדיוק למה שבצד השני.

$x$ הוא מספר שעוד לא מכירים — כמו קופסה סגורה. **לפתור** את המשוואה = לגלות מה יש בקופסה.`,
        },
        {
          type: 'balance',
          caption: m`המשוואה $x+3=7$ על המאזניים. נסו להוריד משקולות:`,
          solution: 4,
          left: { x: 1, units: 3 },
          right: { x: 0, units: 7 },
        },
        {
          type: 'card',
          tone: 'why',
          title: 'למה מורידים משני הצדדים?',
          md: m`אם מורידים רק מצד אחד — המאזניים נוטים, והשוויון נשבר.

כשעושים **אותה פעולה בשני הצדדים**, האיזון נשמר. זה כל הסוד של פתרון משוואות.`,
        },
      ],
      challenge: {
        type: 'number',
        prompt: m`$x+5=12$. כמה זה $x$?`,
        answer: 7,
        hint: m`הורידו 5 משני הצדדים.`,
        explain: m`$x+5-5=12-5$, ולכן $x=7$.`,
      },
    },
    {
      id: 'inverse',
      emoji: '🔄',
      title: 'פעולה הפוכה — בשני צעדים',
      blocks: [
        {
          type: 'text',
          md: m`כדי להשאיר את $x$ לבד עושים **פעולה הפוכה**: חיבור ↔ חיסור, כפל ↔ חילוק.

קודם מטפלים במספר ה"בודד", ורק אחר כך במספר שצמוד ל-$x$.`,
        },
        {
          type: 'steps',
          title: m`פותרים יחד: $2x+3=11$`,
          steps: [
            { math: m`2x+3=11`, note: m`המטרה: להשאיר את $x$ לבד.` },
            { math: m`2x+3${c(RED, '-3')}=11${c(RED, '-3')}`, note: m`מורידים 3 משני הצדדים — ההפך מחיבור 3.` },
            { math: m`2x=8`, note: m`נשארו 2 קופסאות ששוות ביחד ל-8.` },
            {
              math: m`\frac{2x}{${c(RED, '2')}}=\frac{8}{${c(RED, '2')}}`,
              note: m`מחלקים ב-2 משני הצדדים (ההפך מכפל).`,
            },
            { math: c(GREEN, 'x=4'), note: m`פתרנו! 🎉` },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'בודקים את עצמנו',
          md: m`מציבים את התשובה במשוואה המקורית: $2\cdot4+3=11$ ✔️

יצא שוויון? צדקנו.`,
        },
      ],
      challenge: {
        type: 'number',
        prompt: m`$3x-5=10$. כמה זה $x$?`,
        answer: 5,
        hint: m`קודם הוסיפו 5 לשני הצדדים, ואז חלקו ב-3.`,
        explain: m`$3x=15$, ולכן $x=5$. בדיקה: $3\cdot5-5=10$ ✔️`,
      },
    },
    {
      id: 'distribute',
      emoji: '🎁',
      title: 'פתיחת סוגריים',
      blocks: [
        {
          type: 'text',
          md: m`$3(x+2)$ פירושו: **3 פעמים** החבילה $(x+2)$. בואו נראה את זה:`,
        },
        { type: 'groups', k: 3, xs: 1, units: 2 },
        {
          type: 'card',
          tone: 'key',
          title: 'חוק הפילוג',
          md: m`$a(b+c)=a\cdot b+a\cdot c$

המספר שבחוץ **כופל כל אחד** מהאיברים שבפנים — לא רק את הראשון!`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'מלכודת נפוצה',
          md: m`$3(x+2)\neq3x+2$ ❌ — כאן שכחו לכפול את ה-2.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איך פותחים את $4(x+5)$?`,
        options: [m`$4x+5$`, m`$4x+20$`, m`$x+20$`, m`$4x+9$`],
        answer: 1,
        hint: m`ה-4 צריך לכפול **גם** את $x$ **וגם** את 5.`,
        explain: m`$4\cdot x+4\cdot5=4x+20$`,
      },
    },
    {
      id: 'minus',
      emoji: '➖',
      title: 'מינוס לפני הסוגריים',
      blocks: [
        {
          type: 'text',
          md: m`כשלפני הסוגריים יש מספר **שלילי**, הוא כופל כל איבר — **כולל הסימן שלו**.`,
        },
        {
          type: 'steps',
          title: m`פותחים יחד: $-2(x-3)$`,
          steps: [
            { math: m`-2(x-3)`, note: m`המספר שבחוץ הוא $-2$ — עם המינוס!` },
            {
              math: m`${c(VIOLET, '-2')}\cdot x\;+\;${c(VIOLET, '(-2)')}\cdot(-3)`,
              note: m`כופלים את $-2$ בכל אחד מהאיברים.`,
            },
            { math: m`-2x${c(GREEN, '+6')}`, note: m`מינוס כפול מינוס = פלוס!` },
          ],
        },
        {
          type: 'card',
          tone: 'why',
          title: 'למה מינוס כפול מינוס זה פלוס?',
          md: m`$-3$ זה חוב של 3 ₪. **למחוק** את החוב הזה פעמיים (כפול $-2$) — זה כמו להרוויח 6 ₪.

לכן $(-2)\cdot(-3)=+6$.`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'מינוס בלי מספר',
          md: m`$-(x-4)$ זה בדיוק $-1\cdot(x-4)$: **כל הסימנים בפנים מתהפכים**.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה שווה $-(x-4)$?`,
        options: [m`$-x-4$`, m`$-x+4$`, m`$x+4$`, m`$x-4$`],
        answer: 1,
        hint: m`המינוס שבחוץ הופך את הסימן של **כל** איבר בסוגריים.`,
        explain: m`$-1\cdot x=-x$, וגם $-1\cdot(-4)=+4$.`,
      },
    },
    {
      id: 'together',
      emoji: '🧩',
      title: 'הכול ביחד',
      blocks: [
        {
          type: 'text',
          md: m`המתכון תמיד זהה — 3 צעדים:

1. **פותחים סוגריים**
2. **משאירים את $x$ לבד** בעזרת פעולות הפוכות
3. **בודקים** את התשובה`,
        },
        {
          type: 'steps',
          title: m`פותרים: $2(x+3)=14$`,
          steps: [
            { math: m`2(x+3)=14`, note: m`צעד 1: פותחים סוגריים.` },
            { math: m`${c(VIOLET, '2x+6')}=14`, note: m`2 כפול $x$, ו-2 כפול 3.` },
            { math: m`2x=8`, note: m`צעד 2: מורידים 6 משני הצדדים.` },
            { math: c(GREEN, 'x=4'), note: m`מחלקים ב-2 משני הצדדים.` },
            { math: m`2(4+3)=2\cdot7=14\;\checkmark`, note: m`צעד 3: בדיקה — יצא שוויון!` },
          ],
        },
      ],
      challenge: {
        type: 'number',
        prompt: m`$3(x-2)=12$. כמה זה $x$?`,
        answer: 6,
        hint: m`פתחו סוגריים: $3x-6=12$. מה עכשיו?`,
        explain: m`$3x-6=12 \Rightarrow 3x=18 \Rightarrow x=6$`,
      },
    },
    {
      id: 'both-sides',
      emoji: '⚔️',
      title: '$x$ בשני הצדדים',
      blocks: [
        {
          type: 'text',
          md: m`לפעמים יש $x$ **בשני הצדדים**. פותחים סוגריים בשניהם, ואז מעבירים את **כל ה-$x$-ים לצד אחד** ואת המספרים לצד השני.`,
        },
        {
          type: 'steps',
          title: m`פותרים: $4(x-1)=2(x+3)$`,
          steps: [
            { math: m`4(x-1)=2(x+3)`, note: m`פותחים סוגריים בשני הצדדים.` },
            { math: m`4x-4=2x+6`, note: m`עכשיו יש $x$ משני הצדדים.` },
            {
              math: m`4x${c(RED, '-2x')}-4=2x${c(RED, '-2x')}+6`,
              note: m`מורידים $2x$ משני הצדדים.`,
            },
            { math: m`2x-4=6`, note: m`$x$ נשאר רק בצד אחד — מכאן זה כבר מוכר!` },
            { math: m`2x=10\;\Rightarrow\;${c(GREEN, 'x=5')}`, note: m`מוסיפים 4, ומחלקים ב-2.` },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'טריק קטן',
          md: m`העבירו את ה-$x$ **הקטן יותר** — כך מה שנשאר ליד $x$ יהיה חיובי.`,
        },
      ],
      challenge: {
        type: 'number',
        prompt: m`$2(x+5)=4(x-1)$. כמה זה $x$?`,
        answer: 7,
        hint: m`אחרי פתיחת סוגריים: $2x+10=4x-4$. הורידו $2x$ משני הצדדים.`,
        explain: m`$10=2x-4 \Rightarrow 14=2x \Rightarrow x=7$. בדיקה: $2\cdot12=24$ וגם $4\cdot6=24$ ✔️`,
      },
    },
    {
      id: 'denominators',
      emoji: '➗',
      title: 'משוואה עם מכנים',
      blocks: [
        {
          type: 'text',
          md: m`שברים במשוואה נראים מפחידים — אבל יש טריק: **כופלים את שני הצדדים במכנה המשותף**, והשברים פשוט נעלמים.`,
        },
        {
          type: 'steps',
          title: m`פותרים: $\dfrac{x}{3}+\dfrac{x}{2}=5$`,
          steps: [
            { math: m`3,\ 2\ \rightarrow\ ${c(VIOLET, '6')}`, note: 'המכנה המשותף הקטן ביותר: 6 (מתחלק גם ב-3 וגם ב-2).' },
            { math: m`${c(VIOLET, '6')}\cdot\frac{x}{3}+${c(VIOLET, '6')}\cdot\frac{x}{2}=${c(VIOLET, '6')}\cdot5`, note: 'כופלים **כל** איבר ב-6.' },
            { math: m`2x+3x=30`, note: 'השברים נעלמו!' },
            { math: m`5x=30\ \Rightarrow\ ${c(GREEN, 'x=6')}`, note: m`בדיקה: $\frac63+\frac62=2+3=5$ ✔️` },
          ],
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'שתי מלכודות',
          md: m`1. כופלים **כל** איבר — גם את זה שאין לו מכנה (ה-$5$ הפך ל-$30$).
2. אם במונה יש **סכום**, שמים אותו בסוגריים: $\frac{x+1}{3}\cdot6=2(x+1)$, לא $2x+1$.`,
        },
      ],
      challenge: {
        type: 'number',
        prompt: m`$\dfrac{x}{4}+\dfrac{x}{2}=9$. כמה זה $x$?`,
        answer: 12,
        hint: m`המכנה המשותף הוא 4. כפלו כל איבר ב-4: $x+2x=36$.`,
        explain: m`$x+2x=36\Rightarrow 3x=36\Rightarrow x=12$. בדיקה: $3+6=9$ ✔️`,
      },
    },
    {
      id: 'system-substitution',
      emoji: '🔗',
      title: 'מערכת משוואות: שיטת ההצבה',
      blocks: [
        {
          type: 'text',
          md: m`עכשיו יש **שני נעלמים**, $x$ ו-$y$, ו**שתי משוואות**. הפתרון הוא **זוג** מספרים שמתאים לשתיהן ביחד.

כל משוואה היא ישר — והפתרון הוא **נקודת החיתוך** שלהם:`,
        },
        {
          type: 'line',
          caption: m`$y=x+1$ ו-$y=-x+5$ נפגשים בנקודה $(2,3)$ — זה הפתרון של המערכת.`,
          lines: [
            { m: 1, b: 1 },
            { m: -1, b: 5 },
          ],
          showIntersection: true,
        },
        {
          type: 'steps',
          title: m`פותרים: $y=x+1$ וגם $2x+y=10$`,
          steps: [
            { math: m`y=${c(VIOLET, 'x+1')}`, note: m`במשוואה הראשונה $y$ כבר לבד.` },
            { math: m`2x+(${c(VIOLET, 'x+1')})=10`, note: m`**מציבים** אותו במקום $y$ בשנייה — נשאר רק $x$!` },
            { math: m`3x+1=10\ \Rightarrow\ x=3`, note: 'משוואה רגילה עם נעלם אחד.' },
            { math: m`y=3+1=4`, note: m`מחזירים את $x$ כדי למצוא את $y$.` },
            { math: c(GREEN, '(3,\\,4)'), note: m`בדיקה בשנייה: $2\cdot3+4=10$ ✔️` },
          ],
        },
      ],
      challenge: {
        type: 'number',
        prompt: m`$y=2x$ וגם $x+y=12$. כמה זה $x$?`,
        answer: 4,
        hint: m`הציבו $2x$ במקום $y$: $x+2x=12$.`,
        explain: m`$3x=12\Rightarrow x=4$, ואז $y=8$.`,
      },
    },
    {
      id: 'system-elimination',
      emoji: '➕',
      title: 'מערכת משוואות: חיבור וחיסור',
      blocks: [
        {
          type: 'text',
          md: m`דרך שנייה: **מחברים (או מחסרים) את המשוואות** — כך שאחד הנעלמים נעלם.`,
        },
        {
          type: 'steps',
          title: m`פותרים: $x+y=10$ וגם $x-y=4$`,
          steps: [
            { math: m`(x+y)+(x-y)=10+4`, note: 'מחברים צד שמאל עם צד שמאל, וימין עם ימין.' },
            { math: m`2x\ ${c(RED, '+\\,y-y')}=14`, note: m`$+y$ ו-$-y$ מבטלים זה את זה!` },
            { math: m`x=7`, note: 'מחלקים ב-2.' },
            { math: m`7+y=10\ \Rightarrow\ y=3`, note: 'מציבים באחת המשוואות.' },
            { math: c(GREEN, '(7,\\,3)'), note: m`בדיקה: $7-3=4$ ✔️` },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'מתי לחבר ומתי לחסר?',
          md: m`מקדמים **הפוכים** ($+y$ ו-$-y$) → **מחברים**.

מקדמים **זהים** ($+y$ ו-$+y$) → **מחסרים**.`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'y =',
        prompt: m`$x+y=9$ וגם $x-y=1$. כמה זה $y$?`,
        answer: 4,
        hint: m`חברו: $2x=10$, ולכן $x=5$. עכשיו הציבו.`,
        explain: m`$x=5$, ואז $5+y=9\Rightarrow y=4$.`,
      },
    },
    {
      id: 'absolute-value',
      emoji: '🏆',
      title: 'שלב הבוס: ערך מוחלט',
      blocks: [
        {
          type: 'text',
          md: m`**ערך מוחלט** $|a|$ = **המרחק** של $a$ מ-$0$ על ציר המספרים. מרחק אף פעם לא שלילי:

$|3|=3$ וגם $|-3|=3$.

${ABS_SVG}`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'משוואה עם ערך מוחלט — שני פתרונות',
          md: m`$|x|=3$ שואל: אילו מספרים נמצאים **במרחק 3** מ-$0$? יש שניים: $x=3$ **או** $x=-3$.`,
        },
        {
          type: 'steps',
          title: m`פותרים: $|x-2|=5$`,
          steps: [
            { math: m`x-2=${c(VIOLET, '5')}\qquad x-2=${c(VIOLET, '-5')}`, note: 'מפצלים לשני מקרים: מה שבפנים שווה 5 או מינוס 5.' },
            { math: m`${c(GREEN, 'x=7')}\qquad ${c(GREEN, 'x=-3')}`, note: 'פותרים כל אחד בנפרד.' },
            { math: m`|7-2|=5\ ,\ \ |-3-2|=5\ \checkmark`, note: 'בדיקה: שני הפתרונות עובדים.' },
          ],
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'מלכודת',
          md: m`$|x|=-4$ — **אין פתרון!** מרחק לא יכול להיות שלילי.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהם הפתרונות של $|x+1|=4$?`,
        options: [m`$x=3$ או $x=-5$`, m`$x=3$ בלבד`, m`$x=5$ או $x=-3$`, 'אין פתרון'],
        answer: 0,
        hint: m`$x+1=4$ או $x+1=-4$.`,
        explain: m`$x+1=4\Rightarrow x=3$, ו-$x+1=-4\Rightarrow x=-5$.`,
      },
    },
  ],
};
