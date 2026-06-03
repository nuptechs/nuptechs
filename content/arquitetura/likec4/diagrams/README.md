# Diagramas exportados (PNG) — para deck / apresentação

> Renderizações das views do modelo [`../model.c4`](../model.c4), prontas para colar em slides. Gerados com `npm run export:png` (LikeC4 + Chromium headless).

| Arquivo | View | Use no deck para… |
|---|---|---|
| `index.png` | Paisagem completa | Slide "visão geral do parque" — 4 pilares + 24 repos + externos |
| `pilares.png` | Os 4 pilares | Slide "a espinha dorsal da plataforma" |
| `gaps.png` | Relações-alvo 🎯 | Slide "o que falta consolidar" (Ondas 1 e 2) |
| `flagship.png` | easynup | Slide "o produto-bandeira e suas integrações" |
| `identidadeView.png` | P1 · NuPIdentify | Slide "identidade centralizada — quem adota e quem falta" |
| `iaView.png` | P3 · nupai-gateway | Slide "IA que deveria fluir por um gateway único" |
| `qualidadeView.png` | P4 · Sentinel | Slide "plataforma de qualidade própria" |

**Regenerar** (após editar o `model.c4`):
```bash
cd docs/enterprise-architecture/likec4
npm install
npm run export:png   # sobrescreve estes PNGs
```

> Linhas tracejadas nos diagramas = relações `#target` (adoção-alvo / gap de consolidação). Linhas sólidas = adoção real (`#adopts`).
