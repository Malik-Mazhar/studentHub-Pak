"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  categories: string[]
};

export default function SearchBar({ categories }:SearchBarProps ) {
  return (
    <div className="flex gap-4 mb-6">

      <div className="relative flex-1">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          placeholder="Search notes..."
          className="w-full bg-white rounded-xl border px-12 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <select className="rounded-xl border bg-white px-5">
        <option>All Classes</option>
        {categories.map((categories) => (
          <option key={categories}>{categories}</option>
        ))}
        
      </select>

    </div>
  );
}