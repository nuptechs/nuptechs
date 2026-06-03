# Principles Catalog

> **Artefato TOGAF — Preliminary Phase.** Catálogo formal de princípios de arquitetura. Cada princípio segue o template TOGAF canônico (**Name · Statement · Rationale · Implications**) e é rastreável a drivers de negócio e requisitos. Princípios são *duráveis* — mudam só por decisão de governança registrada.

**Convenção:** princípios de negócio (PN), de dado (PD), de aplicação (PAp), de tecnologia (PT) e os transversais já cravados (PA-01..08, ver [00-preliminary](../00-preliminary.md)). Aqui consolidam-se e formalizam-se todos.

---

## Princípios de Negócio

### PN-01 · Plataforma sobre produtos
- **Statement:** A NuPTechs é uma plataforma de capacidades reusáveis; produtos verticais são clientes da plataforma, não silos independentes.
- **Rationale:** É a tese central de valor (Fase A) — reduz custo marginal de cada novo produto e sustenta a narrativa de plataforma para investidor.
- **Implications:** Toda capacidade transversal nova é avaliada para virar pilar/pacote antes de ser embutida num produto. Métrica de adoção dos pilares é KPI de arquitetura.

### PN-02 · Conformidade é requisito de produto, não add-on
- **Statement:** Em produtos do setor público e que tratam dado pessoal, conformidade (Lei 14.133, LGPD) é modelada no domínio desde o início.
- **Rationale:** O fosso competitivo do easynup é justamente a profundidade de conformidade; retrofit de compliance é caro e arriscado.
- **Implications:** Glosa como ato administrativo fundamentado (ADR-049), direitos LGPD como serviço de 1ª classe (`exerciseDataSubjectRight.v1`), retenção legal modelada por entidade.

### PN-03 · Decisão assistida por IA, nunca automatizada em ato administrativo
- **Statement:** IA fundamenta e recomenda; o ato administrativo (glosa, aceite, parecer) é do gestor humano.
- **Rationale:** Exigência legal do setor público + redução de risco; reflete entendimento profundo da regra (ADR-049 removeu o executor de glosa automática).
- **Implications:** Toda saída de IA em fluxo de contrato é apresentada como opção fundamentada com citação verificável; nunca aciona efeito financeiro sozinha.

---

## Princípios de Dado

### PD-01 · Dado pertence a um tenant (multi-tenant por desenho)
- **Statement:** Todo dado de aplicação carrega escopo de organização; acesso é mediado por escopo derivado da identidade, nunca do payload.
- **Rationale:** Vazamento cross-tenant é falha crítica; há histórico real de bugs dessa classe (R3).
- **Implications:** `TenantGuardComponent.currentOrganizationId()` deriva org só do JWT (`:64-70`); Specs filtram por `byOrganization`; RLS Postgres como defesa-em-profundidade (a ativar — R2); namespaces RAG isolados por org.

### PD-02 · Fonte única de verdade por domínio de dado
- **Statement:** Cada domínio de dado tem um sistema-dono; outros consomem por interface, não por acesso direto ao banco.
- **Rationale:** Evita acoplamento de schema e divergência; o IdP é dono de identidade/permissão, o easynup de contratos, etc.
- **Implications:** Permissões vêm do NuPIdentify via manifesto+sync; bancos compartilhados (School↔Salon na 5433) são dívida a desacoplar.

### PD-03 · Dado pessoal é minimizado, rastreável e tem ciclo de vida
- **Statement:** Coleta-se o mínimo; todo acesso/alteração a dado pessoal é auditável; retenção e descarte são definidos por base legal.
- **Rationale:** LGPD (Art. 6 minimização, Art. 18 direitos) + dado sensível de menores (NuP-School) exige rigor.
- **Implications:** `LgpdRightType` (ACCESS sem payload, EXPORT, ERASURE, ANONYMIZATION); `DataRetentionPolicy` por entidade; toda operação na cadeia HMAC; DPIA obrigatório para biometria de menores (R5).

---

## Princípios de Aplicação

### PAp-01 · Hexagonal — domínio isolado por portas
- **Statement:** Lógica de domínio fala com o mundo por portas; adapters são substituíveis e não vazam tipos de infra/provider.
- **Rationale:** É a cultura técnica já consolidada (easynup 6 ports, gateway 17, Sentinel 17, Sales/Orbit hexagonais) e o que torna a extração para pacotes viável.
- **Implications:** Novo serviço nasce hexagonal; IA via porta (`LLMProviderPort`), pagamento via porta, etc. Trocar provider é trocar adapter, não reescrever.

### PAp-02 · Reuso antes de criação
- **Statement:** Antes de criar entidade/serviço/componente, busca-se o existente; se cobre ≥50%, estende-se.
- **Rationale:** Já é regra operacional (AGENTS.md §2.5); evita o caso `reference_table` (1069 LOC quase reproposta).
- **Implications:** Capacidade transversal vem de `@nuptechs/*`; revisão de PR valida reuso.

### PAp-03 · Contrato de mensagem padronizado
- **Statement:** Toda resposta de API segue `{success,data} | {success,error:{code,...}}` nas 3 camadas, trilíngue.
- **Rationale:** ADR-033/034 — previsibilidade, i18n governado, observabilidade.
- **Implications:** Lint em ERROR como gate de CI; mensagens via MessageSource/Tolgee.

---

## Princípios de Tecnologia

### PT-01 · Deploy reprodutível e portável
- **Statement:** Todo serviço deployável tem Dockerfile + healthcheck + migrations no startup; roda em Railway, cloud genérica ou on-prem.
- **Rationale:** On-prem é requisito de venda gov; Replit não é produção; reprodutibilidade é pré-requisito de escala. **Gap real: nupai-gateway não tem deploy (R/G).**
- **Implications:** Sair de Replit (study, Services, Chunks, kan, AIHub); criar Dockerfile do gateway; HML auto em `main`, prod manual.

### PT-02 · Auditoria fail-closed e tamper-proof
- **Statement:** Eventos sensíveis entram numa cadeia HMAC encadeada, cross-process, que falha fechado.
- **Rationale:** Diferencial de compliance real e já implementado (CHAIN_VERSION 3, Java↔Node byte-compatível).
- **Implications:** Nunca remover `HibernateAuditEventListener` (test de arquitetura/ArchUnit recomendado — R12); `AUDIT_HASH_SECRET` ≥32 chars, gerido como segredo de plataforma; separar do salt LGPD (R6).

### PT-03 · Segredos nunca versionados
- **Statement:** Nenhum segredo em arquivo sob controle de versão; segredos via env de plataforma/secret manager, com rotação.
- **Rationale:** Violado hoje (R1 Orbit chave Anthropic viva; R: nup-aim JWT; R8 School webhook).
- **Implications:** `gitleaks` pre-commit + CI; rotacionar os 3 segredos expostos; purgar histórico; adotar abstração de secret manager.

### PT-04 · Observabilidade padrão
- **Statement:** Serviços de produção expõem tracing (OTel), métricas (Prometheus) e logs estruturados.
- **Rationale:** Operação em escala e auto-conformidade (Sentinel) exigem sinal uniforme.
- **Implications:** Adotar stack OTel→Tempo/Prometheus/Grafana do easynup como padrão; probe como captura opcional.

---

## Transversais (cravados em 00-preliminary)

| ID | Princípio | Status de conformidade (resumo) |
|---|---|---|
| PA-01 | Identidade centralizada (NuPIdentify) | 🟡 ~70% dos produtos; 4 satélites fora |
| PA-02 | IA por gateway único | 🔴 adoção zero; gateway sem deploy |
| PA-03 | Capacidade comum vira pacote | 🟡 forte em billing/payments; disperso no resto |
| PA-04 | Auditoria fail-closed | 🟢 easynup/Sentinel; 🟡 não-uniforme |
| PA-05 | Deploy reprodutível | 🟡 Railway padrão; 5 em Replit; gateway sem deploy |
| PA-06 | Multi-tenant por desenho | 🟡 app-layer ativa; RLS dormente |
| PA-07 | ADR antes do código | 🟢 easynup/platform/Sentinel; satélites sem |
| PA-08 | Evidência sobre especulação | 🟢 (esta EA é construída assim) |

---

## Rastreabilidade princípio → requisito

Cada princípio gera requisitos verificáveis na [Architecture Requirements Specification](../09-architecture-requirements-specification.md). Ex: PD-01 → REQ-SEC-02 (RLS ativa) + REQ-SEC-03 (testes cross-tenant em CI); PT-03 → REQ-SEC-01 (zero segredos versionados).
