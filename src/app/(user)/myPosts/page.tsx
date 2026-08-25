"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ArrowBigLeft, Loader2, ThumbsUp, } from "lucide-react";
import { FaBookmark, FaEllipsisH, FaRegComment,FaShare, } from "react-icons/fa";
import { PlaylistType, userPostType } from "@/src/types/dataTaype";
import PlaylistCard from "@/src/components/shared/playlist/PlaylistCard";
import { handleLikesAndComments } from "@/src/services/ApiServices/handleLikesAndComments";
import { useAppDispatch } from "@/src/store/useSelecterhook";
import { handleBookMark } from "@/src/services/ApiServices/handleBookMark";
import { LoadingSpinner } from "@/src/app/loading";



const postTypes = ["All", "Images", "Videos", "Notes", "File", "Playlists"];

export default function MyPostsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [posts, setPosts] = useState<(userPostType & PlaylistType)[]>([]);
  const [selectedType, setSelectedType] = useState("All");
  const [viewPost, setViewPost] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");


  useEffect(() => {
    const getMyPosts = async () => {
      try {
        setLoading(true);
        setApiError("");

        const response = await axios.get("/api/user/get/getCurrentUserAllPosts" );

        console.log("My Posts:", response.data.data);

        setPosts(response.data.data || []);
      } catch (error: any) {
        console.log("Get my posts error:", error);

        setApiError(
          error?.response?.data?.message ||
            "Failed to fetch your posts."
        );
      } finally {
        setLoading(false);
      }
    };

    getMyPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {

    switch (selectedType) {
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


  /* Find Selected Post*/

  const findViewPostId = posts.find(
    (post) => post._id === viewPost
  );

  /* Render */

    if (loading) {
      return  <LoadingSpinner />
  }

  return (
    <main className="flex-1 min-w-0 p-3 pt-28 md:pt-18 sm:p-4 md:p-6 bg-gray-50 dark:bg-[#0b1120]">

        {/* Header */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#101827] p-4 sm:p-5 md:p-6 shadow-sm">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  My Posts
                </h1>

                <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  Manage and view all the posts you have created.
                </p>
              </div>

              <button
                onClick={() => router.push("/createPost")}
                className="w-full sm:w-auto rounded-xl cursor-pointer bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
              >
                + Create Post
              </button>

            </div>

            {/* Search */}
            <div className="mt-5">
              <input
                type="text"
                placeholder="Search my posts..."
                // value={search}
                // onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#101827] px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filters */}
            <div className="mt-5 flex gap-2 sm:gap-3 overflow-x-auto pb-1">

              {postTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`shrink-0 rounded-lg border px-4 sm:px-5 py-2 text-sm sm:text-base transition ${
                    selectedType === type
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 dark:border-gray-700 bg-white dark:bg-[#101827] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E293B]"
                  }`}
                >
                  {type}
                </button>
              ))}

            </div>
      </div>


      {apiError && (

        <div className="mt-5 p-4 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm">

          {apiError}

        </div>

      )}

      {/* Cards */}
      {!viewPost && selectedType !== "Playlists" &&
        <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">

          {/* Image */}

          {filteredPosts.length > 0 ?

            filteredPosts.map((post) => (

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
                No {selectedType?.toLowerCase()} found.
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

      {selectedType === "Playlists" &&
        <div className="w-full min-w-0 overflow-x-hidden grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 pt-4 sm:pt-5 gap-4 sm:gap-5 lg:gap-6">
          {filteredPosts
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

