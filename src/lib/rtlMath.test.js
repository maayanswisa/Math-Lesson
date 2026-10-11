import { describe, expect, it } from 'vitest';
import { findRtlIssues } from './rtlMath';

const rules = (md) => findRtlIssues(md).map((i) => i.rule);

describe('findRtlIssues', () => {
  it.each([
    ['היקף ריבוע $=$ $4$ $\\times$ צלע'],
    ['שטח משולש $=$ $\\dfrac{\\text{בסיס}\\times\\text{גובה}}{2}$'],
    ['$f\'(x)>0$ ⇐ $f$ עולה'],
    ['מתחלק ב-$2$: יחידות $0,2,4,6,8$'],
    ['$\\displaystyle\\int_a^b f(x)\\,dx=F(b)-F(a)$ כאשר $F\'=f$'],
    ['$P(A)+P(\\bar{A})=1$'],
    ['$0\\le P(\\text{מאורע})\\le 1$'],
    ['$=$ שווה, $<$ קטן מ-, $>$ גדול מ-'],
    ['הנגדי של $a$ הוא $-a$'],
    ['ייתכנו אסימפטוטות ב-$+\\infty$ וב-$-\\infty$'],
    ['$x^2=9$ ← $\\pm3$'],
    ['שני שינויים: $+10\\%$ ואז $-10\\%$'],
    ['$$P(A)=\\frac{k}{n}$$'],
  ])('accepts %s', (md) => {
    expect(rules(md)).toEqual([]);
  });

  it.each([
    ['היקף ריבוע $= 4\\times$ צלע', 'operator-at-start'],
    ['ממוצע $=\\dfrac{\\text{סכום}}{\\text{מספר}}$', 'operator-at-start'],
    ['$|a|=$ המרחק מ-$0$', 'operator-at-end'],
    ['$5$ עשרות $+6$ יחידות', 'operator-at-start'],
    ['יחס דמיון $k$ ⇒ יחס שטחים', 'right-arrow-in-text'],
    ['ק"מ $\\to$ מ\'', 'right-arrow-in-text'],
    ['מונה $>$ מכנה', 'comparison-between-words'],
    ['**מתחת לשורש** $\\ge$ $0$', 'comparison-between-words'],
    ['טבעיים $\\subset$ שלמים', 'comparison-between-words'],
    ['שטח ריבוע $=$ צלע$^2$', 'script-on-hebrew'],
    ['זווית קהה $90°$-$180°$', 'symbol-between-formulas'],
    ['$a=1$, \\ $b=2$', 'stray-backslash'],
    ['כפל ב-$10/100/1000$', 'slash-list'],
    ['$(\\text{שלם}\\div100)\\times\\text{אחוזים}$', 'hebrew-in-ordered-formula'],
    ['$P(\\text{לא }A)$', 'hebrew-next-to-variable'],
  ])('flags %s', (md, rule) => {
    expect(rules(md)).toContain(rule);
  });
});
