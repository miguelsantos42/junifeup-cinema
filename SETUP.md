# 🚀 Guia de Configuração - JuniFeup Cinema

## Passo 1: Criar Projeto no Supabase

1. Vai a [https://app.supabase.com](https://app.supabase.com)
2. Faz login ou cria uma conta
3. Clica em **"New Project"**
4. Preenche:
   - **Name**: `juni-cinema` (ou o nome que quiseres)
   - **Database Password**: Escolhe uma password forte (guarda-a!) JuniFEUP12345678!
   - **Region**: Escolhe a mais próxima (ex: West Europe)
5. Clica em **"Create new project"** e espera ~2 minutos

## Passo 2: Obter Credenciais do Supabase

1. No teu projeto Supabase, vai a **Settings** (ícone de engrenagem) > **API** > **API Keys**
2. Encontra a secção **"Publishable key"**
3. Copia a chave **"default"** (começa com `sb_publishable_...`) 
4. Para obter o **Project URL**:
   - Vai a **Settings** > **API** (mesma página onde estás)
   - O Project URL aparece no topo da página, ou
   - Podes construí-lo assim: `https://[teu-project-id].supabase.co`
   - O Project ID está em **Settings** > **General** (ex: `kgyebmmvjozxbfhhxaeg`)
   - Então o URL seria: `https://kgyebmmvjozxbfhhxaeg.supabase.co`
5. Precisas de:
   - **Project URL**: `https://kgyebmmvjozxbfhhxaeg.supabase.co` (substitui pelo teu Project ID)
   - **Publishable key**: `sb_publishable_aYXtBMH-rmzJyOyi4eMM8A_zdAA6ItP` (a chave que copiaste)

## Passo 3: Configurar Variáveis de Ambiente

1. Na raiz do projeto, cria um ficheiro chamado `.env`
2. Adiciona estas linhas (substitui pelos teus valores):

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_aYXtBMH-rmzJy0yi4eMM8A_zdAA6...
```

**Nota**: Usa a **Publishable key** (não a Secret key!). A Publishable key é segura para usar no browser com RLS ativado.

**⚠️ IMPORTANTE**: 
- Não uses a `service_role` key (é secreta!)
- Usa apenas a `anon` ou `public` key
- O ficheiro `.env` já está no `.gitignore` (não será commitado)

## Passo 4: Configurar Base de Dados

1. No Supabase Dashboard, vai a **SQL Editor**
2. Cria um novo query
3. Copia TODO o conteúdo do ficheiro `supabase-setup.sql`
4. Cola no SQL Editor
5. Clica em **"Run"** ou pressiona `Ctrl+Enter`

Isto vai criar:
- ✅ Tabelas (`movies`, `seats`, `reservations`)
- ✅ Políticas de segurança (RLS)
- ✅ Inicializar todos os lugares
- ✅ Criar um filme de exemplo

## Passo 5: Criar Utilizador Admin

1. No Supabase Dashboard, vai a **Authentication** > **Users**
2. Clica em **"Add user"** ou **"Invite user"**
3. Preenche:
   - **Email**: `admin@junifeup.pt`
   - **Password**: `12345678!`
   - ✅ Marca **"Auto Confirm User"** (importante!)
4. Clica em **"Create user"**

## Passo 6: Reiniciar o Servidor

1. Para o servidor de desenvolvimento (Ctrl+C no terminal)
2. Reinicia:
```bash
npm run dev
```

## Passo 7: Testar Login Admin

1. Vai a `http://localhost:5173/admin`
2. Insere:
   - Email: `admin@junifeup.pt`
   - Password: `12345678!`
3. Clica em **"Entrar"**

Se tudo estiver correto, serás redirecionado para o dashboard admin! 🎉

---

## ✅ Checklist de Verificação

- [ ] Projeto criado no Supabase
- [ ] Ficheiro `.env` criado com `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
- [ ] SQL de setup executado no Supabase
- [ ] Utilizador admin criado (`admin@junifeup.pt` / `12345678!`)
- [ ] Servidor reiniciado após criar `.env`
- [ ] Login admin funciona

## 🆘 Problemas Comuns

**"Failed to fetch" ou "Supabase não está configurado"**
- Verifica se o ficheiro `.env` existe na raiz do projeto
- Verifica se as variáveis começam com `VITE_`
- Reinicia o servidor após criar/editar o `.env`

**"Invalid API key"**
- Verifica se copiaste a `anon` key e não a `service_role`
- Verifica se não há espaços extras no `.env`

**"User not found" no login**
- Verifica se criaste o utilizador no Supabase Dashboard
- Verifica se marcaste "Auto Confirm User"
- Verifica se o email está correto: `admin@junifeup.pt`
