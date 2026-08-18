"use client";

import { useParams, useRouter } from "next/navigation";
import { Code2, Globe, Smartphone, ArrowRight,  Brain, ShieldCheck, Database, Palette, PenTool, Megaphone, Video, BriefcaseBusiness, Landmark, Languages, Laptop, Monitor, LucideIcon, Search, ListVideo, } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/src/store/useSelecterhook";
import PlaylistCard from "@/src/components/shared/playlist/PlaylistCard";
import axios from "axios";
import { setPosts } from "@/src/store/postSlice";
import { setPlaylists } from "@/src/store/playlistSlice";
import { useEffect } from "react";

const coursesCategories = [
  {
    name: "Programming",
    slug: "programming",
    icon: Code2,
    courses: 120,
    bg: "bg-blue-100",
    color: "text-blue-600",
    description:
      "Learn programming from the basics to advanced concepts and build real-world applications.",
  },
  {
    name: "Web Development",
    slug: "web-development",
    icon: Globe,
    courses: 95,
    bg: "bg-green-100",
    color: "text-green-600",
    description:
      "Learn to build modern, responsive websites and powerful web applications using the latest technologies.",
  },
  {
    name: "Mobile App Development",
    slug: "mobile-app-development",
    icon: Smartphone,
    courses: 82,
    bg: "bg-indigo-100",
    color: "text-indigo-600",
    description:
      "Build modern mobile applications for Android and iOS using popular frameworks and development tools.",
  },
  {
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
    icon: Brain,
    courses: 64,
    bg: "bg-purple-100",
    color: "text-purple-600",
    description:
      "Explore artificial intelligence, machine learning, neural networks, and intelligent application development.",
  },
  {
    name: "Cyber Security",
    slug: "cyber-security",
    icon: ShieldCheck,
    courses: 58,
    bg: "bg-red-100",
    color: "text-red-600",
    description:
      "Learn cybersecurity fundamentals, ethical hacking, network security, and techniques to protect digital systems.",
  },
  {
    name: "Data Science",
    slug: "data-science",
    icon: Database,
    courses: 71,
    bg: "bg-cyan-100",
    color: "text-cyan-600",
    description:
      "Learn how to analyze data, discover insights, and build data-driven solutions using modern tools and techniques.",
  },
  {
    name: "Graphic Design",
    slug: "graphic-design",
    icon: Palette,
    courses: 89,
    bg: "bg-pink-100",
    color: "text-pink-600",
    description:
      "Master graphic design principles, visual communication, branding, and creative design tools.",
  },
  {
    name: "UI/UX Design",
    slug: "ui-ux-design",
    icon: PenTool,
    courses: 67,
    bg: "bg-violet-100",
    color: "text-violet-600",
    description:
      "Learn to design beautiful, intuitive, and user-friendly digital experiences for websites and applications.",
  },
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    icon: Megaphone,
    courses: 76,
    bg: "bg-orange-100",
    color: "text-orange-600",
    description:
      "Learn digital marketing strategies including SEO, social media marketing, content marketing, and online advertising.",
  },
  {
    name: "Video Editing",
    slug: "video-editing",
    icon: Video,
    courses: 53,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
    description:
      "Learn professional video editing, storytelling, transitions, effects, and techniques for creating engaging videos.",
  },
  {
    name: "Business & Entrepreneurship",
    slug: "business-and-entrepreneurship",
    icon: BriefcaseBusiness,
    courses: 91,
    bg: "bg-emerald-100",
    color: "text-emerald-600",
    description:
      "Develop business skills, learn entrepreneurship, and discover how to build and grow successful businesses.",
  },
  {
    name: "Finance & Accounting",
    slug: "finance-and-accounting",
    icon: Landmark,
    courses: 62,
    bg: "bg-teal-100",
    color: "text-teal-600",
    description:
      "Learn accounting principles, financial management, budgeting, investment basics, and business finance.",
  },
  {
    name: "English Language",
    slug: "english-language",
    icon: Languages,
    courses: 110,
    bg: "bg-sky-100",
    color: "text-sky-600",
    description:
      "Improve your English speaking, writing, grammar, vocabulary, and communication skills for study and career.",
  },
  {
    name: "Freelancing",
    slug: "freelancing",
    icon: Laptop,
    courses: 45,
    bg: "bg-lime-100",
    color: "text-lime-600",
    description:
      "Learn how to start freelancing, find clients, build your portfolio, and grow a successful online career.",
  },
  {
    name: "Office Productivity (MS Office)",
    slug: "office-productivity-ms-office",
    icon: Monitor,
    courses: 84,
    bg: "bg-gray-100",
    color: "text-gray-600",
    description:
      "Master Microsoft Office tools including Word, Excel, PowerPoint, and other essential productivity skills.",
  },
];

export default function HeroSection() {
  const {category } = useParams();
  const playlistData = useAppSelector((state) => state.playlist.playlists)
  const isLoading = useAppSelector((state) => state.playlist.loading)
  const router = useRouter();
  const dispatch = useAppDispatch();

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

  const findPlaylistThrowCategory = playlistData.filter((items) => items.categories.includes(category));
  
  const findCourseCategory = coursesCategories.find((course) => course.slug === category);
  const CategoryIcon = findCourseCategory?.icon as LucideIcon;

  
      
  useEffect(() => {
    if (!isLoading) {
      getAllPostData();
    }
  }, [isLoading]);
  

  return (
    <section className="mb-8">
      <div className="flex-1 px-6 py-6">

              {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-5">
        <span className="text-gray-500 font-bold text-md cursor-pointer" onClick={() => router.push("/courses")}>
          Courses
        </span>

        <span className="text-gray-400">
          &gt;
        </span>

        <span className="text-gray-800 font-bold text-md">
          {category}
        </span>
      </div>

          <div className="flex flex-col md:flex-row md:items-center 
                          md:justify-between gap-6 mb-6 bg-white border rounded-xl shadow-sm
                          px-6 md:px-8 py-6 overflow-hidden">

            {/* Left */}
            <div className="flex items-center gap-4 flex-1">

              <div className={`w-16 h-16 shrink-0 rounded-xl ${findCourseCategory?.bg} flex items-center justify-center shadow-sm`}>
                {findCourseCategory && (
                  <CategoryIcon
                    size={35}
                    className={findCourseCategory.color}
                  />
                )}
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {findCourseCategory?.name}
                </h1>

                <p className="text-gray-500 mt-1 max-w-xl">
                  {findCourseCategory?.description}
                </p>
              </div>

            </div>

            {/* Right Image */}
            <div className="w-full md:w-80 h-40 md:h-44 shrink-0">
              <img
                src="/img/plalist_banner-remove.png"
                alt="Playlist"
                className="w-full h-full object-contain"
              />
            </div>

          </div>

        {/* Search + Sort */}
        <div className="flex items-center justify-between mb-5">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Playlists
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {findPlaylistThrowCategory.length} playlists available
            </p>
          </div>

          <div className="flex items-center gap-3">

            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search playlists..."
                className="h-11 w-64 border border-gray-200 rounded-xl
                          pl-10 pr-4 text-sm outline-none
                          focus:border-gray-400"
              />
            </div>

            {/* Sort */}
            <select
              className="h-11 border border-gray-200 rounded-xl
                        px-4 text-sm outline-none bg-white"
            >
              <option>Popular</option>
              <option>Newest</option>
              <option>Most Videos</option>
              <option>Highest Rated</option>
            </select>

          </div>

        </div>


        {/* Top Playlists yahan se start hon gi */}
        {findPlaylistThrowCategory.length>0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 pt-5 gap-6">

                {findPlaylistThrowCategory.map((playlist) => (
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
          :
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
      <ListVideo size={30} className="text-gray-400" />
    </div>

    <h2 className="text-xl font-semibold text-gray-800">
      No Playlists Available
    </h2>

    <p className="text-gray-500 mt-2 max-w-md">
      There are currently no playlists available for{" "}
      <span className="font-medium text-gray-700">
        {findCourseCategory?.name}
      </span>.
      You can be the first to add one!
    </p>
  </div>
        }

      </div>
    </section>
  );
}