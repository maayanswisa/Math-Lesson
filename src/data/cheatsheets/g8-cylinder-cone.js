const m = String.raw;

/** פריסת גליל: שני עיגולים ומלבן שצלעותיו 2πr ו-h. */
const NET = `<div class='diagram-box'><svg viewBox='0 0 230 150' width='230' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><circle cx='95' cy='21' r='18' fill='rgba(31,143,224,0.15)' stroke='#1f8fe0' stroke-width='2'/><line x1='95' y1='21' x2='113' y2='21' stroke='#1a2b3c' stroke-width='1.4'/><text x='104' y='17' text-anchor='middle' font-size='11' font-weight='700' font-style='italic' fill='#1a2b3c'>r</text><rect x='20' y='39' width='150' height='62' fill='rgba(13,110,110,0.12)' stroke='#0d6e6e' stroke-width='2'/><circle cx='95' cy='119' r='18' fill='rgba(31,143,224,0.15)' stroke='#1f8fe0' stroke-width='2'/><text x='95' y='75' text-anchor='middle' font-size='12' font-weight='700' fill='#0d6e6e'>מעטפת</text><text x='95' y='95' text-anchor='middle' font-size='12' font-weight='700' fill='#c45c48'>2πr</text><text x='176' y='74' font-size='12' font-weight='700' fill='#0d6e6e'>h</text></svg></div>`;

/** חרוט והחתך הצירי שלו: משולש שווה-שוקיים שבסיסו 2r וגובהו h. */
const CONE = `<div class='diagram-box'><svg viewBox='0 0 240 160' width='240' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><path d='M 18 128 A 60 17 0 0 1 138 128' fill='none' stroke='#1a2b3c' stroke-width='1.3' stroke-dasharray='4 3'/><path d='M 18 128 A 60 17 0 0 0 138 128' fill='none' stroke='#0d6e6e' stroke-width='2'/><line x1='78' y1='14' x2='18' y2='128' stroke='#0d6e6e' stroke-width='2'/><line x1='78' y1='14' x2='138' y2='128' stroke='#0d6e6e' stroke-width='2'/><polygon points='78,14 18,128 138,128' fill='rgba(196,92,72,0.25)' stroke='#c45c48' stroke-width='1.6'/><line x1='78' y1='14' x2='78' y2='128' stroke='#7c4dcc' stroke-width='1.8' stroke-dasharray='4 3'/><text x='83' y='80' font-size='12' font-weight='700' fill='#7c4dcc'>h</text><text x='78' y='154' text-anchor='middle' font-size='12' font-weight='700' fill='#c45c48'>2r</text><polygon points='190,30 160,128 220,128' fill='rgba(196,92,72,0.2)' stroke='#c45c48' stroke-width='2'/><line x1='190' y1='30' x2='190' y2='128' stroke='#7c4dcc' stroke-width='1.6' stroke-dasharray='4 3'/><text x='194' y='86' font-size='11' font-weight='700' fill='#7c4dcc'>h</text><text x='190' y='144' text-anchor='middle' font-size='11' font-weight='700' fill='#c45c48'>2r</text><text x='212' y='72' font-size='11' font-weight='700' font-style='italic' fill='#1a2b3c'>ℓ</text></svg></div>`;

export default {
  topicId: 'g8-cylinder-cone',
  emoji: '📋',
  title: 'דף עזר: גליל וחרוט',
  subtitle: 'מושגים, פריסה, נפח ושטח פנים, חתך צירי, יחידות ושינוי ממדים',
  sections: [
    {
      title: 'המושגים',
      emoji: '🔍',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'גליל וחרוט',
          md: m`- **בסיס** — עיגול. לגליל שני בסיסים שווים ומקבילים, לחרוט בסיס אחד.
- **מעטפת** — המשטח המעוגל. בגליל, כשפורסים אותה, היא מלבן.
- **גובה** — מאונך לבסיס. בגליל — בין שני הבסיסים. בחרוט — מהקודקוד אל מרכז הבסיס.
- **קודקוד** — רק לחרוט: הנקודה החדה שבראשו.
- **קו יוצר** — קטע ישר על המעטפת. בחרוט — מהקודקוד אל שפת הבסיס, והוא ארוך מהגובה.`,
        },
      ],
    },
    {
      title: 'גליל',
      emoji: '🥫',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'הפריסה: שני עיגולים ומלבן',
          md: m`${NET}

צלע אחת של המלבן היא הגובה $h$. הצלע השנייה הייתה מגולגלת סביב הבסיס, ולכן אורכה היקף הבסיס $2\pi r$.`,
        },
        {
          type: 'table',
          head: ['הגודל', 'הנוסחה', m`$r=3,\ h=10$`],
          rows: [
            ['שטח בסיס', m`$\pi r^2$`, m`$9\pi\approx28.26$`],
            ['היקף הבסיס', m`$2\pi r$`, m`$6\pi\approx18.84$`],
            ['שטח המעטפת', m`$2\pi r\cdot h$`, m`$60\pi\approx188.4$`],
            ['שטח הפנים', m`$2\pi r^2+2\pi rh$`, m`$78\pi\approx244.92$`],
            ['נפח', m`$\pi r^2\cdot h$`, m`$90\pi\approx282.6$`],
          ],
        },
      ],
    },
    {
      title: 'חרוט',
      emoji: '🍦',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'חתך צירי',
          md: m`${CONE}

חותכים דרך הקודקוד ומרכז הבסיס. מתקבל **משולש שווה-שוקיים**: הבסיס שלו הוא הקוטר $2r$, הגובה שלו הוא גובה החרוט $h$, והשוקיים הן קווים יוצרים.`,
        },
        {
          type: 'table',
          head: ['הגודל', 'הנוסחה', m`$r=6,\ h=8$`],
          rows: [
            ['נפח', m`$\frac{\pi r^2\cdot h}{3}$`, m`$96\pi\approx301.44$`],
            ['שטח החתך הצירי', m`$\frac{2r\cdot h}{2}=r\cdot h$`, m`$48$`],
            ['קו יוצר (שוק החתך)', m`$\ell=\sqrt{r^2+h^2}$`, m`$10$`],
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'שליש מגליל',
          md: 'שלושה חרוטים מלאים ממלאים בדיוק גליל אחד עם אותו בסיס ואותו גובה.',
        },
      ],
    },
    {
      title: 'יחידות מידה',
      emoji: '📏',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'המרות',
          md: m`- $1$ ליטר $=$ $1{,}000$ סמ״ק
- $1$ מ״ק $=$ $1{,}000$ ליטר
- $1$ מ״ק $=$ $1{,}000{,}000$ סמ״ק
- $1$ מ״ר $=$ $10{,}000$ סמ״ר
- $1$ מ׳ $=$ $100$ ס״מ
- **לפני** שמציבים בנוסחה — כל המידות באותה יחידה.`,
        },
        {
          type: 'steps',
          title: m`דוד מים: קוטר $60$ ס״מ, גובה $1.2$ מ׳`,
          steps: [
            { math: m`r=30,\ h=120`, note: 'רדיוס, ואת הגובה בס״מ.' },
            { math: m`V=\pi\cdot900\cdot120`, note: 'מציבים בנוסחת הנפח.' },
            { math: m`V=108{,}000\pi\approx339{,}120`, note: 'הנפח בסמ״ק.' },
            { math: m`339{,}120\div1{,}000\approx339.12`, note: 'בליטרים.' },
          ],
        },
      ],
    },
    {
      title: 'שינוי ממדים בגליל',
      emoji: '🔎',
      blocks: [
        {
          type: 'table',
          head: ['השינוי', 'שטח הפנים', 'נפח'],
          rows: [
            [m`$r$ ו-$h$ פי $k$`, m`פי $k^2$`, m`פי $k^3$`],
            [m`רק $h$ פי $k$`, m`המעטפת פי $k$, הבסיסים בלי שינוי`, m`פי $k$`],
            [m`רק $r$ פי $k$`, m`הבסיסים פי $k^2$, המעטפת פי $k$`, m`פי $k^2$`],
            ['הוספה לרדיוס או לגובה', 'אין "פי" קבוע — מחשבים לפני ואחרי', 'אין "פי" קבוע'],
          ],
          stack: 'rows',
        },
        {
          type: 'steps',
          title: m`$r=2$, $h=3$, ומכפילים את שניהם פי $2$`,
          steps: [
            { math: m`S=8\pi+12\pi=20\pi`, note: 'לפני.' },
            { math: m`S=32\pi+48\pi=80\pi`, note: m`אחרי: $r=4$, $h=6$.` },
            { math: m`80\pi\div20\pi=4`, note: m`פי $4$, כלומר פי $2$ בריבוע.` },
          ],
        },
      ],
    },
    {
      title: 'מלכודות',
      emoji: '⚠️',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'טעויות נפוצות',
          md: m`- נתון **קוטר**? מחלקים ב-$2$ לפני שמציבים.
- בנפח החרוט מציבים את **הגובה** $h$, לא את הקו היוצר.
- כוס בלי מכסה — בסיס **אחד** בלבד. צינור פתוח — **רק** מעטפת.
- נפח בסמ״ק, שטח בסמ״ר. מסמ״ק לליטר — מחלקים ב-$1{,}000$.`,
        },
      ],
    },
  ],
};
