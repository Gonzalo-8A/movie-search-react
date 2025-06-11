import { useState } from 'react'
import './Movies.css'

export default function Movies ({ movies, error }) {
  const [posterExists, setPosterExists] = useState({})

  const handleImageError = (id) => {
    setPosterExists((prev) => ({ ...prev, [id]: false }))
  }

  const handleImageLoad = (id) => {
    setPosterExists((prev) => ({ ...prev, [id]: true }))
  }

  const noResults = () => {
    if (movies[0] === null) {
      return <p style={{ textAlign: 'center' }}>Haz tu primera búsqueda</p>
    }
    if (!error) {
      return <p style={{ textAlign: 'center' }}>No se encontraron películas para esta búsqueda</p>
    }
  }

  return movies.length > 1
    ? (
      <ul className='movies-list'>
        {movies.map((movie) => (
          <li className='movie' key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>

            <div className='flip-container'>
              <div className='flipper'>
                {posterExists[movie.id] === false
                  ? (
                    <div className='poster-fallback'>
                      <p>{movie.title}</p>
                    </div>
                    )
                  : (
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      onError={() => handleImageError(movie.id)}
                      onLoad={() => handleImageLoad(movie.id)}
                      className='front'
                    />
                    )}

                <div className='back'>
                  <p>{movie.plot === 'N/A' ? 'No se encontró una sinopsis.' : movie.plot}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      )
    : noResults()
}
