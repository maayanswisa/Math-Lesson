/** תוכנית לימודים — יסודי א'–ו' (משרד החינוך) */

export const ELEMENTARY_TOPICS = [
  {
    "id": "g1-count-20",
    "grade": 1,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "ספירה ומנייה עד 20",
    "description": "הכרת המספרים 1–20, ספירה, מנייה והשוואה",
    "sortOrder": 1,
    "explanation": "מספרים עוזרים לנו לספור כמה דברים יש. כשסופרים, מתקדמים תמיד לפי הסדר: $1,2,3,4,5,\\ldots$ עד $20$.\n\nכל מספר <span class='hl-teal'>גדול ב־$1$</span> מהמספר שבא לפניו. למשל, אחרי $7$ בא $8$, ואחרי $8$ בא $9$.\n\nכדי לדעת איזה מספר גדול יותר, בודקים מי מהם רחוק יותר בסדר הספירה — <span class='hl-teal'>מי שסופרים אליו רחוק יותר, גדול יותר</span>.",
    "keyFormulas": [
      "סדר הספירה: $1,2,3,\\ldots,20$",
      "כל מספר = המספר הקודם ועוד $1$",
      "מספר רחוק יותר בספירה = מספר גדול יותר"
    ]
  },
  {
    "id": "g1-counting-100",
    "grade": 1,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "ספירה ומנייה עד 100",
    "description": "ספירה קדימה ואחורה, ספירה בדילוגים, מספר מונה ומספר סודר",
    "sortOrder": 2,
    "explanation": "אחרי שלמדתם לספור עד $20$, אפשר להמשיך באותו עיקרון בדיוק כדי לספור עד $100$ — <span class='hl-teal'>כל מספר גדול ב-$1$ מהקודם לו</span>.\n\n<div class='diagram-box'><svg viewBox='0 0 280 60' xmlns='http://www.w3.org/2000/svg'><g font-family='monospace' font-size='20' fill='#1a2b3c'><text x='10' y='35'>...18, 19, 20,</text><text x='170' y='35' fill='#0d6e6e' font-weight='bold'>21</text><text x='210' y='35'>, 22...</text></g></svg></div>\n\n**ספירה בדילוגים** — במקום לספור אחד-אחד, אפשר \"לקפוץ\" קדימה בקבוצות:\n- <span class='hl-teal'>דילוגים של $2$</span>: $2,4,6,8,10,\\ldots$\n- <span class='hl-teal'>דילוגים של $5$</span>: $5,10,15,20,\\ldots$\n- <span class='hl-teal'>דילוגים של $10$</span>: $10,20,30,40,\\ldots$\n\nאפשר גם לספור בדילוגים <span class='hl-coral'>אחורה</span> — למשל מ-$50$ בדילוגים של $2$: $50,48,46,44,\\ldots$\n\nספירה בדילוגים עוזרת לספור <span class='hl-success'>מהר יותר</span> קבוצות גדולות של חפצים.\n\n**שני סוגי מספרים:**\n- <span class='hl-teal'>מספר מונה</span> — עונה על \"כמה יש?\" (למשל: יש $7$ עפרונות).\n- <span class='hl-teal'>מספר סודר</span> — עונה על \"באיזה מקום?\" (למשל: הוא הגיע ראשון, שלישי, חמישי).\n\n**מנייה חכמה של הרבה חפצים** — במקום לספור אחד-אחד, כדאי לארגן את החפצים <span class='hl-teal'>בקבוצות של $5$ או $10$</span> ואז לספור את הקבוצות — כך פחות סיכוי לטעות.",
    "keyFormulas": [
      "ספירה קדימה: כל מספר = הקודם ועוד $1$",
      "דילוגים של $2$: $2,4,6,8,10\\ldots$",
      "דילוגים של $5$: $5,10,15,20\\ldots$",
      "דילוגים של $10$: $10,20,30,40\\ldots$"
    ]
  },
  {
    "id": "g1-numbers-100",
    "grade": 1,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "מספרים עד 100 ומבנה עשרוני",
    "description": "קריאה וכתיבה, המספר 0, ועשרות ויחידות",
    "sortOrder": 3,
    "explanation": "מספרים עד $100$ בנויים משני חלקים: <span class='hl-teal'>עשרות</span> ו<span class='hl-teal'>יחידות</span>.\n\n<div class='diagram-box'><svg viewBox='0 0 240 90' xmlns='http://www.w3.org/2000/svg'><g fill='#0d6e6e' fill-opacity='0.3' stroke='#0d6e6e'><rect x='10' y='10' width='16' height='60'/><rect x='30' y='10' width='16' height='60'/><rect x='50' y='10' width='16' height='60'/></g><g fill='#c45c48' fill-opacity='0.3' stroke='#c45c48'><rect x='100' y='50' width='16' height='16'/><rect x='120' y='50' width='16' height='16'/><rect x='140' y='50' width='16' height='16'/><rect x='160' y='50' width='16' height='16'/></g><text x='30' y='85' text-anchor='middle' font-size='12'>3 עשרות</text><text x='130' y='80' text-anchor='middle' font-size='12'>4 יחידות</text></svg></div>\n\nבמספר $34$ יש $3$ עשרות (כלומר $30$) ועוד $4$ יחידות בודדות — ביחד $34$.\n\nהמספר $0$ מייצג <span class='hl-coral'>\"כלום\"</span> — אם אין אף פריט, כותבים $0$.\n\n**קריאה וכתיבה** — לכל מספר יש שם (\"שלושים וארבע\") וייצוג בספרות ($34$). חשוב לשים לב לכיוון הכתיבה של הספרות, משמאל לימין.",
    "keyFormulas": [
      "מספר דו-ספרתי = (עשרות $\\times 10$) + יחידות",
      "לדוגמה: $34 = 3\\times 10 + 4$",
      "$0$ = אין כלום"
    ]
  },
  {
    "id": "g1-number-order",
    "grade": 1,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "סדר המספרים עד 100",
    "description": "השוואת מספרים, מיקום בין/לפני/אחרי, וסידור מהקטן לגדול",
    "sortOrder": 4,
    "explanation": "כדי להשוות בין שני מספרים, בודקים מי מהם <span class='hl-teal'>רחוק יותר</span> בספירה — מי שסופרים אליו יותר רחוק, הוא הגדול יותר.\n\n<div class='diagram-box'><svg viewBox='0 0 260 50' xmlns='http://www.w3.org/2000/svg'><line x1='20' y1='30' x2='240' y2='30' stroke='#1a2b3c' stroke-width='2'/><circle cx='90' cy='30' r='5' fill='#0d6e6e'/><text x='90' y='20' text-anchor='middle' font-size='13'>23</text><circle cx='190' cy='30' r='5' fill='#c45c48'/><text x='190' y='20' text-anchor='middle' font-size='13'>67</text></svg></div>\n\nבתמונה, $67$ נמצא <span class='hl-teal'>יותר ימינה</span> על ישר המספרים — ולכן $67$ גדול מ-$23$.\n\n**שאלות נפוצות על סדר מספרים:**\n- <span class='hl-teal'>איזה מספר גדול יותר / קטן יותר?</span>\n- <span class='hl-teal'>איזה מספר נמצא בין שני מספרים אחרים?</span> (למשל, בין $40$ ל-$50$)\n- <span class='hl-teal'>איזה מספר בא לפני / אחרי מספר נתון?</span>\n- <span class='hl-teal'>איזה מספר קרוב יותר</span> למספר מסוים?\n\n**איך יודעים איזה מספר גדול יותר, בלי לספור את כל הדרך:**\n1. מי שיש לו <span class='hl-teal'>יותר עשרות</span> — הוא הגדול יותר (למשל $52$ גדול מ-$38$, כי ל-$52$ יש $5$ עשרות ול-$38$ רק $3$).\n2. אם יש אותו מספר עשרות, בודקים מי יש לו <span class='hl-teal'>יותר יחידות</span> (למשל $54$ גדול מ-$52$).",
    "keyFormulas": [
      "מספר עם יותר עשרות = גדול יותר",
      "המספר הקודם = המספר פחות $1$",
      "המספר הבא = המספר ועוד $1$"
    ]
  },
  {
    "id": "g1-number-line",
    "grade": 1,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "ישר המספרים",
    "description": "הכרת ישר המספרים ומיקום מדויק ומקורב של מספרים עליו",
    "sortOrder": 5,
    "explanation": "<span class='hl-teal'>ישר המספרים</span> הוא קו ישר שעליו כתובים המספרים לפי הסדר — הוא עוזר לנו לראות איזה מספר גדול יותר ואיזה קטן יותר.\n\n<div class='diagram-box'><svg viewBox='0 0 280 60' xmlns='http://www.w3.org/2000/svg'><line x1='20' y1='35' x2='260' y2='35' stroke='#1a2b3c' stroke-width='2' marker-end='url(#arrow1)'/><defs><marker id='arrow1' markerWidth='8' markerHeight='8' refX='6' refY='4' orient='auto'><path d='M0,0 L8,4 L0,8 Z' fill='#1a2b3c'/></marker></defs><g font-size='13' fill='#1a2b3c' text-anchor='middle'><text x='30' y='55'>0</text><text x='70' y='55'>1</text><text x='110' y='55'>2</text><text x='150' y='55'>3</text><text x='190' y='55'>4</text><text x='230' y='55'>5</text></g><g stroke='#1a2b3c' stroke-width='1.5'><line x1='30' y1='30' x2='30' y2='40'/><line x1='70' y1='30' x2='70' y2='40'/><line x1='110' y1='30' x2='110' y2='40'/><line x1='150' y1='30' x2='150' y2='40'/><line x1='190' y1='30' x2='190' y2='40'/><line x1='230' y1='30' x2='230' y2='40'/></g></svg></div>\n\n**כללים חשובים בישר המספרים:**\n- ה<span class='hl-teal'>חץ</span> מראה לאיזה כיוון המספרים <span class='hl-success'>גדלים</span>.\n- ה<span class='hl-coral'>מספר $0$ אינו בקצה ממש</span> — יש מקום גם למה שלפניו, אם נמשיך את הישר שמאלה.\n- המספרים נכתבים <span class='hl-teal'>מתחת לשנתות</span> (הקווים הקטנים), לא בין השנתות.\n\n**מיקום מספרים על הישר:**\n- אם רואים את כל השנתות מסומנות — קל למקם מספר במדויק.\n- אם רואים רק כמה מספרים (למשל $0$ ו-$10$), אפשר למקם מספר <span class='hl-teal'>בקירוב</span> — לדעת אם הוא קרוב להתחלה, לאמצע, או לסוף.",
    "keyFormulas": [
      "החץ מראה את כיוון הגדילה של המספרים",
      "מספרים נכתבים מתחת לשנתות",
      "$0$ אינו חייב להיות בקצה הישר"
    ]
  },
  {
    "id": "g1-sequences",
    "grade": 1,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "סדרות",
    "description": "זיהוי חוקיות בסדרות מספריות ובסדרות של צורות ודגמים חוזרים",
    "sortOrder": 6,
    "explanation": "<span class='hl-teal'>סדרה</span> היא רשימה של מספרים או צורות שיש בה <span class='hl-teal'>חוקיות</span> קבועה — כלל שחוזר על עצמו.\n\n**סדרות מספריות** — ההפרש בין כל שני מספרים סמוכים קבוע:\n$$2,4,6,8,10,\\ldots \\quad (\\text{הפרש של } 2)$$\n$$5,10,15,20,\\ldots \\quad (\\text{הפרש של } 5)$$\n\n**סדרות של צורות** — צורה או קבוצת צורות חוזרת שוב ושוב:\n\n<div class='diagram-box'><svg viewBox='0 0 260 50' xmlns='http://www.w3.org/2000/svg'><circle cx='25' cy='25' r='14' fill='#0d6e6e'/><polygon points='65,11 79,39 51,39' fill='#c45c48'/><circle cx='105' cy='25' r='14' fill='#0d6e6e'/><polygon points='145,11 159,39 131,39' fill='#c45c48'/><circle cx='185' cy='25' r='14' fill='#0d6e6e' opacity='0.3' stroke='#0d6e6e' stroke-dasharray='3'/><text x='225' y='30' font-size='16' fill='#1a2b3c'>?</text></svg></div>\n\nכאן החוקיות היא: <span class='hl-teal'>עיגול, משולש, עיגול, משולש...</span> — אז החלק החסר הוא עיגול.\n\n**איך פותרים תרגיל של סדרה:**\n1. מסתכלים על כמה איברים ראשונים ומזהים <span class='hl-teal'>מה חוזר על עצמו</span> (הפרש קבוע, או דגם חוזר).\n2. משתמשים בחוקיות כדי למצוא איברים חסרים או להמשיך את הסדרה.\n\n<span class='hl-success'>טיפ</span>: תמיד כדאי לבדוק את החוקיות על כמה זוגות של איברים, לא רק זוג אחד — כדי לוודא שהיא נכונה לאורך כל הסדרה.",
    "keyFormulas": [
      "סדרה עם הפרש קבוע: כל מספר = הקודם + ההפרש",
      "סדרת דגם חוזר: מזהים את היחידה שחוזרת על עצמה",
      "לפני שממשיכים סדרה, בודקים את החוקיות על כמה איברים"
    ]
  },
  {
    "id": "g1-add-sub-20",
    "grade": 1,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "חיבור וחיסור עד 20",
    "description": "מצבי חיבור וחיסור, סימן השוויון, ותרגילים עם מקום חסר",
    "sortOrder": 7,
    "explanation": "פעולות חיבור וחיסור מתארות <span class='hl-teal'>מצבים אמיתיים</span> מהחיים:\n\n**חיבור** ($+$) מתאר:\n- <span class='hl-teal'>איסוף</span> — צירוף שתי קבוצות יחד (יש לי $3$ בלונים אדומים ו-$2$ כחולים — ביחד $5$).\n- <span class='hl-teal'>הוספה</span> — הוספת עוד פריטים לכמות קיימת (היו לי $3$ בלונים, קיבלתי עוד $2$ — עכשיו יש לי $5$).\n\n**חיסור** ($-$) מתאר:\n- <span class='hl-teal'>הפרדה</span> — חלוקת קבוצה לשני חלקים (מתוך $5$ בלונים, $2$ התפוצצו — נשארו $3$).\n- <span class='hl-teal'>גריעה</span> — הורדת חלק מכמות קיימת (היו לי $5$ בלונים, נתתי $2$ — נשארו $3$).\n\n<div class='diagram-box'><svg viewBox='0 0 260 60' xmlns='http://www.w3.org/2000/svg'><g fill='#0d6e6e'><circle cx='20' cy='30' r='10'/><circle cx='45' cy='30' r='10'/><circle cx='70' cy='30' r='10'/></g><text x='95' y='36' font-size='20' fill='#1a2b3c'>+</text><g fill='#c45c48'><circle cx='120' cy='30' r='10'/><circle cx='145' cy='30' r='10'/></g><text x='170' y='36' font-size='20' fill='#1a2b3c'>=</text><text x='195' y='36' font-size='20' fill='#1a2b3c' font-weight='bold'>5</text></svg></div>\n\n**סימן השוויון ($=$)** אומר ששני הצדדים מייצגים <span class='hl-success'>בדיוק את אותה כמות</span> — גם אם הם כתובים בצורה שונה: $3+2=5$ וגם $5=3+2$.\n\n**חיבור וחיסור הפוכים זה לזה** — אם $5+3=8$, אז גם $8-3=5$ וגם $8-5=3$. אפשר להשתמש בזה כדי <span class='hl-teal'>לבדוק תשובה</span>.\n\n**עובדות מיוחדות שכדאי לזכור:**\n- <span class='hl-teal'>המספר $0$</span>: הוספה או הורדה של $0$ לא משנה כלום — $6+0=6$ וגם $6-0=6$.\n- <span class='hl-teal'>ההפרש בין שני מספרים שווים הוא תמיד $0$</span>: $7-7=0$.\n\n**תרגילים עם מקום חסר** — לפעמים החסר הוא לא בסוף אלא באמצע: $\\square+4=9$ (מה חסר? $5$), או $10=\\square+3$ (מה חסר? $7$).",
    "keyFormulas": [
      "חיבור: מחובר + מחובר = סכום",
      "חיסור: מחוסר $-$ מחסר = הפרש",
      "חיבור וחיסור הפוכים: אם $5+3=8$ אז $8-3=5$",
      "מספר $-$ עצמו $=0$ | מספר $+0=$ מספר $-0=$ אותו מספר"
    ]
  },
  {
    "id": "g1-add-sub-tens",
    "grade": 1,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "חיבור וחיסור בעשרות שלמות בתחום ה-100",
    "description": "שימוש בעובדות חיבור עד 10 כדי לחשב עם עשרות שלמות עד 100",
    "sortOrder": 8,
    "explanation": "את מה שכבר יודעים על חיבור וחיסור עד $10$, אפשר להשתמש בו כדי לחשב עם <span class='hl-teal'>עשרות שלמות</span> עד $100$ — זה בדיוק אותו תרגיל, רק \"עם אפס בסוף\"!\n\n<div class='diagram-box'><svg viewBox='0 0 260 70' xmlns='http://www.w3.org/2000/svg'><text x='20' y='30' font-size='20' fill='#0d6e6e' font-family='monospace'>2 + 6 = 8</text><text x='20' y='60' font-size='20' fill='#c45c48' font-family='monospace'>20 + 60 = 80</text></svg></div>\n\nאם יודעים ש-$2+6=8$, אז אוטומטית יודעים גם ש-$20+60=80$ — <span class='hl-success'>פשוט מוסיפים אפס לכל אחד מהמספרים ולתוצאה</span>.\n\nאותו דבר עובד גם בחיסור: אם $8-6=2$, אז $80-60=20$.\n\n**דוגמאות נוספות:**\n- $3+4=7$ ⟹ $30+40=70$\n- $9-3=6$ ⟹ $90-30=60$\n\n<span class='hl-teal'>טיפ</span>: אפשר לדמיין מטבעות של $10$ שקלים במקום קוביות בודדות — $2$ מטבעות של $10$ ועוד $6$ מטבעות של $10$ הם ביחד $8$ מטבעות של $10$, כלומר $80$ שקלים.",
    "keyFormulas": [
      "אם $a+b=c$ אז $(a\\times10)+(b\\times10)=(c\\times10)$",
      "דוגמה: $2+6=8$ ⟹ $20+60=80$",
      "אותו עיקרון עובד גם בחיסור: $8-6=2$ ⟹ $80-60=20$"
    ]
  },
  {
    "id": "g1-shapes",
    "grade": 1,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "צורות גאומטריות",
    "description": "משולש, ריבוע, מלבן, עיגול, מצולעים נוספים, סימטריה ופירוק והרכבה",
    "sortOrder": 9,
    "explanation": "לכל צורה יש שם, לפי מספר ה<span class=\"hl-teal\">צלעות</span> (הקווים הישרים) שיש לה.\n\n<div class=\"diagram-box\">\n<svg viewBox=\"0 0 340 110\" xmlns=\"http://www.w3.org/2000/svg\">\n<polygon points=\"12.5,85 72.5,85 42.5,15\" fill=\"none\" stroke=\"#0d6e6e\" stroke-width=\"3\" stroke-linejoin=\"round\"/>\n<rect x=\"100\" y=\"25\" width=\"55\" height=\"55\" fill=\"none\" stroke=\"#0d6e6e\" stroke-width=\"3\"/>\n<rect x=\"177.5\" y=\"32.5\" width=\"70\" height=\"45\" fill=\"none\" stroke=\"#0d6e6e\" stroke-width=\"3\"/>\n<circle cx=\"297.5\" cy=\"52\" r=\"32\" fill=\"none\" stroke=\"#0d6e6e\" stroke-width=\"3\"/>\n<text x=\"42.5\" y=\"104\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1a2b3c\">משולש</text>\n<text x=\"127.5\" y=\"104\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1a2b3c\">ריבוע</text>\n<text x=\"212.5\" y=\"104\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1a2b3c\">מלבן</text>\n<text x=\"297.5\" y=\"104\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1a2b3c\">עיגול</text>\n</svg>\n</div>\n\nל<span class=\"hl-teal\">משולש</span> יש $3$ צלעות. ל<span class=\"hl-teal\">ריבוע</span> יש $4$ צלעות שוות. ל<span class=\"hl-teal\">מלבן</span> יש $4$ צלעות, אבל רק הצלעות שמול זו את זו שוות.\n\nל<span class=\"hl-coral\">עיגול</span> אין בכלל צלעות ישרות — הקו שלו עגול לגמרי.\n\n**עוד מצולעים לפי מספר הצלעות:** <span class='hl-teal'>מחומש</span> — $5$ צלעות. <span class='hl-teal'>משושה</span> — $6$ צלעות. <span class='hl-success'>מספר הקודקודים (הפינות) תמיד שווה למספר הצלעות</span> במצולע.\n\n**סימטריה** — צורה היא סימטרית אם אפשר <span class='hl-teal'>לקפל אותה לשני חצאים זהים בדיוק</span> על קו מסוים (קו הסימטריה). ריבוע, למשל, אפשר לקפל בכמה דרכים ולקבל שני חצאים זהים.\n\n**פירוק והרכבה של מצולעים** — אפשר לגזור מצולע לשני מצולעים קטנים יותר, או להרכיב מצולע גדול משני מצולעים קטנים. למשל, גזירת מלבן באלכסון נותנת שני משולשים.",
    "keyFormulas": [
      "משולש — $3$ צלעות | ריבוע — $4$ צלעות שוות",
      "מלבן — $4$ צלעות (זוגות נגדיים שווים) | עיגול — קו עגול, בלי צלעות",
      "מחומש — $5$ צלעות | משושה — $6$ צלעות",
      "מספר הקודקודים = מספר הצלעות במצולע"
    ]
  },
  {
    "id": "g1-position-maps",
    "grade": 1,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "מיקום וכיוונים",
    "description": "קריאה ויצירה של מפות פשוטות, ומיקום יחסי של עצמים",
    "sortOrder": 10,
    "explanation": "<span class='hl-teal'>מפה</span> היא ציור שמראה איפה נמצאים מקומות שונים — כמו הכיתה שלכם, בית הספר, או השכונה.\n\n<div class='diagram-box'><svg viewBox='0 0 240 110' xmlns='http://www.w3.org/2000/svg'><rect x='20' y='20' width='50' height='40' fill='#0d6e6e' opacity='0.3' stroke='#0d6e6e'/><text x='45' y='75' text-anchor='middle' font-size='11'>בית ספר</text><rect x='150' y='50' width='50' height='40' fill='#c45c48' opacity='0.3' stroke='#c45c48'/><text x='175' y='105' text-anchor='middle' font-size='11'>הבית שלי</text><line x1='70' y1='45' x2='150' y2='70' stroke='#1a2b3c' stroke-width='2' stroke-dasharray='4'/></svg></div>\n\nבמפה פשוטה מסמנים מקומות מוכרים (הבית, הגן, הפארק) ואת הדרך ביניהם. <span class='hl-teal'>אין צורך שהמפה תהיה מדויקת</span> — היא רק צריכה להראות איפה כל מקום נמצא ביחס לאחרים.\n\n**מיקום יחסי** — משתמשים במילים כמו <span class='hl-teal'>\"קרוב יותר\"</span> ו-<span class='hl-teal'>\"רחוק יותר\"</span> כדי לתאר איפה עצם נמצא ביחס לעצם אחר.\n\n**איך יוצרים מפה פשוטה:**\n1. בוחרים אילו מקומות חשובים לסמן.\n2. מציירים סמל פשוט לכל מקום.\n3. מציירים את הדרכים המחברות ביניהם.",
    "keyFormulas": [
      "מפה מראה מקומות ביחס זה לזה, לא במדידה מדויקת",
      "\"קרוב יותר\" ו\"רחוק יותר\" מתארים מיקום יחסי"
    ]
  },
  {
    "id": "g1-measure",
    "grade": 1,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "מדידת אורך בסיסית",
    "description": "תיאור תכונות מדידות, השוואת אורכים ומדידה ביחידות שרירותיות",
    "sortOrder": 11,
    "explanation": "יש כמה תכונות שאפשר לתאר ולהשוות: <span class='hl-teal'>גבוה/נמוך</span>, <span class='hl-teal'>ארוך/קצר</span>, <span class='hl-teal'>כבד/קל</span>, <span class='hl-teal'>מהיר/איטי</span>, <span class='hl-teal'>עבה/דק</span>.\n\n**השוואה ישירה** — כאשר אפשר לשים שני חפצים זה ליד זה (או זה על זה) ולראות מי <span class='hl-teal'>ארוך יותר</span> ומי <span class='hl-teal'>קצר יותר</span>.\n\n<div class='diagram-box'>\n<svg viewBox='0 0 300 90' xmlns='http://www.w3.org/2000/svg'>\n<line x1='20' y1='20' x2='120' y2='20' stroke='#0d6e6e' stroke-width='4' stroke-linecap='round'/>\n<text x='70' y='42' text-anchor='middle' font-size='13' fill='#1a2b3c'>קצר</text>\n<line x1='20' y1='65' x2='280' y2='65' stroke='#c45c48' stroke-width='4' stroke-linecap='round'/>\n<text x='150' y='87' text-anchor='middle' font-size='13' fill='#1a2b3c'>ארוך</text>\n</svg>\n</div>\n\n**השוואה באמצעות מתווך** — לפעמים אי אפשר להצמיד שני חפצים זה לזה (למשל, שני שולחנות בשני חדרים שונים). אז משתמשים ב<span class='hl-teal'>חפץ שלישי \"מתווך\"</span> (כמו חבל או מקל) כדי למדוד את שניהם בנפרד ולהשוות.\n\n<span class='hl-success'>כלל חשוב</span>: אם חפץ א' ארוך מהמתווך, וחפץ ב' קצר מהמתווך — אז חפץ א' בהכרח ארוך מחפץ ב', גם בלי לשים אותם זה ליד זה!\n\nכשאין סרגל, אפשר למדוד אורך גם ב<span class='hl-teal'>יחידות שרירותיות</span> — כלומר לספור כמה עצמים (למשל מקלונים או קליפסים) נכנסים לאורך המדובר. ככל שהיחידה קטנה יותר, יידרשו יותר יחידות כדי לכסות את אותו אורך.",
    "keyFormulas": [
      "קו ארוך יותר = מכיל יותר יחידות",
      "יחידה קטנה יותר → צריך יותר יחידות לאותו אורך",
      "כדי להשוות, שני האורכים נמדדים באותה יחידה",
      "אם א' ארוך מהמתווך וב' קצר מהמתווך, אז א' ארוך מ-ב'"
    ]
  },
  {
    "id": "g1-measure-cm",
    "grade": 1,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "מדידה בסרגל ובסנטימטר",
    "description": "היכרות עם יחידת האורך המוסכמת, מדידה בסרגל וסרטוט קטעים",
    "sortOrder": 12,
    "explanation": "כדי שכולם ימדדו באותה \"שפה\", יש <span class='hl-teal'>יחידת מידה מוסכמת</span> לאורך שנקראת <span class='hl-teal'>סנטימטר (ס\"מ)</span> — כל הסרגלים בעולם משתמשים באותו סנטימטר בדיוק.\n\n<div class='diagram-box'><svg viewBox='0 0 260 60' xmlns='http://www.w3.org/2000/svg'><line x1='20' y1='30' x2='240' y2='30' stroke='#1a2b3c' stroke-width='2'/><g stroke='#1a2b3c' stroke-width='1.5'><line x1='20' y1='20' x2='20' y2='40'/><line x1='60' y1='20' x2='60' y2='40'/><line x1='100' y1='20' x2='100' y2='40'/><line x1='140' y1='20' x2='140' y2='40'/><line x1='180' y1='20' x2='180' y2='40'/><line x1='220' y1='20' x2='220' y2='40'/></g><g font-size='12' fill='#1a2b3c' text-anchor='middle'><text x='20' y='55'>0</text><text x='60' y='55'>1</text><text x='100' y='55'>2</text><text x='140' y='55'>3</text><text x='180' y='55'>4</text><text x='220' y='55'>5</text></g></svg></div>\n\n**איך מודדים נכון בסרגל:**\n1. שמים את נקודת ה-<span class='hl-teal'>$0$</span> של הסרגל בדיוק בתחילת מה שרוצים למדוד.\n2. קוראים את המספר בסוף הקטע — <span class='hl-coral'>זה האורך</span>.\n3. <span class='hl-success'>סופרים את המרווחים בין השנתות (הקווים), לא את השנתות עצמן</span>!\n\n**שימור אורך** — האורך של חפץ לא משתנה גם אם מזיזים אותו למקום אחר.\n\n**סרטוט קטע באורך נתון** — אם רוצים לצייר קו באורך $5$ ס\"מ, שמים את הסרגל, מסמנים נקודה ב-$0$ ונקודה נוספת ב-$5$, ומחברים ביניהן בקו ישר.",
    "keyFormulas": [
      "יחידת מידה מוסכמת לאורך: סנטימטר (ס\"מ)",
      "מודדים החל מנקודת ה-$0$ בסרגל",
      "סופרים מרווחים בין שנתות, לא שנתות"
    ]
  },
  {
    "id": "g1-clock",
    "grade": 1,
    "units": null,
    "track": null,
    "cluster": "מדידת זמן",
    "title": "הכרת שעון אנלוגי",
    "description": "קריאת שעון מחוגים בשעות שלמות וחישובי משך זמן",
    "sortOrder": 13,
    "explanation": "שעון מחוגים (אנלוגי) יש לו <span class='hl-teal'>שני מחוגים</span>: המחוג הקצר מראה את <span class='hl-teal'>השעה</span>, והמחוג הארוך מראה את <span class='hl-teal'>הדקות</span>.\n\n<div class='diagram-box'><svg viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'><circle cx='70' cy='70' r='60' fill='none' stroke='#1a2b3c' stroke-width='2.5'/><g font-size='13' fill='#1a2b3c' text-anchor='middle'><text x='70' y='22'>12</text><text x='118' y='75'>3</text><text x='70' y='128'>6</text><text x='22' y='75'>9</text></g><line x1='70' y1='70' x2='70' y2='35' stroke='#c45c48' stroke-width='3' stroke-linecap='round'/><line x1='70' y1='70' x2='95' y2='70' stroke='#0d6e6e' stroke-width='4' stroke-linecap='round'/><circle cx='70' cy='70' r='4' fill='#1a2b3c'/></svg></div>\n\n**קריאת שעה עגולה (\"שלמה\")**: כאשר המחוג הארוך מצביע בדיוק על $12$, זו שעה <span class='hl-teal'>עגולה</span>. המחוג הקצר מראה איזו שעה זו — בתמונה, המחוג הקצר על $3$ אז השעה היא $3{:}00$.\n\n**חישוב משך זמן בשעות שלמות**: אם פעילות מתחילה בשעה מסוימת ונמשכת מספר שעות, מוסיפים את מספר השעות לשעת ההתחלה.\n\nלדוגמה: אימון מתחיל בשעה $3{:}00$ ונמשך $2$ שעות. $3+2=5$, אז האימון מסתיים בשעה $5{:}00$.",
    "keyFormulas": [
      "מחוג קצר = שעות | מחוג ארוך = דקות",
      "שעה עגולה: המחוג הארוך על $12$",
      "שעת סיום = שעת התחלה + מספר השעות"
    ]
  },
  {
    "id": "g1-data",
    "grade": 1,
    "units": null,
    "track": null,
    "cluster": "חקר נתונים",
    "title": "חקר נתונים",
    "description": "קריאה ובנייה של דיאגרמת עמודות ופיקטוגרם",
    "sortOrder": 14,
    "explanation": "כדי לראות בקלות מידע שאספנו (למשל, איזה פרי הכי אהוב על ילדי הכיתה), מציגים אותו ב<span class='hl-teal'>דיאגרמת עמודות</span> או ב<span class='hl-teal'>פיקטוגרם</span> (תמונות במקום עמודות).\n\n<div class='diagram-box'><svg viewBox='0 0 220 100' xmlns='http://www.w3.org/2000/svg'><line x1='20' y1='85' x2='210' y2='85' stroke='#1a2b3c' stroke-width='2'/><line x1='20' y1='85' x2='20' y2='10' stroke='#1a2b3c' stroke-width='2'/><rect x='40' y='45' width='30' height='40' fill='#0d6e6e' opacity='0.6'/><rect x='90' y='20' width='30' height='65' fill='#0d6e6e' opacity='0.6'/><rect x='140' y='60' width='30' height='25' fill='#0d6e6e' opacity='0.6'/><text x='55' y='97' text-anchor='middle' font-size='10'>תפוח</text><text x='105' y='97' text-anchor='middle' font-size='10'>בננה</text><text x='155' y='97' text-anchor='middle' font-size='10'>ענבים</text></svg></div>\n\n**איך קוראים דיאגרמת עמודות:**\n- <span class='hl-teal'>עמודה גבוהה יותר = כמות גדולה יותר</span>.\n- כדי לדעת בדיוק כמה, סופרים עד לגובה העמודה.\n\nבתמונה: <span class='hl-success'>בננה היא הפרי הכי אהוב</span>, כי העמודה שלה הכי גבוהה.\n\n**פיקטוגרם** עובד באותו עיקרון, רק שבמקום עמודות משתמשים ב<span class='hl-teal'>תמונות קטנות</span> — כל תמונה מייצגת פריט אחד (או כמה, אם כתוב ליד המקרא).\n\n**איך בונים דיאגרמה בעצמכם:**\n1. אוספים מידע (שואלים שאלה לכל הכיתה).\n2. סופרים כמה ענו כל תשובה.\n3. מציירים עמודה או שורת תמונות בגובה/אורך המתאים לכל תשובה.",
    "keyFormulas": [
      "עמודה גבוהה יותר = כמות גדולה יותר",
      "פיקטוגרם: כל תמונה מייצגת פריט אחד (או יותר, לפי המקרא)",
      "\"יותר\" ו\"פחות\" משווים בין עמודות/כמויות"
    ]
  },
  {
    "id": "g2-numbers-1000",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "מספרים עד 1,000",
    "description": "קריאה וכתיבה, מבנה עשרוני, וסימני השוואה",
    "sortOrder": 1,
    "explanation": "מספר תלת-ספרתי בנוי משלושה חלקים: <span class='hl-teal'>מאות</span>, <span class='hl-teal'>עשרות</span> ו<span class='hl-teal'>יחידות</span>. למשל, $356 = 3$ מאות ($300$) ועוד $5$ עשרות ($50$) ועוד $6$ יחידות.\n\n<div class='diagram-box'><svg viewBox='0 0 260 70' xmlns='http://www.w3.org/2000/svg'><g fill='#0d6e6e' fill-opacity='0.3' stroke='#0d6e6e'><rect x='10' y='10' width='20' height='20'/><rect x='35' y='10' width='20' height='20'/><rect x='60' y='10' width='20' height='20'/></g><g fill='#c45c48' fill-opacity='0.3' stroke='#c45c48'><rect x='110' y='10' width='16' height='40'/><rect x='130' y='10' width='16' height='40'/></g><g fill='#1a2b3c' fill-opacity='0.15' stroke='#1a2b3c'><rect x='180' y='40' width='10' height='10'/></g><text x='45' y='55' text-anchor='middle' font-size='11'>3 מאות</text><text x='125' y='60' text-anchor='middle' font-size='11'>5 עשרות</text><text x='185' y='60' text-anchor='middle' font-size='11'>6 יחידות</text></svg></div>\n\n**ספרה מול מספר** — <span class='hl-teal'>ספרה</span> היא סימן בודד (יש רק $10$ ספרות: $0$ עד $9$), ו<span class='hl-teal'>מספר</span> יכול להיות בנוי מכמה ספרות. במספר $356$ יש שלוש ספרות: $3$, $5$ ו-$6$.\n\n**אותו מספר אפשר לפרק בכמה דרכים!** למשל $56$ אפשר לפרק ל-$5$ עשרות ו-$6$ יחידות, אבל גם ל-$4$ עשרות ו-$16$ יחידות — <span class='hl-success'>אלה שני ייצוגים שווים לאותו מספר בדיוק</span>.\n\n**השוואת מספרים עם סימנים** — משתמשים בסימנים $>$ (גדול מ-) ו-$<$ (קטן מ-):\n$$245 > 198 \\qquad 67 < 76$$\nהחוד הצר של הסימן תמיד מצביע לכיוון המספר <span class='hl-coral'>הקטן</span> יותר.",
    "keyFormulas": [
      "מספר תלת-ספרתי $= (\\text{מאות}\\times 100)+(\\text{עשרות}\\times 10)+\\text{יחידות}$",
      "אותו מספר = כמה ייצוגים: $56=5$ עשרות $+6$ יחידות $=4$ עשרות $+16$ יחידות",
      "$>$ = גדול מ- | $<$ = קטן מ-"
    ]
  },
  {
    "id": "g2-counting-1000",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "ספירה ומנייה בתחום ה-1,000",
    "description": "ספירה קדימה ואחורה ממספר כלשהו, וספירה בדילוגים גדולים",
    "sortOrder": 2,
    "explanation": "ספירה בתחום ה-$1{,}000$ ממשיכה את אותם עקרונות שהכרתם — רק שעכשיו אפשר להתחיל מ<span class='hl-teal'>כל מספר שהוא</span>, לא רק מ-$0$ או $1$.\n\n**ספירה קדימה ואחורה** ממספר כלשהו: $247,248,249,250,\\ldots$ או אחורה: $250,249,248,\\ldots$\n\n**מנייה ביחידות, בזוגות ובעשרות** — אפשר לספור חפצים אחד-אחד, בזוגות ($2,4,6,\\ldots$) או בעשרות ($10,20,30,\\ldots$), תלוי איך הם מאורגנים.\n\n**ספירה בדילוגים גדולים יותר:**\n- דילוגים של $10$: $130,140,150,\\ldots$\n- דילוגים של $20$: $140,120,100,\\ldots$ (גם אחורה!)\n- דילוגים של $50$: $50,100,150,\\ldots$\n- דילוגים של $100$: $200,300,400,\\ldots$\n\n<span class='hl-success'>טיפ</span>: ספירה בדילוגים לא חייבת להתחיל ממכפלה \"עגולה\" — אפשר גם לספור $23,33,43,53,\\ldots$ (דילוגים של $10$ שמתחילים מ-$23$).\n\n**אומדן כמויות** — כדי להעריך כמות גדולה בלי לספור הכול, סופרים חלק קטן, ומעריכים לפי היחס כמה יש בסך הכול.",
    "keyFormulas": [
      "ספירה קדימה: כל מספר = הקודם ועוד $1$",
      "אפשר לספור בדילוגים מכל מספר, לא רק ממכפולות עגולות",
      "דילוגים נפוצים: $10,\\ 20,\\ 50,\\ 100$"
    ]
  },
  {
    "id": "g2-even-odd",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "מספרים זוגיים ואי-זוגיים",
    "description": "הגדרת זוגיות ואי-זוגיות, וזיהוי לפי ספרת היחידות",
    "sortOrder": 3,
    "explanation": "מספר <span class='hl-teal'>זוגי</span> הוא מספר שאפשר להציג אותו כסכום של <span class='hl-teal'>שני מספרים שווים</span> — למשל $8=4+4$.\n\n<div class='diagram-box'><svg viewBox='0 0 240 60' xmlns='http://www.w3.org/2000/svg'><g fill='#0d6e6e'><circle cx='20' cy='20' r='8'/><circle cx='20' cy='40' r='8'/><circle cx='45' cy='20' r='8'/><circle cx='45' cy='40' r='8'/><circle cx='70' cy='20' r='8'/><circle cx='70' cy='40' r='8'/></g><text x='150' y='34' text-anchor='middle' font-size='14' fill='#1a2b3c'>כל העיגולים בזוגות!</text></svg></div>\n\n<span class='hl-coral'>מספר אי-זוגי</span> הוא כל מספר שאינו זוגי — כשמנסים לחלק אותו לזוגות, <span class='hl-coral'>נשאר תמיד אחד בודד</span>.\n\n**איך יודעים אם מספר זוגי, בלי לחלק אותו?**\nמסתכלים רק על <span class='hl-success'>ספרת היחידות</span> (הספרה האחרונה):\n- זוגי: מסתיים ב-$0,2,4,6,8$.\n- אי-זוגי: מסתיים ב-$1,3,5,7,9$.\n\nזה עובד גם למספרים גדולים! $346$ זוגי (מסתיים ב-$6$), ו-$781$ אי-זוגי (מסתיים ב-$1$).\n\n<span class='hl-teal'>עובדה מעניינת</span>: המספר $0$ הוא זוגי, כי $0=0+0$.",
    "keyFormulas": [
      "זוגי: אפשר לכתוב כסכום שני מספרים שווים (למשל $8=4+4$)",
      "בודקים לפי ספרת היחידות: $0,2,4,6,8=$זוגי | $1,3,5,7,9=$אי-זוגי",
      "$0$ הוא מספר זוגי"
    ]
  },
  {
    "id": "g2-sequences",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "סדרות",
    "description": "זיהוי חוקיות בסדרות צורניות ובסדרות מספריות בהפרשי 1, 10 ו-100",
    "sortOrder": 4,
    "explanation": "בכיתה ב' לומדים לזהות חוקיות גם בסדרות <span class='hl-teal'>צורניות</span> (של צורות) וגם בסדרות <span class='hl-teal'>מספריות</span> עם הפרשים גדולים יותר.\n\n**סדרות עם הפרש קבוע (\"קפיצות\"):**\n$$15,20,\\underline{\\quad},30 \\quad (\\text{הפרש של }5)$$\n$$24,20,\\underline{\\quad},\\underline{\\quad},8 \\quad (\\text{הפרש של }-4)$$\n\nסדרות אלה יכולות להתבסס על המבנה העשרוני — קפיצות של $1$, של $10$, ושל $100$:\n$$247,257,267,\\ldots \\quad (+10) \\qquad 247,347,447,\\ldots \\quad (+100)$$\n\n**מציאת טעות בסדרה** — לפעמים איבר אחד לא מתאים לחוקיות. למשל בסדרה $12,16,\\underline{22},24,28$ — כל שאר ההפרשים הם $4$, אבל מ-$16$ ל-$22$ ההפרש הוא $6$. <span class='hl-coral'>ה-$22$ הוא הטעות</span> — היה צריך להיות $20$.\n\n**איך פותרים תרגיל סדרה:**\n1. בודקים את ההפרש בין כמה זוגות איברים סמוכים.\n2. אם ההפרש קבוע — משתמשים בו כדי למלא את מה שחסר.\n3. בודקים שהתשובה מתאימה גם להמשך הסדרה.\n\n<span class='hl-success'>לפעמים יש כמה דרכים נכונות</span> להשלים סדרה — כדאי לבדוק אם יש יותר מפתרון אחד אפשרי.",
    "keyFormulas": [
      "בסדרה עם הפרש קבוע: כל איבר = הקודם + ההפרש",
      "הפרשים אפשריים: $1,\\ 10,\\ 100$ (לפי המבנה העשרוני)",
      "כדי למצוא טעות, בודקים את ההפרש בין כל שני איברים סמוכים"
    ]
  },
  {
    "id": "g2-add-sub-100",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "חיבור וחיסור עד 100",
    "description": "חיבור וחיסור עשרות שלמות ומספרים דו-ספרתיים, ושאלות השוואה",
    "sortOrder": 5,
    "explanation": "לחבר או לחסר <span class='hl-teal'>עשרות שלמות</span> זה בדיוק כמו לחבר או לחסר יחידות, רק ש\"מוסיפים אפס\". למשל $3+4=7$, ולכן $30+40=70$.\n\nכשמחברים מספרים שאינם עשרות עגולות (כמו $27+35$), נוח לפרק לעשרות ויחידות בנפרד: $20+30=50$ ו-$7+5=12$, ואז לחבר את התוצאות: $50+12=62$.\n\nבחיסור, אם אין מספיק יחידות, <span class='hl-coral'>\"שוברים\" עשרה</span> ליחידות כדי להשלים את הפעולה.\n\n**חדש בכיתה ב': שאלות השוואה** — במקום לשאול \"כמה יש ביחד\", שואלים <span class='hl-teal'>\"בכמה יותר / פחות\"</span>: \"ליואב $86$ שקלים ולתומר $94$ שקלים — בכמה יותר כסף יש לתומר?\" פותרים בחיסור: $94-86=8$.\n\n**תרגילים עם יותר משני מחוברים**: $15+8+22=?$ — אפשר לחבר בכל סדר נוח (למשל לחבר קודם שני מספרים ש\"מסתדרים\" יפה יחד).\n\n**משוואות עם מקום חסר בכל מקום** — לא רק בסוף: $\\square-63<100-63$, או $25+\\square=38$.",
    "keyFormulas": [
      "עשרות שלמות: $30+40=70$ (כמו $3+4=7$)",
      "פירוק לעשרות ויחידות מקל על חיבור/חיסור",
      "חיסור עם \"שבירת\" עשרה: למשל $52-7$",
      "שאלת השוואה (\"בכמה יותר/פחות\") נפתרת בחיסור"
    ]
  },
  {
    "id": "g2-add-sub-properties",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "תכונות של חיבור וחיסור",
    "description": "חיבור וחיסור כפעולות הפוכות, תכונות ה-0, וחוק החילוף והקיבוץ",
    "sortOrder": 6,
    "explanation": "חיבור וחיסור הן פעולות <span class='hl-teal'>הפוכות זו לזו</span> — כל אחת מהן יכולה לשמש לבדיקת התוצאה של השנייה. אם $35+48=83$, אז בהכרח $83-48=35$ וגם $83-35=48$.\n\n**תכונות המספר $0$:**\n- הוספת $0$ לא משנה כלום: $57+0=57$.\n- הורדת $0$ לא משנה כלום: $57-0=57$.\n- <span class='hl-success'>ההפרש בין שני מספרים שווים הוא תמיד $0$</span>: $63-63=0$.\n\n**חוק החילוף בחיבור** — אפשר לחבר בכל סדר, והתוצאה זהה: $$34+18=18+34$$\n\n**חוק הקיבוץ בחיבור** — כשיש כמה מחוברים, אפשר לקבץ אותם בדרכים שונות: $$(15+5)+22=15+(5+22)$$\nזה שימושי כשיש \"זוגות נוחים\" — למשל אם שני מספרים ביחד נותנים עשרה עגולה.\n\n<span class='hl-teal'>שימוש בתובנה, לא רק בחישוב</span>: אפשר להשוות תרגילים בלי לחשב את שניהם עד הסוף. למשל: $57+11$ לעומת $57+4$ — <span class='hl-success'>ברור ש-$57+11$ גדול יותר, כי מוסיפים יותר</span>.",
    "keyFormulas": [
      "חיבור וחיסור הפוכים: אם $35+48=83$ אז $83-48=35$",
      "מספר$+0=$מספר$-0=$אותו מספר",
      "מספר$-$עצמו$=0$",
      "חוק חילוף: $a+b=b+a$"
    ]
  },
  {
    "id": "g2-mul-div-intro",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "כפל וחילוק — מבוא",
    "description": "משמעות הפעולות, שתי משמעויות החילוק, וכפולות של 2, 4, 5 ו-10",
    "sortOrder": 7,
    "explanation": "<span class='hl-teal'>כפל</span> הוא חיבור חוזר של אותו מספר. למשל, $3\\times 4$ פירושו \"$3$ קבוצות של $4$\", כלומר $4+4+4=12$.\n\n<div class='diagram-box'><svg viewBox='0 0 200 70' xmlns='http://www.w3.org/2000/svg'><g fill='#0d6e6e'><circle cx='20' cy='20' r='7'/><circle cx='40' cy='20' r='7'/><circle cx='60' cy='20' r='7'/><circle cx='80' cy='20' r='7'/><circle cx='20' cy='40' r='7'/><circle cx='40' cy='40' r='7'/><circle cx='60' cy='40' r='7'/><circle cx='80' cy='40' r='7'/><circle cx='20' cy='60' r='7'/><circle cx='40' cy='60' r='7'/><circle cx='60' cy='60' r='7'/><circle cx='80' cy='60' r='7'/></g><text x='140' y='45' text-anchor='middle' font-size='16' fill='#1a2b3c'>3×4=12</text></svg></div>\n\n<span class='hl-teal'>חילוק</span> הוא הפעולה ההפוכה, ויש לו שתי משמעויות:\n- <span class='hl-teal'>חילוק לחלקים שווים</span>: $12$ סוכריות ל-$4$ ילדים בשווה — כמה לכל ילד? ($12:4=3$)\n- <span class='hl-teal'>חילוק להכלה</span>: יש $12$ סוכריות, נותנים $4$ לכל ילד — לכמה ילדים מספיק? (גם כאן $12:4=3$)\n\nכפל וחילוק תמיד מתאימים זה לזה: אם $3\\times4=12$, אז גם $12:4=3$ וגם $12:3=4$.\n\n**בסוף כיתה ב' חשוב לשלוט בעל-פה בכפולות של:**\n<span class='hl-teal'>$2$</span>: $2,4,6,8,10,\\ldots$ &nbsp; <span class='hl-teal'>$4$</span>: $4,8,12,16,20,\\ldots$ &nbsp; <span class='hl-teal'>$5$</span>: $5,10,15,20,25,\\ldots$ &nbsp; <span class='hl-teal'>$10$</span>: $10,20,30,40,\\ldots$",
    "keyFormulas": [
      "כפל = חיבור חוזר: $3\\times 4=4+4+4=12$",
      "חילוק = חלוקה לקבוצות שוות: $12:4=3$",
      "כפל וחילוק הפוכים זה לזה",
      "כפולות חשובות לכיתה ב': של $2$, של $4$, של $5$, ושל $10$"
    ]
  },
  {
    "id": "g2-mul-div-properties",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "תכונות של פעולות הכפל והחילוק",
    "description": "תכונות ה-0 וה-1 בכפל ובחילוק, וחוק החילוף והקיבוץ בכפל",
    "sortOrder": 8,
    "explanation": "**תכונות המספרים $0$ ו-$1$ בכפל:**\n- כפל ב-$1$ לא משנה כלום: $7\\times1=7$.\n- כפל ב-$0$ נותן תמיד $0$: $7\\times0=0$.\n\n**תכונות בחילוק:**\n- חלוקה ב-$1$ לא משנה כלום: $7:1=7$.\n- <span class='hl-coral'>אין מחלקים ב-$0$</span> — זה לא מוגדר בכלל.\n\n**חוק החילוף בכפל** — אפשר לכפול בכל סדר, והתוצאה זהה: $$3\\times4=4\\times3$$ (שלוש קבוצות של $4$ שוות בסך הכול לארבע קבוצות של $3$ — שתיהן נותנות $12$).\n\n<div class='diagram-box'><svg viewBox='0 0 220 90' xmlns='http://www.w3.org/2000/svg'><g fill='#0d6e6e'><circle cx='20' cy='15' r='6'/><circle cx='38' cy='15' r='6'/><circle cx='56' cy='15' r='6'/><circle cx='74' cy='15' r='6'/><circle cx='20' cy='33' r='6'/><circle cx='38' cy='33' r='6'/><circle cx='56' cy='33' r='6'/><circle cx='74' cy='33' r='6'/><circle cx='20' cy='51' r='6'/><circle cx='38' cy='51' r='6'/><circle cx='56' cy='51' r='6'/><circle cx='74' cy='51' r='6'/></g><text x='47' y='75' text-anchor='middle' font-size='11'>3 שורות של 4</text><g fill='#c45c48' transform='translate(110,0)'><circle cx='20' cy='15' r='6'/><circle cx='38' cy='15' r='6'/><circle cx='56' cy='15' r='6'/><circle cx='20' cy='33' r='6'/><circle cx='38' cy='33' r='6'/><circle cx='56' cy='33' r='6'/><circle cx='20' cy='51' r='6'/><circle cx='38' cy='51' r='6'/><circle cx='56' cy='51' r='6'/><circle cx='20' cy='69' r='6'/><circle cx='38' cy='69' r='6'/><circle cx='56' cy='69' r='6'/></g><text x='147' y='85' text-anchor='middle' font-size='11'>4 שורות של 3</text></svg></div>\n\n**חוק הקיבוץ בכפל** — כשיש כמה גורמים, אפשר לקבץ אותם בדרכים שונות: $$3\\times2\\times2=3\\times(2\\times2)=(3\\times2)\\times2$$ שתי הדרכים נותנות $12$.",
    "keyFormulas": [
      "כפל ב-$1$: לא משנה | כפל ב-$0$: תמיד $0$",
      "אין מחלקים ב-$0$",
      "חוק חילוף בכפל: $a\\times b=b\\times a$"
    ]
  },
  {
    "id": "g2-fractions-half",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "שברים — חצי ורבע",
    "description": "הכרת השברים חצי ורבע כחלק מהשלם",
    "sortOrder": 9,
    "explanation": "כשמחלקים שלם ל-<span class='hl-teal'>2 חלקים שווים</span>, כל חלק נקרא <span class='hl-teal'>חצי</span> וכותבים $\\frac{1}{2}$. כשמחלקים ל-<span class='hl-teal'>4 חלקים שווים</span>, כל חלק נקרא <span class='hl-teal'>רבע</span> וכותבים $\\frac{1}{4}$.\n\n<div class='diagram-box'>\n<svg viewBox='0 0 260 130' xmlns='http://www.w3.org/2000/svg'>\n<circle cx='65' cy='60' r='50' fill='none' stroke='#0d6e6e' stroke-width='3'/>\n<line x1='65' y1='10' x2='65' y2='110' stroke='#0d6e6e' stroke-width='3'/>\n<path d='M 65 60 L 65 10 A 50 50 0 0 1 65 110 Z' fill='#0d6e6e' opacity='0.25'/>\n<text x='65' y='118' text-anchor='middle' font-size='13' fill='#1a2b3c'>חצי — 1/2</text>\n<circle cx='195' cy='60' r='50' fill='none' stroke='#c45c48' stroke-width='3'/>\n<line x1='145' y1='60' x2='245' y2='60' stroke='#c45c48' stroke-width='3'/>\n<line x1='195' y1='10' x2='195' y2='110' stroke='#c45c48' stroke-width='3'/>\n<path d='M 195 60 L 195 10 A 50 50 0 0 1 245 60 Z' fill='#c45c48' opacity='0.25'/>\n<text x='195' y='118' text-anchor='middle' font-size='13' fill='#1a2b3c'>רבע — 1/4</text>\n</svg>\n</div>\n\nבשבר $\\frac{1}{2}$, המספר התחתון ($2$) אומר לכמה חלקים שווים חילקנו את השלם, והמספר העליון ($1$) אומר כמה חלקים כאלה לקחנו.",
    "keyFormulas": [
      "$\\frac{1}{2}$ = חלוקה ל-$2$ חלקים שווים, לוקחים $1$",
      "$\\frac{1}{4}$ = חלוקה ל-$4$ חלקים שווים, לוקחים $1$",
      "המספר התחתון = לכמה חלקים חילקנו; העליון = כמה לקחנו"
    ]
  },
  {
    "id": "g2-triangles",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "מצולעים — משולשים",
    "description": "פירוק והרכבה של מצולעים, וסיווג משולשים לפי אורכי צלעות",
    "sortOrder": 10,
    "explanation": "אפשר <span class='hl-teal'>לפרק</span> מצולע לכמה מצולעים קטנים יותר, ואפשר <span class='hl-teal'>להרכיב</span> מצולע חדש מכמה חלקים.\n\n<div class='diagram-box'><svg viewBox='0 0 260 90' xmlns='http://www.w3.org/2000/svg'><polygon points='20,70 100,70 80,20 40,20' fill='#0d6e6e' fill-opacity='0.15' stroke='#0d6e6e' stroke-width='2'/><line x1='40' y1='20' x2='40' y2='70' stroke='#c45c48' stroke-width='2' stroke-dasharray='4'/><text x='60' y='85' text-anchor='middle' font-size='11'>טרפז → ריבוע + משולש</text></svg></div>\n\n<span class='hl-coral'>שימו לב</span>: כשגוזרים מצולע לחלקים, לא כל התכונות נשמרות! למשל, אם גוזרים מלבן לאורך האלכסון, מקבלים שני משולשים — אבל מספר הקודקודים והצלעות **לא** נשמר (למלבן היו $4$ קודקודים, ולכל משולש יש רק $3$).\n\n**סוגי משולשים לפי אורכי הצלעות:**\n- <span class='hl-teal'>כל הצלעות שוות</span> — משולש \"שווה-צלעות\".\n- <span class='hl-teal'>שתי צלעות שוות</span> — משולש \"שווה-שוקיים\".\n- <span class='hl-teal'>כל הצלעות שונות</span> — משולש \"כללי\" (שונה-צלעות).\n\n<span class='hl-success'>איך בודקים אם צלעות שוות</span>: מודדים בסרגל, או מקפלים ומדביקים כדי להשוות ישירות.\n\n**סימטריה קווית במשולש** — משולש שווה-צלעות ומשולש שווה-שוקיים אפשר לקפל כך ששני חצאים חופפים בדיוק — יש להם ציר סימטריה.",
    "keyFormulas": [
      "פירוק מצולע: לא תמיד שומר על מספר הצלעות/קודקודים",
      "משולש שווה-צלעות: כל הצלעות שוות",
      "משולש שווה-שוקיים: שתי צלעות שוות"
    ]
  },
  {
    "id": "g2-right-angle",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "זווית ישרה",
    "description": "הכרת זווית ישרה וזיהויה במצולעים ובעצמים מהחיים",
    "sortOrder": 11,
    "explanation": "<span class='hl-teal'>זווית ישרה</span> היא זווית מיוחדת בגודל של בדיוק $90°$ — בדיוק כמו הפינה של דף נייר או פינה של מרצפת ריבועית.\n\n<div class='diagram-box'><svg viewBox='0 0 200 90' xmlns='http://www.w3.org/2000/svg'><line x1='20' y1='80' x2='120' y2='80' stroke='#0d6e6e' stroke-width='3'/><line x1='20' y1='80' x2='20' y2='10' stroke='#0d6e6e' stroke-width='3'/><rect x='20' y='62' width='18' height='18' fill='none' stroke='#c45c48' stroke-width='2'/><text x='150' y='50' font-size='13' fill='#1a2b3c'>= זווית ישרה (90°)</text></svg></div>\n\n**איך מזהים זווית ישרה** — משווים אותה ישירות לחפץ שידוע שיש בו זווית ישרה, כמו פינת פתקית או דף.\n\n**זיהוי זוויות ישרות בצורות** — אפשר לבדוק כל קודקוד במצולע ולראות אם הזווית שם ישרה. לריבוע ולמלבן <span class='hl-teal'>יש $4$ זוויות ישרות</span> — בכל הקודקודים שלהם.\n\n<span class='hl-success'>שימוש בחיים</span>: בבניית מפות ומסלולים, פנייה \"בזווית ישרה\" אומרת פנייה חדה של $90°$ — בדיוק כמו פנייה בפינת רחוב רגילה.",
    "keyFormulas": [
      "זווית ישרה = בדיוק $90°$",
      "לריבוע ולמלבן יש $4$ זוויות ישרות",
      "בודקים זווית ישרה בהשוואה לפינת דף/פתקית"
    ]
  },
  {
    "id": "g2-shapes-measure",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "צורות, גופים ומדידת אורך",
    "description": "הזזה/שיקוף, מדידת אורך בס\"מ, השוואת שטחים",
    "sortOrder": 12,
    "explanation": "<span class='hl-teal'>הזזה</span> היא הפיכת צורה למקום אחר בלי לסובב או להפוך אותה. <span class='hl-teal'>שיקוף</span> הוא \"היפוך במראה\" של הצורה סביב קו מסוים.\n\n<div class='diagram-box'>\n<svg viewBox='0 0 220 100' xmlns='http://www.w3.org/2000/svg'>\n<polygon points='40,20 70,20 55,75' fill='#0d6e6e' opacity='0.3' stroke='#0d6e6e' stroke-width='2'/>\n<line x1='110' y1='10' x2='110' y2='90' stroke='#c45c48' stroke-width='2' stroke-dasharray='6,4'/>\n<polygon points='180,20 150,20 165,75' fill='#0d6e6e' opacity='0.3' stroke='#0d6e6e' stroke-width='2'/>\n<text x='110' y='96' text-anchor='middle' font-size='11' fill='#c45c48'>קו השיקוף</text>\n</svg>\n</div>\n\nכדי למדוד אורך במדויק משתמשים ב<span class='hl-teal'>סרגל</span> ובודקים כמה <span class='hl-teal'>סנטימטרים (ס\"מ)</span> יש בין הקצוות.\n\nכדי להשוות בין שני שטחים, אפשר לספור כמה משבצות שוות-גודל מכסות כל צורה — <span class='hl-success'>הצורה שיש בה יותר משבצות היא בעלת השטח הגדול יותר</span>.",
    "keyFormulas": [
      "הזזה: הצורה עוברת מקום, בלי סיבוב או היפוך",
      "שיקוף: הצורה \"הופכת במראה\" סביב קו השיקוף",
      "שטח = כמה משבצות (יחידות שטח) מכסות את הצורה"
    ]
  },
  {
    "id": "g2-length-measure",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "מדידת אורך ביחידות מקובלות",
    "description": "מדידה וסרטוט קטעים בסנטימטרים, והכרת יחידת המטר",
    "sortOrder": 13,
    "explanation": "בכיתה ב' ממשיכים למדוד באמצעות <span class='hl-teal'>סנטימטר (ס\"מ)</span>, ומכירים גם יחידת מידה גדולה יותר: ה<span class='hl-teal'>מטר (מ')</span>.\n\n<div class='diagram-box'><svg viewBox='0 0 260 60' xmlns='http://www.w3.org/2000/svg'><line x1='20' y1='30' x2='240' y2='30' stroke='#1a2b3c' stroke-width='2'/><g stroke='#1a2b3c' stroke-width='1.5'><line x1='20' y1='20' x2='20' y2='40'/><line x1='240' y1='20' x2='240' y2='40'/></g><text x='130' y='20' text-anchor='middle' font-size='12'>100 ס\"מ = 1 מטר</text></svg></div>\n\n**מתי משתמשים באיזו יחידה:**\n- <span class='hl-teal'>סנטימטר</span> — לחפצים קטנים (עיפרון, מחברת).\n- <span class='hl-teal'>מטר</span> — למרחקים גדולים (אורך הכיתה, אורך חצר בית הספר).\n\n**סרטוט קטע לפי אורך נתון** — משתמשים בסרגל: מסמנים נקודה ב-$0$, מוצאים את הסימון המתאים לאורך המבוקש, ומחברים בקו ישר.\n\n**אם הקטע לא מסתיים בדיוק על שנתה** — משתמשים בביטויי השוואה: <span class='hl-teal'>\"בערך\"</span>, <span class='hl-teal'>\"בין ... לבין ...\"</span>, <span class='hl-teal'>\"קצת יותר מ-\"</span> או <span class='hl-teal'>\"קצת פחות מ-\"</span>.\n\n<span class='hl-success'>חשוב</span>: תמיד לכתוב את יחידת המידה ליד המספר — $7$ ס\"מ שונה לגמרי מ-$7$ מטר!",
    "keyFormulas": [
      "$100$ ס\"מ $=1$ מטר",
      "לחפצים קטנים: ס\"מ | למרחקים גדולים: מטר",
      "יש לכתוב תמיד את יחידת המידה ליד המספר"
    ]
  },
  {
    "id": "g2-broken-lines",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "מדידה וסרטוט של קווים שבורים",
    "description": "חישוב אורך כולל של קו שבור, וסרטוט לפי נתונים",
    "sortOrder": 14,
    "explanation": "<span class='hl-teal'>קו שבור</span> מורכב מכמה קטעים ישרים המחוברים זה לזה בקצוותיהם, ומשנה כיוון בכל חיבור.\n\n<div class='diagram-box'><svg viewBox='0 0 220 90' xmlns='http://www.w3.org/2000/svg'><polyline points='20,70 70,20 120,60 180,15' fill='none' stroke='#0d6e6e' stroke-width='3'/><text x='30' y='85' font-size='11'>3</text><text x='95' y='30' font-size='11'>5</text><text x='150' y='50' font-size='11'>4</text></svg></div>\n\n**מציאת אורך קו שבור** — מודדים (או מחשבים) את אורך <span class='hl-teal'>כל קטע בנפרד</span>, ומחברים את כל האורכים יחד. בתמונה: $3+5+4=12$.\n\n**קו שבור סגור** — אם הקצה האחרון חוזר לנקודת ההתחלה, זהו קו שבור <span class='hl-teal'>סגור</span> (זה בעצם מתאר את הצלעות של מצולע!).\n\n**סרטוט קו שבור לפי נתונים** — אפשר לסרטט לפי אורך כל קטע בנפרד, או לפי האורך הכולל המבוקש (ואז יש חופש לבחור איך לחלק אותו לקטעים).",
    "keyFormulas": [
      "אורך קו שבור = סכום אורכי כל הקטעים",
      "קו שבור סגור = הצלעות של מצולע"
    ]
  },
  {
    "id": "g2-perimeter",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "היקף מצולעים",
    "description": "חישוב היקף על סמך מדידה או על סמך אורכים נתונים",
    "sortOrder": 15,
    "explanation": "<span class='hl-teal'>היקף</span> של מצולע הוא האורך הכולל של כל הצלעות שלו יחד — בדיוק כמו קו שבור סגור.\n\n<div class='diagram-box'><svg viewBox='0 0 200 90' xmlns='http://www.w3.org/2000/svg'><rect x='30' y='20' width='100' height='50' fill='none' stroke='#0d6e6e' stroke-width='2.5'/><text x='80' y='15' text-anchor='middle' font-size='12'>6</text><text x='80' y='85' text-anchor='middle' font-size='12'>6</text><text x='20' y='48' text-anchor='middle' font-size='12'>3</text><text x='140' y='48' text-anchor='middle' font-size='12'>3</text></svg></div>\n\n**חישוב היקף** — מחברים את אורכי כל הצלעות: $6+3+6+3=18$.\n\n**מצולעים משוכללים** — אם כל הצלעות שוות (כמו ריבוע), אפשר לחשב את ההיקף גם באמצעות <span class='hl-teal'>כפל</span>: היקף $=$ אורך צלע $\\times$ מספר הצלעות. ריבוע בצלע $5$: היקף $=5\\times4=20$.\n\n**מצולעים לא סטנדרטיים** — לפעמים חלק מהצלעות לא ידועות ישירות, וצריך למדוד אותן או לחשב אותן לפי הצלעות הידועות ולפי צורת המצולע.",
    "keyFormulas": [
      "היקף = סכום כל הצלעות",
      "מצולע משוכלל: היקף = אורך צלע × מספר צלעות",
      "ריבוע בצלע $5$: היקף $=5\\times4=20$"
    ]
  },
  {
    "id": "g2-solids",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "גופים",
    "description": "הכרה, זיהוי ומיון של קובייה, תיבה, מנסרה, פירמידה, חרוט, גליל וכדור",
    "sortOrder": 16,
    "explanation": "גופים תלת-ממדיים (\"פאונים\") אפשר לזהות ולתאר לפי חלקיהם:\n<span class='hl-teal'>פאה</span> — משטח שטוח. <span class='hl-teal'>מקצוע</span> — קו שבו נפגשות שתי פאות. <span class='hl-teal'>קודקוד</span> — נקודה שבה נפגשים כמה מקצועות. <span class='hl-teal'>בסיס</span> — הפאה ה\"תחתונה\" (או שתיים, במנסרה).\n\n<div class='diagram-box'><svg viewBox='0 0 300 100' xmlns='http://www.w3.org/2000/svg'><polygon points='20,80 20,30 45,15 45,65' fill='#0d6e6e' fill-opacity='0.15' stroke='#0d6e6e'/><polygon points='20,80 45,65 65,80 40,95' fill='#0d6e6e' fill-opacity='0.25' stroke='#0d6e6e'/><polygon points='45,15 65,30 65,80 45,65' fill='#0d6e6e' fill-opacity='0.3' stroke='#0d6e6e'/><text x='40' y='55' text-anchor='middle' font-size='9'>קובייה</text><ellipse cx='140' cy='25' rx='22' ry='7' fill='none' stroke='#c45c48' stroke-width='2'/><line x1='118' y1='25' x2='118' y2='75' stroke='#c45c48' stroke-width='2'/><line x1='162' y1='25' x2='162' y2='75' stroke='#c45c48' stroke-width='2'/><path d='M118,75 A22,7 0 0 0 162,75' fill='none' stroke='#c45c48' stroke-width='2'/><text x='140' y='95' text-anchor='middle' font-size='9'>גליל</text><circle cx='240' cy='50' r='30' fill='none' stroke='#1a2b3c' stroke-width='2'/><text x='240' y='95' text-anchor='middle' font-size='9'>כדור</text></svg></div>\n\n**סוגי גופים ללמוד:** קובייה, תיבה, מנסרה ישרה, פירמידה (גם לא-ישרה), חרוט ישר, גליל, כדור.\n\n**מיון גופים לפי קריטריונים שונים:**\n- לפי <span class='hl-teal'>צורת הפאות</span> (מרובעות, משולשות, עגולות).\n- לפי <span class='hl-teal'>מספר הפאות</span>.\n- לפי האם יש <span class='hl-teal'>קודקודים</span> (לקובייה, תיבה ופירמידה יש; לכדור וגליל אין קודקודים חדים).\n\n<span class='hl-success'>שימו לב</span>: לכדור ולגליל אין פאות שטוחות בכלל (או רק חלק), ולכן קשה \"לספור\" להם קודקודים ומקצועות כמו לקובייה.",
    "keyFormulas": [
      "פאה = משטח שטוח | מקצוע = קו מפגש בין פאות | קודקוד = נקודת מפגש מקצועות",
      "לקובייה: $6$ פאות, $12$ מקצועות, $8$ קודקודים",
      "לכדור: אין פאות שטוחות, אין קודקודים"
    ]
  },
  {
    "id": "g2-volume-compare",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "השוואת נפחים של גופים",
    "description": "השוואה ישירה והשוואה באמצעות מתווך",
    "sortOrder": 17,
    "explanation": "<span class='hl-teal'>נפח</span> הוא כמות המקום שגוף תופס, או כמה \"נכנס\" בתוכו.\n\n**השוואה ישירה** — כאשר אפשר להכניס גוף אחד לתוך אחר (או לשפוך מכל אחד למשנהו) ולראות מי \"מכיל\" יותר.\n\n<div class='diagram-box'><svg viewBox='0 0 220 80' xmlns='http://www.w3.org/2000/svg'><rect x='20' y='20' width='40' height='50' fill='none' stroke='#0d6e6e' stroke-width='2.5'/><rect x='100' y='10' width='60' height='60' fill='none' stroke='#c45c48' stroke-width='2.5'/><text x='40' y='90' text-anchor='middle' font-size='11'>קטן</text><text x='130' y='90' text-anchor='middle' font-size='11'>גדול יותר</text></svg></div>\n\n**השוואה באמצעות מתווך** — כשאי אפשר להשוות ישירות (למשל, שני כלים בצורות שונות לגמרי), משתמשים ב<span class='hl-teal'>חומר מתווך</span> כמו מים או חול: ממלאים כל כלי ובודקים כמה מהחומר המתווך נכנס בו.\n\n<span class='hl-success'>עיקרון</span>: אם כלי א' מלא יותר מהמתווך מכלי ב', אז לכלי א' יש נפח גדול יותר.",
    "keyFormulas": [
      "נפח = כמה מקום גוף תופס / כמה נכנס בתוכו",
      "השוואה ישירה: מכניסים גוף אחד לשני",
      "השוואה במתווך: ממלאים מים/חול ומשווים כמויות"
    ]
  },
  {
    "id": "g2-cube-building",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "בניית מבנים פשוטים מקוביות",
    "description": "בניית גופים מקוביות יחידה, וחישוב מספר הקוביות בתיבה",
    "sortOrder": 18,
    "explanation": "אפשר לבנות גופים שונים (לאו דווקא תיבות) מקוביות יחידה, לפי תמונה, סרטוט, או מספר קוביות נתון.\n\n<div class='diagram-box'><svg viewBox='0 0 200 90' xmlns='http://www.w3.org/2000/svg'><g stroke='#0d6e6e' stroke-width='1' fill='#0d6e6e' fill-opacity='0.2'><rect x='20' y='50' width='25' height='25'/><rect x='45' y='50' width='25' height='25'/><rect x='20' y='25' width='25' height='25'/></g><text x='45' y='85' text-anchor='middle' font-size='11'>3 קוביות</text></svg></div>\n\n**חישוב מספר הקוביות בתיבה** — סופרים כמה קוביות יש ב<span class='hl-teal'>שכבה אחת</span>, וכופלים במספר <span class='hl-teal'>השכבות</span>:\n$$\\text{סה\"כ קוביות}=(\\text{קוביות בשכבה})\\times(\\text{מספר שכבות})$$\n\nלמשל, תיבה עם שכבה של $2\\times3=6$ קוביות, ו-$4$ שכבות: סה\"כ $6\\times4=24$ קוביות.\n\n<span class='hl-coral'>שימו לב</span>: זו לא נוסחת נפח פורמלית — זו פשוט דרך נוחה לספור באמצעות כפל, במקום לספור כל קובייה בנפרד.",
    "keyFormulas": [
      "סה\"כ קוביות = (קוביות בשכבה) × (מספר שכבות)",
      "דוגמה: $6$ קוביות בשכבה $\\times4$ שכבות $=24$ קוביות"
    ]
  },
  {
    "id": "g2-clock",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "מדידת זמן",
    "title": "קריאת זמן בשעות שלמות ובחצאי שעות",
    "description": "שעון מחוגים ושעון דיגיטלי, וחישובי משך זמן החוצים את השעה 12:00",
    "sortOrder": 19,
    "explanation": "בכיתה ב' לומדים לקרוא שעון גם ב<span class='hl-teal'>חצאי שעות</span>, ולא רק בשעות עגולות.\n\n<div class='diagram-box'><svg viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'><circle cx='70' cy='70' r='60' fill='none' stroke='#1a2b3c' stroke-width='2.5'/><g font-size='13' fill='#1a2b3c' text-anchor='middle'><text x='70' y='22'>12</text><text x='118' y='75'>3</text><text x='70' y='128'>6</text><text x='22' y='75'>9</text></g><line x1='70' y1='70' x2='55' y2='40' stroke='#c45c48' stroke-width='3' stroke-linecap='round'/><line x1='70' y1='70' x2='70' y2='125' stroke='#0d6e6e' stroke-width='4' stroke-linecap='round'/><circle cx='70' cy='70' r='4' fill='#1a2b3c'/></svg></div>\n\n**קריאת חצי שעה** — כשהמחוג הארוך מצביע בדיוק על $6$ (חצי מהמעגל), עברה חצי שעה מהשעה העגולה. אם המחוג הקצר בין $3$ ל-$4$, השעה היא <span class='hl-teal'>$3{:}30$</span> (\"שלוש וחצי\").\n\n**שעון דיגיטלי** — מציג את השעה ישירות במספרים, למשל $3{:}30$ — זהה בדיוק למה שרואים בשעון מחוגים.\n\n**חישוב משך זמן** — אם פעילות מתחילה ב-$10{:}00$ ונמשכת $2$ שעות, היא מסתיימת ב-$12{:}00$. <span class='hl-coral'>שימו לב</span>: אם הפעילות ממשיכה גם אחרי $12{:}00$, סופרים הלאה — ($10$ בבוקר ועד $4$ אחר הצוהריים הם $6$ שעות, כי אחרי ה-$12$ ממשיכים לספור $1,2,3,4$).",
    "keyFormulas": [
      "חצי שעה: המחוג הארוך על $6$",
      "שעון דיגיטלי מציג את השעה ישירות במספרים",
      "בחישוב משך זמן שחוצה $12{:}00$, ממשיכים לספור אחרי ה-$12$"
    ]
  },
  {
    "id": "g2-data",
    "grade": 2,
    "units": null,
    "track": null,
    "cluster": "חקר נתונים",
    "title": "חקר נתונים פשוט",
    "description": "קריאה ובנייה של טבלה, דיאגרמת עמודות ופיקטוגרם",
    "sortOrder": 20,
    "explanation": "כשאוספים מידע (למשל, איזה צבע אהוב על ילדי הכיתה), נוח לארגן אותו ב<span class='hl-teal'>טבלה</span> — כך רואים בקלות כמה פעמים כל תשובה חוזרת.\n\n<div class='diagram-box'>\n<table style='border-collapse:collapse;font-size:13px;text-align:center'>\n<tr><th style='border:2px solid #0d6e6e;padding:6px 14px;background:#e8eef4'>צבע</th><th style='border:2px solid #0d6e6e;padding:6px 14px;background:#e8eef4'>כמות ילדים</th></tr>\n<tr><td style='border:2px solid #0d6e6e;padding:6px 14px'>כחול</td><td style='border:2px solid #0d6e6e;padding:6px 14px'>5</td></tr>\n<tr><td style='border:2px solid #0d6e6e;padding:6px 14px'>אדום</td><td style='border:2px solid #0d6e6e;padding:6px 14px'>3</td></tr>\n<tr><td style='border:2px solid #0d6e6e;padding:6px 14px'>ירוק</td><td style='border:2px solid #0d6e6e;padding:6px 14px'>2</td></tr>\n</table>\n</div>\n\nמהטבלה אפשר לענות על שאלות בקלות: <span class='hl-teal'>איזה צבע הכי פופולרי?</span> (זה שיש לו המספר הכי גדול), וכמה ילדים ענו בסך הכול (סוכמים את כל העמודה).\n\n**מעבר בין ייצוגים** — אותו מידע אפשר להציג גם בטבלה, גם בדיאגרמת עמודות, וגם ב<span class='hl-teal'>פיקטוגרם</span> (תמונות קטנות במקום עמודות) — כולם מראים בדיוק את אותו מידע, רק בצורה שונה.\n\n<span class='hl-success'>לספר סיפור עם נתונים</span>: אפשר להסתכל על דיאגרמה ולתאר במילים מה היא מראה — למשל \"הכי הרבה ילדים אוהבים...\", \"הכי מעט ילדים בחרו ב...\", \"ההפרש בין הראשון לאחרון הוא...\".",
    "keyFormulas": [
      "טבלה מארגנת נתונים לפי קטגוריות",
      "הכי פופולרי = המספר הגדול ביותר בטבלה",
      "סה\"כ = סכום כל המספרים בטבלה"
    ]
  },
  {
    "id": "g3-numbers-10000",
    "grade": 3,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "מספרים עד 10,000",
    "description": "מבנה עשרוני, עיגול מספרים ואומדן",
    "sortOrder": 1,
    "explanation": "מספר עד $10{,}000$ בנוי מ<span class='hl-teal'>אלפים</span>, מאות, עשרות ויחידות. למשל $4{,}372 = 4$ אלפים, $3$ מאות, $7$ עשרות ו-$2$ יחידות.\n\n<span class='hl-teal'>עיגול מספרים</span> אומר להחליף מספר במספר \"עגול\" קרוב אליו, כדי לעשות חישובי אומדן מהירים. מסתכלים בספרה שאחרי מקום העיגול: אם היא $5$ ומעלה, מעגלים כלפי מעלה; אם היא $4$ ומטה, משאירים כפי שהוא.\n\n**כמה דרכים לכתוב אותו מספר** — אפשר לפרק מספר בכמה דרכים שונות: $2{,}356 = 2$ אלפים $3$ מאות $56$ יחידות, אבל גם $= 23$ מאות ו-$56$ יחידות (כי $2$ אלפים שווים ל-$20$ מאות). כדאי להתרגל לזהות ששתי הצורות מייצגות בדיוק אותו מספר.\n\n**השוואת מספרים** — משתמשים בסימנים <span class='hl-coral'>$>$</span> (גדול מ-) ו-<span class='hl-coral'>$<$</span> (קטן מ-) כדי להשוות בין מספרים: $4{,}372 > 3{,}999$. משווים קודם לפי מספר הספרות, ואם שווה — ספרה אחר ספרה משמאל לימין.\n\n**כפל ב-$10$ וב-$100$** — כשמכפילים מספר שלם ב-$10$, מוסיפים אפס אחד בסוף: $34\\times 10=340$. כשמכפילים ב-$100$, מוסיפים שני אפסים: $34\\times 100=3{,}400$.",
    "keyFormulas": [
      "מבנה: אלפים, מאות, עשרות, יחידות",
      "עיגול: ספרה $5$ ומעלה → מעגלים למעלה; $4$ ומטה → משאירים",
      "פירוק חלופי: $2{,}356=23$ מאות ו-$56$ יחידות",
      "$>$ גדול מ-, $<$ קטן מ-",
      "$\\times 10$ מוסיף אפס אחד, $\\times 100$ מוסיף שני אפסים"
    ]
  },
  {
    "id": "g3-counting-10000",
    "grade": 3,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "ספירה בתחום ה-10,000",
    "description": "ספירה סדורה בקפיצות שונות, כולל התחלה ממספר לא עגול",
    "sortOrder": 2,
    "explanation": "בכיתה ג' ממשיכים לתרגל <span class='hl-teal'>ספירה בקפיצות</span> קבועות, אבל בתחום גדול יותר ועם קפיצות מגוונות יותר.\n\nאפשר לספור בקפיצות של $1$, $10$, $100$, $1{,}000$ — אבל גם בקפיצות פחות \"עגולות\" כמו $20$, $25$, $50$, $200$, $500$. למשל: $50,100,150,200,\\ldots$ (קפיצות של $50$).\n\n<span class='hl-coral'>התחלה ממספר לא עגול</span> — אפשר להתחיל לספור בקפיצות גם ממספר שאינו עגול: החל מ-$138$ בקפיצות של $10$: $138,148,158,168,\\ldots$ שימו לב שרק העשרות והמאות משתנות — ספרת היחידות ($8$) נשארת קבועה לאורך כל הסדרה.\n\n**ספירה לאחור** — אותו עיקרון עובד גם בכיוון ההפוך: $500,450,400,350,\\ldots$ (קפיצות של $50$ אחורה).",
    "keyFormulas": [
      "קפיצות אפשריות: $1,10,100,1{,}000$ וגם $20,25,50,200,500$",
      "התחלה ממספר לא עגול: ספרת היחידות נשארת קבועה בקפיצות של $10$",
      "ספירה לאחור עובדת באותו עיקרון, בכיוון הפוך"
    ]
  },
  {
    "id": "g3-gematria",
    "grade": 3,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "גימטריה — ערך מספרי של אותיות",
    "description": "הערך המספרי של האותיות העבריות וחישוב גימטריה של מילה",
    "sortOrder": 3,
    "explanation": "לכל <span class='hl-teal'>אות עברית</span> יש ערך מספרי קבוע. האותיות א'-י' מייצגות $1$ עד $10$, האותיות כ'-צ' מייצגות עשרות ($20,30,\\ldots,90$), והאותיות ק'-ת' מייצגות מאות ($100,200,300,400$).\n\n<div class='diagram-box'>\n<table style='border-collapse:collapse;font-size:12px;text-align:center'>\n<tr><th style='border:1.5px solid #0d6e6e;padding:4px 8px;background:#e8eef4'>א</th><th style='border:1.5px solid #0d6e6e;padding:4px 8px;background:#e8eef4'>ב</th><th style='border:1.5px solid #0d6e6e;padding:4px 8px;background:#e8eef4'>ג</th><th style='border:1.5px solid #0d6e6e;padding:4px 8px;background:#e8eef4'>...</th><th style='border:1.5px solid #0d6e6e;padding:4px 8px;background:#e8eef4'>י</th><th style='border:1.5px solid #0d6e6e;padding:4px 8px;background:#e8eef4'>כ</th><th style='border:1.5px solid #0d6e6e;padding:4px 8px;background:#e8eef4'>...</th><th style='border:1.5px solid #0d6e6e;padding:4px 8px;background:#e8eef4'>ק</th></tr>\n<tr><td style='border:1.5px solid #0d6e6e;padding:4px 8px'>1</td><td style='border:1.5px solid #0d6e6e;padding:4px 8px'>2</td><td style='border:1.5px solid #0d6e6e;padding:4px 8px'>3</td><td style='border:1.5px solid #0d6e6e;padding:4px 8px'>...</td><td style='border:1.5px solid #0d6e6e;padding:4px 8px'>10</td><td style='border:1.5px solid #0d6e6e;padding:4px 8px'>20</td><td style='border:1.5px solid #0d6e6e;padding:4px 8px'>...</td><td style='border:1.5px solid #0d6e6e;padding:4px 8px'>100</td></tr>\n</table>\n</div>\n\n<span class='hl-teal'>חישוב גימטריה של מילה</span> — מחברים את הערכים המספריים של כל האותיות במילה. למשל, המילה \"טוב\" $= 9+6+2=17$ (ט$=9$, ו$=6$, ב$=2$).\n\n<span class='hl-coral'>שימו לב</span> — בשונה מהמבנה העשרוני של המספרים, במערכת הגימטריה <span class='hl-coral'>אין משמעות למקום האות</span> במילה — רק לערך שלה. לכן \"בג\" ו\"גב\" שוות באותה גימטריה ($2+3=5$).",
    "keyFormulas": [
      "א'-י' $=1$ עד $10$, כ'-צ' $=$ עשרות, ק'-ת' $=$ מאות",
      "גימטריה של מילה $=$ סכום ערכי כל האותיות",
      "סדר האותיות במילה לא משנה את סכום הגימטריה"
    ]
  },
  {
    "id": "g3-sequences",
    "grade": 3,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "סדרות מספרים",
    "description": "סדרות עולות ויורדות בקפיצות קבועות, וזיהוי סדרות מעורבות",
    "sortOrder": 4,
    "explanation": "<span class='hl-teal'>סדרה</span> היא רשימת מספרים המסודרים לפי כלל קבוע. בסדרה <span class='hl-teal'>עולה בקפיצה קבועה</span>, כל מספר גדול מקודמו באותה כמות: $5,15,25,35,\\ldots$ (קפיצה של $10$).\n\n<div class='diagram-box'><svg viewBox='0 0 280 70' xmlns='http://www.w3.org/2000/svg'><line x1='20' y1='40' x2='260' y2='40' stroke='#1a2b3c' stroke-width='2'/><g fill='#0d6e6e'><circle cx='40' cy='40' r='4'/><circle cx='100' cy='40' r='4'/><circle cx='160' cy='40' r='4'/><circle cx='220' cy='40' r='4'/></g><g font-size='12' fill='#1a2b3c' text-anchor='middle'><text x='40' y='60'>5</text><text x='100' y='60'>15</text><text x='160' y='60'>25</text><text x='220' y='60'>35</text></g><path d='M45,30 Q70,10 95,30' fill='none' stroke='#c45c48' stroke-width='1.5'/><text x='70' y='12' text-anchor='middle' font-size='10' fill='#c45c48'>+10</text></svg></div>\n\nלפעמים הקפיצה גדולה יותר, כמו $50,200,250$ (קפיצה של $50$), או קפיצות של $1{,}000$: $2{,}000,3{,}000,4{,}000,\\ldots$\n\n**סדרה יורדת** עובדת באותו אופן, רק שמחסרים בכל שלב: $900,800,700,\\ldots$\n\n<span class='hl-coral'>סדרה מעורבת (לא מונוטונית)</span> — לפעמים סדרה קופצת למעלה ולמטה לסירוגין, למשל $1,3,2,4,3,5,\\_\\_,\\_\\_$. במקרה כזה כדאי לפצל לשתי תת-סדרות: המקומות האי-זוגיים ($1,2,3,\\_$ — עולה ב-$1$) והמקומות הזוגיים ($3,4,5,\\_$ — עולה ב-$1$), ולפתור כל אחת בנפרד. התשובה: $4,6$.\n\n**איתור טעות בסדרה** — אם נתונה סדרה עם טעות, כמו $10,20,31,40$, בודקים את הקפיצה בין כל שני איברים סמוכים ומזהים היכן היא לא מתאימה לכלל (כאן: $31$ צריך להיות $30$).",
    "keyFormulas": [
      "סדרה עולה/יורדת: אותה קפיצה קבועה בין כל שני איברים סמוכים",
      "סדרה מעורבת: מפצלים למקומות זוגיים ואי-זוגיים ובודקים כל תת-סדרה בנפרד",
      "לאיתור טעות: בודקים את הקפיצה בין כל זוג איברים סמוכים"
    ]
  },
  {
    "id": "g3-add-sub-large",
    "grade": 3,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "חיבור וחיסור עד 10,000",
    "description": "אלגוריתמים כתוביים, משוואות, אומדן ושאלות מילוליות",
    "sortOrder": 5,
    "explanation": "בחיבור וחיסור של מספרים גדולים כותבים אותם <span class='hl-teal'>עמודה מתחת לעמודה</span> — יחידות מתחת ליחידות, עשרות מתחת לעשרות וכן הלאה, ומתחילים לחשב מהעמודה הימנית (היחידות).\n\nאם בעמודה מסוימת הסכום עולה על $9$, <span class='hl-teal'>\"נושאים\"</span> $1$ לעמודה הבאה. בחיסור, אם אין מספיק ביחידות, <span class='hl-coral'>\"שואלים\"</span> $1$ מהעמודה הבאה.\n\nבשאלה מילולית, חשוב לזהות אם מדובר בפעולת חיבור (יחד, סה\"כ, הוסיפו) או חיסור (הפרש, נשאר, פחות).\n\n**משוואות עם מקום חסר** — לפעמים המספר החסר לא נמצא בסוף אלא בכל מקום במשוואה, כמו $\\square+200=300+148$. פותרים על ידי חישוב הצד הידוע קודם ($300+148=448$), ואז מוצאים מה חסר בצד השני ($448-200=248$).\n\n**אומדן** — לפני חישוב מדויק, אפשר <span class='hl-teal'>לאמוד</span> (להעריך בקירוב) את התוצאה על ידי עיגול המספרים, ולסמן זאת בסימן <span class='hl-coral'>$\\approx$</span> (בערך שווה): $398+512\\approx 400+500=900$.\n\n**הזזה שומרת על סכום/הפרש** — אם מזיזים את שני האיברים באותה כמות, הסכום או ההפרש נשארים שווים: $358+493=351+500$ (הוספנו $7$ לאחד והורדנו $7$ מהשני).",
    "keyFormulas": [
      "מסדרים עמודה מתחת לעמודה: יחידות מול יחידות",
      "מחשבים מימין לשמאל: יחידות ← עשרות ← מאות ← אלפים",
      "\"נשיאה\" בחיבור, \"שאילה\" בחיסור",
      "$\\square+200=300+148 \\Rightarrow \\square=248$",
      "$\\approx$ = בערך שווה (משמש באומדן)",
      "הזזה של אותה כמות בשני האיברים שומרת על הסכום/ההפרש"
    ]
  },
  {
    "id": "g3-mul-div-100",
    "grade": 3,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "כפל וחילוק בתחום ה-100",
    "description": "לוח הכפל, כפל עשרות/מאות, סוגריים ותכונות הכפל והחילוק",
    "sortOrder": 6,
    "explanation": "כדאי לדעת בעל-פה את <span class='hl-teal'>לוח הכפל</span> (מ-$1$ עד $10$) — זה חוסך המון זמן בתרגילים.\n\nכדי לכפול במספר עגול (עשרות/מאות), כופלים את הספרות ומוסיפים את האפסים: $3\\times 40 = 3\\times 4$ ועוד אפס $= 120$.\n\n<span class='hl-teal'>סוגריים</span> אומרים מה לחשב קודם. בביטוי $2\\times(3+4)$ מחשבים קודם את מה שבסוגריים ($3+4=7$), ורק אז כופלים: $2\\times 7=14$.\n\n**לוח כפל שלם** — כדאי לדעת בעל-פה את כל לוח הכפל, מ-$1\\times1$ ועד $10\\times10$ — זה הבסיס לכל חישובי הכפל והחילוק שיבואו בהמשך.\n\n**התכונות של $0$ ו-$1$** — כל מספר כפול $1$ נשאר אותו מספר: $6\\times1=6$. כל מספר כפול $0$ שווה $0$: $6\\times0=0$. וכל מספר (פרט ל-$0$) מחולק ב-$1$ נשאר אותו מספר: $6:1=6$.\n\n<span class='hl-teal'>כפל וחילוק הם פעולות הפוכות</span> — אם יודעים ש-$7\\times8=56$, אפשר מיד לדעת ש-$56:8=7$ וגם ש-$56:7=8$. זו דרך מצוינת לבדוק אם תרגיל חילוק נכון.",
    "keyFormulas": [
      "$3\\times 40 = 3\\times 4\\times 10 = 120$",
      "סוגריים תמיד מחושבים ראשונים",
      "חילוק בודק \"כמה פעמים נכנס\": $63:7=9$",
      "$a\\times1=a$, $\\ a\\times0=0$, $\\ a:1=a$",
      "כפל וחילוק הפוכים: $7\\times8=56 \\Leftrightarrow 56:8=7$"
    ]
  },
  {
    "id": "g3-divisibility",
    "grade": 3,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "כללי התחלקות ב-2, 5, 10",
    "description": "זיהוי מהיר אם מספר מתחלק ב-2, ב-5 או ב-10, לפי ספרת היחידות",
    "sortOrder": 7,
    "explanation": "אפשר לדעת אם מספר מתחלק ב-$2$, ב-$5$ או ב-$10$ בלי לחלק בכלל — רק על ידי הסתכלות על <span class='hl-teal'>ספרת היחידות</span>.\n\n<span class='hl-teal'>מתחלק ב-$2$</span> — אם ספרת היחידות היא $0,2,4,6$ או $8$ (מספר זוגי). למשל $348$ מתחלק ב-$2$ כי היחידות היא $8$.\n\n<span class='hl-teal'>מתחלק ב-$5$</span> — אם ספרת היחידות היא $0$ או $5$. למשל $735$ מתחלק ב-$5$.\n\n<span class='hl-teal'>מתחלק ב-$10$</span> — אם ספרת היחידות היא $0$. למשל $920$ מתחלק ב-$10$.\n\n<span class='hl-coral'>למה זה עובד?</span> — כל עשרת שלמה (כמו $10,20,30$) מתחלקת בדיוק ב-$2$, ב-$5$ וגם ב-$10$. לכן כשמפרקים מספר לעשרות שלמות ועוד ספרת יחידות, ההתחלקות תלויה רק בספרת היחידות.",
    "keyFormulas": [
      "מתחלק ב-$2$: יחידות $0,2,4,6,8$",
      "מתחלק ב-$5$: יחידות $0$ או $5$",
      "מתחלק ב-$10$: יחידות $0$"
    ]
  },
  {
    "id": "g3-division-remainder",
    "grade": 3,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "חילוק עם שארית",
    "description": "רישום שארית, בדיקת תרגיל חילוק, ובעיות עם כמה תשובות אפשריות",
    "sortOrder": 8,
    "explanation": "כשמספר לא מתחלק בדיוק, מקבלים <span class='hl-teal'>מנה</span> ו<span class='hl-teal'>שארית</span>. למשל $13:4$ — $4$ נכנס ב-$13$ שלוש פעמים ($4\\times3=12$), ונשאר $1$. כותבים זאת כך: $13:4=3$ שארית $1$.\n\n<span class='hl-coral'>שימו לב</span> — אסור לבלבל בין תרגילים שרק \"נראים\" דומים: $13:4$ ו-$17:7$ שונים לגמרי זה מזה, למרות שבשניהם מתקבלת מנה קטנה ושארית — צריך תמיד לחשב את התרגיל המדויק ולא להשוות לפי המראה החיצוני.\n\n<span class='hl-teal'>בדיקת תרגיל חילוק עם שארית</span> — כדי לוודא שהחילוק נכון: מנה $\\times$ מחלק $+$ שארית צריך להיות שווה למספר המקורי. בדיקה עבור $13:4=3$ שארית $1$: $3\\times4+1=13$. ✓\n\n**בעיות עם כמה תשובות אפשריות** — בבעיה כמו \"יש $22$ עוגיות, כמה שקיות של $5$ עוגיות אפשר למלא, וכמה עוגיות יישארו?\" התשובה היא $4$ שקיות ו-$2$ עוגיות נשארות ($22:5=4$ שארית $2$). אבל בהקשר אחר (למשל, כמה שקיות צריך כדי לארוז את כל העוגיות) יכולה להתקבל תשובה שונה — הכול תלוי במה בדיוק השאלה מבקשת.",
    "keyFormulas": [
      "$13:4=3$ שארית $1$",
      "בדיקה: מנה $\\times$ מחלק $+$ שארית $=$ המספר המקורי",
      "תרגילים עם מנה/שארית שנראות דומות יכולים להיות שונים לגמרי"
    ]
  },
  {
    "id": "g3-distributive-law",
    "grade": 3,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "סדר פעולות וחוק הפילוג",
    "description": "סדר חישוב עם סוגריים, וחוק הפילוג לפישוט כפל",
    "sortOrder": 9,
    "explanation": "כשיש בתרגיל כמה פעולות, יש <span class='hl-teal'>סדר קבוע</span> לחישוב: קודם מה שבתוך <span class='hl-teal'>סוגריים</span>, אחר כך כפל וחילוק, ולבסוף חיבור וחיסור.\n\n<span class='hl-teal'>חוק הפילוג</span> אומר שאפשר לפרק כפל של סכום לשני כפלים נפרדים ולחבר את התוצאות: $a\\times(b+c)=(a\\times b)+(a\\times c)$.\n\n<div class='diagram-box'><svg viewBox='0 0 220 100' xmlns='http://www.w3.org/2000/svg'><g stroke='#1a2b3c' stroke-width='2' fill='none'><rect x='20' y='20' width='120' height='50'/><rect x='140' y='20' width='40' height='50'/></g><rect x='20' y='20' width='120' height='50' fill='#0d6e6e' fill-opacity='0.15'/><rect x='140' y='20' width='40' height='50' fill='#c45c48' fill-opacity='0.15'/><text x='80' y='45' text-anchor='middle' font-size='12' fill='#1a2b3c'>20×9</text><text x='160' y='45' text-anchor='middle' font-size='11' fill='#1a2b3c'>3×9</text><text x='100' y='90' text-anchor='middle' font-size='12' fill='#1a2b3c'>23×9 = (20×9)+(3×9)</text></svg></div>\n\nזה שימושי מאוד לחישוב מהיר: $23\\times9=(20\\times9)+(3\\times9)=180+27=207$.\n\n<span class='hl-coral'>אפשר גם לחסר</span> במקום לחבר, אם נוח יותר להתקרב לעשרת עגולה: $3\\times29=(3\\times30)-(3\\times1)=90-3=87$.\n\n**קשר לשטח מלבן** — חוק הפילוג הוא בדיוק העיקרון שמאחורי חלוקת מלבן גדול לשני מלבנים קטנים יותר: שטח המלבן הגדול שווה לסכום שטחי החלקים.",
    "keyFormulas": [
      "סדר פעולות: סוגריים ← כפל/חילוק ← חיבור/חיסור",
      "$a\\times(b+c)=(a\\times b)+(a\\times c)$",
      "$3\\times29=(3\\times30)-(3\\times1)=87$"
    ]
  },
  {
    "id": "g3-mul-div-10000",
    "grade": 3,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "כפל וחילוק במספרים גדולים",
    "description": "כפל וחילוק בעשרות, מאות ואלפים שלמים, וחלוקת דו-ספרתי ללא שארית",
    "sortOrder": 10,
    "explanation": "את עקרונות הכפל והחילוק אפשר להרחיב גם למספרים גדולים, כשעובדים עם עשרות, מאות ואלפים <span class='hl-teal'>שלמים</span>.\n\n<span class='hl-teal'>כפל בעשרות/מאות שלמות</span> — $20\\times300$: כופלים את הספרות המובילות ($2\\times3=6$) ומוסיפים את כל האפסים: $20\\times300=6{,}000$.\n\n<span class='hl-teal'>חילוק כשהמנה או המחלק הם $10/100/1{,}000$</span> — $2{,}400:10=240$ (מסירים אפס אחד), $8{,}000:8=1{,}000$, ואם ידוע ש-$8{,}700:\\square=87$ אז $\\square=100$.\n\n<span class='hl-coral'>אזהרה חשובה</span> — אסור סתם \"להוסיף/להוריד אפס\" בלי להבין למה — הכלל עובד רק במקרים ספציפיים של כפל/חילוק ב-$10,100,1{,}000$. תמיד כדאי לבדוק שהתוצאה הגיונית, ולא רק לזכור כלל אצבע.\n\n**חילוק עשרות/מאות שלמות במספר חד-ספרתי** — $6{,}000:2=3{,}000$ (מחלקים את הספרה המובילה ומשאירים את האפסים).\n\n**חילוק דו-ספרתי ללא שארית** — $84:4$: מפרקים את $84$ לחלקים נוחים לחלוקה: $84:4=(80:4)+(4:4)=20+1=21$.",
    "keyFormulas": [
      "$20\\times300=6{,}000$ (כופלים ספרות מובילות, מוסיפים אפסים)",
      "$2{,}400:10=240$, $\\ 8{,}000:8=1{,}000$",
      "$84:4=(80:4)+(4:4)=21$"
    ]
  },
  {
    "id": "g3-fractions-unit",
    "grade": 3,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "שברי יחידה",
    "description": "הכרת שברי היחידה (חצי, שליש, רבע, חמישית, שישית, שמינית, עשירית) וסדר ביניהם",
    "sortOrder": 11,
    "explanation": "<span class='hl-teal'>שבר יחידה</span> הוא שבר שהמספר העליון שלו הוא $1$, כמו $\\frac{1}{2},\\frac{1}{3},\\frac{1}{4}$ וכן הלאה. הוא מייצג חלק אחד מתוך חלוקה שווה של השלם.\n\n<div class='diagram-box'>\n<svg viewBox='0 0 260 110' xmlns='http://www.w3.org/2000/svg'>\n<rect x='10' y='10' width='240' height='24' fill='none' stroke='#0d6e6e' stroke-width='2'/>\n<line x1='130' y1='10' x2='130' y2='34' stroke='#0d6e6e' stroke-width='2'/>\n<rect x='130' y='10' width='120' height='24' fill='#0d6e6e' opacity='0.3'/>\n<text x='250' y='27' text-anchor='end' font-size='11' fill='#1a2b3c' dx='-4'>1/2</text>\n<rect x='10' y='44' width='240' height='24' fill='none' stroke='#0d6e6e' stroke-width='2'/>\n<line x1='70' y1='44' x2='70' y2='68' stroke='#0d6e6e' stroke-width='2'/>\n<rect x='10' y='44' width='60' height='24' fill='#0d6e6e' opacity='0.3'/>\n<text x='16' y='61' font-size='11' fill='#1a2b3c'>1/4</text>\n<rect x='10' y='78' width='240' height='24' fill='none' stroke='#0d6e6e' stroke-width='2'/>\n<line x1='40' y1='78' x2='40' y2='102' stroke='#0d6e6e' stroke-width='2'/>\n<rect x='10' y='78' width='30' height='24' fill='#0d6e6e' opacity='0.3'/>\n<text x='16' y='95' font-size='11' fill='#1a2b3c'>1/8</text>\n</svg>\n</div>\n\n<span class='hl-coral'>ככל שהמספר התחתון (המכנה) גדול יותר, כל חלק קטן יותר</span> — כי מחלקים את אותו שלם ליותר חלקים. לכן $\\frac{1}{8}<\\frac{1}{4}<\\frac{1}{2}$.",
    "keyFormulas": [
      "שבר יחידה: $\\frac{1}{n}$ — חלק אחד מתוך $n$ חלקים שווים",
      "מכנה גדול יותר ⇐ חלק קטן יותר",
      "$\\frac{1}{10}<\\frac{1}{8}<\\frac{1}{6}<\\frac{1}{5}<\\frac{1}{4}<\\frac{1}{3}<\\frac{1}{2}$"
    ]
  },
  {
    "id": "g3-geometry",
    "grade": 3,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "זוויות, מאונכים ומקבילים",
    "description": "זוויות, משולשים, מרובעים ומדידת אורך",
    "sortOrder": 12,
    "explanation": "<span class='hl-teal'>זווית</span> נוצרת כשני קווים יוצאים מאותה נקודה. <span class='hl-teal'>קווים מאונכים</span> נפגשים ויוצרים בדיוק זווית ישרה ($90°$), ואילו <span class='hl-teal'>קווים מקבילים</span> לעולם לא נפגשים — המרחק ביניהם תמיד שווה.\n\n<div class='diagram-box'>\n<svg viewBox='0 0 260 110' xmlns='http://www.w3.org/2000/svg'>\n<line x1='20' y1='90' x2='120' y2='90' stroke='#0d6e6e' stroke-width='3'/>\n<line x1='30' y1='100' x2='30' y2='10' stroke='#0d6e6e' stroke-width='3'/>\n<rect x='30' y='78' width='12' height='12' fill='none' stroke='#0d6e6e' stroke-width='2'/>\n<text x='70' y='108' text-anchor='middle' font-size='11' fill='#1a2b3c'>מאונכים (90°)</text>\n<line x1='150' y1='30' x2='250' y2='30' stroke='#c45c48' stroke-width='3'/>\n<line x1='150' y1='70' x2='250' y2='70' stroke='#c45c48' stroke-width='3'/>\n<text x='200' y='95' text-anchor='middle' font-size='11' fill='#1a2b3c'>מקבילים</text>\n</svg>\n</div>\n\nבמשולשים ומרובעים אפשר לזהות זוויות ישרות (כמו פינת דף), <span class='hl-coral'>זוויות חדות</span> (קטנות מ-$90°$) ו<span class='hl-coral'>זוויות קהות</span> (גדולות מ-$90°$).\n\n**זווית שטוחה** — זווית של בדיוק $180°$ (קו ישר) נקראת <span class='hl-teal'>זווית שטוחה</span>. סדר הגדלים: חדה $<90°<$ ישרה $=90°<$ קהה $<180°=$ שטוחה.\n\n<span class='hl-teal'>השוואת זוויות</span> — אפשר להשוות בין שתי זוויות על ידי הנחה ישירה אחת על השנייה (חופפות בקודקוד), או בעזרת \"עוגן ביניים\" כמו פינת דף או פיסת נייר שגוזרים. <span class='hl-coral'>שימו לב</span> — גודל הזווית תלוי רק ב\"פתיחה\" בין הקווים, ולא באורך הקווים המצוירים!\n\n**סיווג משולשים לפי זוויות** — משולש <span class='hl-teal'>חד-זוויות</span> (כל הזוויות חדות), משולש <span class='hl-teal'>ישר-זווית</span> (יש בו זווית ישרה אחת), ומשולש <span class='hl-teal'>קהה-זווית</span> (יש בו זווית קהה אחת). אפשר לשלב סיווג זה עם הסיווג לפי צלעות מכיתה ב' (שווה-צלעות, שווה-שוקיים, שונה-צלעות), למשל \"משולש ישר-זווית ושווה-שוקיים\".",
    "keyFormulas": [
      "זווית ישרה = בדיוק $90°$",
      "מאונכים = נפגשים בזווית ישרה",
      "מקבילים = לעולם לא נפגשים, מרחק קבוע ביניהם",
      "חדה $<90°<$ ישרה $=90°<$ קהה $<180°=$ שטוחה",
      "משולשים: חד-זוויות / ישר-זווית / קהה-זווית"
    ]
  },
  {
    "id": "g3-area",
    "grade": 3,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "שטח מלבן",
    "description": "יחידות שטח, חישוב שטח מלבן, פירוק והרכבה מחדש",
    "sortOrder": 13,
    "explanation": "<span class='hl-teal'>שטח</span> הוא כמות המקום שצורה תופסת, ונמדד ב<span class='hl-teal'>יחידות שטח</span> — למשל משבצות של $1$ ס\"מ על $1$ ס\"מ (סמ\"ר).\n\n<div class='diagram-box'>\n<svg viewBox='0 0 200 130' xmlns='http://www.w3.org/2000/svg'>\n<g stroke='#0d6e6e' stroke-width='1.5' fill='#0d6e6e' fill-opacity='0.12'>\n<rect x='20' y='20' width='30' height='30'/><rect x='50' y='20' width='30' height='30'/><rect x='80' y='20' width='30' height='30'/><rect x='110' y='20' width='30' height='30'/>\n<rect x='20' y='50' width='30' height='30'/><rect x='50' y='50' width='30' height='30'/><rect x='80' y='50' width='30' height='30'/><rect x='110' y='50' width='30' height='30'/>\n<rect x='20' y='80' width='30' height='30'/><rect x='50' y='80' width='30' height='30'/><rect x='80' y='80' width='30' height='30'/><rect x='110' y='80' width='30' height='30'/>\n</g>\n<rect x='20' y='20' width='120' height='90' fill='none' stroke='#1a2b3c' stroke-width='2.5'/>\n<text x='80' y='16' text-anchor='middle' font-size='12' fill='#1a2b3c'>4 יחידות</text>\n<text x='10' y='68' text-anchor='middle' font-size='12' fill='#1a2b3c' transform='rotate(-90 10 68)'>3 יחידות</text>\n</svg>\n</div>\n\nבמקום לספור כל משבצת, אפשר לחשב ישר: שטח המלבן שווה ל<span class='hl-teal'>אורך כפול רוחב</span>. במלבן שבתמונה: $4\\times 3=12$ יחידות שטח.\n\n**השוואה ישירה** — לפעמים אפשר להשוות שטחים של שתי צורות פשוט על ידי הנחה אחת על השנייה, בלי למדוד בכלל.\n\n<span class='hl-teal'>עיקרון הפירוק וההרכבה מחדש</span> — אם גוזרים צורה לחלקים ומרכיבים אותם מחדש בסידור אחר, השטח הכולל לא משתנה, גם אם הצורה נראית שונה. זו דרך טובה להשוות שטחים של צורות לא-מלבניות.\n\n<span class='hl-coral'>שימו לב — שטח שווה לא אומר היקף שווה!</span> שתי צורות יכולות להיות בעלות אותו שטח אבל היקפים שונים לגמרי (ולהפך) — אלו שתי תכונות נפרדות של הצורה.\n\n**לפני יחידות סטנדרטיות** — אפשר למדוד שטח גם ביחידות \"לא רשמיות\" כמו כרטיסי משחק או כפות ידיים, ורק אחר כך לעבור ליחידות סטנדרטיות כמו סמ\"ר. לשטחים גדולים משתמשים ביחידת <span class='hl-teal'>מ\"ר</span> (מטר רבוע).",
    "keyFormulas": [
      "שטח מלבן $=$ אורך $\\times$ רוחב",
      "יחידת שטח נפוצה: סמ\"ר ($1$ ס\"מ $\\times 1$ ס\"מ)",
      "דוגמה: מלבן $4\\times 3 = 12$ סמ\"ר",
      "פירוק והרכבה מחדש לא משנים את השטח הכולל",
      "שטח שווה ≠ היקף שווה"
    ]
  },
  {
    "id": "g3-box-net",
    "grade": 3,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "פריסת קופסה",
    "description": "זיהוי ובניית פריסות של קופסה וקוביה",
    "sortOrder": 14,
    "explanation": "<span class='hl-teal'>פריסה</span> היא צורה שטוחה שאם מקפלים אותה לפי הקווים, מתקבל גוף תלת-ממדי סגור — כמו קופסה.\n\n<div class='diagram-box'><svg viewBox='0 0 180 140' xmlns='http://www.w3.org/2000/svg'><g stroke='#0d6e6e' stroke-width='2' fill='#0d6e6e' fill-opacity='0.12'><rect x='60' y='10' width='40' height='40'/><rect x='20' y='50' width='40' height='40'/><rect x='60' y='50' width='40' height='40'/><rect x='100' y='50' width='40' height='40'/><rect x='60' y='90' width='40' height='40'/></g><text x='90' y='138' text-anchor='middle' font-size='10' fill='#1a2b3c'>פריסת קובייה (צורת צלב)</text></svg></div>\n\n<span class='hl-coral'>בודקים פריסה</span> על ידי דמיון (או קיפול בפועל) — אם בקיפול נוצרים חורים או חפיפות בין הפאות, הפריסה אינה תקינה.\n\n**כמה פריסות אפשריות** — לאותו גוף יכולות להתאים <span class='hl-teal'>כמה פריסות שונות</span> — למשל, לקובייה יש כמה צורות \"צלב\" שונות שכולן מתקפלות לקובייה תקינה.\n\n**בחירת מלבנים לבניית קופסה** — כדי לבנות קופסה (תיבה) מ-$6$ מלבנים, צריך <span class='hl-teal'>שלושה זוגות</span> של מלבנים זהים (זוג לתחתית-עליון, זוג לצדדים, זוג לחזית-גב). <span class='hl-teal'>קובייה</span> היא מקרה פרטי של קופסה, שבו כל שש הפאות הן ריבועים זהים.",
    "keyFormulas": [
      "פריסה תקינה מתקפלת בלי חורים או חפיפות",
      "לאותו גוף יכולות להתאים כמה פריסות שונות",
      "קופסה = $3$ זוגות מלבנים זהים; קובייה = $6$ ריבועים זהים"
    ]
  },
  {
    "id": "g3-clock-minutes",
    "grade": 3,
    "units": null,
    "track": null,
    "cluster": "מדידת זמן",
    "title": "קריאת שעון בדיוק של דקות",
    "description": "קריאת שעון מחוגים בכל דקה, שעון דיגיטלי, ושעון 24 שעות",
    "sortOrder": 15,
    "explanation": "בכיתה ג' לומדים לקרוא שעון <span class='hl-teal'>בדיוק של דקה אחת</span>, ולא רק בחצאי שעות כמו בכיתה ב'.\n\n<div class='diagram-box'><svg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'><circle cx='75' cy='75' r='65' fill='none' stroke='#1a2b3c' stroke-width='2.5'/><g font-size='13' fill='#1a2b3c' text-anchor='middle'><text x='75' y='22'>12</text><text x='128' y='80'>3</text><text x='75' y='138'>6</text><text x='22' y='80'>9</text></g><line x1='75' y1='75' x2='95' y2='40' stroke='#c45c48' stroke-width='3' stroke-linecap='round'/><line x1='75' y1='75' x2='75' y2='130' stroke='#0d6e6e' stroke-width='4' stroke-linecap='round'/><circle cx='75' cy='75' r='4' fill='#1a2b3c'/></svg></div>\n\n<span class='hl-teal'>כל מרווח בין שני מספרים על השעון שווה ל-$5$ דקות</span>. כדי לדעת כמה דקות עברו, סופרים בקפיצות של $5$ לפי מיקום המחוג הארוך: אם הוא על ה-$7$, עברו $35$ דקות ($7\\times5$).\n\n**שעון דיגיטלי** מציג את השעה ישירות: $3{:}35$.\n\n<span class='hl-coral'>שעון $24$ שעות</span> — משמש בלוחות זמנים רשמיים (רכבות, טלוויזיה). השעות $13{:}00$ עד $23{:}00$ מייצגות את השעות אחרי הצוהריים והלילה: $15{:}00=3$ אחר הצוהריים.\n\n**חישובי משך זמן** — כדי לחשב כמה זמן עבר בין $9{:}20$ ל-$10{:}05$, אפשר לפרק: מ-$9{:}20$ עד $10{:}00$ עברו $40$ דקות, ועוד $5$ דקות עד $10{:}05$ — סה\"כ $45$ דקות.",
    "keyFormulas": [
      "כל מרווח בין מספרים על השעון $=5$ דקות",
      "שעון $24$ שעות: $15{:}00 = 3$ אחר הצוהריים",
      "משך זמן: מפרקים לקטעים נוחים (עד השעה העגולה ואז משם הלאה)"
    ]
  },
  {
    "id": "g3-data",
    "grade": 3,
    "units": null,
    "track": null,
    "cluster": "חקר נתונים",
    "title": "חקר נתונים ודיאגרמת עמודות כפולה",
    "description": "איסוף נתונים, דיאגרמת עמודות כפולה והשוואה בין שתי קבוצות",
    "sortOrder": 16,
    "explanation": "כדי לאסוף מידע אפשר להשתמש ב<span class='hl-teal'>שאלון</span> (לשאול אנשים) או ב<span class='hl-teal'>תצפית</span> (לספור ולתעד בעצמנו).\n\n<span class='hl-teal'>דיאגרמת עמודות כפולה</span> מאפשרת להשוות שתי קבוצות נתונים באותו גרף — למשל מספר הבנים והבנות שבחרו כל צבע.\n\n<div class='diagram-box'><svg viewBox='0 0 220 130' xmlns='http://www.w3.org/2000/svg'><line x1='20' y1='110' x2='210' y2='110' stroke='#1a2b3c' stroke-width='2'/><line x1='20' y1='110' x2='20' y2='10' stroke='#1a2b3c' stroke-width='2'/><rect x='35' y='70' width='16' height='40' fill='#0d6e6e'/><rect x='53' y='50' width='16' height='60' fill='#c45c48'/><rect x='95' y='40' width='16' height='70' fill='#0d6e6e'/><rect x='113' y='80' width='16' height='30' fill='#c45c48'/><rect x='155' y='90' width='16' height='20' fill='#0d6e6e'/><rect x='173' y='60' width='16' height='50' fill='#c45c48'/><text x='52' y='122' text-anchor='middle' font-size='10' fill='#1a2b3c'>כחול</text><text x='112' y='122' text-anchor='middle' font-size='10' fill='#1a2b3c'>אדום</text><text x='172' y='122' text-anchor='middle' font-size='10' fill='#1a2b3c'>ירוק</text></svg></div>\n\n<span class='hl-coral'>מקרא (לג'נדה)</span> חייב להופיע ליד הגרף כדי לדעת איזה צבע עמודה מייצג איזו קבוצה (למשל, טורקיז $=$ בנים, אדום $=$ בנות).\n\n**מעבר בין ייצוגים** — אותם נתונים אפשר להציג כטבלה, כדיאגרמת עמודות (רגילה או כפולה), או כפיקטוגרם — ולחשב מהם שאלות כמו \"בכמה יותר בנות מבנים בחרו בירוק?\" או \"כמה ילדים ענו בסך הכול?\".\n\n<span class='hl-success'>לספר סיפור עם נתונים</span> — לתאר במילים מה רואים בגרף: מגמות, ההבדל הגדול ביותר בין שתי הקבוצות, והתשובה לשאלת המחקר המקורית.",
    "keyFormulas": [
      "דיאגרמת עמודות כפולה משווה שתי קבוצות באותו גרף",
      "מקרא מסביר איזה צבע/עמודה מייצג איזו קבוצה",
      "אפשר לעבור בין טבלה, דיאגרמת עמודות ופיקטוגרם — אותו מידע"
    ]
  },
  {
    "id": "g4-large-numbers",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "מספרים עד מיליון",
    "description": "מבנה עשרוני, קריאה וכתיבה, השוואה עם סימני =, <, >",
    "sortOrder": 1,
    "explanation": "מספר עד <span class='hl-teal'>מיליון</span> בנוי ממקומות עשרוניים: יחידות, עשרות, מאות, אלפים, עשרות אלפים, מאות אלפים ומיליונים. כל מקום שווה פי $10$ מהמקום שמימינו.\n\nכדי להקל על קריאת מספרים גדולים, נהוג לכתוב את הספרות שלהם <span class='hl-teal'>בקבוצות של 3 ספרות</span> המופרדות בפסיק, החל מספרת היחידות: למשל $1{,}250{,}000$ (מיליון ומאתיים חמישים אלף).\n\n<span class='hl-teal'>קריאה וכתיבה במילים</span> — $324{,}500$ נקרא \"שלוש מאות עשרים וארבעה אלף וחמש מאות\". אפשר לפרק כל מספר גדול לקבוצת ה\"מיליונים\", קבוצת ה\"אלפים\" וקבוצת ה\"יחידות\", ולקרוא כל קבוצה בנפרד.\n\n<span class='hl-coral'>השוואה בין מספרים</span> משתמשת בסימנים $=$, $<$ (קטן מ-) ו-$>$ (גדול מ-). כדי להשוות שני מספרים גדולים: קודם בודקים מי מהם בעל יותר ספרות (הוא הגדול יותר); אם יש להם אותו מספר ספרות, משווים ספרה-ספרה משמאל לימין עד שמוצאים הבדל.\n\n<span class='hl-teal'>אין מספר שהוא הגדול ביותר</span> — לכל מספר, כמה גדול שיהיה, אפשר תמיד להוסיף עוד $1$ ולקבל מספר גדול יותר.",
    "keyFormulas": [
      "כל מקום עשרוני שווה פי $10$ מהמקום שמימינו",
      "כותבים מספרים גדולים בקבוצות של 3 ספרות מופרדות בפסיק",
      "$=$ שווה, $<$ קטן מ-, $>$ גדול מ-",
      "להשוואה: קודם מספר הספרות, ואז ספרה-ספרה משמאל לימין"
    ]
  },
  {
    "id": "g4-rounding-estimation",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "עיגול מספרים ואומדן בתחום המיליון",
    "description": "עיגול לאלפים, לעשרות אלפים ולמאות אלפים, ואומדן תוצאות",
    "sortOrder": 2,
    "explanation": "<span class='hl-teal'>עיגול מספר</span> אומר להחליף אותו במספר \"עגול\" קרוב אליו, כדי להקל על חישובים ועל הבנת גודל המספר. במספרים גדולים מעגלים <span class='hl-teal'>לאלפים</span>, <span class='hl-teal'>לעשרות אלפים</span> או <span class='hl-teal'>למאות אלפים</span> הקרובות.\n\nכדי לעגל, מסתכלים בספרה שמימין למקום העיגול: אם היא $5$ ומעלה, מעגלים כלפי מעלה; אם היא $4$ ומטה, משאירים את הספרה כפי שהיא ומאפסים את כל הספרות שמימינה.\n\nלדוגמה, לעגל את $647{,}328$ לאלפים הקרובים: מסתכלים בספרת המאות ($3$), שהיא קטנה מ-$5$, ולכן מעגלים למטה: $647{,}000$.\n\n<span class='hl-teal'>אומדן</span> משתמש בעיגול כדי להעריך במהירות תוצאה של תרגיל לפני החישוב המדויק, ולבדוק שהתשובה הסופית הגיונית. למשל, כדי לאמוד $398{,}512+512{,}047$: מעגלים ל-$400{,}000+500{,}000=900{,}000$.",
    "keyFormulas": [
      "ספרה $5$ ומעלה → מעגלים למעלה; $4$ ומטה → משאירים",
      "מעגלים לאלפים / עשרות אלפים / מאות אלפים",
      "אומדן: מעגלים ואז מחשבים בקירוב, לפני הפתרון המדויק"
    ]
  },
  {
    "id": "g4-add-sub-million",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "חיבור וחיסור בתחום המיליון",
    "description": "אסטרטגיות חישוב, משוואות ואי-שוויונות, חוק החילוף והקיבוץ",
    "sortOrder": 3,
    "explanation": "עקרונות האלגוריתמים של חיבור וחיסור <span class='hl-teal'>אינם תלויים בגודל המספר</span> — אותה שיטה שעבדה במספרים קטנים עובדת גם במיליונים.\n\n<span class='hl-teal'>אסטרטגיות חישוב שונות</span>: חיבור וחיסור במאוזן על סמך המבנה העשרוני, שימוש בפעולה הפוכה לבדיקה, שימוש בישר המספרים, ואלגוריתם במאונך.\n\n<span class='hl-teal'>חוק החילוף</span> בחיבור: אפשר להחליף את סדר המחוברים בלי לשנות את הסכום ($a+b=b+a$). <span class='hl-teal'>חוק הקיבוץ</span>: אפשר לקבץ מחוברים בסדר נוח יותר ($a+b+c=(a+b)+c=a+(b+c)$).\n\n<span class='hl-coral'>הזזה שומרת על התוצאה</span> — הגדלת שני המחוברים באותה כמות לא משנה את הסכום: $3{,}625+1{,}297=3{,}622+1{,}300$. הגדלת המחסר והמחוסר באותה כמות לא משנה את ההפרש: $4{,}000-2{,}397=3{,}999-2{,}396$.\n\nבמשוואות ואי-שוויונות, לפעמים סימן היחס נמצא <span class='hl-teal'>משמאל לתרגיל</span>, ולפעמים יש <span class='hl-teal'>יותר מפתרון אחד</span> אפשרי.",
    "keyFormulas": [
      "חוק החילוף: $a+b=b+a$",
      "חוק הקיבוץ: $(a+b)+c=a+(b+c)$",
      "הגדלת/הקטנת שני האיברים באותה כמות שומרת על הסכום/ההפרש",
      "דוגמה: $3{,}625+1{,}297=3{,}622+1{,}300$"
    ]
  },
  {
    "id": "g4-mul-basics",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "כפל מספרים טבעיים",
    "description": "כפל דו/תלת-ספרתי, חוק הפילוג המורחב, תכונות 0 ו-1, אומדן",
    "sortOrder": 4,
    "explanation": "<span class='hl-teal'>כפל בעל-פה</span> של עשרות/מאות/אלפים שלמים במספר חד-ספרתי נעשה על ידי כפל הספרות המובילות והוספת האפסים: $4{,}000\\times 3=12{,}000$.\n\n<span class='hl-teal'>חוק הפילוג</span> מאפשר לפרק מכפלה לחלקים נוחים יותר: $25\\times 36=25\\times 4\\times 9=100\\times 9=900$, או $32\\times 19=32\\times(20-1)=32\\times 20-32\\times 1=640-32=608$.\n\nאפשר להציג תרגילי כפל בעזרת <span class='hl-teal'>מלבנים</span> ולראות את הקשר בין כפל לשטח: כפל $37\\times 23$ מתפרק לארבעה מלבנים קטנים ($30\\times20$, $30\\times3$, $7\\times20$, $7\\times3$) שסכום שטחיהם הוא המכפלה הכוללת.\n\n<span class='hl-coral'>תכונות $0$ ו-$1$</span>: אם אחד הגורמים הוא $0$, המכפלה שווה $0$. אם אחד הגורמים הוא $1$, התוצאה שווה לגורם האחר.\n\n<span class='hl-teal'>קשר בין גורמים למכפלה</span> — הגדלת גורם אחד פי מספר מסוים והקטנת הגורם השני פי אותו מספר, לא משנה את המכפלה: $18\\times 24$ שווה ל-$36\\times 12$ (הכפלנו את $18$ פי $2$ וחילקנו את $24$ פי $2$).\n\n<span class='hl-teal'>אומדן במכפלות</span> נעשה על ידי עיגול הגורמים לפני הכפל.",
    "keyFormulas": [
      "$25\\times 36=25\\times 4\\times 9=900$ (פירוק לפי חוק הפילוג)",
      "$32\\times 19=32\\times 20-32\\times 1=608$",
      "אם גורם $=0$ ⟸ מכפלה $=0$; אם גורם $=1$ ⟸ מכפלה $=$ הגורם האחר",
      "הגדלת גורם פי $k$ והקטנת גורם שני פי $k$ לא משנה את המכפלה"
    ]
  },
  {
    "id": "g4-div-no-remainder",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "חילוק ללא שארית",
    "description": "חילוק בעשרות/מאות/אלפים שלמים, חוק הפילוג בחילוק, חילוק במאונך, תכונות 0 ו-1",
    "sortOrder": 5,
    "explanation": "<span class='hl-teal'>חילוק ללא שארית</span> בעשרות/מאות/אלפים שלמים נעשה בעזרת הקשר ההפוך לכפל: $6{,}000:2=3{,}000$ כי $3{,}000\\times2=6{,}000$.\n\n<span class='hl-teal'>חוק הפילוג בחילוק</span> — אפשר לפרק את המחולק לחלקים נוחים: $1{,}536:3=(1{,}500+30+6):3=1{,}500:3+30:3+6:3=500+10+2=512$.\n\n<span class='hl-teal'>חילוק במאונך</span> (חילוק ארוך) נעשה מהספרה השמאלית ביותר של המחולק והלאה, שלב אחר שלב.\n\n<span class='hl-coral'>תכונות $0$ ו-$1$ בחילוק</span>: כל מספר מחולק ב-$1$ נשאר אותו מספר. <span class='hl-coral'>אסור לחלק ב-$0$</span> — אפשר להסביר זאת באמצעות תרגיל כפל מתאים: אם $a:0=b$ אז $b\\times0$ צריך להיות שווה ל-$a$, אבל כל מספר כפול $0$ הוא $0$, כך שזה אפשרי רק אם $a=0$ — ואפילו אז אין תשובה יחידה.\n\nיש <span class='hl-teal'>שתי משמעויות לחילוק</span>: חלוקה של כמות לחלקים שווים (\"חילוק לחלקים\"), ובדיקה כמה פעמים מספר מסוים נכנס בתוך מספר אחר (\"חילוק להכלה\").",
    "keyFormulas": [
      "$1{,}536:3=(1{,}500+30+6):3=512$",
      "כל מספר מחולק ב-$1$ נשאר אותו מספר",
      "חילוק ב-$0$ אסור ואינו מוגדר",
      "שתי משמעויות: חילוק לחלקים וחילוק להכלה"
    ]
  },
  {
    "id": "g4-div-remainder",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "חילוק עם שארית עד מיליון",
    "description": "רישום שארית, קשר לחילוק ארוך, בעיות מציאותיות ומשמעות השארית",
    "sortOrder": 6,
    "explanation": "בחילוק עם שארית, כאשר מספר לא מתחלק בדיוק, מקבלים <span class='hl-teal'>מנה</span> ו<span class='hl-teal'>שארית</span>. יש קשר הדוק בין חילוק ארוך לחילוק עם שארית — השארית היא מה שנשאר בסוף החישוב.\n\n<span class='hl-teal'>בדיקת התוצאה</span>: מנה $\\times$ מחלק $+$ שארית $=$ המחולק המקורי.\n\nבבעיות מציאותיות חשוב לדון <span class='hl-coral'>במשמעות השארית</span> — לפעמים מעגלים את המנה למעלה (למשל, מספר אוטובוסים דרושים), ולפעמים מתעלמים מהשארית (למשל, מספר חבילות מלאות).\n\nלמשל: $307$ תלמידים חוזרים באוטובוסים של $50$ מקומות — צריך $307:50=6$ שארית $7$, כלומר $6$ אוטובוסים מלאים ועוד תלמיד אחד, ולכן צריך <span class='hl-teal'>$7$ אוטובוסים</span> בסך הכול (מעגלים למעלה).",
    "keyFormulas": [
      "בדיקה: מנה $\\times$ מחלק $+$ שארית $=$ המחולק",
      "לפעמים מעגלים את המנה למעלה (למשל, כמות אוטובוסים)",
      "לפעמים מתעלמים מהשארית (למשל, חבילות מלאות)"
    ]
  },
  {
    "id": "g4-divisibility-369",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "סימני התחלקות ב-3, ב-6 וב-9",
    "description": "בדיקת התחלקות באמצעות סכום הספרות",
    "sortOrder": 7,
    "explanation": "בניגוד לסימני ההתחלקות ב-$2$, ב-$5$ וב-$10$ שתלויים רק בספרת היחידות, סימני ההתחלקות ב-$3$, ב-$6$ וב-$9$ מסתמכים על <span class='hl-teal'>סכום הספרות</span> של המספר.\n\n<span class='hl-teal'>מתחלק ב-$3$</span> — אם סכום הספרות מתחלק ב-$3$. לדוגמה, $246$: $2+4+6=12$, ו-$12$ מתחלק ב-$3$, לכן גם $246$ מתחלק ב-$3$.\n\n<span class='hl-teal'>מתחלק ב-$9$</span> — אם סכום הספרות מתחלק ב-$9$. לדוגמה, $1{,}827$: $1+8+2+7=18$, ו-$18$ מתחלק ב-$9$, לכן $1{,}827$ מתחלק ב-$9$.\n\n<span class='hl-teal'>מתחלק ב-$6$</span> — אם המספר מתחלק גם ב-$2$ (זוגי) וגם ב-$3$ (סכום ספרות מתחלק ב-$3$).\n\nסימני ההתחלקות מאפשרים לקבוע בקלות אם מספר מתחלק ללא שארית, בלי לבצע את החילוק בפועל. הם גם מאפשרים <span class='hl-coral'>למצוא את השארית</span> בחילוק ב-$3$ או ב-$9$: השארית שווה לשארית של חלוקת סכום הספרות באותו מספר.",
    "keyFormulas": [
      "מתחלק ב-$3$: סכום הספרות מתחלק ב-$3$",
      "מתחלק ב-$9$: סכום הספרות מתחלק ב-$9$",
      "מתחלק ב-$6$: זוגי וגם מתחלק ב-$3$",
      "השארית בחילוק ב-$3$/$9$ = שארית חלוקת סכום הספרות"
    ]
  },
  {
    "id": "g4-order-of-operations",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "ארבע פעולות החשבון וסדר פעולות החשבון",
    "description": "כללי סדר הפעולות עם ובלי סוגריים",
    "sortOrder": 8,
    "explanation": "כללי סדר פעולות החשבון קובעים <span class='hl-teal'>דרך אחידה</span> לפתרון תרגילים עם כמה פעולות, כדי שכולם יקבלו את אותה תוצאה:\n\n1. <span class='hl-teal'>בתרגיל ללא סוגריים</span> שיש בו כמה פעולות — כפל וחילוק קודמים לחיבור וחיסור.\n2. <span class='hl-teal'>בתרגיל ללא סוגריים</span> שיש בו רק חיבור וחיסור (או רק כפל וחילוק) — פותרים לפי סדר הכתיבה, משמאל לימין.\n3. <span class='hl-teal'>בתרגיל עם סוגריים</span> — הפעולות שבתוך הסוגריים תמיד קודמות לפעולות שמחוץ להם.\n\nלדוגמה: $12-2\\times3$. לפי הכלל הראשון, מחשבים קודם את הכפל: $2\\times3=6$, ואז $12-6=6$.\n\nלעומת זאת, $(12-2)\\times3$: מחשבים קודם את הסוגריים: $12-2=10$, ואז $10\\times3=30$.\n\n<span class='hl-coral'>שימו לב</span> — אותם מספרים ואותן פעולות יכולים לתת תוצאות שונות לגמרי, תלוי בסדר החישוב ובמיקום הסוגריים!",
    "keyFormulas": [
      "כפל וחילוק קודמים לחיבור וחיסור (ללא סוגריים)",
      "ללא סוגריים: פעולות מאותה ׳רמה׳ נפתרות משמאל לימין",
      "עם סוגריים: מה שבתוכם תמיד מחושב ראשון",
      "$12-2\\times3=6$ לעומת $(12-2)\\times3=30$"
    ]
  },
  {
    "id": "g4-fractions-intro",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "שברים",
    "title": "הכרת השברים",
    "description": "שברי יחידה, שברים קטנים מ-1, שברים השווים/גדולים מ-1 ושברים השווים ל-0",
    "sortOrder": 9,
    "explanation": "<span class='hl-teal'>שבר יחידה</span> הוא שבר שהמונה שלו הוא $1$, כמו $\\frac{1}{3}$ או $\\frac{1}{5}$ — הכרות עם שברים אלו היא הבסיס להבנת שברים אחרים.\n\n<span class='hl-teal'>שבר הקטן מ-1</span> שאינו שבר יחידה, כמו $\\frac{3}{5}$, מייצג כמה חלקים משלם שחולק ל-$5$ חלקים שווים — כאן, $3$ מתוך $5$ חלקים.\n\n<div class='diagram-box'><svg viewBox='0 0 220 60' xmlns='http://www.w3.org/2000/svg'><rect x='10' y='10' width='200' height='30' fill='none' stroke='#0d6e6e' stroke-width='2'/><line x1='50' y1='10' x2='50' y2='40' stroke='#0d6e6e' stroke-width='1.5'/><line x1='90' y1='10' x2='90' y2='40' stroke='#0d6e6e' stroke-width='1.5'/><line x1='130' y1='10' x2='130' y2='40' stroke='#0d6e6e' stroke-width='1.5'/><line x1='170' y1='10' x2='170' y2='40' stroke='#0d6e6e' stroke-width='1.5'/><rect x='10' y='10' width='120' height='30' fill='#0d6e6e' opacity='0.3'/><text x='110' y='55' text-anchor='middle' font-size='12' fill='#1a2b3c'>3/5 צבוע</text></svg></div>\n\n<span class='hl-teal'>שברים השווים ל-$1$</span> — כאשר המונה שווה למכנה, כמו $\\frac{5}{5}$, השבר שווה לשלם אחד.\n\n<span class='hl-teal'>שברים הגדולים מ-$1$</span> — כאשר המונה גדול מהמכנה, כמו $\\frac{7}{5}$, השבר מייצג יותר משלם אחד.\n\n<span class='hl-coral'>שברים השווים ל-$0$</span> — כאשר המונה הוא $0$, כמו $\\frac{0}{4}$, השבר שווה ל-$0$ (לא לקחנו אף חלק).\n\nמושגי יסוד: <span class='hl-teal'>שלם, מונה, מכנה, קו שבר</span>.",
    "keyFormulas": [
      "שבר יחידה: מונה $=1$",
      "מונה $=$ מכנה ⟸ השבר שווה $1$",
      "מונה $>$ מכנה ⟸ השבר גדול מ-$1$",
      "מונה $=0$ ⟸ השבר שווה $0$"
    ]
  },
  {
    "id": "g4-fractions-meaning",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "שברים",
    "title": "משמעות השבר: חלק משלם, חלק מכמות ושמות שונים לשבר",
    "description": "שבר כחלק משלם רציף/בדיד, מציאת כמות חלקית, שמות שונים לאותו שבר",
    "sortOrder": 10,
    "explanation": "<span class='hl-teal'>שבר כחלק משלם</span> — השלם יכול להיות <span class='hl-teal'>רציף</span> (כמו עוגה או דף), <span class='hl-teal'>בדיד</span> (כמו קבוצת תפוחים), או מורכב מפריטים לא זהים.\n\n<span class='hl-teal'>שבר כחלק מכמות</span> — מוצאים חלק מכמות על ידי חלוקת הכמות למספר חלקים שווים כמספר המכנה, ובחירת מספר החלקים לפי המונה. חשוב להבחין תמיד בין <span class='hl-coral'>השלם</span>, <span class='hl-coral'>החלק</span> ו<span class='hl-coral'>הכמות המתאימה לחלק</span>.\n\nלדוגמה: המשמעות של $\\frac{1}{5}$ מכ-$15$ כדורים היא חלוקת $15$ הכדורים ל-$5$ חלקים שווים ובחירת חלק אחד מהם: $15:5=3$ כדורים.\n\n<span class='hl-coral'>שימו לב</span> — חצי מכמות אחת אינו שווה בהכרח לחצי מכמות אחרת: חצי מ-$10$ תפוחים ($5$ תפוחים) שונה מחצי מ-$20$ תפוחים ($10$ תפוחים), למרות שבשני המקרים לוקחים \"חצי\".\n\n<span class='hl-teal'>שמות שונים לשבר</span> — לאותו שבר יכולים להיות כמה \"שמות\" (ייצוגים שקולים). למשל, אם שלושה ילדים חילקו חבילת גבינה ואכלו את כולה, אחת האפשרויות היא שכל אחד אכל $\\frac{1}{3}$, אבל יש גם אפשרויות אחרות שבהן החלקים אינם שווים, כל עוד סכומם הוא $1$ שלם.",
    "keyFormulas": [
      "שלם רציף, שלם בדיד, או שלם מפריטים לא זהים",
      "חלק מכמות: מחלקים למספר חלקים כמכנה, ולוקחים כמספר המונה",
      "$\\frac{1}{5}$ מ-$15 = 15:5=3$",
      "אותו שבר יכול להיכתב בכמה \"שמות\" (ייצוגים)"
    ]
  },
  {
    "id": "g4-fractions-compare-numberline",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "שברים",
    "title": "שברים על ישר המספרים והשוואה בין שברים",
    "description": "מיקום שברים קטנים מ-1 על ישר המספרים, והשוואה בין שברים שונים",
    "sortOrder": 11,
    "explanation": "<span class='hl-teal'>שבר כנקודה על ישר המספרים</span> — בשלב זה עוסקים בייצוג נקודתי רק עבור שברים הקטנים מ-$1$ או השווים לו. השבר $\\frac{1}{3}$ ממוקם על הישר בין $0$ ל-$1$, בדיוק בשליש מהמרחק.\n\n<div class='diagram-box'><svg viewBox='0 0 260 50' xmlns='http://www.w3.org/2000/svg'><line x1='20' y1='25' x2='240' y2='25' stroke='#1a2b3c' stroke-width='2'/><circle cx='20' cy='25' r='3' fill='#1a2b3c'/><circle cx='240' cy='25' r='3' fill='#1a2b3c'/><circle cx='93' cy='25' r='4' fill='#c45c48'/><text x='20' y='42' text-anchor='middle' font-size='11' fill='#1a2b3c'>0</text><text x='240' y='42' text-anchor='middle' font-size='11' fill='#1a2b3c'>1</text><text x='93' y='12' text-anchor='middle' font-size='11' fill='#c45c48'>1/3</text></svg></div>\n\n<span class='hl-teal'>השוואה בין שברי יחידה</span>: ככל שהמכנה גדול יותר, השלם מחולק ליותר חלקים, ולכן כל חלק קטן יותר. לכן $\\frac{1}{8}<\\frac{1}{4}$.\n\n<span class='hl-teal'>השוואה בין שברים שאינם בהכרח שברי יחידה</span> נעשית בכמה דרכים: <span class='hl-teal'>השוואה לחצי</span> (בודקים אם כל שבר גדול או קטן מ-$\\frac{1}{2}$), <span class='hl-teal'>השוואה לשלם</span>, ו<span class='hl-teal'>השלמה לשלם</span> (בודקים כמה חסר לכל שבר כדי להשלים לשלם אחד).\n\nלדוגמה, כדי להשוות $\\frac{3}{4}$ ו-$\\frac{7}{8}$: משלימים כל אחד לשלם — ל-$\\frac{3}{4}$ חסר $\\frac{1}{4}$, ול-$\\frac{7}{8}$ חסר רק $\\frac{1}{8}$. מכיוון שחסר פחות ל-$\\frac{7}{8}$, הוא קרוב יותר לשלם, ולכן <span class='hl-coral'>$\\frac{7}{8}>\\frac{3}{4}$</span>.",
    "keyFormulas": [
      "מכנה גדול יותר ⟸ חלק קטן יותר (בשברי יחידה)",
      "דרכי השוואה: לחצי, לשלם, השלמה לשלם",
      "$\\frac{7}{8}>\\frac{3}{4}$ כי חסר פחות ל-$\\frac{7}{8}$ כדי להשלים לשלם"
    ]
  },
  {
    "id": "g4-fractions-ops",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "שברים",
    "title": "שברים פשוטים — פעולות",
    "description": "חיבור וחיסור שברים עם מכנים שווים או שאחד כפולה של השני, מספרים מעורבים, כפל שלם בשבר",
    "sortOrder": 12,
    "explanation": "כדי לחבר או לחסר שברים <span class='hl-teal'>עם אותו מכנה</span>, פשוט מחברים (או מחסרים) את המונים ומשאירים את המכנה: $\\frac{2}{7}+\\frac{3}{7}=\\frac{5}{7}$.\n\n<span class='hl-teal'>מספר מעורב</span> הוא שלם ביחד עם שבר, כמו $2\\frac{1}{3}$ — זה אומר $2$ שלמים ועוד שליש.\n\nכדי לכפול מספר שלם בשבר, כופלים את השלם רק במונה: $3\\times\\frac{2}{5}=\\frac{3\\times 2}{5}=\\frac{6}{5}$.\n\n<span class='hl-teal'>חיבור וחיסור שברים שבהם מכנה אחד הוא כפולה של השני</span> נעשה בעזרת אמצעי המחשה: הופכים את השבר בעל המכנה הקטן לשבר שקול עם המכנה הגדול. למשל, $\\frac{1}{2}+\\frac{1}{4}$: הופכים את $\\frac{1}{2}$ ל-$\\frac{2}{4}$, ואז $\\frac{2}{4}+\\frac{1}{4}=\\frac{3}{4}$.\n\n<span class='hl-teal'>כפל שלם בשבר כחיבור חוזר</span> — $3\\times\\frac{2}{5}$ פירושו $\\frac{2}{5}+\\frac{2}{5}+\\frac{2}{5}=\\frac{6}{5}$, בדיוק כמו שכפל בשלמים הוא חיבור חוזר.\n\n<span class='hl-coral'>משוואות ואי-שוויונות עם שברים</span> יכולים לכלול יותר מפתרון אחד: ב-$1>\\frac{\\square}{5}+\\frac{1}{5}$, למשל, $\\square$ יכול להיות $0,1,2$ או $3$.",
    "keyFormulas": [
      "מכנה משותף: $\\frac{a}{n}+\\frac{b}{n}=\\frac{a+b}{n}$",
      "מספר מעורב: $2\\frac{1}{3}=2+\\frac{1}{3}$",
      "שלם כפול שבר: $k\\times\\frac{a}{b}=\\frac{k\\times a}{b}$",
      "$\\frac{1}{2}+\\frac{1}{4}=\\frac{2}{4}+\\frac{1}{4}=\\frac{3}{4}$",
      "$3\\times\\frac{2}{5}=\\frac{2}{5}+\\frac{2}{5}+\\frac{2}{5}=\\frac{6}{5}$"
    ]
  },
  {
    "id": "g4-decimals-intro",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "שברים עשרוניים — מבוא",
    "description": "הכרת שברים עשרוניים, השוואה וקריאה על ישר המספרים",
    "sortOrder": 21,
    "explanation": "<span class='hl-teal'>שבר עשרוני</span> הוא דרך לכתוב שבר באמצעות נקודה עשרונית, במקום קו שבר. הספרה שאחרי הנקודה מייצגת <span class='hl-teal'>עשיריות</span> ($\\frac{1}{10}$), והספרה שאחריה — <span class='hl-teal'>מאיות</span> ($\\frac{1}{100}$).\n\nלמשל, $0.7$ פירושו $\\frac{7}{10}$, ו-$0.35$ פירושו $\\frac{35}{100}$.\n\nכדי להשוות שברים עשרוניים, משווים תחילה את הספרה שלפני הנקודה, ואז ספרה-ספרה אחרי הנקודה: <span class='hl-coral'>$0.5$ גדול מ-$0.35$</span>, למרות שיש בו פחות ספרות!",
    "keyFormulas": [
      "ספרה ראשונה אחרי הנקודה = עשיריות ($0.1=\\frac{1}{10}$)",
      "ספרה שנייה אחרי הנקודה = מאיות ($0.01=\\frac{1}{100}$)",
      "$0.5=0.50$ — אפס בסוף לא משנה את הערך"
    ]
  },
  {
    "id": "g4-parallel-perpendicular",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "ישרים מקבילים וישרים מאונכים",
    "description": "זיהוי וסרטוט ישרים מקבילים ומאונכים, כולל בצלעות מצולעים",
    "sortOrder": 13,
    "explanation": "<span class='hl-teal'>ישרים מקבילים</span> הם ישרים שלעולם לא ייפגשו, ואין להם אף נקודה משותפת — המרחק ביניהם קבוע תמיד.\n\n<span class='hl-teal'>ישרים מאונכים</span> הם ישרים הנחתכים ויוצרים ביניהם <span class='hl-teal'>זווית ישרה</span> ($90°$).\n\n<div class='diagram-box'><svg viewBox='0 0 260 100' xmlns='http://www.w3.org/2000/svg'><line x1='20' y1='20' x2='120' y2='20' stroke='#0d6e6e' stroke-width='3'/><line x1='20' y1='40' x2='120' y2='40' stroke='#0d6e6e' stroke-width='3'/><text x='70' y='60' text-anchor='middle' font-size='11' fill='#1a2b3c'>מקבילים</text><line x1='180' y1='10' x2='180' y2='90' stroke='#c45c48' stroke-width='3'/><line x1='150' y1='50' x2='240' y2='50' stroke='#c45c48' stroke-width='3'/><text x='195' y='90' text-anchor='middle' font-size='11' fill='#1a2b3c'>מאונכים</text></svg></div>\n\n<span class='hl-coral'>עקרון חשוב</span>: מכל נקודה מחוץ לישר נתון, יש רק <span class='hl-teal'>אנך אחד</span> לישר זה, ורק <span class='hl-teal'>ישר מקביל אחד</span> אליו.\n\nבמצולעים אפשר לזהות <span class='hl-teal'>צלעות מקבילות</span> ו<span class='hl-teal'>צלעות מאונכות</span> — למשל, במלבן יש שני זוגות של צלעות מקבילות, וכל שתי צלעות סמוכות מאונכות זו לזו.",
    "keyFormulas": [
      "מקבילים: אף פעם לא נפגשים, מרחק קבוע ביניהם",
      "מאונכים: נחתכים ויוצרים זווית של $90°$",
      "מכל נקודה — אנך אחד בלבד וישר מקביל אחד בלבד לישר נתון"
    ]
  },
  {
    "id": "g4-diagonals",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "אלכסונים במצולעים",
    "description": "זיהוי וסרטוט אלכסונים במצולעים קמורים ולא קמורים",
    "sortOrder": 14,
    "explanation": "<span class='hl-teal'>אלכסון</span> הוא קטע המחבר שני קודקודים <span class='hl-teal'>שאינם סמוכים</span> באותו מצולע.\n\n<div class='diagram-box'><svg viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'><rect x='30' y='15' width='140' height='70' fill='none' stroke='#0d6e6e' stroke-width='2.5'/><line x1='30' y1='15' x2='170' y2='85' stroke='#c45c48' stroke-width='2' stroke-dasharray='5,3'/><line x1='170' y1='15' x2='30' y2='85' stroke='#c45c48' stroke-width='2' stroke-dasharray='5,3'/><text x='100' y='98' text-anchor='middle' font-size='11' fill='#1a2b3c'>שני אלכסונים במלבן</text></svg></div>\n\nבמשולש <span class='hl-coral'>אין אלכסונים כלל</span> — כל הקודקודים סמוכים זה לזה. במרובע יש $2$ אלכסונים, במחומש יש $5$, ובמשושה יש $9$.\n\nבמצולעים <span class='hl-teal'>קמורים</span>, כל האלכסונים נמצאים בתוך המצולע. במצולעים <span class='hl-teal'>לא קמורים</span>, חלק מהאלכסונים או כולם עשויים להיות מחוץ למצולע.\n\nבחלק מהמצולעים, אלכסון יכול לשמש גם <span class='hl-teal'>ציר סימטריה קווית</span> — למשל, האלכסון של מעוין.",
    "keyFormulas": [
      "אלכסון מחבר שני קודקודים שאינם סמוכים",
      "במשולש: $0$ אלכסונים; במרובע: $2$; במחומש: $5$; במשושה: $9$",
      "במצולע קמור, כל האלכסונים בתוכו; בלא קמור, חלקם עשויים לצאת החוצה"
    ]
  },
  {
    "id": "g4-quadrilaterals",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "מרובעים: תכונות, היקף ושטח",
    "description": "תכונות ריבוע, מלבן, מעוין, מקבילית וטרפז; חישוב היקף ושטח",
    "sortOrder": 15,
    "explanation": "לכל סוג מרובע יש <span class='hl-teal'>תכונות</span> משלו הנוגעות לצלעות, לזוויות, למקבילות, למאונכות, לאלכסונים ולסימטריה:\n\n- <span class='hl-teal'>ריבוע</span>: כל הצלעות שוות, כל הזוויות ישרות, האלכסונים שווים ומאונכים וחוצים זה את זה.\n- <span class='hl-teal'>מלבן</span>: צלעות נגדיות שוות ומקבילות, כל הזוויות ישרות, האלכסונים שווים וחוצים זה את זה.\n- <span class='hl-teal'>מעוין</span>: כל הצלעות שוות, צלעות נגדיות מקבילות, האלכסונים מאונכים וחוצים זה את זה (אך אינם שווים בהכרח).\n- <span class='hl-teal'>מקבילית</span>: שני זוגות צלעות נגדיות מקבילות ושוות, האלכסונים חוצים זה את זה.\n- <span class='hl-teal'>טרפז</span>: זוג אחד בלבד של צלעות מקבילות.\n\n<span class='hl-coral'>שימו לב</span> — יש להתייחס לתכונות המשותפות בין המרובעים ולא ליחסי הכלה ביניהם (למשל, לא עוסקים בשאלה \"האם כל ריבוע הוא מלבן?\").\n\n<span class='hl-teal'>היקף מרובע</span> הוא סכום כל צלעותיו. <span class='hl-teal'>שטח מלבן</span> (וריבוע כמקרה פרטי) מחושב לפי אורך כפול רוחב.\n\n<div class='diagram-box'><svg viewBox='0 0 200 90' xmlns='http://www.w3.org/2000/svg'><rect x='30' y='15' width='140' height='60' fill='none' stroke='#0d6e6e' stroke-width='2.5'/><text x='100' y='10' text-anchor='middle' font-size='11' fill='#1a2b3c'>אורך</text><text x='15' y='48' text-anchor='middle' font-size='11' fill='#1a2b3c' transform='rotate(-90 15 48)'>רוחב</text></svg></div>",
    "keyFormulas": [
      "היקף מרובע $=$ סכום כל הצלעות",
      "היקף ריבוע $= 4\\times$ צלע",
      "היקף מלבן $=2\\times(\\text{אורך}+\\text{רוחב})$",
      "שטח מלבן $=$ אורך $\\times$ רוחב; שטח ריבוע $=$ צלע$^2$"
    ]
  },
  {
    "id": "g4-length-units",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "מעבר בין יחידות אורך",
    "description": "קילומטר, מטר, דצימטר, סנטימטר ומילימטר; אומדן מדידה וסרטוט",
    "sortOrder": 16,
    "explanation": "יחידות האורך מסודרות מהגדולה לקטנה: <span class='hl-teal'>קילומטר (ק\"מ) → מטר (מ') → דצימטר (דצ\"מ) → סנטימטר (ס\"מ) → מילימטר (מ\"מ)</span>.\n\nבכיתה ד' עוברים בין יחידות <span class='hl-teal'>\"קרובות\"</span> בלבד — ממטר לק\"מ, ממטר לס\"מ, מדצ\"מ לס\"מ וכן הלאה, אך לא ישירות מק\"מ למ\"מ.\n\n<span class='hl-teal'>אומדן אורך</span> חשוב בחיי היום-יום — למשל, גובה דלת כניסה לכיתה סביר שיהיה בסביבות $200$ ס\"מ, לא $2$ ק\"מ ולא $20$ מ'.\n\nמדידה וסרטוט מדויקים של קטעים נעשים באמצעות <span class='hl-teal'>סרגל</span>, בס\"מ ובמ\"מ.",
    "keyFormulas": [
      "סדר יחידות: ק\"מ $\\to$ מ' $\\to$ דצ\"מ $\\to$ ס\"מ $\\to$ מ\"מ",
      "$1$ ק\"מ $=1{,}000$ מ'",
      "$1$ מ' $=100$ ס\"מ",
      "$1$ ס\"מ $=10$ מ\"מ"
    ]
  },
  {
    "id": "g4-boxes-surface-area",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "תיבות — שטח פנים",
    "description": "מבנה התיבה, המושגים קודקוד/מקצוע/פאה, וחישוב שטח פנים",
    "sortOrder": 17,
    "explanation": "<span class='hl-teal'>תיבה</span> היא גוף תלת-ממדי בעל $6$ פאות מלבניות (מקרה פרטי: <span class='hl-teal'>קובייה</span>, שבה כל הפאות ריבועים זהים). המושגים המרכזיים: <span class='hl-teal'>קודקוד</span> (נקודת מפגש), <span class='hl-teal'>מקצוע</span> (קו מפגש בין שתי פאות) ו<span class='hl-teal'>פאה</span> (המשטח השטוח).\n\n<span class='hl-teal'>שטח הפנים</span> של תיבה הוא סכום שטחי כל $6$ הפאות שלה. בתיבה יש $3$ זוגות פאות זהות, כך שמספיק לחשב את שטח $3$ פאות שונות ולהכפיל כל אחת פי $2$.\n\n<div class='diagram-box'><svg viewBox='0 0 200 130' xmlns='http://www.w3.org/2000/svg'><g stroke='#0d6e6e' stroke-width='2' fill='#0d6e6e' fill-opacity='0.12'><rect x='60' y='10' width='40' height='30'/><rect x='20' y='40' width='40' height='30'/><rect x='60' y='40' width='40' height='30'/><rect x='100' y='40' width='40' height='30'/><rect x='60' y='70' width='40' height='30'/></g><text x='90' y='115' text-anchor='middle' font-size='10' fill='#1a2b3c'>פריסת תיבה — 6 פאות</text></svg></div>\n\nלדוגמה, בתיבה שאורכה $5$, רוחבה $3$ וגובהה $2$: יש זוג פאות $5\\times3$, זוג פאות $5\\times2$, וזוג פאות $3\\times2$. שטח הפנים: $2\\times(5\\times3)+2\\times(5\\times2)+2\\times(3\\times2)=30+20+12=62$.\n\nאפשר לחשב שטח פנים גם מתוך <span class='hl-teal'>סרטוט של תיבה או פריסה</span>, וגם מתוך <span class='hl-teal'>נתונים מספריים בלבד</span> ללא סרטוט.",
    "keyFormulas": [
      "שטח פנים תיבה $=2\\times(\\text{אורך}\\times\\text{רוחב})+2\\times(\\text{אורך}\\times\\text{גובה})+2\\times(\\text{רוחב}\\times\\text{גובה})$",
      "בתיבה יש $3$ זוגות פאות זהות",
      "דוגמה: תיבה $5\\times3\\times2$ — שטח פנים $=62$"
    ]
  },
  {
    "id": "g4-time-measurement",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "מדידת זמן",
    "title": "מדידת זמן: לוח שנה וחישובי זמן",
    "description": "לוח השנה הלועזי והעברי, חישובי זמן בחודשים, בשבועות ובימים",
    "sortOrder": 18,
    "explanation": "יש להכיר את <span class='hl-teal'>לוח השנה הלועזי</span> ($12$ חודשים, כ-$365$ ימים בשנה) ואת <span class='hl-teal'>לוח השנה העברי</span> (מבוסס על מחזור הירח, עם חודש עיבור בשנה מעוברת).\n\n<span class='hl-teal'>חישובי זמן</span> דורשים תשומת לב מיוחדת כי היחידות אינן עשרוניות: יש $7$ ימים בשבוע, ולא $10$ חודשים בשנה שכל אחד מהם באותו אורך.\n\nלדוגמה, כדי לחשב כמה ימים יש ב-$3$ שבועות ועוד $4$ ימים: $3\\times7+4=25$ ימים.\n\n<span class='hl-coral'>שימו לב</span> — כדי לדעת כמה שבועות וימים יש ב-$25$ ימים, מחלקים ב-$7$: $25:7=3$ שארית $4$, כלומר $3$ שבועות ו-$4$ ימים.\n\nבחישובי זמן בין תאריכים, חשוב לשים לב לאורך כל חודש (יש חודשים בני $28$-$31$ ימים).",
    "keyFormulas": [
      "$1$ שבוע $=7$ ימים",
      "$3$ שבועות $+4$ ימים $=3\\times7+4=25$ ימים",
      "הפיכת ימים לשבועות וימים: מחלקים ב-$7$ עם שארית"
    ]
  },
  {
    "id": "g4-data-tables-bars",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "חקר נתונים",
    "title": "טבלאות ודיאגרמת עמודות",
    "description": "קריאה ואיסוף נתונים בטבלה ובדיאגרמת עמודות, כולל דיאגרמת עמודות כפולה",
    "sortOrder": 19,
    "explanation": "<span class='hl-teal'>טבלת נתונים</span> מארגנת מידע בשורות ובעמודות — כדי למצוא ערך מסוים, מאתרים את השורה והעמודה המתאימות ומוצאים את הערך בנקודת המפגש.\n\n<span class='hl-teal'>דיאגרמת עמודות</span> מציגה נתונים בעזרת עמודות — ככל שהעמודה גבוהה יותר, הכמות גדולה יותר.\n\n<div class='diagram-box'>\n<svg viewBox='0 0 220 110' xmlns='http://www.w3.org/2000/svg'>\n<line x1='20' y1='90' x2='210' y2='90' stroke='#1a2b3c' stroke-width='2'/>\n<line x1='20' y1='90' x2='20' y2='10' stroke='#1a2b3c' stroke-width='2'/>\n<rect x='40' y='55' width='30' height='35' fill='#0d6e6e' opacity='0.6'/>\n<rect x='90' y='30' width='30' height='60' fill='#0d6e6e' opacity='0.6'/>\n<rect x='140' y='65' width='30' height='25' fill='#0d6e6e' opacity='0.6'/>\n<text x='55' y='103' text-anchor='middle' font-size='10' fill='#1a2b3c'>כיתה א</text>\n<text x='105' y='103' text-anchor='middle' font-size='10' fill='#1a2b3c'>כיתה ב</text>\n<text x='155' y='103' text-anchor='middle' font-size='10' fill='#1a2b3c'>כיתה ג</text>\n</svg>\n</div>\n\n<span class='hl-teal'>דיאגרמת עמודות כפולה</span> מאפשרת להשוות שתי קבוצות נתונים באותו גרף (למשל, תוצאות שני סקרים או שתי כיתות).\n\n<span class='hl-coral'>זהירות מהטיות</span> — כדאי לשים לב אם הציר האנכי של דיאגרמת עמודות <span class='hl-coral'>לא מתחיל מ-$0$</span>, כי זה עלול לגרום להבדלים להיראות גדולים או קטנים מכפי שהם באמת.\n\n<span class='hl-teal'>איסוף וארגון נתונים</span> — אפשר לאסוף מידע רלוונטי (שאלון, תצפית) ואז לארגן אותו בטבלה ולהציג אותו בדיאגרמה מתאימה.",
    "keyFormulas": [
      "בטבלה: ערך נמצא במפגש שורה-עמודה",
      "עמודה גבוהה יותר = כמות גדולה יותר",
      "דיאגרמת עמודות כפולה משווה שתי קבוצות נתונים",
      "בדקו אם הציר האנכי מתחיל ב-$0$ כדי לא להיטעות"
    ]
  },
  {
    "id": "g4-data-pictograph-pie",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "חקר נתונים",
    "title": "פיקטוגרם ודיאגרמת עוגה",
    "description": "קריאה ובנייה של פיקטוגרם, וקריאת נתונים מדיאגרמת עוגה",
    "sortOrder": 20,
    "explanation": "<span class='hl-teal'>פיקטוגרם</span> מציג נתונים באמצעות סמלים חוזרים, כאשר כל סמל מייצג כמות קבועה (למשל, סמל אחד $=10$ בקבוקים). כדי לקרוא פיקטוגרם, סופרים את הסמלים ומכפילים בערך שכל סמל מייצג — וגם שמים לב לחצאי סמלים.\n\n<div class='diagram-box'><svg viewBox='0 0 220 70' xmlns='http://www.w3.org/2000/svg'><g font-size='20' fill='#0d6e6e'><text x='20' y='30'>🍎🍎🍎</text><text x='20' y='58'>🍎🍎</text></g><text x='150' y='45' font-size='11' fill='#1a2b3c'>🍎 = 10 פירות</text></svg></div>\n\n<span class='hl-teal'>דיאגרמת עוגה</span> מציגה מידע על <span class='hl-teal'>חלוקת השלם</span> — כל \"פרוסה\" מייצגת שבר או אחוז מהשלם הכולל. ככל שהפרוסה גדולה יותר, החלק שהיא מייצגת גדול יותר.\n\n<span class='hl-coral'>שימו לב</span> — מדיאגרמת עוגה אפשר לדעת <span class='hl-coral'>איזה חלק</span> (יחסי) מקבל כל קטגוריה, אבל כדי לדעת את <span class='hl-coral'>הכמות המדויקת</span> צריך גם לדעת את סך כל הנתונים. למשל, אם ידוע ש-$60$ תלמידים הצביעו \"בעד\" וזה מהווה חצי מהעוגה, אז סך הכול השתתפו $120$ תלמידים במשאל.\n\nההבדל בין הדיאגרמות: <span class='hl-teal'>דיאגרמת עוגה</span> מציגה חלוקת שלם, ואילו <span class='hl-teal'>דיאגרמת עמודות</span> מציגה שכיחויות של ערכים שונים.",
    "keyFormulas": [
      "בפיקטוגרם: סופרים סמלים ומכפילים בערך שכל סמל מייצג",
      "דיאגרמת עוגה מציגה חלוקה יחסית (שברים/אחוזים) של השלם",
      "כדי למצוא כמות מדויקת מעוגה, צריך גם את הסך הכול"
    ]
  },
  {
    "id": "g4-median-average",
    "grade": 4,
    "units": null,
    "track": null,
    "cluster": "חקר נתונים",
    "title": "ממוצע וחציון (העשרה)",
    "description": "חישוב ממוצע וחציון של קבוצת נתונים (העשרה מעבר לתוכנית הרשמית)",
    "sortOrder": 22,
    "explanation": "<span class='hl-teal'>ממוצע</span> הוא דרך לתאר \"ערך טיפוסי\" של קבוצת נתונים: מחברים את כל המספרים ומחלקים בכמות המספרים.\n\nלדוגמה, ממוצע של $2,3,10,22,23$: הסכום הוא $60$, ומחלקים ב-$5$ (מספר הנתונים): $60:5=12$.\n\n<span class='hl-teal'>חציון</span> הוא הערך <span class='hl-teal'>האמצעי בדיוק</span> ברשימה ממוינת מהקטן לגדול. לדוגמה, בחציון של $10,12,19,21,24$ — המספרים כבר ממוינים, והערך האמצעי הוא $19$.\n\n<span class='hl-coral'>הערה</span>: נושא זה הוא העשרה מעבר לתוכנית הלימודים הרשמית של כיתה ד', אך שימושי להיכרות מוקדמת עם חקר נתונים.",
    "keyFormulas": [
      "ממוצע $=$ סכום המספרים $\\div$ כמות המספרים",
      "חציון $=$ הערך האמצעי ברשימה ממוינת",
      "לפני מציאת חציון, תמיד ממיינים את המספרים"
    ]
  },
  {
    "id": "g5-fractions-adv",
    "grade": 5,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "שברים פשוטים — הרחבה",
    "description": "צמצום והרחבה, חיבור וחיסור, שברים גדולים מ-1",
    "sortOrder": 5,
    "explanation": "כדי לחבר או לחסר שני שברים, <span class='hl-coral'>חובה שיהיה להם אותו מכנה</span> — אי אפשר לחבר \"שלישים\" עם \"רבעים\" ישירות, בדיוק כמו שאי אפשר לחבר תפוחים עם בננות בלי לקרוא לשניהם \"פירות\".\n\n**הרחבת שבר** — הופכים שבר לשבר שווה-ערך עם מכנה גדול יותר, על ידי הכפלת המונה והמכנה **באותו מספר**: $\\frac{1}{3}=\\frac{1\\times2}{3\\times2}=\\frac{2}{6}$.\n\n**צמצום שבר** — הפעולה ההפוכה: מחלקים מונה ומכנה באותו מספר כדי לקבל שבר \"פשוט\" יותר עם אותו ערך בדיוק: $\\frac{6}{8}=\\frac{6\\div2}{8\\div2}=\\frac{3}{4}$.\n\n**איך מוצאים מכנה משותף לחיבור/חיסור:**\n1. מחפשים מספר שגם המכנה הראשון וגם השני \"נכנסים\" בו (למשל, ל-$3$ ול-$4$ — המספר $12$).\n2. מרחיבים כל שבר למכנה המשותף הזה.\n3. מחברים/מחסרים את המונים בלבד, והמכנה נשאר.\n\n<span class='hl-teal'>שבר גדול מ-$1$</span> (כמו $\\frac{7}{4}$) נקרא **שבר מדומה** — המונה גדול מהמכנה. אפשר לכתוב אותו גם כ**מספר מעורב**: $\\frac{7}{4}=1\\frac{3}{4}$.",
    "keyFormulas": [
      "הרחבה: $\\frac{a}{b}=\\frac{a\\times k}{b\\times k}$",
      "צמצום: $\\frac{a}{b}=\\frac{a\\div k}{b\\div k}$",
      "חיבור/חיסור עם מכנה משותף: $\\frac{a}{c}\\pm\\frac{b}{c}=\\frac{a\\pm b}{c}$",
      "שבר מדומה: מונה $>$ מכנה, למשל $\\frac{7}{4}=1\\frac{3}{4}$"
    ]
  },
  {
    "id": "g5-decimals-ops",
    "grade": 5,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "שברים עשרוניים — פעולות",
    "description": "חיבור, חיסור, השוואה, עיגול ומעבר לשבר פשוט",
    "sortOrder": 7,
    "explanation": "חיבור וחיסור של שברים עשרוניים דומים בדיוק לחיבור וחיסור רגיל — רק שצריך <span class='hl-coral'>ליישר את הנקודות העשרוניות זו מתחת לזו</span> לפני שמתחילים, כדי שכל ספרה תיפגש עם הספרה שבאותו מקום (עשיריות מול עשיריות, מאיות מול מאיות).\n\n<div class='diagram-box'><svg viewBox='0 0 220 100' xmlns='http://www.w3.org/2000/svg'><text x='30' y='35' font-size='20' fill='#1a2b3c' font-family='monospace'>3.40</text><text x='30' y='65' font-size='20' fill='#1a2b3c' font-family='monospace'>+1.25</text><line x1='20' y1='75' x2='120' y2='75' stroke='#0d6e6e' stroke-width='2'/><text x='30' y='95' font-size='20' fill='#c45c48' font-family='monospace'>4.65</text></svg></div>\n\n**השוואת שברים עשרוניים** — משווים ספרה-ספרה מהשמאל: קודם השלמים, ואז העשיריות, ואז המאיות. <span class='hl-success'>שימו לב</span>: $0.5$ גדול מ-$0.35$, למרות שיש בו פחות ספרות! זה כי $0.5=0.50$, ו-$50$ מאיות גדול מ-$35$ מאיות.\n\n**עיגול שבר עשרוני** — מסתכלים בספרה שאחרי מקום העיגול: אם היא $5$ ומעלה, מעגלים למעלה; אם היא $4$ ומטה, משאירים כמו שהוא.\n\n**מעבר לשבר פשוט** — קוראים את השבר העשרוני לפי שמו: $0.35$ הוא \"$35$ מאיות\", כלומר $\\frac{35}{100}$, שאפשר לצמצם ל-$\\frac{7}{20}$.",
    "keyFormulas": [
      "ליישר נקודות עשרוניות לפני חיבור/חיסור",
      "עיגול: ספרה $\\geq5$ — מעלים; ספרה $<5$ — משאירים",
      "$0.5=0.50=0.500$ (אפסים בסוף לא משנים ערך)",
      "$0.35=\\frac{35}{100}=\\frac{7}{20}$ (אחרי צמצום)"
    ]
  },
  {
    "id": "g5-mul-div-adv",
    "grade": 5,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "ארבע פעולות החשבון עד מיליון",
    "description": "חיבור, חיסור, כפל וחילוק במספרים גדולים, עיגול ואומדן, ותרגילים רב-שלביים",
    "sortOrder": 2,
    "explanation": "עם מספרים גדולים, ארבע פעולות החשבון עובדות **בדיוק לפי אותם כללים** שלמדתם עם מספרים קטנים — רק שיש יותר ספרות לטפל בהן.\n\n**סדר הפעולות** (חשוב מאוד בתרגיל עם כמה פעולות):\n1. קודם כל — מה שבתוך <span class='hl-teal'>סוגריים</span>.\n2. אחר כך — <span class='hl-teal'>כפל וחילוק</span> (לפי הסדר משמאל לימין).\n3. לבסוף — <span class='hl-teal'>חיבור וחיסור</span>.\n\n**בדיקת התוצאה בעזרת הפעולה ההפוכה** — דרך מצוינת לוודא שלא טעיתם:\n- חיבור נבדק בחיסור: אם $350+120=470$, אז $470-120$ צריך לתת $350$.\n- כפל נבדק בחילוק: אם $25\\times4=100$, אז $100\\div4$ צריך לתת $25$.\n\n**חילוק עם שארית** — לפעמים מספר לא מתחלק \"בדיוק\". למשל $17\\div5$: נכנס $3$ פעמים ($15$), ונשארת <span class='hl-coral'>שארית $2$</span>. בודקים: $3\\times5+2=17$ ✓.\n\n<span class='hl-success'>אומדן לפני חישוב</span>: מעגלים את המספרים למספרים \"עגולים\" וקרובים, ומחשבים בערך — זה עוזר לבדוק אם התוצאה המדויקת הגיונית.",
    "keyFormulas": [
      "סדר פעולות: סוגריים ← כפל/חילוק ← חיבור/חיסור",
      "בדיקת חיבור: $a+b=c\\Rightarrow c-b=a$",
      "בדיקת כפל: $a\\times b=c\\Rightarrow c\\div b=a$",
      "חילוק עם שארית: מנה $\\times$ מחלק $+$ שארית $=$ מחולק"
    ]
  },
  {
    "id": "g5-geometry",
    "grade": 5,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "שטח, היקף ונפח",
    "description": "נוסחאות שטח/היקף, נפח תיבה ושטח פנים",
    "sortOrder": 10,
    "explanation": "<span class='hl-teal'>נפח</span> אומר כמה \"מקום\" יש בתוך גוף תלת-ממדי — כמה קוביות קטנות (של $1\\times1\\times1$) יכולות להיכנס לתוכו.\n\n<div class='diagram-box'><svg viewBox='0 0 220 150' xmlns='http://www.w3.org/2000/svg'><polygon points='40,110 40,50 100,30 160,50 160,110 100,130' fill='#0d6e6e' fill-opacity='0.15' stroke='#0d6e6e' stroke-width='2'/><line x1='40' y1='50' x2='100' y2='30' stroke='#0d6e6e' stroke-width='2'/><line x1='100' y1='30' x2='160' y2='50' stroke='#0d6e6e' stroke-width='2'/><line x1='100' y1='30' x2='100' y2='90' stroke='#0d6e6e' stroke-width='2' stroke-dasharray='4'/><text x='60' y='135' font-size='12' fill='#1a2b3c'>אורך</text><text x='150' y='135' font-size='12' fill='#1a2b3c'>רוחב</text><text x='15' y='85' font-size='12' fill='#1a2b3c'>גובה</text></svg></div>\n\n**נפח תיבה** מחושב על ידי הכפלת <span class='hl-teal'>שלושת המידות</span> שלה זו בזו: אורך, רוחב וגובה. למשל, תיבה של $5\\times3\\times2$ מכילה $5\\times3\\times2=30$ קוביות יחידה.\n\n**שטח הפנים** של תיבה הוא סכום השטחים של <span class='hl-teal'>כל שש הפאות</span> שלה — שני זוגות של פאות זהות (למעלה-למטה, קדימה-אחורה, ימין-שמאל).\n\n<span class='hl-success'>טיפ</span>: אל תתבלבלו בין נפח (מקום בתוך הגוף, ביחידות \"מעוקבות\") לבין שטח פנים (עטיפה חיצונית, ביחידות \"רבועות\").",
    "keyFormulas": [
      "נפח תיבה $=$ אורך $\\times$ רוחב $\\times$ גובה",
      "שטח פני תיבה $=2\\times(\\text{אורך}\\times\\text{רוחב}+\\text{אורך}\\times\\text{גובה}+\\text{רוחב}\\times\\text{גובה})$",
      "היקף מלבן $=2\\times(\\text{אורך}+\\text{רוחב})$",
      "שטח מלבן $=$ אורך $\\times$ רוחב"
    ]
  },
  {
    "id": "g5-data",
    "grade": 5,
    "units": null,
    "track": null,
    "cluster": "חקר נתונים",
    "title": "חקר נתונים וממוצע",
    "description": "פירוש נתונים, שכיחויות וממוצע",
    "sortOrder": 11,
    "explanation": "כשאוספים הרבה מידע, מציגים אותו בדרכים חזותיות שקל לקרוא: <span class='hl-teal'>טבלה</span>, <span class='hl-teal'>דיאגרמת עמודות</span> (עמודות בגבהים שונים) או <span class='hl-teal'>דיאגרמת עוגה</span> (עיגול המחולק לפי חלקים).\n\n<div class='diagram-box'><svg viewBox='0 0 260 110' xmlns='http://www.w3.org/2000/svg'><line x1='20' y1='90' x2='120' y2='90' stroke='#1a2b3c' stroke-width='2'/><line x1='20' y1='90' x2='20' y2='10' stroke='#1a2b3c' stroke-width='2'/><rect x='35' y='55' width='22' height='35' fill='#0d6e6e' opacity='0.6'/><rect x='65' y='30' width='22' height='60' fill='#0d6e6e' opacity='0.6'/><rect x='95' y='65' width='22' height='25' fill='#0d6e6e' opacity='0.6'/><circle cx='195' cy='50' r='40' fill='none' stroke='#0d6e6e' stroke-width='2'/><path d='M195,50 L195,10 A40,40 0 0 1 230,70 Z' fill='#c45c48' opacity='0.4'/></svg></div>\n\n**שכיחות** — כמה פעמים ערך מסוים מופיע בנתונים. ה**שכיח** הוא הערך עם השכיחות הגבוהה ביותר — זה שמופיע הכי הרבה פעמים.\n\n**ממוצע** — מחשבים אותו כך:\n1. מחברים את **כל** הערכים יחד.\n2. מחלקים בסכום ב**מספר** הערכים.\n\nלמשל, ממוצע הציונים $80,90,70$ הוא $\\dfrac{80+90+70}{3}=\\dfrac{240}{3}=80$.\n\n<span class='hl-success'>שימו לב</span>: הממוצע תמיד נמצא בין הערך הקטן ביותר לגדול ביותר, אבל הוא לא חייב להיות אחד המספרים המקוריים.",
    "keyFormulas": [
      "ממוצע $=\\dfrac{\\text{סכום הערכים}}{\\text{מספר הערכים}}$",
      "שכיח $=$ הערך שמופיע הכי הרבה פעמים",
      "בדיאגרמת עמודות: עמודה גבוהה יותר = כמות גדולה יותר"
    ]
  },
  {
    "id": "g5-numbers-million",
    "grade": 5,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "הכרת המספרים עד מיליון ומעבר לו",
    "description": "מבנה עשרוני, קריאה וכתיבה, סדר והשוואה של מספרים גדולים",
    "sortOrder": 1,
    "explanation": "ככל שמתקדמים במספר <span class='hl-teal'>מימין לשמאל</span>, כל מקום שווה **פי $10$** מהמקום שלפניו: יחידות, עשרות, מאות, אלפים, עשרות-אלפים, מאות-אלפים, ומיליונים.\n\n<div class='diagram-box'><svg viewBox='0 0 300 70' xmlns='http://www.w3.org/2000/svg'><g font-size='11' fill='#1a2b3c' text-anchor='middle'><text x='30' y='20'>מיליונים</text><text x='90' y='20'>מאות אלפים</text><text x='150' y='20'>עשרות אלפים</text><text x='210' y='20'>אלפים</text><text x='270' y='20'>מאות|עשרות|יחידות</text></g><g font-family='monospace' font-size='22' fill='#0d6e6e' text-anchor='middle'><text x='30' y='50'>2</text><text x='90' y='50'>4</text><text x='150' y='50'>3</text><text x='210' y='50'>7</text><text x='270' y='50'>158</text></g></svg></div>\n\nהמספר בדיאגרמה נקרא $2{,}437{,}158$ — שני מיליון, ארבע מאות שלושים ושבעה אלף, מאה חמישים ושמונה.\n\n**איך משווים בין שני מספרים גדולים:**\n1. מי שיש לו <span class='hl-teal'>יותר ספרות</span> — הוא הגדול יותר (אם אין אפסים מובילים).\n2. אם יש להם אותו מספר ספרות, משווים **ספרה מול ספרה, מהשמאל**, וברגע שמוצאים הבדל — המספר עם הספרה הגדולה יותר הוא הגדול יותר.\n\nלמשל: $2{,}437{,}158$ לעומת $2{,}435{,}900$ — שתי הספרות הראשונות זהות ($2,4$), אבל בספרה השלישית $7>5$, אז $2{,}437{,}158$ גדול יותר.",
    "keyFormulas": [
      "סדר המקומות (מימין לשמאל): יחידות, עשרות, מאות, אלפים, עשרות-אלפים, מאות-אלפים, מיליונים",
      "כל מקום $=$ פי $10$ מהמקום שמימינו",
      "$1{,}000{,}000=1{,}000\\times1{,}000$",
      "השוואת מספרים: קודם לפי מספר הספרות, ואז ספרה-ספרה משמאל"
    ]
  },
  {
    "id": "g5-primes",
    "grade": 5,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "מספרים ראשוניים ומספרים פריקים",
    "description": "זיהוי מספרים ראשוניים, פירוק לגורמים וסימני התחלקות",
    "sortOrder": 3,
    "explanation": "**מספר ראשוני** הוא מספר טבעי גדול מ-$1$ שיש לו <span class='hl-teal'>בדיוק שני מחלקים</span>: המספר $1$ ואת עצמו. לדוגמה, $7$ ראשוני — הוא מתחלק רק ב-$1$ וב-$7$.\n\n**מספר פריק** הוא מספר עם <span class='hl-teal'>יותר משני מחלקים</span>. לדוגמה, $12$ פריק — הוא מתחלק ב-$1,2,3,4,6,12$.\n\n<span class='hl-coral'>המספר $1$ מיוחד</span> — הוא לא ראשוני ולא פריק, כי יש לו רק מחלק אחד (את עצמו).\n\n**איך בודקים אם מספר הוא ראשוני**: מנסים לחלק אותו במספרים הראשוניים הקטנים $2,3,5,7...$ אם אף אחד לא נכנס בו בדיוק (עד שמגיעים בערך לשורש שלו) — הוא ראשוני.\n\n**סימני התחלקות שימושיים** (בלי לחלק בפועל!):\n- מתחלק ב-$2$ אם הספרה האחרונה **זוגית** ($0,2,4,6,8$).\n- מתחלק ב-$5$ אם הספרה האחרונה היא $0$ או $5$.\n- מתחלק ב-$3$ אם **סכום הספרות** מתחלק ב-$3$ (למשל $123$: $1+2+3=6$, מתחלק ב-$3$).\n\n**פירוק לגורמים ראשוניים** — כותבים מספר פריק כמכפלה של מספרים ראשוניים בלבד: $12=2\\times2\\times3$.",
    "keyFormulas": [
      "ראשוני: בדיוק $2$ מחלקים ($1$ ועצמו) — למשל $2,3,5,7,11,13$",
      "פריק: יותר מ-$2$ מחלקים",
      "סימן ל-$2$: ספרה אחרונה זוגית | סימן ל-$5$: ספרה אחרונה $0$ או $5$ | סימן ל-$3$: סכום ספרות מתחלק ב-$3$",
      "פירוק לגורמים: $12=2\\times2\\times3$"
    ]
  },
  {
    "id": "g5-fractions-meaning",
    "grade": 5,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "שברים — משמעות וייצוגים",
    "description": "שבר כמנה, כחלק משלם וכחלק מכמות, מספרים מעורבים וישר המספרים",
    "sortOrder": 4,
    "explanation": "שבר יכול לייצג כמה דברים שונים — וחשוב להכיר את כולם:\n\n**1. שבר כתוצאת חילוק** — $\\frac{3}{4}$ הוא בדיוק $3\\div4$. אם מחלקים $3$ פיצות בין $4$ ילדים בשווה, כל ילד מקבל $\\frac{3}{4}$ פיצה.\n\n**2. שבר כחלק משלם אחד** — כמו חצי עוגה: מחלקים עיגול אחד ל-$2$ חלקים שווים ולוקחים אחד מהם.\n\n**3. שבר כחלק מכמות** — $\\frac{2}{5}$ מקבוצה של $20$ ילדים: מחלקים ל-$5$ קבוצות שוות ($20\\div5=4$), ולוקחים $2$ קבוצות כאלה ($2\\times4=8$ ילדים).\n\n**שבר מדומה** (מונה $\\geq$ מכנה, כמו $\\frac{9}{4}$) אפשר להפוך ל<span class='hl-teal'>מספר מעורב</span>: מחלקים את המונה במכנה — המנה היא השלם, והשארית היא המונה החדש: $9\\div4=2$ שארית $1$, כלומר $\\frac{9}{4}=2\\frac{1}{4}$.\n\n**מספר מעורב לשבר מדומה** (הפעולה ההפוכה): $2\\frac{1}{4}=\\dfrac{(2\\times4)+1}{4}=\\dfrac{9}{4}$.\n\n<span class='hl-success'>טיפ</span>: כל השברים האלה אפשר גם למקם על ישר המספרים — $\\frac{9}{4}$ נמצא בין $2$ ל-$3$, קרוב יותר ל-$2$.",
    "keyFormulas": [
      "שבר כמנה: $\\frac{a}{b}=a\\div b$",
      "שבר מתוך כמות $N$: $\\frac{a}{b}$ מ-$N$ $=(N\\div b)\\times a$",
      "שבר מדומה ← מספר מעורב: מחלקים מונה במכנה",
      "מספר מעורב ← שבר מדומה: $\\text{שלם}\\frac{a}{b}=\\dfrac{(\\text{שלם}\\times b)+a}{b}$"
    ]
  },
  {
    "id": "g5-decimals-intro",
    "grade": 5,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "שברים עשרוניים — הכרה ומבנה",
    "description": "קשר לשברים עם מכנה חזקה של 10, הגדלה/הקטנה פי 10/100/1000 והשוואה",
    "sortOrder": 6,
    "explanation": "שבר עשרוני הוא דרך נוספת לכתוב שבר — כשהמכנה שלו הוא $10$, $100$ או $1{,}000$ — באמצעות נקודה עשרונית במקום קו שבר.\n\n<div class='diagram-box'><svg viewBox='0 0 240 60' xmlns='http://www.w3.org/2000/svg'><g font-family='monospace' font-size='22' fill='#1a2b3c'><text x='20' y='38'>0</text><text x='38' y='38' fill='#c45c48'>.</text><text x='55' y='38' fill='#0d6e6e'>3</text><text x='85' y='38' fill='#0d6e6e'>5</text></g><g font-size='11' fill='#1a2b3c'><text x='55' y='55' text-anchor='middle'>עשיריות</text><text x='85' y='55' text-anchor='middle'>מאיות</text></g></svg></div>\n\nכל ספרה אחרי הנקודה שווה <span class='hl-teal'>עשירית</span> מהספרה שלפניה: הראשונה היא **עשיריות** ($\\frac{1}{10}$), השנייה **מאיות** ($\\frac{1}{100}$), השלישית **אלפיות** ($\\frac{1}{1000}$).\n\n**כפל וחילוק ב-$10,100,1000$ — קסם של הזזת נקודה:**\n- כפל ב-$10$ → הנקודה זזה <span class='hl-teal'>ימינה</span> מקום אחד: $3.4\\times10=34$.\n- חילוק ב-$10$ → הנקודה זזה <span class='hl-teal'>שמאלה</span> מקום אחד: $3.4\\div10=0.34$.\n\n<span class='hl-success'>שימושי לדעת</span>: $100$ ס\"מ $=1$ מטר, ו-$1{,}000$ מטר $=1$ ק\"מ — בדיוק אותו עיקרון של הזזת נקודה עשרונית.",
    "keyFormulas": [
      "עשירית: $0.1=\\frac{1}{10}$",
      "מאית: $0.01=\\frac{1}{100}$",
      "אלפית: $0.001=\\frac{1}{1000}$",
      "כפל ב-$10/100/1000$: נקודה זזה ימינה $1/2/3$ מקומות",
      "חילוק ב-$10/100/1000$: נקודה זזה שמאלה $1/2/3$ מקומות"
    ]
  },
  {
    "id": "g5-geometry-triangle",
    "grade": 5,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "משולשים — גובה, שטח והיקף",
    "description": "סוגי משולשים, חישוב שטח והיקף וזיהוי גובה במשולש",
    "sortOrder": 8,
    "explanation": "בכל משולש, ה**גובה** הוא הקטע המאונך (בזווית $90°$) מקודקוד אל הצלע שמולו — או אל <span class='hl-coral'>המשך</span> אותה צלע, אם צריך.\n\n<div class='diagram-box'><svg viewBox='0 0 300 110' xmlns='http://www.w3.org/2000/svg'><polygon points='20,95 90,95 55,20' fill='none' stroke='#0d6e6e' stroke-width='2.5'/><line x1='55' y1='95' x2='55' y2='20' stroke='#c45c48' stroke-width='2' stroke-dasharray='4'/><text x='55' y='108' text-anchor='middle' font-size='11'>חד-זוויות</text><polygon points='130,95 200,95 130,20' fill='none' stroke='#0d6e6e' stroke-width='2.5'/><rect x='130' y='83' width='12' height='12' fill='none' stroke='#0d6e6e'/><text x='165' y='108' text-anchor='middle' font-size='11'>ישר-זווית</text><polygon points='230,95 295,95 250,30' fill='none' stroke='#0d6e6e' stroke-width='2.5'/><line x1='250' y1='95' x2='250' y2='30' stroke='#c45c48' stroke-width='2' stroke-dasharray='4'/><text x='262' y='108' text-anchor='middle' font-size='11'>קהה-זווית</text></svg></div>\n\n**סיווג משולשים לפי זוויות:**\n- <span class='hl-teal'>חד-זוויות</span> — כל שלוש הזוויות קטנות מ-$90°$.\n- <span class='hl-teal'>ישר-זווית</span> — יש בו זווית אחת בדיוק של $90°$.\n- <span class='hl-teal'>קהה-זווית</span> — יש בו זווית אחת גדולה מ-$90°$.\n\n**שטח משולש** — לוקחים **בסיס כלשהו וגובה ליד אותו בסיס**, כופלים אותם, ומחלקים ב-$2$ (כי המשולש הוא בדיוק חצי ממלבן שאורכיו הם הבסיס והגובה).\n\n**היקף משולש** — פשוט מחברים את אורכי שלוש הצלעות.",
    "keyFormulas": [
      "שטח משולש $=\\dfrac{\\text{בסיס}\\times\\text{גובה}}{2}$",
      "היקף משולש $=$ סכום שלוש הצלעות",
      "חד-זוויות: כל הזוויות $<90°$",
      "ישר-זווית: זווית אחת $=90°$ | קהה-זווית: זווית אחת $>90°$"
    ]
  },
  {
    "id": "g5-geometry-parallelogram-solids",
    "grade": 5,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "מקביליות וגופים",
    "description": "גובה ושטח מקבילית, ותכונות פירמידות ומנסרות ישרות",
    "sortOrder": 9,
    "explanation": "במקבילית (מרובע עם שני זוגות צלעות מקבילות), ה**גובה** הוא המרחק המאונך בין שני הבסיסים המקבילים — **לא** אחת הצלעות המשופעות.\n\n<div class='diagram-box'><svg viewBox='0 0 200 110' xmlns='http://www.w3.org/2000/svg'><polygon points='50,90 170,90 140,20 20,20' fill='#0d6e6e' fill-opacity='0.12' stroke='#0d6e6e' stroke-width='2.5'/><line x1='60' y1='90' x2='60' y2='20' stroke='#c45c48' stroke-width='2' stroke-dasharray='4'/><text x='65' y='55' font-size='11' fill='#c45c48'>גובה</text></svg></div>\n\n<span class='hl-teal'>שטח מקבילית $=$ בסיס $\\times$ גובה</span> — בדיוק כמו מלבן, רק שהגובה הוא המרחק המאונך, לא הצלע המשופעת עצמה.\n\n**גופים תלת-ממדיים** מתוארים לפי שלושה חלקים:\n- <span class='hl-teal'>פאות</span> — המשטחים השטוחים החיצוניים.\n- <span class='hl-teal'>מקצועות</span> — הקווים שבהם נפגשות שתי פאות.\n- <span class='hl-teal'>קודקודים</span> — הנקודות שבהן נפגשים כמה מקצועות.\n\n**פירמידה** — בסיס אחד (יכול להיות כל צורה) ופאות צדדיות משולשות שכולן נפגשות בנקודה אחת למעלה (הפסגה).\n\n**מנסרה** — שני בסיסים זהים ומקבילים (למעלה ולמטה), מחוברים בפאות צדדיות מלבניות.",
    "keyFormulas": [
      "שטח מקבילית $=$ בסיס $\\times$ גובה (גובה = מרחק מאונך בין הבסיסים)",
      "פירמידה: בסיס אחד + פאות משולשות שנפגשות בפסגה אחת",
      "מנסרה: שני בסיסים זהים ומקבילים + פאות צדדיות מלבניות"
    ]
  },
  {
    "id": "g6-natural-numbers-ops",
    "grade": 6,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "המספרים הטבעיים וה-0 — פעולות וסדר פעולות",
    "description": "ארבע פעולות החשבון, סדר פעולות עם סוגריים, תכונות מספרים ואומדן",
    "sortOrder": 1,
    "explanation": "בתרגיל עם כמה פעולות חשבון יחד, יש **סדר קבוע** שחייבים לשמור עליו — אחרת מקבלים תוצאה שגויה:\n\n1. **סוגריים** — תמיד ראשונים.\n2. **כפל וחילוק** — לפי הסדר, משמאל לימין.\n3. **חיבור וחיסור** — אחרונים, לפי הסדר, משמאל לימין.\n\nלדוגמה, בביטוי $3+4\\times(2+1)$: קודם הסוגריים ($2+1=3$), אחר כך הכפל ($4\\times3=12$), ולבסוף החיבור ($3+12=15$).\n\n**סימני התחלקות נוספים** (בלי לחלק בפועל):\n- מתחלק ב-$4$ אם <span class='hl-teal'>שתי הספרות האחרונות</span> מתחלקות ב-$4$ (למשל $312$: $12\\div4=3$ ✓).\n- מתחלק ב-$9$ אם <span class='hl-teal'>סכום כל הספרות</span> מתחלק ב-$9$ (למשל $423$: $4+2+3=9$ ✓).\n\n<span class='hl-success'>אומדן לפני חישוב מדויק</span> עוזר לבדוק שהתוצאה הגיונית: מעגלים כל מספר למספר \"עגול\" קרוב, ומחשבים בערך — אם התוצאה המדויקת רחוקה מדי מהאומדן, כדאי לבדוק שוב.",
    "keyFormulas": [
      "סדר פעולות: (1) סוגריים (2) כפל/חילוק (3) חיבור/חיסור",
      "התחלקות ב-$4$: שתי הספרות האחרונות מתחלקות ב-$4$",
      "התחלקות ב-$9$: סכום הספרות מתחלק ב-$9$"
    ]
  },
  {
    "id": "g6-fractions-mul-div",
    "grade": 6,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "כפל וחילוק שברים",
    "description": "כפל שבר בשבר, כפל וחילוק מספרים מעורבים, שבר כמנת חילוק",
    "sortOrder": 2,
    "explanation": "**כפל שברים** הוא הפעולה הכי פשוטה מכל פעולות השברים — פשוט כופלים <span class='hl-teal'>מונה במונה</span> ו<span class='hl-teal'>מכנה במכנה</span>, בלי צורך במכנה משותף:\n$$\\frac{2}{3}\\times\\frac{4}{5}=\\frac{2\\times4}{3\\times5}=\\frac{8}{15}$$\n\n**חילוק שברים** — כאן יש טריק: <span class='hl-coral'>הופכים את השבר השני</span> (מחליפים בין המונה למכנה שלו) ואז **כופלים** במקום לחלק:\n$$\\frac{2}{3}\\div\\frac{4}{5}=\\frac{2}{3}\\times\\frac{5}{4}=\\frac{10}{12}=\\frac{5}{6}$$\n\nהשבר ההפוך (\"ההופכי\") של $\\frac{4}{5}$ הוא $\\frac{5}{4}$ — פשוט מחליפים בין העליון לתחתון.\n\n**עם מספרים מעורבים** — קודם **חייבים** להפוך כל מספר מעורב לשבר מדומה, ורק אז לכפול או לחלק:\n$$1\\frac{1}{2}\\times\\frac{2}{3}=\\frac{3}{2}\\times\\frac{2}{3}=\\frac{6}{6}=1$$\n\n<span class='hl-success'>טיפ</span>: אחרי כפל או חילוק, כדאי תמיד לבדוק אם אפשר לצמצם את התוצאה.",
    "keyFormulas": [
      "כפל שברים: $\\frac{a}{b}\\times\\frac{c}{d}=\\frac{a\\times c}{b\\times d}$",
      "חילוק שברים: $\\frac{a}{b}\\div\\frac{c}{d}=\\frac{a}{b}\\times\\frac{d}{c}$",
      "לפני כפל/חילוק — הופכים מספר מעורב לשבר מדומה"
    ]
  },
  {
    "id": "g6-decimals-mul-div",
    "grade": 6,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "כפל וחילוק שברים עשרוניים",
    "description": "כפל/חילוק ב-10 ו-100, כפל וחילוק שברים עשרוניים, וקשר לחילוק במספרים טבעיים",
    "sortOrder": 3,
    "explanation": "כפל וחילוק של שברים עשרוניים נעשה בקלות אם <span class='hl-teal'>מקשרים אותם לתרגיל שקול עם מספרים טבעיים</span> (בלי נקודה).\n\n**כפל** — כופלים כאילו אין בכלל נקודות עשרוניות, ובסוף סופרים יחד כמה ספרות היו אחרי הנקודה בשני המספרים, וממקמים את הנקודה בהתאם: $2.4\\times1.3$ → $24\\times13=312$ → שתי ספרות אחרי הנקודה בסה\"כ → $3.12$.\n\n**חילוק** — אפשר להכפיל את שני המספרים (המחולק והמחלק) <span class='hl-teal'>באותו מספר</span> (למשל פי $10$), וזה לא משנה את התוצאה: $2.4\\div0.4$ שקול בדיוק ל-$24\\div4=6$.\n\n<div class='diagram-box'><svg viewBox='0 0 220 60' xmlns='http://www.w3.org/2000/svg'><text x='30' y='30' font-size='16' fill='#1a2b3c' font-family='monospace'>2.4 ÷ 0.4</text><text x='150' y='30' font-size='16' fill='#0d6e6e' font-family='monospace'>= 24 ÷ 4</text><text x='150' y='50' font-size='16' fill='#c45c48' font-family='monospace'>= 6</text></svg></div>\n\n<span class='hl-coral'>אזהרה חשובה</span>: כפל לא תמיד מגדיל וחילוק לא תמיד מקטין! כפל במספר **קטן מ-$1$** (כמו $0.5$) דווקא **מקטין** את התוצאה, כי בעצם לוקחים רק חלק מהמספר.",
    "keyFormulas": [
      "כפל: מכפילים כאילו אין נקודה, וסופרים יחד את הספרות אחרי הנקודה",
      "חילוק: מכפילים מחלק ומחולק באותו מספר (למשל פי $10$) לתרגיל שקול פשוט",
      "$2.4\\div0.4=24\\div4=6$",
      "כפל במספר $<1$ מקטין את התוצאה!"
    ]
  },
  {
    "id": "g6-ratio-percent",
    "grade": 6,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "יחס, פרופורציה ואחוזים",
    "description": "חשיבה פרופורציונית, חישוב אחוז משלם, מציאת השלם, הנחה והתייקרות",
    "sortOrder": 4,
    "explanation": "אחוז הוא דרך פשוטה לתאר \"חלק ממאה\": $1\\%$ שווה בדיוק ל<span class='hl-teal'>מאית אחת</span> מהשלם, כלומר $\\frac{1}{100}$.\n\n<div class='diagram-box'><svg viewBox='0 0 220 30' xmlns='http://www.w3.org/2000/svg'><rect x='0' y='5' width='220' height='20' fill='none' stroke='#1a2b3c' stroke-width='1.5'/><rect x='0' y='5' width='55' height='20' fill='#0d6e6e' opacity='0.5'/><text x='27' y='20' text-anchor='middle' font-size='11' fill='#fff'>25%</text></svg></div>\n\n**שלושה סוגי שאלות אחוזים, ושלוש דרכי פתרון:**\n\n1. **\"כמה זה $25\\%$ מ-$80$?\"** — מחלקים ב-$100$ וכופלים באחוזים: $(80\\div100)\\times25=20$.\n\n2. **\"$20$ הם $25\\%$ ממה?\"** (מציאת השלם) — הופכים את הכיוון: $(20\\div25)\\times100=80$.\n\n3. **הנחה/התייקרות** — מחשבים את סכום האחוז ומוסיפים/מחסירים ממחיר מקורי:\n   - <span class='hl-teal'>הנחה</span>: מחיר חדש $=$ מחיר מקורי $-$ (מחיר $\\times$ אחוז הנחה).\n   - <span class='hl-teal'>התייקרות</span>: מחיר חדש $=$ מחיר מקורי $+$ (מחיר $\\times$ אחוז התייקרות).\n\n<span class='hl-success'>טיפ מהיר</span>: $50\\%$ זה תמיד חצי, $25\\%$ זה תמיד רבע, ו-$10\\%$ זה תמיד עשירית — קל לחשב אותם בעל-פה ולהשתמש בהם כאומדן.",
    "keyFormulas": [
      "ערך האחוז מהשלם: $(\\text{שלם}\\div100)\\times\\text{אחוזים}$",
      "מציאת השלם: $(\\text{ערך}\\div\\text{אחוזים})\\times100$",
      "מחיר אחרי הנחה $=$ מקורי $-$ (מקורי $\\times$ אחוז הנחה)",
      "מחיר אחרי התייקרות $=$ מקורי $+$ (מקורי $\\times$ אחוז התייקרות)"
    ]
  },
  {
    "id": "g6-number-sets",
    "grade": 6,
    "units": null,
    "track": null,
    "cluster": "מספרים ופעולות",
    "title": "קבוצות מספרים וסדר פעולות",
    "description": "טבעיים, שלמים ושברים; סדר פעולות וסוגריים",
    "sortOrder": 5,
    "explanation": "המספרים שאנחנו מכירים מאורגנים בקבוצות, כמו <span class='hl-teal'>בובות רוסיות</span> — כל קבוצה \"יושבת\" בתוך קבוצה גדולה יותר:\n\n<div class='diagram-box'><svg viewBox='0 0 260 130' xmlns='http://www.w3.org/2000/svg'><circle cx='130' cy='65' r='60' fill='none' stroke='#1a2b3c' stroke-width='2'/><circle cx='120' cy='70' r='42' fill='none' stroke='#0d6e6e' stroke-width='2'/><circle cx='112' cy='75' r='26' fill='none' stroke='#c45c48' stroke-width='2'/><text x='195' y='25' font-size='10' fill='#1a2b3c'>רציונליים</text><text x='150' y='40' font-size='10' fill='#0d6e6e'>שלמים</text><text x='112' y='75' font-size='10' fill='#c45c48' text-anchor='middle'>טבעיים</text></svg></div>\n\n- **טבעיים** ($0,1,2,3,...$) — מספרי ספירה רגילים.\n- **שלמים** — טבעיים **וגם** מספרים שליליים ($-1,-2,-3,...$).\n- **רציונליים** — כל מספר שאפשר לכתוב כ**שבר** (כולל שברים עשרוניים סופיים כמו $0.75$, או מחזוריים כמו $0.333...$).\n\n<span class='hl-coral'>מספרים אי-רציונליים</span> הם מספרים שאי אפשר לכתוב כשבר בכלל — כמו $\\sqrt2$ — הם לא חלק ממשפחת הרציונליים.\n\n<span class='hl-success'>עיקרון חשוב</span>: כל מספר שלם הוא גם רציונלי (אפשר לכתוב $5=\\frac{5}{1}$), וכל מספר טבעי הוא גם שלם וגם רציונלי — כל קבוצה \"קטנה\" נמצאת בתוך הקבוצה \"הגדולה\" ממנה.",
    "keyFormulas": [
      "טבעיים $\\subset$ שלמים $\\subset$ רציונליים",
      "כל שלם הוא רציונלי: $5=\\frac{5}{1}$",
      "סדר פעולות: סוגריים ← כפל/חילוק ← חיבור/חיסור"
    ]
  },
  {
    "id": "g6-composite-shapes",
    "grade": 6,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "מצולעים מורכבים — שטח והיקף",
    "description": "חישוב שטח והיקף על ידי פירוק לצורות פשוטות או חיסור שטחים",
    "sortOrder": 6,
    "explanation": "צורה מורכבת (\"לא רגילה\") אפשר לחשב בשתי דרכים:\n\n**דרך א' — פירוק לחלקים** <span class='hl-teal'>(חיבור)</span>: מחלקים את הצורה לכמה צורות פשוטות (מלבנים, משולשים) שיודעים לחשב, ומחברים את השטחים.\n\n**דרך ב' — השלמה וחיסור** <span class='hl-coral'>(חיסור)</span>: מדמיינים שהצורה היא חלק ממלבן גדול יותר, מחשבים את שטח המלבן הגדול, ומחסירים את מה שלא צריך.\n\n<div class='diagram-box'><svg viewBox='0 0 260 110' xmlns='http://www.w3.org/2000/svg'><polygon points='20,20 120,20 120,60 80,60 80,90 20,90' fill='#0d6e6e' fill-opacity='0.15' stroke='#0d6e6e' stroke-width='2.5'/><text x='70' y='105' text-anchor='middle' font-size='11'>פירוק ל-2 מלבנים</text><rect x='160' y='20' width='90' height='70' fill='none' stroke='#0d6e6e' stroke-width='2.5'/><rect x='210' y='55' width='40' height='35' fill='#c45c48' fill-opacity='0.3' stroke='#c45c48' stroke-width='2' stroke-dasharray='4'/><text x='205' y='105' text-anchor='middle' font-size='11'>מלבן גדול פחות פינה</text></svg></div>\n\nב**שתי הדרכים** משתמשים באותן נוסחאות בסיסיות: שטח מלבן, שטח משולש, שטח מקבילית.\n\nה**היקף** של צורה מורכבת שונה — פשוט מחברים את <span class='hl-teal'>כל הצלעות שנמצאות בקו החיצוני</span> של הצורה (בלי לחשב שום דבר בפנים).",
    "keyFormulas": [
      "דרך פירוק: שטח כולל $=$ סכום שטחי החלקים",
      "דרך השלמה: שטח כולל $=$ שטח גדול $-$ שטח שהוחסר",
      "שטח מלבן $=$ אורך $\\times$ רוחב | שטח משולש $=\\frac{\\text{בסיס}\\times\\text{גובה}}{2}$",
      "היקף $=$ סכום כל הצלעות החיצוניות"
    ]
  },
  {
    "id": "g6-circle",
    "grade": 6,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "מעגל ועיגול",
    "description": "רדיוס, קוטר, מיתר, קשת וגזרה; היקף מעגל ושטח עיגול",
    "sortOrder": 7,
    "explanation": "<div class='diagram-box'><svg viewBox='0 0 220 130' xmlns='http://www.w3.org/2000/svg'><circle cx='110' cy='65' r='55' fill='none' stroke='#0d6e6e' stroke-width='2.5'/><circle cx='110' cy='65' r='2.5' fill='#1a2b3c'/><line x1='110' y1='65' x2='165' y2='65' stroke='#c45c48' stroke-width='2.5'/><text x='135' y='58' font-size='11' fill='#c45c48'>רדיוס</text><line x1='55' y1='65' x2='165' y2='65' stroke='#0d6e6e' stroke-width='1.5' stroke-dasharray='4' opacity='0.5'/><line x1='75' y1='25' x2='150' y2='95' stroke='#1a2b3c' stroke-width='2'/><text x='75' y='20' font-size='11' fill='#1a2b3c'>מיתר</text></svg></div>\n\n- **מרכז** — הנקודה שממנה כל נקודות המעגל נמצאות באותו מרחק.\n- <span class='hl-teal'>רדיוס</span> — קטע מהמרכז לכל נקודה על המעגל.\n- <span class='hl-teal'>קוטר</span> — קטע העובר דרך המרכז ומחבר שתי נקודות על המעגל; הוא <span class='hl-success'>פי $2$ מהרדיוס</span>.\n- **מיתר** — כל קטע המחבר שתי נקודות על המעגל (הקוטר הוא המיתר הכי ארוך שיש).\n- **קשת** — חלק מההיקף. **גזרה** — \"פרוסת פיצה\" בין שני רדיוסים.\n\n**המספר $\\pi$ (פאי)** הוא מספר קסום: $\\pi\\approx3.14$, וזה **תמיד** היחס בין היקף כל מעגל לקוטר שלו, לא משנה כמה הוא גדול או קטן!\n\n**נוסחאות**: היקף המעגל שווה $\\pi$ כפול הקוטר, ושטח העיגול שווה $\\pi$ כפול הרדיוס בריבוע (הרדיוס כפול עצמו).",
    "keyFormulas": [
      "קוטר $=2\\times$ רדיוס",
      "היקף מעגל $=\\pi\\times$ קוטר $=2\\pi\\times$ רדיוס",
      "שטח עיגול $=\\pi\\times$ רדיוס $\\times$ רדיוס",
      "$\\pi\\approx 3.14$"
    ]
  },
  {
    "id": "g6-geometry",
    "grade": 6,
    "units": null,
    "track": null,
    "cluster": "גאומטריה ומדידות",
    "title": "נפח גופים ושטח פנים",
    "description": "נפח תיבה, שטח פני תיבה, יחידות נפח (סמ\"ק, מ\"ק, ליטר) ותרגול שטח/היקף מלבן",
    "sortOrder": 8,
    "explanation": "נפח תיבה מודד כמה יחידות-קובייה ($1\\times1\\times1$) נכנסות בתוכה — מחשבים אותו בהכפלת <span class='hl-teal'>שלושת המידות</span>: אורך, רוחב וגובה.\n\n<div class='diagram-box'><svg viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'><g stroke='#0d6e6e' stroke-width='1' fill='#0d6e6e' fill-opacity='0.15'><rect x='20' y='20' width='20' height='20'/><rect x='40' y='20' width='20' height='20'/><rect x='60' y='20' width='20' height='20'/><rect x='20' y='40' width='20' height='20'/><rect x='40' y='40' width='20' height='20'/><rect x='60' y='40' width='20' height='20'/></g><rect x='20' y='20' width='60' height='40' fill='none' stroke='#1a2b3c' stroke-width='2'/><text x='50' y='78' text-anchor='middle' font-size='11'>3×2 = 6 יחידות</text></svg></div>\n\n**שטח הפנים** הוא סכום שטחי כל שש הפאות (שני זוגות זהים).\n\n**יחידות נפח — חשוב לבחור את המתאימה לגודל:**\n- <span class='hl-teal'>סמ\"ק</span> (סנטימטר מעוקב) — לגדלים קטנים, כמו קופסת עיפרונות.\n- <span class='hl-teal'>מ\"ק</span> (מטר מעוקב) — לגדלים גדולים, כמו חדר.\n- <span class='hl-teal'>ליטר / מ\"ל</span> — לנוזלים, כאשר $1$ ליטר $=1{,}000$ סמ\"ק בדיוק (כמו קובייה של $10\\times10\\times10$ ס\"מ).",
    "keyFormulas": [
      "נפח תיבה $=$ אורך $\\times$ רוחב $\\times$ גובה",
      "שטח פני תיבה $=2\\times(\\text{אורך}\\times\\text{רוחב}+\\text{אורך}\\times\\text{גובה}+\\text{רוחב}\\times\\text{גובה})$",
      "$1$ ליטר $=1{,}000$ סמ\"ק"
    ]
  },
  {
    "id": "g6-average",
    "grade": 6,
    "units": null,
    "track": null,
    "cluster": "חקר נתונים",
    "title": "ממוצע חשבוני",
    "description": "משמעות הממוצע, דרכים למציאתו ותכונותיו",
    "sortOrder": 9,
    "explanation": "ה**ממוצע החשבוני** הוא מספר אחד שמייצג \"בערך\" קבוצה שלמה של נתונים — כאילו כולם היו שווים זה לזה.\n\n**איך מחשבים**: מחברים את **כל** הנתונים, ומחלקים ב**מספר** הנתונים.\n\n<div class='diagram-box'><svg viewBox='0 0 220 90' xmlns='http://www.w3.org/2000/svg'><line x1='20' y1='75' x2='200' y2='75' stroke='#1a2b3c' stroke-width='2'/><rect x='30' y='35' width='25' height='40' fill='#0d6e6e' opacity='0.5'/><rect x='70' y='15' width='25' height='60' fill='#0d6e6e' opacity='0.5'/><rect x='110' y='55' width='25' height='20' fill='#0d6e6e' opacity='0.5'/><line x1='20' y1='38' x2='200' y2='38' stroke='#c45c48' stroke-width='2' stroke-dasharray='5,3'/><text x='205' y='42' font-size='11' fill='#c45c48'>ממוצע</text></svg></div>\n\nלדוגמה, שלושה ילדים עם $80,90,70$ שקלים: $\\dfrac{80+90+70}{3}=\\dfrac{240}{3}=80$ — כאילו לכל אחד היו $80$ שקלים בדיוק.\n\n**תכונות חשובות של הממוצע:**\n- <span class='hl-teal'>הוא תמיד נמצא בין הערך הקטן ביותר לגדול ביותר</span> בקבוצה — אף פעם לא קטן מהמינימום ולא גדול מהמקסימום.\n- הוא **לא חייב** להיות שווה לאחד הנתונים המקוריים, ולא חייב להיות מספר שלם.\n\n<span class='hl-success'>שימושי לדעת</span>: אם יודעים את הממוצע ואת מספר הנתונים, אפשר לחשב חזרה את הסכום שלהם: סכום $=$ ממוצע $\\times$ מספר הנתונים.",
    "keyFormulas": [
      "ממוצע $=\\dfrac{\\text{סכום הנתונים}}{\\text{מספר הנתונים}}$",
      "סכום הנתונים $=$ ממוצע $\\times$ מספר הנתונים",
      "הממוצע תמיד בין הערך הקטן לגדול בקבוצה"
    ]
  },
  {
    "id": "g6-data-prob",
    "grade": 6,
    "units": null,
    "track": null,
    "cluster": "חקר נתונים",
    "title": "חקר נתונים והסתברות בסיסית",
    "description": "פירוש גרפים וטבלאות, חציון ושכיח, והסתברות פשוטה בהקשר יומיום",
    "sortOrder": 10,
    "explanation": "מלבד הממוצע, יש עוד שני \"נציגים\" שימושיים לתיאור קבוצת נתונים:\n\n- <span class='hl-teal'>חציון</span> — ממיינים את כל הנתונים מהקטן לגדול, ובוחרים את הערך **האמצעי בדיוק**. אם יש מספר זוגי של נתונים, לוקחים את הממוצע של שני האמצעיים.\n- <span class='hl-teal'>שכיח</span> — הערך שמופיע הכי הרבה פעמים בקבוצה.\n\n<div class='diagram-box'><svg viewBox='0 0 260 50' xmlns='http://www.w3.org/2000/svg'><g font-family='monospace' font-size='18' fill='#1a2b3c'><text x='20' y='30'>3</text><text x='55' y='30'>5</text><text x='90' y='30' fill='#c45c48' font-weight='bold'>7</text><text x='125' y='30'>8</text><text x='160' y='30'>9</text></g><text x='90' y='48' text-anchor='middle' font-size='11' fill='#c45c48'>חציון</text></svg></div>\n\n**הסתברות** מתארת **כמה סביר** שמאורע מסוים יקרה, במספר בין $0$ ל-$1$ (או באחוזים בין $0\\%$ ל-$100\\%$):\n- הסתברות $0$ — <span class='hl-coral'>בלתי אפשרי</span> (למשל, להטיל קובייה ולקבל $7$).\n- הסתברות $1$ — <span class='hl-success'>ודאי</span> שיקרה.\n- באמצע — ככל שההסתברות קרובה יותר ל-$1$, כך המאורע סביר יותר.\n\n**איך מחשבים הסתברות**: מחלקים את מספר התוצאות ה\"רצויות\" (מה שאנחנו מחפשים) במספר **כל** התוצאות האפשריות. למשל, הסתברות לקבל \"זוגי\" בהטלת קובייה: יש $3$ תוצאות זוגיות ($2,4,6$) מתוך $6$ אפשריות, אז ההסתברות היא $\\frac{3}{6}=\\frac{1}{2}$.",
    "keyFormulas": [
      "חציון $=$ הערך האמצעי ברשימה ממוינת (או ממוצע שני האמצעיים)",
      "שכיח $=$ הערך השכיח ביותר",
      "הסתברות $=\\dfrac{\\text{תוצאות רצויות}}{\\text{כל התוצאות האפשריות}}$",
      "הסתברות תמיד בין $0$ (בלתי אפשרי) ל-$1$ (ודאי)"
    ]
  }
];

export function getElementaryTopics(grade) {
  const g = Number(grade);
  return ELEMENTARY_TOPICS.filter((t) => t.grade === g).sort((a, b) => a.sortOrder - b.sortOrder);
}
