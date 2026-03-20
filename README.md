# 🔴 Controle de Compras — Filtros Brasil
## Convenção & Feira 2026

Plataforma de controle de status de compras para a equipe de compras da Filtros Brasil.

---

## 🚀 Como colocar no ar (passo a passo)

### Pré-requisitos
- Conta no [GitHub](https://github.com) (grátis)
- Conta na [Vercel](https://vercel.com) (grátis — logar com GitHub)

### Passo 1: Criar repositório no GitHub
1. Acesse https://github.com/new
2. Nome: `controle-compras-fb`
3. Deixe **público** ou privado (tanto faz)
4. Clique **"Create repository"**

### Passo 2: Subir os arquivos
**Opção A — Pelo site do GitHub (mais fácil):**
1. No repositório criado, clique **"uploading an existing file"**
2. Arraste TODA a pasta do projeto (todos os arquivos e pastas)
3. Clique **"Commit changes"**

**Opção B — Pelo terminal (se tiver git instalado):**
```bash
cd controle-compras-fb
git init
git add .
git commit -m "primeira versão"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/controle-compras-fb.git
git push -u origin main
```

### Passo 3: Deploy na Vercel
1. Acesse https://vercel.com/new
2. Clique **"Import"** no repositório `controle-compras-fb`
3. Framework: **Vite** (detecta automaticamente)
4. Clique **"Deploy"**
5. Em ~1 minuto terá um link tipo: `https://controle-compras-fb.vercel.app`

### Passo 4: Compartilhar
Manda o link pra Raquel, Maria Eduarda e Brenda!
Funciona no celular, tablet e desktop.

---

## 📱 Funcionalidades
- **32 itens** importados da planilha do cronograma
- **Pipeline visual**: Orçamento → Aprovação → Contrato → Assinado → Pedido
- **Situações**: Ag. Layout (Édy), Ag. Aprovação Diretoria (Raquel), Ag. Fornecedor, Em Produção, Pronto
- **Prazo com alerta**: itens atrasados ficam em vermelho
- **Filtros**: por tipo, evento, responsável, situação
- **Responsável editável inline**: troca sem abrir modal
- **Mobile-first**: cards no celular, tabela no desktop
- **Dados salvos no navegador** (localStorage)

---

## ⚠️ Sobre sincronização de dados
Atualmente os dados ficam no **localStorage** de cada navegador.
Isso significa que cada pessoa vê seus próprios dados.

**Para sincronizar entre todos os usuários** (Raquel vê o que Maria Eduarda atualizou), seria necessário adicionar um backend. Opções gratuitas:
- **Supabase** (PostgreSQL grátis)
- **Firebase** (Realtime Database grátis)
- **JSONBin.io** (API simples grátis)

Se quiser, peça ao Claude para adaptar o `useStorage.js` para qualquer um desses.

---

## 🛠 Estrutura do projeto
```
controle-compras-fb/
├── index.html          ← Página principal
├── package.json        ← Dependências
├── vite.config.js      ← Config do Vite
└── src/
    ├── main.jsx        ← Entry point React
    ├── App.jsx         ← Componente principal
    ├── data.js         ← Dados e constantes
    └── useStorage.js   ← Hook de persistência
```
