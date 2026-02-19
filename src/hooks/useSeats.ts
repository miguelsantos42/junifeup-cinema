import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { SeatWithReservation, Reservation } from '../types/database'

export function useSeats() {
  const [seats, setSeats] = useState<SeatWithReservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSeats()

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    if (!supabaseUrl) {
      return
    }

    // Subscribe to changes
    const channel = supabase
      .channel('seats_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'reservations' },
        () => {
          fetchSeats()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const generateMockSeats = (): SeatWithReservation[] => {
    const seats: SeatWithReservation[] = []
    
    // Zone 1: Tables (4 tables, 2 seats each)
    for (let tableNum = 1; tableNum <= 4; tableNum++) {
      seats.push({
        id: `table-${tableNum}-A`,
        type: 'table',
        zone: 1,
        row: 1,
        position: 'A',
        table_number: tableNum,
        created_at: new Date().toISOString(),
        reservation: null,
        is_available: true,
      })
      seats.push({
        id: `table-${tableNum}-B`,
        type: 'table',
        zone: 1,
        row: 1,
        position: 'B',
        table_number: tableNum,
        created_at: new Date().toISOString(),
        reservation: null,
        is_available: true,
      })
    }

    // Zone 1: Central chairs - 3 rows of 4, then 3 rows of 6
    // First 3 rows: 4 chairs each
    for (let row = 1; row <= 3; row++) {
      for (let pos = 1; pos <= 4; pos++) {
        seats.push({
          id: `zone1-chair-${row}-${pos}`,
          type: 'chair',
          zone: 1,
          row: row,
          position: pos,
          created_at: new Date().toISOString(),
          reservation: null,
          is_available: true,
        })
      }
    }
    
    // Next 3 rows: 6 chairs each
    for (let row = 4; row <= 6; row++) {
      for (let pos = 1; pos <= 6; pos++) {
        seats.push({
          id: `zone1-chair-${row}-${pos}`,
          type: 'chair',
          zone: 1,
          row: row,
          position: pos,
          created_at: new Date().toISOString(),
          reservation: null,
          is_available: true,
        })
      }
    }

    // Zone 2: 4 rows of 6 chairs
    for (let row = 1; row <= 4; row++) {
      for (let pos = 1; pos <= 6; pos++) {
        seats.push({
          id: `zone2-chair-${row}-${pos}`,
          type: 'chair',
          zone: 2,
          row: row,
          position: pos,
          created_at: new Date().toISOString(),
          reservation: null,
          is_available: true,
        })
      }
    }

    return seats
  }

  const fetchSeats = async () => {
    try {
      setLoading(true)
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      if (!supabaseUrl) {
        // Use mock seats when Supabase is not configured
        setSeats(generateMockSeats())
        setLoading(false)
        return
      }

      const { data: seatsData, error: seatsError } = await supabase
        .from('seats')
        .select('*')
        .order('zone')
        .order('row')
        .order('position')

      if (seatsError) throw seatsError

      const { data: reservationsData, error: reservationsError } = await supabase
        .from('reservations')
        .select('*')

      if (reservationsError) throw reservationsError

      // Map reservations to seats
      const seatsWithReservations: SeatWithReservation[] = (seatsData || []).map(seat => {
        const reservation = (reservationsData || []).find(
          (r: Reservation) => r.seat_id === seat.id
        )
        return {
          ...seat,
          reservation: reservation || null,
          is_available: !reservation,
        }
      })

      setSeats(seatsWithReservations)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar lugares')
      console.error('Error fetching seats:', err)
      // Fallback to mock seats on error
      setSeats(generateMockSeats())
    } finally {
      setLoading(false)
    }
  }

  return { seats, loading, error, refetch: fetchSeats }
}
