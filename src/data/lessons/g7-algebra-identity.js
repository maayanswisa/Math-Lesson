import { c, GREEN, m, RED } from './tex.js';

const TABLE = m`<div class='diagram-box'><table dir='ltr' style='border-collapse:collapse;text-align:center;font-weight:700'><tr><td style='padding:4px 10px;border:1px solid #dde'>x</td><td style='padding:4px 10px;border:1px solid #dde'>0</td><td style='padding:4px 10px;border:1px solid #dde'>1</td><td style='padding:4px 10px;border:1px solid #dde'>2</td></tr><tr><td style='padding:4px 10px;border:1px solid #dde;color:#0d6e6e'>3(x+2)</td><td style='padding:4px 10px;border:1px solid #dde'>6</td><td style='padding:4px 10px;border:1px solid #dde'>9</td><td style='padding:4px 10px;border:1px solid #dde'>12</td></tr><tr><td style='padding:4px 10px;border:1px solid #dde;color:#c45c48'>3x+2</td><td style='padding:4px 10px;border:1px solid #dde'>2</td><td style='padding:4px 10px;border:1px solid #dde'>5</td><td style='padding:4px 10px;border:1px solid #dde'>8</td></tr></table></div>`;

export default {
  id: 'g7-algebra-identity',
  topicId: 'g7-algebra-identity',
  grade: 7,
  emoji: '🟰',
  title: 'שוויון בין ביטויים (זהות)',
  subtitle: 'מתי שני ביטויים שווים תמיד — ואיך בודקים',
  sections: [
    {
      id: 'meaning',
      emoji: '👯',
      title: 'ביטויים זהים',
      blocks: [
        {
          type: 'text',
          md: m`$2(x+3)$ ו-$2x+6$ נראים שונים, אבל תציבו כל מספר שתרצו — תקבלו אותה תוצאה. ביטויים כאלה נקראים **זהים**.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'בדיקה בפישוט',
          md: m`פותחים סוגריים ומכנסים בכל ביטוי. אם מגיעים **לאותו ביטוי בדיוק** — הם זהים.

$2(x+3)=2x+6$ ✔️`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איזה ביטוי זהה ל-$4(x-1)+x$?`,
        options: [m`$5x-1$`, m`$5x-4$`, m`$4x-4$`, m`$3x-4$`],
        answer: 1,
        hint: m`$4x-4+x$`,
        explain: m`$4x-4+x=5x-4$`,
      },
    },
    {
      id: 'one-value',
      emoji: '🕵️',
      title: 'ערך אחד לא מספיק',
      blocks: [
        {
          type: 'text',
          md: m`האם $3(x+2)$ ו-$3x+2$ זהים? מציבים כמה ערכים בטבלה:

${TABLE}`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'המלכודת',
          md: m`כבר ב-$x=0$ יוצא $6$ מול $2$ — הם **לא** זהים. ושימו לב: גם אם במקרה יוצא שוויון בערך אחד, זה **לא מוכיח** זהות. מספיקה **דוגמה נגדית אחת** כדי להראות שהביטויים **לא** זהים.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`דנה הציבה $x=1$ ב-$x^2$ ו-$x$, וקיבלה $1$ בשניהם. מה נכון?`,
        options: ['הביטויים זהים', m`הביטויים לא זהים — למשל ב-$x=2$ מקבלים $4$ ו-$2$`, 'צריך להציב רק מספרים שליליים', 'אי אפשר לדעת'],
        answer: 1,
        hint: m`נסו $x=2$.`,
        explain: m`$2^2=4\neq2$ — דוגמה נגדית, ולכן לא זהים.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: זהה או לא?',
      blocks: [
        {
          type: 'steps',
          title: m`האם $5(x+1)-2x$ זהה ל-$3(x+2)-1$?`,
          steps: [
            { math: m`5x+5-2x=${c(GREEN, '3x+5')}`, note: 'מפשטים את הראשון.' },
            { math: m`3x+6-1=${c(GREEN, '3x+5')}`, note: 'מפשטים את השני.' },
            { math: m`3x+5=3x+5`, note: 'אותו ביטוי — זהים ✔️' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`האם $2(x-3)+x$ זהה ל-$3x-3$?`,
        options: [m`כן, שניהם $3x-3$`, m`לא, הראשון שווה ל-$3x-6$`, m`לא, הראשון שווה ל-$2x-3$`, 'רק כש-x=0'],
        answer: 1,
        hint: m`$2(x-3)=2x-6$`,
        explain: m`$2x-6+x=${c(RED, '3x-6')}\neq3x-3$`,
      },
    },
  ],
};
