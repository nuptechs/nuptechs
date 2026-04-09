"use client";
import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

const stats: Stat[] = [
  { value: 490, suffix: "k", label: "lines of production code", sublabel: "across 14 shipped products" },
  { value: 7050, suffix: "+", label: "automated tests", sublabel: "unit, integration, e2e" },
  { value: 17, suffix: "+", label: "government agencies", sublabel: "federal, state, municipal" },
  { value: 18, suffix: "+", label: "years in gov IT", sublabel: "Caixa, Serpro, TRF, ANVISA…" },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return count;
}

function StatItem({ stat, active, delay }: { stat: Stat; active: boolean; delay: number }) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(t);
    }
  }, [active, delay]);
  const count = useCountUp(stat.value, 2000, started);

  return (
    <div className="eng-stat">
      <span className="eng-stat__value">
        {started ? count.toLocaleString("en") : "0"}
        <span className="eng-stat__suffix">{stat.suffix}</span>
      </span>
      <span className="eng-stat__label">{stat.label}</span>
      <span className="eng-stat__sub">{stat.sublabel}</span>
    </div>
  );
}

export default function EngineeringStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="eng-stats-grid">
      {stats.map((s, i) => (
        <StatItem key={s.label} stat={s} active={active} delay={i * 150} />
      ))}
    </div>
  );
}
