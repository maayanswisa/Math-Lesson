import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g5-trapezoid',
  topicId: 'g5-trapezoid',
  grade: 5,
  emoji: '⏢',
  title: 'טרפז — גובה ושטח',
  subtitle: 'בסיס גדול, בסיס קטן, והנוסחה של "הבסיס הממוצע"',
  sections: [
    {
      id: 'parts',
      emoji: '🏷️',
      title: 'חלקי הטרפז',
      blocks: [
        {
          type: 'text',
          md: m`**טרפז** = מרובע עם **זוג אחד** בלבד של צלעות מקבילות.

- הצלעות המקבילות — **בסיסים** (גדול וקטן)
- שתי האחרות — **שוקיים**
- **גובה** — המרחק הישר בין הבסיסים`,
        },
        {
          type: 'shape',
          shape: 'trapezoid',
          caption: 'בסיס גדול (כחול), בסיס קטן (ירוק), גובה (אדום):',
          base: 8,
          top: 4,
          height: 3,
          shift: 2,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה זוגות של צלעות מקבילות יש בטרפז?',
        answer: 1,
        hint: 'זה מה שמבדיל אותו ממקבילית.',
        explain: 'בדיוק זוג אחד — הבסיסים.',
      },
    },
    {
      id: 'area',
      emoji: '📐',
      title: 'השטח: הבסיס הממוצע',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שטח טרפז',
          md: m`(בסיס גדול + בסיס קטן) × גובה, ואז **חלקי 2**

בקיצור: $\frac{(a+b)\times h}{2}$`,
        },
        {
          type: 'steps',
          title: 'בסיסים 10 ו-6, גובה 4',
          steps: [
            { math: m`10+6=${c(VIOLET, '16')}`, note: 'מחברים את הבסיסים.' },
            { math: m`16\div2=8`, note: 'חצי — זה "הבסיס הממוצע".' },
            { math: m`8\times4=${c(GREEN, '32')}`, note: 'כפול הגובה: 32 סמ"ר.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: 'טרפז עם בסיסים 7 ו-3 וגובה 5. מה השטח?',
        answer: 25,
        hint: m`$\frac{(7+3)\times5}{2}$`,
        explain: m`$\frac{10\times5}{2}=25$ סמ"ר.`,
      },
    },
    {
      id: 'special',
      emoji: '🏆',
      title: 'שלב הבוס: טרפזים מיוחדים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שני סוגים מיוחדים',
          md: '**ישר-זווית** — שוק אחת מאונכת לבסיסים (והיא גם הגובה!).\n\n**שווה-שוקיים** — שתי השוקיים שוות, וזוויות הבסיס שוות.',
        },
        {
          type: 'card',
          tone: 'why',
          title: 'קשר למקבילית',
          md: m`אם שני הבסיסים **שווים** ($b$), הנוסחה הופכת ל-$\frac{(b+b)\times h}{2}=b\times h$ — בדיוק שטח מקבילית!`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: 'טרפז ישר-זווית: בסיסים 9 ו-5, השוק המאונכת 6. מה השטח?',
        answer: 42,
        hint: 'השוק המאונכת היא הגובה.',
        explain: m`$\frac{(9+5)\times6}{2}=\frac{84}{2}=42$`,
      },
    },
  ],
};
