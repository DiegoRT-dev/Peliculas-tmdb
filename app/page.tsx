import { Suspense } from "react";
import { getPopularMovies, searchMovies, type MovieResponse } from "@/lib/tmdb";
import MovieListWrapper from "@/components/MovieListWrapper";
import SearchBarWrapper from "@/components/SearchBarWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const searchTerm = params.q?.trim() ?? "";
  const initialPage = 1;

  const initialData: MovieResponse = searchTerm
    ? await searchMovies(searchTerm, initialPage)
    : await getPopularMovies(initialPage);

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-950 to-black">
      <div className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="container mx-auto flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:gap-6">
          <Header />
          <div className="flex-1">
            <SearchBarWrapper initialValue={searchTerm} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold md:text-4xl">
          {searchTerm
            ? `Resultados para: "${searchTerm}"`
            : "Películas Populares"}
        </h1>

        <Suspense
          fallback={
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 animate-pulse">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="aspect-2/3 rounded-xl bg-gray-800" />
              ))}
            </div>
          }
        >
          <MovieListWrapper
            initialMovies={initialData.results}
            initialHasMore={initialData.page < initialData.total_pages}
            searchTerm={searchTerm}
          />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
