const TABLE = (() => {
  const row = (pairs) =>
    `<tr>${pairs.map(([l]) => `<td style='font-size:1.1em;font-weight:800;padding:3px 5px;min-width:1.4em;background:rgba(13,110,110,0.1);border-radius:6px'>${l}</td>`).join('')}</tr><tr>${pairs
      .map(([, v]) => `<td style='color:#0a5555;font-weight:700;padding:1px 2px;font-size:0.85em'>${v}</td>`)
      .join('')}</tr>`;
  const ones = [['א', 1], ['ב', 2], ['ג', 3], ['ד', 4], ['ה', 5], ['ו', 6], ['ז', 7], ['ח', 8], ['ט', 9]];
  const tens = [['י', 10], ['כ', 20], ['ל', 30], ['מ', 40], ['נ', 50], ['ס', 60], ['ע', 70], ['פ', 80], ['צ', 90]];
  const hundreds = [['ק', 100], ['ר', 200], ['ש', 300], ['ת', 400]];
  return `<div class='diagram-box'><table dir='rtl' style='border-collapse:separate;border-spacing:2px;text-align:center'>${row(ones)}${row(tens)}${row(hundreds)}</table></div>`;
})();

export default {
  id: 'g3-gematria',
  topicId: 'g3-gematria',
  grade: 3,
  emoji: '🔤',
  title: 'גימטריה',
  subtitle: 'לכל אות עברית יש ערך מספרי — ואפשר לחשב מילים!',
  sections: [
    {
      id: 'values',
      emoji: '🔢',
      title: 'אותיות שהן מספרים',
      blocks: [
        {
          type: 'text',
          md: `לכל אות יש מספר:

${TABLE}

**א–ט** = יחידות · **י–צ** = עשרות · **ק–ת** = מאות`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מה הערך של האות ל?',
        answer: 30,
        hint: 'י=10, כ=20, ל=…',
        explain: 'ל = 30.',
      },
    },
    {
      id: 'word',
      emoji: '✍️',
      title: 'גימטריה של מילה',
      blocks: [
        {
          type: 'text',
          md: '**מחברים** את הערכים של כל האותיות במילה.',
        },
        {
          type: 'gematria',
          caption: 'כתבו מילה ובדקו את הגימטריה שלה:',
          word: 'טוב',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מה הגימטריה של המילה "אבא"?',
        answer: 4,
        hint: 'א + ב + א',
        explain: '1 + 2 + 1 = 4',
      },
    },
    {
      id: 'order',
      emoji: '🏆',
      title: 'שלב הבוס: הסדר לא משנה',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'שונה מהמספרים הרגילים',
          md: 'במספרים רגילים, **המקום** של הספרה חשוב (12 ≠ 21). בגימטריה — לא! "בג" ו"גב" שוות: 2 + 3 = 5.',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'אותיות סופיות',
          md: 'ך, ם, ן, ף, ץ שוות כמו האותיות הרגילות: ם = 40, ן = 50.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מה הגימטריה של המילה "שלום"?',
        answer: 376,
        hint: 'ש=300, ל=30, ו=6, ם=40',
        explain: '300 + 30 + 6 + 40 = 376',
      },
    },
  ],
};
