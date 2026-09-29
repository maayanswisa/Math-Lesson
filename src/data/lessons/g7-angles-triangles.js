import { c, GREEN, m, VIOLET } from './tex.js';

// שלוש הפינות של משולש "נקרעות" ומונחות זו ליד זו על קו ישר
const TEAR = `<div class='diagram-box'><svg viewBox='0 0 300 120' width='300' xmlns='http://www.w3.org/2000/svg' style='max-width:100%'><polygon points='20,100 130,100 55,30' fill='rgba(13,110,110,0.08)' stroke='#0d6e6e' stroke-width='2.5'/><path d='M42,100 A22,22 0 0 0 30,80' fill='rgba(124,77,204,0.35)' stroke='#7c4dcc' stroke-width='2'/><path d='M110,100 A20,20 0 0 1 113,88' fill='rgba(196,92,72,0.35)' stroke='#c45c48' stroke-width='2'/><path d='M49,42 A14,14 0 0 0 64,43' fill='rgba(31,143,224,0.35)' stroke='#1f8fe0' stroke-width='2'/><text x='148' y='70' font-size='22' fill='#4a5d73'>⟶</text><line x1='175' y1='100' x2='295' y2='100' stroke='#1a2b3c' stroke-width='2.5'/><path d='M235,100 L265,100 A30,30 0 0 0 252,76 Z' fill='rgba(196,92,72,0.35)' stroke='#c45c48' stroke-width='2'/><path d='M235,100 L252,76 A30,30 0 0 0 222,71 Z' fill='rgba(31,143,224,0.35)' stroke='#1f8fe0' stroke-width='2'/><path d='M235,100 L222,71 A30,30 0 0 0 205,100 Z' fill='rgba(124,77,204,0.35)' stroke='#7c4dcc' stroke-width='2'/><text x='235' y='116' font-size='12' font-weight='700' text-anchor='middle' fill='#1a2b3c'>180°</text></svg></div>`;

export default {
  id: 'g7-angles-triangles',
  topicId: 'g7-angles-triangles',
  grade: 7,
  emoji: '🔺',
  title: 'זוויות במשולשים ובמרובעים',
  subtitle: '180° במשולש, 360° במרובע — ומשולשים מיוחדים',
  sections: [
    {
      id: 'sum',
      emoji: '✨',
      title: 'סכום הזוויות במשולש',
      blocks: [
        {
          type: 'text',
          md: m`גזרו משולש מנייר, קרעו את שלוש הפינות, והניחו אותן זו ליד זו. הן תמיד יוצרות **קו ישר**!

${TEAR}`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'בכל משולש',
          md: m`$$\alpha+\beta+\gamma=180°$$
לא משנה אם הוא גדול, קטן, צר או רחב.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '°',
        prompt: 'במשולש שתי זוויות הן 50° ו-75°. מה הזווית השלישית?',
        answer: 55,
        hint: m`$180°-50°-75°$`,
        explain: m`$180°-125°=55°$`,
      },
    },
    {
      id: 'special',
      emoji: '💎',
      title: 'משולשים מיוחדים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שלושה מקרים',
          md: m`**שווה-שוקיים** (שתי צלעות שוות): הזוויות שמול הצלעות השוות — **שוות**.

**שווה-צלעות**: כל הזוויות שוות, כל אחת $180°:3=60°$.

**ישר-זווית**: זווית אחת $90°$, ולכן שתי האחרות ביחד $90°$.`,
        },
        {
          type: 'steps',
          title: 'משולש שווה-שוקיים, זווית הראש 40°',
          steps: [
            { math: m`180°-${c(VIOLET, '40°')}=140°`, note: 'מה שנשאר לשתי זוויות הבסיס.' },
            { math: m`140°:2=${c(GREEN, '70°')}`, note: 'הן שוות — מחלקים ב-2.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '°',
        prompt: 'במשולש ישר-זווית אחת הזוויות החדות היא 28°. מה הזווית החדה השנייה?',
        answer: 62,
        hint: m`שתי החדות ביחד $90°$.`,
        explain: m`$90°-28°=62°$`,
      },
    },
    {
      id: 'quad',
      emoji: '🏆',
      title: 'שלב הבוס: מרובע',
      blocks: [
        {
          type: 'card',
          tone: 'why',
          title: 'למה 360°?',
          md: m`מעבירים **אלכסון** — והמרובע מתחלק לשני משולשים. בכל אחד $180°$, וביחד $180°+180°=360°$.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'בכל מרובע',
          md: m`סכום הזוויות הוא $360°$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '°',
        prompt: 'במרובע שלוש זוויות הן 90°, 85° ו-100°. מה הזווית הרביעית?',
        answer: 85,
        hint: m`$360°-90°-85°-100°$`,
        explain: m`$360°-275°=85°$`,
      },
    },
  ],
};
