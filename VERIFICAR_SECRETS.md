# 🔍 Verificar se os Secrets Estão Corretos

## Problema:
O site ainda mostra "Supabase não está configurado" mesmo depois de adicionar os secrets.

## Possíveis Causas:

### 1. Os Secrets Não Foram Adicionados Corretamente

**Verifica:**
1. Vai a: `https://github.com/miguelsantos42/junifeup-cinema/settings/secrets/actions`
2. Deves ver **2 secrets**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Se não vês ambos, adiciona o que falta

### 2. Os Valores dos Secrets Estão Errados

**Verifica se copiaste os valores corretos:**

**Para VITE_SUPABASE_URL:**
- Deve ser algo como: `https://kgyebmmvjozxbfhhxaeg.supabase.co`
- **NÃO** deve ter `VITE_SUPABASE_URL=` na frente
- **NÃO** deve ter espaços ou quebras de linha

**Para VITE_SUPABASE_ANON_KEY:**
- Deve começar com: `sb_publishable_...`
- **NÃO** deve ter `VITE_SUPABASE_ANON_KEY=` na frente
- **NÃO** deve ter espaços ou quebras de linha

### 3. O Workflow Foi Executado ANTES de Adicionar os Secrets

**Solução:**
- Se adicionaste os secrets DEPOIS do último workflow, precisas de fazer **re-run**
- Vai a Actions > Re-run all jobs

### 4. Os Secrets Estão em Repository Secrets (Correto) vs Environment Secrets (Errado)

**Verifica:**
- Os secrets devem estar em **"Repository secrets"** (não "Environment secrets")
- Vai a: Settings > Secrets and variables > Actions
- Deves ver "Repository secrets" no topo

## ✅ Checklist:

- [ ] Tenho 2 secrets criados: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
- [ ] Os valores estão corretos (sem prefixos, sem espaços)
- [ ] Os secrets estão em "Repository secrets" (não Environment)
- [ ] Fiz re-run do workflow DEPOIS de adicionar os secrets
- [ ] O workflow completou com sucesso (✅ verde)

## 🔧 Se Ainda Não Funciona:

1. **Edita os secrets:**
   - Clica no ícone de lápis (✏️) ao lado de cada secret
   - Verifica se o valor está correto
   - Guarda novamente

2. **Faz um novo commit:**
   - Qualquer alteração pequena (ex: adicionar um espaço num ficheiro)
   - Faz commit e push
   - Isto vai trigger um novo build

3. **Verifica os logs do build:**
   - Vai a Actions > Último workflow > Build job
   - Verifica se há erros ou avisos
   - As variáveis de ambiente NÃO aparecem nos logs (por segurança), mas se houver erros, vais vê-los
