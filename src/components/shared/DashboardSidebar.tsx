import {
  Home,
  Bookmark,
  Settings,
  LogOut,
  MessageSquareMoreIcon,
} from "lucide-react";
import Image from "next/image";
import { MdOutlineNotifications, MdOutlineAssignment, MdOutlineClass } from "react-icons/md";

type SidebarItemProps = {
  icon: React.ReactNode;
  text: string;
  className?: string;
};


export default function Sidebar() {
  return (
    <div
      className="
        w-36 sm:w-48 lg:w-60
        shrink-0
        min-w-0
        bg-linear-to-b
        from-[#003178]
        to-[#004B91]
        rounded-l-2xl
        text-white
        p-2 sm:p-3
        flex flex-col
      "
    >

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
            Ahmad Raza
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
        />

        <SidebarItem
          icon={<MdOutlineClass size={18} />}
          text="My Classes"
        />

        <SidebarItem
          icon={<MdOutlineAssignment size={18} />}
          text="Assignments"
        />

        <SidebarItem
          icon={<MessageSquareMoreIcon size={18} />}
          text="Messages"
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

      <span className="sm:block">
        {text}
      </span>
    </div>
  );
}


// export default function Sidebar() {
//   return (
//     <div className="w-60 bg-linear-to-b from-[#003178]  to-[#004B91] rounded-l-2xl text-white p-3 flex flex-col justify-between">

//         {/* Community */}
//         <div>
//             <div className='flex items-center gap-1'>
//                 <div className="w-12 h-12 relative">
//                     <Image
//                     src="/img/Logoo.png"
//                     alt="Logo"
//                     fill
//                     className='object-contain'
//                     />
//                </div>
//                 <div className='leading-none font-medium'>
//                     <h2 className='text-white font-bold'>Student Hub</h2>
//                     <h3 className='text-green-500 font-bold'>Pakistan</h3>
//                 </div>
//             </div>

//             <div className="flex items-center justify-center gap-2 py-3 ">
//                 <div className="w-13 h-13 relative">
//                     <Image
//                     src={ "/img/defaultProfile.JFIF"}
//                     alt="Logo"
//                     fill
//                     className='object-contain rounded-full'
//                     />
//                 </div>
//                 <div className='text-sm'>
//                     <h2 className='text-gray-200 font-bold'>Ahmad Raza</h2>
//                     <h3 className='text-gray-400 font-bold'>student</h3>
//                 </div>
//             </div>

//           <div className="space-y-2 text-sm">
//             <SidebarItem icon={<Home size={20} />} text="Dashboard" className='' />
//             <SidebarItem icon={<MdOutlineClass size={20} />} text="My Classes" />
//             <SidebarItem icon={<MdOutlineAssignment size={20} />} text="Assignments" />
//             <SidebarItem icon={<MessageSquareMoreIcon size={20} />} text="Messages" />
//             <SidebarItem icon={<MdOutlineNotifications size={20} />} text="Notifications" />
//             <SidebarItem icon={<Bookmark size={20} />} text="Bookmarks" />
//             <SidebarItem icon={<Settings size={20} />} text="Settings" />
//             <SidebarItem icon={<LogOut size={20} />} text="Logout" />
//           </div>
//       </div>
//     </div>
//   );
// }

// function SidebarItem({ 
//     icon,
//     text,
//     className = "",
//   }: SidebarItemProps) {
//   return (
//     <div className={`flex items-center font-semibold gap-3 py-2.5 px-4 m-0 rounded-lg hover:bg-[#314E7F] cursor-pointer hover:text-blue-200 transition ${className}`}>
//       {icon}
//       <span>{text}</span>
//     </div>
//   );
// }