"use client";

import { forwardRef, FormEvent, ChangeEvent, KeyboardEvent } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: FormEvent<HTMLFormElement>) => void;
  onClear: () => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      value,
      onChange,
      onSearch,
      onClear,
      placeholder = "Buscar peliculas por titulo...",
      className = "",
      autoFocus = false,
    },
    ref
  ) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        onClear();
      }
    };
    return (
      <form
        role="search"
        onSubmit={onSearch}
        className={`relative flex w-full max-w-2xl items-center gap-2 ${className}`}
      >
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </div>

        <input
          ref={ref}
          type="search"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete="off"
          spellCheck={false}
          className={`
            w-full rounded-lg border border-gray-700 
            bg-gray-900/70 px-10 py-3 text-white 
            placeholder:text-gray-500 
            focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30
            transition-all duration-200
            [&::-webkit-search-cancel-button]:hidden
          `}
          aria-label="Buscar películas"
        />

        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 
                       rounded-full p-1 text-gray-400 
                       hover:text-white hover:bg-gray-700/50 
                       transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <X size={18} />
          </button>
        )}
      </form>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
