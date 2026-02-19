# 📍 Onde Está a Secção "API" no Supabase

## Passo a Passo:

1. **Estás na página "General"** (como na imagem que mostraste)

2. **No menu lateral esquerdo**, vais ver várias opções:
   - General (onde estás agora)
   - Compute and Disk
   - Infrastructure
   - Integrations
   - **API Keys** ← NÃO é este!
   - JWT Keys
   - Log Drains
   - Add Ons

3. **Procura por "API"** - pode estar listado como:
   - **"API"** (sem "Keys")
   - Ou pode estar dentro de outra secção

4. **Se não vires "API" diretamente:**
   - Vai a **Settings** > **API Keys** (que já viste antes)
   - Mas o que precisas é de **Settings** > **API** (sem "Keys")
   - O "API" tem o **Project URL**
   - O "API Keys" tem as **keys** (Publishable key, etc.)

## 🔍 Alternativa: Construir o URL Manualmente

Se não encontrares a secção "API", podes construir o URL manualmente:

**O teu Project ID é:** `kgyebmmvjozxbfhhxaeg` (vês na página General)

**O Project URL é:**
```
https://kgyebmmvjozxbfhhxaeg.supabase.co
```

**Fórmula:** `https://[PROJECT_ID].supabase.co`

## ✅ Resposta Direta:

**VITE_SUPABASE_URL =** `https://kgyebmmvjozxbfhhxaeg.supabase.co`

Este é o valor que deves usar no GitHub Secret!
