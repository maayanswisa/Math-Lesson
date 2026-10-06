import { m } from '../helpers.js';
import { tf, patternFig, SHAPE_NAMES } from './shared.js';

/** סדרה צורנית: חוזרים על unit, מציגים len צורות — מה הבאה? */
function pattern(unit, len) {
  const kinds = Array.from({ length: len }, (_, i) => unit[i % unit.length]);
  const next = unit[len % unit.length];
  const options = [...new Set(unit)].map((k) => SHAPE_NAMES[k]);
  return { q: '', figure: patternFig(kinds), options, answer: options.indexOf(SHAPE_NAMES[next]) };
}

/** סדרה מספרית עם איבר חסר. */
function missing(start, step, index, len = 5) {
  const all = Array.from({ length: len }, (_, i) => start + i * step);
  const before = all.slice(0, index).join(',\\, ');
  const after = all.slice(index + 1).join(',\\, ');
  return { q: (before ? m`$${before},$ ` : '') + `[[${all[index]}]]` + (after ? m` $,\, ${after}$` : '') };
}

const RULES = ['עולה ב-1', 'עולה ב-10', 'עולה ב-100', 'יורדת ב-1', 'יורדת ב-10', 'יורדת ב-100'];
const rule = (start, step) => ({
  q: m`$${[0, 1, 2, 3].map((i) => start + i * step).join(',\\; ')}, \ldots$`,
  options: RULES,
  answer: RULES.indexOf(`${step > 0 ? 'עולה' : 'יורדת'} ב-${Math.abs(step)}`),
});

export default {
  id: 'g2-sequences',
  grade: 2,
  emoji: '🔗',
  title: 'סדרות',
  reminder: [
    {
      title: 'סדרה צורנית',
      md: 'מחפשים את **החלק שחוזר**: עיגול, ריבוע, עיגול, ריבוע… — החלק "עיגול, ריבוע" חוזר שוב ושוב.',
    },
    {
      title: 'סדרה מספרית',
      md: m`בודקים בכמה גדל (או קטן) כל מספר: $\;345, 355, 365$ — עולה ב-$10$ · $\;800, 700, 600$ — יורדת ב-$100$.`,
    },
  ],
  pages: [
    {
      title: 'סדרות צורניות',
      exercises: [
        {
          title: 'איזו צורה באה במקום סימן השאלה?',
          cols: 1,
          items: [
            pattern(['circle', 'square'], 5),
            pattern(['triangle', 'triangle', 'circle'], 7),
            pattern(['star', 'circle', 'square'], 8),
            pattern(['square', 'circle', 'circle'], 6),
          ],
        },
      ],
    },
    {
      title: 'סדרות מספריות',
      exercises: [
        { title: 'מה החוק?', cols: 1, items: [rule(345, 10), rule(800, -100), rule(57, 1), rule(430, -10)] },
        { title: 'השלימו את המספר החסר.', cols: 1, items: [missing(120, 10, 2), missing(500, 100, 3), missing(299, 1, 1), missing(960, -10, 4), missing(705, -100, 2)] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`בסדרה $210, 220, 230$ המספר הבא הוא $240$.`, true), tf(m`בסדרה $900, 800, 700$ הסדרה עולה.`, false)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'איזו צורה הבאה?', cols: 1, items: [pattern(['circle', 'triangle', 'triangle'], 7)] },
      { title: 'מה החוק?', cols: 1, items: [rule(615, -1)] },
      { title: 'השלימו.', cols: 1, items: [missing(340, 100, 2), missing(83, 10, 4)] },
    ],
  },
};
