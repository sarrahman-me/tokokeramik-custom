"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SearchBar({ route }: { route?: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    router.push(`${route || `/dashboard/barang/search`}?query=${q}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex justify-center mt-4 mx-auto max-w-3xl"
    >
      <input
        onChange={(e) => setQ(e.target.value)}
        type="search"
        placeholder="Cari barang..."
        className="border border-primary-600/70 text-primary-800 placeholder-primary-600 focus:ring-primary-600 focus:border-primary-600 block w-full pl-5 pr-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-1 sm:text-sm caret-primary-600"
      />
      <button
        disabled={!q}
        type="submit"
        className="ml-2 px-4 py-2 bg-primary-600 disabled:bg-primary-600/50 text-white rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-600/70 focus:ring-opacity-50 transition duration-200"
      >
        Cari
      </button>
    </form>
  );
}
