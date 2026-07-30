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

const coursesCategories = [
  {
    name: "Programming",
    icon: Code2,
    courses: 120,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    name: "Web Development",
    icon: Globe,
    courses: 95,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    name: "Mobile App Development",
    icon: Smartphone,
    courses: 82,
    bg: "bg-indigo-100",
    color: "text-indigo-600",
  },
  {
    name: "Artificial Intelligence",
    icon: Brain,
    courses: 64,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  {
    name: "Cyber Security",
    icon: ShieldCheck,
    courses: 58,
    bg: "bg-red-100",
    color: "text-red-600",
  },
  {
    name: "Data Science",
    icon: Database,
    courses: 71,
    bg: "bg-cyan-100",
    color: "text-cyan-600",
  },
  {
    name: "Graphic Design",
    icon: Palette,
    courses: 89,
    bg: "bg-pink-100",
    color: "text-pink-600",
  },
  {
    name: "UI/UX Design",
    icon: PenTool,
    courses: 67,
    bg: "bg-violet-100",
    color: "text-violet-600",
  },
  {
    name: "Digital Marketing",
    icon: Megaphone,
    courses: 76,
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
  {
    name: "Video Editing",
    icon: Video,
    courses: 53,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  {
    name: "Business & Entrepreneurship",
    icon: BriefcaseBusiness,
    courses: 91,
    bg: "bg-emerald-100",
    color: "text-emerald-600",
  },
  {
    name: "Finance & Accounting",
    icon: Landmark,
    courses: 62,
    bg: "bg-teal-100",
    color: "text-teal-600",
  },
  {
    name: "English Language",
    icon: Languages,
    courses: 110,
    bg: "bg-sky-100",
    color: "text-sky-600",
  },
  {
    name: "Freelancing",
    icon: Laptop,
    courses: 45,
    bg: "bg-lime-100",
    color: "text-lime-600",
  },
  {
    name: "Office Productivity (MS Office)",
    icon: Monitor,
    courses: 84,
    bg: "bg-gray-100",
    color: "text-gray-600",
  },
];

// const coursesCategories = ["class"]
const notes = [
  {
    image: "/img/math.jpg",
    subject: "Math",
    title: "Full Chapter Notes",
    author: "Ali Khan",
    downloads: "1.2k",
    views: "5k",
    rating: 4.8,
  },
  {
    image: "/img/math.jpg",
    subject: "Maath",
    title: "Full Chapter Notes",
    author: "Ali Khan",
    downloads: "1.2k",
    views: "5k",
    rating: 4.8,
  },
  {
    image: "/img/phisics.jpg",
    subject: "Physics",
    title: "Numerical Notes",
    author: "Usman",
    downloads: "980",
    views: "4.2k",
    rating: 4.9,
  },
  {
    image: "/img/Biology.jfif",
    subject: "Chemistry",
    title: "Organic Chemistry",
    author: "Ahmed",
    downloads: "850",
    views: "3.5k",
    rating: 4.7,
  },
  {
    image: "/img/math.jpg",
    subject: "Biology",
    title: "Complete Chapter",
    author: "Fatima",
    downloads: "730",
    views: "2.9k",
    rating: 4.8,
  },
  
];

export default function NotesPage() {
  const dispatch = useAppDispatch();
  const notesData = useAppSelector((state) => state.postData.posts)
  const playlistData = useAppSelector((state) => state.playlist.playlists)
  const [selectedNotes, setSelectedNotes] = useState<string | null>(null);
  const router = useRouter();
  
  const getClassNotes = notesData.filter((note) => note.className === selectedNotes?.split(" ")[1] + "th");

  console.log("playlistData", playlistData)
  
  const getAllNotes = async () => {
    try {
      const response = await axios.get("/api/user/get/getallposts?type=notes");
      const playlistResponse = await axios.get("/api/user/get/getPlaylistData");
      console.log("playlistResponse", playlistResponse)

      dispatch(setPosts(response.data.data))
      dispatch(setPlaylists(playlistResponse.data.data));

    } catch (error) {
      console.log("getAllPosts api Error please check the community page api :", error);

    };
  };

  const playlists = [
  {
    _id: 1,
    thumbnail: "/img/math.jpg",
    title: "Complete JavaScript Course",
    category: "Programming",
    videoCount: 52,
    duration: "8h 45m",
    description: "Start your JavaScript journey from scratch.",
  },
  {
    _id: 2,
    thumbnail: "/img/math.jpg",
    title: "Python for Beginners",
    category: "Programming",
    videoCount: 45,
    duration: "7h 30m",
    description: "Learn Python from basics to advanced.",
  },
  {
    _id: 3,
    thumbnail: "/img/math.jpg",
    title: "Excel Complete Course",
    category: "Productivity",
    videoCount: 38,
    duration: "6h 15m",
    description: "Master Excel formulas and charts.",
  },
  {
    _id: 4,
    thumbnail: "/img/math.jpg",
    title: "Web Development Bootcamp",
    category: "Development",
    videoCount: 60,
    duration: "10h 20m",
    description: "Learn HTML, CSS & JavaScript.",
  },
];

    
  useEffect(() => {
    getAllNotes();
  }, []);
  
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Courses
          </h1> 

          <p className="text-gray-500 mt-1">
            Learn new skills with export teachers
          </p>
        </div>

        <SearchBar categories={coursesCategories.map((category) => category.name)} />

        <FilterTabs categoriesCard={coursesCategories} selectedNotes={selectedNotes} setSelectedNotes= {setSelectedNotes} />
        <HeroBanner img={"/img/BannerCourse.png"} someClasses="left-14" />

            <section className="pt-10">

              <h1 className="text-2xl font-bold">
                  Featured Courses
              </h1>

              <p className="text-gray-500">
                  Explore community-shared YouTube playlists and start learning today.
              </p>


              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 pt-5 gap-6">

                  {playlistData.map((playlist) => (
                    <PlaylistCard
                      key={playlist._id}
                      thumbnail={playlist.thumbnail}
                      createdAt={playlist.createdAt}
                      title={playlist.title}
                      category={playlist.category}
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

        <RecentNotes popularField={notes}  className= {selectedNotes? selectedNotes : null} />
        <SubjectsSection notesData= {notesData} />
        <TopNotesSection />
        <Newsletter />
        <Footer />

      </div>
    </main>
  );
}