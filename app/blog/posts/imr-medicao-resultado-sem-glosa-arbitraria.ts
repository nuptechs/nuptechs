import type { Post } from "../[slug]/page";

const post: Post = {
slug: "imr-medicao-resultado-sem-glosa-arbitraria",
tag: "Setor Público",
title: "IMR na prática: como medir nível de serviço sem virar alvo do TCU",
description: "O Instrumento de Medição de Resultado liga pagamento a resultado — mas IMR mal desenhado vira glosa arbitrária e alvo do controle. Veja os erros comuns e como construir um IMR objetivo e proporcional.",
keywords: ["IMR", "Instrumento de Medição de Resultado", "nível de serviço contrato público", "IN SGD 94/2022", "SLA setor público", "remuneração por resultado", "indicador de desempenho contrato"],
readTime: "11 min",
publishedAt: "2026-05-26",
updatedAt: "2026-05-26",
author: { name: "Yuri Francis", role: "Fundador, NuPtechs" },
executiveSummary: "O Instrumento de Medição de Resultado (IMR) é o mecanismo que liga o pagamento ao alcance de níveis mínimos de serviço — substituindo a lógica de 'pagar por presença' pela de 'pagar por resultado'. Bem desenhado, é o melhor amigo do gestor. Mal desenhado, vira o oposto: indicadores subjetivos, metas inatingíveis e glosas desproporcionais que o contratado contesta e o controle externo derruba. Este artigo mostra o que faz um IMR ser objetivo e defensável — indicadores mensuráveis, faixas de remuneração graduadas, proporcionalidade e contraditório — e os erros recorrentes que transformam medição em arbitrariedade.",
keyTakeaways: [
  "IMR liga remuneração a resultado: o pagamento varia conforme o nível de serviço efetivamente entregue.",
  "Indicador bom é objetivo e mensurável — se depende de opinião do fiscal, não é indicador, é avaliação subjetiva.",
  "Meta tem que ser atingível e baseada em linha de base real; meta impossível é glosa programada.",
  "Use faixas graduadas de pagamento, não um corte binário — proporcionalidade é exigência, não estética.",
  "A redução por desempenho é ajuste de remuneração por resultado, não multa — confundir os dois gera dupla penalização.",
  "Objetividade + gradação + contraditório é o que separa um IMR defensável de um alvo do controle externo.",
],
sections: [
  {
    id: "o-que-e",
    heading: "O que o IMR resolve",
    content: `<p>Durante anos, contratos de serviço de TI foram pagos pela lógica do posto de trabalho: tantas pessoas alocadas, tantas horas, tanto se paga — independentemente do que foi entregue. O resultado é conhecido: o gestor paga por presença, não por valor.</p>

<p>O <strong>Instrumento de Medição de Resultado (IMR)</strong> inverte isso. Ele define <strong>níveis mínimos de serviço</strong> e amarra a remuneração ao seu cumprimento: entregou no nível pactuado, recebe integral; ficou abaixo, a remuneração é ajustada proporcionalmente. A norma de contratação de TIC no Executivo federal (IN SGD/ME nº 94/2022) trata o IMR como peça central do modelo de gestão do contrato.</p>

<p>A promessa é ótima. O problema é que a maior parte dos IMRs falha não no conceito, mas na <strong>execução do desenho</strong>.</p>`,
  },
  {
    id: "indicador-objetivo",
    heading: "Indicador objetivo: se depende de opinião, não serve",
    content: `<p>O primeiro teste de um indicador é: <strong>duas pessoas, com os mesmos dados, chegam ao mesmo resultado?</strong> Se a resposta depende do humor do fiscal, o indicador é subjetivo — e subjetividade é o primeiro flanco que o contratado ataca.</p>

<p>Indicadores defensáveis têm:</p>
<ul>
  <li><strong>Fonte de dado clara:</strong> de onde sai o número (sistema de chamados, monitoramento, log), sem coleta manual ambígua.</li>
  <li><strong>Fórmula explícita:</strong> como o indicador é calculado, com unidade e período definidos.</li>
  <li><strong>Meta com linha de base:</strong> o alvo deriva de histórico ou referência técnica, não de um número redondo escolhido no chute.</li>
</ul>

<p>"Qualidade do atendimento", sem fórmula, não é indicador — é uma impressão. "Percentual de chamados resolvidos no prazo acordado, medido pelo sistema de service desk", é.</p>`,
  },
  {
    id: "meta-atingivel",
    heading: "Meta inatingível é glosa programada",
    content: `<p>Um erro silencioso e grave: definir metas que ninguém consegue cumprir. Quando a meta é irreal, o contratado sempre fica abaixo, a glosa vira rotina, e o que era "remuneração por resultado" vira <strong>redução sistemática de preço por desenho</strong>. O controle externo enxerga isso — e o contratado, mais cedo ou mais tarde, contesta ou repactua.</p>

<p>Meta boa parte de uma <strong>linha de base</strong>: o que é tecnicamente exequível, a partir de histórico ou de referência de mercado. O IMR mede desempenho real contra um alvo justo — não cria um alvo impossível para justificar desconto.</p>`,
  },
  {
    id: "faixas-graduadas",
    heading: "Faixas graduadas, não corte binário",
    content: `<p>O segundo erro recorrente é o corte tudo-ou-nada: bateu a meta, paga 100%; ficou um ponto abaixo, glosa cheia. Isso é desproporcional e frágil.</p>

<p>IMR bem desenhado trabalha com <strong>faixas de remuneração</strong>: o pagamento acompanha o nível de serviço em degraus proporcionais à entrega. Um desvio pequeno gera um ajuste pequeno; um desvio grande, um ajuste maior. A gradação é o que torna a dedução proporcional — e proporcionalidade não é refinamento opcional, é requisito de validade do ato.</p>

<p>Importante distinguir: o ajuste de remuneração por desempenho <strong>não é multa</strong>. É o preço acompanhando o resultado entregue. Tratar a redução do IMR como sanção, somada a outra penalidade pelo mesmo fato, é dupla penalização — e isso não se sustenta.</p>`,
  },
  {
    id: "do-numero-a-decisao",
    heading: "Do número à decisão: o IMR não desconta sozinho",
    content: `<p>Por fim, o IMR mede — mas não decide. O resultado da medição é um fato; a eventual dedução é um ato do gestor, que exige motivação e contraditório (esse é o tema da glosa fundamentada, que merece capítulo próprio).</p>

<p>É por isso que, no EasyNuP, o IMR é modelado como indicador objetivo, com série temporal de medições e faixas de pagamento, alimentando uma decisão humana fundamentada — não um desconto cego. A medição é automática e auditável; a consequência financeira é uma escolha registrada, com a fundamentação anexa. Essa separação é o que mantém o modelo robusto diante do controle.</p>`,
  },
],
callouts: [
  { type: "warning", title: "Meta impossível = desconto programado", body: "Se a meta nunca é atingível, a glosa deixa de ser exceção e vira regra. O que parecia 'pagar por resultado' vira redução sistemática de preço — e o controle externo (e o contratado) percebem." },
  { type: "insight", title: "Redução por desempenho não é multa", body: "O ajuste do IMR é o preço acompanhando o resultado entregue. Tratá-lo como sanção, e ainda somar outra penalidade pelo mesmo fato, é dupla penalização — vulnerável à anulação." },
  { type: "tip", title: "Teste da objetividade", body: "Antes de cravar um indicador, pergunte: duas pessoas com os mesmos dados chegam ao mesmo número? Se não, o indicador é subjetivo e será o primeiro ponto contestado." },
],
mindMap: {
  label: "IMR defensável",
  children: [
    { label: "Indicador", children: [
      { label: "Fonte de dado clara" },
      { label: "Fórmula explícita" },
      { label: "Objetivo (não subjetivo)" },
    ]},
    { label: "Meta", children: [
      { label: "Linha de base real" },
      { label: "Atingível" },
    ]},
    { label: "Remuneração", children: [
      { label: "Faixas graduadas" },
      { label: "Proporcionalidade" },
      { label: "Não é multa" },
    ]},
    { label: "Consequência", children: [
      { label: "Mede o fato" },
      { label: "Decisão humana fundamentada" },
    ]},
  ],
},
relatedSlugs: ["glosa-nao-e-automatica-ato-do-gestor", "produtividade-ti-pf-ust-homem-hora"],
};

export default post;
