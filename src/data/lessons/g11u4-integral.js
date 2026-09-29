import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g11u4-integral',
  topicId: 'g11-u4-integral',
  grade: 11,
  units: 4,
  emoji: '∫',
  title: 'חשבון אינטגרלי',
  subtitle: 'פונקציה קדומה, אינטגרל מסוים, ושטחים',
  sections: [
    {
      id: 'antiderivative',
      emoji: '⏪',
      title: 'פונקציה קדומה',
      blocks: [
        {
          type: 'text',
          md: m`גזירה: מ-$F$ ל-$f$. **פונקציה קדומה** — הדרך ההפוכה: מחפשים $F$ שהנגזרת שלה היא $f$.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הכלל לחזקה',
          md: m`$$\int x^n\,dx=\frac{x^{n+1}}{n+1}+C\qquad(n\neq-1)$$
מעלים את החזקה ב-1, ומחלקים בחזקה החדשה. ה-$+C$ — כי לקבוע יש נגזרת $0$.`,
        },
        {
          type: 'steps',
          title: m`$\int(6x^2-4x+5)\,dx$`,
          steps: [
            { math: m`6\cdot\frac{x^3}{3}=${c(VIOLET, '2x^3')}`, note: 'כל איבר לחוד.' },
            { math: m`-4\cdot\frac{x^2}{2}=${c(VIOLET, '-2x^2')}`, note: 'גם כאן — והסימן נשמר.' },
            { math: m`${c(GREEN, '2x^3-2x^2+5x+C')}`, note: 'והקבוע 5 הופך ל-5x.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהי פונקציה קדומה של $f(x)=4x^3+2$?`,
        options: [m`$12x^2$`, m`$x^4+2x+C$`, m`$4x^4+2x+C$`, m`$x^4+C$`],
        answer: 1,
        hint: m`$4\cdot\frac{x^4}{4}$ ועוד $2x$.`,
        explain: m`$x^4+2x+C$ — בדיקה: הנגזרת היא $4x^3+2$ ✓`,
      },
    },
    {
      id: 'point',
      emoji: '📍',
      title: 'מוצאים את C',
      blocks: [
        {
          type: 'steps',
          title: m`$F'(x)=2x$, והגרף של $F$ עובר ב-$(1,5)$`,
          steps: [
            { math: m`F(x)=x^2+C`, note: 'הקדומה הכללית.' },
            { math: m`5=1^2+C`, note: 'מציבים את הנקודה.' },
            { math: m`C=${c(GREEN, '4')}\ \Rightarrow\ F(x)=x^2+4`, note: 'הקדומה הספציפית.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'C =',
        prompt: m`$F'(x)=3x^2$, והגרף של $F$ עובר בנקודה $(2,10)$. מה $C$?`,
        answer: 2,
        hint: m`$F(x)=x^3+C$. הציבו $x=2$.`,
        explain: m`$10=8+C\Rightarrow C=2$`,
      },
    },
    {
      id: 'definite',
      emoji: '📏',
      title: 'אינטגרל מסוים ושטח',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'המשפט היסודי',
          md: m`$$\int_a^b f(x)\,dx=F(b)-F(a)$$`,
        },
        {
          type: 'integral',
          a: 0,
          b: 4,
          caption: m`שנו את גבולות האינטגרל. **ירוק** נספר בחיוב, **אדום** בשלילה — אבל שטח תמיד חיובי:`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'אינטגרל ≠ שטח',
          md: 'כשהפונקציה חוצה את ציר x בתחום — מפצלים בנקודת החיתוך, ולוקחים ערך מוחלט של כל חלק שמתחת לציר.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`חשבו $\int_0^3 x^2\,dx$`,
        answer: 9,
        hint: m`$F(x)=\frac{x^3}{3}$`,
        explain: m`$\frac{27}{3}-0=9$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: שטח בין גרפים',
      blocks: [
        {
          type: 'integral',
          mode: 'between',
          caption: m`השטח בין $f(x)=x+3$ ל-$g(x)=x^2+1$:`,
        },
        {
          type: 'steps',
          title: 'שלושה צעדים',
          steps: [
            { math: m`x+3=x^2+1\ \Rightarrow\ x=-1,\ x=2`, note: 'נקודות החיתוך — הגבולות.' },
            { math: m`f(0)=3>g(0)=1`, note: 'מי למעלה? בודקים נקודה באמצע.' },
            { math: m`\int_{-1}^{2}(${c(GREEN, 'x+3')}-${c(RED, '(x^2+1)')})\,dx=4.5`, note: 'העליון פחות התחתון.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה השטח הכלוא בין $y=x^2$ לבין $y=x$? (הם נחתכים ב-$0$ וב-$1$)`,
        answer: 1 / 6,
        tolerance: 0.005,
        hint: m`בתחום, $x$ מעל $x^2$: $\int_0^1(x-x^2)\,dx$`,
        explain: m`$\frac12-\frac13=\frac16\approx0.167$`,
      },
    },
  ],
};
