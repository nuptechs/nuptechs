import type { Post } from "../[slug]/page";

const post: Post = {
slug: "produtividade-ti-pf-ust-homem-hora",
tag: "Setor Público",
title: "Produtividade em TI: PF, UST, homem-hora — e por que 'horas por ponto de função' engana",
description: "Produtividade não é 'horas por ponto de função'. É uma razão entrega÷esforço cuja unidade é livre — PF, UST, homem-hora, SNAP. Entenda as métricas e o erro de misturar tamanho com esforço.",
keywords: ["produtividade TI", "pontos de função", "UST", "unidade de serviço técnico", "homem-hora", "métrica de contrato TI", "contratação por resultado", "IFPUG SNAP"],
readTime: "11 min",
publishedAt: "2026-06-06",
updatedAt: "2026-06-06",
author: { name: "Yuri Francis", role: "Fundador, NuPtechs" },
executiveSummary: "Produtividade virou sinônimo de 'horas por ponto de função' em muito contrato de TI — e isso esconde um erro conceitual. Produtividade é uma razão entre entrega e esforço, e a unidade da entrega é livre: pode ser Ponto de Função (tamanho funcional), UST (esforço técnico padronizado), homem-hora, SNAP ou um entregável. Misturar 'tamanho' (PF) com 'esforço' (horas) cria distorção — PF mede o quê, não o quanto custa fazer. Além disso, o vínculo da produtividade com a remuneração é opcional e pode assumir papéis diferentes: régua de preço, gatilho de nível de serviço, ou pura gestão. Este artigo separa as métricas, explica por que cada uma existe, e mostra como modelar produtividade sem prender o contrato a uma fórmula que engana.",
keyTakeaways: [
  "Produtividade é uma razão entrega÷esforço — não uma unidade fixa, e muito menos 'horas por ponto de função'.",
  "Ponto de Função mede tamanho funcional (o quê foi entregue), não o esforço para entregar — são dimensões diferentes.",
  "UST (Unidade de Serviço Técnico) existe justamente para medir o que PF não mede: esforço técnico padronizado.",
  "Homem-hora mede esforço bruto, mas isola mal o resultado — por isso o controle empurra o setor para métricas de resultado.",
  "O vínculo produtividade↔remuneração é opcional: pode ser régua de preço, gatilho de SLA/IMR, ou só gestão.",
  "Modelar produtividade como indicador genérico (métrica-agnóstico) evita prender o contrato a uma única fórmula.",
],
sections: [
  {
    id: "a-confusao",
    heading: "A confusão de 'horas por ponto de função'",
    content: `<p>Em muitos contratos, "produtividade" aparece cravada como uma constante: tantas horas por ponto de função. Parece preciso. Mas embute uma confusão de categorias — porque mistura duas coisas que medem dimensões diferentes.</p>

<p>Produtividade, na essência, é uma <strong>razão</strong>: o quanto se entrega dividido pelo esforço gasto. O ponto delicado é que a <strong>unidade da entrega é livre</strong> — e a do esforço também. Cravar "horas por PF" é escolher uma combinação específica e tratá-la como se fosse a única possível. Quando o contrato faz isso, ele herda as limitações dessa combinação sem perceber.</p>`,
  },
  {
    id: "pf",
    heading: "Ponto de Função mede tamanho, não esforço",
    content: `<p>O <strong>Ponto de Função</strong> (PF, padrão IFPUG) mede o <strong>tamanho funcional</strong> de um software a partir do ponto de vista do usuário: quantas funções de dados e de transação ele oferece. É uma métrica de <em>tamanho do quê foi entregue</em> — independente de tecnologia, de linguagem e de quem fez.</p>

<p>Essa é a sua força e o seu limite. PF responde "qual o tamanho funcional da entrega", não "quanto esforço custou produzi-la". Duas entregas com o mesmo PF podem exigir esforços muito diferentes conforme a complexidade técnica, a maturidade do legado e o risco. Por isso "horas por PF" tenta amarrar tamanho a esforço como se a relação fosse fixa — e ela não é. É um índice útil para estimar, péssimo para tratar como verdade contratual rígida.</p>`,
  },
  {
    id: "ust",
    heading: "UST: a métrica criada para o que PF não mede",
    content: `<p>A <strong>UST (Unidade de Serviço Técnico)</strong> nasceu justamente para cobrir o vão deixado pelo PF: serviços técnicos que não são "tamanho de software", mas <strong>esforço técnico padronizado</strong>. Sustentação, operação, atividades de infraestrutura, tarefas que não geram função nova mensurável em PF — tudo isso cabe melhor numa unidade de esforço padronizado do que numa métrica de tamanho funcional.</p>

<p>UST não é "melhor" nem "pior" que PF — é <strong>outra coisa</strong>, para outro tipo de trabalho. Contratos maduros frequentemente usam as duas: PF para o que é desenvolvimento de função, UST para o que é serviço técnico. Forçar tudo em uma só métrica é o que distorce.</p>`,
  },
  {
    id: "homem-hora",
    heading: "Homem-hora e o empurrão para o resultado",
    content: `<p>O <strong>homem-hora</strong> mede esforço bruto: horas de pessoas alocadas. É intuitivo e fácil de contar — e é exatamente por isso que vira armadilha. Pagar por homem-hora paga por <strong>presença</strong>, não por <strong>resultado</strong>: aproxima o contrato do "posto de trabalho", em que o fornecedor é remunerado por estar lá, não por entregar.</p>

<p>É por isso que o controle externo e as normas de contratação empurram o setor público para <strong>remuneração por resultado</strong> — medir o que foi entregue, não as horas gastas. Homem-hora ainda tem lugar (algumas atividades são genuinamente medidas por tempo), mas como exceção justificada, não como regra padrão.</p>`,
  },
  {
    id: "vinculo-remuneracao",
    heading: "O vínculo com a remuneração é opcional — e tem papéis",
    content: `<p>Há um último mal-entendido: achar que produtividade existe sempre para descontar ou pagar. Não. O <strong>vínculo entre produtividade e remuneração é opcional</strong>, e quando existe pode assumir papéis distintos:</p>
<ul>
  <li><strong>Régua de preço:</strong> a produtividade converte entrega em valor (ex.: preço por PF ou por UST).</li>
  <li><strong>Nível de serviço:</strong> a produtividade alimenta um IMR e pode afetar a remuneração por desempenho.</li>
  <li><strong>Gestão pura:</strong> a produtividade é só indicador gerencial, sem efeito financeiro — acompanhar para decidir, não para descontar.</li>
</ul>

<p>Por isso modelar produtividade como uma constante "horas por PF" é limitante: cobre um único papel e crava uma única métrica. O caminho mais robusto é tratá-la como <strong>indicador genérico, métrica-agnóstico</strong> — a unidade de entrega é configurável (PF, UST, homem-hora, SNAP, entregável), a série de medições é histórica, e o papel na remuneração é explícito. É assim que o EasyNuP modela produtividade: sem fabricar um preço de esforço que o modelo não tem, e sem prender o contrato a uma fórmula que engana.</p>`,
  },
],
callouts: [
  { type: "insight", title: "Tamanho ≠ esforço", body: "Ponto de Função mede o tamanho funcional da entrega, não o esforço para produzi-la. 'Horas por PF' amarra as duas dimensões como se a relação fosse fixa — e ela varia com complexidade, legado e risco." },
  { type: "tip", title: "Por que a UST existe", body: "UST foi criada para medir esforço técnico padronizado — o que PF, métrica de tamanho, não captura. Contratos maduros usam PF para desenvolvimento e UST para serviço técnico, em vez de forçar tudo numa métrica só." },
  { type: "warning", title: "Homem-hora paga presença", body: "Remunerar por hora aproxima o contrato do posto de trabalho: paga-se por estar alocado, não por entregar. É o que o controle externo empurra para fora, em favor de remuneração por resultado." },
],
mindMap: {
  label: "Produtividade = entrega÷esforço",
  children: [
    { label: "Unidades de entrega", children: [
      { label: "PF (tamanho funcional)" },
      { label: "UST (esforço técnico)" },
      { label: "Homem-hora (esforço bruto)" },
      { label: "SNAP / entregável" },
    ]},
    { label: "O erro", children: [
      { label: "Misturar tamanho e esforço" },
      { label: "'Horas por PF' como verdade fixa" },
    ]},
    { label: "Vínculo com preço", children: [
      { label: "Régua de preço" },
      { label: "Nível de serviço (IMR)" },
      { label: "Gestão pura (sem efeito)" },
    ]},
    { label: "Modelagem", children: [
      { label: "Indicador genérico" },
      { label: "Métrica-agnóstico" },
      { label: "Série histórica" },
    ]},
  ],
},
relatedSlugs: ["imr-medicao-resultado-sem-glosa-arbitraria", "lei-14133-ou-13303-contrato-ti-orgao-publico"],
};

export default post;
