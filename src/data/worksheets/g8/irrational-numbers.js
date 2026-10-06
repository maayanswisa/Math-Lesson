import { m, round } from '../helpers.js';

const KIND = ['רציונלי', 'אי-רציונלי'];
const kind = (tex, rational) => ({ q: m`$${tex}$`, options: KIND, answer: rational ? 0 : 1 });

/** √n בין שני שלמים עוקבים. */
function between(n) {
  const lo = Math.floor(Math.sqrt(n));
  if (lo * lo === n) throw new Error(`${n} is a perfect square`);
  return { q: m`$\sqrt{${n}}$ נמצא בין [[${lo}]] ל-[[${lo + 1}]]` };
}

/** לאיזה שלם √n קרוב יותר? */
function nearest(n) {
  const r = Math.sqrt(n);
  const lo = Math.floor(r);
  if (Math.abs(r - lo - 0.5) < 0.05) throw new Error('too close to call');
  return { q: m`$\sqrt{${n}}$ קרוב יותר ל-`, options: [m`$${lo}$`, m`$${lo + 1}$`], answer: r - lo < 0.5 ? 0 : 1 };
}

const exactRoot = (tex, ans) => ({ q: m`$${tex} =$ [[${ans}]]` });

export default {
  id: 'g8-irrational-numbers',
  grade: 8,
  emoji: '√',
  title: 'שורש ריבועי ומספר אי-רציונלי',
  reminder: [
    {
      title: 'שורש ריבועי',
      md: m`$\sqrt{49} = 7$ כי $7^2 = 49$. שורש שלם יש רק ל**ריבועים שלמים**: $1, 4, 9, 16, 25, 36, 49, 64, 81, 100, \ldots$

גם: $\sqrt{0.25} = 0.5$ · $\sqrt{\frac{9}{16}} = \frac{3}{4}$`,
    },
    {
      title: 'אומדן שורש',
      md: m`$\sqrt{50}$: $\;49 < 50 < 64$, ולכן $7 < \sqrt{50} < 8$ — וקרוב מאוד ל-$7$.`,
    },
    {
      title: 'רציונלי או אי-רציונלי?',
      wide: true,
      md: m`**רציונלי** — אפשר לכתוב כשבר $\frac{a}{b}$ של שלמים: שלמים, שברים, עשרוניים סופיים או **מחזוריים** ($0.\overline{3} = \frac{1}{3}$).

**אי-רציונלי** — עשרוני אינסופי **לא** מחזורי: $\sqrt{2}, \sqrt{7}, \pi$.

מחזורי לשבר: $0.\overline{7} = \frac{7}{9}$, $\;0.\overline{12} = \frac{12}{99} = \frac{4}{33}$`,
    },
  ],
  pages: [
    {
      title: 'שורשים ואומדן',
      exercises: [
        {
          title: 'חשבו.',
          cols: 3,
          items: [
            exactRoot('\\sqrt{49}', 7),
            exactRoot('\\sqrt{144}', 12),
            exactRoot('\\sqrt{0.25}', 0.5),
            exactRoot('\\sqrt{1.44}', 1.2),
            exactRoot('\\sqrt{400}', 20),
            exactRoot('\\sqrt{0.09}', 0.3),
          ],
        },
        {
          title: 'כתבו כשבר.',
          cols: 3,
          items: [
            { q: m`$\sqrt{\frac{9}{16}} =$ [[f:3/4]]` },
            { q: m`$\sqrt{\frac{25}{36}} =$ [[f:5/6]]` },
            { q: m`$\sqrt{\frac{1}{100}} =$ [[f:1/10]]` },
          ],
        },
        { title: 'בין אילו שני מספרים שלמים עוקבים?', cols: 2, items: [50, 20, 90, 3, 130, 75].map(between) },
        { title: 'לאיזה מספר שלם השורש קרוב יותר?', cols: 2, items: [50, 33, 62, 11].map(nearest) },
      ],
    },
    {
      title: 'רציונלי ואי-רציונלי',
      exercises: [
        {
          title: 'רציונלי או אי-רציונלי?',
          cols: 2,
          items: [
            kind('\\sqrt{16}', true),
            kind('\\sqrt{7}', false),
            kind('0.\\overline{3}', true),
            kind('\\pi', false),
            kind('\\frac{3}{4}', true),
            kind('\\sqrt{2}', false),
            kind('-5', true),
            kind('\\sqrt{0.04}', true),
          ],
        },
        {
          title: 'כתבו את השבר המחזורי כשבר פשוט מצומצם.',
          cols: 3,
          items: [
            { q: m`$0.\overline{3} =$ [[fx:1/3]]` },
            { q: m`$0.\overline{7} =$ [[fx:7/9]]` },
            { q: m`$0.\overline{12} =$ [[fx:4/33]]` },
            { q: m`$0.\overline{6} =$ [[fx:2/3]]` },
            { q: m`$0.\overline{45} =$ [[fx:5/11]]` },
          ],
        },
        {
          title: 'השוו: בחרו $<$, $=$ או $>$.',
          cols: 3,
          items: [
            { q: m`$\sqrt{50}$ [[c:>]] $7$` },
            { q: m`$\sqrt{80}$ [[c:<]] $9$` },
            { q: m`$\sqrt{36}$ [[c:=]] $6$` },
            { q: m`$\sqrt{10}$ [[c:>]] $3.1$` },
          ],
        },
        {
          title: 'בעיה.',
          cols: 1,
          items: [
            {
              q: m`שטח ריבוע הוא $20$ סמ״ר. אורך הצלע הוא $\sqrt{20}$ ס״מ. עגלו לעשיריות (היעזרו במחשבון או בניסוי וטעייה).`,
              a: m`[[n:${round(Math.sqrt(20), 1)}~0.05]] ס״מ`,
            },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו.', cols: 2, items: [exactRoot('\\sqrt{81}', 9), exactRoot('\\sqrt{0.16}', 0.4)] },
      { title: 'בין אילו שני מספרים שלמים עוקבים?', cols: 2, items: [40, 110].map(between) },
      { title: 'רציונלי או אי-רציונלי?', cols: 2, items: [kind('\\sqrt{25}', true), kind('\\sqrt{11}', false), kind('0.\\overline{5}', true)] },
      { title: 'כתבו כשבר פשוט מצומצם.', cols: 1, items: [{ q: m`$0.\overline{2} =$ [[fx:2/9]]` }] },
      { title: 'בחרו $<$, $=$ או $>$.', cols: 1, items: [{ q: m`$\sqrt{24}$ [[c:<]] $5$` }] },
    ],
  },
};
