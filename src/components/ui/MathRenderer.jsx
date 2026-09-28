import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';

/**
 * מרנדר טקסט עם Markdown + LaTeX (inline: $...$ / block: $$...$$)
 * תומך גם ב-HTML גולמי (span צבעוני, SVG לשרטוטים) בתוך המחרוזת.
 */
export default function MathRenderer({ children, className = '', inline = false }) {
  if (children == null || children === '') return null;

  // inline: בתוך כותרת/כפתור — בלי <div>/<p> שאסורים שם
  if (inline) {
    return (
      <span className={`math-content ${className}`}>
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={{ p: ({ children: c }) => <>{c}</> }}
        >
          {String(children)}
        </ReactMarkdown>
      </span>
    );
  }

  return (
    <div className={`math-content leading-relaxed ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]}>
        {String(children)}
      </ReactMarkdown>
    </div>
  );
}
