"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import SearchBar from "./SearchBar";

interface SearchBarWrapperProps {
  initialValue?: string;
}

export default function SearchBarWrapper({
  initialValue = "",
}: SearchBarWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const currentQuery = searchParams.get("q") ?? "";
    setValue(currentQuery);
  }, [searchParams]);

  const debouncedUpdateUrl = useDebouncedCallback((searchTerm: string) => {
    const params = new URLSearchParams(searchParams);

    if (searchTerm.trim()) {
      params.set("q", searchTerm.trim());
    } else {
      params.delete("q");
    }

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 450);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedUpdateUrl(newValue);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debouncedUpdateUrl.flush();
  };

  const handleClear = () => {
    setValue("");
    debouncedUpdateUrl.cancel();
    const params = new URLSearchParams(searchParams);
    params.delete("q");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <SearchBar
      value={value}
      onChange={handleChange}
      onSearch={handleSubmit}
      onClear={handleClear}
      placeholder="Buscar películas por título..."
      autoFocus={!initialValue}
    />
  );
}
