import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center gap-4">
      <Link href="/">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight whitespace-nowrap">
          🎬 Peliculas TMDB
        </h1>
      </Link>
    </header>
  );
}
