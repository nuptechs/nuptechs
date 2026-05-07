/**
 * Template HTML do contrato SaaS — formatação tier-1 (Times New Roman, A4, margens forenses).
 * Renderiza um documento completo pronto pra impressão / "Salvar como PDF" pelo navegador.
 */

import type { Contract, ContractSystem } from "../core/ports/contract.port";
import { formatCnpj, formatCpf, formatCep } from "./cnpj";

const COMPANY = {
  razaoSocial: "YURI FRANCIS ARAUJO FERREIRA LTDA",
  nomeFantasia: "YFAF Consultoria",
  cnpj: "46.277.866/0001-45",
  endereco:
    "SGAN Quadra 905, Módulo A, Lote 04A, Anexo 01, S/N, Asa Norte, Brasília/DF, CEP 70.790-050",
  representante: "Yuri Francis Araújo Ferreira",
  representanteCargo: "Sócio-Administrador",
  foro: "Circunscrição Judiciária de Brasília, Distrito Federal",
};

function escapeHtml(s: string | null | undefined): string {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function blank(width = 30): string {
  return "_".repeat(width);
}

function brl(cents: number): string {
  const reais = (cents / 100).toFixed(2).replace(".", ",");
  return reais.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function brlExtenso(cents: number): string {
  // Mantém simples — tabela sem extenso completo. Para extenso real, usar lib.
  // Mostra só a parte numérica formatada.
  return `R$ ${brl(cents)}`;
}

function clientDocFormatted(c: Contract): string {
  return c.clientType === "pj"
    ? formatCnpj(c.clientDocument)
    : formatCpf(c.clientDocument);
}

function clientFullAddress(c: Contract): string {
  const parts = [
    c.clientAddress,
    c.clientNumber ? `nº ${c.clientNumber}` : null,
    c.clientComplement,
    c.clientNeighborhood,
    c.clientCity && c.clientState ? `${c.clientCity}/${c.clientState}` : null,
    c.clientZip ? `CEP ${formatCep(c.clientZip)}` : null,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : blank(60);
}

function systemsList(c: Contract, catalog: ContractSystem[]): string {
  const map = new Map(catalog.map((s) => [s.slug, s]));
  const items: string[] = [];
  for (const slug of c.systems) {
    const sys = map.get(slug);
    if (sys) items.push(`<li>${escapeHtml(sys.name)};</li>`);
  }
  if (c.customSystem) items.push(`<li>${escapeHtml(c.customSystem)};</li>`);
  if (items.length === 0) return "<li>Nenhum sistema selecionado.</li>";
  return items.join("\n");
}

export type RenderOptions = {
  /** Modo "draft" mostra marca d'água e desabilita assinatura. */
  draft?: boolean;
  /** URL pública para mostrar como referência no rodapé (opcional). */
  publicUrl?: string;
};

/**
 * Renderiza o contrato completo como HTML (página standalone, com print CSS).
 */
export function renderContractHtml(
  c: Contract,
  systemsCatalog: ContractSystem[],
  opts: RenderOptions = {}
): string {
  const docFormatted = clientDocFormatted(c);
  const docLabel = c.clientType === "pj" ? "CNPJ/MF" : "CPF/MF";
  const clientAddr = clientFullAddress(c);
  const valor = brlExtenso(c.monthlyValueCents);
  const fidelity = c.loyaltyMonths;
  const fineMonths = c.earlyTerminationFeeMonths;
  const customDays = c.customizationDeadlineDays;

  const css = `
    @page { size: A4; margin: 3cm 2cm 2cm 3cm; }
    @media print {
      body { background: white; }
      .no-print { display: none !important; }
      .page-break { page-break-after: always; }
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #f5f5f5;
      font-family: "Times New Roman", Times, serif;
      font-size: 12pt;
      line-height: 1.4;
      color: #111;
    }
    .sheet {
      background: white;
      max-width: 21cm;
      margin: 1.5rem auto;
      padding: 3cm 2cm 2cm 3cm;
      box-shadow: 0 4px 18px rgba(0,0,0,0.08);
      box-sizing: border-box;
    }
    @media print {
      .sheet {
        max-width: none;
        margin: 0;
        padding: 0;
        box-shadow: none;
      }
    }
    h1.title {
      text-align: center;
      font-size: 16pt;
      font-weight: bold;
      margin: 0 0 1.2em 0;
      line-height: 1.3;
    }
    h2.clausula {
      text-align: center;
      font-size: 12pt;
      font-weight: bold;
      margin: 1.6em 0 0.8em 0;
      page-break-after: avoid;
    }
    p, li {
      text-align: justify;
      margin: 0 0 0.5em 0;
      hyphens: auto;
      -webkit-hyphens: auto;
    }
    p.preamble {
      text-indent: 1.25cm;
    }
    p.party {
      text-indent: 0;
    }
    p.party b {
      font-variant: small-caps;
    }
    .considerando p {
      margin-left: 1.25cm;
      font-style: italic;
    }
    .considerando b {
      font-style: italic;
      font-variant: small-caps;
    }
    .item {
      margin-left: 0;
    }
    .item-num {
      font-weight: bold;
    }
    .sub {
      margin-left: 1.25cm;
    }
    .value-row {
      margin-left: 1.25cm;
      margin-bottom: 0.8em;
      font-weight: bold;
      font-size: 13pt;
    }
    ul.systems {
      list-style: none;
      padding-left: 1.25cm;
      margin: 0.5em 0;
    }
    ul.systems li {
      position: relative;
      padding-left: 1.4em;
      margin: 0.3em 0;
    }
    ul.systems li::before {
      content: "✔";
      position: absolute;
      left: 0;
      font-weight: bold;
    }
    .signatures {
      margin-top: 2.5em;
    }
    .sig-block {
      text-align: center;
      margin: 2em 0 0.5em 0;
    }
    .sig-line {
      border-top: 1px solid #111;
      width: 70%;
      margin: 0 auto 0.3em auto;
    }
    .sig-label {
      font-weight: bold;
      font-variant: small-caps;
    }
    .sig-detail {
      font-size: 10pt;
      color: #333;
    }
    .footer-page {
      text-align: center;
      font-size: 9pt;
      color: #555;
      font-style: italic;
      margin-top: 2em;
    }
    .draft-watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-30deg);
      font-size: 8em;
      color: rgba(220, 53, 69, 0.10);
      font-weight: bold;
      pointer-events: none;
      z-index: 9999;
      letter-spacing: 0.2em;
    }
    .topbar {
      position: sticky;
      top: 0;
      background: white;
      padding: 0.6rem 1rem;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      gap: 0.6rem;
      justify-content: flex-end;
      max-width: 21cm;
      margin: 0 auto;
      box-sizing: border-box;
    }
    .btn {
      padding: 0.5rem 0.9rem;
      border-radius: 6px;
      border: 1px solid #d4d4d4;
      background: white;
      cursor: pointer;
      font-family: inherit;
      font-size: 10pt;
    }
    .btn-primary {
      background: #111;
      color: white;
      border-color: #111;
    }
  `;

  const head = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Contrato — ${escapeHtml(c.clientName)}</title>
<style>${css}</style>
</head>
<body>
${opts.draft ? '<div class="draft-watermark no-print">RASCUNHO</div>' : ""}
<div class="topbar no-print">
  <button class="btn" onclick="window.history.back()">← Voltar</button>
  <button class="btn btn-primary" onclick="window.print()">Imprimir / Salvar PDF</button>
</div>
<div class="sheet">
`;

  const tail = `
</div>
</body>
</html>`;

  // ────────────────────────────────────────────────────────────────────
  // CORPO DO CONTRATO
  // ────────────────────────────────────────────────────────────────────
  const body = `
<h1 class="title">CONTRATO DE LICENÇA DE USO DE SOFTWARE EM REGIME DE SOFTWARE COMO SERVIÇO (SaaS) E PRESTAÇÃO DE SERVIÇOS CORRELATOS</h1>

<p class="preamble">Pelo presente instrumento particular, e na melhor forma de direito, as partes abaixo qualificadas:</p>

<p class="party"><b>Contratada</b>:</p>
<p class="preamble"><b>${COMPANY.razaoSocial}</b>, sociedade empresária limitada, com nome fantasia <b>"${COMPANY.nomeFantasia}"</b>, inscrita no CNPJ/MF sob o nº <b>${COMPANY.cnpj}</b>, com sede no ${COMPANY.endereco}, optante pelo Simples Nacional, neste ato representada por seu sócio-administrador <b>${COMPANY.representante}</b>, na forma de seu contrato social, doravante designada simplesmente <b>"CONTRATADA"</b> ou <b>"LICENCIANTE"</b>; e</p>

<p class="party"><b>Contratante</b>:</p>
<p class="preamble"><b>${escapeHtml(c.clientName)}</b>${c.clientFantasyName ? `, nome fantasia <b>"${escapeHtml(c.clientFantasyName)}"</b>` : ""}, inscrita${c.clientType === "pj" ? "" : "(o)"} no ${docLabel} sob o nº <b>${docFormatted}</b>, com sede${c.clientType === "pj" ? "" : "/residência"} em ${escapeHtml(clientAddr)}${c.representativeName ? `, neste ato representada por <b>${escapeHtml(c.representativeName)}</b>${c.representativeRole ? ` (${escapeHtml(c.representativeRole)})` : ""}${c.representativeRg ? `, portador(a) da Cédula de Identidade RG nº <b>${escapeHtml(c.representativeRg)}</b>` : ""}${c.representativeCpf ? ` e inscrito(a) no CPF/MF sob o nº <b>${escapeHtml(formatCpf(c.representativeCpf))}</b>` : ""}` : ""}, doravante designada${c.clientType === "pj" ? "" : "(o)"} simplesmente <b>"CONTRATANTE"</b> ou <b>"LICENCIADA"</b>.</p>

<p class="preamble"><b>CONTRATADA</b> e <b>CONTRATANTE</b> são denominadas, em conjunto, <b>"Partes"</b> e, individualmente, <b>"Parte"</b>.</p>

<p class="party"><b>Considerando que</b>:</p>
<div class="considerando">
<p><b>Considerando que</b> a CONTRATADA é empresa especializada em desenvolvimento e licenciamento de soluções tecnológicas e detém, em caráter exclusivo, os direitos patrimoniais sobre uma plataforma de softwares de gestão segmentados, oferecidos em regime de Software como Serviço (SaaS);</p>
<p><b>Considerando que</b> a CONTRATANTE tem interesse em licenciar uma ou mais soluções da plataforma da CONTRATADA para apoio à sua atividade empresarial, mediante o pagamento de mensalidade e nos termos a seguir estipulados;</p>
<p><b>Considerando que</b> as Partes pretendem celebrar relação contratual estável, transparente e em conformidade com a legislação aplicável, em especial a Lei nº 9.609/1998 (Lei de Software), a Lei nº 9.610/1998 (Lei de Direitos Autorais), a Lei nº 10.406/2002 (Código Civil), a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais — LGPD), a Lei nº 12.965/2014 (Marco Civil da Internet) e demais normas correlatas;</p>
</div>

<p class="preamble">Resolvem as Partes celebrar o presente Contrato de Licença de Uso de Software em Regime de Software como Serviço (SaaS) e Prestação de Serviços Correlatos (doravante, "Contrato"), o qual se regerá pelas cláusulas e condições a seguir estabelecidas.</p>

<h2 class="clausula">CLÁUSULA PRIMEIRA — DAS DEFINIÇÕES</h2>
<p class="item"><span class="item-num">1.1.</span> Para os fins do presente Contrato, os termos a seguir terão os significados que lhes são atribuídos, podendo ser empregados no singular ou no plural, conforme o contexto:</p>
<p class="sub"><b>1.1.1.</b> "Software" ou "Plataforma": conjunto de programas de computador e respectivos sistemas de propriedade exclusiva da CONTRATADA, hospedados em ambiente de nuvem, oferecidos sob a modalidade Software como Serviço (SaaS);</p>
<p class="sub"><b>1.1.2.</b> "Acesso": autenticação por meio de credencial individual (login e senha) atribuída ao Usuário Autorizado da CONTRATANTE para utilização do Software via internet;</p>
<p class="sub"><b>1.1.3.</b> "Usuário Autorizado": pessoa natural a quem a CONTRATANTE conceder credencial de acesso, observados os limites e a finalidade descritos neste Contrato;</p>
<p class="sub"><b>1.1.4.</b> "Vendedor": pessoa cadastrada pela CONTRATANTE como Usuário Autorizado para registrar e/ou intermediar vendas dentro do Software, atuando exclusivamente em nome e interesse da CONTRATANTE;</p>
<p class="sub"><b>1.1.5.</b> "Personalização Visual Básica": serviço gratuito, prestado uma única vez, consistente em adequação de elementos da interface gráfica do Software à identidade visual da CONTRATANTE;</p>
<p class="sub"><b>1.1.6.</b> "Desenvolvimento Adicional": qualquer modificação, customização, evolução, integração ou nova funcionalidade que extrapole a Personalização Visual Básica, contratada à parte mediante orçamento específico e Termo Aditivo;</p>
<p class="sub"><b>1.1.7.</b> "Dados Pessoais", "Tratamento", "Titular", "Controlador", "Operador" e "ANPD": expressões empregadas conforme as definições da Lei nº 13.709/2018 (LGPD).</p>

<h2 class="clausula">CLÁUSULA SEGUNDA — DO OBJETO</h2>
<p class="item"><span class="item-num">2.1.</span> Constitui objeto do presente Contrato a concessão, pela CONTRATADA à CONTRATANTE, de licença de uso, não exclusiva, intransferível, onerosa, limitada territorialmente ao Brasil e por prazo determinado, do(s) seguinte(s) Software(s) de propriedade exclusiva da CONTRATADA, na modalidade Software como Serviço (SaaS):</p>
<ul class="systems">
${systemsList(c, systemsCatalog)}
</ul>
<p class="item"><span class="item-num">2.2.</span> A licença ora outorgada compreende a hospedagem do Software em ambiente de nuvem, manutenção corretiva, atualizações evolutivas, suporte técnico ao Usuário Autorizado e Personalização Visual Básica, sem custo adicional, observada a Cláusula Terceira.</p>
<p class="item"><span class="item-num">2.3.</span> O presente Contrato não transfere à CONTRATANTE qualquer direito de propriedade sobre o Software, seus códigos-fonte, código-objeto, bancos de dados estruturais, documentação, marcas, layouts, fluxos, algoritmos ou demais elementos intelectuais, os quais permanecem de titularidade exclusiva da CONTRATADA.</p>

<h2 class="clausula">CLÁUSULA TERCEIRA — DA PERSONALIZAÇÃO VISUAL BÁSICA</h2>
<p class="item"><span class="item-num">3.1.</span> A CONTRATADA realizará, sem custo adicional para a CONTRATANTE, uma única Personalização Visual Básica do Software, compreendendo (i) inserção do logotipo fornecido pela CONTRATANTE em formato vetorial ou em arquivo de alta resolução; (ii) aplicação de até 2 (duas) cores primárias da identidade visual da CONTRATANTE; (iii) inserção do nome fantasia da CONTRATANTE em pontos visíveis da interface.</p>
<p class="item"><span class="item-num">3.2.</span> A entrega da Personalização Visual Básica ocorrerá no prazo máximo de <b>${customDays} (${numberToWords(customDays)}) dias corridos</b> contados da assinatura do presente Contrato, condicionada ao envio prévio, pela CONTRATANTE, de todos os elementos visuais necessários (logotipo, cores e nome) em formatos adequados.</p>
<p class="item"><span class="item-num">3.3.</span> Caso a CONTRATANTE não forneça os elementos visuais no prazo de 5 (cinco) dias corridos contados da assinatura, o prazo de entrega será automaticamente prorrogado, dia a dia, pelo tempo equivalente ao atraso na entrega dos materiais, sem que tal prorrogação configure descumprimento contratual da CONTRATADA.</p>
<p class="item"><span class="item-num">3.4.</span> A Personalização Visual Básica não compreende: (i) alteração de fluxos, regras de negócio, layouts internos ou estrutura do Software; (ii) criação de novas telas, módulos, relatórios ou integrações; (iii) desenvolvimento de aplicativos móveis dedicados; (iv) tradução para outros idiomas; (v) qualquer outro serviço não expressamente listado, os quais, se contratados, serão tratados como Desenvolvimento Adicional, na forma da Cláusula Sétima.</p>
<p class="item"><span class="item-num">3.5.</span> A CONTRATANTE declara, sob as penas da lei, ser titular ou estar devidamente autorizada a utilizar os elementos visuais entregues à CONTRATADA, eximindo esta de qualquer responsabilidade por eventual violação de direitos de terceiros.</p>

<h2 class="clausula">CLÁUSULA QUARTA — DA LICENÇA DE USO E DE SEUS LIMITES</h2>
<p class="item"><span class="item-num">4.1.</span> A licença ora outorgada à CONTRATANTE é não exclusiva, intransferível, indivisível, onerosa, sem direito de sublicenciamento e restrita ao uso pessoal e interno da CONTRATANTE, exclusivamente para finalidades lícitas relacionadas à sua atividade empresarial.</p>
<p class="item"><span class="item-num">4.2.</span> A CONTRATANTE poderá conceder credenciais de acesso a Vendedores e demais Usuários Autorizados que atuem em seu nome e sob sua responsabilidade direta, sendo as credenciais pessoais e intransferíveis e respondendo a CONTRATANTE, civil e criminalmente, por todos os atos praticados pelos Usuários Autorizados no Software.</p>
<p class="item"><span class="item-num">4.3.</span> É expressamente vedado à CONTRATANTE, sob pena de rescisão imediata e responsabilização civil e criminal: (i) sublicenciar, ceder, alugar, emprestar, revender, comercializar ou de qualquer forma transferir a terceiros, total ou parcialmente, o acesso ou os direitos decorrentes deste Contrato; (ii) utilizar o Software para prestação de serviços a terceiros que não sejam clientes finais da CONTRATANTE; (iii) realizar engenharia reversa, descompilação ou desmontagem do Software, salvo nos estritos limites do art. 6º, IV, da Lei nº 9.609/1998; (iv) remover, alterar ou suprimir avisos de propriedade intelectual da CONTRATADA; (v) utilizar o Software para fins ilícitos ou em desacordo com a legislação vigente.</p>

<h2 class="clausula">CLÁUSULA QUINTA — DA REMUNERAÇÃO, DO REAJUSTE E DO INADIMPLEMENTO</h2>
<p class="item"><span class="item-num">5.1.</span> Pela licença de uso do Software e pelos demais serviços previstos neste Contrato, a CONTRATANTE pagará à CONTRATADA mensalidade no valor de:</p>
<p class="value-row">${valor}</p>
<p class="item"><span class="item-num">5.1.1.</span> O pagamento será realizado até o dia <b>${c.paymentDay}</b> de cada mês subsequente ao da prestação, por boleto bancário, PIX, transferência eletrônica ou outra forma de pagamento previamente acordada entre as Partes.</p>
<p class="item"><span class="item-num">5.2.</span> O primeiro pagamento será devido na data da assinatura deste Contrato, em valor proporcional aos dias restantes do mês corrente, ou na data prevista na proposta comercial.</p>
<p class="item"><span class="item-num">5.3.</span> A mensalidade será reajustada anualmente, a contar da data de assinatura deste Contrato, pela variação positiva acumulada do Índice Nacional de Preços ao Consumidor Amplo (IPCA/IBGE) no período, ou, na sua falta ou extinção, pelo índice oficial que venha a substituí-lo.</p>
<p class="item"><span class="item-num">5.4.</span> O atraso no pagamento sujeitará a CONTRATANTE, cumulativamente: (i) à correção monetária pelo IPCA/IBGE pro rata die; (ii) a juros moratórios de 1% (um por cento) ao mês; (iii) a multa moratória de 2% (dois por cento) sobre o valor em atraso; (iv) à possibilidade de suspensão do acesso a partir do 6º (sexto) dia de inadimplemento, mediante prévia notificação; (v) à rescisão por justa causa após 30 (trinta) dias, sem prejuízo da multa rescisória prevista na Cláusula Sexta.</p>
<p class="item"><span class="item-num">5.5.</span> A CONTRATANTE autoriza, desde já, a inclusão de seu nome em órgãos de proteção ao crédito (SPC, Serasa e equivalentes) e o protesto extrajudicial dos títulos não pagos após 30 (trinta) dias do respectivo vencimento.</p>
<p class="item"><span class="item-num">5.6.</span> A não utilização do Software pela CONTRATANTE, por qualquer motivo, não a desonera do pagamento das mensalidades enquanto vigente o Contrato.</p>

<h2 class="clausula">CLÁUSULA SEXTA — DA VIGÊNCIA, DA FIDELIDADE E DA MULTA RESCISÓRIA</h2>
<p class="item"><span class="item-num">6.1.</span> O presente Contrato vigorará pelo prazo de <b>${fidelity} (${numberToWords(fidelity)}) meses</b>, contados da data de sua assinatura, prazo este denominado "Período de Fidelidade".</p>
<p class="item"><span class="item-num">6.2.</span> Ao término do Período de Fidelidade, o Contrato será automaticamente prorrogado por prazo indeterminado, mantidas as mesmas condições, salvo manifestação em contrário de qualquer das Partes, mediante notificação escrita com antecedência mínima de 30 (trinta) dias.</p>
<p class="item"><span class="item-num">6.3.</span> Após o término do Período de Fidelidade, qualquer das Partes poderá denunciar o Contrato sem justa causa, mediante notificação por escrito com antecedência mínima de 30 (trinta) dias, sem incidência de multa rescisória.</p>
<p class="item"><span class="item-num">6.4.</span> Em caso de rescisão deste Contrato pela CONTRATANTE, ou pela CONTRATADA por culpa exclusiva da CONTRATANTE, antes do término do Período de Fidelidade, a CONTRATANTE pagará à CONTRATADA, a título de <b>multa rescisória compensatória</b>, e não meramente moratória, importância equivalente a <b>${fineMonths} (${numberToWords(fineMonths)}) mensalidades</b> vigentes na data da rescisão, sem prejuízo do pagamento integral das mensalidades vencidas e não pagas.</p>
<p class="item"><span class="item-num">6.5.</span> A multa rescisória prevista na Cláusula 6.4 não será devida nas hipóteses de rescisão por culpa exclusiva da CONTRATADA, devidamente comprovada, ou de caso fortuito ou força maior que torne objetivamente impossível a continuidade da prestação.</p>
<p class="item"><span class="item-num">6.6.</span> As Partes reconhecem expressamente que o Período de Fidelidade tem por finalidade compensar os custos da CONTRATADA com a Personalização Visual Básica, a configuração inicial, a alocação de equipe e a estruturação do ambiente em nuvem dedicados à CONTRATANTE, sendo razoável e proporcional o valor da multa rescisória pactuada.</p>

<h2 class="clausula">CLÁUSULA SÉTIMA — DOS DESENVOLVIMENTOS ADICIONAIS E EVOLUÇÕES</h2>
<p class="item"><span class="item-num">7.1.</span> Os Softwares ora licenciados são oferecidos em modalidade padrão, "tal como existem" na data da assinatura, sem prejuízo das atualizações evolutivas e correções aplicadas indistintamente a toda a base de clientes da CONTRATADA.</p>
<p class="item"><span class="item-num">7.2.</span> A CONTRATANTE poderá, a qualquer tempo e independentemente da Personalização Visual Básica, contratar à parte, junto à CONTRATADA, Desenvolvimentos Adicionais, compreendendo, sem caráter exaustivo: criação de novas funcionalidades, módulos, telas ou relatórios específicos; evolução, alteração ou expansão de funcionalidades existentes; integrações com sistemas, APIs, gateways de pagamento, ERPs ou plataformas de terceiros; desenvolvimento de aplicativos móveis dedicados; consultoria, treinamento avançado e implantação assistida; serviços de migração de dados de outros sistemas.</p>
<p class="item"><span class="item-num">7.3.</span> Os Desenvolvimentos Adicionais serão sempre objeto de orçamento prévio, escrito, contendo descrição do escopo, prazo de execução, valor, forma de pagamento e demais condições, formalizando-se mediante Termo Aditivo, Ordem de Serviço ou Proposta Comercial assinada pela CONTRATANTE, os quais passarão a integrar este Contrato como parte integrante e indivisível.</p>
<p class="item"><span class="item-num">7.4.</span> Os valores dos Desenvolvimentos Adicionais serão livremente negociados entre as Partes, podendo ser cobrados por hora técnica, por entrega/escopo fechado ou por modelo híbrido.</p>
<p class="item"><span class="item-num">7.5.</span> A propriedade intelectual sobre os Desenvolvimentos Adicionais, ainda que custeados pela CONTRATANTE, permanecerá com a CONTRATADA, sendo concedida à CONTRATANTE licença de uso nos mesmos moldes deste Contrato, salvo disposição expressa em contrário no respectivo Termo Aditivo.</p>

<h2 class="clausula">CLÁUSULA OITAVA — DAS OBRIGAÇÕES DAS PARTES</h2>
<p class="item"><span class="item-num">8.1.</span> Cabe à CONTRATADA: (i) disponibilizar o Software em ambiente de nuvem, na forma e nos prazos contratados; (ii) realizar a Personalização Visual Básica nos termos da Cláusula Terceira; (iii) prestar suporte técnico em horário comercial; (iv) adotar medidas técnicas e administrativas razoáveis para proteção dos dados; (v) comunicar previamente, sempre que possível, manutenções programadas; (vi) cumprir a legislação aplicável, em especial a LGPD.</p>
<p class="item"><span class="item-num">8.2.</span> Cabe à CONTRATANTE: (i) efetuar pontualmente os pagamentos das mensalidades; (ii) fornecer em tempo hábil os elementos da Personalização Visual Básica; (iii) utilizar o Software de forma diligente, lícita e em conformidade com este Contrato; (iv) manter sob sua guarda e responsabilidade as credenciais de acesso, respondendo por todos os atos praticados por seus Usuários Autorizados; (v) comunicar imediatamente à CONTRATADA qualquer Incidente de Segurança; (vi) observar a legislação aplicável aos dados pessoais por ela inseridos no Software, especialmente na qualidade de Controlador.</p>

<h2 class="clausula">CLÁUSULA NONA — DA PROPRIEDADE INTELECTUAL</h2>
<p class="item"><span class="item-num">9.1.</span> A CONTRATADA é a única e legítima titular de todos os direitos de propriedade intelectual sobre o Software e seus elementos constitutivos, incluindo, sem limitação, código-fonte, código-objeto, estruturas de bancos de dados, fluxos, layouts, telas, interfaces, marcas, logotipos, manuais e documentação técnica, sendo tais direitos protegidos pela Lei nº 9.609/1998, pela Lei nº 9.610/1998 e pela legislação correlata.</p>
<p class="item"><span class="item-num">9.2.</span> Este Contrato confere à CONTRATANTE tão somente uma licença de uso do Software, nas condições e nos limites estabelecidos, não importando, em hipótese alguma, transferência ou cessão de qualquer direito de propriedade intelectual.</p>
<p class="item"><span class="item-num">9.3.</span> Os dados, conteúdos e informações inseridos pela CONTRATANTE no Software permanecem de sua exclusiva titularidade, cabendo à CONTRATADA tratá-los, na qualidade de Operadora, exclusivamente para os fins deste Contrato.</p>

<h2 class="clausula">CLÁUSULA DÉCIMA — DA PROTEÇÃO DE DADOS PESSOAIS (LGPD)</h2>
<p class="item"><span class="item-num">10.1.</span> As Partes obrigam-se a tratar quaisquer Dados Pessoais a que tenham acesso em razão deste Contrato em estrita observância à Lei nº 13.709/2018 (LGPD).</p>
<p class="item"><span class="item-num">10.2.</span> Para os fins da LGPD, a CONTRATANTE atua, em regra, na qualidade de <b>Controladora</b> dos dados pessoais por ela inseridos no Software (de seus clientes finais, fornecedores, colaboradores, vendedores e demais titulares); a CONTRATADA atua, em regra, na qualidade de <b>Operadora</b>, realizando o tratamento por conta e em nome da CONTRATANTE, observados os limites e instruções deste Contrato.</p>
<p class="item"><span class="item-num">10.3.</span> A CONTRATADA, na qualidade de Operadora, obriga-se a: (i) tratar os dados somente conforme instruções da CONTRATANTE; (ii) adotar medidas técnicas e administrativas razoáveis e proporcionais ao risco; (iii) não transferir dados a terceiros, exceto a subcontratados envolvidos na operação do Software (provedores de hospedagem em nuvem); (iv) comunicar à CONTRATANTE qualquer Incidente de Segurança em prazo razoável e tecnicamente viável; (v) auxiliar a CONTRATANTE no atendimento a requisições de titulares; (vi) eliminar ou devolver os dados pessoais ao término do Contrato.</p>
<p class="item"><span class="item-num">10.4.</span> Ao término deste Contrato, a CONTRATADA disponibilizará à CONTRATANTE, pelo prazo máximo de 30 (trinta) dias, ferramenta para exportação dos dados em formato estruturado e de uso comum (CSV, JSON, PDF ou equivalente). Decorrido tal prazo, os dados poderão ser eliminados, ressalvada a guarda mínima exigida pela legislação aplicável.</p>

<h2 class="clausula">CLÁUSULA DÉCIMA PRIMEIRA — DO NÍVEL DE SERVIÇO (SLA) E DO SUPORTE</h2>
<p class="item"><span class="item-num">11.1.</span> A CONTRATADA empenhar-se-á em manter a disponibilidade média mensal do Software em, no mínimo, 98% (noventa e oito por cento), excluídas as hipóteses de manutenção programada, caso fortuito, força maior, falhas de conectividade ou infraestrutura externa, uso indevido do Software e suspensão por inadimplemento.</p>
<p class="item"><span class="item-num">11.2.</span> O suporte técnico será prestado de segunda a sexta-feira, exceto feriados nacionais, em horário comercial (das 9h às 18h, horário de Brasília), por canais oficiais informados pela CONTRATADA, com prazos máximos de primeira resposta de 4h (críticos), 8h (alto), 16h (médio) e 24h (baixo) horas úteis, conforme severidade.</p>

<h2 class="clausula">CLÁUSULA DÉCIMA SEGUNDA — DA CONFIDENCIALIDADE E DA LIMITAÇÃO DE RESPONSABILIDADE</h2>
<p class="item"><span class="item-num">12.1.</span> As Partes obrigam-se a manter sigilo absoluto sobre toda e qualquer informação confidencial a que tenham acesso em razão deste Contrato, pelo prazo de 5 (cinco) anos contados do término, ressalvadas as obrigações decorrentes de lei ou ordem judicial.</p>
<p class="item"><span class="item-num">12.2.</span> A responsabilidade total e cumulativa da CONTRATADA, decorrente ou relacionada a este Contrato, fica limitada ao valor equivalente às últimas 12 (doze) mensalidades efetivamente pagas, salvo nos casos de dolo, culpa grave, violação de obrigações de confidencialidade ou descumprimento doloso da LGPD.</p>
<p class="item"><span class="item-num">12.3.</span> Nenhuma das Partes será responsável por lucros cessantes, danos indiretos, perda de oportunidade de negócio ou danos reflexos.</p>

<h2 class="clausula">CLÁUSULA DÉCIMA TERCEIRA — DA RESCISÃO</h2>
<p class="item"><span class="item-num">13.1.</span> O presente Contrato poderá ser rescindido: (i) pelo decurso natural do prazo; (ii) por mútuo acordo entre as Partes, formalizado por escrito; (iii) por denúncia imotivada, após o Período de Fidelidade, com aviso prévio de 30 (trinta) dias; (iv) por justa causa, em caso de descumprimento de qualquer obrigação contratual não sanado no prazo de 15 (quinze) dias contados de notificação escrita; (v) imediatamente, em caso de decretação de falência, recuperação judicial ou extrajudicial, descumprimento das vedações da Cláusula 4.3 ou inadimplemento superior a 30 (trinta) dias.</p>
<p class="item"><span class="item-num">13.2.</span> A rescisão não desonera a Parte inadimplente das obrigações já vencidas, das perdas e danos comprovados, da multa rescisória prevista na Cláusula Sexta e dos pagamentos referentes aos Desenvolvimentos Adicionais já contratados.</p>

<h2 class="clausula">CLÁUSULA DÉCIMA QUARTA — DAS DISPOSIÇÕES GERAIS</h2>
<p class="item"><span class="item-num">14.1.</span> Este Contrato representa o entendimento integral entre as Partes em relação ao seu objeto, prevalecendo sobre quaisquer entendimentos anteriores. Termos Aditivos integrarão este Contrato como parte integrante e indivisível.</p>
<p class="item"><span class="item-num">14.2.</span> A tolerância de qualquer das Partes quanto ao descumprimento de obrigações da outra não constituirá novação, renúncia ou alteração das disposições contratuais, configurando mera liberalidade.</p>
<p class="item"><span class="item-num">14.3.</span> A nulidade ou ineficácia de qualquer cláusula deste Contrato não afetará a validade das demais.</p>
<p class="item"><span class="item-num">14.4.</span> O presente Contrato é celebrado em caráter intuitu personae em relação à CONTRATANTE, sendo vedada a cessão de sua posição contratual sem prévia e expressa anuência escrita da CONTRATADA.</p>
<p class="item"><span class="item-num">14.5.</span> As Partes poderão se comunicar por meio eletrônico, reconhecendo a validade jurídica de tais comunicações para todos os fins deste Contrato, nos termos do art. 10, §2º, da MP nº 2.200-2/2001 e da Lei nº 14.063/2020.</p>
<p class="item"><span class="item-num">14.6.</span> Este Contrato poderá ser assinado de forma física ou eletrônica, mediante plataformas de assinatura digital ou eletrônica idôneas, com a mesma validade jurídica entre as Partes.</p>

<h2 class="clausula">CLÁUSULA DÉCIMA QUINTA — DO FORO</h2>
<p class="item"><span class="item-num">15.1.</span> Fica eleito o foro da ${COMPANY.foro}, para dirimir quaisquer questões oriundas do presente Contrato, com renúncia expressa a qualquer outro, por mais privilegiado que seja.</p>

<p class="preamble" style="margin-top: 1.5em;">E, por estarem assim justas e contratadas, as Partes assinam o presente instrumento em 2 (duas) vias de igual teor e forma, na presença das testemunhas abaixo, ou, alternativamente, mediante assinatura eletrônica idônea, para que produza seus jurídicos e legais efeitos.</p>

<p style="text-align: right; margin-top: 1.5em;">Brasília/DF, ______ de ______________________ de ${new Date().getFullYear()}.</p>

<div class="signatures">
  <div class="sig-block">
    <div class="sig-line"></div>
    <div class="sig-label">Contratada</div>
    <div class="sig-detail">${COMPANY.razaoSocial} — ${COMPANY.nomeFantasia}</div>
    <div class="sig-detail">CNPJ ${COMPANY.cnpj} — ${COMPANY.representante} (${COMPANY.representanteCargo})</div>
  </div>

  <div class="sig-block">
    <div class="sig-line"></div>
    <div class="sig-label">Contratante</div>
    <div class="sig-detail">${escapeHtml(c.clientName)}${c.clientFantasyName ? ` — ${escapeHtml(c.clientFantasyName)}` : ""}</div>
    <div class="sig-detail">${docLabel} ${docFormatted}${c.representativeName ? ` — ${escapeHtml(c.representativeName)}` : ""}</div>
  </div>

  <p style="margin-top: 2em;"><b>Testemunhas:</b></p>
  <p>1. _______________________________ &nbsp;&nbsp; Nome: _______________________________ &nbsp;&nbsp; CPF: ____________________</p>
  <p>2. _______________________________ &nbsp;&nbsp; Nome: _______________________________ &nbsp;&nbsp; CPF: ____________________</p>
</div>
`;

  return head + body + tail;
}

// ─── Helper: número por extenso (apenas para uso local nos prazos) ─────
function numberToWords(n: number): string {
  const map: Record<number, string> = {
    1: "um", 2: "dois", 3: "três", 4: "quatro", 5: "cinco",
    6: "seis", 7: "sete", 8: "oito", 9: "nove", 10: "dez",
    11: "onze", 12: "doze", 15: "quinze", 20: "vinte",
    24: "vinte e quatro", 30: "trinta", 60: "sessenta", 90: "noventa",
  };
  return map[n] ?? String(n);
}
