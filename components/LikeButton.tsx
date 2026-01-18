"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"

interface LikeButtonProps {
    movieId: number;
    title: string;
}

export default function LikeButton({movieId, title}: LikeButtonProps){
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const likedMovies = JSON.parse(localStorage.getItem("likedMovies") || "{}");
        setLiked(!!likedMovies[movieId]);
    }, [movieId]);

    const toggleLike = () => {
        const newLiked= !liked;
        setLiked(newLiked);

        const likedMovies = JSON.parse(localStorage.getItem("likedMovies") || "{}");
        if (newLiked) {
            likedMovies[movieId] = title;
        } else {
            delete likedMovies[movieId];
        }
        localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
    }

    return (
        <button
        onClick={toggleLike}
        className={`
        flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300
        ${liked 
          ? "bg-red-600/90 hover:bg-red-700 text-white shadow-lg shadow-red-600/30" 
          : "bg-gray-800/80 hover:bg-gray-700 text-gray-300 border border-gray-600"}
      `}
      aria-label={liked ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
            <Heart 
            size={20}
            className={liked ? "fill-current text-white" : "text-red-600"}
            />
        </button>
    );
}