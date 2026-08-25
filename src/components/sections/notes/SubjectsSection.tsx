"use client";

import { useAppDispatch, useAppSelector } from "@/src/store/useSelecterhook";
import SubjectCard from "./SubjectCard";

import {
  Calculator,
  Atom,
  FlaskConical,
  BookOpen,
  Globe,
  Languages,
  Computer,
  GraduationCap,
} from "lucide-react";
import axios from "axios";
import { setPosts } from "@/src/store/postSlice";
import { useEffect } from "react";
import Link from "next/link";
import { userPostType } from "@/src/types/dataTaype";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface SubjectsSectionProps {
  notesData: userPostType[]
}

const subjects = [
  {
    title: "Mathematics",
    slug: "mathematics",
    totalNotes: "120",
    icon: Calculator,
    bg: "bg-green-50 text-green-600"
  },
  {
    title: "Physics",
    slug: "physics",
    totalNotes: "98",
    icon: Atom,
    bg: "bg-blue-50 text-blue-600"
  },
  {
    title: "Chemistry",
    slug: "chemistry",
    totalNotes: "110",
    icon: FlaskConical,
    bg: "bg-purple-50 text-purple-600"
  },
  {
    title: "Biology",
    slug: "biology",
    totalNotes: "95",
    icon: BookOpen,
    bg: "bg-green-50 text-green-600"
  },
  {
    title: "Computer",
    slug: "computer",
    totalNotes: "75",
    icon: Computer,
    bg: "bg-purple-50 text-purple-600"
  },
  {
    title: "English",
    slug: "english",
    totalNotes: "60",
    icon: Languages,
    bg: "bg-green-50 text-green-600"
  },
  {
    title: "Urdu",
    slug: "urdu",
    totalNotes: "45",
    icon: Globe,
    bg: "bg-blue-50 text-blue-600"
  },
  {
    title: "Islamiat",
    slug: "islamiat",
    totalNotes: "50",
    icon: GraduationCap,
    bg: "bg-blue-50 text-yellow-600"
  },
];
 

export default function SubjectsSection({notesData}: SubjectsSectionProps) {
  const dispatch = useAppDispatch();
  const [subjectIndex, setSubjectIndex] = useState(0);

  const allNotesData = notesData.map((item) => {
    const subject = subjects.find((sub) => sub.title === item.postType)
    
    return {
      ...item,
      ...subject,
  };
  }) 

  

  return (
<section className="mt-10 sm:mt-14">

  <div className="mb-5 sm:mb-6 flex items-center justify-between gap-3">

    <div className="min-w-0">

      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-[#FBFCFE]">
        Notes by Subjects
      </h2>

      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
        Browse notes by your favorite subject
      </p>

    </div>

    <button className="shrink-0 text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
      View All
    </button>

  </div>


  {/* Mobile Carousel */}

  <div className="sm:hidden">

    {subjects.length > 0 && (

      <div className="relative">

        <Link href={`/notes/${subjects[subjectIndex].slug}`}>
          <SubjectCard {...subjects[subjectIndex]} />
        </Link>

        <div className="flex items-center justify-center gap-3 mt-4">

          <button
            type="button"
            disabled={subjectIndex === 0}
            onClick={() =>
              setSubjectIndex((prev) => Math.max(prev - 1, 0))
            }
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#101827] text-gray-700 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer transition"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="text-xs text-gray-500 dark:text-gray-400">
            {subjectIndex + 1} / {subjects.length}
          </span>

          <button
            type="button"
            disabled={subjectIndex === subjects.length - 1}
            onClick={() =>
              setSubjectIndex((prev) =>
                Math.min(prev + 1, subjects.length - 1)
              )
            }
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#101827] text-gray-700 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer transition"
          >
            <ChevronRight size={18} />
          </button>

        </div>

      </div>

    )}

  </div>


  {/* Tablet / Desktop Grid */}

  <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">

    {subjects.map((subject) => (

      <Link
        key={subject.title}
        href={`/notes/${subject.slug}`}
      >
        <SubjectCard {...subject} />
      </Link>

    ))}

  </div>

</section>
  );
}