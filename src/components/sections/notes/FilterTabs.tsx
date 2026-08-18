"use client";

import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

  return (
    <div className="flex gap-3 flex-wrap pb-5 relative">

              {categories && categories.map((item, index) => (

                    <button
                      onClick={() => setSelectedNotes(item)}
                      key={index}
                      className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm transition cursor-pointer

                      ${
                        (selectedNotes === item) || (selectedNotes === null && index === 0) ?"bg-blue-600 text-white"  : ""
                      }
                      
                      `}
                    >
                      {item}
                    </button>
                  ) ) }

              {categoriesCard &&
                <>
                
                    <button
                      onClick={() =>
                        setStartIndex((prev) =>
                          Math.min(prev + 1, categoriesCard?.length ?? - 3)
                        )
                      }
                      disabled={startIndex >= (categoriesCard?.length ?? 0) - 3}
                      className="absolute top-5 -right-5 w-8 h-8 rounded-full border bg-gray-200 flex items-center justify-center"
                    >
                      <ChevronRight size={20} />
                    </button>
                    
                    <div className="grid grid-cols-4 gap-5">
                        { categoriesCard.slice(startIndex, startIndex + 4).map((item) => {
                          const Icon = item.icon;

                          return (
                            <Link 
                              href={`/courses/category/${item.slug}`}
                              key={item.name}
                              className="flex w-56 items-center gap-4 bg-white border rounded-2xl p-2 hover:shadow-lg transition"
                            >
                              <div
                                className={`w-7 h-7 rounded-xl ${item.bg} flex items-center justify-center`}
                              >
                                <Icon className={`w-4 h-4 ${item.color}`} />
                              </div>

                              <div>
                                <h4 className="font-semibold text-sm">{item.name}</h4>

                                <p className="text-gray-500 text-xs">
                                  {item.courses} Courses
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                    </div>

                    
                </>
              }

    </div>
  );
}