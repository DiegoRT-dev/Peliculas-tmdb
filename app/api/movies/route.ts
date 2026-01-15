import { NextResponse } from "next/server";
import { getPopularMovies, searchMovies } from "@/lib/tmdb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const page = Number(searchParams.get("page") || 1);

  const data = q ? await searchMovies(q, page) : await getPopularMovies(page);

  return NextResponse.json(data);
}
