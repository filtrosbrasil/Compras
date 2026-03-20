import { useState, useEffect, useCallback, useRef } from "react";

const ETAPAS = [
  { key: "orcamento", label: "Orçamento" },
  { key: "aprovacao", label: "Aprovação" },
  { key: "contrato", label: "Contrato" },
  { key: "contrato_assinado", label: "Assinado" },
  { key: "pedido_colocado", label: "Pedido" },
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
  { value: "enviado", label: "Enviado", icon: "🚚", color: "#0891B2", bg: "rgba(8,145,178,0.08)" },
  { value: "entregue", label: "Entregue", icon: "✅", color: "#0FAA6E", bg: "rgba(15,170,110,0.08)" },
];

const EVENTOS = [
  { value: "convencao", label: "Conv.", color: "#0B1F3F", bg: "rgba(11,31,63,0.08)" },
  { value: "feira", label: "Feira", color: "#E31E24", bg: "rgba(227,30,36,0.08)" },
  { value: "ambos", label: "Ambos", color: "#E07800", bg: "rgba(224,120,0,0.08)" },
];

const RESPONSAVEIS = ["Maria Eduarda", "Brenda"];

const INITIAL_DATA = [
  {id:"1",item:"Polo Institucional",categoria:"uniformes",evento:"ambos",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"alta",valor:0,notas:"Receber peça conceito MV",status_extra:"aguardando_layout",prazo:"2026-04-01",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"2",item:"Camiseta Institucional | MV",categoria:"uniformes",evento:"ambos",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"",status_extra:"aguardando_layout",prazo:"2026-04-01",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"3",item:"Camiseta Promotoria Troca Premiada",categoria:"uniformes",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"media",valor:0,notas:"",status_extra:"aguardando_layout",prazo:"2026-04-01",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"4",item:"Mochila",categoria:"brindes",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"alta",valor:0,notas:"Qtd: 50/50/60/80",status_extra:"aguardando_layout",prazo:"2026-04-07",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"5",item:"Caneta (Feira/Trade)",categoria:"brindes",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"alta",valor:0,notas:"Qtd: 5000/8000/10000/12000",status_extra:"",prazo:"2026-04-07",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"6",item:"Caneta Melhor (Convenção)",categoria:"brindes",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"Qtd: 60/100/150/200",status_extra:"",prazo:"2026-04-07",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"7",item:"Garrafa Térmica",categoria:"brindes",evento:"convencao",fornecedor:"",responsavel:"Brenda",urgencia:"media",valor:0,notas:"Qtd: 50",status_extra:"",prazo:"2026-04-14",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"8",item:"Caderno de Anotações",categoria:"brindes",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"Ref caderno pardo. Qtd: 50/100/200/300",status_extra:"",prazo:"2026-04-14",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"9",item:"Chaveiro (Feira/Trade)",categoria:"brindes",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"alta",valor:0,notas:"Qtd: 5000/8000/10000/12000",status_extra:"",prazo:"2026-04-07",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"10",item:"Sacola",categoria:"brindes",evento:"ambos",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"Qtd: 100",status_extra:"",prazo:"2026-04-14",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"11",item:"Boné (Projeto Trade)",categoria:"brindes",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"alta",valor:0,notas:"2 bordados/1 silk. Qtd: 100/300/500/800",status_extra:"",prazo:"2026-04-07",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"12",item:"Aromatizador Cheirinho Carro",categoria:"brindes",evento:"ambos",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"alta",valor:0,notas:"6x6cm. Qtd: 2000/3000/5000/6000",status_extra:"",prazo:"2026-04-07",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"13",item:"Cordão Crachá",categoria:"brindes",evento:"convencao",fornecedor:"",responsavel:"Brenda",urgencia:"media",valor:0,notas:"Qtd: 50",status_extra:"",prazo:"2026-04-14",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"14",item:"Boton Máquina de Vendas",categoria:"brindes",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"baixa",valor:0,notas:"4x4cm. Qtd: 50",status_extra:"aguardando_layout",prazo:"2026-04-21",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"15",item:"Saquinho de Lixo",categoria:"brindes",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"media",valor:0,notas:"21x30cm. Qtd: 5000/8000/10000/12000",status_extra:"",prazo:"2026-04-14",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"16",item:"Copo Promocional Festa éFBe",categoria:"brindes",evento:"feira",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"Qtd: 200/300",status_extra:"",prazo:"2026-04-14",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"17",item:"Régua Flexível",categoria:"brindes",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"media",valor:0,notas:"Ref MaxGear. Qtd: 1000/2000/3000/5000",status_extra:"",prazo:"2026-04-14",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"18",item:"Troféu Recordes Representantes",categoria:"brindes",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"Ref 2024. Qtd: 5",status_extra:"aguardando_layout",prazo:"2026-04-21",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"19",item:"Embalagem Kit Ativação",categoria:"brindes",evento:"feira",fornecedor:"",responsavel:"Brenda",urgencia:"media",valor:0,notas:"Trabalhar briefing",status_extra:"aguardando_layout",prazo:"2026-04-14",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"20",item:"Crachá Convidado",categoria:"impressos",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"Ref 2024. Qtd: 50",status_extra:"aguardando_layout",prazo:"2026-04-21",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"21",item:"Convite com Cronograma",categoria:"impressos",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"Fechar cronograma. Qtd: 50",status_extra:"aguardando_layout",prazo:"2026-04-21",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"22",item:"Catálogo de Lançamentos",categoria:"impressos",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"alta",valor:0,notas:"A3 c/ dobra. Qtd: 1000/3000/5000/6000",status_extra:"",prazo:"2026-04-07",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"23",item:"Flyer Lançamento Kits",categoria:"impressos",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"alta",valor:0,notas:"Qtd: 3000/5000/6000/8000",status_extra:"",prazo:"2026-04-07",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"24",item:"Flyer Institucional",categoria:"impressos",evento:"ambos",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"A4 2 dobras. Qtd: 3000/5000/6000/8000",status_extra:"",prazo:"2026-04-14",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"25",item:"Cartões de Visita",categoria:"impressos",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"baixa",valor:0,notas:"Padrão atual. Qtd: 50/100/150",status_extra:"",prazo:"2026-04-21",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"26",item:"Adesivos PDV",categoria:"impressos",evento:"ambos",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:0,notas:"Fechado c/ Filtros. Qtd: 5000",status_extra:"",prazo:"2026-04-14",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"27",item:"Banners Entrada Convenção (2)",categoria:"comunicacao",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"alta",valor:0,notas:"",status_extra:"aguardando_layout",prazo:"2026-04-14",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"28",item:"Banners Interno Telão (2)",categoria:"comunicacao",evento:"convencao",fornecedor:"",responsavel:"Brenda",urgencia:"alta",valor:0,notas:"",status_extra:"aguardando_layout",prazo:"2026-04-14",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"29",item:"Backdrop Coffee/Fotos",categoria:"comunicacao",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"alta",valor:0,notas:"",status_extra:"aguardando_layout",prazo:"2026-04-14",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"30",item:"Letreiro Logo - Reformar",categoria:"comunicacao",evento:"ambos",fornecedor:"",responsavel:"Brenda",urgencia:"media",valor:0,notas:"Avaliar e reformar",status_extra:"",prazo:"2026-04-21",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"31",item:"Kit Cartão com Doce",categoria:"receptividade",evento:"convencao",fornecedor:"",responsavel:"Brenda",urgencia:"media",valor:0,notas:"Qtd: 50",status_extra:"aguardando_layout",prazo:"2026-04-21",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
  {id:"32",item:"Hotel Hosp./Alim./Auditório",categoria:"infraestrutura",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"alta",valor:0,notas:"80% concluído",status_extra:"aguardando_aprovacao_dir",prazo:"2026-03-28",previsao_entrega:"",etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false}},
];

const STORAGE_KEY = "compras-fb-conv2026";
const M = typeof window !== "undefined" && window.innerWidth < 768;

function getProg(d) { return ETAPAS.filter(e => d.etapas[e.key]).length / ETAPAS.length; }
function diasAte(p) { if (!p) return null; return Math.ceil((new Date(p+"T00:00:00") - new Date(new Date().toISOString().split("T")[0]+"T00:00:00")) / 86400000); }
function fmtData(d) { if (!d) return ""; const [,m,dia] = d.split("-"); return `${dia}/${m}`; }

/* ── Shared tiny components ── */

const Badge = ({ label, color, bg, big }) => (
  <span style={{ display:"inline-block", padding:big?"4px 10px":"3px 8px", borderRadius:5, fontSize:big?13:12, fontWeight:500, color, background:bg, border:`1px solid ${color}20`, whiteSpace:"nowrap" }}>{label}</span>
);

const Pill = ({ children, active, onClick, color = "#0B1F3F", style: sx }) => (
  <button onClick={onClick} style={{ padding:"8px 16px", borderRadius:20, border:"none", background:active?color:"transparent", color:active?"white":"#5A6A85", fontFamily:"inherit", fontSize:13, fontWeight:active?500:400, cursor:"pointer", WebkitTapHighlightColor:"transparent", ...sx }}>{children}</button>
);

const PStep = ({ done, current, label, onClick }) => {
  const bg = done ? "rgba(15,170,110,0.12)" : current ? "rgba(229,161,0,0.12)" : "#F0F1F5";
  const border = done ? "rgba(15,170,110,0.35)" : current ? "rgba(229,161,0,0.35)" : "#DDE0E8";
  const clr = done ? "#0FAA6E" : current ? "#E5A100" : "#A0A8BC";
  return (
    <div onClick={onClick} style={{ height:32, paddingLeft:10, paddingRight:10, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:done?500:400, cursor:"pointer", border:`1.5px solid ${border}`, background:bg, color:clr, transition:"transform 0.15s", flexShrink:0, gap:4 }}
      onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
      {done && "✓ "}{label}
    </div>
  );
};

const RespSelect = ({ value, onChange }) => (
  <select value={value} onChange={e => onChange(e.target.value)}
    style={{ background:"transparent", border:"1px solid #E2E6EE", borderRadius:6, padding:"6px 8px", fontSize:14, fontWeight:400, color:"#0B1F3F", cursor:"pointer", fontFamily:"inherit", WebkitAppearance:"auto" }}>
    {RESPONSAVEIS.map(r => <option key={r} value={r}>{r.split(" ")[0]}</option>)}
  </select>
);

/* ── Main App ── */

export default function App() {
  const [demandas, setDemandas] = useState(INITIAL_DATA);
  const [loaded, setLoaded] = useState(false);
  const [F, setF] = useState({ cat:"todos", resp:"todos", sit:"todos", q:"" });
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const tt = useRef(null);

  useEffect(() => { (async () => { try { const r = await window.storage.get(STORAGE_KEY, true); if (r?.value) setDemandas(JSON.parse(r.value)); } catch {} setLoaded(true); })(); }, []);
  const save = useCallback(async (d) => { setDemandas(d); try { await window.storage.set(STORAGE_KEY, JSON.stringify(d), true); } catch {} }, []);
  const flash = (m) => { setToast(m); clearTimeout(tt.current); tt.current = setTimeout(() => setToast(""), 2500); };

  const toggle = (id, key) => {
    save(demandas.map(d => {
      if (d.id !== id) return d;
      const ei = ETAPAS.findIndex(e => e.key === key);
      const ne = { ...d.etapas };
      if (ne[key]) { for (let i = ei; i < ETAPAS.length; i++) ne[ETAPAS[i].key] = false; }
      else { for (let i = 0; i <= ei; i++) ne[ETAPAS[i].key] = true; }
      return { ...d, etapas: ne };
    }));
  };

  const chResp = (id, v) => save(demandas.map(d => d.id === id ? { ...d, responsavel: v } : d));

  const saveMod = (f) => {
    if (!f.item.trim()) return alert("Preencha o item!");
    if (f.id) { save(demandas.map(d => d.id === f.id ? { ...d, ...f } : d)); flash("Atualizada"); }
    else { save([...demandas, { ...f, id: Date.now().toString(), etapas:{orcamento:false,aprovacao:false,contrato:false,contrato_assinado:false,pedido_colocado:false} }]); flash("Adicionada"); }
    setModal(null);
  };

  const del = (id) => { if (confirm("Excluir?")) { save(demandas.filter(d => d.id !== id)); flash("Excluída"); } };

  if (!loaded) return <div style={{ display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#F2F4F7",fontSize:18,fontWeight:400 }}>Carregando...</div>;

  const filtered = demandas.filter(d => {
    if (F.cat !== "todos" && d.categoria !== F.cat) return false;
    if (F.resp !== "todos" && d.responsavel !== F.resp) return false;
    if (F.sit !== "todos" && (d.status_extra || "") !== F.sit) return false;
    if (F.q) { const q = F.q.toLowerCase(); if (!d.item.toLowerCase().includes(q)) return false; }
    return true;
  });

  const st = {
    total: demandas.length,
    ok: demandas.filter(d => getProg(d) === 1).length,
    doing: demandas.filter(d => { const p = getProg(d); return p > 0 && p < 1; }).length,
    wait: demandas.filter(d => getProg(d) === 0).length,
    late: demandas.filter(d => getProg(d) < 1 && d.prazo && diasAte(d.prazo) < 0).length,
  };

  const sitC = {};
  STATUS_EXTRA.filter(s => s.value).forEach(s => { sitC[s.value] = demandas.filter(d => (d.status_extra||"") === s.value && getProg(d) < 1).length; });

  return (
    <div style={{ fontFamily:"Amplesoft,Nunito,Segoe UI,sans-serif", background:"#F2F4F7", minHeight:"100vh", color:"#0B1F3F", fontSize:15 }}>

      {/* ── HEADER ── */}
      <div style={{ background:"#0B1F3F", padding:"0 20px", display:"flex", alignItems:"center", justifyContent:"space-between", height:60, position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:36, height:36, background:"#E31E24", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"white" }}>éFBe</div>
          <div style={{ color:"white", fontSize:17, fontWeight:500 }}>Compras <span style={{ color:"#FF6B6B", fontWeight:400 }}>Convenção 2026</span> <span style={{ color:"rgba(255,255,255,0.4)", fontWeight:400 }}>&</span> <span style={{ color:"#FF6B6B", fontWeight:400 }}>Feira Autopar 2026</span></div>
        </div>
        <button onClick={() => setModal({item:"",categoria:"brindes",evento:"convencao",fornecedor:"",responsavel:"Maria Eduarda",urgencia:"media",valor:"",notas:"",status_extra:"",prazo:"",previsao_entrega:""})}
          style={{ padding:"10px 20px", borderRadius:8, border:"none", background:"#E31E24", color:"white", fontFamily:"inherit", fontSize:14, fontWeight:500, cursor:"pointer" }}>＋ Nova</button>
      </div>
      <div style={{ height:3, background:"linear-gradient(90deg,#E31E24 0%,#E31E24 30%,#15335E 100%)" }} />

      {/* ── STATS ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10, padding:"16px 20px" }}>
        {[{n:st.total,l:"Total",c:"#0B1F3F"},{n:st.ok,l:"Concluídos",c:"#0FAA6E"},{n:st.doing,l:"Andamento",c:"#E5A100"},{n:st.wait,l:"Pendentes",c:"#E31E24"},{n:st.late,l:"⚠ Atrasados",c:"#E31E24"}].map((s,i) => (
          <div key={i} style={{ background:"white", borderRadius:10, padding:"14px 8px", textAlign:"center", border:"1px solid #E8EBF0" }}>
            <div style={{ fontSize:28, fontWeight:600, color:s.c, lineHeight:1 }}>{s.n}</div>
            <div style={{ fontSize:11, color:"#7A869A", marginTop:4, fontWeight:400 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── SITUATION CHIPS ── */}
      <div style={{ padding:"0 20px 12px", display:"flex", gap:8, flexWrap:"wrap" }}>
        {STATUS_EXTRA.filter(s => s.value).map(s => {
          const active = F.sit === s.value;
          return (
            <div key={s.value} onClick={() => setF(f => ({...f, sit: f.sit===s.value?"todos":s.value}))}
              style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:20, background:active?"rgba(11,31,63,0.06)":"white", border:`1px solid ${active?"#0B1F3F":"#E2E6EE"}`, fontSize:13, fontWeight:400, color:active?"#0B1F3F":"#6B778C", cursor:"pointer" }}>
              {s.icon} {s.label.split("(")[0].trim()}
              <span style={{ background:s.bg, color:s.color, padding:"2px 8px", borderRadius:10, fontSize:12, fontWeight:500, minWidth:22, textAlign:"center" }}>{sitC[s.value]||0}</span>
            </div>
          );
        })}
        {F.sit !== "todos" && <div onClick={() => setF(f => ({...f,sit:"todos"}))} style={{ padding:"8px 14px", borderRadius:20, border:"1px solid rgba(227,30,36,0.2)", fontSize:13, color:"#E31E24", cursor:"pointer" }}>✕ Limpar</div>}
      </div>

      {/* ── FILTERS ── */}
      <div style={{ padding:"0 20px 16px", display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ display:"flex", gap:2, background:"white", padding:"4px 6px 4px 14px", borderRadius:24, border:"1px solid #E2E6EE", alignItems:"center", flexWrap:"wrap" }}>
          <span style={{ fontSize:11, fontWeight:500, textTransform:"uppercase", letterSpacing:1.5, color:"#A0A8BC", paddingRight:8, borderRight:"1px solid #E2E6EE", marginRight:4 }}>Tipo</span>
          {[{value:"todos",label:"Todos"},...CATEGORIAS].map(c => <Pill key={c.value} active={F.cat===c.value} onClick={() => setF(f=>({...f,cat:c.value}))}>{c.label}</Pill>)}
        </div>
        <div style={{ display:"flex", gap:2, background:"white", padding:"4px 6px 4px 14px", borderRadius:24, border:"1px solid #E2E6EE", alignItems:"center" }}>
          <span style={{ fontSize:11, fontWeight:500, textTransform:"uppercase", letterSpacing:1.5, color:"#A0A8BC", paddingRight:8, borderRight:"1px solid #E2E6EE", marginRight:4 }}>Resp.</span>
          <Pill active={F.resp==="todos"} onClick={() => setF(f=>({...f,resp:"todos"}))}>Todas</Pill>
          {RESPONSAVEIS.map(r => <Pill key={r} active={F.resp===r} onClick={() => setF(f=>({...f,resp:r}))} color="#E31E24">{r.split(" ")[0]}</Pill>)}
        </div>
        <div style={{ flex:1 }} />
        <input placeholder="🔍 Buscar..." value={F.q} onChange={e => setF(f=>({...f,q:e.target.value}))}
          style={{ padding:"10px 18px", borderRadius:20, border:"1px solid #E2E6EE", background:"white", color:"#0B1F3F", fontFamily:"inherit", fontSize:14, width:220, outline:"none" }} />
      </div>

      {/* ── CARDS ── */}
      <div style={{ padding:"0 20px 40px" }}>
        {filtered.length === 0 ? <div style={{ textAlign:"center", padding:80, color:"#A0A8BC", fontSize:16 }}>📦 Nenhuma demanda encontrada</div> : (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {filtered.map(d => {
              const prog = getProg(d), pct = Math.round(prog*100), dias = diasAte(d.prazo), isDone = prog===1;
              const over = !isDone && dias!==null && dias<0;
              const soon = !isDone && dias!==null && dias>=0 && dias<=7;
              const cat = CATEGORIAS.find(c => c.value===d.categoria);
              const se = STATUS_EXTRA.find(s => s.value===(d.status_extra||""));
              const ea = ETAPAS.findIndex((_,i) => !d.etapas[ETAPAS[i].key]);

              return (
                <div key={d.id} style={{ background:"white", borderRadius:12, padding:18, border:`1px solid ${over?"rgba(227,30,36,0.25)":"#E8EBF0"}`, borderLeft:over?"4px solid #E31E24":"4px solid transparent" }}>

                  {/* Row 1: Title + actions */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                    <div style={{ fontSize:16, fontWeight:500, lineHeight:1.3, flex:1, paddingRight:8 }}>{d.item}</div>
                    <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                      <button onClick={() => setModal(d)} style={{ width:36, height:36, borderRadius:8, border:"1px solid #E8EBF0", background:"white", cursor:"pointer", fontSize:15 }}>✏️</button>
                      <button onClick={() => del(d.id)} style={{ width:36, height:36, borderRadius:8, border:"1px solid #E8EBF0", background:"white", cursor:"pointer", fontSize:15 }}>🗑</button>
                    </div>
                  </div>

                  {/* Row 2: Badges */}
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>
                    <Badge label={cat?.label||d.categoria} color={cat?.color||"#666"} bg={cat?.bg||"#f0f0f0"} />
                    {(() => { const ev = EVENTOS.find(e => e.value===d.evento); return ev ? <Badge label={ev.label} color={ev.color} bg={ev.bg} /> : null; })()}
                    {se?.value && <Badge label={`${se.icon} ${se.label}`} color={se.color} bg={se.bg} />}
                  </div>

                  {/* Row 3: Resp + urgency */}
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                    <RespSelect value={d.responsavel} onChange={v => chResp(d.id, v)} />
                    <span style={{ width:10, height:10, borderRadius:"50%", background:d.urgencia==="alta"?"#E31E24":d.urgencia==="media"?"#E5A100":"#0FAA6E" }} />
                    <span style={{ fontSize:13, color:"#7A869A", marginLeft:4 }}>{d.urgencia==="alta"?"Urgente":d.urgencia==="media"?"Média":"Baixa"}</span>
                  </div>

                  {/* Row 3b: Dates */}
                  {(d.prazo || d.previsao_entrega) && (
                    <div style={{ display:"flex", gap:16, marginBottom:12, fontSize:13, flexWrap:"wrap" }}>
                      {d.prazo && (
                        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                          <span style={{ color:"#A0A8BC" }}>Prazo:</span>
                          <span style={{ fontWeight:over?500:400, color:over?"#E31E24":soon?"#E07800":"#0B1F3F" }}>
                            {over?"⚠ ":""}{fmtData(d.prazo)}{over?` (${Math.abs(dias)}d atraso)`:soon?` (${dias}d)`:""}
                          </span>
                        </div>
                      )}
                      {d.previsao_entrega && (
                        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                          <span style={{ color:"#A0A8BC" }}>Prev. entrega:</span>
                          <span style={{ color:"#0B1F3F" }}>{fmtData(d.previsao_entrega)}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Row 4: Pipeline */}
                  <div style={{ display:"flex", gap:5, alignItems:"center", flexWrap:"wrap" }}>
                    {ETAPAS.map((e, ei) => <PStep key={e.key} done={d.etapas[e.key]} current={ei===(ea===-1?ETAPAS.length:ea)} label={e.label} onClick={() => toggle(d.id, e.key)} />)}
                  </div>
                  {/* Progress bar */}
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:10 }}>
                    <div style={{ height:6, background:"#E8EBF0", borderRadius:3, overflow:"hidden", flex:1 }}>
                      <div style={{ width:`${pct}%`, height:"100%", background:pct===100?"#0FAA6E":pct>=40?"#E5A100":"#E31E24", borderRadius:3, transition:"width 0.3s" }} />
                    </div>
                    <div style={{ fontSize:14, color:"#7A869A", fontWeight:400, minWidth:36 }}>{pct}%</div>
                  </div>

                  {/* Row 5: Notes */}
                  {d.notas && <div style={{ marginTop:10, fontSize:13, color:"#7A869A", background:"#F5F6FA", padding:"8px 12px", borderRadius:8, lineHeight:1.4 }}>💬 {d.notas}</div>}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── MODAL ── */}
      {modal && <Modal data={modal} onSave={saveMod} onClose={() => setModal(null)} />}

      {/* ── TOAST ── */}
      {toast && <div style={{ position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)", background:"#0B1F3F", color:"white", padding:"12px 24px", borderRadius:10, fontSize:15, fontWeight:400, boxShadow:"0 8px 32px rgba(0,0,0,0.2)", zIndex:2000 }}>✓ {toast}</div>}
    </div>
  );
}

/* ── Modal ── */
function Modal({ data, onSave, onClose }) {
  const [f, setF] = useState({ ...data });
  const s = (k, v) => setF(o => ({ ...o, [k]: v }));
  const inp = { width:"100%", padding:"12px 14px", borderRadius:8, border:"1px solid #E2E6EE", background:"#F8F9FB", color:"#0B1F3F", fontFamily:"inherit", fontSize:15, fontWeight:400, outline:"none" };
  const lab = { display:"block", fontSize:12, fontWeight:500, color:"#7A869A", marginBottom:6, textTransform:"uppercase", letterSpacing:1 };

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(11,31,63,0.5)", backdropFilter:"blur(4px)", zIndex:1000, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:"white", borderRadius:"16px 16px 0 0", padding:24, width:"100%", maxWidth:560, maxHeight:"92vh", overflowY:"auto" }}>
        <div style={{ width:40, height:4, background:"#DDE0E8", borderRadius:2, margin:"0 auto 20px" }} />
        <h2 style={{ fontSize:20, fontWeight:600, marginBottom:20 }}>{f.id ? "Editar" : "Nova"} <span style={{ color:"#E31E24" }}>Demanda</span></h2>

        <div style={{ marginBottom:14 }}><label style={lab}>Item</label><input style={inp} value={f.item} onChange={e => s("item",e.target.value)} placeholder="Nome do item" /></div>

        <div style={{ display:"flex", gap:12, marginBottom:14 }}>
          <div style={{ flex:1 }}><label style={lab}>Tipo</label><select style={inp} value={f.categoria} onChange={e => s("categoria",e.target.value)}>{CATEGORIAS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}</select></div>
          <div style={{ flex:1 }}><label style={lab}>Evento</label><select style={inp} value={f.evento} onChange={e => s("evento",e.target.value)}>{EVENTOS.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}</select></div>
        </div>

        <div style={{ display:"flex", gap:12, marginBottom:14 }}>
          <div style={{ flex:1 }}><label style={lab}>Fornecedor</label><input style={inp} value={f.fornecedor} onChange={e => s("fornecedor",e.target.value)} /></div>
          <div style={{ flex:1 }}><label style={lab}>Responsável</label><select style={inp} value={f.responsavel} onChange={e => s("responsavel",e.target.value)}>{RESPONSAVEIS.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
        </div>

        <div style={{ display:"flex", gap:12, marginBottom:14 }}>
          <div style={{ flex:1 }}><label style={lab}>Urgência</label><select style={inp} value={f.urgencia} onChange={e => s("urgencia",e.target.value)}><option value="alta">🔴 Alta</option><option value="media">🟡 Média</option><option value="baixa">🟢 Baixa</option></select></div>
          <div style={{ flex:1 }}><label style={lab}>Prazo Limite</label><input type="date" style={inp} value={f.prazo||""} onChange={e => s("prazo",e.target.value)} /></div>
        </div>

        <div style={{ display:"flex", gap:12, marginBottom:14 }}>
          <div style={{ flex:1 }}><label style={lab}>Prev. Entrega</label><input type="date" style={inp} value={f.previsao_entrega||""} onChange={e => s("previsao_entrega",e.target.value)} /></div>
          <div style={{ flex:1 }}><label style={lab}>Valor (R$)</label><input type="number" style={inp} value={f.valor||""} onChange={e => s("valor",parseFloat(e.target.value)||0)} /></div>
        </div>

        <div style={{ display:"flex", gap:12, marginBottom:14 }}>
          <div style={{ flex:1 }}><label style={lab}>Situação</label><select style={inp} value={f.status_extra||""} onChange={e => s("status_extra",e.target.value)}>{STATUS_EXTRA.map(st => <option key={st.value} value={st.value}>{st.value ? `${st.icon} ${st.label}` : st.label}</option>)}</select></div>
        </div>

        <div style={{ marginBottom:20 }}><label style={lab}>Observações</label><textarea style={{ ...inp, minHeight:60, resize:"vertical" }} value={f.notas||""} onChange={e => s("notas",e.target.value)} /></div>

        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onClose} style={{ flex:1, padding:"14px", borderRadius:10, border:"1px solid #E2E6EE", background:"white", color:"#5A6A85", fontFamily:"inherit", fontSize:15, fontWeight:400, cursor:"pointer" }}>Cancelar</button>
          <button onClick={() => onSave(f)} style={{ flex:1, padding:"14px", borderRadius:10, border:"none", background:"#E31E24", color:"white", fontFamily:"inherit", fontSize:15, fontWeight:500, cursor:"pointer" }}>{f.id ? "Salvar" : "Adicionar"}</button>
        </div>
      </div>
    </div>
  );
}
