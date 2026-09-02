import CustomButton from '@/src/components/shared/CustomButton'
import { ArrowRight, BookOpen, Briefcase, FileText, GraduationCap, PlayCircle, Users } from 'lucide-react'
import { FaBookOpen } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { MdVideoLibrary } from "react-icons/md";
import { IoSchoolSharp, IoBriefcaseSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { BsBriefcaseFill, BsFileTextFill } from "react-icons/bs";
import Footer from "@/src/components/sections/Footer"
import Image from 'next/image';
import { FaFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaRegCommentDots, FaShare, FaRegBookmark, } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import Link from 'next/link';
import { toast } from 'sonner';

const features = [
  {
    title: "Notes & Study",
    desc: "Discover and share quality notes",
    icon: <FaBookOpen size={34} className="text-[#028569]" />,
    bg: "bg-[#DEF0E9]"
  },
  {
    title: "Communities",
    desc: "Join student groups",
    icon: <HiUsers size={34} className="text-blue-800" />,
    bg: "bg-[#E6EDFB]"
  },
  {
    title: "Video Learning",
    desc: "Watch lectures and learn online",
    icon: <MdVideoLibrary size={34} className="text-purple-600" />,
    bg: "bg-[#F1F2FC]"
  },
  {
    title: "Scholarships",
    desc: "Find latest opportunities",
    icon: <IoSchoolSharp size={34} className="text-orange-500" />,
    bg: "bg-[#FCF0E6]"
  },
  {
    title: "Jobs & InternShips",
    desc: "Find internships & jobs",
    icon: <BsBriefcaseFill size={34} className="text-cyan-600" />,
    bg: "bg-[#EEF7F8]"
  },
  {
    title: "MCQs",
    desc: "Practice past papers",
    icon: <BsFileTextFill size={34} className="text-[#F46F7B]" />,
    bg: "bg-[#FADFE1]"
  },
];

const stats = [
  {
    number: "50K+",
    label: "Students",
    icon: <FaUsers size={35} className='text-[#2B9165] shrink-0'/>
  },
  {
    number: "10K+",
    label: "Notes Shared",
    icon: <FaBookOpen size={35} className='text-[#5167EB] shrink-0' />
  },
  {
    number: "1K+",
    label: "Communities",
    icon: <FaUsers size={35} className='text-[#7E6C7A] shrink-0' />
  },
  {
    number: "500+",
    label: "Scholarships",
      icon: <IoSchoolSharp size={35} className='text-[#AC7F55] shrink-0' />
  },
  {
    number: "300+",
    label: "Jobs Posted",
    icon: <IoBriefcaseSharp size={35} className='text-[#349662] shrink-0' />
  },
];

function page() {
  
  const handleProtectedClick = () => {
    toast("Community is open to everyone. Please log in to access other features.", { style: { background: "#000", color: "#fff" } });
    return;
  }

  return (
    <div className="min-h-screen bg-[#FCFDFD] dark:bg-[#0B1120] pt-16 md:pt-6 text-gray-800 dark:text-gray-200">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto bg-[#F5F8FA] dark:bg-[#0B1120]">
        <div className="px-4 sm:px-6 pb-10 sm:pb-5 pt-10 sm:pt-16 grid grid-cols-1 lg:grid-cols-[40%_58%] gap-8 lg:gap-10 items-center">

          {/* Left Side */}
          <div className="text-center lg:text-left">

            <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
              Pakistan's All-in-One Platform for Students
            </span>

            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-sans font-bold leading-tight text-gray-900 dark:text-white">
              Learn, Connect &
            </h1>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight flex justify-center lg:justify-start gap-2 sm:gap-3">
              <span className="text-[#10845B]">Grow</span>
              <span className="text-gray-900 dark:text-white">Together.</span>
            </h1>

            <p className="text-gray-700 dark:text-gray-300 font-semibold mt-5 sm:mt-6 lg:pr-24 text-sm sm:text-base leading-6">
              Share notes, join communities, find scholarships, prepare for exams and build your future.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-6 mt-7 sm:mt-8">
              <Link href="/sign-up"  className="w-full sm:w-auto text-gray-200 font-semibold flex items-center justify-center px-5 py-3 gap-3 rounded shadow-lg transition-all duration-300 hover:scale-105 bg-linear-to-r from-[#017D63] to-[#0aa382] cursor-pointer">
                Join Now - it's Free <ArrowRight size={18} />
              </Link>


              <Link href="/community" className="w-full sm:w-auto flex items-center justify-center px-5 py-3 gap-3 rounded border hover:bg-gray-200 border-gray-200 dark:border-gray-700 text-black dark:text-white shadow">
                Explore Communities <BookOpen size={16} />
              </Link>
            </div>

            <p className="mt-7 sm:mt-9 text-gray-700 dark:text-gray-300 font-semibold text-sm sm:text-base">
              Trusted by 50,000+ students across Pakistan
            </p>
          </div>

          {/* Right Side */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-xl overflow-hidden w-full">
            <img src="/img/hero-section.png" alt="students" className="rounded-2xl w-full h-auto object-cover" />
          </div>

        </div>
      </section>
       
      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
        {features.map((item, index) => (
          <div
            key={index}
            onClick={handleProtectedClick}
            className=" bg-white dark:bg-[#111827] rounded-2xl sm:rounded-3xl p-4 cursor-pointer sm:p-6 text-center shadow-sm dark:shadow-none border border-transparent dark:border-gray-800 hover:shadow-lg dark:hover:bg-[#172033] transition"
          >
            {/* Icon */}
            <div
              className={`
                w-12 h-12 sm:w-14 sm:h-14
                rounded-xl sm:rounded-2xl
                ${item.bg}
                flex items-center justify-center
                mx-auto
              `}
            >
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mt-3 sm:mt-4">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1.5 sm:mt-2 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12">
        <div className="bg-linear-to-b from-[#011E43] to-[#001D41] text-white rounded-xl p-4 sm:p-6 grid grid-cols-2 md:grid-cols-5 gap-5 sm:gap-8">

          {stats.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-3 sm:gap-4"
            >
              {/* Icon */}
              <div className="shrink-0">
                {item.icon}
              </div>

              {/* Number + Label */}
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold leading-tight">
                  {item.number}
                </h2>

                <p className="text-xs sm:text-sm text-gray-300 mt-1 truncate">
                  {item.label}
                </p>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <h2 className="text-lg sm:text-xl font-bold pb-3 text-gray-900 dark:text-white">
          What you'll Find on <span className="text-[#017D63]">Student Hub Pakistan</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">

          {/* Student Post */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-md dark:shadow-none border border-transparent dark:border-gray-800 p-3 sm:p-4">
            
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <h2 className="font-bold text-sm sm:text-md text-gray-900 dark:text-white">Student Posts</h2>

                <div className="flex items-center gap-2 sm:gap-3 mt-3">
                  <img src="https://i.pravatar.cc/100" alt="profile" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shrink-0" />

                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-xs sm:text-sm leading-3 truncate">Fatima Noor</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                  </div>
                </div>
              </div>

              <button className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl shrink-0">
                <BsThreeDots />
              </button>
            </div>

            <div className="mt-3">
              <p className="text-gray-900 dark:text-gray-200 font-semibold text-xs">Just completed my Physics practical!</p>
              <p className="text-gray-900 dark:text-gray-200 font-semibold text-xs">Here's a short video on Ohm's law.</p>
            </div>

            <div className="relative mt-4">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop" alt="post" className="w-full h-28 sm:h-40 object-cover rounded-xl" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-10 sm:border-t-12 border-t-transparent border-b-10 sm:border-b-12 border-b-transparent border-l-15 sm:border-l-18 border-l-white ml-1"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 sm:mt-5 text-gray-600 dark:text-gray-400">
              <button className="flex items-center gap-1 sm:gap-2 hover:text-blue-600 transition">
                <AiFillLike className="text-sm sm:text-md" />
                <span className="font-semibold text-[10px] sm:text-xs">124</span>
              </button>

              <button className="flex items-center gap-1 sm:gap-2 hover:text-green-600 transition">
                <FaRegCommentDots className="text-sm sm:text-md" />
                <span className="font-semibold text-[10px] sm:text-xs">29</span>
              </button>

              <button className="flex items-center gap-1 sm:gap-2 hover:text-orange-600 transition">
                <FaShare className="text-sm sm:text-md" />
                <span className="font-semibold text-[10px] sm:text-xs">2</span>
              </button>

              <button className="hover:text-red-500 transition">
                <FaRegBookmark className="text-sm sm:text-md" />
              </button>
            </div>
          </div>


          {/* Notes Preview */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-md dark:shadow-none border border-transparent dark:border-gray-800 p-3 sm:p-4">
            
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <h2 className="font-bold text-sm sm:text-md text-gray-900 dark:text-white">Notes Preview</h2>

                <div className="flex items-center gap-2 sm:gap-3 mt-3">
                  <img src="https://i.pravatar.cc/100" alt="profile" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shrink-0" />

                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-xs sm:text-sm leading-3 truncate">Usman Alli</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                  </div>
                </div>
              </div>

              <button className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl shrink-0">
                <BsThreeDots />
              </button>
            </div>

            <div className="mt-3">
              <p className="text-gray-900 dark:text-gray-200 font-semibold text-xs">Physics chapter 8 Notes</p>
              <p className="text-gray-400 dark:text-gray-500 font-semibold text-xs">12 pages</p>
            </div>

            <div className="relative mt-4">
              <img src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop" alt="post" className="w-full h-28 sm:h-40 object-cover rounded-xl" />
            </div>

            <div className="flex items-center mt-4 sm:mt-5 text-gray-600 dark:text-gray-400">
              <button className="flex items-center gap-1 sm:gap-2 hover:text-blue-600 transition">
                <FaEye className="text-sm sm:text-md" />
                <span className="font-semibold text-[10px] sm:text-xs">1.2k views</span>
              </button>
            </div>
          </div>


          {/* Video Lecture */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-md dark:shadow-none border border-transparent dark:border-gray-800 p-3 sm:p-4">
            
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <h2 className="font-bold text-sm sm:text-md text-gray-900 dark:text-white">Video Lectures</h2>

                <div className="flex items-center gap-2 sm:gap-3 mt-3">
                  <img src="https://i.pravatar.cc/100" alt="profile" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shrink-0" />

                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-xs sm:text-sm leading-3 truncate">Dr. Alli Khan</h3>
                  </div>
                </div>
              </div>

              <button className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl shrink-0">
                <BsThreeDots />
              </button>
            </div>

            <div className="mt-3">
              <p className="text-gray-900 dark:text-gray-200 font-semibold text-xs">Calculus - Complete Course</p>
              <p className="text-gray-400 dark:text-gray-500 font-semibold text-xs">Dr. Ali Khan</p>
            </div>

            <div className="relative mt-4">
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop" alt="post" className="w-full h-28 sm:h-40 object-cover rounded-xl" />
            </div>

            <div className="flex items-center mt-4 sm:mt-5 text-gray-600 dark:text-gray-400">
              <button className="flex items-center gap-1 sm:gap-2 hover:text-blue-600 transition">
                <FaEye className="text-sm sm:text-md" />
                <span className="font-semibold text-[10px] sm:text-xs">1.2k views</span>
              </button>
            </div>
          </div>


          {/* Community */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-sm dark:shadow-none border border-transparent dark:border-gray-800">
            
            <h3 className="font-bold text-sm sm:text-md text-gray-900 dark:text-white">
              Popular Community
            </h3>

            <div className="mt-3 flex items-center gap-2 sm:gap-4">
              <PiStudentFill size={26} className="text-gray-700 dark:text-gray-300 shrink-0" />

              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-200 truncate">
                  FSC Pre-Engineering
                </h4>

                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  8.7K Members
                </p>
              </div>
            </div>

            <div className="relative my-3">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop" alt="post" className="w-full h-28 sm:h-40 object-cover rounded-xl" />
            </div>

            <Link href="/sign-up">
              <button className="bg-white dark:bg-[#1E293B] text-gray-700 dark:text-gray-200 w-full py-2 rounded-md font-bold cursor-pointer border border-gray-200 dark:border-gray-700 shadow-sm hover:scale-105 duration-300 text-xs sm:text-sm">
                Join Community
              </button>
            </Link>
          </div>

        </div>
      </section>

       {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="bg-linear-to-r from-green-500 to-blue-600 dark:from-green-600 dark:to-blue-700 rounded-2xl sm:rounded-[25px] px-5 py-6 sm:px-8 sm:py-7 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left Content */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-x-5 text-center sm:text-left">

            {/* Image */}
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 lg:h-25 lg:w-25 shrink-0">
              <Image
                src="/img/studen.png"
                alt="Student"
                fill
                className="object-contain"
              />
            </div>

            {/* Text */}
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Join Student Hub Pakistan Today!
              </h2>

              <p className="text-sm sm:text-base text-white/80 mt-2 sm:mt-3">
                Be part of Pakistan’s biggest student community.
              </p>
            </div>

          </div>

          {/* Button */}
          <Link
            href="/sign-up"
            className="w-full sm:w-auto"
          >
            <button
              className="
                w-full sm:w-auto
                bg-white dark:bg-slate-900
                text-green-700 dark:text-green-400
                px-6 sm:px-8
                py-3
                rounded-xl
                font-bold
                cursor-pointer
                flex items-center justify-center
                gap-3
                hover:bg-gray-100 dark:hover:bg-slate-800
                transition
                whitespace-nowrap
              "
            >
              Sign Up Now - it's Free
              <ArrowRight size={17} />
            </button>
          </Link>

        </div>
      </section>

        <Footer />
    </div>
  )
}

export default page