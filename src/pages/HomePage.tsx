import { useNavigate } from 'react-router-dom'
import { useMovie } from '../hooks/useMovie'
import Header from '../components/Header'
import { Calendar, Clock, Film, MapPin } from 'lucide-react'

export default function HomePage() {
  const navigate = useNavigate()
  const { movie, loading } = useMovie()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 w-full">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-800 dark:text-gray-200">A carregar...</div>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 w-full">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-lg">
            <p className="text-gray-600 dark:text-gray-300">Nenhum filme em cartaz no momento.</p>
          </div>
        </div>
      </div>
    )
  }

  const handlePosterClick = () => {
    navigate('/reserve')
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-juni-navy dark:bg-juni-purple text-white rounded-full">
            <Film className="w-4 h-4" />
            <span className="text-sm font-semibold">EM CARTAZ</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Escolhe o teu filme
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <div 
            onClick={handlePosterClick}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden cursor-pointer transform transition-all hover:scale-[1.01] hover:shadow-2xl flex flex-col md:flex-row"
          >
            {/* Movie Poster - Narrower */}
            {movie.poster_url && movie.poster_url !== 'https://example.com/poster.jpg' ? (
              <div className="relative w-full md:w-1/3 flex-shrink-0">
                <img 
                  src={movie.poster_url} 
                  alt={movie.title}
                  className="w-full h-full object-cover min-h-[300px] md:min-h-[400px]"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity bg-white bg-opacity-90 px-4 py-2 rounded-full font-semibold text-juni-navy text-sm">
                    Reservar lugar →
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full md:w-1/3 flex-shrink-0 min-h-[300px] md:min-h-[400px] bg-gradient-to-br from-juni-navy to-juni-purple flex items-center justify-center p-6">
                <div className="text-center text-white">
                  <Film className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <h2 className="text-xl md:text-2xl font-bold mb-2">{movie.title}</h2>
                </div>
              </div>
            )}

            {/* Movie Info */}
            <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  {movie.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm md:text-base">
                  {movie.synopsis}
                </p>
                
                <div className="flex flex-col gap-3 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span className="font-semibold">JuniFEUP</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(movie.session_date).toLocaleDateString('pt-PT', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span>{movie.session_time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePosterClick}
                className="w-full bg-gradient-juni text-white py-3 rounded-lg font-semibold text-base hover:opacity-90 transition-opacity shadow-md"
              >
                Reservar Lugar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
