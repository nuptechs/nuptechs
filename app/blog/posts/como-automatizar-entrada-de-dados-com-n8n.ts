import type { Post } from "../[slug]/page";

const post: Post = {
slug: "como-automatizar-entrada-de-dados-com-n8n",
tag: "Automação",
title: "Como automatizar entrada de dados com n8n — tutorial passo a passo",
description: "Aprenda a criar fluxos no n8n que eliminam o trabalho manual de copiar dados entre sistemas. Com exemplos reais, JSON e prints de cada etapa.",
keywords: ["n8n tutorial", "automatizar entrada de dados", "n8n passo a passo", "fluxo automático n8n", "integração sem código", "n8n docker self-hosted", "n8n vs Zapier", "n8n CRM ERP integração"],
readTime: "26 min",
publishedAt: "2026-02-20",
updatedAt: "2026-04-10",
author: { name: "NuPtechs", role: "Engenharia & Automação" },
executiveSummary: "n8n é a ferramenta open-source mais poderosa para automatizar entrada de dados sem escrever código. Em 1 hora você conecta dois sistemas que antes exigiam copiar manualmente. Este tutorial cobre: instalação em 5 minutos com Docker, o primeiro fluxo do zero ao deploy, 6 padrões de automação prontos para produção (formulário→planilha, CRM→ERP, e-mail→banco, NF→contabilidade, estoque→alerta, onboarding→multi-sistema), comparativo com Zapier/Make por custo e volume, segurança e credenciais, tratamento de erros robusto, e o roadmap para escalar de 1 fluxo para uma operação inteira automatizada.",
keyTakeaways: [
  "n8n é open-source, auto-hospedável e tem 400+ integrações nativas — sem custo de licença por execução",
  "O fluxo básico tem 3 nós: Trigger → Processamento → Destino. Aprenda esse padrão e aplique em qualquer cenário",
  "Use o nó HTTP Request para qualquer API que não tem integração nativa — funciona com REST, GraphQL e SOAP",
  "Credenciais ficam no Credentials Manager criptografado — nunca cole tokens diretamente no fluxo",
  "Para >5.000 execuções/dia, custo n8n self-hosted é 10-50× menor que Zapier pago ou Make pago",
  "Em 1 hora você monta o primeiro fluxo; em 1 semana está em produção eliminando horas de trabalho manual",
],
sections: [
  {
    id: "o-que-e-n8n",
    heading: "O que é o n8n e por que é a melhor escolha para PMEs",
    content: `<p>n8n (pronuncia-se "n-eight-n") é uma plataforma de automação de fluxos open-source lançada em 2019. O nome vem de "nodemation" — automação baseada em nós visuais conectados em sequência.</p>

<p>O diferencial em relação a Zapier, Make (Integromat) e Power Automate:</p>
<ul>
  <li><strong>Open-source com self-hosting:</strong> Instale no seu servidor, seus dados nunca saem da empresa. Zero dependência de terceiros para dados sensíveis.</li>
  <li><strong>Sem limite de execuções:</strong> Na versão self-hosted, não há cobrança por execução. Zapier cobra por "task" — 750 tasks/mês no plano free, depois US$ 19.99+/mês.</li>
  <li><strong>400+ integrações nativas:</strong> Google Sheets, Notion, Salesforce, PostgreSQL, WhatsApp, Slack, HubSpot, Stripe, GitHub, e mais. O nó HTTP genérico conecta qualquer API REST.</li>
  <li><strong>Código quando necessário:</strong> Nó Function permite JavaScript e Python inline — quando o visual não resolve, código resolve sem sair da plataforma.</li>
  <li><strong>Comunidade ativa:</strong> 40.000+ membros no fórum, 900+ templates prontos para importar, e ecossistema crescendo.</li>
</ul>

<h3>n8n vs. Zapier vs. Make: comparativo por custo e volume</h3>
<table>
  <thead><tr><th>Critério</th><th>n8n self-hosted</th><th>Zapier</th><th>Make</th></tr></thead>
  <tbody>
    <tr><td><strong>Custo mensal (1.000 exec/dia)</strong></td><td>R$ 100-200 (VPS)</td><td>US$ 299/mês (Team)</td><td>US$ 99/mês (Teams)</td></tr>
    <tr><td><strong>Custo mensal (10.000 exec/dia)</strong></td><td>R$ 200-400 (VPS maior)</td><td>US$ 599+/mês (Company)</td><td>US$ 299+/mês</td></tr>
    <tr><td><strong>Dados ficam onde</strong></td><td>Seu servidor</td><td>Cloud Zapier (US)</td><td>Cloud Make (EU)</td></tr>
    <tr><td><strong>Código customizado</strong></td><td>JS + Python inline</td><td>Limitado (Code by Zapier)</td><td>Limitado (JS modules)</td></tr>
    <tr><td><strong>Integrações</strong></td><td>400+ nativos + HTTP</td><td>5.000+ (maior catálogo)</td><td>1.500+</td></tr>
    <tr><td><strong>Curva de aprendizado</strong></td><td>Média (precisa de infra)</td><td>Baixa (tudo gerenciado)</td><td>Média</td></tr>
  </tbody>
</table>
<p><strong>Recomendação:</strong> Se tem equipe técnica mínima (1 dev) e >500 execuções/dia, n8n self-hosted. Se não tem ninguém técnico e volume é baixo, Zapier ou Make.</p>`,
  },
  {
    id: "instalacao",
    heading: "Instalação em 5 minutos: Docker, Cloud e produção",
    content: `<h3>Opção 1: Docker local (desenvolvimento)</h3>
<pre><code class="language-bash"># Rodar n8n com persistência de dados
docker run -it --rm \\
  --name n8n \\
  -p 5678:5678 \\
  -v ~/.n8n:/home/node/.n8n \\
  n8nio/n8n</code></pre>
<p>Acesse <code>http://localhost:5678</code> e crie sua conta. Dados e workflows ficam em <code>~/.n8n</code>.</p>

<h3>Opção 2: docker-compose para produção</h3>
<pre><code class="language-yaml">version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    environment:
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=\${N8N_DB_PASSWORD}
      - N8N_ENCRYPTION_KEY=\${N8N_ENCRYPTION_KEY}
      - WEBHOOK_URL=https://n8n.suaempresa.com/
    volumes:
      - n8n_data:/home/node/.n8n
    depends_on:
      - postgres
  postgres:
    image: postgres:16
    environment:
      - POSTGRES_DB=n8n
      - POSTGRES_USER=n8n
      - POSTGRES_PASSWORD=\${N8N_DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  n8n_data:
  postgres_data:</code></pre>
<p><strong>Importante em produção:</strong></p>
<ul>
  <li>Use PostgreSQL (não SQLite padrão) para persistência robusta</li>
  <li>Defina <code>N8N_ENCRYPTION_KEY</code> — sem ela, credenciais são armazenadas em texto plano</li>
  <li>Coloque atrás de reverse proxy (nginx/Caddy) com HTTPS via Let's Encrypt</li>
  <li>Configure backup automático do PostgreSQL (pg_dump diário)</li>
</ul>

<h3>Opção 3: n8n Cloud (sem servidor)</h3>
<p>n8n Cloud oferece plano gratuito com 5 workflows e 200 execuções/mês — ideal para testar. Plano Starter (US$ 20/mês) com 2.500 execuções. Para Volume acima, self-hosted é mais econômico.</p>

<h3>Requisitos de servidor para self-hosted</h3>
<table>
  <thead><tr><th>Volume</th><th>CPU</th><th>RAM</th><th>Disco</th><th>Custo VPS</th></tr></thead>
  <tbody>
    <tr><td>Até 500 exec/dia</td><td>1 vCPU</td><td>2 GB</td><td>20 GB</td><td>R$ 50-100/mês</td></tr>
    <tr><td>500-5.000 exec/dia</td><td>2 vCPU</td><td>4 GB</td><td>40 GB</td><td>R$ 100-250/mês</td></tr>
    <tr><td>5.000-50.000 exec/dia</td><td>4 vCPU</td><td>8 GB</td><td>80 GB</td><td>R$ 250-500/mês</td></tr>
  </tbody>
</table>`,
  },
  {
    id: "primeiro-fluxo",
    heading: "Tutorial: primeiro fluxo do zero — formulário → planilha",
    content: `<p>Cenário: um formulário de contato no site deve registrar cada envio automaticamente em uma planilha do Google Sheets — sem copiar manualmente.</p>

<h3>Passo 1: Criar o workflow</h3>
<p>Na sidebar do n8n, clique em "New Workflow". Nomeie como "Formulário → Sheets".</p>

<h3>Passo 2: Trigger (Webhook)</h3>
<ol>
  <li>Adicione o nó <strong>Webhook</strong> ao canvas (clique + busque "Webhook")</li>
  <li>Selecione método <code>POST</code></li>
  <li>Path: <code>formulario-contato</code></li>
  <li>O n8n gera a URL: <code>https://seu-n8n.com/webhook/formulario-contato</code></li>
  <li>Cole essa URL no atributo <code>action</code> do formulário HTML do site</li>
</ol>

<h3>Passo 3: Processamento (Set)</h3>
<p>Adicione um nó <strong>Set</strong> para mapear os campos do formulário para os nomes das colunas da planilha:</p>
<pre><code class="language-json">{
  "Nome": "{{ $json.name }}",
  "Email": "{{ $json.email }}",
  "Mensagem": "{{ $json.message }}",
  "Data": "{{ $now.format('DD/MM/YYYY HH:mm') }}",
  "Origem": "Site - Formulário de Contato"
}</code></pre>

<h3>Passo 4: Destino (Google Sheets)</h3>
<ol>
  <li>Adicione nó <strong>Google Sheets</strong></li>
  <li>Conecte credenciais Google (OAuth2 via Credentials Manager)</li>
  <li>Operação: <strong>Append Row</strong></li>
  <li>Selecione a planilha e a aba de destino</li>
  <li>Mapeie os campos do nó Set para as colunas da planilha</li>
</ol>

<h3>Passo 5: Testar e ativar</h3>
<ol>
  <li>Clique em "Test Workflow" e envie um POST de teste (via curl ou webhook.site)</li>
  <li>Verifique se a linha apareceu na planilha</li>
  <li>Ative o workflow com o toggle (muda de Test URL para Production URL)</li>
</ol>

<h3>Resultado</h3>
<p>Cada submissão do formulário aparece na planilha em &lt;3 segundos. Zero trabalho manual. Se o fluxo falhar, o n8n registra o erro e você pode reprocessar.</p>`,
  },
  {
    id: "conceitos-essenciais",
    heading: "Conceitos essenciais do n8n que todo operador precisa dominar",
    content: `<h3>Expressões ({{ }})</h3>
<p>n8n usa expressões entre chaves duplas para acessar dados dinâmicos. As mais úteis:</p>
<table>
  <thead><tr><th>Expressão</th><th>O que retorna</th><th>Quando usar</th></tr></thead>
  <tbody>
    <tr><td><code>{{ $json.campo }}</code></td><td>Valor do nó anterior</td><td>Acessar dados do input</td></tr>
    <tr><td><code>{{ $node["Nome"].json.campo }}</code></td><td>Valor de nó específico</td><td>Acessar dados de nó não-adjacente</td></tr>
    <tr><td><code>{{ $now.toISO() }}</code></td><td>Timestamp atual</td><td>Registrar data/hora</td></tr>
    <tr><td><code>{{ $items().length }}</code></td><td>Quantidade de itens</td><td>Contagens e condicionais</td></tr>
    <tr><td><code>{{ $env.VARIAVEL }}</code></td><td>Variável de ambiente</td><td>Chaves e configurações</td></tr>
    <tr><td><code>{{ $json.campo ?? 'padrão' }}</code></td><td>Valor ou fallback</td><td>Campos opcionais</td></tr>
  </tbody>
</table>

<h3>Itens e lotes (Items)</h3>
<p>Cada nó processa uma lista de <strong>itens</strong>. Se o nó anterior retorna 50 registros, o próximo nó processa os 50. Conceitos-chave:</p>
<ul>
  <li><strong>SplitInBatches:</strong> Divide itens em grupos menores. Essencial para respeitar rate limits de APIs (ex: "máximo 10 requests por segundo").</li>
  <li><strong>Merge:</strong> Combina itens de dois fluxos diferentes (join de dados de dois sistemas).</li>
  <li><strong>Item Lists:</strong> Agrupa, ordena, filtra e remove duplicatas de listas de itens.</li>
</ul>

<h3>Fluxo condicional (IF / Switch)</h3>
<p>Nem todo item segue o mesmo caminho. Use <strong>IF</strong> para bifurcações simples (sim/não) e <strong>Switch</strong> para múltiplos caminhos:</p>
<pre><code class="language-javascript">// IF: Valor do pedido > R$ 1.000
// Saída TRUE → notificar gerente
// Saída FALSE → apenas registrar

// Switch: Tipo de ticket
// "bug" → equipe de dev
// "dúvida" → equipe de suporte
// "feature" → backlog do produto</code></pre>

<h3>Tratamento de erros</h3>
<p>Configure um <strong>Error Trigger</strong> conectado a um nó de notificação. Assim, se um fluxo falhar, você recebe alerta imediato:</p>
<ul>
  <li>Conecte Error Trigger → Slack/WhatsApp/Email com mensagem de erro</li>
  <li>Inclua: nome do workflow, nó que falhou, mensagem de erro, timestamp</li>
  <li>Configure para falhas consecutivas (3 falhas seguidas → alerta urgente)</li>
</ul>`,
  },
  {
    id: "seis-padroes",
    heading: "6 padrões de automação prontos para produção",
    content: `<h3>Padrão 1: Formulário → Planilha + Notificação</h3>
<p><strong>Trigger:</strong> Webhook do formulário do site</p>
<p><strong>Fluxo:</strong> Webhook → Set (mapear campos) → Google Sheets (registrar) + WhatsApp (notificar equipe comercial)</p>
<p><strong>ROI:</strong> Elimina verificação manual de formulários. Lead recebe atenção em 3s em vez de 2h.</p>

<h3>Padrão 2: CRM → ERP (sincronização de pedidos)</h3>
<p><strong>Trigger:</strong> Pipedrive Trigger → "Deal won"</p>
<p><strong>Fluxo:</strong> Pipedrive → HTTP Request (buscar dados do cliente) → Function (transformar formato) → HTTP Request (POST no ERP) → WhatsApp (logística)</p>
<p><strong>ROI:</strong> Elimina 3h/dia de transcrição manual de pedidos. Zero erros de digitação.</p>

<h3>Padrão 3: E-mail → Banco de dados</h3>
<p><strong>Trigger:</strong> IMAP Email Trigger → novos e-mails em caixa específica</p>
<p><strong>Fluxo:</strong> Email → GPT-4o mini (extrair dados: nome, valor, data) → PostgreSQL (INSERT) → Google Sheets (backup)</p>
<p><strong>ROI:</strong> Automatiza extração de dados de e-mails padronizados (NFs de fornecedores, confirmações de pagamento).</p>

<h3>Padrão 4: NF emitida → Contabilidade + Cliente</h3>
<p><strong>Trigger:</strong> Webhook do sistema fiscal (NF emitida)</p>
<p><strong>Fluxo:</strong> Webhook → HTTP Request (download PDF da NF) → Google Drive (salvar) → Email (enviar ao cliente) → Google Sheets (controle fiscal)</p>
<p><strong>ROI:</strong> Elimina envio manual de NFs. Para 200 NFs/mês, economiza 1 dia inteiro de trabalho.</p>

<h3>Padrão 5: Estoque → Alerta + Pedido automático</h3>
<p><strong>Trigger:</strong> Schedule (a cada 1h) → PostgreSQL (query estoque < mínimo)</p>
<p><strong>Fluxo:</strong> Query → IF (estoque < mínimo) → Email para fornecedor (pedido padronizado) + Slack (gerente de compras) + Sheets (log de alertas)</p>
<p><strong>ROI:</strong> Elimina ruptura de estoque. Pedidos disparados automaticamente antes de acabar.</p>

<h3>Padrão 6: Onboarding → Multi-sistema</h3>
<p><strong>Trigger:</strong> Webhook (novo funcionário cadastrado no RH)</p>
<p><strong>Fluxo:</strong> Webhook → Google Workspace (criar conta de email) → Slack (adicionar aos canais) → Notion (criar página do funcionário) → Email (boas-vindas com links) → Trello (card de onboarding para gestor)</p>
<p><strong>ROI:</strong> Onboarding que levava 2h por funcionário cai para 30 segundos automáticos.</p>`,
  },
  {
    id: "caso-real",
    heading: "Caso real detalhado: distribuidora CRM → ERP em 4 horas",
    content: `<p>Uma distribuidora de materiais de construção com 30 funcionários usava Pipedrive (CRM) para gestão comercial e TOTVS (ERP) para faturamento. O processo era:</p>

<h3>Antes (manual)</h3>
<ol>
  <li>Vendedor fecha negócio no Pipedrive (marca como "won")</li>
  <li>Vendedor copia os dados do deal para um formulário interno</li>
  <li>Assistente administrativa recebe o formulário</li>
  <li>Assistente digita os dados no TOTVS para gerar pedido</li>
  <li>Assistente avisa o time de logística por WhatsApp</li>
</ol>
<p><strong>Problema:</strong> ~20 pedidos/dia × 15 min cada = 5h/dia de trabalho manual. Erros de digitação geravam retrabalho e atraso na entrega.</p>

<h3>Depois (n8n automatizado)</h3>
<ol>
  <li><strong>Trigger:</strong> Pipedrive Trigger → "Deal won" dispara automaticamente</li>
  <li><strong>Buscar dados completos:</strong> HTTP Request → Pipedrive API GET /deals/{id} + /persons/{person_id} + /organizations/{org_id}</li>
  <li><strong>Transformar formato:</strong> Function node com mapeamento Pipedrive → TOTVS:
    <pre><code class="language-javascript">return [{json: {
  codigo_cliente: $json.organization.custom_field_cnpj,
  produtos: $json.deal.products.map(p => ({
    sku: p.product_id,
    quantidade: p.quantity,
    preco: p.item_price
  })),
  condicao_pagamento: $json.deal.custom_field_payment,
  endereco_entrega: $json.person.address
}}]</code></pre>
  </li>
  <li><strong>Criar pedido no ERP:</strong> HTTP Request → TOTVS API POST /pedidos</li>
  <li><strong>Notificar logística:</strong> WhatsApp API → mensagem formatada com número do pedido, cliente, e data de entrega</li>
  <li><strong>Log:</strong> Google Sheets → registro com timestamp, deal ID, pedido TOTVS ID, status</li>
</ol>

<h3>Resultados</h3>
<table>
  <thead><tr><th>Métrica</th><th>Antes</th><th>Depois</th><th>Melhoria</th></tr></thead>
  <tbody>
    <tr><td>Tempo por pedido</td><td>15 min</td><td>10 segundos</td><td>-99%</td></tr>
    <tr><td>Erros de digitação</td><td>~8%</td><td>0%</td><td>-100%</td></tr>
    <tr><td>Horas/dia em entrada manual</td><td>5h</td><td>0h</td><td>-100%</td></tr>
    <tr><td>Tempo até logística receber</td><td>2-4h</td><td>10 segundos</td><td>-99%</td></tr>
    <tr><td>Custo mensal</td><td>R$ 0 (mas 5h/dia de salário)</td><td>R$ 150 (VPS)</td><td>ROI em 1 dia</td></tr>
  </tbody>
</table>
<p><strong>Tempo de implementação:</strong> 4 horas (1h setup n8n, 2h mapeamento de campos, 1h testes e ajustes). Payback no primeiro dia útil.</p>`,
  },
  {
    id: "seguranca",
    heading: "Segurança e credenciais: as regras que evitam desastres",
    content: `<h3>Regra 1: Credentials Manager — sempre</h3>
<p>Nunca cole tokens de API, senhas ou chaves diretamente nas expressões do fluxo. Use o <strong>Credentials Manager</strong> do n8n:</p>
<ul>
  <li>Credenciais ficam criptografadas com a N8N_ENCRYPTION_KEY</li>
  <li>Não aparecem no JSON exportado do workflow</li>
  <li>Podem ser compartilhadas entre workflows sem duplicação</li>
  <li>Suportam OAuth2 com refresh automático (Google, Microsoft, etc.)</li>
</ul>

<h3>Regra 2: Variáveis de ambiente para configurações</h3>
<p>URLs de API, endpoints, e-mails de notificação — tudo que muda entre ambientes (dev/staging/prod) deve ser variável de ambiente:</p>
<pre><code class="language-bash"># No docker-compose ou .env
ERP_API_URL=https://api.totvs.suaempresa.com
NOTIFICATION_EMAIL=financeiro@empresa.com
SLACK_CHANNEL=#automacao-alertas</code></pre>
<p>No n8n, acesse via <code>{{ $env.ERP_API_URL }}</code>.</p>

<h3>Regra 3: Princípio do menor privilégio</h3>
<ul>
  <li>Crie tokens de API com escopo mínimo necessário (somente leitura quando não precisa escrever)</li>
  <li>Use service accounts, não contas pessoais, para credenciais de produção</li>
  <li>Rotacione tokens a cada 90 dias</li>
  <li>Revogue tokens imediatamente quando alguém sai da equipe</li>
</ul>

<h3>Regra 4: HTTPS e rede</h3>
<ul>
  <li>n8n em produção deve rodar atrás de reverse proxy (nginx/Caddy) com HTTPS</li>
  <li>Nunca exponha a porta 5678 diretamente à internet</li>
  <li>Configure firewall para permitir apenas IPs necessários</li>
  <li>Use VPN ou Private Networking para acessar bancos de dados</li>
</ul>`,
  },
  {
    id: "dicas-producao",
    heading: "Governança: versionamento, monitoramento e manutenção",
    content: `<h3>Versionamento de workflows</h3>
<p>Workflows são código — devem ser versionados:</p>
<ol>
  <li>Exporte cada workflow como JSON (botão "Download" no editor)</li>
  <li>Salve no Git com nome descritivo: <code>workflows/crm-erp-sync.json</code></li>
  <li>Commit com mensagem: "feat: adicionar tratamento de produtos sem SKU"</li>
  <li>Antes de alterar um workflow em produção, exporte a versão atual como backup</li>
</ol>

<h3>Monitoramento de execuções</h3>
<p>n8n guarda histórico de cada execução. Configure:</p>
<ul>
  <li><strong>Retenção:</strong> Mínimo 30 dias de histórico (configurável via <code>EXECUTIONS_DATA_MAX_AGE</code>)</li>
  <li><strong>Error Trigger:</strong> Workflow dedicado que recebe todas as falhas e notifica via Slack/WhatsApp</li>
  <li><strong>Health check:</strong> Schedule Trigger que roda a cada 5 minutos e verifica se o n8n está respondendo</li>
  <li><strong>Métricas:</strong> Configure endpoint Prometheus (<code>/metrics</code>) e monitore com Grafana</li>
</ul>

<h3>Manutenção mensal</h3>
<table>
  <thead><tr><th>Tarefa</th><th>Frequência</th><th>Impacto</th></tr></thead>
  <tbody>
    <tr><td>Atualizar n8n para última versão</td><td>Mensal</td><td>Segurança + novas integrações</td></tr>
    <tr><td>Revisar execuções com erro</td><td>Semanal</td><td>Detectar problemas antes que virem críticos</td></tr>
    <tr><td>Rotacionar credenciais</td><td>Trimestral</td><td>Segurança</td></tr>
    <tr><td>Limpar histórico de execuções antigas</td><td>Mensal</td><td>Performance do PostgreSQL</td></tr>
    <tr><td>Testar recovery de backup</td><td>Trimestral</td><td>Garantir que o backup funciona</td></tr>
    <tr><td>Revisar workflows inativos</td><td>Mensal</td><td>Remover fluxos obsoletos</td></tr>
  </tbody>
</table>

<h3>Escalando: de 1 fluxo para uma operação inteira</h3>
<p>O caminho para escalar automações na empresa:</p>
<ol>
  <li><strong>Semana 1:</strong> Primeiro fluxo simples (formulário → planilha). Construir confiança.</li>
  <li><strong>Semana 2-3:</strong> Fluxo de maior impacto (CRM → ERP). Demonstrar ROI real.</li>
  <li><strong>Mês 2:</strong> Documentar padrões e treinar 1-2 pessoas na equipe para criar fluxos.</li>
  <li><strong>Mês 3:</strong> Governança: Git para versionamento, alertas para falhas, credenciais centralizadas.</li>
  <li><strong>Mês 4+:</strong> Catálogo de fluxos prontos, templates reutilizáveis, métricas de ROI por automação.</li>
</ol>`,
  },
  {
    id: "conclusao",
    heading: "Conclusão: n8n é o melhor investimento em produtividade para PMEs",
    content: `<p>n8n transforma horas de trabalho manual em segundos automáticos — com custo de R$ 100-200/mês em infraestrutura. O ROI típico é medido em dias, não meses.</p>

<h3>Checklist para começar agora</h3>
<ol>
  <li><strong>Identificar:</strong> Qual processo da empresa envolve copiar dados entre dois sistemas?</li>
  <li><strong>Instalar:</strong> <code>docker run -p 5678:5678 n8nio/n8n</code> (5 minutos)</li>
  <li><strong>Construir:</strong> Trigger → processamento → destino (30-60 minutos)</li>
  <li><strong>Testar:</strong> Com dados reais, via "Execute once" no n8n</li>
  <li><strong>Ativar:</strong> Toggle → Production URL → pronto</li>
  <li><strong>Monitorar:</strong> Error Trigger + histórico de execuções</li>
</ol>

<p>O maior obstáculo não é técnico — é identificar os processos que valem a pena automatizar. Comece pelo mais doloroso (onde alguém gasta >1h/dia copiando dados) e o ROI se demonstra sozinho.</p>`,
  },
],
callouts: [
  { type: "tip", title: "Comece pelo processo mais doloroso", body: "Escolha o processo onde alguém gasta mais de 1h/dia copiando dados entre sistemas. O ROI é imediato e a confiança da equipe na automação se constrói com resultados tangíveis." },
  { type: "example", title: "Caso real de ROI em 1 dia", body: "Distribuidora eliminou 5h/dia de entrada manual de pedidos (CRM → ERP) com fluxo n8n de 6 nós. Tempo de implementação: 4 horas. Zero erros de digitação desde o dia 1. Custo mensal: R$ 150." },
  { type: "warning", title: "Credenciais NUNCA no fluxo", body: "Nunca cole tokens de API diretamente nas expressões do fluxo. Use sempre o Credentials Manager do n8n — as chaves ficam criptografadas com AES-256 e não aparecem no JSON exportado." },
  { type: "insight", title: "n8n self-hosted vs. Zapier: 10-50× mais barato", body: "Para 30.000 execuções/mês (1.000/dia), Zapier custa US$ 299/mês. n8n self-hosted custa R$ 150/mês (VPS). Para 300.000 execuções/mês, Zapier custa US$ 599+. n8n continua em R$ 250." },
],
mindMap: {
  label: "n8n Automação",
  children: [
    { label: "Setup", children: [
      { label: "Docker (5 min)" },
      { label: "n8n Cloud (free tier)" },
      { label: "Produção (PostgreSQL + SSL)" },
    ]},
    { label: "Estrutura do fluxo", children: [
      { label: "Trigger (Webhook/Schedule)" },
      { label: "Processamento (Set/IF/Function)" },
      { label: "Destino (API/Sheets/DB)" },
      { label: "Error handler" },
    ]},
    { label: "Padrões", children: [
      { label: "Formulário → Planilha" },
      { label: "CRM → ERP" },
      { label: "NF → Cliente + Drive" },
      { label: "Onboarding multi-sistema" },
    ]},
    { label: "Governança", children: [
      { label: "Git para workflows" },
      { label: "Credentials Manager" },
      { label: "Error Trigger → alerta" },
      { label: "Métricas + Grafana" },
    ]},
  ],
},
mnemonic: {
  acronym: "TRADE",
  breakdown: [
    { letter: "T", word: "Trigger", hint: "Webhook, Schedule, ou nó nativo que inicia o fluxo" },
    { letter: "R", word: "Roteamento", hint: "IF/Switch para caminhos condicionais" },
    { letter: "A", word: "Ação (nós de destino)", hint: "HTTP Request, Sheets, PostgreSQL, WhatsApp" },
    { letter: "D", word: "Dados mapeados", hint: "Set node para transformar formato entre sistemas" },
    { letter: "E", word: "Erro tratado", hint: "Error Trigger → Slack/WhatsApp sempre configurado" },
  ],
},
relatedSlugs: ["como-automatizar-processos-manuais", "webhook-n8n-integracoes-sem-codigo", "integracao-api-whatsapp-business"],
};

export default post;
