import { useCallback, useRef, useState } from 'react'
import { searchMovies } from '../services/movies.js'

export default function useMovies ({ search }) {
  const [movies, setMovies] = useState([null])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })

      const getLastYear = (year) => {
        const matches = year.match(/\d{4}/g)
        if (!matches) return 0
        return parseInt(matches[matches.length - 1], 10)
      }

      const sortedMovies = newMovies.length > 0
        ? [...newMovies].sort((a, b) => getLastYear(b.year) - getLastYear(a.year))
        : []

      setMovies(sortedMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { movies, getMovies, loading, error }
}
