import { m } from '../helpers.js';
import { tf } from './shared.js';

/** ערכי האותיות (אותיות סופיות — כמו הרגילות). */
const VAL = {
  א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9,
  י: 10, כ: 20, ך: 20, ל: 30, מ: 40, ם: 40, נ: 50, ן: 50, ס: 60, ע: 70, פ: 80, ף: 80, צ: 90, ץ: 90,
  ק: 100, ר: 200, ש: 300, ת: 400,
};
const gem = (word) => [...word].reduce((s, ch) => {
  if (!(ch in VAL)) throw new Error(`unknown letter ${ch}`);
  return s + VAL[ch];
}, 0);

const word = (w) => ({ q: `הגימטריה של המילה "${w}":`, a: `[[${gem(w)}]]` });
const letter = (ch) => ({ q: `האות ${ch} שווה`, a: `[[${VAL[ch]}]]` });

/** איזו אות שווה v? */
const LETTERS = Object.keys(VAL).filter((ch) => !'ךםןףץ'.includes(ch));
function whichLetter(v, distractors) {
  const right = LETTERS.find((ch) => VAL[ch] === v);
  const options = [right, ...distractors];
  const shift = v % options.length;
  const rotated = [...options.slice(shift), ...options.slice(0, shift)];
  return { q: m`איזו אות שווה $${v}$?`, options: rotated, answer: rotated.indexOf(right) };
}

const TABLE = `<table style="direction:rtl"><tr>${['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'].map((c) => `<th>${c}</th>`).join('')}</tr><tr>${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => `<td>${v}</td>`).join('')}</tr><tr>${['י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'].map((c) => `<th>${c}</th>`).join('')}</tr><tr>${[10, 20, 30, 40, 50, 60, 70, 80, 90].map((v) => `<td>${v}</td>`).join('')}</tr><tr><th>ק</th><th>ר</th><th>ש</th><th>ת</th></tr><tr><td>100</td><td>200</td><td>300</td><td>400</td></tr></table>`;

export default {
  id: 'g3-gematria',
  grade: 3,
  emoji: '🔤',
  title: 'גימטריה — ערך מספרי של אותיות',
  reminder: [
    { title: 'ערכי האותיות', wide: true, md: m`${TABLE}

אותיות סופיות (ך ם ן ף ץ) שוות כמו האותיות הרגילות.` },
    { title: 'גימטריה של מילה', md: m`מחברים את ערכי כל האותיות: "אבא" $= 1 + 2 + 1 = 4$. סדר האותיות **לא משנה** את הסכום.` },
  ],
  pages: [
    {
      title: 'ערכי אותיות',
      exercises: [
        { title: 'כמה שווה האות?', cols: 3, items: ['ה', 'ט', 'כ', 'נ', 'ק', 'ש', 'צ', 'ת', 'ם'].map(letter) },
        { title: 'בחרו את האות.', cols: 2, items: [whichLetter(50, ['ה', 'ס']), whichLetter(200, ['ב', 'ש']), whichLetter(7, ['ע', 'ו']), whichLetter(90, ['ט', 'פ'])] },
      ],
    },
    {
      title: 'גימטריה של מילים',
      exercises: [
        { title: 'חשבו את הגימטריה.', cols: 2, items: ['אבא', 'ילד', 'ספר', 'שלום', 'תורה', 'בית', 'חלב', 'מים'].map(word) },
        {
          title: 'השוו.',
          cols: 1,
          items: [
            { q: 'למי גימטריה גדולה יותר?', options: ['"גן"', '"דג"', 'שוות'], answer: gem('גן') > gem('דג') ? 0 : gem('גן') < gem('דג') ? 1 : 2 },
            { q: 'למי גימטריה גדולה יותר?', options: ['"אב"', '"בא"', 'שוות'], answer: 2 },
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('האות ם שווה כמו האות מ.', true), tf('לגימטריה של "שבת" ושל "תשב" יש אותו ערך.', gem('שבת') === gem('תשב'))] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'כמה שווה האות?', cols: 3, items: ['ז', 'ל', 'ר'].map(letter) },
      { title: 'גימטריה.', cols: 2, items: ['דוד', 'שמש', 'לב'].map(word) },
      { title: 'בחרו את האות.', cols: 1, items: [whichLetter(60, ['ו', 'ש'])] },
    ],
  },
};
