'use client';

import { useEffect, useRef } from 'react';

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
}

export default function TextReveal({ children, as: Tag = 'p', className = '', delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('text-revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('text-revealed'), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const words = children.split(' ');

  return (
    <Tag
      ref={ref as any}
      className={`text-reveal ${className}`}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="text-reveal__word"
          style={{ '--word-index': i } as React.CSSProperties}
        >
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}
