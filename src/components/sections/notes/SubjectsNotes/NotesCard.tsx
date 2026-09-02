import { Bookmark, MoreVertical, Star, Download,
  Pencil,
  Trash2,
  Link2,
  Share2,
  Flag,
  Eye, } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "sonner";
import { ApiResponse } from "@/src/lib/apiResponse";
import axios, { AxiosError } from "axios";
import { deletePost, setPosts, toggleBookmark, toggleLikePost } from "@/src/store/postSlice";
import { useAppDispatch } from "@/src/store/useSelecterhook";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { sharePost } from "@/src/services/ApiServices/Share"

interface NotesCardProps {
  owner: string;
  notesPostId: string;
  title: string;
  thumbnail?: string;
  postDocumentUrl?:string;
  postImageUrl?: string;
  authorName: string;
  authorImg: string;
  subject: string;
  className: string;
  fileUrl: string;
  isBookmarked: boolean;
  isLiked: boolean;
  CountsLikes: number;
  params: string;
}

export default function NotesCard({
  owner,
  notesPostId,
  title,
  thumbnail,
  postDocumentUrl,
  postImageUrl,
  authorName, 
  authorImg,
  subject,
  className,
  fileUrl,
  isBookmarked,
  isLiked,
  CountsLikes,
  params
}: NotesCardProps) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const { data: session, status } = useSession();
    const [showPdf, setShowPdf] = useState(false);
    console.log("postImageUrl", fileUrl)

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
    
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(e.target as Node)
        ) {
            setOpen(false);
        }
        };

        document.addEventListener("mousedown", handleClick);

        return () =>
        document.removeEventListener("mousedown", handleClick);
    }, []);

    
    const removePost = async (postId: string) => {
      try {
        const response = await axios.delete(`/api/user/post/createpost?postId=${postId}`);
  
        console.log(response.data);
  
        dispatch(deletePost(response.data.data));
      } catch (error) {
        console.log(error);
      }
    };

    const copyLink = async (postId: string) => {
      const url = `${window.location.origin}/notes/${params}`;

      await navigator.clipboard.writeText(url);

      toast("Link Copied!", {
          position: "top-right",        
          description: <span className="text-black">page Link successefully copied.</span>,
      });
    };

  return (
    <article className="flex gap-5 rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">

      {/* Left Image */}
      <div className="w-36 h-44 shrink-0 overflow-hidden rounded-xl">
        <img
          src={thumbnail || postImageUrl || postDocumentUrl? "/img/FileImg.png" : ""}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Side */}
      <div className="flex flex-1 flex-col">

        {/* Top */}
        <div>

          <div className="flex justify-between items-center">

            <h4 className="text-md font-semibold"> {title} </h4>
 
 
            <div className="flex gap-3">

                <button onClick={() => handleBookMarksPost(notesPostId)} className={`cursor-pointer`}>
                    {isBookmarked ?
                        <FaBookmark className="text-blue-700" size={22} /> 
                    :
                        <Bookmark size={22} />  
                    }
                </button>

                <div className="relative cursor-pointer" ref={menuRef}>

                    {/* Menu Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="rounded-full p-2 cursor-pointer hover:bg-gray-100 transition"
                    >
                        <MoreVertical size={20} />
                    </button>

                    {/* Dropdown */}
                    {open && (
                        <div className="absolute right-0 top-8 w-52 rounded-xl border border-gray-200 bg-white shadow-xl z-50 overflow-hidden">

                        {owner === session?.user._id && (
                            <>

                                <Link
                                    href={`/edit-post/${notesPostId}`}
                                    className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition"
                                >
                                    <Pencil size={18} />
                                    Edit Note
                                </Link>

                                <button onClick={() => removePost(notesPostId)} className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer">
                                    <Trash2 size={18} />
                                    Delete Note
                                </button>

                                <hr />
                            </>
                        )}

                        <button 
                          onClick={() => {
                              copyLink(notesPostId)
                              setOpen(false)
                           }} 
                           className="flex w-full items-center gap-3 px-4 py-3 cursor-pointer text-sm hover:bg-gray-50 transition"
                        >
                            <Link2 size={18} />
                            Copy Link
                        </button>

                        <button 
                          onClick={() => {
                             sharePost({pagePath: "courses", postId: params as string})
                            setOpen(false)
                          }} className="flex w-full items-center gap-3 cursor-pointer px-4 py-3 text-sm hover:bg-gray-50 transition">
                            <Share2 size={18} />
                            Share
                        </button>

                        {owner !== session?.user._id && (
                            <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition">
                                <Flag size={18} />
                                Report
                            </button>
                        )}
                        </div>
                    )}

                </div>


            </div>

          </div>

          
            <div className="mt-3 flex gap-2">

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm"> {className} </span>

                 <span className="rounded-full bg-gray-100 px-3 py-1 text-sm"> {subject} </span>

            </div>


        </div>

        {/* Author */}

        <div className="mt-6 flex items-center gap-3">

          <img
            src={authorImg}
            alt={authorName}
            className="h-10 w-10 rounded-full object-cover"
          />

          <p className="font-medium">
            {authorName}
          </p>

        </div>

        {/* Bottom */}

        <div className="mt-auto flex items-center justify-between">

          <div className="flex items-center gap-6">

            <div className="flex items-center gap-1">

              <Star
                size={18}
                onClick={() => handleLike(notesPostId)}
                className={`${isLiked? "fill-yellow-500 text-yellow-500": ""} cursor-pointer`}
              />

              <span>{CountsLikes}</span>

            </div>

            <a href={`/api/user/get/pdf/${notesPostId}?download=true`} className="flex items-center cursor-pointer hover:bg-gray-100 hover:shadow-sm py-2 px-3 rounded-lg gap-2 mr-3">

              <Download size={18} />

              <span> Downloads</span>

            </a>

            {postDocumentUrl && 

              <button onClick={() => setShowPdf(true)}  className="flex items-center cursor-pointer hover:bg-gray-100 hover:shadow-sm py-2 px-3 rounded-lg gap-2 mr-3">

                <Eye size={18} />
                <span> View PDF File</span>
                
              </button>
            }

          </div>

          <span className="rounded-lg border border-red-400 px-3 py-2 font-semibold hover:bg-red-500 hover:text-white cursor-pointer text-red-500">
            {postDocumentUrl? "PDF" : "Image"}
          </span>

        </div>

          {showPdf && (
            <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl w-full max-w-5xl h-[90vh] relative overflow-hidden">

                {/* Close */}
                <button
                  onClick={() => setShowPdf(false)}
                  className="absolute right-3 top-3 z-10 cursor-pointer bg-black text-white px-3 py-1 rounded"
                >
                  ✕
                </button>

                {/* PDF */}
                <iframe
                  src={`/api/user/get/pdf/${notesPostId}`}
                  className="w-full h-full"
                  title="PDF Preview"
                />
              </div>
            </div>
          )}

      </div>

    </article>
  );
}