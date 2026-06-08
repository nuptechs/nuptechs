import type { Post } from "../[slug]/page";

const post: Post = {
slug: "como-escolher-stack-tecnologica",
tag: "Desenvolvimento Ágil",
title: "Como escolher a stack tecnológica certa para o seu projeto de software",
description: "Os critérios que engenheiros seniores usam para definir linguagem, banco de dados e infraestrutura — sem dívida técnica.",
keywords: ["como escolher stack tecnológica", "linguagem de programação para projeto", "arquitetura de software empresarial", "stack tecnológica 2026", "Java vs Node vs Python", "PostgreSQL vs MongoDB"],
readTime: "28 min",
publishedAt: "2026-02-18",
updatedAt: "2026-02-18",
author: { name: "Yuri Francis", role: "Fundador, NuPtechs" },
executiveSummary: "A stack tecnológica define o custo de manutenção, a velocidade de entrega e a escalabilidade do sistema pelos próximos 5 a 10 anos. Este guia apresenta os 5 critérios que engenheiros seniores usam para decidir, uma matriz de decisão por tipo de projeto, comparativos reais de linguagens e bancos de dados, os 7 erros fatais de decisão, stacks recomendadas por cenário, e um framework para avaliar quando é hora de migrar.",
keyTakeaways: [
  "Avalie por: fit com o problema, maturidade do ecossistema, pool de profissionais, custo em escala e velocidade de iteração",
  "Para sistemas com vida útil de 5+ anos: prefira tecnologias com 5+ anos de histórico estável",
  "Banco de dados é a escolha mais difícil de reverter — dedique mais tempo nessa decisão",
  "PostgreSQL resolve 80% dos casos. Use múltiplos bancos quando há necessidade real",
  "Inove na lógica de negócio, não na infraestrutura — use o comprovado para a base",
  "Nunca escolha stack por hype, familiaridade pessoal ou 'a empresa X usa'",
],
sections: [
  {
    id: "por-que-importa",
    heading: "Por que a escolha de stack é a decisão técnica mais importante (e mais difícil de reverter)",
    content: `<p>Stack tecnológica é o conjunto de linguagens, frameworks, bancos de dados e infraestrutura que compõem um sistema. É a fundação — e como qualquer fundação, erros aqui custam 10× mais para corrigir do que erros nas camadas superiores.</p>

<p>Uma stack bem escolhida é invisível: o sistema funciona, escala, e novos desenvolvedores contribuem em semanas. Uma stack mal escolhida gera sintomas que parecem isolados mas compartilham a mesma causa raiz:</p>

<ul>
  <li><strong>Lentidão crescente:</strong> Features que deveriam levar 2 dias levam 2 semanas porque o framework não foi feito para esse tipo de operação.</li>
  <li><strong>Dívida técnica acelerada:</strong> Workarounds se acumulam porque a linguagem não suporta bem o padrão que o negócio exige.</li>
  <li><strong>Dificuldade de contratação:</strong> A vaga fica aberta 4 meses porque a stack é nicho demais para o mercado local.</li>
  <li><strong>Custos de infraestrutura explosivos:</strong> O que funcionava para 100 usuários engasga com 10.000 e precisa de 10× mais servidor para compensar ineficiência arquitetural.</li>
  <li><strong>Reescrita inevitável:</strong> Depois de 2-3 anos de acumular problemas, a equipe conclui que é mais barato reescrever do zero — e o investimento original vira custo afundado.</li>
</ul>

<p>O custo de uma reescrita forçada é tipicamente <strong>3 a 10× o custo do desenvolvimento original</strong>, porque inclui: reconstruir todas as features, migrar dados, retreinar equipe, e manter o sistema antigo funcionando em paralelo durante a transição.</p>

<p>A boa notícia: a decisão não precisa ser perfeita — precisa ser <strong>consciente</strong>. Este artigo apresenta os critérios que engenheiros com 10+ anos de experiência usam para decidir, e os erros que eles aprenderam a evitar (geralmente da maneira mais cara possível).</p>`,
  },
  {
    id: "cinco-criterios",
    heading: "Os 5 critérios de avaliação que engenheiros seniores usam",
    content: `<p>Esqueça "qual é a melhor linguagem" — não existe resposta universal. A pergunta certa é: <strong>"qual stack otimiza os 5 critérios para o MEU projeto?"</strong></p>

<h3>1. Fit com o perfil de carga do problema</h3>
<p>Cada linguagem e runtime têm pontos fortes e fracos inerentes ao design:</p>
<ul>
  <li><strong>Python:</strong> Ecossistema imbatível para IA/ML/data science. Performance ruim para APIs de alta concorrência. Ideal para: backends com lógica pesada de dados, scripts, automação, pipelines de ML.</li>
  <li><strong>Node.js (JavaScript/TypeScript):</strong> Excelente para I/O assíncrono (APIs que fazem muitas chamadas externas). Ruim para CPU-bound (processamento pesado). Ideal para: APIs REST, real-time (WebSockets), BFF (Backend For Frontend), automações com muitas integrações.</li>
  <li><strong>Java/Kotlin (Spring Boot):</strong> Alto throughput, tipagem forte, ecossistema enterprise maduro. Verboso, startup lento. Ideal para: sistemas empresariais complexos, fintech, healthtech, processamento batch.</li>
  <li><strong>Go:</strong> Performance próxima de C, binários pequenos, concorrência nativa. Ecossistema menor. Ideal para: microserviços de alta performance, ferramentas CLI, sistemas distribuídos.</li>
  <li><strong>Rust:</strong> Performance máxima, segurança de memória garantida. Curva de aprendizado íngreme. Ideal para: sistemas embarcados, browsers, databases, quando cada microsegundo importa.</li>
</ul>
<p><strong>A regra:</strong> Comece pela natureza do problema (I/O-bound? CPU-bound? Dados pesados? Real-time?) e elimine as opções que não se encaixam, antes de considerar qualquer outro critério.</p>

<h3>2. Maturidade do ecossistema</h3>
<p>Um ecossistema maduro significa: bibliotecas testadas em produção, documentação abrangente, Stack Overflow com respostas para 95% dos problemas, atualizações de segurança frequentes, e padrões consolidados.</p>
<p>Para sistemas que precisam funcionar por 5+ anos, prefira tecnologias com 5+ anos de histórico estável. Não significa evitar o novo — significa que o core da aplicação deve rodar em tech comprovada. Use tecnologias emergentes em módulos isolados que podem ser substituídos.</p>
<p><strong>Maturidade por linguagem (abril 2026):</strong></p>
<ul>
  <li><strong>Java:</strong> 29 anos de produção enterprise. Spring Boot com 12+ anos. Ultra-maduro.</li>
  <li><strong>JavaScript/Node.js:</strong> 15+ anos como runtime server. Express/Fastify bem estabelecidos. Maduro.</li>
  <li><strong>Python:</strong> 33 anos. Django/Flask com 15+ anos. Ultra-maduro.</li>
  <li><strong>Go:</strong> 14 anos. Ecossistema menor mas estável. Maduro para seu nicho.</li>
  <li><strong>Rust:</strong> 11 anos de release estável. Ecossistema crescendo rapidamente mas ainda jovem para enterprise. Em amadurecimento.</li>
</ul>

<h3>3. Disponibilidade de profissionais no seu mercado</h3>
<p>A stack mais elegante não adianta se contratar leva 6 meses ou custa o dobro. Avalie o pool de profissionais no contexto específico do seu projeto:</p>
<ul>
  <li><strong>Remoto Brasil:</strong> JavaScript/TypeScript e Python têm a maior oferta. Java é abundante para seniores. Go e Rust têm oferta crescente mas competitiva (salários 20-30% maiores).</li>
  <li><strong>Presencial em capitais menores:</strong> Java e JavaScript dominam. Python cresce. Go e Rust são escassos fora de SP/RJ/BH.</li>
  <li><strong>Custo médio por linguagem (PJ, sênior, remoto, abril 2026):</strong> JavaScript/Python: R$ 14.000-20.000/mês. Java/Kotlin: R$ 16.000-25.000/mês. Go: R$ 20.000-30.000/mês. Rust: R$ 25.000-35.000/mês.</li>
</ul>

<h3>4. Custo de operação em escala</h3>
<p>O custo de infraestrutura varia significativamente por linguagem/runtime, porque performance diferente = quantidade diferente de servidor para a mesma carga:</p>
<ul>
  <li><strong>Uma API em Go</strong> servindo 10.000 req/s pode rodar em 1 servidor de R$ 200/mês.</li>
  <li><strong>A mesma API em Node.js</strong> precisaria de 2-3 servidores (R$ 400-600/mês).</li>
  <li><strong>Em Python (Django):</strong> 4-6 servidores (R$ 800-1.200/mês).</li>
</ul>
<p>Para startups com 100 usuários, a diferença é irrelevante. Para plataformas com 100.000 usuários, pode significar R$ 10.000 vs. R$ 50.000/mês em infra — e aí a escolha de linguagem vira decisão financeira.</p>

<h3>5. Velocidade de iteração inicial</h3>
<p>Para MVPs e validação de mercado, produtividade do desenvolvedor vale mais que performance do código. Nesse contexto:</p>
<ul>
  <li><strong>Mais produtivos:</strong> Python (Django), Ruby (Rails), JavaScript (Next.js full-stack)</li>
  <li><strong>Produtividade média:</strong> Java (Spring Boot), TypeScript (NestJS)</li>
  <li><strong>Menor produtividade inicial (maior setup):</strong> Go, Rust</li>
</ul>
<p>A velocidade de iteração importa no início e diminui de importância conforme o sistema amadurece e manutenção + performance passam a dominar.</p>`,
  },
  {
    id: "banco-de-dados",
    heading: "Banco de dados: a escolha mais difícil de reverter",
    content: `<p>Mudar de linguagem ou framework é doloroso mas factível em meses. Mudar de banco de dados é uma migração que pode levar anos e custar centenas de milhares de reais. Por isso, dedique o dobro do tempo nesta decisão.</p>

<h3>PostgreSQL: o canivete suíço (80% dos casos)</h3>
<p>Se você não tem certeza de qual banco escolher, a resposta é PostgreSQL. Ele resolve bem: dados relacionais com integridade referencial, JSON semi-estruturado (JSONB com performance excelente), busca full-text, dados geoespaciais (PostGIS), busca vetorial para IA (pgvector), time-series com extensão TimescaleDB.</p>
<p>É o banco mais versátil que existe, com 35+ anos de desenvolvimento, suportado por absolutamente toda ferramenta, e com comunidade que rivaliza com Linux em maturidade.</p>
<p><strong>Quando NÃO usar PostgreSQL:</strong> Volume extremo de escrita distribuída (>100.000 escritas/segundo), cenários de eventual consistency distribuída globalmente, ou dados intrinsecamente não-relacionais com schema extremamente variável.</p>

<h3>MongoDB: flexibilidade de schema (15% dos casos)</h3>
<p>Ideal quando: o schema muda frequentemente (produtos com atributos diferentes por categoria), os dados são naturalmente documentais (logs, eventos, catálogos), ou a prototipação rápida é prioridade.</p>
<p><strong>Cuidado:</strong> MongoDB é frequentemente escolhido por conveniência ("não preciso definir schema") quando PostgreSQL com JSONB resolveria melhor e com mais segurança. A falta de schema é ótima para velocidade inicial e problemática para manutenção de longo prazo.</p>

<h3>Redis: cache e dados temporários (complementar)</h3>
<p>Não é banco primário — é complemento. Use para: cache de sessões, cache de queries pesadas, filas de mensagens simples, rate limiting, e dados com TTL (expire automático).</p>
<p>Redis como único banco? Possível para projetos minimalistas, mas temerário para qualquer coisa com dados que não podem ser perdidos.</p>

<h3>Elasticsearch / OpenSearch: busca avançada (complementar)</h3>
<p>Quando a busca textual do PostgreSQL (ts_vector) não é suficiente: autocomplete avançado, busca facetada, análise de logs em volume, busca em documentos não-estruturados.</p>

<h3>A estratégia de múltiplos bancos</h3>
<p>Na prática, sistemas maduros frequentemente usam 2-3 bancos, cada um para o que faz melhor:</p>
<ul>
  <li><strong>Padrão típico:</strong> PostgreSQL (dados transacionais) + Redis (cache) + Elasticsearch (busca)</li>
  <li><strong>Para IA:</strong> PostgreSQL (dados de negócio) + pgvector ou Pinecone (embeddings) + Redis (cache de completions)</li>
  <li><strong>Para analytics:</strong> PostgreSQL (operacional) + ClickHouse ou BigQuery (analytics/data warehouse)</li>
</ul>
<p><strong>Mas comece com um.</strong> A complexidade de múltiplos bancos (sincronização, consistência, operações) só se justifica quando o volume ou o caso de uso exige. Para a maioria dos projetos no primeiro ano, PostgreSQL sozinho resolve.</p>`,
  },
  {
    id: "frontend",
    heading: "Frontend: React, Vue, Angular ou Next.js?",
    content: `<p>O frontend é a decisão menos crítica da stack — porque é a mais fácil de substituir. O frontend não toca em dados diretamente, e trocar de framework (embora trabalhoso) não exige migração de banco nem mudança de APIs.</p>

<h3>React (Next.js): o padrão de mercado</h3>
<p>60%+ do mercado. Maior ecossistema de componentes, bibliotecas e profissionais. Se não tem motivo forte para escolher outro, React é a opção segura. Next.js adiciona SSR, SSG e API routes.</p>
<p><strong>Melhor para:</strong> SPAs complexas, plataformas com time grande, quando contratar devs React é prioridade.</p>

<h3>Vue.js (Nuxt): produtividade com curva de aprendizado suave</h3>
<p>Mais intuitivo que React, especialmente para devs que vêm de jQuery/HTML. Ecossistema menor mas suficiente. Nuxt é o equivalente do Next.js.</p>
<p><strong>Melhor para:</strong> Times menores, projetos onde velocidade de entrega importa mais que ecossistema gigante, devs com background em templates HTML.</p>

<h3>Angular: enterprise com tudo incluso</h3>
<p>Framework completo (routing, forms, HTTP, testes tudo built-in). Mais opinativo e verboso. Ainda forte em enterprise mas perdendo espaço para React.</p>
<p><strong>Melhor para:</strong> Aplicações enterprise grandes (ERP, CRM complexo), times que preferem convenção sobre configuração, quando já existe expertise Angular na empresa.</p>

<h3>Svelte / SvelteKit: o desafiante</h3>
<p>Compilado (não virtual DOM), alta performance, DX excelente. Ecossistema jovem, pool de devs menor.</p>
<p><strong>Melhor para:</strong> Projetos greenfield onde performance de renderização é crítica, times que podem investir no aprendizado.</p>

<p><strong>Recomendação pragmática:</strong> Se está começando e não tem preferência, use React/Next.js — a opção com menos risco de contratação e maior ecossistema. Se o time já conhece Vue ou Angular, use o que já sabem — a produtividade de dominar o framework vale mais que diferenças teóricas.</p>`,
  },
  {
    id: "infraestrutura",
    heading: "Infraestrutura e cloud: onde rodar em 2026",
    content: `<p>A decisão de infraestrutura mudou dramaticamente nos últimos 5 anos. Em 2026, existem 4 modelos e a escolha depende do perfil do projeto:</p>

<h3>1. Serverless (Vercel, Netlify, AWS Lambda, Cloudflare Workers)</h3>
<p><strong>Como funciona:</strong> Código roda sob demanda, escala automaticamente, custo zero em idle.</p>
<p><strong>Prós:</strong> Sem gerenciamento de servidor, escala automática, custo proporcional ao uso.</p>
<p><strong>Contras:</strong> Cold starts (200-500ms), limites de execução (30s-5min), vendor lock-in, debugging complexo.</p>
<p><strong>Ideal para:</strong> Sites, APIs com tráfego variável, funcionalidades event-driven.</p>

<h3>2. PaaS (Railway, Render, Fly.io, Heroku)</h3>
<p><strong>Como funciona:</strong> Deploy por git push, infraestrutura gerenciada, escala semi-automática.</p>
<p><strong>Prós:</strong> Deploy em minutos, sem ops, banco de dados gerenciado incluso.</p>
<p><strong>Contras:</strong> Menos controle, custo por instância (não por uso), limitações em configurações avançadas.</p>
<p><strong>Ideal para:</strong> MVPs, sistemas de médio porte (até ~50.000 MAU), startups sem equipe de DevOps.</p>

<h3>3. Containers gerenciados (AWS ECS, Google Cloud Run, Azure Container Apps)</h3>
<p><strong>Como funciona:</strong> Docker containers rodando em infraestrutura gerenciada.</p>
<p><strong>Prós:</strong> Controle total do ambiente de execução, escala granular, portabilidade (Docker = mesma imagem em qualquer cloud).</p>
<p><strong>Contras:</strong> Requer conhecimento de Docker e networking, mais setup que PaaS.</p>
<p><strong>Ideal para:</strong> Sistemas em crescimento que precisam de mais controle sem gerenciar servidores bare-metal.</p>

<h3>4. IaaS / VMs (AWS EC2, GCP Compute, Azure VMs, Hetzner)</h3>
<p><strong>Como funciona:</strong> Servidores virtuais. Você gerencia tudo: OS, runtime, networking, segurança.</p>
<p><strong>Prós:</strong> Controle máximo, custo previsível, sem limites de plataforma.</p>
<p><strong>Contras:</strong> Requer equipe de DevOps, responsabilidade total por segurança e atualizações.</p>
<p><strong>Ideal para:</strong> Sistemas com requisitos específicos (compliance, hardware GPU, configurações não-padrão).</p>

<p><strong>Recomendação por fase:</strong></p>
<ul>
  <li><strong>MVP/validação:</strong> Serverless ou PaaS — deploy em minutos, custo mínimo.</li>
  <li><strong>Crescimento (100-50.000 MAU):</strong> PaaS ou containers gerenciados — balanço entre controle e operação.</li>
  <li><strong>Escala (50.000+ MAU):</strong> Containers gerenciados ou IaaS — controle fino de custos e performance.</li>
</ul>`,
  },
  {
    id: "sete-erros",
    heading: "Os 7 erros fatais na escolha de stack (e como evitá-los)",
    content: `<h3>1. Escolher pela familiaridade ("é o que eu sei")</h3>
<p>A familiaridade do lead developer é um fator legítimo — mas não o único. Se o dev sênior conhece Ruby mas o projeto é uma plataforma de trading em tempo real, Ruby não é a resposta. A pergunta é: "eu sei a melhor ferramenta para ESTE problema, ou estou usando a ferramenta que eu sei independente do problema?"</p>

<h3>2. Escolher pelo hype ("todo mundo está usando X")</h3>
<p>A tecnologia que é trending no Twitter/X pode não ser ideal para um sistema bancário com 15 anos de vida útil esperada. Hype cycles são reais: toda nova linguagem parece revolucionária nos primeiros 3 anos e problemas só aparecem nos próximos 5. Prefira tech com 5+ anos em produção para o core.</p>

<h3>3. Escolher pela empresa ("a Google usa, então é bom")</h3>
<p>Google usa Go porque precisa servir bilhões de requests. Netflix usa Java porque precisa de processamento pesado de vídeo. Suas necessidades provavelmente são completamente diferentes. O context da grande empresa raramente se traduz para uma PME.</p>

<h3>4. Otimizar performance prematuramente</h3>
<p>"Python é lento" — com 100 usuários, a diferença de 50ms entre Go e Python é imperceptível. A otimização prematura é a raiz de metade dos projetos over-engineered. Otimize quando tiver dados de produção mostrando onde está o gargalo, não antes.</p>

<h3>5. Usar microserviços antes de precisar</h3>
<p>Microserviços introduzem complexidade de rede, serialização, deploy, monitoramento e consistência de dados. Para equipes de 1 a 5 devs e sistemas com menos de 100.000 MAU, um monolito modular é quase sempre mais produtivo. Comece monolítico, extraia serviços quando a dor real aparecer.</p>

<h3>6. Ignorar o custo de manutenção de dependências</h3>
<p>Cada biblioteca adicionada é uma dependência a ser mantida: atualizações de segurança, breaking changes, compatibilidade. Um projeto com 200 dependências npm tem superfície de ataque e custo de manutenção muito maior que um com 50. Avalie cada dependência: "o valor que ela entrega justifica o custo de mantê-la?"</p>

<h3>7. Não ter um plano B</h3>
<p>Toda escolha pode se mostrar errada. A pergunta de mitigação: "Se daqui a 2 anos precisarmos trocar [essa parte da stack], quão difícil será?" Organize o código com camadas de abstração que permitem substituir componentes isoladamente: banco atrás de repository, APIs externas atrás de adapters, lógica de negócio isolada do framework.</p>`,
  },
  {
    id: "stacks-recomendadas",
    heading: "Stacks recomendadas por cenário (abril 2026)",
    content: `<h3>MVP / Validação de mercado</h3>
<p><strong>Stack:</strong> Next.js (full-stack) + PostgreSQL (Supabase) + Vercel</p>
<p><strong>Custo/mês:</strong> R$ 0-200. <strong>Time-to-market:</strong> 4-8 semanas.</p>
<p><strong>Por que:</strong> TypeScript no front e back, deploy com git push, banco gerenciado com auth incluso. Para MVPs, essa stack maximiza velocidade.</p>

<h3>Sistema empresarial médio (ERP, CRM, portal)</h3>
<p><strong>Stack:</strong> Java (Spring Boot) ou Node.js (Express/NestJS) + PostgreSQL + Vue.js ou React + Railway/Docker</p>
<p><strong>Custo/mês:</strong> R$ 200-1.000. <strong>Time-to-market:</strong> 3-6 meses.</p>
<p><strong>Por que:</strong> Tipagem forte (TypeScript ou Java) para sistemas complexos, PostgreSQL para integridade de dados, PaaS para reduzir ops. Java quando há regras de negócio pesadas; Node quando há muitas integrações externas.</p>

<h3>Plataforma com IA integrada</h3>
<p><strong>Stack:</strong> Python (FastAPI) para ML/AI + Node.js ou Java (APIs de negócio) + PostgreSQL + pgvector + Redis</p>
<p><strong>Custo/mês:</strong> R$ 500-5.000. <strong>Time-to-market:</strong> 4-8 meses.</p>
<p><strong>Por que:</strong> Python é insubstituível para IA/ML. O backend de negócio pode ser outra linguagem. pgvector evita um banco vetorial separado na maioria dos casos.</p>

<h3>SaaS multi-tenant com alta escala</h3>
<p><strong>Stack:</strong> Go ou Java (backend) + React (frontend) + PostgreSQL + Redis + Elasticsearch + AWS/GCP</p>
<p><strong>Custo/mês:</strong> R$ 2.000-20.000+. <strong>Time-to-market:</strong> 6-12 meses.</p>
<p><strong>Por que:</strong> Go ou Java para performance em escala, Redis para cache, Elasticsearch para busca, cloud com IaaS/containers para controle fino.</p>

<h3>App Mobile</h3>
<p><strong>Stack:</strong> React Native ou Flutter + Node.js (API) + PostgreSQL + Firebase (push, analytics)</p>
<p><strong>Custo/mês:</strong> R$ 200-1.000. <strong>Time-to-market:</strong> 3-6 meses.</p>
<p><strong>Por que:</strong> Cross-platform reduz custo em 30-40% vs. nativo. Firebase resolve push notifications e analytics sem backend custom.</p>`,
  },
  {
    id: "quando-migrar",
    heading: "Quando migrar de stack: 5 sinais de que chegou a hora",
    content: `<p>Migração de stack é cara e arriscada — mas às vezes é inevitável. Os sinais de que a dor de ficar é maior que a dor de mudar:</p>

<ol>
  <li><strong>Velocidade de entrega caiu 50%+ no último ano.</strong> Features que levavam 1 semana agora levam 3, e a causa é a stack (não escopo ou qualidade do time).</li>
  <li><strong>Custos de infraestrutura dobraram sem dobrar o uso.</strong> A stack não escala eficientemente e compensar com hardware tem limite.</li>
  <li><strong>Contratar leva mais de 3 meses.</strong> O pool de profissionais para a tech escolhida é escasso e caro demais.</li>
  <li><strong>Vulnerabilidades se acumulam sem fix.</strong> Dependências sem manutenção, framework em end-of-life, e o custo de atualizar supera os benefícios.</li>
  <li><strong>O time unânime diz "precisa mudar".</strong> Quando os próprios desenvolvedores — não gestores — dizem que a stack é o problema, geralmente estão certos.</li>
</ol>

<p><strong>Como migrar sem caos:</strong></p>
<ul>
  <li><strong>Strangler Fig Pattern:</strong> Construa novas features na nova stack enquanto mantém o sistema antigo. Gradualmente substitua módulos até que o antigo possa ser desligado.</li>
  <li><strong>Anti-corruption layer:</strong> Um adaptador entre o sistema antigo e o novo que traduz chamadas entre as duas stacks durante a transição.</li>
  <li><strong>Nunca big bang:</strong> Migração "tudo de uma vez" é a abordagem com maior taxa de falha. Sempre migre incrementalmente.</li>
</ul>`,
  },
  {
    id: "conclusao",
    heading: "Conclusão: a melhor stack é a que resolve o SEU problema",
    content: `<p>Não existe stack universalmente melhor — existe a melhor para o seu contexto. Resuma a decisão em 3 passos:</p>

<ol>
  <li><strong>Defina o perfil do problema:</strong> I/O-bound ou CPU-bound? Quantos usuários em 3 anos? Qual a vida útil esperada do sistema? Qual o nível de regulação/compliance?</li>
  <li><strong>Aplique os 5 critérios:</strong> Fit técnico, maturidade, pool de talentos, custo de escala, velocidade de iteração. Para cada candidato, pontue de 1 a 5 em cada critério.</li>
  <li><strong>Valide com POC:</strong> Antes de comprometer, construa um protótipo de 2-3 dias na stack candidata. Implemente a feature mais complexa do sistema (não a mais simples). Se a experiência confirmar, siga. Se revelar problemas, economizou meses.</li>
</ol>

<p><strong>A regra de ouro final:</strong> Inove na lógica de negócio, não na infraestrutura. Use tecnologias comprovadas para a fundação e reserve experimentação para camadas que podem ser facilmente substituídas. O cliente não se importa se o backend é Go ou Python — se importa se o sistema funciona rápido e sem bugs.</p>`,
  },
],
callouts: [
  { type: "warning", title: "Armadilhas de decisão", body: "'É o que eu sei', 'está na moda', 'a empresa X usa' — nenhum desses é critério técnico. São atalhos cognitivos que levam a decisões caras. Use os 5 critérios objetivos." },
  { type: "insight", title: "Regra de ouro", body: "Inove na lógica de negócio, não na infraestrutura. Use o que é estável e comprovado para a base, e reserve inovação para onde ela gera valor diferencial." },
  { type: "tip", title: "POC antes de decidir", body: "Invista 2-3 dias construindo a feature mais complexa do sistema na stack candidata. Isso revela problemas que nenhuma comparação teórica mostra." },
  { type: "warning", title: "Monolito primeiro", body: "Para equipes de 1-5 devs e menos de 100.000 MAU, comece com monolito modular. Microserviços prematuros multiplicam complexidade sem benefício real." },
],
mindMap: {
  label: "Escolha de Stack",
  children: [
    { label: "5 Critérios", children: [
      { label: "Fit com problema" },
      { label: "Ecossistema maduro" },
      { label: "Pool de devs" },
      { label: "Custo em escala" },
      { label: "Velocidade inicial" },
    ]},
    { label: "Banco de dados", children: [
      { label: "PostgreSQL (80%)" },
      { label: "MongoDB (schema flex)" },
      { label: "Redis (cache)" },
      { label: "Elasticsearch (busca)" },
    ]},
    { label: "Backend", children: [
      { label: "Node.js (I/O)" },
      { label: "Java (enterprise)" },
      { label: "Python (IA/ML)" },
      { label: "Go (performance)" },
    ]},
    { label: "Infra", children: [
      { label: "Serverless (MVP)" },
      { label: "PaaS (crescimento)" },
      { label: "Containers (escala)" },
      { label: "IaaS (controle máx)" },
    ]},
  ],
},
mnemonic: {
  acronym: "FEPVC",
  breakdown: [
    { letter: "F", word: "Fit técnico", hint: "A tech resolve o problema real?" },
    { letter: "E", word: "Ecossistema", hint: "Libs, ferramentas, comunidade ativa" },
    { letter: "P", word: "Pool de talentos", hint: "Consegue contratar devs para essa tech?" },
    { letter: "V", word: "Velocidade de iteração", hint: "Quão rápido você entrega mudanças" },
    { letter: "C", word: "Custo de escala", hint: "O que acontece com 100× mais dados" },
  ],
},
relatedSlugs: ["software-sob-medida-vs-saas", "postgresql-vs-mongodb-vs-mysql", "quanto-custa-software-sob-medida"],
};

export default post;
