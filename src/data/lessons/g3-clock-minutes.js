export default {
  id: 'g3-clock-minutes',
  topicId: 'g3-clock-minutes',
  grade: 3,
  emoji: '🕒',
  title: 'קריאת שעון בדקות',
  subtitle: 'מחוג ארוך, מחוג קצר, שעון דיגיטלי ושעון 24 שעות',
  sections: [
    {
      id: 'minutes',
      emoji: '⏱️',
      title: 'המחוג הארוך סופר דקות',
      blocks: [
        {
          type: 'text',
          md: '- **המחוג הקצר** (אדום) מראה את **השעה**.\n- **המחוג הארוך** (ירוק) מראה את **הדקות**.\n\nבין כל שני מספרים על השעון יש **5 דקות**. אז סופרים בקפיצות של 5: על ה-1 = 5 דקות, על ה-2 = 10, על ה-7 = 35…',
        },
        {
          type: 'clock',
          caption: 'הזיזו את השעון בכפתורים:',
          time: 3 * 60 + 35,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'דקות',
        prompt: 'המחוג הארוך מצביע על המספר 9. כמה דקות עברו?',
        answer: 45,
        hint: 'כל מספר = 5 דקות. 9 פעמים 5?',
        explain: '9 × 5 = 45 דקות.',
      },
    },
    {
      id: 'twenty-four',
      emoji: '🌙',
      title: 'שעון 24 שעות',
      blocks: [
        {
          type: 'text',
          md: 'ביום יש **24 שעות**. אחרי 12 בצהריים ממשיכים לספור: 13, 14, 15…\n\n**15:00** = 3 אחר הצהריים (15 − 12 = 3).',
        },
        {
          type: 'clock',
          caption: 'שעון 24 שעות — לחצו "עוד שעה" ועברו את הצהריים:',
          time: 11 * 60,
          show24: true,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'השעה 18:00. מה השעה בשעון רגיל (אחר הצהריים)?',
        answer: 6,
        hint: '18 − 12',
        explain: '18 − 12 = 6, כלומר 6 בערב.',
      },
    },
    {
      id: 'duration',
      emoji: '🏆',
      title: 'שלב הבוס: כמה זמן עבר?',
      blocks: [
        {
          type: 'steps',
          title: 'מ-9:20 עד 10:05',
          steps: [
            { math: '9{:}20\\to10{:}00', note: 'עד השעה העגולה: 40 דקות.' },
            { math: '10{:}00\\to10{:}05', note: 'ועוד 5 דקות.' },
            { math: '40+5=\\textcolor{#2d7a4f}{45}', note: 'עברו 45 דקות.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'דקות',
        prompt: 'השיעור התחיל ב-8:50 ונגמר ב-9:35. כמה דקות נמשך?',
        answer: 45,
        hint: 'מ-8:50 עד 9:00, ועוד מ-9:00 עד 9:35.',
        explain: '10 + 35 = 45 דקות.',
      },
    },
  ],
};
