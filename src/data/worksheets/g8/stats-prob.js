import { m, round, reduce } from '../helpers.js';

const sum = (d) => d.reduce((a, b) => a + b, 0);
const mean = (d) => round(sum(d) / d.length);
const median = (d) => {
  const s = [...d].sort((a, b) => a - b);
  const k = Math.floor(s.length / 2);
  return s.length % 2 ? s[k] : round((s[k - 1] + s[k]) / 2);
};
function mode(d) {
  const counts = new Map(d.map((v) => [v, d.filter((x) => x === v).length]));
  const best = Math.max(...counts.values());
  const modes = [...counts].filter(([, c]) => c === best).map(([v]) => v);
  if (modes.length !== 1) throw new Error('no single mode');
  return modes[0];
}
const list = (d) => d.join(',\\;');

/** כל מדדי המרכז והטווח לנתונים אחד. */
const measures = (d) => ({
  q: m`$${list(d)}$`,
  a: m`ממוצע: [[${mean(d)}]] · חציון: [[${median(d)}]] · שכיח: [[${mode(d)}]] · טווח: [[${Math.max(...d) - Math.min(...d)}]]`,
});

/** הסתברות כשבר — כל שבר שווה ערך מתקבל. */
const prob = (q, fav, all) => {
  const [n, d] = reduce(fav, all);
  return { q, a: d === 1 ? `[[${n}]]` : `[[f:${n}/${d}]]` };
};

const GRADES = { 6: 3, 7: 5, 8: 8, 9: 3, 10: 1 };
const gradesTotal = sum(Object.values(GRADES));

export default {
  id: 'g8-stats-prob',
  grade: 8,
  emoji: '🎲',
  title: 'סטטיסטיקה והסתברות',
  reminder: [
    {
      title: 'מדדי מרכז ופיזור',
      md: m`**ממוצע** — סכום : מספר הנתונים · **חציון** — האמצעי אחרי מיון
**שכיח** — הנפוץ ביותר · **טווח** — הגדול פחות הקטן`,
    },
    {
      title: 'שכיחות יחסית',
      md: m`**שכיחות יחסית** = שכיחות הערך : מספר הנתונים

הערך $8$ הופיע $5$ פעמים מתוך $20$: $\;\frac{5}{20} = \frac{1}{4} = 25\%$`,
    },
    {
      title: 'הסתברות',
      wide: true,
      md: m`**הסתברות** = מספר התוצאות הרצויות : מספר כל התוצאות האפשריות

קובייה — מספר זוגי: $\;\frac{3}{6} = \frac{1}{2}$. ההסתברות תמיד בין $0$ (בלתי אפשרי) ל-$1$ (ודאי).`,
    },
  ],
  pages: [
    {
      title: 'מדדי מרכז ושכיחות יחסית',
      exercises: [
        {
          title: 'חשבו את המדדים.',
          cols: 1,
          items: [measures([4, 7, 7, 9, 13]), measures([10, 12, 15, 12, 20, 9]), measures([3, 8, 5, 8, 8, 6, 4])],
        },
        {
          title: m`ציוני $${gradesTotal}$ תלמידים בבוחן (ציון — מספר תלמידים): $\;${Object.entries(GRADES)
            .map(([g, c]) => `${g} \\to ${c}`)
            .join(',\\;\\;')}$`,
          cols: 1,
          items: [
            prob(m`מה השכיחות היחסית של הציון $8$? (כשבר)`, GRADES[8], gradesTotal),
            { q: 'מה השכיח?', a: `[[${Object.entries(GRADES).sort((a, b) => b[1] - a[1])[0][0]}]]` },
            {
              q: 'מה הציון הממוצע?',
              a: `[[${round(Object.entries(GRADES).reduce((s, [g, c]) => s + g * c, 0) / gradesTotal)}]]`,
            },
            { q: m`כמה אחוזים מהתלמידים קיבלו $9$ ומעלה?`, a: m`[[${round(((GRADES[9] + GRADES[10]) / gradesTotal) * 100)}]] $\%$` },
          ],
        },
        {
          title: 'מצאו את הנתון החסר.',
          cols: 1,
          items: [
            { q: m`הממוצע של $5, 8, 11, x$ הוא $9$.`, a: m`$x =$ [[${9 * 4 - (5 + 8 + 11)}]]` },
            { q: m`הטווח של $12, 7, x, 15$ הוא $10$, ו-$x$ הוא הקטן ביותר.`, a: m`$x =$ [[${15 - 10}]]` },
          ],
        },
      ],
    },
    {
      title: 'הסתברות',
      exercises: [
        {
          title: 'מטילים קובייה רגילה (1–6). מה ההסתברות... (כשבר)',
          cols: 2,
          items: [
            prob(m`לקבל $4$?`, 1, 6),
            prob('לקבל מספר זוגי?', 3, 6),
            prob(m`לקבל מספר גדול מ-$4$?`, 2, 6),
            prob('לקבל מספר ראשוני?', 3, 6),
            prob(m`לקבל $7$?`, 0, 6),
            prob(m`לקבל מספר קטן מ-$7$?`, 6, 6),
          ],
        },
        {
          title: m`בשקית $5$ כדורים אדומים, $3$ כחולים ו-$2$ ירוקים. מוציאים כדור אחד באקראי.`,
          cols: 2,
          items: [prob('מה ההסתברות לכדור אדום?', 5, 10), prob('מה ההסתברות לכדור כחול?', 3, 10), prob('מה ההסתברות לכדור שאינו ירוק?', 8, 10), prob('מה ההסתברות לכדור צהוב?', 0, 10)],
        },
        {
          title: 'מטילים שני מטבעות. מה ההסתברות...',
          cols: 2,
          items: [prob('לקבל שני "עץ"?', 1, 4), prob('לקבל "עץ" אחד ו"פלי" אחד?', 2, 4)],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            { q: m`ההסתברות יכולה להיות $1.5$.`, options: ['נכון', 'לא נכון'], answer: 1 },
            { q: 'אם מטילים מטבע הרבה פעמים, השכיחות היחסית של "עץ" תהיה קרובה לחצי.', options: ['נכון', 'לא נכון'], answer: 0 },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו את המדדים.', cols: 1, items: [measures([2, 5, 5, 6, 12])] },
      { title: 'קובייה רגילה. מה ההסתברות... (כשבר)', cols: 2, items: [prob('לקבל מספר אי-זוגי?', 3, 6), prob(m`לקבל מספר שמתחלק ב-$3$?`, 2, 6)] },
      { title: m`בכד $4$ כדורים לבנים ו-$6$ שחורים.`, cols: 1, items: [prob('מה ההסתברות להוציא כדור שחור?', 6, 10)] },
      { title: 'מצאו את הנתון החסר.', cols: 1, items: [{ q: m`הממוצע של $6, 10, x$ הוא $9$.`, a: m`$x =$ [[${27 - 16}]]` }] },
    ],
  },
};
