import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useMovie } from '../hooks/useMovie'
import { useSeats } from '../hooks/useSeats'
import SeatingChart from '../components/SeatingChart'
import { LogOut, Trash2, RotateCcw } from 'lucide-react'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { movie, loading: movieLoading, refetch: refetchMovie } = useMovie()
  const { seats, loading: seatsLoading, refetch: refetchSeats } = useSeats()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  // Movie form state
  const [title, setTitle] = useState('')
  const [posterUrl, setPosterUrl] = useState('')
  const [synopsis, setSynopsis] = useState('')
  const [sessionDate, setSessionDate] = useState('')
  const [sessionTime, setSessionTime] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (movie) {
      setTitle(movie.title)
      setPosterUrl(movie.poster_url)
      setSynopsis(movie.synopsis)
      setSessionDate(movie.session_date.split('T')[0])
      setSessionTime(movie.session_time)
    }
  }, [movie])

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setIsAuthenticated(true)
      } else {
        navigate('/admin')
      }
    } catch (err) {
      console.error('Auth check error:', err)
      navigate('/admin')
    } finally {
      setCheckingAuth(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const handleSaveMovie = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (movie) {
        // Update existing movie
        const { error } = await supabase
          .from('movies')
          .update({
            title,
            poster_url: posterUrl,
            synopsis,
            session_date: sessionDate,
            session_time: sessionTime,
            updated_at: new Date().toISOString(),
          })
          .eq('id', movie.id)

        if (error) throw error
      } else {
        // Create new movie
        const { error } = await supabase
          .from('movies')
          .insert({
            title,
            poster_url: posterUrl,
            synopsis,
            session_date: sessionDate,
            session_time: sessionTime,
          })

        if (error) throw error
      }

      refetchMovie()
      alert('Filme atualizado com sucesso!')
    } catch (err) {
      console.error('Error saving movie:', err)
      alert('Erro ao guardar filme')
    } finally {
      setSaving(false)
    }
  }

  const handleFreeSeat = async (seatId: string) => {
    if (!confirm('Tens a certeza que queres libertar este lugar?')) return

    try {
      const { error } = await supabase
        .from('reservations')
        .delete()
        .eq('seat_id', seatId)

      if (error) throw error
      refetchSeats()
    } catch (err) {
      console.error('Error freeing seat:', err)
      alert('Erro ao libertar lugar')
    }
  }

  const handleResetSession = async () => {
    if (!confirm('Tens a certeza que queres apagar TODAS as reservas? Esta ação não pode ser desfeita.')) return

    try {
      const { error } = await supabase
        .from('reservations')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

      if (error) throw error
      refetchSeats()
      alert('Todas as reservas foram apagadas!')
    } catch (err) {
      console.error('Error resetting session:', err)
      alert('Erro ao resetar sessão')
    }
  }

  if (checkingAuth || movieLoading || seatsLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div>A carregar...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-black text-white shadow-2xl border-b border-gray-900">
        <nav className="max-w-7xl mx-auto px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold">Admin Dashboard</h1>
            <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-900 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden md:inline">Sair</span>
          </button>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 space-y-6">
        {/* Movie Management */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Gestão do Filme</h2>
          <form onSubmit={handleSaveMovie} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-juni-purple"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL do Poster
              </label>
              <input
                type="url"
                value={posterUrl}
                onChange={(e) => setPosterUrl(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-juni-purple"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sinopse
              </label>
              <textarea
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-juni-purple"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data da Sessão
                </label>
                <input
                  type="date"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-juni-purple"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora da Sessão
                </label>
                <input
                  type="time"
                  value={sessionTime}
                  onChange={(e) => setSessionTime(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-juni-purple"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full md:w-auto px-6 py-3 bg-gradient-juni text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? 'A guardar...' : 'Guardar Filme'}
            </button>
          </form>
        </div>

        {/* Reset Session Button */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <button
            onClick={handleResetSession}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Resetar Todas as Reservas
          </button>
        </div>

        {/* Seating Chart with Names */}
        <SeatingChart
          seats={seats}
          onSeatClick={(seat) => {
            if (seat.reservation) {
              handleFreeSeat(seat.id)
            }
          }}
          showNames={true}
        />

        {/* Reservations List */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Lista de Reservas</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Nome</th>
                  <th className="text-left py-2 px-4">Zona</th>
                  <th className="text-left py-2 px-4">Tipo</th>
                  <th className="text-left py-2 px-4">Lugar</th>
                  <th className="text-left py-2 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {seats
                  .filter(s => s.reservation)
                  .map(seat => (
                    <tr key={seat.id} className="border-b">
                      <td className="py-2 px-4">{seat.reservation?.name}</td>
                      <td className="py-2 px-4">Zona {seat.zone}</td>
                      <td className="py-2 px-4">
                        {seat.type === 'table' ? 'Mesa' : 'Cadeira'}
                      </td>
                      <td className="py-2 px-4">
                        {seat.type === 'table'
                          ? `Mesa ${seat.table_number}, ${seat.position}`
                          : `Fila ${seat.row}, ${seat.position}`}
                      </td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => handleFreeSeat(seat.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {seats.filter(s => s.reservation).length === 0 && (
              <p className="text-center py-4 text-gray-500">Nenhuma reserva ainda</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
