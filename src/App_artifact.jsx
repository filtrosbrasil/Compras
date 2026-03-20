import { useState, useEffect, useCallback, useRef } from "react";

const ETAPAS = [
  { key: "orcamento", label: "Orçamento", short: "Orç" },
  { key: "aprovacao", label: "Aprovação", short: "Apr" },
  { key: "contrato", label: "Contrato", short: "Ctr" },
  { key: "contrato_assinado", label: "Assinado", short: "Ass" },
  { key: "pedido_colocado", label: "Pedido", short: "Ped" },
];

const CATEGORIAS = [
  { value: "uniformes", label: "Uniformes", color: "#6C5CE7", bg: "rgba(108,92,231,0.08)" },
  { value: "brindes", label: "Brindes e Kits", color: "#2B7FD4", bg: "rgba(43,127,212,0.08)" },
  { value: "impressos", label: "Mat. Impressos", color: "#E07800", bg: "rgba(224,120,0,0.08)" },
  { value: "comunicacao", label: "Com. Visual", color: "#0B1F3F", bg: "rgba(11,31,63,0.08)" },
  { value: "receptividade", label: "Receptividade", color: "#0FAA6E", bg: "rgba(15,170,110,0.08)" },
  { value: "infraestrutura", label: "Infraestrutura", color: "#E31E24", bg: "rgba(227,30,36,0.08)" },
];

const STATUS_EXTRA = [
  { value: "", label: "— Nenhum —", icon: "", color: "#94A0B8", bg: "transparent" },
  { value: "aguardando_layout", label: "Ag. Layout (Édy)", icon: "🎨", color: "#6C5CE7", bg: "rgba(108,92,231,0.08)" },
  { value: "aguardando_aprovacao_dir", label: "Ag. Aprov. Diretoria", icon: "👩‍💼", color: "#E31E24", bg: "rgba(227,30,36,0.08)" },
  { value: "aguardando_fornecedor", label: "Ag. Fornecedor", icon: "🏭", color: "#E07800", bg: "rgba(224,120,0,0.08)" },
  { value: "em_producao", label: "Em Produção", icon: "⚙️", color: "#2B7FD4", bg: "rgba(43,127,212,0.08)" },
  { value: "pronto_retirar", label: "Pronto p/ Retirar", icon: "📦", color: "#0FAA6E", bg: "rgba(15,170,110,0.08)" },
];

const EVENTOS = [
  { value: "convencao", label: "Conv.", color: "#0B1F3F", bg: "rgba(11,31,63,0.08)" },
  { value: "feira", label: "Feira", color: "#E31E24", bg: "rgba(227,30,36,0.08)" },
  { value: "ambos", label: "Ambos", color: "#E07800", bg: "rgba(224,120,0,0.08)" },
];

const RESPONSAVEIS = ["Maria Eduarda", "Brenda"];

const INITIAL_DATA = [
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

const STORAGE_KEY = "compras-fb-conv2026";

function getProg(d) { return ETAPAS.filter(e => d.etapas[e.key]).length / ETAPAS.length; }
function diasAte(p) { if (!p) return null; return Math.ceil((new Date(p+"T00:00:00") - new Date(new Date().toISOString().split("T")[0]+"T00:00:00")) / 86400000); }
function fmtData(d) { if (!d) return ""; const [,m,dia] = d.split("-"); return `${dia}/${m}`; }

function Badge({ label, color, bg }) {
  return <span style={{ display:"inline-block",padding:"2px 7px",borderRadius:4,fontSize:10,fontWeight:600,color,background:bg,border:`1px solid ${color}22`,whiteSpace:"nowrap" }}>{label}</span>;
}

function PipelineStep({ done, current, label, onClick }) {
  const bg = done ? "rgba(15,170,110,0.1)" : current ? "rgba(229,161,0,0.1)" : "#F5F6FA";
  const border = done ? "rgba(15,170,110,0.3)" : current ? "rgba(229,161,0,0.3)" : "#E2E6EE";
  const color = done ? "#0FAA6E" : current ? "#E5A100" : "#94A0B8";
  return (
    <div onClick={onClick} title={label} style={{ width:26,height:26,borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:600,cursor:"pointer",border:`1.5px solid ${border}`,background:bg,color,transition:"transform 0.15s",flexShrink:0 }}
      onMouseEnter={e=>e.currentTarget.style.transform="scale(1.15)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
      {done ? "✓" : label[0]}
    </div>
  );
}

function ResponsavelInline({ value, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ background:"transparent",border:"1px solid transparent",borderRadius:4,padding:"2px 4px",fontSize:11,fontWeight:500,color:"#0B1F3F",cursor:"pointer",fontFamily:"inherit",maxWidth:90,appearance:"auto" }}
      onFocus={e=>e.target.style.borderColor="#E2E6EE"} onBlur={e=>e.target.style.borderColor="transparent"}>
      {RESPONSAVEIS.map(r => <option key={r} value={r}>{r.split(" ")[0]}</option>)}
    </select>
  );
}

export default function App() {
  const [demandas, setDemandas] = useState(INITIAL_DATA);
  const [loaded, setLoaded] = useState(false);
  const [filters, setFilters] = useState({ cat: "todos", evt: "todos", resp: "todos", sit: "todos", q: "" });
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [view, setView] = useState("table"); // table | cards
  const toastTimer = useRef(null);

  // LOAD from shared storage
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(STORAGE_KEY, true);
        if (r && r.value) { setDemandas(JSON.parse(r.value)); }
      } catch (e) { /* first load, use defaults */ }
      setLoaded(true);
    })();
  }, []);

  // SAVE to shared storage
  const save = useCallback(async (data) => {
    setDemandas(data);
    try { await window.storage.set(STORAGE_KEY, JSON.stringify(data), true); } catch (e) {}
  }, []);

  const flash = (msg) => { setToast(msg); clearTimeout(toastTimer.current); toastTimer.current = setTimeout(() => setToast(""), 3000); };

  const toggleEtapa = (id, key) => {
    const next = demandas.map(d => {
      if (d.id !== id) return d;
      const ei = ETAPAS.findIndex(e => e.key === key);
      const newE = { ...d.etapas };
      if (newE[key]) { for (let i = ei; i < ETAPAS.length; i++) newE[ETAPAS[i].key] = false; }
      else { for (let i = 0; i <= ei; i++) newE[ETAPAS[i].key] = true; }
      return { ...d, etapas: newE };
    });
    save(next);
  };

  const changeResp = (id, val) => { save(demandas.map(d => d.id === id ? { ...d, responsavel: val } : d)); };

  const filtered = demandas.filter(d => {
    if (filters.cat !== "todos" && d.categoria !== filters.cat) return false;
    if (filters.evt !== "todos" && d.evento !== filters.evt) return false;
    if (filters.resp !== "todos" && d.responsavel !== filters.resp) return false;
    if (filters.sit !== "todos" && (d.status_extra || "") !== filters.sit) return false;
    if (filters.q) { const q = filters.q.toLowerCase(); if (!d.item.toLowerCase().includes(q) && !(d.fornecedor||"").toLowerCase().includes(q)) return false; }
    return true;
  });

  const stats = {
    total: demandas.length,
    concluidos: demandas.filter(d => getProg(d) === 1).length,
    andamento: demandas.filter(d => { const p = getProg(d); return p > 0 && p < 1; }).length,
    pendentes: demandas.filter(d => getProg(d) === 0).length,
    atrasados: demandas.filter(d => getProg(d) < 1 && d.prazo && diasAte(d.prazo) < 0).length,
  };

  const sitCounts = {};
  STATUS_EXTRA.filter(s => s.value).forEach(s => { sitCounts[s.value] = demandas.filter(d => (d.status_extra || "") === s.value && getProg(d) < 1).length; });

  const saveModal = (form) => {
    if (!form.item.trim()) return alert("Preencha o item!");
    if (form.id) {
      save(demandas.map(d => d.id === form.id ? { ...d, ...form } : d));
      flash("Demanda atualizada");
    } else {
      save([...demandas, { ...form, id: Date.now().toString(), etapas: { orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false } }]);
      flash("Demanda adicionada");
    }
    setModal(null);
  };

  const excluir = (id) => { if (confirm("Excluir esta demanda?")) { save(demandas.filter(d => d.id !== id)); flash("Excluída"); } };

  if (!loaded) return <div style={{ display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#F2F4F7",color:"#0B1F3F",fontFamily:"Amplesoft,Nunito,sans-serif",fontSize:16,fontWeight:500 }}>Carregando dados...</div>;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div style={{ fontFamily:"Amplesoft,Nunito,Segoe UI,sans-serif",background:"#F2F4F7",minHeight:"100vh",color:"#0B1F3F" }}>
      {/* HEADER */}
      <div style={{ background:"#0B1F3F",padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"space-between",height:56,position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px rgba(11,31,63,0.25)" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ width:32,height:32,background:"#E31E24",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"white" }}>éFBe</div>
          <div>
            <div style={{ color:"white",fontSize:15,fontWeight:600 }}>Controle de <span style={{ color:"#FF4D52" }}>Compras</span></div>
            {!isMobile && <div style={{ fontSize:9,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:2 }}>Convenção & Feira 2026</div>}
          </div>
        </div>
        <div style={{ display:"flex",gap:6,alignItems:"center" }}>
          {!isMobile && <button onClick={() => setView(v => v === "table" ? "cards" : "table")} style={{ padding:"7px 14px",borderRadius:6,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.85)",fontFamily:"inherit",fontSize:12,fontWeight:500,cursor:"pointer" }}>{view === "table" ? "📱 Cards" : "📊 Tabela"}</button>}
          <button onClick={() => setModal({ item:"",categoria:"brindes",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:"",notas:"",status_extra:"",prazo:"" })} style={{ padding:"7px 14px",borderRadius:6,border:"1px solid #E31E24",background:"#E31E24",color:"white",fontFamily:"inherit",fontSize:12,fontWeight:600,cursor:"pointer" }}>＋ Nova</button>
        </div>
      </div>
      <div style={{ height:4,background:"linear-gradient(90deg,#E31E24 0%,#E31E24 30%,#15335E 100%)" }} />

      {/* STATS */}
      <div style={{ display:"grid",gridTemplateColumns:isMobile?"repeat(3,1fr)":"repeat(5,1fr)",gap:8,padding:"12px 16px" }}>
        {[
          { n: stats.total, l: "Total", c: "#0B1F3F" },
          { n: stats.concluidos, l: "Concluídos", c: "#0FAA6E" },
          { n: stats.andamento, l: "Andamento", c: "#E5A100" },
          { n: stats.pendentes, l: "Pendentes", c: "#E31E24" },
          { n: stats.atrasados, l: "⚠ Atrasados", c: "#E31E24" },
        ].map((s, i) => (
          <div key={i} style={{ background:"white",borderRadius:8,padding:"10px 12px",textAlign:"center",border:"1px solid #E2E6EE",boxShadow:"0 1px 3px rgba(11,31,63,0.06)" }}>
            <div style={{ fontSize:22,fontWeight:700,color:s.c }}>{s.n}</div>
            <div style={{ fontSize:8,color:"#5A6A85",textTransform:"uppercase",letterSpacing:1,fontWeight:500,marginTop:2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* SITUATION COUNTERS */}
      <div style={{ padding:"0 16px 8px",display:"flex",gap:6,flexWrap:"wrap" }}>
        {STATUS_EXTRA.filter(s => s.value).map(s => {
          const cnt = sitCounts[s.value] || 0;
          const active = filters.sit === s.value;
          return (
            <div key={s.value} onClick={() => setFilters(f => ({ ...f, sit: f.sit === s.value ? "todos" : s.value }))}
              style={{ display:"flex",alignItems:"center",gap:5,padding:"5px 10px",borderRadius:16,background:active?"rgba(11,31,63,0.06)":"white",border:`1px solid ${active?"#0B1F3F":"#E2E6EE"}`,fontSize:10,fontWeight:500,color:active?"#0B1F3F":"#5A6A85",cursor:"pointer",whiteSpace:"nowrap" }}>
              {s.icon} {s.label.split("(")[0].trim()}
              <span style={{ background:s.bg,color:s.color,padding:"1px 6px",borderRadius:8,fontSize:9,fontWeight:700,minWidth:18,textAlign:"center" }}>{cnt}</span>
            </div>
          );
        })}
        {filters.sit !== "todos" && <div onClick={() => setFilters(f => ({ ...f, sit: "todos" }))} style={{ padding:"5px 10px",borderRadius:16,border:"1px solid rgba(227,30,36,0.2)",fontSize:10,fontWeight:500,color:"#E31E24",cursor:"pointer" }}>✕</div>}
      </div>

      {/* FILTERS */}
      <div style={{ padding:"0 16px 12px",display:"flex",gap:8,flexWrap:"wrap",alignItems:"center" }}>
        <div style={{ display:"flex",gap:3,background:"white",padding:"4px 5px 4px 10px",borderRadius:20,border:"1px solid #E2E6EE",alignItems:"center" }}>
          <span style={{ fontSize:8,fontWeight:600,textTransform:"uppercase",letterSpacing:1.2,color:"#94A0B8",paddingRight:6,borderRight:"1px solid #E2E6EE",marginRight:3 }}>Tipo</span>
          {[{ value: "todos", label: "Todos" }, ...CATEGORIAS].map(c => (
            <button key={c.value} onClick={() => setFilters(f => ({ ...f, cat: c.value }))}
              style={{ padding:"4px 10px",borderRadius:14,border:"none",background:filters.cat===c.value?"#0B1F3F":"transparent",color:filters.cat===c.value?"white":"#5A6A85",fontFamily:"inherit",fontSize:10,fontWeight:500,cursor:"pointer" }}>{c.label}</button>
          ))}
        </div>
        <div style={{ display:"flex",gap:3,background:"white",padding:"4px 5px 4px 10px",borderRadius:20,border:"1px solid #E2E6EE",alignItems:"center" }}>
          <span style={{ fontSize:8,fontWeight:600,textTransform:"uppercase",letterSpacing:1.2,color:"#94A0B8",paddingRight:6,borderRight:"1px solid #E2E6EE",marginRight:3 }}>Resp.</span>
          <button onClick={() => setFilters(f => ({ ...f, resp: "todos" }))} style={{ padding:"4px 10px",borderRadius:14,border:"none",background:filters.resp==="todos"?"#0B1F3F":"transparent",color:filters.resp==="todos"?"white":"#5A6A85",fontFamily:"inherit",fontSize:10,fontWeight:500,cursor:"pointer" }}>Todas</button>
          {RESPONSAVEIS.map(r => (
            <button key={r} onClick={() => setFilters(f => ({ ...f, resp: r }))}
              style={{ padding:"4px 10px",borderRadius:14,border:"none",background:filters.resp===r?"#E31E24":"transparent",color:filters.resp===r?"white":"#5A6A85",fontFamily:"inherit",fontSize:10,fontWeight:500,cursor:"pointer" }}>{r.split(" ")[0]}</button>
          ))}
        </div>
        <div style={{ flex:1 }} />
        <input placeholder="🔍 Buscar..." value={filters.q} onChange={e => setFilters(f => ({ ...f, q: e.target.value }))}
          style={{ padding:"7px 14px",borderRadius:16,border:"1px solid #E2E6EE",background:"white",color:"#0B1F3F",fontFamily:"inherit",fontSize:12,width:isMobile?140:200,outline:"none" }} />
      </div>

      {/* CONTENT - CARDS (mobile) or TABLE */}
      <div style={{ padding:"0 16px 32px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign:"center",padding:60,color:"#94A0B8" }}>📦 Nenhuma demanda encontrada</div>
        ) : (isMobile || view === "cards") ? (
          <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
            {filtered.map(d => {
              const prog = getProg(d), pct = Math.round(prog * 100), dias = diasAte(d.prazo), isDone = prog === 1;
              const isOverdue = !isDone && dias !== null && dias < 0;
              const isSoon = !isDone && dias !== null && dias >= 0 && dias <= 7;
              const cat = CATEGORIAS.find(c => c.value === d.categoria);
              const se = STATUS_EXTRA.find(s => s.value === (d.status_extra || ""));
              const ea = ETAPAS.findIndex((_, i) => !d.etapas[ETAPAS[i].key]);
              return (
                <div key={d.id} style={{ background:"white",borderRadius:10,padding:14,border:`1px solid ${isOverdue?"rgba(227,30,36,0.2)":"#E2E6EE"}`,boxShadow:"0 1px 4px rgba(11,31,63,0.06)",borderLeft:isOverdue?"3px solid #E31E24":"3px solid transparent" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8 }}>
                    <div>
                      <div style={{ fontWeight:600,fontSize:13,marginBottom:4 }}>{d.item}</div>
                      <div style={{ display:"flex",gap:4,flexWrap:"wrap" }}>
                        <Badge label={cat?.label||d.categoria} color={cat?.color||"#666"} bg={cat?.bg||"#f0f0f0"} />
                        {(() => { const ev = EVENTOS.find(e => e.value === d.evento); return ev ? <Badge label={ev.label} color={ev.color} bg={ev.bg} /> : null; })()}
                      </div>
                    </div>
                    <div style={{ display:"flex",gap:4 }}>
                      <button onClick={() => setModal(d)} style={{ width:28,height:28,borderRadius:6,border:"none",background:"#F5F6FA",cursor:"pointer",fontSize:12 }}>✏️</button>
                      <button onClick={() => excluir(d.id)} style={{ width:28,height:28,borderRadius:6,border:"none",background:"#F5F6FA",cursor:"pointer",fontSize:12 }}>🗑</button>
                    </div>
                  </div>

                  {se?.value && <div style={{ marginBottom:8 }}><Badge label={`${se.icon} ${se.label}`} color={se.color} bg={se.bg} /></div>}

                  <div style={{ display:"flex",alignItems:"center",gap:4,marginBottom:8 }}>
                    <span style={{ fontSize:10,color:"#5A6A85",marginRight:4 }}>Resp:</span>
                    <ResponsavelInline value={d.responsavel} onChange={v => changeResp(d.id, v)} />
                    <span style={{ width:8,height:8,borderRadius:"50%",background:d.urgencia==="alta"?"#E31E24":d.urgencia==="media"?"#E5A100":"#0FAA6E",marginLeft:6 }} />
                    {d.prazo && <span style={{ fontSize:10,fontWeight:500,marginLeft:"auto",color:isOverdue?"#E31E24":isSoon?"#E07800":"#5A6A85" }}>{isOverdue?"⚠":""}  {fmtData(d.prazo)} {isOverdue?`(${Math.abs(dias)}d atraso)`:isSoon?`(${dias}d)`:""}</span>}
                  </div>

                  <div style={{ display:"flex",gap:3,alignItems:"center" }}>
                    {ETAPAS.map((e, ei) => (
                      <PipelineStep key={e.key} done={d.etapas[e.key]} current={ei === (ea===-1?ETAPAS.length:ea)} label={e.short} onClick={() => toggleEtapa(d.id, e.key)} />
                    ))}
                    <span style={{ fontSize:11,fontWeight:500,color:pct===100?"#0FAA6E":"#5A6A85",marginLeft:6 }}>{pct}%</span>
                  </div>

                  {d.notas && <div style={{ marginTop:8,fontSize:10,color:"#5A6A85",background:"#F5F6FA",padding:"4px 8px",borderRadius:4 }}>💬 {d.notas}</div>}
                </div>
              );
            })}
          </div>
        ) : (
          /* DESKTOP TABLE */
          <div style={{ overflowX:"auto",borderRadius:10,border:"1px solid #E2E6EE",boxShadow:"0 4px 16px rgba(11,31,63,0.08)" }}>
            <table style={{ width:"100%",borderCollapse:"collapse",background:"white",fontSize:12 }}>
              <thead>
                <tr style={{ background:"#F5F6FA" }}>
                  {["Item","Tipo","Evento","Resp.","Urg.","Prazo","Situação","Pipeline","%",""].map((h,i) => (
                    <th key={i} style={{ padding:"10px 10px",textAlign:"left",fontSize:9,fontWeight:600,textTransform:"uppercase",letterSpacing:1.2,color:"#94A0B8",borderBottom:"2px solid #E2E6EE",whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(d => {
                  const prog = getProg(d), pct = Math.round(prog * 100), dias = diasAte(d.prazo), isDone = prog === 1;
                  const isOverdue = !isDone && dias !== null && dias < 0;
                  const isSoon = !isDone && dias !== null && dias >= 0 && dias <= 7;
                  const cat = CATEGORIAS.find(c => c.value === d.categoria);
                  const evt = EVENTOS.find(e => e.value === d.evento);
                  const se = STATUS_EXTRA.find(s => s.value === (d.status_extra || ""));
                  const ea = ETAPAS.findIndex((_, i) => !d.etapas[ETAPAS[i].key]);
                  const pc = prog===1?"#0FAA6E":prog>=0.6?"#E5A100":prog>=0.2?"#E07800":"#E31E24";
                  return (
                    <tr key={d.id} style={{ background:isOverdue?"rgba(227,30,36,0.03)":"transparent",borderBottom:"1px solid #E2E6EE",transition:"background 0.1s" }}
                      onMouseEnter={e=>{ if(!isOverdue) e.currentTarget.style.background="rgba(11,31,63,0.02)"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.background=isOverdue?"rgba(227,30,36,0.03)":"transparent"; }}>
                      <td style={{ padding:"10px",maxWidth:200 }}>
                        <span style={{ fontSize:12,fontWeight:600 }}>{d.item}</span>
                        {d.notas && <span title={d.notas} style={{ marginLeft:3,opacity:0.5,fontSize:11,cursor:"help" }}>💬</span>}
                      </td>
                      <td><Badge label={cat?.label||""} color={cat?.color||"#666"} bg={cat?.bg||"#f0f0f0"} /></td>
                      <td><Badge label={evt?.label||""} color={evt?.color||"#666"} bg={evt?.bg||"#f0f0f0"} /></td>
                      <td><ResponsavelInline value={d.responsavel} onChange={v => changeResp(d.id, v)} /></td>
                      <td><span style={{ width:8,height:8,borderRadius:"50%",display:"inline-block",background:d.urgencia==="alta"?"#E31E24":d.urgencia==="media"?"#E5A100":"#0FAA6E" }} /></td>
                      <td style={{ fontSize:11,fontWeight:isDone?400:500,color:isDone?"#0FAA6E":isOverdue?"#E31E24":isSoon?"#E07800":"#5A6A85",whiteSpace:"nowrap",textDecoration:isDone?"line-through":"none",opacity:isDone?0.6:1 }}>
                        {d.prazo ? `${isOverdue?"⚠ ":""}${fmtData(d.prazo)}${isOverdue?` (${Math.abs(dias)}d)`:""}` : "—"}
                      </td>
                      <td>{se?.value ? <Badge label={`${se.icon} ${se.label}`} color={se.color} bg={se.bg} /> : <span style={{ color:"#94A0B8",fontSize:10 }}>—</span>}</td>
                      <td>
                        <div style={{ display:"flex",gap:2,alignItems:"center" }}>
                          {ETAPAS.map((e, ei) => (
                            <PipelineStep key={e.key} done={d.etapas[e.key]} current={ei===(ea===-1?ETAPAS.length:ea)} label={e.short} onClick={() => toggleEtapa(d.id, e.key)} />
                          ))}
                        </div>
                      </td>
                      <td>
                        <div style={{ display:"flex",alignItems:"center",gap:4 }}>
                          <div style={{ width:40,height:4,background:"#E2E6EE",borderRadius:2,overflow:"hidden" }}>
                            <div style={{ width:`${pct}%`,height:"100%",background:pc,borderRadius:2,transition:"width 0.4s" }} />
                          </div>
                          <span style={{ fontSize:10,color:"#5A6A85",fontWeight:500 }}>{pct}%</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display:"flex",gap:2 }}>
                          <button onClick={() => setModal(d)} style={{ width:26,height:26,borderRadius:5,border:"none",background:"transparent",cursor:"pointer",fontSize:11,color:"#5A6A85" }}>✏️</button>
                          <button onClick={() => excluir(d.id)} style={{ width:26,height:26,borderRadius:5,border:"none",background:"transparent",cursor:"pointer",fontSize:11,color:"#5A6A85" }}>🗑</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL */}
      {modal && <ModalForm data={modal} onSave={saveModal} onClose={() => setModal(null)} />}

      {/* TOAST */}
      {toast && <div style={{ position:"fixed",bottom:20,right:20,background:"#0B1F3F",color:"white",padding:"10px 18px",borderRadius:8,fontSize:13,fontWeight:500,boxShadow:"0 8px 32px rgba(11,31,63,0.2)",zIndex:2000,animation:"fadeIn 0.3s" }}>✓ {toast}</div>}

      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

function ModalForm({ data, onSave, onClose }) {
  const [form, setForm] = useState({ ...data });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const inputStyle = { width:"100%",padding:"9px 10px",borderRadius:6,border:"1px solid #E2E6EE",background:"#F2F4F7",color:"#0B1F3F",fontFamily:"inherit",fontSize:13,outline:"none" };
  const labelStyle = { display:"block",fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:1,color:"#5A6A85",marginBottom:4 };
  return (
    <div onClick={onClose} style={{ position:"fixed",inset:0,background:"rgba(11,31,63,0.4)",backdropFilter:"blur(6px)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background:"white",borderRadius:10,padding:isMobile?20:28,width:isMobile?"100%":520,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 8px 32px rgba(11,31,63,0.12)" }}>
        <h2 style={{ fontSize:18,fontWeight:700,marginBottom:16,color:"#0B1F3F" }}>{form.id ? "✏️ Editar" : "＋ Nova"} <span style={{ color:"#E31E24" }}>Demanda</span></h2>
        <div style={{ marginBottom:12 }}><label style={labelStyle}>Item</label><input style={inputStyle} value={form.item} onChange={e => set("item",e.target.value)} placeholder="Nome do item" /></div>
        <div style={{ display:"flex",gap:10,marginBottom:12 }}>
          <div style={{ flex:1 }}><label style={labelStyle}>Tipo</label><select style={inputStyle} value={form.categoria} onChange={e => set("categoria",e.target.value)}>{CATEGORIAS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}</select></div>
          <div style={{ flex:1 }}><label style={labelStyle}>Evento</label><select style={inputStyle} value={form.evento} onChange={e => set("evento",e.target.value)}>{EVENTOS.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}</select></div>
        </div>
        <div style={{ display:"flex",gap:10,marginBottom:12 }}>
          <div style={{ flex:1 }}><label style={labelStyle}>Fornecedor</label><input style={inputStyle} value={form.fornecedor} onChange={e => set("fornecedor",e.target.value)} /></div>
          <div style={{ flex:1 }}><label style={labelStyle}>Responsável</label><select style={inputStyle} value={form.responsavel} onChange={e => set("responsavel",e.target.value)}>{RESPONSAVEIS.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
        </div>
        <div style={{ display:"flex",gap:10,marginBottom:12 }}>
          <div style={{ flex:1 }}><label style={labelStyle}>Urgência</label><select style={inputStyle} value={form.urgencia} onChange={e => set("urgencia",e.target.value)}><option value="alta">🔴 Alta</option><option value="media">🟡 Média</option><option value="baixa">🟢 Baixa</option></select></div>
          <div style={{ flex:1 }}><label style={labelStyle}>Prazo</label><input type="date" style={inputStyle} value={form.prazo||""} onChange={e => set("prazo",e.target.value)} /></div>
        </div>
        <div style={{ display:"flex",gap:10,marginBottom:12 }}>
          <div style={{ flex:1 }}><label style={labelStyle}>Valor (R$)</label><input type="number" style={inputStyle} value={form.valor||""} onChange={e => set("valor",parseFloat(e.target.value)||0)} /></div>
          <div style={{ flex:1 }}><label style={labelStyle}>Situação</label><select style={inputStyle} value={form.status_extra||""} onChange={e => set("status_extra",e.target.value)}>{STATUS_EXTRA.map(s => <option key={s.value} value={s.value}>{s.value ? `${s.icon} ${s.label}` : s.label}</option>)}</select></div>
        </div>
        <div style={{ marginBottom:16 }}><label style={labelStyle}>Observações</label><textarea style={{ ...inputStyle,minHeight:50,resize:"vertical" }} value={form.notas||""} onChange={e => set("notas",e.target.value)} /></div>
        <div style={{ display:"flex",gap:8,justifyContent:"flex-end",paddingTop:14,borderTop:"1px solid #E2E6EE" }}>
          <button onClick={onClose} style={{ padding:"9px 18px",borderRadius:6,border:"1px solid #E2E6EE",background:"white",color:"#0B1F3F",fontFamily:"inherit",fontSize:13,fontWeight:500,cursor:"pointer" }}>Cancelar</button>
          <button onClick={() => onSave(form)} style={{ padding:"9px 18px",borderRadius:6,border:"none",background:"#E31E24",color:"white",fontFamily:"inherit",fontSize:13,fontWeight:600,cursor:"pointer" }}>{form.id ? "Salvar" : "Adicionar"}</button>
        </div>
      </div>
    </div>
  );
}
