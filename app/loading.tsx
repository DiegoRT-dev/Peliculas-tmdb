export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 to-black flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Cargando películas...
          </h2>
          <p className="text-gray-400 text-sm">
            Un momento por favor
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full max-w-6xl mt-8 px-4 animate-pulse">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="aspect-2/3 rounded-xl bg-gray-800/50 backdrop-blur-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
