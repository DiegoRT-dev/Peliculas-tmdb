"use client";

import { useEffect, useState } from "react";
import MovieList from "./MovieList";
import type { MovieBasic, MovieResponse } from "@/lib/tmdb";

interface Props {
  initialMovies: MovieBasic[];
  initialHasMore: boolean;
  searchTerm: string;
}

export default function MovieListWrapper({
  initialMovies,
  initialHasMore,
  searchTerm,
}: Props) {
  const [movies, setMovies] = useState<MovieBasic[]>(initialMovies);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMovies(initialMovies);
    setPage(2);
    setHasMore(initialHasMore);
  }, [initialMovies, initialHasMore, searchTerm]);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const params = new URLSearchParams({
        page: String(page),
        ...(searchTerm && { q: searchTerm }),
      });

      const res = await fetch(`/api/movies?${params}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = (await res.json()) as MovieResponse;

      if (!data?.results?.length) {
        setHasMore(false);
        return;
      }

      setMovies((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const newUnique = data.results.filter((m) => !existingIds.has(m.id));
        return [...prev, ...newUnique];
      });

      setPage((p) => p + 1);
      setHasMore(data.page < data.total_pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MovieList movies={movies} />

      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="
              rounded-lg bg-blue-600 px-8 py-4 font-medium text-white
              hover:bg-blue-700 transition-colors cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? "Cargando..." : "Ver más películas"}
          </button>
        </div>
      )}

      {!hasMore && movies.length > 0 && (
        <p className="mt-8 text-center text-gray-400">
          No hay más películas para mostrar
        </p>
      )}
    </>
  );
}
