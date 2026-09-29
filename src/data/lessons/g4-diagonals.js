const CONCAVE = `<div class='diagram-box'><svg viewBox='0 0 200 140' width='200' xmlns='http://www.w3.org/2000/svg'><polygon points='20,120 100,20 180,120 100,80' fill='rgba(13,110,110,0.1)' stroke='#0d6e6e' stroke-width='3'/><line x1='20' y1='120' x2='180' y2='120' stroke='#c45c48' stroke-width='2.5' stroke-dasharray='6 4'/><line x1='100' y1='20' x2='100' y2='80' stroke='#7c4dcc' stroke-width='2.5'/></svg></div>`;

export default {
  id: 'g4-diagonals',
  topicId: 'g4-diagonals',
  grade: 4,
  emoji: '✳️',
  title: 'אלכסונים במצולעים',
  subtitle: 'קטעים שמחברים קודקודים שאינם שכנים',
  sections: [
    {
      id: 'what',
      emoji: '📐',
      title: 'מהו אלכסון?',
      blocks: [
        {
          type: 'diagonals',
          n: 5,
          caption: 'מחומש וכל האלכסונים שלו. שנו את מספר הקודקודים:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'אלכסון',
          md: 'קטע שמחבר **שני קודקודים שאינם שכנים**. צלע מחברת שכנים — ולכן היא לא אלכסון.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה אלכסונים יש למשולש?',
        answer: 0,
        hint: 'בכל משולש, כל שני קודקודים שכנים.',
        explain: 'במשולש כל קודקוד מחובר בצלע לשני האחרים — אין אלכסונים.',
      },
    },
    {
      id: 'count',
      emoji: '🔢',
      title: 'סופרים',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'מקודקוד אחד',
          md: 'לחצו על "רק מקודקוד אחד": מכל קודקוד יוצאים אלכסונים לכל הקודקודים **חוץ** ממנו ומשני שכניו.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה אלכסונים יש למשושה?',
        answer: 9,
        hint: 'בדקו בכלי: 6 קודקודים.',
        explain: 'למשושה 9 אלכסונים.',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מצולע לא קמור',
      blocks: [
        {
          type: 'text',
          md: `${CONCAVE}

במצולע **לא קמור** (עם "שקע"), אלכסון יכול לצאת **מחוץ** למצולע — כמו הקו האדום המקווקו.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'במצולע קמור, איפה נמצאים כל האלכסונים?',
        options: ['בתוך המצולע', 'מחוץ למצולע', 'חלק בפנים וחלק בחוץ', 'על הצלעות'],
        answer: 0,
        hint: 'קמור = בלי שקעים.',
        explain: 'במצולע קמור כל האלכסונים בפנים.',
      },
    },
  ],
};
