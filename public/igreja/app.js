/* ============================================================
   STATE
============================================================ */
const state = {
  route: { name: 'home', params: {} },
  history: [],
  filters: { partnerCategory: 'all', partnerSearch: '' },
  contribution: { amount: 50, method: 'pix' },
  lightbox: { open: false, list: [], index: 0 },
  prayers: [
    { id: 1, name: 'Maria S.', initials: 'MS', text: 'Peço oração pela saúde do meu pai que está internado. Que Deus o restaure.', time: 'Há 2 horas', amen: 12 },
    { id: 2, name: 'João P.', initials: 'JP', text: 'Gratidão pela nova oportunidade de emprego que recebi esta semana!', time: 'Há 5 horas', amen: 28 },
    { id: 3, name: 'Anônimo', initials: '?', text: 'Família em conflito. Peço oração por reconciliação e perdão.', time: 'Há 1 dia', amen: 47 },
    { id: 4, name: 'Carlos M.', initials: 'CM', text: 'Oração pela minha esposa que faz cirurgia na próxima semana. Confio no Senhor.', time: 'Há 1 dia', amen: 31 },
  ],
  notifications: [
    { id: 1, title: 'Culto da Família amanhã', desc: 'Não esqueça: 25/05 às 19h30 — venha em família!', time: 'Há 30 min', icon: 'calendar', unread: true },
    { id: 2, title: 'Nova palavra pastoral', desc: 'Pr. João compartilhou um devocional sobre fé.', time: 'Há 2 horas', icon: 'book', unread: true },
    { id: 3, title: 'Pedido de oração respondido', desc: '12 irmãos oraram pelo seu pedido.', time: 'Há 1 dia', icon: 'heart', unread: true },
    { id: 4, title: 'Recibo de contribuição', desc: 'Contribuição de R$ 50 confirmada. Obrigado!', time: 'Há 3 dias', icon: 'check', unread: false },
  ],
  events: [
    { id: 1, title: 'Culto da Família', date: '25 de Maio', time: '19h30', day: '25', month: 'MAI', location: 'Templo Central — R. das Oliveiras, 100', desc: 'Participe deste momento especial em família. Teremos louvor, palavra e oração pelas famílias da nossa comunidade. Traga seus filhos, pais e amigos. A presença de cada um faz diferença.', tag: 'CULTO', icon: 'cal', going: 142 },
    { id: 2, title: 'Vigília de Oração', date: '31 de Maio', time: '22h00', day: '31', month: 'MAI', location: 'Templo Central', desc: 'Uma noite em busca da presença de Deus. Tempo de intercessão, louvor profundo e palavra. Preparemos nossos corações.', tag: 'ORAÇÃO', icon: 'pray', going: 89 },
    { id: 3, title: 'Santa Ceia', date: '02 de Junho', time: '19h00', day: '02', month: 'JUN', location: 'Templo Central', desc: 'Celebração da Ceia do Senhor. Momento solene de comunhão e lembrança do sacrifício de Cristo.', tag: 'CULTO', icon: 'cup', going: 215 },
    { id: 4, title: 'Retiro de Jovens', date: '14-16 de Junho', time: 'Sex 19h → Dom 17h', day: '14', month: 'JUN', location: 'Sítio Maranata — Atibaia/SP', desc: 'Inscrições abertas até 10 de Junho. 3 dias de imersão, comunhão, atividades ao ar livre e palavras transformadoras para os jovens da igreja.', tag: 'JOVENS', icon: 'youth', going: 67 },
    { id: 5, title: 'Encontro de Mulheres', date: '22 de Junho', time: '15h00', day: '22', month: 'JUN', location: 'Salão Social', desc: 'Tarde dedicada às mulheres da igreja. Café da tarde, palestras e momento de comunhão.', tag: 'MULHERES', icon: 'flower', going: 54 },
    { id: 6, title: 'Culto de Cura e Libertação', date: '28 de Junho', time: '19h30', day: '28', month: 'JUN', location: 'Templo Central', desc: 'Noite de fé e milagres. Venha buscar a cura que só vem do Senhor.', tag: 'CULTO', icon: 'cross', going: 178 },
  ],
  verses: [
    { text: 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-O em todos os teus caminhos, e ele endireitará as tuas veredas.', ref: 'PROVÉRBIOS 3:5-6' },
    { text: 'Tudo posso naquele que me fortalece.', ref: 'FILIPENSES 4:13' },
    { text: 'O Senhor é o meu pastor; nada me faltará. Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.', ref: 'SALMO 23:1-2' },
    { text: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.', ref: 'MATEUS 11:28' },
    { text: 'Bem-aventurados os que choram, porque eles serão consolados.', ref: 'MATEUS 5:4' },
    { text: 'O Senhor pelejará por vós, e vós vos calareis.', ref: 'ÊXODO 14:14' },
  ],
  campaigns: [
    { id: 1, title: 'Campanha de Oração', period: 'De 10 a 20 de Maio', desc: 'Vamos buscar a face de Deus em oração unidos como corpo de Cristo. Cada dia um tema, cada noite uma chamada.', percent: 65, label: '2.340 orantes', goal: '3.500', img: 'oracao' },
    { id: 2, title: 'Campanha do Alimento', period: 'De 5 a 15 de Junho', desc: 'Doe alimentos não-perecíveis e ajude famílias em situação de vulnerabilidade. Toda contribuição abençoa.', percent: 42, label: 'R$ 4.200 arrecadados', goal: 'R$ 10.000', img: 'food' },
    { id: 3, title: 'Campanha de Missões', period: 'Durante todo Julho', desc: 'Levar a palavra de Cristo mais longe — apoiando missionários no campo e projetos em regiões necessitadas.', percent: 18, label: 'R$ 9.000 arrecadados', goal: 'R$ 50.000', img: 'mission' },
    { id: 4, title: 'Reforma do Templo', period: 'Meta: até Dezembro', desc: 'Renovação do telhado e cadeiras do templo principal. Sua doação é semente para gerações.', percent: 31, label: 'R$ 15.500 arrecadados', goal: 'R$ 50.000', img: 'church' },
  ],
  partners: [
    { id: 1, name: 'AC Contabilidade', initials: 'AC', cat: 'contabil', catLabel: 'Contábil', email: 'contato@accontabil.com.br', phone: '(11) 98765-1111', desc: 'Contabilidade completa para PJ e MEI. Desconto de 15% para membros.', services: ['Abertura de empresa', 'Imposto de renda PF/PJ', 'Folha de pagamento'] },
    { id: 2, name: 'Clínica Saúde Vida', initials: 'CV', cat: 'saude', catLabel: 'Saúde', email: 'contato@saudevida.com.br', phone: '(11) 98765-2222', desc: 'Clínica geral, pediatria e cardiologia. 20% de desconto em consultas para membros.', services: ['Clínica geral', 'Pediatria', 'Cardiologia', 'Exames'] },
    { id: 3, name: 'Advocacia Ferreira', initials: 'AF', cat: 'juridico', catLabel: 'Jurídico', email: 'contato@adferreira.com.br', phone: '(11) 98765-3333', desc: 'Direito de família, civil e trabalhista. Primeira consulta gratuita para membros.', services: ['Direito de família', 'Civil', 'Trabalhista', 'Previdenciário'] },
    { id: 4, name: 'Studio Beleza', initials: 'SB', cat: 'beleza', catLabel: 'Beleza', email: 'contato@studiobeleza.com', phone: '(11) 99989-4444', desc: 'Salão completo. 10% de desconto para membros e 50% no aniversário.', services: ['Cabelo', 'Manicure', 'Estética', 'Maquiagem'] },
    { id: 5, name: 'Escola Esperança', initials: 'EE', cat: 'educacao', catLabel: 'Educação', email: 'contato@esperanca.edu.br', phone: '(11) 99989-5555', desc: 'Educação infantil e fundamental com base cristã. Bolsa de 30% para filhos de membros.', services: ['Educação infantil', 'Fundamental I', 'Fundamental II'] },
    { id: 6, name: 'Padaria Pão Vivo', initials: 'PV', cat: 'alimentacao', catLabel: 'Alimentação', email: 'contato@paovivo.com.br', phone: '(11) 98765-6666', desc: 'Padaria artesanal. Café cortesia e 5% de desconto em compras acima de R$ 50.', services: ['Pães artesanais', 'Bolos sob encomenda', 'Café da manhã'] },
    { id: 7, name: 'Mecânica Confiança', initials: 'MC', cat: 'automotivo', catLabel: 'Automotivo', email: 'contato@mcconfianca.com.br', phone: '(11) 98765-7777', desc: 'Mecânica geral com 30 anos de experiência. Diagnóstico gratuito para membros.', services: ['Mecânica geral', 'Funilaria', 'Pintura', 'Elétrica'] },
  ],
  partnerCategories: [
    { id: 'all', label: 'Todos' },
    { id: 'saude', label: 'Saúde' },
    { id: 'juridico', label: 'Jurídico' },
    { id: 'beleza', label: 'Beleza' },
    { id: 'educacao', label: 'Educação' },
    { id: 'contabil', label: 'Contábil' },
    { id: 'alimentacao', label: 'Alimentação' },
    { id: 'automotivo', label: 'Automotivo' },
  ],
  galleryAlbums: {
    fotos: [
      { id: 1, title: 'Culto Domingo', subtitle: '12 de Maio', color1: '#1B3358', color2: '#0A1628', shape: 'people' },
      { id: 2, title: 'Vigília', subtitle: '03 de Maio', color1: '#142844', color2: '#1B3358', shape: 'star' },
      { id: 3, title: 'Casamento', subtitle: '05 de Maio', color1: '#1B3358', color2: '#142844', shape: 'rings' },
      { id: 4, title: 'Batismo', subtitle: '12 de Maio', color1: '#0F1E36', color2: '#1B3358', shape: 'water' },
      { id: 5, title: 'Retiro', subtitle: '20 de Abril', color1: '#142844', color2: '#0A1628', shape: 'tent' },
      { id: 6, title: 'Crianças', subtitle: '15 de Maio', color1: '#1B3358', color2: '#0F1E36', shape: 'kids' },
      { id: 7, title: 'Café da Família', subtitle: '08 de Maio', color1: '#0A1628', color2: '#1B3358', shape: 'coffee' },
      { id: 8, title: 'Pregação', subtitle: '01 de Maio', color1: '#142844', color2: '#0F1E36', shape: 'mic' },
    ],
    videos: [
      { id: 9, title: 'Pregação 12/05', subtitle: 'Pr. João — 45min', color1: '#0A1628', color2: '#142844', video: true },
      { id: 10, title: 'Louvor ao Vivo', subtitle: 'Min. Louvor — 32min', color1: '#1B3358', color2: '#0F1E36', video: true },
      { id: 11, title: 'Testemunho', subtitle: 'Irmã Lucia — 12min', color1: '#142844', color2: '#0A1628', video: true },
      { id: 12, title: 'Retiro 2025', subtitle: 'Resumo — 8min', color1: '#0F1E36', color2: '#1B3358', video: true },
    ],
    imagens: [
      { id: 13, title: 'FÉ', color1: '#C9A961', color2: '#0A1628', text: 'FÉ' },
      { id: 14, title: 'AMOR', color1: '#1B3358', color2: '#C9A961', text: 'AMOR' },
      { id: 15, title: 'PAZ', color1: '#142844', color2: '#E5C77A', text: 'PAZ' },
      { id: 16, title: 'ESPERANÇA', color1: '#0A1628', color2: '#C9A961', text: 'ESPERANÇA' },
    ],
  },
  leaders: [
    { initials: 'ML', name: 'Mar. Luísa', role: 'Louvor' },
    { initials: 'PA', name: 'Pra. Ana', role: 'Intercessão' },
    { initials: 'CR', name: 'Dc. Carlos', role: 'Diaconato' },
    { initials: 'MR', name: 'Pr. Marco', role: 'Crianças' },
    { initials: 'RS', name: 'Lid. Rita', role: 'Jovens' },
    { initials: 'EB', name: 'Lid. Elias', role: 'Música' },
  ],
};

/* ============================================================
   ICONS
============================================================ */
const I = {
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>',
  arrowR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  pray: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>',
  cup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
  youth: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11H5a2 2 0 0 0-2 2v7h18v-7a2 2 0 0 0-2-2h-4M9 11V7a3 3 0 1 1 6 0v4"/></svg>',
  flower: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3"/></svg>',
  cross: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 4h2v6h6v2h-6v8h-2v-8H5v-2h6V4z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  campaign: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
  people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  gallery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
  contact: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
};

/* ============================================================
   SVG GENERATORS
============================================================ */
const SVG = {
  homeHero: () => `<svg viewBox="0 0 1600 800" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="hsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0A1628"/><stop offset="50%" stop-color="#142844"/><stop offset="100%" stop-color="#1B3358"/></linearGradient><radialGradient id="hmoon"><stop offset="0%" stop-color="#F5EBD3" stop-opacity="0.95"/><stop offset="60%" stop-color="#C9A961" stop-opacity="0.4"/><stop offset="100%" stop-color="#C9A961" stop-opacity="0"/></radialGradient><linearGradient id="hhill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0F1E36"/><stop offset="100%" stop-color="#050B17"/></linearGradient></defs><rect width="1600" height="800" fill="url(#hsky)"/><circle cx="1200" cy="180" r="180" fill="url(#hmoon)"/><circle cx="1200" cy="180" r="68" fill="#F5EBD3" opacity="0.95"/><g fill="#F5EBD3" opacity="0.6"><circle cx="180" cy="140" r="1.4"/><circle cx="340" cy="80" r="1"/><circle cx="500" cy="160" r="1.6"/><circle cx="120" cy="240" r="0.9"/><circle cx="780" cy="120" r="1.2"/><circle cx="950" cy="60" r="1"/><circle cx="1380" cy="320" r="1.4"/><circle cx="80" cy="400" r="0.8"/><circle cx="450" cy="40" r="0.7"/></g><g fill="#050B17" opacity="0.92"><ellipse cx="120" cy="540" rx="100" ry="140"/><rect x="110" y="600" width="20" height="120" fill="#0F1E36"/><ellipse cx="1380" cy="560" rx="120" ry="160"/><rect x="1370" y="640" width="20" height="120" fill="#0F1E36"/><ellipse cx="700" cy="600" rx="80" ry="120" opacity="0.6"/><ellipse cx="900" cy="620" rx="90" ry="130" opacity="0.5"/></g><path d="M0 660 Q400 580 800 620 T1600 640 L1600 800 L0 800 Z" fill="url(#hhill)"/><path d="M0 720 Q600 670 1200 700 T1600 720 L1600 800 L0 800 Z" fill="#050B17"/></svg>`,

  detailHero: (kind) => {
    // Fotos reais Unsplash (licença livre, uso comercial OK)
    // Estética intencional: igreja contemporânea/evangélica — sem vitrais nem catedral
    const map = {
      culto:    '1622598453695-4fbaf151aadc', // congregação com mãos levantadas em frente ao palco
      oracao:   '1457139621581-298d1801c832', // silhueta orando ao pôr-do-sol
      jovens:   '1617405169156-4cf26e70605c', // palco com luzes (noite de louvor jovem)
      mulheres: '1581291519163-a10965fbff8f', // mãos femininas sobre Bíblia
    };
    const id = map[kind] || map.culto;
    return `<img src="https://images.unsplash.com/photo-${id}?w=1600&q=80&auto=format&fit=crop" alt="" loading="lazy"/>`;
  },

  campaign: (kind) => {
    // Fotos reais Unsplash (licença livre, uso comercial OK)
    const map = {
      oracao:  '1457139621581-298d1801c832', // silhueta orando ao pôr-do-sol
      food:    '1588964895597-cfccd6e2dbf9', // caixa com frutas (doação alimento)
      mission: '1654099067467-c18c8dec1df4', // Bíblia aberta com mapa-múndi
      church:  '1762967029134-8112080ef287', // interior de igreja moderna (concreto + tijolo)
    };
    const id = map[kind] || map.oracao;
    return `<img src="https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop" alt="" loading="lazy"/>`;
  },

  gallery: (item) => {
    const shapes = {
      people: `<g fill="#E5C77A" opacity="0.7"><circle cx="30" cy="40" r="6"/><circle cx="50" cy="40" r="6"/><circle cx="70" cy="40" r="6"/><rect x="20" y="50" width="60" height="30" rx="4"/></g>`,
      star: `<g fill="#E5C77A" opacity="0.6"><path d="M50 20 L60 45 L85 45 L65 60 L72 85 L50 70 L28 85 L35 60 L15 45 L40 45 Z"/></g>`,
      rings: `<g fill="none" stroke="#E5C77A" stroke-width="3" opacity="0.7"><circle cx="38" cy="50" r="18"/><circle cx="62" cy="50" r="18"/></g>`,
      water: `<g fill="#E5C77A" opacity="0.5"><path d="M20 70 Q50 40 80 70 L80 90 L20 90 Z"/><circle cx="75" cy="25" r="10"/></g>`,
      tent: `<g fill="#E5C77A" opacity="0.6"><polygon points="50,20 20,80 80,80"/><polygon points="50,40 35,75 65,75" fill="#0A1628"/></g>`,
      kids: `<g fill="#E5C77A" opacity="0.7"><circle cx="35" cy="40" r="8"/><circle cx="65" cy="40" r="8"/><rect x="25" y="55" width="20" height="25" rx="3"/><rect x="55" y="55" width="20" height="25" rx="3"/></g>`,
      coffee: `<g fill="none" stroke="#E5C77A" stroke-width="2" opacity="0.7"><rect x="30" y="40" width="35" height="40" rx="3"/><path d="M65 50 Q80 50 80 60 Q80 70 65 70"/></g>`,
      mic: `<g fill="#E5C77A" opacity="0.7"><rect x="44" y="20" width="12" height="35" rx="6"/><path d="M35 50 Q50 70 65 50" fill="none" stroke="#E5C77A" stroke-width="2"/><line x1="50" y1="65" x2="50" y2="80" stroke="#E5C77A" stroke-width="2"/></g>`,
    };
    if (item.text) {
      return `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="t${item.id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${item.color1}"/><stop offset="100%" stop-color="${item.color2}"/></linearGradient></defs><rect width="100" height="100" fill="url(#t${item.id})"/><text x="50" y="55" text-anchor="middle" fill="#F5EBD3" font-family="Cinzel" font-size="${item.text.length > 5 ? 9 : 11}" font-weight="600">${item.text}</text></svg>`;
    }
    return `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g${item.id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${item.color1}"/><stop offset="100%" stop-color="${item.color2}"/></linearGradient></defs><rect width="100" height="100" fill="url(#g${item.id})"/>${shapes[item.shape] || shapes.people}</svg>`;
  },

  qrCode: () => {
    let cells = '';
    const seed = 'NUPTECHS-IGREJA-GETSEMANI-PIX';
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    for (let y = 0; y < 25; y++) {
      for (let x = 0; x < 25; x++) {
        if ((x < 7 && y < 7) || (x > 17 && y < 7) || (x < 7 && y > 17)) continue;
        const v = Math.sin((x * 7919 + y * 6151 + hash) * 0.5);
        if (v > 0.1) {
          cells += `<rect x="${(5 + x * 3.6).toFixed(1)}" y="${(5 + y * 3.6).toFixed(1)}" width="3" height="3"/>`;
        }
      }
    }
    return `<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="white"/><g fill="#0A1628"><rect x="5" y="5" width="20" height="20"/><rect x="9" y="9" width="12" height="12" fill="white"/><rect x="12" y="12" width="6" height="6"/><rect x="75" y="5" width="20" height="20"/><rect x="79" y="9" width="12" height="12" fill="white"/><rect x="82" y="12" width="6" height="6"/><rect x="5" y="75" width="20" height="20"/><rect x="9" y="79" width="12" height="12" fill="white"/><rect x="12" y="82" width="6" height="6"/>${cells}</g></svg>`;
  },
};

/* ============================================================
   HELPERS
============================================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const escape = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ============================================================
   PAGE TEMPLATES — todas usam .container; sem header próprio
============================================================ */
const Pages = {
  home: () => {
    const verse = state.verses[0];
    const next3 = state.events.slice(0, 3);
    return `<div class="page">
      <section class="home-hero">
        <div class="home-hero-bg">${SVG.homeHero()}</div>
        <div class="home-hero-content container">
          <div class="eyebrow">Bem-vindo</div>
          <h1>AQUI JESUS<br/>CRISTO ORAVA</h1>
          <p class="verse">"${verse.text}"</p>
          <div class="verse-ref">${verse.ref}</div>
          <div class="home-hero-actions">
            <a class="btn btn-primary btn-lg" href="#eventos" data-route="eventos">${I.cal} Ver Eventos</a>
            <a class="btn btn-secondary btn-lg" href="#contribuicoes" data-route="contribuicoes">${I.heart} Contribuir</a>
          </div>
        </div>
      </section>

      <section class="container">
        <button class="alert-banner" data-route="evento" data-id="1">
          <div class="alert-icon">${I.alert}</div>
          <div class="alert-text">
            <div class="alert-title">CULTO DA FAMÍLIA AMANHÃ</div>
            <div class="alert-desc">25 de Maio às 19h30 — Templo Central. Confira detalhes.</div>
          </div>
          <span class="arrow">${I.arrow}</span>
        </button>
      </section>

      <section class="container section">
        <div class="section-head">
          <h2 class="section-title">Próximos Eventos</h2>
          <a class="section-link" href="#eventos" data-route="eventos">VER TODOS ${I.arrow}</a>
        </div>
        <div class="grid grid-3">
          ${next3.map(e => `<button class="card" data-route="evento" data-id="${e.id}"><div class="card-img">${SVG.detailHero(({CULTO:'culto',ORAÇÃO:'oracao',JOVENS:'jovens',MULHERES:'mulheres'})[e.tag] || 'culto')}<span class="card-img-tag">${e.tag}</span></div><div class="card-body"><h3 class="card-title">${e.title}</h3><div class="card-meta">${I.cal} ${e.date} · ${e.time}</div><p class="card-desc">${e.desc.slice(0, 100)}…</p></div><div class="card-footer"><span class="card-meta">${I.people} ${e.going}</span><span class="card-cta">DETALHES ${I.arrow}</span></div></button>`).join('')}
        </div>
      </section>

      <section class="container section">
        <div class="layout layout-with-sidebar">
          <div>
            <div class="section-head"><h2 class="section-title">Pastor</h2></div>
            <div class="pastor-card">
              <div class="pastor-avatar">JF</div>
              <div class="pastor-info">
                <div class="pastor-eyebrow">Pastor Titular</div>
                <div class="pastor-name">PR. JOÃO FERREIRA</div>
                <p class="pastor-msg">"Deus tem um propósito para esta igreja e para a sua vida. Cada um de nós foi chamado a ser luz no mundo."</p>
              </div>
            </div>
            <div class="section-head" style="margin-top:32px"><h2 class="section-title">Lideranças</h2></div>
            <div class="leaders">
              ${state.leaders.map(l => `<button class="leader" data-action="leader-info" data-name="${escape(l.name)}" data-role="${escape(l.role)}"><div class="leader-avatar">${l.initials}</div><div class="leader-name">${l.name}</div><div class="leader-role">${l.role}</div></button>`).join('')}
            </div>
          </div>
          <aside>
            <div class="section-head"><h2 class="section-title" style="font-size:18px">Esta Semana</h2></div>
            <div class="schedule">
              ${next3.map(e => `<button class="schedule-row" data-route="evento" data-id="${e.id}"><div class="sch-date"><div class="sch-day">${e.day}</div><div class="sch-month">${e.month}</div></div><div class="sch-info"><div class="sch-title">${e.title}</div><div class="sch-meta">${e.time}</div></div><span class="sch-arrow">${I.arrow}</span></button>`).join('')}
            </div>
            <div class="verse-card" style="margin-top:24px">
              <p class="verse-text">"${state.verses[1].text}"</p>
              <div class="verse-ref">${state.verses[1].ref}</div>
            </div>
          </aside>
        </div>
      </section>

      <section class="container section">
        <div class="section-head"><h2 class="section-title">Áreas do App</h2></div>
        <div class="quick-grid">
          <button class="quick-action" data-route="eventos">${I.cal}<span>Eventos</span></button>
          <button class="quick-action" data-route="palavra">${I.book}<span>Palavra</span></button>
          <button class="quick-action" data-route="campanhas">${I.campaign}<span>Campanhas</span></button>
          <button class="quick-action" data-route="parceiros">${I.people}<span>Parceiros</span></button>
          <button class="quick-action" data-route="contribuicoes">${I.heart}<span>Contribuir</span></button>
          <button class="quick-action" data-route="oracao">${I.pray}<span>Oração</span></button>
          <button class="quick-action" data-route="galeria">${I.gallery}<span>Galeria</span></button>
          <button class="quick-action" data-route="contato">${I.contact}<span>Contato</span></button>
        </div>
      </section>

      <section class="container section">
        <div class="section-head">
          <h2 class="section-title">Campanhas Ativas</h2>
          <a class="section-link" href="#campanhas" data-route="campanhas">VER TODAS ${I.arrow}</a>
        </div>
        <div class="grid grid-2">
          ${state.campaigns.slice(0,2).map(c => `<button class="card" data-route="campanha" data-id="${c.id}"><div class="card-img">${SVG.campaign(c.img)}<span class="card-img-tag">${c.percent}%</span></div><div class="card-body"><h3 class="card-title">${c.title}</h3><div class="card-meta">${I.cal} ${c.period}</div><p class="card-desc">${c.desc.slice(0,140)}…</p><div class="progress"><div class="progress-fill" style="width:${c.percent}%"></div></div><div class="progress-text"><span>${c.label}</span><span>Meta: ${c.goal}</span></div></div></button>`).join('')}
        </div>
      </section>
    </div>`;
  },

  eventos: () => `<div class="page container">
    <header class="page-hero"><div class="eyebrow">Agenda da Igreja</div><h1 class="page-title">Eventos & Palavra</h1><p class="page-subtitle">Confira os próximos cultos, vigílias e encontros. Marque presença, adicione ao calendário e venha em comunhão.</p></header>
    <div class="tabs"><button class="tab active" data-tab="ev-list">Eventos</button><button class="tab" data-tab="ev-word">Palavra</button></div>
    <div id="ev-list" class="tab-panel active" style="margin-top:32px">
      <div class="grid grid-3">
        ${state.events.map(e => `<button class="card" data-route="evento" data-id="${e.id}"><div class="card-img">${SVG.detailHero(({CULTO:'culto',ORAÇÃO:'oracao',JOVENS:'jovens',MULHERES:'mulheres'})[e.tag] || 'culto')}<span class="card-img-tag">${e.tag}</span></div><div class="card-body"><h3 class="card-title">${e.title}</h3><div class="card-meta">${I.cal} ${e.date} · ${e.time}</div><div class="card-meta">${I.pin} ${e.location.split('—')[0].trim()}</div><p class="card-desc">${e.desc.slice(0, 120)}…</p></div><div class="card-footer"><span class="card-meta">${I.people} ${e.going} confirmados</span><span class="card-cta">DETALHES ${I.arrow}</span></div></button>`).join('')}
      </div>
    </div>
    <div id="ev-word" class="tab-panel" style="margin-top:32px">
      <div class="grid grid-2">${state.verses.map(v => `<div class="verse-card"><p class="verse-text">"${v.text}"</p><div class="verse-ref">${v.ref}</div><div class="verse-actions"><button data-action="copy-verse" data-text="${escape(v.text + ' — ' + v.ref)}">${I.copy} Copiar</button><button data-action="share-verse" data-text="${escape(v.text + ' — ' + v.ref)}">${I.share} Compartilhar</button></div></div>`).join('')}</div>
    </div>
  </div>`,

  evento: (id) => {
    const e = state.events.find(x => x.id == id);
    if (!e) return Pages.eventos();
    const sceneMap = { CULTO: 'culto', ORAÇÃO: 'oracao', JOVENS: 'jovens', MULHERES: 'mulheres' };
    return `<div class="page container">
      <div style="position:relative;margin-top:16px">
        <div class="detail-hero-img">${SVG.detailHero(sceneMap[e.tag] || 'culto')}<button class="detail-back-btn" data-action="back" aria-label="Voltar">${I.back}</button><button class="detail-share-btn" data-action="share-event" data-id="${e.id}" aria-label="Compartilhar">${I.share}</button></div>
      </div>
      <span class="detail-tag">${e.tag}</span>
      <h1 class="detail-title">${e.title}</h1>
      <div class="detail-meta">
        <div class="detail-meta-row">${I.cal}<div><span class="label">Data</span><span class="value">${e.date}</span></div></div>
        <div class="detail-meta-row">${I.clock}<div><span class="label">Horário</span><span class="value">${e.time}</span></div></div>
        <div class="detail-meta-row">${I.pin}<div><span class="label">Local</span><span class="value">${e.location}</span></div></div>
        <div class="detail-meta-row">${I.people}<div><span class="label">Confirmados</span><span class="value">${e.going} pessoas</span></div></div>
      </div>
      <p class="detail-text">${e.desc}</p>
      <div class="detail-actions">
        <button class="btn btn-primary btn-block-full" data-action="confirm-event" data-id="${e.id}">${I.check} Confirmar Presença</button>
        <button class="btn btn-secondary" data-action="add-calendar" data-id="${e.id}">${I.cal} Adicionar ao Calendário</button>
        <button class="btn btn-secondary" data-action="open-map" data-loc="${escape(e.location)}">${I.pin} Ver no Mapa</button>
      </div>
    </div>`;
  },

  palavra: () => `<div class="page container">
    <header class="page-hero"><div class="eyebrow">Devocional</div><h1 class="page-title">Palavra Pastoral</h1><p class="page-subtitle">Versículos para meditar, copiar e compartilhar com quem você ama.</p></header>
    <div class="grid grid-2">${state.verses.map(v => `<div class="verse-card"><p class="verse-text">"${v.text}"</p><div class="verse-ref">${v.ref}</div><div class="verse-actions"><button data-action="copy-verse" data-text="${escape(v.text + ' — ' + v.ref)}">${I.copy} Copiar</button><button data-action="share-verse" data-text="${escape(v.text + ' — ' + v.ref)}">${I.share} Compartilhar</button></div></div>`).join('')}</div>
  </div>`,

  campanhas: () => `<div class="page container">
    <header class="page-hero"><div class="eyebrow">Mobilizações</div><h1 class="page-title">Campanhas da Igreja</h1><p class="page-subtitle">Participe, contribua e veja o impacto de cada semente que plantamos juntos.</p></header>
    <div class="grid grid-2">${state.campaigns.map(c => `<button class="card" data-route="campanha" data-id="${c.id}"><div class="card-img">${SVG.campaign(c.img)}<span class="card-img-tag">${c.percent}%</span></div><div class="card-body"><h3 class="card-title">${c.title}</h3><div class="card-meta">${I.cal} ${c.period}</div><p class="card-desc">${c.desc}</p><div class="progress"><div class="progress-fill" style="width:${c.percent}%"></div></div><div class="progress-text"><span>${c.label}</span><span>Meta: ${c.goal}</span></div></div><div class="card-footer"><span></span><span class="card-cta">CONTRIBUIR ${I.arrow}</span></div></button>`).join('')}</div>
  </div>`,

  campanha: (id) => {
    const c = state.campaigns.find(x => x.id == id);
    if (!c) return Pages.campanhas();
    return `<div class="page container">
      <div style="position:relative;margin-top:16px">
        <div class="detail-hero-img">${SVG.campaign(c.img)}<button class="detail-back-btn" data-action="back" aria-label="Voltar">${I.back}</button><button class="detail-share-btn" data-action="share-campaign" data-id="${c.id}" aria-label="Compartilhar">${I.share}</button></div>
      </div>
      <span class="detail-tag">CAMPANHA</span>
      <h1 class="detail-title">${c.title}</h1>
      <div class="detail-meta">
        <div class="detail-meta-row">${I.cal}<div><span class="label">Período</span><span class="value">${c.period}</span></div></div>
        <div class="detail-meta-row">${I.heart}<div><span class="label">Progresso</span><span class="value">${c.label} de ${c.goal}</span></div></div>
      </div>
      <div style="max-width:680px"><div class="progress" style="height:12px;margin-bottom:8px"><div class="progress-fill" style="width:${c.percent}%"></div></div><div class="progress-text" style="margin-bottom:24px"><span>${c.percent}% concluído</span><span>${c.goal}</span></div></div>
      <p class="detail-text">${c.desc}</p>
      <div class="detail-actions">
        <button class="btn btn-primary btn-block-full" data-action="contribute-campaign" data-id="${c.id}">${I.heart} Contribuir Agora</button>
        <button class="btn btn-secondary btn-block-full" data-action="share-campaign" data-id="${c.id}">${I.share} Compartilhar</button>
      </div>
    </div>`;
  },

  parceiros: () => {
    const filtered = state.partners.filter(p => {
      const catOk = state.filters.partnerCategory === 'all' || p.cat === state.filters.partnerCategory;
      const q = state.filters.partnerSearch.toLowerCase();
      const sOk = !q || p.name.toLowerCase().includes(q) || p.catLabel.toLowerCase().includes(q);
      return catOk && sOk;
    });
    return `<div class="page container">
      <header class="page-hero"><div class="eyebrow">Comunidade</div><h1 class="page-title">Parceiros & Profissionais</h1><p class="page-subtitle">Profissionais e empresas da nossa igreja. Muitos oferecem descontos especiais para membros.</p></header>
      <div class="search-bar">${I.search}<input id="partnerSearch" type="text" placeholder="Buscar por nome ou categoria..." value="${escape(state.filters.partnerSearch)}"/></div>
      <div class="filter-row">${state.partnerCategories.map(c => `<button class="chip ${state.filters.partnerCategory === c.id ? 'active' : ''}" data-action="filter-cat" data-cat="${c.id}">${c.label}</button>`).join('')}</div>
      ${filtered.length === 0 ? `<div class="empty-state">${I.search}<p>Nenhum parceiro encontrado</p></div>` : `<div class="grid grid-2">${filtered.map(p => `<div class="partner-card" role="button" tabindex="0" data-route="parceiro" data-id="${p.id}"><div class="partner-logo">${p.initials}</div><div class="partner-info"><p class="partner-name">${p.name}</p><div class="partner-cat">${p.catLabel}</div><p class="partner-contact">${p.phone}</p></div><div class="partner-actions"><button class="partner-whatsapp" data-action="wa" data-phone="${p.phone}" aria-label="WhatsApp ${escape(p.name)}">${I.wa}</button></div></div>`).join('')}</div>`}
    </div>`;
  },

  parceiro: (id) => {
    const p = state.partners.find(x => x.id == id);
    if (!p) return Pages.parceiros();
    return `<div class="page container">
      <div style="margin-top:24px"><button class="btn btn-ghost btn-sm" data-action="back">${I.back} Voltar</button></div>
      <div class="contact-hero" style="margin-top:24px">
        <div class="nuptechs-logo" style="font-size:32px">${p.initials}</div>
        <h2 class="contact-name">${p.name}</h2>
        <p class="contact-tag">${p.catLabel}</p>
        <p class="contact-desc">${p.desc}</p>
      </div>
      <div class="section-head" style="margin-top:32px"><h2 class="section-title" style="font-size:18px">Serviços</h2></div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px">${p.services.map(s => `<span class="chip active" style="cursor:default">${s}</span>`).join('')}</div>
      <div class="section-head"><h2 class="section-title" style="font-size:18px">Contato</h2></div>
      <div class="contact-channels">
        <a class="channel" data-action="wa" data-phone="${p.phone}"><div class="channel-icon wa">${I.wa}</div><div class="channel-info"><div class="channel-label">WhatsApp</div><div class="channel-value">${p.phone}</div></div>${I.arrow}</a>
        <a href="tel:${p.phone.replace(/\D/g, '')}" class="channel"><div class="channel-icon tel">${I.phone}</div><div class="channel-info"><div class="channel-label">Telefone</div><div class="channel-value">${p.phone}</div></div>${I.arrow}</a>
        <a href="mailto:${p.email}" class="channel channel-block"><div class="channel-icon mail">${I.mail}</div><div class="channel-info"><div class="channel-label">Email</div><div class="channel-value">${p.email}</div></div>${I.arrow}</a>
      </div>
    </div>`;
  },

  contribuicoes: () => {
    const amt = state.contribution.amount;
    const m = state.contribution.method;
    return `<div class="page container">
      <header class="page-hero"><div class="eyebrow">Contribua</div><h1 class="page-title">Contribuições</h1><p class="page-subtitle">"Cada um contribua segundo propôs no seu coração; porque Deus ama ao que dá com alegria." — 2 Coríntios 9:7</p></header>

      <div class="contrib-layout">
        <div>
          <div class="section-head"><h2 class="section-title" style="font-size:18px">1. Escolha o Valor</h2></div>
          <div class="amounts">
            ${[20, 50, 100].map(v => `<button class="amount ${amt === v ? 'selected' : ''}" data-action="set-amount" data-amount="${v}">R$ ${v}</button>`).join('')}
            <button class="amount amount-custom ${![20,50,100].includes(amt) ? 'selected' : ''}" data-action="custom-amount">${![20,50,100].includes(amt) ? 'R$ ' + amt : 'Outro'}</button>
          </div>

          <div class="section-head" style="margin-top:32px"><h2 class="section-title" style="font-size:18px">2. Forma de Pagamento</h2></div>
          <div class="method-section ${m === 'pix' ? 'selected' : ''}" data-action="set-method" data-method="pix">
            <div class="method-header"><h3 class="method-title">PIX</h3><div class="method-radio ${m === 'pix' ? 'checked' : ''}"></div></div>
            ${m === 'pix' ? `<div class="pix-row"><div style="flex:1;min-width:0"><div class="pix-label">CHAVE (CNPJ)</div><div class="pix-key" id="pixKey">12.345.678/0001-90</div></div><button class="btn-copy" data-action="copy-pix">${I.copy} COPIAR</button></div><div class="qr-block">${SVG.qrCode()}</div><p style="font-size:12px;color:var(--text-muted);text-align:center;margin:14px 0 0">Aponte a câmera do seu app de banco</p>` : ''}
          </div>
          <div class="method-section ${m === 'card' ? 'selected' : ''}" data-action="set-method" data-method="card">
            <div class="method-header"><h3 class="method-title">CARTÃO DE CRÉDITO</h3><div class="method-radio ${m === 'card' ? 'checked' : ''}"></div></div>
            ${m === 'card' ? `<p style="font-size:13px;color:var(--text-muted);margin:0 0 14px">Cartões aceitos:</p><div class="cards-row"><div class="card-flag" style="color:#1A3DA0">VISA</div><div class="card-flag" style="color:#EB001B">MASTER</div><div class="card-flag" style="color:#00A2E5">ELO</div><div class="card-flag" style="color:#0066B2">AMEX</div></div>` : ''}
          </div>
        </div>

        <aside>
          <div class="contrib-summary">
            <h3 style="font-family:'Cinzel',serif;font-size:14px;letter-spacing:0.16em;color:var(--gold-bright);margin:0 0 16px;text-transform:uppercase">Resumo</h3>
            <div class="summary-row"><span>Método</span><span class="v">${m === 'pix' ? 'PIX' : 'Cartão'}</span></div>
            <div class="summary-row"><span>Valor</span><span class="v">R$ ${amt},00</span></div>
            <div class="summary-row total"><span>TOTAL</span><span class="v">R$ ${amt},00</span></div>
            <button class="btn btn-primary btn-block" style="margin-top:20px" data-action="confirm-contribution">${I.check} Confirmar</button>
            <p style="font-size:11px;color:var(--text-dim);text-align:center;margin:14px 0 0;line-height:1.6">🔒 Pagamento criptografado<br/>Recibo enviado por email</p>
          </div>
          <button class="btn btn-ghost btn-block btn-sm" style="margin-top:14px" data-action="contrib-history">${I.clock} Ver histórico</button>
        </aside>
      </div>
    </div>`;
  },

  galeria: () => {
    const tabs = [
      { id: 'g-fotos', label: 'Fotos', items: state.galleryAlbums.fotos },
      { id: 'g-videos', label: 'Vídeos', items: state.galleryAlbums.videos },
      { id: 'g-imagens', label: 'Destaques', items: state.galleryAlbums.imagens },
    ];
    return `<div class="page container">
      <header class="page-hero"><div class="eyebrow">Memórias</div><h1 class="page-title">Galeria</h1><p class="page-subtitle">Reviva momentos de cultos, celebrações e a vida da nossa comunidade.</p></header>
      <div class="tabs">${tabs.map((t, i) => `<button class="tab ${i === 0 ? 'active' : ''}" data-tab="${t.id}">${t.label}</button>`).join('')}</div>
      ${tabs.map((t, i) => `<div id="${t.id}" class="tab-panel ${i === 0 ? 'active' : ''}" style="margin-top:24px"><div class="gallery-grid">${t.items.map((it, idx) => `<div class="gallery-item ${it.video ? 'video' : ''}" data-action="open-lightbox" data-album="${t.id}" data-index="${idx}"><div class="gi-bg">${SVG.gallery(it)}</div>${it.title ? `<div class="gi-overlay">${it.title}</div>` : ''}</div>`).join('')}</div></div>`).join('')}
    </div>`;
  },

  oracao: () => `<div class="page container">
    <header class="page-hero"><div class="eyebrow">Comunhão</div><h1 class="page-title">Pedidos de Oração</h1><p class="page-subtitle">"Confessai as vossas culpas uns aos outros e orai uns pelos outros, para que sareis." — Tiago 5:16</p></header>
    <div class="layout layout-with-sidebar">
      <div>
        <div class="section-head"><h2 class="section-title" style="font-size:18px">Pedidos da Comunidade</h2></div>
        <div class="prayer-list">${state.prayers.map(p => `<div class="prayer-item"><div class="prayer-author"><div class="prayer-author-avatar">${p.initials}</div><div class="prayer-author-info"><div class="prayer-author-name">${p.name}</div><div class="prayer-author-time">${p.time}</div></div></div><p class="prayer-text">${escape(p.text)}</p><div class="prayer-actions"><button class="prayer-btn ${p.amenedByMe ? 'active' : ''}" data-action="amen" data-id="${p.id}">${I.heart} Amém · ${p.amen}</button><button class="prayer-btn" data-action="share-prayer" data-id="${p.id}">${I.share} Compartilhar</button></div></div>`).join('')}</div>
      </div>
      <aside>
        <div class="prayer-intro">
          <h3>OREMOS UNS PELOS OUTROS</h3>
          <p>Compartilhe seu pedido com a comunidade e ore por irmãos em Cristo.</p>
          <button class="btn btn-primary btn-block" style="margin-top:20px" data-action="open-prayer-form">${I.heart} Fazer Pedido</button>
        </div>
      </aside>
    </div>
  </div>`,

  contato: () => `<div class="page container">
    <header class="page-hero"><div class="eyebrow">Desenvolvido por</div><h1 class="page-title">NuPtechs Tecnologia</h1><p class="page-subtitle">Soluções digitais para igrejas e empresas. Este app foi desenvolvido com cuidado para a sua comunidade.</p></header>
    <div class="contact-hero">
      <div class="nuptechs-logo">N</div>
      <h2 class="contact-name">NUPTECHS</h2>
      <p class="contact-tag">TECNOLOGIA</p>
      <p class="contact-desc">Apps mobile, sistemas web, automações e infraestrutura para empresas que precisam crescer com tecnologia confiável.</p>
      <div class="contact-channels">
        <a class="channel" href="https://wa.me/5511987654321" target="_blank"><div class="channel-icon wa">${I.wa}</div><div class="channel-info"><div class="channel-label">WhatsApp</div><div class="channel-value">(11) 98765-4321</div></div>${I.arrow}</a>
        <a class="channel" href="tel:1187654321"><div class="channel-icon tel">${I.phone}</div><div class="channel-info"><div class="channel-label">Telefone</div><div class="channel-value">(11) 98765-4321</div></div>${I.arrow}</a>
        <a class="channel" href="mailto:contato@nuptechs.com.br"><div class="channel-icon mail">${I.mail}</div><div class="channel-info"><div class="channel-label">Email</div><div class="channel-value">contato@nuptechs.com.br</div></div>${I.arrow}</a>
        <a class="channel channel-block" href="https://nuptechs.com.br" target="_blank"><div class="channel-icon web">${I.globe}</div><div class="channel-info"><div class="channel-label">Site</div><div class="channel-value">nuptechs.com.br</div></div>${I.arrow}</a>
      </div>
    </div>
  </div>`,

  contribSuccess: (amount) => `<div class="page container">
    <div class="success-wrap">
      <div class="success-icon">${I.check}</div>
      <div class="eyebrow">Confirmado</div>
      <h1 class="page-title" style="font-size:32px;margin:8px 0 16px">Deus Abençoe!</h1>
      <p style="font-size:16px;color:var(--text-muted);line-height:1.7">Sua contribuição de <strong style="color:var(--gold-bright);font-size:22px">R$ ${amount},00</strong> foi recebida com sucesso.</p>
      <div class="detail-meta" style="text-align:left;margin:32px 0">
        <div class="detail-meta-row">${I.check}<div><span class="label">Status</span><span class="value">Confirmado</span></div></div>
        <div class="detail-meta-row">${I.cal}<div><span class="label">Data</span><span class="value">${new Date().toLocaleDateString('pt-BR')}</span></div></div>
        <div class="detail-meta-row">${I.mail}<div><span class="label">Recibo</span><span class="value">Enviado por email</span></div></div>
      </div>
      <p style="font-style:italic;color:var(--text);font-family:'Cinzel',serif;line-height:1.7">"Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria."<br/><span style="font-size:12px;letter-spacing:0.2em;color:var(--gold-bright);font-style:normal">2 CORÍNTIOS 9:7</span></p>
      <button class="btn btn-primary btn-lg" style="margin-top:32px" data-route="home">${I.check} Voltar para o Início</button>
    </div>
  </div>`,
};

/* ============================================================
   ROUTER
============================================================ */
function navigate(name, params = {}, opts = {}) {
  if (state.route.name && state.route.name !== name && !opts.replace) {
    state.history.push({ name: state.route.name, params: state.route.params });
  }
  state.route = { name, params };
  render();
  const hash = name + (params.id ? '/' + params.id : '');
  if (window.location.hash.slice(1) !== hash) {
    window.history.pushState({ name, params }, '', '#' + hash);
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function back() {
  if (state.history.length > 0) {
    const prev = state.history.pop();
    state.route = prev;
    render();
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else {
    navigate('home', {}, { replace: true });
  }
}

function render() {
  const main = $('#main');
  const { name, params } = state.route;
  let html = '';
  if (name === 'home') html = Pages.home();
  else if (name === 'eventos') html = Pages.eventos();
  else if (name === 'evento') html = Pages.evento(params.id);
  else if (name === 'palavra') html = Pages.palavra();
  else if (name === 'campanhas') html = Pages.campanhas();
  else if (name === 'campanha') html = Pages.campanha(params.id);
  else if (name === 'parceiros') html = Pages.parceiros();
  else if (name === 'parceiro') html = Pages.parceiro(params.id);
  else if (name === 'contribuicoes') html = Pages.contribuicoes();
  else if (name === 'galeria') html = Pages.galeria();
  else if (name === 'contato') html = Pages.contato();
  else if (name === 'oracao') html = Pages.oracao();
  else if (name === 'contribSuccess') html = Pages.contribSuccess(params.amount || 50);
  else html = Pages.home();
  main.innerHTML = html;

  // Active state no menu desktop
  $$('#mainNav a').forEach(a => a.classList.toggle('active', a.dataset.route === name));

  // Bell badge
  updateBell();

  // Anima progress
  $$('.progress-fill').forEach(p => {
    const target = p.style.width;
    p.style.width = '0%';
    requestAnimationFrame(() => requestAnimationFrame(() => { p.style.width = target; }));
  });

  // Search input live
  const ps = $('#partnerSearch');
  if (ps) {
    ps.addEventListener('input', e => {
      state.filters.partnerSearch = e.target.value;
      const cur = ps.selectionStart;
      render();
      const np = $('#partnerSearch');
      if (np) { np.focus(); np.setSelectionRange(cur, cur); }
    });
  }
}

function updateBell() {
  const unread = state.notifications.filter(n => n.unread).length;
  const bell = $('#bellBtn');
  if (unread > 0) {
    bell.classList.add('has-badge');
    bell.dataset.badge = unread;
  } else {
    bell.classList.remove('has-badge');
    bell.dataset.badge = '0';
  }
}

/* ============================================================
   ACTIONS
============================================================ */
const Actions = {
  back: () => back(),
  'open-menu': () => openDrawer('menu'),
  'open-notif': () => openDrawer('notif'),
  'close-notif': () => closeDrawers(),
  'mark-all-read': () => {
    state.notifications.forEach(n => n.unread = false);
    showToast('Todas marcadas como lidas');
    renderNotifications();
    updateBell();
  },
  'open-search': () => openSearchModal(),
  'close-modal': () => closeModal(),
  'close-lightbox': () => closeLightbox(),
  'lightbox-prev': () => navigateLightbox(-1),
  'lightbox-next': () => navigateLightbox(1),

  'copy-pix': async () => {
    try { await navigator.clipboard.writeText('12.345.678/0001-90'); showToast('Chave PIX copiada!'); }
    catch { showToast('Não foi possível copiar', true); }
  },
  'copy-verse': async (el) => {
    try { await navigator.clipboard.writeText(el.dataset.text); showToast('Versículo copiado!'); }
    catch { showToast('Não foi possível copiar', true); }
  },
  'share-verse': async (el) => {
    if (navigator.share) { try { await navigator.share({ text: el.dataset.text }); } catch {} }
    else { try { await navigator.clipboard.writeText(el.dataset.text); showToast('Copiado para compartilhar'); } catch {} }
  },
  'share-event': async (el) => {
    const e = state.events.find(x => x.id == el.dataset.id);
    const txt = `${e.title} — ${e.date} às ${e.time}\n${e.location}\n\nIgreja Getsêmani`;
    if (navigator.share) { try { await navigator.share({ title: e.title, text: txt }); } catch {} }
    else { await navigator.clipboard.writeText(txt); showToast('Copiado para compartilhar'); }
  },
  'share-campaign': async (el) => {
    const c = state.campaigns.find(x => x.id == el.dataset.id);
    const txt = `${c.title} — ${c.period}\n${c.desc}\n\nApoie a Igreja Getsêmani.`;
    if (navigator.share) { try { await navigator.share({ title: c.title, text: txt }); } catch {} }
    else { await navigator.clipboard.writeText(txt); showToast('Copiado para compartilhar'); }
  },
  'share-prayer': () => showToast('Pedido compartilhado'),

  'wa': (el) => {
    const phone = el.dataset.phone.replace(/\D/g, '');
    window.open(`https://wa.me/55${phone}`, '_blank');
  },
  'leader-info': (el) => {
    openModal('LIDERANÇA',
      `<div style="text-align:center;padding:8px"><div class="leader-avatar" style="width:96px;height:96px;font-size:28px;margin:0 auto 16px"></div><h3 style="font-family:'Cinzel',serif;color:var(--gold-bright);margin:0 0 4px;letter-spacing:0.1em">${escape(el.dataset.name)}</h3><p style="color:var(--gold);font-size:11px;letter-spacing:0.16em;text-transform:uppercase;font-weight:600">${escape(el.dataset.role)}</p><p style="margin-top:18px;font-size:13px;color:var(--text-muted);line-height:1.7">Servindo a Igreja Getsêmani com fidelidade e amor ao Senhor.</p></div>`,
      `<button class="btn btn-secondary" data-action="close-modal">FECHAR</button>`);
    setTimeout(() => {
      const av = $('#modalBody .leader-avatar');
      if (av) av.textContent = el.querySelector('.leader-avatar').textContent;
    }, 50);
  },

  'confirm-event': (el) => {
    const e = state.events.find(x => x.id == el.dataset.id);
    e.going++;
    showToast(`Presença confirmada em "${e.title}"!`);
    render();
  },
  'add-calendar': (el) => {
    const e = state.events.find(x => x.id == el.dataset.id);
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Igreja Getsemani//App//PT\nBEGIN:VEVENT\nUID:${e.id}@getsemani.app\nDTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z\nSUMMARY:${e.title}\nDESCRIPTION:${e.desc}\nLOCATION:${e.location}\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${e.title.replace(/\s+/g, '-')}.ics`; a.click();
    URL.revokeObjectURL(url);
    showToast('Evento baixado para o calendário');
  },
  'open-map': (el) => window.open(`https://maps.google.com/maps?q=${encodeURIComponent(el.dataset.loc)}`, '_blank'),

  'contribute-campaign': () => { navigate('contribuicoes'); showToast('Sua doação ajuda esta campanha'); },

  'set-amount': (el) => { state.contribution.amount = Number(el.dataset.amount); render(); },
  'custom-amount': () => {
    openModal('VALOR PERSONALIZADO',
      `<div class="field"><label>Valor (R$)</label><input id="customAmount" type="number" min="1" step="1" value="${state.contribution.amount}" /></div>`,
      `<button class="btn btn-primary" data-action="apply-custom-amount">CONFIRMAR</button><button class="btn btn-ghost" data-action="close-modal">CANCELAR</button>`);
    setTimeout(() => $('#customAmount')?.focus(), 100);
  },
  'apply-custom-amount': () => {
    const v = Number($('#customAmount').value);
    if (v && v > 0) { state.contribution.amount = v; closeModal(); render(); showToast(`R$ ${v} selecionado`); }
    else showToast('Valor inválido', true);
  },
  'set-method': (el) => { state.contribution.method = el.dataset.method; render(); },
  'confirm-contribution': () => {
    const amt = state.contribution.amount;
    state.notifications.unshift({ id: Date.now(), title: 'Recibo de contribuição', desc: `Contribuição de R$ ${amt} confirmada. Obrigado!`, time: 'Agora', icon: 'check', unread: true });
    navigate('contribSuccess', { amount: amt });
  },
  'contrib-history': () => {
    openModal('HISTÓRICO DE CONTRIBUIÇÕES',
      `<div style="display:flex;flex-direction:column;gap:8px">
        <div style="padding:14px;background:var(--bg-elev-1);border-radius:10px;display:flex;justify-content:space-between;font-size:13px"><div><div style="font-weight:600">PIX · 28/04/2026</div><div style="color:var(--text-muted);font-size:11px">Contribuição voluntária</div></div><div style="color:var(--gold-bright);font-weight:600">R$ 50</div></div>
        <div style="padding:14px;background:var(--bg-elev-1);border-radius:10px;display:flex;justify-content:space-between;font-size:13px"><div><div style="font-weight:600">Cartão · 12/04/2026</div><div style="color:var(--text-muted);font-size:11px">Campanha de Missões</div></div><div style="color:var(--gold-bright);font-weight:600">R$ 100</div></div>
        <div style="padding:14px;background:var(--bg-elev-1);border-radius:10px;display:flex;justify-content:space-between;font-size:13px"><div><div style="font-weight:600">PIX · 02/04/2026</div><div style="color:var(--text-muted);font-size:11px">Dízimo</div></div><div style="color:var(--gold-bright);font-weight:600">R$ 200</div></div>
        <div style="text-align:center;padding-top:8px;font-size:12px;color:var(--text-muted)">Total no ano: <strong style="color:var(--gold-bright)">R$ 350,00</strong></div>
      </div>`,
      `<button class="btn btn-secondary" data-action="close-modal">FECHAR</button>`);
  },

  'filter-cat': (el) => { state.filters.partnerCategory = el.dataset.cat; render(); },

  'open-lightbox': (el) => {
    const album = el.dataset.album.replace('g-', '');
    const idx = Number(el.dataset.index);
    const map = { fotos: state.galleryAlbums.fotos, videos: state.galleryAlbums.videos, imagens: state.galleryAlbums.imagens };
    state.lightbox = { open: true, list: map[album], index: idx };
    showLightbox();
  },

  'open-prayer-form': () => {
    openModal('PEDIDO DE ORAÇÃO',
      `<div class="field"><label>Nome (opcional)</label><input id="prayName" type="text" placeholder="Pode ficar anônimo"/></div>
       <div class="field"><label>Seu Pedido</label><textarea id="prayText" placeholder="Compartilhe seu pedido..."></textarea></div>
       <label class="checkbox-row"><input type="checkbox" id="prayAnon"/> <span>Manter anônimo</span></label>`,
      `<button class="btn btn-primary" data-action="submit-prayer">${I.heart} ENVIAR</button><button class="btn btn-ghost" data-action="close-modal">CANCELAR</button>`);
  },
  'submit-prayer': () => {
    const text = $('#prayText').value.trim();
    if (!text) { showToast('Escreva seu pedido', true); return; }
    const anon = $('#prayAnon').checked;
    const name = anon ? 'Anônimo' : ($('#prayName').value.trim() || 'Você');
    const initials = anon ? '?' : name.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
    state.prayers.unshift({ id: Date.now(), name, initials, text, time: 'Agora', amen: 0 });
    closeModal();
    showToast('Pedido enviado. A comunidade está orando.');
    render();
  },
  'amen': (el) => {
    const p = state.prayers.find(x => x.id == el.dataset.id);
    if (!p) return;
    if (p.amenedByMe) { p.amen--; p.amenedByMe = false; }
    else { p.amen++; p.amenedByMe = true; showToast('Amém! Sua oração foi registrada 🙏'); }
    render();
  },
};

/* ============================================================
   DRAWERS / MODALS / LIGHTBOX / TOAST / SEARCH
============================================================ */
function openDrawer(which) {
  const overlay = $('#drawerOverlay');
  if (which === 'menu') { renderDrawerMenu(); $('#drawerMenu').classList.add('show'); }
  else { renderNotifications(); $('#drawerNotif').classList.add('show'); }
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeDrawers() {
  $('#drawerOverlay').classList.remove('show');
  $('#drawerMenu').classList.remove('show');
  $('#drawerNotif').classList.remove('show');
  document.body.style.overflow = '';
}

function renderDrawerMenu() {
  const items = [
    { route: 'home', icon: 'cross', label: 'Início' },
    { route: 'eventos', icon: 'cal', label: 'Eventos' },
    { route: 'palavra', icon: 'book', label: 'Palavra Pastoral' },
    { route: 'campanhas', icon: 'campaign', label: 'Campanhas' },
    { route: 'parceiros', icon: 'people', label: 'Parceiros' },
    { route: 'oracao', icon: 'pray', label: 'Pedidos de Oração' },
    { route: 'contribuicoes', icon: 'heart', label: 'Contribuir' },
    { route: 'galeria', icon: 'gallery', label: 'Galeria' },
    { route: 'contato', icon: 'contact', label: 'Contato (NuPtechs)' },
  ];
  $('#drawerBody').innerHTML = items.map(it => `<button class="drawer-item ${state.route.name === it.route ? 'active' : ''}" data-route="${it.route}" data-action="nav-from-drawer">${I[it.icon]}<span class="drawer-item-label">${it.label}</span>${I.arrow}</button>`).join('');
}

function renderNotifications() {
  const list = $('#notifList');
  const iconMap = { calendar: I.cal, book: I.book, heart: I.heart, check: I.check };
  if (state.notifications.length === 0) {
    list.innerHTML = `<div class="notif-empty">${I.bell}<p>Nenhuma notificação</p></div>`;
  } else {
    list.innerHTML = state.notifications.map(n => `<div class="notif-item ${n.unread ? 'unread' : ''}"><div class="notif-icon">${iconMap[n.icon] || I.bell}</div><div class="notif-content"><p class="notif-title">${n.title}</p><p class="notif-desc">${n.desc}</p><div class="notif-time">${n.time}</div></div></div>`).join('');
  }
  const unread = state.notifications.filter(n => n.unread).length;
  $('#notifCount').textContent = unread === 0 ? 'Todas lidas' : `${unread} não lida${unread > 1 ? 's' : ''}`;
}

function openModal(title, body, footer = '') {
  $('#modalTitle').textContent = title;
  $('#modalBody').innerHTML = body;
  $('#modalFooter').innerHTML = footer;
  $('#modalOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeModal() { $('#modalOverlay').classList.remove('show'); document.body.style.overflow = ''; }

function showLightbox() {
  const { list, index } = state.lightbox;
  if (!list[index]) return;
  $('#lightboxImg').innerHTML = SVG.gallery(list[index]);
  $('#lightboxCaption').textContent = list[index].title || '';
  $('#lightbox').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  $('#lightbox').classList.remove('show');
  state.lightbox.open = false;
  document.body.style.overflow = '';
}
function navigateLightbox(dir) {
  const { list, index } = state.lightbox;
  state.lightbox.index = (index + dir + list.length) % list.length;
  showLightbox();
}

function showToast(msg, isError = false) {
  const t = $('#toast');
  $('#toastMsg').textContent = msg;
  t.classList.toggle('error', isError);
  t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove('show'), 2400);
}

function openSearchModal() {
  openModal('BUSCAR',
    `<div class="search-modal-input">${I.search}<input id="globalSearch" type="text" placeholder="Buscar eventos, parceiros, campanhas..." autocomplete="off"/></div><div class="search-results" id="searchResults"></div>`, '');
  setTimeout(() => {
    $('#globalSearch').focus();
    $('#globalSearch').addEventListener('input', e => renderSearchResults(e.target.value));
    renderSearchResults('');
  }, 100);
}

function renderSearchResults(q) {
  q = q.toLowerCase().trim();
  const out = $('#searchResults');
  if (!q) {
    out.innerHTML = `<p class="search-section-title">SUGESTÕES</p>` +
      ['Culto da Família', 'Vigília', 'Contribuir', 'Parceiros', 'Pedidos de Oração'].map(s => `<button class="search-result" data-action="search-suggest" data-q="${s}"><div class="search-result-icon">${I.search}</div><div class="search-result-info"><div class="search-result-title">${s}</div></div></button>`).join('');
    return;
  }
  const events = state.events.filter(e => e.title.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q));
  const partners = state.partners.filter(p => p.name.toLowerCase().includes(q) || p.catLabel.toLowerCase().includes(q));
  const campaigns = state.campaigns.filter(c => c.title.toLowerCase().includes(q));
  let html = '';
  if (events.length) html += `<p class="search-section-title">EVENTOS</p>` + events.map(e => `<button class="search-result" data-action="search-go" data-route="evento" data-id="${e.id}"><div class="search-result-icon">${I.cal}</div><div class="search-result-info"><div class="search-result-title">${e.title}</div><div class="search-result-meta">${e.date} · ${e.time}</div></div></button>`).join('');
  if (partners.length) html += `<p class="search-section-title">PARCEIROS</p>` + partners.map(p => `<button class="search-result" data-action="search-go" data-route="parceiro" data-id="${p.id}"><div class="search-result-icon">${I.people}</div><div class="search-result-info"><div class="search-result-title">${p.name}</div><div class="search-result-meta">${p.catLabel}</div></div></button>`).join('');
  if (campaigns.length) html += `<p class="search-section-title">CAMPANHAS</p>` + campaigns.map(c => `<button class="search-result" data-action="search-go" data-route="campanha" data-id="${c.id}"><div class="search-result-icon">${I.campaign}</div><div class="search-result-info"><div class="search-result-title">${c.title}</div><div class="search-result-meta">${c.period}</div></div></button>`).join('');
  if (!html) html = `<div class="empty-state">${I.search}<p>Nenhum resultado para "${escape(q)}"</p></div>`;
  out.innerHTML = html;
}

/* ============================================================
   EVENT DELEGATION
============================================================ */
document.addEventListener('click', (e) => {
  if (e.target.id === 'lightbox') return closeLightbox();
  if (e.target.id === 'drawerOverlay') return closeDrawers();
  if (e.target.id === 'modalOverlay') return closeModal();

  const actionEl = e.target.closest('[data-action]');
  const routeEl = e.target.closest('[data-route]');

  if (actionEl) {
    e.preventDefault();
    e.stopPropagation();
    const action = actionEl.dataset.action;
    if (action === 'nav-from-drawer') { closeDrawers(); setTimeout(() => navigate(actionEl.dataset.route), 200); return; }
    if (action === 'search-suggest') { $('#globalSearch').value = actionEl.dataset.q; renderSearchResults(actionEl.dataset.q); return; }
    if (action === 'search-go') { closeModal(); navigate(actionEl.dataset.route, { id: actionEl.dataset.id }); return; }
    if (Actions[action]) Actions[action](actionEl);
    return;
  }

  if (routeEl) {
    e.preventDefault();
    const r = routeEl.dataset.route;
    const id = routeEl.dataset.id;
    navigate(r, id ? { id } : {});
    return;
  }

  const tab = e.target.closest('.tab[data-tab]');
  if (tab) {
    const targetId = tab.dataset.tab;
    const container = tab.closest('.tabs');
    $$('.tab', container).forEach(t => t.classList.toggle('active', t === tab));
    const page = tab.closest('.page');
    $$('.tab-panel', page).forEach(p => p.classList.toggle('active', p.id === targetId));
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (state.lightbox.open) closeLightbox();
    else if ($('#modalOverlay').classList.contains('show')) closeModal();
    else closeDrawers();
  }
  if (state.lightbox.open) {
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  }
});

window.addEventListener('popstate', () => {
  const hash = window.location.hash.slice(1);
  if (!hash) { state.route = { name: 'home', params: {} }; render(); return; }
  const [name, id] = hash.split('/');
  state.route = { name, params: id ? { id } : {} };
  render();
});

let touchStartX = 0;
document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', (e) => {
  if (state.lightbox.open) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 50) navigateLightbox(-1);
    else if (dx < -50) navigateLightbox(1);
  }
}, { passive: true });

/* Image error fallback — se Unsplash cair, mostra gradiente em vez de img quebrada */
document.addEventListener('error', (e) => {
  const t = e.target;
  if (t && t.tagName === 'IMG') {
    t.style.display = 'none';
    if (t.parentElement) t.parentElement.style.background = 'linear-gradient(135deg, var(--bg-elev-1), var(--bg-elev-2))';
  }
}, true);

/* Init */
const initialHash = window.location.hash.slice(1);
if (initialHash) {
  const [name, id] = initialHash.split('/');
  state.route = { name, params: id ? { id } : {} };
}
render();
