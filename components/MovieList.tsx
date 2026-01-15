import MovieCard from "./MovieCard";
import type { MovieBasic } from "@/lib/tmdb";

type Props = {
  movies: MovieBasic[];
  className?: string;
};

export default function MovieList({ movies, className = "" }: Props) {
  if (movies.length === 0) {
    return <div>No se encontro peliculas...</div>;
  }
  return (
    <div
      className={`grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ${className}`}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
