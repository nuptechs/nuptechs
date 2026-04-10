import type { Post } from "../[slug]/page";

const post: Post = {
slug: "como-automatizar-entrada-de-dados-com-n8n",
tag: "Automação",
title: "Como automatizar entrada de dados com n8n — tutorial passo a passo",
description: "Aprenda a criar fluxos no n8n que eliminam o trabalho manual de copiar dados entre sistemas. Com exemplos reais, JSON e prints de cada etapa.",
keywords: ["n8n tutorial", "automatizar entrada de dados", "n8n passo a passo", "fluxo automático n8n", "integração sem código"],
readTime: "10 min",
publishedAt: "2026-02-20",
updatedAt: "2026-04-10",
author: { name: "NuPtechs", role: "Engenharia & Automação" },
keyTakeaways: [
  "n8n é open-source, auto-hospedável e tem 400+ integrações nativas — sem custo de licença",
  "O fluxo básico tem 3 nós: Trigger → Processamento → Destino",
  "Use o nó HTTP Request para qualquer API que não tem integração nativa",
  "Credenciais ficam no Credentials Manager — nunca no fluxo em si",
  "Em 1 hora você tem o primeiro fluxo funcionando; em 1 semana, o processo está em produção",
],
executiveSummary: "n8n é a ferramenta mais poderosa para automatizar entrada de dados sem escrever código. Em 1 hora você conecta dois sistemas que antes exigiam copiar manualmente. Este tutorial mostra o caminho completo — do zero ao primeiro fluxo em produção.",
sections: [
  {
    id: "o-que-e-n8n",
    heading: "O que é o n8n e por que ele se destaca",
    content: `<p>n8n (pronuncia-se "n-eight-n") é uma plataforma de automação de fluxos open-source lançada em 2019. O diferencial em relação a Zapier e Make:</p>
<ul>
  <li><strong>Open-source com self-hosting:</strong> instale no seu servidor e seus dados nunca saem da empresa.</li>
  <li><strong>Sem limite de execuções</strong> na versão self-hosted — fundamental para volumes empresariais.</li>
  <li><strong>400+ integrações nativas</strong> (Google Sheets, Notion, Salesforce, PostgreSQL, WhatsApp...) e nó HTTP genérico para o resto.</li>
  <li><strong>Código quando necessário:</strong> nó Function permite JavaScript e Python inline — sem precisar sair da plataforma.</li>
</ul>
<p>Para uma empresa que processa centenas de registros por dia, o custo-benefício do n8n self-hosted vs. Zapier pago é de 10–50x.</p>`,
  },
  {
    id: "instalacao",
    heading: "Instalação em 5 minutos com Docker",
    content: `<p>A forma mais rápida de rodar o n8n localmente:</p>
<pre><code class="language-bash">docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n</code></pre>
<p>Acesse <code>http://localhost:5678</code> e crie sua conta. Para produção, recomendamos a combinação <strong>n8n + PostgreSQL + Nginx + SSL</strong> via docker-compose. A documentação oficial tem o arquivo pronto.</p>
<p><strong>Alternativa sem servidor:</strong> n8n Cloud (plano gratuito com 5 fluxos ativos e 200 execuções/mês) — ideal para testar antes de hospedar.</p>`,
  },
  {
    id: "primeiro-fluxo",
    heading: "Construindo o primeiro fluxo: formulário → planilha",
    content: `<p>Cenário: um formulário de contato no site deve registrar cada envio automaticamente em uma planilha do Google Sheets.</p>
<p><strong>Passo 1 — Criar o workflow:</strong> Na sidebar, clique em "New Workflow". Nomeie como "Formulário → Sheets".</p>
<p><strong>Passo 2 — Trigger (Webhook):</strong></p>
<ol>
  <li>Adicione o nó <strong>Webhook</strong> ao canvas.</li>
  <li>Selecione método <code>POST</code>.</li>
  <li>Copie a URL gerada (ex: <code>https://seu-n8n.com/webhook/abc123</code>).</li>
  <li>Cole essa URL no atributo <code>action</code> do seu formulário HTML.</li>
</ol>
<p><strong>Passo 3 — Processamento (Set):</strong> Adicione um nó <strong>Set</strong> para mapear os campos do formulário para os nomes das colunas da planilha.</p>
<pre><code class="language-json">{
  "Nome": "{{ $json.name }}",
  "Email": "{{ $json.email }}",
  "Mensagem": "{{ $json.message }}",
  "Data": "{{ $now.format('DD/MM/YYYY HH:mm') }}"
}</code></pre>
<p><strong>Passo 4 — Destino (Google Sheets):</strong></p>
<ol>
  <li>Adicione nó <strong>Google Sheets</strong>.</li>
  <li>Conecte suas credenciais Google (OAuth2 via Credentials Manager).</li>
  <li>Operação: "Append" → selecione a planilha e a aba.</li>
  <li>Ative o fluxo com o toggle no canto superior direito.</li>
</ol>`,
  },
  {
    id: "conceitos-essenciais",
    heading: "Conceitos essenciais do n8n",
    content: `<h3>Expressões ({{ }})</h3>
<p>n8n usa expressões entre chaves duplas para acessar dados dinâmicos. As mais úteis:</p>
<ul>
  <li><code>{{ $json.campo }}</code> — valor do nó anterior</li>
  <li><code>{{ $node["Nome do Nó"].json.campo }}</code> — valor de nó específico</li>
  <li><code>{{ $now.toISO() }}</code> — timestamp atual</li>
  <li><code>{{ $items().length }}</code> — quantidade de itens no lote</li>
</ul>

<h3>Itens e lotes (Items)</h3>
<p>Cada nó processa uma lista de <strong>itens</strong>. Por padrão, o próximo nó recebe todos os itens do nó anterior. Use <strong>SplitInBatches</strong> para processar em grupos (útil para respeitar rate limits de APIs).</p>

<h3>Tratamento de erros</h3>
<p>Configure um <strong>Error Trigger</strong> conectado a um nó de notificação (Slack, e-mail ou WhatsApp). Assim, se um fluxo falhar, você recebe alerta imediato com o erro completo.</p>`,
  },
  {
    id: "caso-real",
    heading: "Caso real: sincronizar CRM com ERP automaticamente",
    content: `<p>Uma distribuidora recebia pedidos pelo CRM (Pipedrive) e precisava criá-los manualmente no ERP (TOTVS). Com n8n:</p>
<ol>
  <li><strong>Trigger:</strong> Pipedrive Trigger → "Deal won" (negócio fechado)</li>
  <li><strong>Buscar dados do cliente:</strong> HTTP Request → API Pipedrive <code>GET /persons/{id}</code></li>
  <li><strong>Transformar:</strong> Function node → mapear campos Pipedrive → formato TOTVS</li>
  <li><strong>Criar pedido:</strong> HTTP Request → API TOTVS <code>POST /pedidos</code></li>
  <li><strong>Notificar:</strong> WhatsApp API → mensagem para o time de logística</li>
</ol>
<p><strong>Resultado:</strong> Eliminação de 3h/dia de trabalho manual. Zero erros de transcrição. Pedido criado no ERP em menos de 10 segundos após fechamento no CRM.</p>`,
  },
  {
    id: "dicas-producao",
    heading: "Dicas para colocar fluxos em produção com segurança",
    content: `<ul>
  <li><strong>Use variáveis de ambiente</strong> para URLs e chaves de API — nunca valores fixos no fluxo.</li>
  <li><strong>Ative logs:</strong> n8n guarda histórico de cada execução. Configure retenção de 30 dias no mínimo.</li>
  <li><strong>Teste com dados reais primeiro:</strong> use a função "Execute once" com payload de produção antes de ativar.</li>
  <li><strong>Versionamento:</strong> exporte os workflows como JSON e versione no Git — mudanças ficam auditáveis.</li>
  <li><strong>Monitoramento:</strong> configure o Execution Monitor para alertas de falha e latência alta.</li>
</ul>`,
  },
],
callouts: [
  { type: "tip", title: "Comece pequeno", body: "Escolha o processo mais simples (ex: formulário → planilha) para o primeiro fluxo. A confiança construída com um quick win facilita a aprovação de automações mais complexas." },
  { type: "example", title: "Caso real de ROI", body: "Uma distribuidora eliminou 3h/dia de entrada manual de pedidos com um fluxo n8n de 5 nós. Tempo de implementação: 4 horas. Payback: no primeiro dia útil." },
  { type: "warning", title: "Atenção com credenciais", body: "Nunca cole tokens de API diretamente nas expressões do fluxo. Use sempre o Credentials Manager do n8n — as chaves ficam criptografadas e não aparecem no JSON exportado." },
],
mindMap: {
  label: "n8n Automação",
  children: [
    { label: "Setup", children: [
      { label: "Docker local" },
      { label: "n8n Cloud (free)" },
      { label: "Self-hosted VPS" },
    ]},
    { label: "Estrutura do fluxo", children: [
      { label: "Trigger (entrada)" },
      { label: "Processamento" },
      { label: "Destino (saída)" },
      { label: "Error handler" },
    ]},
    { label: "Nós essenciais", children: [
      { label: "Webhook" },
      { label: "HTTP Request" },
      { label: "Set / Function" },
      { label: "Google Sheets" },
    ]},
    { label: "Produção", children: [
      { label: "Env variables" },
      { label: "Logs 30d" },
      { label: "Git export" },
    ]},
  ],
},
mnemonic: {
  acronym: "TRADE",
  breakdown: [
    { letter: "T", word: "Trigger", hint: "O gatilho que inicia o fluxo" },
    { letter: "R", word: "Roteamento", hint: "Condicional IF/Switch para desvios" },
    { letter: "A", word: "Ação (nós)", hint: "HTTP, Sheets, WhatsApp..." },
    { letter: "D", word: "Dados mapeados", hint: "Set node formata os campos" },
    { letter: "E", word: "Erro tratado", hint: "Error Trigger sempre configurado" },
  ],
},
relatedSlugs: ["como-automatizar-processos-manuais", "integracao-api-whatsapp-business"],
};

export default post;
