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

interface SubjectsSectionProps {
  notesData: userPostType[]
}

const subjects = [
  {
    title: "Mathematics",
    totalNotes: "120",
    icon: Calculator,
    bg: "bg-green-50 text-green-600"
  },
  {
    title: "Physics",
    totalNotes: "98",
    icon: Atom,
    bg: "bg-blue-50 text-blue-600"
  },
  {
    title: "Chemistry",
    totalNotes: "110",
    icon: FlaskConical,
    bg: "bg-purple-50 text-purple-600"
  },
  {
    title: "Biology",
    totalNotes: "95",
    icon: BookOpen,
    bg: "bg-green-50 text-green-600"
  },
  {
    title: "Computer",
    totalNotes: "75",
    icon: Computer,
    bg: "bg-purple-50 text-purple-600"
  },
  {
    title: "English",
    totalNotes: "60",
    icon: Languages,
    bg: "bg-green-50 text-green-600"
  },
  {
    title: "Urdu",
    totalNotes: "45",
    icon: Globe,
    bg: "bg-blue-50 text-blue-600"
  },
  {
    title: "Islamiat",
    totalNotes: "50",
    icon: GraduationCap,
    bg: "bg-blue-50 text-yellow-600"
  },
];
 

export default function SubjectsSection({notesData}: SubjectsSectionProps) {
  const dispatch = useAppDispatch();

  const allNotesData = notesData.map((item) => {
    const subject = subjects.find((sub) => sub.title === item.postType)
    
    return {
      ...item,
      ...subject,
  };
  }) 

  

  return (
    <section className="mt-14">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            Notes by Subjects
          </h2>

          <p className="text-sm text-gray-500">
            Browse notes by your favorite subject
          </p>
        </div>

        <button className="text-sm text-blue-600 hover:underline">
          View All
        </button>

      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {subjects.map((subject) => (
          <Link
            key={subject.title}
            href={`/notes/${subject.title.toLowerCase()}`}
          >
            <SubjectCard {...subject} />
          </Link>
        ))}

      </div>

    </section>
  );
}