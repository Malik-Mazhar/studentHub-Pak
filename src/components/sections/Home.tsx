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
import Link from 'next/link';
import axios from 'axios';
import { setCurrentUserPosts, setPosts } from '@/src/store/postSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@/src/store/useSelecterhook';
import { handleLikesAndComments } from '@/src/services/ApiServices/handleLikesAndComments';
import { FaVideo, FaQuestionCircle, FaBookmark, } from "react-icons/fa";
import { setBookmarks } from '@/src/store/bookmarkSlice';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { logout } from '@/src/store/userDataSlice';

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
  const dispatch = useDispatch();
  const toDay = new Date();
  const PostData = useAppSelector((state) => state.postData.posts)
  const currentUserAllPosts = useAppSelector((state) => state.postData.currentUserPosts)
  const allBookmarksData = useAppSelector((state) => state.bookmarksData);
  const {data: session} = useSession()
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  console.log("PostData", PostData)

  const formattedDate = toDay.toLocaleDateString("en-Us", {
      weekday: "short",
      day: "numeric",
      month: "short"
  });

  const getAllPosts = async () => {
    try {
      setIsLoading(true);
      const [allPostsResponse, savedResponse, currentUserPostResponse] = await Promise.all([
        axios.get("/api/user/get/getallposts?sort=latest"),
        axios.get("/api/user/get/getSaved"),
        axios.get("/api/user/get/getCurrentUserAllPosts"),
    ]);

      dispatch(setPosts(allPostsResponse.data.data))
      dispatch(setBookmarks(savedResponse.data.data))
      dispatch(setCurrentUserPosts(currentUserPostResponse.data.data))

    } catch (error) {
      console.log("getAllPosts api Error please check the community page api :", error);

    } finally {
        setIsLoading(false);
    };
  };

  const postCounts = useMemo(() => {
    return currentUserAllPosts.reduce(
      (counts, post) => {
        if (post.postType === "question") {
          counts.question++;
        }

        if (post.postType === "video") {
          counts.video++;
        }

        return counts;
      },
      {
        question: 0,
        video: 0,
      }
    );
  }, [currentUserAllPosts]);

  useEffect(() => {
    getAllPosts();
  }, []);

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
                  
                  <CustomButton type='button' onClick={() => router.push("/community")} className='flex items-center justify-between w-full sm:w-auto h-12 whitespace-nowrap px-5 py-3 gap-3'>join Now-it's Free <ArrowRight size={18} /></CustomButton>
                  <CustomButton type='button' onClick={() => router.push("/notes")} className='flex items-center justify-between w-full sm:w-auto h-12 whitespace-nowrap px-5 py-3 gap-3 rounded border-2 border-gray-200 dark:border-gray-700 bg-transparent bg-none text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1E293B] shadow-none'>Explore Notes <BookOpen size={16}/></CustomButton>
                  
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

        <section className="max-w-7xl mx-auto border border-gray-200 dark:border-gray-700 bg-linear-to-b from-[#07347A] via-[#073F87] to-[#00549A] md:h-130 md:bg-white md:dark:bg-[#0F172A] overflow-scroll shadow rounded-xl mt-4">
              
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

                    {/* Header */}
                    <div className="md:flex justify-between items-center hidden p-3">
                      <div>
                        <h1 className="font-bold text-2xl text-gray-900 dark:text-white">
                          Dashboard Overview
                        </h1>

                        <p className="text-gray-400 text-sm mt-1">
                          Track your learning progress and activities
                        </p>
                      </div>

                      <div className="hidden sm:flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <FaRegCalendarAlt size={18} />
                        <p className="font-semibold text-sm">
                          {formattedDate}
                        </p>
                      </div>
                    </div>


                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3 sm:p-5">

                      {/* My Posts */}
                      <div className="min-w-0 bg-white dark:bg-[#111827] rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            My Posts
                          </p>

                          <FaFilePdf className="text-blue-500" />
                        </div>

                        <h2 className="text-2xl font-bold mt-3 text-gray-900 dark:text-white">
                          {currentUserAllPosts?.length}
                        </h2>

                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          Notes uploaded
                        </p>
                      </div>


                      {/* Saved Videos */}
                      <div className="min-w-0 bg-white dark:bg-[#111827] rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Saved Videos
                          </p>

                          <FaVideo className="text-red-500" />
                        </div>

                        <h2 className="text-2xl font-bold mt-3 text-gray-900 dark:text-white">
                          {postCounts.video}
                        </h2>

                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          Videos saved
                        </p>
                      </div>


                      {/* Questions */}
                      <div className="min-w-0 bg-white dark:bg-[#111827] rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Questions
                          </p>

                          <FaQuestionCircle className="text-purple-500" />
                        </div>

                        <h2 className="text-2xl font-bold mt-3 text-gray-900 dark:text-white">
                          {postCounts.question}
                        </h2>

                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          Questions asked
                        </p>
                      </div>


                      {/* Saved */}
                      <div className="min-w-0 bg-white dark:bg-[#111827] rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Saved Items
                          </p>

                          <FaBookmark className="text-green-500" />
                        </div>

                        <h2 className="text-2xl font-bold mt-3 text-gray-900 dark:text-white">
                          {allBookmarksData?.bookmarks.length}
                        </h2>

                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          Posts & resources
                        </p>
                      </div>

                    </div>


                    {/* Main Dashboard Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-3 sm:px-5 pb-5">


                      {/* Continue Learning */}
                      <div className="lg:col-span-1 bg-white dark:bg-[#111827] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">

                        <div className="flex justify-between items-center mb-5">
                          <div>
                            <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
                              Continue Learning
                            </h2>

                            <p className="text-xs text-gray-400 mt-1">
                              Pick up where you left off
                            </p>
                          </div>

                          <Link
                            href="/courses"
                            className="text-blue-600 dark:text-blue-400 text-sm shrink-0"
                          >
                            View All
                          </Link>
                        </div>


                        {/* Course */}
                        <div className="flex flex-col sm:flex-row gap-4">

                          <div className="w-full sm:w-32 h-20 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                            <FaBookOpen className="text-blue-500 text-2xl" />
                          </div>


                          <div className="flex-1 min-w-0">

                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                              Mathematics
                            </h3>

                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              Quadratic Equations
                            </p>


                            <div className="flex items-center gap-3 mt-3">

                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full w-[72%]" />
                              </div>

                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                72%
                              </span>

                            </div>


                            <button
                              className="mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              Continue Learning →
                            </button>

                          </div>

                        </div>

                      </div>


                      {/* Recent Activity */}
                      <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">

                        <div className="flex justify-between items-center mb-5">

                          <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
                            Recent Activity
                          </h2>

                          <Link
                            href="/activity"
                            className="text-blue-600 dark:text-blue-400 text-sm"
                          >
                            View All
                          </Link>

                        </div>


                        <div className="space-y-5">

                          {/* Activity 1 */}
                          <div className="flex gap-3">

                            <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                              <FaFilePdf className="text-blue-500 text-sm" />
                            </div>

                            <div className="min-w-0">
                              <p className="text-sm text-gray-800 dark:text-gray-200 truncate">
                                Viewed Physics Notes
                              </p>

                              <p className="text-xs text-gray-400 mt-1">
                                10 minutes ago
                              </p>
                            </div>

                          </div>


                          {/* Activity 2 */}
                          <div className="flex gap-3">

                            <div className="w-9 h-9 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0">
                              <AiFillLike className="text-red-500 text-sm" />
                            </div>

                            <div className="min-w-0">
                              <p className="text-sm text-gray-800 dark:text-gray-200 truncate">
                                Liked a post
                              </p>

                              <p className="text-xs text-gray-400 mt-1">
                                1 hour ago
                              </p>
                            </div>

                          </div>


                          {/* Activity 3 */}
                          <div className="flex gap-3">

                            <div className="w-9 h-9 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
                              <FaQuestionCircle className="text-purple-500 text-sm" />
                            </div>

                            <div className="min-w-0">
                              <p className="text-sm text-gray-800 dark:text-gray-200 truncate">
                                Answered a question
                              </p>

                              <p className="text-xs text-gray-400 mt-1">
                                2 hours ago
                              </p>
                            </div>

                          </div>


                          {/* Activity 4 */}
                          <div className="flex gap-3">

                            <div className="w-9 h-9 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0">
                              <FaBookmark className="text-green-500 text-sm" />
                            </div>

                            <div className="min-w-0">
                              <p className="text-sm text-gray-800 dark:text-gray-200 truncate">
                                Saved a resource
                              </p>

                              <p className="text-xs text-gray-400 mt-1">
                                Yesterday
                              </p>
                            </div>

                          </div>

                        </div>

                      </div>


                      {/* Recent / Pending Items */}
                      <div className="lg:col-span-3 bg-white dark:bg-[#111827] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">

                        <div className="flex justify-between items-center mb-5">

                          <div>
                            <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
                              Your Recent Items
                            </h2>

                            <p className="text-xs text-gray-400 mt-1">
                              Recently added and saved content
                            </p>
                          </div>

                          <Link
                            href="/notes"
                            className="text-blue-600 dark:text-blue-400 text-sm"
                          >
                            View All
                          </Link>

                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

                          {/* Item 1 */}
                          <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700">

                            <FaFilePdf className="text-blue-500 text-xl shrink-0" />

                            <div className="min-w-0">
                              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                                Physics Chapter 4 Notes
                              </h3>

                              <p className="text-xs text-gray-400 mt-1">
                                Added recently
                              </p>
                            </div>

                          </div>


                          {/* Item 2 */}
                          <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700">

                            <FaVideo className="text-red-500 text-xl shrink-0" />

                            <div className="min-w-0">
                              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                                JavaScript Fundamentals
                              </h3>

                              <p className="text-xs text-gray-400 mt-1">
                                Saved recently
                              </p>
                            </div>

                          </div>


                          {/* Item 3 */}
                          <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700">

                            <FaQuestionCircle className="text-purple-500 text-xl shrink-0" />

                            <div className="min-w-0">
                              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                                React State Management
                              </h3>

                              <p className="text-xs text-gray-400 mt-1">
                                Question
                              </p>
                            </div>

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
            <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 sm:p-5">

              <div className="flex justify-between items-center gap-3 mb-4">
                <h2 className="font-semibold text-lg text-gray-900 dark:text-[#FBFCFE]">
                  Trending Notes
                </h2>

                <Link href="/notes/viewAllnotes" className="cursor-pointer text-blue-600 dark:text-blue-400 text-sm shrink-0">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {PostData.filter((post) => post.postType === "notes").slice(0, 5).map((note, index) => (
                  <div
                    key={note.title}
                    className="flex justify-between items-center gap-3"
                  >

                    <div className="flex gap-3 min-w-0">
                      <FaFilePdf
                        className={`${
                          index === 0? "text-red-500" : 
                          index === 1 ? "text-blue-500" :
                          index === 2 ? "text-[#028569]" :
                          index === 3 ? "text-orange-500" : ""
                        } text-xl shrink-0`}
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

                    <button onClick={() => handleLikesAndComments({dispatch, postId: note._id})} className="flex items-center gap-2 sm:gap-3 shrink-0">
                      <span className="text-green-600 dark:text-green-400 text-xs">
                        {note?.postLikesCount}
                      </span>

                      <AiFillLike className={`${note.postLikesCount? "text-green-500" : ""} cursor-pointer`} />
                    </button>

                  </div>
                ))}
              </div>
            </div>


            {/* Scholarships */}
            <div className=" bg-white dark:bg-[#111827] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 sm:p-5" >

              <div className="flex justify-between items-center gap-3 mb-4">

                <h2 className="font-semibold text-lg text-gray-900 dark:text-[#FBFCFE]">
                  Latest Scholarships
                </h2>

                <Link href="/jobs" className="text-blue-600 dark:text-blue-400 text-sm shrink-0">
                  View All
                </Link>
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
            <div className=" bg-white dark:bg-[#111827] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 sm:p-5">

              <div className="flex justify-between items-center gap-3 mb-4">

                <h2 className="font-semibold text-lg text-gray-900 dark:text-[#FBFCFE]">
                  Student Communities
                </h2>

                <Link href="/community" className="text-blue-600 dark:text-blue-400 text-sm shrink-0">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {PostData.slice(0, 4).map((community) => (
                  <div
                    key={community._id}
                    className="flex justify-between items-center gap-3"
                  >

                    <div className="flex gap-3 items-center min-w-0">
                      <FaUsers className="text-blue-600 dark:text-blue-400 text-lg shrink-0" />

                      <div className="min-w-0">
                        <h3 className="font-medium text-sm text-gray-800 dark:text-gray-200 truncate">
                          {community.title}
                        </h3>

                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {community?.postLikesCount} Likes
                        </p>
                      </div>
                    </div>

                    <Link href="/community" className=" px-4 py-1 border border-gray-200 dark:border-gray-600 rounded-lg text-green-600 dark:text-green-400 text-sm shrink-0 hover:bg-green-50 dark:hover:bg-green-900/20 transition">
                      Explore
                    </Link>

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
              className="block w-full h-auto object-cover "
            />

            {/* Button */}
            <button
              className="absolute top-1/2 right-[8%] -translate-y-1/2 w-32 h-9 sm:w-48 sm:h-11 lg:w-72 lg:h-12 rounded-xl bg-transparent cursor-pointer "
              aria-label="Join Student Hub"
            />

          </div>
        </footer>


    </div>
  )
}

export default Home;
