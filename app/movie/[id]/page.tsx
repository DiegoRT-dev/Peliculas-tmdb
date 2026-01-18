import { Suspense } from "react";
import Image from "next/image";
import { getMovieDetails, type MovieDetails } from "@/lib/tmdb";
import { notFound } from "next/navigation";
import Link from "next/link";
import ActorList from "@/components/ActorList";
import Header from "@/components/Header";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MovieDetailsPage({ params }: Props) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId)) {
    notFound();
  }

  let movie: MovieDetails;

  try {
    movie = await getMovieDetails(movieId);
  } catch (error) {
    notFound();
  }

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder-movie.png";

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 to-black">
      <div className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="container mx-auto flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:gap-6">
          <Header />
        </div>
      </div>
      <Suspense
        fallback={
          <div className="relative z-10 flex items-center justify-center min-h-screen">
            <div className="text-2xl">Cargando detalles de la película...</div>
          </div>
        }
      >
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
              <div className="relative aspect-2/3 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={poster}
                  alt={movie.title || "Poster de película"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  placeholder="blur"
                  blurDataURL="/placeholder-movie.png"
                  priority
                />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-4">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-lg md:text-xl text-gray-400 italic mb-6">
                  {movie.tagline}
                </p>
              )}

              <p className="text-md md:text-lg text-gray-400 mb-6">
                {movie.release_date}
              </p>

              <div className="flex flex-wrap gap-3 md:gap-4 mb-6">
                <span className="bg-blue-600/30 px-4 py-2 rounded-full text-sm">
                  ★ {movie.vote_average?.toFixed(1) ?? "—"}
                </span>
                <span className="bg-gray-700 px-4 py-2 rounded-full text-sm">
                  {movie.release_date?.slice(0, 4) || "-"}
                </span>
                <span className="bg-gray-700 px-4 py-2 rounded-full text-sm">
                  {movie.runtime ? `${movie.runtime} min` : "-"}
                </span>

                <p className="text-lg leading-relaxed mb-8 text-gray-200">
                  {movie.overview || "Sin sinopsis disponible."}
                </p>

                {movie.genres?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {movie.genres.map((g) => (
                      <span
                        key={g.id}
                        className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300"
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {movie.credits?.crew?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Dirección
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {movie.credits.crew
                      .filter((c: any) => c.job === "Director")
                      .map((director: any) => (
                        <span
                          key={director.name}
                          className="bg-indigo-900/40 px-4 py-2 rounded-full text-sm font-medium text-indigo-200 border border-indigo-700/30"
                        >
                          {director.name}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {movie.credits?.crew?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Escritores
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {Array.from(
                      movie.credits.crew
                        .filter((c) =>
                          ["Writer", "Screenplay", "Story"].includes(c.job),
                        )
                        .reduce((map, writer) => {
                          if (!map.has(writer.id)) {
                            map.set(writer.id, writer);
                          }
                          return map;
                        }, new Map<number, any>())
                        .values(),
                    ).map((writer) => (
                      <span
                        key={writer.id}
                        className="bg-purple-900/40 px-4 py-2 rounded-full text-sm font-medium text-purple-200 border border-purple-700/30"
                      >
                        {writer.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {movie.credits?.cast?.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    Reparto
                  </h3>
                  <ActorList cast={movie.credits.cast} initialVisible={6} />
                </div>
              )}

              <div>
                <Link
                  href="/"
                  className="
                            inline-block rounded-lg bg-blue-600 px-6 py-3 
                            font-medium text-white hover:bg-blue-700 
                            transition-colors shadow-lg shadow-blue-600/20
                            "
                >
                  Volver al inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
