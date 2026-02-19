# JuniFeup Cinema

Website de reserva de lugares para sessões de cinema da JuniFeup.

## Funcionalidades

- **Página Principal**: Reserva de lugares interativa
- **Página Admin**: Gestão de filmes e visualização de reservas
- **Tempo Real**: Atualizações em tempo real das reservas
- **Responsivo**: Totalmente adaptável a mobile, tablet e desktop

## Tecnologias

- React + TypeScript
- Vite
- Supabase (Backend & Auth)
- Tailwind CSS
- React Router

## Configuração

### 1. Variáveis de Ambiente

Cria um ficheiro `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Base de Dados Supabase

Cria as seguintes tabelas no Supabase:

#### Tabela `movies`
```sql
CREATE TABLE movies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  poster_url TEXT,
  synopsis TEXT NOT NULL,
  session_date DATE NOT NULL,
  session_time TIME NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Tabela `seats`
```sql
CREATE TABLE seats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('table', 'chair')),
  zone INTEGER NOT NULL CHECK (zone IN (1, 2)),
  row INTEGER NOT NULL,
  position TEXT NOT NULL,
  table_number INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Tabela `reservations`
```sql
CREATE TABLE reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seat_id UUID NOT NULL REFERENCES seats(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(seat_id)
);
```

### 3. Row Level Security (RLS)

#### Políticas para `movies`:
```sql
-- Qualquer pessoa pode ler
CREATE POLICY "Anyone can read movies" ON movies
  FOR SELECT USING (true);

-- Apenas admins podem inserir/atualizar/apagar
CREATE POLICY "Only admins can manage movies" ON movies
  FOR ALL USING (auth.role() = 'authenticated');
```

#### Políticas para `seats`:
```sql
-- Qualquer pessoa pode ler
CREATE POLICY "Anyone can read seats" ON seats
  FOR SELECT USING (true);
```

#### Políticas para `reservations`:
```sql
-- Qualquer pessoa pode ler
CREATE POLICY "Anyone can read reservations" ON reservations
  FOR SELECT USING (true);

-- Qualquer pessoa pode criar reservas
CREATE POLICY "Anyone can create reservations" ON reservations
  FOR INSERT WITH CHECK (true);

-- Apenas admins podem apagar
CREATE POLICY "Only admins can delete reservations" ON reservations
  FOR DELETE USING (auth.role() = 'authenticated');
```

### 4. Inicializar Lugares

Para inicializar os lugares na base de dados, podes:

1. Executar a função `initializeSeats()` no browser console após fazer login como admin
2. Ou criar um script SQL no Supabase:

```sql
-- Zone 1: Tables (4 tables, 2 seats each)
INSERT INTO seats (type, zone, row, position, table_number) VALUES
  ('table', 1, 1, 'A', 1), ('table', 1, 1, 'B', 1),
  ('table', 1, 1, 'A', 2), ('table', 1, 1, 'B', 2),
  ('table', 1, 1, 'A', 3), ('table', 1, 1, 'B', 3),
  ('table', 1, 1, 'A', 4), ('table', 1, 1, 'B', 4);

-- Zone 1: Central chairs - 3 rows of 4
INSERT INTO seats (type, zone, row, position)
SELECT 'chair', 1, row, pos
FROM generate_series(1, 3) AS row,
     generate_series(1, 4) AS pos;

-- Zone 1: Additional 3 rows of 6 chairs
INSERT INTO seats (type, zone, row, position)
SELECT 'chair', 1, row, pos
FROM generate_series(4, 6) AS row,
     generate_series(1, 6) AS pos;

-- Zone 2: 6 rows of 6 chairs
INSERT INTO seats (type, zone, row, position)
SELECT 'chair', 2, row, pos
FROM generate_series(1, 6) AS row,
     generate_series(1, 6) AS pos;
```

### 5. Criar Utilizador Admin

**Método Recomendado (Supabase Dashboard):**

1. Vai ao teu projeto no [Supabase Dashboard](https://app.supabase.com)
2. No menu lateral, clica em **Authentication** > **Users**
3. Clica no botão **"Add user"** ou **"Invite user"**
4. Preenche:
   - **Email**: 
   - **Password**: 
   - Marca **"Auto Confirm User"** (para não precisar de confirmar email)
5. Clica em **"Create user"**

Agora podes fazer login em `/admin` com estas credenciais!

**Nota**: Utilizadores normais NÃO precisam de fazer login - apenas inserem o nome completo ao fazer a reserva.

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Estrutura de Lugares

### Zona 1
- **Mesas**: 4 mesas (2 de cada lado), cada uma com 2 lugares (A e B) na vertical
- **Cadeiras Centrais**: 3 filas de 4 cadeiras entre as mesas
- **Cadeiras Adicionais**: 3 filas de 6 cadeiras

### Zona 2
- **Cadeiras**: 6 filas de 6 cadeiras

## Cores

- Navy: `#1B1F3B` (cor principal)
- Purple: `#6B46C1` (acentos)
- Background: `#F5F5F5` (fundo claro)
