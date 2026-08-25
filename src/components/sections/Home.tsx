import CustomButton from '@/src/components/shared/CustomButton'
import { ArrowRight, BookOpen, Briefcase, FileText, GraduationCap, PlayCircle, Users } from 'lucide-react'
import { FaAward, FaBookOpen } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { MdLanguage, MdOutlineWorkspacePremium, MdVideoLibrary } from "react-icons/md";
import { IoSchoolSharp, IoBriefcaseSharp } from "react-icons/io5";
import { FaGlobeEurope, FaUniversity, FaUsers } from "react-icons/fa";
import { BsBriefcaseFill, BsFileTextFill } from "react-icons/bs";
import Image from 'next/image';
import { FaFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import {
  FaRegCommentDots,
  FaShare,
  FaRegBookmark,
} from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import DashboardSidebar from "@/src/components/shared/DashboardSidebar"
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { title } from 'process';


const trandingNotes  = [
  {
    title: "Maths Formula Sheet",
    content: "By sir usman",
    textColor: "text-red-500"
  },
  {
    title: "Physics Chapter 1 Notes",
    content: "By Ali Raza",
    textColor: "text-blue-500"
  },
  {
    title: "Chemistry Organic Notes",
    content: "By Laiba khan",
    textColor: "text-[#028569]"
  },
    {
    title: "Islamiyat Important MCQs",
    content: "By Mazhar Jamill",
    textColor: "text-orange-500"
  },
];

const Scholarships = [
  {
    title: "HEC Need Based Scholarship",
    content: "Undergraduate Programs",
    icon:   <FaUniversity size={21} className="text-blue-600" />
  },
  {
    title: "British Council Scholarship",
    content: "Masters Programs",
    icon: <FaGlobeEurope  size={21} className="text-green-600" />
  },
    {
    title: "NTS Talent Scholarship",
    content: "For intermidiate students",
    icon:   <FaAward size={21} className="text-yellow-500" />
  },
  {
    title: "US MN Talent Scholarship",
    content: "For intermidiate students",
    icon:   <MdOutlineWorkspacePremium  size={21} className="text-pink-500" />
  }
]

function Home() {

  const toDay = new Date();

  const formattedDate = toDay.toLocaleDateString("en-Us", {
      weekday: "short",
      day: "numeric",
      month: "short"
  });

  return (
    <div className="min-h-screen mt-5 w-full mx-auto bg-[#FCFDFD] dark:bg-[#0B1120] text-gray-800 dark:text-gray-100">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto bg-[#F5F8FA] dark:bg-[#0F172A]">

        <div className='px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-6 sm:pb-8 gap-8 lg:gap-10 grid grid-cols-1 lg:grid-cols-[40%_58%] items-center'>
          <div className='min-w-0'>

              <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
                Pakistan's All-in-One Platform for Students
              </span>

                <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-sans font-bold  leading-tight text-gray-900 dark:text-[#FBFCFE] "> 

                  Learn, Connect &
                </h1>

                <h1 className='text-3xl sm:text-4xl lg:text-5xl  font-bold leading-tight'>
                   {/* flex space-x-3 */}
                  <span className="text-[#10845B] dark:text-green-400">
                    Grow  
                  </span>
                  <span className='text-gray-900 dark:text-[#FBFCFE]'>
                    Together.
                  </span>
                  
                </h1>

                <p className="text-gray-700 dark:text-gray-300 font-medium sm:font-semibold mt-5 sm:mt-6 lg:pr-24 text-sm sm:text-base leading-6">
                  Share notes, join communities, find scholarships,
                  prepare for exams and build your future.
                </p>

                <div className='flex sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8'>
                  
                  <CustomButton className='flex items-center justify-between w-full sm:w-auto h-12 whitespace-nowrap px-5 py-3 gap-3'>join Now-it's Free <ArrowRight size={18} /></CustomButton>
                  <CustomButton className='flex items-center justify-between w-full sm:w-auto h-12 whitespace-nowrap px-5 py-3 gap-3 rounded border-2 border-gray-200 dark:border-gray-700 bg-transparent bg-none text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1E293B] shadow-none'>Explore Notes <BookOpen size={16}/></CustomButton>
                  
                </div>

                <p className="mt-7 sm:mt-9 text-gray-700 dark:text-gray-400 text-sm sm:text-base font-semibold">
                  Trusted by 50,000+ students across Pakistan
                </p>
          </div>

            {/* Right Side */}
              <div className="w-full min-w-0 bg-white dark:bg-[#111827] rounded-md shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <img
                  src="/img/hero-section.png"
                  alt="students"
                  className="w-full h-auto max-h-80 sm:max-h-96 lg:max-h-none object-cover rounded-2xl"
                />
              </div>
            </div>
      </section>

        {/* Profile Section */}

        <section className="max-w-7xl mx-auto border border-gray-200 dark:border-gray-700 bg-linear-to-b from-[#07347A] via-[#073F87] to-[#00549A] md:h-130 md:bg-white md:dark:bg-[#0F172A] overflow-hidden shadow rounded-xl mt-4">
              
              <div className='md:hidden p-5'>
                <h1 className='text-2xl sm:text-4xl font-sans font-bold  leading-tight text-white dark:text-[#FBFCFE]'>Dashboard Preview</h1>

                <p className='text-white mt-2 text-sm'>Track your learning progress and activities</p>
              </div>

              <div className="grid grid-cols-[144px_1fr] sm:grid-cols-[192px_1fr] lg:grid-cols-[240px_1fr] items-stretch">
                
                {/* Sidebar */}
                <div className="min-w-0 md:h-full">
                  <DashboardSidebar />
                </div>


                {/* Right Content */}
              <div className="md:p-5 min-w-0 bg-white dark:bg-[#0F172A] rounded-r-xl border border-gray-200 dark:border-gray-700 h-66 md:h-full overflow-y-auto">

                  <div className="md:flex justify-between items-center hidden p-3">
                    <div>
                        <h1 className="font-bold text-2xl">Dashboard Overview</h1>
                        <p className="text-gray-400 text-sm">Track Your learning progress and activities</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                        <FaRegCalendarAlt size={20} />
                        <p className="font-semibold">{formattedDate}</p>
                    </div>
                  </div>

                  <div className="mb-6">

                    {/* Cards container */}
                    <div className="overflow-x-auto lg:overflow-x-hidden">

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:px-3 sm:p-5 pt-3">

                        {/* My Classes */}
                        <div className=" min-w-0 bg-white dark:bg-[#111827] rounded-xl p-2 shadow border border-gray-200 dark:border-gray-700 ">

                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            My Classes
                          </p>

                          <h2 className="text-xl font-bold mt-2 text-gray-900 dark:text-white">
                            6
                          </h2>

                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            Active Classes
                          </p>
                        </div>


                        {/* Assignments */}
                        <div className="min-w-0 bg-white dark:bg-[#111827] rounded-xl p-4 shadow border border-gray-200 dark:border-gray-700">

                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Assignments
                          </p>

                          <h2 className="text-xl font-bold mt-2 text-gray-900 dark:text-white">
                            4
                          </h2>

                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            Pending
                          </p>
                        </div>


                        {/* Messages */}
                        <div className="min-w-0 bg-white dark:bg-[#111827] rounded-xl p-4 shadow border border-gray-200 dark:border-gray-700">

                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Messages
                          </p>

                          <h2 className="text-xl font-bold mt-2 text-gray-900 dark:text-white">
                            3
                          </h2>

                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            Unread
                          </p>
                        </div>


                        {/* Progress */}
                        <div className="min-w-0 bg-white dark:bg-[#111827] rounded-xl p-4 shadow border border-gray-200 dark:border-gray-700">

                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Progress
                          </p>

                          <h2 className="text-xl font-bold mt-2 text-gray-900 dark:text-white">
                            78%
                          </h2>

                          <div className="
                            w-full
                            bg-gray-200 dark:bg-gray-700
                            rounded-full
                            h-2
                            mt-3
                          ">
                            <div className="
                              bg-green-500
                              h-2
                              rounded-full
                              w-[78%]
                            " />
                          </div>
                        </div>


                        {/* Calendar */}
                        <div className="
                          hidden md:block
                          min-w-0
                          bg-white dark:bg-[#111827]
                          p-4
                          rounded-xl
                          shadow
                          border border-gray-200 dark:border-gray-700
                        ">
                          <DayPicker
                            mode="single"
                            classNames={{
                              day: "h-7 w-7 text-xs",
                              caption_label: "text-sm text-gray-800 dark:text-gray-200",
                              day_button: "h-6 w-11",
                              weekday: "text-xs text-gray-500 dark:text-gray-400",
                            }}
                          />
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

        </section>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-5">

            {/* Trending Notes */}
            <div
              className="
                bg-white dark:bg-[#111827]
                rounded-xl
                border border-gray-200 dark:border-gray-700
                shadow-sm
                p-4 sm:p-5
              "
            >
              <div className="flex justify-between items-center gap-3 mb-4">
                <h2 className="font-semibold text-lg text-gray-900 dark:text-[#FBFCFE]">
                  Trending Notes
                </h2>

                <button className="text-blue-600 dark:text-blue-400 text-sm shrink-0">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {trandingNotes.map((note) => (
                  <div
                    key={note.title}
                    className="flex justify-between items-center gap-3"
                  >

                    <div className="flex gap-3 min-w-0">
                      <FaFilePdf
                        className={`${note.textColor} text-xl shrink-0`}
                      />

                      <div className="min-w-0">
                        <h3 className="font-medium text-sm text-gray-800 dark:text-gray-200 truncate">
                          {note.title}
                        </h3>

                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {note.content}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      <span className="text-green-600 dark:text-green-400 text-xs">
                        2.5K
                      </span>

                      <AiFillLike className="text-green-500 cursor-pointer" />
                    </div>

                  </div>
                ))}
              </div>
            </div>


            {/* Scholarships */}
            <div
              className="
                bg-white dark:bg-[#111827]
                rounded-xl
                border border-gray-200 dark:border-gray-700
                shadow-sm
                p-4 sm:p-5
              "
            >
              <div className="flex justify-between items-center gap-3 mb-4">
                <h2 className="font-semibold text-lg text-gray-900 dark:text-[#FBFCFE]">
                  Latest Scholarships
                </h2>

                <button className="text-blue-600 dark:text-blue-400 text-sm shrink-0">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {Scholarships.map((item) => (
                  <div
                    key={item.title}
                    className="flex justify-between items-center gap-3"
                  >

                    <div className="flex gap-3 items-center min-w-0">
                      <div className="shrink-0">
                        {item.icon}
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-medium text-sm text-gray-800 dark:text-gray-200 truncate">
                          {item.title}
                        </h3>

                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {item.content}
                        </p>
                      </div>
                    </div>

                    <button
                      className="
                        px-3 py-1
                        border border-green-500
                        text-green-600 dark:text-green-400
                        rounded-lg
                        text-sm
                        shrink-0
                        hover:bg-green-50
                        dark:hover:bg-green-900/20
                        transition
                      "
                    >
                      Apply
                    </button>

                  </div>
                ))}
              </div>
            </div>


            {/* Communities */}
            <div
              className="
                bg-white dark:bg-[#111827]
                rounded-xl
                border border-gray-200 dark:border-gray-700
                shadow-sm
                p-4 sm:p-5
              "
            >
              <div className="flex justify-between items-center gap-3 mb-4">
                <h2 className="font-semibold text-lg text-gray-900 dark:text-[#FBFCFE]">
                  Student Communities
                </h2>

                <button className="text-blue-600 dark:text-blue-400 text-sm shrink-0">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {[
                  "Computer Science Hub",
                  "Pre-Medical Students",
                  "Engineering Community",
                  "CSS Aspirants Pakistan",
                ].map((community) => (
                  <div
                    key={community}
                    className="flex justify-between items-center gap-3"
                  >

                    <div className="flex gap-3 items-center min-w-0">
                      <FaUsers className="text-blue-600 dark:text-blue-400 text-lg shrink-0" />

                      <div className="min-w-0">
                        <h3 className="font-medium text-sm text-gray-800 dark:text-gray-200 truncate">
                          {community}
                        </h3>

                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          12.5K Members
                        </p>
                      </div>
                    </div>

                    <button
                      className="
                        px-4 py-1
                        border border-gray-200 dark:border-gray-600
                        rounded-lg
                        text-green-600 dark:text-green-400
                        text-sm
                        shrink-0
                        hover:bg-green-50
                        dark:hover:bg-green-900/20
                        transition
                      "
                    >
                      Join
                    </button>

                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="my-6 px-3 sm:px-6 bg-[#FCFDFD] dark:bg-[#0F172A]">

          <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-2xl">

            <img
              src="/img/Join-bennar.png"
              alt="Join Student Hub"
              className="
                block
                w-full
                h-auto
                object-cover
              "
            />

            {/* Button */}
            <button
              className="
                absolute
                top-1/2
                right-[8%]
                -translate-y-1/2

                w-32 h-9
                sm:w-48 sm:h-11
                lg:w-72 lg:h-12

                rounded-xl
                bg-transparent
                cursor-pointer
              "
              aria-label="Join Student Hub"
            />

          </div>
        </footer>


    </div>
  )
}

export default Home;
