export default {
  id: 'g2-right-angle',
  topicId: 'g2-right-angle',
  grade: 2,
  emoji: '📐',
  title: 'זווית ישרה',
  subtitle: 'הפינה של הדף — ואיפה עוד מוצאים אותה',
  sections: [
    {
      id: 'what',
      emoji: '📄',
      title: 'מהי זווית ישרה?',
      blocks: [
        {
          type: 'text',
          md: 'קחו דף וקפלו אותו פעמיים — הפינה שנוצרה היא **זווית ישרה** 📐. מסמנים אותה בריבוע קטן.',
        },
        {
          type: 'angle',
          angle: 90,
          caption: 'פתחו וסגרו את הזווית. מתי היא ישרה?',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איפה יש זווית ישרה?',
        options: ['בפינה של ספר 📘', 'בעיגול ⚪', 'בקצה של פרוסת פיצה 🍕', 'בכדור ⚽'],
        answer: 0,
        hint: 'חפשו פינה של דף.',
        explain: 'לספר מלבני יש 4 פינות ישרות.',
      },
    },
    {
      id: 'shapes',
      emoji: '🟦',
      title: 'בצורות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מי עם זוויות ישרות?',
          md: '**ריבוע** ו**מלבן** — כל 4 הפינות ישרות. **משולש** — לפעמים יש לו פינה ישרה אחת.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה זוויות ישרות יש לריבוע?',
        answer: 4,
        hint: 'ספרו את הפינות.',
        explain: 'לריבוע 4 פינות — וכולן ישרות.',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: קטן או גדול מישרה',
      blocks: [
        {
          type: 'angle',
          angle: 45,
          caption: 'זווית צרה מפינת הדף — חדה. רחבה ממנה — קהה:',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'המחוגים בשעון בשעה 3 בדיוק יוצרים זווית:',
        options: ['חדה', 'ישרה', 'קהה', 'שטוחה'],
        answer: 1,
        hint: 'מחוג אחד על 12 והשני על 3.',
        explain: 'בשעה 3 המחוגים יוצרים זווית ישרה.',
      },
    },
  ],
};
