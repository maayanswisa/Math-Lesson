import { m } from './tex.js';

const CLIPS = `<div class='diagram-box'><svg viewBox='0 0 300 110' width='300' xmlns='http://www.w3.org/2000/svg' style='max-width:100%'><rect x='10' y='15' width='200' height='16' rx='4' fill='#e2a020'/><polygon points='210,15 230,23 210,31' fill='#f2d3a0'/>${[0, 1, 2, 3, 4, 5]
  .map((i) => `<rect x='${10 + i * 37}' y='50' width='34' height='12' rx='6' fill='none' stroke='#7c4dcc' stroke-width='3'/>`)
  .join('')}<rect x='10' y='80' width='150' height='16' rx='4' fill='#0d6e6e'/><polygon points='160,80 180,88 160,96' fill='#9fd0d0'/></svg></div>`;

export default {
  id: 'g1-measure',
  topicId: 'g1-measure',
  grade: 1,
  emoji: '📐',
  title: 'מדידת אורך',
  subtitle: 'ארוך, קצר — ומודדים עם אטבים',
  sections: [
    {
      id: 'compare',
      emoji: '↔️',
      title: 'מי ארוך יותר?',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'משווים מאותה נקודה',
          md: 'כדי להשוות שני עפרונות — מיישרים אותם **מאותה התחלה**, ורואים מי מגיע רחוק יותר.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מה ארוך יותר בדרך כלל?',
        options: ['נעל', 'מיטה', 'עיפרון', 'מחק'],
        answer: 1,
        hint: 'על מה אפשר לשכב?',
        explain: 'מיטה ארוכה מכל השאר.',
      },
    },
    {
      id: 'units',
      emoji: '📎',
      title: 'מודדים באטבים',
      blocks: [
        {
          type: 'text',
          md: `${CLIPS}

העיפרון הצהוב ארוך כמו **6 אטבים** בערך. מניחים אטבים **צמודים**, בלי רווחים ובלי חפיפות.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מחק באורך 2 אטבים, ועיפרון באורך 7 אטבים. בכמה אטבים העיפרון ארוך יותר?',
        answer: 5,
        hint: 'כמה חסר מ-2 עד 7?',
        explain: m`$7-2=5$ אטבים.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: יחידה אחרת',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'יחידה גדולה — פחות יחידות',
          md: 'שולחן באורך **8 כפות ידיים** של ילד — אבל רק **5 כפות ידיים** של אבא. היד של אבא גדולה, אז צריך פחות ממנה!',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מודדים את החדר בצעדים. מי יספור יותר צעדים — ילד או מבוגר?',
        options: ['ילד', 'מבוגר', 'אותו דבר', 'אי אפשר למדוד בצעדים'],
        answer: 0,
        hint: 'למי צעד קטן יותר?',
        explain: 'לילד צעדים קטנים — אז הוא צריך יותר מהם.',
      },
    },
  ],
};
