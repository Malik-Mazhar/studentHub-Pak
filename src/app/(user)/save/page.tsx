"use client";

import { useAppDispatch, useAppSelector } from "@/src/store/useSelecterhook";
import axios from "axios";
import { useEffect, useState } from "react";
import { setBookmarks } from "@/src/store/bookmarkSlice";
import { FaEllipsisH } from "react-icons/fa";
import { FaBookmark, FaRegComment, FaShare } from "react-icons/fa6";
import { ThumbsUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import PlaylistCard from "@/src/components/shared/playlist/PlaylistCard";
import { useRouter } from "next/navigation";
import { handleLikesAndComments } from "@/src/services/ApiServices/handleLikesAndComments";
import { handleBookMark } from "@/src/services/ApiServices/handleBookMark";
import { setPosts, toggleLikePost } from "@/src/store/postSlice";

export default function SavedPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [viewPost, setViewPost] = useState<null | string>(null);
  const allBookmarksData = useAppSelector((state) => state.bookmarksData);
  const PostData = useAppSelector((state) => state.postData.posts)
  const [selectBookMarksPost, setSelectBookMarksPost] = useState<null | string>(null);
    
  const getAllBookmarks = async () => {
    try {
      const response = await axios.get("/api/user/get/getSaved");

      dispatch(setBookmarks(response.data.data))

    } catch (error) {
      console.log("getAllPosts api Error please check the community page api :", error);

    };
  };
  

  const findViewPostId = PostData.find((postId) => postId._id.toString() === viewPost)
  console.log("findViewPostId", findViewPostId)


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
            post.postType === "discussion" &&
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


  useEffect(() => {
    getAllBookmarks();
    getAllPosts();
  }, []);

  return (
   <main className="flex-1 p-6 bg-gray-50">

      {/* Heading */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Saved Items</h1>
              <p className="text-gray-500 mt-2">
                All the content you've saved for quick access.
              </p>
            </div>

            <input
              type="text"
              placeholder="Search saved..."
              className="w-80 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3 mt-6 overflow-x-auto">

            {bookMarksTypes.map((type, index) => (

              <button 
                key={index}
                onClick={() => setSelectBookMarksPost(type)} 
                className={`
                  px-5 py-2 rounded-lg  border cursor-pointer
                  
                  ${(selectBookMarksPost === type) || (selectBookMarksPost === null && index === 0)? "bg-blue-600 text-white" : ""}
                  `}
                
              >
                {type}
              </button>

            ))}


          </div>
        </div>

      {/* Cards */}
      {!viewPost && selectBookMarksPost !== "Playlists" &&
        <div className="space-y-6 mt-6">

          {/* Image */}

          {filteredBookmarks.length > 0 ? 

            filteredBookmarks.map((post) => (

              <div key={post._id} className="bg-white rounded-2xl border shadow-sm p-5 flex gap-5">

                {Array.isArray(post.postImageUrl) && post.postImageUrl.length > 0  &&
                  <img
                    src={ post?.postImageUrl?.[0]}
                    className="rounded-xl w-60 h-40 object-cover"
                  />
                }

                <div className="flex-1">

                  <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                    { post.postType.charAt(0).toUpperCase() + post.postType.slice(1)}
                  </span>

                  <h2 className="text-2xl font-semibold mt-3">
                    {post.title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Posted {post.author.userProfile?.profileName} •                         
                    {post.createdAt && formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      })}
                  </p>

                  <p className="text-gray-600 mt-3 line-clamp-3">
                    {post.content}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <button onClick={() => setViewPost(post._id)} className="border rounded-lg px-4 py-2 cursor-pointer">
                      View
                    </button>
                  </div>

                </div>

              </div>

            ))

          :
            <div className="flex items-center justify-center py-16">
              <p className="text-gray-500 text-lg">
                No {selectBookMarksPost?.toLowerCase()} found.
              </p>
            </div>

          }



        </div>
      }

      {viewPost && findViewPostId &&

              <div key={findViewPostId?._id} className="bg-white rounded-2xl shadow-sm border p-6 mt-10" >

                <div className="flex justify-between">

                  <div className="flex gap-3">

                    <img
                      src={ findViewPostId?.author?.userProfile?.profileImgUrl || "/img/defaultProfile.jfif" }
                      className="w-12 h-12 rounded-full"
                    />

                    <div>

                      <div className="flex items-center gap-2">

                        <h3 className="font-semibold">{findViewPostId?.author?.userProfile?.profileName}</h3>

                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            Top Contributor
                          </span>

                      </div>

                      <p className="text-sm text-gray-500">2 hours ago</p>

                    </div>

                  </div>

                  <div className="flex items-center gap-x-5">
                    <button onClick={() => setViewPost(null)} className="border rounded-lg hover:bg-gray-100 cursor-pointer px-4 py-2 text-red-500">
                      Hidden
                    </button>
                    <FaEllipsisH />

                  </div>

                </div>

                {/* Content */}

                <p className="my-4 text-gray-700 leading-7">{findViewPostId?.content}</p>

                {/* Image */}

                <div className="relative">

                  {Array.isArray(findViewPostId.postImageUrl) && findViewPostId.postImageUrl.length > 0  &&
                    <img
                      src={ findViewPostId?.postImageUrl?.[0]}
                      className="rounded-xl w-full h-95 object-cover"
                    />
                  }

                  {/* {post.video && (
                    <FaPlayCircle className="absolute text-white text-7xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                  )} */}  

                </div>

                {/* Tags */}

                <div className="flex gap-3 text-blue-600 text-sm mt-4">
                  {findViewPostId?.tags && findViewPostId?.tags.map((tag: string, index: number) => (
                    <span key={index}> #{tag} </span>
                  ))}

                </div>

                {/* Footer */}

                <div className="flex justify-between mt-6 border-t pt-4">

                  <div className="flex gap-8">

                    <button
                        onClick={() => {
                          handleLikesAndComments({ dispatch, postId:findViewPostId?._id })
                        }}
                        className="flex items-center gap-2 cursor-pointer">
                      <ThumbsUp size={18} className={`${findViewPostId?.postLikesCount? "text-blue-500" : ""}`} />
                      {findViewPostId?.postLikesCount}
                    </button>

                    <button 
                        // onClick={() => {
                        //   setShowComment((prev) => !prev);
                        //   setPostId(findViewPostId._id)
                        // }} 
                        className="flex items-center gap-2 cursor-pointer"
                    >
                      <FaRegComment />
                      {findViewPostId?.commentsCount}
                    </button>

                    <button className="flex items-center gap-2">
                      <FaShare />
                    </button>

                  </div>

                    <button onClick={() => handleBookMark({dispatch, postId: findViewPostId._id})} className={`flex items-center ${findViewPostId?.isBookmarked? "text-blue-800" : ""} cursor-pointer gap-2 `}>
                      <FaBookmark /> 
                      {findViewPostId?.bookmarkCount}
                    </button>
                </div>

              </div>
      }

      {selectBookMarksPost === "Playlists" &&
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 pt-5 gap-6">
            {filteredBookmarks.filter((playlis) => playlis.postType === "playlist").map((playlist) => (

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



          // Video

          // <div className="bg-white rounded-2xl border shadow-sm p-5 flex gap-5">

          //   <img
          //     src="https://picsum.photos/251/180"
          //     className="w-60 h-40 rounded-xl object-cover"
          //   />

          //   <div className="flex-1">

          //     <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
          //       Video
          //     </span>

          //     <h2 className="text-2xl font-semibold mt-3">
          //       React Hooks Complete Guide
          //     </h2>

          //     <p className="text-gray-500 mt-2">
          //       Duration 18:45
          //     </p>

          //     <div className="flex gap-2 mt-4">

          //       <button className="bg-green-600 text-white rounded-lg px-4 py-2">
          //         Watch
          //       </button>

          //       <button className="border rounded-lg px-4 py-2 text-red-500">
          //         Remove
          //       </button>

          //     </div>

          //   </div>

          // </div>

          // {/* Playlist */}

          // <div className="bg-white rounded-2xl border shadow-sm p-5 flex gap-5">

          //   <img
          //     src="https://picsum.photos/252/180"
          //     className="w-60 h-40 rounded-xl object-cover"
          //   />

          //   <div className="flex-1">

          //     <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
          //       Playlist
          //     </span>

          //     <h2 className="text-2xl font-semibold mt-3">
          //       JavaScript Complete Course
          //     </h2>

          //     <p className="text-gray-500 mt-2">
          //       52 Videos
          //     </p>

          //     <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
          //       <div className="w-2/3 h-2 bg-green-500 rounded-full"></div>
          //     </div>

          //     <div className="flex gap-2 mt-4">

          //       <button className="bg-blue-600 text-white rounded-lg px-4 py-2">
          //         Continue
          //       </button>

          //       <button className="border rounded-lg px-4 py-2">
          //         View Playlist
          //       </button>

          //     </div>

          //   </div>

          // </div>

          // {/* Notes */}

          // <div className="bg-white rounded-2xl border shadow-sm p-5 flex gap-5">

          //   <div className="w-60 h-40 rounded-xl bg-gray-100 flex items-center justify-center text-5xl">
          //     📄
          //   </div>

          //   <div className="flex-1">

          //     <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">
          //       Notes
          //     </span>

          //     <h2 className="text-2xl font-semibold mt-3">
          //       Biology Chapter Notes
          //     </h2>

          //     <p className="text-gray-500 mt-2">
          //       PDF • 12 Pages
          //     </p>

          //     <div className="flex gap-2 mt-4">

          //       <button className="border rounded-lg px-4 py-2">
          //         Open
          //       </button>

          //       <button className="border rounded-lg px-4 py-2">
          //         Download
          //       </button>

          //     </div>

          //   </div>

          // </div>

          // {/* File */}

          // <div className="bg-white rounded-2xl border shadow-sm p-5 flex gap-5">

          //   <div className="w-60 h-40 rounded-xl bg-gray-100 flex items-center justify-center text-5xl">
          //     📁
          //   </div>

          //   <div className="flex-1">

          //     <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full">
          //       File
          //     </span>

          //     <h2 className="text-2xl font-semibold mt-3">
          //       Physics Practical.pdf
          //     </h2>

          //     <p className="text-gray-500 mt-2">
          //       2.5 MB
          //     </p>

          //     <div className="flex gap-2 mt-4">

          //       <button className="border rounded-lg px-4 py-2">
          //         Open
          //       </button>

          //       <button className="border rounded-lg px-4 py-2">
          //         Download
          //       </button>

          //       <button className="border rounded-lg px-4 py-2 text-red-500">
          //         Remove
          //       </button>

          //     </div>

          //   </div>

          // </div>