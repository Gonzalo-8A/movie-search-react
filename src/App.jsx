import { useCallback } from 'react'
import useSearch from './hooks/useSearch.js'
import useMovies from './hooks/useMovies.js'
import Movies from './components/Movies.jsx'
import debounce from 'just-debounce-it'

import './App.css'

export default function App () {
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search })

  const debounceGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300)
    , [])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    if (newSearch.startsWith(' ')) return
    updateSearch(newSearch)
    debounceGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            name='moviesForm'
            autocomplete='off'
            style={{
              border: '2px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            value={search}
            onChange={handleChange}
            placeholder='Avengers, StarWars, The Matrix...'
          />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        {loading
          ? (
            <p className='loading-text'>Cargando...</p>
            )
          : (
            <Movies movies={movies} error={error} />
            )}
      </main>
    </div>
  )
}
