const PARTS_SVG = `<div class='diagram-box'><svg viewBox='0 0 240 200' width='240' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><circle cx='120' cy='100' r='80' fill='rgba(13,110,110,0.06)' stroke='#0d6e6e' stroke-width='2.5'/><circle cx='120' cy='100' r='3.5' fill='#1a2b3c'/><line x1='120' y1='100' x2='200' y2='100' stroke='#c45c48' stroke-width='3'/><text x='160' y='94' text-anchor='middle' font-size='11' font-weight='700' fill='#c45c48'>רדיוס</text><line x1='63' y1='43' x2='177' y2='157' stroke='#7c4dcc' stroke-width='2.5'/><text x='88' y='60' font-size='11' font-weight='700' fill='#7c4dcc'>קוטר</text><line x1='55' y1='147' x2='185' y2='147' stroke='#1670b3' stroke-width='2.5'/><text x='120' y='168' text-anchor='middle' font-size='11' font-weight='700' fill='#1670b3'>מיתר</text><path d='M 63 43 A 80 80 0 0 1 177 43' fill='none' stroke='#e2a020' stroke-width='5'/><text x='120' y='14' text-anchor='middle' font-size='11' font-weight='700' fill='#b97e12'>קשת</text></svg></div>`;

export default {
  id: 'g9r-circle-chords',
  topicId: 'g9r-circle-chords',
  grade: 9,
  emoji: '⭕',
  title: 'מעגל: זוויות מרכזיות ומיתרים',
  subtitle: 'מושגי יסוד, זווית מרכזית וקשת, והאנך מהמרכז למיתר',
  sections: [
    {
      id: 'terms',
      emoji: '🏷️',
      title: 'מושגי יסוד',
      blocks: [
        {
          type: 'text',
          md: `${PARTS_SVG}

- **רדיוס** — מהמרכז למעגל.
- **מיתר** — קטע בין שתי נקודות על המעגל.
- **קוטר** — מיתר שעובר דרך המרכז (= 2 רדיוסים).
- **קשת** — חלק מהמעגל עצמו.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מהו המיתר הארוך ביותר במעגל?',
        options: ['רדיוס', 'קוטר', 'כל המיתרים שווים', 'אין כזה'],
        answer: 1,
        hint: 'איזה מיתר עובר דרך המרכז?',
        explain: 'הקוטר — המיתר שעובר דרך המרכז — הוא הארוך ביותר.',
      },
    },
    {
      id: 'central',
      emoji: '📐',
      title: 'זווית מרכזית וקשת',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'זווית מרכזית',
          md: '**זווית שהקודקוד שלה במרכז**, וצלעותיה שני רדיוסים. היא **שווה במעלות לקשת** שהיא נשענת עליה. כל המעגל = 360°.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '°',
        prompt: 'קשת היא רבע מהמעגל. מה הזווית המרכזית שנשענת עליה?',
        answer: 90,
        hint: 'רבע מ-360°.',
        explain: '360° ÷ 4 = 90°.',
      },
    },
    {
      id: 'perpendicular',
      emoji: '🏆',
      title: 'שלב הבוס: האנך מהמרכז',
      blocks: [
        {
          type: 'circletheorems',
          mode: 'chord',
          caption: 'הזיזו את המיתר — קרוב ורחוק מהמרכז:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שני משפטים',
          md: '**האנך מהמרכז למיתר חוצה אותו** (ולהפך).\n\n**מיתרים שווים ⟺ באותו מרחק מהמרכז.** מיתר קרוב יותר למרכז — ארוך יותר.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מיתר באורך 16 במעגל שרדיוסו 10. מה המרחק מהמרכז למיתר?',
        answer: 6,
        hint: 'האנך חוצה את המיתר: חצי מיתר 8, רדיוס 10 — פיתגורס!',
        explain: '√(10² − 8²) = √36 = 6.',
      },
    },
  ],
};
