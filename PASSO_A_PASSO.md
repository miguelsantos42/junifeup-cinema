# 📋 PASSO A PASSO - Configurar Supabase no GitHub Pages

## PARTE 1: Obter as Keys do Supabase

### Passo 1.1: Obter o Project URL
1. Abre o Supabase: https://supabase.com/dashboard
2. Seleciona o teu projeto "juni-cinema"
3. No menu lateral esquerdo, clica em **Settings** (⚙️)
4. Clica em **API** (não "API Keys")
5. Vais ver uma secção chamada **"Project URL"**
6. **COPIA** esse URL (algo como `https://xxxxx.supabase.co`)
7. **GUARDA** este valor - vais precisar dele no Passo 2

### Passo 1.2: Obter a API Key
1. Ainda no Supabase, no menu lateral esquerdo, clica em **Settings** > **API Keys**
2. Vais ver uma secção chamada **"Publishable key"**
3. Vais ver uma key que começa com `sb_publishable_...` (pode estar parcialmente oculta)
4. Clica no ícone de **copiar** (📋) ao lado dessa key
5. **GUARDA** este valor - vais precisar dele no Passo 2

---

## PARTE 2: Adicionar as Keys no GitHub

### Passo 2.1: Ir às Settings do Repositório
1. Abre o GitHub: https://github.com/miguelsantos42/junifeup-cinema
2. No topo do repositório, clica em **Settings** (⚙️)
3. No menu lateral esquerdo, clica em **Secrets and variables**
4. Clica em **Actions**

### Passo 2.2: Adicionar o Primeiro Secret (Project URL)
1. Clica no botão **"New repository secret"** (canto superior direito)
2. No campo **"Name"**, escreve exatamente isto:
   ```
   VITE_SUPABASE_URL
   ```
3. No campo **"Secret"**, cola o **Project URL** que copiaste no Passo 1.1
   (deve ser algo como `https://xxxxx.supabase.co`)
4. Clica em **"Add secret"**

### Passo 2.3: Adicionar o Segundo Secret (API Key)
1. Clica novamente no botão **"New repository secret"**
2. No campo **"Name"**, escreve exatamente isto:
   ```
   VITE_SUPABASE_ANON_KEY
   ```
3. No campo **"Secret"**, cola a **Publishable key** que copiaste no Passo 1.2
   (deve começar com `sb_publishable_...`)
4. Clica em **"Add secret"**

---

## PARTE 3: Fazer Deploy Novamente

### Passo 3.1: Re-run do Workflow
1. No GitHub, clica em **Actions** (no topo do repositório)
2. Vais ver uma lista de workflows
3. Clica no workflow mais recente (deve ser "Deploy to GitHub Pages")
4. Clica nos **três pontos** (⋯) no canto superior direito
5. Clica em **"Re-run all jobs"**
6. Aguarda ~1-2 minutos até o workflow completar

### Passo 3.2: Verificar se Funcionou
1. Vai ao teu site: https://miguelsantos42.github.io/junifeup-cinema/
2. Abre a consola do browser (F12 > Console)
3. **Se funcionou:** Não deves ver erros de WebSocket ou avisos sobre Supabase
4. **Se não funcionou:** Verifica se:
   - Os nomes dos secrets estão exatamente como escrito acima
   - Copiaste os valores corretos do Supabase
   - Fizeste o re-run do workflow

---

## ✅ Checklist Final

- [ ] Copiei o Project URL do Supabase (Settings > API)
- [ ] Copiei a Publishable key do Supabase (Settings > API Keys)
- [ ] Adicionei o secret `VITE_SUPABASE_URL` no GitHub
- [ ] Adicionei o secret `VITE_SUPABASE_ANON_KEY` no GitHub
- [ ] Fiz re-run do workflow no GitHub Actions
- [ ] O site está a funcionar sem erros na consola

---

## 🆘 Se Algo Correr Mal

**Erro: "Supabase não está configurado"**
- Verifica se os nomes dos secrets estão exatamente: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
- Verifica se fizeste re-run do workflow depois de adicionar os secrets

**Erro: "WebSocket connection failed"**
- Verifica se copiaste a key completa (não cortada)
- Verifica se usaste a "Publishable key" e não a "Secret key"

**O site ainda não funciona:**
- Limpa a cache do browser (Ctrl+Shift+R ou Cmd+Shift+R)
- Verifica se o workflow completou com sucesso nas Actions
