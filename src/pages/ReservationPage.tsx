import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useSeats } from '../hooks/useSeats'
import type { SeatWithReservation } from '../types/database'
import Header from '../components/Header'
import SeatingChart from '../components/SeatingChart'
import NameModal from '../components/NameModal'

export default function ReservationPage() {
  const { seats, loading: seatsLoading, refetch: refetchSeats } = useSeats()
  const [selectedSeat, setSelectedSeat] = useState<SeatWithReservation | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSeatId, setSelectedSeatId] = useState<string | null>(null)
  const [reservationConfirmed, setReservationConfirmed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSeatClick = (seat: SeatWithReservation) => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    if (!supabaseUrl) {
      setError('Supabase não está configurado. Configura as variáveis de ambiente primeiro.')
      return
    }

    // If seat is already reserved by someone else
    if (!seat.is_available || seat.reservation) {
      setError('Este lugar já está reservado por outra pessoa.')
      setTimeout(() => setError(null), 3000)
      return
    }

    // Open modal for available seat
    setSelectedSeat(seat)
    setIsModalOpen(true)
    setError(null)
  }

  const handleModalConfirm = async (name: string) => {
    if (!selectedSeat) return

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    if (!supabaseUrl) {
      setError('Supabase não está configurado. Configura as variáveis de ambiente primeiro.')
      return
    }

    try {
      setError(null)
      const { error: reservationError } = await supabase
        .from('reservations')
        .insert({
          seat_id: selectedSeat.id,
          name: name,
        })

      if (reservationError) throw reservationError

      setSelectedSeatId(selectedSeat.id)
      setReservationConfirmed(true)
      setIsModalOpen(false)
      setSelectedSeat(null)
      refetchSeats()

      // Reset after 3 seconds
      setTimeout(() => {
        setReservationConfirmed(false)
        setSelectedSeatId(null)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer reserva')
      console.error('Error making reservation:', err)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedSeat(null)
    setError(null)
  }

  if (seatsLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 w-full">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-800 dark:text-gray-200">A carregar...</div>
        </div>
      </div>
    )
  }

  const confirmedSeat = seats.find(s => s.id === selectedSeatId)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 space-y-6">
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {reservationConfirmed && confirmedSeat && (
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg text-center">
            <p className="font-semibold">Reserva confirmada!</p>
            <p>
              O teu lugar é: Zona {confirmedSeat.zone},{' '}
              {confirmedSeat.type === 'table'
                ? `Mesa ${confirmedSeat.table_number}, Lugar ${confirmedSeat.position}`
                : `Fila ${confirmedSeat.row}, Lugar ${confirmedSeat.position}`}
            </p>
          </div>
        )}

        <SeatingChart
          seats={seats}
          onSeatClick={handleSeatClick}
          selectedSeatId={selectedSeatId}
        />

        <NameModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          seat={selectedSeat}
          error={isModalOpen ? error : null}
        />
      </div>
    </div>
  )
}
