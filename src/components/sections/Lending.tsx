import CustomButton from '@/src/components/shared/CustomButton'
import { ArrowRight, BookOpen, Briefcase, FileText, GraduationCap, PlayCircle, Users } from 'lucide-react'
import { FaBookOpen } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { MdVideoLibrary } from "react-icons/md";
import { IoSchoolSharp, IoBriefcaseSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
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
  return (
    <div className="min-h-screen bg-[#FCFDFD] text-gray-800">

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
       
      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pt-10 grid md:grid-cols-3 lg:grid-cols-6 gap-5">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-6 text-center shadow-sm hover:shadow-lg transition"
          >
            <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mx-auto`}>
              {item.icon}
            </div>

            <h3 className="font-semibold mt-4">{item.title}</h3>

            <p className="text-sm text-gray-500 mt-2">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="bg-linear-to-b from-[#011E43] to-[#001D41] text-white rounded-xl p-6 grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((item, index) => (
            <div key={index} className='flex items-start justify-center gap-4'>
              <div>

                {item.icon}
              </div>
             <div>
              <h2 className="text-xl leading-2  font-bold">{item.number}</h2>
              <p className="text-gray-300 mt-2">{item.label}</p>
             </div>
            </div>
          ))}
        </div>
      </section>

      {/* cards */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className='text-xl font-bold pb-3'>What you'll Find on <span className='text-[#017D63]'>Student Hub Pakistan</span></h2>
        <div className="grid lg:grid-cols-4 gap-3">

          {/* Student Post */}
          <div className="bg-white rounded-2xl shadow-md p-4">
            
            {/* Top Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-bold text-md">Student Posts</h2>

                <div className="flex items-center gap-3 mt-3">
                  <img
                    src="https://i.pravatar.cc/100"
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm leading-3">
                      Fatima Noor
                    </h3>

                    <p className="text-sm text-gray-500">
                      2 hours ago
                    </p>
                  </div>
                </div>
              </div>

              <button className="text-gray-500 text-xl">
                <BsThreeDots />
              </button>
            </div>

            {/* Post Text */}
            <div className="mt-3">
              <p className="text-gray-900 font-semibold text-xs">
                Just completed my Physics practical!
              </p>

              <p className="text-gray-900 font-semibold text-xs">
                Here's a short video on Ohm's law.
              </p>
            </div>

            {/* Video Thumbnail */}
            <div className="relative mt-4">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                alt="post"
                className="w-full h-40 object-cover rounded-xl"
              />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-12 border-t-transparent border-b-12 border-b-transparent border-l-18 border-l-white ml-1"></div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between mt-5 text-gray-600">
              
              {/* Like */}
              <button className="flex items-center gap-2 hover:text-blue-600 transition">
                <AiFillLike className="text-md" />
                <span className='font-semibold text-xs'>124</span>
              </button>

              {/* Comment */}
              <button className="flex items-center gap-2 hover:text-green-600 transition">
                <FaRegCommentDots className="text-md" />
                <span className='font-semibold text-xs'>29</span>
              </button>

              {/* Share */}
              <button className="flex items-center gap-2 hover:text-orange-600 transition">
                <FaShare className='text-md' />
                <span className='font-semibold text-xs'>2</span>
              </button>

              {/* Save */}
              <button className="hover:text-red-500 transition">
                <FaRegBookmark className="text-md" />
              </button>
            </div>
          </div>

          {/* Notes Preview */}
          <div className="bg-white rounded-2xl shadow-md p-4">
            
            {/* Top Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-bold text-md">Notes Perview</h2>

                <div className="flex items-center gap-3 mt-3">
                  <img
                    src="https://i.pravatar.cc/100"
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm leading-3">
                      Usman Alli
                    </h3>

                    <p className="text-sm text-gray-500">
                      2 hours ago
                    </p>
                  </div>
                </div>
              </div>

              <button className="text-gray-500 text-xl">
                <BsThreeDots />
              </button>
            </div>

            {/* Post Text */}
            <div className="mt-3">
              <p className="text-gray-900 font-semibold text-xs">
                Physics chapter 8 Notes
              </p>

              <p className="text-gray-400 font-semibold text-xs">
                12 pages
              </p>
            </div>

            {/* Video Thumbnail */}
            <div className="relative mt-4">
              <img
                src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop"
                alt="post"
                className="w-full h-40 object-cover rounded-xl"
              />
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between mt-5 text-gray-600">
              
              {/* Like */}
              <button className="flex items-center gap-2 hover:text-blue-600 transition">
                <FaEye className="text-md" />
                <span className='font-semibold text-xs'>1.2k views</span>
              </button>
            </div>
          </div>

          {/* Video Lecture */}
          <div className="bg-white rounded-2xl shadow-md p-4">
            
            {/* Top Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-bold text-md">Video Lectures</h2>

                <div className="flex items-center gap-3 mt-3">
                  <img
                    src="https://i.pravatar.cc/100"
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm leading-3">
                      Dr. Alli khan
                    </h3>
                  </div>
                </div>
              </div>

              <button className="text-gray-500 text-xl">
                <BsThreeDots />
              </button>
            </div>

            {/* Post Text */}
            <div className="mt-3">
              <p className="text-gray-900 font-semibold text-xs">
                Calculas- Camplete Course
              </p>

              <p className="text-gray-400 font-semibold text-xs">
                Dr.Ali khan
              </p>
            </div>

            {/* Video Thumbnail */}
            <div className="relative mt-4">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop"
                alt="post"
                className="w-full h-40 object-cover rounded-xl"
              />
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between mt-5 text-gray-600">
              
              {/* Like */}
              <button className="flex items-center gap-2 hover:text-blue-600 transition">
                <FaEye className="text-md" />
                <span className='font-semibold text-xs'>1.2k views</span>
              </button>
            </div>
          </div>

          {/* Community */}
          <div className="bg-white rounded-3xl p-5 shadow-sm">
            <h3 className="font-bold text-md">
              Popular Community
            </h3>

            <div className="mt-3 flex items-center gap-4">
              <PiStudentFill size={28}/>

              <div>
                <h4 className="text-sm font-semibold">
                  FSC Pre-Engineering
                </h4>

                <p className="text-sm text-gray-500">
                  8.7K Members
                </p>
              </div>
            </div>

            <div className="relative my-3">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                alt="post"
                className="w-full h-40 object-cover rounded-xl"
              />
            </div>

            <button className="bg-white text-gray-700 w-full py-2 rounded-md font-bold cursor-pointer border shadow-lg duration-300 hover:scale-105">
              Join Community
            </button>
          </div>
        </div>
      </section>

       {/* CTA */}
       <section className="max-w-7xl mx-auto px-6 pb-16">
         <div className="bg-linear-to-r from-green-500 to-blue-600 rounded-[25px] flex items-center justify-around">
           <div className='flex items-center gap-x-5'>
            <div className='relative h-25 w-25'>              
                <Image 
                  src="/img/studen.png"
                  alt='img'
                  fill
                />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Join Student Hub Pakistan Today!
              </h2>

              <p className="text-white/80 mt-3">
                Be part of Pakistan’s biggest student community.
              </p>
            </div>

           </div>

           <button className="bg-white text-green-700 px-8 py-3 rounded-xl font-bold mt-6 md:mt-0 cursor-pointer flex items-center justify-between gap-3">
             Sign Up Now - 's Free <ArrowRight size={17}/>
           </button>
         </div>
       </section>

        {/* Footer */}
        <footer className="bg-white border-t mt-10">
          
          <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-10">
            
            {/* Logo */}
            <div>
              <div className="flex items-center gap-3">
                
                <div className="relative w-18 h-18 rounded-xl overflow-hidden">
                  
                  <Image
                    src="/img/Logoo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />

                </div>
                

                <div>
                  <h2 className="text-2xl font-bold text-blue-900">
                    Student Hub
                  </h2>

                  <p className="text-green-600 font-semibold">
                    Pakistan
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className='flex justify-around items-center'>
              <div>
                <h3 className="font-bold text-lg mb-3">
                  Quick Links
                </h3>

                <ul className="space-y-1 font-sm font-semibold text-gray-800">
                  <li className="hover:text-green-600 cursor-pointer">Home</li>
                  <li className="hover:text-green-600 cursor-pointer">Notes</li>
                  <li className="hover:text-green-600 cursor-pointer">Communities</li>
                  <li className="hover:text-green-600 cursor-pointer">Scholarships</li>
                </ul>
              </div>
              {/* <div>
                        <ul className="space-y-3 text-gray-600">
                  <li className="hover:text-green-600 cursor-pointer">Jobs</li>
                  <li className="hover:text-green-600 cursor-pointer">Features</li>
                  <li className="hover:text-green-600 cursor-pointer">About Us</li>
                  <li className="hover:text-green-600 cursor-pointer">Contect</li>
                </ul>
              </div> */}
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold text-lg mb-3">
                Support
              </h3>

              <ul className="space-y-1 font-sm font-semibold text-gray-800">
                <li className="hover:text-green-600  cursor-pointer">Help Center</li>
                <li className="hover:text-green-600 cursor-pointer">Terms & Conditions</li>
                <li className="hover:text-green-600 cursor-pointer">Privacy Policy</li>
                <li className="hover:text-green-600 cursor-pointer">Contact Us</li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-bold text-lg mb-3">
                Follow Us
              </h3>

              <div className="flex items-center gap-4">
                
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <FaFacebook size={26} className='text-blue-600'/>
                </div>

                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <FaInstagramSquare size={26} className='text-[#FF0C3A]' />
                </div>

                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <IoLogoLinkedin size={26} className='text-blue-600' />
                </div>

              </div>
            </div>

          </div>

          {/* Bottom */}
          <div className="border-t">
            
            <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between gap-4">
              
              <p className="text-sm text-gray-500">
                © 2024 Student Hub Pakistan. All rights reserved.
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                
                <span>🇵🇰</span>

                <span>Pakistan (English)</span>

              </div>

            </div>

          </div>

        </footer>
    </div>
  )
}

export default page