import type { Metadata } from "next";
import { posts } from "./[slug]/page";
import NavLinks from "../components/NavLinks";
import ThemeToggle from "../components/ThemeToggle";

export const metadata: Metadata = {
  title: "Blog — Desenvolvimento de Software e IA",
  description: "Artigos técnicos sobre automação inteligente, IA aplicada ao negócio, desenvolvimento ágil e gestão de software — escritos por quem constrói sistemas reais.",
  keywords: ["blog desenvolvimento software", "artigos IA empresarial", "blog automação empresarial", "NuPtechs blog"],
  alternates: { canonical: "/blog" }
};

export default function BlogIndex() {
  const postList = Object.values(posts).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

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

      <main>
        <section className="page-section pt-[calc(64px+5rem)]" aria-labelledby="blog-heading">
          <div className="inner">
            <div className="mb-14 max-w-xl">
              <span className="eyebrow mb-4 block">Blog &amp; Conteúdo</span>
              <h1 id="blog-heading" className="display-title mb-4">
                Conteúdo técnico para decisões melhores.
              </h1>
              <p className="lead">
                Artigos sobre desenvolvimento ágil, IA aplicada e gestão de software — escritos por quem constrói sistemas reais.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {postList.map((post) => (
                <article key={post.slug} className="card group flex flex-col gap-4">
                  <span className="badge badge-accent self-start">{post.tag}</span>
                  <h2 className="text-base font-bold leading-snug tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    <a href={`/blog/${post.slug}`} className="after:absolute after:inset-0 relative">
                      {post.title}
                    </a>
                  </h2>
                  <p className="flex-1 text-sm leading-relaxed text-[var(--muted)]">{post.description}</p>
                  <div className="flex items-center justify-between border-t border-[var(--border)] pt-3">
                    <time dateTime={post.publishedAt} className="text-xs text-[var(--subtle)]">
                      {new Date(post.publishedAt).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" })}
                    </time>
                    <span className="text-xs text-[var(--subtle)]">{post.readTime}</span>
                  </div>
                </article>
              ))}
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
