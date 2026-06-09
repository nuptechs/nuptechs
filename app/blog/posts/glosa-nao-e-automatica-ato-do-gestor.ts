import type { Post } from "../[slug]/page";

const post: Post = {
slug: "glosa-nao-e-automatica-ato-do-gestor",
tag: "Setor Público",
title: "Glosa não é automática: o ato administrativo que o gestor precisa fundamentar",
description: "Descumpriu o SLA, então o sistema glosa sozinho? Não. Glosa é ato administrativo do gestor — exige motivação, contraditório e proporcionalidade. Veja o que fundamentar antes de descontar.",
keywords: ["glosa contrato público", "glosa SLA", "dedução por descumprimento", "ato administrativo motivação", "contraditório ampla defesa contrato", "IMR glosa", "TCU glosa"],
readTime: "10 min",
publishedAt: "2026-05-19",
updatedAt: "2026-05-19",
author: { name: "Yuri Francis", role: "Fundador, NuPtechs" },
executiveSummary: "Há uma armadilha conceitual comum na gestão de contratos de TI: tratar a glosa como consequência automática de um indicador não atingido. Não é. A medição (IMR) apura o fato; a glosa é uma decisão — um ato administrativo do gestor que precisa de motivação expressa (fundamentação contratual, legal e de execução), de contraditório e ampla defesa do contratado, e de proporcionalidade. Glosa automática, sem fundamentação e sem defesa, é o tipo de ato que o controle externo derruba. Este artigo separa a medição da decisão, lista o que precisa estar na fundamentação, e mostra por que automatizar o cálculo é útil, mas automatizar o desconto é arriscado.",
keyTakeaways: [
  "Medição e glosa são coisas diferentes: o IMR apura o fato; a glosa é a decisão do gestor sobre o fato.",
  "Glosa é ato administrativo — exige motivação expressa, não pode ser automática nem presumida.",
  "Antes de descontar: contraditório e ampla defesa do contratado são garantias, não formalidade opcional.",
  "A fundamentação reúne três camadas: a cláusula contratual, a base legal e a evidência de execução.",
  "Proporcionalidade: a glosa acompanha a gravidade do descumprimento — desconto confiscatório é nulável.",
  "Automatizar o cálculo ajuda; automatizar o desconto, sem decisão humana fundamentada, é o que o TCU reprova.",
],
sections: [
  {
    id: "o-erro",
    heading: "O erro de tratar glosa como gatilho",
    content: `<p>O raciocínio parece lógico: o contrato define um nível mínimo de serviço, o fornecedor não atingiu, logo o sistema desconta o valor proporcional. Limpo, objetivo, automático. E errado.</p>

<p>Glosa é <strong>dedução por descumprimento contratual</strong> — e descontar um valor que seria pago ao contratado é exercer uma prerrogativa da Administração. Toda prerrogativa que afeta o patrimônio de alguém é, no direito público, um <strong>ato administrativo</strong>: precisa de competência, de motivo, de motivação e de finalidade. "O indicador ficou abaixo da meta" é um fato; não é, por si só, a decisão de glosar.</p>

<p>A diferença entre o fato e a decisão é exatamente onde mora o risco — e onde muita gestão escorrega.</p>`,
  },
  {
    id: "medicao-vs-decisao",
    heading: "Medição apura o fato; glosa é a decisão",
    content: `<p>Vale separar as duas etapas com nitidez:</p>

<ul>
  <li><strong>Medição (IMR):</strong> o Instrumento de Medição de Resultado afere, de forma objetiva, se as metas e níveis de serviço foram atingidos no período. O resultado é um <em>fato</em> — um número, uma faixa, uma ocorrência registrada.</li>
  <li><strong>Decisão (glosa):</strong> diante do fato, o gestor decide se haverá dedução, em que medida, e com qual fundamentação. É aqui que entram a motivação, o contraditório e a proporcionalidade.</li>
</ul>

<p>Confundir as duas é o que produz a "glosa automática": o sistema mede e desconta no mesmo movimento, sem que ninguém decida nada. O problema é que, se o contratado questionar, não há ato motivado para sustentar — só um cálculo. E cálculo não é fundamentação.</p>`,
  },
  {
    id: "o-que-fundamentar",
    heading: "O que precisa estar na fundamentação",
    content: `<p>Uma glosa que se sustenta reúne três camadas de fundamentação:</p>

<ol>
  <li><strong>Contratual:</strong> qual cláusula foi descumprida, qual o nível de serviço pactuado, e qual a regra de dedução prevista no instrumento. Sem previsão contratual da glosa, não há glosa.</li>
  <li><strong>Legal:</strong> a base normativa que autoriza a dedução e o rito (incluindo o contraditório). O regime muda conforme o contrato seja regido pela Lei 14.133 ou pela Lei 13.303 — e isso precisa estar correto.</li>
  <li><strong>De execução:</strong> a evidência concreta do descumprimento — a medição do período, os registros, os documentos. É o que liga o fato à norma.</li>
</ol>

<p>E, antes de efetivar: <strong>contraditório e ampla defesa</strong>. O contratado tem direito de se manifestar sobre a apuração antes de o desconto se consolidar. Pular essa etapa é o atalho que mais custa depois.</p>`,
  },
  {
    id: "proporcionalidade",
    heading: "Proporcionalidade: o desconto acompanha a gravidade",
    content: `<p>Mesmo com previsão contratual e fato comprovado, a glosa precisa ser <strong>proporcional</strong>. Um atraso pontual e um descumprimento grave e reiterado não comportam a mesma dedução. Glosa que se aproxima do confisco — que retira do contratado muito além do impacto do descumprimento — é vulnerável à anulação.</p>

<p>Por isso instrumentos bem desenhados trabalham com <strong>gradação</strong>: faixas de dedução conforme a severidade, e não um único percentual aplicado a tudo. A gradação é o que transforma a glosa de punição arbitrária em consequência calibrada.</p>`,
  },
  {
    id: "automatizar-certo",
    heading: "O que automatizar — e o que não",
    content: `<p>Nada disso significa abandonar a tecnologia. Significa automatizar a parte certa.</p>

<p><strong>Automatize o cálculo e a evidência:</strong> a medição do IMR, a consolidação dos registros, a montagem da fundamentação (cláusula + base legal + execução), a simulação do valor. Isso poupa tempo e reduz erro.</p>

<p><strong>Mantenha humana a decisão:</strong> a glosa em si — o ato de descontar — deve ser uma escolha do gestor, motivada, após o contraditório. No EasyNuP, é assim por desenho: o motor de regras não desconta sozinho; ele reúne a fundamentação contratual, legal e de execução, apresenta as opções ao gestor e registra a decisão na trilha de auditoria. A máquina prepara o ato; quem decide é a autoridade competente.</p>`,
  },
],
callouts: [
  { type: "warning", title: "Glosa automática é convite à anulação", body: "Descontar com base apenas no indicador, sem motivação expressa e sem contraditório, cria um ato administrativo frágil. Se o contratado questionar, não há fundamentação para sustentar — e o controle externo tende a derrubar." },
  { type: "insight", title: "Fato ≠ decisão", body: "O IMR produz um fato (a meta não foi atingida). A glosa é a decisão sobre esse fato. Separar as duas etapas é o que permite fundamentar — e o que evita transformar uma medição em desconto cego." },
  { type: "tip", title: "Três camadas + defesa", body: "Antes de glosar, tenha: a cláusula contratual, a base legal correta (14.133 ou 13.303), a evidência de execução — e a manifestação do contratado. Faltando qualquer uma, a glosa fica exposta." },
],
mindMap: {
  label: "Glosa fundamentada",
  children: [
    { label: "Etapas", children: [
      { label: "Medição (IMR) = fato" },
      { label: "Decisão (glosa) = ato" },
    ]},
    { label: "Fundamentação", children: [
      { label: "Cláusula contratual" },
      { label: "Base legal (14.133/13.303)" },
      { label: "Evidência de execução" },
    ]},
    { label: "Garantias", children: [
      { label: "Motivação expressa" },
      { label: "Contraditório e ampla defesa" },
      { label: "Proporcionalidade / gradação" },
    ]},
    { label: "Automação", children: [
      { label: "Calcular: sim" },
      { label: "Descontar sozinho: não" },
    ]},
  ],
},
relatedSlugs: ["imr-medicao-resultado-sem-glosa-arbitraria", "lei-14133-ou-13303-contrato-ti-orgao-publico"],
};

export default post;
