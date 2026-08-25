"use client";

import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface categorie {
  icon: LucideIcon,
  name: string;
  slug: string;
  courses: number;
  bg: string;
  color: string;
};

interface FilterTabsProps {
  selectedNotes: string | null;
  setSelectedNotes: React.Dispatch<React.SetStateAction<string | null>>;
  categories?: string[] 
  categoriesCard?: categorie[];
}

export default function FilterTabs({categories, categoriesCard, selectedNotes, setSelectedNotes}:FilterTabsProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
  const updateItemsPerPage = () => {
    if (window.innerWidth < 640) {
      setItemsPerPage(2);
    } else if (window.innerWidth < 1023) {
      setItemsPerPage(3);
    } else {
      setItemsPerPage(4);
    }
  };

    updateItemsPerPage();

    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  return (
    <div className="flex gap-3 flex-wrap pb-5 relative">

      {categories && categories.map((item, index) => (

            <button
              onClick={() => setSelectedNotes(item)}
              key={index}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm transition cursor-pointer

              ${
                (selectedNotes === item) || (selectedNotes === null && index === 0) ?"bg-blue-600 text-white"  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-[#1E293B] dark:text-gray-300 dark:hover:bg-[#334155]"
              }
              
              `}
            >
              {item}
            </button>
          ) ) }

      {categoriesCard &&
        <div className="relative">

          {/* Left Button */}
          <button
            onClick={() =>
              setStartIndex((prev) => Math.max(prev - 1, 0))
            }
            disabled={startIndex === 0}
            className="
              absolute top-1/2 -translate-y-1/2 -left-4 z-10
              w-8 h-8 rounded-full
              border border-gray-200 dark:border-gray-700
              bg-white dark:bg-[#1E293B]
              text-gray-700 dark:text-gray-300
              flex items-center justify-center
              disabled:opacity-40
              hover:bg-gray-100 dark:hover:bg-[#334155]
              transition
            "
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Button */}
          <button
            onClick={() =>
              setStartIndex((prev) =>
                Math.min(
                  prev + 1,
                  Math.max((categoriesCard?.length ?? 0) - 4, 0)
                )
              )
            }
            disabled={
              startIndex >= Math.max((categoriesCard?.length ?? 0) - 4, 0)
            }
            className="
              absolute top-1/2 -translate-y-1/2 -right-4 z-10
              w-8 h-8 rounded-full
              border border-gray-200 dark:border-gray-700
              bg-white dark:bg-[#1E293B]
              text-gray-700 dark:text-gray-300
              flex items-center justify-center
              disabled:opacity-40
              hover:bg-gray-100 dark:hover:bg-[#334155]
              transition
            "
          >
            <ChevronRight size={20} />
          </button>

          {/* Cards */}
          <div className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-5
          ">
            {categoriesCard
              .slice(startIndex, startIndex + itemsPerPage)
              .map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    href={`/courses/category/${item.slug}`}
                    key={item.name}
                    className="
                      flex items-center gap-3
                      w-full
                      bg-white dark:bg-[#0F172A]
                      border border-gray-200 dark:border-gray-700
                      rounded-2xl p-3
                      text-gray-900 dark:text-[#FBFCFE]
                      hover:shadow-lg
                      hover:bg-gray-50 dark:hover:bg-[#1E293B]
                      transition
                    "
                  >
                    <div
                      className={`
                        w-9 h-9 shrink-0 rounded-xl
                        ${item.bg}
                        flex items-center justify-center
                      `}
                    >
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm truncate text-gray-900 dark:text-[#FBFCFE]">
                        {item.name}
                      </h4>

                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        {item.courses} Courses
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>

        </div>
      }

    </div>
  );
}