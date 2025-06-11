import { useEffect, useState, useRef } from 'react'

export default function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      if (search === '') return
      isFirstInput.current = false
    }

    if (search === '') {
      setError('No se pueden buscar películas vacías')
      return
    }
    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }
    setError(null)
  }, [search])

  return { search, updateSearch, error }
}
