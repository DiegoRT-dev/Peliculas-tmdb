"use client"

import type { MovieBasic } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react"
import { Heart } from "lucide-react"

type Props = {
  movie: MovieBasic;
};

export default function MovieCard({ movie }: Props) {
  const [liked, setLiked] = useState(false);

    useEffect(() => {
        const likedMovies = JSON.parse(localStorage.getItem("likedMovies") || "{}");
        setLiked(!!likedMovies[movie.id]);
    }, [movie.id]);

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder-movie.png";

  return (
    <Link href={`/movie/${movie.id}`} className="group relative overflow-hidden rounded-xl bg-gray-900 shadow-md transition-transform hover:scale-[1.03] cursor-pointer">
      
      {liked && (
    <Heart
      size={22}
      className="absolute top-2 right-2 z-10 text-red-600 fill-current"
    />
  )}

      <div className="relative aspect-2/3 w-full">
        <Image
          src={poster}
          alt={movie.title || "Poster de película"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          placeholder="blur"
          blurDataURL="/placeholder-movie.png"
        />
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 text-lg font-semibold leading-tight">
          {movie.title}
        </h3>       
          <p className="mt-1 text-sm text-yellow-400">
          ★ {movie.vote_average?.toFixed(1) ?? "—"}
        </p>
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
}
