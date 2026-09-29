export default {
  id: 'g2-shapes-measure',
  topicId: 'g2-shapes-measure',
  grade: 2,
  emoji: '🧩',
  title: 'צורות ומדידה',
  subtitle: 'הזזה ושיקוף, מדידה בס״מ, והשוואת שטחים',
  sections: [
    {
      id: 'move',
      emoji: '🪞',
      title: 'הזזה ושיקוף',
      blocks: [
        {
          type: 'transform',
          mode: 'move',
          modes: ['move', 'reflect'],
          caption: 'בהזזה הצורה רק זזה. בשיקוף — היא הופכת כמו במראה:',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מסתכלים במראה על יד ימין. באיזו יד נראה שמרימים?',
        options: ['ימין', 'שמאל', 'שתיהן', 'אף אחת'],
        answer: 1,
        hint: 'במראה הכול הפוך מצד לצד.',
        explain: 'השיקוף הופך ימין ושמאל.',
      },
    },
    {
      id: 'measure',
      emoji: '📏',
      title: 'מודדים בס״מ',
      blocks: [
        {
          type: 'ruler',
          len: 11,
          caption: 'קראו את האורך על הסרגל:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס״מ',
        prompt: 'מחק מתחיל ב-0 ונגמר ב-4. מה האורך שלו?',
        answer: 4,
        hint: 'מתחילים מאפס.',
        explain: 'המחק באורך 4 ס״מ.',
      },
    },
    {
      id: 'area',
      emoji: '🟩',
      title: 'שלב הבוס: מי תופס יותר מקום?',
      blocks: [
        {
          type: 'rect',
          l: 4,
          w: 3,
          caption: 'השטח = כמה משבצות בפנים. שנו את המלבן וספרו:',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מלבן אחד מכסה 8 משבצות ומלבן אחר 10 משבצות. למי שטח גדול יותר?',
        options: ['למלבן עם 8', 'למלבן עם 10', 'שווים', 'אי אפשר לדעת'],
        answer: 1,
        hint: 'יותר משבצות — יותר שטח.',
        explain: 'עשר משבצות הן יותר משמונה — השטח גדול יותר.',
      },
    },
  ],
};
