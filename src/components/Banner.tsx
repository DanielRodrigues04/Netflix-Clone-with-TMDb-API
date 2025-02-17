import React from 'react';
import { Play, Info } from 'lucide-react';

interface Movie {
  backdrop_path: string;
  title: string;
  overview: string;
}

interface BannerProps {
  movie: Movie;
}

const Banner: React.FC<BannerProps> = ({ movie }) => {
  return (
    <div className="relative h-[80vh] w-full">
      <div className="absolute w-full h-full">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <div className="absolute bottom-0 px-12 py-24 space-y-6 w-full md:w-2/3">
        <h1 className="text-4xl md:text-6xl font-bold text-white">{movie.title}</h1>
        <p className="text-lg text-white line-clamp-3">{movie.overview}</p>
        <div className="flex space-x-4">
          <button className="flex items-center px-6 py-2 bg-white text-black rounded hover:bg-white/90">
            <Play className="mr-2" size={24} />
            Assistir
          </button>
          <button className="flex items-center px-6 py-2 bg-gray-500/70 text-white rounded hover:bg-gray-500/50">
            <Info className="mr-2" size={24} />
            Mais Informações
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;