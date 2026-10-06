import MathRenderer from '../ui/MathRenderer';
import { blankKey, groupTemplate } from '../../lib/worksheet';
import Blank from './Blank';

/**
 * שורת תרגיל: טקסט/LaTeX עם משבצות באמצע.
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
  const groups = groupTemplate(template);
  const rtl = groups.some((g) => g.type === 'label');
  let b = blankOffset;

  const renderPart = (part, i) => {
    if (part.type === 'text') {
      return part.text.trim() ? (
        <MathRenderer key={i} inline>
          {part.text.trim()}
        </MathRenderer>
      ) : null;
    }
    const k = blankKey(partId, exIdx, itemIdx, b++);
    return (
      <Blank
        key={i}
        blank={part.blank}
        value={values?.[k]}
        mark={marks?.[k]}
        disabled={disabled}
        showAnswer={showAnswers}
        onChange={(v) => onChange(k, v)}
      />
    );
  };

  return (
    <span
      dir={rtl ? 'rtl' : 'ltr'}
      className={`inline-flex flex-wrap items-center gap-x-1.5 gap-y-2 text-lg leading-relaxed ${className}`}
    >
      {groups.map((g, gi) =>
        g.type === 'label' ? (
          <MathRenderer key={gi} inline>
            {g.text.trim()}
          </MathRenderer>
        ) : (
          <span key={gi} dir="ltr" className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-2">
            {g.parts.map(renderPart)}
          </span>
        ),
      )}
    </span>
  );
}
