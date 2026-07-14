"use client"
import CustomButton from "@/src/components/shared/CustomButton"
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaHeart,
  FaRegComment,
  FaShare,
  FaBookmark,
  FaEllipsisH,
  FaPlayCircle,
  FaEdit
} from "react-icons/fa";
import Comment from "@/src/components/sections/Comment";
import { useAppSelector } from "@/src/store/useSelecterhook";
import { useDispatch } from "react-redux";
import { toggleLike } from "@/src/store/commmentSlice";
import { userPostType } from "@/src/types/dataTaype";
import { useSession } from "next-auth/react";
import { ThumbsUp } from "lucide-react";
import { ApiResponse } from "@/src/lib/apiResponse";
import { toast } from "sonner";
import { setPosts, toggleLikePost, toggleBookmark } from "@/src/store/postSlice";

const posts = [
  {
    id: 1,
    name: "Fatima Noor",
    badge: "Top Contributor",
    time: "2 hours ago",
    text: "Just completed my Physics practical 💡 Here's a short video explaining how to find resistance using Ohm's Law.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000",
    // likes: 124,
    comments: 23,
    shares: 12,
    video: true,
  },
  {
    id: 2,
    name: "Usman Ali",
    time: "3 hours ago",
    text: "Made these Biology notes for Chapter 5. Hope it helps everyone 🌿",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1000",
    // likes: 89,
    comments: 16,
    shares: 8,
  },
  {
    id: 3,
    name: "Ayesha Khan",
    time: "5 hours ago",
    text: "Sunset at my university today 🌅",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000",
    // likes: 76,
    comments: 10,
    shares: 3,
  },
];

export default function CommunityCenter() {
  const [allPostsData, setAllPostsData] = useState<userPostType[]>([]);
  const [showComment, setShowComment] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);
  const [postLikeId, setPostLikeId] = useState<string | null>(null)
  const dispatch = useDispatch();
    const { data: session, status } = useSession();
  const commentsData = useAppSelector((state) => state.commentsData.comments);
  const PostData = useAppSelector((state) => state.postData.posts);
  console.log("PostData", PostData)

  const getAllPosts = async () => {
    try {
      const response = await axios.get("/api/user/get/getallposts");
      setAllPostsData(response?.data?.data)
      dispatch(setPosts(response.data.data))

    } catch (error) {
      console.log("getAllPosts api Error please check the community page api :", error);

    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);


  const handleLike = async (postId: string) => {
    try {
        const formData = new FormData();

          formData.append("postId", postId);
              
          const response = await axios.post("/api/user/post/comment/like", formData);

          dispatch(toggleLikePost({postId, ...response.data.data}))

    } catch (error) {
        console.log(error);
    }
  };

  const allData = (PostData as any[]).map((item, index) => ({
    ...item,
    ...posts[index],
  }));

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
    <div className="flex bg-[#FBFCFE]">

       <div className="flex-1 px-6 py-6">

      {/* Tabs */}

      <div className="flex justify-between items-center my-6">

        <div className="flex gap-3">

          <button className="px-5 py-2 rounded-full bg-blue-600 text-white">
            All
          </button>

          <button className="px-5 py-2 rounded-full bg-gray-100">
            Following
          </button>

          <button className="px-5 py-2 rounded-full bg-gray-100">
            Popular
          </button>

        </div>
        
        <div className="flex items-center gap-3">

          <select className="border rounded-lg px-4 py-2 cursor-pointer">
            <option>Latest</option>
            <option>Popular</option>
          </select>

           <Link href="/createPost">        
              <CustomButton className="flex py-2 px-5 gap-x-3"><FaEdit size={18} /> post</CustomButton>
           </Link> 

        </div>

      </div>

      {/* Posts */}

      <div className="space-y-6">

        {allData.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-sm border p-6"
          >
            {/* Header */}

            <div className="flex justify-between">

              <div className="flex gap-3">

                <img
                  src={ post.author.userProfile.profileImgUrl || "/img/defaultProfile.jfif" }
                  className="w-12 h-12 rounded-full"
                />

                <div>

                  <div className="flex items-center gap-2">

                    <h3 className="font-semibold">{post.author.userProfile.profileName}</h3>

                    {post.badge && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        {post.badge}
                      </span>
                    )}

                  </div>

                  <p className="text-sm text-gray-500">{post.time}</p>

                </div>

              </div>

              <FaEllipsisH />

            </div>

            {/* Content */}

            <p className="my-4 text-gray-700 leading-7">{post.content ?? post.text}</p>

            {/* Image */}

            <div className="relative">

              <img
                src={ post.postImageUrl?.[0] ?? post.image}
                className="rounded-xl w-full h-95 object-cover"
              />

              {/* {post.video && (
                <FaPlayCircle className="absolute text-white text-7xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              )} */}  

            </div>

            {/* Tags */}

            <div className="flex gap-3 text-blue-600 text-sm mt-4">
              {post.tags.map((tag: string, index: number) => (
                <span key={index}> #{tag} </span>
              ))}

            </div>

            {/* Footer */}

            <div className="flex justify-between mt-6 border-t pt-4">

              <div className="flex gap-8">

                <button
                    onClick={() => {
                      setPostLikeId(post._id)
                      handleLike(post._id)
                    }}
                    className="flex items-center gap-2 cursor-pointer">
                  <ThumbsUp size={18} className={`${post.postLikesCount? "text-blue-500" : ""}`} />
                  {post.postLikesCount}
                </button>

                <button 
                    onClick={() => {
                      setShowComment((prev) => !prev);
                      setPostId(post._id)
                    }} 
                    className="flex items-center gap-2 cursor-pointer"
                >
                  <FaRegComment />
                   {post.commentsCount}
                </button>

                <button className="flex items-center gap-2">
                  <FaShare />
                  {post.shares}
                </button>

              </div>

                <button onClick={() => handleBookMarksPost(post._id)} className={`flex items-center ${post.isBookmarked? "text-blue-800" : ""} cursor-pointer gap-2 `}>
                  <FaBookmark />
                  {post.bookmarkCount}
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