import { m } from './tex.js';

// ישר מספרים 0–3 עם רבעים, ונקודה ב-7/4
const LINE_SVG = `<div class='diagram-box'><svg viewBox='0 0 320 70' width='320' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><line x1='20' y1='35' x2='300' y2='35' stroke='#1a2b3c' stroke-width='2'/>${Array.from({ length: 13 }, (_, i) => {
  const x = 20 + i * (280 / 12);
  const whole = i % 4 === 0;
  return `<line x1='${x}' y1='${whole ? 25 : 30}' x2='${x}' y2='${whole ? 45 : 40}' stroke='#1a2b3c' stroke-width='${whole ? 2 : 1}'/>${whole ? `<text x='${x}' y='62' text-anchor='middle' font-size='14' font-weight='700' fill='#1a2b3c'>${i / 4}</text>` : ''}`;
}).join('')}<circle cx='${20 + 7 * (280 / 12)}' cy='35' r='7' fill='#c45c48'/><text x='${20 + 7 * (280 / 12)}' y='16' text-anchor='middle' font-size='13' font-weight='700' fill='#c45c48'>7/4</text></svg></div>`;

export default {
  id: 'g5-fractions-models',
  topicId: 'g5-fractions-models',
  grade: 5,
  emoji: '🍰',
  title: 'ייצוג שברים במודלים',
  subtitle: 'עוגה, מלבן, רצועה — ושברים על ישר המספרים',
  sections: [
    {
      id: 'models',
      emoji: '🟦',
      title: 'אותו שבר, הרבה ציורים',
      blocks: [
        {
          type: 'text',
          md: m`השבר $\frac{3}{4}$ אומר: מחלקים **שלם אחד** ל-**4 חלקים שווים**, ולוקחים **3** מהם.

- **המכנה** (למטה) — לכמה חלקים מחלקים.
- **המונה** (למעלה) — כמה חלקים לוקחים.`,
        },
        {
          type: 'fraction',
          caption: 'שנו את המונה והמכנה וראו את השבר ברצועה:',
          bars: [{ n: 3, d: 4 }],
          editable: true,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מלבן מחולק ל-8 חלקים שווים, ו-5 מהם צבועים. איזה שבר צבוע?',
        options: [m`$\frac{8}{5}$`, m`$\frac{5}{8}$`, m`$\frac{3}{8}$`, m`$\frac{5}{3}$`],
        answer: 1,
        hint: 'המכנה — לכמה חלקים חילקו. המונה — כמה צבועים.',
        explain: m`8 חלקים (מכנה), 5 צבועים (מונה): $\frac58$.`,
      },
    },
    {
      id: 'more-than-one',
      emoji: '🍕',
      title: 'שבר גדול מ-1',
      blocks: [
        {
          type: 'text',
          md: m`מה אם לוקחים **יותר חלקים** ממה שיש בשלם אחד? צריך עוד שלם!

$\frac{7}{4}$ = שלם אחד ($\frac44$) ועוד $\frac34$.`,
        },
        {
          type: 'fraction',
          caption: m`$\frac{7}{4}$ — שתי רצועות:`,
          bars: [{ n: 7, d: 4 }],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה רצועות שלמות צריך כדי לצייר את $\frac{9}{4}$?`,
        answer: 3,
        hint: m`כל רצועה = 4 רבעים. 9 רבעים = 4 + 4 + עוד 1.`,
        explain: m`שתי רצועות מלאות ($\frac84$) ועוד רבע — צריך 3 רצועות.`,
      },
    },
    {
      id: 'number-line',
      emoji: '📏',
      title: 'שברים על ישר המספרים',
      blocks: [
        {
          type: 'text',
          md: m`גם על ישר המספרים מחלקים כל קטע בין שני שלמים לחלקים שווים. $\frac74$ נמצא **בין 1 ל-2**, קרוב ל-2:

${LINE_SVG}`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`בין אילו שלמים נמצא $\frac{11}{4}$?`,
        options: ['0 ו-1', '1 ו-2', '2 ו-3', '3 ו-4'],
        answer: 2,
        hint: m`כמה רבעים יש ב-2? וכמה ב-3?`,
        explain: m`$2=\frac84$ ו-$3=\frac{12}4$, ו-11 בין 8 ל-12.`,
      },
    },
  ],
};
