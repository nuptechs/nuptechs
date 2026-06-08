import type { Post } from "../[slug]/page";

const post: Post = {
slug: "grafana-vs-metabase-vs-superset",
tag: "Business Intelligence",
title: "Grafana vs. Metabase vs. Superset: qual escolher para PMEs em 2026",
description: "Comparativo técnico e prático das três principais ferramentas de BI open-source para pequenas e médias empresas — com critérios objetivos e recomendação por perfil.",
keywords: ["Grafana vs Metabase", "Superset open-source BI", "melhor ferramenta BI PME", "dashboard open-source gratuito", "comparativo BI 2026", "Metabase self-hosted", "Grafana dashboards", "Apache Superset SQL Lab", "BI para pequenas empresas"],
readTime: "24 min",
publishedAt: "2026-02-28",
updatedAt: "2026-02-28",
author: { name: "Yuri Francis", role: "Fundador, NuPtechs" },
executiveSummary: "As três principais ferramentas de BI open-source atendem públicos diferentes: Metabase é ideal para equipes de negócio não-técnicas que precisam de self-service (gestores criando seus próprios dashboards), Grafana é imbatível para monitoramento de infraestrutura e métricas em tempo real (APIs, SLAs, DevOps), e Apache Superset é a escolha para equipes de dados que vivem em SQL e precisam de análises exploratórias avançadas. Este guia compara as três em 12 critérios técnicos, mostra benchmarks de performance por volume de dados, analisa custos reais de self-hosted vs. cloud, apresenta exemplos de dashboards por setor e oferece uma matriz de decisão por perfil de empresa.",
keyTakeaways: [
  "Metabase é a escolha padrão para equipes não-técnicas — interface mais intuitiva e self-service",
  "Grafana é imbatível para métricas de infraestrutura, séries temporais e alertas em tempo real",
  "Superset oferece o SQL Lab mais poderoso — ideal para analistas que escrevem SQL avançado",
  "Todos os três têm versão self-hosted gratuita; custo real é de servidor + devops para manter",
  "Critério decisivo: quem vai criar os dashboards — analista SQL, dev de infra ou gestor não-técnico?",
  "Usar Metabase (negócio) + Grafana (infra) em paralelo é padrão de mercado — não tente forçar uma para fazer tudo",
],
sections: [
  {
    id: "cenario",
    heading: "O problema que os três resolvem (e onde divergem radicalmente)",
    content: `<p>Grafana, Metabase e Apache Superset resolvem o mesmo problema fundamental: <strong>transformar dados em visualizações úteis sem escrever código de frontend</strong>. Mas foram construídos para públicos e contextos tão diferentes que escolher errado resulta em ferramenta instalada e ignorada.</p>

<p>Entender a origem de cada ferramenta revela para que ela é melhor:</p>
<ul>
  <li><strong>Grafana (2014):</strong> Nasceu para monitoramento de infraestrutura — Prometheus, Graphite, InfluxDB. Séries temporais são seu DNA. Foi expandindo para SQL, mas a alma é observabilidade.</li>
  <li><strong>Metabase (2015):</strong> Nasceu para democratizar dados — qualquer pessoa na empresa, sem saber SQL, deveria conseguir fazer perguntas aos dados. Self-service BI para equipes de negócio.</li>
  <li><strong>Apache Superset (2016):</strong> Nasceu no Airbnb como ferramenta de analistas de dados que queriam SQL Lab + visualização no mesmo lugar. Open-sourced via Apache Foundation.</li>
</ul>

<h3>O erro mais comum: forçar uma ferramenta no caso de uso errado</h3>
<table>
  <thead><tr><th>O que tentam fazer</th><th>O que acontece</th><th>A ferramenta certa</th></tr></thead>
  <tbody>
    <tr><td>Dashboard de vendas no Grafana</td><td>Funcional, mas UX confusa para gestores — variáveis, time ranges, painéis densos demais</td><td>Metabase</td></tr>
    <tr><td>Monitoramento de APIs no Metabase</td><td>Sem alertas nativos robustos, sem séries temporais otimizadas, sem integração com Prometheus</td><td>Grafana</td></tr>
    <tr><td>Exploração ad-hoc com CTEs complexas no Metabase</td><td>Question builder não suporta; SQL nativo funciona mas perde self-service</td><td>Superset</td></tr>
    <tr><td>Self-service para RH/financeiro no Superset</td><td>Interface complexa demais — usuários desistem e pedem planilha no Excel</td><td>Metabase</td></tr>
  </tbody>
</table>`,
  },
  {
    id: "tabela-comparativa",
    heading: "Comparativo completo: 12 critérios lado a lado",
    content: `<table>
  <thead><tr><th>Critério</th><th>Grafana</th><th>Metabase</th><th>Superset</th></tr></thead>
  <tbody>
    <tr><td><strong>Curva de aprendizado</strong></td><td>Média (devs)</td><td>Baixa ✓ (qualquer pessoa)</td><td>Média-Alta (analistas)</td></tr>
    <tr><td><strong>Self-service (não-técnico)</strong></td><td>Limitado</td><td>Excelente ✓</td><td>Limitado</td></tr>
    <tr><td><strong>SQL nativo</strong></td><td>Sim</td><td>Sim (básico)</td><td>SQL Lab ✓ (avançado)</td></tr>
    <tr><td><strong>Séries temporais</strong></td><td>Excelente ✓</td><td>Bom</td><td>Bom</td></tr>
    <tr><td><strong>Alertas nativos</strong></td><td>Excelente ✓ (multi-canal)</td><td>Limitado (email)</td><td>Médio (email, Slack)</td></tr>
    <tr><td><strong>Tipos de chart</strong></td><td>20+ (foco em time series)</td><td>15+ (foco em negócio)</td><td>30+ ✓ (mais variedade)</td></tr>
    <tr><td><strong>Fontes de dados</strong></td><td>50+ (infra + SQL)</td><td>20+ (SQL foco)</td><td>40+ (SQL foco)</td></tr>
    <tr><td><strong>Templating/variáveis</strong></td><td>Excelente ✓</td><td>Filtros básicos</td><td>Filtros + Jinja</td></tr>
    <tr><td><strong>Row-level security</strong></td><td>Via datasource</td><td>Sandboxing (pago)</td><td>Nativo ✓</td></tr>
    <tr><td><strong>Instalação Docker</strong></td><td>Fácil (1 container)</td><td>Muito fácil ✓ (1 container)</td><td>Complexa (4+ containers)</td></tr>
    <tr><td><strong>Cloud gerenciado</strong></td><td>Grafana Cloud</td><td>Metabase Cloud</td><td>Preset.io</td></tr>
    <tr><td><strong>Licença</strong></td><td>AGPL v3 (core)</td><td>AGPL v3 (core)</td><td>Apache 2.0 ✓</td></tr>
  </tbody>
</table>

<h3>Leitura rápida do comparativo</h3>
<ul>
  <li><strong>Mais fácil para não-técnicos:</strong> Metabase >> Superset > Grafana</li>
  <li><strong>Melhor para infraestrutura/DevOps:</strong> Grafana >> Superset > Metabase</li>
  <li><strong>Melhor para análises SQL complexas:</strong> Superset >> Metabase > Grafana</li>
  <li><strong>Mais fácil de instalar e manter:</strong> Metabase > Grafana >> Superset</li>
  <li><strong>Mais tipos de visualização:</strong> Superset > Grafana > Metabase</li>
</ul>`,
  },
  {
    id: "metabase-quando",
    heading: "Metabase: o melhor começo para 90% das PMEs",
    content: `<p>Se você precisa que gestores, vendedores e coordenadores criem e consumam dashboards <strong>sem depender de dev ou analista</strong> — o Metabase é a resposta.</p>

<h3>Features que fazem a diferença para não-técnicos</h3>
<ul>
  <li><strong>Question builder:</strong> Interface drag-and-drop para criar queries. Selecione tabela → filtros → agrupamento → visualização. Zero SQL necessário.</li>
  <li><strong>Auto-discovery:</strong> O Metabase analisa o schema do banco e sugere perguntas relevantes automaticamente. "Contagem de pedidos por mês" já aparece pronto.</li>
  <li><strong>Compartilhamento por link:</strong> Dashboards acessíveis via URL sem login — ideal para TVs de equipe, relatórios para clientes, ou links em Slack.</li>
  <li><strong>Dashboard subscriptions:</strong> Envia relatórios automáticos por e-mail (semanal, diário) com print do dashboard. Gestores recebem o número sem abrir ferramenta.</li>
  <li><strong>Embedding:</strong> Dashboards embeddable em outras aplicações (via iframe). Integre BI diretamente no seu SaaS.</li>
</ul>

<h3>Exemplos de dashboards por setor</h3>
<table>
  <thead><tr><th>Setor</th><th>Dashboard típico</th><th>Métricas</th></tr></thead>
  <tbody>
    <tr><td>Comercial</td><td>Pipeline de vendas</td><td>Funil por etapa, ticket médio, conversão, meta vs. realizado</td></tr>
    <tr><td>Financeiro</td><td>Fluxo de caixa</td><td>Receita vs. despesa, inadimplência, DRE simplificada</td></tr>
    <tr><td>RH</td><td>Headcount e turnover</td><td>Contratações, demissões, turnover por departamento</td></tr>
    <tr><td>Suporte</td><td>SLA de atendimento</td><td>Tickets abertos, tempo médio de resposta, CSAT</td></tr>
    <tr><td>Operações</td><td>Produtividade</td><td>Pedidos processados/dia, lead time, gargalos</td></tr>
  </tbody>
</table>

<h3>Instalação em 5 minutos</h3>
<p>Metabase é o mais simples de instalar entre os três:</p>
<pre><code>docker run -d -p 3000:3000 \\
  -e MB_DB_TYPE=postgres \\
  -e MB_DB_DBNAME=metabase \\
  -e MB_DB_PORT=5432 \\
  -e MB_DB_USER=metabase \\
  -e MB_DB_PASS=password \\
  -e MB_DB_HOST=postgres \\
  metabase/metabase</code></pre>
<p>Acesse <code>localhost:3000</code>, conecte ao banco de dados da empresa, e em 30 minutos o primeiro dashboard está pronto.</p>

<h3>Limitações reais do Metabase</h3>
<ul>
  <li><strong>Queries complexas:</strong> CTEs aninhadas, window functions, sub-queries — o question builder não suporta. Precisa usar SQL nativo (que funciona, mas perde self-service).</li>
  <li><strong>Alertas:</strong> Limitados a variação de valor em question. Não tem alerting engine robusta como Grafana.</li>
  <li><strong>Séries temporais:</strong> Funcional mas sem templating de time range, auto-refresh configurável ou correlação de métricas.</li>
  <li><strong>Row-level security:</strong> Disponível apenas na versão Pro (paga). Free tier não tem controle granular de acesso a dados.</li>
</ul>`,
  },
  {
    id: "grafana-quando",
    heading: "Grafana: irreplaceable para infra e métricas em tempo real",
    content: `<p>Se o objetivo é monitorar aplicações, APIs, infraestrutura cloud ou qualquer dado com <strong>dimensão temporal crítica</strong> — Grafana é a escolha sem discussão.</p>

<h3>Features que nenhum concorrente iguala</h3>
<ul>
  <li><strong>Integração nativa Prometheus/Loki/Tempo:</strong> Stack LGTM (Loki, Grafana, Tempo, Mimir) é o padrão de observabilidade open-source. Logs, métricas e traces no mesmo lugar.</li>
  <li><strong>Alertas multi-canal:</strong> PagerDuty, Slack, WhatsApp (webhook), Teams, Email, OpsGenie — com escalation policies e silencing.</li>
  <li><strong>Templating de variáveis:</strong> Um único dashboard serve para múltiplos ambientes, serviços ou clusters. Troque a variável <code>$environment</code> e o dashboard inteiro muda (staging → production).</li>
  <li><strong>Auto-refresh:</strong> Dashboards atualizam em tempo real (5s, 10s, 30s) — ideal para NOCs (Network Operations Center) e monitores de parede.</li>
  <li><strong>Annotations:</strong> Marque eventos (deploys, incidentes, mudanças) diretamente nos gráficos de séries temporais para correlação visual.</li>
</ul>

<h3>Stack de observabilidade completa com Grafana</h3>
<table>
  <thead><tr><th>Componente</th><th>Ferramenta</th><th>O que monitora</th></tr></thead>
  <tbody>
    <tr><td>Métricas</td><td>Prometheus + Grafana</td><td>CPU, memória, latência, throughput, SLAs</td></tr>
    <tr><td>Logs</td><td>Loki + Grafana</td><td>Logs de aplicação, erros, audit trail</td></tr>
    <tr><td>Traces</td><td>Tempo + Grafana</td><td>Traces distribuídos (latência por serviço)</td></tr>
    <tr><td>Alertas</td><td>Alertmanager + Grafana</td><td>Thresholds, anomalias, SLA violations</td></tr>
  </tbody>
</table>

<h3>Exemplos de dashboards de infra</h3>
<ul>
  <li><strong>SLA de API:</strong> Latência p50/p95/p99 por endpoint, taxa de erro 5xx, throughput req/s, uptime % — com alerta quando p99 > 500ms.</li>
  <li><strong>Kubernetes:</strong> CPU/memória por pod e namespace, restarts, OOM kills, disk pressure — dashboards pré-feitos da comunidade.</li>
  <li><strong>PostgreSQL:</strong> Connections ativas, query duration, cache hit ratio, replication lag, table bloat — plugin oficial pgmonitor.</li>
  <li><strong>Node.js/Java:</strong> Heap usage, GC pauses, event loop lag (Node), thread pool utilization (Java) — via Prometheus client libraries.</li>
</ul>

<h3>Grafana para dados de negócio — funciona, mas com ressalvas</h3>
<p>Grafana conecta a PostgreSQL, MySQL, BigQuery e outras fontes SQL. Fazer dashboard de vendas é <strong>possível</strong>, mas:</p>
<ul>
  <li>A interface é densa demais para gestores não-técnicos — muitos painéis, variáveis, seletores de time range</li>
  <li>Não tem question builder visual — toda query é SQL ou PromQL</li>
  <li>Não tem auto-discovery do schema — você precisa saber os nomes das tabelas e colunas</li>
  <li>Não tem email subscriptions nativas (precisa de Grafana Cloud ou plugin)</li>
</ul>
<p><strong>Veredito:</strong> Se a equipe é técnica (devs, SREs), Grafana para negócio funciona. Se os consumidores são gestores de área, use Metabase.</p>`,
  },
  {
    id: "superset-quando",
    heading: "Superset: para equipes de dados que vivem em SQL",
    content: `<p>Superset brilha quando a empresa tem analistas de dados confortáveis com SQL e precisa de <strong>explorações ad-hoc avançadas</strong> com governança.</p>

<h3>Features que definem Superset</h3>
<ul>
  <li><strong>SQL Lab:</strong> Editor SQL completo com autocomplete, syntax highlighting, execução assíncrona de queries longas, histórico de queries, e save como dataset virtual.</li>
  <li><strong>Datasets virtuais:</strong> Transforme qualquer SQL complexo em um "dataset" reutilizável. Outros analistas criam charts em cima sem re-escrever o SQL.</li>
  <li><strong>30+ tipos de chart:</strong> Incluindo mapas geográficos (deck.gl), sunbursts, treemaps, heatmaps — a maior variedade entre os três.</li>
  <li><strong>Row-level security nativo:</strong> Controle granular de quem vê quais linhas de dados. Ideal para multi-tenancy ou separação por departamento.</li>
  <li><strong>Jinja templating:</strong> Parametrize queries com variáveis, filtros dinâmicos e lógica condicional.</li>
  <li><strong>Licença Apache 2.0:</strong> A mais permissiva entre os três — sem restrições comerciais. Pode embutir, modificar e redistribuir.</li>
</ul>

<h3>Quando Superset é claramente superior</h3>
<table>
  <thead><tr><th>Caso de uso</th><th>Por que Superset</th></tr></thead>
  <tbody>
    <tr><td>Exploração ad-hoc com CTEs complexos</td><td>SQL Lab é o melhor editor SQL integrado a BI</td></tr>
    <tr><td>Multi-tenancy com isolamento de dados</td><td>Row-level security nativo e robusto</td></tr>
    <tr><td>Governança de dados (quem acessou o quê)</td><td>Audit log nativo e permissões granulares</td></tr>
    <tr><td>Visualizações geográficas (mapas)</td><td>deck.gl integrado — Metabase e Grafana não competem</td></tr>
    <tr><td>Embedding com controle de acesso</td><td>Dashboard embedding com filtros e RLS por tenant</td></tr>
  </tbody>
</table>

<h3>Limitações reais do Superset</h3>
<ul>
  <li><strong>Instalação complexa:</strong> Requer 4+ containers (Superset, Redis, Celery Worker, PostgreSQL metastore). docker-compose funciona, mas manutenção é mais trabalhosa que Metabase.</li>
  <li><strong>Curva de aprendizado:</strong> Conceitos como "database connection → dataset → chart → dashboard" exigem treinamento. Gestores não-técnicos raramente adotam sem suporte.</li>
  <li><strong>Performance em real-time:</strong> Superset é otimizado para analytics batch, não real-time. Cache de queries é essencial para dashboards com refresh automático.</li>
  <li><strong>Comunidade menor:</strong> Comparado a Grafana e Metabase, Superset tem menos plugins, templates e tutoriais da comunidade.</li>
</ul>`,
  },
  {
    id: "custos",
    heading: "Custos reais: self-hosted vs. cloud por perfil de empresa",
    content: `<h3>Self-hosted (você gerencia)</h3>
<table>
  <thead><tr><th>Perfil</th><th>Servidor</th><th>Metabase</th><th>Grafana</th><th>Superset</th></tr></thead>
  <tbody>
    <tr><td><strong>Micro</strong> (5 usuários)</td><td>VPS 2 vCPU / 4GB RAM</td><td>R$ 100-150/mês</td><td>R$ 100-150/mês</td><td>R$ 150-200/mês (mais recursos)</td></tr>
    <tr><td><strong>PME</strong> (20 usuários)</td><td>VPS 4 vCPU / 8GB RAM</td><td>R$ 200-350/mês</td><td>R$ 200-350/mês</td><td>R$ 300-500/mês</td></tr>
    <tr><td><strong>Médio porte</strong> (50+ usuários)</td><td>2 VPS com load balancer</td><td>R$ 500-800/mês</td><td>R$ 500-800/mês</td><td>R$ 800-1.200/mês</td></tr>
  </tbody>
</table>
<p><strong>Custo oculto:</strong> Horas de devops para manter (~2-4h/mês para Metabase, ~4-6h/mês para Superset). Multiplique pela hora do profissional.</p>

<h3>Cloud gerenciado (eles gerenciam)</h3>
<table>
  <thead><tr><th>Serviço</th><th>Plano inicial</th><th>Custo/mês</th><th>Inclui o quê</th></tr></thead>
  <tbody>
    <tr><td>Metabase Cloud</td><td>Starter</td><td>US$ 85 (~R$ 450)</td><td>5 usuários, SSO, backup automático</td></tr>
    <tr><td>Grafana Cloud</td><td>Free → Pro</td><td>US$ 0 → US$ 29/user</td><td>Free: 3 users + 10k métricas. Pro: unlimited + alerting</td></tr>
    <tr><td>Preset.io (Superset)</td><td>Starter</td><td>US$ 20/user</td><td>Superset gerenciado, SSO, suporte</td></tr>
  </tbody>
</table>

<h3>Quando self-hosted vs. cloud</h3>
<ul>
  <li><strong>Self-hosted:</strong> Time tem devops, quer controle total, dados sensíveis que não podem sair do datacenter, ou custo de cloud gerenciado é proibitivo.</li>
  <li><strong>Cloud gerenciado:</strong> Time não tem devops, quer focar em dashboards e não em infraestrutura, ou precisa de SLA de uptime garantido.</li>
  <li><strong>Regra prática:</strong> Se o custo de cloud gerenciado é menos de 2× o custo de self-hosted, use cloud. O tempo economizado em devops paga a diferença.</li>
</ul>`,
  },
  {
    id: "implementacao",
    heading: "Implementação prática: do zero ao primeiro dashboard em 1 dia",
    content: `<h3>Metabase: 30 minutos para o primeiro dashboard</h3>
<ol>
  <li><strong>Deploy:</strong> <code>docker run -d -p 3000:3000 metabase/metabase</code></li>
  <li><strong>Setup:</strong> Acesse localhost:3000, crie admin, conecte ao PostgreSQL da empresa</li>
  <li><strong>Explore:</strong> O Metabase analisa o schema e sugere perguntas automaticamente</li>
  <li><strong>Dashboard:</strong> Crie novo dashboard, adicione 4-6 questions (filtros, agregações, charts)</li>
  <li><strong>Compartilhe:</strong> Gere link público ou configure subscription por email</li>
</ol>

<h3>Grafana: 1 hora para dashboard de infra</h3>
<ol>
  <li><strong>Deploy:</strong> <code>docker run -d -p 3001:3000 grafana/grafana</code></li>
  <li><strong>Datasource:</strong> Adicione Prometheus (métricas) ou PostgreSQL (dados de negócio)</li>
  <li><strong>Import template:</strong> Use dashboards prontos da comunidade (ID no grafana.com/dashboards) — Node Exporter Full (ID 1860), PostgreSQL (ID 9628)</li>
  <li><strong>Alertas:</strong> Configure alerting rules para SLA (latência > 500ms, error rate > 1%)</li>
  <li><strong>Canais:</strong> Configure notification channels (Slack, email, PagerDuty)</li>
</ol>

<h3>Superset: 2-3 horas para setup completo</h3>
<ol>
  <li><strong>Deploy:</strong> Clone repo → <code>docker compose up</code> (4 containers: Superset, Redis, Celery, PostgreSQL)</li>
  <li><strong>Database:</strong> Admin → Data → Databases → Add connection string do PostgreSQL</li>
  <li><strong>Dataset:</strong> SQL Lab → escreva query → Save as Dataset</li>
  <li><strong>Chart:</strong> Dataset → Create New Chart → selecione tipo de visualização</li>
  <li><strong>Dashboard:</strong> Combine charts em dashboard → configure filtros cruzados</li>
</ol>

<h3>Checklist pós-instalação (para qualquer ferramenta)</h3>
<ul>
  <li>Configurar backup automático do banco de metadados (configurações, dashboards, users)</li>
  <li>Habilitar HTTPS (reverse proxy com nginx/caddy + Let's Encrypt)</li>
  <li>Configurar autenticação (LDAP, SSO, ou pelo menos senhas fortes com 2FA)</li>
  <li>Definir política de acesso: quem pode criar vs. quem pode apenas visualizar</li>
  <li>Documentar datasources conectados e responsáveis por cada dashboard</li>
</ul>`,
  },
  {
    id: "combinacao",
    heading: "Quando usar duas ferramentas juntas (e como integrar)",
    content: `<p>Muitas empresas usam <strong>Metabase + Grafana</strong> em paralelo — e é uma combinação excelente porque cobrem espaços completamente diferentes:</p>

<h3>Metabase (negócio) + Grafana (infra): padrão de mercado</h3>
<table>
  <thead><tr><th>Ferramenta</th><th>Quem usa</th><th>O que monitora</th><th>Frequência</th></tr></thead>
  <tbody>
    <tr><td><strong>Metabase</strong></td><td>CEO, vendas, financeiro, RH</td><td>KPIs de negócio, vendas, receita, churn</td><td>Diário/semanal</td></tr>
    <tr><td><strong>Grafana</strong></td><td>DevOps, SRE, engenharia</td><td>Uptime, latência, erros, infra cloud</td><td>Tempo real (24/7)</td></tr>
  </tbody>
</table>

<h3>Superset + Grafana: para empresas data-driven</h3>
<p>Se a empresa tem equipe de dados (analistas, engenheiros de dados) e equipe de infra:</p>
<ul>
  <li><strong>Superset:</strong> Análises exploratórias, relatórios ad-hoc, data governance com RLS</li>
  <li><strong>Grafana:</strong> Monitoramento operacional e alertas</li>
</ul>

<h3>Anti-padrão: instalar os três ao mesmo tempo</h3>
<p>Instalar Metabase + Grafana + Superset "para ter flexibilidade" resulta em:</p>
<ul>
  <li>3× o custo de infraestrutura e manutenção</li>
  <li>Dashboards duplicados em ferramentas diferentes</li>
  <li>Confusão sobre qual é a fonte de verdade</li>
  <li>Nenhuma das três é usada de verdade — equipe volta para o Excel</li>
</ul>
<p><strong>Regra:</strong> Comece com UMA (geralmente Metabase). Adicione a segunda (Grafana) quando a necessidade for clara. A terceira raramente é necessária.</p>`,
  },
  {
    id: "recomendacao",
    heading: "Matriz de decisão final: qual ferramenta para qual perfil",
    content: `<table>
  <thead><tr><th>Perfil da empresa</th><th>Recomendação</th><th>Justificativa</th></tr></thead>
  <tbody>
    <tr><td>PME sem time de dados, gestor quer dashboard de vendas/financeiro</td><td><strong>Metabase</strong></td><td>Self-service, fácil, 30 min para o primeiro dashboard</td></tr>
    <tr><td>Startup SaaS com DevOps, quer monitorar APIs e SLAs</td><td><strong>Grafana</strong></td><td>Observabilidade completa, alertas, séries temporais</td></tr>
    <tr><td>Empresa com analistas de dados, queries SQL complexas</td><td><strong>Superset</strong></td><td>SQL Lab, datasets virtuais, RLS nativo</td></tr>
    <tr><td>PME que precisa de KPIs de negócio + monitoramento de infra</td><td><strong>Metabase + Grafana</strong></td><td>Cada ferramenta faz o que é melhor — sem forçar</td></tr>
    <tr><td>Enterprise com governança de dados + observabilidade</td><td><strong>Superset + Grafana</strong></td><td>RLS + audit log + observabilidade completa</td></tr>
    <tr><td>Micro empresa (1-5 funcionários)</td><td><strong>Metabase Cloud</strong></td><td>Sem devops, sem servidor — foca no dashboard</td></tr>
  </tbody>
</table>

<h3>Se ainda está em dúvida</h3>
<p>Responda 3 perguntas:</p>
<ol>
  <li><strong>Quem vai criar os dashboards?</strong> Gestores → Metabase. DevOps → Grafana. Analistas SQL → Superset.</li>
  <li><strong>Que tipo de dado?</strong> Vendas/financeiro → Metabase. Métricas de infra → Grafana. Dados estruturados complexos → Superset.</li>
  <li><strong>Tem DevOps na equipe?</strong> Não → Metabase Cloud. Sim → self-hosted da ferramenta escolhida.</li>
</ol>`,
  },
],
callouts: [
  { type: "tip", title: "Comece com Metabase", body: "Para 90% das PMEs brasileiras, o Metabase resolve as necessidades iniciais de BI. Migrar para Superset ou complementar com Grafana é uma decisão que pode ser tomada quando os limites do Metabase ficarem claros — não antes." },
  { type: "warning", title: "Evite instalar três ferramentas", body: "Não instale Metabase + Grafana + Superset ao mesmo tempo 'para ter flexibilidade'. Uma ferramenta dominada vale mais do que três instaladas, desatualizadas e ignoradas." },
  { type: "insight", title: "Custo real de self-hosted", body: "Uma VPS de R$ 150/mês com 2 vCPUs e 4GB RAM roda Metabase ou Grafana confortavelmente para até 20 usuários. O custo real são as 2-4 horas/mês de devops para manter atualizado, com backup e SSL." },
  { type: "tip", title: "Templates da comunidade economizam semanas", body: "Grafana tem 5.000+ dashboards prontos na comunidade (grafana.com/dashboards). Antes de criar do zero, busque um template para seu caso de uso — Node Exporter Full (ID 1860) é clássico." },
],
mindMap: {
  label: "BI Open-Source",
  children: [
    { label: "Metabase", children: [
      { label: "Self-service" },
      { label: "Não-técnicos" },
      { label: "Question builder" },
      { label: "Email subscriptions" },
    ]},
    { label: "Grafana", children: [
      { label: "Séries temporais" },
      { label: "Alertas multi-canal" },
      { label: "Prometheus/Loki/Tempo" },
      { label: "Templating variáveis" },
    ]},
    { label: "Superset", children: [
      { label: "SQL Lab avançado" },
      { label: "30+ charts" },
      { label: "Row-level security" },
      { label: "Datasets virtuais" },
    ]},
    { label: "Decisão", children: [
      { label: "Quem cria?" },
      { label: "Que dados?" },
      { label: "Tem DevOps?" },
      { label: "Self-hosted vs. cloud?" },
    ]},
  ],
},
mnemonic: {
  acronym: "QUERO",
  breakdown: [
    { letter: "Q", word: "Quem cria?", hint: "Analistas (Superset), gestores (Metabase), devops (Grafana)" },
    { letter: "U", word: "Uso principal", hint: "Métricas infra vs. relatórios negócio vs. exploração SQL" },
    { letter: "E", word: "Escalabilidade", hint: "Todos open-source; custo = servidor + horas de devops" },
    { letter: "R", word: "Real-time?", hint: "Grafana lidera em séries temporais e alertas 24/7" },
    { letter: "O", word: "Onboarding", hint: "Metabase = mais intuitivo; Superset exige treinamento" },
  ],
},
relatedSlugs: ["dashboard-bi-para-pmes", "como-criar-etl-com-python-e-postgresql", "como-escolher-stack-tecnologica"],
};

export default post;
