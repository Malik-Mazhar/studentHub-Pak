"use client"
import CustomButton from "@/src/components/shared/CustomButton"
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaRegComment, FaShare, FaBookmark, FaEllipsisH, FaEdit} from "react-icons/fa";
import Comment from "@/src/components/sections/Comment";
import { useAppSelector } from "@/src/store/useSelecterhook";
import { useDispatch } from "react-redux";
import { Flag, Link2, Pencil, Share2, ThumbsUp, Trash2 } from "lucide-react";
import { setPosts, toggleLikePost, toggleBookmark } from "@/src/store/postSlice";
import { toast } from "sonner";
import { handleBookMark } from "@/src/services/ApiServices/handleBookMark";
import { ApiResponse } from "@/src/lib/apiResponse";
import { useSession } from "next-auth/react";
import { removePost } from "@/src/services/ApiServices/removePost"
import { sharePost } from "@/src/services/ApiServices/Share";
import { copyLink } from "@/src/services/ApiServices/copyLink";

export default function CommunityCenter() {
  const [showComment, setShowComment] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);
  const [openPostId, setOpenPostId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const PostData = useAppSelector((state) => state.postData.posts)
  console.log("PostData", PostData)

  const getAllPosts = async () => {
    try {
      const response = await axios.get("/api/user/get/getallposts?sort=latest");

      dispatch(setPosts(response.data.data))

    } catch (error) {
      console.log("getAllPosts api Error please check the community page api :", error);

    }
  };

    const getPopularPosts = async () => {
    try {
      const response = await axios.get("/api/user/get/getallposts?sort=popular");
      dispatch(setPosts(response.data.data))

    } catch (error) {
      console.log("getAllPosts api Error please check the community page api :", error);

    }
  };

  const getYoutubeVideoId = (url: string) => {
    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname === "youtu.be") {
        return parsedUrl.pathname.slice(1);
      }

      if (parsedUrl.hostname.includes("youtube.com")) {
        return parsedUrl.searchParams.get("v");
      }

      return null;
    } catch {
      return null;
    }
  };
  // const videoId = getYoutubeVideoId(videoLink);



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenPostId(null);
      }
    };
      getAllPosts();

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleLike = async (postId: string) => {
    try {
        const formData = new FormData();

          formData.append("postId", postId);
              
          const response = await axios.post("/api/user/post/comment/like", formData);
          console.log("response", response.data.data)

          dispatch(toggleLikePost({postId, ...response.data.data}))

    } catch (error) {
        console.log(error);
    }
  };

  const handleBookMarksPost = async (postId: string) => {
     try {

      const response = await axios.post(`/api/user/post/bookmark?postId=${postId}`);
      dispatch(toggleBookmark(response.data.data))

      toast("post saved successfully!", {
          position: "top-right",        
          description: <span className="text-black">{ response.data?.message }</span>,
      });

     } catch (error) {
      console.log("Bookmarks Error check community page", error);

      const AxiosError = error as AxiosError<ApiResponse>;
      const message = AxiosError.response?.data?.message || "Something went wrong";

      toast("Video not found!", {
          position: "bottom-right",
          description: <span className="text-black">{ message }</span>,
      });
     };
  };

  return (

    <div className="flex min-h-screen pt-20 sm:pt-10 bg-[#FBFCFE] text-gray-900 dark:bg-[#0F172A] dark:text-gray-100">

      <div className="flex-1 px-3 sm:px-4 md:px-6 py-4 sm:py-6">

          {/* Tabs */}

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 my-4 sm:my-6">

            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1">

                <button onClick={() => getAllPosts()} className="shrink-0 px-4 sm:px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition">
                  All
                </button>

                <button className="shrink-0 px-4 sm:px-5 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700 cursor-pointer transition">
                  Following
                </button>

                <button onClick={() => getPopularPosts()} className="shrink-0 px-4 sm:px-5 py-2 rounded-full hover:bg-gray-200  dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700 cursor-pointer transition">
                  Popular
                </button>

            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">

              <select 
                  onChange={(e) =>
                    e.target.value === "popular"
                      ? getPopularPosts()
                      : getAllPosts()
                  }
                className="flex-1 sm:flex-none border border-gray-300 rounded-lg px-3 sm:px-4 py-2 bg-white text-gray-700 dark:bg-slate-800 dark:text-gray-200 dark:border-slate-700 cursor-pointer outline-none">
                <option value="latest">Latest</option>
                <option value="popular">Popular</option>
              </select>

              <Link href="/createPost">        
                  <CustomButton className="flex items-center py-2 px-3 sm:px-5 gap-x-2 sm:gap-x-3 whitespace-nowrap"><FaEdit size={18} /> post</CustomButton>
              </Link> 

            </div>

          </div>

          {/* Posts */}

          <div className="space-y-4 sm:space-y-6">

            {PostData && PostData.filter((post) => post && !post.postDocumentUrl && post.postType !== "playlist").map((post) => (
              <div
                key={post?._id}
                className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 transition-colors">
                {/* Header */}

                <div className="flex justify-between items-start gap-3">

                  <div className="flex gap-2 sm:gap-3 min-w-0">

                    <img
                      src={ post?.author?.userProfile?.profileImgUrl || "/img/defaultProfile.jfif" }
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shrink-0"
                    />

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="font-semibold truncate max-w-45 sm:max-w-none">{post?.author?.userProfile?.profileName}</h3>

                          <span className="text-[10px] sm:text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
                            Top Contributor
                          </span>

                      </div>

                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>

                    </div>

                  </div>

                  <div className="relative" ref={menuRef}>

                    <button
                      onClick={() => setOpenPostId(post._id)}
                      className="text-gray-500 dark:text-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1E293B] hover:text-gray-800 dark:hover:text-white shrink-0 transition"
                    >
                      <FaEllipsisH />
                    </button>

                    {openPostId === post._id && (
                      <div className="absolute right-0 top-8 w-52 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#101827] shadow-xl z-50 overflow-hidden">

                        {post.author._id === session?.user._id && (
                          <>
                            <Link
                              href={`/edit-post/${post._id}`}
                              onClick={() => setOpenPostId(null)}
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1E293B] transition"
                            >
                              <Pencil size={18} />
                              Edit Note
                            </Link>

                            <button
                              onClick={() => {
                                removePost({postId:post._id, dispatch});
                                setOpenPostId(null);
                              }}
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition cursor-pointer"
                            >
                              <Trash2 size={18} />
                              Delete Note
                            </button>

                            <hr className="border-gray-200 dark:border-gray-700" />
                          </>
                        )}

                        <button
                          onClick={() => {
                            copyLink({
                              pagePath: "/community",
                              postId: post._id,
                            });
                            setOpenPostId(null);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-3 cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1E293B] transition"
                        >
                          <Link2 size={18} />
                          Copy Link
                        </button>

                        <button
                          onClick={() => {
                            sharePost({
                              pagePath: "/community",
                              postId: post._id,
                            });
                            setOpenPostId(null);
                          }}
                          className="flex w-full items-center gap-3 cursor-pointer px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1E293B] transition"
                        >
                          <Share2 size={18} />
                          Share
                        </button>

                        {post.author._id !== session?.user._id && (
                          <button
                            onClick={() => setOpenPostId(null)}
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition cursor-pointer"
                          >
                            <Flag size={18} />
                            Report
                          </button>
                        )}

                      </div>
                    )}

                  </div>

                </div>

                {/* Content */}

                <p className="my-3 sm:my-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-6 sm:leading-7 wrap-break-words">{post?.content}</p>

                {/* Image */}

                <div className="relative">

                  {Array.isArray(post.postImageUrl) && post.postImageUrl.length > 0  &&
                    <img
                      src={ post?.postImageUrl?.[0]}
                      className="rounded-lg sm:rounded-xl w-full h-auto max-h-125 object-cover"
                    />
                  }

                  {post.postType === "video" && post.videoLink && (
                      <iframe
                        className="w-full aspect-video rounded-lg sm:rounded-xl"
                        src={`https://www.youtube.com/embed/${getYoutubeVideoId(
                          post.videoLink
                        )}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        title={post.title}
                        allowFullScreen
                      />
                  )}

                  {post.postType === "video" && post.postVideoUrl && (
                      <video
                        className="w-full aspect-video rounded-lg sm:rounded-xl object-cover"
                        src={post.postVideoUrl}
                        controls
                        preload="metadata"
                        playsInline
                      >
                        Your browser does not support the video tag.
                      </video>
                  )}


                </div>

                {/* Tags */}

                <div className="flex flex-wrap gap-x-3 gap-y-2 text-blue-600 dark:text-blue-400 text-xs sm:text-sm mt-4">
                  {post?.tags && post?.tags.map((tag: string, index: number) => (
                    <span key={index}> #{tag} </span>
                  ))}

                </div>

                {/* Footer */}

                <div className="flex justify-between mt-5 sm:mt-6 border-t border-gray-200 dark:border-slate-800 pt-3 sm:pt-4">

                  <div className="flex gap-4 sm:gap-8">

                    <button
                        onClick={() => {
                          handleLike(post?._id)
                        }}
                        className="flex items-center gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer">

                      <ThumbsUp size={18} className={`${post?.postLikesCount? "text-blue-500" : ""}`} />
                      {post?.postLikesCount}
                    </button>

                    <button 
                        onClick={() => {
                          setShowComment((prev) => !prev);
                          setPostId(post._id)
                        }} 
                        className="flex items-center gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer">

                      <FaRegComment />

                      <span className="text-sm">
                        {post?.commentsCount}
                      </span>
                    </button>

                    <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer">
                      <FaShare />
                    </button>

                  </div>

                    <button onClick={() => handleBookMarksPost(post._id)} className={`flex items-center gap-1.5 sm:gap-2 ${post?.isBookmarked? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"} cursor-pointer gap-2 `}>
                      <FaBookmark /> 

                        <span className="text-sm">
                          {post?.bookmarkCount}
                        </span>

                    </button>
                </div>

              </div>
            ))}

          </div>

      </div>

        {showComment && postId && 
          <Comment setShowComment={setShowComment} postId= {postId} />
        }
    </div>
    
  );
}