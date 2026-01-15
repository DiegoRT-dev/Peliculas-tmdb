const API_KEY = process.env.TMDB_API_KEY;

if (!API_KEY) {
  throw new Error(
    "TMDB_API_KEY no está configurado. " +
      "Agrega TMDB_API_KEY=tu_clave en .env.local y reinicia el servidor."
  );
}

const BASE_URL = "https://api.themoviedb.org/3";

const defaultParams = {
  api_key: API_KEY,
  language: "es-MX",
};

async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);

  Object.entries({ ...defaultParams, ...params }).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString(), {
    next: { revalidate: endpoint.includes("/search") ? 0 : 3600 },
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "Sin detalles");
    throw new Error(
      `TMDB error ${res.status} - ${res.statusText} - ${errorText}`
    );
  }

  return res.json() as Promise<T>;
}

export interface MovieBasic {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  overview?: string;
}

export type MovieResponse = {
  page: number;
  results: MovieBasic[];
  total_pages: number;
  total_results: number;
};

export async function getPopularMovies(page = 1): Promise<MovieResponse> {
  return tmdbFetch<MovieResponse>("/movie/popular", { page });
}

export async function searchMovies(
  query: string,
  page = 1
): Promise<MovieResponse> {
  if (!query.trim())
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  return tmdbFetch<MovieResponse>("/search/movie", { query, page });
}
