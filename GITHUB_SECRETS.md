# Configurar Secrets do GitHub para Supabase

Para o Supabase funcionar em produção no GitHub Pages, precisas de configurar as variáveis de ambiente como secrets no GitHub.

## Passos:

1. **Vai ao teu repositório no GitHub:**
   - `https://github.com/miguelsantos42/junifeup-cinema`

2. **Vai a Settings > Secrets and variables > Actions**

3. **Clica em "New repository secret"** e adiciona:

   **Secret 1:**
   - **Name:** `VITE_SUPABASE_URL`
   - **Value:** A tua URL do Supabase (ex: `https://xxxxx.supabase.co`)

   **Secret 2:**
   - **Name:** `VITE_SUPABASE_ANON_KEY`
   - **Value:** A tua chave anónima do Supabase

4. **Onde encontrar estes valores:**
   - Vai ao teu projeto no Supabase
   - Settings > API
   - Copia:
     - **Project URL** → `VITE_SUPABASE_URL`
     - **anon public** key → `VITE_SUPABASE_ANON_KEY`

5. **Depois de adicionar os secrets:**
   - Faz um novo commit e push (ou re-run do workflow)
   - O build vai usar estas variáveis e o Supabase vai funcionar em produção

## Nota Importante:

- Os secrets são seguros e não aparecem nos logs do GitHub Actions
- Apenas são usados durante o build
- Não são expostos no código final (o Vite substitui-as durante o build)
