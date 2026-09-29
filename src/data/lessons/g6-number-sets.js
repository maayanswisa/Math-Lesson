import { m } from './tex.js';

const SETS = `<div class='diagram-box'><svg viewBox='0 0 280 170' width='280' xmlns='http://www.w3.org/2000/svg' style='max-width:100%;direction:ltr'><ellipse cx='140' cy='85' rx='132' ry='78' fill='rgba(124,77,204,0.12)' stroke='#7c4dcc' stroke-width='2'/><ellipse cx='150' cy='98' rx='92' ry='56' fill='rgba(31,143,224,0.14)' stroke='#1f8fe0' stroke-width='2'/><ellipse cx='165' cy='108' rx='52' ry='32' fill='rgba(13,110,110,0.18)' stroke='#0d6e6e' stroke-width='2'/><g font-size='11' font-weight='800'><text x='38' y='40' fill='#7c4dcc'>רציונליים</text><text x='70' y='70' fill='#1f8fe0'>שלמים</text><text x='145' y='100' fill='#0d6e6e'>טבעיים</text></g><g font-size='12' font-weight='700' fill='#1a2b3c'><text x='150' y='124'>3, 17</text><text x='70' y='120'>0, −4</text><text x='170' y='32'>½, 0.7</text></g></svg></div>`;

export default {
  id: 'g6-number-sets',
  topicId: 'g6-number-sets',
  grade: 6,
  emoji: '🪆',
  title: 'קבוצות מספרים',
  subtitle: 'טבעיים, שלמים ורציונליים — כמו בובות בבובה',
  sections: [
    {
      id: 'sets',
      emoji: '🪆',
      title: 'קבוצה בתוך קבוצה',
      blocks: [
        {
          type: 'text',
          md: m`${SETS}

**טבעיים** — $1, 2, 3, \ldots$ · **שלמים** — גם 0 והשליליים · **רציונליים** — כל מספר שאפשר לכתוב כשבר.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`לאיזו קבוצה שייך $0$?`,
        options: ['רק לטבעיים', 'לשלמים ולרציונליים', 'לאף קבוצה', 'רק לרציונליים'],
        answer: 1,
        hint: 'האם 0 הוא מספר טבעי?',
        explain: m`$0$ שלם (ולכן גם רציונלי: $\frac01$), אבל לא טבעי.`,
      },
    },
    {
      id: 'fraction',
      emoji: '➗',
      title: 'כל שלם הוא שבר',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שבר עם מכנה 1',
          md: m`$5=\frac51=\frac{10}{2}$ — כל מספר שלם הוא גם רציונלי.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזה משפט נכון?',
        options: ['כל רציונלי הוא טבעי', 'כל טבעי הוא רציונלי', 'אין מספר שהוא גם שלם וגם רציונלי', 'שברים אינם מספרים'],
        answer: 1,
        hint: 'הקבוצה הקטנה בתוך הגדולה.',
        explain: 'הטבעיים בתוך השלמים, והשלמים בתוך הרציונליים.',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: סדר פעולות עם שברים',
      blocks: [
        {
          type: 'text',
          md: m`אותם חוקים לכל המספרים: $\frac12+3\times\frac14=\frac12+\frac34=\frac54$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $(0.5+1.5)\times3-4$?`,
        answer: 2,
        hint: 'קודם הסוגריים.',
        explain: m`$2\times3-4=2$`,
      },
    },
  ],
};
