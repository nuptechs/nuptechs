"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Link from "next/link";
import Mermaid from "./Mermaid";
import { resolveHref, slugify, nodeToText } from "./links";

/** Renderiza markdown da EA: mermaid, links internos reescritos, headings com id, highlight. */
export default function Markdown({ source, currentDir }: { source: string; currentDir: string }) {
  return (
    <div className="md-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code(props) {
            const { className, children } = props as { className?: string; children?: unknown };
            const lang = /language-(\w+)/.exec(className || "")?.[1];
            if (lang === "mermaid") return <Mermaid chart={String(children)} />;
            return <code className={className}>{children as React.ReactNode}</code>;
          },
          a(props) {
            const { href, children } = props as { href?: string; children?: React.ReactNode };
            const resolved = resolveHref(href, currentDir);
            if (resolved.startsWith("/")) return <Link href={resolved}>{children}</Link>;
            return (
              <a href={resolved} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          },
          h2(props) {
            const id = slugify(nodeToText(props.children));
            return <h2 id={id}>{props.children as React.ReactNode}</h2>;
          },
          h3(props) {
            const id = slugify(nodeToText(props.children));
            return <h3 id={id}>{props.children as React.ReactNode}</h3>;
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
