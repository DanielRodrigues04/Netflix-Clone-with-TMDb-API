import React, { useEffect, useState } from 'react';
import { getMovies } from './services/api';
import Banner from './components/Banner';
import MovieRow from './components/MovieRow';
import CategorySelector from './components/CategorySelector';

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
}

type Category = 'all' | 'trending' | 'popular' | 'topRated';

function App() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trending, popular, topRated] = await Promise.all([
          getMovies('/trending/movie/week'),
          getMovies('/movie/popular'),
          getMovies('/movie/top_rated')
        ]);

        if (trending.results?.length > 0) {
          setTrendingMovies(trending.results);
          setFeaturedMovie(trending.results[0]);
        }
        
        if (popular.results?.length > 0) {
          setPopularMovies(popular.results);
        }
        
        if (topRated.results?.length > 0) {
          setTopRatedMovies(topRated.results);
        }
      } catch (err) {
        setError('Não foi possível carregar os filmes. Por favor, tente novamente mais tarde.');
        if (err instanceof Error) {
          console.error('Error fetching movies:', err.message);
        } else {
          console.error('Error fetching movies:', String(err));
        }
      }
    };

    fetchMovies();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Ops! Algo deu errado</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!featuredMovie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl">Carregando...</h1>
        </div>
      </div>
    );
  }

  const renderMovieRows = () => {
    switch (selectedCategory) {
      case 'trending':
        return trendingMovies.length > 0 && (
          <MovieRow title="Tendências da Semana" movies={trendingMovies} />
        );
      case 'popular':
        return popularMovies.length > 0 && (
          <MovieRow title="Populares na Netflix" movies={popularMovies} />
        );
      case 'topRated':
        return topRatedMovies.length > 0 && (
          <MovieRow title="Mais Bem Avaliados" movies={topRatedMovies} />
        );
      default:
        return (
          <>
            {trendingMovies.length > 0 && (
              <MovieRow title="Tendências da Semana" movies={trendingMovies} />
            )}
            {popularMovies.length > 0 && (
              <MovieRow title="Populares na Netflix" movies={popularMovies} />
            )}
            {topRatedMovies.length > 0 && (
              <MovieRow title="Mais Bem Avaliados" movies={topRatedMovies} />
            )}
          </>
        );
    }
  };

  return (
    <div className="relative bg-black min-h-screen">
     
      <Banner movie={featuredMovie} />
     
        <div className="space-y-12 mt-8">
          {renderMovieRows()}
        </div>
      </div>
  
  );
}

export default App;