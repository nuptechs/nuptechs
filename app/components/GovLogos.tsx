type Lang = "pt" | "en" | "es";

interface GovClient {
  name: string;
  abbr: string;
  color: string;
  icon: JSX.Element;
}

/* ── Unique SVG icons per agency ── */

const iconCaixa = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="10" width="18" height="11" rx="1" /><path d="M7 10V7a5 5 0 0 1 10 0v3" /><circle cx="12" cy="16" r="2" />
  </svg>
);

const iconSerpro = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="1" /><rect x="2" y="14" width="20" height="8" rx="1" /><circle cx="6" cy="6" r="1" fill="currentColor" /><circle cx="6" cy="18" r="1" fill="currentColor" />
  </svg>
);

const iconBrb = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M5 21V8l7-5 7 5v13" /><path d="M9 21v-4h6v4" /><rect x="9" y="11" width="2" height="2" /><rect x="13" y="11" width="2" height="2" />
  </svg>
);

const iconTrf = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v3M4 9l3-3h10l3 3" /><path d="M7 9v3a2 2 0 0 0 4 0V9M13 9v3a2 2 0 0 0 4 0V9" /><line x1="12" y1="15" x2="12" y2="21" /><line x1="8" y1="21" x2="16" y2="21" />
  </svg>
);

const iconSaude = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" />
  </svg>
);

const iconJustica = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a3 3 0 0 0-3 3v1h6V6a3 3 0 0 0-3-3z" /><rect x="5" y="7" width="14" height="13" rx="1" /><path d="M12 11v4M10 13h4" />
  </svg>
);

const iconAnvisa = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" /><path d="M12 7v4l2 2" /><path d="M8 16l1-3h6l1 3" />
  </svg>
);

const iconAnatel = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20V10" /><path d="M6 20v-6" /><path d="M18 20v-6" /><path d="M3 20v-3" /><path d="M21 20v-3" /><path d="M8.5 4A7 7 0 0 1 12 3a7 7 0 0 1 3.5 1" /><path d="M9.5 7a4 4 0 0 1 5 0" /><circle cx="12" cy="10" r="1" fill="currentColor" />
  </svg>
);

const iconAna = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10" /><path d="M2 12h10" /><path d="M12 2v10" /><path d="M20 16a4 4 0 1 1-4 4" /><path d="M20 16v4h-4" />
  </svg>
);

const iconDetran = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="7" cy="15" r="2" /><circle cx="17" cy="15" r="2" /><path d="M5 6l3-3h8l3 3" /><path d="M2 10h20" />
  </svg>
);

const iconCaesb = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c-3 7-8 9-8 14a8 8 0 0 0 16 0c0-5-5-7-8-14z" />
  </svg>
);

const iconSuframa = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h20" /><path d="M5 20V9l4-5h6l4 5v11" /><path d="M9 20v-5h6v5" /><path d="M8 10h8" /><path d="M5 9l7-2 7 2" />
  </svg>
);

const govClients: GovClient[] = [
  { name: "Caixa Econômica Federal", abbr: "CAIXA", color: "#f37021", icon: iconCaixa },
  { name: "Serpro", abbr: "SERPRO", color: "#00a650", icon: iconSerpro },
  { name: "Banco de Brasília", abbr: "BRB", color: "#e30613", icon: iconBrb },
  { name: "Tribunal Regional Federal", abbr: "TRF", color: "#1b3d6d", icon: iconTrf },
  { name: "Ministério da Saúde", abbr: "MS", color: "#00703c", icon: iconSaude },
  { name: "Ministério da Justiça", abbr: "MJ", color: "#1a4a8a", icon: iconJustica },
  { name: "ANVISA", abbr: "ANVISA", color: "#005f87", icon: iconAnvisa },
  { name: "Anatel", abbr: "ANATEL", color: "#003b71", icon: iconAnatel },
  { name: "Agência Nacional de Águas", abbr: "ANA", color: "#0068b4", icon: iconAna },
  { name: "Detran-DF", abbr: "DETRAN", color: "#003399", icon: iconDetran },
  { name: "CAESB", abbr: "CAESB", color: "#0097c4", icon: iconCaesb },
  { name: "SUFRAMA", abbr: "SUFRAMA", color: "#004d29", icon: iconSuframa },
];

const i18nLabel: Record<Lang, string> = {
  pt: "Experiência conquistada em projetos para",
  en: "Expertise built through projects for",
  es: "Experiencia adquirida en proyectos para",
};

const i18nAria: Record<Lang, string> = {
  pt: "Instituições atendidas",
  en: "Institutions served",
  es: "Instituciones atendidas",
};

export default function GovLogos({ lang = "pt" }: { lang?: Lang }) {
  const marqueeClients = [...govClients, ...govClients];

  return (
    <section className="gov-section" aria-label={i18nAria[lang]}>
      <div className="inner">
        <p className="gov-section__label">
          {i18nLabel[lang]}
        </p>

        <div className="logo-marquee gov-marquee" data-reveal>
          <div className="logo-marquee__track">
            {marqueeClients.map((c, index) => (
              <div
                key={`${c.abbr}-${index}`}
                className="gov-chip gov-chip--marquee"
                title={c.name}
                aria-hidden={index >= govClients.length ? true : undefined}
                style={{ borderColor: `${c.color}40`, ["--gov-accent" as string]: c.color }}
              >
                <span className="gov-chip__icon" aria-hidden="true" style={{ color: c.color }}>
                  {c.icon}
                </span>
                <span className="gov-chip__name">{c.abbr}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
