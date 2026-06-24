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
    <div className="min-h-screen mx-auto bg-[#FCFDFD] text-gray-800">

      {/* Hero Section */}
      <section className="max-w-7xl bg-[#F5F8FA] mx-auto">
        <div className='px-6 pb-5 pt-16 grid lg:grid-cols-[40%_58%] gap-10 items-center'>
          <div>
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              Pakistan's All-in-One Platform for Students
            </span>

                <h1 className="flex space-x-10 text-5xl font-sans font-bold leading-tight">
                  <span>Learn,  Connect &</span>              
                  <br />
                </h1>

                <h1 className='flex space-x-3 text-5xl font-bold leading-tight'>
                  <span className="text-[#10845B]">
                    Grow  
                  </span>
                  <span>
                    Together.
                  </span>
                  
                </h1>

                <p className="text-gray-800 font-semibold mt-6 lg:pr-24 text-md leading-6">
                  Share notes, join communities, find scholarships,
                  prepare for exams and build your future.
                </p>

                <div className='flex gap-10 mt-8'>
                  
                  <CustomButton className='flex items-center justify-between px-5 py-3 gap-3'>join Now-it's Free <ArrowRight size={18} /></CustomButton>
                  <CustomButton className='flex items-center justify-between px-5 py-3 gap-3 rounded border-2 border-gray-200 bg-transparent bg-none text-black shadow-none'>Explore Notes <BookOpen size={16}/></CustomButton>
                  
                </div>

                <p className="mt-9 text-gray-800 font-semibold">
                Trusted by 50,000+ students across Pakistan
              </p>
          </div>

            {/* Right Side */}
              <div className="bg-white rounded-md shadow-xl overflow-hidden">
                <img
                  src="/img/hero-section.png"
                  alt="students"
                  className="rounded-3xl w-full object-cover"
                />
              </div>
            </div>
      </section>

        {/* Profile Section */}
        <section className="max-w-7xl mx-auto border shadow rounded-xl mt-4">
            <div className="grid grid-cols-[250px_1fr] gap-x-10">          
            <DashboardSidebar />

            <main>
                <div className="flex justify-between items-center p-3">
                <div>
                    <h1 className="font-bold text-2xl">Dashboard Overview</h1>
                    <p className="text-gray-400 text-sm">Track Your learning progress and activities</p>
                </div>
                <div className="flex gap-2">
                    <FaRegCalendarAlt size={20} />
                    <p className="font-semibold">{formattedDate}</p>
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                <div className="bg-white rounded-xl p-4 shadow border">
                    <p className="text-sm text-gray-500">My Classes</p>
                    <h2 className="text-3xl font-bold mt-2">6</h2>
                    <p className="text-sm text-gray-400 mt-1">Active Classes</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow border">
                    <p className="text-sm text-gray-500">Assignments</p>
                    <h2 className="text-3xl font-bold mt-2">4</h2>
                    <p className="text-sm text-gray-400 mt-1">Pending</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow border">
                    <p className="text-sm text-gray-500">Messages</p>
                    <h2 className="text-3xl font-bold mt-2">3</h2>
                    <p className="text-sm text-gray-400 mt-1">Unread</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow border">
                    <p className="text-sm text-gray-500">Progress</p>
                    <h2 className="text-3xl font-bold mt-2">78%</h2>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-green-500 h-2 rounded-full w-[78%]"></div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow w-87.5 h-62.5">
                    <DayPicker
                    mode="single"
                    classNames={{
                        day: "h-7 w-7 text-xs",
                        caption_label: "text-sm",
                        day_button: "h-7 w-11",
                        weekday: "text-xs",
                    }}
                    />
                </div>

                </div>
                
            </main>
            </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-5">

          {/* Trending Notes */}
          <div className="bg-white rounded-xl border shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Trending Notes</h2>
              <button className="text-blue-600 text-sm">View All</button>
            </div>

            <div className="space-y-4">
              {trandingNotes.map((note) => (
                <div key={note.title} className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <FaFilePdf className={`${note.textColor} text-xl`} />
                    <div>
                      <h3 className="font-medium text-sm">{note.title}</h3>
                      <p className="text-xs text-gray-500">{note.content}</p>
                    </div>
                  </div>
                  
                  <div className='flex items-center gap-3'>
                    <span className="text-green-600 text-xs">2.5K</span>
                    <AiFillLike className='text-green-500 cursor-pointer' />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scholarships */}
          <div className="bg-white rounded-xl border shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Latest Scholarships</h2>
              <button className="text-blue-600 text-sm">View All</button>
            </div>

            <div className="space-y-4">
              {Scholarships.map((item) => (
                <div
                  key={item.title}
                  className="flex justify-between items-center"
                >
                  <div className="flex gap-3 items-center">
                    {item.icon}
                    <div>
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      <p className="text-xs text-gray-500">
                        {item.content}
                      </p>
                    </div>
                  </div>

                  <button className="px-3 py-1 border cursor-pointer border-green-500 text-green-600 rounded-lg text-sm">
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Communities */}
          <div className="bg-white rounded-xl border shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">
                Student Communities
              </h2>
              <button className="text-blue-600 text-sm">View All</button>
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
                  className="flex justify-between items-center"
                >
                  <div className="flex gap-3 items-center">
                    <FaUsers className="text-blue-600 text-lg" />

                    <div>
                      <h3 className="font-medium text-sm">
                        {community}
                      </h3>
                      <p className="text-xs text-gray-500">
                        12.5K Members
                      </p>
                    </div>
                  </div>

                  <button className="px-4 py-1 border rounded-lg text-green-600 text-sm">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div> 

        {/* Footer */}
        <footer className="bg-white my-6">
        <div className='mx-auto relative'>
          <img src="/img/Join-bennar.png" alt="" className='m-auto' />
          <button className=' absolute top-5 right-35 px-5 py-3 w-72 h-12 rounded-xl bg-transparent cursor-pointer'></button>
        </div>
        </footer>
    </div>
  )
}

export default Home;