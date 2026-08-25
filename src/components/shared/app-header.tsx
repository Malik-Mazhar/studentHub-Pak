import Link from 'next/link';
import { usePathname } from "next/navigation";
import CustomButton from './CustomButton'
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/src/store/useSelecterhook';
import { useEffect, useRef, useState } from 'react';
import { logout } from '@/src/store/userDataSlice';
import { signOut, useSession } from 'next-auth/react';
import { Loader2, Menu, X } from 'lucide-react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import ThemeToggle from './theme-toggle';
import { IoMdNotifications } from "react-icons/io";
import { House, BookOpen, NotebookPen, Users, Mail } from "lucide-react";

function AppHeader() {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch()
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);


  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut();

      dispatch(logout());
    } catch (error) {
      console.log("Logout failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Neeche scroll
        setShowHeader(false);
      } else {
        // Upar scroll
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
}, [lastScrollY]);

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          w-full
          bg-white dark:bg-[#0F172A]
          text-gray-900 dark:text-[#FBFCFE]
          border-b border-gray-200 dark:border-gray-800
          transition-transform duration-800
          ${showHeader ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        
    {/* Main Navbar */}
        <div className=" flex items-center justify-between min-w-0 px-2 sm:px-4 py-2 gap-2">


          {/* Logo */}
          <div className="flex items-center gap-1 min-w-0">

            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/img/Logoo.png"
                alt="Student Hub Pakistan Logo"
                fill
                className="object-contain"
              />
            </div>

            <div className="leading-none font-medium">
              <h2 className="text-blue-900 dark:text-[#FBFCFE] font-bold text-sm sm:text-base">
                Student Hub
              </h2>

              <h3 className="text-green-600 dark:text-green-400 font-bold text-sm sm:text-base">
                Pakistan
              </h3>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block md:flex-1 md:max-w-150">

            <ul className="flex justify-center gap-5 lg:gap-8 items-center">

              <li>
                <Link
                  href="/"
                  className={`
                    text-sm lg:text-base
                    transition
                    hover:text-blue-600 dark:hover:text-blue-400
                    pb-1
                    ${
                      pathname === "/"
                        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                        : ""
                    }
                  `}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/courses"
                  className={`
                    text-sm lg:text-base
                    transition
                    hover:text-blue-600 dark:hover:text-blue-400
                    pb-1
                    ${
                      pathname === "/courses"
                        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                        : ""
                    }
                  `}
                >
                  Courses
                </Link>
              </li>

              <li>
                <Link
                  href="/notes"
                  className={`
                    text-sm lg:text-base
                    transition
                    hover:text-blue-600 dark:hover:text-blue-400
                    pb-1
                    ${
                      pathname === "/notes"
                        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                        : ""
                    }
                  `}
                >
                  Notes
                </Link>
              </li>

              <li>
                <Link
                  href="/community"
                  className={`
                    text-sm lg:text-base
                    transition
                    hover:text-blue-600 dark:hover:text-blue-400
                    pb-1
                    ${
                      pathname === "/community"
                        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                        : ""
                    }
                  `}
                >
                  Community
                </Link>
              </li>

              <li>
                <Link
                  href="/jobs"
                  className={`
                    text-sm lg:text-base
                    transition
                    hover:text-blue-600 dark:hover:text-blue-400
                    pb-1
                    ${
                      pathname === "/jobs"
                        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                        : ""
                    }
                  `}
                >
                  Jobs
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className={`
                    text-sm lg:text-base
                    transition
                    hover:text-blue-600 dark:hover:text-blue-400
                    pb-1
                    ${
                      pathname === "/contact"
                        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                        : ""
                    }
                  `}
                >
                  Contact
                </Link>
              </li>

            </ul>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-1 sm:gap-2 relative min-w-0">

            {session?.user.email ? (

              <div className="flex items-center gap-2 relative">

                  <button
                    className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1E293B] transition"
                    aria-label="Open menu"
                    onClick={() => setIsMenuOpen(true)}
                  >
                    <Menu
                      size={23}
                      className="text-gray-800 dark:text-[#FBFCFE]"
                    />
                  </button>

                {/* Notification */}
                <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1E293B] transition"
                  aria-label="Notifications"
                >
                  <IoMdNotifications
                    size={23}
                    className="text-gray-800 dark:text-[#FBFCFE]"
                  />
                </button>

                {/* Profile */}
                <div className="hidden md:block relative w-9 h-9 sm:w-10 sm:h-10">
                  <Image
                    src="/img/defaultProfile.JFIF"
                    alt="Profile"
                    fill
                    className="object-cover rounded-full"
                  />

                  <div className="md:hidden absolute -right-1 -bottom-1 w-5 h-5 rounded-full bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm "
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
                    
                    <IoIosArrowDown
                      size={13}
                      className="text-gray-700 dark:text-gray-300"
                    />
                  </div>
                </div>

                {/* User Info - Hide on small screens */}
                <div className="hidden md:block min-w-0 leading-tight text-[10px] sm:text-[12px]">
                  <h2 className="max-w-16.25 md:max-w-none text-gray-800 dark:text-[#FBFCFE] font-bold truncate sm:max-w-none">
                    Ahmad Raza
                  </h2>

                  <h3 className="text-gray-600 dark:text-gray-400 font-bold">
                    Student
                  </h3>
                </div>

                {/* Profile Dropdown */}
                <div className="relative inline-block" ref={dropdownRef}>

                  <button className="hidden md:block cursor-pointer p-1  text-gray-700 dark:text-gray-300  hover:bg-gray-100 dark:hover:bg-[#1E293B] rounded-lg "
                    onClick={() =>
                      setProfileDropdownOpen(!profileDropdownOpen)
                    }
                    aria-label="Profile menu"
                  >
                    {profileDropdownOpen ? (
                      <IoIosArrowUp size={18} />
                    ) : (
                      <IoIosArrowDown size={18} />
                    )}
                  </button>

                   {/* Profile */}
                    <div className="md:hidden relative w-9 h-9 sm:w-10 sm:h-10">
                      <Image
                        src="/img/defaultProfile.JFIF"
                        alt="Profile"
                        fill
                        className="object-cover rounded-full"
                      />

                      <div className="md:hidden absolute -right-1 -bottom-1 w-5 h-5 rounded-full bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm "
                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
                        
                        <IoIosArrowDown
                          size={13}
                          className="text-gray-700 dark:text-gray-300"
                        />
                      </div>
                    </div>

                  {/* Dropdown */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 z-50 w-52 rounded-xl border border-gray-200 dark:border-gray-700  bg-white dark:bg-[#111827]  text-gray-800 dark:text-[#FFFFFF] shadow-lg overflow-hidden ">

                      <div className='flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700 '>

                          <div className="relative w-9 h-9 sm:w-10 sm:h-10">
                            <Image
                              src="/img/defaultProfile.JFIF"
                              alt="Profile"
                              fill
                              className="object-cover rounded-full"
                            />

                          </div>

                          <div className="min-w-0 leading-tight text-[10px] sm:text-[12px]">
                            <h2 className="max-w-16.25 md:max-w-none text-gray-800 dark:text-[#FBFCFE] font-bold truncate sm:max-w-none">
                              Ahmad Raza
                            </h2>

                            <h3 className="text-gray-600 dark:text-gray-400 font-bold">
                              Student
                            </h3>
                          </div>
                      </div>

                      <ul className="py-2">

                        <p className="text-xs text-gray-800 dark:text-gray-300 px-4 pb-2 font-bold ">
                          My Account
                        </p>

                        <li>
                          <Link
                            href="/profile/profile"
                            className="
                              block px-4 py-2
                              text-sm
                              hover:bg-gray-100
                              dark:hover:bg-[#17223c]
                              transition
                            "
                          >
                            Profile
                          </Link>
                        </li>

                        <li>
                          <Link
                            href="/settings"
                            className="
                              block px-4 py-2
                              text-sm
                              hover:bg-gray-100
                              dark:hover:bg-[#17223c]
                              transition
                            "
                          >
                            Settings
                          </Link>
                        </li>

                        <li
                          className="
                            px-4 py-2
                            hover:bg-gray-100
                            dark:hover:bg-[#17223c]
                            transition
                          "
                        >
                          <ThemeToggle /> 
                        </li>

                        <li>
                          <button
                            onClick={() => handleLogout()}
                            className="
                              w-full
                              px-4 py-2
                              text-left
                              text-sm
                              hover:bg-gray-100
                              dark:hover:bg-[#17223c]
                              transition
                            "
                          >
                            Logout
                          </button>
                        </li>

                      </ul>
                    </div>
                  )}
                </div>

{isMenuOpen && (
  <>
    {/* Overlay */}
    <div
      onClick={() => setIsMenuOpen(false)}
      className="fixed inset-0 z-40 bg-black/40 md:hidden"
    />

    {/* Right Drawer */}
    <div
      className="fixed right-0 top-0 z-50 h-screen w-[70%] max-w-sm overflow-y-auto border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-[#101827] shadow-2xl p-4 sm:p-5 md:hidden"
    >

      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Menu
        </h2>

        <button
          onClick={() => setIsMenuOpen(false)}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#1E293B]"
          aria-label="Close menu"
        >
          <X size={22} />
        </button>
      </div>

      {/* Menu Items */}
      <div className="mt-4 space-y-1">

        <button className="w-full rounded-lg px-3 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E293B]">
          My Feed
        </button>

        <button className="w-full rounded-lg px-3 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E293B]">
          My Posts
        </button>

        <button className="w-full rounded-lg px-3 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E293B]">
          Saved Posts
        </button>

        <button className="w-full rounded-lg px-3 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E293B]">
          Notes
        </button>

        <button className="w-full rounded-lg px-3 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E293B]">
          Videos
        </button>

        <button className="w-full rounded-lg px-3 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E293B]">
          Questions
        </button>

        <button className="w-full rounded-lg px-3 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E293B]">
          Community
        </button>

        <button className="w-full rounded-lg px-3 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E293B]">
          Courses
        </button>

      </div>

    </div>
  </>
)}

              </div>

            ) : (

              /* Auth Buttons */
              <div className="hidden sm:flex items-center gap-2">

                <Link href="/sign-in">
                  <CustomButton
                    className="
                      rounded-lg
                      border border-gray-300 dark:border-gray-700
                      bg-gray-100 dark:bg-[#1E293B]
                      text-gray-900 dark:text-gray-200
                      shadow-sm
                      hover:bg-gray-200 dark:hover:bg-[#334155]
                    "
                  >
                    Sign In
                  </CustomButton>
                </Link>

                <Link href="/sign-up">
                  <CustomButton>
                    Sign Up
                  </CustomButton>
                </Link>

              </div>
            )}

          </div>

        </div>

        
      <div className="md:hidden w-full border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0F172A]">
        <div className="flex items-center justify-around py-2">

          <Link
            href="/"
            className={pathname === "/" ? "text-blue-600" : "text-gray-500 dark:text-gray-400"}
          >
            <House size={22} />
          </Link>

          
          <Link
            href="/community"
            className={pathname === "/community" ? "text-blue-600" : "text-gray-500 dark:text-gray-400"}
          >
            <Users size={22} />
          </Link>

          <Link
            href="/courses"
            className={pathname === "/courses" ? "text-blue-600" : "text-gray-500 dark:text-gray-400"}
          >
            <BookOpen size={22} />
          </Link>

          <Link
            href="/notes"
            className={pathname === "/notes" ? "text-blue-600" : "text-gray-500 dark:text-gray-400"}
          >
            <NotebookPen size={22} />
          </Link>

          <Link
            href="/contact"
            className={pathname === "/contact" ? "text-blue-600" : "text-gray-500 dark:text-gray-400"}
          >
            <Mail size={22} />
          </Link>

        </div>
      </div>

      </nav>


</>
  )
}

export default AppHeader;


