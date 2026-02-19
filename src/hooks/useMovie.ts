import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Movie } from '../types/database'

export function useMovie() {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMovie()

    // Subscribe to changes
    const channel = supabase
      .channel('movies_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'movies' },
        () => {
          fetchMovie()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchMovie = async () => {
    try {
      setLoading(true)
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      if (!supabaseUrl) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error) throw error
      setMovie(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar filme')
      console.error('Error fetching movie:', err)
    } finally {
      setLoading(false)
    }
  }

  return { movie, loading, error, refetch: fetchMovie }
}
