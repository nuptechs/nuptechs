"use client";
import { useEffect, useRef, useState } from "react";

type Lang = "pt" | "en" | "es";

interface Stat {
  value: number;
  suffix: string;
  label: Record<Lang, string>;
  sublabel: Record<Lang, string>;
}

const stats: Stat[] = [
  { value: 490, suffix: "k", label: { pt: "linhas de código em produção", en: "lines of production code", es: "líneas de código en producción" }, sublabel: { pt: "em 14 produtos entregues", en: "across 14 shipped products", es: "en 14 productos entregados" } },
  { value: 7050, suffix: "+", label: { pt: "testes automatizados", en: "automated tests", es: "tests automatizados" }, sublabel: { pt: "unitários, integração, e2e", en: "unit, integration, e2e", es: "unitarios, integración, e2e" } },
  { value: 17, suffix: "+", label: { pt: "órgãos governamentais", en: "government agencies", es: "órganos gubernamentales" }, sublabel: { pt: "federal, estadual, distrital", en: "federal, state, municipal", es: "federal, estatal, municipal" } },
  { value: 18, suffix: "+", label: { pt: "anos em TI governamental", en: "years in gov IT", es: "años en TI gubernamental" }, sublabel: { pt: "Caixa, Serpro, TRF, ANVISA…", en: "Caixa, Serpro, TRF, ANVISA…", es: "Caixa, Serpro, TRF, ANVISA…" } },
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

function StatItem({ stat, active, delay, lang }: { stat: Stat; active: boolean; delay: number; lang: Lang }) {
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
      <span className="eng-stat__label">{stat.label[lang]}</span>
      <span className="eng-stat__sub">{stat.sublabel[lang]}</span>
    </div>
  );
}

export default function EngineeringStats({ lang = "pt" }: { lang?: Lang }) {
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
        <StatItem key={s.label[lang]} stat={s} active={active} delay={i * 150} lang={lang} />
      ))}
    </div>
  );
}
