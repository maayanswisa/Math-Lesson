import { m } from './tex.js';

export default {
  id: 'g11u4-geometry-review',
  topicId: 'g11-u4-geometry-review',
  grade: 11,
  units: 4,
  emoji: '🧩',
  title: 'תרגול מסכם — גאומטריה',
  subtitle: 'המעגל מכל הכיוונים: סינתטי, טריגונומטרי ואנליטי',
  sections: [
    {
      id: 'angles',
      emoji: '⭕',
      title: 'זוויות במעגל',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`היקפית = חצי מרכזית · היקפיות על אותה קשת שוות · היקפית על קוטר $=90°$ · במרובע חסום, נגדיות משלימות ל-$180°$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '°',
        prompt: m`במרובע חסום $ABCD$: $\angle B=2\angle D$. מה $\angle D$?`,
        answer: 60,
        hint: m`$\angle B+\angle D=180°$`,
        explain: m`$3\angle D=180°\Rightarrow\angle D=60°$`,
      },
    },
    {
      id: 'tangent',
      emoji: '🎯',
      title: 'משיקים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: 'משיק ניצב לרדיוס · שני משיקים מנקודה אחת שווים.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מנקודה $P$ יוצאים שני משיקים, $PA$ ו-$PB$, למעגל ברדיוס $5$. $PA=12$. מה המרחק מ-$P$ למרכז?`,
        answer: 13,
        hint: m`משולש ישר-זווית עם ניצבים $5$ ו-$12$.`,
        explain: m`$\sqrt{25+144}=13$`,
      },
    },
    {
      id: 'sine',
      emoji: '📐',
      title: 'משפט הסינוסים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`$\frac{a}{\sin A}=2R$

$S=\frac12ab\sin\gamma$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`משולש חסום במעגל ברדיוס $4$. אחת הזוויות $30°$. מה אורך הצלע שמולה?`,
        answer: 4,
        hint: m`$a=2R\sin A$`,
        explain: m`$a=8\cdot0.5=4$`,
      },
    },
    {
      id: 'analytic',
      emoji: '🗺️',
      title: 'מעגל במערכת צירים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`$(x-a)^2+(y-b)^2=R^2$ · משיק ⟺ $d=R$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`האם הנקודה $(4,1)$ נמצאת על המעגל $(x-1)^2+(y+3)^2=25$?`,
        options: ['כן, בדיוק עליו', 'לא, בתוכו', 'לא, מחוצה לו', 'אי אפשר לדעת'],
        answer: 0,
        hint: m`הציבו: $(4-1)^2+(1+3)^2$`,
        explain: m`$9+16=25$ ✓ — הנקודה על המעגל.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: שלושה כלים, בעיה אחת',
      blocks: [
        {
          type: 'text',
          md: m`במעגל $x^2+y^2=25$ הנקודות $A(-5,0)$ ו-$B(5,0)$, והנקודה $C(3,4)$ על המעגל.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה שטח המשולש $ABC$?`,
        answer: 20,
        hint: m`$AB$ קוטר, אז $\angle C=90°$. או פשוט: בסיס $AB=10$, גובה $=4$.`,
        explain: m`$\frac{10\cdot4}{2}=20$ (ובדיקה: $AC=\sqrt{80}$, $BC=\sqrt{20}$, $\frac12\sqrt{80}\sqrt{20}=20$ ✓)`,
      },
    },
  ],
};
