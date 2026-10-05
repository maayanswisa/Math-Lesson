import MathRenderer from '../ui/MathRenderer';
import { blankKey, parseTemplate } from '../../lib/worksheet';
import Blank from './Blank';

/** בלי LaTeX — כדי לזהות אם בשורה יש עברית (ואז היא מימין לשמאל). */
const hasHebrew = (str) => /[֐-׿]/.test(String(str).replace(/\$[^$]*\$/g, ''));

/**
 * שורת תרגיל: טקסט/LaTeX עם משבצות באמצע.
 * שורה שכולה מתמטיקה נכתבת משמאל לימין (3/4 = __), שורה בעברית מימין לשמאל.
 * blankOffset — אינדקס המשבצת הראשונה (שורת התשובה ממשיכה את המספור של השאלה).
 */
export default function TemplateLine({
  template,
  at,
  blankOffset = 0,
  values,
  marks,
  disabled,
  showAnswers,
  onChange,
  className = '',
}) {
  const [partId, exIdx, itemIdx] = at;
  let b = blankOffset;
  return (
    <span
      dir={hasHebrew(template) ? 'rtl' : 'ltr'}
      className={`inline-flex flex-wrap items-center gap-x-1.5 gap-y-2 text-lg leading-relaxed ${className}`}
    >
      {parseTemplate(template).map((seg, i) => {
        if (seg.type === 'text') {
          return seg.text.trim() ? (
            <MathRenderer key={i} inline>
              {seg.text.trim()}
            </MathRenderer>
          ) : null;
        }
        const k = blankKey(partId, exIdx, itemIdx, b++);
        return (
          <Blank
            key={i}
            blank={seg.blank}
            value={values?.[k]}
            mark={marks?.[k]}
            disabled={disabled}
            showAnswer={showAnswers}
            onChange={(v) => onChange(k, v)}
          />
        );
      })}
    </span>
  );
}
