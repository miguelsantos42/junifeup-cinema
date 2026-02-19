# Deploy para GitHub Pages

## Configuração

O projeto está configurado para funcionar no GitHub Pages com o base path `/junifeup-cinema/`.

## Passos para Deploy

1. **Faz commit e push das alterações:**
```bash
git add .
git commit -m "Configure GitHub Pages"
git push origin main
```

2. **No GitHub:**
   - Vai a **Settings** > **Pages**
   - Em **Source**, escolhe **"GitHub Actions"**
   - O workflow vai fazer build e deploy automaticamente

3. **Aguarda o deploy:**
   - Vai a **Actions** no GitHub
   - Verifica se o workflow "Deploy to GitHub Pages" completou com sucesso
   - O site estará disponível em: `https://miguelsantos42.github.io/junifeup-cinema/`

## Se o nome do repositório for diferente

Se o teu repositório tiver um nome diferente de `junifeup-cinema`, atualiza:

1. **`vite.config.ts`**: Muda o `base` para o nome do teu repositório
2. **`src/App.tsx`**: Muda o `basename` no BrowserRouter para o nome do teu repositório

Exemplo: Se o repositório for `meu-cinema`, usa:
- `base: '/meu-cinema/'`
- `basename="/meu-cinema"`

## Troubleshooting

Se o site aparecer em branco:
1. Verifica a consola do browser (F12) para erros
2. Verifica se o build foi bem-sucedido nas Actions
3. Verifica se o base path está correto no `vite.config.ts`
4. Limpa a cache do browser (Ctrl+Shift+R ou Cmd+Shift+R)
