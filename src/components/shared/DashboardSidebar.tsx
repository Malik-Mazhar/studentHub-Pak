import { useAppSelector } from "@/src/store/useSelecterhook";
import {
  Home,
  Bookmark,
  Settings,
  LogOut,
  MessageSquareMoreIcon,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineNotifications, MdOutlineAssignment, MdOutlineClass } from "react-icons/md";

type SidebarItemProps = {
  icon: React.ReactNode;
  text: string;
  navigate?: string;
  className?: string;
};


export default function Sidebar() {
  const { data: session, status } = useSession();
  const userProfileData = useAppSelector((state) => state.userData.profileData);
  return (
    <div className=" w-36 sm:w-48 lg:w-60 shrink-0 min-w-0 bg-linear-to-b from-[#003178] to-[#004B91] rounded-l-2xl text-white p-2 sm:p-3 flex flex-col " >

      {/* Logo */}
      <div className="flex items-center justify-center sm:justify-start gap-1 min-w-0">

        <div className="w-9 h-9 sm:w-12 sm:h-12 relative shrink-0">
          <Image
            src="/img/Logoo.png"
            alt="Logo"
            fill
            className="object-contain"
          />
        </div>

        <div className="leading-none font-medium min-w-0">
          <h2 className="text-white text-[11px] sm:text-sm font-bold truncate">
            Student Hub
          </h2>

          <h3 className="text-green-500 text-[10px] sm:text-xs font-bold">
            Pakistan
          </h3>
        </div>

      </div>


      {/* Profile */}
      <div className="
        flex items-center
        justify-center sm:justify-start
        gap-2
        py-3
        min-w-0
      ">

        <div className="w-9 h-9 sm:w-11 sm:h-11 relative shrink-0">
          <Image
            src="/img/defaultProfile.JFIF"
            alt="Profile"
            fill
            className="object-cover rounded-full"
          />
        </div>

        <div className="min-w-0">
          <h2 className="text-gray-200 text-[10px] sm:text-sm font-bold truncate">
            {userProfileData?.data?.userProfile?.profileName || session?.user.name}
          </h2>

          <h3 className="text-gray-400 text-[9px] sm:text-xs font-bold">
            Student
          </h3>
        </div>

      </div>


      {/* Sidebar Items */}
      <div className="space-y-1 sm:space-y-2">

        {/* Mobile + Desktop */}
        <SidebarItem
          icon={<Home size={18} />}
          text="Dashboard"
          navigate="/profile/profile"
        />

        <SidebarItem
          icon={<Users size={18} />}
          text="Community"
          navigate="/community"
        />

        <SidebarItem
          icon={<MdOutlineAssignment size={18} />}
          text="My Post"
          navigate="/myPosts"
        />

        <SidebarItem
          icon={<MessageSquareMoreIcon size={18} />}
          text="Messages"
          navigate="/myPosts"
        />


        {/* Desktop only */}
        <div className="hidden sm:block">

          <SidebarItem
            icon={<MdOutlineNotifications size={18} />}
            text="Notifications"
          />

          <SidebarItem
            icon={<Bookmark size={18} />}
            text="Bookmarks"
            navigate="/save"
          />

          <SidebarItem
            icon={<Settings size={18} />}
            text="Settings"
          />

          <SidebarItem
            icon={<LogOut size={18} />}
            text="Logout"
          />

        </div>

      </div>

    </div>
  );
}

function SidebarItem({
  icon,
  text,
  navigate,
  className = "",
}: SidebarItemProps) {
  return (
    <div       className={`
        flex items-center gap-2 sm:gap-3
        py-2 sm:py-2.5
        px-2 sm:px-4
        rounded-lg
        font-semibold
        text-[10px] sm:text-sm
        hover:bg-[#314E7F]
        cursor-pointer
        transition
        min-w-0
        ${className}
      `}>
      {icon}

      <Link href={`${navigate}`}>

        <span className="sm:block">
          {text}
        </span>
      </Link>
    </div>
  );
}