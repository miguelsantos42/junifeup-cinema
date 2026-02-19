# Criar Utilizador Admin - Método Simples

## Opção 1: Via Supabase Dashboard (Mais Fácil)

1. Vai ao teu projeto no [Supabase Dashboard](https://app.supabase.com)
2. No menu lateral, clica em **Authentication** > **Users**
3. Clica no botão **"Add user"** ou **"Invite user"**
4. Preenche:
   - **Email**: `admin@junifeup.pt`
   - **Password**: `12345678!`
   - Marca **"Auto Confirm User"** (para não precisar de confirmar email)
5. Clica em **"Create user"**

Pronto! Agora podes fazer login em `/admin` com estas credenciais.

## Opção 2: Via SQL (Alternativa)

Se preferires, podes executar este SQL no Supabase SQL Editor:

```sql
-- Nota: Isto cria o utilizador mas pode precisar de ajustes dependendo da configuração do Supabase
-- O método mais seguro é usar o Dashboard
```

**Recomendação**: Usa a Opção 1 (Dashboard) - é mais simples e segura!
