import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/**
 * מרנדר טקסט עם Markdown + LaTeX (inline: $...$ / block: $$...$$)
 */
export default function MathRenderer({ children, className = '' }) {
  if (children == null || children === '') return null;

  return (
    <div className={`math-content leading-relaxed ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {String(children)}
      </ReactMarkdown>
    </div>
  );
}
