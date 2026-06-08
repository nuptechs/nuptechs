import type { Post } from "../[slug]/page";

const post: Post = {
slug: "lgpd-para-desenvolvedores",
tag: "Integrações",
title: "LGPD para desenvolvedores: o que você precisa implementar no código",
description: "Guia técnico e prático da Lei Geral de Proteção de Dados para devs — com checklist de implementação, exemplos de código e as multas que você precisa evitar.",
keywords: ["LGPD desenvolvedores", "LGPD implementação técnica", "proteção de dados código", "LGPD checklist", "conformidade LGPD software", "privacy by design", "criptografia dados pessoais"],
readTime: "22 min",
publishedAt: "2026-02-19",
updatedAt: "2026-02-19",
author: { name: "Yuri Francis", role: "Fundador, NuPtechs" },
executiveSummary: "A LGPD não é um problema jurídico — é um problema de engenharia. Este guia mostra exatamente o que precisa mudar no código: como documentar bases legais no banco, implementar os 8 direitos do titular com queries reais, configurar criptografia em repouso com pgcrypto, pseudonimizar logs, construir pipeline de anonimização, responder a incidentes em 72h, e auditar compliance com testes automatizados. Inclui exemplos de código em SQL, JavaScript e TypeScript, checklist completo, e análise dos casos reais de sanção da ANPD.",
keyTakeaways: [
  "LGPD exige base legal para cada dado coletado — consentimento é só uma das 10 bases legais",
  "Direitos do titular que o sistema deve implementar: acesso, correção, exclusão, portabilidade",
  "Dados sensíveis (saúde, biometria, orientação sexual) têm proteção reforçada — base legal explícita obrigatória",
  "Pseudonimização e criptografia em repouso não são opcionais para dados pessoais em produção",
  "Multa máxima: 2% do faturamento, até R$ 50 milhões por infração — a conformidade é mais barata",
  "Privacy by Design é a abordagem mais eficiente: projetar o sistema com LGPD desde o início",
],
sections: [
  {
    id: "o-que-e-lgpd",
    heading: "O que a LGPD exige de um sistema de software",
    content: `<p>A LGPD (Lei 13.709/2018) estabelece regras para como dados pessoais de cidadãos brasileiros são coletados, armazenados e processados — em qualquer software, independente de onde a empresa está sediada. Se o seu sistema processa dados de pessoas no Brasil, a LGPD se aplica.</p>

<p>Do ponto de vista de engenharia, a LGPD exige que o sistema:</p>
<ol>
  <li><strong>Colete apenas o necessário</strong> (princípio da minimização) — cada campo no formulário de cadastro deve ter uma justificativa documentada.</li>
  <li><strong>Tenha base legal documentada</strong> para cada dado coletado — não basta coletar, precisa registrar por quê.</li>
  <li><strong>Implemente os direitos do titular</strong> (acesso, correção, exclusão, portabilidade, revogação de consentimento, entre outros).</li>
  <li><strong>Proteja os dados com controles técnicos</strong> (criptografia, pseudonimização, controle de acesso, auditoria).</li>
  <li><strong>Notifique violações</strong> à ANPD e aos titulares afetados em prazo razoável (a prática recomendada é 72 horas).</li>
  <li><strong>Mantenha registro de atividades de tratamento</strong> (ROPA — Record of Processing Activities) atualizado.</li>
</ol>

<p>O erro mais comum: tratar LGPD como um "projeto do jurídico" que o dev só implementa quando alguém pede. Na prática, 90% da conformidade com LGPD é engenharia — queries de exportação, criptografia, controle de acesso, TTL de dados, pipeline de anonimização. O jurídico define as regras; o dev as implementa no código.</p>

<h3>Quem fiscaliza e qual o risco real</h3>
<p>A ANPD (Autoridade Nacional de Proteção de Dados) é o órgão fiscalizador. Desde 2023, sanções administrativas estão sendo aplicadas:</p>
<ul>
  <li><strong>Advertência:</strong> Para infrações de cadastro e registro (ROPA incompleto, política de privacidade inadequada).</li>
  <li><strong>Multa simples:</strong> Até 2% do faturamento no Brasil, limitado a R$ 50 milhões por infração.</li>
  <li><strong>Multa diária:</strong> Para descumprimento de determinações — R$ 50 milhões de teto acumulado.</li>
  <li><strong>Publicização da infração:</strong> A ANPD publica o nome da empresa — dano reputacional frequentemente supera a multa.</li>
  <li><strong>Bloqueio/eliminação dos dados:</strong> A ANPD pode determinar que você pare de usar os dados até se conformar.</li>
</ul>
<p>Para PMEs, o risco mais real não é a multa de R$ 50 milhões (que se aplica a empresas grandes), mas sim a publicização da infração e a perda de contratos B2B — empresas grandes cada vez mais exigem conformidade LGPD de fornecedores.</p>`,
  },
  {
    id: "base-legal",
    heading: "As 10 bases legais: quando usar cada uma no código",
    content: `<p>A LGPD define 10 bases legais para processar dados pessoais. O erro mais comum é usar consentimento para tudo — quando outras bases são mais simples e robustas.</p>

<h3>As 4 bases legais mais usadas em software</h3>
<ul>
  <li><strong>Consentimento (Art. 7°, I):</strong> O titular autoriza explicitamente. Requer opt-in ativo (sem checkboxes pré-marcados), finalidade específica, e opt-out fácil a qualquer momento. Use para: newsletters, marketing, analytics, compartilhamento com terceiros.</li>
  <li><strong>Execução de contrato (Art. 7°, V):</strong> Dados necessários para entregar o serviço contratado. Use para: endereço de entrega, dados de pagamento, e-mail para envio de NF, telefone para suporte do pedido. Não precisa de consentimento separado — o contrato é a base legal.</li>
  <li><strong>Legítimo interesse (Art. 7°, IX):</strong> A base mais flexível — permite processamento quando há interesse legítimo e razoável, sem prejudicar direitos do titular. Use para: prevenção a fraude, personalização de UX, análise de padrões de uso, segurança do sistema. Requer LIA (Legitimate Interest Assessment) documentado.</li>
  <li><strong>Cumprimento de obrigação legal (Art. 7°, II):</strong> Dados exigidos por lei. Use para: CPF em NF, registros contábeis, dados trabalhistas, retenção fiscal. Não precisa de consentimento e o titular não pode pedir exclusão desses dados.</li>
</ul>

<h3>As 6 bases menos comuns (mas que aparecem)</h3>
<ul>
  <li><strong>Pela administração pública:</strong> Para execução de políticas públicas.</li>
  <li><strong>Para estudos e pesquisa:</strong> Dados anonimizados para pesquisa (ex: analytics agregados).</li>
  <li><strong>Para exercício regular de direitos:</strong> Dados necessários para defesa em processo judicial.</li>
  <li><strong>Para proteção da vida:</strong> Em situações de emergência (ex: dados de saúde em UTI).</li>
  <li><strong>Para tutela da saúde:</strong> Processamento por profissionais de saúde.</li>
  <li><strong>Para proteção do crédito:</strong> Dados necessários para análise de crédito (ex: score Serasa).</li>
</ul>

<h3>Como documentar no banco de dados</h3>
<p>Crie um registro de atividades de tratamento (ROPA) como tabela no banco. Cada tipo de dado deve ter base legal documentada:</p>
<pre><code class="language-sql">CREATE TABLE data_processing_register (
  id SERIAL PRIMARY KEY,
  data_category VARCHAR(100) NOT NULL,  -- ex: "email", "endereço", "CPF"
  purpose VARCHAR(255) NOT NULL,        -- finalidade do processamento
  legal_basis VARCHAR(50) NOT NULL,     -- "consent", "contract", "legal_obligation", "legitimate_interest"
  retention_period INTERVAL NOT NULL,   -- prazo de retenção
  data_controller VARCHAR(100),         -- quem decide o processamento
  data_processor VARCHAR(100),          -- quem processa (se terceirizado)
  international_transfer BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Exemplos de registro
INSERT INTO data_processing_register (data_category, purpose, legal_basis, retention_period) VALUES
('email', 'Comunicação sobre pedidos', 'contract', '5 years'),
('email', 'Newsletter marketing', 'consent', '2 years'),
('cpf', 'Emissão de nota fiscal', 'legal_obligation', '5 years'),
('endereço', 'Entrega de produtos', 'contract', '5 years'),
('histórico de navegação', 'Personalização de UX', 'legitimate_interest', '6 months'),
('biometria facial', 'Autenticação', 'consent', '1 year');</code></pre>

<p><strong>Regra prática:</strong> Se o dado é necessário para entregar o serviço contratado → execução de contrato. Se é exigido por lei → obrigação legal. Se é para marketing ou analytics → consentimento. Se é para segurança/fraude → legítimo interesse. Na dúvida, peça opinião do DPO.</p>`,
  },
  {
    id: "direitos-do-titular",
    heading: "Implementando os 8 direitos do titular no código",
    content: `<p>O titular pode exercer 8 direitos previstos no Art. 18 da LGPD. Seu sistema precisa implementar endpoints ou interfaces para cada um:</p>

<h3>1. Direito de confirmação e acesso (Art. 18, I e II)</h3>
<p>O titular pergunta "vocês têm dados sobre mim?" e "quais são?". O sistema deve exportar todos os dados pessoais em formato legível:</p>
<pre><code class="language-sql">-- Query de exportação completa por usuário
SELECT 
  u.name, u.email, u.phone, u.cpf, u.created_at as member_since,
  json_agg(DISTINCT jsonb_build_object('id', o.id, 'date', o.created_at, 'total', o.total)) as orders,
  json_agg(DISTINCT jsonb_build_object('street', a.street, 'city', a.city, 'state', a.state)) as addresses,
  json_agg(DISTINCT jsonb_build_object('type', c.type, 'granted_at', c.created_at, 'revoked_at', c.revoked_at)) as consents
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
LEFT JOIN addresses a ON a.user_id = u.id
LEFT JOIN user_consents c ON c.user_id = u.id
WHERE u.id = $1
GROUP BY u.id;</code></pre>
<p><strong>Dica:</strong> Crie um endpoint <code>/api/me/data-export</code> que retorna JSON e oferece download em CSV. O prazo legal para resposta é 15 dias.</p>

<h3>2. Direito de correção (Art. 18, III)</h3>
<p>Interface para o próprio usuário corrigir dados pessoais (nome, endereço, telefone). Implemente com log de auditoria:</p>
<pre><code class="language-javascript">// Middleware de auditoria para correção de dados
async function updateUserData(userId, field, oldValue, newValue) {
  await pool.query(
    'UPDATE users SET $1:name = $2 WHERE id = $3',
    [field, newValue, userId]
  );
  await pool.query(
    \`INSERT INTO audit_log (user_id, action, field, old_value, new_value, ip_address)
     VALUES ($1, 'data_correction', $2, $3, $4, $5)\`,
    [userId, field, oldValue, newValue, req.ip]
  );
}</code></pre>

<h3>3. Direito de anonimização, bloqueio ou eliminação (Art. 18, IV)</h3>
<p>Soft delete + anonimização é preferível a DELETE por questões de integridade referencial:</p>
<pre><code class="language-sql">-- Pipeline de anonimização (preferível ao DELETE)
BEGIN;
  UPDATE users SET
    name = 'ANONIMIZADO',
    email = 'anonimizado_' || id || '@removido.invalid',
    phone = NULL,
    cpf = NULL,
    address = NULL,
    anonymized_at = NOW(),
    anonymization_reason = 'titular_request'
  WHERE id = $1;
  
  -- Manter dados com obrigação legal (NF requer CPF por 5 anos)
  -- NÃO anonimizar registros fiscais dentro do prazo de retenção
  
  UPDATE user_consents SET revoked_at = NOW() WHERE user_id = $1 AND revoked_at IS NULL;
  
  INSERT INTO audit_log (user_id, action, details) 
  VALUES ($1, 'anonymization', 'Solicitação do titular via SAC');
COMMIT;</code></pre>

<h3>4. Direito de portabilidade (Art. 18, V)</h3>
<p>Exportar dados em formato estruturado e interoperável (JSON, CSV). Endpoint dedicado com rate limiting:</p>
<pre><code class="language-javascript">router.get('/me/data-export', rateLimiter({ max: 3, windowMs: 24 * 60 * 60 * 1000 }), asyncHandler(async (req, res) => {
  const data = await userRepository.exportUserData(req.user.id);
  res.setHeader('Content-Disposition', 'attachment; filename="meus-dados.json"');
  res.json(data);
}));</code></pre>

<h3>5. Direito de revogação de consentimento (Art. 18, IX)</h3>
<p>Obrigatório para dados coletados com base em consentimento. Deve ser tão fácil revogar quanto foi consentir:</p>
<pre><code class="language-sql">-- Tabela de gestão de consentimento
CREATE TABLE user_consents (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  consent_type VARCHAR(50) NOT NULL,   -- 'marketing_email', 'analytics', 'data_sharing'
  granted_at TIMESTAMP NOT NULL DEFAULT NOW(),
  revoked_at TIMESTAMP,                -- NULL = ativo
  ip_address INET,
  user_agent TEXT
);

-- Revogar consentimento
UPDATE user_consents 
SET revoked_at = NOW() 
WHERE user_id = $1 AND consent_type = $2 AND revoked_at IS NULL;</code></pre>

<h3>6-8. Direitos menos implementados (mas obrigatórios)</h3>
<ul>
  <li><strong>Informação sobre compartilhamento (Art. 18, VII):</strong> O titular pode perguntar com quem você compartilha os dados dele. Mantenha registro de todos os terceiros que recebem dados (sub-processadores, APIs externas).</li>
  <li><strong>Informação sobre a possibilidade de não consentir (Art. 18, VIII):</strong> Antes de coletar consentimento, informe as consequências de não consentir. Ex: "sem consentimento para newsletter, você não receberá ofertas por e-mail, mas poderá usar o serviço normalmente."</li>
  <li><strong>Revisão de decisões automatizadas (Art. 20):</strong> Se o sistema usa IA para decisões que afetam o titular (aprovação de crédito, classificação de risco, precificação), o titular pode pedir revisão humana. Implemente um flag <code>requires_human_review</code> e uma fila para revisão.</li>
</ul>`,
  },
  {
    id: "controles-tecnicos",
    heading: "Controles técnicos obrigatórios: o mínimo que o código precisa ter",
    content: `<h3>Criptografia em repouso</h3>
<p>Dados sensíveis (CPF, cartão, senha, dados de saúde, biometria) devem ser criptografados no banco de dados. Para PostgreSQL, use pgcrypto:</p>
<pre><code class="language-sql">-- Habilitar extensão
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Inserir CPF criptografado (symmetric key - para dados que precisam ser decriptografados)
INSERT INTO users (name, cpf_encrypted) 
VALUES ('João', pgp_sym_encrypt('123.456.789-00', current_setting('app.encryption_key')));

-- Ler CPF decriptografado
SELECT name, pgp_sym_decrypt(cpf_encrypted::bytea, current_setting('app.encryption_key')) as cpf
FROM users WHERE id = 1;

-- Para dados que só precisam ser comparados (ex: busca por CPF), use hash:
INSERT INTO users (name, cpf_hash)
VALUES ('João', crypt('12345678900', gen_salt('bf')));

-- Buscar por CPF sem decriptar:
SELECT * FROM users WHERE cpf_hash = crypt('12345678900', cpf_hash);</code></pre>

<p><strong>Chave de criptografia:</strong> Nunca hardcode no código. Use variável de ambiente ou secret manager (AWS Secrets Manager, HashiCorp Vault). Rotacione a chave a cada 90 dias.</p>

<h3>Pseudonimização de logs</h3>
<p>Logs de aplicação nunca devem conter dados pessoais em texto claro. Se um log vazar, nenhum dado pessoal deve ser exposto:</p>
<pre><code class="language-javascript">// ❌ Errado — CPF, e-mail e nome em log
logger.info(\`Usuário \${user.name} (\${user.email}, CPF \${user.cpf}) fez login\`);

// ✅ Correto — usar identificador interno
logger.info(\`Usuário #\${user.id} fez login, IP \${req.ip}\`);

// ✅ Se precisar de mais contexto, use hash truncado
const userHash = crypto.createHash('sha256').update(user.email).digest('hex').slice(0, 8);
logger.info(\`Usuário \${userHash} fez login\`);</code></pre>

<h3>Controle de acesso granular (RBAC + Row-Level Security)</h3>
<p>Princípio do mínimo privilégio: cada serviço/usuário acessa apenas os dados que precisa.</p>
<pre><code class="language-sql">-- PostgreSQL Row-Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Política: vendedores veem apenas pedidos da sua região
CREATE POLICY seller_orders ON orders
  FOR SELECT TO seller_role
  USING (region_id = current_setting('app.user_region')::int);

-- Política: clientes veem apenas seus próprios pedidos
CREATE POLICY customer_orders ON orders
  FOR SELECT TO customer_role
  USING (user_id = current_setting('app.user_id')::int);</code></pre>

<h3>TTL automático de dados</h3>
<p>Dados com prazo de retenção definido devem ser automaticamente expirados:</p>
<pre><code class="language-sql">-- Job de limpeza (executar diariamente via cron ou pg_cron)
DELETE FROM user_sessions WHERE expires_at < NOW();
DELETE FROM password_reset_tokens WHERE created_at < NOW() - INTERVAL '24 hours';

-- Anonimizar dados de usuários inativos há mais de 2 anos
UPDATE users SET
  name = 'INATIVO', email = 'inativo_' || id || '@expired.invalid',
  phone = NULL, cpf = NULL, anonymized_at = NOW()
WHERE last_login < NOW() - INTERVAL '2 years' AND anonymized_at IS NULL;</code></pre>`,
  },
  {
    id: "dados-sensiveis",
    heading: "Dados sensíveis: tratamento especial obrigatório",
    content: `<p>A LGPD diferencia "dados pessoais" de "dados pessoais sensíveis" (Art. 5°, II). Dados sensíveis têm proteção reforçada e requerem base legal mais restrita.</p>

<h3>O que são dados sensíveis</h3>
<ul>
  <li>Origem racial ou étnica</li>
  <li>Convicção religiosa</li>
  <li>Opinião política</li>
  <li>Filiação a sindicato ou organização religiosa/filosófica/política</li>
  <li>Dados de saúde (diagnósticos, exames, medicamentos)</li>
  <li>Dados genéticos</li>
  <li>Dados biométricos (reconhecimento facial, impressão digital)</li>
  <li>Vida sexual ou orientação sexual</li>
</ul>

<h3>Regras específicas para dados sensíveis</h3>
<p>Dados sensíveis só podem ser tratados com (Art. 11):</p>
<ul>
  <li><strong>Consentimento específico e destacado:</strong> Não basta um checkbox genérico. O consentimento para dados sensíveis deve ser separado, com explicação clara de para que serão usados.</li>
  <li><strong>Sem consentimento, apenas em 7 hipóteses específicas:</strong> obrigação legal, política pública, pesquisa (anonimizado), exercício regular de direitos, proteção da vida, tutela da saúde, prevenção à fraude.</li>
</ul>

<h3>Implementação técnica</h3>
<pre><code class="language-javascript">// Middleware para validar acesso a dados sensíveis
function sensitiveDataGuard(requiredPermission) {
  return (req, res, next) => {
    if (!req.user.permissions.includes(requiredPermission)) {
      // Log de tentativa de acesso não autorizado
      auditLogger.warn({
        userId: req.user.id,
        action: 'sensitive_data_access_denied',
        resource: requiredPermission,
        ip: req.ip
      });
      return res.status(403).json({ error: 'Acesso a dados sensíveis negado' });
    }
    // Log de acesso autorizado (obrigatório para auditoria)
    auditLogger.info({
      userId: req.user.id,
      action: 'sensitive_data_access_granted',
      resource: requiredPermission,
      ip: req.ip
    });
    next();
  };
}

// Uso: apenas médicos acessam dados de saúde
router.get('/patients/:id/health-data', 
  sensitiveDataGuard('health_data.read'),
  asyncHandler(async (req, res) => { /* ... */ })
);</code></pre>

<p><strong>Recomendação:</strong> Dados sensíveis devem estar em tabelas separadas com criptografia em repouso obrigatória e log de acesso em cada leitura. Nunca misture dados sensíveis com dados comuns na mesma tabela — isso facilita tanto o controle de acesso quanto a auditoria.</p>`,
  },
  {
    id: "incidentes",
    heading: "Plano de resposta a incidentes de dados",
    content: `<p>A LGPD exige que incidentes de segurança envolvendo dados pessoais sejam comunicados à ANPD e aos titulares afetados. Não ter um plano é garantia de caos quando (não se) o incidente acontecer.</p>

<h3>Prioridade 1: Detecção (horas 0-4)</h3>
<ul>
  <li>Alertas automáticos para: acesso massivo a dados pessoais, export de dados acima do volume normal, tentativas de login anômalas, queries incomuns no banco</li>
  <li>Dashboard de segurança com métricas: logins falhados/hora, acessos a dados sensíveis, volume de dados exportados</li>
  <li>Canais de denúncia interno (para funcionários reportarem incidentes)</li>
</ul>

<h3>Prioridade 2: Contenção (horas 4-24)</h3>
<ul>
  <li>Isolar o vetor de ataque (bloquear a conta comprometida, revogar tokens, fechar a vulnerabilidade)</li>
  <li>Preservar evidências (logs, snapshots de banco, registros de acesso)</li>
  <li>Avaliar o escopo: quantos registros afetados? Quais tipos de dados? Quais titulares?</li>
</ul>

<h3>Prioridade 3: Notificação (até 72h)</h3>
<p>Comunicar à ANPD contendo:</p>
<ul>
  <li>Descrição da natureza dos dados pessoais afetados</li>
  <li>Informações sobre os titulares envolvidos (quantidade, categorias)</li>
  <li>Indicação das medidas técnicas de segurança utilizadas</li>
  <li>Riscos relacionados ao incidente</li>
  <li>Medidas tomadas para reverter ou mitigar os efeitos</li>
</ul>

<h3>Implementação técnica: detecção automática</h3>
<pre><code class="language-javascript">// Middleware de detecção de anomalias em acesso a dados
const THRESHOLD_EXPORTS_PER_HOUR = 5;
const THRESHOLD_RECORDS_PER_QUERY = 1000;

async function dataAccessMonitor(req, res, next) {
  const recentExports = await redis.incr(\`exports:\${req.user.id}:\${currentHour()}\`);
  await redis.expire(\`exports:\${req.user.id}:\${currentHour()}\`, 3600);
  
  if (recentExports > THRESHOLD_EXPORTS_PER_HOUR) {
    securityAlert.send({
      type: 'anomalous_data_export',
      userId: req.user.id,
      count: recentExports,
      severity: 'high'
    });
  }
  next();
}</code></pre>`,
  },
  {
    id: "cookies-tracking",
    heading: "Cookies, tracking e analytics: o que muda com a LGPD",
    content: `<p>Cookies e scripts de tracking são dados pessoais quando permitem identificar o usuário (direta ou indiretamente). A LGPD exige consentimento antes de instalar cookies não essenciais.</p>

<h3>Classificação de cookies</h3>
<table>
  <thead><tr><th>Tipo</th><th>Exemplos</th><th>Base legal</th><th>Consentimento?</th></tr></thead>
  <tbody>
    <tr><td><strong>Essenciais</strong></td><td>Sessão, CSRF, carrinho</td><td>Execução de contrato / Legítimo interesse</td><td>Não</td></tr>
    <tr><td><strong>Funcionais</strong></td><td>Idioma, preferências de UI</td><td>Legítimo interesse</td><td>Recomendado</td></tr>
    <tr><td><strong>Analytics</strong></td><td>Google Analytics, Hotjar, Mixpanel</td><td>Consentimento</td><td><strong>Sim</strong></td></tr>
    <tr><td><strong>Marketing/Retargeting</strong></td><td>Facebook Pixel, Google Ads, LinkedIn Insight</td><td>Consentimento</td><td><strong>Sim</strong></td></tr>
  </tbody>
</table>

<h3>Implementação do cookie banner</h3>
<ul>
  <li><strong>Carregamento bloqueante:</strong> Scripts de analytics e marketing só devem ser carregados APÓS o consentimento. Não basta mostrar o banner — se o Google Analytics já estava rodando, não adianta.</li>
  <li><strong>Granularidade:</strong> Ofereça controle por categoria (analytics sim, marketing não). Um botão "aceitar tudo" é permitido desde que haja alternativa granular.</li>
  <li><strong>Registro:</strong> Salve o consentimento no banco (user_id, tipo, data, IP). O ônus da prova do consentimento é do controlador.</li>
  <li><strong>Revogação:</strong> Link acessível em todas as páginas para revogar consentimento de cookies. Geralmente no rodapé.</li>
</ul>

<pre><code class="language-javascript">// Exemplo: carregar Google Analytics apenas com consentimento
function loadAnalytics() {
  const consent = getCookieConsent();
  if (consent?.analytics) {
    const script = document.createElement('script');
    script.src = \`https://www.googletagmanager.com/gtag/js?id=\${GA_ID}\`;
    script.async = true;
    document.head.appendChild(script);
  }
}

// Chamar apenas após consentimento
onConsentGranted('analytics', loadAnalytics);</code></pre>

<p><strong>Google Analytics 4 e LGPD:</strong> O GA4 permite configurar coleta sem cookies (consent mode) e anonimização de IP. Configure <code>anonymize_ip: true</code> e <code>ads_storage: 'denied'</code> por padrão. Habilite <code>'granted'</code> apenas após consentimento explícito.</p>`,
  },
  {
    id: "lgpd-vs-gdpr",
    heading: "LGPD vs GDPR: diferenças práticas para quem implementa",
    content: `<p>Se o sistema atende clientes na Europa, você precisa cumprir GDPR também. As leis são similares, mas há diferenças práticas importantes:</p>

<table>
  <thead><tr><th>Aspecto</th><th>LGPD (Brasil)</th><th>GDPR (Europa)</th></tr></thead>
  <tbody>
    <tr><td>DPO obrigatório?</td><td>Sim (com exceções para PMEs)</td><td>Sim (quando processa dados em larga escala)</td></tr>
    <tr><td>Notificação de breach</td><td>"Prazo razoável" (~72h recomendado)</td><td>72 horas (obrigatório)</td></tr>
    <tr><td>Multa máxima</td><td>2% faturamento / R$ 50M</td><td>4% faturamento global / € 20M</td></tr>
    <tr><td>Bases legais</td><td>10 bases</td><td>6 bases (sem crédito, sem saúde separada)</td></tr>
    <tr><td>Transferência internacional</td><td>Permitida com cláusulas contratuais</td><td>Mais rígida (SCCs, Binding Corporate Rules)</td></tr>
    <tr><td>Consentimento de menores</td><td>&lt;12 anos: obrigatório dos pais</td><td>&lt;16 anos: obrigatório dos pais (varia por país)</td></tr>
  </tbody>
</table>

<p><strong>Dica prática:</strong> Se implementar para GDPR (mais rígido), automaticamente cobre a LGPD. A exceção são as 4 bases legais adicionais da LGPD (crédito, saúde, exercício de direitos, políticas públicas) — que raramente afetam software privado.</p>

<h3>Transferência internacional de dados</h3>
<p>Se o sistema usa APIs que enviam dados para fora do Brasil (OpenAI, AWS, Google Cloud, Stripe), configure:</p>
<ul>
  <li><strong>Cláusulas contratuais padrão (SCCs):</strong> A maioria dos grandes providers já oferece (AWS DPA, Google DPA, OpenAI DPA). Verifique e documente.</li>
  <li><strong>Avaliação de impacto:</strong> Documente quais dados saem do país, para onde, e quais proteções o provider oferece.</li>
  <li><strong>Alternativa local:</strong> Para dados muito sensíveis, considere providers com data center no Brasil (AWS São Paulo, Azure Brasil, Google São Paulo).</li>
</ul>`,
  },
  {
    id: "privacy-by-design",
    heading: "Privacy by Design: padrões arquiteturais que simplificam compliance",
    content: `<p>A abordagem mais eficiente para LGPD não é "adicionar compliance depois" — é projetar o sistema com privacidade desde o início. Estes padrões arquiteturais tornam a conformidade natural em vez de dolorosa:</p>

<h3>1. Separação de dados pessoais em schema dedicado</h3>
<pre><code class="language-sql">-- Schema separado para dados pessoais
CREATE SCHEMA personal_data;

-- Dados pessoais isolados
CREATE TABLE personal_data.profiles (
  user_id INTEGER PRIMARY KEY,
  name_encrypted BYTEA,
  email_encrypted BYTEA,
  cpf_hash TEXT,
  phone_encrypted BYTEA
);

-- Dados de negócio referenciando sem conter PII
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,  -- FK, mas sem dados pessoais nesta tabela
  total DECIMAL, status TEXT, created_at TIMESTAMP
);</code></pre>
<p><strong>Benefício:</strong> Para exportação de dados, anonimização e exclusão, o escopo é sempre o schema <code>personal_data</code> — não precisa varrer 50 tabelas.</p>

<h3>2. Padrão "data minimization by query"</h3>
<pre><code class="language-javascript">// ❌ Busca tudo e filtra no código (expõe dados desnecessários)
const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
res.json(user); // expõe CPF, endereço, telefone — tudo

// ✅ Selecione apenas os campos necessários para a tela
const user = await db.query(
  'SELECT id, name, avatar_url FROM users WHERE id = $1', [id]
);
res.json(user); // expõe apenas o necessário</code></pre>

<h3>3. Campos de consentimento como first-class citizen</h3>
<p>Ao invés de um cookie banner como gambiarra, trate consentimento como entidade de domínio:</p>
<ul>
  <li>Tabela <code>user_consents</code> com tipo, data, IP, user agent</li>
  <li>Middleware que verifica consentimento antes de processar marketing/analytics</li>
  <li>API de gestão de consentimento (<code>/me/consents</code>) no frontend</li>
</ul>

<h3>4. Audit trail obrigatório para dados pessoais</h3>
<p>Toda leitura, escrita e exclusão de dados pessoais deve ser registrada. Use triggers ou middleware:</p>
<pre><code class="language-sql">-- Trigger de auditoria automática
CREATE OR REPLACE FUNCTION audit_personal_data() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log (table_name, record_id, action, old_data, new_data, performed_by, performed_at)
  VALUES (TG_TABLE_NAME, COALESCE(NEW.id, OLD.id), TG_OP, 
    CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP != 'DELETE' THEN row_to_json(NEW) ELSE NULL END,
    current_setting('app.user_id', true),
    NOW());
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_users AFTER INSERT OR UPDATE OR DELETE ON personal_data.profiles
FOR EACH ROW EXECUTE FUNCTION audit_personal_data();</code></pre>

<h3>5. Perguntas de design review para cada nova feature</h3>
<ul>
  <li>Quais dados pessoais essa feature coleta ou processa?</li>
  <li>Qual a base legal para cada um? Está documentado no ROPA?</li>
  <li>Os dados são o mínimo necessário? Podemos funcionar com menos?</li>
  <li>Onde os dados são armazenados? Estão criptografados?</li>
  <li>Qual o prazo de retenção? Tem TTL automático?</li>
  <li>O titular consegue acessar, corrigir e excluir esses dados?</li>
</ul>`,
  },
  {
    id: "checklist",
    heading: "Checklist completo de conformidade LGPD para devs",
    content: `<h3>Documentação e governança</h3>
<ul>
  <li>☐ Mapeamento de dados pessoais (quais dados, onde armazenados, por que, por quanto tempo)</li>
  <li>☐ Registro de atividades de tratamento (ROPA) no banco — tabela data_processing_register</li>
  <li>☐ Política de privacidade clara e acessível no frontend (link em todas as páginas)</li>
  <li>☐ DPO (Data Protection Officer) designado — pode ser interno ou terceirizado</li>
  <li>☐ Avaliação de impacto (DPIA) para processamentos de alto risco</li>
</ul>

<h3>Consentimento e direitos</h3>
<ul>
  <li>☐ Formulário de consentimento com finalidade específica (sem checkboxes pré-marcados)</li>
  <li>☐ Mecanismo de opt-out funcional e tão fácil quanto o opt-in</li>
  <li>☐ Cookie banner com carregamento bloqueante (scripts só após consentimento)</li>
  <li>☐ API/interface de exportação de dados (portabilidade) — /me/data-export</li>
  <li>☐ Processo de exclusão/anonimização documentado e testado</li>
  <li>☐ Interface de gestão de consentimentos (/me/consents) no frontend</li>
  <li>☐ Fluxo de revisão de decisões automatizadas (se usa IA para decisões)</li>
</ul>

<h3>Segurança técnica</h3>
<ul>
  <li>☐ Criptografia em repouso para dados sensíveis (pgcrypto, AES-256)</li>
  <li>☐ Criptografia em trânsito (HTTPS obrigatório, TLS 1.2+)</li>
  <li>☐ Pseudonimização em logs e ambientes de dev/staging</li>
  <li>☐ Row-Level Security no PostgreSQL para controle de acesso granular</li>
  <li>☐ Controle de acesso baseado em roles com princípio do menor privilégio</li>
  <li>☐ Política de retenção de dados com TTL automatizado (cron/pg_cron)</li>
  <li>☐ Chaves de criptografia em secret manager (não em variáveis de ambiente)</li>
  <li>☐ Rotação de chaves a cada 90 dias</li>
</ul>

<h3>Monitoramento e incidentes</h3>
<ul>
  <li>☐ Audit trail para toda operação em dados pessoais (trigger no banco)</li>
  <li>☐ Alertas de anomalia (export massivo, tentativas de acesso, queries incomuns)</li>
  <li>☐ Plano de resposta a incidentes documentado e testado</li>
  <li>☐ Template de notificação à ANPD pré-preenchido</li>
  <li>☐ Simulação de incidente a cada 6 meses (tabletop exercise)</li>
</ul>

<h3>Ambiente de desenvolvimento</h3>
<ul>
  <li>☐ Banco de dev/staging com dados anonimizados (nunca usar dump de produção sem anonimizar)</li>
  <li>☐ .env e secrets fora do controle de versão (.gitignore)</li>
  <li>☐ CI/CD com scan de secrets (git-secrets, truffleHog)</li>
  <li>☐ Testes automatizados para endpoints de direitos do titular (exportação, anonimização)</li>
</ul>`,
  },
],
callouts: [
  { type: "warning", title: "Multas reais da ANPD", body: "A ANPD já aplicou sanções desde 2023. Multa máxima: 2% do faturamento bruto no Brasil, limitado a R$ 50 milhões por infração. Para PMEs, o risco reputacional de uma violação pública é frequentemente maior que a multa financeira." },
  { type: "insight", title: "Consentimento não é a única base legal", body: "O erro mais comum: coletar consentimento para tudo. Para dados necessários à execução do contrato (endereço de entrega, e-mail para NF), a base é execução de contrato — não consentimento. Para segurança e fraude, use legítimo interesse. Isso simplifica a implementação." },
  { type: "tip", title: "Privacy by Design", body: "A forma mais eficiente de conformidade é projetar o sistema já com LGPD em mente — não adicionar compliance depois. Pergunte em todo novo campo: 'Realmente precisamos desse dado?' Dado que não existe não pode vazar." },
  { type: "example", title: "Schema separado para PII", body: "Isole dados pessoais em um schema dedicado (personal_data). Para exportação, anonimização e exclusão, o escopo fica claro. Para auditoria, basta monitorar um schema." },
  { type: "warning", title: "Dados sensíveis ≠ dados pessoais", body: "Saúde, biometria, religião, orientação sexual, opinião política — são dados sensíveis com proteção reforçada. Requerem consentimento específico e destacado, criptografia obrigatória e log de acesso em cada leitura." },
],
mindMap: {
  label: "LGPD para Devs",
  children: [
    { label: "Princípios", children: [
      { label: "Minimização de dados" },
      { label: "Finalidade específica" },
      { label: "Base legal documentada" },
      { label: "Privacy by Design" },
    ]},
    { label: "Bases legais", children: [
      { label: "Consentimento (marketing)" },
      { label: "Execução de contrato" },
      { label: "Legítimo interesse" },
      { label: "Obrigação legal (NF)" },
    ]},
    { label: "Direitos do titular", children: [
      { label: "Acesso (exportar)" },
      { label: "Correção (com auditoria)" },
      { label: "Exclusão/Anonimização" },
      { label: "Portabilidade (JSON/CSV)" },
      { label: "Revogação consentimento" },
      { label: "Revisão decisão IA" },
    ]},
    { label: "Técnico", children: [
      { label: "Criptografia repouso" },
      { label: "Pseudonimização logs" },
      { label: "RBAC + RLS" },
      { label: "TTL de retenção" },
      { label: "Audit trail" },
    ]},
    { label: "Compliance", children: [
      { label: "ROPA no banco" },
      { label: "Cookie banner" },
      { label: "Plano de incidentes" },
      { label: "LGPD vs GDPR" },
    ]},
  ],
},
mnemonic: {
  acronym: "MACRO",
  breakdown: [
    { letter: "M", word: "Minimização", hint: "Só colete o dado necessário" },
    { letter: "A", word: "Acesso do titular", hint: "Exporte tudo que tem sobre ele" },
    { letter: "C", word: "Criptografia em repouso", hint: "CPF/saúde: pgcrypto no banco" },
    { letter: "R", word: "Registro de atividades", hint: "ROPA: base legal para cada dado" },
    { letter: "O", word: "Opt-out funcional", hint: "Exclusão/anonimização em &lt;72h" },
  ],
},
relatedSlugs: ["integracao-api-whatsapp-business", "webhook-n8n-integracoes-sem-codigo"],
};

export default post;
