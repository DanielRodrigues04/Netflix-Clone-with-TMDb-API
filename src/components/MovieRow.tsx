import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Info } from 'lucide-react';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  overview: string;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-white mb-4 px-12">{title}</h2>
      <div className="group relative">
        <ChevronLeft
          className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer opacity-0 group-hover:opacity-100 transition z-10 bg-black/50 rounded-full p-1 text-white hover:bg-black/80"
          size={40}
          onClick={() => scroll('left')}
        />
        <div
          ref={rowRef}
          className="flex space-x-4 overflow-x-hidden scroll-smooth px-12"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative flex-none w-[200px] transition duration-200 ease-out transform hover:scale-105"
              onMouseEnter={() => setIsHovered(movie.id)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-md object-cover cursor-pointer"
              />
              {isHovered === movie.id && (
                <div className="absolute inset-0 bg-black bg-opacity-75 rounded-md flex flex-col justify-between p-4 transition-opacity duration-200">
                  <h3 className="text-white font-semibold">{movie.title}</h3>
                  <p className="text-gray-300 text-sm line-clamp-3 mb-4">{movie.overview}</p>
                  <div className="flex space-x-2">
                    <button className="flex items-center justify-center bg-white text-black rounded-md px-4 py-1 text-sm font-semibold hover:bg-gray-200">
                      <Play size={16} className="mr-1" /> Play
                    </button>
                    <button className="flex items-center justify-center bg-gray-600 text-white rounded-md px-4 py-1 text-sm font-semibold hover:bg-gray-700">
                      <Info size={16} className="mr-1" /> Info
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <ChevronRight
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer opacity-0 group-hover:opacity-100 transition z-10 bg-black/50 rounded-full p-1 text-white hover:bg-black/80"
          size={40}
          onClick={() => scroll('right')}
        />
      </div>
    </div>
  );
};

export default MovieRow;