# Módulo de Contratos SaaS

Sistema de fechamento de contratos integrado ao admin do nuptechs.com.

## Estrutura

```
app/
  admin/contratos/
    layout.tsx              — importa contratos.css
    contratos.css           — estilos do módulo
    page.tsx                — listagem com filtros e estatísticas
    novo/page.tsx           — formulário de fechamento
    [id]/page.tsx           — detalhe + ações (status, link público, exclusão)
    README.md               — este arquivo
  api/
    admin/contracts/
      route.ts              — GET (lista) | POST (criar)
      [id]/route.ts         — GET | PATCH | DELETE
      [id]/preview/route.ts — HTML do contrato (preview admin, mesma autenticação)
      cnpj/[cnpj]/route.ts  — proxy BrasilAPI (autopreenchimento)
      systems/route.ts      — catálogo de sistemas
    contratos/[token]/
      route.ts              — endpoint público (HTML standalone)
  contratos/[token]/
    page.tsx                — server-redirect para o endpoint acima
lib/
  contracts/
    cnpj.ts                 — validação + lookup CNPJ
    contract-template.ts    — renderização HTML do contrato (Times New Roman, A4)
  core/
    ports/contract.port.ts          — interface
    adapters/drizzle-contract.adapter.ts — implementação Postgres
db/schema.ts                — tabelas contracts, contract_systems, contract_timeline
drizzle/0002_contracts.sql  — migration + seed do catálogo
```

## Setup

1. **Aplicar a migration** (escolha uma):
   ```bash
   npm run db:push          # sincroniza schema.ts diretamente (mais simples)
   # ou
   psql $DATABASE_URL -f drizzle/0002_contracts.sql   # roda manualmente
   ```

2. **Verificar permissões**: o módulo exige a permissão `nuptechs:content` (mesma dos leads).

3. **Acessar**: `https://www.nuptechs.com/admin/contratos`

## Fluxo do comercial

1. Comercial entra em **Admin → Contratos** e clica em **"Fechar contrato"**.
2. Preenche o CNPJ do cliente e clica **"Buscar"** — autopreenchimento via BrasilAPI (Receita Federal).
3. Completa o que faltar (telefone, e-mail, dados do representante).
4. Marca os sistemas contratados (catálogo configurável; default: Barbearia/Salão, Sales, Igrejas, Padaria).
5. Define valor da mensalidade, dia de vencimento, fidelidade e multa.
6. Clica em **"Gerar contrato"** → vai para a tela de detalhe.
7. Copia o **link público** e envia ao cliente por WhatsApp / e-mail.
8. Cliente abre o link, lê o contrato e usa **Imprimir / Salvar PDF** do navegador.
9. Ao receber o contrato assinado, comercial clica **"Marcar como assinado"** — sistema seta `signedAt`, `startDate` e `loyaltyEndDate` automaticamente.

## Visualização pelo cliente

Rota pública: `/contratos/[token]` → redireciona para `/api/contratos/[token]`
- Sem autenticação (token é o segredo).
- Cada acesso registra evento na timeline.
- `draft` → `sent` automaticamente quando o cliente abre o link.
- `cancelled` retorna 410 (Gone).
- Headers: `noindex, nofollow` (não indexa em buscadores).

## Geração de PDF

O HTML é estilizado com Times New Roman 12pt, margens forenses (3cm sup./esq., 2cm inf./dir.), espaçamento 1,15 — idêntico ao modelo do escritório de advocacia.

Botão **"Imprimir / Salvar PDF"** usa `window.print()`. O `@page` CSS já garante A4 sem ajustes manuais. Funciona em qualquer navegador (Chrome, Safari, Edge, Firefox) tanto desktop quanto mobile.

## Segurança e auditoria

- Auth em `/admin/contratos` e `/api/admin/contracts/*` via cookie JWT (NuPIdentity).
- Endpoint público em `/api/contratos/:token` — token de 32 chars hex (128 bits de entropia).
- Toda alteração de status registrada em `contract_timeline`.
- Visualizações públicas registradas com IP e User-Agent.
- LGPD respeitada: dados pessoais armazenados apenas para fins contratuais, com base legal de execução de contrato.

## Próximos passos sugeridos

- [ ] Integração com plataforma de assinatura eletrônica (D4Sign / ZapSign / Clicksign).
- [ ] Envio automático do link por e-mail (Resend já está no projeto).
- [ ] Painel de CRUD para gerenciar o catálogo `contract_systems` (settings).
- [ ] Geração de boletos / cobrança recorrente integrada.
- [ ] Notificações de fim de fidelidade / renovação.
- [ ] Versionamento das cláusulas (`clausesSnapshot` já está no schema).
