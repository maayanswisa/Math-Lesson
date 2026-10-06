import { m, fr, bar, pie, cmp, svgParts } from '../helpers.js';
import { tf } from './shared.js';

/** רצועה ב-4 חלקים לא שווים, הקטן צבוע — "לא רבע". */
const UNEQUAL = (() => {
  const { svg, INK, SHADE } = svgParts;
  const widths = [24, 60, 40, 56];
  let x = 2;
  const cells = widths.map((w, i) => {
    const r = `<rect x="${x}" y="2" width="${w}" height="32" fill="${i === 0 ? SHADE : '#fff'}" stroke="${INK}" stroke-width="1.5"/>`;
    x += w;
    return r;
  });
  return svg(184, 36, cells.join(''));
})();

const NAMES = { 2: 'חצי', 3: 'שליש', 4: 'רבע', 5: 'חמישית', 6: 'שישית', 8: 'שמינית', 10: 'עשירית' };

/** איזה חלק צבוע? (תמיד חלק אחד) */
const shaded = (d, model = 'bar') => ({ q: '', figure: model === 'pie' ? pie(1, d, 34) : bar(1, d, 180), a: `[[f:1/${d}]]` });

const compare = (a, b) => ({ q: m`$${fr(1, a)}$ [[c:${cmp(1 / a, 1 / b)}]] $${fr(1, b)}$` });

/** שבר יחידה מכמות: 1/d מ-n. */
const ofAmount = (d, n) => {
  if (n % d) throw new Error(`${n} is not divisible by ${d}`);
  return { q: m`$${fr(1, d)}$ מ-$${n}$ $=$ [[${n / d}]]` };
};

/** שם השבר. */
const nameOf = (d) => {
  const ds = Object.keys(NAMES).map(Number).filter((k) => k !== d);
  const options = [NAMES[d], NAMES[ds[d % ds.length]], NAMES[ds[(d + 2) % ds.length]]];
  const shift = d % 3;
  const rotated = [...options.slice(shift), ...options.slice(0, shift)];
  return { q: m`איך קוראים ל-$${fr(1, d)}$?`, options: rotated, answer: rotated.indexOf(NAMES[d]) };
};

export default {
  id: 'g3-fractions-unit',
  grade: 3,
  emoji: '🍕',
  title: 'שברי יחידה',
  reminder: [
    {
      title: 'מה זה שבר יחידה?',
      md: m`**חלק אחד** מתוך שלם שחולק ל-**חלקים שווים**.

$${fr(1, 2)}$ חצי · $${fr(1, 3)}$ שליש · $${fr(1, 4)}$ רבע · $${fr(1, 8)}$ שמינית · $${fr(1, 10)}$ עשירית`,
    },
    {
      title: 'מי גדול?',
      md: m`ככל שמחלקים ליותר חלקים — כל חלק **קטן** יותר:

$${fr(1, 10)} < ${fr(1, 8)} < ${fr(1, 4)} < ${fr(1, 3)} < ${fr(1, 2)}$`,
    },
    {
      title: 'חלק מכמות',
      md: m`$${fr(1, 4)}$ מ-$12$ — מחלקים את $12$ ל-$4$ חלקים שווים: $12 : 4 = 3$`,
    },
  ],
  pages: [
    {
      title: 'מזהים שברי יחידה',
      exercises: [
        { title: 'איזה חלק צבוע? כתבו כשבר.', cols: 3, items: [shaded(4), shaded(3, 'pie'), shaded(6), shaded(8, 'pie'), shaded(5), shaded(2, 'pie')] },
        { title: 'מה שם השבר?', cols: 2, items: [nameOf(3), nameOf(4), nameOf(8), nameOf(10)] },
        {
          title: 'האם הציור מראה רבע?',
          cols: 1,
          items: [
            { q: '', figure: UNEQUAL, options: ['כן', 'לא'], answer: 1 },
            { q: '', figure: bar(1, 4, 180), options: ['כן', 'לא'], answer: 0 },
          ],
        },
      ],
    },
    {
      title: 'השוואה וחלק מכמות',
      exercises: [
        { title: 'השוו: בחרו $<$, $=$ או $>$.', cols: 2, items: [compare(2, 4), compare(8, 3), compare(5, 10), compare(6, 6), compare(10, 2), compare(3, 4)] },
        { title: 'חשבו.', cols: 2, items: [ofAmount(2, 14), ofAmount(4, 20), ofAmount(3, 18), ofAmount(5, 35), ofAmount(10, 60), ofAmount(8, 24)] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf(m`$${fr(1, 8)}$ גדול מ-$${fr(1, 4)}$, כי $8$ גדול מ-$4$.`, false),
            tf('שני חצאים של אותה פיצה הם פיצה שלמה.', true),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'איזה חלק צבוע?', cols: 2, items: [shaded(10), shaded(4, 'pie')] },
      { title: 'השוו.', cols: 2, items: [compare(3, 6), compare(10, 5)] },
      { title: 'חשבו.', cols: 2, items: [ofAmount(3, 24), ofAmount(6, 42)] },
    ],
  },
};
