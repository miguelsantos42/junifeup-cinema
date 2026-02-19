export interface Movie {
  id: string
  title: string
  poster_url: string
  synopsis: string
  session_date: string
  session_time: string
  created_at: string
  updated_at: string
}

export interface Seat {
  id: string
  type: 'table' | 'chair'
  zone: 1 | 2
  row: number
  position: number | string // For tables: 'A' or 'B', for chairs: 1-6
  table_number?: number // Only for table seats
  created_at: string
}

export interface Reservation {
  id: string
  seat_id: string
  name: string
  created_at: string
  seat?: Seat
}

export interface SeatWithReservation extends Seat {
  reservation?: Reservation | null
  is_available: boolean
}
