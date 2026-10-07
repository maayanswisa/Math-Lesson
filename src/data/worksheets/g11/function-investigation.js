import { m } from '../helpers.js';
import { exact, graphFig, numDeriv, tf } from './shared.js';

/** תחום מונוטוניות: בוחרים את התחום שבו f′ חיובית/שלילית (נבדק על רשת). */
function monotone(fTex, f, up, options) {
  const xs = Array.from({ length: 161 }, (_, i) => -10 + i * 0.125).filter((x) => Number.isFinite(f(x)) && Math.abs(numDeriv(f, x)) > 1e-6);
  const fits = options.map(([, inSet]) => xs.every((x) => (up ? numDeriv(f, x) > 0 : numDeriv(f, x) < 0) === inSet(x)));
  if (fits.filter(Boolean).length !== 1) throw new Error(`expected exactly one interval for ${fTex}`);
  return { q: m`$f(x)=${fTex}$ — באיזה תחום הפונקציה ${up ? 'עולה' : 'יורדת'}?`, options: options.map(([l]) => l), answer: fits.indexOf(true) };
}

/** נקודת קיצון (x, y): נבדקת — f′(x)=0 ו-y=f(x). */
function extremum(fTex, f, x, kind) {
  if (Math.abs(numDeriv(f, x)) > 1e-5) throw new Error(`f'(${x}) ≠ 0 for ${fTex}`);
  return { q: m`$f(x)=${fTex}$ — נקודת ה${kind}:`, a: m`$($ ${exact(x)} $,$ ${exact(f(x))} $)$` };
}

const rat = (x) => x + 4 / x;
const quot = (x) => (x * x) / (x - 1);
const root = (x) => (x <= 4 ? x * Math.sqrt(4 - x) : NaN);

const RAT_FIG = graphFig({ f: rat, x0: -6, x1: 6, y0: -8, y1: 8, asym: [0], points: [{ x: -2, y: -4, label: 'A' }, { x: 2, y: 4, label: 'B' }] });
const QUOT_FIG = graphFig({ f: quot, x0: -4, x1: 6, y0: -8, y1: 10, asym: [1], points: [{ x: 0, y: 0, label: 'C' }, { x: 2, y: 4, label: 'D' }] });

export default {
  id: 'g11-u4-function-investigation',
  grade: 11,
  emoji: '🔍',
  title: 'חקירת פונקציה מלאה',
  reminder: [
    {
      title: 'רשימת החקירה',
      md: m`1. תחום הגדרה · 2. חיתוך עם הצירים · 3. אסימפטוטות · 4. נגזרת, קיצון ותחומי עלייה וירידה · 5. סקיצה`,
    },
    {
      title: 'אסימפטוטה אופקית',
      md: m`מעלת המונה קטנה ← $y=0$ · מעלות שוות ← יחס המקדמים המובילים · מעלת המונה גדולה ← אין`,
    },
    {
      title: 'שורש',
      md: 'בפונקציית שורש — לבדוק גם את קצה התחום (קיצון קצה).',
    },
  ],
  pages: [
    {
      title: 'חקירה בלי שרטוט',
      exercises: [
        {
          title: 'תחום, חיתוך ואסימפטוטות.',
          cols: 1,
          items: [
            { q: m`$f(x)=\dfrac{x+4}{x-2}$: חיתוך עם ציר $y$`, a: m`$(0,$ [[-2]] $)$` },
            { q: m`$f(x)=\dfrac{x+4}{x-2}$: חיתוך עם ציר $x$`, a: m`$($ [[-4]] $,0)$` },
            { q: m`$f(x)=\dfrac{2x+1}{x-3}$: אסימפטוטות`, a: m`$x =$ [[3]] $,\quad y =$ [[2]]` },
            { q: m`$f(x)=\dfrac{x+1}{x^2-4}$: כמה אסימפטוטות מאונכות?`, a: '[[2]]' },
          ],
        },
        {
          title: 'קיצון ומונוטוניות.',
          cols: 1,
          items: [
            extremum(m`x+\frac9x`, (x) => x + 9 / x, 3, 'מינימום (x>0)'),
            extremum(m`x+\frac9x`, (x) => x + 9 / x, -3, 'מקסימום (x<0)'),
            monotone(m`x+\frac9x`, (x) => x + 9 / x, false, [
              [m`$-3<x<0$ או $0<x<3$`, (x) => (x > -3 && x < 0) || (x > 0 && x < 3)],
              [m`$x<-3$ או $x>3$`, (x) => x < -3 || x > 3],
              [m`$x<-3$ או $0<x<3$`, (x) => x < -3 || (x > 0 && x < 3)],
            ]),
            extremum(m`\sqrt x\,(3-x)`, (x) => Math.sqrt(x) * (3 - x), 1, 'מקסימום'),
          ],
        },
      ],
    },
    {
      title: 'חקירה עם שרטוט',
      exercises: [
        {
          title: m`בשרטוט: $f(x)=x+\frac4x$. A ו-B נקודות קיצון.`,
          cols: 1,
          figure: RAT_FIG,
          items: [
            { q: 'שיעורי A:', a: m`$($ [[-2]] $,$ [[-4]] $)$` },
            { q: 'שיעורי B:', a: m`$($ [[2]] $,$ [[4]] $)$` },
            { q: 'מה סוג הנקודה A?', options: ['מקסימום', 'מינימום'], answer: numDeriv(rat, -2.5) > 0 ? 0 : 1 },
            monotone(m`x+\frac4x`, rat, true, [
              [m`$x<-2$ או $x>2$`, (x) => x < -2 || x > 2],
              [m`$-2<x<2$`, (x) => x > -2 && x < 2],
              [m`$x>0$`, (x) => x > 0],
            ]),
          ],
        },
        {
          title: m`בשרטוט: $f(x)=\frac{x^2}{x-1}$. C ו-D נקודות קיצון.`,
          cols: 1,
          figure: QUOT_FIG,
          items: [
            { q: 'האסימפטוטה המאונכת:', a: m`$x =$ [[1]]` },
            { q: 'שיעורי D:', a: m`$($ [[2]] $,$ [[4]] $)$` },
            { q: 'האם יש לגרף אסימפטוטה אופקית?', options: ['כן', 'לא'], answer: 1 },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf(m`ל-$x\sqrt{4-x}$ יש נקודת קיצון בקצה התחום $x=4$.`, root(4) === 0 && root(3.9) > 0),
            tf('נקודה שבה המכנה מתאפס יכולה להיות נקודת חיתוך עם ציר x.', false),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      {
        title: m`חקרו את $f(x)=\frac{x^2}{x-1}$.`,
        cols: 1,
        items: [
          { q: 'תחום ההגדרה:', a: m`$x \ne$ [[1]]` },
          extremum(m`\frac{x^2}{x-1}`, quot, 0, 'מקסימום'),
          extremum(m`\frac{x^2}{x-1}`, quot, 2, 'מינימום'),
        ],
      },
    ],
  },
};
