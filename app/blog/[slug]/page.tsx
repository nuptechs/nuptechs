import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NavLinks from "../../components/NavLinks";
import ThemeToggle from "../../components/ThemeToggle";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

export const posts: Record<string, {
  slug: string;
  tag: string;
  title: string;
  description: string;
  keywords: string[];
  readTime: string;
  publishedAt: string;
  content: string;
}> = {
  "como-automatizar-processos-manuais": {
    slug: "como-automatizar-processos-manuais",
    tag: "Automação",
    title: "Como automatizar processos manuais e liberar 30h/semana da sua equipe",
    description: "Descubra as 5 tarefas que mais consomem tempo em operações e como eliminá-las com fluxos inteligentes e integrações de API.",
    keywords: ["automação de processos manuais", "liberar tempo equipe", "RPA empresarial", "fluxos automatizados"],
    readTime: "6 min",
    publishedAt: "2026-02-15",
    content: `
<p class="lead">Toda empresa tem um problema que raramente aparece em reuniões estratégicas: <strong>horas desperdiçadas em tarefas que um sistema poderia fazer sozinho</strong>. Copiar dados de uma planilha para outra. Mandar e-mail de confirmação manualmente. Atualizar status em três ferramentas diferentes depois de uma venda.</p>

<p>Essas tarefas são pequenas individualmente — 10, 15 minutos cada. Mas some isso ao longo de um mês, multiplique por quantos colaboradores fazem o mesmo, e você vai encontrar dezenas — às vezes centenas — de horas perdidas por semana em trabalho que não gera nenhum valor para o cliente.</p>

<p>Neste artigo, vamos mapear as cinco categorias de tarefas que mais consomem tempo operacional em empresas brasileiras — e mostrar, de forma prática, como automatizá-las.</p>

<h2>Por que a automação ainda não aconteceu na sua empresa</h2>

<p>Antes de falar em solução, é importante entender o diagnóstico. A maioria das empresas não automatiza por três razões:</p>

<ul>
  <li><strong>Acham que é caro ou complexo.</strong> Automação virou sinônimo de "projeto grande de TI". Não precisa ser.</li>
  <li><strong>Não enxergam o custo do status quo.</strong> Ninguém calcula quanto custa um colaborador sênior copiando dados manualmente por 2h/dia.</li>
  <li><strong>Não sabem por onde começar.</strong> Existe uma paralisia de escolha entre ferramentas, metodologias e fornecedores.</li>
</ul>

<p>Nenhuma dessas barreiras é intransponível. O primeiro passo é mapear onde o tempo vai — e priorizá-las por impacto.</p>

<h2>As 5 categorias que mais consomem tempo operacional</h2>

<h3>1. Entrada e transferência de dados entre sistemas</h3>

<p>Este é, sem exagero, o maior desperdiçador de tempo em operações. Um colaborador recebe um pedido por e-mail, abre o CRM, cadastra o cliente, abre o ERP, cria o pedido, atualiza a planilha de controle. Todo esse processo pode ser automatizado.</p>

<p><strong>Impacto típico:</strong> 1 a 3 horas por dia por colaborador operacional.</p>

<p><strong>Como automatizar:</strong> Identifique os pontos de entrada de dados (formulário, e-mail, WhatsApp) e os sistemas de destino (CRM, ERP, planilha). Uma integração via API ou ferramentas como n8n ou Make consegue sincronizar isso automaticamente quando um evento dispara.</p>

<p><strong>Exemplo real:</strong> Uma clínica médica com 3 atendentes que recebiam agendamentos por WhatsApp e os copiavam para o sistema. Depois de automatizar com um formulário conectado ao sistema via webhook, economizaram 4h/dia coletivas — e zeraram erros de transcrição.</p>

<h3>2. Confirmações, lembretes e follow-ups</h3>

<p>Toda empresa tem um ciclo de comunicação repetitivo: confirmar pedidos, lembrar clientes de consultas, cobrar boletos próximos do vencimento, fazer follow-up em propostas sem resposta. São mensagens que precisam ser enviadas no momento certo — e que ninguém tem tempo de enviar manualmente com consistência.</p>

<p><strong>Impacto típico:</strong> 1 a 2 horas por dia por equipe de atendimento ou vendas.</p>

<p><strong>Como automatizar:</strong> Defina os gatilhos (data de vencimento, status de proposta, confirmação de pedido) e os canais (e-mail, WhatsApp, SMS). Ferramentas como n8n, ActiveCampaign ou um sistema próprio com CRON jobs e integração à API do WhatsApp Business resolvem isso de forma robusta.</p>

<p><strong>Dado importante:</strong> Lembretes automáticos reduzem no-shows em consultas em até 70% segundo estudos setoriais de saúde. Para vendas, follow-ups automáticos aumentam a taxa de conversão em 20 a 30%.</p>

<h3>3. Geração de documentos e relatórios</h3>

<p>Propostas comerciais, contratos, notas fiscais, relatórios mensais para a diretoria — muitos desses documentos têm estrutura fixa e dados variáveis que poderiam ser preenchidos automaticamente. Em vez disso, um colaborador passa horas por semana formatando PDFs e copiando números de um lugar para outro.</p>

<p><strong>Impacto típico:</strong> 3 a 8 horas por semana em equipes comerciais e financeiras.</p>

<p><strong>Como automatizar:</strong> Crie templates (no Word, Google Docs ou diretamente no código) e conecte-os às fontes de dados. Uma API que pega os dados do CRM e gera um PDF de proposta em segundos não é ficção científica — é desenvolvido em alguns dias com Node.js ou Python.</p>

<h3>4. Triagem e classificação de demandas</h3>

<p>Todo time de suporte, vendas ou operações recebe demandas por múltiplos canais — e alguém precisa ler, categorizar, priorizar e direcionar cada uma. Com volumes altos, isso vira um gargalo que atrasa o atendimento e esgota quem triagem.</p>

<p><strong>Impacto típico:</strong> 1 a 4 horas por dia em times de suporte ou vendas com alto volume.</p>

<p><strong>Como automatizar:</strong> Modelos de linguagem (LLMs) como GPT-4 conseguem classificar um texto com alta precisão em categorias predefinidas. Uma chamada de API a cada mensagem recebida, com resposta em menos de 1 segundo, é suficiente para triagem automática com mais de 90% de acurácia.</p>

<h3>5. Monitoramento e alertas manuais</h3>

<p>Alguém olha o painel de vendas toda manhã para ver se bateu a meta. Alguém verifica se o estoque está baixo antes de fazer o pedido de compra. Alguém checa se o servidor está no ar. Tudo isso deveria ser proativo — o sistema que avisa você, não o contrário.</p>

<p><strong>Impacto típico:</strong> 30 min a 2 horas por dia em gestores e analistas.</p>

<p><strong>Como automatizar:</strong> Defina os thresholds e configure alertas automáticos por e-mail, WhatsApp ou Slack. Com webhooks e integrações simples, o sistema monitora e avisa — você só age quando precisa.</p>

<h2>O método de três perguntas para priorizar o que automatizar</h2>

<p>Não adianta automatizar tudo ao mesmo tempo. Use estas três perguntas para priorizar:</p>

<ol>
  <li><strong>Frequência:</strong> Essa tarefa acontece diariamente? Semanalmente? Quanto mais frequente, maior o impacto da automação.</li>
  <li><strong>Padronização:</strong> Existe um padrão claro de entrada → processamento → saída? Tarefas com regras definidas são mais fáceis de automatizar com alta confiabilidade.</li>
  <li><strong>Custo de erro:</strong> O que acontece se der errado? Automação de tarefas de alto impacto exige mais cuidado no design e nos fallbacks.</li>
</ol>

<p>Com base nessas três respostas, monte uma matriz simples e ataque primeiro o que é <strong>frequente + padronizado + baixo custo de erro</strong>. Esses são os quick wins que constroem confiança no processo de automação.</p>

<h2>Ferramentas e abordagens</h2>

<p>Existem basicamente três caminhos para automatizar processos:</p>

<p><strong>1. Ferramentas no-code/low-code</strong> (n8n, Make, Zapier): Ideais para integrações simples entre SaaS. Rápidas de configurar, mas com limitações de flexibilidade e escala.</p>

<p><strong>2. Desenvolvimento sob medida:</strong> Para processos críticos, com alto volume ou que precisam de lógica complexa. Mais custoso no início, mas totalmente adaptado ao seu contexto — e com manutenção previsível.</p>

<p><strong>3. Híbrido:</strong> Use no-code para prototipagem e validação. Quando o processo amadurece e o volume cresce, migre para código próprio. Esta é a abordagem que recomendamos na NuPtechs.</p>

<h2>Quanto tempo leva para ver resultado</h2>

<p>Projetos de automação bem escopados têm ROI rápido. Nossa experiência em mais de 200 projetos mostra que:</p>

<ul>
  <li><strong>Integrações simples</strong> (conectar dois sistemas via API): 1 a 5 dias, retorno imediato.</li>
  <li><strong>Automação de fluxo completo</strong> (entrada → processamento → saída + alertas): 2 a 4 semanas, ROI em 1 a 2 meses.</li>
  <li><strong>Plataforma de automação customizada</strong>: 4 a 12 semanas, ROI em 3 a 6 meses.</li>
</ul>

<p>O erro mais comum é esperar o projeto "perfeito" antes de começar. Comece pequeno, meça o resultado, itere.</p>

<h2>Próximos passos</h2>

<p>Se você identificou pelo menos uma das cinco categorias acima na sua operação, o diagnóstico gratuito da NuPtechs pode ajudar a mapear o impacto real e o esforço de implementação — sem compromisso.</p>

<p>Em 30 minutos de conversa, nossa equipe técnica entende o contexto, identifica os processos com maior potencial e devolve um plano concreto. Sem slides genéricos, sem proposta de escopo absurdo. Direto ao ponto.</p>
    `
  },
  "llms-no-mundo-corporativo": {
    slug: "llms-no-mundo-corporativo",
    tag: "IA Aplicada",
    title: "LLMs no mundo corporativo: onde a IA realmente entrega ROI",
    description: "Análise de casos reais de empresas brasileiras que implementaram IA e os resultados mensuráveis obtidos nos primeiros 90 dias.",
    keywords: ["LLM empresarial", "IA corporativa ROI", "inteligência artificial empresas brasileiras", "GPT corporativo"],
    readTime: "8 min",
    publishedAt: "2026-02-10",
    content: `
<p class="lead">A inteligência artificial saiu do laboratório e entrou no orçamento de TI. Mas entre o hype dos comunicados de imprensa e a realidade das operações, existe uma distância que poucos falam abertamente: <strong>nem toda implementação de IA entrega resultado.</strong></p>

<p>Neste artigo, vamos além dos casos de sucesso editados para marketing. Analisamos onde LLMs (Large Language Models) — modelos como GPT-4, Gemini e Claude — realmente geram retorno mensurável em ambientes corporativos, e onde eles falham silenciosamente.</p>

<h2>O que são LLMs na prática empresarial</h2>

<p>LLMs são modelos de linguagem treinados em enormes volumes de texto que conseguem entender e gerar linguagem natural com alta qualidade. Na prática corporativa, eles aparecem principalmente em três formas:</p>

<ul>
  <li><strong>Agentes de atendimento:</strong> Respondem perguntas de clientes ou colaboradores com base em uma base de conhecimento.</li>
  <li><strong>Processadores de texto:</strong> Classificam, resumem, extraem informações ou geram rascunhos de documentos.</li>
  <li><strong>Assistentes de decisão:</strong> Analisam dados e sugerem ações baseadas em padrões históricos e contexto.</li>
</ul>

<p>A diferença entre esses casos de uso em termos de complexidade, custo e risco é enorme — e confundir os três é um dos principais motivos de projetos mal-sucedidos.</p>

<h2>Onde LLMs entregam ROI consistente</h2>

<h3>1. Triagem e classificação de texto em escala</h3>

<p>Esta é, sem dúvida, a aplicação com melhor relação custo-benefício de LLMs em empresas. Classifique chamados de suporte por urgência e categoria, e-mails por intenção, leads por qualificação ou documentos por tipo — em milissegundos, com mais de 90% de acurácia.</p>

<p><strong>Resultado típico:</strong> Redução de 60 a 80% do tempo de triagem manual, com taxa de erro menor que um humano cansado.</p>

<p><strong>Custo:</strong> Uma chamada de API ao GPT-4o Mini custa menos de R$ 0,01. Para 10.000 classificações por mês, o custo de IA é inferior a R$ 100. A economia em horas de trabalho é ordens de magnitude maior.</p>

<h3>2. Geração de rascunhos de documentos padronizados</h3>

<p>Propostas comerciais, e-mails de follow-up, respostas a reclamações, relatórios de análise — documentos com estrutura conhecida e dados variáveis são candidatos perfeitos para geração assistida por LLM.</p>

<p><strong>Resultado típico:</strong> Redução de 50 a 70% do tempo de produção de documentos recorrentes. O colaborador revisa e aprova, em vez de criar do zero.</p>

<p><strong>Cuidado importante:</strong> LLMs "alucinam" — inventam fatos quando não têm informação suficiente. Para documentos com dados precisos (contratos, laudos técnicos), é essencial combinar LLM com dados estruturados via RAG (Retrieval-Augmented Generation).</p>

<h3>3. Atendimento ao cliente para perguntas frequentes</h3>

<p>Um agente treinado na base de conhecimento da empresa — manuais, FAQs, políticas de retorno, especificações de produto — consegue resolver 40 a 60% das dúvidas de clientes sem intervenção humana, 24 horas por dia.</p>

<p><strong>Resultado típico:</strong> Redução de 30 a 50% do volume de tickets que chegam ao time de suporte humano.</p>

<p><strong>O segredo:</strong> O agente precisa saber quando não sabe. Um bom sistema de atendimento com IA tem sempre um caminho claro de escalonamento para humanos — e isso precisa ser testado exaustivamente antes do go-live.</p>

<h3>4. Extração de dados de documentos não estruturados</h3>

<p>NFs, contratos, laudos, formulários digitalizados — documentos que existem em PDF ou imagem e precisam ter dados extraídos manualmente. LLMs combinados com OCR conseguem extrair campos específicos com alta precisão, transformando horas de trabalho em segundos.</p>

<p><strong>Resultado típico:</strong> Redução de 80 a 95% do tempo de processamento de documentos de entrada.</p>

<h2>Onde LLMs frequentemente falham</h2>

<h3>Cálculos e raciocínio matemático preciso</h3>

<p>LLMs são notoriamente ruins em matemática complexa. Para cálculos financeiros, análises quantitativas ou qualquer coisa que exija precisão numérica, use ferramentas determinísticas — e use LLMs apenas para interpretar e comunicar os resultados.</p>

<h3>Acesso a dados em tempo real sem integração</h3>

<p>O modelo em si não sabe o que aconteceu ontem na sua empresa. Sem integração com suas fontes de dados (via RAG, function calling ou APIs), o LLM responde com seu conhecimento de treinamento — que pode estar desatualizado ou simplesmente não ter os dados que você precisa.</p>

<h3>Processos que exigem responsabilidade jurídica</h3>

<p>Diagnósticos médicos, pareceres jurídicos, laudos de engenharia — qualquer coisa onde um erro tem consequência legal precisa de revisão humana obrigatória. LLMs podem auxiliar, mas não substituir a responsabilidade profissional.</p>

<h2>O modelo de implementação que funciona</h2>

<p>Nos projetos de IA que executamos na NuPtechs, seguimos um padrão de quatro etapas que minimiza risco e maximiza aprendizado:</p>

<ol>
  <li><strong>Escopo cirúrgico:</strong> Começamos com um único caso de uso bem definido — não "implementar IA na empresa". O escopo estreito permite medição clara e aprendizado rápido.</li>
  <li><strong>Dados primeiro:</strong> Antes de escrever uma linha de código de IA, mapeamos e limpamos os dados que o modelo vai usar. Lixo entra, lixo sai.</li>
  <li><strong>Baseline humano:</strong> Medimos a performance atual do processo sem IA — tempo, taxa de erro, custo. Sem baseline, não há como medir o ROI.</li>
  <li><strong>Piloto com 10% do volume:</strong> Rodamos o sistema em paralelo com o processo manual por 2 a 4 semanas antes de escalar. Isso captura casos extremos que o desenvolvimento não antecipou.</li>
</ol>

<h2>A pergunta certa a fazer antes de investir</h2>

<p>Antes de contratar qualquer projeto de IA, faça esta pergunta ao fornecedor: <em>"Qual é o baseline atual desse processo, e como vamos medir o resultado depois de 90 dias?"</em></p>

<p>Se a resposta não for específica e mensurável, o projeto provavelmente vai gerar um bom slide de demonstração — e pouco impacto real na operação.</p>

<p>Na NuPtechs, todo projeto de IA começa com um diagnóstico de 30 minutos onde mapeamos o processo atual, estimamos o impacto e definimos as métricas de sucesso. Gratuito, sem compromisso.</p>
    `
  },
  "dashboard-bi-para-pmes": {
    slug: "dashboard-bi-para-pmes",
    tag: "Business Intelligence",
    title: "Dashboard de BI para PMEs: como sair das planilhas e tomar decisões em tempo real",
    description: "Guia completo para pequenas e médias empresas implementarem inteligência de dados sem depender de relatórios manuais ou consultores caros.",
    keywords: ["dashboard BI PME", "business intelligence pequenas empresas", "sair das planilhas", "decisões baseadas em dados", "BI acessível para empresas"],
    readTime: "7 min",
    publishedAt: "2026-02-22",
    content: `
<p class="lead">A maioria das pequenas e médias empresas toma decisões estratégicas baseadas em planilhas desatualizadas, relatórios mensais que chegam tarde demais e sensações — não em dados em tempo real. O problema não é falta de dados: é falta de acesso a eles no momento certo.</p>

<p>Neste artigo, mostramos como PMEs podem implementar um dashboard de Business Intelligence funcional, sem precisar de uma equipe de dados própria ou de contratar plataformas empresariais que custam dezenas de milhares por ano.</p>

<h2>Por que a planilha deixou de ser suficiente</h2>

<p>A planilha foi a primeira ferramenta de BI da história corporativa — e ainda tem seu lugar. Mas ela falha em três pontos críticos quando o negócio cresce:</p>

<ul>
  <li><strong>Latência:</strong> Os dados precisam ser coletados, formatados e consolidados manualmente. Quando o relatório fica pronto, os dados já têm dias ou semanas.</li>
  <li><strong>Escala:</strong> Com mais fontes de dados (CRM, ERP, e-commerce, financeiro), manter a planilha atualizada e consistente torna-se um trabalho em tempo integral.</li>
  <li><strong>Erro humano:</strong> Uma fórmula errada, uma linha duplicada ou uma coluna não atualizada pode comprometer toda a análise — e o problema frequentemente só aparece meses depois.</li>
</ul>

<p>Um dashboard de BI resolve esses três problemas: conecta diretamente às fontes de dados, atualiza em tempo real (ou em ciclos curtos) e elimina a camada manual.</p>

<h2>O que um dashboard de BI precisa ter (e o que pode ignorar)</h2>

<p>A indústria de BI vende complexidade. Mas para a maioria das PMEs, um dashboard eficiente precisa de apenas quatro elementos:</p>

<h3>1. KPIs do negócio na tela principal</h3>
<p>Faturamento do mês vs. meta, ticket médio, número de pedidos, margem bruta — os 5 a 8 indicadores que o gestor olha toda manhã para saber se o negócio está saudável. Tudo em uma tela, sem precisar navegar.</p>

<h3>2. Drill-down para o detalhe</h3>
<p>Quando um KPI está fora do esperado, é preciso entender o porquê sem abrir outra ferramenta. Um bom dashboard permite clicar em "faturamento do mês" e ver o detalhamento por produto, canal de venda, região ou vendedor em segundos.</p>

<h3>3. Alertas automáticos</h3>
<p>Em vez de checar o dashboard todo dia, configure alertas: "me avise quando o estoque de produto X cair abaixo de 50 unidades" ou "me avise se o churn semanal superar 5%". O dashboard que avisa proativamente é mais valioso que o que espera ser consultado.</p>

<h3>4. Dados históricos comparativos</h3>
<p>A análise mais útil não é "quanto vendemos este mês" — é "quanto vendemos este mês vs. o mesmo mês do ano passado, e qual a tendência". Sem histórico estruturado, você perde o contexto para interpretar os números.</p>

<h2>As fontes de dados que precisam estar conectadas</h2>

<p>Um dashboard de BI só é tão bom quanto as fontes que alimentam. Para a maioria das PMEs, as conexões prioritárias são:</p>

<ul>
  <li><strong>Financeiro:</strong> Contas a pagar, contas a receber, fluxo de caixa — idealmente integrado ao sistema contábil ou bancário via API.</li>
  <li><strong>Comercial:</strong> Pipeline de vendas, funil de conversão, metas por vendedor — via CRM.</li>
  <li><strong>Operacional:</strong> Estoque, pedidos em aberto, tempo de entrega — via ERP ou sistema próprio.</li>
  <li><strong>Marketing:</strong> Custo de aquisição, conversão por canal, ROAS — via Google Ads, Meta Ads e Google Analytics.</li>
</ul>

<p>Não precisa conectar tudo ao mesmo tempo. Comece com as duas fontes mais críticas para o seu negócio e expanda progressivamente.</p>

<h2>Stack tecnológico para PMEs: sem exagero</h2>

<p>Existe uma pressão para usar plataformas "enterprise" como Tableau, Power BI ou Looker. São ótimas ferramentas — mas custam caro, têm curva de aprendizado alta e, para a maioria das PMEs, entregam 80% das funcionalidades que nunca serão usadas.</p>

<p>Para PMEs, uma stack mais enxuta frequentemente funciona melhor:</p>

<ul>
  <li><strong>Banco de dados:</strong> PostgreSQL ou MySQL — robusto, gratuito e suportado por praticamente toda ferramenta de visualização.</li>
  <li><strong>ETL (integração de dados):</strong> n8n ou scripts Python agendados via CRON — conecta as fontes, normaliza e carrega no banco.</li>
  <li><strong>Visualização:</strong> Grafana (gratuito, altamente customizável) ou Metabase (gratuito, mais amigável para não-técnicos).</li>
  <li><strong>Alertas:</strong> Email, WhatsApp ou Slack via webhooks — custo marginal zero.</li>
</ul>

<p>Esta stack pode ser implementada em 2 a 4 semanas para os primeiros KPIs e evoluída de forma incremental.</p>

<h2>O erro mais comum: o dashboard sem dono</h2>

<p>O maior motivo de fracasso em projetos de BI não é tecnológico — é organizacional. Um dashboard implementado sem um "dono" designado que o mantém atualizado e que cobra da equipe sua utilização vira um painel bonito que ninguém usa depois de 3 meses.</p>

<p>Antes de implementar, defina:</p>
<ul>
  <li>Quem é o gestor responsável por cada KPI?</li>
  <li>Qual é a cadência de revisão do dashboard (diária? semanal?)?</li>
  <li>O que acontece quando um indicador está fora da meta?</li>
</ul>

<p>A tecnologia é a parte fácil. A parte difícil é criar o hábito de usar os dados para tomar decisões.</p>

<h2>Por onde começar agora</h2>

<p>Se você quer sair das planilhas sem um projeto de seis meses, o caminho mais rápido é:</p>

<ol>
  <li>Liste os 5 indicadores que você consulta toda semana — esses são seus primeiros KPIs.</li>
  <li>Identifique em qual sistema cada um desses indicadores está hoje.</li>
  <li>Verifique se esse sistema tem API (a maioria dos ERPs e CRMs modernos tem).</li>
  <li>Com essas três informações em mãos, um diagnóstico técnico de 30 minutos é suficiente para estimar o esforço de implementação.</li>
</ol>

<p>Na NuPtechs, já implementamos dashboards de BI para PMEs em setores de saúde, varejo, serviços e logística. Em média, o primeiro dashboard funcional fica pronto em 2 a 3 semanas — e o ROI aparece na primeira reunião de resultado em que os gestores chegam com dados em vez de estimativas.</p>
    `
  },
  "como-escolher-stack-tecnologica": {
    slug: "como-escolher-stack-tecnologica",
    tag: "Desenvolvimento Ágil",
    title: "Como escolher a stack tecnológica certa para o seu projeto de software",
    description: "Os critérios que engenheiros seniores usam para definir linguagem, banco de dados e infraestrutura — e como evitar as decisões que viram dívida técnica.",
    keywords: ["como escolher stack tecnológica", "linguagem de programação para projeto", "arquitetura de software empresarial", "dívida técnica stack", "escolher banco de dados"],
    readTime: "6 min",
    publishedAt: "2026-02-18",
    content: `
<p class="lead">A escolha de stack tecnológica é uma das decisões com maior impacto de longo prazo em um projeto de software — e uma das mais frequentemente feitas pelos motivos errados. "É o que eu sei usar", "está na moda" ou "foi o que o fornecedor recomendou" não são critérios técnicos. São atalhos que viram dívida.</p>

<p>Neste artigo, apresentamos os critérios que engenheiros seniores usam para tomar essa decisão de forma estruturada — independentemente do projeto.</p>

<h2>O que é uma "stack" e por que importa tanto</h2>

<p>Stack tecnológica é o conjunto de linguagens, frameworks, bancos de dados, serviços de infraestrutura e ferramentas que compõem um sistema. A stack define:</p>

<ul>
  <li>A velocidade com que novas funcionalidades podem ser entregues</li>
  <li>O custo de manutenção e operação ao longo do tempo</li>
  <li>A facilidade de contratar e onboar novos desenvolvedores</li>
  <li>A resiliência e escalabilidade do sistema em condições adversas</li>
</ul>

<p>Uma stack escolhida bem não aparece — o sistema simplesmente funciona. Uma stack escolhida mal gera lentidão, bugs recorrentes, dificuldade de manutenção e, eventualmente, uma reescrita completa que custa 3 a 10 vezes o projeto original.</p>

<h2>Os cinco critérios de avaliação</h2>

<h3>1. Fit com o problema</h3>
<p>Cada linguagem e framework tem pontos fortes e fracos. Python é excelente para processamento de dados e IA, mas não é a melhor escolha para aplicações de tempo real de alta concorrência. Node.js brilha em APIs com muitas conexões simultâneas, mas pode ser complexo para processamento computacionalmente intenso.</p>

<p>A primeira pergunta é sempre: <strong>qual é o perfil de carga e a natureza do problema?</strong> CPU-bound, I/O-bound, processamento em batch, tempo real, alta concorrência — cada perfil tem soluções mais adequadas.</p>

<h3>2. Maturidade do ecossistema</h3>
<p>Uma linguagem jovem ou um framework recém-lançado pode parecer atraente, mas o ecossistema importa. Bibliotecas disponíveis, documentação, comunidade ativa, frequência de updates de segurança e histórico de breaking changes são fatores que determinam o custo de manutenção nos próximos anos.</p>

<p>Regra prática: para sistemas que precisam durar 5+ anos, prefira tecnologias com mais de 5 anos de histórico estável. Inove na lógica de negócio, não na infraestrutura.</p>

<h3>3. Disponibilidade de profissionais</h3>
<p>A stack mais elegante do mundo não adianta se contratar um desenvolvedor para mantê-la leva 6 meses. Avalie o pool de profissionais disponíveis no seu contexto geográfico e orçamentário.</p>

<p>Isso não significa usar sempre o que é mais comum — significa ponderar a raridade da skill contra os benefícios técnicos. Go é uma linguagem excelente, mas o pool de desenvolvedores no Brasil ainda é menor que o de Python ou JavaScript. Para um projeto crítico com equipe pequena, isso importa.</p>

<h3>4. Custo de operação em escala</h3>
<p>O custo de hospedar e operar o sistema em produção muda radicalmente dependendo das escolhas de stack. Uma aplicação Java em uma instância EC2 dedicada vs. funções serverless em Node.js podem ter custos muito diferentes conforme o padrão de uso.</p>

<p>Estime o custo de infraestrutura para 10x, 100x e 1000x o volume inicial. Algumas escolhas de stack que são baratas no início se tornam proibitivas em escala — e vice-versa.</p>

<h3>5. Velocidade de iteração inicial</h3>
<p>Para MVPs e projetos com alto grau de incerteza, a capacidade de iterar rapidamente vale mais do que a otimização prematura. Frameworks que oferecem produtividade alta no início — mesmo com algum custo de performance — frequentemente são a escolha certa para validar hipóteses de produto.</p>

<p>É legítimo escolher uma stack de alta produtividade para o MVP e reavaliá-la quando o produto amadurecer e as gargalos de performance ficarem visíveis.</p>

<h2>Banco de dados: o erro mais caro</h2>

<p>A escolha do banco de dados é frequentemente a mais difícil de reverter. Migrar de banco depois do sistema em produção é um projeto de meses com alto risco. Por isso, esta decisão merece atenção especial.</p>

<p>A dicotomia SQL vs. NoSQL ainda confunde muita gente. A heurística mais útil:</p>

<ul>
  <li><strong>Dados relacionais com integridade crítica</strong> (transações financeiras, saúde, contratos): PostgreSQL. Ponto.</li>
  <li><strong>Dados com estrutura flexível e alta velocidade de escrita</strong> (logs, eventos, IoT): MongoDB ou Cassandra.</li>
  <li><strong>Cache e dados temporários de alta frequência:</strong> Redis.</li>
  <li><strong>Buscas full-text e vetoriais</strong> (IA, recomendações): Elasticsearch ou pgvector.</li>
</ul>

<p>Em muitos sistemas modernos, a resposta certa é <strong>usar mais de um banco</strong> — cada um para o tipo de dado que gerencia melhor. O erro é tentar usar um banco para tudo.</p>

<h2>Infraestrutura: cloud vs. on-premise em 2026</h2>

<p>Em 2026, a discussão cloud vs. on-premise para a maioria das empresas já está resolvida: cloud, exceto quando há requisitos regulatórios específicos que exijam dados on-premise (setores como defesa, alguns nichos do financeiro e saúde pública).</p>

<p>A decisão relevante agora é <strong>qual modelo de cloud</strong>:</p>
<ul>
  <li><strong>IaaS</strong> (EC2, Compute Engine): controle máximo, mas você gerencia o SO, patches e escalabilidade.</li>
  <li><strong>PaaS</strong> (Heroku, Railway, Render): menos controle, muito mais velocidade de deploy e operação.</li>
  <li><strong>Serverless</strong> (Vercel, AWS Lambda, Cloudflare Workers): custo zero em idle, escalabilidade automática, mas com limitações de runtime e vendor lock-in mais pronunciado.</li>
</ul>

<p>Para sistemas novos sem requisitos especiais de performance ou compliance: comece com PaaS ou serverless. Migre para IaaS apenas quando a escala ou os requisitos técnicos justificarem o overhead operacional.</p>

<h2>O que nunca deve guiar a escolha de stack</h2>

<p>Alguns critérios que aparecem frequentemente em decisões de stack, mas que são armadilhas:</p>

<ul>
  <li><strong>"É o que eu sei":</strong> A familiaridade do desenvolvedor importa, mas não deve ser o fator principal. Um desenvolvedor sênior aprende uma nova linguagem em semanas. A stack sobrevive anos.</li>
  <li><strong>"Está na moda":</strong> Tecnologias seguem ciclos de hype. O que é trending no Twitter hoje pode estar abandonado em 3 anos. Prefira estabilidade e maturidade.</li>
  <li><strong>"A empresa X usa isso":</strong> O contexto de uma startup de 50 engenheiros ou de uma big tech com décadas de investimento em tooling raramente se traduz para PMEs ou projetos menores.</li>
</ul>

<h2>A avaliação de stack em projetos NuPtechs</h2>

<p>Em todo projeto que executamos, a definição de stack passa por um processo estruturado: análise do perfil de carga, mapeamento de integrações necessárias, avaliação do time que vai manter o sistema pós-entrega e estimativa de custo operacional em 1, 3 e 5 anos.</p>

<p>Quando esse processo aponta para uma stack diferente da que o cliente esperava, explicamos o raciocínio — e chegamos juntos a uma decisão informada.</p>

<p>Se você tem um projeto em avaliação e quer uma segunda opinião técnica sobre a stack, o diagnóstico gratuito da NuPtechs pode ajudar. 30 minutos, sem compromisso.</p>
    `
  },
  "integracao-api-whatsapp-business": {
    slug: "integracao-api-whatsapp-business",
    tag: "Integrações",
    title: "Como integrar a API do WhatsApp Business ao seu sistema empresarial",
    description: "Passo a passo técnico e estratégico para empresas que querem automatizar atendimento, confirmações e notificações via WhatsApp sem depender de plataformas caras.",
    keywords: ["API WhatsApp Business", "integrar WhatsApp sistema empresarial", "automação WhatsApp empresas", "WhatsApp API custo", "chatbot WhatsApp"],
    readTime: "8 min",
    publishedAt: "2026-02-12",
    content: `
<p class="lead">O WhatsApp é o canal de comunicação dominante no Brasil — 99% dos smartphones têm o app instalado, e a taxa de abertura de mensagens supera 90%. Para empresas, isso significa que qualquer automação bem executada via WhatsApp tem impacto imediato e mensurável. O problema é que a maioria das implementações é feita de forma errada: cara, frágil ou fora dos termos de uso.</p>

<p>Este guia cobre o que você precisa saber para integrar a API oficial do WhatsApp Business ao seu sistema — de forma correta, escalável e com custo controlado.</p>

<h2>API oficial vs. soluções não-oficiais: o risco que a maioria ignora</h2>

<p>Existem dezenas de ferramentas que prometem "integração com WhatsApp" a baixo custo — WhatsApp Web automatizado, bibliotecas não-oficiais, soluções que usam números de celular pessoal via emulação. Todas funcionam até o momento em que o número é banido.</p>

<p>O WhatsApp detecta padrões de uso automatizado e bane números com agressividade crescente desde 2023. Para uma empresa que usa WhatsApp como canal principal de atendimento ou vendas, um ban significa perda imediata de contato com toda a base de clientes cadastrada naquele número.</p>

<p><strong>A solução correta é a API oficial da Meta (WhatsApp Business API)</strong>, acessível diretamente pela Meta ou via BSPs (Business Solution Providers) credenciados. É mais cara, tem políticas mais rígidas — e é a única opção estável para uso empresarial de longo prazo.</p>

<h2>Como a API oficial funciona</h2>

<p>A WhatsApp Business API opera em um modelo diferente do WhatsApp que você usa pessoalmente:</p>

<ul>
  <li><strong>Número dedicado:</strong> Você usa um número de telefone específico para a conta de negócios, não um celular pessoal.</li>
  <li><strong>Templates para mensagens proativas:</strong> Para enviar mensagens a clientes que não iniciaram a conversa nas últimas 24 horas, você precisa usar templates pré-aprovados pela Meta.</li>
  <li><strong>Janela de atendimento:</strong> Quando um cliente envia mensagem, você tem 24 horas para responder com qualquer conteúdo. Fora dessa janela, só via template.</li>
  <li><strong>Cobrado por conversa:</strong> A Meta cobra por "conversa" (janela de 24h), não por mensagem individual. O custo varia por país e categoria.</li>
</ul>

<h2>Quanto custa na prática</h2>

<p>Os preços da API são públicos e dependem de três variáveis: país do usuário, categoria da conversa (marketing, utilidade, autenticação, serviço) e quem inicia (empresa ou usuário).</p>

<p>Para o Brasil em 2026 (valores aproximados em USD, convertidos pelo câmbio do momento):</p>
<ul>
  <li><strong>Conversa de serviço</strong> (iniciada pelo usuário): ~USD 0,03 por conversa</li>
  <li><strong>Conversa de utilidade</strong> (confirmações, atualizações iniciadas pela empresa): ~USD 0,04</li>
  <li><strong>Conversa de marketing</strong> (promoções iniciadas pela empresa): ~USD 0,06</li>
  <li><strong>Autenticação</strong> (OTP, 2FA): ~USD 0,03</li>
</ul>

<p>Para referência: 10.000 confirmações de pedido por mês custam aproximadamente USD 400 (R$ 2.000). O mesmo volume via SMS custaria 3 a 5x mais, com taxa de abertura 4x menor.</p>

<h2>Os casos de uso com melhor ROI</h2>

<h3>Confirmações e lembretes automáticos</h3>
<p>Confirmação de pedido, lembrete de consulta, aviso de entrega, notificação de vencimento de boleto — mensagens transacionais com template aprovado. Taxa de leitura acima de 90% garante impacto real. Redução de no-shows em saúde: 50 a 70%. Redução de inadimplência com notificação proativa: 20 a 40%.</p>

<h3>Atendimento ao cliente com IA</h3>
<p>Um agente de IA treinado na base de conhecimento da empresa (FAQs, políticas, catálogo) consegue resolver 40 a 60% das dúvidas sem intervenção humana. Para o restante, o sistema faz o handoff para um atendente humano de forma transparente.</p>

<h3>Qualificação de leads</h3>
<p>Quando um prospect preenche um formulário no site ou clica em um anúncio, um fluxo automático via WhatsApp pode qualificá-lo (fazer as perguntas de descoberta) e agendar uma demonstração — sem que um vendedor precise estar online.</p>

<h3>Notificações operacionais internas</h3>
<p>Alertas para a equipe: "Pedido de alto valor recebido", "Estoque de produto X crítico", "Servidor com latência alta". WhatsApp como canal de alerta interno tem taxa de resposta muito superior ao e-mail.</p>

<h2>Arquitetura de implementação</h2>

<p>Uma implementação robusta da API do WhatsApp Business tem cinco componentes:</p>

<ol>
  <li><strong>Conta Meta Business + número verificado:</strong> Setup inicial via Meta Business Suite. Requer verificação do negócio.</li>
  <li><strong>Webhook para receber mensagens:</strong> Endpoint HTTPS no seu sistema que a Meta chama a cada mensagem recebida. Precisa responder em menos de 5 segundos.</li>
  <li><strong>Sistema de roteamento:</strong> Lógica que decide se a mensagem vai para o bot, para um atendente humano ou para processamento automatizado.</li>
  <li><strong>Engine de resposta:</strong> Bot com IA, árvore de decisão ou painel de atendimento humano (ou combinação dos três).</li>
  <li><strong>Fila de mensagens:</strong> Para volumes altos, uma fila (RabbitMQ, SQS, ou similar) garante que nenhuma mensagem se perca em picos de tráfego.</li>
</ol>

<h2>Templates: como aprovação funciona na prática</h2>

<p>Templates são mensagens com conteúdo fixo e variáveis dinâmicas. Precisam ser submetidos para aprovação da Meta antes do uso. Dicas para aprovação rápida:</p>

<ul>
  <li>Templates de utilidade (confirmações, atualizações) têm aprovação mais rápida que os de marketing.</li>
  <li>Evite linguagem promocional em templates de utilidade — isso atrasa a aprovação.</li>
  <li>Inclua opt-out em templates de marketing: "Para não receber mais mensagens, responda SAIR."</li>
  <li>O tempo médio de aprovação é de 2 a 24 horas para templates bem formatados.</li>
</ul>

<h2>O que a maioria esquece: gestão de opt-in e LGPD</h2>

<p>A API do WhatsApp exige opt-in explícito do usuário antes de receber mensagens proativas da empresa. Isso significa que o cliente precisa ter concordado — de forma clara e documentada — em receber comunicações via WhatsApp.</p>

<p>Além do requisito da Meta, a LGPD estabelece que comunicações de marketing precisam de consentimento explícito com finalidade especificada. Uma implementação completa precisa incluir:</p>
<ul>
  <li>Mecanismo de opt-in (formulário, termos de uso, confirmação de compra)</li>
  <li>Registro auditável do consentimento com timestamp</li>
  <li>Mecanismo de opt-out com processamento em até 24h</li>
</ul>

<h2>Por onde começar</h2>

<p>O processo completo de setup — desde a criação da conta Meta Business até o primeiro webhook funcionando — leva tipicamente 3 a 7 dias para empresas que não têm experiência prévia.</p>

<p>A parte mais demorada não é técnica: é a verificação do negócio pela Meta (que pode levar 2 a 5 dias úteis) e a aprovação dos templates iniciais.</p>

<p>Na NuPtechs, já implementamos a API do WhatsApp Business em mais de 30 projetos — de pequenas clínicas a plataformas com milhares de mensagens diárias. O diagnóstico gratuito pode ajudar a definir o escopo correto para o seu caso, identificar os templates necessários e estimar o custo mensal da API antes de qualquer investimento em desenvolvimento.</p>
    `
  },
  "software-sob-medida-vs-saas": {
    slug: "software-sob-medida-vs-saas",
    tag: "Desenvolvimento Ágil",
    title: "Software sob medida vs. SaaS pronto: qual escolher para sua empresa?",
    description: "Um guia prático para gestores de TI e diretores avaliarem custo, tempo e risco antes de contratar desenvolvimento personalizado.",
    keywords: ["software sob medida vs SaaS", "quando contratar desenvolvimento personalizado", "custo software sob medida", "SaaS vs sistema próprio"],
    readTime: "5 min",
    publishedAt: "2026-02-05",
    content: `
<p class="lead">A decisão entre adotar um SaaS pronto ou desenvolver software sob medida é uma das mais estratégicas que um gestor de tecnologia ou diretor pode tomar. Feita certo, economiza tempo e dinheiro. Feita errado, cria dívida técnica, dependência de fornecedor e custos escondidos que aparecem anos depois.</p>

<p>Este guia é direto ao ponto: um framework prático para tomar essa decisão com base em critérios objetivos — não em preferências pessoais ou no que o fornecedor mais próximo quer vender.</p>

<h2>A decisão não é binária</h2>

<p>Antes de mais nada: a escolha raramente é "um ou outro". As melhores arquiteturas modernas combinam os dois. Use SaaS para o que existe bem resolvido no mercado; desenvolva sob medida onde está o diferencial competitivo real do seu negócio.</p>

<p>A pergunta mais útil não é "devo usar SaaS ou software próprio?" — é <strong>"qual parte do meu processo é commodity e qual é diferencial?"</strong></p>

<h2>Quando o SaaS é a resposta certa</h2>

<p>SaaS ganha quando:</p>

<ul>
  <li><strong>O processo é padrão de mercado.</strong> E-mail corporativo, CRM básico, videoconferência, contabilidade — existem dezenas de opções maduras, testadas e com suporte. Não faz sentido reinventar.</li>
  <li><strong>O volume não justifica o desenvolvimento.</strong> Se você precisa de uma funcionalidade usada por 3 pessoas uma vez por semana, o custo de desenvolvimento raramente compensa.</li>
  <li><strong>A velocidade de adoção é crítica.</strong> Um SaaS pode estar funcionando em dias. Um software sob medida bem feito leva semanas ou meses.</li>
  <li><strong>O fornecedor itera no produto continuamente.</strong> Para categorias como segurança, compliance ou machine learning, fornecedores especializados investem mais em P&D do que qualquer empresa poderia manter internamente.</li>
</ul>

<h2>Quando o software sob medida é a resposta certa</h2>

<p>Desenvolvimento próprio vence quando:</p>

<ul>
  <li><strong>Seu processo é o diferencial competitivo.</strong> Se a forma como você opera é o que te diferencia no mercado, usar o mesmo SaaS que seus concorrentes nivela o campo de jogo — e você perde vantagem.</li>
  <li><strong>Os custos de licença escalam com você de forma proibitiva.</strong> Muitos SaaS cobram por usuário ou por volume. Calcule o custo de licença em 3 e 5 anos — frequentemente o desenvolvimento sob medida se paga antes disso.</li>
  <li><strong>Você precisa de integrações profundas com sistemas legados.</strong> SaaS raramente oferece a flexibilidade de integração que um sistema próprio com API aberta oferece.</li>
  <li><strong>Controle de dados é não-negociável.</strong> Em setores como saúde, financeiro ou defesa, ter os dados em infraestrutura própria é muitas vezes um requisito legal — não uma preferência.</li>
  <li><strong>O processo não existe em nenhum SaaS do mercado.</strong> Parece óbvio, mas é frequentemente ignorado: se ninguém construiu ainda, você vai construir.</li>
</ul>

<h2>Os três custos que o SaaS esconde</h2>

<p>A comparação ingênua olha apenas para o preço de licença vs. custo de desenvolvimento. Mas existem três custos que o SaaS frequentemente esconde:</p>

<p><strong>1. Custo de adaptação do processo.</strong> Todo SaaS tem uma opinião sobre como seu processo deve funcionar. Quando essa opinião diverge da realidade da sua empresa, você adapta o processo (custo humano e cultural) ou paga por customizações (custo financeiro e técnico).</p>

<p><strong>2. Custo de lock-in.</strong> Depois de 2 anos com dados em um SaaS, migrar é caro e arriscado. Fornecedores sabem disso — e os preços refletem essa alavancagem ao renovar o contrato.</p>

<p><strong>3. Custo de funcionalidades que não chegam.</strong> Você paga pelo roadmap do fornecedor, não pelo seu. Funcionalidades críticas para o seu negócio podem nunca aparecer — ou aparecer na versão enterprise por 3x o preço atual.</p>

<h2>O framework de decisão em 5 minutos</h2>

<p>Responda estas cinco perguntas com sim ou não:</p>

<ol>
  <li>Este processo é padrão de mercado (não diferencial)? → Ponto para SaaS</li>
  <li>Existe um SaaS maduro que resolve 80%+ das necessidades hoje? → Ponto para SaaS</li>
  <li>O processo envolve dados sensíveis que não podem sair da sua infraestrutura? → Ponto para sob medida</li>
  <li>O custo de licença em 5 anos supera o custo de desenvolvimento? → Ponto para sob medida</li>
  <li>O processo é um diferencial competitivo que não deve ser copiado por concorrentes usando o mesmo SaaS? → Ponto para sob medida</li>
</ol>

<p>Dois ou mais pontos para sob medida: provavelmente vale a avaliação de desenvolvimento próprio. Três ou mais pontos para SaaS: use o mercado a seu favor.</p>

<h2>O que fazer quando ainda há dúvida</h2>

<p>Se depois desse exercício ainda houver dúvida, o diagnóstico técnico gratuito da NuPtechs pode ajudar. Em 30 minutos, nossa equipe analisa o processo específico, mapeia as opções de mercado e estima o custo-benefício real de cada caminho — sem conflito de interesse em vender um ou outro.</p>

<p>A decisão certa depende do contexto. E o contexto só aparece quando você para para analisá-lo de forma estruturada.</p>
    `
  }
};

type BlogParams = { params: { slug: string } };

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogParams): Promise<Metadata> {
  const post = posts[params.slug as keyof typeof posts];
  if (!post) return { title: "Artigo não encontrado" };
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages: { "pt-BR": `${siteUrl}/blog/${post.slug}` },
    },
    openGraph: {
      title: `${post.title} — NuPtechs Blog`,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: [siteUrl],
      tags: post.keywords,
      siteName: "NuPtechs",
      locale: "pt_BR",
      images: [
        {
          url: `${siteUrl}/og?title=${encodeURIComponent(post.title)}&sub=${encodeURIComponent(post.description)}&lang=pt`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${siteUrl}/og?title=${encodeURIComponent(post.title)}&sub=${encodeURIComponent(post.description)}&lang=pt`],
    },
  };
}

export default function BlogPost({ params }: BlogParams) {
  const post = posts[params.slug as keyof typeof posts];
  if (!post) notFound();

  const wordCount = post.content.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${siteUrl}/blog/${post.slug}#article`,
        headline: post.title,
        description: post.description,
        url: `${siteUrl}/blog/${post.slug}`,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        wordCount,
        keywords: post.keywords.join(", "),
        articleSection: post.tag,
        inLanguage: "pt-BR",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
        },
        author: {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: "NuPtechs",
          url: siteUrl,
        },
        publisher: {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: "NuPtechs",
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/logo.svg`,
            width: 200,
            height: 60,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteUrl}/blog/${post.slug}`,
        },
        isPartOf: {
          "@type": "Blog",
          "@id": `${siteUrl}/blog#blog`,
          name: "NuPtechs Blog",
          url: `${siteUrl}/blog`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="nav-bar" aria-label="Navegação principal">
        <div className="nav-inner">
          <a href="/" className="nav-logo" aria-label="NuPtechs — início">
            <span className="nav-logo-dot" aria-hidden="true" />
            <span className="nav-logo-text">NuPtechs</span>
          </a>
          <NavLinks />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="mailto:nuptechs@nuptechs.com" className="nav-cta hidden lg:inline-flex">
              Falar com especialista
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Header */}
        <section className="page-section pt-[calc(64px+5rem)]" aria-labelledby="post-heading">
          <div className="inner max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-xs text-[var(--subtle)]">
                <li><a href="/" className="hover:text-[var(--text)] transition-colors">Início</a></li>
                <li aria-hidden="true">›</li>
                <li><a href="/blog" className="hover:text-[var(--text)] transition-colors">Blog</a></li>
                <li aria-hidden="true">›</li>
                <li className="text-[var(--muted)] truncate max-w-[200px]">{post.title}</li>
              </ol>
            </nav>

            <span className="badge badge-accent mb-6 inline-block">{post.tag}</span>

            <h1 id="post-heading" className="display-title mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--subtle)]">
              <span>Por <strong className="text-[var(--muted)]">NuPtechs</strong></span>
              <span>·</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}
              </time>
              <span>·</span>
              <span>{post.readTime} de leitura</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="page-section pt-0" aria-label="Conteúdo do artigo">
          <div className="inner max-w-3xl">
            <div
              className="prose-nuptechs"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="page-section bg-[var(--surface)]" aria-label="Próximos passos">
          <div className="inner max-w-3xl">
            <div className="card">
              <p className="eyebrow mb-3">Diagnóstico gratuito</p>
              <h2 className="section-heading mb-3">Quer aplicar isso na sua empresa?</h2>
              <p className="lead mb-6">Nossa equipe analisa seu processo atual e devolve um plano técnico concreto em até 24h — sem compromisso.</p>
              <div className="flex flex-wrap gap-3">
                <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary">
                  Solicitar diagnóstico grátis
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="/blog" className="btn btn-secondary">Ver mais artigos</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" role="contentinfo">
        <div className="inner flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a href="/" className="nav-logo" aria-label="NuPtechs — voltar ao topo">
            <span className="nav-logo-dot" aria-hidden="true" />
            <span className="nav-logo-text">NuPtechs</span>
          </a>
          <p className="text-xs text-[var(--subtle)]">© {new Date().getFullYear()} NuPtechs. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
