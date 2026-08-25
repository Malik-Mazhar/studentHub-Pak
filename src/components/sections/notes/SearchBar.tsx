"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  categories: string[]
};

export default function SearchBar({ categories }:SearchBarProps ) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">

      {/* Search */}
      <div className="relative flex-1 min-w-0">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        />

        <input
          placeholder="Search notes..."
          className="
            w-full
            bg-[#FBFCFE] dark:bg-[#0F172A]
            text-gray-900 dark:text-[#FBFCFE]
          placeholder:text-gray-400 dark:placeholder:text-gray-500
            rounded-xl
            border border-gray-200 dark:border-gray-700
            px-12 py-3
            text-sm sm:text-base
            outline-none
            focus:ring-2 focus:ring-blue-500
          "
        />

      </div>

      {/* Category */}
      <select
        className="
          w-full sm:w-auto
          sm:min-w-40
          rounded-xl
          border border-gray-200 dark:border-gray-700
          bg-[#FBFCFE] dark:bg-[#0F172A]
          text-gray-900 dark:text-[#FBFCFE]
          px-4 sm:px-5
          py-3
          text-sm sm:text-base
          outline-none
          focus:ring-2 focus:ring-blue-500
        "
      >
        <option>All Classes</option>

        {categories.map((category) => (
          <option key={category}>
            {category}
          </option>
        ))}
      </select>

    </div>
  );
}