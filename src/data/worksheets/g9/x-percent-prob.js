import { m, round } from '../helpers.js';
import { tf } from './shared.js';
import { probBlank } from './probability.js';

const pctOf = (p, n) => ({ q: m`$${p}\%$ מ-$${n}$ הם [[${round((p * n) / 100)}]]` });
const discount = (price, p) => ({ q: m`מחיר $${price}$ ש״ח, הנחה של $${p}\%$.`, a: m`מחיר אחרי ההנחה: [[${round(price * (1 - p / 100))}]] ש״ח` });
const raise = (price, p) => ({ q: m`מחיר $${price}$ ש״ח, התייקרות של $${p}\%$.`, a: m`מחיר חדש: [[${round(price * (1 + p / 100))}]] ש״ח` });
const whatPct = (part, n) => ({ q: m`$${part}$ מתוך $${n}$ הם [[${round((part / n) * 100)}]] $\%$` });
const prob = (q, fav, all) => ({ q, a: probBlank(fav, all) });

export default {
  id: 'g9x-percent-prob',
  grade: 9,
  emoji: '🏷️',
  title: 'אחוזים והסתברות',
  reminder: [
    {
      title: 'אחוזים',
      md: m`$p\%$ ממספר $= \frac{p}{100} \times$ המספר. $\;20\%$ מ-$150$ $= 0.2 \times 150 = 30$

הנחה של $20\%$ ← משלמים $80\%$: $\;\times 0.8$ · התייקרות של $15\%$ ← $\times 1.15$`,
    },
    {
      title: 'הסתברות',
      md: m`**הסתברות** = מספר התוצאות הרצויות : מספר כל התוצאות. תמיד בין $0$ ל-$1$.`,
    },
  ],
  pages: [
    {
      title: 'אחוזים',
      exercises: [
        { title: 'חשבו.', cols: 2, items: [pctOf(20, 150), pctOf(50, 86), pctOf(15, 200), pctOf(5, 60)] },
        { title: 'הנחות והתייקרויות.', cols: 1, items: [discount(200, 25), discount(80, 10), raise(50, 20), raise(120, 5)] },
        { title: 'כמה אחוזים?', cols: 2, items: [whatPct(15, 60), whatPct(9, 30), whatPct(40, 50)] },
      ],
    },
    {
      title: 'הסתברות',
      exercises: [
        {
          title: 'קובייה רגילה. מה ההסתברות... (כשבר)',
          cols: 2,
          items: [prob('לקבל 3?', 1, 6), prob('לקבל מספר אי-זוגי?', 3, 6), prob('לקבל מספר גדול מ-2?', 4, 6)],
        },
        {
          title: m`בכיתה $12$ בנים ו-$18$ בנות. בוחרים תלמיד אחד באקראי.`,
          cols: 2,
          items: [prob('מה ההסתברות לבחור בת?', 18, 30), prob('מה ההסתברות לבחור בן?', 12, 30)],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('הסתברות של 0 פירושה מאורע ודאי.', false), tf('הסתברות לא יכולה להיות גדולה מ-1.', true)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'אחוזים.', cols: 1, items: [pctOf(30, 90), discount(150, 40), whatPct(12, 48)] },
      { title: 'הסתברות.', cols: 1, items: [prob('בשקית 3 סוכריות אדומות ו-7 צהובות. מה ההסתברות לאדומה?', 3, 10)] },
    ],
  },
};
