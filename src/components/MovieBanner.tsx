import { Calendar, Clock, Film, MapPin } from 'lucide-react'
import type { Movie } from '../types/database'

interface MovieBannerProps {
  movie: Movie | null
}

export default function MovieBanner({ movie }: MovieBannerProps) {
  if (!movie) {
    return (
      <div className="bg-juni-navy rounded-2xl p-6 md:p-8 text-white">
        <p className="text-center">Nenhum filme em cartaz no momento.</p>
      </div>
    )
  }

  return (
    <div className="bg-juni-navy dark:bg-slate-800 rounded-2xl p-6 md:p-8 text-white shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <Film className="w-5 h-5" />
        <span className="text-sm md:text-base font-semibold">EM CARTAZ</span>
      </div>
      
      <h2 className="text-2xl md:text-4xl font-bold mb-4">{movie.title}</h2>
      
      <p className="text-sm md:text-base text-gray-200 dark:text-gray-300 mb-6 leading-relaxed">
        {movie.synopsis}
      </p>
      
      <div className="flex flex-col gap-4 text-sm md:text-base">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 md:w-5 md:h-5" />
          <span className="font-semibold">JuniFEUP</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 md:w-5 md:h-5" />
            <span>{new Date(movie.session_date).toLocaleDateString('pt-PT', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 md:w-5 md:h-5" />
            <span>{movie.session_time}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
