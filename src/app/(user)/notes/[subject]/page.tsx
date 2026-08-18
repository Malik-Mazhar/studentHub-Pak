"use client";

import NotesCard from "@/src/components/sections/notes/SubjectsNotes/NotesCard";
import axios, { AxiosError } from "axios";
import { deletePost, setPosts, toggleBookmark } from "@/src/store/postSlice";
import { useEffect } from "react"
import { Calculator, Atom, FlaskConical, BookOpen, Globe, Languages, Computer, GraduationCap, LucideIcon, ChevronRight, } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/src/store/useSelecterhook";
import { useParams, useRouter } from "next/navigation";

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


export default function SubjectNotes() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const notesData = useAppSelector((state) => state.postData.posts)
    const params = useParams()
    const useParam = params.subject as string

    const getAllNotes = async () => {
        try {
            const response = await axios.get("/api/user/get/getallposts?type=notes");

            dispatch(setPosts(response.data.data))

        } catch (error) {
            console.log("getAllPosts api Error please check the community page api :", error);

        };
    };

    const findCourseCategory = subjects.find((course) => course.slug === useParam);
    const CategoryIcon = findCourseCategory?.icon as LucideIcon;
    console.log("notesData", notesData.filter((noteType) => noteType.notesCategory === useParam.charAt(0).toLocaleUpperCase() + useParam.slice(1)).map((note) => note.postDocumentUrl))

    
    useEffect(() => {
        getAllNotes();
    }, []);


    
      
  return (
    <main className="mx-auto p-6 bg-[#FBFCFE] dark:bg-[#0F172A] dark:text-[#FBFCFE]">

      <div className="flex items-center gap-2 text-sm mb-5">
        <span className="text-gray-500 font-bold text-md cursor-pointer" onClick={() => router.push("/")}>
          Home
        </span>

        <span className="text-gray-400">
          <ChevronRight size={16} className="text-gray-400" />
        </span>

        <span className="text-gray-500 font-bold text-md cursor-pointer" onClick={() => router.push("/notes")}>
          Notess
        </span>

        <span className="text-gray-400">
          <ChevronRight size={16} className="text-gray-400" />
        </span>

        <span className="text-gray-800 font-bold text-md">
          {useParam.charAt(0).toUpperCase() + useParam.slice(1)}
        </span>
      </div>

          <div className="flex flex-col md:flex-row md:items-center 
                    md:justify-between gap-6 mb-6 rounded-xl shadow
                    px-6 md:px-8 py-6 overflow-hidden">

            {/* Left */}
            <div className="flex items-center gap-4 flex-1">

              <div className={`w-16 h-16 shrink-0 rounded-xl ${findCourseCategory?.bg} flex items-center justify-center shadow-sm`}>
                {findCourseCategory && (
                  <CategoryIcon
                    size={35}
                    className={findCourseCategory.bg}
                  />
                )}
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-700">
                  {findCourseCategory?.title} Notes
                </h1>

                <p className="text-gray-500 mt-1 max-w-xl">
                  {findCourseCategory?.totalNotes} - High quality notes shared by students
                </p>
              </div>

            </div>

            {/* Right Image */}
            <div className="w-210 md:w-80 h-40 md:h-44 shrink-0">
              <img
                src="/img/indivisual-notes.png"
                alt="Playlist"
                className="w-210 h-full objec"
              />
            </div>

          </div>

      {/* Hero/Search */}
      <section className="mb-10">

        <h1 className="text-4xl font-bold">
          Find Study Notes
        </h1>

        <input
          type="text" 
          placeholder="Search Notes..."
          className="mt-5 w-full rounded-xl border p-3"
        />

      </section>

      {/* Latest Notes */}
      <section>

        <h2 className="mb-6 text-3xl font-semibold">
          {notesData.filter((noteType) => noteType.notesCategory === useParam.charAt(0).toLocaleUpperCase() + useParam.slice(1)).length >0? "Latest Notes" : `No ${useParam} notes available yet. Be the first to upload and help other students!`}
        </h2>

        <div className="space-y-5">
            {notesData.filter((noteType) => noteType.notesCategory === useParam.charAt(0).toLocaleUpperCase() + useParam.slice(1)).map((note) => (
                <NotesCard 
                    key={note._id}
                    notesPostId={note._id}
                    title="Integration Complete Notes"
                    thumbnail="/img/math.jpg"
                    authorName={note?.author.userProfile?.profileName || "Undifined"}
                    authorImg={note?.author.userProfile?.profileImgUrl || "/img/defaultProfile.jfif"}
                    subject={ note && note.notesCategory}
                    className={note && note.className || "10th"}
                    fileUrl= {note && note.postDocumentUrl}
                    isBookmarked = {note.isBookmarked}
                    CountsLikes = {note.postLikesCount}
                    isLiked = {note.isLiked}
                    owner = {note?.author._id}
                    params = {useParam}
                />
            ))}

        </div>

      </section>

    </main>
  );
}