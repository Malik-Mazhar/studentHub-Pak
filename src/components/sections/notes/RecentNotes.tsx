import { userPostType } from "@/src/types/dataTaype";
import RecentNoteCard from "./RecentNoteCard";
import Link from "next/link";
import { useState } from "react";

interface RecentAddNotesProps {
  notesData?: userPostType[]
  className: string | null;
  popularField?: any[]
}

export default function RecentNotes({
  notesData,
   className,
   popularField
  }: RecentAddNotesProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const allNotes = [
      ...(notesData || []),
      ...(popularField || []),
    ];

  return (
    <section className="mt-8 sm:mt-10">

      <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">

        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-[#FBFCFE]">
          {className
            ? notesData?.length
              ? `Notes for ${className}th`
              : `No Notes Found Class ${className}`
            : "Recently Added Notes"
          }
        </h2>

        <Link
          href="/notes/viewAllnotes"
          className="shrink-0 text-sm sm:text-base text-blue-600 dark:text-blue-400 hover:underline"
        >
          View All
        </Link>

      </div>


      {/* Mobile - One Card + Side Arrows */}
      <div className="sm:hidden relative flex items-center justify-center">

        {/* Previous */}
        <button
          type="button"
          onClick={() =>
            setCurrentIndex((prev) => Math.max(prev - 1, 0))
          }
          disabled={currentIndex === 0}
          className="
            absolute left-0 z-10
            w-9 h-9
            rounded-full
            bg-white dark:bg-[#101827]
            border border-gray-200 dark:border-gray-700
            shadow-md
            flex items-center justify-center
            text-gray-700 dark:text-gray-200
            disabled:opacity-30
            disabled:cursor-not-allowed
            cursor-pointer
          "
        >
          ←
        </button>


        {/* Card */}
        <div className="w-full px-7">

          {allNotes.length > 0 && allNotes[currentIndex] && (
            <RecentNoteCard
              {...allNotes[currentIndex]}
            />
          )}

        </div>


        {/* Next */}
        <button
          type="button"
          onClick={() =>
            setCurrentIndex((prev) =>
              Math.min(prev + 1, allNotes.length - 1)
            )
          }
          disabled={
            currentIndex === allNotes.length - 1 ||
            allNotes.length === 0
          }
          className="
            absolute right-0 z-10
            w-9 h-9
            rounded-full
            bg-white dark:bg-[#101827]
            border border-gray-200 dark:border-gray-700
            shadow-md
            flex items-center justify-center
            text-gray-700 dark:text-gray-200
            disabled:opacity-30
            disabled:cursor-not-allowed
            cursor-pointer
          "
        >
          →
        </button>

      </div>


      {/* Tablet + Desktop - Normal Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">

        {notesData &&
          notesData.slice(0, 4).map((note) => (
            <RecentNoteCard
              key={note._id || note.title}
              {...note}
            />
          ))
        }

        {popularField &&
          popularField.slice(0, 4).map((note) => (
            <RecentNoteCard
              key={note._id || note.subject}
              {...note}
            />
          ))
        }

      </div>

    </section>
  );
}