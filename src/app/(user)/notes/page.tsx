"use client";

import SearchBar from "@/src/components/sections/notes/SearchBar";
import FilterTabs from "@/src/components/sections/notes/FilterTabs";
import HeroBanner from "@/src/components/sections/notes/HeroBanner";
import RecentNotes from "@/src/components/sections/notes/RecentNotes";
import SubjectsSection from "@/src/components/sections/notes/SubjectsSection";
import TopNotesSection from "@/src/components/sections/notes/TopNotesSection";
import Newsletter from "@/src/components/sections/notes/Newsletter";
import Footer from "@/src/components/sections/Footer";
import { useAppDispatch, useAppSelector } from "@/src/store/useSelecterhook";
import axios from "axios";
import { setPosts } from "@/src/store/postSlice";
import { useEffect, useState } from "react";

const categoriesClasses = [
  "All Notes",
  "Class 9",
  "Class 10",
  "1st Year",
  "2nd Year",
  "ICS",
  "Medical",
];


export default function NotesPage() {
  const dispatch = useAppDispatch();
  const notesData = useAppSelector((state) => state.postData.posts)
  const [selectedNotes, setSelectedNotes] = useState<string | null>(null);
  
  const getClassNotes = notesData.filter((note) => note.className === selectedNotes?.split(" ")[1] + "th");
  
  const getAllNotes = async () => {
    try {
      const response = await axios.get("/api/user/get/getallposts?type=notes");

      dispatch(setPosts(response.data.data))

    } catch (error) {
      console.log("getAllPosts api Error please check the community page api :", error);

    };
  };

    
  useEffect(() => {
    getAllNotes();
  }, []);

  const notesCategories = [ "All Classes", "Class 9", "Class 10", "1st Year", "2nd Year" ]
  
  return (
    <main className="bg-[#FBFCFE] dark:bg-[#0F172A] min-h-screen text-gray-900 dark:text-[#FBFCFE]">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-5 sm:py-8  md:pt-20">
        
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Top Notes For You
          </h1>

          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
            High quality notes shared by students
          </p>
        </div>

        <SearchBar categories={notesCategories} />

        <FilterTabs
          categories={categoriesClasses}
          selectedNotes={selectedNotes}
          setSelectedNotes={setSelectedNotes}
        />

        <HeroBanner
          img="/img/NotesPageBanner.png"
          someClasses="left-4 sm:left-8 md:left-14 bottom-6 sm:bottom-8 md:bottom-18  h-4 sm:h-13  w-16 md:w-46"
          href="/notes/viewAllnotes"
        />

        <RecentNotes
          notesData={
            selectedNotes === null || selectedNotes === "All Notes"
              ? notesData
              : getClassNotes
          }
          className={selectedNotes ? selectedNotes : null}
        />

        <SubjectsSection notesData={notesData} />

        <TopNotesSection />

        <Newsletter />

        <Footer />
      </div>
    </main>
  );
}