const apiKey = import.meta.env.VITE_OMDB_APIKEY

export const searchMovies = async ({ search }) => {
  if (!search) {
    return []
  }

  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}`)
    const data = await res.json()
    const searchResults = data.Search || []

    const detailedMovies = await Promise.all(
      searchResults.map(async (movie) => {
        const resPlot = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${movie.Title}`)
        const plotData = await resPlot.json()
        return {
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster,
          plot: plotData.Plot || 'No se encontró una sinopsis.'
        }
      })
    )
    return detailedMovies
  } catch (e) {
    throw new Error('Error searching movies')
  }
}
