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

  "historia-da-tecnologia": {
    slug: "historia-da-tecnologia",
    tag: "Cultura Tech",
    title: "A História da Tecnologia: do Sílex ao Silício — 3,3 milhões de anos em uma matéria",
    description: "Uma jornada épica pela história da tecnologia, das primeiras ferramentas de pedra à inteligência artificial. Entenda como cada revolução moldou o mundo que conhecemos.",
    keywords: ["história da tecnologia", "evolução tecnológica", "revolução industrial", "era da informação", "inteligência artificial", "história da computação", "inovação tecnológica"],
    readTime: "18 min",
    publishedAt: "2026-03-01",
    author: { name: "NuPtechs", role: "Engenharia & Pesquisa" },
    keyTakeaways: [
      "A tecnologia começa há 3,3 milhões de anos com ferramentas de pedra — somos inventores por natureza",
      "A escrita (c. 3500 a.C.) foi a primeira 'tecnologia de informação' — e mudou tudo",
      "A Revolução Industrial (1760) transformou energia em produtividade em massa",
      "O transistor (1947) inaugurou a Era da Informação e tornou possível o mundo digital",
      "A Lei de Moore previu corretamente 60 anos de miniaturização exponencial",
      "A IA generativa (2020s) representa a mais recente ruptura — e você está vivendo ela agora",
    ],
    sections: [
      {
        id: "intro-por-que-importa",
        heading: "Por que entender a história da tecnologia importa",
        content: `<p>Você está lendo este texto em um dispositivo que tem mais poder de processamento do que todo o programa Apollo que levou o homem à Lua. Essa frase já virou clichê — mas não deixa de ser verdade.</p>
<p>A história da tecnologia não é uma lista de datas e inventores. É a história de como a humanidade resolveu problemas, superou limites e — às vezes sem querer — criou novos problemas para resolver. Cada ferramenta inventada abriu portas para a próxima.</p>
<p>Entender essa trajetória não é nostalgia. É <strong>contexto estratégico</strong>. Quem entende como chegamos aqui consegue antecipar para onde vamos.</p>`,
      },
      {
        id: "era-da-pedra",
        heading: "Era da Pedra: 3,3 milhões de anos de inovação lenta",
        content: `<p>As primeiras ferramentas conhecidas são lascas de pedra encontradas no Quênia, datadas de <strong>3,3 milhões de anos atrás</strong> — antes mesmo do gênero Homo. Nossos ancestrais hominídeos já eram inventores.</p>
<p>O controle do fogo, há cerca de 1 milhão de anos, foi talvez a tecnologia mais transformadora da pré-história. Ele permitiu cozinhar alimentos (liberando mais nutrientes para o cérebro crescer), aquecer-se, iluminar a noite e afastar predadores.</p>
<p>No Neolítico (cerca de 10.000 a.C.), a <strong>Revolução Agrícola</strong> mudou tudo: humanos domesticaram plantas e animais, inventaram a irrigação e abandonaram o nomadismo. Pela primeira vez, era possível produzir excedente de alimento — e com ele vieram vilas, comércio, hierarquias sociais e, eventualmente, civilizações inteiras.</p>
<p>As ferramentas evoluíram de pedra para cobre (~3200 a.C.), bronze (~2500 a.C.) e ferro (~1500 a.C.), cada transição multiplicando a capacidade humana de construir, cultivar e guerrear.</p>`,
      },
      {
        id: "civilizacoes-antigas",
        heading: "Civilizações antigas: a escrita muda tudo",
        content: `<h3>Mesopotâmia: a mãe das invenções</h3>
<p>Os sumérios, por volta de 3500 a.C., inventaram a <strong>escrita cuneiforme</strong> — a primeira tecnologia de informação da história. Com ela, foi possível registrar leis, transações comerciais, poesias e conhecimento científico. Informação agora podia sobreviver à morte de quem a criou.</p>
<p>A Mesopotâmia também nos deu a <strong>roda</strong> (originalmente o torno de oleiro, ~3500 a.C.), sistemas de irrigação sofisticados, e várias das seis máquinas simples clássicas: alavanca, plano inclinado, cunha, parafuso, polia e roda com eixo.</p>

<h3>Egito: engenharia monumental</h3>
<p>Os egípcios construíram as pirâmides usando técnicas que ainda intrigam engenheiros modernos. Inventaram o papiro, relógios solares, e praticaram a medicina mais avançada da antiguidade — incluindo os primeiros registros de neurocirurgia.</p>

<h3>China: inovação contínua por milênios</h3>
<p>Pólvora, bússola, papel e impressão com tipos móveis — as "Quatro Grandes Invenções" chinesas moldaram o mundo. O papel (inventado por volta de 105 d.C.) democratizou o conhecimento. A bússola transformou a navegação. A pólvora redefiniu a guerra. E a impressão antecipou Gutenberg em séculos.</p>

<h3>Grécia e Roma: ciência e infraestrutura</h3>
<p>Os gregos inauguraram o pensamento científico sistemático. Arquimedes descobriu princípios de hidrostática, Herão de Alexandria criou a primeira máquina a vapor (eolípila) e o Mecanismo de Antikythera é considerado o primeiro computador analógico — um dispositivo de engrenagens que previa eclipses e posições planetárias.</p>
<p>Roma contribuiu com concreto durável (algumas estruturas têm 2000 anos), aquedutos, estradas pavimentadas e o codex — o formato de livro com páginas que usamos até hoje.</p>`,
      },
      {
        id: "era-medieval",
        heading: "Era medieval e islâmica: a ponte esquecida",
        content: `<p>Ao contrário do mito da "Idade das Trevas", o período medieval foi rico em inovação tecnológica — especialmente no mundo islâmico.</p>
<p>Durante a <strong>Era de Ouro Islâmica</strong> (séculos VIII–XVI), estudiosos árabes preservaram e expandiram o conhecimento grego, persa e indiano. Al-Jazari inventou o virabrequim (1206), mecanismos programáveis e autômatos sofisticados. O sistema numérico que usamos hoje (algarismos arábicos, incluindo o zero) foi transmitido ao Ocidente por matemáticos islâmicos.</p>
<p>Na Europa medieval, moinhos de água e vento substituíram músculo humano pela primeira vez em escala. O Domesday Book (1086) registra 5.624 moinhos de água só na Inglaterra — um para cada 30 famílias. Relógios mecânicos, óculos e a bússola magnética européia também surgiram nesse período.</p>
<p>O <strong>Renascimento</strong> (séculos XIV–XVII) uniu arte e engenharia. Leonardo da Vinci projetou máquinas voadoras, pontes e mecanismos hidráulicos. A Revolução Científica de Copérnico, Galileu e Newton criou o método que até hoje usamos para entender o mundo.</p>`,
      },
      {
        id: "gutenberg-imprensa",
        heading: "Gutenberg e a imprensa (1450): a primeira viralização",
        content: `<p>Em 1450, Johannes Gutenberg aperfeiçoou a <strong>prensa de tipos móveis</strong> na Europa. O impacto foi equivalente ao da internet: informação que antes levava meses para ser copiada à mão agora podia ser reproduzida em horas.</p>
<p>Em 50 anos, mais de 20 milhões de volumes foram impressos. A Bíblia, antes acessível apenas ao clero, chegou às mãos de pessoas comuns. A Reforma Protestante, a Revolução Científica e o Iluminismo seriam impensáveis sem a imprensa.</p>
<p>A lição para tecnólogos: <strong>a verdadeira revolução não é a ferramenta — é a democratização do acesso à informação que ela possibilita.</strong></p>`,
      },
      {
        id: "primeira-revolucao-industrial",
        heading: "Primeira Revolução Industrial (1760–1840): vapor e fábricas",
        content: `<p>A Revolução Industrial começou na Inglaterra e transformou a civilização mais profundamente do que qualquer evento desde a agricultura. No centro de tudo: a <strong>máquina a vapor</strong>.</p>
<p>Thomas Newcomen construiu a primeira máquina a vapor prática em 1712. James Watt a aperfeiçoou dramaticamente nas décadas de 1760–80, tornando-a eficiente o bastante para mover fábricas inteiras.</p>
<p>Consequências em cascata:</p>
<ul>
  <li>Fábricas substituíram oficinas artesanais → produção em massa</li>
  <li>Ferrovias conectaram cidades → mercados nacionais</li>
  <li>Urbanização explodiu → Londres passou de 1M para 6M de habitantes em um século</li>
  <li>Trabalho infantil, poluição e desigualdade → novos problemas sociais</li>
</ul>
<p>O padrão que veremos se repetir: toda revolução tecnológica traz <strong>ganhos enormes E custos sociais que levam décadas para serem endereçados</strong>.</p>`,
      },
      {
        id: "segunda-revolucao-industrial",
        heading: "Segunda Revolução Industrial (1860–1914): eletricidade, petróleo e telecomunicações",
        content: `<p>Se a primeira revolução foi sobre vapor, a segunda foi sobre <strong>eletricidade</strong> — eleita pela National Academy of Engineering dos EUA como o desenvolvimento tecnológico mais importante do século XX.</p>
<p>Os marcos dessa era:</p>
<ul>
  <li><strong>Telegrafo (1837–1860s):</strong> A primeira comunicação instantânea a longa distância. "A internet do século XIX."</li>
  <li><strong>Telefone (1876):</strong> Alexander Graham Bell patenteou o dispositivo que conectaria vozes humanas através de continentes.</li>
  <li><strong>Lâmpada incandescente (1879):</strong> Edison não inventou a lâmpada — ele a tornou prática e construiu a primeira rede elétrica comercial (1882).</li>
  <li><strong>Automóvel (1886):</strong> Karl Benz patenteou o primeiro automóvel, mas foi Henry Ford com a linha de montagem (1913) que o tornou acessível.</li>
  <li><strong>Rádio (1890s–1900s):</strong> Marconi, Tesla e outros transformaram ondas eletromagnéticas em comunicação de massa.</li>
</ul>
<p>A eletrificação possibilitou algo que mudam o jogo: fábricas podiam operar à noite. Turnos de 2º e 3º período multiplicaram a produtividade industrial.</p>`,
      },
      {
        id: "guerras-computadores",
        heading: "Guerras mundiais: a necessidade como mãe da invenção",
        content: `<p>As duas Guerras Mundiais foram tragédias humanas inimagináveis — mas também aceleradores tecnológicos brutais.</p>
<p><strong>Primeira Guerra (1914–18):</strong> Tanques, aviação militar, rádio tático, gases químicos. A guerra de trincheiras mostrou que a tecnologia podia matar em escala industrial.</p>
<p><strong>Segunda Guerra (1939–45):</strong> O salto tecnológico foi sem precedentes:</p>
<ul>
  <li><strong>Radar:</strong> Permitiu à Inglaterra sobreviver à Batalha da Grã-Bretanha</li>
  <li><strong>Penicilina:</strong> Produção em massa salvou milhões de soldados feridos</li>
  <li><strong>Foguetes V-2:</strong> A base da exploração espacial futura (e dos mísseis balísticos)</li>
  <li><strong>Bomba atômica (1945):</strong> A tecnologia mais destrutiva já criada pela humanidade</li>
  <li><strong>Colossus e ENIAC:</strong> Os primeiros computadores eletrônicos, criados para quebrar códigos nazistas e calcular balística</li>
</ul>
<p>Alan Turing, quebrando o código Enigma com a máquina Bombe, demonstrou que <strong>computação era poder</strong>. Konrad Zuse, na Alemanha, já havia completado em 1941 o Z3 — o primeiro computador digital programável e automático do mundo.</p>`,
      },
      {
        id: "transistor-era-informacao",
        heading: "O transistor (1947): o nascimento da Era da Informação",
        content: `<p>Em 23 de dezembro de 1947, nos Bell Labs, John Bardeen e Walter Brattain demonstraram o primeiro <strong>transistor</strong> funcional — um dispositivo de germânio que podia amplificar sinais elétricos. William Shockley liderava a equipe. Os três ganhariam o Nobel de Física em 1956.</p>
<p>O transistor substituiu as válvulas termiônicas (vacuum tubes) — que eram grandes, quentes, caras e queimavam constantemente. Agora era possível construir circuitos eletrônicos menores, mais baratos e mais confiáveis.</p>
<p>A cascata que se seguiu:</p>
<ul>
  <li><strong>1958:</strong> Jack Kilby (Texas Instruments) cria o primeiro circuito integrado</li>
  <li><strong>1959:</strong> Robert Noyce (Fairchild) inventa o CI monolítico de silício — o ancestral direto de todo chip moderno</li>
  <li><strong>1965:</strong> Gordon Moore observa que o número de transistores por chip dobra a cada ~2 anos — a famosa Lei de Moore</li>
  <li><strong>1971:</strong> Intel 4004 — o primeiro microprocessador comercial, com 2.300 transistores</li>
</ul>
<p>Hoje, um chip Apple M4 tem <strong>28 bilhões de transistores</strong>. A Lei de Moore previu corretamente 60 anos de progresso exponencial.</p>`,
      },
      {
        id: "computadores-pessoais",
        heading: "A revolução dos computadores pessoais (1970s–1990s)",
        content: `<p>Nos anos 1970, computadores eram máquinas do tamanho de salas, operadas por especialistas em jaleco. A ideia de que cada pessoa teria um era absurda.</p>
<p>Em 1977, três máquinas mudaram isso: o <strong>Apple II</strong>, o <strong>Commodore PET</strong> e o <strong>TRS-80</strong> — a "Trindade de 1977" (como a revista Byte os batizou). Steve Wozniak e Steve Jobs construíram os primeiros Apples numa garagem.</p>
<p>O IBM PC chegou em 1981 e legitimou o computador pessoal para o mundo corporativo. A Microsoft, com o MS-DOS e depois o Windows, tornou-se a empresa de software dominante do planeta.</p>
<p>Marcos da era PC:</p>
<ul>
  <li><strong>1984:</strong> Apple Macintosh — primeira interface gráfica comercialmente popular</li>
  <li><strong>1985:</strong> Windows 1.0 — Microsoft entra na interface gráfica</li>
  <li><strong>1989:</strong> 15% dos lares americanos tinham PC; em 2000, eram 65%</li>
  <li><strong>1993:</strong> O Commodore 64, com 17 milhões de unidades vendidas, continua sendo um dos computadores mais vendidos da história</li>
</ul>
<p>A Lei de Moore continuava entregando: computadores ficavam duas vezes mais potentes a cada dois anos, pelo mesmo preço. Um PC de US$3.000 em 1997 custaria US$1.000 em 2000.</p>`,
      },
      {
        id: "internet-web",
        heading: "Internet e World Wide Web: a rede que conectou tudo",
        content: `<p>A Internet nasceu como <strong>ARPANET</strong> em 1969, quando a primeira mensagem foi enviada entre dois computadores na UCLA e no Stanford Research Institute. A mensagem era "LOGIN" — mas o sistema travou depois de "LO".</p>
<p>Durante os anos 1970–80, a rede cresceu lentamente em universidades e centros de pesquisa. O protocolo TCP/IP foi padronizado em 1983, criando a linguagem universal que permitiria a todas as redes se conectarem.</p>
<p>A virada veio em <strong>1989</strong>, quando <strong>Tim Berners-Lee</strong>, um físico britânico no CERN, inventou a <strong>World Wide Web</strong> — o sistema de hipertexto com HTML, URLs e HTTP que tornaria a Internet acessível a qualquer pessoa.</p>
<p>A web se tornou pública em 1991. Em 1993, o navegador <strong>Mosaic</strong> (o primeiro a exibir imagens inline) a tornou visual. Em 1996, a Internet já fazia parte da cultura de massa. Em 1999, metade dos americanos usava a rede regularmente.</p>
<p>A bolha das <strong>dotcoms</strong> (1997–2000) mostrou o perigo da euforia sem fundamento — mas também financiou a infraestrutura de fibra óptica que tornaria possível o streaming, o cloud e a IoT que usamos hoje.</p>`,
      },
      {
        id: "smartphones-redes-sociais",
        heading: "Smartphones e redes sociais: o mundo no bolso",
        content: `<p>Em 2007, Steve Jobs apresentou o <strong>iPhone</strong> com as palavras: "Um iPod, um telefone e um comunicador de Internet — não são três aparelhos, é um só". O mundo nunca mais seria o mesmo.</p>
<p>O smartphone combinou computação, câmera, GPS, acelerômetro e conexão permanente à Internet em um dispositivo que cabe no bolso. Em 2013, a maioria dos americanos já possuía um. Hoje, mais de 6 bilhões de pessoas no mundo têm um smartphone.</p>
<p>Paralelamente, as redes sociais redefiniram a comunicação humana:</p>
<ul>
  <li><strong>2004:</strong> Facebook — de dormitório em Harvard a 3 bilhões de usuários</li>
  <li><strong>2006:</strong> Twitter — microblogging em 140 caracteres</li>
  <li><strong>2007:</strong> iPhone + App Store (2008) — o ecossistema de apps nasce</li>
  <li><strong>2010:</strong> Instagram — a era visual</li>
  <li><strong>2016:</strong> TikTok — vídeo curto algorítmico domina a atenção</li>
</ul>
<p>A <strong>cloud computing</strong> (computação em nuvem), popularizada a partir de 2006 com a AWS da Amazon, tornou possível que startups de 3 pessoas competissem com corporações de 30.000 — sem investir em servidores próprios.</p>
<p>Em 2007, menos de 1% da informação do mundo era digital. Em 2014, mais de 99% era.</p>`,
      },
      {
        id: "inteligencia-artificial",
        heading: "Inteligência Artificial: a revolução que está acontecendo agora",
        content: `<p>O conceito de IA existe desde 1956, quando John McCarthy cunhou o termo na Conferência de Dartmouth. Mas por décadas, a IA viveu ciclos de hype e "invernos" de desilusão.</p>
<p>O que mudou? <strong>Três convergências:</strong></p>
<ol>
  <li><strong>Dados:</strong> A Internet, smartphones e sensores geraram oceanos de dados para treinar modelos</li>
  <li><strong>Computação:</strong> GPUs (originalmente para games) mostraram-se perfeitas para redes neurais</li>
  <li><strong>Algoritmos:</strong> Deep learning, transformers e attention mechanisms desbloquearam capacidades que pareciam ficção</li>
</ol>
<p>Timeline da IA moderna:</p>
<ul>
  <li><strong>2012:</strong> AlexNet vence o ImageNet — deep learning prova seu valor</li>
  <li><strong>2016:</strong> AlphaGo derrota o campeão mundial de Go — um feito que especialistas previam para 2030</li>
  <li><strong>2017:</strong> Paper "Attention Is All You Need" — nasce a arquitetura Transformer</li>
  <li><strong>2020:</strong> GPT-3 mostra que modelos de linguagem podem gerar texto quase humano</li>
  <li><strong>2022:</strong> ChatGPT atinge 100 milhões de usuários em 2 meses — o produto de crescimento mais rápido da história</li>
  <li><strong>2023–2026:</strong> IA generativa se integra a código, design, pesquisa, atendimento e operações empresariais</li>
</ul>
<p>Estamos vivendo uma inflexão comparável à eletricidade ou à Internet. A diferença é que esta está acontecendo mais rápido do que todas as anteriores.</p>`,
      },
      {
        id: "padroes-revolucoes",
        heading: "Os 5 padrões que se repetem em toda revolução tecnológica",
        content: `<p>Olhando para 3,3 milhões de anos de inovação, alguns padrões são inescapáveis:</p>
<ol>
  <li><strong>Democratização:</strong> Toda tecnologia começa cara e exclusiva, e termina barata e universal. Computadores, telefones, acesso à Internet — todos seguiram essa curva.</li>
  <li><strong>Aceleração:</strong> Cada revolução é mais rápida que a anterior. A agricultura levou milênios para se espalhar. A eletricidade, décadas. A Internet, anos. O ChatGPT, meses.</li>
  <li><strong>Destruição criativa:</strong> Toda nova tecnologia mata indústrias existentes — e cria outras maiores. Imprensa matou copistas. Automóveis mataram cocheiros. IA está redefinindo profissões agora.</li>
  <li><strong>Efeitos colaterais tardios:</strong> Os custos sociais de uma tecnologia aparecem depois dos benefícios. Trabalho infantil na Revolução Industrial, poluição na era do petróleo, desinformação na era das redes sociais.</li>
  <li><strong>Informação como meta-tecnologia:</strong> As maiores rupturas sempre envolvem como compartilhamos informação — escrita, imprensa, telégrafo, Internet, IA. Quem controla o fluxo de informação, molda a civilização.</li>
</ol>`,
      },
      {
        id: "proximo-capitulo",
        heading: "O próximo capítulo: o que vem depois",
        content: `<p>A história da tecnologia não é linear — é exponencial. E estamos nos estágios iniciais de pelo menos quatro transformações simultâneas:</p>
<ul>
  <li><strong>IA Geral (AGI):</strong> Sistemas que podem aprender qualquer tarefa intelectual humana. A questão não é se, mas quando.</li>
  <li><strong>Computação quântica:</strong> Resolver problemas que computadores clássicos levariam bilhões de anos — como simulação molecular para novos medicamentos.</li>
  <li><strong>Biotecnologia e CRISPR:</strong> Edição genética precisa que pode curar doenças hereditárias e, potencialmente, reescrever a biologia humana.</li>
  <li><strong>Energia limpa:</strong> Solar, eólica e fusão nuclear podem resolver a crise climática — se escalarmos rápido o suficiente.</li>
</ul>
<p>O que a história ensina é claro: tecnologia é uma ferramenta. Uma faca pode preparar comida ou causar dano. A questão nunca foi "devemos inventar?" — mas <strong>"para quem e para quê inventamos?"</strong></p>
<p>A próxima revolução não será definida apenas pela tecnologia, mas pelas escolhas humanas sobre como usá-la.</p>`,
      },
    ],
    callouts: [
      { type: "insight", title: "Dado impressionante", body: "Um chip Apple M4 de 2024 tem 28 bilhões de transistores. O primeiro microprocessador (Intel 4004, 1971) tinha 2.300. Isso é um aumento de 12 milhões de vezes em 53 anos." },
      { type: "example", title: "Comparação histórica", body: "A imprensa de Gutenberg (1450) levou 50 anos para imprimir 20 milhões de volumes. O ChatGPT atingiu 100 milhões de usuários em 2 meses. Cada revolução é exponencialmente mais rápida." },
      { type: "tip", title: "Para líderes de tecnologia", body: "O padrão é claro: toda tecnologia começa cara, exclusiva e imperfeita. Quem adota cedo, mesmo com imperfeições, constrói vantagem estrutural. Quem espera 'ficar maduro' paga mais caro depois." },
      { type: "warning", title: "Lição recorrente", body: "Toda revolução tecnológica trouxe benefícios enormes E custos sociais que levaram décadas para serem endereçados. A IA não será diferente. A responsabilidade de quem constrói é antecipar esses custos." },
    ],
    mindMap: {
      label: "História da Tecnologia",
      children: [
        { label: "Pré-História → Antiguidade", children: [
          { label: "Ferramentas de pedra" },
          { label: "Fogo & Agricultura" },
          { label: "Escrita (3500 a.C.)" },
          { label: "Roda, Bronze, Ferro" },
        ]},
        { label: "Medieval → Renascimento", children: [
          { label: "Era de Ouro Islâmica" },
          { label: "Moinhos de água/vento" },
          { label: "Imprensa (1450)" },
          { label: "Revolução Científica" },
        ]},
        { label: "Revoluções Industriais", children: [
          { label: "1ª: Vapor (1760)" },
          { label: "2ª: Eletricidade (1860)" },
          { label: "Guerras & Computadores" },
        ]},
        { label: "Era Digital", children: [
          { label: "Transistor (1947)" },
          { label: "PC (1977)" },
          { label: "Internet/Web (1989)" },
          { label: "Smartphone (2007)" },
          { label: "IA Generativa (2020s)" },
        ]},
        { label: "5 Padrões", children: [
          { label: "Democratização" },
          { label: "Aceleração" },
          { label: "Destruição criativa" },
          { label: "Efeitos colaterais tardios" },
          { label: "Informação como meta-tech" },
        ]},
      ],
    },
    mnemonic: {
      acronym: "DAIDE",
      breakdown: [
        { letter: "D", word: "Democratização", hint: "Toda tech começa cara e termina universal" },
        { letter: "A", word: "Aceleração", hint: "Cada revolução é mais rápida que a anterior" },
        { letter: "I", word: "Informação", hint: "A meta-tecnologia que molda civilizações" },
        { letter: "D", word: "Destruição criativa", hint: "O novo substitui o antigo — sempre" },
        { letter: "E", word: "Efeitos colaterais", hint: "Custos sociais aparecem depois dos benefícios" },
      ],
    },
    relatedSlugs: ["llms-no-mundo-corporativo", "como-automatizar-processos-manuais"],
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
