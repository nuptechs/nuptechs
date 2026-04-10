import type { Post } from "../[slug]/page";

const post: Post = {
slug: "como-escolher-stack-tecnologica",
tag: "Desenvolvimento Ágil",
title: "Como escolher a stack tecnológica certa para o seu projeto de software",
description: "Os critérios que engenheiros seniores usam para definir linguagem, banco de dados e infraestrutura — sem dívida técnica.",
keywords: ["como escolher stack tecnológica", "linguagem de programação para projeto", "arquitetura de software empresarial"],
readTime: "6 min",
publishedAt: "2026-02-18",
updatedAt: "2026-04-10",
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
relatedSlugs: ["software-sob-medida-vs-saas", "dashboard-bi-para-pmes"],
};

export default post;
