import type { SeatWithReservation } from '../types/database'

interface SeatingChartProps {
  seats: SeatWithReservation[]
  onSeatClick: (seat: SeatWithReservation) => void
  selectedSeatId?: string | null
  showNames?: boolean
}

export default function SeatingChart({ 
  seats, 
  onSeatClick, 
  selectedSeatId,
  showNames = false
}: SeatingChartProps) {
  // Group seats by zone
  const zone1Seats = seats.filter(s => s.zone === 1)
  const zone2Seats = seats.filter(s => s.zone === 2)

  // Separate tables and chairs in zone 1
  const zone1Tables = zone1Seats.filter(s => s.type === 'table')
  const zone1Chairs = zone1Seats.filter(s => s.type === 'chair')

  // Group tables by table_number
  const tablesByNumber: Record<number, SeatWithReservation[]> = {}
  zone1Tables.forEach(seat => {
    const tableNum = seat.table_number || 0
    if (!tablesByNumber[tableNum]) {
      tablesByNumber[tableNum] = []
    }
    tablesByNumber[tableNum].push(seat)
  })

  // Group chairs by row
  const chairsByRow: Record<number, SeatWithReservation[]> = {}
  zone1Chairs.forEach(seat => {
    if (!chairsByRow[seat.row]) {
      chairsByRow[seat.row] = []
    }
    chairsByRow[seat.row].push(seat)
  })

  const zone2ChairsByRow: Record<number, SeatWithReservation[]> = {}
  zone2Seats.forEach(seat => {
    if (!zone2ChairsByRow[seat.row]) {
      zone2ChairsByRow[seat.row] = []
    }
    zone2ChairsByRow[seat.row].push(seat)
  })

  const getSeatColor = (seat: SeatWithReservation) => {
    if (seat.id === selectedSeatId) {
      return 'bg-blue-500 text-white'
    }
    // If reserved by someone else
    if (!seat.is_available || seat.reservation) {
      return 'bg-gray-400 text-white cursor-not-allowed'
    }
    if (seat.type === 'table') {
      return 'bg-juni-purple text-white hover:opacity-90 cursor-pointer'
    }
    return 'bg-juni-navy text-white hover:opacity-90 cursor-pointer'
  }

  const handleSeatClick = (seat: SeatWithReservation) => {
    // Only allow click if available
    if (seat.is_available && !seat.reservation) {
      onSeatClick(seat)
    }
  }

  if (seats.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
        <h3 className="text-xl md:text-2xl font-bold text-center mb-6">
          Escolhe o teu lugar
        </h3>
        <p className="text-center text-gray-500 dark:text-gray-400">A carregar lugares...</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-6 shadow-lg dark:shadow-2xl max-w-4xl mx-auto">
      <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
        Escolhe o teu lugar
      </h3>

      {/* Screen */}
      <div className="mb-6">
        <div className="bg-gradient-screen h-4 md:h-5 rounded-lg mb-2"></div>
        <div className="text-center text-gray-500 dark:text-gray-400 font-medium text-sm md:text-base">
          ECRÃ
        </div>
      </div>

      {/* Zone 1 */}
      <div className="mb-8">
        <div className="text-center mb-4 font-semibold text-gray-700 dark:text-gray-300">OFFICE</div>
        
        {/* Tables and Central Chairs Layout */}
        <div className="flex flex-col gap-4 mb-4">
          {/* Tables Row - 2 tables on each side */}
          <div className="flex justify-between items-start gap-0.5 md:gap-1">
            {/* Left Tables */}
            <div className="flex flex-col gap-2">
              {[1, 2].map(tableNum => (
                <div key={tableNum} className="flex flex-col gap-1">
                    <div className="text-xs text-gray-600 dark:text-gray-400 text-center mb-1">
                      Mesa {tableNum}
                    </div>
                  <div className="flex flex-col gap-1">
                    {tablesByNumber[tableNum]?.map(seat => (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatClick(seat)}
                        disabled={!seat.is_available || !!seat.reservation}
                        className={`w-12 md:w-16 h-8 md:h-10 rounded text-xs md:text-sm font-semibold transition-colors ${getSeatColor(seat)}`}
                        title={showNames && seat.reservation ? seat.reservation.name : String(seat.position)}
                      >
                        {showNames && seat.reservation ? (
                          <span className="text-[8px] md:text-xs">{seat.reservation.name}</span>
                        ) : (
                          seat.position
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Central Chairs - 3 rows of 4, then 3 rows of 6 */}
            <div className="flex-1 flex flex-col gap-2 items-center">
              {/* First 3 rows: 4 chairs each */}
              {[1, 2, 3].map(row => (
                <div key={row} className="flex gap-1 md:gap-2 justify-center">
                  {chairsByRow[row]?.filter(s => s.type === 'chair').sort((a, b) => Number(a.position) - Number(b.position)).map(seat => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      disabled={!seat.is_available || !!seat.reservation}
                      className={`w-8 md:w-12 h-8 md:h-12 rounded-full text-xs md:text-sm font-semibold transition-colors ${getSeatColor(seat)}`}
                      title={showNames && seat.reservation ? seat.reservation.name : String(seat.position)}
                    >
                      {showNames && seat.reservation ? (
                        <span className="text-[8px] md:text-xs">{seat.reservation.name}</span>
                      ) : (
                        seat.position
                      )}
                    </button>
                  ))}
                </div>
              ))}
              
              {/* Next 3 rows: 6 chairs each */}
              {[4, 5, 6].map(row => (
                <div key={row} className="flex gap-1 md:gap-2 justify-center">
                  {chairsByRow[row]?.sort((a, b) => Number(a.position) - Number(b.position)).map(seat => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      disabled={!seat.is_available || !!seat.reservation}
                      className={`w-8 md:w-12 h-8 md:h-12 rounded-full text-xs md:text-sm font-semibold transition-colors ${getSeatColor(seat)}`}
                      title={showNames && seat.reservation ? seat.reservation.name : String(seat.position)}
                    >
                      {showNames && seat.reservation ? (
                        <span className="text-[8px] md:text-xs">{seat.reservation.name}</span>
                      ) : (
                        seat.position
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* Right Tables */}
            <div className="flex flex-col gap-2">
              {[3, 4].map(tableNum => (
                <div key={tableNum} className="flex flex-col gap-1">
                    <div className="text-xs text-gray-600 dark:text-gray-400 text-center mb-1">
                      Mesa {tableNum}
                    </div>
                  <div className="flex flex-col gap-1">
                    {tablesByNumber[tableNum]?.map(seat => (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatClick(seat)}
                        disabled={!seat.is_available || !!seat.reservation}
                        className={`w-12 md:w-16 h-8 md:h-10 rounded text-xs md:text-sm font-semibold transition-colors ${getSeatColor(seat)}`}
                        title={showNames && seat.reservation ? seat.reservation.name : String(seat.position)}
                      >
                        {showNames && seat.reservation ? (
                          <span className="text-[8px] md:text-xs">{seat.reservation.name}</span>
                        ) : (
                          seat.position
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Passage */}
      <div className="border-t-2 border-dashed border-gray-400 dark:border-gray-600 my-6">
        <div className="text-center -mt-3">
          <span className="bg-white dark:bg-slate-800 px-4 text-sm text-gray-600 dark:text-gray-400">PASSAGEM</span>
        </div>
      </div>

      {/* Zone 2 */}
      <div>
        <div className="text-center mb-4 font-semibold text-gray-700 dark:text-gray-300">SALA DE REUNIÕES</div>
        <div className="flex flex-col gap-2 items-center">
          {[1, 2, 3, 4, 5, 6].map(row => (
            <div key={row} className="flex gap-1 md:gap-2 justify-center">
              {zone2ChairsByRow[row]?.sort((a, b) => Number(a.position) - Number(b.position)).map(seat => (
                <button
                  key={seat.id}
                  onClick={() => handleSeatClick(seat)}
                  disabled={!seat.is_available || !!seat.reservation}
                  className={`w-8 md:w-12 h-8 md:h-12 rounded-full text-xs md:text-sm font-semibold transition-colors ${getSeatColor(seat)}`}
                  title={showNames && seat.reservation ? seat.reservation.name : String(seat.position)}
                >
                  {showNames && seat.reservation ? (
                    <span className="text-[8px] md:text-xs">{seat.reservation.name}</span>
                  ) : (
                    seat.position
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-juni-navy rounded"></div>
          <span className="text-gray-800 dark:text-gray-100 font-medium">Disponível</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <span className="text-gray-800 dark:text-gray-100 font-medium">Ocupado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-juni-purple rounded"></div>
          <span className="text-gray-800 dark:text-gray-100 font-medium">Mesa</span>
        </div>
      </div>
    </div>
  )
}
