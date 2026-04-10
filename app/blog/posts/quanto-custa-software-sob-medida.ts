import type { Post } from "../[slug]/page";

const post: Post = {
slug: "quanto-custa-software-sob-medida",
tag: "Desenvolvimento Ágil",
title: "Quanto custa um software sob medida em 2026 — tabela realista por tipo de projeto",
description: "Tabela de preços reais de software sob medida no Brasil em 2026 — por tipo de projeto, tamanho de equipe e complexidade. Sem subestimativas que encarecem no meio do projeto.",
keywords: ["custo software sob medida", "preço desenvolvimento software Brasil", "orçamento sistema personalizado", "tabela preço desenvolvimento", "quanto custa sistema web"],
readTime: "8 min",
publishedAt: "2026-03-02",
updatedAt: "2026-04-10",
author: { name: "NuPtechs", role: "Consultoria Técnica" },
keyTakeaways: [
  "MVP funcional (1 desenvolvedor sênior, 2–3 meses): R$ 25.000–60.000",
  "Sistema empresarial médio (equipe 3–5 pessoas, 4–8 meses): R$ 80.000–250.000",
  "Plataforma complexa com IA/integrações extensas: R$ 200.000–1.000.000+",
  "O maior custo escondido: manutenção pós-lançamento — planeje 15–20% do custo inicial por ano",
  "Preço baixo não é sinal de eficiência — é sinal de estimativa ruim que vai estourar no meio",
],
sections: [
  {
    id: "por-que-precos-variam",
    heading: "Por que os preços variam tanto",
    content: `<p>Um "sistema de gestão" pode custar R$ 15.000 ou R$ 500.000 — e ambas as cotações podem estar corretas, dependendo do escopo. As principais variáveis:</p>
<ul>
  <li><strong>Complexidade funcional:</strong> CRUD simples vs. algoritmos de recomendação, integrações com 10 sistemas externos, compliance regulatório.</li>
  <li><strong>Escala técnica:</strong> sistema para 10 usuários internos vs. plataforma para 100.000 usuários simultâneos.</li>
  <li><strong>Senioridade da equipe:</strong> dev júnior cobra R$ 3.000–6.000/mês; sênior, R$ 12.000–22.000/mês. A diferença de produtividade justifica o custo.</li>
  <li><strong>Escopo definido vs. aberto:</strong> escopo vago invariavelmente custa mais — a empresa paga pela incerteza.</li>
</ul>
<p><strong>Regra prática:</strong> desconfie de orçamentos que chegam em menos de 3 dias úteis para projetos complexos — ou foi superficial ou vai mudar no meio.</p>`,
  },
  {
    id: "tabela-precos",
    heading: "Tabela de preços por categoria (março 2026)",
    content: `<table>
  <thead><tr><th>Tipo de Projeto</th><th>Duração</th><th>Equipe</th><th>Faixa de Preço</th></tr></thead>
  <tbody>
<tr><td>Landing page ou site institucional</td><td>2–4 sem</td><td>1 dev</td><td>R$ 5.000–20.000</td></tr>
<tr><td>MVP (1 funcionalidade central)</td><td>2–3 meses</td><td>1–2 devs</td><td>R$ 25.000–60.000</td></tr>
<tr><td>App web com autenticação + CRUD</td><td>3–4 meses</td><td>2 devs</td><td>R$ 40.000–90.000</td></tr>
<tr><td>Sistema de gestão (ERP pequeno)</td><td>4–8 meses</td><td>3–4 devs</td><td>R$ 80.000–200.000</td></tr>
<tr><td>App mobile (iOS + Android)</td><td>4–6 meses</td><td>2–3 devs</td><td>R$ 90.000–220.000</td></tr>
<tr><td>Plataforma marketplace</td><td>6–12 meses</td><td>4–6 devs</td><td>R$ 180.000–500.000</td></tr>
<tr><td>Sistema com IA/ML integrado</td><td>5–10 meses</td><td>3–5 devs + ML eng</td><td>R$ 150.000–450.000</td></tr>
<tr><td>Plataforma complexa (fintech, healthtech)</td><td>12–24 meses</td><td>6–12 pessoas</td><td>R$ 400.000–1.500.000+</td></tr>
  </tbody>
</table>
<p><em>Valores incluem desenvolvimento, testes e entrega. Excluem: infraestrutura cloud, licenças de terceiros, manutenção pós-entrega e mudanças de escopo.</em></p>`,
  },
  {
    id: "composicao-custo",
    heading: "Como o custo é composto",
    content: `<p>Para um projeto de R$ 100.000 com duração de 4 meses e equipe de 3 pessoas:</p>
<ul>
  <li><strong>Desenvolvimento (~65%):</strong> R$ 65.000 — 3 devs × ~R$ 5.400/mês × 4 meses (custo da empresa, incluindo encargos)</li>
  <li><strong>Gestão de projeto (~15%):</strong> R$ 15.000 — scrum master, reuniões, documentação</li>
  <li><strong>Arquitetura e tech lead (~10%):</strong> R$ 10.000 — decisões técnicas, code review</li>
  <li><strong>Testes e QA (~7%):</strong> R$ 7.000 — testes manuais e automatizados</li>
  <li><strong>Margem (~3–10%):</strong> R$ 3.000+ — risco, overhead operacional</li>
</ul>
<p>Quando uma empresa cobra R$ 40.000 pelo mesmo projeto, alguma dessas linhas está faltando — geralmente testes, gestão ou contingência.</p>`,
  },
  {
    id: "custo-escondido",
    heading: "Os custos que ninguém menciona no orçamento",
    content: `<ul>
  <li><strong>Manutenção pós-lançamento:</strong> 15–20% do custo inicial por ano. Sistema de R$ 100k custa R$ 15.000–20.000/ano para manter.</li>
  <li><strong>Infraestrutura cloud:</strong> R$ 500–5.000/mês dependendo do porte — contínuo e crescente.</li>
  <li><strong>Mudanças de escopo:</strong> todo projeto tem mudanças. Budget de contingência: 20–30% do valor fechado.</li>
  <li><strong>Treinamento:</strong> um sistema novo precisa de onboarding da equipe — horas que custam dinheiro real.</li>
  <li><strong>Migração de dados:</strong> trazer dados de sistemas antigos pode dobrar o custo em projetos complexos.</li>
  <li><strong>Custo de oportunidade:</strong> o tempo que seu time interno dedica a reuniões e validações não é gratuito.</li>
</ul>`,
  },
  {
    id: "como-comparar",
    heading: "Como comparar orçamentos de forma justa",
    content: `<p>Ao receber múltiplos orçamentos, garanta que todos incluem:</p>
<ol>
  <li><strong>Escopo detalhado:</strong> lista de funcionalidades específicas, não "sistema de gestão".</li>
  <li><strong>Milestones de entrega:</strong> o que é entregue, quando e com quais critérios de aceite.</li>
  <li><strong>Política de mudanças:</strong> o que acontece quando o escopo muda (e vai mudar).</li>
  <li><strong>Propriedade do código:</strong> o código é seu ou fica com a empresa? Repositório entregue?</li>
  <li><strong>Suporte pós-entrega:</strong> por quanto tempo e a que custo?</li>
  <li><strong>Stack tecnológica:</strong> quais tecnologias e por que?</li>
</ol>
<p>Um orçamento sem essas informações não é um orçamento — é uma estimativa de bolso que vai mudar.</p>`,
  },
],
callouts: [
  { type: "warning", title: "O orçamento mais barato raramente é o mais barato", body: "Projetos suborçados que estouram no meio custam 2–3× mais do que um projeto bem estimado desde o início. A obra inacabada é o cenário mais caro do desenvolvimento de software." },
  { type: "insight", title: "Dev sênior é mais barato que dev júnior", body: "Um dev sênior a R$ 20.000/mês produz o que 3 juniores a R$ 7.000 produziriam — e com muito menos bugs e retrabalho. A aritmética simples esconde essa realidade." },
  { type: "tip", title: "Comece pelo escopo, não pelo preço", body: "Antes de pedir orçamento, documente: quais problemas você quer resolver, quem vai usar, quais são os 3 casos de uso mais críticos, e o que é proibido (restrições técnicas ou de negócio). Isso reduz variação de orçamento em 50%." },
],
mindMap: {
  label: "Custo Software 2026",
  children: [
    { label: "Categorias", children: [
      { label: "MVP: R$25-60k" },
      { label: "Sistema gestão: R$80-200k" },
      { label: "Plataforma: R$180k+" },
    ]},
    { label: "Composição", children: [
      { label: "Dev 65%" },
      { label: "Gestão 15%" },
      { label: "QA 7%" },
      { label: "Margem 10%" },
    ]},
    { label: "Custos ocultos", children: [
      { label: "Manutenção 15-20%/ano" },
      { label: "Cloud contínuo" },
      { label: "Mudanças 20-30%" },
    ]},
  ],
},
mnemonic: {
  acronym: "PRECO",
  breakdown: [
    { letter: "P", word: "Pós-lançamento pesa", hint: "Manutenção = 15-20% do custo/ano" },
    { letter: "R", word: "Realismo nas estimativas", hint: "Preço baixo demais = estouro garantido" },
    { letter: "E", word: "Escopo define tudo", hint: "MVP R$ 25-60k vs. plataforma R$ 200k-1M+" },
    { letter: "C", word: "Composição do custo", hint: "Dev + infra + design + testes + deploy" },
    { letter: "O", word: "Operação contínua", hint: "Software não tem fim — manutenção é recorrente" },
  ],
},
relatedSlugs: ["software-sob-medida-vs-saas", "cinco-sinais-migrar-saas-para-software-proprio"],
};

export default post;
