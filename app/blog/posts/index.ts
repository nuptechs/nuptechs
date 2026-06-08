import type { Post } from "../[slug]/page";

import comoAutomatizarProcessosManuais from "./como-automatizar-processos-manuais";
import llmsNoMundoCorporativo from "./llms-no-mundo-corporativo";
import comoEscolherStackTecnologica from "./como-escolher-stack-tecnologica";
import integracaoApiWhatsappBusiness from "./integracao-api-whatsapp-business";
import historiaDaTecnologia from "./historia-da-tecnologia";
import comoAutomatizarEntradaDeDadosComN8n from "./como-automatizar-entrada-de-dados-com-n8n";
import comoImplementarRagNaSuaEmpresa from "./como-implementar-rag-na-sua-empresa";
import grafanaVsMetabaseVsSuperset from "./grafana-vs-metabase-vs-superset";
import comoCriarEtlComPythonEPostgresql from "./como-criar-etl-com-python-e-postgresql";
import postgresqlVsMongodbVsMysql from "./postgresql-vs-mongodb-vs-mysql";
import webhookN8nIntegracoesSemCodigo from "./webhook-n8n-integracoes-sem-codigo";
import lgpdParaDesenvolvedores from "./lgpd-para-desenvolvedores";

export const allPosts: Record<string, Post> = {
  [comoAutomatizarProcessosManuais.slug]: comoAutomatizarProcessosManuais,
  [llmsNoMundoCorporativo.slug]: llmsNoMundoCorporativo,
  [comoEscolherStackTecnologica.slug]: comoEscolherStackTecnologica,
  [integracaoApiWhatsappBusiness.slug]: integracaoApiWhatsappBusiness,
  [historiaDaTecnologia.slug]: historiaDaTecnologia,
  [comoAutomatizarEntradaDeDadosComN8n.slug]: comoAutomatizarEntradaDeDadosComN8n,
  [comoImplementarRagNaSuaEmpresa.slug]: comoImplementarRagNaSuaEmpresa,
  [grafanaVsMetabaseVsSuperset.slug]: grafanaVsMetabaseVsSuperset,
  [comoCriarEtlComPythonEPostgresql.slug]: comoCriarEtlComPythonEPostgresql,
  [postgresqlVsMongodbVsMysql.slug]: postgresqlVsMongodbVsMysql,
  [webhookN8nIntegracoesSemCodigo.slug]: webhookN8nIntegracoesSemCodigo,
  [lgpdParaDesenvolvedores.slug]: lgpdParaDesenvolvedores,
};
