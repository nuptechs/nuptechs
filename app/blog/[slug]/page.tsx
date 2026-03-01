import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NavLinks from "../../components/NavLinks";
import ThemeToggle from "../../components/ThemeToggle";
import ArticleShell from "../../components/ArticleShell";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

/* ═══════════════════════════════════════════════════════════
   POST DATA — CRUD-ready structure
   Each post is self-contained with rich metadata, structured
   sections, callouts, key takeaways, and a mind map.
   In the future, swap this object for a CMS/DB fetch.
   ═══════════════════════════════════════════════════════════ */

export interface PostSection {
  id: string;
  heading: string;
  content: string; // HTML
  depth?: 0 | 1 | 2 | 3;
  parentId?: string;
}

export interface Callout {
  type: "tip" | "warning" | "insight" | "example";
  title: string;
  body: string;
  afterSectionId?: string;
  depth?: 0 | 1 | 2 | 3;
}

export interface MindMapNode {
  label: string;
  children?: MindMapNode[];
}

export interface Post {
  slug: string;
  tag: string;
  title: string;
  description: string;
  keywords: string[];
  readTime: string;
  readTimeByDepth?: Record<number, string>;
  publishedAt: string;
  updatedAt?: string;
  author: { name: string; role: string };
  executiveSummary?: string;
  keyTakeaways: string[];
  sections: PostSection[];
  callouts: Callout[];
  mindMap: MindMapNode;
  mnemonic?: { acronym: string; breakdown: { letter: string; word: string; hint: string }[] };
  maxDepth?: 1 | 2 | 3;
  relatedSlugs: string[];
}

export const posts: Record<string, Post> = {
  "como-automatizar-processos-manuais": {
    slug: "como-automatizar-processos-manuais",
    tag: "Automação",
    title: "Como automatizar processos manuais e liberar 30h/semana da sua equipe",
    description: "Descubra as 5 tarefas que mais consomem tempo em operações e como eliminá-las com fluxos inteligentes e integrações de API.",
    keywords: ["automação de processos manuais", "liberar tempo equipe", "RPA empresarial", "fluxos automatizados"],
    readTime: "6 min",
    publishedAt: "2026-02-15",
    author: { name: "NuPtechs", role: "Engenharia & Automação" },
    keyTakeaways: [
      "As 5 tarefas mais custosas: entrada de dados, confirmações, documentos, triagem e monitoramento",
      "Use o framework frequência × padronização × risco para priorizar",
      "Comece com quick wins (frequente + padronizado + baixo risco)",
      "Abordagem híbrida: valide com no-code, escale com código próprio",
      "ROI de integrações simples: 1–5 dias para retorno imediato",
    ],
    sections: [
      {
        id: "por-que-nao-aconteceu",
        heading: "Por que a automação ainda não aconteceu na sua empresa",
        content: `<p>Antes de falar em solução, é importante entender o diagnóstico. A maioria das empresas não automatiza por três razões:</p>
<ul>
  <li><strong>Acham que é caro ou complexo.</strong> Automação virou sinônimo de "projeto grande de TI". Não precisa ser.</li>
  <li><strong>Não enxergam o custo do status quo.</strong> Ninguém calcula quanto custa um colaborador sênior copiando dados manualmente por 2h/dia.</li>
  <li><strong>Não sabem por onde começar.</strong> Existe uma paralisia de escolha entre ferramentas, metodologias e fornecedores.</li>
</ul>
<p>Nenhuma dessas barreiras é intransponível. O primeiro passo é mapear onde o tempo vai — e priorizá-las por impacto.</p>`,
      },
      {
        id: "cinco-categorias",
        heading: "As 5 categorias que mais consomem tempo operacional",
        content: `<h3>1. Entrada e transferência de dados entre sistemas</h3>
<p>Este é, sem exagero, o maior desperdiçador de tempo em operações. Um colaborador recebe um pedido por e-mail, abre o CRM, cadastra o cliente, abre o ERP, cria o pedido, atualiza a planilha de controle.</p>
<p><strong>Impacto típico:</strong> 1 a 3 horas por dia por colaborador operacional.</p>
<p><strong>Como automatizar:</strong> Identifique os pontos de entrada de dados e os sistemas de destino. Uma integração via API ou ferramentas como n8n ou Make consegue sincronizar isso automaticamente.</p>

<h3>2. Confirmações, lembretes e follow-ups</h3>
<p>Toda empresa tem um ciclo de comunicação repetitivo: confirmar pedidos, lembrar clientes de consultas, cobrar boletos próximos do vencimento.</p>
<p><strong>Impacto típico:</strong> 1 a 2 horas por dia por equipe de atendimento ou vendas.</p>
<p><strong>Dado importante:</strong> Lembretes automáticos reduzem no-shows em consultas em até 70%.</p>

<h3>3. Geração de documentos e relatórios</h3>
<p>Propostas comerciais, contratos, notas fiscais, relatórios mensais — muitos desses documentos têm estrutura fixa e dados variáveis que poderiam ser preenchidos automaticamente.</p>
<p><strong>Impacto típico:</strong> 3 a 8 horas por semana em equipes comerciais e financeiras.</p>

<h3>4. Triagem e classificação de demandas</h3>
<p>Todo time de suporte, vendas ou operações recebe demandas por múltiplos canais — e alguém precisa ler, categorizar, priorizar e direcionar cada uma.</p>
<p><strong>Como automatizar:</strong> LLMs como GPT-4 conseguem classificar texto com mais de 90% de acurácia em menos de 1 segundo.</p>

<h3>5. Monitoramento e alertas manuais</h3>
<p>Alguém olha o painel de vendas toda manhã. Alguém verifica se o estoque está baixo. Tudo isso deveria ser proativo — o sistema avisa você.</p>
<p><strong>Impacto típico:</strong> 30 min a 2 horas por dia em gestores e analistas.</p>`,
      },
      {
        id: "framework-priorizacao",
        heading: "O método de três perguntas para priorizar",
        content: `<p>Não adianta automatizar tudo ao mesmo tempo. Use estas três perguntas:</p>
<ol>
  <li><strong>Frequência:</strong> Essa tarefa acontece diariamente? Semanalmente? Quanto mais frequente, maior o impacto.</li>
  <li><strong>Padronização:</strong> Existe um padrão claro de entrada → processamento → saída? Tarefas com regras definidas são mais fáceis de automatizar.</li>
  <li><strong>Custo de erro:</strong> O que acontece se der errado? Automação de tarefas de alto impacto exige mais cuidado no design.</li>
</ol>
<p>Ataque primeiro o que é <strong>frequente + padronizado + baixo custo de erro</strong>. Esses são os quick wins que constroem confiança no processo.</p>`,
      },
      {
        id: "ferramentas-abordagens",
        heading: "Ferramentas e abordagens",
        content: `<p>Existem três caminhos para automatizar:</p>
<p><strong>1. No-code/low-code</strong> (n8n, Make, Zapier): Ideais para integrações simples entre SaaS. Rápidas de configurar, mas com limitações de escala.</p>
<p><strong>2. Desenvolvimento sob medida:</strong> Para processos críticos com alto volume ou lógica complexa. Mais custoso no início, totalmente adaptado.</p>
<p><strong>3. Híbrido:</strong> Use no-code para prototipagem e validação. Quando o volume cresce, migre para código próprio. <em>Esta é a abordagem que recomendamos.</em></p>`,
      },
      {
        id: "roi-timeline",
        heading: "Quanto tempo leva para ver resultado",
        content: `<p>Projetos de automação bem escopados têm ROI rápido:</p>
<ul>
  <li><strong>Integrações simples</strong> (conectar dois sistemas via API): 1 a 5 dias, retorno imediato.</li>
  <li><strong>Automação de fluxo completo</strong> (entrada → processamento → saída + alertas): 2 a 4 semanas, ROI em 1–2 meses.</li>
  <li><strong>Plataforma customizada</strong>: 4 a 12 semanas, ROI em 3–6 meses.</li>
</ul>
<p>O erro mais comum é esperar o projeto "perfeito" antes de começar. Comece pequeno, meça, itere.</p>`,
      },
    ],
    callouts: [
      { type: "example", title: "Caso real", body: "Uma clínica com 3 atendentes que recebiam agendamentos por WhatsApp e copiavam para o sistema. Após automatizar com webhook, economizaram 4h/dia coletivas e zeraram erros de transcrição." },
      { type: "insight", title: "Dado-chave", body: "Follow-ups automáticos aumentam a taxa de conversão em 20 a 30%. Lembretes reduzem no-shows em até 70%." },
      { type: "tip", title: "Dica prática", body: "Comece automatizando a tarefa mais chata do time — a que todos odeiam fazer. O buy-in da equipe será imediato." },
    ],
    mindMap: {
      label: "Automação de Processos",
      children: [
        { label: "5 Categorias", children: [
          { label: "Entrada de dados" },
          { label: "Confirmações" },
          { label: "Documentos" },
          { label: "Triagem" },
          { label: "Monitoramento" },
        ]},
        { label: "Priorização", children: [
          { label: "Frequência" },
          { label: "Padronização" },
          { label: "Risco de erro" },
        ]},
        { label: "Abordagem", children: [
          { label: "No-code → validar" },
          { label: "Código → escalar" },
          { label: "Híbrido ✓" },
        ]},
      ],
    },
    mnemonic: {
      acronym: "FAPRI",
      breakdown: [
        { letter: "F", word: "Frequência", hint: "Quanto mais frequente, mais impacto" },
        { letter: "A", word: "Automação híbrida", hint: "No-code + código" },
        { letter: "P", word: "Padronização", hint: "Regras claras = automação confiável" },
        { letter: "R", word: "ROI rápido", hint: "Comece com quick wins" },
        { letter: "I", word: "Iteração", hint: "Pequeno, medir, escalar" },
      ],
    },
    relatedSlugs: ["llms-no-mundo-corporativo", "integracao-api-whatsapp-business"],
  },

  "llms-no-mundo-corporativo": {
    slug: "llms-no-mundo-corporativo",
    tag: "IA Aplicada",
    title: "LLMs no mundo corporativo: onde a IA realmente entrega ROI",
    description: "Análise de casos reais de empresas brasileiras que implementaram IA e os resultados mensuráveis obtidos nos primeiros 90 dias.",
    keywords: ["LLM empresarial", "IA corporativa ROI", "inteligência artificial empresas brasileiras", "GPT corporativo"],
    readTime: "8 min",
    publishedAt: "2026-02-10",
    author: { name: "NuPtechs", role: "IA & Machine Learning" },
    keyTakeaways: [
      "LLMs entregam ROI consistente em triagem de texto, geração de documentos, FAQ e extração de dados",
      "Falham em cálculos precisos, dados em tempo real sem integração e responsabilidade jurídica",
      "O modelo de 4 etapas: escopo cirúrgico → dados → baseline → piloto 10%",
      "Custo de classificação: <R$ 0,01 por chamada; 10k/mês por ~R$ 100",
      "Antes de investir: pergunte 'qual é o baseline e como medimos em 90 dias?'",
    ],
    sections: [
      {
        id: "o-que-sao-llms",
        heading: "O que são LLMs na prática empresarial",
        content: `<p>LLMs são modelos de linguagem treinados em enormes volumes de texto. Na prática corporativa, aparecem em três formas:</p>
<ul>
  <li><strong>Agentes de atendimento:</strong> Respondem perguntas com base em uma base de conhecimento.</li>
  <li><strong>Processadores de texto:</strong> Classificam, resumem, extraem informações ou geram rascunhos.</li>
  <li><strong>Assistentes de decisão:</strong> Analisam dados e sugerem ações baseadas em padrões.</li>
</ul>
<p>A diferença entre esses casos de uso em complexidade, custo e risco é enorme — e confundir os três é um dos principais motivos de fracasso.</p>`,
      },
      {
        id: "onde-entregam-roi",
        heading: "Onde LLMs entregam ROI consistente",
        content: `<h3>1. Triagem e classificação de texto em escala</h3>
<p>Classifique chamados por urgência, e-mails por intenção, leads por qualificação — em milissegundos, com mais de 90% de acurácia.</p>
<p><strong>Resultado:</strong> Redução de 60–80% do tempo de triagem. Custo: ~R$ 0,01 por chamada de API.</p>

<h3>2. Geração de rascunhos padronizados</h3>
<p>Propostas, e-mails de follow-up, relatórios — documentos com estrutura conhecida e dados variáveis.</p>
<p><strong>Resultado:</strong> Redução de 50–70% do tempo de produção. O colaborador revisa, não cria do zero.</p>

<h3>3. Atendimento para perguntas frequentes</h3>
<p>Agente treinado na base de conhecimento resolve 40–60% das dúvidas sem humano, 24/7.</p>
<p><strong>O segredo:</strong> O agente precisa saber quando não sabe. Escalonamento claro para humanos é obrigatório.</p>

<h3>4. Extração de dados de documentos</h3>
<p>NFs, contratos, laudos — LLMs + OCR extraem campos específicos com alta precisão.</p>
<p><strong>Resultado:</strong> Redução de 80–95% do tempo de processamento de documentos.</p>`,
      },
      {
        id: "onde-falham",
        heading: "Onde LLMs frequentemente falham",
        content: `<p><strong>Cálculos precisos:</strong> LLMs são ruins em matemática complexa. Use ferramentas determinísticas e LLMs apenas para comunicar resultados.</p>
<p><strong>Dados em tempo real:</strong> Sem integração (RAG, function calling), o modelo responde com conhecimento de treinamento — possivelmente desatualizado.</p>
<p><strong>Responsabilidade jurídica:</strong> Diagnósticos médicos, pareceres jurídicos, laudos de engenharia — revisão humana obrigatória.</p>`,
      },
      {
        id: "modelo-implementacao",
        heading: "O modelo de implementação que funciona",
        content: `<ol>
  <li><strong>Escopo cirúrgico:</strong> Um único caso de uso bem definido — não "implementar IA na empresa".</li>
  <li><strong>Dados primeiro:</strong> Mapeie e limpe dados antes de codificar. Lixo entra, lixo sai.</li>
  <li><strong>Baseline humano:</strong> Meça performance atual sem IA — tempo, erro, custo.</li>
  <li><strong>Piloto com 10%:</strong> Rode em paralelo por 2–4 semanas antes de escalar.</li>
</ol>`,
      },
    ],
    callouts: [
      { type: "warning", title: "Cuidado com alucinações", body: "LLMs inventam fatos quando não têm informação suficiente. Para documentos com dados precisos, combine LLM com dados estruturados via RAG." },
      { type: "insight", title: "Economia real", body: "10.000 classificações por mês: custo de IA < R$ 100. A economia em horas de trabalho é ordens de magnitude maior." },
      { type: "tip", title: "A pergunta certa", body: "Antes de investir, pergunte ao fornecedor: 'Qual é o baseline atual e como medimos o resultado em 90 dias?'" },
    ],
    mindMap: {
      label: "LLMs Corporativos",
      children: [
        { label: "Funciona ✓", children: [
          { label: "Triagem de texto" },
          { label: "Geração de docs" },
          { label: "FAQ 24/7" },
          { label: "Extração OCR" },
        ]},
        { label: "Não funciona ✗", children: [
          { label: "Cálculos precisos" },
          { label: "Dados real-time" },
          { label: "Responsab. jurídica" },
        ]},
        { label: "Método", children: [
          { label: "1. Escopo cirúrgico" },
          { label: "2. Dados primeiro" },
          { label: "3. Baseline humano" },
          { label: "4. Piloto 10%" },
        ]},
      ],
    },
    relatedSlugs: ["como-automatizar-processos-manuais", "dashboard-bi-para-pmes"],
  },

  "dashboard-bi-para-pmes": {
    slug: "dashboard-bi-para-pmes",
    tag: "Business Intelligence",
    title: "Dashboard de BI para PMEs: como sair das planilhas e tomar decisões em tempo real",
    description: "Guia completo para pequenas e médias empresas implementarem inteligência de dados sem depender de relatórios manuais ou consultores caros.",
    keywords: ["dashboard BI PME", "business intelligence pequenas empresas", "sair das planilhas", "decisões baseadas em dados"],
    readTime: "7 min",
    publishedAt: "2026-02-22",
    author: { name: "NuPtechs", role: "Business Intelligence" },
    keyTakeaways: [
      "Planilhas falham em latência, escala e erro humano — BI resolve os três",
      "Um dashboard precisa de: KPIs, drill-down, alertas e histórico comparativo",
      "Stack acessível: PostgreSQL + n8n + Grafana/Metabase — implementável em 2-4 semanas",
      "O maior motivo de fracasso não é técnico — é não ter um 'dono' do dashboard",
      "Comece com os 5 KPIs que você já consulta toda semana",
    ],
    sections: [
      {
        id: "planilha-insuficiente",
        heading: "Por que a planilha deixou de ser suficiente",
        content: `<p>A planilha foi a primeira ferramenta de BI — e ainda tem lugar. Mas falha em três pontos quando o negócio cresce:</p>
<ul>
  <li><strong>Latência:</strong> Dados precisam ser coletados e formatados manualmente. Quando o relatório fica pronto, já tem dias de atraso.</li>
  <li><strong>Escala:</strong> Com mais fontes de dados, manter a planilha consistente vira trabalho em tempo integral.</li>
  <li><strong>Erro humano:</strong> Uma fórmula errada pode comprometer toda a análise — e o problema só aparece meses depois.</li>
</ul>`,
      },
      {
        id: "quatro-elementos",
        heading: "O que um dashboard precisa ter",
        content: `<h3>1. KPIs na tela principal</h3>
<p>Faturamento vs. meta, ticket médio, número de pedidos, margem bruta — os 5–8 indicadores que o gestor olha toda manhã. Tudo em uma tela.</p>

<h3>2. Drill-down para o detalhe</h3>
<p>Quando um KPI está fora do esperado, clicar e ver detalhamento por produto, canal ou vendedor em segundos.</p>

<h3>3. Alertas automáticos</h3>
<p>"Avise quando o estoque de X cair abaixo de 50" ou "quando o churn semanal superar 5%". O dashboard que avisa é mais valioso que o consultado.</p>

<h3>4. Dados históricos comparativos</h3>
<p>A análise mais útil: "quanto vendemos este mês vs. mesmo mês do ano passado, e qual a tendência?"</p>`,
      },
      {
        id: "stack-tecnologico",
        heading: "Stack tecnológico para PMEs",
        content: `<p>Para PMEs, uma stack enxuta funciona melhor:</p>
<ul>
  <li><strong>Banco de dados:</strong> PostgreSQL — robusto, gratuito, suportado por tudo.</li>
  <li><strong>ETL:</strong> n8n ou scripts Python via CRON — conecta fontes, normaliza e carrega.</li>
  <li><strong>Visualização:</strong> Grafana (customizável) ou Metabase (amigável para não-técnicos).</li>
  <li><strong>Alertas:</strong> Email, WhatsApp ou Slack via webhooks — custo marginal zero.</li>
</ul>
<p>Implementável em 2–4 semanas para os primeiros KPIs.</p>`,
      },
      {
        id: "erro-comum",
        heading: "O erro mais comum: dashboard sem dono",
        content: `<p>O maior motivo de fracasso não é tecnológico — é organizacional. Defina antes:</p>
<ul>
  <li>Quem é o gestor responsável por cada KPI?</li>
  <li>Qual a cadência de revisão (diária? semanal?)?</li>
  <li>O que acontece quando um indicador está fora da meta?</li>
</ul>
<p>A tecnologia é a parte fácil. A parte difícil é criar o hábito de usar dados para decidir.</p>`,
      },
    ],
    callouts: [
      { type: "tip", title: "Quick start", body: "Liste os 5 indicadores que você consulta toda semana → identifique em qual sistema estão → verifique se o sistema tem API. Com essas 3 informações, um diagnóstico define o esforço." },
      { type: "warning", title: "Evite o erro clássico", body: "Não compre Tableau ou Power BI antes de validar se Grafana ou Metabase (gratuitos) atendem. 80% das PMEs não precisam de ferramentas enterprise." },
    ],
    mindMap: {
      label: "BI para PMEs",
      children: [
        { label: "Problema", children: [
          { label: "Latência" },
          { label: "Erro humano" },
          { label: "Escala" },
        ]},
        { label: "Dashboard ideal", children: [
          { label: "KPIs top-level" },
          { label: "Drill-down" },
          { label: "Alertas" },
          { label: "Histórico" },
        ]},
        { label: "Stack PME", children: [
          { label: "PostgreSQL" },
          { label: "n8n / Python" },
          { label: "Grafana / Metabase" },
        ]},
      ],
    },
    relatedSlugs: ["como-automatizar-processos-manuais", "como-escolher-stack-tecnologica"],
  },

  "como-escolher-stack-tecnologica": {
    slug: "como-escolher-stack-tecnologica",
    tag: "Desenvolvimento Ágil",
    title: "Como escolher a stack tecnológica certa para o seu projeto de software",
    description: "Os critérios que engenheiros seniores usam para definir linguagem, banco de dados e infraestrutura — sem dívida técnica.",
    keywords: ["como escolher stack tecnológica", "linguagem de programação para projeto", "arquitetura de software empresarial"],
    readTime: "6 min",
    publishedAt: "2026-02-18",
    author: { name: "NuPtechs", role: "Engenharia de Software" },
    keyTakeaways: [
      "Avalie por: fit com o problema, maturidade do ecossistema, pool de profissionais, custo em escala e velocidade de iteração",
      "Para sistemas 5+ anos: prefira tecnologias com 5+ anos de histórico estável",
      "Banco de dados é a escolha mais difícil de reverter — decida com cuidado",
      "PostgreSQL resolve 80% dos casos. Use mais de um banco quando necessário",
      "Nunca escolha stack por hype, familiaridade pessoal ou 'a empresa X usa'",
    ],
    sections: [
      {
        id: "o-que-e-stack",
        heading: "O que é uma stack e por que importa tanto",
        content: `<p>Stack tecnológica é o conjunto de linguagens, frameworks, bancos de dados e infraestrutura que compõem um sistema. Define:</p>
<ul>
  <li>Velocidade de entrega de novas funcionalidades</li>
  <li>Custo de manutenção e operação ao longo do tempo</li>
  <li>Facilidade de contratar desenvolvedores</li>
  <li>Resiliência e escalabilidade em condições adversas</li>
</ul>
<p>Uma stack bem escolhida não aparece — o sistema funciona. Uma stack mal escolhida gera bugs, lentidão e eventualmente uma reescrita 3–10x mais cara.</p>`,
      },
      {
        id: "cinco-criterios",
        heading: "Os cinco critérios de avaliação",
        content: `<h3>1. Fit com o problema</h3>
<p>Python para IA, Node.js para APIs com alta concorrência, Go para sistemas de baixa latência. A primeira pergunta: <strong>qual é o perfil de carga?</strong></p>

<h3>2. Maturidade do ecossistema</h3>
<p>Bibliotecas, documentação, comunidade, frequência de updates de segurança. Para sistemas 5+ anos, prefira tecnologias com 5+ anos de histórico estável.</p>

<h3>3. Disponibilidade de profissionais</h3>
<p>A stack mais elegante não adianta se contratar leva 6 meses. Avalie o pool de profissionais no seu contexto.</p>

<h3>4. Custo de operação em escala</h3>
<p>Estime para 10x, 100x e 1000x o volume inicial. Algumas escolhas baratas no início se tornam proibitivas em escala.</p>

<h3>5. Velocidade de iteração inicial</h3>
<p>Para MVPs, produtividade alta vale mais que otimização prematura. Reavalie quando o produto amadurecer.</p>`,
      },
      {
        id: "banco-de-dados",
        heading: "Banco de dados: o erro mais caro",
        content: `<p>A escolha mais difícil de reverter. Heurísticas úteis:</p>
<ul>
  <li><strong>Dados relacionais com integridade crítica:</strong> PostgreSQL. Ponto.</li>
  <li><strong>Estrutura flexível + alta velocidade de escrita:</strong> MongoDB ou Cassandra.</li>
  <li><strong>Cache e dados temporários:</strong> Redis.</li>
  <li><strong>Busca full-text e vetorial:</strong> Elasticsearch ou pgvector.</li>
</ul>
<p>Em muitos sistemas, a resposta certa é <strong>usar mais de um banco</strong> — cada um para o que faz melhor.</p>`,
      },
      {
        id: "infraestrutura",
        heading: "Infraestrutura: cloud em 2026",
        content: `<p>A decisão relevante é <strong>qual modelo de cloud</strong>:</p>
<ul>
  <li><strong>IaaS</strong> (EC2): Controle máximo, você gerencia tudo.</li>
  <li><strong>PaaS</strong> (Railway, Render): Menos controle, mais velocidade de deploy.</li>
  <li><strong>Serverless</strong> (Vercel, Lambda): Custo zero em idle, escalabilidade automática.</li>
</ul>
<p>Para sistemas novos sem requisitos especiais: comece com PaaS ou serverless.</p>`,
      },
    ],
    callouts: [
      { type: "warning", title: "Armadilhas de decisão", body: "'É o que eu sei', 'está na moda', 'a empresa X usa' — nenhum desses é critério técnico. A familiaridade do dev importa, mas a stack sobrevive anos." },
      { type: "insight", title: "Regra de ouro", body: "Inove na lógica de negócio, não na infraestrutura. Use o que é estável e comprovado para a base, e reserve inovação para onde ela gera valor." },
    ],
    mindMap: {
      label: "Escolha de Stack",
      children: [
        { label: "5 Critérios", children: [
          { label: "Fit com problema" },
          { label: "Ecossistema" },
          { label: "Pool de devs" },
          { label: "Custo em escala" },
          { label: "Velocidade inicial" },
        ]},
        { label: "Banco de dados", children: [
          { label: "PostgreSQL (padrão)" },
          { label: "MongoDB (flexível)" },
          { label: "Redis (cache)" },
        ]},
        { label: "Cloud", children: [
          { label: "PaaS / Serverless" },
          { label: "IaaS só se preciso" },
        ]},
      ],
    },
    relatedSlugs: ["software-sob-medida-vs-saas", "dashboard-bi-para-pmes"],
  },

  "integracao-api-whatsapp-business": {
    slug: "integracao-api-whatsapp-business",
    tag: "Integrações",
    title: "Como integrar a API do WhatsApp Business ao seu sistema empresarial",
    description: "Passo a passo técnico e estratégico para empresas que querem automatizar atendimento, confirmações e notificações via WhatsApp.",
    keywords: ["API WhatsApp Business", "integrar WhatsApp sistema empresarial", "automação WhatsApp", "chatbot WhatsApp"],
    readTime: "8 min",
    publishedAt: "2026-02-12",
    author: { name: "NuPtechs", role: "Integrações & APIs" },
    keyTakeaways: [
      "Use apenas a API oficial da Meta — soluções não-oficiais resultam em ban",
      "Modelo de cobrança por conversa (24h), não por mensagem. ~R$ 0,20 por conversa de serviço",
      "Melhor ROI: confirmações automáticas, atendimento com IA, qualificação de leads",
      "Arquitetura: webhook + roteamento + engine de resposta + fila de mensagens",
      "LGPD exige opt-in explícito documentado e opt-out processado em 24h",
    ],
    sections: [
      {
        id: "api-oficial-vs-nao-oficial",
        heading: "API oficial vs. soluções não-oficiais",
        content: `<p>Existem dezenas de ferramentas que prometem "integração com WhatsApp" a baixo custo — WhatsApp Web automatizado, bibliotecas não-oficiais. Todas funcionam até o número ser banido.</p>
<p><strong>A solução correta é a API oficial da Meta</strong>, acessível diretamente ou via BSPs credenciados. É mais cara, tem políticas mais rígidas — e é a única opção estável para uso empresarial.</p>`,
      },
      {
        id: "como-funciona",
        heading: "Como a API oficial funciona",
        content: `<ul>
  <li><strong>Número dedicado:</strong> Um número específico para a conta de negócios.</li>
  <li><strong>Templates para mensagens proativas:</strong> Precisam de aprovação prévia da Meta.</li>
  <li><strong>Janela de 24h:</strong> Após mensagem do cliente, 24h para responder livremente. Fora disso, só via template.</li>
  <li><strong>Cobrado por conversa:</strong> Janela de 24h, não por mensagem individual.</li>
</ul>
<p>Para o Brasil: conversa de serviço ~USD 0,03; utilidade ~USD 0,04; marketing ~USD 0,06. 10.000 confirmações/mês ≈ R$ 2.000 — 3–5x mais barato que SMS.</p>`,
      },
      {
        id: "casos-roi",
        heading: "Casos de uso com melhor ROI",
        content: `<h3>Confirmações e lembretes automáticos</h3>
<p>Taxa de leitura >90%. Redução de no-shows em saúde: 50–70%. Redução de inadimplência: 20–40%.</p>

<h3>Atendimento ao cliente com IA</h3>
<p>Agente treinado resolve 40–60% das dúvidas sem humano, 24/7. Handoff transparente para atendente quando necessário.</p>

<h3>Qualificação de leads</h3>
<p>Fluxo automático qualifica o prospect e agenda demonstração — sem vendedor online.</p>

<h3>Alertas operacionais internos</h3>
<p>"Pedido de alto valor recebido", "Estoque crítico" — WhatsApp como alerta tem resposta muito superior ao e-mail.</p>`,
      },
      {
        id: "arquitetura",
        heading: "Arquitetura de implementação",
        content: `<ol>
  <li><strong>Conta Meta Business + número verificado</strong></li>
  <li><strong>Webhook HTTPS</strong> para receber mensagens (resposta em <5s)</li>
  <li><strong>Sistema de roteamento</strong> (bot, humano ou processamento)</li>
  <li><strong>Engine de resposta</strong> (IA, árvore de decisão ou painel humano)</li>
  <li><strong>Fila de mensagens</strong> (RabbitMQ, SQS) para volumes altos</li>
</ol>`,
      },
      {
        id: "lgpd-optin",
        heading: "LGPD e gestão de opt-in",
        content: `<p>A API exige opt-in explícito. A LGPD exige consentimento com finalidade especificada. Implementação completa:</p>
<ul>
  <li>Mecanismo de opt-in (formulário, termos, confirmação de compra)</li>
  <li>Registro auditável com timestamp</li>
  <li>Mecanismo de opt-out processado em até 24h</li>
</ul>`,
      },
    ],
    callouts: [
      { type: "warning", title: "Risco de ban", body: "O WhatsApp detecta uso automatizado e bane números agressivamente desde 2023. Para canal principal de vendas, ban = perda de toda a base de clientes." },
      { type: "example", title: "Custo comparado", body: "10.000 confirmações/mês: WhatsApp API ≈ R$ 2.000. SMS equivalente: R$ 6.000–10.000, com taxa de abertura 4x menor." },
    ],
    mindMap: {
      label: "WhatsApp Business API",
      children: [
        { label: "Setup", children: [
          { label: "Meta Business Suite" },
          { label: "Número verificado" },
          { label: "Templates aprovados" },
        ]},
        { label: "Arquitetura", children: [
          { label: "Webhook" },
          { label: "Roteamento" },
          { label: "IA + Humano" },
          { label: "Fila de msgs" },
        ]},
        { label: "Compliance", children: [
          { label: "Opt-in explícito" },
          { label: "LGPD" },
          { label: "Opt-out 24h" },
        ]},
      ],
    },
    relatedSlugs: ["como-automatizar-processos-manuais", "llms-no-mundo-corporativo"],
  },

  "software-sob-medida-vs-saas": {
    slug: "software-sob-medida-vs-saas",
    tag: "Desenvolvimento Ágil",
    title: "Software sob medida vs. SaaS pronto: qual escolher para sua empresa?",
    description: "Framework prático para gestores avaliarem custo, tempo e risco antes de contratar desenvolvimento personalizado.",
    keywords: ["software sob medida vs SaaS", "quando contratar desenvolvimento personalizado", "custo software sob medida"],
    readTime: "5 min",
    publishedAt: "2026-02-05",
    author: { name: "NuPtechs", role: "Consultoria Técnica" },
    keyTakeaways: [
      "A decisão raramente é binária — as melhores arquiteturas combinam SaaS + sob medida",
      "SaaS ganha em: processos padrão, velocidade de adoção e quando o volume não justifica dev",
      "Sob medida ganha em: diferencial competitivo, integrações profundas e controle de dados",
      "SaaS esconde 3 custos: adaptação do processo, lock-in e funcionalidades que não chegam",
      "Framework de 5 perguntas sim/não resolve a decisão em 5 minutos",
    ],
    sections: [
      {
        id: "nao-binaria",
        heading: "A decisão não é binária",
        content: `<p>A pergunta mais útil não é "SaaS ou software próprio?" — é <strong>"qual parte do meu processo é commodity e qual é diferencial?"</strong></p>
<p>Use SaaS para o que existe bem resolvido no mercado. Desenvolva sob medida onde está o diferencial competitivo real.</p>`,
      },
      {
        id: "quando-saas",
        heading: "Quando o SaaS é a resposta certa",
        content: `<ul>
  <li><strong>Processo padrão de mercado</strong> — e-mail, CRM básico, videoconferência.</li>
  <li><strong>Volume baixo</strong> — funcionalidade usada por 3 pessoas uma vez por semana.</li>
  <li><strong>Velocidade crítica</strong> — SaaS funciona em dias, sob medida leva semanas.</li>
  <li><strong>P&D contínuo</strong> — fornecedores especializados investem mais que qualquer empresa.</li>
</ul>`,
      },
      {
        id: "quando-sob-medida",
        heading: "Quando o software sob medida é a resposta certa",
        content: `<ul>
  <li><strong>Diferencial competitivo</strong> — usar o mesmo SaaS que concorrentes nivela o jogo.</li>
  <li><strong>Custo de licença escala</strong> — calcule em 3 e 5 anos; sob medida frequentemente se paga antes.</li>
  <li><strong>Integrações profundas com legados</strong> — SaaS raramente oferece a flexibilidade necessária.</li>
  <li><strong>Controle de dados não-negociável</strong> — saúde, financeiro, defesa.</li>
  <li><strong>Processo que não existe em SaaS</strong> — se ninguém construiu, você vai construir.</li>
</ul>`,
      },
      {
        id: "custos-escondidos",
        heading: "Os três custos que o SaaS esconde",
        content: `<p><strong>1. Adaptação do processo.</strong> Todo SaaS tem opinião sobre como funcionar. Divergência = custo humano ou customização cara.</p>
<p><strong>2. Lock-in.</strong> Depois de 2 anos com dados no SaaS, migrar é caro. Fornecedores sabem disso — preços refletem.</p>
<p><strong>3. Funcionalidades que não chegam.</strong> Você paga pelo roadmap do fornecedor, não pelo seu.</p>`,
      },
      {
        id: "framework-decisao",
        heading: "Framework de decisão em 5 minutos",
        content: `<ol>
  <li>Este processo é padrão (não diferencial)? → <strong>SaaS</strong></li>
  <li>Existe SaaS maduro que resolve 80%+? → <strong>SaaS</strong></li>
  <li>Dados sensíveis que não podem sair? → <strong>Sob medida</strong></li>
  <li>Custo de licença em 5 anos > custo de dev? → <strong>Sob medida</strong></li>
  <li>Processo é diferencial competitivo? → <strong>Sob medida</strong></li>
</ol>
<p>2+ pontos para sob medida: avalie dev próprio. 3+ pontos para SaaS: use o mercado.</p>`,
      },
    ],
    callouts: [
      { type: "insight", title: "A regra de ouro", body: "Use SaaS para commodity, desenvolva sob medida para diferencial. A maioria das empresas precisa dos dois." },
      { type: "tip", title: "Teste rápido", body: "Se seus concorrentes diretos usam o mesmo SaaS que você para um processo core, esse processo deixou de ser diferencial." },
    ],
    mindMap: {
      label: "SaaS vs. Sob Medida",
      children: [
        { label: "SaaS ✓ quando", children: [
          { label: "Processo padrão" },
          { label: "Velocidade crítica" },
          { label: "Volume baixo" },
        ]},
        { label: "Sob medida ✓ quando", children: [
          { label: "Diferencial competitivo" },
          { label: "Controle de dados" },
          { label: "Integrações profundas" },
        ]},
        { label: "3 custos ocultos SaaS", children: [
          { label: "Adaptação" },
          { label: "Lock-in" },
          { label: "Roadmap alheio" },
        ]},
      ],
    },
    relatedSlugs: ["como-escolher-stack-tecnologica", "como-automatizar-processos-manuais"],
  },
};

/* ═══════════════════════════════════════════════════════════
   STATIC PARAMS & METADATA
   ═══════════════════════════════════════════════════════════ */

type BlogParams = { params: { slug: string } };

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogParams): Promise<Metadata> {
  const post = posts[params.slug as keyof typeof posts];
  if (!post) return { title: "Artigo não encontrado" };
  return {
    title: `${post.title} — NuPtechs Blog`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}`, languages: { "pt-BR": `${siteUrl}/blog/${post.slug}` } },
    openGraph: {
      title: `${post.title} — NuPtechs Blog`,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [siteUrl],
      tags: post.keywords,
      siteName: "NuPtechs",
      locale: "pt_BR",
      images: [{ url: `${siteUrl}/og?title=${encodeURIComponent(post.title)}&sub=${encodeURIComponent(post.description)}&lang=pt`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

/* ═══════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function BlogPost({ params }: BlogParams) {
  const post = posts[params.slug as keyof typeof posts];
  if (!post) notFound();

  const wordCount = post.sections.reduce((sum, s) => sum + s.content.replace(/<[^>]+>/g, "").split(/\s+/).length, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${siteUrl}/blog/${post.slug}#article`,
        headline: post.title,
        description: post.description,
        url: `${siteUrl}/blog/${post.slug}`,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        wordCount,
        keywords: post.keywords.join(", "),
        articleSection: post.tag,
        inLanguage: "pt-BR",
        author: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "NuPtechs" },
        publisher: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "NuPtechs", logo: { "@type": "ImageObject", url: `${siteUrl}/logo.svg`, width: 200, height: 60 } },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.slug}` },
        isPartOf: { "@type": "Blog", "@id": `${siteUrl}/blog#blog` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
        ],
      },
    ],
  };

  const related = post.relatedSlugs
    .map((s) => posts[s])
    .filter(Boolean);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="nav-bar" aria-label="Navegação principal">
        <div className="nav-inner">
          <a href="/" className="nav-logo" aria-label="NuPtechs — início">
            <span className="nav-logo-dot" aria-hidden="true" />
            <span className="nav-logo-text">NuPtechs</span>
          </a>
          <NavLinks />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="mailto:nuptechs@nuptechs.com" className="nav-cta hidden lg:inline-flex">Falar com especialista</a>
          </div>
        </div>
      </nav>

      <main>
        <ArticleShell post={post} related={related} />
      </main>

      <footer className="site-footer" role="contentinfo">
        <div className="inner flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a href="/" className="nav-logo" aria-label="NuPtechs — voltar ao topo">
            <span className="nav-logo-dot" aria-hidden="true" />
            <span className="nav-logo-text">NuPtechs</span>
          </a>
          <p className="text-xs text-[var(--subtle)]">© {new Date().getFullYear()} NuPtechs. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
