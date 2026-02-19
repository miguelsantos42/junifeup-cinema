# 🔧 Configurar Supabase no GitHub Pages

## ⚠️ Problema Atual
O site funciona no localhost mas não no GitHub Pages porque as variáveis de ambiente do Supabase não estão configuradas.

## ✅ Solução: Adicionar Secrets no GitHub

### Passo 1: Obter as Credenciais do Supabase

1. Vai ao teu projeto no Supabase: https://supabase.com/dashboard
2. Seleciona o teu projeto

3. **Para o Project URL:**
   - Vai a **Settings** (⚙️) > **API** (não API Keys)
   - Copia o **Project URL** (ex: `https://xxxxx.supabase.co`)

4. **Para a API Key:**
   - Vai a **Settings** (⚙️) > **API Keys**
   - Tens duas opções:
   
   **Opção A (Recomendada - Nova Interface):**
   - No tab "Publishable and secret API keys"
   - Copia a **Publishable key** (começa com `sb_publishable_...`)
   - Esta é a key que deves usar para `VITE_SUPABASE_ANON_KEY`
   
   **Opção B (Legacy):**
   - Clica no tab "Legacy anon, service_role API keys"
   - Copia a **anon public** key (começa com `eyJ...`)
   - Esta também funciona para `VITE_SUPABASE_ANON_KEY`

**Resumo:**
- **VITE_SUPABASE_URL** = Project URL (Settings > API)
- **VITE_SUPABASE_ANON_KEY** = Publishable key (nova) OU anon public key (legacy)

### Passo 2: Adicionar Secrets no GitHub

1. Vai ao teu repositório: `https://github.com/miguelsantos42/junifeup-cinema`
2. Clica em **Settings** (no topo do repositório)
3. No menu lateral esquerdo, clica em **Secrets and variables** > **Actions**
4. Clica no botão **"New repository secret"** (canto superior direito)

5. **Adiciona o primeiro secret:**
   - **Name:** `VITE_SUPABASE_URL`
   - **Secret:** Cola a **Project URL** do Supabase
   - Clica em **"Add secret"**

6. **Adiciona o segundo secret:**
   - Clica novamente em **"New repository secret"**
   - **Name:** `VITE_SUPABASE_ANON_KEY`
   - **Secret:** Cola a **anon public** key do Supabase
   - Clica em **"Add secret"**

### Passo 3: Fazer Deploy Novamente

Depois de adicionar os secrets, tens duas opções:

**Opção A: Fazer um novo commit**
```bash
git add .
git commit -m "Update config"
git push
```

**Opção B: Re-run do workflow existente**
1. Vai a **Actions** no GitHub
2. Encontra o último workflow run
3. Clica nos três pontos (⋯) > **Re-run all jobs**

### Passo 4: Verificar

1. Aguarda o workflow completar (vai demorar ~1-2 minutos)
2. Vai ao teu site: `https://miguelsantos42.github.io/junifeup-cinema/`
3. O site deve carregar os dados do Supabase sem erros na consola

## 🔍 Como Verificar se Funcionou

1. Abre o site no browser
2. Abre a consola (F12 > Console)
3. **Se funcionou:** Não deves ver erros de WebSocket ou avisos sobre Supabase não configurado
4. **Se não funcionou:** Vais ver os mesmos erros. Verifica se:
   - Os secrets foram adicionados corretamente
   - Os nomes dos secrets estão exatamente: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
   - Fizeste push ou re-run do workflow depois de adicionar os secrets

## 📝 Notas Importantes

- Os secrets são **seguros** - não aparecem nos logs nem no código
- São usados **apenas durante o build** - o Vite substitui as variáveis no código final
- Se mudares os secrets, precisas de fazer um novo deploy para as alterações terem efeito
