import { m, num, boxFig, svgParts } from '../helpers.js';

const { svg, label, INK, SHADE } = svgParts;

/** צורת L: מלבן W×H שחסרה לו פינה ימנית-עליונה cw×ch. מסומנות רק הצלעות שצריך. */
function lShapeFig({ W, H, cw, ch }) {
  const s = Math.min(180 / W, 120 / H);
  const x0 = 30;
  const y0 = 22;
  const xa = x0 + (W - cw) * s;
  const xb = x0 + W * s;
  const yc = y0 + ch * s;
  const yb = y0 + H * s;
  const body =
    `<polygon points="${x0},${y0} ${xa},${y0} ${xa},${yc} ${xb},${yc} ${xb},${yb} ${x0},${yb}" fill="${SHADE}" fill-opacity="0.55" stroke="${INK}" stroke-width="2"/>` +
    label((x0 + xa) / 2, y0 - 7, W - cw) +
    label(x0 - 7, (y0 + yb) / 2 + 5, H, 'end') +
    label((x0 + xb) / 2, yb + 19, W) +
    label(xb + 7, (yc + yb) / 2 + 5, H - ch, 'start');
  return svg(xb + 30, yb + 26, body);
}
const lArea = ({ W, H, cw, ch }) => W * H - cw * ch;

/** צורת "בית": מלבן w×h ועליו משולש (גג) בגובה roof. */
function houseFig({ w, h, roof }) {
  const s = Math.min(150 / w, 120 / (h + roof));
  const x0 = 30;
  const y0 = 8;
  const xr = x0 + w * s;
  const yt = y0 + roof * s;
  const yb = yt + h * s;
  const mid = (x0 + xr) / 2;
  const body =
    `<polygon points="${x0},${yt} ${mid},${y0} ${xr},${yt} ${xr},${yb} ${x0},${yb}" fill="${SHADE}" fill-opacity="0.55" stroke="${INK}" stroke-width="2"/>` +
    `<line x1="${x0}" y1="${yt}" x2="${xr}" y2="${yt}" stroke="${INK}" stroke-width="1.2" stroke-dasharray="5 4"/>` +
    `<line x1="${mid}" y1="${y0}" x2="${mid}" y2="${yt}" stroke="${INK}" stroke-width="1.2" stroke-dasharray="3 3"/>` +
    label(mid + 6, (y0 + yt) / 2 + 6, roof, 'start') +
    label(x0 - 7, (yt + yb) / 2 + 5, h, 'end') +
    label(mid, yb + 19, w);
  return svg(xr + 30, yb + 26, body);
}
const houseArea = ({ w, h, roof }) => w * h + (w * roof) / 2;

const lItem = (d) => ({ q: '', figure: lShapeFig(d), a: m`השטח: [[${lArea(d)}]] סמ״ר` });
const houseItem = (d) => ({ q: '', figure: houseFig(d), a: m`השטח: [[${houseArea(d)}]] סמ״ר` });

/** המרת יחידות שטח: value ביחידה from = ? ביחידה to. */
const PER_M2 = { 'ממ״ר': 1_000_000, 'סמ״ר': 10_000, 'מ״ר': 1, 'דונם': 1 / 1000 };
function convert(value, from, to) {
  const v = Math.round(((value / PER_M2[from]) * PER_M2[to]) * 1000) / 1000;
  return { q: m`$${num(value)}$ ${from} $=$ [[${v}]] ${to}` };
}

const rect = (l, w) => ({
  q: m`מלבן $${l} \times ${w}$ ס״מ`,
  a: m`שטח: [[${l * w}]] סמ״ר · היקף: [[${2 * (l + w)}]] ס״מ`,
});

const volume = (l, w, h) => l * w * h;
const surface = (l, w, h) => 2 * (l * w + l * h + w * h);

const boxVolumeFig = (l, w, h) => ({ q: '', figure: boxFig({ l, w, h }), a: m`נפח: [[${volume(l, w, h)}]] סמ״ק` });
const boxVolume = (l, w, h) => ({ q: m`תיבה $${l} \times ${w} \times ${h}$ ס״מ. הנפח: [[${volume(l, w, h)}]] סמ״ק` });
const boxSurface = (l, w, h) => ({ q: m`תיבה $${l} \times ${w} \times ${h}$ ס״מ. שטח הפנים: [[${surface(l, w, h)}]] סמ״ר` });
const cube = (a) => ({ q: m`קובייה שאורך מקצוע שלה $${a}$ ס״מ`, a: m`נפח: [[${a ** 3}]] סמ״ק · שטח פנים: [[${6 * a * a}]] סמ״ר` });

function missingHeight(V, l, w) {
  const h = V / (l * w);
  if (!Number.isInteger(h)) throw new Error('not whole');
  return { q: m`נפח התיבה $${V}$ סמ״ק, האורך $${l}$ ס״מ והרוחב $${w}$ ס״מ. הגובה: [[${h}]] ס״מ` };
}

export default {
  id: 'g5-geometry',
  grade: 5,
  emoji: '📦',
  title: 'שטח, היקף ונפח',
  reminder: [
    {
      title: 'מלבן וריבוע',
      md: m`**שטח** מלבן = אורך $\times$ רוחב (סמ״ר)
**היקף** מלבן = פעמיים (אורך + רוחב) (ס״מ)

ריבוע שצלעו $5$: שטח $25$ סמ״ר, היקף $20$ ס״מ.`,
    },
    {
      title: 'יחידות שטח',
      md: m`במ״ר אחד יש $100 \times 100 = 10{,}000$ סמ״ר (לא $100$!).

בסמ״ר אחד יש $100$ ממ״ר. בדונם אחד יש $1{,}000$ מ״ר.

מידות ביחידות שונות? ממירים **קודם** לאותה יחידה.`,
    },
    {
      title: 'שטח של צורה מורכבת',
      md: m`**מפרקים** למלבנים ומחברים את השטחים, **או** **משלימים** למלבן גדול ומחסירים את החלק שחסר.`,
    },
    {
      title: 'נפח תיבה',
      md: m`<div class="diagram-box">${boxFig({ l: 'אורך', w: 'רוחב', h: 'גובה' })}</div>

**נפח** = אורך $\times$ רוחב $\times$ גובה (סמ״ק) — כמה קוביות של $1$ ס״מ נכנסות בתיבה.`,
    },
    {
      title: 'שטח פנים של תיבה',
      wide: true,
      md: m`סכום השטחים של **שש הפאות** — שלושה זוגות של פאות זהות:

$5 \times 3 \times 2$: $\;2 \times (5 \times 3 + 5 \times 2 + 3 \times 2) = 2 \times 31 = 62$ סמ״ר`,
    },
  ],
  pages: [
    {
      title: 'שטח והיקף, יחידות שטח וצורות מורכבות',
      exercises: [
        { title: 'חשבו שטח והיקף.', cols: 1, items: [rect(8, 5), rect(7, 7), rect(15, 2)] },
        {
          title: 'מצאו את הצלע החסרה.',
          cols: 1,
          items: [
            { q: m`שטח המלבן $48$ סמ״ר והאורך $8$ ס״מ. הרוחב: [[${48 / 8}]] ס״מ` },
            { q: m`היקף המלבן $30$ ס״מ והאורך $9$ ס״מ. הרוחב: [[${30 / 2 - 9}]] ס״מ` },
          ],
        },
        {
          title: 'המירו.',
          cols: 2,
          items: [convert(2, 'מ״ר', 'סמ״ר'), convert(30000, 'סמ״ר', 'מ״ר'), convert(15000, 'סמ״ר', 'מ״ר'), convert(3, 'דונם', 'מ״ר')],
        },
        {
          title: 'מידות ביחידות שונות — ממירים קודם לאותה יחידה.',
          cols: 1,
          items: [
            { q: m`מלבן של $2$ מ׳ על $50$ ס״מ. השטח: [[${200 * 50}]] סמ״ר, כלומר [[${(200 * 50) / 10000}]] מ״ר` },
            { q: m`מה גדול יותר: $1$ מ״ר או $900$ סמ״ר?`, options: [m`$1$ מ״ר`, m`$900$ סמ״ר`, 'שווים'], answer: 10000 > 900 ? 0 : 1 },
          ],
        },
        {
          title: 'חשבו את שטח הצורה (המידות בס״מ).',
          cols: 2,
          items: [
            lItem({ W: 8, H: 6, cw: 5, ch: 3 }),
            lItem({ W: 10, H: 7, cw: 6, ch: 4 }),
            houseItem({ w: 6, h: 4, roof: 3 }),
            houseItem({ w: 10, h: 5, roof: 4 }),
          ],
        },
        {
          title: 'שאלות מילוליות.',
          cols: 1,
          items: [
            {
              q: m`גינה מלבנית של $10$ מ׳ על $8$ מ׳, ובתוכה בריכה מלבנית של $4$ מ׳ על $3$ מ׳. מה שטח הדשא?`,
              a: m`[[${10 * 8 - 4 * 3}]] מ״ר`,
            },
            {
              q: m`מרצפים חדר של $3$ מ׳ על $4$ מ׳ במרצפות ריבועיות של $50$ ס״מ על $50$ ס״מ. כמה מרצפות צריך?`,
              a: m`[[${(300 * 400) / (50 * 50)}]] מרצפות`,
            },
          ],
        },
      ],
    },
    {
      title: 'נפח ושטח פנים של תיבה',
      exercises: [
        { title: 'חשבו את נפח התיבה (המידות בס״מ).', cols: 3, items: [boxVolumeFig(5, 3, 2), boxVolumeFig(4, 4, 4), boxVolumeFig(6, 2, 3)] },
        { title: 'חשבו את הנפח.', cols: 1, items: [boxVolume(10, 5, 2), boxVolume(8, 3, 4), boxVolume(12, 10, 5)] },
        { title: 'חשבו את שטח הפנים.', cols: 1, items: [boxSurface(5, 3, 2), boxSurface(6, 4, 1), boxSurface(10, 2, 3)] },
        { title: 'קובייה: חשבו נפח ושטח פנים.', cols: 1, items: [cube(3), cube(10)] },
        { title: 'מצאו את הגובה.', cols: 1, items: [missingHeight(60, 5, 3), missingHeight(72, 6, 4)] },
        {
          title: 'שאלות מילוליות.',
          cols: 1,
          items: [
            { q: m`אקווריום בצורת תיבה: $50$ ס״מ אורך, $30$ ס״מ רוחב ו-$40$ ס״מ גובה. מה נפחו?`, a: m`[[${volume(50, 30, 40)}]] סמ״ק` },
            { q: m`כמה קוביות של $1$ ס״מ נכנסות בתיבה $4 \times 3 \times 2$ ס״מ?`, a: m`[[${volume(4, 3, 2)}]] קוביות` },
            {
              q: m`עוטפים בנייר קופסה בצורת קובייה שמקצועה $${num(20)}$ ס״מ. כמה סמ״ר נייר צריך לפחות?`,
              a: m`[[${6 * 20 * 20}]] סמ״ר`,
            },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו שטח והיקף.', cols: 1, items: [rect(11, 4)] },
      { title: 'מצאו את הצלע.', cols: 1, items: [{ q: m`היקף הריבוע $28$ ס״מ. אורך הצלע: [[${28 / 4}]] ס״מ` }] },
      { title: 'המירו.', cols: 2, items: [convert(7, 'מ״ר', 'סמ״ר'), convert(25000, 'סמ״ר', 'מ״ר')] },
      { title: 'חשבו את שטח הצורה (המידות בס״מ).', cols: 1, items: [lItem({ W: 9, H: 8, cw: 4, ch: 5 })] },
      { title: 'חשבו את נפח התיבה (המידות בס״מ).', cols: 1, items: [boxVolumeFig(7, 2, 5)] },
      { title: 'חשבו את שטח הפנים.', cols: 1, items: [boxSurface(4, 3, 2)] },
      { title: 'קובייה: חשבו נפח ושטח פנים.', cols: 1, items: [cube(6)] },
      { title: 'מצאו את הגובה.', cols: 1, items: [missingHeight(90, 6, 5)] },
    ],
  },
};
