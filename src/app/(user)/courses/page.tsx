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
import { Code2, Globe, Smartphone,  Brain, ShieldCheck, Database, Palette, PenTool, Megaphone, Video, BriefcaseBusiness, Landmark, Languages, Laptop, Monitor, } from "lucide-react";
import { setPlaylists } from "@/src/store/playlistSlice";
import PlaylistCard from "@/src/components/shared/playlist/PlaylistCard";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const coursesCategories = [
  {
    name: "Programming",
    slug: "programming",
    icon: Code2,
    courses: 120,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    name: "Web Development",
    slug: "web-development",
    icon: Globe,
    courses: 95,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    name: "Mobile App Development",
    slug: "mobile-app-development",
    icon: Smartphone,
    courses: 82,
    bg: "bg-indigo-100",
    color: "text-indigo-600",
  },
  {
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
    icon: Brain,
    courses: 64,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  {
    name: "Cyber Security",
    slug: "cyber-security",
    icon: ShieldCheck,
    courses: 58,
    bg: "bg-red-100",
    color: "text-red-600",
  },
  {
    name: "Data Science",
    slug: "data-science",
    icon: Database,
    courses: 71,
    bg: "bg-cyan-100",
    color: "text-cyan-600",
  },
  {
    name: "Graphic Design",
    slug: "graphic-design",
    icon: Palette,
    courses: 89,
    bg: "bg-pink-100",
    color: "text-pink-600",
  },
  {
    name: "UI/UX Design",
    slug: "ui-ux-design",
    icon: PenTool,
    courses: 67,
    bg: "bg-violet-100",
    color: "text-violet-600",
  },
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    icon: Megaphone,
    courses: 76,
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
  {
    name: "Video Editing",
    slug: "video-editing",
    icon: Video,
    courses: 53,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  {
    name: "Business & Entrepreneurship",
    slug: "business-and-entrepreneurship",
    icon: BriefcaseBusiness,
    courses: 91,
    bg: "bg-emerald-100",
    color: "text-emerald-600",
  },
  {
    name: "Finance & Accounting",
    slug: "finance-and-accounting",
    icon: Landmark,
    courses: 62,
    bg: "bg-teal-100",
    color: "text-teal-600",
  },
  {
    name: "English Language",
    slug: "english-language",
    icon: Languages,
    courses: 110,
    bg: "bg-sky-100",
    color: "text-sky-600",
  },
  {
    name: "Freelancing",
    slug: "freelancing",
    icon: Laptop,
    courses: 45,
    bg: "bg-lime-100",
    color: "text-lime-600",
  },
  {
    name: "Office Productivity (MS Office)",
    slug: "office-productivity-ms-office",
    icon: Monitor,
    courses: 84,
    bg: "bg-gray-100",
    color: "text-gray-600",
  },
];

export default function NotesPage() {
  const dispatch = useAppDispatch();
  const playlistData = useAppSelector((state) => state.playlist.playlists)
  const [selectedNotes, setSelectedNotes] = useState<string | null>(null);
  const router = useRouter();
  
  const getAllPostData = async () => {
    try {
      const response = await axios.get("/api/user/get/getallposts?type=notes");
      const playlistResponse = await axios.get("/api/user/get/getPlaylistData");

      dispatch(setPosts(response.data.data))
      dispatch(setPlaylists(playlistResponse.data.data));

    } catch (error) {
      console.log("getAllPosts api Error please check the community page api :", error);

    };
  };

    
  useEffect(() => {
    getAllPostData();
  }, []);
  
  return (
    <main className="min-h-screen min-w-0 overflow-x-hidden bg-[#FBFCFE] dark:bg-[#0F172A] text-gray-900 dark:text-[#FBFCFE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        <div className="mb-6 sm:mb-8">

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-[#FBFCFE]">
            Courses
          </h1>

          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
            Learn new skills with expert teachers
          </p>

        </div>

        <SearchBar categories={coursesCategories.map((category) => category.name)} />

        <FilterTabs categoriesCard={coursesCategories} selectedNotes={selectedNotes} setSelectedNotes= {setSelectedNotes} />
        <HeroBanner img={"/img/BannerCourse.png"} someClasses="left-14" />

            <section className="pt-10">
                
              <div className="flex justify-between items-start gap-4">

                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                    Featured Courses
                  </h1>

                  <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1">
                    Explore community-shared YouTube playlists and start learning today.
                  </p>
                </div>

                <Link
                  href="/courses/viewAllPlaylist"
                  className="shrink-0 text-xs sm:text-sm md:text-base
                            text-blue-700 font-semibold
                            underline hover:no-underline"
                >
                  View All
                </Link>

              </div>


              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 pt-5 gap-6">

                  {playlistData.map((playlist) => (
                    <PlaylistCard 
                      key={playlist._id}
                      thumbnail={playlist.thumbnail}
                      createdAt={playlist.createdAt}
                      title={playlist.title}
                      videoCount={playlist.videoCount}
                      duration={playlist.duration}
                      fullname={playlist.author.userProfile.profileName}
                      profileImage={playlist.author.userProfile?.profileImage}
                      description={playlist.description}
                      onClick={() => router.push(`/courses/${playlist._id}`)}
                    />
                  ))}
              </div>
            
            </section>

        <Footer />

      </div>
    </main>
  );
}