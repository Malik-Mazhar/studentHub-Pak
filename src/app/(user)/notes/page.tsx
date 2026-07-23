"use client";

import SearchBar from "@/src/components/sections/notes/SearchBar";
import FilterTabs from "@/src/components/sections/notes/FilterTabs";
import HeroBanner from "@/src/components/sections/notes/HeroBanner";
import RecentNotes from "@/src/components/sections/notes/RecentNotes";
import SubjectsSection from "@/src/components/sections/notes/SubjectsSection";
import TopNotesSection from "@/src/components/sections/notes/TopNotesSection";
import Newsletter from "@/src/components/sections/notes/Newsletter";
import Footer from "@/src/components/sections/notes/Footer";
import { useAppDispatch, useAppSelector } from "@/src/store/useSelecterhook";
import axios from "axios";
import { setPosts } from "@/src/store/postSlice";
import { useEffect, useState } from "react";

export default function NotesPage() {
  const dispatch = useAppDispatch();
  const notesData = useAppSelector((state) => state.postData.posts)
  const [selectedNotes, setSelectedNotes] = useState<string | null>(null);
  
  const getClassNotes = notesData.filter((note) => note.className === selectedNotes?.split(" ")[1] + "th");

  console.log("notesData", notesData)
  console.log("selectedNotes", selectedNotes)
  
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
  
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Top Notes For You
          </h1> 

          <p className="text-gray-500 mt-1">
            High quality notes shared by students
          </p>
        </div>

        <SearchBar />

        <FilterTabs selectedNotes={selectedNotes} setSelectedNotes= {setSelectedNotes} />
        <HeroBanner />
        <RecentNotes notesData= {selectedNotes === null || selectedNotes === "All Notes" ? notesData: getClassNotes} className= {selectedNotes? selectedNotes : null} />
        <SubjectsSection notesData= {notesData} />
        <TopNotesSection />
        <Newsletter />
        <Footer />

      </div>
    </main>
  );
}