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
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} — NuPtechs Blog`,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt
    }
  };
}

export default function BlogPost({ params }: BlogParams) {
  const post = posts[params.slug as keyof typeof posts];
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: { "@type": "Organization", name: "NuPtechs", url: siteUrl },
    publisher: { "@type": "Organization", name: "NuPtechs", url: siteUrl },
    datePublished: post.publishedAt,
    url: `${siteUrl}/blog/${post.slug}`
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
