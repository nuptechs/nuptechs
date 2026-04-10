import type { Post } from "../[slug]/page";

const post: Post = {
slug: "como-implementar-rag-na-sua-empresa",
tag: "IA Aplicada",
title: "Como implementar RAG na sua empresa em 2 semanas",
description: "Guia prático para criar um sistema de busca inteligente sobre documentos internos usando Retrieval-Augmented Generation — com stack, custos e armadilhas.",
keywords: ["RAG empresarial", "Retrieval-Augmented Generation", "IA sobre documentos internos", "chatbot com base de conhecimento", "RAG implementação"],
readTime: "9 min",
publishedAt: "2026-02-17",
updatedAt: "2026-04-10",
author: { name: "NuPtechs", role: "IA & Machine Learning" },
keyTakeaways: [
  "RAG = Busca vetorial + LLM: o modelo responde com base em documentos seus, não no treinamento geral",
  "Três problemas que RAG resolve que um LLM puro não resolve: dados proprietários, atualização contínua e citação de fontes",
  "Stack mínima viável: Langchain/LlamaIndex + OpenAI Embeddings + Pinecone + GPT-4o",
  "Semana 1: ingestão e indexação; Semana 2: API de query + interface",
  "Custo mensal para 50 docs + 1000 queries: ~R$ 50–150",
],
sections: [
  {
    id: "o-que-e-rag",
    heading: "O que é RAG e por que mudou tudo",
    content: `<p><strong>RAG (Retrieval-Augmented Generation)</strong> é a técnica de conectar um LLM a uma base de documentos externa para que as respostas sejam baseadas no conteúdo real da empresa — não no conhecimento de treinamento do modelo.</p>
<p>Sem RAG, ao perguntar ao GPT sobre a política de reembolso da sua empresa, ele vai inventar uma resposta plausível. Com RAG, ele busca a página exata do manual de RH e responde com precisão, citando a fonte.</p>
<p>O fluxo em 3 passos:</p>
<ol>
  <li><strong>Indexação:</strong> seus documentos são transformados em vetores numéricos e armazenados em um banco vetorial.</li>
  <li><strong>Retrieval:</strong> a pergunta do usuário também vira um vetor; o banco retorna os documentos mais similares.</li>
  <li><strong>Generation:</strong> o LLM recebe os documentos relevantes + a pergunta e gera uma resposta fundamentada.</li>
</ol>`,
  },
  {
    id: "quando-usar",
    heading: "Quando RAG é a solução certa",
    content: `<p>RAG é ideal quando:</p>
<ul>
  <li><strong>Dados proprietários:</strong> o LLM não sabe sobre sua empresa — manuais, contratos, histórico de atendimento, base de conhecimento interna.</li>
  <li><strong>Atualização frequente:</strong> adicionar ou atualizar documentos é instantâneo; re-treinar um modelo leva semanas e custa milhares de dólares.</li>
  <li><strong>Transparência exigida:</strong> o usuário precisa ver de onde veio a informação — RAG cita as fontes; LLM puro não consegue.</li>
  <li><strong>Compliance:</strong> auditoria exige rastreabilidade das respostas.</li>
</ul>
<p>RAG <strong>não é a solução certa</strong> para: processamento de imagens/vídeo sem OCR, cálculos complexos ou quando o volume de documentos é inferior a 20 — nesse caso, cole tudo no contexto diretamente.</p>`,
  },
  {
    id: "stack-semana-1",
    heading: "Semana 1: ingestão e indexação de documentos",
    content: `<p><strong>Stack mínima viável:</strong></p>
<ul>
  <li><strong>Loader:</strong> LlamaIndex <code>SimpleDirectoryReader</code> (PDF, Word, TXT, Markdown)</li>
  <li><strong>Chunking:</strong> divisão em blocos de 512 tokens com overlap de 50 tokens</li>
  <li><strong>Embeddings:</strong> <code>text-embedding-3-small</code> da OpenAI (1536 dims, ~R$0,10/1M tokens)</li>
  <li><strong>Vector store:</strong> Pinecone Serverless (free tier para até 100k vetores)</li>
</ul>
<pre><code class="language-python">from llama_index.core import SimpleDirectoryReader, VectorStoreIndex
from llama_index.vector_stores.pinecone import PineconeVectorStore

documents = SimpleDirectoryReader("./docs").load_data()
vector_store = PineconeVectorStore(pinecone_index=pinecone_index)
index = VectorStoreIndex.from_documents(
documents,
vector_store=vector_store,
show_progress=True
)</code></pre>
<p>Para 50 documentos de tamanho médio (~10 páginas cada): indexação em ~5 minutos, custo de embeddings <R$ 1.</p>`,
  },
  {
    id: "stack-semana-2",
    heading: "Semana 2: API de query e interface",
    content: `<p>Com o índice populado, crie a API de query:</p>
<pre><code class="language-python">query_engine = index.as_query_engine(
similarity_top_k=5,           # retornar top-5 chunks mais similares
response_mode="compact",      # sumarizar em vez de concatenar
node_postprocessors=[         # filtros opcionais
    SimilarityPostprocessor(similarity_cutoff=0.75)
]
)

response = query_engine.query("Qual o prazo de garantia dos contratos?")
print(response.response)          # resposta gerada
print(response.source_nodes)      # documentos citados</code></pre>
<p><strong>Interface recomendada:</strong> para uso interno, Streamlit resolve em poucas horas. Para produção, uma API FastAPI + frontend Next.js. Para integração com WhatsApp, n8n com nó HTTP Request chama a API diretamente.</p>`,
  },
  {
    id: "armadilhas",
    heading: "As 5 armadilhas mais comuns na implementação",
    content: `<ol>
  <li><strong>Chunks muito grandes:</strong> chunks de 2000+ tokens diluem o significado. Otimum: 256–512 tokens com overlap.</li>
  <li><strong>Sem metadados:</strong> não indexe apenas o texto — inclua nome do arquivo, data, seção. Permite filtros precisos.</li>
  <li><strong>Threshold de similaridade zero:</strong> sem filtro mínimo, o sistema retorna documentos irrelevantes com confiança. Use score ≥ 0,75.</li>
  <li><strong>Ignorar documentos desatualizados:</strong> RAG com documentos velhos pode gerar respostas incorretas com aparência de confiança. Implemente TTL ou re-indexação automática.</li>
  <li><strong>Não monitorar queries sem resposta:</strong> registre queries com score baixo — são gaps na base de conhecimento.</li>
</ol>`,
  },
],
callouts: [
  { type: "insight", title: "RAG vs. Fine-tuning", body: "Fine-tuning muda o comportamento do modelo (como ele responde). RAG muda o conteúdo que ele conhece. Para dados empresariais em mudança contínua, RAG é sempre mais prático e barato." },
  { type: "warning", title: "Qualidade antes de volume", body: "100 documentos limpos, bem formatados e atualizados produzem um RAG melhor do que 1.000 documentos com ruído, duplicatas e informações contraditórias." },
  { type: "tip", title: "Métricas de qualidade", body: "Avalie seu RAG com 3 métricas: Faithfulness (resposta tem suporte nos documentos?), Relevance (resposta responde à pergunta?) e Context Precision (documentos retornados são úteis?). Framework RAGAS automatiza essa avaliação." },
],
mindMap: {
  label: "RAG Empresarial",
  children: [
    { label: "Pipeline", children: [
      { label: "Indexação (docs→vetores)" },
      { label: "Retrieval (query→top-K)" },
      { label: "Generation (LLM+contexto)" },
    ]},
    { label: "Stack mínima", children: [
      { label: "LlamaIndex loader" },
      { label: "text-embedding-3-small" },
      { label: "Pinecone vetores" },
      { label: "GPT-4o resposta" },
    ]},
    { label: "Armadilhas", children: [
      { label: "Chunks grandes" },
      { label: "Sem threshold" },
      { label: "Docs desatualizados" },
    ]},
  ],
},
mnemonic: {
  acronym: "CREIA",
  breakdown: [
    { letter: "C", word: "Chunking correto", hint: "256–512 tokens com overlap" },
    { letter: "R", word: "Retrieval top-K", hint: "Busca os mais similares primeiro" },
    { letter: "E", word: "Embeddings + índice", hint: "Texto → vetor → Pinecone" },
    { letter: "I", word: "Interface de query", hint: "API + UI em 2 semanas" },
    { letter: "A", word: "Atualização contínua", hint: "Indexe novos docs sem re-treinar" },
  ],
},
relatedSlugs: ["llms-no-mundo-corporativo", "integracao-api-whatsapp-business"],
};

export default post;
