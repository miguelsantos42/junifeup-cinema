/**
 * Script para criar utilizador admin no Supabase
 * 
 * Para executar:
 * 1. Instala as dependências: npm install @supabase/supabase-js dotenv
 * 2. Cria um ficheiro .env.local com:
 *    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
 *    SUPABASE_URL=your_supabase_url
 * 3. Executa: node scripts/create-admin.js
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '..', '.env.local') })

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Erro: Precisas de SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local')
  console.error('\nPara obter a Service Role Key:')
  console.error('1. Vai ao Supabase Dashboard')
  console.error('2. Settings > API')
  console.error('3. Copia a "service_role" key (NÃO a anon key!)')
  process.exit(1)
}

// Usa service_role para ter permissões de admin
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createAdmin() {
  const adminEmail = 'admin@junifeup.pt'
  const adminPassword = '12345678!'

  try {
    console.log('🔄 A criar utilizador admin...')
    
    const { data, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true, // Confirma o email automaticamente
    })

    if (error) {
      if (error.message.includes('already registered')) {
        console.log('✅ Utilizador admin já existe!')
        console.log(`   Email: ${adminEmail}`)
        console.log(`   Password: ${adminPassword}`)
        return
      }
      throw error
    }

    console.log('✅ Utilizador admin criado com sucesso!')
    console.log(`   Email: ${adminEmail}`)
    console.log(`   Password: ${adminPassword}`)
    console.log(`   ID: ${data.user?.id}`)
    console.log('\n🎉 Agora podes fazer login em /admin com estas credenciais!')
  } catch (err) {
    console.error('❌ Erro ao criar utilizador:', err.message)
    process.exit(1)
  }
}

createAdmin()
