# Plano Estratégico SEO & Marketing Digital — NuPtechs
> Diagnóstico gerado em 27/02/2026

---

## 🟢 O que já está implementado corretamente

### SEO Técnico
| Item | Status | Detalhe |
|------|--------|---------|
| `<title>` com template | ✅ | `"%s | NuPtechs"` — correto |
| `meta description` por página | ✅ | Todas as páginas têm descrição única |
| `keywords` por página | ✅ | Cada serviço/produto tem seu array de keywords |
| `canonical` por rota | ✅ | `/servicos/automacao-inteligente` etc. |
| `robots: index, follow` | ✅ | Configurado no layout.tsx |
| `sitemap.xml` | ✅ | Rota gerada |
| `robots.txt` | ✅ | Rota gerada |
| `JSON-LD` | ✅ | Estruturado nas páginas |
| `hreflang pt-BR / en-US` | ✅ | No layout.tsx (mas sem `/en` ainda) |
| Open Graph completo | ✅ | `og:title`, `og:description`, `og:image` |
| Twitter Card | ✅ | `summary_large_image` |
| GA4 | ✅ | `@next/third-parties/google` integrado |
| Google Search Console | ⚠️ | Placeholder `"google-site-verification-placeholder"` — **precisa do código real** |
| SSG (páginas estáticas) | ✅ | `generateStaticParams` em todas as slugs |
| `lang="pt-BR"` no HTML | ✅ | Correto |

### Conteúdo
| Item | Status |
|------|--------|
| 6 páginas de serviços (pilares) | ✅ |
| 6 páginas de produtos | ✅ |
| 3 posts de blog com conteúdo real | ✅ |
| Palavras-chave de cauda longa por página | ✅ |
| H1 único por página | ✅ |
| Breadcrumbs nas inner pages | ✅ |

---

## 🔴 Gaps Críticos (impactam ranking agora)

### 1. `/en` não existe — hreflang aponta para 404
```tsx
// layout.tsx linha ~108
"en-US": "/en"  // ← essa rota não existe no projeto
```
**Risco**: Google detecta hreflang apontando para página inexistente → penaliza ambas as versões.
**Solução**: Remover o hreflang `en-US` do layout.tsx OU criar a rota `/en` com conteúdo em inglês.

---

### 2. `og-image.png` não existe — só há `logo.svg`
```tsx
url: `${siteUrl}/og-image.png`  // ← arquivo ausente em /public
```
**Impacto**: Compartilhamentos no LinkedIn, WhatsApp e Twitter aparecem sem imagem. CTR cai ~3x.
**Solução**: Gerar imagem 1200×630px e salvar em `/public/og-image.png`.

---

### 3. Verificação do Google Search Console é placeholder
```tsx
verification: { google: "google-site-verification-placeholder" }
// em: app/layout.tsx
```
**Impacto**: Sem GSC real, não dá para saber o que o Google indexa, erros de rastreamento ou quais keywords geram impressões.
**Solução**: Cadastrar o site em https://search.google.com/search-console e substituir o placeholder pelo código real.

---

### 4. Produtos ainda têm emoji como `icon` no objeto de dados
```tsx
// app/produtos/[slug]/page.tsx
icon: "🗂️",  // flowops
icon: "📈",  // datapulse
```
Os ícones visuais já usam SVG, mas o campo `icon` do objeto produto é emoji — se usado em JSON-LD contamina os dados estruturados.
**Solução**: Substituir por strings de ID (`"clipboard"`, `"chart"`) igual ao padrão dos serviços.

---

### 5. Blog tem apenas 3 posts — frequência insuficiente
O plano recomenda publicação **semanal**. 3 posts não constroem autoridade de domínio.
**Solução**: Publicar pelo menos 2 novos posts por mês para chegar a 10 até junho.

---

### 6. Sem schema markup `Article` nos posts do blog
`blog/[slug]/page.tsx` não tem JSON-LD de `Article`.
Posts sem schema não aparecem como **rich results** (data, autor, leitura) no Google.
**Solução**: Adicionar `generateMetadata` com JSON-LD `Article` em cada post.

---

## 🟡 Gaps Importantes (impactam médio prazo)

### 7. Sem página `/sobre` (About)
O plano menciona "Sobre a Nuptechs" como pilar da arquitetura. Ela serve para:
- E-E-A-T (Experience, Expertise, Authoritativeness, Trust) — fator de ranking crescente
- Backlinks de parceiros (linkam para páginas de empresa)
- Clientes internacionais verificam credibilidade antes de contratar
**Solução**: Criar `app/sobre/page.tsx` com time, história, missão e localização.

---

### 8. Sem captura de leads / inbound
O formulário de contato existe (`/#contato`), mas falta:
- Campo de interesse/segmento para qualificar o lead
- Página de download de material rico (e-book)
- Integração visível com HubSpot / Mailchimp / ActiveCampaign
**Solução**: Adicionar campo "Como podemos ajudar?" no formulário + criar landing page de e-book.

---

### 9. `NEXT_PUBLIC_SITE_URL` pode apontar para `localhost:3000` em produção
```tsx
// app/layout.tsx e todas as inner pages
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
```
Se a variável não for configurada no deploy, **todas** as URLs canônicas e og-image apontarão para localhost.
**Solução**: Configurar `NEXT_PUBLIC_SITE_URL=https://nuptechs.com` no painel do Vercel (ou hosting escolhido).

---

### 10. Sem link building estruturado
Nenhuma página tem seção de "Como mencionar a NuPtechs" ou badges de parceiro.
**Solução**: Adicionar seção de parceiros/clientes com logos na homepage + badge embed para clientes usarem em seus sites.

---

### 11. Páginas de serviços/produtos sem JSON-LD `Service` / `SoftwareApplication`
As páginas têm metadados, mas sem dados estruturados de `Service` ou `SoftwareApplication`.
Isso impede rich results e Knowledge Panel no Google.
**Solução**: Adicionar JSON-LD específico em `/servicos/[slug]` e `/produtos/[slug]`.

---

## 📋 Plano de Ação Priorizado

### ✅ Semana 1 — Correções críticas (zero custo, alto impacto)
- [ ] Remover `hreflang en-US` do `layout.tsx` (até criar `/en`)
- [ ] Gerar `og-image.png` (1200×630px) e salvar em `/public`
- [ ] Substituir `google-site-verification-placeholder` com código real do GSC
- [ ] Configurar `NEXT_PUBLIC_SITE_URL=https://nuptechs.com` no Vercel

### ✅ Semana 2 — Schema markup
- [ ] Adicionar JSON-LD `Article` nas páginas do blog (`blog/[slug]/page.tsx`)
- [ ] Adicionar JSON-LD `Service` nas páginas `/servicos/[slug]`
- [ ] Adicionar JSON-LD `SoftwareApplication` nas páginas `/produtos/[slug]`

### ✅ Semana 3–4 — Conteúdo e estrutura
- [ ] Criar página `/sobre` com E-E-A-T (time, história, missão)
- [ ] Publicar 2 novos posts de blog (chegar a 5 total)
- [ ] Melhorar formulário de contato com campo de segmentação
- [ ] Substituir emoji `icon` nos objetos de produto por IDs de string

### ✅ Mês 2+ — Crescimento
- [ ] Criar rota `/en` com conteúdo traduzido por falante nativo (não automático)
- [ ] Estabelecer calendário editorial: 4 posts/mês
- [ ] Adicionar seção de cases/depoimentos com schema `Review`
- [ ] Criar landing page de e-book para captura de leads
- [ ] Configurar integração de e-mail marketing (HubSpot ou similar)
- [ ] Criar perfis em diretórios de tecnologia brasileiros (Clutch, G2, etc.)

---

## 📎 Referências técnicas

- Google Search Console: https://search.google.com/search-console
- Schema markup validator: https://validator.schema.org
- hreflang checker: https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/
- Rich results test: https://search.google.com/test/rich-results
- PageSpeed Insights: https://pagespeed.web.dev

---

> **Resumo executivo**: A base técnica está bem construída — SSG, metadados, sitemap, breadcrumbs.
> Os 3 gaps mais urgentes são: `hreflang` apontando para rota inexistente, `og-image.png` ausente e GSC sem verificar.
> Esses 3 itens podem ser corrigidos em menos de 1 hora e têm impacto imediato no indexamento.
