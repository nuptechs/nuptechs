import type { Post } from "../[slug]/page";

import comoAutomatizarProcessosManuais from "./como-automatizar-processos-manuais";
import llmsNoMundoCorporativo from "./llms-no-mundo-corporativo";
import dashboardBiParaPmes from "./dashboard-bi-para-pmes";
import comoEscolherStackTecnologica from "./como-escolher-stack-tecnologica";
import integracaoApiWhatsappBusiness from "./integracao-api-whatsapp-business";
import softwareSobMedidaVsSaas from "./software-sob-medida-vs-saas";
import historiaDaTecnologia from "./historia-da-tecnologia";
import comoAutomatizarEntradaDeDadosComN8n from "./como-automatizar-entrada-de-dados-com-n8n";
import roiDeAutomacaoComoCalcular from "./roi-de-automacao-como-calcular";
import comoImplementarRagNaSuaEmpresa from "./como-implementar-rag-na-sua-empresa";
import custoRealDeIaOpenaiVsClaude from "./custo-real-de-ia-openai-vs-claude";
import grafanaVsMetabaseVsSuperset from "./grafana-vs-metabase-vs-superset";
import comoCriarEtlComPythonEPostgresql from "./como-criar-etl-com-python-e-postgresql";
import postgresqlVsMongodbVsMysql from "./postgresql-vs-mongodb-vs-mysql";
import webhookN8nIntegracoesSemCodigo from "./webhook-n8n-integracoes-sem-codigo";
import lgpdParaDesenvolvedores from "./lgpd-para-desenvolvedores";
import quantoCustaSoftwareSobMedida from "./quanto-custa-software-sob-medida";
import cincoSinaisMigrarSaasParaSoftwareProprio from "./cinco-sinais-migrar-saas-para-software-proprio";

export const allPosts: Record<string, Post> = {
  [comoAutomatizarProcessosManuais.slug]: comoAutomatizarProcessosManuais,
  [llmsNoMundoCorporativo.slug]: llmsNoMundoCorporativo,
  [dashboardBiParaPmes.slug]: dashboardBiParaPmes,
  [comoEscolherStackTecnologica.slug]: comoEscolherStackTecnologica,
  [integracaoApiWhatsappBusiness.slug]: integracaoApiWhatsappBusiness,
  [softwareSobMedidaVsSaas.slug]: softwareSobMedidaVsSaas,
  [historiaDaTecnologia.slug]: historiaDaTecnologia,
  [comoAutomatizarEntradaDeDadosComN8n.slug]: comoAutomatizarEntradaDeDadosComN8n,
  [roiDeAutomacaoComoCalcular.slug]: roiDeAutomacaoComoCalcular,
  [comoImplementarRagNaSuaEmpresa.slug]: comoImplementarRagNaSuaEmpresa,
  [custoRealDeIaOpenaiVsClaude.slug]: custoRealDeIaOpenaiVsClaude,
  [grafanaVsMetabaseVsSuperset.slug]: grafanaVsMetabaseVsSuperset,
  [comoCriarEtlComPythonEPostgresql.slug]: comoCriarEtlComPythonEPostgresql,
  [postgresqlVsMongodbVsMysql.slug]: postgresqlVsMongodbVsMysql,
  [webhookN8nIntegracoesSemCodigo.slug]: webhookN8nIntegracoesSemCodigo,
  [lgpdParaDesenvolvedores.slug]: lgpdParaDesenvolvedores,
  [quantoCustaSoftwareSobMedida.slug]: quantoCustaSoftwareSobMedida,
  [cincoSinaisMigrarSaasParaSoftwareProprio.slug]: cincoSinaisMigrarSaasParaSoftwareProprio,
};
