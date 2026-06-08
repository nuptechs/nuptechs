/**
 * Canonical product list for the NuPtechs website.
 *
 * Single source of truth used by:
 *  - `<ProductShowcase>` (used in home + /[lang] pages) — reads `text` (trilingual showcase data).
 *  - `/produtos` (Portuguese listing index) — reads `text.pt.tagline` + `status` + `category`.
 *  - `/produtos/[slug]` (Portuguese product detail) — reads `pageContent` (PT-only rich data).
 *
 * When a product gets a localized detail page (e.g. `/en/products/easynup`),
 * extend `pageContent` to a `Record<Lang, PageContent>` and update the route.
 */

export type Lang = "pt" | "en" | "es";
export type ProductCategory = "platform" | "devtools" | "ai" | "productivity" | "data" | "vertical";
export type ProductStatus = "live" | "beta" | "alpha";

export interface ProductText {
  tagline: string;
  description: string;
  stats: { label: string; value: string }[];
}

export interface PageFeature {
  iconId: string;
  title: string;
  desc: string;
}

export interface PageContent {
  headline: string;
  features: PageFeature[];
  useCases: string[];
  keywords: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  status: ProductStatus;
  tech: string[];
  text: Record<Lang, ProductText>;
  pageContent: PageContent;
}

export const products: Product[] = [
  // ───────────────────────────── PLATAFORMAS ─────────────────────────────
  {
    id: "easynup",
    slug: "easynup",
    name: "EasyNuP",
    category: "platform",
    status: "live",
    tech: ["Java 21", "Spring Boot", "Vue 3", "PostgreSQL", "Redis", "BullMQ"],
    text: {
      pt: {
        tagline: "Gestão de Contratos e Workflows",
        description:
          "Plataforma enterprise para gestão do ciclo de vida de contratos de TI com análise documental por IA, designer visual de workflows BPMN e dashboards executivos 360°. Construída para conformidade com o setor público brasileiro (Lei 14.133/2021, Decreto 11.246/2022, IN SGD/ME 94/2022).",
        stats: [
          { label: "Linhas de código", value: "591k" },
          { label: "Testes automatizados", value: "6.100+" },
          { label: "Regras de permissão", value: "511" },
          { label: "Entidades de domínio", value: "150+" },
        ],
      },
      en: {
        tagline: "Contract & Workflow Management",
        description:
          "Enterprise platform for IT contract lifecycle management with AI-powered document analysis, visual BPMN workflow designer, and 360° executive dashboards. Built for Brazilian public sector compliance.",
        stats: [
          { label: "Lines of code", value: "591k" },
          { label: "Automated tests", value: "6,100+" },
          { label: "Permission rules", value: "511" },
          { label: "Domain entities", value: "150+" },
        ],
      },
      es: {
        tagline: "Gestión de Contratos y Workflows",
        description:
          "Plataforma enterprise para gestión del ciclo de vida de contratos de TI con análisis documental por IA, diseñador visual de workflows BPMN y dashboards ejecutivos 360°.",
        stats: [
          { label: "Líneas de código", value: "591k" },
          { label: "Tests automatizados", value: "6.100+" },
          { label: "Reglas de permiso", value: "511" },
          { label: "Entidades de dominio", value: "150+" },
        ],
      },
    },
    pageContent: {
      headline: "Gestão de contratos públicos com IA, conformidade e auditoria fim-a-fim.",
      features: [
        { iconId: "clipboard", title: "Ciclo de vida completo", desc: "Da licitação ao TRD: termo de referência, contrato, aditivos, ordens de serviço, aceite, glosa fundamentada e encerramento — tudo na mesma plataforma." },
        { iconId: "robot", title: "Análise documental por IA", desc: "Risk Analyzer lê o TR/contrato e correlaciona com a Lei 14.133, IN SGD 94/2022 e as diretrizes do gestor para apontar riscos com fundamentação citável." },
        { iconId: "lock", title: "Auditoria HMAC tamper-proof", desc: "Cadeia HMAC-SHA256 in-process registra cada ação crítica (contratação, glosa, aceite). Verificação de integridade exposta no painel de auditoria." },
        { iconId: "bolt", title: "Workflows visuais + DMN", desc: "Editor BPMN drag-and-drop com motor FEEL 100% spec-compliant, hit policies DMN, BKM e Decision Services — mesma engine usada por enterprises de payment." },
        { iconId: "chart", title: "Dashboards 360°", desc: "Apache ECharts em 5 painéis hierárquicos (Gestão 360 + 4 áreas de auditoria) com Execution Intelligence Layer cruzando OS, ANS, glosas e financeiro." },
        { iconId: "building", title: "Integração gov.br + PNCP", desc: "Pronta para eSocial, gov.br, PNCP. Segregação de campos custom PNCP-publicáveis vs internos por força do Art. 174 da Lei 14.133." },
      ],
      useCases: [
        "Órgãos federais e estaduais que precisam comprovar conformidade com Lei 14.133",
        "Equipes de fiscalização e gestão de contratos de TI de grande porte",
        "Operações com SLA, glosas e termos aditivos recorrentes",
        "Implantações on-premise com auditoria HMAC obrigatória",
      ],
      keywords: [
        "gestão de contratos públicos",
        "Lei 14.133 software",
        "Decreto 11.246",
        "EasyNuP NuPtechs",
        "BPMN governamental",
        "auditoria HMAC contratos TI",
      ],
    },
  },
  {
    id: "nupidentify",
    slug: "nupidentify",
    name: "NuPIdentify",
    category: "platform",
    status: "live",
    tech: ["Node.js", "TypeScript", "React", "PostgreSQL", "Drizzle ORM"],
    text: {
      pt: {
        tagline: "Identidade e Controle de Acesso",
        description:
          "IAM de produção com OIDC/OAuth 2.1, SAML 2.0, provisionamento SCIM, WebAuthn/Passkeys e autorização multicamada (RBAC + ABAC + ReBAC). Multi-tenant com faturamento integrado ao Stripe.",
        stats: [
          { label: "Tabelas no banco", value: "70" },
          { label: "Protocolos de auth", value: "5" },
          { label: "Testes unitários", value: "2.110+" },
          { label: "Páginas no frontend", value: "53" },
        ],
      },
      en: {
        tagline: "Identity & Access Management",
        description:
          "Production-grade IAM with OIDC/OAuth 2.1, SAML 2.0, SCIM provisioning, WebAuthn/Passkeys, and multi-layered authorization (RBAC + ABAC + ReBAC). Multi-tenant, Stripe-integrated billing.",
        stats: [
          { label: "Database tables", value: "70" },
          { label: "Auth protocols", value: "5" },
          { label: "Unit tests", value: "2,110+" },
          { label: "Frontend pages", value: "53" },
        ],
      },
      es: {
        tagline: "Identidad y Control de Acceso",
        description:
          "IAM de producción con OIDC/OAuth 2.1, SAML 2.0, provisionamiento SCIM, WebAuthn/Passkeys y autorización multicapa (RBAC + ABAC + ReBAC). Multi-tenant con facturación integrada a Stripe.",
        stats: [
          { label: "Tablas en la base", value: "70" },
          { label: "Protocolos de auth", value: "5" },
          { label: "Tests unitarios", value: "2.110+" },
          { label: "Páginas del frontend", value: "53" },
        ],
      },
    },
    pageContent: {
      headline: "Identidade, autenticação e autorização — sem reinventar a roda a cada produto.",
      features: [
        { iconId: "lock", title: "5 protocolos de autenticação", desc: "OIDC/OAuth 2.1 com PKCE, SAML 2.0, WebAuthn/Passkeys, SCIM para provisionamento e API tokens M2M. Tudo em um único provider." },
        { iconId: "key", title: "RBAC + ABAC + ReBAC", desc: "Autorização em três camadas: papéis tradicionais (RBAC), atributos (ABAC com 16 operadores) e grafo de relações (ReBAC estilo Zanzibar) — combináveis em DSL única." },
        { iconId: "building", title: "Multi-tenant nativo", desc: "Isolamento por tenant na infra, billing por seat ou consumo via Stripe, claim de organization_id no token, painel admin por organização." },
        { iconId: "shield", title: "Step-up & risk-based auth", desc: "Reautenticação adaptativa para ações sensíveis (transferência, mudança de senha, aprovação de glosa). Trilha de auditoria por sessão." },
        { iconId: "refresh", title: "Migração assistida", desc: "Adapters prontos para Auth0, Keycloak e Okta. Manifesto de integração documentado em ADR-0014 — playbook de adoção em ~5–15 dias por app." },
      ],
      useCases: [
        "Equipes que querem sair de Auth0/Keycloak para reduzir custo por seat",
        "Aplicações multi-tenant que precisam de RBAC + ABAC + ReBAC combinados",
        "Sistemas regulados que exigem WebAuthn/Passkeys + auditoria forense",
        "Backends que substituem 3-4 ferramentas (IAM + permissões + billing) por uma",
      ],
      keywords: [
        "IAM open source Brasil",
        "alternativa Auth0",
        "OIDC SAML WebAuthn",
        "NuPIdentify NuPtechs",
        "RBAC ABAC ReBAC",
        "Keycloak alternative",
      ],
    },
  },
  {
    id: "nupai-gateway",
    slug: "nupai-gateway",
    name: "nupai-gateway",
    category: "platform",
    status: "live",
    tech: ["Express.js", "TypeScript", "LiteLLM", "Langfuse", "BAML"],
    text: {
      pt: {
        tagline: "AI Gateway agnóstico de provider",
        description:
          "Camada HTTP unificada na frente de LiteLLM, vetores, guardrails e observability. Negocia com LLMs em vocabulário de domínio — não em shape de provider. Recipes versionadas, MCP server inbound e SDK tipado em uma única foundation.",
        stats: [
          { label: "Ports hexagonais", value: "14" },
          { label: "Provedores LLM", value: "Plug-in" },
          { label: "Recipes versionadas", value: "6+" },
          { label: "Observability", value: "Langfuse" },
        ],
      },
      en: {
        tagline: "Provider-Agnostic AI Gateway",
        description:
          "Unified HTTP layer in front of LiteLLM, vector stores, guardrails, and observability. Talks to LLMs in domain vocabulary — not provider shapes. Versioned recipes, inbound MCP server, and a typed SDK on a single foundation.",
        stats: [
          { label: "Hexagonal ports", value: "14" },
          { label: "LLM providers", value: "Plug-in" },
          { label: "Versioned recipes", value: "6+" },
          { label: "Observability", value: "Langfuse" },
        ],
      },
      es: {
        tagline: "AI Gateway Agnóstico de Proveedor",
        description:
          "Capa HTTP unificada delante de LiteLLM, vectores, guardrails y observability. Habla con LLMs en vocabulario de dominio — no en shape de provider. Recipes versionadas, MCP server inbound y SDK tipado en una sola foundation.",
        stats: [
          { label: "Ports hexagonales", value: "14" },
          { label: "Proveedores LLM", value: "Plug-in" },
          { label: "Recipes versionadas", value: "6+" },
          { label: "Observability", value: "Langfuse" },
        ],
      },
    },
    pageContent: {
      headline: "Pare de acoplar suas aplicações ao shape de cada LLM. Fale em domínio.",
      features: [
        { iconId: "network", title: "14 ports hexagonais", desc: "Chat, embeddings, recipes, memory, guardrails, audit, billing — cada capacidade é uma porta em vocabulário de domínio. Provider plugável sem refactor." },
        { iconId: "robot", title: "Multi-provider sem lock-in", desc: "Anthropic, OpenAI, Google, Ollama local, Bedrock, LiteLLM — fallback automático, A/B testing por recipe, custo por chamada rastreado." },
        { iconId: "bolt", title: "MCP server inbound", desc: "Recipes expostas como ferramentas MCP — qualquer agente compatível (Claude Code, Cursor, etc.) consome diretamente." },
        { iconId: "scan", title: "Observability nativa", desc: "Traces Langfuse por chamada, prompt diff por versão de recipe, latência p95, custo por tenant e por feature flag." },
        { iconId: "lock", title: "Guardrails + audit chain", desc: "Aprovação de mensagens sensíveis, redação de PII, cadeia HMAC compatível com o resto dos produtos NuPtechs." },
      ],
      useCases: [
        "Times que rodam IA em produção e querem trocar de provider sem riscar o código",
        "Empresas reguladas que precisam guardrails + audit chain + observability por padrão",
        "Quem está construindo agentes MCP e quer expor recipes como ferramentas",
        "Backends que precisam usar o mesmo prompt em chat web, WhatsApp e batch jobs",
      ],
      keywords: [
        "AI gateway empresarial",
        "alternativa LiteLLM",
        "MCP server",
        "nupai-gateway NuPtechs",
        "LLM provider agnostic",
        "Langfuse observability",
      ],
    },
  },
  {
    id: "nup-services",
    slug: "nup-services",
    name: "NuP-Services",
    category: "platform",
    status: "live",
    tech: ["React 18", "Express.js", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
    text: {
      pt: {
        tagline: "Marketplace de Serviços Profissionais",
        description:
          "Plataforma que conecta profissionais a clientes com perfis, portfólios, avaliações/reviews e dashboard de gestão. Sistema de busca com filtros por especialidade e região.",
        stats: [
          { label: "Módulos", value: "6" },
          { label: "Busca", value: "Full-text" },
          { label: "Perfis", value: "Portfolio" },
          { label: "Reviews", value: "Rating" },
        ],
      },
      en: {
        tagline: "Professional Services Marketplace",
        description:
          "Platform connecting professionals with clients through profiles, portfolios, ratings/reviews, and management dashboard. Search system with specialty and region filters.",
        stats: [
          { label: "Modules", value: "6" },
          { label: "Search", value: "Full-text" },
          { label: "Profiles", value: "Portfolio" },
          { label: "Reviews", value: "Rating" },
        ],
      },
      es: {
        tagline: "Marketplace de Servicios Profesionales",
        description:
          "Plataforma que conecta profesionales con clientes a través de perfiles, portafolios, evaluaciones/reviews y dashboard de gestión. Sistema de búsqueda con filtros por especialidad y región.",
        stats: [
          { label: "Módulos", value: "6" },
          { label: "Búsqueda", value: "Full-text" },
          { label: "Perfiles", value: "Portafolio" },
          { label: "Reviews", value: "Rating" },
        ],
      },
    },
    pageContent: {
      headline: "Marketplace branded de serviços profissionais — pronto pra escalar sua marca.",
      features: [
        { iconId: "search", title: "Busca full-text + filtros", desc: "Busca semântica por especialidade, região, faixa de preço e avaliação. Resultados rankeados por relevância e proximidade." },
        { iconId: "clipboard", title: "Perfis com portfólio", desc: "Profissionais carregam projetos passados, certificações, áreas de atuação. Validação automatizada via documento." },
        { iconId: "chart", title: "Reviews + reputação", desc: "Sistema de avaliação cruzada (cliente↔profissional) com agregação por score e badges de qualidade." },
        { iconId: "building", title: "Dashboard de gestão", desc: "Métricas de conversão, funil de orçamento, retenção de profissionais ativos — tudo para o operador da marketplace." },
      ],
      useCases: [
        "Marcas que querem lançar marketplace vertical sem desenvolver do zero",
        "Operadores que precisam matching cliente↔profissional com avaliação",
        "Verticais regulados (advocacia, contabilidade, saúde) que exigem KYC",
        "Plataformas que precisam de billing recorrente integrado",
      ],
      keywords: [
        "marketplace de serviços white-label",
        "NuP-Services NuPtechs",
        "software marketplace vertical",
        "plataforma freelancer Brasil",
      ],
    },
  },

  // ───────────────────────────── VERTICAIS ─────────────────────────────
  {
    id: "nup-school",
    slug: "nup-school",
    name: "NuP-School",
    category: "vertical",
    status: "live",
    tech: ["React 18", "Vite", "Node.js", "PostgreSQL", "WhatsApp"],
    text: {
      pt: {
        tagline: "Gestão Escolar Completa",
        description:
          "Plataforma de gestão escolar com dashboard pedagógico, gestão de ocorrências com link automático para responsáveis via WhatsApp, planos de aula com visibilidade por papel (diretor/coordenador/professor), avaliação por foto de prova e billing integrado.",
        stats: [
          { label: "Módulos pedagógicos", value: "8" },
          { label: "BNCC", value: "Pré-carregada" },
          { label: "Comunicação", value: "WhatsApp" },
          { label: "Avaliação", value: "Por foto IA" },
        ],
      },
      en: {
        tagline: "Complete School Management",
        description:
          "School management platform with a pedagogical dashboard, incident tracking that auto-notifies guardians via WhatsApp, role-based lesson plan visibility (principal/coordinator/teacher), AI photo-based exam grading, and integrated billing.",
        stats: [
          { label: "Pedagogical modules", value: "8" },
          { label: "BNCC curriculum", value: "Preloaded" },
          { label: "Communication", value: "WhatsApp" },
          { label: "Grading", value: "AI photo" },
        ],
      },
      es: {
        tagline: "Gestión Escolar Completa",
        description:
          "Plataforma de gestión escolar con dashboard pedagógico, gestión de ocurrencias con enlace automático a responsables vía WhatsApp, planes de clase con visibilidad por rol (director/coordinador/docente), evaluación por foto de examen con IA y facturación integrada.",
        stats: [
          { label: "Módulos pedagógicos", value: "8" },
          { label: "BNCC", value: "Precargada" },
          { label: "Comunicación", value: "WhatsApp" },
          { label: "Evaluación", value: "Foto + IA" },
        ],
      },
    },
    pageContent: {
      headline: "Gestão escolar que substitui caderno, planilha e grupo de WhatsApp.",
      features: [
        { iconId: "clipboard", title: "Dashboard pedagógico", desc: "Visão por turma, professor, disciplina e aluno. KPIs de presença, desempenho e ocorrências em tempo real." },
        { iconId: "bell", title: "Ocorrências com WhatsApp", desc: "Registro de ocorrência gera link automático e notifica responsáveis pelo WhatsApp. Pais respondem, escola arquiva o histórico." },
        { iconId: "robot", title: "Avaliação por foto com IA", desc: "Professor tira foto da prova, IA lê resposta dissertativa e propõe nota e parecer. Professor revisa e aprova." },
        { iconId: "lock", title: "BNCC pré-carregada", desc: "Base Nacional Curricular Comum embutida — plano de aula, atividades e relatórios já mapeados às habilidades BNCC." },
        { iconId: "chart", title: "Billing integrado", desc: "Mensalidade, descontos, bolsas e inadimplência tudo no mesmo painel. Integração com @nuptechs/billing-school." },
      ],
      useCases: [
        "Escolas particulares (infantil ao médio) que querem digitalizar comunicação com pais",
        "Coordenações pedagógicas que precisam visibilidade de BNCC e progresso por aluno",
        "Redes com múltiplas unidades que centralizam ocorrências e relatórios",
        "Equipes que querem reduzir grupos de WhatsApp para comunicação institucional",
      ],
      keywords: [
        "software gestão escolar BNCC",
        "NuP-School NuPtechs",
        "sistema escola particular",
        "ocorrências WhatsApp escola",
        "avaliação IA prova",
      ],
    },
  },
  {
    id: "nup-sales",
    slug: "nup-sales",
    name: "NuP-Sales",
    category: "vertical",
    status: "live",
    tech: ["Express 5", "Drizzle ORM", "React 19", "React Native", "Stripe", "MercadoPago"],
    text: {
      pt: {
        tagline: "Comércio com PDV, App Mobile e Pagamentos",
        description:
          "Plataforma e-commerce com três perfis nativos (proprietário, funcionário, cliente), PDV web, app mobile React Native e integração com Stripe, MercadoPago e Pagar.me via outbox pattern. Arquitetura hexagonal com pacotes compartilhados.",
        stats: [
          { label: "Perfis RBAC", value: "3" },
          { label: "PSPs integrados", value: "3" },
          { label: "Plataformas", value: "Web + iOS + Android" },
          { label: "Padrão", value: "Outbox" },
        ],
      },
      en: {
        tagline: "Commerce with POS, Mobile App, and Payments",
        description:
          "E-commerce platform with three native profiles (owner, employee, customer), web POS, React Native mobile app, and integration with Stripe, MercadoPago, and Pagar.me via the outbox pattern. Hexagonal architecture with shared packages.",
        stats: [
          { label: "RBAC profiles", value: "3" },
          { label: "PSPs integrated", value: "3" },
          { label: "Platforms", value: "Web + iOS + Android" },
          { label: "Pattern", value: "Outbox" },
        ],
      },
      es: {
        tagline: "Comercio con POS, App Móvil y Pagos",
        description:
          "Plataforma e-commerce con tres perfiles nativos (propietario, empleado, cliente), POS web, app móvil React Native e integración con Stripe, MercadoPago y Pagar.me vía outbox pattern. Arquitectura hexagonal con paquetes compartidos.",
        stats: [
          { label: "Perfiles RBAC", value: "3" },
          { label: "PSPs integrados", value: "3" },
          { label: "Plataformas", value: "Web + iOS + Android" },
          { label: "Patrón", value: "Outbox" },
        ],
      },
    },
    pageContent: {
      headline: "Comércio que vende no balcão, no app e pelo site — com a mesma base.",
      features: [
        { iconId: "building", title: "3 perfis RBAC nativos", desc: "Proprietário (dashboard + estoque + funcionários), funcionário (PDV), cliente (vitrine + carrinho + wishlist) — cada um com UX dedicada." },
        { iconId: "chart", title: "PSPs com outbox", desc: "Stripe, MercadoPago e Pagar.me integrados via @nuptechs/payments-core com outbox pattern — sem perder transação por falha de rede." },
        { iconId: "mobile", title: "App nativo Expo", desc: "iOS e Android com Expo Router. Catálogo, carrinho, checkout e pedidos em tempo real, sincronizados com a web." },
        { iconId: "refresh", title: "Delivery + tracking", desc: "Módulo de envio com adapters plugáveis e tracking integrado. Pacote @nuptechs/delivery v0.3.0." },
        { iconId: "lock", title: "Arquitetura hexagonal", desc: "Domain + Application + Infrastructure separados. Pacotes compartilhados (@nuptechs/commerce, @nuptechs/shared-kernel) viram fundação reusável." },
      ],
      useCases: [
        "Lojas físicas que querem app próprio e PDV integrado, não terceirizado",
        "Operadores omnichannel que precisam balcão + web + mobile sincronizados",
        "Negócios que faturam em Stripe e MercadoPago e precisam reconciliação",
        "Verticais que precisam customizar o catálogo, mas não querem reescrever auth/billing/pagamentos",
      ],
      keywords: [
        "software e-commerce omnichannel",
        "NuP-Sales NuPtechs",
        "PDV + app mobile loja",
        "MercadoPago Pagar.me integrado",
        "react native commerce",
      ],
    },
  },

  // ───────────────────────────── DEVTOOLS ─────────────────────────────
  {
    id: "debug-probe",
    slug: "debug-probe",
    name: "Debug Probe",
    category: "devtools",
    status: "live",
    tech: ["TypeScript", "React 19", "Playwright", "WebSocket", "PostgreSQL"],
    text: {
      pt: {
        tagline: "Debugging Runtime Multicamada",
        description:
          "Captura e correlaciona eventos entre browser, rede, servidor e banco de dados em timelines unificadas. Dashboard em tempo real com visualização waterfall de tracing distribuído.",
        stats: [
          { label: "Casos de teste", value: "1.200+" },
          { label: "Pacotes TS", value: "10" },
          { label: "Adapters de BD", value: "6" },
          { label: "Camadas capturadas", value: "4" },
        ],
      },
      en: {
        tagline: "Multi-Layer Runtime Debugging",
        description:
          "Captures and correlates events across browser, network, server, and database layers into unified timelines. Real-time dashboard with distributed tracing waterfall visualization.",
        stats: [
          { label: "Test cases", value: "1,200+" },
          { label: "TS packages", value: "10" },
          { label: "DB adapters", value: "6" },
          { label: "Capture layers", value: "4" },
        ],
      },
      es: {
        tagline: "Debugging Runtime Multicapa",
        description:
          "Captura y correlaciona eventos entre navegador, red, servidor y base de datos en timelines unificadas. Dashboard en tiempo real con visualización waterfall de tracing distribuido.",
        stats: [
          { label: "Casos de prueba", value: "1.200+" },
          { label: "Paquetes TS", value: "10" },
          { label: "Adapters de BD", value: "6" },
          { label: "Capas capturadas", value: "4" },
        ],
      },
    },
    pageContent: {
      headline: "Debug com a stack toda na mesma timeline. Sem alternar entre 5 ferramentas.",
      features: [
        { iconId: "scan", title: "4 camadas correlacionadas", desc: "Browser (DOM + console + network), gateway, backend e banco — capturadas e linkadas por trace ID. Você clica em um clique e vê a query SQL." },
        { iconId: "bolt", title: "Waterfall distribuído", desc: "Visualização tipo Chrome DevTools, mas atravessando processos: requisição HTTP → handler → ORM → query → resposta com tempos por etapa." },
        { iconId: "refresh", title: "6 adapters de BD", desc: "Postgres, MySQL, MongoDB, Redis, SQLite e arbitrary JDBC — captura de query, plan, latência por chamada." },
        { iconId: "mobile", title: "Dashboard real-time", desc: "Streams via WebSocket — eventos aparecem enquanto o usuário interage. Filtros por usuário, sessão, código de erro." },
      ],
      useCases: [
        "Times que perdem horas correlacionando log de browser + log de backend",
        "Squads que precisam reproduzir bugs intermitentes capturando a sessão real",
        "Aplicações com múltiplos backends que precisam tracing distribuído",
        "QA que precisa anexar timeline real ao bug report",
      ],
      keywords: [
        "runtime debugging full-stack",
        "Debug Probe NuPtechs",
        "distributed tracing browser-backend",
        "alternative datadog logging",
      ],
    },
  },
  {
    id: "manifest",
    slug: "manifest",
    name: "Manifest",
    category: "devtools",
    status: "live",
    tech: ["Java", "Node.js", "React", "OpenAI", "Drizzle ORM"],
    text: {
      pt: {
        tagline: "Análise de Código e Automação de Políticas de Segurança",
        description:
          "Mapeia aplicações full-stack de ponta a ponta e gera políticas de segurança, relatórios de conformidade, realms Keycloak e políticas OPA Rego. Classificação semântica por IA de cada endpoint.",
        stats: [
          { label: "Formatos de saída", value: "7" },
          { label: "Classificações por IA", value: "12" },
          { label: "Frameworks suportados", value: "6+" },
          { label: "Scoring de criticidade", value: "0–100" },
        ],
      },
      en: {
        tagline: "Code Analysis & Security Policy Automation",
        description:
          "Maps full-stack applications end-to-end and generates security policies, compliance reports, Keycloak realms, and OPA Rego policies. AI-powered semantic classification of every endpoint.",
        stats: [
          { label: "Output formats", value: "7" },
          { label: "AI classifications", value: "12" },
          { label: "Framework support", value: "6+" },
          { label: "Criticality scoring", value: "0–100" },
        ],
      },
      es: {
        tagline: "Análisis de Código y Automatización de Políticas de Seguridad",
        description:
          "Mapea aplicaciones full-stack de extremo a extremo y genera políticas de seguridad, informes de conformidad, realms Keycloak y políticas OPA Rego. Clasificación semántica por IA de cada endpoint.",
        stats: [
          { label: "Formatos de salida", value: "7" },
          { label: "Clasificaciones por IA", value: "12" },
          { label: "Frameworks soportados", value: "6+" },
          { label: "Scoring de criticidad", value: "0–100" },
        ],
      },
    },
    pageContent: {
      headline: "Gera políticas de segurança, realms Keycloak e relatórios de conformidade a partir do código real.",
      features: [
        { iconId: "scan", title: "Mapeamento full-stack", desc: "Walks o frontend, gateway e backend identificando rotas, handlers, permissões declaradas e dados sensíveis em trânsito." },
        { iconId: "robot", title: "Classificação por IA", desc: "Cada endpoint recebe 12 classes (CRUD, sensível, financeiro, PII, etc) com fundamentação citável e score 0–100 de criticidade." },
        { iconId: "key", title: "Geração de políticas", desc: "Exporta realms Keycloak, políticas OPA Rego, manifests de RBAC e diff contra estado atual. CI-friendly." },
        { iconId: "lock", title: "Conformidade auditável", desc: "Relatórios LGPD/SOC2/ISO 27001 com snapshot por commit. Permite auditoria temporal." },
      ],
      useCases: [
        "Times de segurança que precisam manter realm Keycloak alinhado com código de N apps",
        "Equipes de compliance que precisam relatório LGPD por commit",
        "DevSecOps que automatizam OPA Rego como gate de PR",
        "Engenheiros que precisam saber quais rotas tocam dados sensíveis sem inventário manual",
      ],
      keywords: [
        "análise de código estática IA",
        "Manifest NuPtechs",
        "Keycloak realm generator",
        "OPA Rego policy generator",
        "compliance LGPD automatizada",
      ],
    },
  },

  // ───────────────────────────── IA & DADOS ─────────────────────────────
  {
    id: "sentinel",
    slug: "sentinel",
    name: "Sentinel",
    category: "ai",
    status: "beta",
    tech: ["Node.js", "Express 5", "Claude AI", "rrweb", "PostgreSQL"],
    text: {
      pt: {
        tagline: "Pipeline de QA com IA → Correção de Código",
        description:
          "Grava sessões de browser, correlaciona com traces do backend e usa IA para diagnosticar causas raiz e gerar correções de código automaticamente. Do bug report ao pull request.",
        stats: [
          { label: "Confiança do diagnóstico", value: "94%" },
          { label: "Tempo médio de correção", value: "< 2min" },
          { label: "Integrações", value: "4" },
          { label: "Categorias de issue", value: "7" },
        ],
      },
      en: {
        tagline: "AI-Powered QA → Code Fix Pipeline",
        description:
          "Records browser sessions, correlates with backend traces, and uses AI to diagnose root causes and generate code corrections automatically. From bug report to pull request.",
        stats: [
          { label: "Diagnosis confidence", value: "94%" },
          { label: "Avg fix time", value: "< 2min" },
          { label: "Integrations", value: "4" },
          { label: "Issue categories", value: "7" },
        ],
      },
      es: {
        tagline: "Pipeline de QA con IA → Corrección de Código",
        description:
          "Graba sesiones de navegador, correlaciona con trazas del backend y usa IA para diagnosticar causas raíz y generar correcciones de código automáticamente. Del bug report al pull request.",
        stats: [
          { label: "Confianza del diagnóstico", value: "94%" },
          { label: "Tiempo medio de corrección", value: "< 2min" },
          { label: "Integraciones", value: "4" },
          { label: "Categorías de issue", value: "7" },
        ],
      },
    },
    pageContent: {
      headline: "Do bug report ao pull request — com fundamentação citável, não chute.",
      features: [
        { iconId: "scan", title: "Captura rrweb + traces", desc: "Grava a sessão real do usuário (rrweb), correlaciona com requests do gateway e logs do backend via trace ID propagado." },
        { iconId: "robot", title: "Diagnose com IA citável", desc: "Claude analisa snapshot completo e propõe causa raiz com referência byte-a-byte ao código. Diagnose vem com 94% de confiança média." },
        { iconId: "bolt", title: "Auto-fix → PR", desc: "Para classes conhecidas (permission drift, dead branch, field death) gera PR pronto pra revisão. Reviewer humano sempre no loop." },
        { iconId: "key", title: "6 detectors prontos", desc: "Permission drift, triple-orphan, flag dead-branch, adversarial confirmer, field death, federation gaps — categorias que SAST comercial não cobre." },
        { iconId: "lock", title: "On-prem + audit HMAC", desc: "Self-hosted, sem cloud terceiro, com cadeia HMAC tamper-proof. Único do mercado a combinar loop self-healing + audit BR-compliance." },
      ],
      useCases: [
        "Times que recebem bug report sem repro confiável",
        "Squads que querem reduzir tempo médio de diagnóstico de 4h pra 2min",
        "Equipes reguladas que não podem subir dados pra cloud terceiro",
        "Áreas de QA que querem evidência forense ao bug report",
      ],
      keywords: [
        "QA com IA self-healing",
        "Sentinel NuPtechs",
        "diagnose bug com Claude",
        "rrweb session replay",
        "alternativa Datadog Bugsnag",
      ],
    },
  },
  {
    id: "nup-chunks",
    slug: "nup-chunks",
    name: "NuP-Chunks",
    category: "ai",
    status: "live",
    tech: ["Python", "FastAPI", "Pinecone", "Claude", "Mistral AI"],
    text: {
      pt: {
        tagline: "Processamento de Documentos e Busca Semântica",
        description:
          "Ingere documentos multiformato, aplica chunking inteligente por domínio, gera embeddings e habilita busca semântica e Q&A com IA por meio de bases vetoriais.",
        stats: [
          { label: "Formatos de documento", value: "6" },
          { label: "Estratégias de domínio", value: "5" },
          { label: "Dimensões de embedding", value: "1.024" },
          { label: "Espaços de conteúdo", value: "∞" },
        ],
      },
      en: {
        tagline: "Document Processing & Semantic Search",
        description:
          "Ingests multi-format documents, applies domain-aware intelligent chunking, generates embeddings, and enables semantic search and AI-powered Q&A through vector databases.",
        stats: [
          { label: "Document formats", value: "6" },
          { label: "Domain strategies", value: "5" },
          { label: "Embedding dims", value: "1,024" },
          { label: "Content spaces", value: "∞" },
        ],
      },
      es: {
        tagline: "Procesamiento de Documentos y Búsqueda Semántica",
        description:
          "Ingiere documentos multiformato, aplica chunking inteligente por dominio, genera embeddings y habilita búsqueda semántica y Q&A con IA a través de bases vectoriales.",
        stats: [
          { label: "Formatos de documento", value: "6" },
          { label: "Estrategias de dominio", value: "5" },
          { label: "Dimensiones de embedding", value: "1.024" },
          { label: "Espacios de contenido", value: "∞" },
        ],
      },
    },
    pageContent: {
      headline: "RAG-ready em horas — não em sprints. Com chunking que respeita o seu domínio.",
      features: [
        { iconId: "scan", title: "Chunking por domínio", desc: "5 estratégias prontas (legal, contratos, técnico, médico, financeiro) que respeitam estrutura semântica e não cortam citações no meio." },
        { iconId: "search", title: "6 formatos de input", desc: "PDF, DOCX, XLSX, HTML, MD, EML — extração de tabelas e metadados embutidos preservados nos chunks." },
        { iconId: "network", title: "Multi-tenant vetorial", desc: "Namespace Pinecone por organização — isolamento total entre clientes. Suporta milhões de chunks por tenant." },
        { iconId: "robot", title: "Q&A com fundamentação", desc: "Respostas vêm com citação byte-a-byte ao documento fonte. Sem alucinação porque o motor força citação." },
      ],
      useCases: [
        "Times que precisam de RAG empresarial sem montar pipeline do zero",
        "Verticais regulados (legal, saúde, financeiro) que precisam citação obrigatória",
        "Buscas internas em bases de conhecimento corporativas (manuais, políticas, contratos)",
        "Aplicações que precisam Q&A sobre documentos do cliente em tempo real",
      ],
      keywords: [
        "RAG empresarial pronto",
        "NuP-Chunks NuPtechs",
        "embedding multi-tenant",
        "busca semântica documentos",
        "Pinecone Brasil",
      ],
    },
  },
  {
    id: "nup-aim",
    slug: "nup-aim",
    name: "NuP-AIM",
    category: "ai",
    status: "live",
    tech: ["React 18", "Express.js", "Claude", "GPT-4", "Google Vision"],
    text: {
      pt: {
        tagline: "Análise de Impacto com IA",
        description:
          "Plataforma de análise de impacto que ingere documentos (PDF, Word, imagens), aplica visão computacional e LLMs multi-modelo para gerar relatórios estruturados exportáveis em DOCX. Pipeline multi-agent IFPUG CPM 4.3.1 compliant.",
        stats: [
          { label: "Modelos de IA", value: "4" },
          { label: "Formatos de input", value: "5" },
          { label: "Export", value: "DOCX" },
          { label: "Visão computacional", value: "OCR" },
        ],
      },
      en: {
        tagline: "AI-Powered Impact Analysis",
        description:
          "Impact analysis platform that ingests documents (PDF, Word, images), applies computer vision and multi-model LLMs to generate structured exportable DOCX reports. IFPUG CPM 4.3.1 compliant multi-agent pipeline.",
        stats: [
          { label: "AI models", value: "4" },
          { label: "Input formats", value: "5" },
          { label: "Export", value: "DOCX" },
          { label: "Computer vision", value: "OCR" },
        ],
      },
      es: {
        tagline: "Análisis de Impacto con IA",
        description:
          "Plataforma de análisis de impacto que ingiere documentos (PDF, Word, imágenes), aplica visión computacional y LLMs multi-modelo para generar informes estructurados exportables en DOCX.",
        stats: [
          { label: "Modelos de IA", value: "4" },
          { label: "Formatos de input", value: "5" },
          { label: "Export", value: "DOCX" },
          { label: "Visión computacional", value: "OCR" },
        ],
      },
    },
    pageContent: {
      headline: "Análise de impacto e contagem IFPUG sem perder uma semana por release.",
      features: [
        { iconId: "scan", title: "OCR + vision pipeline", desc: "Google Vision lê imagens e prints; Claude+GPT-4 extraem requisitos, processos e impactos estruturados." },
        { iconId: "robot", title: "Multi-agent IFPUG", desc: "Pipeline v3.2.0 compatível com IFPUG CPM 4.3.1 — extração de funções, identificação de ALI/AIE/EE/CE/SE." },
        { iconId: "clipboard", title: "Export DOCX", desc: "Relatório estruturado no template da organização. Profiles, projects, analyses, processes, impacts, risks, mitigations." },
        { iconId: "refresh", title: "Auto-save + recovery", desc: "Debounce 3s + sessionStorage. Refresh acidental não perde trabalho." },
      ],
      useCases: [
        "Times que entregam projetos por ponto de função e precisam contagem auditável",
        "Consultoras que produzem análise de impacto recorrente para gov",
        "Equipes que recebem RFPs em PDF e precisam extrair requisitos estruturados",
        "Áreas que precisam fundamentar mudanças com risco + mitigação",
      ],
      keywords: [
        "análise de impacto IA",
        "NuP-AIM NuPtechs",
        "IFPUG CPM 4.3.1 software",
        "ponto de função automatizado",
        "OCR requisitos PDF",
      ],
    },
  },
  {
    id: "nup-study",
    slug: "nup-study",
    name: "NuP-Study",
    category: "ai",
    status: "beta",
    tech: ["React 18", "Express.js", "Claude", "Pinecone", "ElevenLabs"],
    text: {
      pt: {
        tagline: "Plataforma de Aprendizado Adaptativo com IA",
        description:
          "SaaS de ensino adaptativo com tutoria por IA, integração de voz (ElevenLabs), mapas mentais, busca semântica vetorial (Pinecone) e trilhas de aprendizado personalizadas.",
        stats: [
          { label: "Modelos LLM", value: "3" },
          { label: "Voz IA", value: "ElevenLabs" },
          { label: "Busca", value: "Vetorial" },
          { label: "Trilhas", value: "Adaptativas" },
        ],
      },
      en: {
        tagline: "AI Adaptive Learning Platform",
        description:
          "Adaptive learning SaaS with AI tutoring, voice integration (ElevenLabs), mind maps, vector semantic search (Pinecone), and personalized learning paths.",
        stats: [
          { label: "LLM models", value: "3" },
          { label: "AI voice", value: "ElevenLabs" },
          { label: "Search", value: "Vector" },
          { label: "Paths", value: "Adaptive" },
        ],
      },
      es: {
        tagline: "Plataforma de Aprendizaje Adaptativo con IA",
        description:
          "SaaS de enseñanza adaptativa con tutoría por IA, integración de voz (ElevenLabs), mapas mentales, búsqueda semántica vectorial (Pinecone) y rutas de aprendizaje personalizadas.",
        stats: [
          { label: "Modelos LLM", value: "3" },
          { label: "Voz IA", value: "ElevenLabs" },
          { label: "Búsqueda", value: "Vectorial" },
          { label: "Rutas", value: "Adaptativas" },
        ],
      },
    },
    pageContent: {
      headline: "Tutoria adaptativa com voz, mapa mental e plano que muda conforme o aluno responde.",
      features: [
        { iconId: "robot", title: "Tutor com 3 LLMs", desc: "Claude, GPT-4 e Gemini com fallback — tutor responde, propõe exercícios e explica como o aluno aprende melhor." },
        { iconId: "bell", title: "Voz natural (ElevenLabs)", desc: "Tutor fala — útil pra deficiência visual e pra estudo passivo. Sotaque PT-BR nativo." },
        { iconId: "search", title: "Mapa mental por sessão", desc: "Cada conversa vira mapa mental navegável. Aluno revisa o tópico sem reler tudo." },
        { iconId: "refresh", title: "Trilhas adaptativas", desc: "Cada resposta ajusta o próximo conteúdo. Aluno fraco em álgebra recebe trilha diferente do aluno avançado." },
      ],
      useCases: [
        "Cursos online que querem tutor de plantão sem contratar professor 24/7",
        "Preparação para concurso público com banco de questões adaptativo",
        "Educação corporativa com trilhas customizadas por papel/área",
        "Reforço escolar pra ensino médio e vestibular",
      ],
      keywords: [
        "tutoria adaptativa IA",
        "NuP-Study NuPtechs",
        "preparação concurso IA",
        "aprendizado adaptativo SaaS",
        "ElevenLabs voz tutor",
      ],
    },
  },
  {
    id: "nuptechs-aihub",
    slug: "nuptechs-aihub",
    name: "NuPtechs AIHub",
    category: "ai",
    status: "beta",
    tech: ["Python", "FastAPI", "LangChain", "React 19", "Pinecone"],
    text: {
      pt: {
        tagline: "Hub Centralizado de Serviços de IA",
        description:
          "Plataforma central que provê serviços de IA (completion, embeddings, processamento de documentos) para todos os produtos NuPtechs. Orquestra múltiplos LLMs (Ollama local, OpenAI, Claude, Gemini) com fallback automático.",
        stats: [
          { label: "Provedores LLM", value: "4" },
          { label: "Serviços", value: "6" },
          { label: "Pipeline OCR", value: "PDF/Word" },
          { label: "Busca", value: "Vetorial" },
        ],
      },
      en: {
        tagline: "Centralized AI Services Hub",
        description:
          "Central platform providing AI services (completion, embeddings, document processing) to all NuPtechs products. Orchestrates multiple LLMs (local Ollama, OpenAI, Claude, Gemini) with automatic fallback.",
        stats: [
          { label: "LLM providers", value: "4" },
          { label: "Services", value: "6" },
          { label: "OCR pipeline", value: "PDF/Word" },
          { label: "Search", value: "Vector" },
        ],
      },
      es: {
        tagline: "Hub Centralizado de Servicios de IA",
        description:
          "Plataforma central que provee servicios de IA (completion, embeddings, procesamiento de documentos) para todos los productos NuPtechs. Orquesta múltiples LLMs (Ollama local, OpenAI, Claude, Gemini) con fallback automático.",
        stats: [
          { label: "Proveedores LLM", value: "4" },
          { label: "Servicios", value: "6" },
          { label: "Pipeline OCR", value: "PDF/Word" },
          { label: "Búsqueda", value: "Vectorial" },
        ],
      },
    },
    pageContent: {
      headline: "Hub de serviços de IA prontos — análise contratual, code review, flashcards, mindmaps.",
      features: [
        { iconId: "robot", title: "7 serviços catalogados", desc: "Análise de risco, function points, code review, produtividade, flashcards, questões de concurso, mindmap Mermaid." },
        { iconId: "scan", title: "Extração com OCR", desc: "PDF, Word e imagens via pdfplumber, python-docx e Tesseract — pipeline pronto." },
        { iconId: "refresh", title: "Multi-LLM com fallback", desc: "Ollama local (para dados sensíveis), OpenAI, Claude e Gemini com fallback automático em caso de falha." },
        { iconId: "bolt", title: "Fine-Tuning Studio", desc: "LoRA/PEFT com MLX em Apple Silicon — treinamento próprio sem GPU dedicada." },
      ],
      useCases: [
        "Times que querem 7 serviços de IA prontos sem montar cada um do zero",
        "Equipes que precisam Ollama on-prem pra dados sensíveis com fallback cloud",
        "Áreas que produzem material de estudo com IA (flashcards, mindmaps)",
        "Operações com fine-tuning recorrente em Apple Silicon (sem custo de GPU dedicada)",
      ],
      keywords: [
        "hub serviços IA pronto",
        "NuPtechs AIHub",
        "code review IA empresarial",
        "fine-tuning Apple Silicon",
        "mindmap Mermaid IA",
      ],
    },
  },

  // ───────────────────────────── PRODUTIVIDADE ─────────────────────────────
  {
    id: "kan",
    slug: "kan",
    name: "KAN",
    category: "productivity",
    status: "live",
    tech: ["React 18", "Express.js", "PostgreSQL", "Drizzle ORM", "TanStack Query"],
    text: {
      pt: {
        tagline: "Kanban & Gestão de Projetos",
        description:
          "Board colaborativo com workspaces por equipe, custom fields, permissões granulares por board e analytics de produtividade. Integração SSO com NuPIdentify e sincronização automática de permissões.",
        stats: [
          { label: "Tipos de campo", value: "8" },
          { label: "Visualizações", value: "3" },
          { label: "Workspaces", value: "∞" },
          { label: "Integrações", value: "SSO" },
        ],
      },
      en: {
        tagline: "Kanban & Project Management",
        description:
          "Collaborative board with team workspaces, custom fields, granular per-board permissions, and productivity analytics. SSO integration with NuPIdentify and automatic permission sync.",
        stats: [
          { label: "Field types", value: "8" },
          { label: "Views", value: "3" },
          { label: "Workspaces", value: "∞" },
          { label: "Integrations", value: "SSO" },
        ],
      },
      es: {
        tagline: "Kanban & Gestión de Proyectos",
        description:
          "Board colaborativo con workspaces por equipo, campos personalizados, permisos granulares por board y analytics de productividad. Integración SSO con NuPIdentify.",
        stats: [
          { label: "Tipos de campo", value: "8" },
          { label: "Vistas", value: "3" },
          { label: "Workspaces", value: "∞" },
          { label: "Integraciones", value: "SSO" },
        ],
      },
    },
    pageContent: {
      headline: "Kanban com permissão granular e SSO — pra times que cresceram e o Trello não dá mais conta.",
      features: [
        { iconId: "clipboard", title: "Workspaces + boards", desc: "Workspace por equipe, boards por projeto. Custom fields (8 tipos) com filtros e relatórios." },
        { iconId: "key", title: "Permissão por board", desc: "Cada board tem ACL própria. Sync automático com NuPIdentify a cada 5 min — sem manter permissão em 2 lugares." },
        { iconId: "chart", title: "Analytics nativos", desc: "Burn-down, throughput, ciclo de vida por card. Exportável pra dashboard executivo." },
        { iconId: "refresh", title: "SSO + JWT", desc: "Login via NuPIdentify (OIDC). API protegida com JWT. Cache 5 min reduz calls." },
      ],
      useCases: [
        "Times que cresceram além do plano gratuito do Trello/Asana",
        "Empresas com 5+ times que precisam permissão granular por board",
        "Operações que precisam SSO empresarial sem upgrade enterprise caro",
        "Squads que precisam relatório executivo de produtividade",
      ],
      keywords: [
        "kanban empresarial SSO",
        "KAN NuPtechs",
        "alternativa Trello Jira",
        "permissão granular board",
        "TanStack Query kanban",
      ],
    },
  },

  // ───────────────────────────── DADOS & PLANILHAS ─────────────────────────────
  {
    id: "nup-xlsx-editor",
    slug: "nup-xlsx-editor",
    name: "NuP-XLSX Editor",
    category: "data",
    status: "live",
    tech: ["React 18", "TypeScript", "Express.js", "PostgreSQL", "Vite"],
    text: {
      pt: {
        tagline: "Editor Web de Planilhas",
        description:
          "Editor completo de planilhas .xlsx no browser com edição de células, formatação, fórmulas, multi-sheet workbooks e renderização virtual para datasets grandes.",
        stats: [
          { label: "Operações", value: "CRUD" },
          { label: "Formato", value: ".xlsx" },
          { label: "Render", value: "Virtual" },
          { label: "Ambiente", value: "Web" },
        ],
      },
      en: {
        tagline: "Web Spreadsheet Editor",
        description:
          "Full .xlsx spreadsheet editor in the browser with cell editing, formatting, formulas, multi-sheet workbooks, and virtual rendering for large datasets.",
        stats: [
          { label: "Operations", value: "CRUD" },
          { label: "Format", value: ".xlsx" },
          { label: "Render", value: "Virtual" },
          { label: "Environment", value: "Web" },
        ],
      },
      es: {
        tagline: "Editor Web de Hojas de Cálculo",
        description:
          "Editor completo de hojas de cálculo .xlsx en el navegador con edición de celdas, formato, fórmulas, workbooks multi-sheet y renderización virtual para datasets grandes.",
        stats: [
          { label: "Operaciones", value: "CRUD" },
          { label: "Formato", value: ".xlsx" },
          { label: "Render", value: "Virtual" },
          { label: "Ambiente", value: "Web" },
        ],
      },
    },
    pageContent: {
      headline: "Edite .xlsx no browser com UX de Google Sheets — sem upload pra cloud terceiro.",
      features: [
        { iconId: "scan", title: "Render virtual", desc: "Só células visíveis são renderizadas. Datasets de milhões de linhas rolam suaves." },
        { iconId: "refresh", title: "Undo/redo com command", desc: "Padrão command pattern. Histórico completo, replay e branching." },
        { iconId: "clipboard", title: "Formatação + fórmulas", desc: "Bold, italic, alinhamento, cores, fórmulas. Multi-sheet workbooks." },
        { iconId: "lock", title: "On-prem ou SaaS", desc: "Roda como componente embarcado ou produto standalone. Persistência Postgres opcional." },
      ],
      useCases: [
        "Times que precisam editar .xlsx no browser sem subir pra cloud terceiro",
        "Aplicações que querem embarcar editor de planilha como feature",
        "Backends que precisam permitir cliente editar relatório financeiro com UX nativa",
        "Operações com datasets grandes que travam o Excel",
      ],
      keywords: [
        "editor planilha browser",
        "NuP-XLSX NuPtechs",
        "alternativa Google Sheets embed",
        "xlsx editor on-premise",
      ],
    },
  },
];
