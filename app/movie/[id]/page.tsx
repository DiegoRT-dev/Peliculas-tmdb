import { Suspense } from "react";
import Image from "next/image";
import { getMovieDetails } from "@/lib/tmdb";
import { notFound } from "next/navigation";
import Link from "next/link";

interface MovieDetails {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    vote_average: number;
    release_date: string;
    runtime: number;
    tagline: string;
    genres: { id: number; name: string }[];
}

type Props = {
    params: Promise<{id: string}>
}

export default async function MovieDetailsPage({params}: Props) {
    const {id} = await params;
    const movieId = Number(id);
    
    if (isNaN(movieId)) {
        notFound();
    }

    let movie: MovieDetails;

    try {
        movie = await getMovieDetails(movieId);
    }catch (error) {
        notFound();
    }

    const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder-movie.png";

    return(
        <div className="min-h-screen bg-linear-to-b from-gray-950 to-black">
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

                        <div className="flex flex-wrap gap-3 md:gap-4 mb-6">
                            <span className="bg-blue-600/30 px-4 py-2 rounded-full text-sm">
                                ★ {movie.vote_average?.toFixed(1) ?? "—"}
                            </span>
                            <span className="bg-gray-700 px-4 py-2 rounded-full text-sm">
                                {movie.release_date?.slice(0,4) || "-"}
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
                                        <span key={g.id} className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300">
                                            {g.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                                                        
                        </div>
                        {/*Botones extras aqui (inicio y favorito)*/}
                        {/*Este boton es temporal*/}
                        <div>
                            <Link href="/" className="
                            inline-block rounded-lg bg-blue-600 px-8 py-4 
                            font-medium text-white hover:bg-blue-700 
                            transition-colors shadow-lg shadow-blue-600/20
                            ">volver al incio</Link>
                        </div>
                    </div>

                </div>
            </div>
            </Suspense>
        </div>
    )
}
