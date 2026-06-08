import type { Post } from "../[slug]/page";

const post: Post = {
slug: "postgresql-vs-mongodb-vs-mysql",
tag: "Desenvolvimento Ágil",
title: "PostgreSQL vs. MongoDB vs. MySQL: guia definitivo para escolher em 2026",
description: "Comparativo técnico e prático dos três bancos de dados mais usados — com critérios claros, tabela de decisão e análise de quando usar cada um (ou mais de um).",
keywords: ["PostgreSQL vs MongoDB", "MySQL vs PostgreSQL 2026", "banco de dados relacional vs NoSQL", "quando usar MongoDB", "como escolher banco de dados", "pgvector embeddings", "banco de dados para SaaS", "migração MySQL para PostgreSQL"],
readTime: "26 min",
publishedAt: "2026-02-23",
updatedAt: "2026-02-23",
author: { name: "Yuri Francis", role: "Fundador, NuPtechs" },
executiveSummary: "A escolha do banco de dados é a decisão técnica mais difícil de reverter em um projeto. PostgreSQL é a resposta correta para 80% dos novos projetos — relacional, ACID, com JSON nativo, busca vetorial (pgvector) e geoespacial (PostGIS). MongoDB é a escolha certa para dados com estrutura altamente variável e escrita intensiva (IoT, logs, catálogos). MySQL mantém relevância em stacks legadas PHP/WordPress. Este guia compara os três em 12 critérios técnicos, apresenta benchmarks reais de performance, analisa custos operacionais por perfil e mostra como arquitetar sistemas multi-banco que usam o banco certo para cada tipo de dado.",
keyTakeaways: [
  "PostgreSQL resolve 80% dos casos — é relacional, robusto, open-source e cresce sem reescrever",
  "MongoDB brilha para documentos com estrutura variável e escrita intensiva (IoT, logs, catálogos)",
  "MySQL ainda domina em hospedagem compartilhada e stacks LAMP legadas — menos features que PostgreSQL",
  "A escolha mais importante: não é qual banco, é garantir que os dados têm integridade desde o início",
  "Usar múltiplos bancos é uma estratégia válida — PostgreSQL + Redis + S3 é combinação clássica",
  "Custo de migração entre bancos é 5-20× maior que o custo de escolher certo no início",
],
sections: [
  {
    id: "premissa",
    heading: "A premissa errada que leva à escolha errada",
    content: `<p>A pergunta "qual banco é melhor?" está errada. A pergunta correta é <strong>"qual banco é melhor para este modelo de dados, este volume e esta equipe?"</strong></p>
<p>Cada banco foi otimizado para cenários específicos. Usar MongoDB como se fosse relacional (com joins manuais na aplicação) é doloroso. Usar PostgreSQL para dados hierárquicos altamente variáveis é possível, mas trabalhoso.</p>
<p>Os três erros mais comuns na escolha:</p>
<ol>
  <li><strong>Escolher por hype:</strong> "MongoDB é NoSQL, NoSQL é moderno, vou usar MongoDB". NoSQL não é sinônimo de moderno — é uma ferramenta para problemas específicos.</li>
  <li><strong>Escolher pelo que a big tech usa:</strong> Facebook usa Cassandra para dados de 3 bilhões de usuários. Você tem 3.000 usuários. O contexto é completamente diferente.</li>
  <li><strong>Não escolher (usar qualquer um):</strong> "Banco é banco, tanto faz". Essa decisão vai custar 6 meses de migração dolorosa quando bater em algum limite.</li>
</ol>
<p>Este guia te dá os critérios para fazer a escolha certa — com dados, não opinião.</p>`,
  },
  {
    id: "postgresql",
    heading: "PostgreSQL: o banco de dados padrão do mundo moderno",
    content: `<p>PostgreSQL é o banco relacional open-source mais avançado disponível. Em 2026, acumula funcionalidades que antes existiam apenas em bancos enterprise caros (Oracle, SQL Server) — sem custo de licença.</p>

<h3>Core features que definem PostgreSQL</h3>
<ul>
  <li><strong>ACID completo:</strong> Transações robustas com isolation levels configuráveis (Read Committed até Serializable). Sem perda de dados, sem inconsistências.</li>
  <li><strong>JSON nativo (jsonb):</strong> Coluna jsonb com indexação GIN permite armazenar e consultar dados semiestruturados com performance excelente. Em muitos casos, elimina a necessidade de MongoDB.</li>
  <li><strong>Full-text search:</strong> Busca textual com ranking nativo (ts_vector, ts_query). Para volumes até ~5M de documentos, elimina Elasticsearch.</li>
  <li><strong>pgvector:</strong> Busca vetorial (embeddings de IA) direto no banco — até ~5M vetores com performance aceitável. Sem precisar de Pinecone ou Weaviate.</li>
  <li><strong>Row-level security (RLS):</strong> Políticas de acesso a nível de linha, nativas. Ideal para multi-tenancy: cada tenant vê apenas seus dados sem lógica extra na aplicação.</li>
  <li><strong>Extensões poderosas:</strong> PostGIS (geoespacial, padrão da indústria), TimescaleDB (séries temporais), pgcrypto (criptografia), pg_stat_statements (análise de queries).</li>
  <li><strong>Particionamento nativo:</strong> Tabelas com bilhões de registros divididas automaticamente por data, região ou qualquer critério.</li>
  <li><strong>Logical replication:</strong> Réplicas de leitura sem downtime, CDC (Change Data Capture) para streaming de eventos.</li>
</ul>

<h3>Performance do PostgreSQL em 2026</h3>
<table>
  <thead><tr><th>Cenário</th><th>Volume</th><th>Performance</th></tr></thead>
  <tbody>
    <tr><td>Leituras simples (SELECT por PK)</td><td>10M registros</td><td>&lt;1ms por query</td></tr>
    <tr><td>JOINs complexos (3-4 tabelas)</td><td>10M registros</td><td>5-50ms com índices</td></tr>
    <tr><td>Full-text search</td><td>5M documentos</td><td>10-100ms</td></tr>
    <tr><td>Busca vetorial (pgvector)</td><td>1M vetores 1536-dim</td><td>20-100ms</td></tr>
    <tr><td>Escrita transacional</td><td>Pico</td><td>~10-30k writes/seg (single node)</td></tr>
    <tr><td>JSON queries (jsonb)</td><td>1M docs</td><td>5-30ms com GIN index</td></tr>
  </tbody>
</table>

<h3>Quando PostgreSQL NÃO é suficiente</h3>
<ul>
  <li><strong>Escrita com throughput absurdo:</strong> >100k writes/seg sem batch — considere Cassandra, ScyllaDB ou TimescaleDB.</li>
  <li><strong>Clustering horizontal automático:</strong> PostgreSQL escala verticalmente muito bem e horizontalmente com read replicas, mas não tem sharding automático nativo como MongoDB ou CockroachDB.</li>
  <li><strong>Dados efêmeros de altíssimo volume:</strong> Logs de acesso com 100M+ registros/dia — considere ClickHouse ou banco de séries temporais.</li>
</ul>`,
  },
  {
    id: "mongodb",
    heading: "MongoDB: o banco certo para o modelo de documento",
    content: `<p>MongoDB é frequentemente mal utilizado — ora como substituto do relacional (péssima ideia), ora como "banco para startups" sem critério técnico. Quando usado para o que foi projetado, é excelente.</p>

<h3>Core features que definem MongoDB</h3>
<ul>
  <li><strong>Schema flexível:</strong> Cada documento pode ter estrutura diferente na mesma collection. Ideal para catálogos onde cada produto tem atributos únicos.</li>
  <li><strong>Sharding automático:</strong> Distribuição horizontal de dados entre nós. Configuração simples comparada ao PostgreSQL Citus.</li>
  <li><strong>Atlas (gerenciado):</strong> Experiência de developer experience excelente — deploy em 3 cliques com monitoramento, backup e alertas incluídos.</li>
  <li><strong>Aggregation Pipeline:</strong> Framework de processamento de dados potente, similar a SQL com GROUP BY/HAVING mas mais expressivo para dados hierárquicos.</li>
  <li><strong>Change Streams:</strong> Reatividade nativa — aplicações podem escutar mudanças em tempo real (similar a CDC do PostgreSQL).</li>
  <li><strong>Atlas Search:</strong> Full-text search integrado (baseado em Apache Lucene), eliminando necessidade de Elasticsearch em ecossistema MongoDB.</li>
</ul>

<h3>Quando MongoDB brilha</h3>
<table>
  <thead><tr><th>Caso de uso</th><th>Por que MongoDB</th><th>Exemplo real</th></tr></thead>
  <tbody>
    <tr><td>Catálogo com atributos variáveis</td><td>Cada doc tem schema próprio</td><td>E-commerce com eletrônicos (specs técnicas) e roupas (tamanhos, cores)</td></tr>
    <tr><td>IoT / dados de sensores</td><td>Escrita intensiva, leitura eventual</td><td>100k sensores enviando 1 leitura/seg = 8.6B docs/dia</td></tr>
    <tr><td>Logs de aplicação</td><td>Volume alto, schema variável por tipo</td><td>Logs de API, eventos de UX, erros com stack trace</td></tr>
    <tr><td>Content Management</td><td>Documentos com estrutura hierárquica</td><td>Blog com tipos de conteúdo diferentes (artigo, vídeo, podcast)</td></tr>
    <tr><td>Gaming / leaderboards</td><td>Leituras rápidas, schema flexível</td><td>Perfis de jogadores com inventários de itens variáveis</td></tr>
  </tbody>
</table>

<h3>Quando MongoDB é a escolha errada</h3>
<ul>
  <li><strong>Dados fortemente relacionados:</strong> Pedidos com itens, pagamentos, clientes, endereços — tudo interligado. JOINs no MongoDB ($lookup) são lentos e verbosos. Use relacional.</li>
  <li><strong>Transações multi-documento frequentes:</strong> MongoDB tem transações multi-documento desde v4.0, mas são significativamente mais lentas que em bancos relacionais. Se >30% das operações são transacionais, relacional é melhor.</li>
  <li><strong>Relatórios e analytics:</strong> Aggregation Pipeline é potente mas a sintaxe é complexa. SQL é mais legível para queries analíticas e possui ecossistema BI muito mais maduro.</li>
  <li><strong>"Banco para startups":</strong> A ausência de schema validation não elimina a necessidade de modelagem. Apenas transfere a validação do banco para a aplicação — onde é mais frágil.</li>
</ul>`,
  },
  {
    id: "mysql",
    heading: "MySQL: legado dominante que ainda tem seu lugar",
    content: `<p>MySQL ainda é o banco mais instalado do mundo — herdado de décadas de stacks LAMP (Linux, Apache, MySQL, PHP). Em 2026, perdeu terreno significativo para PostgreSQL em novos projetos, mas mantém relevância em cenários específicos.</p>

<h3>O que MySQL faz bem</h3>
<ul>
  <li><strong>Hospedagem compartilhada:</strong> Praticamente todos os planos de hosting (cPanel, Plesk) incluem MySQL. PostgreSQL é mais raro nesses ambientes.</li>
  <li><strong>Stacks WordPress/Drupal/PHP:</strong> Mudar de MySQL é risco sem benefício claro quando a aplicação é um CMS estável.</li>
  <li><strong>Read-heavy workloads com InnoDB:</strong> Performance excelente em leituras simples com o storage engine InnoDB.</li>
  <li><strong>Replicação master-slave madura:</strong> Configuração simples e estável para read replicas.</li>
  <li><strong>Familiaridade da equipe:</strong> Se a equipe tem 10 anos de MySQL e o projeto dura 6 meses, mudar de banco não compensa.</li>
</ul>

<h3>Por que NÃO escolher MySQL para projetos novos</h3>
<table>
  <thead><tr><th>Feature</th><th>PostgreSQL</th><th>MySQL 8.x</th></tr></thead>
  <tbody>
    <tr><td>JSON nativo (indexado)</td><td>jsonb com GIN — busca rápida</td><td>JSON com geração virtual — mais lento</td></tr>
    <tr><td>Full-text search</td><td>ts_vector/ts_query com ranking</td><td>FULLTEXT básico (InnoDB), sem ranking sofisticado</td></tr>
    <tr><td>Window functions</td><td>Completas desde PostgreSQL 8.4 (2009)</td><td>Adicionadas no MySQL 8.0 (2018) — menos maduras</td></tr>
    <tr><td>CTEs recursivas</td><td>Maduras e otimizadas</td><td>Adicionadas no 8.0 — menos otimizadas</td></tr>
    <tr><td>Busca vetorial</td><td>pgvector — maduro</td><td>Não nativo (precisa de plugin externo)</td></tr>
    <tr><td>Geoespacial</td><td>PostGIS — padrão da indústria</td><td>Spatial Extensions — funcional mas limitado</td></tr>
    <tr><td>Particionamento</td><td>Declarativo nativo</td><td>Range/List/Hash — menos flexível</td></tr>
    <tr><td>Row-level security</td><td>Nativo (RLS policies)</td><td>Não nativo — requer views ou lógica na app</td></tr>
    <tr><td>Conformidade SQL</td><td>Alta (segue SQL standard)</td><td>Média (permissividades como GROUP BY sem ALL)</td></tr>
  </tbody>
</table>
<p><strong>Resumo:</strong> PostgreSQL tem tudo que MySQL tem, mais funcionalidades enterprise, melhor conformidade SQL, e ecossistema de extensões mais rico. Para projetos novos sem restrição de hosting, PostgreSQL é a escolha superior.</p>`,
  },
  {
    id: "comparativo-12-criterios",
    heading: "Comparativo completo: 12 critérios técnicos lado a lado",
    content: `<table>
  <thead><tr><th>Critério</th><th>PostgreSQL</th><th>MongoDB</th><th>MySQL</th></tr></thead>
  <tbody>
    <tr><td><strong>Modelo de dados</strong></td><td>Relacional + JSON (jsonb)</td><td>Documento (BSON)</td><td>Relacional</td></tr>
    <tr><td><strong>ACID</strong></td><td>Completo (desde sempre)</td><td>Multi-documento (desde v4.0)</td><td>Completo (InnoDB)</td></tr>
    <tr><td><strong>Schema</strong></td><td>Rígido (DDL) + flexível (jsonb)</td><td>Flexível (opcional)</td><td>Rígido (DDL)</td></tr>
    <tr><td><strong>Escala horizontal</strong></td><td>Read replicas + Citus (sharding)</td><td>Sharding nativo — setup simples</td><td>Read replicas + Vitess</td></tr>
    <tr><td><strong>Escrita intensiva</strong></td><td>10-30k/seg (single node)</td><td>50-100k/seg (single node, durabilidade padrão)</td><td>10-25k/seg (InnoDB)</td></tr>
    <tr><td><strong>JOINs</strong></td><td>Nativos (INNER, LEFT, LATERAL)</td><td>$lookup (lento, limitado)</td><td>Nativos</td></tr>
    <tr><td><strong>Full-text search</strong></td><td>ts_vector (bom até 5M docs)</td><td>Atlas Search (Lucene-based)</td><td>FULLTEXT (básico)</td></tr>
    <tr><td><strong>Busca vetorial</strong></td><td>pgvector (até ~5M vetores)</td><td>Atlas Vector Search</td><td>Não nativo</td></tr>
    <tr><td><strong>Ecossistema BI</strong></td><td>Excelente (Metabase, Grafana, dbt)</td><td>Limitado (MongoDB Connector)</td><td>Bom (ferramentas SQL padrão)</td></tr>
    <tr><td><strong>Gerenciado (cloud)</strong></td><td>Supabase, Neon, RDS, Cloud SQL</td><td>Atlas (excelente DX)</td><td>RDS, PlanetScale, Cloud SQL</td></tr>
    <tr><td><strong>Licença</strong></td><td>PostgreSQL License (liberal)</td><td>SSPL (restritiva para SaaS)</td><td>GPL v2 (Oracle)</td></tr>
    <tr><td><strong>Curva de aprendizado</strong></td><td>SQL — alta empregabilidade</td><td>MQL — menor base de devs</td><td>SQL — familiar</td></tr>
  </tbody>
</table>

<h3>Leitura do comparativo</h3>
<ul>
  <li><strong>Se precisa de JOINs e transações:</strong> PostgreSQL > MySQL > MongoDB.</li>
  <li><strong>Se precisa de escrita massiva:</strong> MongoDB > PostgreSQL > MySQL.</li>
  <li><strong>Se precisa de schema flexível:</strong> MongoDB > PostgreSQL (jsonb) > MySQL.</li>
  <li><strong>Se precisa de ecossistema BI:</strong> PostgreSQL > MySQL > MongoDB.</li>
  <li><strong>Se precisa escalar horizontalmente:</strong> MongoDB > PostgreSQL (com Citus) > MySQL (com Vitess).</li>
  <li><strong>Se precisa de busca vetorial/IA:</strong> PostgreSQL (pgvector) ≈ MongoDB (Atlas Vector) > MySQL.</li>
</ul>`,
  },
  {
    id: "tabela-decisao",
    heading: "Árvore de decisão: fluxograma prático para escolher",
    content: `<p>Use este fluxograma para chegar à resposta em 3 perguntas:</p>

<h3>Pergunta 1: Os dados são fortemente relacionados?</h3>
<p><strong>Sim</strong> (pedidos → itens → pagamentos → clientes → endereços): <strong>banco relacional</strong> (PostgreSQL ou MySQL). Siga para a pergunta 2.</p>
<p><strong>Não</strong> (cada documento é independente, poucos relacionamentos, estrutura variável): considere MongoDB. Siga para a pergunta 3.</p>

<h3>Pergunta 2 (relacional): Tem restrição de hosting ou stack LAMP?</h3>
<p><strong>Sim</strong> (hosting compartilhado, WordPress, equipe só sabe MySQL): <strong>MySQL</strong>.</p>
<p><strong>Não</strong>: <strong>PostgreSQL</strong>. Sem exceção.</p>

<h3>Pergunta 3 (documento): >30% das operações são transacionais?</h3>
<p><strong>Sim</strong>: Reconsidere. PostgreSQL com jsonb pode ser melhor que MongoDB com transações pesadas.</p>
<p><strong>Não</strong>: <strong>MongoDB</strong>. Ideal para dados de documento com escrita intensiva e schema variável.</p>

<h3>Cenário por tipo de projeto</h3>
<table>
  <thead><tr><th>Tipo de projeto</th><th>Banco primário</th><th>Complementos</th></tr></thead>
  <tbody>
    <tr><td>SaaS B2B (ERP, CRM)</td><td>PostgreSQL</td><td>Redis (cache), S3 (arquivos)</td></tr>
    <tr><td>E-commerce</td><td>PostgreSQL</td><td>Redis (sessões), Elasticsearch (busca de produtos)</td></tr>
    <tr><td>App mobile com chat</td><td>PostgreSQL</td><td>Redis (pub/sub), S3 (mídia)</td></tr>
    <tr><td>IoT / telemetria</td><td>TimescaleDB ou MongoDB</td><td>PostgreSQL (dados de negócio), Redis (alertas)</td></tr>
    <tr><td>CMS / blog corporativo</td><td>PostgreSQL ou MongoDB</td><td>CDN (assets), Redis (cache de páginas)</td></tr>
    <tr><td>Fintech / pagamentos</td><td>PostgreSQL (ACID obrigatório)</td><td>Redis (rate limiting), S3 (comprovantes)</td></tr>
    <tr><td>IA / RAG sobre documentos</td><td>PostgreSQL + pgvector</td><td>S3 (documentos originais), Redis (cache de queries)</td></tr>
    <tr><td>WordPress / Drupal</td><td>MySQL</td><td>Redis (cache), CDN (assets)</td></tr>
  </tbody>
</table>`,
  },
  {
    id: "custos",
    heading: "Custos operacionais: comparativo por perfil de empresa",
    content: `<h3>Custo mensal por volume (serviço gerenciado em cloud)</h3>
<table>
  <thead><tr><th>Perfil</th><th>PostgreSQL (Supabase/Neon)</th><th>MongoDB Atlas</th><th>MySQL (PlanetScale/RDS)</th></tr></thead>
  <tbody>
    <tr><td><strong>Hobby</strong> (1 dev, &lt;1GB)</td><td>R$ 0 (free tier)</td><td>R$ 0 (free tier 512MB)</td><td>R$ 0 (free tier)</td></tr>
    <tr><td><strong>Startup</strong> (5GB, 5k queries/seg)</td><td>R$ 100-300</td><td>R$ 150-400 (M10)</td><td>R$ 100-250</td></tr>
    <tr><td><strong>PME</strong> (50GB, 20k queries/seg)</td><td>R$ 400-800</td><td>R$ 600-1.500 (M30)</td><td>R$ 400-800</td></tr>
    <tr><td><strong>Enterprise</strong> (500GB+, 100k queries/seg)</td><td>R$ 2.000-5.000</td><td>R$ 3.000-10.000 (M50+)</td><td>R$ 2.000-5.000</td></tr>
  </tbody>
</table>

<h3>Custos ocultos</h3>
<ul>
  <li><strong>MongoDB Atlas egress:</strong> Transferência de dados para fora do Atlas é cobrada (~R$ 0,50/GB acima do free tier). Se sua API faz muitas queries, o egress pode superar o custo do cluster.</li>
  <li><strong>MongoDB licença SSPL:</strong> Se você vende banco como serviço (DBaaS), a licença SSPL do MongoDB pode ser um problema legal. PostgreSQL e MySQL não têm essa restrição.</li>
  <li><strong>Expertise da equipe:</strong> MongoDB exige conhecimento de modelagem de documentos — que é fundamentalmente diferente de modelagem relacional. Equipe relacional usando MongoDB gera modelagem pobre (e problemas de performance).</li>
  <li><strong>Custo de migração futura:</strong> Migrar de MongoDB para PostgreSQL custa 3-6 meses de engenharia. Migrar de MySQL para PostgreSQL custa 2-4 semanas (schemas similares). Escolher errado tem custo real.</li>
</ul>

<h3>Self-hosted vs. gerenciado</h3>
<p><strong>Recomendação:</strong> Use gerenciado para times com &lt;3 engenheiros de infra. O custo adicional de ~30% do serviço gerenciado é muito menor que o custo de um DBA administrando backup, replicação, failover, monitoring e updates de segurança.</p>
<p><strong>Self-hosted faz sentido quando:</strong> compliance exige dados on-premises, volume é tão alto que o custo gerenciado fica proibitivo (>R$ 10k/mês), ou quando há equipe de infra dedicada.</p>`,
  },
  {
    id: "migracao",
    heading: "Migração entre bancos: quando, como e quanto custa",
    content: `<h3>Quando migrar</h3>
<ul>
  <li><strong>MySQL → PostgreSQL:</strong> Quando precisa de jsonb, pgvector, PostGIS, RLS, ou conformidade SQL avançada. Migração relativamente simples (schemas similares). Custo: 2-4 semanas de engenharia.</li>
  <li><strong>MongoDB → PostgreSQL:</strong> Quando o modelo de dados se tornou fortemente relacional (muitos $lookups) e transações são frequentes. Migração complexa (redesign do schema). Custo: 3-6 meses de engenharia.</li>
  <li><strong>PostgreSQL → MongoDB:</strong> Raro. Se o modelo de dados se tornou predominantemente documental e escrita é o gargalo. Avalie antes pgvector + jsonb.</li>
</ul>

<h3>Estratégia de migração: Strangler Fig</h3>
<ol>
  <li><strong>Dual write:</strong> Novas operações escrevem nos dois bancos simultaneamente</li>
  <li><strong>Migração de dados históricos:</strong> ETL para transferir dados existentes em lotes</li>
  <li><strong>Validação:</strong> Compare resultados de queries nos dois bancos durante 2-4 semanas</li>
  <li><strong>Cutover:</strong> Mude a leitura para o novo banco</li>
  <li><strong>Cleanup:</strong> Remova o dual write e descomissione o banco antigo</li>
</ol>

<h3>Ferramentas de migração</h3>
<table>
  <thead><tr><th>Migração</th><th>Ferramenta</th><th>Observação</th></tr></thead>
  <tbody>
    <tr><td>MySQL → PostgreSQL</td><td>pgloader</td><td>Automatiza 90% da conversão de schema e dados</td></tr>
    <tr><td>MongoDB → PostgreSQL</td><td>Custom ETL (Python/Node)</td><td>Cada collection vira 1+ tabelas — modelagem manual</td></tr>
    <tr><td>MySQL → MongoDB</td><td>mongomigrate / custom</td><td>Desnormalização manual necessária</td></tr>
    <tr><td>Qualquer → Qualquer</td><td>Airbyte / Fivetran</td><td>ETL gerenciado, bom para migração contínua</td></tr>
  </tbody>
</table>`,
  },
  {
    id: "multi-banco",
    heading: "Arquitetura multi-banco: usando o certo para cada tipo de dado",
    content: `<p>Sistemas modernos não usam um único banco para tudo. A combinação certa reduz custos, melhora performance e simplifica cada componente.</p>

<h3>Combinação clássica (cobre 90% dos projetos)</h3>
<table>
  <thead><tr><th>Banco</th><th>Função</th><th>Exemplos de dados</th></tr></thead>
  <tbody>
    <tr><td><strong>PostgreSQL</strong></td><td>Dados transacionais (SSOT)</td><td>Pedidos, clientes, pagamentos, contratos, usuários</td></tr>
    <tr><td><strong>Redis</strong></td><td>Cache, sessões, filas</td><td>Sessões de login, cache de API, rate limiting, pub/sub</td></tr>
    <tr><td><strong>S3/GCS</strong></td><td>Object storage</td><td>Uploads, backups, PDFs, imagens, vídeos</td></tr>
  </tbody>
</table>

<h3>Combinação avançada (projetos com IA ou analytics)</h3>
<table>
  <thead><tr><th>Banco</th><th>Função</th></tr></thead>
  <tbody>
    <tr><td><strong>PostgreSQL + pgvector</strong></td><td>Dados transacionais + busca vetorial (RAG, recomendação)</td></tr>
    <tr><td><strong>ClickHouse</strong></td><td>Analytics de alto volume (eventos, métricas, logs de negócio)</td></tr>
    <tr><td><strong>Redis</strong></td><td>Cache, sessões, feature flags</td></tr>
    <tr><td><strong>S3</strong></td><td>Data lake (documentos brutos para processamento batch)</td></tr>
  </tbody>
</table>

<h3>Anti-padrões de multi-banco</h3>
<ul>
  <li><strong>PostgreSQL como cache:</strong> Fazer SELECT frequente em tabela sem índice para "verificar" dados que poderiam estar no Redis. Banco relacional não é cache.</li>
  <li><strong>MongoDB como fila:</strong> Collections com "status: pendente" para processar tarefas. Use Redis, SQS ou RabbitMQ.</li>
  <li><strong>Duplicação desnecessária:</strong> Manter os mesmos dados no PostgreSQL e no MongoDB "por segurança". Escolha um como SSOT e replique com propósito (analytics, busca).</li>
  <li><strong>Micro-bancos por microserviço:</strong> Cada microserviço com seu banco é a teoria. Na prática, para equipes com &lt;10 devs, um banco PostgreSQL com schemas separados é mais simples e igualmente eficaz.</li>
</ul>`,
  },
  {
    id: "conclusao",
    heading: "Conclusão: a regra dos 80/20 para bancos de dados",
    content: `<p>Se você leu este guia inteiro e ainda não tem certeza: <strong>use PostgreSQL</strong>. Ele resolve 80% dos problemas de banco de dados, tem o ecossistema mais completo de extensões, a maior comunidade e a melhor empregabilidade para quem aprende SQL.</p>

<h3>Resumo em 5 regras</h3>
<ol>
  <li><strong>Novo projeto sem restrições?</strong> PostgreSQL.</li>
  <li><strong>Dados hierárquicos, variáveis, escrita intensiva?</strong> MongoDB.</li>
  <li><strong>Stack PHP/WordPress em hosting compartilhado?</strong> MySQL.</li>
  <li><strong>Precisa de cache, sessões ou filas?</strong> Adicione Redis — não abuse do banco principal.</li>
  <li><strong>Precisa de busca vetorial para IA?</strong> pgvector (se PostgreSQL) ou Atlas Vector Search (se MongoDB).</li>
</ol>

<p>O banco de dados é a fundação do sistema. Errar aqui gera meses de migração dolorosa. Acertar aqui gera anos de produtividade. Invista 1-2 dias na decisão — vale mais do que semanas de refatoração depois.</p>`,
  },
],
callouts: [
  { type: "insight", title: "A regra dos 80/20 de banco de dados", body: "PostgreSQL resolve 80% dos problemas de banco de dados. Se você chegou até aqui e ainda não tem certeza, use PostgreSQL. Você pode adicionar outros bancos depois, quando a necessidade for real — não hipotética." },
  { type: "warning", title: "Cuidado com 'o banco que a empresa X usa'", body: "Facebook usa Cassandra, Netflix usa DynamoDB, Airbnb usa MySQL. Eles têm volumes, equipes e contextos que você não tem. Escolha pelo seu contexto — não pelo case study de outro." },
  { type: "tip", title: "Integridade desde o dia 1", body: "Independente do banco escolhido: defina constraints (NOT NULL, UNIQUE, FOREIGN KEY) desde o primeiro schema. Dados sem integridade são o maior gerador de bugs silenciosos em sistemas legados." },
  { type: "warning", title: "Migração é 5-20× mais cara que escolher certo", body: "Migrar de MongoDB para PostgreSQL custa 3-6 meses de engenharia. Migrar de MySQL para PostgreSQL custa 2-4 semanas. Tempo investido na decisão inicial se paga exponencialmente." },
],
mindMap: {
  label: "Bancos de Dados",
  children: [
    { label: "PostgreSQL", children: [
      { label: "Relacional ACID" },
      { label: "JSON nativo (jsonb)" },
      { label: "pgvector (IA)" },
      { label: "PostGIS (geo)" },
      { label: "RLS (multi-tenancy)" },
    ]},
    { label: "MongoDB", children: [
      { label: "Schema flexível" },
      { label: "Escrita intensiva" },
      { label: "Sharding nativo" },
      { label: "Atlas (DX excelente)" },
    ]},
    { label: "MySQL", children: [
      { label: "Legados LAMP" },
      { label: "Hospedagem shared" },
      { label: "WordPress/PHP" },
    ]},
    { label: "Multi-banco", children: [
      { label: "PostgreSQL (transacional)" },
      { label: "Redis (cache/sessões)" },
      { label: "S3 (object storage)" },
      { label: "ClickHouse (analytics)" },
    ]},
  ],
},
mnemonic: {
  acronym: "BANCO",
  breakdown: [
    { letter: "B", word: "Base relacional primeiro", hint: "PostgreSQL resolve 80% dos casos" },
    { letter: "A", word: "Análise de dados", hint: "Relacional = JOINs, transações ACID, integridade" },
    { letter: "N", word: "NoSQL = caso específico", hint: "MongoDB p/ docs variáveis, IoT, logs intensivos" },
    { letter: "C", word: "Custo de migração", hint: "Banco é a escolha mais difícil de reverter" },
    { letter: "O", word: "Oracle do open-source", hint: "PostgreSQL = features enterprise sem licença" },
  ],
},
relatedSlugs: ["como-escolher-stack-tecnologica", "como-criar-etl-com-python-e-postgresql", "como-implementar-rag-na-sua-empresa"],
};

export default post;
