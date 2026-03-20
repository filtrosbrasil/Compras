export const ETAPAS = [
  { key: "orcamento", label: "Orçamento", short: "Orç" },
  { key: "aprovacao", label: "Aprovação", short: "Apr" },
  { key: "contrato", label: "Contrato", short: "Ctr" },
  { key: "contrato_assinado", label: "Assinado", short: "Ass" },
  { key: "pedido_colocado", label: "Pedido", short: "Ped" },
];

export const CATEGORIAS = [
  { value: "uniformes", label: "Uniformes", color: "#6C5CE7", bg: "rgba(108,92,231,0.08)" },
  { value: "brindes", label: "Brindes e Kits", color: "#2B7FD4", bg: "rgba(43,127,212,0.08)" },
  { value: "impressos", label: "Mat. Impressos", color: "#E07800", bg: "rgba(224,120,0,0.08)" },
  { value: "comunicacao", label: "Com. Visual", color: "#0B1F3F", bg: "rgba(11,31,63,0.08)" },
  { value: "receptividade", label: "Receptividade", color: "#0FAA6E", bg: "rgba(15,170,110,0.08)" },
  { value: "infraestrutura", label: "Infraestrutura", color: "#E31E24", bg: "rgba(227,30,36,0.08)" },
];

export const STATUS_EXTRA = [
  { value: "", label: "— Nenhum —", icon: "", color: "#94A0B8", bg: "transparent" },
  { value: "aguardando_layout", label: "Ag. Layout (Édy)", icon: "🎨", color: "#6C5CE7", bg: "rgba(108,92,231,0.08)" },
  { value: "aguardando_aprovacao_dir", label: "Ag. Aprov. Diretoria", icon: "👩‍💼", color: "#E31E24", bg: "rgba(227,30,36,0.08)" },
  { value: "aguardando_fornecedor", label: "Ag. Fornecedor", icon: "🏭", color: "#E07800", bg: "rgba(224,120,0,0.08)" },
  { value: "em_producao", label: "Em Produção", icon: "⚙️", color: "#2B7FD4", bg: "rgba(43,127,212,0.08)" },
  { value: "pronto_retirar", label: "Pronto p/ Retirar", icon: "📦", color: "#0FAA6E", bg: "rgba(15,170,110,0.08)" },
];

export const EVENTOS = [
  { value: "convencao", label: "Conv.", color: "#0B1F3F", bg: "rgba(11,31,63,0.08)" },
  { value: "feira", label: "Feira", color: "#E31E24", bg: "rgba(227,30,36,0.08)" },
  { value: "ambos", label: "Ambos", color: "#E07800", bg: "rgba(224,120,0,0.08)" },
];

export const RESPONSAVEIS = ["Maria Eduarda", "Brenda"];

export const INITIAL_DATA = [
  {id:"1",item:"Polo Institucional",categoria:"uniformes",evento:"ambos",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"alta",valor:0,notas:"Receber peça conceito MV",status_extra:"aguardando_layout",prazo:"2026-04-01",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"2",item:"Camiseta Institucional | MV",categoria:"uniformes",evento:"ambos",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"",status_extra:"aguardando_layout",prazo:"2026-04-01",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"3",item:"Camiseta Promotoria Troca Premiada",categoria:"uniformes",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"media",valor:0,notas:"",status_extra:"aguardando_layout",prazo:"2026-04-01",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"4",item:"Mochila",categoria:"brindes",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"alta",valor:0,notas:"Qtd: 50/50/60/80",status_extra:"aguardando_layout",prazo:"2026-04-07",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"5",item:"Caneta (Feira/Trade)",categoria:"brindes",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"alta",valor:0,notas:"Qtd: 5000/8000/10000/12000",status_extra:"",prazo:"2026-04-07",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"6",item:"Caneta Melhor (Convenção)",categoria:"brindes",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"Qtd: 60/100/150/200",status_extra:"",prazo:"2026-04-07",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"7",item:"Garrafa Térmica",categoria:"brindes",evento:"convencao",fornecedor:"",responsavel:"Brenda",urgencia:"media",valor:0,notas:"Qtd: 50",status_extra:"",prazo:"2026-04-14",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"8",item:"Caderno de Anotações",categoria:"brindes",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"Ref caderno pardo. Qtd: 50/100/200/300",status_extra:"",prazo:"2026-04-14",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"9",item:"Chaveiro (Feira/Trade)",categoria:"brindes",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"alta",valor:0,notas:"Qtd: 5000/8000/10000/12000",status_extra:"",prazo:"2026-04-07",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"10",item:"Sacola",categoria:"brindes",evento:"ambos",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"Qtd: 100",status_extra:"",prazo:"2026-04-14",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"11",item:"Boné (Projeto Trade)",categoria:"brindes",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"alta",valor:0,notas:"2 bordados/1 silk. Qtd: 100/300/500/800",status_extra:"",prazo:"2026-04-07",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"12",item:"Aromatizador Cheirinho Carro",categoria:"brindes",evento:"ambos",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"alta",valor:0,notas:"6x6cm. Qtd: 2000/3000/5000/6000",status_extra:"",prazo:"2026-04-07",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"13",item:"Cordão Crachá",categoria:"brindes",evento:"convencao",fornecedor:"",responsavel:"Brenda",urgencia:"media",valor:0,notas:"Qtd: 50",status_extra:"",prazo:"2026-04-14",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"14",item:"Boton Máquina de Vendas",categoria:"brindes",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"baixa",valor:0,notas:"4x4cm. Qtd: 50",status_extra:"aguardando_layout",prazo:"2026-04-21",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"15",item:"Saquinho de Lixo",categoria:"brindes",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"media",valor:0,notas:"21x30cm. Qtd: 5000/8000/10000/12000",status_extra:"",prazo:"2026-04-14",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"16",item:"Copo Promocional Festa éFBe",categoria:"brindes",evento:"feira",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"Qtd: 200/300",status_extra:"",prazo:"2026-04-14",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"17",item:"Régua Flexível",categoria:"brindes",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"media",valor:0,notas:"Ref MaxGear. Qtd: 1000/2000/3000/5000",status_extra:"",prazo:"2026-04-14",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"18",item:"Troféu Recordes Representantes",categoria:"brindes",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"Ref 2024. Qtd: 5",status_extra:"aguardando_layout",prazo:"2026-04-21",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"19",item:"Embalagem Kit Ativação",categoria:"brindes",evento:"feira",fornecedor:"",responsavel:"Brenda",urgencia:"media",valor:0,notas:"Trabalhar briefing",status_extra:"aguardando_layout",prazo:"2026-04-14",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"20",item:"Crachá Convidado",categoria:"impressos",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"Ref 2024. Qtd: 50",status_extra:"aguardando_layout",prazo:"2026-04-21",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"21",item:"Convite com Cronograma",categoria:"impressos",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"Fechar cronograma. Qtd: 50",status_extra:"aguardando_layout",prazo:"2026-04-21",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"22",item:"Catálogo de Lançamentos",categoria:"impressos",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"alta",valor:0,notas:"A3 c/ dobra. Qtd: 1000/3000/5000/6000",status_extra:"",prazo:"2026-04-07",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"23",item:"Flyer Lançamento Kits",categoria:"impressos",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"alta",valor:0,notas:"Qtd: 3000/5000/6000/8000",status_extra:"",prazo:"2026-04-07",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"24",item:"Flyer Institucional",categoria:"impressos",evento:"ambos",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"A4 2 dobras. Qtd: 3000/5000/6000/8000",status_extra:"",prazo:"2026-04-14",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"25",item:"Cartões de Visita",categoria:"impressos",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"baixa",valor:0,notas:"Padrão atual. Qtd: 50/100/150",status_extra:"",prazo:"2026-04-21",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"26",item:"Adesivos PDV",categoria:"impressos",evento:"ambos",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"Fechado c/ Filtros. Qtd: 5000",status_extra:"",prazo:"2026-04-14",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"27",item:"Banners Entrada Convenção (2)",categoria:"comunicacao",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"alta",valor:0,notas:"",status_extra:"aguardando_layout",prazo:"2026-04-14",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"28",item:"Banners Interno Telão (2)",categoria:"comunicacao",evento:"convencao",fornecedor:"",responsavel:"Brenda",urgencia:"alta",valor:0,notas:"",status_extra:"aguardando_layout",prazo:"2026-04-14",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"29",item:"Backdrop Coffee/Fotos",categoria:"comunicacao",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"alta",valor:0,notas:"",status_extra:"aguardando_layout",prazo:"2026-04-14",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"30",item:"Letreiro Logo - Reformar",categoria:"comunicacao",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"media",valor:0,notas:"Avaliar e reformar",status_extra:"",prazo:"2026-04-21",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"31",item:"Kit Cartão com Doce",categoria:"receptividade",evento:"convencao",fornecedor:"",responsavel:"Brenda",urgencia:"media",valor:0,notas:"Qtd: 50",status_extra:"aguardando_layout",prazo:"2026-04-21",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"32",item:"Hotel Hosp./Alim./Auditório",categoria:"infraestrutura",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"alta",valor:0,notas:"80% concluído",status_extra:"aguardando_aprovacao_dir",prazo:"2026-03-28",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
];
