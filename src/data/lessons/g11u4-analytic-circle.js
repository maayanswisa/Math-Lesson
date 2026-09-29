import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g11u4-analytic-circle',
  topicId: 'g11-u4-analytic-circle',
  grade: 11,
  units: 4,
  emoji: '🗺️',
  title: 'גאומטריה אנליטית של המעגל',
  subtitle: 'משוואת מעגל, מעגל וישר, ומשיק',
  sections: [
    {
      id: 'equation',
      emoji: '✏️',
      title: 'משוואת המעגל',
      blocks: [
        {
          type: 'text',
          md: m`מעגל = כל הנקודות שנמצאות **במרחק $R$** מהמרכז $(a,b)$. כותבים את נוסחת המרחק בריבוע — ומקבלים:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'משוואת מעגל',
          md: m`$$(x-a)^2+(y-b)^2=R^2$$
מרכז בראשית: $x^2+y^2=R^2$`,
        },
        {
          type: 'circleline',
          lineless: true,
          a: 2,
          b: -1,
          R: 3,
          caption: 'הזיזו את המרכז ושנו את הרדיוס. שימו לב לסימנים במשוואה — הם הפוכים לקואורדינטות!',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה המרכז והרדיוס של $(x+3)^2+(y-2)^2=16$?`,
        options: [m`$(3,-2)$, $R=16$`, m`$(-3,2)$, $R=4$`, m`$(-3,2)$, $R=16$`, m`$(3,2)$, $R=4$`],
        answer: 1,
        hint: m`$x+3=x-(-3)$. והרדיוס — שורש של 16.`,
        explain: m`מרכז $(-3,2)$, רדיוס $\sqrt{16}=4$.`,
      },
    },
    {
      id: 'line',
      emoji: '📏',
      title: 'מעגל וישר',
      blocks: [
        {
          type: 'circleline',
          a: 1,
          b: 1,
          R: 3,
          m: 0,
          k: 5,
          caption: 'הזיזו את הישר (m, k). השוו את המרחק d (הקו האדום) לרדיוס:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שלושה מצבים',
          md: m`**חותך** בשתי נקודות: $d<R$

**משיק** (נקודה אחת): $d=R$

**אין** נקודות משותפות: $d>R$

דרך שנייה: מציבים את הישר במשוואת המעגל, ומקבלים משוואה ריבועית. מספר הפתרונות = מספר נקודות החיתוך.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מעגל $x^2+y^2=25$ וישר $y=5$. מה המצב ההדדי?`,
        options: ['חותך בשתי נקודות', 'משיק', 'אין חיתוך', 'הישר עובר במרכז'],
        answer: 1,
        hint: m`המרחק מהראשית לישר $y=5$ הוא $5$. והרדיוס?`,
        explain: m`$d=5=R$ — משיק, בנקודה $(0,5)$.`,
      },
    },
    {
      id: 'axis',
      emoji: '🧲',
      title: 'מעגל שמשיק לציר',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'המרחק לציר = הרדיוס',
          md: m`המרחק של המרכז $(a,b)$ מציר $x$ הוא $|b|$. לכן המעגל **משיק לציר $x$** כש-$|b|=R$, ו**משיק לציר $y$** כש-$|a|=R$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'R =',
        prompt: m`מרכז המעגל $(4,-3)$, והוא משיק לציר $x$. מה הרדיוס?`,
        answer: 3,
        hint: m`משיק לציר $x$ — $R=|b|$.`,
        explain: m`$R=|-3|=3$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: משוואת משיק',
      blocks: [
        {
          type: 'steps',
          title: m`המשיק למעגל $x^2+y^2=25$ בנקודה $(3,4)$`,
          steps: [
            { math: m`m_{OA}=\frac{4-0}{3-0}=${c(VIOLET, '\\frac43')}`, note: 'שיפוע הרדיוס מהמרכז לנקודה.' },
            { math: m`m_t=${c(RED, '-\\frac34')}`, note: 'המשיק ניצב לרדיוס: לוקחים שיפוע הפוך ונגדי.' },
            { math: m`y-4=-\frac34(x-3)`, note: 'ישר דרך נקודה עם שיפוע.' },
            { math: m`${c(GREEN, 'y=-\\frac34x+\\frac{25}{4}')}`, note: 'משוואת המשיק.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'm =',
        prompt: m`מה שיפוע המשיק למעגל $(x-1)^2+(y-2)^2=13$ בנקודה $(3,5)$?`,
        answer: -2 / 3,
        tolerance: 0.01,
        hint: m`שיפוע הרדיוס מ-$(1,2)$ ל-$(3,5)$ הוא $\frac32$.`,
        explain: m`המשיק ניצב: $m=-\frac23\approx-0.67$`,
      },
    },
  ],
};
