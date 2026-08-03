"use client"
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, Share2, Bookmark, CheckCircle, ChevronDown, ChevronUp, } from "lucide-react";
import { PlaylistType } from "@/src/types/dataTaype";
import { useForm } from "react-hook-form";
import z from "zod";
import { commentSchema } from "@/src/zod-Schemas/commentSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import EmojiPicker, { Theme }  from "emoji-picker-react";
import { Smile } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/src/store/useSelecterhook";
import { addComment, setComments, setLoading } from "@/src/store/commmentSlice";
import { ApiResponse } from "@/src/lib/apiResponse";
import { toast } from "sonner";
import { handleLikesAndComments } from "@/src/services/ApiServices/handleLikesAndComments";
import { useSession } from "next-auth/react";
import { handleBookMark } from "@/src/services/ApiServices/handleBookMark";
import { sharePost } from "@/src/services/ApiServices/Share";

export default function PlaylistPage() {
    const[ playlistPostData, setPlaylistPostData ] = useState<PlaylistType | null>(null)
    const { playlistId } = useParams();
    const [videos, setVideos] = useState<any[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<any>(null);
    const [playlist, setPlaylist] = useState<any>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); 
    const [replyCommentId, setReplyCommentId] = useState<string | null>(null);
    const [isSubmiting, setIsSubmitting] = useState(false);
    const dispatch = useAppDispatch();
    const [viewReplyComments, setViewReplyComments] = useState(false);
    const { data: session } = useSession();
    const commentsData = useAppSelector((state) => state.commentsData.comments);
    const playlistReduxData = useAppSelector((state) => state.playlist)
    console.log("playlistData", playlistReduxData)

      const {
        register,
        handleSubmit,
        setValue,
        watch
      } = useForm<z.infer <typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {    
            commentContent: "",
            replyContent: "",
        },
      });
    const commentContent = watch("commentContent");
    const replyContent = watch("replyContent");



  const getYoutubeVideos = async () => {
    const res = await axios.get(`/api/user/get/getPlaylistById?playlistId=${playlistId}`);
      
    const data = res.data.data;

    setPlaylist(data.playlist);
    setPlaylistPostData(data.post)
    setVideos(data.videos);
    setSelectedVideo(data.videos[0]);
  };

    useEffect(() => {
  
    getYoutubeVideos();
  }, []);

    const formatDuration = (duration: string) => {
        const match = duration.match(
        /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
        );

        if (!match) return "0:00";

        const hours = parseInt(match[1] || "0");
        const minutes = parseInt(match[2] || "0");
        const seconds = parseInt(match[3] || "0");

        if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
        }

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

    const onSubmit = async (data: z.infer<typeof commentSchema>) => {
        setIsSubmitting(true);

        try {
            const formDeta = new FormData();
            formDeta.append("commentContent", data.commentContent);
            formDeta.append("replyContent", data.replyContent);
            formDeta.append("postId", playlistId as string);

            if(replyCommentId){
                formDeta.append("parentComment", replyCommentId);
            }

            if(data.targetModel){
                formDeta.append("targetModel", data.targetModel);
            }

            const result = await axios.post("/api/user/post/comment", formDeta);

            dispatch(addComment(result.data.data))

            
            if (replyCommentId) {
                setValue("replyContent", "");
                setReplyCommentId(null);
            } else {
                setValue("commentContent", "");
            };

            setIsSubmitting(false);

        } catch (err) {
            console.log("Error creating post please checking comment page",err)
            
            const axiosError = err as AxiosError<ApiResponse>;

            toast('post created Failed', {
            position: "top-right",
            description: <span className="text-black">{axiosError.response?.data?.message}</span>,
            action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            });

            setIsSubmitting(false);
        }
        
    };

    const getPlaylistComments = async () => {
        dispatch(setLoading(true));

        try {
        const response = await axios.get(`/api/user/post/comment?postId=${playlistId}`);

        dispatch(setComments(response?.data?.data))
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;

            console.error(
                "Failed to fetch comments:",
                axiosError.response?.data?.message || axiosError.message
            );

        } finally {
            dispatch(setLoading(false));
        }
    };

    const savedPlaylist = playlistReduxData.playlists.find( (playlist) => playlist.youtubePlaylistId === playlistPostData?.youtubePlaylistId);
    
    useEffect(() => {
        getPlaylistComments();
    }, [])

  return (
    <div className="bg-[#0b1120]  dark:bg-[#0F172A] dark:text-[#FBFCFE] min-h-600 text-white">

        <div className="flex w-full px-5 gap-5 py-3 ">

            <div className="w-[68%]">
                
                <button className="text-gray-400 hover:text-white mb-6">
                ← Back to Playlists
                </button>


                {selectedVideo && (
                    <>
                        <iframe
                        className="w-full h-100 rounded-lg"
                        src={`https://www.youtube.com/embed/${selectedVideo.snippet.resourceId.videoId}`}
                        title={selectedVideo.snippet.title}
                        allowFullScreen
                        />

                        <h1 className="text-xl text-[#FFFFFF] font-bold mt-4">
                        {selectedVideo.snippet.title}
                        </h1>

                        <p className="text-[#AAAAAA]">
                        {selectedVideo.snippet.channelTitle}
                        </p>

                        <div className="mt-3">

                        <h2 className="text-xl font-semibold">
                            {selectedVideo.title}
                        </h2>

                        </div>
                    </>
                )}


            </div>

            <div className="w-[32%] max-h-110 mt-[5%] bg-[#101827] rounded-xl border border-gray-800 overflow-hidden dark:border-[#374151] dark:bg-[#0F172A] dark:text-[#FBFCFE]">

                <div className="p-2 border-b border-gray-800">

                    <div className="p-2 border-b border-zinc-700">

                        <div className="flex justify-between items-start">

                            <div>
                                <h2 className="text-[#FFFFFF] text-xl font-bold ">
                                    {
                                        playlist?.snippet.title.length > 20
                                        ? playlist.snippet.title.slice(0, 20) + "..."
                                        : playlist?.snippet.title
                                    }
                                </h2>

                                <p className="text-sm text-gray-100">
                                    {playlist?.snippet.channelTitle} • {currentIndex + 1} / {videos.length}
                                </p>
                            </div>

                            <div className="flex gap-3 text-white text-xl">
                            ✕
                            </div>

                        </div>

                    </div>

                </div>

                <div className="max-h-120 overflow-y-auto">

                    {videos.map((video, index) => (

                        <div
                        key={video.snippet.resourceId.videoId}
                        onClick={()=>{
                            setSelectedVideo(video);
                            setCurrentIndex(index);
                        }}
                        className={`flex gap-2 p-2 cursor-pointer hover:bg-[#303030]  hover:dark:bg-[#0F172A] hover:dark:text-[#FBFCFE]
                            ${
                            selectedVideo?.snippet?.resourceId?.videoId ===
                            video.snippet.resourceId.videoId
                                ? "bg-[#3a3a3a]  dark:bg-[#0F172A] dark:text-[#FBFCFE]"
                                : ""
                            }`}
                        >

                        <div className="w-3 text-gray-400 text-sm mt-8">
                            {index + 1}
                        </div>

                        <div className="relative">

                            <img
                            src={video.snippet.thumbnails.medium.url}
                            className="w-32 h-16 rounded object-cover"
                            />

                            <span className="absolute bottom-1 right-1 bg-black/90 text-white text-xs px-1 rounded">
                            {formatDuration(video.duration)}
                            </span>

                        </div>

                        <div className="flex-1">

                            <h3 className="text-white text-sm font-medium line-clamp-2">
                            {video.snippet.title}
                            </h3>

                            <p className="text-xs text-gray-400 mt-1">
                            {video.snippet.channelTitle}
                            </p>

                        </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

        <div className="w-[66%] flex items-center justify-between m-5">

            <div className="flex items-center gap-2">

            <img
                src={playlistPostData?.author.userProfile?.profileImgUrl ||"/img/defaultProfile.jfif"}
                className="w-11 h-11 rounded-full"
            />

            <div>

                <div className="flex items-center gap-2">

                <p className="font-semibold text-sm">
                    {playlistPostData?.author.userProfile?.profileName}
                </p>

                <CheckCircle
                    size={18}
                    className="text-blue-500"
                />

                </div>

                <p className="text-sm text-gray-400">
                add this playList for learning perpase
                </p>

            </div>

            </div>

            {/* Actions */}

            <div className="flex gap-3">

            <button onClick={() => { sharePost({pagePath: "courses", postId: playlistId as string}) }} className="bg-[#182232] rounded-full px-5 py-3 flex items-center gap-2  dark:bg-[#0F172A] cursor-pointer dark:text-[#FBFCFE]">
                <Share2 size={18} />
                Share
            </button>

            {playlistPostData?._id &&
                <button onClick={() => handleBookMark({dispatch, postId:playlistPostData._id})} className={`bg-[#182232] gap-2 rounded-full px-5 py-3 flex items-centergap-2 cursor-pointer `}>
                    <Bookmark 
                        size={18}
                        fill={savedPlaylist?.isBookmarked? "currentColor": "none"}
                        className={` ${savedPlaylist?.isBookmarked? "text-blue-800" : ""} mt-1`}
                    />
                    Save
                </button>
            }



            </div>

        </div>

         <div className="px-5 w-[67%]">

            <form onSubmit={handleSubmit(onSubmit)}>

                <h1 className="text-2xl font-bold pb-8">Comments</h1>
                    <input type="hidden" value="Playlist" {...register("targetModel")} />

                <div className="flex items-strat gap-5 ">

                    <img
                        src={playlistPostData?.author.userProfile?.profileImgUrl || "/img/defaultProfile.jfif"}
                        className="w-9 h-9 m-2 rounded-full"
                    />

                    <div className="flex-1">

                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="
                            w-full
                            bg-transparent
                            border-b
                            border-gray-100
                            py-1
                            outline-none
                            text-white
                            placeholder:text-gray-400
                            "
                            {...register("commentContent")}
                        />
                            <div className="mt-3 flex items-center justify-between">

                                <div className="relative">

                                    <button
                                    type="button"
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    className="text-gray-400 hover:text-white cursor-pointer"
                                    >
                                    <Smile size={22} />
                                    </button>

                                    {showEmojiPicker && (
                                    <div className="absolute top-10 left-0 z-50">
                                        <EmojiPicker
                                        width={400}
                                        height={350}
                                        theme={Theme.DARK}
                                        onEmojiClick={(emojiData) =>
                                            setValue(
                                                "commentContent",
                                                (commentContent || "")  + emojiData.emoji,
                                                  { 
                                                    shouldDirty: true,
                                                    shouldTouch: true,
                                                    shouldValidate: true,
                                                   }
                                            )
                                        }
                                        />
                                    </div>
                                    )}

                                </div>

                                <div className="flex gap-3">
                                    <button className="text-white cursor-pointer">
                                        Cancel
                                    </button>

                                    <button className="px-3 py-1 rounded-2xl hover:bg-white hover:text-black cursor-pointer">
                                        Comment
                                    </button>
                                </div>

                            </div>
                    </div>
                </div>

                
                <div className='flex-1 overflow-y-auto p-7 pb-24'>

                    {commentsData && commentsData.map((comment) => (

                        <div key={comment._id}  className='mb-6'>

                            <div className='flex gap-2'>

                                <img
                                    src={ comment.author.userProfile?.coverImageUrl||"/img/defaultProfile.jfif" }
                                    className="w-7 h-7 rounded-full"
                                />

                                <div className="flex-1 min-w-0">

                                    <h6 className="font-semibold text-gray-200 text-sm">{comment.author.userProfile?.profileName}</h6>

                                    <p className='text-sm text-gray-100'>{comment?.content}</p>


                                    <div className='flex items-center gap-x-8 pt-1 pb-4'>

                                        <button type='button' onClick={() => handleLikesAndComments({ dispatch, commentId: comment._id })} className={`cursor-pointer ${session?.user._id && comment.likes.includes(session?.user._id  )? "text-blue-800" : ""}`}><ThumbsUp size={15} /></button>
                                        <button 
                                            type='button' 
                                            onClick={() =>
                                                session?.user?._id &&
                                                comment.likes.includes(session.user._id) &&
                                                handleLikesAndComments({ dispatch, commentId: comment._id })
                                            }
                                            className={`cursor-pointer`}
                                            >
                                            <ThumbsDown size={15} />
                                        </button>

                                        <p 
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setReplyCommentId(comment._id)
                                                }
                                            }
                                        className='text-sm text-blue-700 cursor-pointer'>reply</p>
                                    </div>

                                    {replyCommentId === comment._id && (
                                        <div className="flex items-center gap-5 ">

                                            <img
                                                src={playlistPostData?.author.userProfile?.profileImgUrl || "/img/defaultProfile.jfif"}
                                                className="w-11 h-11 rounded-full"
                                            />

                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    placeholder="Add a comment..."
                                                    className="
                                                    w-full
                                                    bg-transparent
                                                    border-b
                                                    border-gray-100
                                                    py-1
                                                    outline-none
                                                    text-white
                                                    placeholder:text-gray-400
                                                    "
                                                    {...register("replyContent")}
                                                />
                                                    <div className="mt-3 flex items-center justify-between">

                                                        <div className="relative">

                                                            <button
                                                            type="button"
                                                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                                            className="text-gray-400 hover:text-white cursor-pointer"
                                                            >
                                                            <Smile size={22} />
                                                            </button>

                                                            {showEmojiPicker && (
                                                            <div className="absolute top-10 left-0 z-50">
                                                                <EmojiPicker
                                                                width={400}
                                                                height={350}
                                                                theme={Theme.DARK}
                                                                onEmojiClick={(emojiData) =>
                                                                    setValue(
                                                                        "replyContent",
                                                                        (replyContent || "")  + emojiData.emoji,
                                                                        { 
                                                                            shouldDirty: true,
                                                                            shouldTouch: true,
                                                                            shouldValidate: true,
                                                                        }
                                                                    )
                                                                }
                                                                />
                                                            </div>
                                                            )}

                                                        </div>

                                                        <div className="flex gap-3">
                                                            <button className="text-white cursor-pointer">
                                                                Cancel
                                                            </button>

                                                            <button className="px-3 py-1 rounded-2xl hover:bg-white hover:text-black cursor-pointer">
                                                                Comment
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                        </div>
                                    )}

                                </div> 

                            </div>

                            {/* Replies */}
                            <div className="ml-10 mt-3 space-y-3">

                                {commentsData.filter((reply) => reply.parentComment === comment._id).map((reply) => (

                                    viewReplyComments ? 
                                                                              
                                        <div key={reply._id} className="gap-2">


                                            <div className="flex gap-2 pb-3">

                                                    <img
                                                        src={reply.author.userProfile?.coverImageUrl || "/img/defaultProfile.jfif"}
                                                        className="w-7 h-7 rounded-full"
                                                    />

                                                    <div>
                                                        <h6 className="font-semibold text-sm text-gray-200"> {reply.author.userProfile?.profileName} </h6>

                                                        <p className="text-sm text-gray-100"> {reply.content} </p>

                                                        
                                                    </div>
                                            </div>

                                        <div
                                            onClick={() => setViewReplyComments(false)}
                                            className="flex items-center gap-2 text-blue-500 cursor-pointer"
                                        >
                                            <ChevronUp size={16} />
                                            <span>Hide replies</span>
                                        </div>

                                        </div>
                                    : 
                                    <div
                                        key={reply._id}
                                        onClick={() => setViewReplyComments(true)}
                                        className="flex items-center gap-2 text-blue-500 cursor-pointer"
                                        >
                                        <ChevronDown size={16} />
                                        <span>View replies</span>
                                        </div>
                                     ))}
                            </div>

                        </div>
                    ))}

                </div>


            </form>

         </div>

    </div>
  );
}




