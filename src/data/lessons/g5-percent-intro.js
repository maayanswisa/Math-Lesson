import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g5-percent-intro',
  topicId: 'g5-percent-intro',
  grade: 5,
  emoji: '💯',
  title: 'אחוזים — היכרות',
  subtitle: 'אחוז = מתוך 100, אחוזים "ידידותיים", וחישוב אחוז מכמות',
  sections: [
    {
      id: 'what',
      emoji: '🔢',
      title: 'מה זה אחוז?',
      blocks: [
        {
          type: 'text',
          md: m`הסימן $\%$ אומר **"מתוך מאה"**. $37\%$ זה בדיוק $\frac{37}{100}$.

שלוש דרכים לכתוב את אותו דבר: $37\%=\frac{37}{100}=0.37$`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'אחוזים ידידותיים — כדאי לזכור',
          md: m`$50\%=\frac12$ (חצי) · $25\%=\frac14$ (רבע) · $75\%=\frac34$ · $10\%=\frac1{10}$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איזה שבר שווה ל-$25\%$?`,
        options: [m`$\frac{1}{2}$`, m`$\frac{1}{4}$`, m`$\frac{1}{25}$`, m`$\frac{2}{5}$`],
        answer: 1,
        hint: 'רבע מ-100 זה 25.',
        explain: m`$25\%=\frac{25}{100}=\frac14$`,
      },
    },
    {
      id: 'of-amount',
      emoji: '🧮',
      title: 'אחוז מתוך כמות',
      blocks: [
        {
          type: 'percent',
          mode: 'part',
          total: 200,
          percent: 30,
          caption: m`כמה זה אחוז מתוך $200$? הזיזו את הסליידר:`,
        },
        {
          type: 'steps',
          title: m`כמה זה $30\%$ מ-200?`,
          steps: [
            { math: m`1\%=200\div100=${c(VIOLET, '2')}`, note: 'קודם מוצאים אחוז אחד.' },
            { math: m`30\%=30\times${c(VIOLET, '2')}=${c(GREEN, '60')}`, note: 'ואז כופלים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $50\%$ מ-84?`,
        answer: 42,
        hint: '50% זה חצי.',
        explain: m`חצי מ-84 הוא 42.`,
      },
    },
    {
      id: 'ten',
      emoji: '🏆',
      title: 'שלב הבוס: הטריק של 10%',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: '10% = מחלקים ב-10',
          md: m`$10\%$ מ-450 = $45$.

ומשם הכול קל: $20\%=2\times45=90$ · $5\%$ = חצי מ-45 = $22.5$`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'דיאגרמת עוגה',
          md: 'כל הפלחים בעוגה ביחד תמיד **100%** — כל השלם.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $30\%$ מ-70?`,
        answer: 21,
        hint: m`$10\%$ מ-70 זה 7. ו-30%?`,
        explain: m`$3\times7=21$`,
      },
    },
  ],
};
