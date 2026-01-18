"use client";

import { useState } from "react";

interface Actor {
  name: string;
}

interface ActorListProps {
  cast: Actor[];
  initialVisible?: number;
}

export default function ActorList({
  cast,
  initialVisible = 6,
}: ActorListProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleActors = showAll ? cast : cast.slice(0, initialVisible);
  const hasMore = cast.length > initialVisible;

  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {visibleActors.map((actor) => (
          <span
            key={actor.name}
            className="bg-gray-800/80 px-3.5 py-1.5 rounded-full text-sm text-gray-200 border border-gray-700/50"
          >
            {actor.name}
          </span>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5"
        >
          {showAll ? (
            <>
              Mostar menos
              <span className="text-xs">▲</span>
            </>
          ) : (
            <>
              Mostar {cast.length - initialVisible} más
              <span className="text-xs">▼</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
