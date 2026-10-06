import { m } from '../helpers.js';
import { tf, prismFig } from './shared.js';

const SQ = 'סמ״ר';
const CU = 'סמ״ק';

/** נפח: בסיס משולש (צלע + גובה אליה) × אורך המנסרה. */
const volume = (b, h, L) => ({ q: '', figure: prismFig({ base: b, height: h, length: L }), a: m`שטח הבסיס: [[${(b * h) / 2}]] ${SQ} · נפח: [[${(b * h * L) / 2}]] ${CU}` });

/** שטח פנים: בסיס משולש ישר-זווית עם ניצבים a, b ויתר c. */
function surface(a, b, L) {
  const c = Math.hypot(a, b);
  if (!Number.isInteger(c)) throw new Error('hypotenuse must be whole');
  const base = (a * b) / 2;
  const lateral = (a + b + c) * L;
  return {
    q: m`מנסרה שבסיסה משולש ישר-זווית עם צלעות $${a}, ${b}, ${c}$ ס״מ, ואורכה $${L}$ ס״מ.`,
    a: m`שני הבסיסים: [[${2 * base}]] · המעטפת: [[${lateral}]] · שטח הפנים: [[${2 * base + lateral}]] ${SQ}`,
  };
}

const count = (q, n) => ({ q, a: `[[${n}]]` });

/** אורך חסר לפי נפח. */
const lengthFromVolume = (V, b, h) => {
  const L = V / ((b * h) / 2);
  if (!Number.isInteger(L)) throw new Error('length must be whole');
  return { q: m`נפח מנסרה משולשת $${V}$ ${CU}. בבסיס: צלע $${b}$ ס״מ והגובה אליה $${h}$ ס״מ. אורך המנסרה:`, a: m`[[${L}]] ס״מ` };
};

export default {
  id: 'g7-prism',
  grade: 7,
  emoji: '🔺',
  title: 'מנסרה משולשת',
  reminder: [
    {
      title: 'מנסרה משולשת',
      md: m`שני **בסיסים** — משולשים חופפים ומקבילים, ו-$3$ **פאות צדדיות** — מלבנים.

$5$ פאות · $9$ מקצועות · $6$ קודקודים`,
    },
    {
      title: 'נפח',
      md: m`$V = $ שטח הבסיס $\times$ אורך המנסרה (הגובה שלה). $\;$ בסיס עם צלע $6$ וגובה $4$, אורך $10$: $\;V = \frac{6 \cdot 4}{2} \cdot 10 = 120$`,
    },
    {
      title: 'שטח פנים',
      md: m`שני בסיסים $+$ המעטפת. המעטפת היא מלבן אחד "פרוש": **היקף הבסיס** $\times$ **אורך המנסרה**.`,
    },
  ],
  pages: [
    {
      title: 'מבנה ונפח',
      exercises: [
        {
          title: 'השלימו.',
          cols: 1,
          items: [
            count('כמה פאות יש למנסרה משולשת?', 5),
            count('כמה מקצועות יש למנסרה משולשת?', 9),
            count('כמה קודקודים יש למנסרה משולשת?', 6),
            count('כמה מהפאות הן מלבנים?', 3),
          ],
        },
        { title: 'חשבו את הנפח.', cols: 1, items: [volume(6, 4, 10), volume(8, 5, 12), volume(10, 3, 7)] },
      ],
    },
    {
      title: 'שטח פנים ובעיות',
      exercises: [
        { title: 'חשבו את שטח הפנים.', cols: 1, items: [surface(3, 4, 10), surface(6, 8, 5)] },
        { title: 'מצאו את אורך המנסרה.', cols: 1, items: [lengthFromVolume(180, 6, 5), lengthFromVolume(96, 4, 6)] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('שני הבסיסים של מנסרה משולשת חופפים.', true),
            tf('במנסרה משולשת כל הפאות משולשים.', false),
            tf('אם מכפילים את אורך המנסרה פי 2 — הנפח גדל פי 2.', true),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'השלימו.', cols: 1, items: [count('כמה מקצועות יש למנסרה משולשת?', 9)] },
      { title: 'נפח.', cols: 1, items: [volume(12, 5, 4)] },
      { title: 'שטח פנים.', cols: 1, items: [surface(5, 12, 4)] },
    ],
  },
};
