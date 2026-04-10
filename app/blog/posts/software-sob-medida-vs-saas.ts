import type { Post } from "../[slug]/page";

const post: Post = {
slug: "software-sob-medida-vs-saas",
tag: "Desenvolvimento Ágil",
title: "Software sob medida vs. SaaS pronto: qual escolher para sua empresa?",
description: "Framework prático para gestores avaliarem custo, tempo e risco antes de contratar desenvolvimento personalizado.",
keywords: ["software sob medida vs SaaS", "quando contratar desenvolvimento personalizado", "custo software sob medida"],
readTime: "5 min",
publishedAt: "2026-02-05",
updatedAt: "2026-04-10",
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
mnemonic: {
  acronym: "HIBRIDO",
  breakdown: [
    { letter: "H", word: "Híbrido vence", hint: "SaaS + sob medida combinados" },
    { letter: "I", word: "Integrações são chave", hint: "Sob medida quando precisa de controle total" },
    { letter: "B", word: "Barato no começo", hint: "SaaS vence em processos padrão" },
    { letter: "R", word: "Roadmap alheio", hint: "Custo oculto: depender da prioridade do vendor" },
    { letter: "I", word: "Identifique o diferencial", hint: "Sob medida quando gera vantagem competitiva" },
    { letter: "D", word: "Dados sob controle", hint: "Lock-in = perda de dados na migração" },
    { letter: "O", word: "5 perguntas bastam", hint: "Framework sim/não resolve em 5 minutos" },
  ],
},
relatedSlugs: ["como-escolher-stack-tecnologica", "como-automatizar-processos-manuais"],
};

export default post;
