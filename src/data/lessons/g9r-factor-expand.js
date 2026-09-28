import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g9r-factor-expand',
  topicId: 'g9r-factor-expand',
  grade: 9,
  emoji: '🧮',
  title: 'נוסחאות הכפל המקוצר ופירוק',
  subtitle: 'שלוש נוסחאות, פירוק טרינום, פירוק לפי קבוצות וצמצום שברים',
  sections: [
    {
      id: 'square',
      emoji: '🟪',
      title: 'ריבוע של סכום',
      blocks: [
        {
          type: 'area',
          caption: m`ריבוע שצלעו $(a+b)$ — מחולק לארבעה חלקים. לחצו על כל חלק:`,
          rows: ['a', 'b'],
          cols: ['a', 'b'],
          cells: [
            ['a^2', 'ab'],
            ['ab', 'b^2'],
          ],
          result: m`(a+b)^2=a^2+2ab+b^2`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שלוש הנוסחאות',
          md: m`$(a+b)^2=a^2+${c(VIOLET, '2ab')}+b^2$

$(a-b)^2=a^2-${c(VIOLET, '2ab')}+b^2$

$(a+b)(a-b)=a^2-b^2$ (הפרש ריבועים)`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'המלכודת הכי נפוצה',
          md: m`$(x+3)^2\neq x^2+9$! שוכחים את האיבר האמצעי $2\cdot x\cdot3=6x$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה שווה $(x-5)^2$?`,
        options: [m`$x^2-25$`, m`$x^2-10x+25$`, m`$x^2+25$`, m`$x^2-5x+25$`],
        answer: 1,
        hint: m`$a^2-2ab+b^2$ עם $a=x$, $b=5$.`,
        explain: m`$x^2-2\cdot x\cdot5+25=x^2-10x+25$`,
      },
    },
    {
      id: 'trinomial',
      emoji: '🔍',
      title: 'פירוק טרינום',
      blocks: [
        {
          type: 'text',
          md: m`את $x^2+bx+c$ מפרקים ל-$(x+p)(x+q)$: מחפשים **שני מספרים** ש**סכומם** $b$ ו**מכפלתם** $c$.`,
        },
        {
          type: 'steps',
          title: m`מפרקים: $x^2+5x+6$`,
          steps: [
            { math: m`p\cdot q=6,\quad p+q=5`, note: 'אילו שני מספרים?' },
            { math: m`1\cdot6\ (7)\quad ${c(GREEN, '2\\cdot3\\ (5)')}`, note: 'עוברים על הזוגות שמכפלתם 6 — ובודקים את הסכום.' },
            { math: m`x^2+5x+6=${c(GREEN, '(x+2)(x+3)')}`, note: m`בדיקה: $x^2+3x+2x+6$ ✔️` },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'שימו לב לסימנים',
          md: m`$x^2-x-6$: מכפלה $-6$ וסכום $-1$ → $-3$ ו-$2$: $(x-3)(x+2)$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהו הפירוק של $x^2+7x+12$?`,
        options: [m`$(x+2)(x+6)$`, m`$(x+3)(x+4)$`, m`$(x+1)(x+12)$`, m`$(x-3)(x-4)$`],
        answer: 1,
        hint: 'מכפלה 12, סכום 7.',
        explain: m`$3\cdot4=12$, $3+4=7$: $(x+3)(x+4)$.`,
      },
    },
    {
      id: 'groups',
      emoji: '👥',
      title: 'פירוק לפי קבוצות',
      blocks: [
        {
          type: 'steps',
          title: m`מפרקים: $ax+ay+bx+by$`,
          steps: [
            { math: m`(ax+ay)+(bx+by)`, note: 'מחלקים לשני זוגות.' },
            { math: m`a(x+y)+b(x+y)`, note: 'מוציאים גורם משותף מכל זוג.' },
            { math: m`${c(GREEN, '(x+y)(a+b)')}`, note: m`$(x+y)$ משותף לשניהם — מוציאים אותו!` },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהו הפירוק של $x^2+3x+2x+6$?`,
        options: [m`$(x+3)(x+2)$`, m`$x(x+5)+6$`, m`$(x+6)(x+1)$`, m`$(x+3)^2$`],
        answer: 0,
        hint: m`$x(x+3)+2(x+3)$`,
        explain: m`$x(x+3)+2(x+3)=(x+3)(x+2)$`,
      },
    },
    {
      id: 'reduce',
      emoji: '🏆',
      title: 'שלב הבוס: צמצום שבר אלגברי',
      blocks: [
        {
          type: 'steps',
          title: m`מצמצמים: $\dfrac{x^2-9}{x^2+3x}$`,
          steps: [
            { math: m`\frac{(x-3)(x+3)}{x(x+3)}`, note: 'מפרקים מונה (הפרש ריבועים) ומכנה (גורם משותף).' },
            { math: m`${c(GREEN, '\\frac{x-3}{x}')}`, note: m`מצמצמים את $(x+3)$. (בתנאי $x\neq0,\ x\neq-3$)` },
          ],
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'לעולם לא מצמצמים בתוך סכום',
          md: m`$\frac{x+3}{x}\neq3$ ו-$\frac{x^2+4}{x}\neq x+4$. מצמצמים רק **גורם** — משהו שכופל את כל המונה ואת כל המכנה.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה שווה $\dfrac{x^2-4}{x-2}$ (עבור $x\neq2$)?`,
        options: [m`$x-2$`, m`$x+2$`, m`$x^2-2$`, m`$2$`],
        answer: 1,
        hint: m`$x^2-4=(x-2)(x+2)$`,
        explain: m`$\frac{(x-2)(x+2)}{x-2}=x+2$`,
      },
    },
  ],
};
