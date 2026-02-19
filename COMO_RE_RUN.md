# 🔄 Como Fazer Re-run do Workflow

## Passo a Passo:

1. **No GitHub, clica em "Actions"** (no topo do repositório, ao lado de "Code", "Issues", etc.)

2. **Vais ver uma lista de workflows.** Procura por "Deploy to GitHub Pages" e clica nele.

3. **Vais ver uma lista de "runs" (execuções).** Clica no mais recente (o que está no topo).

4. **No canto superior direito**, vais ver três pontos (⋯) ou um botão "Re-run jobs".

5. **Clica nos três pontos (⋯)** e depois em **"Re-run all jobs"** ou **"Re-run failed jobs"**.

6. **Aguarda ~1-2 minutos** enquanto o workflow executa.

7. **Verifica se completou com sucesso:**
   - Deves ver um ✅ verde ao lado de "build" e "deploy"
   - Se aparecer ❌ vermelho, clica para ver os erros

8. **Depois de completar, testa o site:**
   - Vai a: https://miguelsantos42.github.io/junifeup-cinema/
   - Abre a consola (F12 > Console)
   - **Se funcionou:** Não deves ver erros de WebSocket ou avisos sobre Supabase
   - **Se ainda não funciona:** Verifica os logs do workflow para ver o erro

---

## 🎯 Resumo Visual:

```
GitHub → Actions → "Deploy to GitHub Pages" → (último run) → ⋯ → "Re-run all jobs"
```

---

## ✅ Depois do Re-run:

- Aguarda o workflow completar (~1-2 minutos)
- Vai ao site e verifica se está a funcionar
- Se ainda houver erros, verifica a consola do browser (F12)
