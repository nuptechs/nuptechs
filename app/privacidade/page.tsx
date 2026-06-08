import type { Metadata } from "next";
import NavLinks from "../components/NavLinks";
import ThemeToggle from "../components/ThemeToggle";
import SiteFooter from "../components/SiteFooter";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

export const metadata: Metadata = {
  title: "Política de Privacidade — NuPtechs",
  description:
    "Como a NuPtechs coleta, usa, protege e compartilha dados pessoais, em conformidade com a LGPD (Lei 13.709/2018). Direitos do titular e canal do encarregado.",
  alternates: { canonical: "/privacidade" },
  robots: { index: true, follow: true },
};

export default function PrivacidadePage() {
  return (
    <>
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

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <span className="eyebrow mb-4 block">Jurídico</span>
        <h1 className="display-title mb-4">Política de Privacidade</h1>
        <p className="text-[var(--muted)] mb-12">
          Última atualização: 8 de junho de 2026. Esta política descreve como a
          NuPtechs trata dados pessoais, em conformidade com a Lei Geral de
          Proteção de Dados (LGPD — Lei nº 13.709/2018).
        </p>

        <div className="prose-policy flex flex-col gap-8 leading-relaxed text-[var(--text)]">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Quem é o controlador</h2>
            <p className="text-[var(--muted)]">
              A NuPtechs, sediada em Brasília — DF, Brasil, é a controladora dos
              dados pessoais tratados por meio deste site. Para qualquer assunto
              relacionado à privacidade, entre em contato pelo e-mail{" "}
              <a href="mailto:nuptechs@nuptechs.com" className="underline">nuptechs@nuptechs.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Dados que coletamos</h2>
            <ul className="list-disc pl-5 text-[var(--muted)] flex flex-col gap-1">
              <li>
                <strong>Dados fornecidos por você</strong> no formulário de contato ou
                por e-mail: nome, e-mail, telefone, empresa/órgão e o conteúdo da
                mensagem.
              </li>
              <li>
                <strong>Dados de navegação</strong> coletados automaticamente: endereço
                IP, tipo de dispositivo e navegador, páginas visitadas e dados
                estatísticos de uso, por meio de ferramentas de analytics.
              </li>
              <li>
                <strong>Cookies</strong> necessários ao funcionamento do site e cookies
                de medição de audiência.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Finalidades e bases legais</h2>
            <p className="text-[var(--muted)]">
              Tratamos seus dados para: (a) responder a solicitações de contato e
              conduzir o relacionamento comercial — base legal: execução de
              procedimentos preliminares a contrato e legítimo interesse (art. 7º,
              V e IX, da LGPD); (b) melhorar o site e nossos serviços — base legal:
              legítimo interesse; (c) cumprir obrigações legais e regulatórias —
              base legal: cumprimento de obrigação legal (art. 7º, II). Quando
              aplicável, solicitamos seu consentimento (art. 7º, I).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Compartilhamento</h2>
            <p className="text-[var(--muted)]">
              <strong>Não vendemos seus dados.</strong> Podemos compartilhá-los com
              operadores que nos prestam serviços de infraestrutura (hospedagem),
              comunicação e análise de audiência, estritamente para as finalidades
              acima e sob obrigações de confidencialidade e segurança. Também
              poderemos compartilhar dados para cumprir ordem judicial ou exigência
              de autoridade competente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Transferência internacional</h2>
            <p className="text-[var(--muted)]">
              Alguns provedores de infraestrutura e analytics podem processar dados
              fora do Brasil. Nesses casos, adotamos salvaguardas adequadas para
              garantir nível de proteção compatível com a LGPD.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Retenção</h2>
            <p className="text-[var(--muted)]">
              Mantemos os dados apenas pelo tempo necessário às finalidades
              informadas ou para cumprimento de obrigações legais. Dados de
              contato comercial são retidos enquanto durar o relacionamento e,
              após seu término, pelos prazos legais aplicáveis. Encerrado o prazo,
              os dados são eliminados ou anonimizados.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Seus direitos como titular</h2>
            <p className="text-[var(--muted)] mb-2">
              Nos termos do art. 18 da LGPD, você pode solicitar a qualquer momento:
            </p>
            <ul className="list-disc pl-5 text-[var(--muted)] flex flex-col gap-1">
              <li>confirmação da existência de tratamento e acesso aos seus dados;</li>
              <li>correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
              <li>portabilidade dos dados a outro fornecedor;</li>
              <li>eliminação dos dados tratados com base no consentimento;</li>
              <li>informação sobre o compartilhamento de dados;</li>
              <li>revogação do consentimento.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Segurança da informação</h2>
            <p className="text-[var(--muted)]">
              Adotamos medidas técnicas e organizacionais para proteger os dados
              contra acessos não autorizados, perda ou alteração — incluindo
              controle de acesso, criptografia em trânsito e trilhas de auditoria.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Encarregado e como exercer seus direitos</h2>
            <p className="text-[var(--muted)]">
              Para exercer qualquer direito ou tirar dúvidas sobre o tratamento de
              dados, fale com nosso Encarregado pelo Tratamento de Dados (DPO) pelo
              e-mail{" "}
              <a href="mailto:nuptechs@nuptechs.com" className="underline">nuptechs@nuptechs.com</a>.
              Responderemos no menor prazo possível, observados os limites legais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">10. Alterações desta política</h2>
            <p className="text-[var(--muted)]">
              Esta política pode ser atualizada periodicamente. A data da última
              atualização é indicada no topo. Recomendamos a revisão regular desta
              página.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
