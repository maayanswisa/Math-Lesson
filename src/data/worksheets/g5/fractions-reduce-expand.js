import { m, fr, mixed, gcd, reduce } from '../helpers.js';

/** הרחבה: a/b = ?/target (המונה חסר). */
function expandNum(a, b, target) {
  if (target % b !== 0) throw new Error(`${target} not a multiple of ${b}`);
  return { q: m`$${fr(a, b)} =$ [[fx:${(a * target) / b}/{${target}}]]` };
}

/** הרחבה: a/b = num/? (המכנה חסר). */
function expandDen(a, b, num) {
  if (num % a !== 0) throw new Error(`${num} not a multiple of ${a}`);
  return { q: m`$${fr(a, b)} =$ [[fx:{${num}}/${(b * num) / a}]]` };
}

/** הרחבה פי 2, 3 ו-4 בשורה אחת. */
const expandChain = (a, b) => ({
  q: m`$${fr(a, b)} =$ ` + [2, 3, 4].map((k) => `[[fx:${a * k}/${b * k}]]`).join(' $=$ '),
});

/** צמצום עד הסוף. */
function reduceItem(a, b) {
  const [n, d] = reduce(a, b);
  if (n === a) throw new Error(`${a}/${b} is already reduced`);
  return { q: m`$${fr(a, b)} =$ [[fx:${n}/${d}]]` };
}

/** צמצום כשאחד מהחלקים נתון. */
function reduceGiven(a, b, { num, den }) {
  const k = num != null ? a / num : b / den;
  if (!Number.isInteger(k) || a % k !== 0 || b % k !== 0) throw new Error(`cannot reduce ${a}/${b} that way`);
  const blank = num != null ? `[[fx:{${num}}/${b / k}]]` : `[[fx:${a / k}/{${den}}]]`;
  return { q: m`$${fr(a, b)} =$ ${blank}` };
}

/** שבר מדומה ← מספר מעורב מצומצם. */
function toMixedReduced(a, b) {
  const [n, d] = reduce(a % b, b);
  return { q: m`$${fr(a, b)} =$ [[mx:${Math.floor(a / b)} ${n}/${d}]]` };
}

/** מכנה משותף קטן ביותר לשני שברים. */
function common([a, b], [c, d]) {
  const l = (b * d) / gcd(b, d);
  return {
    q: m`$${fr(a, b)},\;${fr(c, d)} \;\longrightarrow\;$ [[fx:${(a * l) / b}/${l}]] $,$ [[fx:${(c * l) / d}/${l}]]`,
  };
}

const equalTo = (question, [a, b], options) => {
  const answers = options.map(([c, d]) => a * d === b * c);
  if (answers.filter(Boolean).length !== 1) throw new Error('need exactly one equal option');
  return { q: question, options: options.map(([c, d]) => m`$${fr(c, d)}$`), answer: answers.indexOf(true) };
};
const notEqualTo = (question, [a, b], options) => {
  const answers = options.map(([c, d]) => a * d !== b * c);
  if (answers.filter(Boolean).length !== 1) throw new Error('need exactly one different option');
  return { q: question, options: options.map(([c, d]) => m`$${fr(c, d)}$`), answer: answers.indexOf(true) };
};

export default {
  id: 'g5-fractions-reduce-expand',
  grade: 5,
  emoji: '🔍',
  title: 'צמצום והרחבה של שברים',
  reminder: [
    {
      title: 'הרחבה',
      md: m`**כופלים** את המונה ואת המכנה **באותו מספר** — השבר לא משתנה:

$${fr(2, 3)} = ${fr('2 \\times 4', '3 \\times 4')} = ${fr(8, 12)}$`,
    },
    {
      title: 'צמצום',
      md: m`**מחלקים** את המונה ואת המכנה **באותו מספר**:

$${fr(12, 18)} = ${fr('12 : 6', '18 : 6')} = ${fr(2, 3)}$

**מצומצם עד הסוף** — אין מספר (חוץ מ-$1$) שמחלק גם את המונה וגם את המכנה.`,
    },
    {
      title: 'מכנה משותף',
      md: m`מחפשים מספר שמתחלק בשני המכנים (רצוי הקטן ביותר):

$${fr(1, 2)}, ${fr(1, 3)} \to$ מכנה $6$: $\;${fr(3, 6)}, ${fr(2, 6)}$`,
    },
    {
      title: 'שבר מדומה',
      md: m`המונה **גדול** מהמכנה (או שווה לו). מצמצמים ורושמים כמספר מעורב:

$${fr(14, 4)} = ${fr(7, 2)} = ${mixed(3, 1, 2)}$`,
    },
  ],
  pages: [
    {
      title: 'הרחבה',
      exercises: [
        {
          title: 'השלימו את המונה.',
          cols: 3,
          items: [expandNum(2, 5, 15), expandNum(3, 4, 20), expandNum(1, 6, 24), expandNum(5, 8, 24), expandNum(4, 7, 35), expandNum(7, 9, 36)],
        },
        {
          title: 'השלימו את המכנה.',
          cols: 3,
          items: [expandDen(3, 4, 12), expandDen(2, 3, 10), expandDen(5, 6, 20), expandDen(1, 5, 7), expandDen(3, 8, 9), expandDen(4, 9, 16)],
        },
        {
          title: 'הרחיבו פי $2$, פי $3$ ופי $4$.',
          cols: 1,
          items: [expandChain(3, 5), expandChain(1, 4), expandChain(2, 7)],
        },
        {
          title: 'בחרו.',
          cols: 1,
          items: [
            equalTo(m`איזה שבר שווה ל-$${fr(2, 3)}$?`, [2, 3], [[4, 9], [6, 9], [3, 4], [4, 5]]),
            notEqualTo(m`איזה שבר **לא** שווה ל-$${fr(1, 2)}$?`, [1, 2], [[5, 10], [7, 14], [6, 10], [9, 18]]),
          ],
        },
      ],
    },
    {
      title: 'צמצום ומכנה משותף',
      exercises: [
        {
          title: 'צמצמו עד הסוף.',
          cols: 3,
          items: [reduceItem(6, 8), reduceItem(10, 15), reduceItem(8, 20), reduceItem(9, 12), reduceItem(14, 35), reduceItem(15, 25), reduceItem(16, 24), reduceItem(18, 30), reduceItem(21, 28)],
        },
        {
          title: 'השלימו.',
          cols: 2,
          items: [reduceGiven(24, 36, { den: 3 }), reduceGiven(36, 48, { num: 3 }), reduceGiven(40, 100, { den: 5 }), reduceGiven(35, 56, { den: 8 })],
        },
        {
          title: 'כתבו כמספר מעורב מצומצם עד הסוף.',
          cols: 2,
          items: [toMixedReduced(14, 4), toMixedReduced(20, 6), toMixedReduced(18, 8), toMixedReduced(25, 10)],
        },
        {
          title: 'הרחיבו את שני השברים למכנה המשותף הקטן ביותר.',
          cols: 1,
          items: [common([1, 2], [1, 3]), common([3, 4], [1, 6]), common([2, 5], [3, 10]), common([1, 4], [2, 3])],
        },
        {
          title: 'שאלות מילוליות (תשובה כשבר מצומצם).',
          cols: 1,
          items: [
            { q: m`בכיתה $24$ תלמידים, ו-$18$ מהם יצאו לטיול. איזה חלק מהכיתה יצא לטיול?`, a: `[[fx:${reduce(18, 24).join('/')}]]` },
            { q: m`בשקית $30$ סוכריות, ו-$12$ מהן אדומות. איזה חלק מהסוכריות אדום?`, a: `[[fx:${reduce(12, 30).join('/')}]]` },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'השלימו.', cols: 2, items: [expandNum(3, 7, 28), expandDen(5, 9, 25)] },
      { title: 'צמצמו עד הסוף.', cols: 2, items: [reduceItem(12, 20), reduceItem(18, 27), reduceItem(35, 40), reduceItem(16, 64)] },
      { title: 'כתבו כמספר מעורב מצומצם עד הסוף.', cols: 1, items: [toMixedReduced(22, 8)] },
      { title: 'הרחיבו למכנה המשותף הקטן ביותר.', cols: 1, items: [common([1, 3], [3, 4])] },
      {
        title: 'בחרו.',
        cols: 1,
        items: [equalTo(m`איזה שבר שווה ל-$${fr(3, 4)}$?`, [3, 4], [[6, 12], [9, 12], [8, 12], [3, 8]])],
      },
      {
        title: 'שאלה מילולית (תשובה כשבר מצומצם).',
        cols: 1,
        items: [{ q: m`במבחן $40$ שאלות. מאיה ענתה נכון על $32$ מהן. איזה חלק מהשאלות ענתה נכון?`, a: `[[fx:${reduce(32, 40).join('/')}]]` }],
      },
    ],
  },
};
