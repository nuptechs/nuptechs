import type { Post } from "../[slug]/page";

const post: Post = {
slug: "como-implementar-rag-na-sua-empresa",
tag: "IA Aplicada",
title: "Como implementar RAG na sua empresa em 2 semanas",
description: "Guia prático para criar um sistema de busca inteligente sobre documentos internos usando Retrieval-Augmented Generation — com stack, custos e armadilhas.",
keywords: ["RAG empresarial", "Retrieval-Augmented Generation", "IA sobre documentos internos", "chatbot com base de conhecimento", "RAG implementação", "busca vetorial documentos", "LLM dados proprietários"],
readTime: "26 min",
publishedAt: "2026-02-17",
updatedAt: "2026-02-17",
author: { name: "Yuri Francis", role: "Fundador, NuPtechs" },
executiveSummary: "RAG (Retrieval-Augmented Generation) permite que um LLM responda perguntas sobre dados da sua empresa — manuais, contratos, base de conhecimento — com citação de fontes e sem alucinação. Este guia cobre a teoria mínima necessária, a stack de produção (LlamaIndex + OpenAI + Pinecone), implementação passo a passo em 2 semanas, os 8 erros que mais degradam qualidade, estratégias avançadas de chunking e re-ranking, custos reais por volume, e métricas de avaliação automatizada com RAGAS.",
keyTakeaways: [
  "RAG = Busca vetorial + LLM: o modelo responde com base nos seus documentos, não no treinamento geral",
  "Três problemas que RAG resolve e LLM puro não: dados proprietários, atualização contínua e citação de fontes",
  "Stack mínima viável: LlamaIndex + OpenAI Embeddings (text-embedding-3-small) + Pinecone + GPT-4o",
  "Semana 1: ingestão, chunking e indexação; Semana 2: API de query + interface + monitoramento",
  "Custo mensal para 500 docs + 5.000 queries: R$ 80-200. Para 5.000 docs + 50.000 queries: R$ 500-1.500",
  "Avalie qualidade com 3 métricas: Faithfulness, Relevance e Context Precision — framework RAGAS automatiza",
],
sections: [
  {
    id: "o-que-e-rag",
    heading: "O que é RAG e por que toda empresa com dados internos precisa considerar",
    content: `<p><strong>RAG (Retrieval-Augmented Generation)</strong> é a técnica de conectar um LLM a uma base de documentos externa para que as respostas sejam baseadas no conteúdo real da empresa — não no conhecimento de treinamento do modelo.</p>

<p>O problema que RAG resolve é simples de entender: LLMs como GPT-4o ou Claude sabem muito sobre o mundo geral, mas nada sobre sua empresa. Se você perguntar "qual a política de reembolso da NuPtechs?", o modelo vai inventar uma resposta plausível — com linguagem confiante, formatação impecável, e informação completamente fabricada. Isso é <strong>alucinação</strong>, e é o maior risco de usar LLMs em ambiente corporativo sem RAG.</p>

<p>Com RAG, o fluxo muda fundamentalmente:</p>
<ol>
  <li><strong>Indexação (offline):</strong> Seus documentos (PDFs, manuais, contratos, wiki, emails) são divididos em blocos (chunks), transformados em vetores numéricos via modelo de embedding, e armazenados em um banco vetorial (Pinecone, pgvector, Weaviate).</li>
  <li><strong>Retrieval (em tempo real):</strong> A pergunta do usuário também vira um vetor. O banco vetorial retorna os K documentos/chunks mais similares semanticamente.</li>
  <li><strong>Generation (em tempo real):</strong> O LLM recebe a pergunta + os documentos relevantes no contexto e gera uma resposta fundamentada, citando as fontes.</li>
</ol>

<h3>RAG vs. Fine-tuning vs. Contexto direto</h3>
<table>
  <thead><tr><th>Abordagem</th><th>Para que serve</th><th>Custo</th><th>Atualização</th></tr></thead>
  <tbody>
    <tr><td><strong>RAG</strong></td><td>Respostas sobre dados que mudam frequentemente</td><td>Baixo (embedding + query)</td><td>Instantânea (re-indexe o doc)</td></tr>
    <tr><td><strong>Fine-tuning</strong></td><td>Mudar o estilo/comportamento do modelo</td><td>Alto ($500-5.000/treino)</td><td>Lenta (retreino completo)</td></tr>
    <tr><td><strong>Contexto direto</strong></td><td>Poucos docs (<20 páginas)</td><td>Mínimo</td><td>Instantânea</td></tr>
  </tbody>
</table>
<p><strong>Regra prática:</strong> Se tem menos de 20 páginas de conteúdo, cole tudo no contexto do prompt (sem RAG). Se tem 20-100.000 páginas, use RAG. Se quer mudar como o modelo escreve ou raciocina (não o que sabe), fine-tuning.</p>`,
  },
  {
    id: "quando-usar",
    heading: "Quando RAG é a solução certa (e quando não é)",
    content: `<h3>RAG é ideal quando:</h3>
<ul>
  <li><strong>Dados proprietários:</strong> Manuais técnicos, contratos, políticas internas, base de conhecimento de suporte, documentação de produtos, regulamentações setoriais específicas.</li>
  <li><strong>Atualização frequente:</strong> Adicionar ou atualizar documentos é instantâneo (re-indexe o doc específico). Re-treinar um modelo leva semanas e custa milhares de dólares.</li>
  <li><strong>Transparência exigida:</strong> O usuário precisa ver de onde veio a informação. RAG cita as fontes (nome do arquivo, página, seção). LLM puro não consegue.</li>
  <li><strong>Compliance e auditoria:</strong> Regulações exigem rastreabilidade das respostas — "por que o sistema disse isso?". Com RAG, a resposta é: "porque está na página 47 do contrato X".</li>
  <li><strong>Volume médio-alto de docs:</strong> De 20 a 100.000 documentos. Acima disso, técnicas adicionais (hierarquias, roteamento) são necessárias.</li>
</ul>

<h3>RAG NÃO é a solução certa quando:</h3>
<ul>
  <li><strong>Volume muito baixo:</strong> Menos de 20 páginas de conteúdo — cole tudo no contexto do prompt. Mais simples, mais barato, melhor resultado.</li>
  <li><strong>Dados não-textuais sem OCR:</strong> Imagens, vídeos, plantas técnicas. RAG trabalha com texto. Para imagens, precisa OCR/descrição primeiro.</li>
  <li><strong>Cálculos e raciocínio complexo:</strong> RAG recupera informação, não calcula. Para "calcule o reajuste do contrato X", integre com código de cálculo, não com RAG.</li>
  <li><strong>Dados estruturados em banco SQL:</strong> Se os dados estão em tabelas SQL, uma query direta ou text-to-SQL é mais eficiente que vetorizar rows.</li>
  <li><strong>Quando a resposta precisa ser exata:</strong> RAG introduz variabilidade na geração. Para respostas que precisam ser letra por letra iguais (disclaimer legal, dosagem médica), use busca exata, não RAG.</li>
</ul>`,
  },
  {
    id: "arquitetura",
    heading: "Arquitetura de produção: componentes e decisões",
    content: `<h3>Stack mínima viável (MVP)</h3>
<table>
  <thead><tr><th>Componente</th><th>Opção recomendada</th><th>Alternativas</th><th>Custo mensal</th></tr></thead>
  <tbody>
    <tr><td>Framework</td><td>LlamaIndex</td><td>LangChain, Haystack</td><td>Grátis (open source)</td></tr>
    <tr><td>Embeddings</td><td>text-embedding-3-small (OpenAI)</td><td>Cohere embed-v3, Voyage AI</td><td>~R$ 5 (até 5M tokens/mês)</td></tr>
    <tr><td>Vector Store</td><td>Pinecone Serverless</td><td>pgvector, Weaviate, Qdrant</td><td>R$ 0-50 (até 1M vetores)</td></tr>
    <tr><td>LLM</td><td>GPT-4o mini</td><td>Claude 3.5 Haiku, Gemini Flash</td><td>R$ 30-100 (5k queries)</td></tr>
    <tr><td>API</td><td>FastAPI (Python)</td><td>Flask, Express.js</td><td>R$ 50 (servidor básico)</td></tr>
    <tr><td>Interface</td><td>Streamlit (interno) ou Next.js (produção)</td><td>Gradio, Chainlit</td><td>R$ 0-50</td></tr>
  </tbody>
</table>

<h3>Stack de produção (alta disponibilidade)</h3>
<p>Para uso com mais de 50 usuários simultâneos e documentos críticos:</p>
<ul>
  <li><strong>Fila de ingestão:</strong> Redis ou SQS para processar uploads de documentos assincronamente</li>
  <li><strong>Cache de queries:</strong> Redis com TTL (queries frequentes não precisam re-consultar o LLM)</li>
  <li><strong>Re-ranker:</strong> Cohere Rerank ou cross-encoder local para reordenar os chunks após a busca vetorial</li>
  <li><strong>Fallback de LLM:</strong> Se GPT-4o estiver fora, redirecionar para Claude ou vice-versa automaticamente</li>
  <li><strong>Monitoramento:</strong> Log de cada query, chunks retornados, resposta gerada, e score de similaridade</li>
</ul>

<h3>Decisão: Pinecone vs. pgvector</h3>
<p><strong>Pinecone:</strong> Gerenciado, escala automaticamente, sem operação. Ideal quando não quer gerenciar infra de banco vetorial. Custo a partir de R$ 0 (free tier) até R$ 500+/mês em volume alto.</p>
<p><strong>pgvector:</strong> Extensão do PostgreSQL. Se já usa PostgreSQL, adiciona busca vetorial ao mesmo banco. Ideal quando quer simplificar a stack e já tem expertise em PostgreSQL. Performance excelente para até ~5M vetores.</p>
<p><strong>Recomendação:</strong> Comece com Pinecone para velocidade. Migre para pgvector quando quiser consolidar infra ou quando o custo de Pinecone superar o de gerenciar pgvector.</p>`,
  },
  {
    id: "stack-semana-1",
    heading: "Semana 1: Ingestão, chunking e indexação de documentos",
    content: `<h3>Dia 1-2: Setup do ambiente e loader de documentos</h3>
<p>Instale LlamaIndex e configure os loaders para os formatos da sua base:</p>
<pre><code class="language-python">from llama_index.core import SimpleDirectoryReader, VectorStoreIndex
from llama_index.vector_stores.pinecone import PineconeVectorStore

# Suporta PDF, Word, TXT, Markdown, HTML, CSV, JSON
documents = SimpleDirectoryReader(
    "./docs",
    recursive=True,
    filename_as_id=True,       # ID do doc = nome do arquivo
    required_exts=[".pdf", ".docx", ".md", ".txt"]
).load_data()

print(f"Carregados {len(documents)} documentos")</code></pre>

<h3>Dia 3-4: Chunking — a decisão mais impactante na qualidade</h3>
<p>Chunking é dividir documentos em blocos menores para indexação. A qualidade do RAG depende diretamente da qualidade do chunking:</p>
<ul>
  <li><strong>Chunks muito grandes (2000+ tokens):</strong> Diluem o significado. A busca vetorial retorna chunks parcialmente relevantes, o LLM tem que filtrar ruído.</li>
  <li><strong>Chunks muito pequenos (50-100 tokens):</strong> Perdem contexto. Uma frase isolada pode ser ambígua sem as frases anteriores.</li>
  <li><strong>Sweet spot: 256-512 tokens com overlap de 50-100 tokens</strong></li>
</ul>

<h3>Estratégias de chunking por tipo de documento</h3>
<table>
  <thead><tr><th>Tipo de documento</th><th>Estratégia</th><th>Chunk size</th></tr></thead>
  <tbody>
    <tr><td>Manuais técnicos</td><td>Por seção/heading (chunk por H2/H3)</td><td>Variável (respeita seções)</td></tr>
    <tr><td>Contratos jurídicos</td><td>Por cláusula (separação por numeração)</td><td>256-512 tokens</td></tr>
    <tr><td>Emails/tickets de suporte</td><td>Cada email/ticket = 1 chunk</td><td>Variável (por mensagem)</td></tr>
    <tr><td>FAQs/Knowledge base</td><td>Cada pergunta+resposta = 1 chunk</td><td>Variável (por par Q&A)</td></tr>
    <tr><td>Documentos longos (relatórios)</td><td>Token-based com overlap</td><td>512 tokens, 100 overlap</td></tr>
  </tbody>
</table>

<h3>Dia 5: Embedding e indexação</h3>
<pre><code class="language-python">from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.core.node_parser import SentenceSplitter

# Chunking
parser = SentenceSplitter(chunk_size=512, chunk_overlap=100)
nodes = parser.get_nodes_from_documents(documents)

# Embedding + Indexação
embed_model = OpenAIEmbedding(model="text-embedding-3-small")
vector_store = PineconeVectorStore(pinecone_index=pinecone_index)
index = VectorStoreIndex(
    nodes,
    vector_store=vector_store,
    embed_model=embed_model,
    show_progress=True
)
print(f"Indexados {len(nodes)} chunks")</code></pre>
<p>Para 500 documentos de ~10 páginas cada: indexação em ~15 minutos, custo de embeddings ~R$ 5.</p>

<h3>Dia 5 (continuação): Metadados — o segredo da precisão</h3>
<p>Não indexe apenas texto. Adicione metadados a cada chunk:</p>
<ul>
  <li><strong>Obrigatórios:</strong> nome do arquivo, data de criação/atualização, seção/capítulo</li>
  <li><strong>Recomendados:</strong> autor, departamento, tipo de documento, nível de confidencialidade</li>
  <li><strong>Avançados:</strong> versão do documento, tags temáticas, idioma</li>
</ul>
<p>Metadados permitem filtros na query: "busque apenas em contratos do departamento jurídico atualizados nos últimos 6 meses".</p>`,
  },
  {
    id: "stack-semana-2",
    heading: "Semana 2: API de query, interface e go-live",
    content: `<h3>Dia 1-2: API de query com controles de qualidade</h3>
<pre><code class="language-python">from llama_index.core.postprocessor import SimilarityPostprocessor

query_engine = index.as_query_engine(
    similarity_top_k=5,
    response_mode="compact",
    node_postprocessors=[
        SimilarityPostprocessor(similarity_cutoff=0.72)
    ]
)

response = query_engine.query("Qual o prazo de garantia dos contratos?")
print(response.response)           # resposta gerada
print(response.source_nodes)       # chunks citados com score</code></pre>

<p><strong>Parâmetros-chave:</strong></p>
<ul>
  <li><strong>similarity_top_k=5:</strong> Retorna os 5 chunks mais similares. Mais chunks = mais contexto mas mais custo de tokens.</li>
  <li><strong>similarity_cutoff=0.72:</strong> Ignora chunks com score abaixo de 0.72. Sem cutoff, o sistema retorna chunks irrelevantes com aparência de confiança.</li>
  <li><strong>response_mode="compact":</strong> Sumariza a resposta dos chunks. Alternativa: "tree_summarize" para queries complexas sobre muitos documentos.</li>
</ul>

<h3>Dia 3: Interface para usuários</h3>
<p><strong>Para uso interno (5-20 usuários):</strong> Streamlit resolve em 2-4h. Chat interface com histórico, display de fontes citadas, e filtros por tipo de documento.</p>
<p><strong>Para uso em produção (50+ usuários):</strong> API FastAPI com autenticação + frontend React/Next.js. Adicione: rate limiting, cache de queries frequentes, e logging de interações.</p>
<p><strong>Para integração com WhatsApp:</strong> n8n com nó HTTP Request chama a API FastAPI. O bot recebe mensagem → envia query à API RAG → retorna resposta formatada para WhatsApp.</p>

<h3>Dia 4: Monitoramento e feedback loop</h3>
<p>Implemente desde o dia 1:</p>
<ul>
  <li><strong>Log de queries:</strong> Registre toda query, os chunks retornados, os scores, e a resposta gerada. Isso é ouro para melhorar o sistema.</li>
  <li><strong>Queries sem resposta:</strong> Quando o score máximo dos chunks está abaixo do cutoff, registre a query como "gap na base". Essas são documentos que faltam.</li>
  <li><strong>Feedback do usuário:</strong> Botões simples (👍/👎) na resposta. Feedback negativo = chunk errado ou resposta mal formulada.</li>
  <li><strong>Dashboard:</strong> Queries/dia, taxa de resposta (% de queries com score acima do cutoff), queries mais frequentes, docs mais citados.</li>
</ul>

<h3>Dia 5: Testes e go-live</h3>
<p>Antes de liberar para todos os usuários:</p>
<ol>
  <li>Crie um conjunto de 30 perguntas de teste com respostas esperadas</li>
  <li>Execute todas as queries e compare respostas geradas vs. esperadas</li>
  <li>Meça: Faithfulness (resposta tem suporte nos docs?), Relevance (responde a pergunta?), Context Precision (docs retornados são os certos?)</li>
  <li>Ajuste parâmetros (chunk size, top_k, cutoff, response_mode) até atingir qualidade aceitável</li>
  <li>Go-live com 10% dos usuários → coleta de feedback → ajustes → 100%</li>
</ol>`,
  },
  {
    id: "custos",
    heading: "Custos reais por volume: de startup a enterprise",
    content: `<table>
  <thead><tr><th>Perfil</th><th>Documentos</th><th>Queries/mês</th><th>Custo/mês</th></tr></thead>
  <tbody>
    <tr><td><strong>Departamental</strong></td><td>50-200</td><td>500-2.000</td><td>R$ 50-150</td></tr>
    <tr><td><strong>PME</strong></td><td>200-2.000</td><td>2.000-10.000</td><td>R$ 150-500</td></tr>
    <tr><td><strong>Médio porte</strong></td><td>2.000-10.000</td><td>10.000-50.000</td><td>R$ 500-1.500</td></tr>
    <tr><td><strong>Enterprise</strong></td><td>10.000-100.000</td><td>50.000-500.000</td><td>R$ 1.500-8.000</td></tr>
  </tbody>
</table>

<h3>Decomposição de custos</h3>
<ul>
  <li><strong>Embeddings (indexação):</strong> ~R$ 0,005 por página de documento. Custo único por documento (re-embed só quando o doc muda).</li>
  <li><strong>Embeddings (query):</strong> ~R$ 0,001 por query envida ao modelo de embedding.</li>
  <li><strong>LLM (geração):</strong> O custo principal. GPT-4o mini: ~R$ 0,005 por query simples. GPT-4o: ~R$ 0,05 por query. Claude 3.5 Sonnet: ~R$ 0,05 por query.</li>
  <li><strong>Vector store:</strong> Pinecone Serverless: R$ 0 (free tier até 100k vetores) a R$ 50-500/mês em volume alto. pgvector: incluso no custo do PostgreSQL existente.</li>
  <li><strong>Servidor API:</strong> R$ 50-200/mês (Railway, Render) ou incluído em infraestrutura existente.</li>
</ul>

<h3>Estratégias de redução de custo</h3>
<ul>
  <li><strong>Cache de queries:</strong> Queries idê nticas retornam resposta cacheada sem re-consultar o LLM. Reduz custo em 30-60% em bases com queries repetitivas (suporte, FAQ).</li>
  <li><strong>Modelo menor para triagem:</strong> GPT-4o mini ou Claude Haiku para queries simples, GPT-4o ou Claude Sonnet apenas para queries complexas. Roteamento automático.</li>
  <li><strong>Batch embedding:</strong> Indexe documentos em lote, não um por um. Custo de embedding em batch é ~20% menor.</li>
  <li><strong>pgvector:</strong> Se já tem PostgreSQL, pgvector elimina o custo de um serviço vetorial separado.</li>
</ul>`,
  },
  {
    id: "armadilhas",
    heading: "Os 8 erros que mais degradam a qualidade do RAG",
    content: `<h3>1. Chunks muito grandes (2000+ tokens)</h3>
<p>Diluem o significado. O vetor representa uma "média semântica" do chunk — quanto maior, mais genérico o vetor. Resultado: chunks parcialmente relevantes com score aceitável mas conteúdo irrelevante para a pergunta específica.</p>

<h3>2. Sem metadados nos chunks</h3>
<p>Indexar apenas o texto puro do documento perde informação crucial: "isso é do contrato de 2024 ou de 2020?" Sem metadados, o sistema não consegue filtrar por data, departamento, tipo de documento, ou qualquer outro critério além de similaridade semântica.</p>

<h3>3. Threshold de similaridade zero</h3>
<p>Sem cutoff mínimo, o sistema SEMPRE retorna chunks — mesmo para perguntas que não têm resposta na base. O LLM recebe chunks irrelevantes e inventa uma resposta "baseada" neles. O usuário recebe uma alucinação com citação de fonte incorreta — pior do que não ter resposta.</p>

<h3>4. Documentos desatualizados na base</h3>
<p>RAG com documentos velhos gera respostas incorretas com aparência de alta confiança. "A política de reembolso é X" — baseado na versão de 2022, não na atual. Implemente: TTL por documento, re-indexação scheduled, ou workflow de aprovação para updates.</p>

<h3>5. Não monitorar queries sem resposta</h3>
<p>Queries com score baixo (abaixo do cutoff) são gaps reais na base de conhecimento. Se 20% das queries não têm resposta, sua base está incompleta. Registre essas queries e use para priorizar quais documentos adicionar.</p>

<h3>6. Prompt de geração genérico</h3>
<p>O prompt que envolve os chunks retornados e a query é tão importante quanto o retrieval. Um prompt genérico ("responda a pergunta com base nos documentos") perde oportunidades de: instruir formato de resposta, definir nível de detalhe, proibir extrapolações, e exigir citação de fontes.</p>

<h3>7. Não testar com perguntas negativas</h3>
<p>Teste não apenas o que o RAG deve responder, mas o que NÃO deve. Perguntas fora do escopo (sobre concorrentes, dados pessoais, assuntos não-empresariais) devem retornar "não tenho informação sobre isso" — não uma resposta fabricada.</p>

<h3>8. Indexar tudo de uma vez sem curadoria</h3>
<p>100 documentos limpos, bem formatados e atualizados produzem um RAG significativamente melhor do que 10.000 documentos com ruído, duplicatas, versões conflitantes, e conteúdo irrelevante. Comece com os 50 documentos mais consultados e expanda com curadoria.</p>`,
  },
  {
    id: "avancado",
    heading: "Estratégias avançadas: re-ranking, chunking hierárquico e hybrid search",
    content: `<h3>Re-ranking: segunda passagem de qualidade</h3>
<p>A busca vetorial é rápida mas imprecisa — ela compara embeddings, não entende contexto. Um re-ranker (Cohere Rerank, BGE Reranker) faz uma segunda avaliação nos top-K chunks usando um modelo mais sofisticado (cross-encoder) que compara query + chunk diretamente.</p>
<p><strong>Fluxo:</strong> Query → busca vetorial (top-20) → re-ranker (selecionar top-5) → LLM gerar resposta</p>
<p><strong>Impacto:</strong> Melhora Relevance em 15-30% com custo adicional de ~R$ 0,003 por query.</p>

<h3>Chunking hierárquico: contexto sem diluição</h3>
<p>Em vez de um nível só de chunks, crie dois:</p>
<ul>
  <li><strong>Nivel alto (seção/capítulo):</strong> Chunks grandes para contexto geral</li>
  <li><strong>Nível baixo (parágrafo):</strong> Chunks pequenos para precisão</li>
</ul>
<p>A busca usa chunks pequenos (precisos), mas envia ao LLM o chunk pai (contexto completo). Combina precisão de busca com qualidade de geração.</p>

<h3>Hybrid search: vetorial + keyword</h3>
<p>Busca vetorial é boa para perguntas semânticas ("como funciona o reajuste?") mas ruim para busca por termos exatos ("contrato nº 2024-0847"). Hybrid search combina:</p>
<ul>
  <li><strong>Busca vetorial:</strong> Encontra documentos semanticamente similares</li>
  <li><strong>Busca keyword (BM25):</strong> Encontra documentos com termos exatos</li>
  <li><strong>Fusão (RRF):</strong> Combina os resultados das duas buscas com pesos configuráveis</li>
</ul>
<p>Pinecone e Weaviate suportam hybrid search nativamente. Para pgvector, combine com ts_vector do PostgreSQL.</p>

<h3>Multi-modal RAG</h3>
<p>Para documentos com tabelas, gráficos ou imagens relevantes:</p>
<ul>
  <li>Extraia tabelas como texto estruturado (pandas ou Camelot para PDFs)</li>
  <li>Descreva imagens com modelo de visão (GPT-4o, Claude) e indexe as descrições</li>
  <li>Gráficos: converta dados em texto/tabela antes de indexar</li>
</ul>`,
  },
  {
    id: "metricas",
    heading: "Avaliação de qualidade: framework RAGAS e métricas automatizadas",
    content: `<p>Sem métricas de qualidade, você não sabe se o RAG está funcionando bem ou entregando lixo com configuração elegante. O framework RAGAS (Retrieval Augmented Generation Assessment) automatiza a avaliação:</p>

<h3>As 3 métricas essenciais</h3>
<table>
  <thead><tr><th>Métrica</th><th>O que mede</th><th>Meta</th><th>Como melhorar</th></tr></thead>
  <tbody>
    <tr><td><strong>Faithfulness</strong></td><td>A resposta é suportada pelos documentos retornados?</td><td>>0,85</td><td>Melhorar prompt de geração, adicionar instrução "só responda com base nos documentos"</td></tr>
    <tr><td><strong>Answer Relevancy</strong></td><td>A resposta responde a pergunta feita?</td><td>>0,80</td><td>Ajustar response_mode, melhorar prompt</td></tr>
    <tr><td><strong>Context Precision</strong></td><td>Os chunks retornados são os corretos?</td><td>>0,75</td><td>Ajustar chunk size, adicionar re-ranker, melhorar metadados</td></tr>
  </tbody>
</table>

<h3>Como rodar RAGAS</h3>
<pre><code class="language-python">from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_precision

# Dataset de avaliação: 30+ perguntas com respostas esperadas
eval_dataset = [
    {"question": "Qual o prazo de garantia?",
     "answer": "O prazo de garantia é de 12 meses...",
     "contexts": ["Conforme cláusula 8.1, o prazo de garantia..."],
     "ground_truth": "12 meses conforme cláusula 8.1"},
    # ... mais 29 exemplos
]

result = evaluate(
    dataset=eval_dataset,
    metrics=[faithfulness, answer_relevancy, context_precision]
)
print(result)  # DataFrame com scores por query e média geral</code></pre>

<h3>Ciclo de melhoria contínua</h3>
<ol>
  <li>Execute RAGAS com 30+ perguntas de teste semanalmente</li>
  <li>Identifique queries com score baixo em cada métrica</li>
  <li>Faithfulness baixo → melhorar prompt ou adicionar guardrails</li>
  <li>Relevancy baixo → ajustar top_k, response_mode ou adicionar re-ranker</li>
  <li>Context Precision baixo → melhorar chunking, adicionar metadados ou refinar embeddings</li>
  <li>Re-teste após ajustes — métricas devem melhorar ou manter</li>
</ol>`,
  },
  {
    id: "conclusao",
    heading: "Conclusão: RAG é o caminho mais rápido para IA útil na empresa",
    content: `<p>RAG não é teoria acadêmica — é a forma mais prática de fazer IA útil sobre dados da sua empresa em 2 semanas e com R$ 100/mês de custo operacional. O fluxo comprovado:</p>

<ol>
  <li><strong>Comece com 50 documentos curados</strong> (não 5.000 com lixo misturado)</li>
  <li><strong>Use a stack mínima:</strong> LlamaIndex + OpenAI Embeddings + Pinecone + GPT-4o mini</li>
  <li><strong>Implemente em 2 semanas:</strong> Semana 1 indexação, Semana 2 query + interface</li>
  <li><strong>Meça desde o dia 1:</strong> RAGAS para qualidade, logs para gaps, feedback para melhoria</li>
  <li><strong>Itere:</strong> Adicione documentos, ajuste chunking, refine prompts com base nos dados</li>
</ol>

<p>O maior risco não é técnico — é lançar sem curadoria de documentos e sem monitoramento de qualidade. RAG com documentos desatualizados e sem threshold de similaridade gera alucinações com citação de fontes — pior do que não ter RAG. Invista 60% do tempo em qualidade dos dados e 40% em engenharia.</p>`,
  },
],
callouts: [
  { type: "insight", title: "RAG vs. Fine-tuning", body: "Fine-tuning muda o comportamento do modelo (como ele responde). RAG muda o conteúdo que ele conhece. Para dados empresariais em mudança contínua, RAG é 10× mais prático e 100× mais barato do que fine-tuning." },
  { type: "warning", title: "Qualidade antes de volume", body: "50 documentos limpos, bem formatados e atualizados produzem RAG melhor do que 5.000 com ruído, duplicatas e versões conflitantes. Curadoria é 60% do sucesso de um RAG." },
  { type: "tip", title: "Métricas automatizadas com RAGAS", body: "Avalie seu RAG semanalmente com 3 métricas: Faithfulness (resposta sustentada pelos docs?), Relevance (responde a pergunta?) e Context Precision (chunks retornados corretos?). RAGAS automatiza — não dependa de avaliação manual." },
  { type: "warning", title: "Threshold obrigatório", body: "Sem similarity cutoff (≥0.72), o sistema retorna chunks para TODA query — mesmo sem resposta na base. Resultado: alucinação com citação de fonte incorreta. Sempre defina cutoff mínimo." },
],
mindMap: {
  label: "RAG Empresarial",
  children: [
    { label: "Pipeline", children: [
      { label: "Indexação (docs→chunks→vetores)" },
      { label: "Retrieval (query→top-K→re-rank)" },
      { label: "Generation (LLM+contexto→resposta)" },
    ]},
    { label: "Stack", children: [
      { label: "LlamaIndex framework" },
      { label: "text-embedding-3-small" },
      { label: "Pinecone ou pgvector" },
      { label: "GPT-4o mini / Claude Haiku" },
    ]},
    { label: "Qualidade", children: [
      { label: "Chunking 256-512 tokens" },
      { label: "Metadados obrigatórios" },
      { label: "Threshold ≥ 0.72" },
      { label: "RAGAS avaliação semanal" },
    ]},
    { label: "Avançado", children: [
      { label: "Re-ranking (Cohere)" },
      { label: "Hybrid search" },
      { label: "Chunking hierárquico" },
    ]},
  ],
},
mnemonic: {
  acronym: "CREIA",
  breakdown: [
    { letter: "C", word: "Chunking correto", hint: "256–512 tokens com overlap, metadados incluídos" },
    { letter: "R", word: "Retrieval top-K", hint: "Busca vetorial + re-ranker + threshold" },
    { letter: "E", word: "Embeddings + índice", hint: "text-embedding-3-small → Pinecone/pgvector" },
    { letter: "I", word: "Interface de query", hint: "API FastAPI + Streamlit/Next.js em 2 semanas" },
    { letter: "A", word: "Avaliação contínua", hint: "RAGAS semanal + logs de gaps + feedback" },
  ],
},
relatedSlugs: ["llms-no-mundo-corporativo", "custo-real-de-ia-openai-vs-claude", "integracao-api-whatsapp-business"],
};

export default post;
