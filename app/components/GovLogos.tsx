const govClients = [
  { name: "Caixa Econômica Federal", abbr: "CAIXA" },
  { name: "Serpro", abbr: "SERPRO" },
  { name: "Banco de Brasília", abbr: "BRB" },
  { name: "Tribunal Regional Federal", abbr: "TRF" },
  { name: "Ministério da Saúde", abbr: "MS" },
  { name: "Ministério da Justiça", abbr: "MJ" },
  { name: "ANVISA", abbr: "ANVISA" },
  { name: "Anatel", abbr: "ANATEL" },
  { name: "Agência Nacional de Águas", abbr: "ANA" },
  { name: "Detran-DF", abbr: "DETRAN" },
  { name: "CAESB", abbr: "CAESB" },
  { name: "SUFRAMA", abbr: "SUFRAMA" },
];

export default function GovLogos() {
  return (
    <section className="gov-section" aria-label="Instituições atendidas">
      <div className="inner">
        <p className="gov-section__label">
          Expertise adquirida em projetos para
        </p>
        <div className="gov-grid">
          {govClients.map((c) => (
            <div key={c.abbr} className="gov-chip" title={c.name}>
              <span className="gov-chip__icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
                </svg>
              </span>
              <span className="gov-chip__name">{c.abbr}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
