import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NavLinks from "../../../components/NavLinks";
import ThemeToggle from "../../../components/ThemeToggle";
import { type Locale } from "../../../i18n/dictionaries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

/* ── Icon component (same set as PT service pages) ─────────────────────── */
const Icon = ({ id }: { id: string }) => {
  const icons: Record<string, React.ReactNode> = {
    clock: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 6.5V10l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    trending_down: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M2.5 5.5l5 5 3.5-3.5 6.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.5 14.5h4v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    roi: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2.5v2M10 15.5v2M4.5 4.5l1.5 1.5M14 14l1.5 1.5M2.5 10h2M15.5 10h2M4.5 15.5l1.5-1.5M14 6l1.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    link: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M8.5 11.5a4.5 4.5 0 006.364.001l2-2a4.5 4.5 0 00-6.364-6.365l-1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.5 8.5a4.5 4.5 0 00-6.364 0l-2 2a4.5 4.5 0 006.364 6.364l1.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bolt: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M11 2L4 11h6l-1 7 7-9h-6l1-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    target: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="10" cy="10" r="1" fill="currentColor"/>
      </svg>
    ),
    mobile: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="5.5" y="2" width="9" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 15.5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    bell: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2.5A5 5 0 005 7.5v4l-1.5 2h13L15 11.5v-4A5 5 0 0010 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.5 15.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    rocket: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2.5C10 2.5 14.5 4 15.5 10c.5 3-1.5 5.5-1.5 5.5L10 12l-4 3.5S4 13 4.5 10C5.5 4 10 2.5 10 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 15.5l-2 2M14 15.5l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    refresh: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 10a7 7 0 0112-4.9l1.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 10a7 7 0 01-12 4.9L3.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.5 3.5V7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.5 16.5V13H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    building: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="14" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 8h14M7 8v9M13 8v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    shield: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2L4 4.5v5.75C4 14 7 17 10 18c3-1 6-4 6-7.75V4.5L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    chart: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 14.5l4.5-4.5 3.5 3.5 6-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.5 17.5h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    robot: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="7.5" cy="12.5" r="1" fill="currentColor"/>
        <circle cx="12.5" cy="12.5" r="1" fill="currentColor"/>
        <path d="M8 15.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 8V5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="4.5" r="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    lock: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 9V6.5a3 3 0 016 0V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="13.5" r="1" fill="currentColor"/>
      </svg>
    ),
    search: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    clipboard: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="5" y="4" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 4V3h4v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7.5 9h5M7.5 12h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  };
  return <>{icons[id] ?? icons["bolt"]}</>;
};

/* ── Service data EN ──────────────────────────────────────────────────────── */
const servicesEn = {
  "intelligent-automation": {
    ptSlug: "automacao-inteligente",
    icon: "bolt",
    headline: "Eliminate manual tasks. Free your team for what matters.",
    description:
      "We automate repetitive processes with intelligent workflows, API integrations and AI agents — reducing errors, operational costs and wasted hours.",
    keywords: ["business automation with AI", "intelligent RPA", "process automation", "automated workflows"],
    benefits: [
      { icon: "clock", title: "Up to 30h/week recovered", desc: "Companies that automate key processes report an average gain of 30 hours per week per team." },
      { icon: "trending_down", title: "90% error reduction", desc: "Manual processes have a 1-5% error rate. Automation brings this close to zero." },
      { icon: "roi", title: "ROI in 60 days", desc: "Well-executed automation projects recover the investment in 2 to 3 months." },
      { icon: "link", title: "Integration with any system", desc: "We connect ERPs, CRMs, spreadsheets, WhatsApp and any API — without rewriting everything." }
    ],
    useCases: [
      "Automatic customer onboarding with document collection via WhatsApp",
      "Automatic invoice and payment slip issuance upon closing a sale",
      "Appointment scheduling and confirmation without human intervention",
      "Smart inventory alerts based on sales history",
      "Automated lead triage with AI qualification"
    ],
    tech: ["n8n", "Python", "Node.js", "OpenAI API", "Make (Integromat)", "Webhooks", "REST APIs"],
    breadcrumbLabel: "Intelligent Automation",
    breadcrumbService: "Services",
    breadcrumbHome: "Home",
    ctaPrimary: "Request free diagnosis",
    ctaSecondary: "See all services",
    ctaTalk: "Talk about my project",
    benefitsTitle: "Why it's worth the investment",
    useCasesEyebrow: "Use cases",
    useCasesTitle: "What we build with this",
    useCasesLead: "Real examples of how we apply intelligent automation to solve concrete problems.",
    techTitle: "Technology stack",
    ctaBannerTitle: "Ready to start?",
    ctaBannerSub: "Free diagnosis in 24h — our team analyses your challenge and returns a concrete technical plan.",
    ctaBannerBtn: "Request free diagnosis",
    serviceLabel: "Service",
  },
  "bi-dashboards": {
    ptSlug: "dashboards-bi",
    icon: "chart",
    headline: "Real-time data. Faster decisions.",
    description:
      "We build operational and strategic dashboards that transform raw data into business visibility — connected directly to your systems.",
    keywords: ["business intelligence dashboard", "custom BI", "data visualization", "real-time KPIs"],
    benefits: [
      { icon: "bolt", title: "Real-time data", desc: "We connect directly to your ERP, CRM or database — no spreadsheet exports." },
      { icon: "target", title: "KPIs that matter to you", desc: "Each dashboard is built around the metrics your leadership needs." },
      { icon: "mobile", title: "Access on any device", desc: "Responsive, with role-based access control — from CEO to operator." },
      { icon: "bell", title: "Automatic alerts", desc: "Email or WhatsApp notifications when an indicator falls out of the ideal range." }
    ],
    useCases: [
      "Real-time sales panel integrated with CRM",
      "Logistics performance dashboard with delivery tracking",
      "Customer service SLA monitoring",
      "Executive financial report updated automatically",
      "Productivity analysis by team and by employee"
    ],
    tech: ["React", "Next.js", "Recharts", "PostgreSQL", "Redis", "REST API", "WebSocket"],
    breadcrumbLabel: "BI Dashboards",
    breadcrumbService: "Services",
    breadcrumbHome: "Home",
    ctaPrimary: "Request free diagnosis",
    ctaSecondary: "See all services",
    ctaTalk: "Talk about my project",
    benefitsTitle: "Why it's worth the investment",
    useCasesEyebrow: "Use cases",
    useCasesTitle: "What we build with this",
    useCasesLead: "Real examples of how we apply BI dashboards to solve concrete problems.",
    techTitle: "Technology stack",
    ctaBannerTitle: "Ready to start?",
    ctaBannerSub: "Free diagnosis in 24h — our team analyses your challenge and returns a concrete technical plan.",
    ctaBannerBtn: "Request free diagnosis",
    serviceLabel: "Service",
  },
  "mobile-apps": {
    ptSlug: "aplicativos-moveis",
    icon: "mobile",
    headline: "Apps your users love to use.",
    description:
      "We develop mobile apps with a modern stack for iOS and Android — from MVP to scalable product focused on performance and user experience.",
    keywords: ["mobile app development", "iOS Android app", "React Native", "mobile MVP"],
    benefits: [
      { icon: "rocket", title: "MVP in 4 weeks", desc: "Functional version in the hands of first users in one month." },
      { icon: "mobile", title: "iOS + Android simultaneously", desc: "One codebase, two platforms. Half the cost and timeline." },
      { icon: "bolt", title: "Native performance", desc: "Fast, offline-capable apps with a near-native experience." },
      { icon: "lock", title: "Secure and scalable", desc: "Architecture ready to grow from 100 to 1 million users." }
    ],
    useCases: [
      "Delivery app with real-time tracking",
      "Telemedicine platform with video consultations",
      "Field management app for external teams",
      "B2B marketplace with catalog and orders",
      "Loyalty app with gamification and cashback"
    ],
    tech: ["React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL", "Firebase", "AWS"],
    breadcrumbLabel: "Mobile Apps",
    breadcrumbService: "Services",
    breadcrumbHome: "Home",
    ctaPrimary: "Request free diagnosis",
    ctaSecondary: "See all services",
    ctaTalk: "Talk about my project",
    benefitsTitle: "Why it's worth the investment",
    useCasesEyebrow: "Use cases",
    useCasesTitle: "What we build with this",
    useCasesLead: "Real examples of how we apply mobile development to solve concrete problems.",
    techTitle: "Technology stack",
    ctaBannerTitle: "Ready to start?",
    ctaBannerSub: "Free diagnosis in 24h — our team analyses your challenge and returns a concrete technical plan.",
    ctaBannerBtn: "Request free diagnosis",
    serviceLabel: "Service",
  },
  "api-integrations": {
    ptSlug: "integracoes-api",
    icon: "link",
    headline: "Your systems talking. No silos, no rework.",
    description:
      "We connect tools, legacy systems and modern platforms via robust APIs — eliminating manual synchronisation work and operational rework.",
    keywords: ["system integration", "API development", "ERP CRM integration", "middleware"],
    benefits: [
      { icon: "refresh", title: "Real-time synchronisation", desc: "Data flows automatically between systems — no manual export and import." },
      { icon: "building", title: "No rewriting legacy systems", desc: "We integrate via API what you already have — preserving your existing investment." },
      { icon: "shield", title: "Secure and auditable", desc: "Complete logs, OAuth/JWT authentication and granular permission control." },
      { icon: "chart", title: "End-to-end visibility", desc: "Track a sale's data from CRM to ERP to finance in a single trail." }
    ],
    useCases: [
      "ERP ↔ e-commerce ↔ marketplace integration (Shopify, Mercado Livre, WooCommerce)",
      "Customer synchronisation between CRM, support and finance",
      "IoT data pipeline for real-time analysis",
      "Payment gateway integration with management system",
      "Unified API for multiple service channels (WhatsApp, chat, email)"
    ],
    tech: ["Node.js", "Python", "REST", "GraphQL", "Webhooks", "RabbitMQ", "Redis"],
    breadcrumbLabel: "API Integrations",
    breadcrumbService: "Services",
    breadcrumbHome: "Home",
    ctaPrimary: "Request free diagnosis",
    ctaSecondary: "See all services",
    ctaTalk: "Talk about my project",
    benefitsTitle: "Why it's worth the investment",
    useCasesEyebrow: "Use cases",
    useCasesTitle: "What we build with this",
    useCasesLead: "Real examples of how we apply API integrations to solve concrete problems.",
    techTitle: "Technology stack",
    ctaBannerTitle: "Ready to start?",
    ctaBannerSub: "Free diagnosis in 24h — our team analyses your challenge and returns a concrete technical plan.",
    ctaBannerBtn: "Request free diagnosis",
    serviceLabel: "Service",
  },
  "applied-ai": {
    ptSlug: "ia-aplicada",
    icon: "robot",
    headline: "Artificial intelligence that delivers real results.",
    description:
      "We implement LLMs, predictive analytics and cognitive automation directly in your business processes — focused on measurable ROI, not hype.",
    keywords: ["applied enterprise AI", "enterprise LLM", "AI automation", "AI agent"],
    benefits: [
      { icon: "robot", title: "Agents that actually work", desc: "Trained on your dataset, with configurable guardrails and human supervision." },
      { icon: "chart", title: "Business predictive analytics", desc: "Churn, demand, default and opportunity forecasting with custom-built models." },
      { icon: "lock", title: "100% your data", desc: "We process in your environment — no sensitive data leaves your infrastructure." },
      { icon: "bolt", title: "Integrated into your current flow", desc: "Not a parallel tool — it enters the process that already exists." }
    ],
    useCases: [
      "Customer service agent trained on company knowledge base",
      "Automatic support ticket classification by urgency and topic",
      "AI-generated personalised commercial proposals",
      "Contract and legal document analysis",
      "Demand forecasting for inventory and production planning"
    ],
    tech: ["OpenAI GPT-4", "Google Gemini", "LangChain", "Python", "PostgreSQL", "pgvector", "Redis"],
    breadcrumbLabel: "Applied AI",
    breadcrumbService: "Services",
    breadcrumbHome: "Home",
    ctaPrimary: "Request free diagnosis",
    ctaSecondary: "See all services",
    ctaTalk: "Talk about my project",
    benefitsTitle: "Why it's worth the investment",
    useCasesEyebrow: "Use cases",
    useCasesTitle: "What we build with this",
    useCasesLead: "Real examples of how we apply AI to solve concrete business problems.",
    techTitle: "Technology stack",
    ctaBannerTitle: "Ready to start?",
    ctaBannerSub: "Free diagnosis in 24h — our team analyses your challenge and returns a concrete technical plan.",
    ctaBannerBtn: "Request free diagnosis",
    serviceLabel: "Service",
  },
  "security-compliance": {
    ptSlug: "seguranca-compliance",
    icon: "shield",
    headline: "Secure software by design. Compliance without headaches.",
    description:
      "We develop and audit systems with secure architecture, LGPD/GDPR compliance and corporate standards — protecting your company and your clients.",
    keywords: ["software security LGPD", "technology compliance", "system audit", "data privacy"],
    benefits: [
      { icon: "lock", title: "LGPD in practice", desc: "Data mapping, retention policies, data subject rights and documented DPA." },
      { icon: "shield", title: "Secure architecture by default", desc: "Multi-factor authentication, encryption at rest and in transit, least-privilege by design." },
      { icon: "search", title: "Audit and pentest", desc: "We identify vulnerabilities before attackers do." },
      { icon: "clipboard", title: "Complete technical documentation", desc: "RAS, DPO ready, privacy policies and terms of use written by technicians." }
    ],
    useCases: [
      "LGPD adaptation of existing system with full data mapping",
      "Corporate IAM (Identity & Access Management) implementation",
      "Web application security audit (OWASP Top 10)",
      "Incident Response Plan (IR Plan) for IT teams",
      "SOC 2 / ISO 27001 certification — preparation and documentation"
    ],
    tech: ["OAuth 2.0", "JWT", "AWS IAM", "Vault (HashiCorp)", "OWASP ZAP", "Terraform"],
    breadcrumbLabel: "Security & Compliance",
    breadcrumbService: "Services",
    breadcrumbHome: "Home",
    ctaPrimary: "Request free diagnosis",
    ctaSecondary: "See all services",
    ctaTalk: "Talk about my project",
    benefitsTitle: "Why it's worth the investment",
    useCasesEyebrow: "Use cases",
    useCasesTitle: "What we build with this",
    useCasesLead: "Real examples of how we apply security & compliance to protect concrete businesses.",
    techTitle: "Technology stack",
    ctaBannerTitle: "Ready to start?",
    ctaBannerSub: "Free diagnosis in 24h — our team analyses your challenge and returns a concrete technical plan.",
    ctaBannerBtn: "Request free diagnosis",
    serviceLabel: "Service",
  },
};

/* ── Service data ES ──────────────────────────────────────────────────────── */
const servicesEs = {
  "automatizacion-inteligente": {
    ptSlug: "automacao-inteligente",
    icon: "bolt",
    headline: "Elimina las tareas manuales. Libera a tu equipo para lo que importa.",
    description:
      "Automatizamos procesos repetitivos con flujos inteligentes, integraciones de API y agentes con IA — reduciendo errores, costos operacionales y horas perdidas.",
    keywords: ["automatización empresarial con IA", "RPA inteligente", "automatización de procesos", "flujos automatizados"],
    benefits: [
      { icon: "clock", title: "Hasta 30h/semana recuperadas", desc: "Las empresas que automatizan procesos clave reportan una ganancia promedio de 30 horas semanales por equipo." },
      { icon: "trending_down", title: "Reducción de errores en 90%", desc: "Los procesos manuales tienen una tasa de error del 1-5%. La automatización la reduce a casi cero." },
      { icon: "roi", title: "ROI en 60 días", desc: "Los proyectos de automatización bien ejecutados recuperan la inversión en 2 a 3 meses." },
      { icon: "link", title: "Integración con cualquier sistema", desc: "Conectamos ERPs, CRMs, planillas, WhatsApp y cualquier API — sin reescribir todo." }
    ],
    useCases: [
      "Onboarding automático de clientes con recopilación de documentos vía WhatsApp",
      "Emisión automática de facturas y boletas al cerrar una venta",
      "Agendamiento y confirmación de citas sin intervención humana",
      "Alertas inteligentes de stock basadas en historial de ventas",
      "Triaje automatizado de leads con calificación por IA"
    ],
    tech: ["n8n", "Python", "Node.js", "OpenAI API", "Make (Integromat)", "Webhooks", "REST APIs"],
    breadcrumbLabel: "Automatización Inteligente",
    breadcrumbService: "Servicios",
    breadcrumbHome: "Inicio",
    ctaPrimary: "Solicitar diagnóstico gratis",
    ctaSecondary: "Ver todos los servicios",
    ctaTalk: "Hablar de mi proyecto",
    benefitsTitle: "Por qué vale la inversión",
    useCasesEyebrow: "Casos de uso",
    useCasesTitle: "Lo que construimos con esto",
    useCasesLead: "Ejemplos reales de cómo aplicamos la automatización inteligente para resolver problemas concretos.",
    techTitle: "Stack tecnológico",
    ctaBannerTitle: "¿Listo para empezar?",
    ctaBannerSub: "Diagnóstico gratuito en 24h — nuestro equipo analiza tu desafío y devuelve un plan técnico concreto.",
    ctaBannerBtn: "Solicitar diagnóstico gratis",
    serviceLabel: "Servicio",
  },
  "dashboards-bi": {
    ptSlug: "dashboards-bi",
    icon: "chart",
    headline: "Datos en tiempo real. Decisiones más rápidas.",
    description:
      "Desarrollamos dashboards operacionales y estratégicos que transforman datos crudos en visibilidad de negocio — conectados directamente a tus sistemas.",
    keywords: ["dashboard business intelligence", "BI personalizado", "visualización de datos", "KPIs en tiempo real"],
    benefits: [
      { icon: "bolt", title: "Datos en tiempo real", desc: "Nos conectamos directamente a tu ERP, CRM o base de datos — sin exportar planillas." },
      { icon: "target", title: "KPIs que te importan", desc: "Cada dashboard se construye alrededor de las métricas que tu liderazgo necesita." },
      { icon: "mobile", title: "Acceso en cualquier dispositivo", desc: "Responsivo, con control de acceso por rol — desde el CEO hasta el operador." },
      { icon: "bell", title: "Alertas automáticas", desc: "Notificaciones por email o WhatsApp cuando un indicador sale del rango ideal." }
    ],
    useCases: [
      "Panel de ventas en tiempo real integrado al CRM",
      "Dashboard de performance logística con seguimiento de entregas",
      "Monitoreo de SLA de atención al cliente",
      "Reporte financiero ejecutivo actualizado automáticamente",
      "Análisis de productividad por equipo y por colaborador"
    ],
    tech: ["React", "Next.js", "Recharts", "PostgreSQL", "Redis", "REST API", "WebSocket"],
    breadcrumbLabel: "Dashboards de BI",
    breadcrumbService: "Servicios",
    breadcrumbHome: "Inicio",
    ctaPrimary: "Solicitar diagnóstico gratis",
    ctaSecondary: "Ver todos los servicios",
    ctaTalk: "Hablar de mi proyecto",
    benefitsTitle: "Por qué vale la inversión",
    useCasesEyebrow: "Casos de uso",
    useCasesTitle: "Lo que construimos con esto",
    useCasesLead: "Ejemplos reales de cómo aplicamos BI dashboards para resolver problemas concretos.",
    techTitle: "Stack tecnológico",
    ctaBannerTitle: "¿Listo para empezar?",
    ctaBannerSub: "Diagnóstico gratuito en 24h — nuestro equipo analiza tu desafío y devuelve un plan técnico concreto.",
    ctaBannerBtn: "Solicitar diagnóstico gratis",
    serviceLabel: "Servicio",
  },
  "aplicaciones-moviles": {
    ptSlug: "aplicativos-moveis",
    icon: "mobile",
    headline: "Aplicaciones que tus usuarios aman usar.",
    description:
      "Desarrollamos apps móviles con stack moderna para iOS y Android — desde el MVP hasta el producto escalable con foco en rendimiento y experiencia del usuario.",
    keywords: ["desarrollo de aplicación móvil", "app iOS Android", "React Native", "MVP mobile"],
    benefits: [
      { icon: "rocket", title: "MVP en 4 semanas", desc: "Versión funcional en manos de los primeros usuarios en un mes." },
      { icon: "mobile", title: "iOS + Android simultáneos", desc: "Un solo código, dos plataformas. La mitad del costo y del plazo." },
      { icon: "bolt", title: "Rendimiento nativo", desc: "Apps rápidas, con capacidad offline y experiencia cercana a la nativa." },
      { icon: "lock", title: "Seguro y escalable", desc: "Arquitectura preparada para crecer de 100 a 1 millón de usuarios." }
    ],
    useCases: [
      "App de delivery con seguimiento en tiempo real",
      "Plataforma de telemedicina con consultas por video",
      "App de gestión de campo para equipos externos",
      "Marketplace B2B con catálogo y pedidos",
      "App de fidelidad con gamificación y cashback"
    ],
    tech: ["React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL", "Firebase", "AWS"],
    breadcrumbLabel: "Aplicaciones Móviles",
    breadcrumbService: "Servicios",
    breadcrumbHome: "Inicio",
    ctaPrimary: "Solicitar diagnóstico gratis",
    ctaSecondary: "Ver todos los servicios",
    ctaTalk: "Hablar de mi proyecto",
    benefitsTitle: "Por qué vale la inversión",
    useCasesEyebrow: "Casos de uso",
    useCasesTitle: "Lo que construimos con esto",
    useCasesLead: "Ejemplos reales de cómo aplicamos el desarrollo móvil para resolver problemas concretos.",
    techTitle: "Stack tecnológico",
    ctaBannerTitle: "¿Listo para empezar?",
    ctaBannerSub: "Diagnóstico gratuito en 24h — nuestro equipo analiza tu desafío y devuelve un plan técnico concreto.",
    ctaBannerBtn: "Solicitar diagnóstico gratis",
    serviceLabel: "Servicio",
  },
  "integraciones-api": {
    ptSlug: "integracoes-api",
    icon: "link",
    headline: "Tus sistemas hablando. Sin silos, sin retrabajo.",
    description:
      "Conectamos herramientas, sistemas legacy y plataformas modernas mediante APIs robustas — eliminando trabajo manual de sincronización y retrabajo operacional.",
    keywords: ["integración de sistemas", "desarrollo de API", "integración ERP CRM", "middleware"],
    benefits: [
      { icon: "refresh", title: "Sincronización en tiempo real", desc: "Los datos fluyen automáticamente entre sistemas — sin exportar e importar manualmente." },
      { icon: "building", title: "Sin reescribir sistemas legacy", desc: "Integramos vía API lo que ya tienes — preservando la inversión existente." },
      { icon: "shield", title: "Seguro y auditable", desc: "Logs completos, autenticación OAuth/JWT y control granular de permisos." },
      { icon: "chart", title: "Visibilidad de punta a punta", desc: "Rastrea el dato de una venta desde el CRM al ERP hasta las finanzas en un único rastro." }
    ],
    useCases: [
      "Integración ERP ↔ e-commerce ↔ marketplace (Shopify, Mercado Libre, WooCommerce)",
      "Sincronización de clientes entre CRM, soporte y finanzas",
      "Pipeline de datos de IoT para análisis en tiempo real",
      "Integración de pasarela de pago con sistema de gestión",
      "API unificada para múltiples canales de atención (WhatsApp, chat, email)"
    ],
    tech: ["Node.js", "Python", "REST", "GraphQL", "Webhooks", "RabbitMQ", "Redis"],
    breadcrumbLabel: "Integraciones & APIs",
    breadcrumbService: "Servicios",
    breadcrumbHome: "Inicio",
    ctaPrimary: "Solicitar diagnóstico gratis",
    ctaSecondary: "Ver todos los servicios",
    ctaTalk: "Hablar de mi proyecto",
    benefitsTitle: "Por qué vale la inversión",
    useCasesEyebrow: "Casos de uso",
    useCasesTitle: "Lo que construimos con esto",
    useCasesLead: "Ejemplos reales de cómo aplicamos integraciones de API para resolver problemas concretos.",
    techTitle: "Stack tecnológico",
    ctaBannerTitle: "¿Listo para empezar?",
    ctaBannerSub: "Diagnóstico gratuito en 24h — nuestro equipo analiza tu desafío y devuelve un plan técnico concreto.",
    ctaBannerBtn: "Solicitar diagnóstico gratis",
    serviceLabel: "Servicio",
  },
  "ia-aplicada": {
    ptSlug: "ia-aplicada",
    icon: "robot",
    headline: "Inteligencia artificial que entrega resultados reales.",
    description:
      "Implementamos LLMs, analítica predictiva y automatización cognitiva directamente en los procesos de tu negocio — con foco en ROI medible, no en tendencias.",
    keywords: ["IA aplicada empresarial", "LLM empresarial", "automatización con IA", "agente IA"],
    benefits: [
      { icon: "robot", title: "Agentes que realmente funcionan", desc: "Entrenados en tu base de datos, con guardrails y supervisión humana configurable." },
      { icon: "chart", title: "Analítica predictiva de negocio", desc: "Predicción de churn, demanda, mora y oportunidades con modelos a medida." },
      { icon: "lock", title: "Datos 100% tuyos", desc: "Procesamos en tu entorno — ningún dato sensible sale de tu infraestructura." },
      { icon: "bolt", title: "Integrado a tu flujo actual", desc: "No es una herramienta paralela — entra en el proceso que ya existe." }
    ],
    useCases: [
      "Agente de atención al cliente con base de conocimiento de la empresa",
      "Clasificación automática de tickets de soporte por urgencia y tema",
      "Generación de propuestas comerciales personalizadas vía IA",
      "Análisis de contratos y documentos legales",
      "Predicción de demanda para planificación de inventario y producción"
    ],
    tech: ["OpenAI GPT-4", "Google Gemini", "LangChain", "Python", "PostgreSQL", "pgvector", "Redis"],
    breadcrumbLabel: "IA Aplicada",
    breadcrumbService: "Servicios",
    breadcrumbHome: "Inicio",
    ctaPrimary: "Solicitar diagnóstico gratis",
    ctaSecondary: "Ver todos los servicios",
    ctaTalk: "Hablar de mi proyecto",
    benefitsTitle: "Por qué vale la inversión",
    useCasesEyebrow: "Casos de uso",
    useCasesTitle: "Lo que construimos con esto",
    useCasesLead: "Ejemplos reales de cómo aplicamos IA para resolver problemas concretos de negocio.",
    techTitle: "Stack tecnológico",
    ctaBannerTitle: "¿Listo para empezar?",
    ctaBannerSub: "Diagnóstico gratuito en 24h — nuestro equipo analiza tu desafío y devuelve un plan técnico concreto.",
    ctaBannerBtn: "Solicitar diagnóstico gratis",
    serviceLabel: "Servicio",
  },
  "seguridad-compliance": {
    ptSlug: "seguranca-compliance",
    icon: "shield",
    headline: "Software seguro por diseño. Compliance sin dolores de cabeza.",
    description:
      "Desarrollamos y auditamos sistemas con arquitectura segura, conformidad con LGPD/GDPR y estándares corporativos — protegiendo tu empresa y tus clientes.",
    keywords: ["seguridad de software LGPD", "compliance tecnológico", "auditoría de sistemas", "privacidad de datos"],
    benefits: [
      { icon: "lock", title: "LGPD en la práctica", desc: "Mapeo de datos, políticas de retención, derechos del titular y DPA documentados." },
      { icon: "shield", title: "Arquitectura segura por defecto", desc: "Autenticación multifactor, cifrado en reposo y en tránsito, least-privilege por diseño." },
      { icon: "search", title: "Auditoría y pentest", desc: "Identificamos vulnerabilidades antes que los atacantes lo hagan." },
      { icon: "clipboard", title: "Documentación técnica completa", desc: "RAS, DPO ready, políticas de privacidad y términos de uso redactados por técnicos." }
    ],
    useCases: [
      "Adecuación de sistema existente a la LGPD con mapeo completo de datos",
      "Implementación de IAM (Identity & Access Management) corporativo",
      "Auditoría de seguridad de aplicación web (OWASP Top 10)",
      "Plan de respuesta a incidentes (IR Plan) para equipos de TI",
      "Certificación SOC 2 / ISO 27001 — preparación y documentación"
    ],
    tech: ["OAuth 2.0", "JWT", "AWS IAM", "Vault (HashiCorp)", "OWASP ZAP", "Terraform"],
    breadcrumbLabel: "Seguridad & Compliance",
    breadcrumbService: "Servicios",
    breadcrumbHome: "Inicio",
    ctaPrimary: "Solicitar diagnóstico gratis",
    ctaSecondary: "Ver todos los servicios",
    ctaTalk: "Hablar de mi proyecto",
    benefitsTitle: "Por qué vale la inversión",
    useCasesEyebrow: "Casos de uso",
    useCasesTitle: "Lo que construimos con esto",
    useCasesLead: "Ejemplos reales de cómo aplicamos seguridad y compliance para proteger negocios concretos.",
    techTitle: "Stack tecnológico",
    ctaBannerTitle: "¿Listo para empezar?",
    ctaBannerSub: "Diagnóstico gratuito en 24h — nuestro equipo analiza tu desafío y devuelve un plan técnico concreto.",
    ctaBannerBtn: "Solicitar diagnóstico gratis",
    serviceLabel: "Servicio",
  },
};

type AllServices = typeof servicesEn & typeof servicesEs;
const allServices: AllServices = { ...servicesEn, ...servicesEs } as AllServices;

/* ── Slug → lang mapping ────────────────────────────────────────────────── */
const enSlugs = Object.keys(servicesEn);
const esSlugs = Object.keys(servicesEs);

type PageParams = { params: { lang: string; slug: string } };

export async function generateStaticParams() {
  const enPaths = enSlugs.map((slug) => ({ lang: "en", slug }));
  const esPaths = esSlugs.map((slug) => ({ lang: "es", slug }));
  return [...enPaths, ...esPaths];
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const service = allServices[params.slug as keyof AllServices];
  if (!service) return { title: "Not found" };

  const isEn = enSlugs.includes(params.slug);
  const langPrefix = isEn ? "en" : "es";
  const serviceSection = isEn ? "services" : "servicios";
  const ptUrl = `${siteUrl}/servicos/${service.ptSlug}`;
  const enSlug = isEn ? params.slug : esSlugs.indexOf(params.slug) >= 0
    ? enSlugs[esSlugs.indexOf(params.slug)] : params.slug;
  const esSlug = !isEn ? params.slug : enSlugs.indexOf(params.slug) >= 0
    ? esSlugs[enSlugs.indexOf(params.slug)] : params.slug;

  return {
    metadataBase: new URL(siteUrl),
    title: service.breadcrumbLabel,
    description: service.description,
    keywords: service.keywords,
    alternates: {
      canonical: `${siteUrl}/${langPrefix}/${serviceSection}/${params.slug}`,
      languages: {
        "pt-BR": ptUrl,
        "en-US": `${siteUrl}/en/services/${enSlug}`,
        "es-419": `${siteUrl}/es/servicios/${esSlug}`,
      },
    },
    openGraph: {
      title: `${service.breadcrumbLabel} — NuPtechs`,
      description: service.description,
      url: `${siteUrl}/${langPrefix}/${serviceSection}/${params.slug}`,
      type: "website",
      images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630 }],
    },
  };
}

export default function LangServicePage({ params }: PageParams) {
  if (!["en", "es"].includes(params.lang)) notFound();
  const service = allServices[params.slug as keyof AllServices];
  if (!service) notFound();

  const isEn = params.lang === "en";
  const homeHref = `/${params.lang}`;
  const servicesHref = `/${params.lang}/${isEn ? "services" : "servicios"}`;
  const ptUrl = siteUrl;
  const enUrl = `${siteUrl}/en`;
  const esUrl = `${siteUrl}/es`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.breadcrumbLabel,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "NuPtechs",
      url: siteUrl,
    },
    areaServed: ["BR", "419"],
    url: `${siteUrl}/${params.lang}/${isEn ? "services" : "servicios"}/${params.slug}`,
    keywords: service.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Nav ── */}
      <nav className="nav-bar" aria-label="Main navigation">
        <div className="nav-inner">
          <a href={homeHref} className="nav-logo" aria-label="NuPtechs — home">
            <span className="nav-logo-dot" aria-hidden="true" />
            <span className="nav-logo-text">NuPtechs</span>
          </a>
          <NavLinks lang={params.lang as "en" | "es"} />
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1 text-xs font-medium text-[var(--muted)]">
              <a href={ptUrl} className="hover:text-[var(--text)] transition-colors px-1">PT</a>
              <span className="text-[var(--border-strong)]">·</span>
              <a href={enUrl} className={`transition-colors px-1 ${params.lang === "en" ? "text-[var(--accent)] font-semibold" : "hover:text-[var(--text)]"}`}>EN</a>
              <span className="text-[var(--border-strong)]">·</span>
              <a href={esUrl} className={`transition-colors px-1 ${params.lang === "es" ? "text-[var(--accent)] font-semibold" : "hover:text-[var(--text)]"}`}>ES</a>
            </div>
            <ThemeToggle />
            <a href="mailto:nuptechs@nuptechs.com" className="nav-cta hidden lg:inline-flex">
              {service.ctaPrimary}
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="page-section pt-[calc(64px+5rem)]" aria-labelledby="service-heading">
        <div className="inner">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-[var(--subtle)]">
              <li><a href={homeHref} className="hover:text-[var(--text)] transition-colors">{service.breadcrumbHome}</a></li>
              <li aria-hidden="true">›</li>
              <li><a href={servicesHref} className="hover:text-[var(--text)] transition-colors">{service.breadcrumbService}</a></li>
              <li aria-hidden="true">›</li>
              <li className="text-[var(--muted)]">{service.breadcrumbLabel}</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <span className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]" aria-hidden="true">
                <Icon id={service.icon} />
              </span>
              <span className="eyebrow">{service.serviceLabel}</span>
            </span>
            <h1 id="service-heading" className="display-title mb-6">{service.headline}</h1>
            <p className="lead mb-8">{service.description}</p>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary">
                {service.ctaPrimary}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href={servicesHref} className="btn btn-secondary">{service.ctaSecondary}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="page-section bg-[var(--surface)]" aria-labelledby="benefits-heading">
        <div className="inner">
          <h2 id="benefits-heading" className="section-heading mb-12">{service.benefitsTitle}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {service.benefits.map((b) => (
              <div key={b.title} className="card card-sm">
                <div className="card-icon" aria-hidden="true"><Icon id={b.icon} /></div>
                <h3 className="card-title">{b.title}</h3>
                <p className="card-body">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="page-section" aria-labelledby="usecases-heading">
        <div className="inner grid gap-16 lg:grid-cols-2 lg:items-start">
          <div className="lg:sticky lg:top-24">
            <span className="eyebrow mb-4 block">{service.useCasesEyebrow}</span>
            <h2 id="usecases-heading" className="section-heading mb-6">{service.useCasesTitle}</h2>
            <p className="lead mb-8">{service.useCasesLead}</p>
            <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary">{service.ctaTalk}</a>
          </div>
          <ul className="flex flex-col gap-3" aria-label="Use cases">
            {service.useCases.map((uc, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 text-sm text-[var(--muted)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-0.5 flex-shrink-0 text-[var(--accent)]">
                  <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {uc}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="page-section bg-[var(--surface)]" aria-labelledby="tech-heading">
        <div className="inner">
          <h2 id="tech-heading" className="section-heading mb-8">{service.techTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {service.tech.map((t) => (
              <span key={t} className="rounded-full border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="page-section bg-[var(--accent)] py-20" aria-label="Call to action">
        <div className="inner text-center">
          <h2 className="mb-6 text-3xl font-bold text-white">{service.ctaBannerTitle}</h2>
          <p className="mx-auto mb-8 max-w-md text-base text-white/75">{service.ctaBannerSub}</p>
          <a href="mailto:nuptechs@nuptechs.com" className="inline-flex items-center gap-2 rounded-[0.875rem] bg-white px-7 py-3.5 text-[0.9375rem] font-semibold text-[var(--accent)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
            {service.ctaBannerBtn}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer" role="contentinfo">
        <div className="inner flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a href={homeHref} className="nav-logo" aria-label="NuPtechs — home">
            <span className="nav-logo-dot" aria-hidden="true" />
            <span className="nav-logo-text">NuPtechs</span>
          </a>
          <div className="flex items-center gap-4 text-xs text-[var(--subtle)]">
            <a href={ptUrl} className="hover:text-[var(--text)] transition-colors">PT</a>
            <a href={enUrl} className="hover:text-[var(--text)] transition-colors">EN</a>
            <a href={esUrl} className="hover:text-[var(--text)] transition-colors">ES</a>
          </div>
          <p className="text-xs text-[var(--subtle)]">© {new Date().getFullYear()} NuPtechs. {isEn ? "All rights reserved." : "Todos los derechos reservados."}</p>
        </div>
      </footer>
    </>
  );
}
