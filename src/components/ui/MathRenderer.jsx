import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';

/**
 * מרנדר טקסט עם Markdown + LaTeX (inline: $...$ / block: $$...$$)
 * תומך גם ב-HTML גולמי (span צבעוני, SVG לשרטוטים) בתוך המחרוזת.
 */
export default function MathRenderer({ children, className = '' }) {
  if (children == null || children === '') return null;

  return (
    <div className={`math-content leading-relaxed ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]}>
        {String(children)}
      </ReactMarkdown>
    </div>
  );
}
