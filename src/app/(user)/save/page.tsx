"use client";

import { useAppDispatch, useAppSelector } from "@/src/store/useSelecterhook";
import axios from "axios";
import { useEffect, useState } from "react";
import { setBookmarks } from "@/src/store/bookmarkSlice";
import { FaEllipsisH } from "react-icons/fa";
import { FaBookmark, FaRegComment, FaShare } from "react-icons/fa6";
import { ArrowBigLeft, ArrowBigLeftIcon, Loader2, ThumbsUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import PlaylistCard from "@/src/components/shared/playlist/PlaylistCard";
import { useRouter } from "next/navigation";
import { handleLikesAndComments } from "@/src/services/ApiServices/handleLikesAndComments";
import { handleBookMark } from "@/src/services/ApiServices/handleBookMark";
import { setPosts, toggleLikePost } from "@/src/store/postSlice";
import { LoadingSpinner } from "@/src/app/loading";
import { addToHistory } from "@/src/services/ApiServices/addToHistory";

export default function SavedPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [viewPost, setViewPost] = useState<null | string>(null);
  const allBookmarksData = useAppSelector((state) => state.bookmarksData);
  const PostData = useAppSelector((state) => state.postData.posts)
  const [selectBookMarksPost, setSelectBookMarksPost] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
    
  const getAllBookmarks = async () => {
    try {
      setLoading(true);
      setApiError("");
      const response = await axios.get("/api/user/get/getSaved");

      dispatch(setBookmarks(response.data.data))

    } catch (error: any) {
      console.log("getAllPosts api Error please check the community page api :", error);
      
      setApiError(
        error?.response?.data?.message ||
          "Failed to fetch your posts."
      );
    } finally {
        setLoading(false);
    };
  };
  

  const findViewPostId = PostData.find((postId) => postId._id.toString() === viewPost)


  const bookMarksTypes = ["All", "Images", "Videos", "Notes", "File", "Playlists"];

  const filteredBookmarks = allBookmarksData.bookmarks.filter((post) => {

    switch (selectBookMarksPost) {
      case "Images":
        return (
          post.postType === "discussion" &&
          (post.postImageUrl?.length ?? 0) > 0
        );

        case "Videos":
          return (
            post.postType === "video" &&
            !!post.postVideoUrl
          );

        case "Playlists":
          return post.postType === "playlist";

        case "Notes":
          return post.postType === "notes";

        default:
          return true; // All
    }
  }); 

  const getAllPosts = async () => {
      try {
        const response = await axios.get("/api/user/get/getallposts?sort=latest");

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


  useEffect(() => {
    getAllBookmarks();
    getAllPosts();
    addToHistory("save Post")
  }, []);

  useEffect(() => {
    if (viewPost) {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    }
  }, [viewPost]);

  if (loading) {
     return <LoadingSpinner />
  }


  return (
    <main className="flex-1 min-w-0 p-3 pt-28 md:pt-18 sm:p-4 md:p-6 bg-gray-50 dark:bg-[#0b1120]">

      {/* Heading */}
      <div className="bg-white dark:bg-[#101827] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 sm:p-5 md:p-6">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Saved Items
            </h1>

            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">
              All the content you've saved for quick access.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search saved..."
            className="w-full lg:w-80 min-w-0 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-[#101827] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-2.5 sm:py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Filters */}
        <div className="flex gap-2 sm:gap-3 mt-5 sm:mt-6 overflow-x-auto pb-1 scrollbar-hide">

          {bookMarksTypes.map((type, index) => (

            <button
              key={index}
              onClick={() => setSelectBookMarksPost(type)}
              className={`
                shrink-0 px-4 sm:px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 cursor-pointer text-sm sm:text-base transition-colors
                ${(selectBookMarksPost === type) || (selectBookMarksPost === null && index === 0) ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-[#101827] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E293B]"}
              `}
            >
              {type}
            </button>

          ))}

        </div>
      </div>

      {/* Cards */}
      {!viewPost && selectBookMarksPost !== "Playlists" &&
        <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">

          {/* Image */}

          {filteredBookmarks.length > 0 ?

            filteredBookmarks.map((post) => (

              <div key={post._id} className="bg-white dark:bg-[#101827] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-3 sm:p-4 md:p-5 flex flex-col md:flex-row gap-4 sm:gap-5">

                {Array.isArray(post.postImageUrl) && post.postImageUrl.length > 0 &&
                  <img
                    src={post?.postImageUrl?.[0]}
                    className="rounded-xl w-full md:w-60 h-48 sm:h-56 md:h-40 object-cover shrink-0"
                  />
                }

                {post.postType === "playlist" && (
                  <img
                    src={post?.thumbnail}
                    alt={post?.title || "Video thumbnail"}
                    title=""
                    className="rounded-xl w-full md:w-60 h-48 sm:h-56 md:h-40 object-cover shrink-0"
                  />
                )}

                {post.postVideoUrl && (
                  <div className="relative w-full md:w-60 h-48 sm:h-56 md:h-40 shrink-0">

                    <video
                      src={post.postVideoUrl}
                      className="rounded-xl w-full h-full object-cover"
                      preload="metadata"
                    />

                    {/* Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/60 rounded-full p-3">
                        ▶
                      </div>
                    </div>

                  </div>
                )}

                <div className="flex-1 min-w-0">

                  <span className="inline-block bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-xs px-3 py-1 rounded-full">
                    {post.postType.charAt(0).toUpperCase() + post.postType.slice(1)}
                  </span>

                  <h2 className="text-xl sm:text-2xl font-semibold mt-3 text-gray-900 dark:text-white wrap-break-words">
                    {post.title}
                  </h2>

                  <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">
                    Posted {post.author.userProfile?.profileName} •
                    {post.createdAt && formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </p>

                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-3 line-clamp-3">
                    {post.content}
                  </p>

                  <div className="flex gap-2 mt-4">

                    <button
                      onClick={() => post.postType === "playlist" ? router.push(`/courses/${post._id}`) : setViewPost(post._id)}
                      className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#101827] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E293B] rounded-lg px-4 py-2 cursor-pointer text-sm sm:text-base transition-colors"
                    >
                      View
                    </button>

                  </div>

                </div>

              </div>

            ))

            :

            <div className="flex items-center justify-center py-12 sm:py-16">
              <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg text-center">
                No {selectBookMarksPost?.toLowerCase()} found.
              </p>
            </div>

          }

        </div>
      }


      {viewPost && findViewPostId &&
        <div className="mt-4 sm:mt-5">

          <button
            onClick={() => setViewPost(null)}
            className="flex items-center gap-x-2 sm:gap-x-3 md:gap-x-5 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-[#1E293B] text-white font-semibold bg-linear-to-r from-[#017D63] to-[#0aa382] cursor-pointer px-4 sm:px-6 md:px-7 py-1.5 sm:py-2 text-sm sm:text-base"
          >
            <ArrowBigLeft size={18} />
            Back to all saved posts
          </button>

          <div
            key={findViewPostId?._id}
            className="bg-white dark:bg-[#101827] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-5 md:p-6 mt-4 sm:mt-5"
          >

            {/* Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

              <div className="flex gap-3 min-w-0">

                <img
                  src={findViewPostId?.author?.userProfile?.profileImgUrl || "/img/defaultProfile.jfif"}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shrink-0 object-cover"
                />

                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white wrap-break-words">
                      {findViewPostId?.author?.userProfile?.profileName}
                    </h3>

                    <span className="text-xs bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 px-2 py-1 rounded-full whitespace-nowrap">
                      Top Contributor
                    </span>

                  </div>

                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </p>

                </div>

              </div>

              <div className="flex items-center justify-between sm:justify-end gap-x-3 sm:gap-x-5">

                <button
                  onClick={() => setViewPost(null)}
                  className="border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1E293B] cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-red-500 dark:text-red-400"
                >
                  Hidden
                </button>

                <FaEllipsisH className="text-gray-600 dark:text-gray-300" />

              </div>

            </div>

            {/* Content */}

            <p className="my-3 sm:my-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-6 sm:leading-7 wrap-break-words">
              {findViewPostId?.content}
            </p>

            {/* Image */}

            <div className="relative w-full min-w-0">

              {Array.isArray(findViewPostId.postImageUrl) && findViewPostId.postImageUrl.length > 0 &&
                <img
                  src={findViewPostId?.postImageUrl?.[0]}
                  className="rounded-xl w-full h-auto max-h-95 object-cover"
                />
              }

              {findViewPostId.postType === "video" && findViewPostId.videoLink && (
                <iframe
                  className="w-full aspect-video rounded-xl"
                  src={`https://www.youtube.com/embed/${getYoutubeVideoId(
                    findViewPostId.videoLink
                  )}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title={findViewPostId.title}
                  allowFullScreen
                />
              )}

              {findViewPostId.postType === "video" && findViewPostId.postVideoUrl && (
                <video
                  className="w-full aspect-video rounded-xl object-cover"
                  src={findViewPostId.postVideoUrl}
                  controls
                  preload="metadata"
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              )}

            </div>

            {/* Tags */}

            <div className="flex flex-wrap gap-2 sm:gap-3 text-blue-600 dark:text-blue-400 text-xs sm:text-sm mt-3 sm:mt-4">

              {findViewPostId?.tags &&
                findViewPostId?.tags.map((tag: string, index: number) => (
                  <span key={index}>
                    #{tag}
                  </span>
                ))}

            </div>

            {/* Footer */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-5 sm:mt-6 border-t border-gray-200 dark:border-gray-700 pt-3 sm:pt-4">

              <div className="flex items-center gap-5 sm:gap-8">

                <button
                  onClick={() => {
                    handleLikesAndComments({
                      dispatch,
                      postId: findViewPostId?._id
                    })
                  }}
                  className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300"
                >
                  <ThumbsUp
                    size={18}
                    className={`${findViewPostId?.postLikesCount ? "text-blue-500" : ""}`}
                  />
                  {findViewPostId?.postLikesCount}
                </button>

                <button
                  className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300"
                >
                  <FaRegComment />
                  {findViewPostId?.commentsCount}
                </button>

                <button className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <FaShare />
                </button>

              </div>

              <button
                onClick={() =>
                  handleBookMark({
                    dispatch,
                    postId: findViewPostId._id
                  })
                }
                className={`flex items-center gap-2 cursor-pointer ${findViewPostId?.isBookmarked ? "text-blue-800 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"}`}
              >
                <FaBookmark />
                {findViewPostId?.bookmarkCount}
              </button>

            </div>

          </div>
        </div>
      }

      {selectBookMarksPost === "Playlists" &&
        <div className="w-full min-w-0 overflow-x-hidden grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 pt-4 sm:pt-5 gap-4 sm:gap-5 lg:gap-6">
          {filteredBookmarks
            .filter((playlis) => playlis.postType === "playlist")
            .map((playlist) => (
              <PlaylistCard
                key={playlist._id}
                thumbnail={playlist.thumbnail}
                createdAt={playlist.createdAt}
                title={playlist.title}
                videoCount={playlist.videoCount}
                duration={playlist.duration}
                fullname={playlist.author?.userProfile?.profileName || ""}
                profileImage={playlist.author.userProfile?.profileImgUrl || ""}
                description={playlist.description}
                onClick={() => router.push(`/courses/${playlist._id}`)}
              />
            ))}
        </div>
      }



    </main>
  );
}

