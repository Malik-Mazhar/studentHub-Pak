import {
  Home,
  Users,
  FileText,
  Bookmark,
  UserPlus,
  Compass,
  GraduationCap,
  Atom,
  Laptop,
  Briefcase,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

type SidebarItemProps = {
  icon: React.ReactNode;
  text: string;
  className?: string;
};


export default function Sidebar() {
  return (
    <div className="hidden md:flex lg:w-64 md:w-20 shrink-0 min-h-screen bg-linear-to-b from-[#003178] to-[#004B91] dark:bg-[#0F172A] dark:bg-none dark:border-r dark:border-gray-700/60 text-white p-5 pt-18 flex-col justify-between">
      {/* Top Section */}
      <div>

        {/* Community */}
        <div>
          <h2 className="hidden lg:block text-lg font-semibold mb-4 text-white dark:text-gray-100">
            Community
          </h2>

          <div className="space-y-3 text-sm">
            
            <Link href="/">
              <SidebarItem icon={<Home size={18} />} text="Feed" />
            </Link>

            <SidebarItem icon={<Users size={18} />} text="My Groups" />

            <Link href="/myPosts">
              <SidebarItem icon={<FileText size={18} />} text="My Posts" />
            </Link>

            <Link href="/save">
              <SidebarItem icon={<Bookmark size={18} />} text="Saved Posts" />
            </Link>

            <SidebarItem icon={<UserPlus size={18} />} text="Following" />

            <Link href="/community">
              <SidebarItem icon={<Compass size={18} />} text="Discover" />
            </Link>

          </div>
        </div>


        {/* Categories */}
        <div className="hidden lg:block mt-10">
          <h2 className="text-lg font-semibold mb-4 text-white dark:text-gray-100">
            Explore Categories
          </h2>

          <div className="space-y-3 text-sm">
            <SidebarItem icon={<GraduationCap size={18} />} text="Education" />
            <SidebarItem icon={<Atom size={18} />} text="Science" />
            <SidebarItem icon={<Laptop size={18} />} text="Technology" />
            <SidebarItem icon={<Briefcase size={18} />} text="Career Guide" />
            <SidebarItem icon={<MessageCircle size={18} />} text="General Discussion" />
          </div>

          <button className="text-sm text-blue-200 dark:text-blue-300 mt-5 hover:text-white transition">
            View All
          </button>
        </div>


        {/* Trending */}
        <div className="hidden lg:block mt-10">
          <h2 className="text-lg font-semibold mb-4 text-white dark:text-gray-100">
            Trending Hashtags
          </h2>

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium">#Matric2024</p>
              <span className="text-xs text-blue-200 dark:text-blue-300">
                1.2k posts
              </span>
            </div>

            <div>
              <p className="font-medium">#FSHPreparation</p>
              <span className="text-xs text-blue-200 dark:text-blue-300">
                857 posts
              </span>
            </div>

            <div>
              <p className="font-medium">#Scholarship</p>
              <span className="text-xs text-blue-200 dark:text-blue-300">
                640 posts
              </span>
            </div>
          </div>
        </div>

      </div>


      {/* Bottom Card */}
      <div className="hidden lg:block bg-white dark:bg-[#111827] border border-transparent dark:border-gray-700 rounded-2xl p-4 text-black dark:text-gray-100 mt-10">

        <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
          Share Your Knowledge
        </h3>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Post notes, videos or tips and help others learn.
        </p>

        <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl text-sm font-medium transition">
          + Create Post
        </button>

        <img
          src="/img/students.png"
          alt="students"
          className="mt-4 rounded-xl"
        />

      </div>

    </div>
  );
}


function SidebarItem({
  icon,
  text,
  className = "",
}: SidebarItemProps) {
  return (
      <div className={`flex items-center gap-3 py-3 px-2 rounded-xl hover:bg-[#254B84] dark:hover:bg-[#1E293B] cursor-pointer text-white dark:text-gray-200 hover:text-blue-200 dark:hover:text-gray-100 transition ${className}`}>

        {icon}

      <span className="hidden lg:block">
        {text}
      </span>
    </div>
  );
}