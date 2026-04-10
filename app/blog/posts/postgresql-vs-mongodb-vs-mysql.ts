import type { Post } from "../[slug]/page";

const post: Post = {
slug: "postgresql-vs-mongodb-vs-mysql",
tag: "Desenvolvimento Ágil",
title: "PostgreSQL vs. MongoDB vs. MySQL: guia definitivo para escolher em 2026",
description: "Comparativo técnico e prático dos três bancos de dados mais usados — com critérios claros, tabela de decisão e análise de quando usar cada um (ou mais de um).",
keywords: ["PostgreSQL vs MongoDB", "MySQL vs PostgreSQL 2026", "banco de dados relacional vs NoSQL", "quando usar MongoDB", "como escolher banco de dados"],
readTime: "9 min",
publishedAt: "2026-02-23",
updatedAt: "2026-04-10",
author: { name: "NuPtechs", role: "Engenharia de Software" },
keyTakeaways: [
  "PostgreSQL resolve 80% dos casos — é relacional, robusto, open-source e cresce sem reescrever",
  "MongoDB brilha para documentos com estrutura variável e escrita intensiva (IoT, logs, catálogos)",
  "MySQL ainda domina em hospedagem compartilhada e stacks LAMP legadas — menos features que PostgreSQL",
  "A escolha mais importante: não é qual banco, é garantir que os dados têm integridade desde o início",
  "Usar múltiplos bancos é uma estratégia válida — PostgreSQL + Redis + S3 é combinação clássica",
],
sections: [
  {
    id: "premissa",
    heading: "A premissa errada que leva à escolha errada",
    content: `<p>A pergunta "qual banco é melhor?" está errada. A pergunta correta é <strong>"qual banco é melhor para este modelo de dados, este volume e esta equipe?"</strong></p>
<p>Cada banco foi otimizado para cenários específicos. Usar MongoDB como se fosse relacional (com joins manuais na aplicação) é doloroso. Usar PostgreSQL para dados hierárquicos altamente variáveis é possível, mas trabalhoso.</p>
<p>Este guia te dá os critérios para fazer a escolha certa — não a escolha hype.</p>`,
  },
  {
    id: "postgresql",
    heading: "PostgreSQL: o banco de dados padrão do mundo moderno",
    content: `<p>PostgreSQL é o banco relacional open-source mais avançado disponível. Em 2026, tem funcionalidades que antes existiam apenas em bancos enterprise caros.</p>
<p><strong>Por que PostgreSQL é a escolha padrão para novos projetos:</strong></p>
<ul>
  <li><strong>ACID completo:</strong> transações robustas, sem perda de dados.</li>
  <li><strong>JSON nativo:</strong> coluna <code>jsonb</code> para dados semiestruturados — sem precisar do MongoDB.</li>
  <li><strong>Full-text search:</strong> busca textual nativa, com ranking — sem precisar do Elasticsearch para casos simples.</li>
  <li><strong>pgvector:</strong> busca vetorial (embeddings de IA) direto no banco — sem precisar do Pinecone para volumes menores.</li>
  <li><strong>Row-level security:</strong> políticas de acesso a nível de linha, nativas.</li>
  <li><strong>Extensões poderosas:</strong> PostGIS (geoespacial), TimescaleDB (séries temporais), pgcrypto.</li>
</ul>
<p><strong>Quando PostgreSQL não é suficiente:</strong> escrita com throughput absurdo (>100k writes/seg sem batch), quando você precisa de clustering horizontal automático simples.</p>`,
  },
  {
    id: "mongodb",
    heading: "MongoDB: o banco certo para o modelo de documento",
    content: `<p>MongoDB é frequentemente mal utilizado — ora como substituto do relacional (péssima ideia), ora como "banco para startups" sem critério técnico. Quando usado para o que foi projetado, é excelente.</p>
<p><strong>MongoDB brilha quando:</strong></p>
<ul>
  <li><strong>Estrutura de dados altamente variável:</strong> catálogos de produtos onde cada produto tem atributos diferentes, documentos de configuração por cliente.</li>
  <li><strong>Escrita muito intensiva com leitura eventual:</strong> logs de aplicação, dados de IoT, eventos de analytics.</li>
  <li><strong>Desenvolvimento ágil com schema em evolução rápida:</strong> os primeiros 3 meses de um produto onde o modelo muda toda semana.</li>
  <li><strong>Dados hierárquicos profundos:</strong> quando a estrutura é naturalmente um documento e não uma tabela.</li>
</ul>
<p><strong>Quando MongoDB é a escolha errada:</strong> dados fortemente relacionados com múltiplas entidades interdependentes. Joins no MongoDB (via <code>$lookup</code>) existem mas são lentos e verbosos comparados ao SQL.</p>`,
  },
  {
    id: "mysql",
    heading: "MySQL: legado dominante que ainda tem seu lugar",
    content: `<p>MySQL ainda é o banco mais instalado do mundo — herdado de décadas de stacks LAMP. Em 2026, perdeu terreno para PostgreSQL em novos projetos, mas ainda tem casos de uso legítimos:</p>
<ul>
  <li><strong>Hospedagem compartilhada:</strong> praticamente todos os planos de hosting incluem MySQL.</li>
  <li><strong>Aplicações WordPress/Drupal/PHP legadas:</strong> mudar de MySQL é um risco sem benefício claro.</li>
  <li><strong>Equipes com expertise consolidada em MySQL:</strong> familiaridade tem valor real.</li>
</ul>
<p><strong>Por que não escolher MySQL para projetos novos:</strong> PostgreSQL tem tudo que o MySQL tem, mais JSON nativo melhor, CTEs mais avançadas, window functions completas e melhor conformidade com SQL padrão. A menos que haja restrição específica, PostgreSQL é a escolha superior.</p>`,
  },
  {
    id: "tabela-decisao",
    heading: "Tabela de decisão: quando usar cada banco",
    content: `<table>
  <thead><tr><th>Cenário</th><th>Recomendação</th><th>Justificativa</th></tr></thead>
  <tbody>
<tr><td>Aplicação web padrão (e-commerce, SaaS)</td><td>PostgreSQL</td><td>Relacional + JSON + full-text resolve tudo</td></tr>
<tr><td>Catálogo com atributos variáveis por produto</td><td>MongoDB ou PostgreSQL + jsonb</td><td>Schema flexível por design</td></tr>
<tr><td>Dados de IoT / logs de alta frequência</td><td>MongoDB ou TimescaleDB</td><td>Escrita intensiva, leitura eventual</td></tr>
<tr><td>Dados geoespaciais (localização, mapas)</td><td>PostgreSQL + PostGIS</td><td>PostGIS é o padrão da indústria</td></tr>
<tr><td>Busca vetorial para IA</td><td>PostgreSQL + pgvector</td><td>Evita serviço adicional para volumes &lt;10M vetores</td></tr>
<tr><td>Sistema legado WordPress/PHP</td><td>MySQL</td><td>Mudar sem benefício claro = risco sem retorno</td></tr>
<tr><td>Cache e sessões</td><td>Redis (não relacional)</td><td>Banco de dados não é a escolha certa para cache</td></tr>
  </tbody>
</table>`,
  },
  {
    id: "multi-banco",
    heading: "A arquitetura multi-banco: usando o certo para cada coisa",
    content: `<p>A combinação clássica para sistemas modernos:</p>
<ul>
  <li><strong>PostgreSQL:</strong> dados transacionais principais (pedidos, clientes, pagamentos)</li>
  <li><strong>Redis:</strong> cache, sessões, filas simples, rate limiting</li>
  <li><strong>S3/GCS:</strong> arquivos estáticos, backups, dados de alto volume sem estrutura</li>
  <li><strong>Elasticsearch (ou pgvector):</strong> busca full-text avançada</li>
</ul>
<p>O erro comum é usar um único banco para tudo. PostgreSQL não é cache. Redis não é banco transacional. Cada um tem o lugar certo.</p>`,
  },
],
callouts: [
  { type: "insight", title: "A regra dos 80/20 de banco de dados", body: "PostgreSQL resolve 80% dos problemas de banco de dados. Se você chegou até aqui e ainda não tem certeza, use PostgreSQL. Você pode adicionar outros bancos depois, quando a necessidade for real — não hipotética." },
  { type: "warning", title: "Cuidado com 'o banco que a empresa X usa'", body: "Facebook usa Cassandra, Netflix usa Cassandra e DynamoDB, Airbnb usa MySQL. Eles têm volumes e equipes que você não tem. Escolha pelo seu contexto, não pelo case de outro." },
  { type: "tip", title: "Integridade desde o dia 1", body: "Independente do banco escolhido: defina constraints (NOT NULL, UNIQUE, FOREIGN KEY) desde o primeiro schema. Dados sem integridade são o maior gerador de bugs silenciosos em sistemas legados." },
],
mindMap: {
  label: "Bancos de Dados",
  children: [
    { label: "PostgreSQL", children: [
      { label: "Relacional ACID" },
      { label: "JSON nativo (jsonb)" },
      { label: "pgvector (IA)" },
      { label: "PostGIS (geo)" },
    ]},
    { label: "MongoDB", children: [
      { label: "Schema flexível" },
      { label: "Escrita intensiva" },
      { label: "Documentos hierárquicos" },
    ]},
    { label: "MySQL", children: [
      { label: "Legados LAMP" },
      { label: "Hospedagem shared" },
      { label: "WordPress/PHP" },
    ]},
    { label: "Multi-banco", children: [
      { label: "PostgreSQL (transacional)" },
      { label: "Redis (cache)" },
      { label: "S3 (arquivos)" },
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
relatedSlugs: ["como-escolher-stack-tecnologica", "como-criar-etl-com-python-e-postgresql"],
};

export default post;
