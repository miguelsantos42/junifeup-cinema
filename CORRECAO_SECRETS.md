# ⚠️ CORREÇÃO: Como Adicionar os Secrets Corretamente

## ❌ ERRADO (o que tens agora):
No campo "Secret" tens:
```
VITE_SUPABASE_URL=https://kgyebmmvjozxbfhhxaeg.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_aYXtBMH-rmzJyOyi4eMM8A_zdAA6ItP
```

**Isto está ERRADO!** Não deves colocar ambos no mesmo secret, e não deves incluir o nome da variável no valor.

---

## ✅ CORRETO (o que deves fazer):

### Secret 1: VITE_SUPABASE_URL

1. No campo **"Name"**, escreve:
   ```
   VITE_SUPABASE_URL
   ```

2. No campo **"Secret"**, escreve APENAS o URL (sem o `VITE_SUPABASE_URL=`):
   ```
   https://kgyebmmvjozxbfhhxaeg.supabase.co
   ```

3. Clica em **"Add secret"**

---

### Secret 2: VITE_SUPABASE_ANON_KEY

1. Clica novamente em **"New repository secret"**

2. No campo **"Name"**, escreve:
   ```
   VITE_SUPABASE_ANON_KEY
   ```

3. No campo **"Secret"**, escreve APENAS a key (sem o `VITE_SUPABASE_ANON_KEY=`):
   ```
   sb_publishable_aYXtBMH-rmzJyOyi4eMM8A_zdAA6ItP
   ```

4. Clica em **"Add secret"**

---

## 📝 Resumo:

- **2 secrets separados** (não 1 secret com ambos)
- **Name** = apenas o nome (ex: `VITE_SUPABASE_URL`)
- **Secret** = apenas o valor (ex: `https://kgyebmmvjozxbfhhxaeg.supabase.co`)

Depois de adicionar ambos os secrets corretamente, faz re-run do workflow nas Actions!
