"use client";
import { useEffect, useRef, useState } from "react";

type Lang = "pt" | "en" | "es";

interface Stat {
  value: number;
  suffix: string;
  decimals?: number;
  label: Record<Lang, string>;
  sublabel: Record<Lang, string>;
}

const stats: Stat[] = [
  { value: 200, suffix: "+", label: { pt: "projetos entregues", en: "projects delivered", es: "proyectos entregados" }, sublabel: { pt: "para governo e enterprise", en: "for government and enterprise", es: "para gobierno y enterprise" } },
  { value: 15, suffix: "", label: { pt: "produtos próprios em produção", en: "proprietary products in production", es: "productos propios en producción" }, sublabel: { pt: "SaaS, plataformas e bibliotecas", en: "SaaS, platforms and libraries", es: "SaaS, plataformas y bibliotecas" } },
  { value: 17, suffix: "+", label: { pt: "órgãos governamentais", en: "government agencies", es: "órganos gubernamentales" }, sublabel: { pt: "federal, estadual, distrital", en: "federal, state, municipal", es: "federal, estatal, municipal" } },
  { value: 18, suffix: "+", label: { pt: "anos de experiência em TI gov", en: "years of gov IT experience", es: "años de experiencia en TI gov" }, sublabel: { pt: "do nosso fundador — Caixa, Serpro, TRF…", en: "of our founder — Caixa, Serpro, TRF…", es: "de nuestro fundador — Caixa, Serpro, TRF…" } },
];

function useCountUp(target: number, duration: number, active: boolean, decimals = 0) {
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
      const factor = 10 ** decimals;
      const current = Math.round(eased * target * factor) / factor;
      setCount(current);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active, decimals]);
  return count;
}

const localeMap: Record<Lang, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
};

function formatStatValue(value: number, decimals: number, lang: Lang) {
  return value.toLocaleString(localeMap[lang], {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function StatItem({ stat, active, delay, lang }: { stat: Stat; active: boolean; delay: number; lang: Lang }) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(t);
    }
  }, [active, delay]);
  const decimals = stat.decimals ?? 0;
  const count = useCountUp(stat.value, 2000, started, decimals);

  return (
    <div className="eng-stat">
      <span className={`eng-stat__value${started ? " is-active" : ""}`}>
        {started ? formatStatValue(count, decimals, lang) : formatStatValue(stat.value, decimals, lang)}
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
    <div ref={ref} className="eng-stats-grid" data-reveal-group>
      {stats.map((s, i) => (
        <div key={s.label[lang]} data-reveal-item>
          <StatItem stat={s} active={active} delay={i * 150} lang={lang} />
        </div>
      ))}
    </div>
  );
}
