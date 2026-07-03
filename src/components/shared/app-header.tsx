import Link from 'next/link';
import { usePathname } from "next/navigation";
import CustomButton from './CustomButton'
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/src/store/useSelecterhook';
import { useEffect, useRef, useState } from 'react';
import { logout } from '@/src/store/userDataSlice';
import { signOut, useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";

function AppHeader() {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.userData.isAuthenticated);
  const userDeta = useAppSelector((state) => state.userData.profileData);
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  // const profileImg = userDeta?.userProfile?.profileImgUrl

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

  return (
    <>
     <nav className='w-full rounded-lg bg-[#FFFFFF]'>
       <div className='flex justify-between items-center px-4 pt-1'>
         <div className='flex items-center gap-1'>
             <div className="w-12 h-12 relative">
               <Image
                src="/img/Logoo.png"
                alt="Logo"
                fill
                className='object-contain'
              />
            </div>
            <div className='leading-none font-medium'>
                <h2 className='text-blue-900 font-bold'>Student Hub</h2>
                <h3 className='text-green-600 font-bold'>Pakistan</h3>
            </div>
        </div>

        <div className='hidden md:block md:w-[40%]'>
            <ul className='flex justify-around items-center'>
                <li>
                  <Link
                    href="/"
                    className={pathname === "/" ? "border-b-2 border-blue-500" : ""}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/courses"
                    className={pathname === "/courses" ? "border-b-2 border-blue-500" : ""}
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/notes"
                    className={pathname === "/notes" ? "border-b-2 border-blue-500" : ""}
                  >
                    Notes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    className={pathname === "/community" ? "border-b-2 border-blue-500" : ""}
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobs"
                    className={pathname === "/jobs" ? "border-b-2 border-blue-500" : ""}
                  >
                    Jobs
                  </Link>
                </li>
            </ul>
        </div>

        <div className='flex justify-between items-center gap-3'>
          {session?.user.email ? (
            //  <CustomButton onClick={handleLogout}>{isLoading ? `please wait.. ${<Loader2 className='ml-2 h-4 w-4 animate-spin' />}` : "LogOut"}</CustomButton>
              <div className='flex items-center gap-1 relative'>
                <div className='pr-5'>
                <IoMdNotifications size={26} className='text-gray-800' />
                </div>

                <div className="w-10 h-10 relative">
                  <Image
                    src={ "/img/defaultProfile.JFIF"}
                    alt="Logo"
                    fill
                    className='object-contain rounded-full'
                  />
                </div>
                <div className='text-[12px]'>
                    <h2 className='text-gray-800 font-bold'>Ahmad Raza</h2>
                    <h3 className='text-gray-600 font-bold'>student</h3>
                </div>

                  <div className="relative inline-block" ref={dropdownRef} >
                    <button className='cursor-pointer' onClick={(e) => setProfileDropdownOpen(!profileDropdownOpen)}>
                      { profileDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown /> }
                    </button>  

                    {/* Dropdown */}
                    {profileDropdownOpen && (
                      <div className="absolute right-0 mt-4 w-40 rounded-md border bg-white shadow-lg">
                        <ul className="pb-2">
                          <p className='text-xs  text-gray-800 px-4 pb-2 font-bold'>My Account</p>
                          <li>
                            <Link
                              href="/profile/profile"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Profile
                            </Link>
                          </li>

                          <li>
                            <Link
                              href="/settings"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Settings
                            </Link>
                          </li>

                          <li>
                            <button
                              onClick={() => handleLogout()}
                              className="w-full px-4 py-2 text-left hover:bg-gray-100"
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                </div>
               
          
              </div>
          ) : (
             <>           
              <Link href="/sign-in"><CustomButton className="rounded border border-gray-300 bg-gray-100 bg-none text-black shadow-sm">Sign In</CustomButton></Link>
              <Link href="/sign-up"><CustomButton>sign up</CustomButton></Link>
             </>
          )}

        </div>

        
        {/* Mobile Menu Icon */}
        <button className="md:hidden text-2xl">
          ☰
        </button>

      </div>
    </nav>
</>
  )
}

export default AppHeader;


