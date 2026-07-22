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

type SidebarItemProps = {
  icon: React.ReactNode;
  text: string;
  className?: string;
};


export default function Sidebar() {
  return (
    <div className="w-64 shrink-0 min-h-screen bg-linear-to-b from-[#003178] to-[#004B91] text-white p-5 pt-18 flex flex-col justify-between">

      {/* Top Section */}
      <div>
        {/* Community */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Community</h2>

          <div className="space-y-3 text-sm">
            <SidebarItem icon={<Home size={18} />} text="Feed" className='' />
            <SidebarItem icon={<Users size={18} />} text="My Groups" />
            <SidebarItem icon={<FileText size={18} />} text="My Posts" />
            <SidebarItem icon={<Bookmark size={18} />} text="Saved Posts" />
            <SidebarItem icon={<UserPlus size={18} />} text="Following" />
            <SidebarItem icon={<Compass size={18} />} text="Discover" />
          </div>
        </div>

        {/* Categories */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">
            Explore Categories
          </h2>

          <div className="space-y-3 text-sm">
            <SidebarItem
              icon={<GraduationCap size={18} />}
              text="Education"
            />
            <SidebarItem icon={<Atom size={18} />} text="Science" />
            <SidebarItem icon={<Laptop size={18} />} text="Technology" />
            <SidebarItem icon={<Briefcase size={18} />} text="Career Guide" />
            <SidebarItem
              icon={<MessageCircle size={18} />}
              text="General Discussion"
            />
          </div>

          <button className="text-sm text-blue-200 mt-5 hover:text-white transition">
            View All
          </button>
        </div>

        {/* Trending */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">
            Trending Hashtags
          </h2>

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium">#Matric2024</p>
              <span className="text-xs text-blue-200">
                1.2k posts
              </span>
            </div>

            <div>
              <p className="font-medium">#FSHPreparation</p>
              <span className="text-xs text-blue-200">
                857 posts
              </span>
            </div>

            <div>
              <p className="font-medium">#Scholarship</p>
              <span className="text-xs text-blue-200">
                640 posts
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Card */}
      <div className="bg-white rounded-2xl p-4 text-black mt-10">
        <h3 className="font-semibold text-sm">
          Share Your Knowledge
        </h3>

        <p className="text-xs text-gray-500 mt-2">
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
    <div className={`flex items-center gap-3 py-3 px-2 m- rounded-xl hover:bg-[#254B84] cursor-pointer hover:text-blue-200 transition ${className}`}>
      {icon}
      <span>{text}</span>
    </div>
  );
}