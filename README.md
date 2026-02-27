# NuPtechs — Portal institucional

Portal institucional em Next.js para a NuPtechs com foco em performance, SEO/GEO e agendamento inteligente.

## O que já está pronto
- Landing page com proposta de valor, serviços e roadmap de módulos (CRM, leads, dashboards, área do cliente).
- Seção de agendamento com integração configurável para Google Calendar, Microsoft Bookings, Calendly, Cal.com e HubSpot Meetings.
- Schema Markup (Organization, Service, SoftwareApplication, LocalBusiness, FAQPage).
- API route inicial para receber solicitações de agendamento.

## Próximos passos de integração
Configure o endpoint `/api/schedule` para encaminhar as solicitações às ferramentas de agenda (ex.: Google Calendar API, Microsoft Graph, Calendly API ou Cal.com).

### Links de agenda (modo rápido)
Para ativar o agendamento imediato sem OAuth, defina os links oficiais de cada ferramenta.

Use o arquivo `.env.example` como base para criar o `.env.local`.

- `SCHEDULING_LINK_GOOGLE` (link do Google Calendar Appointment Schedule)
- `SCHEDULING_LINK_MICROSOFT` (link do Microsoft Bookings)
- `SCHEDULING_LINK_CALENDLY`
- `SCHEDULING_LINK_CALCOM`
- `SCHEDULING_LINK_HUBSPOT`

Se o link não estiver configurado para a ferramenta escolhida, a API retorna `501` com a mensagem de configuração necessária.

### Detecção automática de agenda
O formulário tenta sugerir Google ou Microsoft com base no domínio do e-mail (ex.: `gmail.com` → Google Calendar). A escolha final ainda fica com o usuário.

Defina `NEXT_PUBLIC_SITE_URL` no ambiente para refletir o domínio oficial (usado em metadados e Schema).

## Rodar localmente
Instale dependências e execute o servidor de desenvolvimento.

```zsh
npm install
npm run dev
```

## Build de produção

```zsh
npm run build
npm run start
```

## Estrutura principal
- `app/page.tsx` — Página principal.
- `app/components/ScheduleForm.tsx` — Formulário de agendamento.
- `app/api/schedule/route.ts` — Endpoint inicial do agendamento.
- `app/globals.css` — Estilos globais.

## Contato
- Telefone/WhatsApp: (61) 99369-1692
- E-mail: nuptechs@nuptechs.com
