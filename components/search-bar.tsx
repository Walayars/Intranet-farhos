"use client";

import { useState } from "react";

export function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Buscar..."
      className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
    />
  );
}