"use client";
import { useState } from "react";

type Lang = "pt" | "en" | "es";

interface ProductText {
  tagline: string;
  description: string;
  stats: { label: string; value: string }[];
}

interface Product {
  id: string;
  name: string;
  text: Record<Lang, ProductText>;
  tech: string[];
  category: "platform" | "devtools" | "ai" | "productivity" | "data";
}

const products: Product[] = [
  {
    id: "easynup",
    name: "EasyNuP",
    text: {
      pt: {
        tagline: "Gestão de Contratos e Workflows",
        description: "Plataforma enterprise para gestão do ciclo de vida de contratos de TI com análise documental por IA, designer visual de workflows BPMN e dashboards executivos 360°. Construída para conformidade com o setor público brasileiro.",
        stats: [
          { label: "Linhas de código", value: "490k" },
          { label: "Testes automatizados", value: "5.850+" },
          { label: "Regras de permissão", value: "511" },
          { label: "Entidades de domínio", value: "150+" },
        ],
      },
      en: {
        tagline: "Contract & Workflow Management",
        description: "Enterprise platform for IT contract lifecycle management with AI-powered document analysis, visual BPMN workflow designer, and 360° executive dashboards. Built for Brazilian public sector compliance.",
        stats: [
          { label: "Lines of code", value: "490k" },
          { label: "Automated tests", value: "5,850+" },
          { label: "Permission rules", value: "511" },
          { label: "Domain entities", value: "150+" },
        ],
      },
      es: {
        tagline: "Gestión de Contratos y Workflows",
        description: "Plataforma enterprise para gestión del ciclo de vida de contratos de TI con análisis documental por IA, diseñador visual de workflows BPMN y dashboards ejecutivos 360°.",
        stats: [
          { label: "Líneas de código", value: "490k" },
          { label: "Tests automatizados", value: "5.850+" },
          { label: "Reglas de permiso", value: "511" },
          { label: "Entidades de dominio", value: "150+" },
        ],
      },
    },
    tech: ["Java 21", "Spring Boot", "Vue 3", "PostgreSQL", "Redis", "BullMQ"],
    category: "platform",
  },
  {
    id: "nupidentify",
    name: "NuPIdentify",
    text: {
      pt: {
        tagline: "Identidade e Controle de Acesso",
        description: "IAM de produção com OIDC/OAuth 2.1, SAML 2.0, provisionamento SCIM, WebAuthn/Passkeys e autorização multicamada (RBAC + ABAC + ReBAC). Multi-tenant com faturamento integrado ao Stripe.",
        stats: [
          { label: "Tabelas no banco", value: "70" },
          { label: "Protocolos de auth", value: "5" },
          { label: "Testes unitários", value: "2.110+" },
          { label: "Páginas no frontend", value: "53" },
        ],
      },
      en: {
        tagline: "Identity & Access Management",
        description: "Production-grade IAM with OIDC/OAuth 2.1, SAML 2.0, SCIM provisioning, WebAuthn/Passkeys, and multi-layered authorization (RBAC + ABAC + ReBAC). Multi-tenant, Stripe-integrated billing.",
        stats: [
          { label: "Database tables", value: "70" },
          { label: "Auth protocols", value: "5" },
          { label: "Unit tests", value: "2,110+" },
          { label: "Frontend pages", value: "53" },
        ],
      },
      es: {
        tagline: "Identidad y Control de Acceso",
        description: "IAM de producción con OIDC/OAuth 2.1, SAML 2.0, provisionamiento SCIM, WebAuthn/Passkeys y autorización multicapa (RBAC + ABAC + ReBAC). Multi-tenant con facturación integrada a Stripe.",
        stats: [
          { label: "Tablas en la base", value: "70" },
          { label: "Protocolos de auth", value: "5" },
          { label: "Tests unitarios", value: "2.110+" },
          { label: "Páginas del frontend", value: "53" },
        ],
      },
    },
    tech: ["Node.js", "TypeScript", "React", "PostgreSQL", "Drizzle ORM"],
    category: "platform",
  },
  {
    id: "debug-probe",
    name: "Debug Probe",
    text: {
      pt: {
        tagline: "Debugging Runtime Multicamada",
        description: "Captura e correlaciona eventos entre browser, rede, servidor e banco de dados em timelines unificadas. Dashboard em tempo real com visualização waterfall de tracing distribuído.",
        stats: [
          { label: "Casos de teste", value: "1.200+" },
          { label: "Pacotes TS", value: "10" },
          { label: "Adapters de BD", value: "6" },
          { label: "Camadas capturadas", value: "4" },
        ],
      },
      en: {
        tagline: "Multi-Layer Runtime Debugging",
        description: "Captures and correlates events across browser, network, server, and database layers into unified timelines. Real-time dashboard with distributed tracing waterfall visualization.",
        stats: [
          { label: "Test cases", value: "1,200+" },
          { label: "TS packages", value: "10" },
          { label: "DB adapters", value: "6" },
          { label: "Capture layers", value: "4" },
        ],
      },
      es: {
        tagline: "Debugging Runtime Multicapa",
        description: "Captura y correlaciona eventos entre navegador, red, servidor y base de datos en timelines unificadas. Dashboard en tiempo real con visualización waterfall de tracing distribuido.",
        stats: [
          { label: "Casos de prueba", value: "1.200+" },
          { label: "Paquetes TS", value: "10" },
          { label: "Adapters de BD", value: "6" },
          { label: "Capas capturadas", value: "4" },
        ],
      },
    },
    tech: ["TypeScript", "React 19", "Playwright", "WebSocket", "PostgreSQL"],
    category: "devtools",
  },
  {
    id: "sentinel",
    name: "Sentinel",
    text: {
      pt: {
        tagline: "Pipeline de QA com IA → Correção de Código",
        description: "Grava sessões de browser, correlaciona com traces do backend e usa IA para diagnosticar causas raiz e gerar correções de código automaticamente. Do bug report ao pull request.",
        stats: [
          { label: "Confiança do diagnóstico", value: "94%" },
          { label: "Tempo médio de correção", value: "< 2min" },
          { label: "Integrações", value: "4" },
          { label: "Categorias de issue", value: "7" },
        ],
      },
      en: {
        tagline: "AI-Powered QA → Code Fix Pipeline",
        description: "Records browser sessions, correlates with backend traces, and uses AI to diagnose root causes and generate code corrections automatically. From bug report to pull request.",
        stats: [
          { label: "Diagnosis confidence", value: "94%" },
          { label: "Avg fix time", value: "< 2min" },
          { label: "Integrations", value: "4" },
          { label: "Issue categories", value: "7" },
        ],
      },
      es: {
        tagline: "Pipeline de QA con IA → Corrección de Código",
        description: "Graba sesiones de navegador, correlaciona con trazas del backend y usa IA para diagnosticar causas raíz y generar correcciones de código automáticamente. Del bug report al pull request.",
        stats: [
          { label: "Confianza del diagnóstico", value: "94%" },
          { label: "Tiempo medio de corrección", value: "< 2min" },
          { label: "Integraciones", value: "4" },
          { label: "Categorías de issue", value: "7" },
        ],
      },
    },
    tech: ["Node.js", "Express 5", "Claude AI", "rrweb", "PostgreSQL"],
    category: "ai",
  },
  {
    id: "manifest",
    name: "Manifest",
    text: {
      pt: {
        tagline: "Análise de Código e Automação de Políticas de Segurança",
        description: "Mapeia aplicações full-stack de ponta a ponta e gera políticas de segurança, relatórios de conformidade, realms Keycloak e políticas OPA Rego. Classificação semântica por IA de cada endpoint.",
        stats: [
          { label: "Formatos de saída", value: "7" },
          { label: "Classificações por IA", value: "12" },
          { label: "Frameworks suportados", value: "6+" },
          { label: "Scoring de criticidade", value: "0–100" },
        ],
      },
      en: {
        tagline: "Code Analysis & Security Policy Automation",
        description: "Maps full-stack applications end-to-end and generates security policies, compliance reports, Keycloak realms, and OPA Rego policies. AI-powered semantic classification of every endpoint.",
        stats: [
          { label: "Output formats", value: "7" },
          { label: "AI classifications", value: "12" },
          { label: "Framework support", value: "6+" },
          { label: "Criticality scoring", value: "0–100" },
        ],
      },
      es: {
        tagline: "Análisis de Código y Automatización de Políticas de Seguridad",
        description: "Mapea aplicaciones full-stack de extremo a extremo y genera políticas de seguridad, informes de conformidad, realms Keycloak y políticas OPA Rego. Clasificación semántica por IA de cada endpoint.",
        stats: [
          { label: "Formatos de salida", value: "7" },
          { label: "Clasificaciones por IA", value: "12" },
          { label: "Frameworks soportados", value: "6+" },
          { label: "Scoring de criticidad", value: "0–100" },
        ],
      },
    },
    tech: ["Java", "Node.js", "React", "OpenAI", "Drizzle ORM"],
    category: "devtools",
  },
  {
    id: "nup-chunks",
    name: "NuP-Chunks",
    text: {
      pt: {
        tagline: "Processamento de Documentos e Busca Semântica",
        description: "Ingere documentos multiformato, aplica chunking inteligente por domínio, gera embeddings e habilita busca semântica e Q&A com IA por meio de bases vetoriais.",
        stats: [
          { label: "Formatos de documento", value: "6" },
          { label: "Estratégias de domínio", value: "5" },
          { label: "Dimensões de embedding", value: "1.024" },
          { label: "Espaços de conteúdo", value: "∞" },
        ],
      },
      en: {
        tagline: "Document Processing & Semantic Search",
        description: "Ingests multi-format documents, applies domain-aware intelligent chunking, generates embeddings, and enables semantic search and AI-powered Q&A through vector databases.",
        stats: [
          { label: "Document formats", value: "6" },
          { label: "Domain strategies", value: "5" },
          { label: "Embedding dims", value: "1,024" },
          { label: "Content spaces", value: "∞" },
        ],
      },
      es: {
        tagline: "Procesamiento de Documentos y Búsqueda Semántica",
        description: "Ingiere documentos multiformato, aplica chunking inteligente por dominio, genera embeddings y habilita búsqueda semántica y Q&A con IA a través de bases vectoriales.",
        stats: [
          { label: "Formatos de documento", value: "6" },
          { label: "Estrategias de dominio", value: "5" },
          { label: "Dimensiones de embedding", value: "1.024" },
          { label: "Espacios de contenido", value: "∞" },
        ],
      },
    },
    tech: ["Python", "FastAPI", "Pinecone", "Claude", "Mistral AI"],
    category: "ai",
  },
  {
    id: "kan",
    name: "KAN",
    text: {
      pt: {
        tagline: "Kanban & Gestão de Projetos",
        description: "Board colaborativo com workspaces por equipe, custom fields, permissões granulares por board e analytics de produtividade. Integração SSO com NuPIdentify.",
        stats: [
          { label: "Tipos de campo", value: "8" },
          { label: "Visualizações", value: "3" },
          { label: "Workspaces", value: "∞" },
          { label: "Integrações", value: "SSO" },
        ],
      },
      en: {
        tagline: "Kanban & Project Management",
        description: "Collaborative board with team workspaces, custom fields, granular per-board permissions, and productivity analytics. SSO integration with NuPIdentify.",
        stats: [
          { label: "Field types", value: "8" },
          { label: "Views", value: "3" },
          { label: "Workspaces", value: "∞" },
          { label: "Integrations", value: "SSO" },
        ],
      },
      es: {
        tagline: "Kanban & Gestión de Proyectos",
        description: "Board colaborativo con workspaces por equipo, campos personalizados, permisos granulares por board y analytics de productividad. Integración SSO con NuPIdentify.",
        stats: [
          { label: "Tipos de campo", value: "8" },
          { label: "Vistas", value: "3" },
          { label: "Workspaces", value: "∞" },
          { label: "Integraciones", value: "SSO" },
        ],
      },
    },
    tech: ["React 18", "Express.js", "PostgreSQL", "Drizzle ORM", "TanStack Query"],
    category: "productivity",
  },
  {
    id: "nup-aim",
    name: "NuP-AIM",
    text: {
      pt: {
        tagline: "Análise de Impacto com IA",
        description: "Plataforma de análise de impacto que ingere documentos (PDF, Word, imagens), aplica visão computacional e LLMs multi-modelo para gerar relatórios estruturados exportáveis em DOCX.",
        stats: [
          { label: "Modelos de IA", value: "4" },
          { label: "Formatos de input", value: "5" },
          { label: "Export", value: "DOCX" },
          { label: "Visão computacional", value: "OCR" },
        ],
      },
      en: {
        tagline: "AI-Powered Impact Analysis",
        description: "Impact analysis platform that ingests documents (PDF, Word, images), applies computer vision and multi-model LLMs to generate structured exportable DOCX reports.",
        stats: [
          { label: "AI models", value: "4" },
          { label: "Input formats", value: "5" },
          { label: "Export", value: "DOCX" },
          { label: "Computer vision", value: "OCR" },
        ],
      },
      es: {
        tagline: "Análisis de Impacto con IA",
        description: "Plataforma de análisis de impacto que ingiere documentos (PDF, Word, imágenes), aplica visión computacional y LLMs multi-modelo para generar informes estructurados exportables en DOCX.",
        stats: [
          { label: "Modelos de IA", value: "4" },
          { label: "Formatos de input", value: "5" },
          { label: "Export", value: "DOCX" },
          { label: "Visión computacional", value: "OCR" },
        ],
      },
    },
    tech: ["React 18", "Express.js", "Claude", "GPT-4", "Google Vision"],
    category: "ai",
  },
  {
    id: "nup-services",
    name: "NuP-Services",
    text: {
      pt: {
        tagline: "Marketplace de Serviços Profissionais",
        description: "Plataforma que conecta profissionais a clientes com perfis, portfólios, avaliações/reviews e dashboard de gestão. Sistema de busca com filtros por especialidade e região.",
        stats: [
          { label: "Módulos", value: "6" },
          { label: "Busca", value: "Full-text" },
          { label: "Perfis", value: "Portfolio" },
          { label: "Reviews", value: "Rating" },
        ],
      },
      en: {
        tagline: "Professional Services Marketplace",
        description: "Platform connecting professionals with clients through profiles, portfolios, ratings/reviews, and management dashboard. Search system with specialty and region filters.",
        stats: [
          { label: "Modules", value: "6" },
          { label: "Search", value: "Full-text" },
          { label: "Profiles", value: "Portfolio" },
          { label: "Reviews", value: "Rating" },
        ],
      },
      es: {
        tagline: "Marketplace de Servicios Profesionales",
        description: "Plataforma que conecta profesionales con clientes a través de perfiles, portafolios, evaluaciones/reviews y dashboard de gestión. Sistema de búsqueda con filtros por especialidad y región.",
        stats: [
          { label: "Módulos", value: "6" },
          { label: "Búsqueda", value: "Full-text" },
          { label: "Perfiles", value: "Portafolio" },
          { label: "Reviews", value: "Rating" },
        ],
      },
    },
    tech: ["React 18", "Express.js", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
    category: "platform",
  },
  {
    id: "nup-study",
    name: "NuP-Study",
    text: {
      pt: {
        tagline: "Plataforma de Aprendizado Adaptativo com IA",
        description: "SaaS de ensino adaptativo com tutoria por IA, integração de voz (ElevenLabs), mapas mentais, busca semântica vetorial (Pinecone) e trilhas de aprendizado personalizadas.",
        stats: [
          { label: "Modelos LLM", value: "3" },
          { label: "Voz IA", value: "ElevenLabs" },
          { label: "Busca", value: "Vetorial" },
          { label: "Trilhas", value: "Adaptativas" },
        ],
      },
      en: {
        tagline: "AI Adaptive Learning Platform",
        description: "Adaptive learning SaaS with AI tutoring, voice integration (ElevenLabs), mind maps, vector semantic search (Pinecone), and personalized learning paths.",
        stats: [
          { label: "LLM models", value: "3" },
          { label: "AI voice", value: "ElevenLabs" },
          { label: "Search", value: "Vector" },
          { label: "Paths", value: "Adaptive" },
        ],
      },
      es: {
        tagline: "Plataforma de Aprendizaje Adaptativo con IA",
        description: "SaaS de enseñanza adaptativa con tutoría por IA, integración de voz (ElevenLabs), mapas mentales, búsqueda semántica vectorial (Pinecone) y rutas de aprendizaje personalizadas.",
        stats: [
          { label: "Modelos LLM", value: "3" },
          { label: "Voz IA", value: "ElevenLabs" },
          { label: "Búsqueda", value: "Vectorial" },
          { label: "Rutas", value: "Adaptativas" },
        ],
      },
    },
    tech: ["React 18", "Express.js", "Claude", "Pinecone", "ElevenLabs"],
    category: "ai",
  },
  {
    id: "nup-xlsx-editor",
    name: "NuP-XLSX Editor",
    text: {
      pt: {
        tagline: "Editor Web de Planilhas",
        description: "Editor completo de planilhas .xlsx no browser com edição de células, formatação, fórmulas e persistência de dados. Interface web nativa sem dependência de desktop.",
        stats: [
          { label: "Operações", value: "CRUD" },
          { label: "Formato", value: ".xlsx" },
          { label: "Modo", value: "Edição" },
          { label: "Ambiente", value: "Web" },
        ],
      },
      en: {
        tagline: "Web Spreadsheet Editor",
        description: "Full .xlsx spreadsheet editor in the browser with cell editing, formatting, formulas, and data persistence. Native web interface with no desktop dependency.",
        stats: [
          { label: "Operations", value: "CRUD" },
          { label: "Format", value: ".xlsx" },
          { label: "Mode", value: "Edit" },
          { label: "Environment", value: "Web" },
        ],
      },
      es: {
        tagline: "Editor Web de Hojas de Cálculo",
        description: "Editor completo de hojas de cálculo .xlsx en el navegador con edición de celdas, formato, fórmulas y persistencia de datos. Interfaz web nativa sin dependencia de escritorio.",
        stats: [
          { label: "Operaciones", value: "CRUD" },
          { label: "Formato", value: ".xlsx" },
          { label: "Modo", value: "Edición" },
          { label: "Ambiente", value: "Web" },
        ],
      },
    },
    tech: ["React 18", "TypeScript", "Express.js", "PostgreSQL", "Vite"],
    category: "data",
  },
  {
    id: "nup-xlsx-preview",
    name: "NuP-XLSX Preview",
    text: {
      pt: {
        tagline: "Visualizador Web de Planilhas",
        description: "Renderização read-only de arquivos .xlsx com formatação fiel, navegação por abas e controles de zoom. Lightweight — ideal para embeds e previews em outros sistemas.",
        stats: [
          { label: "Modo", value: "Read-only" },
          { label: "Formato", value: ".xlsx" },
          { label: "Navegação", value: "Multi-aba" },
          { label: "Peso", value: "Leve" },
        ],
      },
      en: {
        tagline: "Web Spreadsheet Viewer",
        description: "Read-only .xlsx rendering with faithful formatting, tab navigation, and zoom controls. Lightweight — ideal for embeds and previews in other systems.",
        stats: [
          { label: "Mode", value: "Read-only" },
          { label: "Format", value: ".xlsx" },
          { label: "Navigation", value: "Multi-tab" },
          { label: "Weight", value: "Light" },
        ],
      },
      es: {
        tagline: "Visualizador Web de Hojas de Cálculo",
        description: "Renderización read-only de archivos .xlsx con formato fiel, navegación por pestañas y controles de zoom. Lightweight — ideal para embeds y previews en otros sistemas.",
        stats: [
          { label: "Modo", value: "Read-only" },
          { label: "Formato", value: ".xlsx" },
          { label: "Navegación", value: "Multi-pestaña" },
          { label: "Peso", value: "Ligero" },
        ],
      },
    },
    tech: ["React 18", "TypeScript", "Express.js", "Vite", "Tailwind CSS"],
    category: "data",
  },
  {
    id: "nup-xlsx-tokens",
    name: "NuP-XLSX Tokens",
    text: {
      pt: {
        tagline: "Gestão de Tokens e Metadados de Planilhas",
        description: "Ferramenta especializada para anotação de tokens, rastreamento de metadados e configuração avançada de conteúdo em planilhas .xlsx. Camada semântica sobre dados tabulares.",
        stats: [
          { label: "Layer", value: "Metadados" },
          { label: "Formato", value: ".xlsx" },
          { label: "Tokens", value: "Anotação" },
          { label: "Config", value: "Avançada" },
        ],
      },
      en: {
        tagline: "Spreadsheet Token & Metadata Management",
        description: "Specialized tool for token annotation, metadata tracking, and advanced content configuration for .xlsx spreadsheets. Semantic layer over tabular data.",
        stats: [
          { label: "Layer", value: "Metadata" },
          { label: "Format", value: ".xlsx" },
          { label: "Tokens", value: "Annotation" },
          { label: "Config", value: "Advanced" },
        ],
      },
      es: {
        tagline: "Gestión de Tokens y Metadatos de Hojas de Cálculo",
        description: "Herramienta especializada para anotación de tokens, rastreo de metadatos y configuración avanzada de contenido en hojas de cálculo .xlsx. Capa semántica sobre datos tabulares.",
        stats: [
          { label: "Capa", value: "Metadatos" },
          { label: "Formato", value: ".xlsx" },
          { label: "Tokens", value: "Anotación" },
          { label: "Config", value: "Avanzada" },
        ],
      },
    },
    tech: ["React 18", "TypeScript", "Express.js", "PostgreSQL", "Drizzle ORM"],
    category: "data",
  },
  {
    id: "nuptechs-aihub",
    name: "NupTechs AIHub",
    text: {
      pt: {
        tagline: "Hub Centralizado de Serviços de IA",
        description: "Plataforma central que provê serviços de IA (completion, embeddings, processamento de documentos) para todos os produtos NuPtechs. Orquestra múltiplos LLMs (Ollama local, OpenAI, Claude, Gemini) com fallback automático.",
        stats: [
          { label: "Provedores LLM", value: "4" },
          { label: "Serviços", value: "6" },
          { label: "Pipeline OCR", value: "PDF/Word" },
          { label: "Busca", value: "Vetorial" },
        ],
      },
      en: {
        tagline: "Centralized AI Services Hub",
        description: "Central platform providing AI services (completion, embeddings, document processing) to all NuPtechs products. Orchestrates multiple LLMs (local Ollama, OpenAI, Claude, Gemini) with automatic fallback.",
        stats: [
          { label: "LLM providers", value: "4" },
          { label: "Services", value: "6" },
          { label: "OCR pipeline", value: "PDF/Word" },
          { label: "Search", value: "Vector" },
        ],
      },
      es: {
        tagline: "Hub Centralizado de Servicios de IA",
        description: "Plataforma central que provee servicios de IA (completion, embeddings, procesamiento de documentos) para todos los productos NuPtechs. Orquesta múltiples LLMs (Ollama local, OpenAI, Claude, Gemini) con fallback automático.",
        stats: [
          { label: "Proveedores LLM", value: "4" },
          { label: "Servicios", value: "6" },
          { label: "Pipeline OCR", value: "PDF/Word" },
          { label: "Búsqueda", value: "Vectorial" },
        ],
      },
    },
    tech: ["Python", "FastAPI", "LangChain", "React 19", "Pinecone"],
    category: "ai",
  },
];

const i18nCategories: Record<Lang, { key: string; label: string }[]> = {
  pt: [
    { key: "all", label: "Todos" },
    { key: "platform", label: "Plataformas" },
    { key: "devtools", label: "Ferramentas Dev" },
    { key: "ai", label: "IA & Dados" },
    { key: "data", label: "Dados & Planilhas" },
    { key: "productivity", label: "Produtividade" },
  ],
  en: [
    { key: "all", label: "All" },
    { key: "platform", label: "Platforms" },
    { key: "devtools", label: "Dev Tools" },
    { key: "ai", label: "AI & Data" },
    { key: "data", label: "Data & Sheets" },
    { key: "productivity", label: "Productivity" },
  ],
  es: [
    { key: "all", label: "Todos" },
    { key: "platform", label: "Plataformas" },
    { key: "devtools", label: "Herramientas Dev" },
    { key: "ai", label: "IA & Datos" },
    { key: "data", label: "Datos & Hojas" },
    { key: "productivity", label: "Productividad" },
  ],
};

const i18nExpand: Record<Lang, { expand: string; collapse: string; live: string }> = {
  pt: { expand: "Clique para expandir", collapse: "Clique para recolher", live: "Em produção" },
  en: { expand: "Click to expand", collapse: "Click to collapse", live: "In production" },
  es: { expand: "Clic para expandir", collapse: "Clic para contraer", live: "En producción" },
};

export default function ProductShowcase({ lang = "pt" }: { lang?: Lang }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const categories = i18nCategories[lang] ?? i18nCategories.pt;
  const expandText = i18nExpand[lang] ?? i18nExpand.pt;

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="psc">
      {/* Filter tabs */}
      <div className="psc__tabs" role="tablist">
        {categories.map((cat) => (
          <button
            key={cat.key}
            role="tab"
            aria-selected={activeCategory === cat.key}
            className={`psc__tab${activeCategory === cat.key ? " psc__tab--active" : ""}`}
            onClick={() => { setActiveCategory(cat.key); setExpanded(null); }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="psc__grid">
        {filtered.map((product) => {
          const isExpanded = expanded === product.id;
          const t = product.text[lang] ?? product.text.pt;
          const categoryLabel = categories.find((cat) => cat.key === product.category)?.label ?? product.category;
          return (
            <article
              key={product.id}
              className={`psc__card${isExpanded ? " psc__card--expanded" : ""}`}
              onClick={() => setExpanded(isExpanded ? null : product.id)}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpanded(isExpanded ? null : product.id);
                }
              }}
            >
              <div className="psc__card-top">
                <span className="psc__category">{categoryLabel}</span>
                <span className="psc__live">
                  <span className="psc__live-dot" aria-hidden="true" />
                  {expandText.live}
                </span>
              </div>

              <div className="psc__card-header">
                <h3 className="psc__card-name">{product.name}</h3>
                <span className="psc__card-tagline">{t.tagline}</span>
              </div>

              <p className="psc__card-desc">{t.description}</p>

              {/* Stats grid — visible on expand */}
              <div className={`psc__stats${isExpanded ? " psc__stats--visible" : ""}`}>
                {t.stats.map((s) => (
                  <div key={s.label} className="psc__stat">
                    <span className="psc__stat-value">{s.value}</span>
                    <span className="psc__stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Tech badges */}
              <div className="psc__tech">
                {product.tech.map((tech) => (
                  <span key={tech} className="psc__tech-badge">{tech}</span>
                ))}
              </div>

              <span className="psc__expand-hint">
                {isExpanded ? expandText.collapse : expandText.expand}
              </span>
            </article>
          );
        })}
      </div>
    </div>
  );
}
