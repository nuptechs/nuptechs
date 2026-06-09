import type { Post } from "../[slug]/page";

const post: Post = {
slug: "lei-14133-ou-13303-contrato-ti-orgao-publico",
tag: "Setor Público",
title: "Lei 14.133 ou 13.303? Qual lei rege o contrato de TI do seu órgão",
description: "A Nova Lei de Licitações não cobre todo mundo. Quem é estatal (Caixa, Serpro, BRB) contrata pela Lei 13.303. Entenda a diferença antes de fiscalizar — ou vender para — um órgão público.",
keywords: ["Lei 14.133", "Lei 13.303", "Lei das Estatais", "licitação TI", "contrato administrativo TI", "IN SGD 94/2022", "fiscalização de contrato público", "contratação pública de software"],
readTime: "12 min",
publishedAt: "2026-06-09",
updatedAt: "2026-06-09",
author: { name: "Yuri Francis", role: "Fundador, NuPtechs" },
executiveSummary: "Existe a crença de que todo contrato público no Brasil é regido pela Lei 14.133/2021. Não é. A 14.133 rege a Administração direta, autárquica e fundacional; as empresas estatais (empresas públicas e sociedades de economia mista — Caixa, Serpro, Dataprev, BRB, CAESB) contratam pela Lei 13.303/2016 e por um regulamento interno próprio. Sobre as duas leis ainda incidem normas como a IN SGD/ME 94/2022 (contratação de TIC no Executivo federal), o Decreto 11.246/2022 (gestor e fiscal), a LGPD, a LAI e a jurisprudência do TCU. Este artigo mostra como identificar qual regime se aplica pela natureza jurídica do órgão, o que de fato muda na licitação, na fiscalização e na sanção, e por que confundir os dois custa caro a quem gere — ou fornece para — o setor público.",
keyTakeaways: [
  "14.133/2021 rege a Administração direta, autárquica e fundacional. 13.303/2016 rege empresas públicas e sociedades de economia mista.",
  "Vários órgãos que parecem 'governo federal' são estatais: Caixa, Serpro, Dataprev, BRB e CAESB contratam pela 13.303, não pela 14.133.",
  "O critério decisivo é a natureza jurídica do órgão — não a esfera (federal/estadual/municipal) nem o fato de manejar dinheiro público.",
  "Estatais licitam por regulamento interno (RLC) próprio, com regime contratual mais próximo do direito privado; não usam as modalidades da 14.133.",
  "Sobre as duas leis incidem camadas comuns: IN SGD/ME 94/2022 (TIC federal), Decreto 11.246/2022 (gestor/fiscal), LGPD, LAI e jurisprudência do TCU.",
  "Para o gestor e o fornecedor de TI, saber o regime certo define cláusulas, prazos, penalidades e a forma de medir e receber o serviço.",
],
sections: [
  {
    id: "a-pergunta",
    heading: "A pergunta que define todo o resto",
    content: `<p>Quando alguém diz "o contrato é regido pela Lei 14.133", a frase soa universal — como se a Nova Lei de Licitações fosse a constituição de toda compra pública brasileira. Não é. E partir dessa premissa errada contamina tudo o que vem depois: a cláusula de sanção citada, o prazo de recebimento usado, a forma de medir o serviço, o tipo de penalidade aplicável.</p>

<p>A primeira pergunta de qualquer contrato público de TI não é "qual cláusula aplicar", e sim <strong>qual lei rege este contrato</strong>. E a resposta depende de uma única coisa: a <strong>natureza jurídica do órgão contratante</strong>.</p>

<p>Há dois grandes regimes convivendo no Brasil, e eles não são intercambiáveis.</p>`,
  },
  {
    id: "dois-regimes",
    heading: "14.133 e 13.303: dois regimes, não um",
    content: `<p>A <strong>Lei 14.133/2021</strong> (Nova Lei de Licitações e Contratos Administrativos) substituiu a antiga 8.666/93 e o pregão da 10.520/2002 — ambas revogadas. Mas o próprio art. 1º delimita a quem ela se aplica: <strong>à Administração Pública direta, autárquica e fundacional</strong> da União, dos Estados, do Distrito Federal e dos Municípios.</p>

<p>A <strong>Lei 13.303/2016</strong> — a "Lei das Estatais" — rege as <strong>empresas públicas, as sociedades de economia mista e suas subsidiárias</strong>, em todas as esferas. Ela tem seu próprio capítulo de licitações e contratos, e cada estatal edita um <strong>Regulamento Interno de Licitações e Contratos (RLC)</strong> que detalha o procedimento.</p>

<p>São dois mundos. A 14.133 é direito público clássico — contrato administrativo com cláusulas exorbitantes, alteração unilateral, regime publicístico. A 13.303 aproxima o contrato do <strong>direito privado</strong>: a estatal compete no mercado, e seu regime de contratação foi desenhado para ter mais agilidade e flexibilidade do que o da Administração direta.</p>

<h3>O divisor de águas em uma frase</h3>
<p>Se o órgão é <strong>ministério, secretaria, autarquia (incluindo agências reguladoras) ou fundação pública</strong> → Lei 14.133. Se é <strong>empresa pública ou sociedade de economia mista</strong> → Lei 13.303.</p>`,
  },
  {
    id: "como-saber",
    heading: "Como saber qual lei rege o seu contrato",
    content: `<p>O erro recorrente é usar a esfera (federal, estadual, municipal) ou o fato de o órgão "ser do governo" como critério. Nenhum dos dois decide. O que decide é a <strong>natureza jurídica</strong>. Veja como os órgãos mais citados no setor de TI se distribuem:</p>

<h3>Regidos pela Lei 14.133 (direta, autárquica, fundacional)</h3>
<ul>
  <li><strong>Ministérios e secretarias</strong> — Administração direta.</li>
  <li><strong>Agências reguladoras</strong> — ANVISA, Anatel, ANA (autarquias especiais).</li>
  <li><strong>Autarquias estaduais e distritais</strong> — ex.: Detran-DF.</li>
  <li><strong>Órgãos do Judiciário e do Legislativo</strong> — ex.: tribunais (TRF), no que couber.</li>
</ul>

<h3>Regidos pela Lei 13.303 (estatais)</h3>
<ul>
  <li><strong>Caixa Econômica Federal</strong> — empresa pública.</li>
  <li><strong>Serpro e Dataprev</strong> — empresas públicas de TI.</li>
  <li><strong>BRB — Banco de Brasília</strong> — sociedade de economia mista.</li>
  <li><strong>CAESB</strong> (saneamento do DF) e demais companhias estaduais — sociedades de economia mista.</li>
</ul>

<p>Repare no detalhe que pega muita gente: <strong>vários "clientes federais" de peso são estatais</strong>. Quem trata um contrato da Caixa ou do Serpro como se fosse 14.133 está aplicando o regime errado desde a primeira cláusula.</p>`,
  },
  {
    id: "o-que-muda",
    heading: "O que muda na prática",
    content: `<p>A distinção não é acadêmica. Ela altera decisões concretas do dia a dia do contrato:</p>

<ul>
  <li><strong>Licitação:</strong> a 14.133 traz modalidades e procedimentos definidos em lei (pregão, concorrência, diálogo competitivo etc.). A estatal segue <strong>seu RLC</strong> — o procedimento, os prazos e os critérios estão no regulamento da empresa, não na lei geral.</li>
  <li><strong>Regime do contrato:</strong> sob a 14.133, prevalecem as prerrogativas da Administração (alteração e rescisão unilaterais, fiscalização intensa). Sob a 13.303, o contrato é mais paritário, de feição privada — o que muda a margem de negociação de cláusulas.</li>
  <li><strong>Sanções:</strong> as penalidades (advertência, multa, impedimento de licitar, declaração de inidoneidade) existem nos dois regimes, mas com bases e procedimentos distintos. Citar o artigo da lei errada invalida a fundamentação.</li>
  <li><strong>Recebimento e medição:</strong> o rito de recebimento provisório e definitivo e os instrumentos de medição de resultado seguem a lógica de cada regime e das normas infralegais aplicáveis.</li>
</ul>

<p>Para o fornecedor, a consequência é direta: a mesma proposta técnica pode precisar de cláusulas, garantias e SLAs diferentes conforme o contratante seja autarquia ou estatal.</p>`,
  },
  {
    id: "camada-normativa",
    heading: "A camada normativa por cima das duas leis",
    content: `<p>Identificar a lei-base é o começo. Sobre ela incidem normas que detalham a contratação de TI especificamente:</p>

<ul>
  <li><strong>IN SGD/ME nº 94/2022</strong> — disciplina o processo de contratação de <strong>soluções de TIC</strong> (ETP, Termo de Referência, gestão e fiscalização do contrato, Instrumento de Medição de Resultado) no âmbito dos órgãos integrantes do SISP, ou seja, a Administração direta, autárquica e fundacional <em>do Executivo federal</em>. Estatais não integram o SISP e seguem a governança de TIC dos seus próprios regulamentos.</li>
  <li><strong>Decreto 11.246/2022</strong> — regulamenta, no âmbito da 14.133, a atuação do agente de contratação, da comissão, e dos <strong>gestores e fiscais</strong> de contrato.</li>
  <li><strong>LGPD (Lei 13.709/2018)</strong> — aplica-se a qualquer contrato que trate dados pessoais, em ambos os regimes, com reforço quando o titular é o cidadão.</li>
  <li><strong>LAI (Lei 12.527/2011)</strong> — transparência e acesso à informação, que também alcança as estatais.</li>
  <li><strong>Jurisprudência do TCU</strong> — os acórdãos do Tribunal de Contas da União moldam, na prática, temas como medição por resultado, glosa e sobrepreço — e valem como referência mesmo onde a lei é silente.</li>
</ul>

<p>É essa combinação — lei-base + norma de TIC + LGPD/LAI + jurisprudência — que define o que é "conformidade" de verdade em um contrato público de tecnologia. Reduzir tudo a "Lei 14.133" é, no mínimo, incompleto.</p>`,
  },
  {
    id: "por-que-importa",
    heading: "Por que isso importa para quem opera o contrato",
    content: `<p>Para o <strong>gestor e o fiscal</strong>, errar o regime significa fiscalizar com o checklist errado: cobrar prazo de recebimento que não é o do contrato, aplicar uma penalidade pelo artigo de outra lei, exigir um documento que aquele regime não prevê. Cada um desses pontos é um flanco aberto numa eventual auditoria do controle externo.</p>

<p>Para o <strong>fornecedor de TI</strong>, é diferença de proposta: garantias, SLAs, modelo de remuneração e cláusulas de reajuste mudam conforme o contratante seja autarquia (14.133) ou estatal (13.303). Tratar os dois iguais é entregar uma proposta tecnicamente frágil.</p>

<p>É exatamente por isso que uma plataforma de gestão de contratos públicos não pode assumir um único regime. No EasyNuP, modelamos o contrato a partir do <strong>marco legal aplicável</strong> — 14.133 ou 13.303 — com as normas de TIC, a trilha de auditoria à prova de adulteração e a base para medir resultado e fundamentar decisões de glosa. A lei certa não é um detalhe de rodapé: é o alicerce de todo o resto.</p>`,
  },
],
callouts: [
  { type: "warning", title: "O cliente 'federal' que é estatal", body: "Caixa, Serpro, Dataprev e BRB têm nome de governo federal, mas são empresas estatais — contratam pela Lei 13.303/2016 e por regulamento interno próprio, não pela 14.133. Aplicar o regime da Administração direta a um contrato de estatal é erro de fundamentação desde a primeira cláusula." },
  { type: "insight", title: "O critério é a natureza jurídica", body: "Não é a esfera (federal/estadual/municipal) nem o fato de manejar dinheiro público que define a lei. É a natureza jurídica do órgão: direta/autárquica/fundacional → 14.133; empresa pública ou sociedade de economia mista → 13.303." },
  { type: "tip", title: "Confirme antes de redigir", body: "Antes de citar artigo, aplicar sanção ou montar o rito de recebimento, confirme a natureza jurídica do contratante e o regulamento interno (no caso de estatal). Cinco minutos de checagem evitam uma cláusula inteira fundamentada na lei errada." },
],
mindMap: {
  label: "Qual lei rege o contrato?",
  children: [
    { label: "Lei 14.133/2021", children: [
      { label: "Administração direta" },
      { label: "Autarquias e agências" },
      { label: "Fundações públicas" },
      { label: "Regime publicístico" },
    ]},
    { label: "Lei 13.303/2016", children: [
      { label: "Empresas públicas" },
      { label: "Sociedades de economia mista" },
      { label: "Regulamento interno (RLC)" },
      { label: "Feição de direito privado" },
    ]},
    { label: "Camada de TIC", children: [
      { label: "IN SGD/ME 94/2022" },
      { label: "Decreto 11.246/2022" },
      { label: "Jurisprudência do TCU" },
    ]},
    { label: "Transversais", children: [
      { label: "LGPD" },
      { label: "LAI" },
    ]},
  ],
},
relatedSlugs: ["lgpd-para-desenvolvedores"],
};

export default post;
